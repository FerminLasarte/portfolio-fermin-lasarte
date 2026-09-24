// Páginas propias de algunas secciones (docs/DISENO.md, 7.12), con su ruta en cada
// idioma: /trabajos, /trayectoria y /habilidades en español, /en/work, /en/experience
// y /en/skills en inglés. Va en un módulo aparte y sin alias porque también lo lee next.config.mjs
// (para las reescrituras). Los helpers de rutas están en lib/i18n.js.
//
// `projects` (Trabajos) es además la única con hijas: cada trabajo tiene su página en
// /trabajos/<id> (y /en/work/<id>, con el mismo slug en los dos idiomas, que es lo que
// deja que el botón de idioma se quede en el mismo trabajo).
export const PAGES = {
  projects: { es: "trabajos", en: "work" },
  experience: { es: "trayectoria", en: "experience" },
  skills: { es: "habilidades", en: "skills" },
};

// Rutas viejas de una página, que next.config.mjs redirige (301) a la actual, también
// las de sus hijas: así no se rompen los enlaces que ya circulan. Proyectos pasó a
// llamarse Trabajos el 2026-09-24.
export const MOVED = [{ id: "projects", es: "proyectos", en: "projects" }];
