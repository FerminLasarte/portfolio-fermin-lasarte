"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { translations } from "@/lib/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // Always start as 'es' so server and first client render match (no hydration
  // mismatch). The stored preference is applied right after mount.
  const [lang, setLang] = useState("es");

  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved === "es" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next = prev === "es" ? "en" : "es";
      try {
        localStorage.setItem("language", next);
      } catch (e) {}
      return next;
    });
  }, []);

  const t = useCallback(
    (key) => translations[lang]?.[key] ?? key,
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
