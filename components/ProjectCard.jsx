import ProjectPlate from "@/components/ProjectPlate";
import ProjectMeta from "@/components/ProjectMeta";
import ProjectLinks from "@/components/ProjectLinks";
import { isFeatured } from "@/lib/site";
import { projectPath } from "@/lib/i18n";

// Tarjeta de proyecto (docs/DISENO.md, 7.3). De arriba a abajo: la placa, el estado y
// las plataformas en texto, el título, el problema (si hay) y la solución, las
// tecnologías y los enlaces. Las apps móviles en producción van en un panel más ancho.
//
// El botón relleno lleva a la página del proyecto y los de afuera (tienda, repo, demo)
// van al lado con borde: la placa acompaña al relleno, fuera del orden de foco.
//
// Con `panel={false}` es la misma tarjeta sin nada de la pista, que es como la muestra
// /proyectos (components/ProjectsPage.jsx).
export default function ProjectCard({ project, t, lang, panel = true }) {
  const { id, name, tags, links } = project;
  const featured = isFeatured(project);
  const projectName = t(`projects.${id}.name`, name);
  const problem = t(`projects.${id}.problem`, null);
  const titleId = `proyecto-${id}-t`;
  const href = projectPath(lang, id);
  const sizes = featured
    ? "(min-width: 64rem) 34vw, 80vw"
    : "(min-width: 64rem) 22vw, (min-width: 48rem) 36vw, 80vw";

  const track = panel
    ? {
        className: `panel ${featured ? "panel--card-lg card--lg" : "panel--card"} card`,
        "data-section": "proyectos",
        "data-label": t("nav.projects"),
      }
    : { className: `card-slot card${featured ? " card--lg" : ""}` };

  return (
    <article id={`proyecto-${id}`} aria-labelledby={titleId} {...track}>
      <ProjectPlate project={project} t={t} sizes={sizes} href={href} curtain={projectName} />

      <ProjectMeta project={project} t={t} />

      <h3 className="card__title poster" id={titleId}>
        {t(`projects.${id}.title`, name)}
      </h3>

      <div className="card__text">
        {problem && <p className="card__problem">{problem}</p>}
        <p>{t(`projects.${id}.solution`)}</p>
      </div>

      <p className="card__tags meta">{tags.join(", ")}</p>

      <div className="card__links">
        <a className="btn btn--primary" href={href} data-curtain={projectName}>
          <span className="btn__label">
            {t("page.seeProject")}
            {/* Se repite en cada tarjeta: el nombre suma el proyecto (R-M10). */}
            <span className="sr-only"> {projectName}</span>
          </span>
        </a>
        <ProjectLinks links={links} t={t} name={projectName} />
      </div>
    </article>
  );
}
