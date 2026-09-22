// Funciones de texto que comparten varios componentes (R-M30 de la re-auditoría).

// Los dos últimos dígitos de un año: 2025 → "25" (el fin de los años grandes de
// Trayectoria, en la home y en su página).
export const twoDigits = (year) => String(year).slice(-2);

// El número de un proyecto, con cero adelante: 3 → "03". Lo usan el índice de
// Proyectos, el número de cada tarjeta y el contador de la franja, así que los tres
// escriben igual (components/Projects.jsx, ProjectCard.jsx y TrackController.jsx).
export const padded = (n) => String(n).padStart(2, "0");

// Índice de la primera letra de cada palabra dentro del texto sin espacios, para
// escalonar una entrada letra por letra (el nombre del hero y el del preloader):
// ["Fermin", "Lasarte"] → [0, 6].
export const wordStarts = (words) => words.map((_, w) => words.slice(0, w).join("").length);
