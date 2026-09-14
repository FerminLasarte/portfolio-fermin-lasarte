import { Inter } from "next/font/google";
import { themeInitScript } from "@/lib/theme";
import { LOCALES, getT, homePath } from "@/lib/i18n";
import { NAV_SECTIONS, PERSON, SOCIAL } from "@/lib/site";
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

// Estructura común de las páginas (la home de cada idioma y el 404 global): <html>
// con el idioma, el script del tema, el nav y el footer. `head` suma etiquetas
// propias de la página, como el JSON-LD.
export default function Document({ lang, head, children }) {
  const t = getT(lang);
  const other = LOCALES.find((l) => l !== lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- es el <head> de los root layouts del App Router; la regla solo lo reconoce dentro de app/ */}
      <head>
        <meta name="theme-color" content="#F5F5F7" />
        {/* Apply saved/preferred theme before first paint to avoid flashing. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {head}
      </head>
      <body className={inter.variable}>
        <BackgroundOrbs />
        <Nav
          links={NAV_SECTIONS.map((s) => ({ href: `${homePath(lang)}#${s.id}`, label: t(s.key) }))}
          switchTo={{ lang: other, href: homePath(other) }}
          langLabel={t("nav.langToggle")}
          themeLabel={t("nav.themeToggle")}
          social={{ github: SOCIAL.github, linkedin: SOCIAL.linkedin, email: PERSON.email }}
        />
        {children}
        <Footer t={t} />
        <PremiumCursor />
        <RevealObserver />
      </body>
    </html>
  );
}
