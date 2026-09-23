import ProjectScreens, { screensOf } from "@/components/ProjectScreens";
import ScreenSync from "@/components/ScreenSync";
import ProjectMeta from "@/components/ProjectMeta";
import ProjectLinks from "@/components/ProjectLinks";
import PageReveal from "@/components/PageReveal";
import { EXPERIENCE, PROJECTS } from "@/lib/site";
import { homePath, pagePath, projectPath } from "@/lib/i18n";
import { padded } from "@/lib/text";

// Los bloques largos, en orden. Cada uno se muestra solo si el proyecto tiene ese
// texto (`projects.<id>.context` y compañía, lib/translations.js): el que no tiene
// ninguno sale con el resumen, las pantallas, las tecnologías y los enlaces, y se va
// llenando sin tocar código.
const SECTIONS = ["context", "build", "decisions", "result"];

// Página de un proyecto (/proyectos/<id>, docs/DISENO.md, 7.12): el detalle de su fila
// del índice, en vertical y con el texto completo. La meta y los enlaces son los mismos
// componentes que usa el índice, así que no hay dos versiones de lo mismo. Se recorre
// como la home (7.13): las pantallas de la app acompañan la lectura y cambian con cada
// capítulo; los capítulos van numerados, con una línea que se dibuja mientras se leen;
// cada cosa entra como en los paneles (components/PageReveal.jsx); y cierra con el
// siguiente proyecto en grande, que se llena como el muro de Habilidades.
export default function ProjectPage({ project, t, lang }) {
  const { id, name, tags, links, stats } = project;
  const projectName = t(`projects.${id}.name`, name);
  const problem = t(`projects.${id}.problem`, null);
  const screens = screensOf(project, t);
  const blocks = SECTIONS.map((key) => ({ key, text: t(`projects.${id}.${key}`, null) })).filter((b) => b.text);

  // Los años salen de Trayectoria cuando el proyecto también es una etapa (TravelPic y
  // DeporTurnos): no se inventan los que no están.
  const stage = EXPERIENCE.find((e) => e.id === id);

  const i = PROJECTS.findIndex((p) => p.id === id);
  const prev = PROJECTS.at(i - 1);
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const nameOf = (p) => t(`projects.${p.id}.name`, p.name);

  // Las cifras van con el formato del idioma (4.300 / 4,300) y "+" si son "más de",
  // como las de la entrada de Proyectos.
  const number = new Intl.NumberFormat(lang);

  return (
    <article className="page project" aria-labelledby="page-t">
      <header className="page__head">
        <p className="meta project__kicker">
          <span className="project__n">{padded(i + 1)}</span>
          <a href={pagePath(lang, "projects")} data-curtain={t("projects.title")}>
            {t("projects.title")}
          </a>
        </p>
        <h1 id="page-t" className="display page__title">
          {t(`projects.${id}.title`, name)}
        </h1>
        {problem && <p className="project__problem">{problem}</p>}
        <p className="page__lead">{t(`projects.${id}.solution`)}</p>
        <ProjectMeta project={project} t={t}>
          {stage && (
            <span>
              <time dateTime={String(stage.start)}>{stage.start}</time>
              {stage.end != null ? (
                <>
                  –<time dateTime={String(stage.end)}>{stage.end}</time>
                </>
              ) : (
                ` · ${t("exp.ongoing")}`
              )}
            </span>
          )}
        </ProjectMeta>
      </header>

      {/* La historia: las pantallas a la izquierda, fijas mientras se lee, y a la derecha
          los capítulos, cada uno con su número y su título arriba del texto; cierra
          Tecnologías, con los enlaces de afuera. Sin capturas, los capítulos van solos,
          al ras del borde de la página. */}
      <div className={`story${screens.length ? " story--screens" : ""}`} data-story>
        {screens.length > 0 && <ProjectScreens project={project} screens={screens} t={t} name={projectName} />}

        <div className="story__text">
          {blocks.length > 0 && (
            <div className="story__chapters">
              {blocks.map(({ key, text }, n) => (
                <section
                  key={key}
                  className="story__chapter"
                  aria-labelledby={`${key}-t`}
                  data-reveal
                  data-screen-step
                >
                  <h2 id={`${key}-t`} className="story__label">
                    <span className="story__n meta">{padded(n + 1)}</span>
                    <span className="story__title poster">{t(`projects.${key}`)}</span>
                  </h2>
                  {key === "result" && stats && (
                    <dl className="stats story__stats">
                      {stats.map((s) => (
                        <div key={s.key}>
                          <dt className="meta">{t(`projects.stat.${s.key}`)}</dt>
                          <dd>
                            {number.format(s.value)}
                            {s.plus && "+"}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <p className="chapter__desc">{text}</p>
                </section>
              ))}
            </div>
          )}

          <section className="story__chapter project__links" aria-labelledby="enlaces-t" data-reveal data-screen-step>
            <h2 id="enlaces-t" className="story__label">
              <span className="story__title poster">{t("page.techs")}</span>
            </h2>
            <p className="story__tags">{tags.join(", ")}</p>
            <div className="card__links">
              <ProjectLinks links={links} t={t} name={projectName} primary />
            </div>
          </section>
        </div>

        {screens.length > 1 && <ScreenSync />}
      </div>

      {/* El siguiente en grande, que es a donde sigue la lectura; el anterior, chico. */}
      <nav className="project__around" aria-label={t("projects.title")} data-reveal>
        <a className="project__next" href={projectPath(lang, next.id)} data-curtain={nameOf(next)}>
          <span className="meta">{t("projects.next")}</span>
          <span className="project__next-name display">{nameOf(next)}</span>
        </a>
        <a className="project__step project__step--prev" href={projectPath(lang, prev.id)} data-curtain={nameOf(prev)}>
          <span className="meta">{t("projects.prev")}</span>
          <span className="project__step-name poster">{nameOf(prev)}</span>
        </a>
      </nav>

      {/* Ancla nativa, no next/link (ver components/ProjectsPage.jsx). Vuelve a la
          tarjeta de este proyecto, no al principio de la sección. */}
      <p className="page__back">
        <a className="btn" href={`${homePath(lang)}#proyecto-${id}`} data-curtain={t("curtain.home")}>
          <span className="btn__label">{t("page.back")}</span>
        </a>
      </p>

      <PageReveal />
    </article>
  );
}
