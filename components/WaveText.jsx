"use client";

import { useEffect, useRef } from "react";
import { HORIZONTAL_QUERY } from "@/lib/track";

const IDLE = 5000; // ms quieto (sin mouse, scroll ni teclado) antes de la ola
const STEP = 50; // ms entre letras
const LETTER = 400; // ms que dura la ola en cada letra
const TIMES = 2; // olas seguidas como máximo, hasta que se vuelva a usar la página

// Texto con la ola de douglus (el "Design & code by" de su pie; docs/DISENO.md, 7.1):
// cada letra avanza hacia la pantalla, gira y vuelve, una detrás de otra. Pasa cuando
// la página lleva 5 s quieta, dos veces como máximo (R-M5 de la re-auditoría: nada se
// mueve en loop, WCAG 2.2.2). Mover el mouse, scrollear, una tecla o un cambio de foco
// vuelven a empezar la espera y la cuenta. Solo en horizontal, que es donde se ve la
// franja. El movimiento está en styles/track.css (.wave); acá solo se decide cuándo. El
// texto real va entero para los lectores de pantalla; las letras sueltas son visuales.
export default function WaveText({ text }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const calm = matchMedia("(prefers-reduced-motion: reduce)");
    const horizontal = matchMedia(HORIZONTAL_QUERY);
    const length = (text.length - 1) * STEP + LETTER;
    let timer = 0;
    let end = 0;
    let plays = 0;

    const wait = () => {
      clearTimeout(timer);
      if (horizontal.matches && plays < TIMES) timer = setTimeout(play, IDLE);
    };
    // Actividad: la cuenta vuelve a cero y la espera empieza de nuevo.
    const wake = () => {
      plays = 0;
      wait();
    };
    function play() {
      if (calm.matches || document.hidden) return wait();
      plays += 1;
      el.classList.remove("is-waving");
      void el.offsetWidth; // reinicia la animación
      el.classList.add("is-waving");
      clearTimeout(end);
      end = setTimeout(() => {
        el.classList.remove("is-waving");
        wait();
      }, length);
    }

    // La actividad se escucha solo en horizontal (R-M16): en vertical la franja no se
    // ve y cada scroll o toque despertaba esto para nada.
    const events = ["pointermove", "scroll", "keydown", "focusin"];
    let listening = false;
    const listen = () => {
      if (horizontal.matches === listening) return;
      listening = horizontal.matches;
      for (const e of events) {
        if (listening) addEventListener(e, wake, { passive: true });
        else removeEventListener(e, wake);
      }
    };
    const onChange = () => {
      listen();
      wake();
    };
    onChange();
    horizontal.addEventListener("change", onChange);
    return () => {
      clearTimeout(timer);
      clearTimeout(end);
      events.forEach((e) => removeEventListener(e, wake));
      horizontal.removeEventListener("change", onChange);
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
