import { EDUCATION_NOTES, PROJECTS, STAGES } from "@/lib/site";
import { homePath, projectPath } from "@/lib/i18n";
import { isOngoing, twoDigits } from "@/lib/text";

// Página de Trayectoria (docs/DISENO.md, 7.12): el detalle de la vista previa de la
// home, en vertical y con el texto completo. Un capítulo por etapa, de la más nueva a
// la más vieja, con el rango de años enorme (queda pegado arriba mientras se lee su
// texto) y, al lado, qué es, el título, el lugar, la descripción completa, las
// tecnologías y el enlace al proyecto si está en la home. Los idiomas cierran la
// página. Un <h1> (el título) y un <h2> por etapa.
export default function ExperiencePage({ t, lang }) {
  const now = new Date().getFullYear();
  const home = homePath(lang);
  const projects = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));
  const chapters = STAGES.map((s) =>
    s.kind === "work"
      ? {
          ...s,
          title: t(`exp.${s.id}.company`),
          place: [t(`exp.${s.id}.title`), s.where].filter(Boolean).join(" · "),
          desc: t(`exp.${s.id}.desc`),
        }
      : { ...s, title: t(`edu.${s.id}.title`), place: t(`edu.${s.id}.company`), desc: t(`edu.${s.id}.desc`) },
  ).sort((a, b) => b.start - a.start);

  return (
    <article className="page" aria-labelledby="page-t">
      <header className="page__head">
        <h1 id="page-t" className="display page__title">
          {t("exp.title")}
        </h1>
        <p className="page__lead">{t("exp.intro")}</p>
      </header>

      <ol className="chapters">
        {chapters.map((c) => (
          <li key={c.id} id={c.id} className={`chapter chapter--${c.kind}`}>
            <p className="years chapter__years" aria-hidden="true">
              <span>{c.start}</span>
              <span className="years__end">–{c.end != null && twoDigits(c.end)}</span>
            </p>
            <div className="chapter__body">
              <p className="meta">
                {t(`exp.kind.${c.kind}`)} · <time dateTime={String(c.start)}>{c.start}</time>
                {c.end != null && (
                  <>
                    –<time dateTime={String(c.end)}>{c.end}</time>
                  </>
                )}
                {isOngoing(c, now) && ` · ${t("exp.ongoing")}`}
              </p>
              <h2 className="chapter__title poster">{c.title}</h2>
              <p className="chapter__place">{c.place}</p>
              <p className="chapter__desc">{c.desc}</p>
              {c.tags && (
                <p className="meta">
                  {t("page.techs")}: {c.tags.join(", ")}
                </p>
              )}
              {/* Lleva a la página del proyecto, que es de lo que habla la etapa; antes
                  llevaba a su tarjeta en la home, que dice menos. */}
              {projects[c.id] && (
                <a
                  className="chapter__link strike"
                  href={projectPath(lang, c.id)}
                  data-curtain={t(`projects.${c.id}.name`, projects[c.id].name)}
                >
                  {t("page.seeProject")}
                  {/* Se repite en cada etapa: el nombre suma el proyecto (R-M10). */}
                  <span className="sr-only"> {t(`projects.${c.id}.name`, projects[c.id].name)}</span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>

      {EDUCATION_NOTES.map((note) => (
        <section key={note.id} className="chapter chapter--note" aria-labelledby={`${note.id}-t`}>
          <p className="chapter__label meta">
            {t(`edu.${note.id}.label`)} · {t(`edu.${note.id}.period`)}
          </p>
          <div className="chapter__body">
            <h2 id={`${note.id}-t`} className="chapter__title poster">
              {t(`edu.${note.id}.title`)}
            </h2>
            <p className="chapter__desc">{t(`edu.${note.id}.desc`)}</p>
          </div>
        </section>
      ))}

      {/* Ancla nativa, no next/link: la home española se sirve con una reescritura
          ("/" a "/es", next.config.mjs) y el router de Next no siempre la resuelve del
          lado del cliente; cuando no puede, cae en una navegación completa que se come
          el "#seccion" y deja al visitante arriba de la home (probado el 2026-09-21;
          en inglés, que no tiene reescritura, no pasa). Lo que sacó la sensación de
          recarga fue saltear la cortina (components/Curtain.jsx). */}
      <p className="page__back">
        <a className="btn" href={`${home}#experiencia`} data-curtain={t("curtain.home")}>
          <span className="btn__label">{t("page.back")}</span>
        </a>
      </p>
    </article>
  );
}
