import Image from "next/image";
import { DEVICON, SKILL_GROUPS } from "@/lib/site";

// Habilidades (docs/DISENO.md, 7.7): los grupos de SKILL_GROUPS en columnas. El nivel
// de cada tecnología está en texto visible, no en un tooltip (M4).
export default function Skills({ t }) {
  return (
    <section
      id="habilidades"
      className="panel panel--skills skills"
      data-section="habilidades"
      data-label={t("nav.skills")}
      aria-labelledby="habilidades-t"
    >
      <h2 id="habilidades-t" className="display display--section">
        {t("skills.title")}
      </h2>

      <div className="skills__groups">
        {SKILL_GROUPS.map((group) => (
          <div key={group.id} className="skills__group">
            <h3 className="skills__title">{t(group.titleKey)}</h3>
            <ul className="skills__list">
              {group.skills.map((skill) => (
                <li key={skill.name} className="skill">
                  <Image
                    src={`${DEVICON}/${skill.icon}.svg`}
                    alt=""
                    width={20}
                    height={20}
                    style={skill.style}
                    {...(skill.darkInvert ? { "data-dark-invert": "" } : {})}
                  />
                  <span className="skill__name">{skill.name}</span>
                  <span className="skill__level meta">{t(`skills.level.${skill.level}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
