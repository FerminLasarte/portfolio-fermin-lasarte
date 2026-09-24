// Funciones de texto que comparten varios componentes (R-M30 de la re-auditoría).

// Los dos últimos dígitos de un año: 2025 → "25" (el fin de los años grandes de
// Trayectoria, en la home y en su página).
export const twoDigits = (year) => String(year).slice(-2);

// El guion de los rangos de años, con un espacio a cada lado: "2024 – 2025". El de
// adelante no corta, así el guion nunca empieza una línea. Lo usan todas las fechas
// del sitio (components/Years.jsx y el índice de Trabajos).
export const RANGE_DASH = "\u00a0– ";
export const yearRange = (start, end) => `${start}${RANGE_DASH}${end}`;

// Si una etapa de Trayectoria sigue en curso: la que no tiene año de fin (`end: null`,
// lo que se está haciendo ahora) y la que termina este año sin estar marcada como
// terminada (`done`).
export const isOngoing = (stage, now) => stage.end == null || (stage.end >= now && !stage.done);

// El número de un proyecto, con cero adelante: 3 → "03". Lo usan el índice de
// Proyectos y la página de cada uno, así que los dos escriben igual
// (components/ProjectIndex.jsx y ProjectPage.jsx).
export const padded = (n) => String(n).padStart(2, "0");

// Índice de la primera letra de cada palabra dentro del texto sin espacios, para
// escalonar una entrada letra por letra (el nombre del hero y el del preloader):
// ["Fermin", "Lasarte"] → [0, 6].
export const wordStarts = (words) => words.map((_, w) => words.slice(0, w).join("").length);
