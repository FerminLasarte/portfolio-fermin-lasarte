"use client";

import { useEffect, useRef, useState } from "react";

// `lines`: las líneas ya traducidas (el idioma viene de la ruta y no cambia en la página).
export default function Terminal({ lines }) {
  const fullText = lines.join("\n");
  const length = fullText.length;
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
      if (i < length) {
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
  }, [length]);

  const shown = fullText.slice(0, count).split("\n");

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
