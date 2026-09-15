// Scroll suave (docs/DISENO.md, 7.10). components/SmoothScroll.jsx guarda acá su
// instancia de Lenis, así las anclas y "Volver arriba" usan la misma inercia que la
// rueda. Sin Lenis (táctil, reduce motion) se usa el scroll nativo.
import { REDUCED_MOTION } from "@/lib/media";

let lenis = null;
let wake = () => {};

// `start` arranca el requestAnimationFrame de SmoothScroll, que solo corre mientras
// Lenis mueve el scroll (R-M16): un salto de smoothScrollTo tiene que despertarlo.
export function setLenis(instance, start = () => {}) {
  lenis = instance;
  wake = start;
}

// Si la rueda pasa por Lenis (puntero fino, sin reduce motion). TrackController lo usa
// para que las anclas en vertical también vayan con la misma inercia (R-M12).
export const hasLenis = () => lenis !== null;

// La curva de douglus para los saltos largos: 1 − (1 − t)³.
const easeOutCubic = (t) => 1 - (1 - t) ** 3;

// Lleva el documento a `top` con animación. Lo que se hace con teclado no pasa por
// acá: tiene que ser inmediato (scrollTo con behavior "instant").
export function smoothScrollTo(top) {
  if (lenis) {
    lenis.scrollTo(top, { duration: 1.2, easing: easeOutCubic });
    wake();
    return;
  }
  const reduce = matchMedia(REDUCED_MOTION).matches;
  window.scrollTo({ top, behavior: reduce ? "instant" : "smooth" });
}
