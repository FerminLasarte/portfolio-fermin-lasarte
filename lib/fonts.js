import localFont from "next/font/local";

// Archivo variable, recortada a lo que usa el sitio (R-M14 de la re-auditoría): pesos
// de 400 a 800 y anchos de 68% a 100% (docs/DISENO.md, sección 3), solo latín. Pesa
// 57 KB en vez de 88: Google Fonts manda siempre todos los pesos (100 a 900) y anchos
// (62% a 125%), aunque se pidan menos. Cómo se genera: assets/fonts/README.md.
// La usan Document y app/global-error.js.
export const archivo = localFont({
  src: "../assets/fonts/Archivo-web.woff2",
  weight: "400 800",
  // Sin el rango de ancho, el navegador toma la fuente como de ancho normal y no
  // aplica el font-stretch de los títulos.
  declarations: [{ prop: "font-stretch", value: "68% 100%" }],
  variable: "--font-archivo",
  display: "swap",
  // La fuente de respaldo mientras carga es la de antes: Arial con las medidas que
  // calculaba next/font/google (styles/tokens.css). Las que calcula next/font/local
  // desde este archivo (size-adjust 102,8%) movían más el layout al llegar la fuente.
  adjustFontFallback: false,
  fallback: ["Archivo Fallback"],
});
