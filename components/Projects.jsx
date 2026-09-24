import ProjectIndex from "@/components/ProjectIndex";
import { STATS } from "@/lib/site";
import { appsLabel } from "@/lib/i18n";

// Trabajos en la home (docs/DISENO.md, 7.3): un solo panel de la pista, del ancho de la
// pantalla, con el título, las cifras y el índice de proyectos con su vista previa. El
// detalle de cada uno está en su página.
export default function Projects({ t, lang }) {
  const stats = [
    { value: STATS.appsLive, label: appsLabel(lang, t) },
    { value: `${STATS.years}+`, label: t("projects.stat.years") },
    { value: STATS.projects, label: t("projects.stat.projects") },
  ];

  return (
    <section
      id="trabajos"
      className="panel panel--projects projects"
      data-section="trabajos"
      data-label={t("nav.projects")}
      aria-labelledby="trabajos-t"
    >
      <ProjectIndex t={t} lang={lang}>
        <div className="works__head">
          <h2 id="trabajos-t" className="display display--section">
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
        </div>
      </ProjectIndex>
    </section>
  );
}
