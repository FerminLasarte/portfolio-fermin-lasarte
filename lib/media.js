// Media queries del JS, para no escribirlas a mano en cada componente (R-M31 de la
// re-auditoría). La del modo horizontal está en lib/track.js. Las del CSS no pueden
// importarse; scripts/check.mjs controla que las copias de la horizontal no se separen.
//
// Hay dos criterios de "mouse", a propósito:
//  - FINE_POINTER: el puntero principal es preciso (mouse o trackpad). Decide el modo
//    horizontal y el scroll suave, que dependen de cómo se mueve la página.
//  - HOVER_POINTER: además puede pasar por encima sin tocar. Decide el cursor propio y
//    el imán, que reaccionan al mouse encima. En una portátil táctil pueden no coincidir.
// Y uno más, por evento: `pointerType === "mouse"` (el cursor, el imán y la foto), porque
// en un equipo con mouse y pantalla táctil cada evento dice con qué se hizo.
export const FINE_POINTER = "(pointer: fine)";
export const HOVER_POINTER = "(hover: hover) and (pointer: fine)";
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
