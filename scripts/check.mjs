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

// 4. El script del tema (lib/theme.js) se sirve tal cual dentro de un <script> inline:
//    si no parsea, no corre nada de lo que pone antes del primer pintado (html.js, el
//    tema, el preloader y la cortina) y la página se cae al modo vertical sin que nada
//    avise. Acá se lo parsea con las interpolaciones ya resueltas.
const script = read("lib/theme.js").match(/themeInitScript = `([\s\S]*?)`;/)?.[1];
if (!script) errors.push("lib/theme.js: no se encontró themeInitScript.");
else {
  try {
    new Function(script.replace(/\$\{[^}]*\}/g, "0"));
  } catch (e) {
    errors.push(`lib/theme.js: themeInitScript no parsea como JavaScript (${e.message}).`);
  }
}

// 5. Los tiempos de la cortina: CURTAIN_MS (lib/curtain.js) tiene que valer lo mismo
//    que --dur-curtain-in y --dur-curtain-out (styles/tokens.css). Curtain.jsx espera
//    esos milisegundos antes de navegar y antes de destapar; si el CSS cambia y el JS
//    no, la cortina navega antes de terminar de tapar (se ve el salto) o destapa antes
//    de tiempo.
const curtain = read("lib/curtain.js").match(/CURTAIN_MS = \{\s*in:\s*(\d+),[^}]*out:\s*(\d+)\s*\}/);
if (!curtain) errors.push("lib/curtain.js: no se encontró CURTAIN_MS.");
else {
  for (const [i, name] of [[1, "--dur-curtain-in"], [2, "--dur-curtain-out"]]) {
    const css = tokens.match(new RegExp(`${name}:\\s*(\\d+)ms`))?.[1];
    if (css !== curtain[i]) {
      errors.push(`lib/curtain.js: CURTAIN_MS es ${curtain[i]}ms, pero ${name} vale ${css ?? "(no está)"}.`);
    }
  }
}

// 6. Las posiciones de la cortina (lib/curtain.js): `mezclar` las interpola número a
//    número, así que todas tienen que tener la misma secuencia de comandos y la misma
//    cantidad de números. Si no, los números se cruzan entre comandos distintos y la
//    forma sale cualquier cosa. Nada en el lenguaje lo obliga: agregar una posición con
//    otra forma rompería la cortina sin que nadie avise.
// Cualquier literal de path, con los comandos que sea: si la lista se limitara a los
// comandos de hoy, una posición con otros no matchearía y pasaría por "falta una"
// en vez de por lo que realmente es.
const formas = [...read("lib/curtain.js").matchAll(/"(M [A-Za-z\d\s.,-]*z)"/g)].map((m) => m[1]);
if (formas.length < 6) {
  errors.push(`lib/curtain.js: se esperaban al menos 6 posiciones del path y se encontraron ${formas.length}.`);
} else {
  const comandos = (d) => d.replace(/[\d\s.-]/g, "");
  const cuantos = (d) => d.match(/-?\d+(?:\.\d+)?/g).length;
  const [primera] = formas;
  for (const d of formas.slice(1)) {
    if (comandos(d) !== comandos(primera) || cuantos(d) !== cuantos(primera)) {
      errors.push(
        `lib/curtain.js: "${d}" no se puede interpolar con "${primera}": ` +
          `comandos ${comandos(d)} contra ${comandos(primera)}, ${cuantos(d)} números contra ${cuantos(primera)}.`,
      );
    }
  }
}

// 7. Los colores de los iconos: scripts/icons.mjs los tiene copiados, porque se sirven
//    como archivos sueltos y no pueden leer el CSS.
const icons = read("scripts/icons.mjs");
const paleta = [
  ["CLARO", "bg", light, "--accent"],
  ["CLARO", "ink", light, "--on-accent"],
  ["OSCURO", "bg", light, "--night"],
  ["OSCURO", "ink", light, "--night-accent"],
];
for (const [nombre, clave, css, cual] of paleta) {
  const bloque = icons.match(new RegExp(`const ${nombre} = \\{([^}]*)\\}`))?.[1] ?? "";
  const value = bloque.match(new RegExp(`${clave}:\\s*"(#[0-9a-fA-F]{6})"`))?.[1];
  const esperado = token(css, cual);
  if (!same(value, esperado)) {
    errors.push(
      `scripts/icons.mjs: ${nombre}.${clave} es ${value ?? "(no está)"}, pero ${cual} vale ${esperado ?? "(no está)"}.`,
    );
  }
}

if (errors.length) {
  console.error(`✖ scripts/check.mjs: ${errors.length} ${errors.length === 1 ? "problema" : "problemas"}\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
console.log(
  `✓ scripts/check.mjs: ${copies} copias de la media query horizontal iguales, ${es.size} claves en ES y EN, ` +
    `${colors} colores de lib/og.js y los 2 de THEME_COLORS iguales a los tokens, ` +
    `los tiempos de la cortina iguales en lib/curtain.js y en los tokens, sus ${formas.length} posiciones interpolables, ` +
    "los 4 colores de scripts/icons.mjs, y themeInitScript parsea.",
);
