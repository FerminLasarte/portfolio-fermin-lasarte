"use client";

import { useEffect } from "react";
import { setLenis } from "@/lib/scroll";
import { HORIZONTAL_QUERY } from "@/lib/track";
import { FINE_POINTER, MOTION_OK } from "@/lib/media";

const WANTED = `${FINE_POINTER} and ${MOTION_OK}`;
const FRAME = 1000 / 60; // el primer paso de cada movimiento: un frame común

// Scroll suave con la rueda (docs/DISENO.md, 7.10): Lenis, como en douglus, pero sobre
// el scroll del documento. Solo interpola la rueda; la barra, el teclado, "buscar en la
// página" y las anclas siguen siendo nativos, y la pista la sigue moviendo el CSS.
//  - Solo con puntero fino y sin reduce motion; en táctil queda el scroll nativo, y
//    Lenis ni se descarga: se importa recién cuando hace falta (R-M16).
//  - El requestAnimationFrame corre solo mientras Lenis mueve el scroll (R-M16):
//    arranca con la rueda o con un salto de smoothScrollTo y para cuando la animación
//    termina. Con la página quieta no hay trabajo en cada frame.
//  - En horizontal, el gesto de costado del trackpad también mueve la pista. Solo
//    donde hay pista (la home): en las páginas propias no hay nada que mover de
//    costado (R-M12).
export default function SmoothScroll() {
  useEffect(() => {
    const wanted = matchMedia(WANTED);
    const horizontal = matchMedia(HORIZONTAL_QUERY);
    let lenis = null;
    let loading = false;
    let alive = true;
    let raf = 0;
    let last = 0; // el tiempo del frame anterior; 0 si el bucle estaba parado
    let clock = 0; // el reloj que ve Lenis: solo avanza mientras el bucle corre

    // Lenis calcula cada paso con el tiempo desde el anterior. Si viera el rato que el
    // bucle estuvo parado como un solo frame, llegaría de golpe al destino; por eso ve
    // un reloj propio, que después de una pausa avanza un frame común.
    const frame = (time) => {
      raf = 0;
      if (!lenis) return;
      clock += last ? time - last : FRAME;
      last = time;
      lenis.raf(clock);
      if (lenis.isScrolling === "smooth") raf = requestAnimationFrame(frame);
      else last = 0;
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const orient = () => {
      if (!lenis) return;
      const track = horizontal.matches && document.querySelector(".h-scroll");
      lenis.options.gestureOrientation = track ? "both" : "vertical";
    };
    const sync = async () => {
      if (wanted.matches && !lenis && !loading) {
        loading = true;
        const { default: Lenis } = await import("lenis");
        loading = false;
        if (!alive || !wanted.matches || lenis) return;
        lenis = new Lenis({ lerp: 0.1, allowNestedScroll: true });
        // Le da a Lenis un primer tiempo: sin eso, su primer paso (la primera rueda
        // después de cargar) no avanzaría y llegaría un frame tarde.
        clock = FRAME;
        lenis.raf(clock);
        lenis.on("virtual-scroll", start); // la rueda o el trackpad
        setLenis(lenis, start);
        orient();
      } else if (!wanted.matches && lenis) {
        cancelAnimationFrame(raf);
        raf = 0;
        last = 0;
        lenis.destroy();
        lenis = null;
        setLenis(null);
      }
    };

    sync();
    wanted.addEventListener("change", sync);
    horizontal.addEventListener("change", orient);

    return () => {
      alive = false;
      wanted.removeEventListener("change", sync);
      horizontal.removeEventListener("change", orient);
      cancelAnimationFrame(raf);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
