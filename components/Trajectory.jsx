import { EDUCATION, EXPERIENCE } from "@/lib/site";

// Trayectoria (docs/DISENO.md, 7.4): experiencia y educación juntas, porque las dos
// cuentan años y lugares. Arriba, un eje de años con una barra por ítem (es solo
// visual: aria-hidden); abajo, las fichas, con las mismas fechas en texto. La ficha de
// UNICEN lleva id="educacion", el ancla de la sección vieja.
export default function Trajectory({ t }) {
  const items = [
    ...EDUCATION.filter((e) => e.start).map((e) => ({
      ...e,
      kind: "edu",
      title: t(`edu.${e.id}.title`),
      place: t(`edu.${e.id}.company`, null),
      desc: t(`edu.${e.id}.desc`),
    })),
    ...EXPERIENCE.map((e) => ({
      ...e,
      kind: "work",
      title: t(`exp.${e.id}.title`),
      place: t(`exp.${e.id}.company`),
      desc: t(`exp.${e.id}.desc`),
    })),
  ].sort((a, b) => a.start - b.start);

  // Lo que no tiene años (los idiomas) cierra la lista como una nota.
  const notes = EDUCATION.filter((e) => !e.start);

  const first = Math.min(...items.map((i) => i.start));
  const last = Math.max(...items.map((i) => i.end));
  const years = Array.from({ length: last - first + 1 }, (_, k) => first + k);

  return (
    <section
      id="experiencia"
      className="panel panel--timeline trajectory"
      data-section="experiencia"
      data-label={t("nav.experience")}
      aria-labelledby="experiencia-t"
    >
      <header className="trajectory__head">
        <h2 id="experiencia-t" className="display display--section">
          {t("exp.title")}
        </h2>
        <p className="trajectory__intro">{t("exp.intro")}</p>
      </header>

      <div className="chart" aria-hidden="true" style={{ "--years": years.length }}>
        <ol className="chart__axis">
          {years.map((y) => (
            <li key={y}>{y}</li>
          ))}
        </ol>
        {items.map((item) => (
          <div
            key={item.id}
            className={`chart__bar chart__bar--${item.kind}`}
            style={{ "--from": item.start - first + 1, "--to": item.end - first + 1 }}
          >
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <ol className="entries">
        {items.map((item) => (
          <li key={item.id} id={item.id === "unicen" ? "educacion" : undefined} className="entry">
            <p className="meta">
              {t(`exp.kind.${item.kind}`)} · <time dateTime={String(item.start)}>{item.start}</time>-
              <time dateTime={String(item.end)}>{item.end}</time>
            </p>
            <h3 className="entry__title">{item.title}</h3>
            {item.place && <p className="entry__place">{item.place}</p>}
            <p className="entry__desc">{item.desc}</p>
            {item.tags && <p className="meta">{item.tags.join(", ")}</p>}
          </li>
        ))}
        {notes.map((note) => (
          <li key={note.id} className="entry">
            <p className="meta">{t(`edu.${note.id}.period`)}</p>
            <h3 className="entry__title">{t(`edu.${note.id}.title`)}</h3>
            <p className="entry__desc">{t(`edu.${note.id}.desc`)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
