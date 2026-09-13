#!/usr/bin/env node
// Quita los metadatos (EXIF, XMP, IPTC, comentarios, fechas) de JPEG y PNG sin
// recomprimir la imagen. Conserva el perfil de color (ICC) y lo que hace falta
// para decodificar.
//
// Uso: node scripts/strip-metadata.mjs public/assets/*.jpeg public/assets/*.png

import { readFileSync, writeFileSync } from "node:fs";

// JPEG: se descartan APP1 (EXIF/XMP), APP3–APP13 (IPTC/Photoshop), APP15 y COM.
// Se conservan APP0 (JFIF), APP2 (ICC) y APP14 (Adobe, afecta al color).
const JPEG_KEEP_APP = new Set([0xe0, 0xe2, 0xee]);

function stripJpeg(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) throw new Error("no es un JPEG");
  const out = [buf.subarray(0, 2)];
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) throw new Error(`marcador inválido en ${i}`);
    const marker = buf[i + 1];
    // SOS: a partir de aquí van los datos de la imagen, se copian tal cual.
    if (marker === 0xda) {
      out.push(buf.subarray(i));
      break;
    }
    const len = buf.readUInt16BE(i + 2);
    const segment = buf.subarray(i, i + 2 + len);
    const isApp = marker >= 0xe0 && marker <= 0xef;
    const isComment = marker === 0xfe;
    if (!(isComment || (isApp && !JPEG_KEEP_APP.has(marker)))) out.push(segment);
    i += 2 + len;
  }
  return Buffer.concat(out);
}

// PNG: se descartan los chunks de texto, EXIF y fecha.
const PNG_DROP = new Set(["tEXt", "zTXt", "iTXt", "eXIf", "tIME"]);

function stripPng(buf) {
  const signature = buf.subarray(0, 8);
  if (signature.toString("hex") !== "89504e470d0a1a0a") throw new Error("no es un PNG");
  const out = [signature];
  let i = 8;
  while (i < buf.length) {
    const len = buf.readUInt32BE(i);
    const type = buf.toString("latin1", i + 4, i + 8);
    const chunk = buf.subarray(i, i + 12 + len);
    if (!PNG_DROP.has(type)) out.push(chunk);
    i += 12 + len;
    if (type === "IEND") break;
  }
  return Buffer.concat(out);
}

for (const file of process.argv.slice(2)) {
  const buf = readFileSync(file);
  const stripped = /\.png$/i.test(file) ? stripPng(buf) : stripJpeg(buf);
  writeFileSync(file, stripped);
  console.log(`${file}: ${buf.length} → ${stripped.length} bytes`);
}
