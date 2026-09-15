import "./globals.css";
import { DEFAULT_LOCALE, LOCALES, getT } from "@/lib/i18n";
import { ICONS, PERSON } from "@/lib/site";
import Document from "@/components/Document";
import NotFound from "@/components/NotFound";

// 404 de todas las URLs que no existen (/lo-que-sea, /en/lo-que-sea). No pasa por los
// layouts, así que arma la página completa con Document. La URL no dice en qué
// idioma mostrarla, así que es bilingüe: el nav y el footer van en el idioma por
// defecto y el mensaje, en los dos.
//
// Un 404 por idioma (app/[lang]/[...rest] con notFound()) no sirve: con un root
// layout por idioma, Next (probado en 15.5 y 16.3) no lo renderiza en el servidor (manda un documento de
// error que se completa en el navegador, sin contenido sin JS ni el script del tema).
const titles = LOCALES.map((lang) => getT(lang)("notFound.title")).join(" · ");

export const metadata = {
  title: `${titles} · ${PERSON.name}`,
  icons: ICONS,
};

export default function GlobalNotFound() {
  return (
    <Document lang={DEFAULT_LOCALE}>
      <NotFound />
    </Document>
  );
}
