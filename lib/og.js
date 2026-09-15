import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Imágenes de Open Graph (1200×630), generadas en el build: la de cada home
// (app/[lang]/opengraph-image.js) y la de cada página propia
// (app/[lang]/[page]/opengraph-image.js). Mismo diseño: una línea arriba en el acento,
// un párrafo, una o más palabras en Display y la foto a la derecha.
export const OG_SIZE = { width: 1200, height: 630 };

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
    // Las palabras grandes: angosta (wdth 68) y pesada, como .display en styles/base.css.
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

// Tamaño para que la palabra más larga entre en la columna de texto. En Archivo
// angosta y en mayúsculas cada letra mide unos 0,53em ("COMPILADOR" = 5,26em); con
// 0,55 queda margen.
const TEXT_W = OG_SIZE.width - PHOTO_W - 2 * PAD;
export const fitSize = (words, max = 176) =>
  Math.min(max, Math.floor(TEXT_W / (0.55 * Math.max(...words.map((w) => w.length)))));

//  - top: la línea de arriba, en el acento.
//  - lead: el párrafo, en --ink-muted.
//  - words: las palabras grandes, una por línea.
export function ogImage({ top, lead, words, fontSize = fitSize(words) }) {
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
          <div style={{ fontSize: 26, fontWeight: 600, color: COLOR.accent }}>{top}</div>
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
              {lead}
            </div>
            {words.map((word) => (
              <div
                key={word}
                style={{
                  fontFamily: "Archivo Display",
                  fontSize,
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
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori (next/og) solo entiende <img>. */}
        <img src={photoSrc} width={PHOTO_W} height={OG_SIZE.height} alt="" style={{ objectFit: "cover" }} />
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
