import { SKILL_GROUPS } from "@/lib/site";
import { pagePath } from "@/lib/i18n";

// Grupos de SKILL_GROUPS en el orden del muro y de la lista de abajo. Los de mobile van
// en --accent.
const GROUPS = [
  { key: "skills.mobile", ids: ["mobile"], accent: true },
  { key: "skills.row.back", ids: ["backend", "data"] },
  { key: "skills.row.web", ids: ["web", "tools"] },
];

// Habilidades (docs/DISENO.md, 7.7): vista previa en un muro de palabras. Todas las
// tecnologías en mayúsculas gigantes, justificadas en líneas que llenan el ancho del
// panel sin salirse. Empiezan en contorno y una ola atada al scroll las va llenando:
// las de nivel avanzado quedan llenas y las intermedias, en contorno. El muro es visual
// (aria-hidden): la información está debajo, en texto, con los mismos grupos. El nivel
// en texto y dónde usé cada una van en la página de Habilidades (7.12).
export default function Skills({ t, lang }) {
  const byId = Object.fromEntries(SKILL_GROUPS.map((g) => [g.id, g]));
  const groups = GROUPS.map((group) => ({
    ...group,
    skills: group.ids.flatMap((id) => byId[id].skills),
  }));
  const words = groups.flatMap((group) => group.skills.map((skill) => ({ ...skill, accent: group.accent })));

  return (
    <section
      id="habilidades"
      className="panel panel--skills skills"
      data-section="habilidades"
      data-label={t("nav.skills")}
      aria-labelledby="habilidades-t"
    >
      <header className="skills__head">
        <h2 id="habilidades-t" className="display display--section">
          {t("skills.title")}
        </h2>
        <p className="skills__lead">{t("skills.lead")}</p>
        <a className="btn skills__more" href={pagePath(lang, "skills")}>
          <span className="btn__label">{t("skills.more")}</span>
        </a>
      </header>

      <div className="wall-wrap" aria-hidden="true">
        <p className="wall">
          {words.flatMap((word, i) => [
            <span
              key={word.name}
              className={`wall__word${word.level === "advanced" ? " is-strong" : ""}${word.accent ? " is-accent" : ""}`}
              style={{ "--i": i }}
            >
              {word.name}
            </span>,
            " ",
          ])}
        </p>
        <p className="wall__legend meta">
          <span className="wall__key is-strong" />
          {t("skills.level.advanced")}
          <span className="wall__key" />
          {t("skills.level.intermediate")}
        </p>
      </div>

      <div className="skills__groups">
        {groups.map((group) => (
          <div key={group.key} className="skills__group">
            <h3 className="meta">{t(group.key)}</h3>
            <p>{group.skills.map((s) => s.name).join(", ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
