import "../globals.css";
import { fill } from "@/lib/translations";
import { DEFAULT_LOCALE, LOCALES, appsLabel, getT, homePath, homeUrl, shareMeta } from "@/lib/i18n";
import {
  ICONS,
  LD_ID,
  OTHER_SKILLS,
  PERSON,
  ROLE,
  SITE_TITLE,
  SITE_URL,
  SKILLS,
  SOCIAL,
  STATS,
} from "@/lib/site";
import Document from "@/components/Document";
import JsonLd from "@/components/JsonLd";

// Se prerenderiza una página por idioma; cualquier otro segmento da 404.
export const dynamicParams = false;

// Las páginas se regeneran como máximo una vez por día (ISR), así el año del © y el
// "en curso" de Trayectoria cambian solos al pasar de año, sin esperar a un deploy
// (R-M27 de la re-auditoría). Vale para todas las páginas de este layout.
export const revalidate = 86400;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}
const describe = (lang, t) =>
  fill(t("meta.description"), { name: PERSON.name, role: ROLE, apps: STATS.appsLive, appsLabel: appsLabel(lang, t) });

// La imagen de Open Graph sale de opengraph-image.js (una por idioma).
export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = getT(lang);
  const description = describe(lang, t);

  return {
    metadataBase: new URL(SITE_URL),
    title: SITE_TITLE,
    description,
    alternates: {
      canonical: homePath(lang),
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, homePath(l)])),
        "x-default": homePath(DEFAULT_LOCALE),
      },
    },
    ...shareMeta(lang, { url: homeUrl(lang), title: SITE_TITLE, description }),
    icons: ICONS,
  };
}

// JSON-LD de todas las páginas: el sitio y la persona, con un `@id` que las páginas
// referencian (la home suma ProfilePage y las propias, BreadcrumbList; R-M25 de la
// re-auditoría).
export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const t = getT(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": LD_ID.website,
        url: SITE_URL,
        name: PERSON.name,
        inLanguage: LOCALES,
        publisher: { "@id": LD_ID.person },
      },
      {
        "@type": "Person",
        "@id": LD_ID.person,
        name: PERSON.name,
        url: SITE_URL,
        jobTitle: ROLE,
        description: describe(lang, t),
        image: `${SITE_URL}/assets/fermin.jpg`,
        knowsAbout: [...SKILLS.map((s) => s.name), ...OTHER_SKILLS],
        knowsLanguage: PERSON.languages,
        alumniOf: { "@type": "CollegeOrUniversity", name: t("edu.unicen.company") },
        homeLocation: { "@type": "Place", name: `${PERSON.city}, ${PERSON.country}` },
        sameAs: [SOCIAL.github, SOCIAL.linkedin],
      },
    ],
  };

  return (
    <Document lang={lang} head={<JsonLd data={jsonLd} />}>
      {children}
    </Document>
  );
}
