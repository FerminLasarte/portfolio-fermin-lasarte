// Textos de app/global-error.js (R-M21 de la re-auditoría), con las mismas claves en
// los dos idiomas. Van aparte de lib/translations.js porque global-error es un
// componente de cliente que Next carga en todas las páginas: importar el diccionario
// sumaba 5,9 KB gz al JS de cada una.
export const ERROR_TEXT = {
  es: {
    title: "Algo salió mal",
    text: "Hubo un error al mostrar la página. Probá de nuevo o volvé al inicio.",
    retry: "Reintentar",
    back: "Volver al inicio",
    home: "/",
  },
  en: {
    title: "Something went wrong",
    text: "The page failed to load. Try again or go back to the home page.",
    retry: "Try again",
    back: "Back to home",
    home: "/en",
  },
};
