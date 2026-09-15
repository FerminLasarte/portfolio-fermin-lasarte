"use client";

import { useEffect, useRef } from "react";

const IDLE = 5000; // ms quieto (sin mover el mouse ni scrollear) antes de la ola
const STEP = 50; // ms entre letras
const LETTER = 400; // ms que dura la ola en cada letra

// Texto con la ola de douglus (el "Design & code by" de su pie; docs/DISENO.md, 7.1):
// cada letra avanza hacia la pantalla, gira y vuelve, una detrás de otra. Pasa cuando
// la página lleva 5 s quieta y se repite mientras siga quieta. El movimiento está en
// styles/track.css (.wave); acá solo se decide cuándo. El texto real va entero para los
// lectores de pantalla; las letras sueltas son visuales.
export default function WaveText({ text }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const calm = matchMedia("(prefers-reduced-motion: reduce)");
    const length = (text.length - 1) * STEP + LETTER;
    let timer = 0;

    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(play, IDLE);
    };
    function play() {
      if (calm.matches || document.hidden) return schedule();
      el.classList.remove("is-waving");
      void el.offsetWidth; // reinicia la animación
      el.classList.add("is-waving");
      timer = setTimeout(() => {
        el.classList.remove("is-waving");
        schedule();
      }, length);
    }

    schedule();
    addEventListener("pointermove", schedule, { passive: true });
    addEventListener("scroll", schedule, { passive: true });
    return () => {
      clearTimeout(timer);
      removeEventListener("pointermove", schedule);
      removeEventListener("scroll", schedule);
    };
  }, [text]);

  return (
    <span ref={ref} className="wave">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {[...text].map((ch, i) => (
          <span key={i} className="wave__ch" style={{ "--i": i }}>
            {ch}
          </span>
        ))}
      </span>
    </span>
  );
}
