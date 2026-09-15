import ProjectCard from "@/components/ProjectCard";
import { PROJECTS, STATS } from "@/lib/site";

// Proyectos (docs/DISENO.md, 7.3): un panel de entrada con las cifras, que salen de
// los datos, y un panel por proyecto, en el orden de PROJECTS (M11). El envoltorio
// .projects es una grilla en vertical y desaparece en horizontal (display: contents),
// donde cada tarjeta es un panel de la pista.
export default function Projects({ t }) {
  const stats = [
    { value: STATS.appsLive, label: t("projects.stat.apps") },
    { value: `${STATS.years}+`, label: t("projects.stat.years") },
    { value: STATS.projects, label: t("projects.stat.projects") },
  ];

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
        <dl className="stats">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="meta">{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {PROJECTS.map((project) => (
        <ProjectCard key={project.id} project={project} t={t} />
      ))}
    </div>
  );
}
