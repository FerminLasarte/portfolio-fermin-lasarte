"use client";

import { useEffect } from "react";

const WANTED = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const PULL = 0.3; // qué parte de la distancia al centro se corre el botón hacia el mouse
const PULL_LG = 0.5; // las píldoras del cierre (.btn--lg): más imán
const REACH = 0.7; // las del cierre atraen desde 0,7× su ancho del centro, como douglus
const EASE = 0.1; // por frame, como en douglus
// ms hasta bajar el relleno sin transición: los 400ms de su salida por arriba (.btn.is-out
// en styles/base.css) más 20 de margen, para que no se corte antes de terminar.
const OUT = 420;

// Botones de douglus (docs/DISENO.md, 7.6). El relleno que sube y el salto del texto
// los hace el CSS con :hover; esto suma lo que el CSS no puede:
//  - el imán: el botón activo se corre hacia el mouse y al soltarlo vuelve a su
//    lugar, con retraso. Los botones comunes se activan con el mouse encima; las
//    píldoras del cierre, desde antes de tocarlas (a 0,7× su ancho del centro), y se
//    corren más;
//  - .is-on: el relleno del botón activo, aunque el mouse todavía no esté encima;
//  - la salida por arriba: al soltarlo, el relleno sigue subiendo (.is-out) en vez de
//    volver a bajar, y después vuelve abajo sin transición (.is-reset).
// Solo con mouse y sin reduce motion. Listeners delegados; el requestAnimationFrame se
// detiene cuando ningún botón se está moviendo.
export default function Magnet() {
  useEffect(() => {
    const mq = matchMedia(WANTED);
    const moving = new Map(); // botón → { x, y }: el corrimiento actual
    const reachable = document.getElementsByClassName("btn--lg");
    let near = false; // si la sección de las píldoras del cierre está a la vista
    let current = null; // el botón activo
    let over = null; // el botón que está debajo del mouse
    let mx = 0;
    let my = 0;
    let raf = 0;

    // Centro y ancho del botón en su lugar real (el rect ya incluye el corrimiento).
    const home = (el) => {
      const r = el.getBoundingClientRect();
      const s = moving.get(el);
      return { x: r.left - (s?.x ?? 0) + r.width / 2, y: r.top - (s?.y ?? 0) + r.height / 2, w: r.width };
    };

    const frame = () => {
      raf = 0;
      for (const [el, s] of moving) {
        let tx = 0;
        let ty = 0;
        if (el === current) {
          const c = home(el);
          const pull = el.classList.contains("btn--lg") ? PULL_LG : PULL;
          tx = (mx - c.x) * pull;
          ty = (my - c.y) * pull;
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
      el.classList.add("is-on");
      if (!moving.has(el)) moving.set(el, { x: 0, y: 0 });
      kick();
    };
    const leave = (el) => {
      el.classList.remove("is-on");
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

    // La píldora del cierre más cercana que esté a su alcance. Mide todas en cada
    // movimiento del mouse, así que solo mientras su sección se ve (R-M16).
    const nearest = () => {
      if (!near) return null;
      let best = null;
      let bestD = Infinity;
      for (const el of reachable) {
        const c = home(el);
        const d = Math.hypot(mx - c.x, my - c.y);
        if (d < REACH * c.w && d < bestD) {
          best = el;
          bestD = d;
        }
      }
      return best;
    };
    const update = () => {
      if (!mq.matches) return set(null);
      set(over && !over.classList.contains("btn--lg") ? over : (nearest() ?? over));
    };

    const onMove = (e) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX;
      my = e.clientY;
      update();
      if (current) kick();
    };
    const onOver = (e) => {
      if (e.pointerType !== "mouse") return;
      over = e.target.closest?.(".btn") ?? null;
      update();
    };
    const onOut = () => {
      over = null;
      set(null);
    };
    const onChange = () => {
      if (!mq.matches) set(null);
    };

    // Se observa la sección y no cada píldora: "Copiar email" aparece recién al
    // hidratar. Al salir de la vista, la píldora que atraía de lejos se suelta.
    const seen = new Set();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) seen.add(e.target);
        else seen.delete(e.target);
      }
      near = seen.size > 0;
      update();
    });
    new Set([...reachable].map((el) => el.closest("section") ?? el)).forEach((s) => io.observe(s));

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("mouseleave", onOut);
    mq.addEventListener("change", onChange);

    return () => {
      io.disconnect();
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
