"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/scroll";
import { HORIZONTAL_QUERY } from "@/lib/track";

const WANTED = "(pointer: fine) and (prefers-reduced-motion: no-preference)";

// Scroll suave con la rueda (docs/DISENO.md, 7.10): Lenis, como en douglus, pero sobre
// el scroll del documento. Solo interpola la rueda; la barra, el teclado, "buscar en la
// página" y las anclas siguen siendo nativos, y la pista la sigue moviendo el CSS.
//  - Solo con puntero fino y sin reduce motion; en táctil queda el scroll nativo.
//  - En horizontal, el gesto de costado del trackpad también mueve la pista.
export default function SmoothScroll() {
  useEffect(() => {
    const wanted = matchMedia(WANTED);
    const horizontal = matchMedia(HORIZONTAL_QUERY);
    let lenis = null;

    const orient = () => {
      if (lenis) lenis.options.gestureOrientation = horizontal.matches ? "both" : "vertical";
    };
    const sync = () => {
      if (wanted.matches && !lenis) {
        lenis = new Lenis({ lerp: 0.1, autoRaf: true, allowNestedScroll: true });
        setLenis(lenis);
        orient();
      } else if (!wanted.matches && lenis) {
        lenis.destroy();
        lenis = null;
        setLenis(null);
      }
    };

    sync();
    wanted.addEventListener("change", sync);
    horizontal.addEventListener("change", orient);

    return () => {
      wanted.removeEventListener("change", sync);
      horizontal.removeEventListener("change", orient);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
