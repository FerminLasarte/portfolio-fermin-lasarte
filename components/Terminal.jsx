"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  "> Inicializando motor del compilador UNICEN...",
  "> Cargando analizador léxico y parser LL(1)... OK",
  "> Generando Abstract Syntax Tree... OK",
  "> Traducción a Bytecode completada en 0.42s.",
  "> ",
];

const FULL_TEXT = LINES.join("\n");

export default function Terminal() {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

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
      if (i < FULL_TEXT.length) {
        timeoutId = setTimeout(() => type(i + 1), Math.random() * 30 + 10);
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

  const shown = FULL_TEXT.slice(0, count).split("\n");

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
