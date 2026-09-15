import { PERSON } from "@/lib/site";
import { fill } from "@/lib/translations";
import WaveText from "@/components/WaveText";

// Franja inferior del modo horizontal (docs/DISENO.md, 7.1): el © y el progreso del
// recorrido con el nombre de la sección visible. En vertical no se muestra. El nombre
// de la sección lo actualiza TrackController; para los lectores de pantalla ya está el
// aria-current del nav. El CV está en el hero.
export default function Strip({ t }) {
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
      <span className="strip__credit">
        <WaveText text={fill(t("strip.credit"), { city: PERSON.city })} />
      </span>
    </div>
  );
}
