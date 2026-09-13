import { DEFAULT_LOCALE, LOCALES, getT, homePath } from "@/lib/i18n";

// Contenido del 404 (app/global-not-found.js). Hay uno solo para todas las URLs que
// no existen, así que muestra el mensaje en todos los idiomas: primero el idioma por
// defecto y después los demás, cada uno con un botón a la home de ese idioma.
export default function NotFound() {
  const langs = [DEFAULT_LOCALE, ...LOCALES.filter((l) => l !== DEFAULT_LOCALE)];
  const texts = langs.map((lang) => ({ lang, t: getT(lang) }));
  const [main, ...others] = texts;

  return (
    <section id="no-encontrada" className="not-found">
      <p className="section-label">404</p>
      <h2>{main.t("notFound.title")}</h2>
      <p className="not-found-text">{main.t("notFound.text")}</p>
      {others.map(({ lang, t }) => (
        <p key={lang} lang={lang} className="not-found-text">
          <strong>{t("notFound.title")}.</strong> {t("notFound.text")}
        </p>
      ))}
      <div className="not-found-actions">
        {texts.map(({ lang, t }, i) => (
          <a
            key={lang}
            href={homePath(lang)}
            className={i === 0 ? "btn" : "btn btn-outline"}
            {...(i > 0 ? { lang, hrefLang: lang } : {})}
          >
            {t("notFound.back")}
          </a>
        ))}
      </div>
    </section>
  );
}
