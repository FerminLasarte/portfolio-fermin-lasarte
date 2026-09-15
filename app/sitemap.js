import { DEFAULT_LOCALE, LOCALES, homeUrl, pageUrl } from "@/lib/i18n";
import { PAGES } from "@/lib/pages.mjs";

// /sitemap.xml: la home y las páginas propias de cada idioma, con sus alternativas
// (hreflang).
export default function sitemap() {
  const homes = Object.fromEntries(LOCALES.map((l) => [l, homeUrl(l)]));
  const home = LOCALES.map((lang) => ({
    url: homeUrl(lang),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: lang === DEFAULT_LOCALE ? 1 : 0.8,
    alternates: { languages: homes },
  }));
  const pages = Object.keys(PAGES).flatMap((id) => {
    const languages = Object.fromEntries(LOCALES.map((l) => [l, pageUrl(l, id)]));
    return LOCALES.map((lang) => ({
      url: pageUrl(lang, id),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: lang === DEFAULT_LOCALE ? 0.7 : 0.6,
      alternates: { languages },
    }));
  });
  return [...home, ...pages];
}
