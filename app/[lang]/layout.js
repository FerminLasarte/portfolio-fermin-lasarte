import "../globals.css";
import { Inter } from "next/font/google";
import { themeInitScript } from "@/lib/theme";
import { fill } from "@/lib/translations";
import { DEFAULT_LOCALE, LOCALES, OG_LOCALES, getT, homePath } from "@/lib/i18n";
import {
  NAV_SECTIONS,
  OTHER_SKILLS,
  PERSON,
  ROLE,
  ROLE_SHORT,
  SITE_URL,
  SKILLS,
  SOCIAL,
  STATS,
} from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import PremiumCursor from "@/components/PremiumCursor";
import RevealObserver from "@/components/RevealObserver";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

// Se prerenderiza una página por idioma; cualquier otro segmento da 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const TITLE = `${PERSON.name} — ${ROLE_SHORT}`;

const describe = (t) =>
  fill(t("meta.description"), { name: PERSON.name, role: ROLE, apps: STATS.appsLive });

// URL absoluta de la home en cada idioma ("/" queda sin barra final, como SITE_URL).
const absoluteUrl = (lang) => (lang === DEFAULT_LOCALE ? SITE_URL : `${SITE_URL}${homePath(lang)}`);

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = getT(lang);
  const description = describe(t);

  return {
    metadataBase: new URL(SITE_URL),
    title: TITLE,
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
      url: absoluteUrl(lang),
      title: TITLE,
      description,
      images: [
        {
          url: "/assets/foto_perfil.jpg",
          width: 560,
          height: 715,
          alt: fill(t("meta.ogAlt"), { title: TITLE }),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SOCIAL.twitter,
      creator: SOCIAL.twitter,
      title: TITLE,
      description,
      images: ["/assets/foto_perfil.jpg"],
    },
    icons: {
      icon: { url: "/favicon.svg", type: "image/svg+xml" },
    },
  };
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const t = getT(lang);
  const other = LOCALES.find((l) => l !== lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON.name,
    url: SITE_URL,
    jobTitle: ROLE,
    description: describe(t),
    knowsAbout: [...SKILLS.map((s) => s.name), ...OTHER_SKILLS],
    image: `${SITE_URL}/assets/foto_perfil.jpg`,
    sameAs: [SOCIAL.github, SOCIAL.linkedin],
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#F5F5F7" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        {/* Apply saved/preferred theme before first paint to avoid flashing. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.variable}>
        <BackgroundOrbs />
        <Nav
          links={NAV_SECTIONS.map((s) => ({ href: `${homePath(lang)}#${s.id}`, label: t(s.key) }))}
          switchTo={{ lang: other, href: homePath(other) }}
          langLabel={t("nav.langToggle")}
          themeLabel={t("nav.themeToggle")}
        />
        {children}
        <Footer t={t} />
        <PremiumCursor />
        <RevealObserver />
      </body>
    </html>
  );
}
