// Funciones de texto que comparten varios componentes (R-M30 de la re-auditoría).

// Los dos últimos dígitos de un año: 2025 → "25" (el fin de los años grandes de
// Trayectoria, en la home y en su página).
export const twoDigits = (year) => String(year).slice(-2);

// Índice de la primera letra de cada palabra dentro del texto sin espacios, para
// escalonar una entrada letra por letra (el nombre del hero y el del preloader):
// ["Fermin", "Lasarte"] → [0, 6].
export const wordStarts = (words) => words.map((_, w) => words.slice(0, w).join("").length);
