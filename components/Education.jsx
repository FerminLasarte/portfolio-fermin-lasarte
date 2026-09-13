"use client";

import { useLanguage } from "@/context/LanguageProvider";
import Timeline from "@/components/Timeline";
import { EDUCATION } from "@/lib/site";

export default function Education() {
  const { t } = useLanguage();

  const items = EDUCATION.map((e) => ({
    id: e.id,
    title: t(`edu.${e.id}.title`),
    period: e.start ? `${e.start} — ${e.end}` : t(`edu.${e.id}.period`),
    company: t(`edu.${e.id}.company`, null),
    desc: t(`edu.${e.id}.desc`),
  }));

  return (
    <section id="educacion">
      <p className="section-label animate-on-scroll">
        <i className="fas fa-graduation-cap" />
        <span>{t("edu.title")}</span>
      </p>
      <h2 className="animate-on-scroll">{t("edu.title")}</h2>

      <Timeline items={items} />
    </section>
  );
}
