import { DEFAULT_LOCALE, LOCALES, homeUrl } from "@/lib/i18n";

// /sitemap.xml: la home de cada idioma, con sus alternativas (hreflang).
export default function sitemap() {
  const languages = Object.fromEntries(LOCALES.map((l) => [l, homeUrl(l)]));
  return LOCALES.map((lang) => ({
    url: homeUrl(lang),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: lang === DEFAULT_LOCALE ? 1 : 0.8,
    alternates: { languages },
  }));
}
