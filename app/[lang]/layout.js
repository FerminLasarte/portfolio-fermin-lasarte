import "../globals.css";
import { fill } from "@/lib/translations";
import { DEFAULT_LOCALE, LOCALES, OG_LOCALES, getT, homePath, homeUrl } from "@/lib/i18n";
import {
  ICONS,
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

// Se prerenderiza una página por idioma; cualquier otro segmento da 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}
const describe = (t) =>
  fill(t("meta.description"), { name: PERSON.name, role: ROLE, apps: STATS.appsLive });

// La imagen de Open Graph sale de opengraph-image.js (una por idioma).
export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = getT(lang);
  const description = describe(t);

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
    openGraph: {
      type: "website",
      siteName: PERSON.name,
      locale: OG_LOCALES[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALES[l]),
      url: homeUrl(lang),
      title: SITE_TITLE,
      description,
    },
    twitter: {
      card: "summary_large_image",
      site: SOCIAL.twitter,
      creator: SOCIAL.twitter,
      title: SITE_TITLE,
      description,
    },
    icons: ICONS,
  };
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON.name,
    url: SITE_URL,
    jobTitle: ROLE,
    description: describe(getT(lang)),
    knowsAbout: [...SKILLS.map((s) => s.name), ...OTHER_SKILLS],
    image: `${SITE_URL}/assets/foto_perfil.jpg`,
    sameAs: [SOCIAL.github, SOCIAL.linkedin],
  };

  return (
    <Document
      lang={lang}
      head={
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      }
    >
      {children}
    </Document>
  );
}
