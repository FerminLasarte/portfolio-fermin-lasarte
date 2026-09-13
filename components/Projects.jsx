import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/site";
import Icon from "@/components/Icon";
import { faRocket } from "@/lib/icons";

export default function Projects({ t }) {
  return (
    <section id="proyectos">
      <p className="section-label premium-reveal">
        <Icon icon={faRocket} />
        <span>{t("projects.title")}</span>
      </p>
      <h2 className="premium-reveal">{t("projects.title")}</h2>

      <div className="bento-grid">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} t={t} />
        ))}
      </div>
    </section>
  );
}
