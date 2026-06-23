"use client";

import { useLanguage } from "@/context/LanguageProvider";

export default function Education() {
  const { t } = useLanguage();

  return (
    <section id="educacion">
      <p className="section-label animate-on-scroll">
        <i className="fas fa-graduation-cap" />
        <span>{t("edu.title")}</span>
      </p>
      <h2 className="animate-on-scroll">{t("edu.title")}</h2>

      <div className="timeline">
        <div className="timeline-item animate-on-scroll">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="timeline-header">
              <h3>{t("edu.item1.title")}</h3>
              <span className="timeline-period">2020 — 2026</span>
            </div>
            <span className="timeline-company">{t("edu.item1.company")}</span>
            <p>{t("edu.item1.desc")}</p>
          </div>
        </div>

        <div className="timeline-item animate-on-scroll">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="timeline-header">
              <h3>{t("edu.item2.title")}</h3>
              <span className="timeline-period">{t("edu.item2.period")}</span>
            </div>
            <p>{t("edu.item2.desc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
