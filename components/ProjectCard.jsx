import ProjectPlate from "@/components/ProjectPlate";
import ProjectMeta from "@/components/ProjectMeta";
import ProjectLinks from "@/components/ProjectLinks";
import { STATS, isFeatured } from "@/lib/site";
import { projectPath } from "@/lib/i18n";
import { padded } from "@/lib/text";

// Tarjeta de proyecto (docs/DISENO.md, 7.3). De arriba a abajo: la placa, el estado y
// las plataformas en texto, el título, el problema (si hay) y la solución, las
// tecnologías y los enlaces. Las apps móviles en producción van en un panel más ancho.
//
// El botón relleno lleva a la página del proyecto y los de afuera (tienda, repo, demo)
// van al lado con borde: la placa acompaña al relleno, fuera del orden de foco.
//
// En la home es un panel de la pista y recibe `n` (su número, que hoy solo usa el
// contador de la franja) y `x` (dónde empieza en el recorrido,
// components/Projects.jsx): de ahí salen la paralaje y la deriva (styles/projects.css). Con `panel={false}` es la misma tarjeta sin nada de
// la pista, que es como la muestra /proyectos (components/ProjectsPage.jsx).
export default function ProjectCard({ project, t, lang, n, x, panel = true }) {
  const { id, name, tags, links } = project;
  const featured = isFeatured(project);
  const projectName = t(`projects.${id}.name`, name);
  const problem = t(`projects.${id}.problem`, null);
  const titleId = `proyecto-${id}-t`;
  const href = projectPath(lang, id);
  const sizes = featured
    ? "(min-width: 64rem) 34vw, 80vw"
    : "(min-width: 64rem) 22vw, (min-width: 48rem) 36vw, 80vw";

  // Las pares quedan abajo y las impares arriba (la tira desfasada): solo en
  // horizontal, donde la tarjeta es más baja que el panel.
  const track = panel
    ? {
        className: `panel ${featured ? "panel--card-lg" : "panel--card"}${n % 2 === 0 ? " is-low" : ""}`,
        style: { "--x-card": x },
        "data-section": "proyectos",
        "data-label": t("nav.projects"),
        // Lo que muestra el contador de la franja ("03 / 06"): lo arma el servidor y
        // TrackController solo lo copia.
        "data-count": `${padded(n)} / ${padded(STATS.projects)}`,
      }
    : { className: "card-slot" };

  return (
    <article id={`proyecto-${id}`} aria-labelledby={titleId} {...track}>
      <div className={`card${featured ? " card--lg" : ""}`}>
        {/* La placa y el cuerpo van en dos envoltorios propios porque son las dos capas
            que se mueven a distinta velocidad: la paralaje va acá y las entradas, en
            los elementos de adentro, así no se pisan (styles/motion.css). */}
        <div className="card__media">
          <ProjectPlate project={project} t={t} sizes={sizes} href={href} curtain={projectName} />
        </div>

        <div className="card__body">
          <ProjectMeta project={project} t={t} />
          <h3 className="card__title poster" id={titleId}>
            {t(`projects.${id}.title`, name)}
          </h3>
          <div className="card__text">
            {problem && <p className="card__problem">{problem}</p>}
            <p>{t(`projects.${id}.solution`)}</p>
          </div>
          <p className="card__tags meta">{tags.join(", ")}</p>
        </div>

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
      </div>
    </article>
  );
}
