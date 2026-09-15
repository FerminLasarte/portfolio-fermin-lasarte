"use client";

import { useEffect } from "react";

const WANTED = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const PULL = 0.3; // qué parte de la distancia al centro se corre el botón hacia el mouse
const EASE = 0.1; // por frame, como en douglus
const OUT = 420; // ms que tarda el relleno en salir por arriba (styles/base.css)

// Botones de douglus (docs/DISENO.md, 7.6). El relleno que sube y el salto del texto
// los hace el CSS con :hover; esto suma dos cosas que el CSS no puede:
//  - el imán: mientras el mouse está sobre un botón, el botón se corre hacia él (30%
//    de la distancia al centro) y al salir vuelve a su lugar, con retraso;
//  - la salida por arriba: al irse el mouse, el relleno sigue subiendo (.is-out) en
//    vez de volver a bajar, y después vuelve abajo sin transición (.is-reset).
// Solo con mouse y sin reduce motion. Un solo listener con delegación; el
// requestAnimationFrame se detiene cuando ningún botón se está moviendo.
export default function Magnet() {
  useEffect(() => {
    const mq = matchMedia(WANTED);
    const moving = new Map(); // botón → { x, y }: el corrimiento actual
    let current = null; // el botón que tiene el mouse encima
    let mx = 0;
    let my = 0;
    let raf = 0;

    const frame = () => {
      raf = 0;
      for (const [el, s] of moving) {
        let tx = 0;
        let ty = 0;
        if (el === current) {
          // El rect ya incluye el corrimiento: se lo resta para medir desde el lugar real.
          const r = el.getBoundingClientRect();
          tx = (mx - (r.left - s.x + r.width / 2)) * PULL;
          ty = (my - (r.top - s.y + r.height / 2)) * PULL;
        }
        s.x += (tx - s.x) * EASE;
        s.y += (ty - s.y) * EASE;
        if (el !== current && Math.abs(s.x) + Math.abs(s.y) < 0.1) {
          el.style.translate = "";
          moving.delete(el);
        } else {
          el.style.translate = `${s.x}px ${s.y}px`;
        }
      }
      if (moving.size) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const enter = (el) => {
      el.classList.remove("is-out", "is-reset");
      if (!moving.has(el)) moving.set(el, { x: 0, y: 0 });
      kick();
    };
    const leave = (el) => {
      el.classList.add("is-out");
      kick();
      setTimeout(() => {
        if (el === current || !el.classList.contains("is-out")) return;
        el.classList.add("is-reset");
        el.classList.remove("is-out");
        void el.offsetWidth; // aplica la vuelta abajo sin transición antes de soltarla
        el.classList.remove("is-reset");
      }, OUT);
    };
    const set = (el) => {
      if (el === current) return;
      if (current) leave(current);
      current = el;
      if (el) enter(el);
    };

    const onMove = (e) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX;
      my = e.clientY;
      if (current) kick();
    };
    const onOver = (e) => {
      if (e.pointerType !== "mouse" || !mq.matches) return;
      set(e.target.closest?.(".btn") ?? null);
    };
    const onOut = () => set(null);
    const onChange = () => {
      if (!mq.matches) set(null);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("mouseleave", onOut);
    mq.addEventListener("change", onChange);

    return () => {
      cancelAnimationFrame(raf);
      for (const el of moving.keys()) el.style.translate = "";
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onOut);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  return null;
}
