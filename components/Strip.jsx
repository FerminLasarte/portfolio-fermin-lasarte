import { CV, PERSON } from "@/lib/site";

// Franja inferior del modo horizontal (docs/DISENO.md, 7.1): el ©, el progreso del
// recorrido con el nombre de la sección visible y el CV del idioma de la página. En
// vertical no se muestra. El nombre de la sección lo actualiza TrackController; para
// los lectores de pantalla ya está el aria-current del nav.
export default function Strip({ t, lang }) {
  const cv = CV.find((c) => c.lang === lang) ?? CV[0];

  return (
    <div className="strip">
      <span>
        © {new Date().getFullYear()} {PERSON.name}
      </span>
      <span className="strip__progress" aria-hidden="true">
        <span className="strip__rail">
          <span className="strip__fill" />
        </span>
        <span data-strip-label>{t("nav.about")}</span>
      </span>
      <a className="strike" href={cv.href} download={cv.download}>
        {t("hero.cvBtn")}
      </a>
    </div>
  );
}
