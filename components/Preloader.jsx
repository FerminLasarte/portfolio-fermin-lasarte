// Preloader (docs/DISENO.md, 7.11): un teléfono que se dibuja, pasan tres pantallas en
// formas simples y se entra en la última, que se vuelve la página. Es solo visual
// (aria-hidden): el contenido real ya está debajo. Todo el movimiento está en
// styles/preloader.css y solo se ve bajo html.pl (primera visita de la sesión, con JS y
// sin reduce motion).

// Las formas de cada pantalla, en el sistema del teléfono (130×260): rectángulos con
// su radio y su tono. Los puntos del calendario son rectángulos redondos.
const shape = (x, y, w, h, tone = "muted", r = 2) => ({ x, y, w, h, tone, r });
const dot = (i) => {
  const on = i === 12;
  const r = on ? 7 : 4;
  return shape(25 + (i % 5) * 20 - r, 75 + Math.floor(i / 5) * 22 - r, 2 * r, 2 * r, on ? "accent" : "muted", r);
};
const SCREENS = [
  // Una lista de reservas, con el botón abajo.
  [
    shape(17, 36, 60, 9, "fill"),
    ...[56, 92, 128].map((y) => shape(17, y, 96, 30, "muted", 6)),
    shape(17, 214, 96, 22, "accent", 11),
  ],
  // Un gráfico de barras.
  [
    shape(17, 36, 50, 9, "fill"),
    ...[150, 120, 90, 135, 105].map((y, k) => shape(21 + k * 20, y, 14, 210 - y, k === 2 ? "accent" : "muted", 0)),
  ],
  // Un calendario.
  [
    shape(17, 36, 70, 9, "fill"),
    ...Array.from({ length: 20 }, (_, i) => dot(i)),
    shape(17, 170, 96, 14, "muted", 3),
    shape(17, 190, 70, 14, "muted", 3),
  ],
];

export default function Preloader({ label }) {
  return (
    <div className="preloader" aria-hidden="true">
      <svg className="pl-phone" viewBox="0 0 130 260">
        <rect className="pl-body" x="5" y="5" width="120" height="250" rx="22" pathLength="100" />
        <rect className="pl-notch" x="47" y="14" width="36" height="9" rx="4.5" />
        {SCREENS.map((shapes, i) => (
          <g key={i} className="pl-screen" style={{ "--i": i, "--n": shapes.length }}>
            {shapes.map((s, k) => (
              <rect
                key={k}
                className={`pl-${s.tone}`}
                x={s.x}
                y={s.y}
                width={s.w}
                height={s.h}
                rx={s.r}
                style={{ "--k": k }}
              />
            ))}
          </g>
        ))}
        <rect className="pl-paper" x="10" y="10" width="110" height="240" rx="18" />
      </svg>
      <p className="pl-label">{label}</p>
    </div>
  );
}
