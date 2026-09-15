"use client";

import "./globals.css";
import { useSyncExternalStore } from "react";
import { Archivo } from "next/font/google";
import { THEME_COLORS } from "@/lib/theme";
import { ERROR_TEXT } from "@/lib/error-text";

// Error que rompe el layout raíz (R-M21 de la re-auditoría). Reemplaza al documento
// entero, así que arma su propio <html> con la fuente, los estilos y el tema; como no
// pasa por Document, no hay nav ni pie. Es bilingüe como el 404: primero el idioma de
// la URL y después el otro, con un botón a la home de cada uno. Next lo carga en todas
// las páginas, así que no importa lib/translations.js ni lib/site.js (N2): sus textos
// están en lib/error-text.js.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const NAME = "Fermin Lasarte"; // PERSON.name
const LANGS = Object.keys(ERROR_TEXT);
const texts = (lang) => ({ lang, ...ERROR_TEXT[lang] });

// Idioma y tema salen del navegador; en el servidor, español y tema claro.
const subscribe = () => () => {};
const langFromUrl = () => (/^\/en(\/|$)/.test(window.location.pathname) ? "en" : "es");
const isDark = () => {
  try {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
};

export default function GlobalError({ retry }) {
  const lang = useSyncExternalStore(subscribe, langFromUrl, () => "es");
  const dark = useSyncExternalStore(subscribe, isDark, () => false);
  const [main, ...others] = [lang, ...LANGS.filter((l) => l !== lang)].map(texts);
  const all = [main, ...others];

  return (
    <html lang={main.lang} className={`${archivo.variable}${dark ? " dark-mode" : ""}`}>
      <head>
        <title>{`${all.map((x) => x.title).join(" · ")} · ${NAME}`}</title>
        <meta name="theme-color" content={dark ? THEME_COLORS.dark : THEME_COLORS.light} />
      </head>
      <body>
        <main id="contenido">
          <section className="not-found" aria-labelledby="error-t">
            <p className="display not-found__code" aria-hidden="true">
              Error
            </p>
            <h1 id="error-t" className="not-found__title">
              {main.title}
            </h1>
            <p>{main.text}</p>
            {others.map((t) => (
              <p key={t.lang} lang={t.lang}>
                <strong>{t.title}.</strong> {t.text}
              </p>
            ))}
            <div className="not-found__actions">
              <button type="button" className="btn btn--primary" onClick={() => retry()}>
                <span className="btn__label">{main.retry}</span>
              </button>
              {all.map((t, i) => (
                <a key={t.lang} href={t.home} className="btn" {...(i > 0 ? { lang: t.lang, hrefLang: t.lang } : {})}>
                  <span className="btn__label">{t.back}</span>
                </a>
              ))}
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
