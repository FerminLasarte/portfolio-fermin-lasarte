"use client";

import { useEffect, useRef } from "react";
import { REDUCED_MOTION } from "@/lib/media";

const TRAILS = 8; // copias de la estela (douglus usa 10)
const TRAIL_STEP = 30; // px de arrastre entre una copia y la siguiente
const FRICTION = 0.92; // por frame, al soltar
const BAND = 0.25; // pasado el borde, cuánto se mueve por cada px que se tira
const PULL = 0.18; // fuerza con la que vuelve adentro del hero
const TRAIL_FADE = 400; // ms que tarda en desvanecerse cada copia de la estela

// Foto arrastrable del hero (docs/DISENO.md, 7.9), como la de douglus: al presionar, el
// marco se achica y la imagen se agranda; al moverla deja una estela de copias; al
// soltarla sigue con inercia, rebota contra los bordes del hero y queda donde frena.
// Vuelve a su lugar solo si el foco del teclado entra al hero (para no tapar un botón
// enfocado) o si cambia el tamaño de la ventana. Solo con mouse: en táctil, arrastrar
// es scrollear. `label` es el texto que muestra el cursor propio sobre la foto.
export default function DraggablePhoto({ label, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const drag = ref.current;
    const box = drag.parentElement;
    const hero = drag.closest(".hero");
    const img = drag.querySelector("img");
    const reduce = matchMedia(REDUCED_MOTION);
    // La curva de la estela sale del token (R-M32): la Web Animations API no lee var().
    const easeOut = getComputedStyle(drag).getPropertyValue("--ease-out").trim();

    const trails = Array.from({ length: TRAILS }, () => {
      const trail = document.createElement("img");
      trail.src = img.currentSrc || img.src;
      trail.alt = "";
      trail.className = "drag__trail";
      trail.setAttribute("aria-hidden", "true");
      box.insertBefore(trail, drag);
      return trail;
    });

    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;
    let offsetX = 0;
    let offsetY = 0;
    let lastX = 0;
    let lastY = 0;
    let lastT = 0;
    let walked = 0;
    let next = 0;
    let down = false;
    let glide = 0;
    let bounds;

    const place = () => {
      drag.style.translate = `${x}px ${y}px`;
    };
    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
    const band = (v, min, max) =>
      v < min ? min - (min - v) * BAND : v > max ? max + (v - max) * BAND : v;
    const pull = (v, min, max) => (v < min ? (min - v) * PULL : v > max ? (max - v) * PULL : 0);

    // Límites: el hero, sin la franja que tapan el nav y la franja inferior.
    const limits = () => {
      const h = hero.getBoundingClientRect();
      const b = box.getBoundingClientRect();
      const top = Math.max(h.top, document.querySelector(".nav")?.offsetHeight ?? 0);
      const bottom = Math.min(h.bottom, innerHeight - (document.querySelector(".strip")?.offsetHeight ?? 0));
      return { x0: h.left - b.left, x1: h.right - b.right, y0: top - b.top, y1: bottom - b.bottom };
    };

    const trail = () => {
      const t = trails[next++ % trails.length];
      t.style.translate = `${x}px ${y}px`;
      t.animate([{ opacity: 1 }, { opacity: 1, offset: 0.25 }, { opacity: 0 }], {
        duration: TRAIL_FADE,
        easing: easeOut,
      });
    };

    const coast = () => {
      vx *= FRICTION;
      vy *= FRICTION;
      x += vx;
      y += vy;
      const px = pull(x, bounds.x0, bounds.x1);
      const py = pull(y, bounds.y0, bounds.y1);
      if (px) {
        x += px;
        vx *= 0.6;
      }
      if (py) {
        y += py;
        vy *= 0.6;
      }
      place();
      if (Math.abs(vx) + Math.abs(vy) > 0.05 || Math.abs(px) + Math.abs(py) > 0.05) {
        glide = requestAnimationFrame(coast);
      }
    };

    const goHome = () => {
      cancelAnimationFrame(glide);
      if (!x && !y) return;
      drag.style.transition = reduce.matches ? "" : "translate var(--dur-enter) var(--ease-expo)";
      x = 0;
      y = 0;
      place();
    };

    const onDown = (e) => {
      if (e.button !== 0 || e.pointerType !== "mouse") return;
      e.preventDefault();
      cancelAnimationFrame(glide);
      drag.style.transition = "";
      drag.setPointerCapture(e.pointerId);
      down = true;
      drag.classList.add("is-down");
      bounds = limits();
      offsetX = e.clientX - x;
      offsetY = e.clientY - y;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = e.timeStamp;
      vx = 0;
      vy = 0;
      walked = 0;
    };

    const onMove = (e) => {
      if (!down) return;
      x = band(e.clientX - offsetX, bounds.x0, bounds.x1);
      y = band(e.clientY - offsetY, bounds.y0, bounds.y1);
      const dt = Math.max(1, e.timeStamp - lastT);
      vx = ((e.clientX - lastX) / dt) * 16;
      vy = ((e.clientY - lastY) / dt) * 16;
      walked += Math.hypot(e.clientX - lastX, e.clientY - lastY);
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = e.timeStamp;
      if (walked > TRAIL_STEP && !reduce.matches) {
        walked = 0;
        trail();
      }
      place();
    };

    const onUp = (e) => {
      if (!down) return;
      down = false;
      drag.classList.remove("is-down");
      if (reduce.matches) {
        x = clamp(x, bounds.x0, bounds.x1);
        y = clamp(y, bounds.y0, bounds.y1);
        place();
        return;
      }
      if (e.timeStamp - lastT > 80) {
        vx = 0; // se soltó quieta: sin inercia
        vy = 0;
      }
      glide = requestAnimationFrame(coast);
    };

    // Con otro tamaño de ventana cambian los límites: vuelve a su lugar con la misma
    // animación que al entrar el foco (R-M33 de la re-auditoría; antes volvía de golpe).
    const onResize = () => {
      if (!down) goHome();
    };

    drag.addEventListener("pointerdown", onDown);
    drag.addEventListener("pointermove", onMove);
    drag.addEventListener("pointerup", onUp);
    drag.addEventListener("pointercancel", onUp);
    hero.addEventListener("focusin", goHome);
    addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(glide);
      drag.removeEventListener("pointerdown", onDown);
      drag.removeEventListener("pointermove", onMove);
      drag.removeEventListener("pointerup", onUp);
      drag.removeEventListener("pointercancel", onUp);
      hero.removeEventListener("focusin", goHome);
      removeEventListener("resize", onResize);
      trails.forEach((t) => t.remove());
    };
  }, []);

  return (
    <div ref={ref} className="drag" data-cursor="drag" data-cursor-label={label}>
      <div className="drag__frame">{children}</div>
    </div>
  );
}
