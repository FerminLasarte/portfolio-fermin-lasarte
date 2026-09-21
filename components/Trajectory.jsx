import { EDUCATION_NOTES, STAGES } from "@/lib/site";
import { pagePath } from "@/lib/i18n";
import { twoDigits } from "@/lib/text";

// Trayectoria (docs/DISENO.md, 7.4): vista previa en etapas, como el "Process" de
// douglus. Una columna por etapa, en orden, con el rango de años enorme, una línea que
// las une (se dibuja con el scroll) y una sola línea de texto; los idiomas, que no
// tienen años, van como nota. Los años grandes son visuales (aria-hidden): las fechas
// también están en texto, con <time>. La etapa de UNICEN lleva id="educacion", el ancla
// de la sección vieja. El detalle completo está en su página (7.12).
export default function Trajectory({ t, lang }) {
  const now = new Date().getFullYear();
  const stages = STAGES.map((s) =>
    s.kind === "work"
      ? { ...s, title: t(`exp.${s.id}.company`), place: t(`exp.${s.id}.title`), line: t(`exp.${s.id}.short`) }
      : { ...s, title: t(`edu.${s.id}.title`), place: s.label, line: t(`edu.${s.id}.short`) },
  ).sort((a, b) => a.start - b.start);
  const latest = Math.max(...stages.map((s) => s.start));

  return (
    <section
      id="experiencia"
      className="panel panel--timeline trajectory"
      data-section="experiencia"
      data-label={t("nav.experience")}
      aria-labelledby="experiencia-t"
    >
      <div className="trajectory__side">
        <h2 id="experiencia-t" className="display display--section">
          {t("exp.title")}
        </h2>
        <p className="lead trajectory__intro">{t("exp.lead")}</p>
        {EDUCATION_NOTES.map((note) => (
          <p key={note.id} className="trajectory__note">
            <span className="meta">{t(`edu.${note.id}.label`)}</span>
            <strong>{t(`edu.${note.id}.title`)}</strong>
          </p>
        ))}
        <a className="btn trajectory__more" href={pagePath(lang, "experience")} data-curtain={t("exp.title")}>
          <span className="btn__label">{t("exp.more")}</span>
        </a>
      </div>

      <ol className="stages">
        {stages.map((s, i) => (
          <li
            key={s.id}
            id={s.id === "unicen" ? "educacion" : undefined}
            className={`stage stage--${s.kind}${s.start === latest ? " stage--latest" : ""}`}
            style={{ "--col": i + 1 }}
          >
            <p className="years stage__years" aria-hidden="true">
              <span>{s.start}</span>
              <span className="years__end">–{twoDigits(s.end)}</span>
            </p>
            <span className="stage__dot" aria-hidden="true" />
            <div className="stage__body">
              <p className="meta">
                {t(`exp.kind.${s.kind}`)} · <time dateTime={String(s.start)}>{s.start}</time>–
                <time dateTime={String(s.end)}>{s.end}</time>
              </p>
              <h3 className="stage__title">{s.title}</h3>
              <p className="stage__place">
                {s.place}
                {s.end >= now && ` · ${t("exp.ongoing")}`}
              </p>
              <p className="stage__line">{s.line}</p>
              {s.tags && <p className="meta">{s.tags.join(", ")}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
