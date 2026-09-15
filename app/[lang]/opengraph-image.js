import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fill } from "@/lib/translations";
import { LOCALES, getT } from "@/lib/i18n";
import { PERSON, ROLE, SITE_TITLE, STATS } from "@/lib/site";

// Imagen de Open Graph de cada idioma (1200×630), generada en el build. X (Twitter)
// usa la misma, porque no hay twitter-image. El texto alternativo es el <title>, que
// es igual en los dos idiomas (así la imagen puede ser estática).
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = SITE_TITLE;

// Una imagen por idioma, prerenderizada (sin esto el route handler es dinámico).
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

// next/og no lee variables de CSS: estos son los valores del tema claro de
// styles/tokens.css, copiados a mano. Si cambia un token, hay que cambiarlo acá.
const COLOR = {
  paper: "#F1F2EE", // --paper
  ink: "#101214", // --ink
  inkMuted: "#4E5358", // --ink-muted
  accent: "#6224F0", // --accent
};

// Archivo, leída del repo para que el build no dependa de la red. Son instancias
// estáticas (assets/fonts/README.md): Satori no aplica los ejes de la variable.
// Si falta un archivo, el build falla con ENOENT en vez de usar otra fuente.
const FONTS_DIR = join(process.cwd(), "assets/fonts");
const fonts = await Promise.all(
  [
    // El nombre: angosta (wdth 68) y pesada, como .display en styles/base.css.
    { name: "Archivo Display", weight: 800, file: "Archivo-Display-68-800.ttf" },
    { name: "Archivo", weight: 600, file: "Archivo-SemiBold.ttf" },
    { name: "Archivo", weight: 400, file: "Archivo-Regular.ttf" },
  ].map(async ({ name, weight, file }) => ({
    name,
    weight,
    style: "normal",
    data: await readFile(join(FONTS_DIR, file)),
  })),
);

const photo = await readFile(join(process.cwd(), "public/assets/foto_perfil.jpg"));
const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

const PAD = 64;
const PHOTO_W = 440;

export default async function Image({ params }) {
  const { lang } = await params;
  const tagline = fill(getT(lang)("meta.ogTagline"), { apps: STATS.appsLive });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: COLOR.paper,
          fontFamily: "Archivo",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: `${PAD - 8}px ${PAD}px ${PAD - 12}px`,
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 600, color: COLOR.accent }}>{ROLE}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 26,
                lineHeight: 1.35,
                color: COLOR.inkMuted,
                maxWidth: 560,
                marginBottom: 30,
              }}
            >
              {tagline}
            </div>
            {/* Una palabra por línea, como el nombre del hero. */}
            {PERSON.name.split(" ").map((word) => (
              <div
                key={word}
                style={{
                  fontFamily: "Archivo Display",
                  fontSize: 176,
                  fontWeight: 800,
                  lineHeight: 0.86,
                  letterSpacing: "-0.01em",
                  textTransform: "uppercase",
                  color: COLOR.ink,
                }}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
        <img
          src={photoSrc}
          width={PHOTO_W}
          height={size.height}
          alt=""
          style={{ objectFit: "cover" }}
        />
      </div>
    ),
    { ...size, fonts },
  );
}
