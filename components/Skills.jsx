import Image from "next/image";
import { DEVICON, SKILL_GROUPS } from "@/lib/site";

export default function Skills({ t }) {
  return (
    <section id="habilidades">
      <p className="section-label premium-reveal">
        <i className="fas fa-laptop-code" />
        <span>{t("skills.title")}</span>
      </p>
      <h2 className="premium-reveal">{t("skills.title")}</h2>

      <div className="skills-bento">
        {SKILL_GROUPS.map((card) => (
          <div key={card.id} className={`skill-card ${card.extraClass ?? ""} premium-reveal`.trim()}>
            <div className="skill-card-header">
              <i className={card.icon} />
              <h3>{t(card.titleKey)}</h3>
            </div>
            <div className="skill-icons-grid">
              {card.skills.map((s) => (
                <div
                  key={s.name}
                  className="skill-icon"
                  data-tooltip={`${s.name} · ${t(`skills.level.${s.level}`)}`}
                >
                  <Image
                    src={`${DEVICON}/${s.icon}.svg`}
                    alt={s.alt ?? s.name}
                    width={30}
                    height={30}
                    unoptimized
                    style={s.style}
                    {...(s.darkInvert ? { "data-dark-invert": "" } : {})}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
