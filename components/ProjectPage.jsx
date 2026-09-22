import ProjectPlate from "@/components/ProjectPlate";
import ProjectMeta from "@/components/ProjectMeta";
import ProjectLinks from "@/components/ProjectLinks";
import { EXPERIENCE, PROJECTS } from "@/lib/site";
import { homePath, pagePath, projectPath } from "@/lib/i18n";
import { padded } from "@/lib/text";

// Los bloques largos, en orden. Cada uno se muestra solo si el proyecto tiene ese
// texto (`projects.<id>.context` y compañía, lib/translations.js): hoy no lo tiene
// ninguno, así que la página sale con el resumen, la placa, las tecnologías y los
// enlaces, y se va llenando sin tocar código.
const SECTIONS = ["context", "build", "decisions", "result"];

// Página de un proyecto (/proyectos/<id>, docs/DISENO.md, 7.12): el detalle de su
// tarjeta, en vertical y con el texto completo. El resumen, la placa y los enlaces son
// los mismos componentes que usa la tarjeta de la home, así que no hay dos versiones
// de lo mismo. Cierra con el anterior y el siguiente, en círculo.
export default function ProjectPage({ project, t, lang }) {
  const { id, name, tags, links } = project;
  const projectName = t(`projects.${id}.name`, name);
  const problem = t(`projects.${id}.problem`, null);
  const blocks = SECTIONS.map((key) => ({ key, text: t(`projects.${id}.${key}`, null) })).filter((b) => b.text);

  // Los años salen de Trayectoria cuando el proyecto también es una etapa (TravelPic y
  // DeporTurnos): no se inventan los que no están.
  const stage = EXPERIENCE.find((e) => e.id === id);

  const i = PROJECTS.findIndex((p) => p.id === id);
  const around = [
    { key: "prev", project: PROJECTS.at(i - 1) },
    { key: "next", project: PROJECTS[(i + 1) % PROJECTS.length] },
  ];

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
              <time dateTime={String(stage.start)}>{stage.start}</time>–
              <time dateTime={String(stage.end)}>{stage.end}</time>
            </span>
          )}
        </ProjectMeta>
      </header>

      {/* La placa solo si hay una imagen de verdad. La tipográfica, que es el nombre en
          grande, acá no suma nada: el <h1> de arriba ya es eso mismo, y a lo ancho de
          la página quedaba una banda de color de medio metro repitiendo el título. */}
      {project.media.type !== "type" && (
        <ProjectPlate project={project} t={t} sizes="(min-width: 90rem) 80rem, 92vw" className="project__plate" />
      )}

      {blocks.map(({ key, text }) => (
        <section key={key} className="chapter" aria-labelledby={`${key}-t`}>
          <h2 id={`${key}-t`} className="chapter__title poster">
            {t(`projects.${key}`)}
          </h2>
          <p className="chapter__desc">{text}</p>
        </section>
      ))}

      <section className="chapter project__links" aria-labelledby="enlaces-t">
        <h2 id="enlaces-t" className="chapter__title poster">
          {t("page.techs")}
        </h2>
        <div className="chapter__body">
          <p>{tags.join(", ")}</p>
          <div className="card__links">
            <ProjectLinks links={links} t={t} name={projectName} primary />
          </div>
        </div>
      </section>

      <nav className="project__around" aria-label={t("projects.title")}>
        {around.map(({ key, project: other }) => {
          const otherName = t(`projects.${other.id}.name`, other.name);
          return (
            <a key={key} className={`project__step project__step--${key}`} href={projectPath(lang, other.id)} data-curtain={otherName}>
              <span className="meta">{t(`projects.${key}`)}</span>
              <span className="project__step-name poster">{otherName}</span>
            </a>
          );
        })}
      </nav>

      {/* Ancla nativa, no next/link (ver components/ProjectsPage.jsx). Vuelve a la
          tarjeta de este proyecto, no al principio de la sección. */}
      <p className="page__back">
        <a className="btn" href={`${homePath(lang)}#proyecto-${id}`} data-curtain={t("curtain.home")}>
          <span className="btn__label">{t("page.back")}</span>
        </a>
      </p>
    </article>
  );
}
