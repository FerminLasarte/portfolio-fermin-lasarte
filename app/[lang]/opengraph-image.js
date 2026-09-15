import { fill } from "@/lib/translations";
import { LOCALES, getT } from "@/lib/i18n";
import { OG_SIZE, ogImage } from "@/lib/og";
import { PERSON, ROLE, SITE_TITLE, STATS } from "@/lib/site";

// Imagen de Open Graph de cada idioma (1200×630, diseño en lib/og.js), generada en el
// build. X (Twitter) usa la misma, porque no hay twitter-image. El texto alternativo
// es el <title>, que es igual en los dos idiomas (así la imagen puede ser estática).
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = SITE_TITLE;

// Una imagen por idioma, prerenderizada (sin esto el route handler es dinámico).
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function Image({ params }) {
  const { lang } = await params;
  return ogImage({
    top: ROLE,
    lead: fill(getT(lang)("meta.ogTagline"), { apps: STATS.appsLive }),
    // Una palabra por línea, como el nombre del hero.
    words: PERSON.name.split(" "),
    fontSize: 176,
  });
}
