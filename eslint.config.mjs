import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

// eslint-config-next 16 ya exporta la configuración en el formato plano de ESLint 9.
// core-web-vitals no activa no-unused-vars; va como aviso (R-M35 de la re-auditoría).
// `.claude/` se ignora: ahí quedan los worktrees de otras sesiones, con su propia copia
// del código (N5).
const eslintConfig = defineConfig([
  ...nextVitals,
  { rules: { "no-unused-vars": "warn" } },
  globalIgnores([".next/**", "out/**", "build/**", ".claude/**"]),
]);

export default eslintConfig;
