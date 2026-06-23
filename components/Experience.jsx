"use client";

import { useLanguage } from "@/context/LanguageProvider";

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experiencia">
      <p className="section-label animate-on-scroll">
        <i className="fas fa-briefcase" />
        <span>{t("exp.sectionLabel")}</span>
      </p>
      <h2 className="animate-on-scroll">{t("exp.title")}</h2>

      <div className="timeline">
        <div className="timeline-item animate-on-scroll">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="timeline-header">
              <h3>{t("exp.job1.title")}</h3>
              <span className="timeline-period">2024 — 2025</span>
            </div>
            <span className="timeline-company">{t("exp.job1.company")}</span>
            <p>{t("exp.job1.desc")}</p>
            <div className="timeline-tags">
              <span>Flutter</span>
              <span>Stripe</span>
              <span>Firebase</span>
              <span>Google Maps</span>
            </div>
          </div>
        </div>

        <div className="timeline-item animate-on-scroll">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="timeline-header">
              <h3>{t("exp.job2.title")}</h3>
              <span className="timeline-period">2021 — 2023</span>
            </div>
            <span className="timeline-company">{t("exp.job2.company")}</span>
            <p>{t("exp.job2.desc")}</p>
            <div className="timeline-tags">
              <span>Flutter</span>
              <span>Firebase</span>
              <span>Mercado Pago</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
