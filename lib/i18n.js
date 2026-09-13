import { translations } from "@/lib/translations";

// Idiomas del sitio. El español va en "/" y el inglés en "/en": las páginas viven
// en app/[lang], y next.config reescribe "/" a "/es" (y redirige "/es" a "/").
// Este módulo importa el diccionario completo: usarlo solo en el servidor.
export const LOCALES = ["es", "en"];
export const DEFAULT_LOCALE = "es";

// Locale de Open Graph de cada idioma.
export const OG_LOCALES = { es: "es_AR", en: "en_US" };

// Ruta de la home en cada idioma.
export const homePath = (lang) => (lang === DEFAULT_LOCALE ? "/" : `/${lang}`);

// Traductor del idioma. Si la clave no existe devuelve `fallback` (por defecto,
// la propia clave).
export function getT(lang) {
  const dict = translations[lang];
  return (key, fallback = key) => dict[key] ?? fallback;
}
