"use client";

import { useLanguage } from "@/context/LanguageProvider";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/site";

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="proyectos">
      <p className="section-label premium-reveal">
        <i className="fas fa-rocket" />
        <span>{t("projects.title")}</span>
      </p>
      <h2 className="premium-reveal">{t("projects.title")}</h2>

      <div className="bento-grid">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
