// Páginas propias de algunas secciones (docs/DISENO.md, 7.12), con su ruta en cada
// idioma: /trayectoria y /habilidades en español, /en/experience y /en/skills en
// inglés. Va en un módulo aparte y sin alias porque también lo lee next.config.mjs
// (para las reescrituras). Los helpers de rutas están en lib/i18n.js.
export const PAGES = {
  experience: { es: "trayectoria", en: "experience" },
  skills: { es: "habilidades", en: "skills" },
};
