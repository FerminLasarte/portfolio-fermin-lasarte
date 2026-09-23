"use client";

import { useEffect } from "react";
import { HORIZONTAL_QUERY } from "@/lib/track";
import { hasLenis, smoothScrollTo } from "@/lib/scroll";
import { setupReveal } from "@/lib/reveal";

// Lo que entra por separado en cada panel (styles/motion.css), en el orden del HTML.
const REVEAL = [
  ".display",
  ".hero__avail",
  ".hero__lead",
  ".hero__ctas > .btn",
  ".idx",
  ".card__plate",
  ".card__meta",
  ".card__title",
  ".card__text > p",
  ".card__tags",
  ".card__links > .btn",
  ".stats > div",
  ".trajectory__intro",
  ".trajectory__note",
  ".trajectory__more",
  ".stage__years",
  ".stage__body",
  ".skills__lead",
  ".skills__more",
  ".wall-wrap",
  ".skills__group",
  ".contact__rule",
  ".contact__pills > .btn",
  ".contact__back",
].join(", ");

// El nombre del hero es un `.display`, pero tiene su propia entrada letra por letra
// (styles/motion.css), así que no entra por acá: sería dos entradas encima.
const SKIP = ".hero__name";

// Cómo entra cada uno: los títulos suben en su máscara, las placas se destapan y las
// líneas crecen; el resto sube con un fundido.
const variant = (el) =>
  el.matches(".display, .card__title, .stage__years")
    ? ["rv--mask"]
    : el.matches(".card__plate")
      ? ["rv--plate"]
      : el.matches(".contact__rule")
        ? ["rv--grow"]
        : [];

// Mejora de JS de la pista (docs/DISENO.md, 6.3 a 6.5). No renderiza nada: se engancha
// a los paneles que ya vienen en el HTML.
//  - Anclas: en horizontal el panel destino está dentro de la pista y el navegador no
//    sabe llevarlo a la vista, así que se corrige el scroll vertical (1px de scroll
//    mueve 1px la pista). En vertical con Lenis (puntero fino), el salto pasa por
//    Lenis, con la misma inercia que la rueda (R-M12). La URL la sigue actualizando
//    el navegador.
//  - Foco: si el teclado enfoca algo fuera de la ventana, se lo trae sin animación.
//  - Sección actual: aria-current en el nav y el nombre en la franja inferior.
//  - Respaldo: donde no hay animation-timeline (Firefox), el translate lo escribe JS.
export default function TrackController() {
  useEffect(() => {
    const wrap = document.querySelector(".h-scroll");
    const track = wrap?.querySelector(".h-track");
    if (!track) return;

    const mq = matchMedia(HORIZONTAL_QUERY);
    const native = CSS.supports("animation-timeline: view()");
    const panels = [...track.querySelectorAll(".panel")];
    const fill = document.querySelector(".strip__fill");
    const wash = track.querySelector(".bleed__wash");
    const stages = track.querySelector(".stages");
    const label = document.querySelector("[data-strip-label]");
    const count = document.querySelector("[data-strip-count]");
    const cards = panels.filter((p) => p.matches(".panel--card, .panel--card-lg"));

    // Scroll que deja el panel de `el` contra el borde izquierdo de la ventana.
    const topFor = (el) => {
      const panel = el.closest(".panel") ?? el;
      const start = wrap.getBoundingClientRect().top + scrollY;
      return Math.min(start + panel.offsetLeft, start + wrap.offsetHeight - innerHeight);
    };

    const goTo = (hash, behavior) => {
      if (!hash) return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target || !track.contains(target)) return;
      if (mq.matches) {
        if (behavior === "smooth") smoothScrollTo(topFor(target));
        else scrollTo({ top: topFor(target), behavior });
        return;
      }
      // En vertical el navegador ya sabe llegar (con el margen del nav, styles/base.css):
      // solo se cambia el cómo, y solo si hay Lenis. Sin Lenis queda el scroll nativo.
      if (behavior !== "smooth" || !hasLenis()) return;
      const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      smoothScrollTo(Math.max(0, target.getBoundingClientRect().top + scrollY - pad));
    };

    // Un clic a otra sección dispara hashchange; un clic al mismo #hash, no.
    const onClick = (e) => {
      const a = e.target.closest?.("a[href*='#']");
      if (!a || a.origin !== location.origin || a.pathname !== location.pathname) return;
      if (a.hash === location.hash) requestAnimationFrame(() => goTo(a.hash, "smooth"));
    };
    const onHash = () => goTo(location.hash, "smooth");

    // Solo el foco del teclado (R-I2): con el mouse, Chrome enfoca el enlace en el
    // mousedown, y si el botón estaba cortado por el borde, el salto de la pista
    // hacía que el mouseup cayera en otro lado y el clic se perdiera.
    const onFocus = (e) => {
      if (!mq.matches || !e.target.matches(":focus-visible")) return;
      const r = e.target.getBoundingClientRect();
      if (r.left < 0 || r.right > innerWidth) scrollBy({ top: r.left - 48, behavior: "instant" });
    };

    // "Buscar en la página" y la selección (R-M11): el navegador no puede traer a la
    // vista un texto de un panel que está a la derecha (el documento no tiene scroll
    // horizontal). Si la selección cae fuera de la ventana, se la trae como al foco.
    // Es una mitigación parcial: sirve para window.find, para seleccionar con el
    // teclado y, en Chrome, cuando se cierra la barra de búsqueda (recién ahí la
    // coincidencia pasa a ser la selección). Solo si la selección está en un panel y
    // entra en la ventana: Cmd+A no manda la pista al final.
    const onSelection = () => {
      if (!mq.matches) return;
      const sel = document.getSelection();
      if (!sel?.rangeCount || !track.contains(sel.focusNode)) return;
      const panel = sel.focusNode.parentElement?.closest(".panel");
      if (!panel || !panel.contains(sel.anchorNode)) return;
      const r = sel.getRangeAt(0).getBoundingClientRect();
      if (!r.width && !r.height) return;
      if (r.width > innerWidth - 96) return;
      if (r.left < 0 || r.right > innerWidth) scrollBy({ top: r.left - 48, behavior: "instant" });
    };

    // Sección actual: en horizontal, la que cruza la línea vertical del centro; en
    // vertical, la que cruza una franja horizontal al 40% del alto.
    let io;
    const watch = () => {
      io?.disconnect();
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const { section, label: name } = entry.target.dataset;
            for (const a of document.querySelectorAll("a[data-section]")) {
              if (a.dataset.section === section) a.setAttribute("aria-current", "location");
              else a.removeAttribute("aria-current");
            }
            if (label && name) label.textContent = name;
            // El contador ("03 / 06") lo arma el servidor en cada tarjeta
            // (components/ProjectCard.jsx); fuera de Proyectos no hay ninguno.
            if (count) count.textContent = entry.target.dataset.count ?? "";
          }
        },
        { rootMargin: mq.matches ? "0px -50% 0px -50%" : "-40% 0px -59% 0px" },
      );
      panels.forEach((p) => io.observe(p));
    };

    // Respaldo sin animation-timeline: el mismo cálculo que hace el CSS, escrito directo
    // en el elemento y agrupado por frame (sin estado de React).
    let raf = 0;
    const paint = () => {
      raf = 0;
      const range = wrap.offsetHeight - innerHeight;
      const p = range > 0 ? Math.min(Math.max(-wrap.getBoundingClientRect().top / range, 0), 1) : 0;
      const vw = track.parentElement.clientWidth;
      const x = p * (track.scrollWidth - vw);
      track.style.translate = `${-x}px 0`;
      if (fill) fill.style.scale = `${p} 1`;
      // La transición al cierre se estira mientras su borde izquierdo va del borde
      // derecho de la ventana al centro menos 100px (el mismo tramo que styles/contact.css).
      if (wash) {
        const start = wash.parentElement.offsetLeft - vw;
        const t = Math.min(Math.max((x - start) / (0.5 * vw + 100), 0), 1);
        wash.style.scale = `${0.05 + 0.97 * t} 1`;
      }
      // La línea de Trayectoria se dibuja desde que el panel llega al 60% de la ventana
      // hasta que su borde derecho llega al de la ventana (styles/trajectory.css).
      if (stages) {
        const panel = stages.closest(".panel");
        const start = panel.offsetLeft - 0.6 * vw;
        const end = panel.offsetLeft + panel.offsetWidth - vw;
        stages.style.setProperty("--rail", Math.min(Math.max((x - start) / (end - start), 0), 1));
      }
      // Cuánto lleva cruzada la pantalla cada tarjeta de Proyectos: de ahí salen la
      // paralaje, la deriva y el desplazamiento de la captura (styles/projects.css).
      // Es la misma cuenta que hace ahí el `animation-range`, escrita en la misma
      // variable, así el movimiento se decide en un solo lugar.
      for (const card of cards) {
        const left = card.offsetLeft - x;
        const cross = (vw - left) / (vw + card.offsetWidth);
        card.style.setProperty("--cross", Math.min(Math.max(cross, 0), 1));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const fallback = () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      if (native || !mq.matches) {
        track.style.translate = "";
        if (fill) fill.style.scale = "";
        if (wash) wash.style.scale = "";
        stages?.style.removeProperty("--rail");
        for (const card of cards) card.style.removeProperty("--cross");
        return;
      }
      addEventListener("scroll", onScroll, { passive: true });
      addEventListener("resize", onScroll);
      paint();
    };

    const onModeChange = () => {
      watch();
      fallback();
    };

    watch();
    fallback();
    goTo(location.hash, "instant");
    document.addEventListener("click", onClick);
    addEventListener("hashchange", onHash);
    track.addEventListener("focusin", onFocus);
    document.addEventListener("selectionchange", onSelection);
    mq.addEventListener("change", onModeChange);

    // Entradas (docs/DISENO.md, sección 8): un grupo por panel (lib/reveal.js). Entran
    // al 80% de la pantalla (85% del alto en vertical). Qué paneles se ven al cargar: en
    // horizontal no sirve medirlos con su rect, porque el `translate` de la pista lo
    // escribe la animación atada al scroll (styles/track.css) y se aplica recién en el
    // frame siguiente, así que justo después del salto de un ancla el rect todavía es
    // el de antes. Se calcula dónde quedó la pista con la misma cuenta que el CSS (la de
    // `paint`) y de ahí sale el borde izquierdo de cada panel. En los dos modos: en
    // vertical también hay entradas.
    const range = wrap.offsetHeight - innerHeight;
    const done = range > 0 ? Math.min(Math.max(-wrap.getBoundingClientRect().top / range, 0), 1) : 0;
    const pan = mq.matches ? done * (track.scrollWidth - track.parentElement.clientWidth) : 0;
    const stopReveal = setupReveal({
      groups: panels,
      items: REVEAL,
      skip: SKIP,
      variant,
      isSeen: (panel) =>
        mq.matches ? panel.offsetLeft - pan < innerWidth : panel.getBoundingClientRect().top < innerHeight,
      rootMargin: mq.matches ? "0px -20% 0px 0px" : "0px 0px -15% 0px",
      focusRoot: track,
    });

    return () => {
      stopReveal();
      io?.disconnect();
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      document.removeEventListener("click", onClick);
      removeEventListener("hashchange", onHash);
      track.removeEventListener("focusin", onFocus);
      document.removeEventListener("selectionchange", onSelection);
      mq.removeEventListener("change", onModeChange);
    };
  }, []);

  return null;
}
