import { SKILL_GROUPS } from "@/lib/site";
import { pagePath } from "@/lib/i18n";

// Filas de la marquesina, cada una con sus grupos de SKILL_GROUPS y su tono: llena,
// en contorno y en --accent. La leyenda de abajo usa los mismos grupos.
const ROWS = [
  { key: "skills.mobile", groups: ["mobile"], tone: "fill" },
  { key: "skills.row.back", groups: ["backend", "data"], tone: "outline" },
  { key: "skills.row.web", groups: ["web", "tools"], tone: "accent" },
];

// Habilidades (docs/DISENO.md, 7.7): vista previa en marquesina, como la de douglus.
// Tres filas de tecnologías gigantes que se corren de costado con el scroll, una hacia
// cada lado. Son visuales (aria-hidden, y cada fila repite la lista para tener
// recorrido): la información está debajo, en texto, con los mismos grupos. El nivel de
// cada tecnología y dónde la usé van en la página de Habilidades (7.12).
export default function Skills({ t, lang }) {
  const byId = Object.fromEntries(SKILL_GROUPS.map((g) => [g.id, g]));
  const rows = ROWS.map((row) => ({
    ...row,
    names: row.groups.flatMap((id) => byId[id].skills.map((s) => s.name)),
  }));

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

      <div className="marquee" aria-hidden="true">
        {rows.map((row) => (
          <p key={row.key} className={`marquee__row marquee__row--${row.tone}`}>
            {[...row.names, ...row.names].map((name, k) => (
              <span key={k} className="marquee__item">
                {name}
              </span>
            ))}
          </p>
        ))}
      </div>

      <div className="skills__groups">
        {rows.map((row) => (
          <div key={row.key} className="skills__group">
            <h3 className="meta">{t(row.key)}</h3>
            <p>{row.names.join(", ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
