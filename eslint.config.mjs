import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

// eslint-config-next 15 todavía exporta la configuración en el formato viejo
// (eslintrc); FlatCompat la convierte al formato plano del CLI de ESLint 9.
const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
});

const config = [
  { ignores: [".next/", "out/", "build/"] },
  // Sin esto el CLI solo revisa .js, .mjs y .cjs, y se saltea los componentes .jsx.
  { files: ["**/*.{js,jsx,mjs,cjs}"] },
  ...compat.extends("next/core-web-vitals"),
];

export default config;
