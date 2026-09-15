// Scroll suave (docs/DISENO.md, 7.10). components/SmoothScroll.jsx guarda acá su
// instancia de Lenis, así las anclas y "Volver arriba" usan la misma inercia que la
// rueda. Sin Lenis (táctil, reduce motion) se usa el scroll nativo.
let lenis = null;

export function setLenis(instance) {
  lenis = instance;
}

// La curva de douglus para los saltos largos: 1 − (1 − t)³.
const easeOutCubic = (t) => 1 - (1 - t) ** 3;

// Lleva el documento a `top` con animación. Lo que se hace con teclado no pasa por
// acá: tiene que ser inmediato (scrollTo con behavior "instant").
export function smoothScrollTo(top) {
  if (lenis) {
    lenis.scrollTo(top, { duration: 1.2, easing: easeOutCubic });
    return;
  }
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: reduce ? "instant" : "smooth" });
}
