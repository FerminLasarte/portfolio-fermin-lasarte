"use client";

import { useSyncExternalStore } from "react";
import { toggleTheme } from "@/lib/theme";
import Icon from "@/components/Icon";
import { faMoon, faSun } from "@/lib/icons";

// El tema lo decide la clase `dark-mode` de <html> (lib/theme.js), así que el estado
// del botón se lee de ahí. En el servidor no se sabe: se corrige al hidratar.
const subscribe = (onChange) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
};
const isDark = () => document.documentElement.classList.contains("dark-mode");
const onServer = () => false;

// Botón de tema oscuro (M3): aria-pressed dice si está activo. El icono lo cambia el CSS.
export default function ThemeToggle({ label, className = "" }) {
  const dark = useSyncExternalStore(subscribe, isDark, onServer);

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      aria-label={label}
      aria-pressed={dark}
      onClick={toggleTheme}
    >
      <Icon icon={faMoon} />
      <Icon icon={faSun} />
    </button>
  );
}
