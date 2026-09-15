import { notFound } from "next/navigation";
import { LOCALES, PAGE_TEXT, getT, pageId } from "@/lib/i18n";
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";
import { PAGES } from "@/lib/pages.mjs";
import { PERSON, SITE_TITLE } from "@/lib/site";

// Imagen de Open Graph de cada página propia (R-I6 de la re-auditoría): el mismo diseño
// que la de la home (lib/og.js), con el nombre arriba, la descripción de la página y su
// título en grande. X usa la misma. Sin este archivo, el openGraph de la página
// reemplazaba entero al del layout y la página quedaba sin imagen.
export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = SITE_TITLE;

// Una imagen por página y por idioma, prerenderizada; cualquier otra ruta da 404.
export const dynamicParams = false;

export function generateStaticParams({ params } = {}) {
  const langs = params?.lang ? [params.lang] : LOCALES;
  return langs.flatMap((lang) => Object.values(PAGES).map((slugs) => ({ lang, page: slugs[lang] })));
}

export default async function Image({ params }) {
  const { lang, page } = await params;
  const id = pageId(lang, page);
  if (!id) notFound();
  const t = getT(lang);
  return ogImage({
    top: PERSON.name,
    lead: t(PAGE_TEXT[id].description),
    words: [t(PAGE_TEXT[id].title)],
  });
}
