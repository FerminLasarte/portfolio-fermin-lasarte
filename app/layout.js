import "./globals.css";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageProvider";
import { themeInitScript } from "@/lib/theme";
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

const SITE_URL = "https://ferminlasarte.github.io/portfolio-fermin-lasarte";
const DESCRIPTION =
  "Portfolio de Fermin Lasarte. iOS & Cross-Platform Mobile Engineer especializado en Swift, Flutter y Backend. 2 apps publicadas en App Store y Google Play.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Fermin Lasarte — iOS & Mobile Engineer",
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Fermin Lasarte",
    locale: "es_ES",
    url: SITE_URL,
    title: "Fermin Lasarte — iOS & Mobile Engineer",
    description: DESCRIPTION,
    images: [
      {
        url: "/assets/foto_perfil.jpeg",
        width: 1200,
        height: 630,
        alt: "Fermin Lasarte — iOS & Mobile Engineer. Swift, Flutter & Backend Developer.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ferminlasarte",
    creator: "@ferminlasarte",
    title: "Fermin Lasarte — iOS & Mobile Engineer",
    description: DESCRIPTION,
    images: ["/assets/foto_perfil.jpeg"],
  },
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg+xml" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fermin Lasarte",
  url: SITE_URL,
  jobTitle: "iOS & Cross-Platform Mobile Engineer",
  description: DESCRIPTION,
  knowsAbout: ["Swift", "SwiftUI", "Flutter", "Dart", "Firebase", "Java", "Python", "FastAPI"],
  image: `${SITE_URL}/assets/foto_perfil.jpeg`,
  sameAs: ["https://github.com/FerminLasarte", "https://linkedin.com/in/ferminlasarte/"],
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
