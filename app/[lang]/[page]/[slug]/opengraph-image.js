import { notFound } from "next/navigation";
import { LOCALES, getT, pageId } from "@/lib/i18n";
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";
import { PAGES } from "@/lib/pages.mjs";
import { PERSON, PROJECTS, SITE_TITLE } from "@/lib/site";

// Imagen de Open Graph de cada proyecto: el mismo diseño que la de la home y la de las
// otras páginas propias (lib/og.js), con el nombre arriba, la solución como párrafo y
// el nombre del proyecto en grande. Sin este archivo, las páginas de proyecto heredaban
// la imagen de /trabajos y todas compartían la misma.
export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = SITE_TITLE;

export const dynamicParams = false;

export function generateStaticParams({ params } = {}) {
  const langs = params?.lang ? [params.lang] : LOCALES;
  return langs.flatMap((lang) =>
    PROJECTS.map((project) => ({ lang, page: PAGES.projects[lang], slug: project.id })),
  );
}

export default async function Image({ params }) {
  const { lang, page, slug } = await params;
  const project = pageId(lang, page) === "projects" && PROJECTS.find((p) => p.id === slug);
  if (!project) notFound();
  const t = getT(lang);

  return ogImage({
    top: PERSON.name,
    lead: t(`projects.${slug}.solution`),
    words: [t(`projects.${slug}.name`, project.name)],
  });
}
