#!/usr/bin/env node
// Quita los metadatos (EXIF, XMP, IPTC, comentarios, fechas) de JPEG, PNG y WebP sin
// recomprimir la imagen. Conserva el perfil de color (ICC) y lo que hace falta
// para decodificar.
//
// Uso: node scripts/strip-metadata.mjs public/assets/*.jpeg public/assets/*.png public/assets/*.webp

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

// WebP (RIFF): se descartan los chunks EXIF y XMP, y se apagan sus flags en VP8X.
// Se conserva ICCP (perfil de color).
const WEBP_DROP = new Set(["EXIF", "XMP "]);
const VP8X_EXIF = 0x08;
const VP8X_XMP = 0x04;

function stripWebp(buf) {
  if (buf.toString("latin1", 0, 4) !== "RIFF" || buf.toString("latin1", 8, 12) !== "WEBP") {
    throw new Error("no es un WebP");
  }
  const out = [];
  let i = 12;
  while (i + 8 <= buf.length) {
    const type = buf.toString("latin1", i, i + 4);
    const len = buf.readUInt32LE(i + 4);
    const chunk = Buffer.from(buf.subarray(i, i + 8 + len + (len % 2))); // los chunks van alineados a 2 bytes
    if (type === "VP8X") chunk[8] &= ~(VP8X_EXIF | VP8X_XMP);
    if (!WEBP_DROP.has(type)) out.push(chunk);
    i += 8 + len + (len % 2);
  }
  const body = Buffer.concat(out);
  const header = Buffer.alloc(12);
  header.write("RIFF", 0, "latin1");
  header.writeUInt32LE(4 + body.length, 4);
  header.write("WEBP", 8, "latin1");
  return Buffer.concat([header, body]);
}

for (const file of process.argv.slice(2)) {
  const buf = readFileSync(file);
  const stripped = /\.png$/i.test(file)
    ? stripPng(buf)
    : /\.webp$/i.test(file)
      ? stripWebp(buf)
      : stripJpeg(buf);
  writeFileSync(file, stripped);
  console.log(`${file}: ${buf.length} → ${stripped.length} bytes`);
}
