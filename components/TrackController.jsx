"use client";

import { useEffect } from "react";
import { HORIZONTAL_QUERY } from "@/lib/track";
import { smoothScrollTo } from "@/lib/scroll";

// Mejora de JS de la pista (docs/DISENO.md, 6.3 a 6.5). No renderiza nada: se engancha
// a los paneles que ya vienen en el HTML.
//  - Anclas: en horizontal el panel destino está dentro de la pista y el navegador no
//    sabe llevarlo a la vista, así que se corrige el scroll vertical (1px de scroll
//    mueve 1px la pista). La URL la sigue actualizando el navegador.
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
    const label = document.querySelector("[data-strip-label]");

    // Scroll que deja el panel de `el` contra el borde izquierdo de la ventana.
    const topFor = (el) => {
      const panel = el.closest(".panel") ?? el;
      const start = wrap.getBoundingClientRect().top + scrollY;
      return Math.min(start + panel.offsetLeft, start + wrap.offsetHeight - innerHeight);
    };

    const goTo = (hash, behavior) => {
      if (!mq.matches || !hash) return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target || !track.contains(target)) return;
      if (behavior === "smooth") smoothScrollTo(topFor(target));
      else scrollTo({ top: topFor(target), behavior });
    };

    // Un clic a otra sección dispara hashchange; un clic al mismo #hash, no.
    const onClick = (e) => {
      const a = e.target.closest?.("a[href*='#']");
      if (!a || a.origin !== location.origin || a.pathname !== location.pathname) return;
      if (a.hash === location.hash) requestAnimationFrame(() => goTo(a.hash, "smooth"));
    };
    const onHash = () => goTo(location.hash, "smooth");

    const onFocus = (e) => {
      if (!mq.matches) return;
      const r = e.target.getBoundingClientRect();
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
            // Nav y franja en noche mientras el contacto está en el centro (styles/contact.css).
            document.documentElement.classList.toggle("on-night", entry.target.classList.contains("contact"));
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
    mq.addEventListener("change", onModeChange);

    // Entradas (docs/DISENO.md, sección 8): los paneles que no se ven al cargar esperan
    // con .is-waiting hasta entrar a la vista, una vez; styles/motion.css anima la
    // salida de ese estado. Sin JS o con reduce motion, nada espera.
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove("is-waiting");
          reveal.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (const panel of panels) {
        const r = panel.getBoundingClientRect();
        if (r.left >= innerWidth || r.top >= innerHeight) {
          panel.classList.add("is-waiting");
          reveal.observe(panel);
        }
      }
    }

    return () => {
      io?.disconnect();
      reveal.disconnect();
      document.documentElement.classList.remove("on-night");
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      document.removeEventListener("click", onClick);
      removeEventListener("hashchange", onHash);
      track.removeEventListener("focusin", onFocus);
      mq.removeEventListener("change", onModeChange);
    };
  }, []);

  return null;
}
