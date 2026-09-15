// Condiciones del modo horizontal (docs/DISENO.md, 6.2). Es la misma media query que
// usa styles/track.css (el CSS no puede importarla): si cambia, cambiar las dos.
// Además hace falta `html.js`, que pone lib/theme.js antes del primer pintado.
export const HORIZONTAL_QUERY =
  "(min-width: 64rem) and (min-height: 42.5rem) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
