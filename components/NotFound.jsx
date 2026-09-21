import { DEFAULT_LOCALE, LOCALES, getT, homePath } from "@/lib/i18n";

// Contenido del 404 (app/global-not-found.js). Hay uno solo para todas las URLs que
// no existen, así que muestra el mensaje en todos los idiomas: primero el idioma por
// defecto y después los demás, cada uno con un botón a la home de ese idioma.
export default function NotFound() {
  const langs = [DEFAULT_LOCALE, ...LOCALES.filter((l) => l !== DEFAULT_LOCALE)];
  const texts = langs.map((lang) => ({ lang, t: getT(lang) }));
  const [main, ...others] = texts;

  return (
    <section id="no-encontrada" className="not-found" aria-labelledby="no-encontrada-t">
      <p className="display not-found__code" aria-hidden="true">
        404
      </p>
      <h1 id="no-encontrada-t" className="not-found__title">
        {main.t("notFound.title")}
      </h1>
      <p>{main.t("notFound.text")}</p>
      {others.map(({ lang, t }) => (
        <p key={lang} lang={lang}>
          <strong>{t("notFound.title")}.</strong> {t("notFound.text")}
        </p>
      ))}
      <div className="not-found__actions">
        {texts.map(({ lang, t }, i) => (
          <a
            key={lang}
            href={homePath(lang)}
            data-curtain={t("curtain.home")}
            className={i === 0 ? "btn btn--primary" : "btn"}
            {...(i > 0 ? { lang, hrefLang: lang } : {})}
          >
            <span className="btn__label">{t("notFound.back")}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
