import { notFound } from "next/navigation";
import {
  DEFAULT_LOCALE,
  LOCALES,
  getT,
  homeUrl,
  pageId,
  pageUrl,
  projectPath,
  projectUrl,
  shareMeta,
} from "@/lib/i18n";
import { PAGES } from "@/lib/pages.mjs";
import { LD_ID, PERSON, PROJECTS } from "@/lib/site";
import ProjectPage from "@/components/ProjectPage";
import JsonLd from "@/components/JsonLd";

// Página de cada proyecto: /trabajos/<id> y /en/work/<id> (docs/DISENO.md, 7.12).
// El slug es el `id` del proyecto y es el mismo en los dos idiomas, así el botón de
// idioma se queda en el proyecto (components/Nav.jsx).
export const dynamicParams = false;

// Recibe el idioma del layout de [lang] y devuelve también el segmento de la página,
// porque [page] no tiene layout propio que lo genere.
export function generateStaticParams({ params: { lang } }) {
  return PROJECTS.map((project) => ({ page: PAGES.projects[lang], slug: project.id }));
}

// El proyecto de una URL, o nada si el segmento no es el de Proyectos en ese idioma
// (/trayectoria/loquesea no existe).
const find = (lang, page, slug) =>
  pageId(lang, page) === "projects" ? PROJECTS.find((project) => project.id === slug) : undefined;

export async function generateMetadata({ params }) {
  const { lang, page, slug } = await params;
  const project = find(lang, page, slug);
  if (!project) return {};
  const t = getT(lang);
  const title = `${t(`projects.${slug}.title`, project.name)} · ${PERSON.name}`;
  const description = t(`projects.${slug}.solution`);

  return {
    title,
    description,
    alternates: {
      canonical: projectPath(lang, slug),
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, projectPath(l, slug)])),
        "x-default": projectPath(DEFAULT_LOCALE, slug),
      },
    },
    ...shareMeta(lang, { url: projectUrl(lang, slug), title, description }),
  };
}

export default async function Page({ params }) {
  const { lang, page, slug } = await params;
  const project = find(lang, page, slug);
  if (!project) notFound();
  const t = getT(lang);
  const name = t(`projects.${slug}.name`, project.name);
  const url = projectUrl(lang, slug);

  // El proyecto y las migas de pan (Inicio › Proyectos › el proyecto, R-M25). Las apps
  // van como SoftwareApplication y el resto, como CreativeWork; el autor es la persona
  // que define el layout.
  const app = project.platforms?.length > 0;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": app ? "SoftwareApplication" : "CreativeWork",
        name,
        url,
        description: t(`projects.${slug}.solution`),
        inLanguage: lang,
        author: { "@id": LD_ID.person },
        keywords: project.tags.join(", "),
        sameAs: project.links.map((link) => link.url),
        ...(app
          ? {
              applicationCategory: "MobileApplication",
              operatingSystem: project.platforms.map((p) => (p === "ios" ? "iOS" : "Android")).join(", "),
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("page.home"), item: homeUrl(lang) },
          { "@type": "ListItem", position: 2, name: t("projects.title"), item: pageUrl(lang, "projects") },
          { "@type": "ListItem", position: 3, name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ProjectPage project={project} t={t} lang={lang} />
    </>
  );
}
