"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// ¿Se puede escribir en el portapapeles? En el servidor no se sabe: el botón recién
// aparece al hidratar, y si el navegador no lo permite no aparece nunca.
const noSubscribe = () => () => {};
const hasClipboard = () => Boolean(navigator.clipboard?.writeText);
const onServer = () => false;

// Botón para copiar el email (M16). Durante 2 s dice "Copiado", y lo anuncia a los
// lectores de pantalla con una región aria-live.
export default function CopyEmail({ email, label, done, className }) {
  const available = useSyncExternalStore(noSubscribe, hasClipboard, onServer);
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  if (!available) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button type="button" className={className} onClick={copy}>
        {copied ? done : label}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? done : ""}
      </span>
    </>
  );
}
