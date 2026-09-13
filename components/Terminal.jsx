"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageProvider";

export default function Terminal() {
  const { t } = useLanguage();
  const fullText = t("projects.compiler.terminal").join("\n");
  const ref = useRef(null);
  // El efecto de tipeo lee el largo del texto actual (cambia con el idioma).
  const lengthRef = useRef(fullText.length);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    lengthRef.current = fullText.length;
  }, [fullText]);

  // Typewriter effect that starts once the terminal scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let started = false;
    let cancelled = false;
    let timeoutId;

    const type = (i) => {
      if (cancelled) return;
      setCount(i);
      if (i < lengthRef.current) {
        timeoutId = setTimeout(() => type(i + 1), Math.random() * 30 + 10);
      } else {
        setDone(true);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            observer.unobserve(entry.target);
            timeoutId = setTimeout(() => type(1), Math.random() * 30 + 10);
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(el);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  // Una vez terminado se muestra el texto completo, aunque se cambie de idioma.
  const shown = (done ? fullText : fullText.slice(0, count)).split("\n");

  return (
    <div className="terminal-body" ref={ref}>
      {shown.map((line, idx) => (
        <span key={idx}>
          {line}
          {idx < shown.length - 1 && <br />}
        </span>
      ))}
      <span className="terminal-cursor" />
    </div>
  );
}
