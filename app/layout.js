import "./globals.css";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageProvider";
import { themeInitScript } from "@/lib/theme";
import { fill, translations } from "@/lib/translations";
import {
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

// La metadata se genera en español: el HTML se prerenderiza en un solo idioma
// (el idioma por ruta llega con I14).
const es = translations.es;
const TITLE = `${PERSON.name} — ${ROLE_SHORT}`;
const DESCRIPTION = fill(es["meta.description"], {
  name: PERSON.name,
  role: ROLE,
  apps: STATS.appsLive,
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: PERSON.name,
    locale: "es_AR",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/assets/foto_perfil.jpg",
        width: 560,
        height: 715,
        alt: fill(es["meta.ogAlt"], { title: TITLE }),
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SOCIAL.twitter,
    creator: SOCIAL.twitter,
    title: TITLE,
    description: DESCRIPTION,
    images: ["/assets/foto_perfil.jpg"],
  },
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg+xml" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON.name,
  url: SITE_URL,
  jobTitle: ROLE,
  description: DESCRIPTION,
  knowsAbout: [...SKILLS.map((s) => s.name), ...OTHER_SKILLS],
  image: `${SITE_URL}/assets/foto_perfil.jpg`,
  sameAs: [SOCIAL.github, SOCIAL.linkedin],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
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
        <LanguageProvider>
          <BackgroundOrbs />
          <Nav />
          {children}
          <Footer />
          <PremiumCursor />
          <RevealObserver />
        </LanguageProvider>
      </body>
    </html>
  );
}
