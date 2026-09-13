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

// Inter con solo los glifos que se usan (parámetro `text` de Google Fonts). Si no se
// puede bajar (por ejemplo, un build sin red), se usa la fuente por defecto de next/og.
async function loadInter(text) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&text=${encodeURIComponent(text)}`;
    const css = await fetch(url).then((r) => r.text());
    const faces = [
      ...css.matchAll(/font-weight: (\d+);[\s\S]*?src: url\((.+?)\) format\('(?:opentype|truetype)'\)/g),
    ];
    return await Promise.all(
      faces.map(async ([, weight, src]) => ({
        name: "Inter",
        weight: Number(weight),
        style: "normal",
        data: await fetch(src).then((r) => r.arrayBuffer()),
      })),
    );
  } catch {
    return [];
  }
}

export default async function Image({ params }) {
  const { lang } = await params;
  const tagline = fill(getT(lang)("meta.ogTagline"), { apps: STATS.appsLive });
  const fonts = await loadInter(`${ROLE}${PERSON.name}${tagline}`);
  const photo = await readFile(join(process.cwd(), "public/assets/foto_perfil.jpg"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 90px",
          background: "#F5F5F7",
          fontFamily: fonts.length ? "Inter" : undefined,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 640 }}>
          <div style={{ fontSize: 26, fontWeight: 600, color: "#5B5BD6" }}>{ROLE}</div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              color: "#111111",
              letterSpacing: -3,
              lineHeight: 1.05,
              marginTop: 18,
            }}
          >
            {PERSON.name}
          </div>
          <div style={{ fontSize: 30, color: "#6B6B6B", lineHeight: 1.45, marginTop: 30 }}>
            {tagline}
          </div>
        </div>
        <img
          src={`data:image/jpeg;base64,${photo.toString("base64")}`}
          width={330}
          height={330}
          alt=""
          style={{
            borderRadius: 9999,
            objectFit: "cover",
            border: "8px solid #FFFFFF",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.12)",
          }}
        />
      </div>
    ),
    { ...size, fonts },
  );
}
