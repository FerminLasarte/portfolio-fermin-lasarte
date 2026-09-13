import { translations } from "@/lib/translations";
import { SITE_URL } from "@/lib/site";

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

// Traductor del idioma. Si la clave no existe devuelve `fallback` (por defecto,
// la propia clave).
export function getT(lang) {
  const dict = translations[lang];
  return (key, fallback = key) => dict[key] ?? fallback;
}