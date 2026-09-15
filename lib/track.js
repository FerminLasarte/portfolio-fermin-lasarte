// Condiciones del modo horizontal (docs/DISENO.md, 6.2). Es la misma media query que
// usan styles/track.css, nav.css, hero.css, projects.css, trajectory.css, skills.css,
// contact.css, footer.css y motion.css (el CSS no puede importarla): si cambia,
// cambiarla en los diez lugares. Pide `screen` para que al imprimir la página sea
// vertical (R-I9, styles/print.css).
// Además hace falta `html.js`, que pone lib/theme.js antes del primer pintado.
export const HORIZONTAL_QUERY =
  "screen and (min-width: 64rem) and (min-height: 42.5rem) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
