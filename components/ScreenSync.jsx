"use client";

import { useEffect, useRef } from "react";

// Cambia la pantalla de la historia de un proyecto (components/ProjectScreens.jsx) según
// el capítulo que se está leyendo: el que cruza una línea al 45% del alto de la ventana.
// El capítulo n muestra la captura n; los que sobran (Resultado, Tecnologías), la
// última. Entre capítulos, y antes del primero, se queda la que estaba. Solo cambia
// clases (.is-on); lo que se ve y cómo cambia está en styles/page.css. No renderiza
// nada visible: se engancha a la historia que lo contiene.
export default function ScreenSync() {
  const ref = useRef(null);

  useEffect(() => {
    const story = ref.current?.closest("[data-story]");
    if (!story) return;
    const items = [...story.querySelectorAll(".screens__item")];
    const dots = [...story.querySelectorAll(".screens__dots > span")];
    const chapters = [...story.querySelectorAll("[data-screen-step]")];
    if (items.length < 2 || !chapters.length) return;

    const show = (n) => {
      const i = Math.min(n, items.length - 1);
      items.forEach((el, k) => el.classList.toggle("is-on", k === i));
      dots.forEach((el, k) => el.classList.toggle("is-on", k === i));
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) show(chapters.indexOf(e.target));
        }
      },
      { rootMargin: "-45% 0px -55% 0px" },
    );
    chapters.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return <span ref={ref} hidden />;
}
