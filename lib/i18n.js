import { translations } from "@/lib/translations";
import { PERSON, SITE_URL, SOCIAL, STATS } from "@/lib/site";
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

// Página de un trabajo: /trabajos/<slug> y /en/work/<slug>. El slug es el `id`
// del trabajo (lib/site.js) y es el mismo en los dos idiomas.
export const projectPath = (lang, slug) => `${pagePath(lang, "projects")}/${slug}`;
export const projectUrl = (lang, slug) => `${SITE_URL}${projectPath(lang, slug)}`;

// Ancla de la fila de un trabajo en el índice de la home (#trabajo-vault): la pone el
// índice y la usa la página del trabajo para volver a esa fila.
export const projectAnchor = (slug) => `trabajo-${slug}`;

// "app en producción" o "apps en producción", según STATS.appsLive y las reglas de
// plural del idioma. Lo usan las cifras de Proyectos, la descripción y la imagen de
// Open Graph, así "1 apps" no puede aparecer en ninguna.
export const appsLabel = (lang, t) =>
  t(new Intl.PluralRules(lang).select(STATS.appsLive) === "one" ? "projects.stat.apps.one" : "projects.stat.apps");

// Claves del título y la descripción de cada página propia: las usan su metadata
// (app/[lang]/[page]/page.js) y su imagen de Open Graph (opengraph-image.js).
export const PAGE_TEXT = {
  projects: { title: "projects.title", description: "projects.pageDescription" },
  experience: { title: "exp.title", description: "exp.pageDescription" },
  skills: { title: "skills.title", description: "skills.pageDescription" },
};

// Open Graph y la tarjeta de X de una página, iguales en la home (app/[lang]/layout.js)
// y en las páginas propias (app/[lang]/[page]/page.js). La imagen la pone cada
// opengraph-image.js.
export const shareMeta = (lang, { url, title, description }) => ({
  openGraph: {
    type: "website",
    siteName: PERSON.name,
    locale: OG_LOCALES[lang],
    alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALES[l]),
    url,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    site: SOCIAL.twitter,
    creator: SOCIAL.twitter,
    title,
    description,
  },
});

// Traductor del idioma. Si la clave no existe devuelve `fallback` (por defecto,
// la propia clave).
export function getT(lang) {
  const dict = translations[lang];
  return (key, fallback = key) => dict[key] ?? fallback;
}