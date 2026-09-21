import { REDUCED_MOTION } from "@/lib/media";

// Cortina entre páginas (docs/DISENO.md, 8). Lo que comparten el script del tema
// (lib/theme.js, que corre antes del primer pintado), el componente
// (components/Curtain.jsx) y styles/curtain.css.

// Dónde viaja el nombre del destino de una página a la otra.
export const CURTAIN_KEY = "curtain";

// Los mismos tiempos que --dur-curtain-in y --dur-curtain-out (styles/tokens.css):
// scripts/check.mjs controla antes de cada build que no se separen.
export const CURTAIN_MS = { in: 1000, out: 1050 };

// Por si la cortina se queda puesta (un error de JS, o llegar con la pestaña en
// segundo plano y sin frames): a los 4 s la página se destapa sola. Es el mismo
// respaldo que tiene el preloader, que también termina solo.
export const CURTAIN_FAILSAFE_MS = 4000;

// Hay cortina si el navegador sabe animar `d` en CSS y no hay reduce motion. Sin eso
// la navegación es la de siempre, que es lo que ya pasaba.
export const curtainSupported = () =>
  CSS.supports('d: path("M 0 0 z")') && !matchMedia(REDUCED_MOTION).matches;
