import { Archivo } from "next/font/google";
import { THEME_COLORS, themeInitScript } from "@/lib/theme";
import { LOCALES, getT, homePath } from "@/lib/i18n";
import { NAV_SECTIONS, PERSON, SOCIAL } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Archivo variable: el eje de peso viene siempre; el de ancho (wdth, 62–125) hay que
// pedirlo, y es el que da los títulos angostos (docs/DISENO.md, sección 3).
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Estructura común de las páginas (la home de cada idioma y el 404 global): <html>
// con el idioma, el script del tema, el enlace para saltar al contenido, el nav, el
// <main> y el footer. `head` suma etiquetas propias de la página, como el JSON-LD.
export default function Document({ lang, head, children }) {
  const t = getT(lang);
  const other = LOCALES.find((l) => l !== lang);

  return (
    // La clase de la fuente va en <html>: --font (styles/tokens.css) se declara en
    // :root y usa var(--font-archivo), que tiene que existir en ese mismo elemento.
    <html lang={lang} className={archivo.variable} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- es el <head> de los root layouts del App Router; la regla solo lo reconoce dentro de app/ */}
      <head>
        <meta name="theme-color" content={THEME_COLORS.light} />
        {/* Tema guardado o del sistema, antes del primer pintado (sin parpadeo). */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {head}
      </head>
      <body>
        <a className="skip" href="#contenido">
          {t("nav.skip")}
        </a>
        <Nav
          links={NAV_SECTIONS.map((s) => ({ href: `${homePath(lang)}#${s.id}`, label: t(s.key) }))}
          switchTo={{ lang: other, href: homePath(other) }}
          langLabel={t("nav.langToggle")}
          themeLabel={t("nav.themeToggle")}
          social={{ github: SOCIAL.github, linkedin: SOCIAL.linkedin, email: PERSON.email }}
        />
        <main id="contenido">{children}</main>
        <Footer t={t} />
      </body>
    </html>
  );
}
