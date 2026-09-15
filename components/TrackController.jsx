"use client";

import { useEffect } from "react";
import { HORIZONTAL_QUERY } from "@/lib/track";

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
      if (target && track.contains(target)) scrollTo({ top: topFor(target), behavior });
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
      track.style.translate = `${-p * (track.scrollWidth - track.parentElement.clientWidth)}px 0`;
      if (fill) fill.style.scale = `${p} 1`;
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

    return () => {
      io?.disconnect();
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
