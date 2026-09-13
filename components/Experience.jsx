import Timeline from "@/components/Timeline";
import { EXPERIENCE } from "@/lib/site";

export default function Experience({ t }) {
  const items = EXPERIENCE.map((e) => ({
    id: e.id,
    title: t(`exp.${e.id}.title`),
    period: `${e.start} — ${e.end}`,
    company: t(`exp.${e.id}.company`),
    desc: t(`exp.${e.id}.desc`),
    tags: e.tags,
  }));

  return (
    <section id="experiencia">
      <p className="section-label animate-on-scroll">
        <i className="fas fa-briefcase" />
        <span>{t("exp.sectionLabel")}</span>
      </p>
      <h2 className="animate-on-scroll">{t("exp.title")}</h2>

      <Timeline items={items} />
    </section>
  );
}
