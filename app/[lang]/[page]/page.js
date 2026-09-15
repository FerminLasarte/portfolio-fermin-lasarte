import { notFound } from "next/navigation";
import { DEFAULT_LOCALE, LOCALES, OG_LOCALES, getT, pageId, pagePath, pageUrl } from "@/lib/i18n";
import { PAGES } from "@/lib/pages.mjs";
import { PERSON, SOCIAL } from "@/lib/site";
import ExperiencePage from "@/components/ExperiencePage";

// Páginas propias (docs/DISENO.md, 7.12): qué componente muestra cada una y con qué
// textos se arma su metadata.
const VIEWS = {
  experience: { Component: ExperiencePage, title: "exp.title", description: "exp.pageDescription" },
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
  const title = `${t(VIEWS[id].title)} · ${PERSON.name}`;
  const description = t(VIEWS[id].description);

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
    openGraph: {
      type: "website",
      siteName: PERSON.name,
      locale: OG_LOCALES[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALES[l]),
      url: pageUrl(lang, id),
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
  };
}

export default async function Page({ params }) {
  const { lang, page } = await params;
  const id = pageId(lang, page);
  if (!id) notFound();
  const { Component } = VIEWS[id];
  return <Component t={getT(lang)} lang={lang} />;
}
