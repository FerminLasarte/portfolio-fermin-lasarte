import { DEFAULT_LOCALE, LOCALES, homeUrl, pageUrl, projectUrl } from "@/lib/i18n";
import { PAGES } from "@/lib/pages.mjs";
import { PROJECTS } from "@/lib/site";

// /sitemap.xml: la home, las páginas propias y la de cada proyecto, en los dos idiomas,
// con sus alternativas (hreflang), x-default incluido, como en el <head>. Sin
// `lastModified`: no hay una fecha real por página, y la del build le decía a los
// buscadores que todo cambiaba en cada deploy (R-M24 de la re-auditoría).
const alternates = (url) => ({
  languages: {
    ...Object.fromEntries(LOCALES.map((l) => [l, url(l)])),
    "x-default": url(DEFAULT_LOCALE),
  },
});

export default function sitemap() {
  const home = LOCALES.map((lang) => ({
    url: homeUrl(lang),
    changeFrequency: "monthly",
    priority: lang === DEFAULT_LOCALE ? 1 : 0.8,
    alternates: alternates(homeUrl),
  }));
  const pages = Object.keys(PAGES).flatMap((id) => {
    const url = (l) => pageUrl(l, id);
    return LOCALES.map((lang) => ({
      url: url(lang),
      changeFrequency: "monthly",
      priority: lang === DEFAULT_LOCALE ? 0.7 : 0.6,
      alternates: alternates(url),
    }));
  });
  const projects = PROJECTS.flatMap((project) => {
    const url = (l) => projectUrl(l, project.id);
    return LOCALES.map((lang) => ({
      url: url(lang),
      changeFrequency: "monthly",
      priority: lang === DEFAULT_LOCALE ? 0.6 : 0.5,
      alternates: alternates(url),
    }));
  });
  return [...home, ...pages, ...projects];
}
