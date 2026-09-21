import { archivo } from "@/lib/fonts";
import { THEME_COLORS, themeInitScript } from "@/lib/theme";
import { LOCALES, getT, homePath, pagePath } from "@/lib/i18n";
import { PAGES } from "@/lib/pages.mjs";
import { NAV_SECTIONS, PERSON, SOCIAL } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Magnet from "@/components/Magnet";
import SmoothScroll from "@/components/SmoothScroll";
import Curtain from "@/components/Curtain";
import { TAPADA } from "@/lib/curtain";

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
          brand={{ href: `${homePath(lang)}#sobre-mi`, label: PERSON.name, home: t("curtain.home") }}
          links={NAV_SECTIONS.map((s) => ({ id: s.id, href: `${homePath(lang)}#${s.id}`, label: t(s.key) }))}
          switchTo={{
            lang: other,
            href: homePath(other),
            name: t(`lang.${other}`),
            pages: Object.fromEntries(Object.keys(PAGES).map((id) => [PAGES[id][lang], pagePath(other, id)])),
          }}
          labels={{
            sections: t("nav.sections"),
            menu: t("nav.menu"),
            close: t("nav.close"),
            theme: t("nav.themeToggle"),
            newTab: t("link.newTab"),
          }}
          social={{ github: SOCIAL.github, linkedin: SOCIAL.linkedin }}
        />
        <main id="contenido">{children}</main>
        <Footer t={t} />
        <Cursor />
        <Magnet />
        <SmoothScroll />

        {/* Cortina entre páginas (styles/curtain.css). Va en el HTML, no la monta
            React al llegar: el script del tema puede dejarla tapando antes del primer
            pintado, y para eso tiene que estar pintada ya. Por eso el `d` arranca en la
            posición tapada, que es justo como llega la página de destino; la de salida
            la pone Curtain.jsx antes de mostrarla. El nombre del destino lo pone
            --curtain-label, así que el <span> va vacío. */}
        <div className="curtain" aria-hidden="true">
          <svg className="curtain__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path className="curtain__path" d={TAPADA} />
          </svg>
          <div className="curtain__stage">
            <p className="curtain__label">
              <span />
            </p>
            <span className="curtain__rule" />
          </div>
        </div>
        <Curtain />
      </body>
    </html>
  );
}
