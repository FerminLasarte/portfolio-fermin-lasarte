import TrackController from "@/components/TrackController";

// Pista horizontal (docs/DISENO.md, sección 6). En PC, con JS y sin reduce motion, los
// paneles van en fila dentro de un contenedor sticky y el scroll vertical los mueve de
// costado; en cualquier otro caso se apilan. `stages` es la cantidad de etapas de
// Trayectoria, que decide el ancho de su panel y con eso el largo exacto de la pista
// (styles/track.css).
export default function Track({ stages, children }) {
  return (
    <div className="h-scroll" style={{ "--n-stage": stages }}>
      <div className="h-sticky">
        <div className="h-track">{children}</div>
      </div>
      <TrackController />
    </div>
  );
}
