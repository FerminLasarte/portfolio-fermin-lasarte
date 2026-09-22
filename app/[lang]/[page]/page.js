import {
  DEFAULT_LOCALE,
  LOCALES,
  PAGE_TEXT,
  getT,
  homeUrl,
  pageId,
  pagePath,
  pageUrl,
  shareMeta,
} from "@/lib/i18n";
import { PAGES } from "@/lib/pages.mjs";
import { PERSON } from "@/lib/site";
import ProjectsPage from "@/components/ProjectsPage";
import ExperiencePage from "@/components/ExperiencePage";
import SkillsPage from "@/components/SkillsPage";
import JsonLd from "@/components/JsonLd";

// Páginas propias (docs/DISENO.md, 7.12): qué componente muestra cada una. Los textos
// de su metadata están en PAGE_TEXT (lib/i18n.js), compartidos con su imagen de Open
// Graph (opengraph-image.js, en esta misma carpeta).
const VIEWS = {
  projects: ProjectsPage,
  experience: ExperiencePage,
  skills: SkillsPage,
};

// Una página por idioma con la ruta de ese idioma (/trayectoria, /en/experience);
// cualquier otro segmento da el 404 global.
export const dynamicParams = false;

export function generateStaticParams({ params: { lang } }) {
  return Object.values(PAGES).map((slugs) => ({ page: slugs[lang] }));
}

export async function generateMetadata({ params }) {
  const { lang, page } = await params;
  const id = pageId(lang, page);
  const t = getT(lang);
  const title = `${t(PAGE_TEXT[id].title)} · ${PERSON.name}`;
  const description = t(PAGE_TEXT[id].description);

  return {
    title,
    description,
    alternates: {
      canonical: pagePath(lang, id),
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, pagePath(l, id)])),
        "x-default": pagePath(DEFAULT_LOCALE, id),
      },
    },
    ...shareMeta(lang, { url: pageUrl(lang, id), title, description }),
  };
}

export default async function Page({ params }) {
  const { lang, page } = await params;
  const id = pageId(lang, page);
  const Component = VIEWS[id];
  const t = getT(lang);

  // Migas de pan para los buscadores: Inicio › la página (R-M25).
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("page.home"), item: homeUrl(lang) },
      { "@type": "ListItem", position: 2, name: t(PAGE_TEXT[id].title), item: pageUrl(lang, id) },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <Component t={t} lang={lang} />
    </>
  );
}
