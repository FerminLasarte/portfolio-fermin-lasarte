import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/site";
import { homePath } from "@/lib/i18n";

// Página de Proyectos (/proyectos, docs/DISENO.md, 7.12): la lista completa en
// vertical, que es también la madre de las páginas de cada proyecto (de ahí salen las
// migas de pan "Inicio › Proyectos › TravelPic"). Son las mismas tarjetas de la home
// sin nada de la pista (`panel={false}`): una sola definición de cómo se resume un
// proyecto, en los dos lugares.
export default function ProjectsPage({ t, lang }) {
  const home = homePath(lang);

  return (
    <article className="page" aria-labelledby="page-t">
      <header className="page__head">
        <h1 id="page-t" className="display page__title">
          {t("projects.title")}
        </h1>
        <p className="page__lead">{t("projects.pageLead")}</p>
      </header>

      <div className="project-list">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} t={t} lang={lang} panel={false} />
        ))}
      </div>

      {/* Ancla nativa, no next/link: la home española se sirve con una reescritura
          ("/" a "/es", next.config.mjs) y el router de Next no siempre la resuelve del
          lado del cliente; cuando no puede, cae en una navegación completa que se come
          el "#seccion" (probado el 2026-09-21). */}
      <p className="page__back">
        <a className="btn" href={`${home}#proyectos`} data-curtain={t("curtain.home")}>
          <span className="btn__label">{t("page.back")}</span>
        </a>
      </p>
    </article>
  );
}
