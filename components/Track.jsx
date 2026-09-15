import TrackController from "@/components/TrackController";

// Pista horizontal (docs/DISENO.md, sección 6). En PC, con JS y sin reduce motion, los
// paneles van en fila dentro de un contenedor sticky y el scroll vertical los mueve de
// costado; en cualquier otro caso se apilan. `cards` y `cardsLg` son la cantidad de
// paneles de proyecto de cada ancho: el CSS los usa para calcular el largo exacto de
// la pista (styles/track.css).
export default function Track({ cards, cardsLg, children }) {
  return (
    <div className="h-scroll" style={{ "--n-card": cards, "--n-card-lg": cardsLg }}>
      <div className="h-sticky">
        <div className="h-track">{children}</div>
      </div>
      <TrackController />
    </div>
  );
}
