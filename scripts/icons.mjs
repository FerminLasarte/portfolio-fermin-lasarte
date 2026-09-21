#!/usr/bin/env node
// Genera los tres iconos del sitio a partir de la fuente: public/favicon.svg (el que
// usan los navegadores modernos), public/favicon.ico (16, 32 y 48, para los que lo
// piden en la raíz) y public/apple-icon.png (180×180, la pantalla de inicio de iOS).
//
// La marca es la F de Archivo Display (ancho 68%, peso 800), la misma letra de los
// títulos del sitio. Va como `path` y no como `<text>`: los favicon SVG no cargan
// fuentes externas, así que con texto cada visitante veía la suya. El contorno se saca
// acá del .ttf que ya está en assets/fonts/, así que cambiar la marca es cambiar las
// constantes de abajo y volver a correr esto; no hay que editar el SVG a mano.
//
// Uso: npm run icons

import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const at = (path) => new URL(path, root);

// ---------- La marca ----------

const TTF = "assets/fonts/Archivo-Display-68-800.ttf";
const LETRA = "F";
const BOX = 64; // lado del icono, en unidades del viewBox
const RADIO = 14; // el redondeo de la esquina
const CAP = 36; // alto de la mayúscula dentro del box
const BASE = 50; // la base de la letra: deja 14 arriba y 14 abajo

// Los tokens de styles/tokens.css, copiados (esto se sirve como archivo suelto, no
// puede leer el CSS). scripts/check.mjs controla que no se separen.
const CLARO = { bg: "#a93c0b", ink: "#fff6ef" }; // --accent sobre --on-accent
const OSCURO = { bg: "#120b07", ink: "#ff9a62" }; // --night con --night-accent

// ---------- Leer el contorno del .ttf ----------

// Solo lo que hace falta para un glifo simple: cmap formato 4, loca y glyf. Las curvas
// de TrueType son cuadráticas, con puntos de control "off-curve"; entre dos seguidos va
// implícito el punto medio, que es lo que arma el path.
function contorno(file, ch) {
  const b = readFileSync(at(file));
  const u16 = (o) => b.readUInt16BE(o);
  const i16 = (o) => b.readInt16BE(o);
  const u32 = (o) => b.readUInt32BE(o);

  const tabla = {};
  for (let i = 0; i < u16(4); i++) {
    const o = 12 + i * 16;
    tabla[b.toString("ascii", o, o + 4)] = u32(o + 8);
  }

  const upem = u16(tabla.head + 18);
  const locaLarga = i16(tabla.head + 50);

  let fmt4 = 0;
  for (let i = 0; i < u16(tabla.cmap + 2); i++) {
    const sub = tabla.cmap + u32(tabla.cmap + 4 + i * 8 + 4);
    if (u16(sub) === 4) {
      fmt4 = sub;
      break;
    }
  }
  if (!fmt4) throw new Error(`${file}: sin cmap formato 4.`);

  const code = ch.codePointAt(0);
  const segX2 = u16(fmt4 + 6);
  const ends = fmt4 + 14;
  const starts = ends + segX2 + 2;
  const deltas = starts + segX2;
  const rangos = deltas + segX2;
  let gid = 0;
  for (let s = 0; s < segX2 / 2; s++) {
    if (code > u16(ends + s * 2)) continue;
    const desde = u16(starts + s * 2);
    if (code < desde) break;
    const ro = u16(rangos + s * 2);
    if (ro === 0) gid = (code + i16(deltas + s * 2)) & 0xffff;
    else {
      const g = u16(rangos + s * 2 + ro + (code - desde) * 2);
      gid = g === 0 ? 0 : (g + i16(deltas + s * 2)) & 0xffff;
    }
    break;
  }
  if (!gid) throw new Error(`${file}: no tiene "${ch}".`);

  const loca = (i) => (locaLarga ? u32(tabla.loca + i * 4) : u16(tabla.loca + i * 2) * 2);
  const g = tabla.glyf + loca(gid);
  const nContornos = i16(g);
  if (nContornos < 0) throw new Error(`${file}: "${ch}" es un glifo compuesto.`);

  const fin = [];
  for (let i = 0; i < nContornos; i++) fin.push(u16(g + 10 + i * 2));
  const nPuntos = fin[nContornos - 1] + 1;
  let p = g + 10 + nContornos * 2;
  p += 2 + u16(p); // las instrucciones del hinting, que no se usan

  const flags = [];
  while (flags.length < nPuntos) {
    const f = b[p++];
    flags.push(f);
    if (f & 8) {
      let r = b[p++];
      while (r--) flags.push(f);
    }
  }
  const eje = (corto, igual) => {
    const out = [];
    let v = 0;
    for (const f of flags) {
      if (f & corto) v += f & igual ? b[p++] : -b[p++];
      else if (!(f & igual)) {
        v += i16(p);
        p += 2;
      }
      out.push(v);
    }
    return out;
  };
  const xs = eje(2, 16);
  const ys = eje(4, 32);

  const r = (n) => Math.round(n * 100) / 100;
  let d = "";
  let desde = 0;
  for (const hasta of fin) {
    const pts = [];
    for (let i = desde; i <= hasta; i++) pts.push({ x: xs[i], y: ys[i], on: Boolean(flags[i] & 1) });
    desde = hasta + 1;

    let k = pts.findIndex((q) => q.on);
    let primero;
    if (k < 0) {
      primero = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
      k = 0;
    } else primero = pts[k];
    d += `M${r(primero.x)} ${r(primero.y)}`;

    let ctrl = null;
    for (let i = 1; i <= pts.length; i++) {
      const q = pts[(k + i) % pts.length];
      if (q.on) {
        d += ctrl ? `Q${r(ctrl.x)} ${r(ctrl.y)} ${r(q.x)} ${r(q.y)}` : `L${r(q.x)} ${r(q.y)}`;
        ctrl = null;
      } else if (ctrl) {
        d += `Q${r(ctrl.x)} ${r(ctrl.y)} ${r((ctrl.x + q.x) / 2)} ${r((ctrl.y + q.y) / 2)}`;
        ctrl = q;
      } else ctrl = q;
    }
    if (ctrl) d += `Q${r(ctrl.x)} ${r(ctrl.y)} ${r(primero.x)} ${r(primero.y)}`;
    d += "Z";
  }

  return { d, upem, xMin: i16(g + 2), xMax: i16(g + 6), yMax: i16(g + 8) };
}

// ---------- Armar los SVG ----------

const redondear = (n, p = 2) => Math.round(n * 10 ** p) / 10 ** p;

const glifo = contorno(TTF, LETRA);
// La escala sale del alto de mayúscula real de la letra, y se centra por su caja y no
// por el avance: así la F no queda corrida hacia la izquierda.
const escala = CAP / glifo.yMax;
const ancho = (glifo.xMax - glifo.xMin) * escala;
const tx = redondear(BOX / 2 - ancho / 2 - glifo.xMin * escala);
// El color va como parámetro: en el SVG de la pestaña es una variable (para el modo
// oscuro), pero al rasterizar tiene que ser literal, porque los rasterizadores no
// resuelven var() y la letra sale negra.
const letra = (fill) => `<path fill="${fill}" transform="translate(${tx} ${BASE}) scale(${redondear(escala, 5)} -${redondear(escala, 5)})"
        d="${glifo.d}"/>`;

// El de la pestaña: con el redondeo, y los colores siguiendo el modo del navegador (no
// el botón de tema del sitio, que el icono no puede ver).
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${BOX} ${BOX}" role="img" aria-label="Fermin Lasarte">
  <!-- Generado por scripts/icons.mjs a partir de ${TTF}: no editar a mano. -->
  <style>
    svg { --bg: ${CLARO.bg}; --ink: ${CLARO.ink}; }
    @media (prefers-color-scheme: dark) {
      svg { --bg: ${OSCURO.bg}; --ink: ${OSCURO.ink}; }
    }
  </style>
  <rect width="${BOX}" height="${BOX}" rx="${RADIO}" fill="var(--bg)"/>
  ${letra("var(--ink)")}
</svg>
`;

// Para rasterizar: sin media query (el .ico y el de iOS no pueden cambiar de color) y
// con los colores puestos. `radio` a 0 deja el fondo a sangre, que es lo que quiere
// iOS: el sistema le pone su propia máscara redondeada, y si el icono ya viniera
// redondeado se vería la esquina cortada dos veces.
const plano = (radio) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${BOX} ${BOX}">
  <rect width="${BOX}" height="${BOX}" rx="${radio}" fill="${CLARO.bg}"/>
  ${letra(CLARO.ink)}
</svg>
`);

// ---------- Escribir ----------

writeFileSync(at("public/favicon.svg"), svg);

// El .ico es un contenedor: una cabecera, una entrada por tamaño y los PNG pegados
// atrás. Los PNG adentro de un .ico los entienden todos los navegadores de hoy.
const tamaños = [16, 32, 48];
const pngs = await Promise.all(
  tamaños.map((n) => sharp(plano(RADIO), { density: 384 }).resize(n, n).png({ compressionLevel: 9 }).toBuffer()),
);

const cabecera = Buffer.alloc(6 + tamaños.length * 16);
cabecera.writeUInt16LE(0, 0); // reservado
cabecera.writeUInt16LE(1, 2); // 1 = icono
cabecera.writeUInt16LE(tamaños.length, 4);
let offset = cabecera.length;
tamaños.forEach((n, i) => {
  const o = 6 + i * 16;
  cabecera[o] = n === 256 ? 0 : n; // ancho
  cabecera[o + 1] = n === 256 ? 0 : n; // alto
  cabecera[o + 2] = 0; // colores de la paleta: 0, es color verdadero
  cabecera[o + 3] = 0; // reservado
  cabecera.writeUInt16LE(1, o + 4); // planos
  cabecera.writeUInt16LE(32, o + 6); // bits por pixel
  cabecera.writeUInt32LE(pngs[i].length, o + 8);
  cabecera.writeUInt32LE(offset, o + 12);
  offset += pngs[i].length;
});
writeFileSync(at("public/favicon.ico"), Buffer.concat([cabecera, ...pngs]));

// El de iOS: 180×180, a sangre y sin canal alfa (iOS no lo respeta y lo compone sobre
// negro, así que el icono tiene que venir opaco).
await sharp(plano(0), { density: 1080 })
  .resize(180, 180)
  .flatten({ background: CLARO.bg })
  .png({ compressionLevel: 9 })
  .toFile(at("public/apple-icon.png").pathname);

console.log(
  `✓ scripts/icons.mjs: "${LETRA}" de ${TTF} → favicon.svg, favicon.ico (${tamaños.join(", ")}) y apple-icon.png (180).`,
);
