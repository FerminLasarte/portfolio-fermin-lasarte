#!/usr/bin/env node
// Controles del repo que corren antes de cada build: `npm run build` corre primero
// `prebuild` (R-M31 de la re-auditoría). Sin dependencias: lee los archivos como texto.
// Si algo no coincide, termina con error y el build se detiene (también en Vercel), con
// un mensaje que dice qué arreglar.
//  1. La media query del modo horizontal. El CSS no puede importarla, así que está
//     copiada en varias hojas de styles/: cada copia tiene que ser igual a
//     HORIZONTAL_QUERY (lib/track.js).
//  2. El diccionario: las mismas claves en español y en inglés (lib/translations.js).
//  3. Los colores copiados a mano de styles/tokens.css: los de la imagen de Open Graph
//     (lib/og.js) y los de la barra del navegador (THEME_COLORS, lib/theme.js).
//
// Uso: node scripts/check.mjs (o npm run check)

import { readFileSync, readdirSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const errors = [];

// 1. La media query horizontal: cualquier @media con el ancho del modo horizontal y el
//    puntero fino es una copia, y tiene que ser idéntica.
const query = read("lib/track.js").match(/HORIZONTAL_QUERY =\s*"([^"]+)"/)?.[1];
if (!query) errors.push("lib/track.js: no se encontró HORIZONTAL_QUERY.");
let copies = 0;
for (const file of readdirSync(new URL("styles/", root)).filter((f) => f.endsWith(".css"))) {
  read(`styles/${file}`)
    .split("\n")
    .forEach((line, i) => {
      const media = line.match(/^\s*@media\s+(.+?)\s*\{\s*$/)?.[1];
      if (!media || !media.includes("min-width: 64rem") || !media.includes("pointer: fine")) return;
      copies++;
      if (media !== query) {
        errors.push(
          `styles/${file}:${i + 1}: la media query horizontal no es igual a la de lib/track.js.\n` +
            `      acá:      ${media}\n      track.js: ${query}`,
        );
      }
    });
}
if (!copies) errors.push("styles/: no se encontró ninguna copia de la media query horizontal.");

// 2. Las claves del diccionario, en los dos idiomas.
const dict = read("lib/translations.js");
const block = (lang) => dict.split(new RegExp(`^  ${lang}: \\{$`, "m"))[1]?.split(/^ {2}\},?$/m)[0] ?? "";
const keys = (lang) => new Set([...block(lang).matchAll(/^\s+"([\w.]+)":/gm)].map((m) => m[1]));
const es = keys("es");
const en = keys("en");
if (!es.size || !en.size) errors.push("lib/translations.js: no se encontraron las claves de los dos idiomas.");
for (const k of es) if (!en.has(k)) errors.push(`lib/translations.js: "${k}" está en español y falta en inglés.`);
for (const k of en) if (!es.has(k)) errors.push(`lib/translations.js: "${k}" está en inglés y falta en español.`);

// 3. Los colores copiados de los tokens: el tema claro está en :root; el oscuro, en
//    html.dark-mode.
const tokens = read("styles/tokens.css");
const light = tokens.split(/^:root \{$/m)[1]?.split(/^\}$/m)[0] ?? "";
const dark = tokens.split("html.dark-mode {")[1]?.split("}")[0] ?? "";
const token = (css, name) => css.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{3,8})\\s*;`))?.[1];
const same = (a, b) => Boolean(a && b) && a.toLowerCase() === b.toLowerCase();
let colors = 0;
for (const [, value, name] of read("lib/og.js").matchAll(/"(#[0-9a-fA-F]{6})",\s*\/\/\s*(--[\w-]+)/g)) {
  colors++;
  if (!same(value, token(light, name))) {
    errors.push(`lib/og.js: ${name} es ${value}, pero en styles/tokens.css vale ${token(light, name) ?? "(no está)"}.`);
  }
}
if (!colors) errors.push("lib/og.js: no se encontraron los colores (\"#RRGGBB\", // --token).");
const theme = read("lib/theme.js");
for (const [key, css] of [["light", light], ["dark", dark]]) {
  const value = theme.match(new RegExp(`${key}:\\s*"(#[0-9a-fA-F]{6})"`))?.[1];
  if (!same(value, token(css, "--paper"))) {
    errors.push(`lib/theme.js: THEME_COLORS.${key} es ${value}, pero --paper vale ${token(css, "--paper") ?? "(no está)"}.`);
  }
}

if (errors.length) {
  console.error(`✖ scripts/check.mjs: ${errors.length} ${errors.length === 1 ? "problema" : "problemas"}\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
console.log(
  `✓ scripts/check.mjs: ${copies} copias de la media query horizontal iguales, ${es.size} claves en ES y EN, ` +
    `${colors} colores de lib/og.js y los 2 de THEME_COLORS iguales a los tokens.`,
);
