import ProjectCard from "@/components/ProjectCard";
import { PROJECTS, STATS, isFeatured } from "@/lib/site";
import { padded } from "@/lib/text";

// Dónde empieza cada tarjeta dentro del recorrido, en el mismo lenguaje que --x-cards
// (styles/track.css): lo que miden las que tiene delante. Como la pista se mueve 1px
// por cada 1px de scroll, esa distancia es también el punto de la línea de tiempo --pan
// en el que la tarjeta cruza la pantalla, y de ahí sale su `animation-range`
// (styles/projects.css). Se calcula acá, en el servidor, porque acá se sabe el orden y
// el ancho de cada una; el CSS solo suma tokens.
function offsets(projects) {
  let lg = 0;
  let card = 0;
  return projects.map((project) => {
    const x = `calc(var(--x-cards) + ${lg} * var(--w-card-lg) + ${card} * var(--w-card))`;
    if (isFeatured(project)) lg += 1;
    else card += 1;
    return x;
  });
}

// Proyectos (docs/DISENO.md, 7.3): un panel de entrada con el índice y las cifras, y un
// panel por proyecto, en el orden de PROJECTS (M11). El envoltorio .projects es una
// grilla en vertical y desaparece en horizontal (display: contents), donde cada tarjeta
// es un panel de la pista.
export default function Projects({ t, lang }) {
  const stats = [
    { value: STATS.appsLive, label: t("projects.stat.apps") },
    { value: `${STATS.years}+`, label: t("projects.stat.years") },
    { value: STATS.projects, label: t("projects.stat.projects") },
  ];
  const x = offsets(PROJECTS);

  return (
    <div className="projects">
      <section
        id="proyectos"
        className="panel panel--intro intro"
        data-section="proyectos"
        data-label={t("nav.projects")}
        aria-labelledby="proyectos-t"
      >
        <h2 id="proyectos-t" className="display display--section">
          {t("projects.title")}
        </h2>

        {/* El índice: las seis filas se llenan una detrás de otra mientras el panel
            cruza, como el muro de Habilidades (styles/projects.css). Cada una lleva a
            su panel; el contador de la franja es el que orienta después, cuando el
            índice ya pasó. */}
        <ol className="idx">
          {PROJECTS.map((project, i) => (
            <li key={project.id} className="idx__row" style={{ "--i": i }}>
              <a className="idx__link" href={`#proyecto-${project.id}`}>
                <span className="idx__n">{padded(i + 1)}</span>
                <span className="idx__name">{t(`projects.${project.id}.name`, project.name)}</span>
              </a>
            </li>
          ))}
        </ol>

        <dl className="stats">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="meta">{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {PROJECTS.map((project, i) => (
        <ProjectCard key={project.id} project={project} t={t} lang={lang} n={i + 1} x={x[i]} />
      ))}
    </div>
  );
}
