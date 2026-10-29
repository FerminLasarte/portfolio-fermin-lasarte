// Preloader (docs/DISENO.md, 7.11): se dibujan una notebook y un teléfono, pasan tres
// pantallas a la vez en los dos (en formas simples) con una palabra debajo (apps,
// backend, sistemas) y se entra en la pantalla de la notebook, que se vuelve la página.
// Es solo visual (aria-hidden): el contenido real ya está debajo. Todo el movimiento
// está en styles/preloader.css y solo se ve bajo html.pl (primera visita de la sesión,
// con JS y sin reduce motion).

// Las piezas de cada pantalla: rectángulos con su radio y su tono, y líneas (`d`) que se
// dibujan. Las de la notebook van en el sistema de su pantalla (296×181); las del
// teléfono, en el del teléfono (130×260).
const shape = (x, y, w, h, tone = "muted", r = 2) => ({ x, y, w, h, tone, r });
const wire = (d) => ({ d });
const dot = (i) => {
  const on = i === 12;
  const r = on ? 7 : 4;
  return shape(25 + (i % 5) * 20 - r, 75 + Math.floor(i / 5) * 22 - r, 2 * r, 2 * r, on ? "accent" : "muted", r);
};

// Un editor de código: la barra lateral, las pestañas y líneas con sangría.
const CODE = [
  [0, 0, 90],
  [12, 0, 120],
  [12, 1, 60],
  [24, 0, 140],
  [24, 0, 96],
  [12, 0, 40],
  [0, 0, 30],
  [0, 0, 110],
  [12, 0, 150],
  [12, 0, 84],
];

const LAPTOP = [
  // Apps: el código.
  [
    shape(0, 0, 52, 181, "faint", 0),
    shape(64, 10, 46, 7, "fill", 3.5),
    shape(118, 10, 36, 7, "muted", 3.5),
    ...CODE.map(([x, accent, w], k) => shape(66 + x, 32 + k * 13, w, 5, accent ? "accent" : "muted", 2.5)),
  ],
  // Backend: una terminal con pedidos y la respuesta de una API.
  [
    ...[14, 30, 46, 62].map((y, k) => [shape(14, y, 6, 6, "accent", 1), shape(26, y, [150, 96, 180, 120][k], 6, "muted", 3)]).flat(),
    shape(14, 86, 268, 80, "faint", 6),
    ...[100, 114, 128, 142].map((y, k) => shape(28, y, [80, 160, 120, 60][k], 5, k === 1 ? "fill" : "muted", 2.5)),
  ],
  // Sistemas: la arquitectura, con los nodos unidos por líneas que se dibujan.
  [
    wire("M72 90 C 96 90, 96 49, 120 49"),
    wire("M176 49 C 200 49, 200 90, 224 90"),
    wire("M72 90 C 96 90, 96 135, 120 135"),
    wire("M176 135 C 200 135, 200 90, 224 90"),
    shape(16, 72, 56, 36, "faint", 6),
    shape(120, 31, 56, 36, "accent", 6),
    shape(224, 72, 56, 36, "faint", 6),
    shape(120, 117, 56, 36, "faint", 6),
    shape(28, 86, 32, 6, "muted", 3),
    shape(132, 45, 32, 6, "night", 3),
    shape(236, 86, 32, 6, "muted", 3),
    shape(132, 131, 32, 6, "muted", 3),
  ],
];

const PHONE = [
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

// Una pantalla: sus piezas entran de a una (--k, de --n), en el turno --i.
// La última (`last`) queda a la vista hasta el final.
function Screen({ pieces, i, last }) {
  return (
    <g className={last ? "pl-screen pl-screen--last" : "pl-screen"} style={{ "--i": i, "--n": pieces.length }}>
      {pieces.map((p, k) =>
        p.d ? (
          <path key={k} className="pl-wire" d={p.d} pathLength="1" style={{ "--k": k }} />
        ) : (
          <rect key={k} className={`pl-${p.tone}`} x={p.x} y={p.y} width={p.w} height={p.h} rx={p.r} style={{ "--k": k }} />
        ),
      )}
    </g>
  );
}

export default function Preloader({ words }) {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="pl-stage">
        <svg className="pl-devices" viewBox="0 0 420 270">
          {/* La notebook: la tapa, la cámara y la base. */}
          <rect className="pl-body" x="10" y="10" width="320" height="205" rx="12" pathLength="100" />
          <rect className="pl-notch" x="160" y="13" width="20" height="5" rx="2.5" />
          <path className="pl-body pl-base" d="M0 219 H340 L333 231 Q331 234 327 234 H13 Q9 234 7 231 Z" pathLength="100" />
          <g transform="translate(22 22)">
            {LAPTOP.map((pieces, i) => (
              <Screen key={i} pieces={pieces} i={i} last={i === LAPTOP.length - 1} />
            ))}
            <rect className="pl-paper" width="296" height="181" rx="4" />
          </g>

          {/* El teléfono, delante: su cuerpo es opaco y tapa la esquina de la notebook. */}
          <g className="pl-phone" transform="translate(316 86) scale(0.63)">
            <rect className="pl-body pl-body--solid" x="5" y="5" width="120" height="250" rx="22" pathLength="100" />
            <rect className="pl-notch" x="47" y="14" width="36" height="9" rx="4.5" />
            {PHONE.map((pieces, i) => (
              <Screen key={i} pieces={pieces} i={i} last={i === PHONE.length - 1} />
            ))}
          </g>
        </svg>

        <p className="pl-words">
          {words.map((word, i) => (
            <span key={word} className="pl-word" style={{ "--i": i }}>
              {word}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
