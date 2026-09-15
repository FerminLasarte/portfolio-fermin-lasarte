"use client";

import { useEffect, useRef } from "react";

const FINE = "(hover: hover) and (pointer: fine)";
const CALM = "(prefers-reduced-motion: reduce), (forced-colors: active)";

// Cursor propio (docs/DISENO.md, 7.8), el de douglus: un círculo y un punto que siguen
// al mouse con retraso (0,2 y 0,35 por frame). Sobre enlaces y botones se esconde y
// queda la mano del sistema; sobre lo que tenga data-cursor="drag" crece y muestra el
// texto de data-cursor-label.
//  - Solo con mouse, sin reduce motion y sin colores forzados: si no, queda el del
//    sistema. Nada depende de él.
//  - El cursor del sistema se oculta (html.has-cursor) recién cuando el propio ya está
//    en la posición del mouse: nunca hay un momento sin cursor ni un punto en (0, 0).
//  - Un solo listener con delegación; se mueve con translate; el requestAnimationFrame
//    se detiene cuando el círculo alcanzó al mouse.
export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    const cursor = ref.current;
    const circle = cursor.querySelector(".cursor__circle");
    const dot = cursor.querySelector(".cursor__dot");
    const text = cursor.querySelector(".cursor__text");
    const html = document.documentElement;
    const fine = matchMedia(FINE);
    const calm = matchMedia(CALM);

    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;
    let dx = 0;
    let dy = 0;
    let raf = 0;
    let live = false;

    const wanted = () => fine.matches && !calm.matches;
    const paint = () => {
      dot.style.translate = `${dx}px ${dy}px`;
      circle.style.translate = `${cx}px ${cy}px`;
    };
    const frame = () => {
      dx += (mx - dx) * 0.35;
      dy += (my - dy) * 0.35;
      cx += (mx - cx) * 0.2;
      cy += (my - cy) * 0.2;
      paint();
      raf = Math.abs(mx - cx) + Math.abs(my - cy) > 0.2 ? requestAnimationFrame(frame) : 0;
    };
    const stop = () => {
      live = false;
      html.classList.remove("has-cursor");
      cursor.classList.remove("is-on");
    };

    const onMove = (e) => {
      if (e.pointerType !== "mouse" || !wanted()) return;
      mx = e.clientX;
      my = e.clientY;
      if (!live) {
        live = true;
        cx = dx = mx;
        cy = dy = my;
        paint();
        html.classList.add("has-cursor");
      }
      cursor.classList.add("is-on");
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onOver = (e) => {
      const target = e.target.closest?.("[data-cursor], a, button");
      cursor.dataset.mode = target ? target.dataset.cursor || "link" : "";
      // Claro sobre el cierre.
      cursor.dataset.tone = e.target.closest?.(".contact") ? "night" : "";
      text.textContent = target?.dataset.cursorLabel ?? "";
    };
    const onDown = () => cursor.classList.add("is-down");
    const onUp = () => cursor.classList.remove("is-down");
    const onLeave = () => cursor.classList.remove("is-on");
    const onChange = () => {
      if (!wanted()) stop();
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerup", onUp);
    html.addEventListener("mouseleave", onLeave);
    fine.addEventListener("change", onChange);
    calm.addEventListener("change", onChange);

    return () => {
      cancelAnimationFrame(raf);
      stop();
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      html.removeEventListener("mouseleave", onLeave);
      fine.removeEventListener("change", onChange);
      calm.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <div className="cursor__circle">
        <span className="cursor__shape" />
        <span className="cursor__text" />
      </div>
      <div className="cursor__dot" />
    </div>
  );
}
