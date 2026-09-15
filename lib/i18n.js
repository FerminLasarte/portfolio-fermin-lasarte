import { translations } from "@/lib/translations";
import { SITE_URL } from "@/lib/site";
import { PAGES } from "@/lib/pages.mjs";

// Idiomas del sitio. El español va en "/" y el inglés en "/en": las páginas viven
// en app/[lang], y next.config reescribe "/" a "/es" (y redirige "/es" a "/").
// Este módulo importa el diccionario completo: usarlo solo en el servidor.
export const LOCALES = ["es", "en"];
export const DEFAULT_LOCALE = "es";

// Locale de Open Graph de cada idioma.
export const OG_LOCALES = { es: "es_AR", en: "en_US" };

// Ruta de la home en cada idioma.
export const homePath = (lang) => (lang === DEFAULT_LOCALE ? "/" : `/${lang}`);

// URL absoluta de la home en cada idioma (la de "/" queda sin barra final, como SITE_URL).
export const homeUrl = (lang) => (lang === DEFAULT_LOCALE ? SITE_URL : `${SITE_URL}${homePath(lang)}`);

// Páginas propias (lib/pages.mjs): su ruta y su URL absoluta en cada idioma
// ("/trayectoria", "/en/experience"), y qué página es un segmento de la URL.
export const pagePath = (lang, id) => `${lang === DEFAULT_LOCALE ? "" : `/${lang}`}/${PAGES[id][lang]}`;
export const pageUrl = (lang, id) => `${SITE_URL}${pagePath(lang, id)}`;
export const pageId = (lang, slug) => Object.keys(PAGES).find((id) => PAGES[id][lang] === slug);

// Claves del título y la descripción de cada página propia: las usan su metadata
// (app/[lang]/[page]/page.js) y su imagen de Open Graph (opengraph-image.js).
export const PAGE_TEXT = {
  experience: { title: "exp.title", description: "exp.pageDescription" },
  skills: { title: "skills.title", description: "skills.pageDescription" },
};

// Traductor del idioma. Si la clave no existe devuelve `fallback` (por defecto,
// la propia clave).
export function getT(lang) {
  const dict = translations[lang];
  return (key, fallback = key) => dict[key] ?? fallback;
}