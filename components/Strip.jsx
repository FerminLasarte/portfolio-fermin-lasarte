import { PERSON } from "@/lib/site";
import { fill } from "@/lib/translations";
import WaveText from "@/components/WaveText";

// Franja inferior del modo horizontal (docs/DISENO.md, 7.1): el © y el progreso del
// recorrido con el nombre de la sección visible y, en Proyectos, en cuál se está
// ("03 / 06"): es lo que orienta una vez que el índice de la entrada ya pasó. En
// vertical no se muestra. Los dos textos los actualiza TrackController; para los
// lectores de pantalla ya está el aria-current del nav. El CV está en el hero.
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
        {/* Vacío hasta que la sección visible sea un proyecto: el texto sale del
            data-count de su panel (components/ProjectCard.jsx). */}
        <span className="strip__count" data-strip-count />
      </span>
      <span className="strip__credit">
        <WaveText text={fill(t("strip.credit"), { city: PERSON.city })} />
      </span>
    </div>
  );
}
