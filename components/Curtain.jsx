"use client";

import { useEffect } from "react";
import { CURTAIN_KEY, CURTAIN_MS, curtainSupported } from "@/lib/curtain";

// Cortina entre páginas (docs/DISENO.md, 8; styles/curtain.css), la de douglus: tapa
// la pantalla de abajo hacia arriba con el borde curvo, muestra el nombre del destino
// y del otro lado se retira. El movimiento es todo CSS; acá va lo que el CSS no puede:
//
//  - Frenar el clic. La navegación entre documentos no espera a nadie, así que el
//    enlace se corta, se tapa la pantalla y recién ahí se va a la otra página. Lo que
//    va a la siguiente es el nombre del destino, en sessionStorage: el resto lo hace
//    el script del tema (lib/theme.js), que tapa la pantalla antes del primer pintado.
//  - Retirarla al llegar, después de que TrackController haya puesto la pista en su
//    sección (su efecto corre antes que este, por el orden del árbol). Eso es lo que
//    saca el parpadeo del hero al volver de Trayectoria o de Habilidades.
//  - Avisar con `curtain:done`, que es cuando entran los paneles que ya se ven
//    (components/TrackController.jsx).
//
// Sin JS, con reduce motion o sin `d` en CSS no hay cortina y la navegación es la de
// siempre: en esos casos la página es vertical y el ancla la resuelve el navegador.
export default function Curtain() {
  useEffect(() => {
    const root = document.documentElement;
    const path = document.querySelector(".curtain__path");
    const done = () => dispatchEvent(new Event("curtain:done"));

    // Espera a que la cortina termine de moverse. El `animationend` del path es lo
    // exacto; el timeout es el respaldo para cuando no llega: con la pestaña en
    // segundo plano el navegador pausa las animaciones, y ahí nadie está mirando,
    // pero la navegación tiene que seguir igual.
    const onEnd = (fn, ms) => {
      let called = false;
      const run = () => {
        if (called) return;
        called = true;
        clearTimeout(timer);
        path?.removeEventListener("animationend", run);
        fn();
      };
      const timer = setTimeout(run, ms + 200);
      path?.addEventListener("animationend", run);
      return run;
    };

    // Llegada: el script del tema ya dejó la pantalla tapada.
    if (root.classList.contains("curtain-hold")) {
      // Un frame para que la pista ya esté en su sección antes de destapar.
      const raf = requestAnimationFrame(() => {
        root.classList.replace("curtain-hold", "curtain-out");
        onEnd(() => {
          root.classList.remove("curtain-out");
          done();
        }, CURTAIN_MS.out);
      });
      return () => cancelAnimationFrame(raf);
    }

    done();

    if (!curtainSupported()) return;

    // Salida: solo los enlaces marcados con data-curtain, que son los que cambian de
    // página (las páginas propias, el 404 y el botón de idioma). El valor es el nombre
    // del destino, ya traducido por quien renderiza el enlace.
    let leaving = false;
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.("a[data-curtain]");
      if (!a || a.target || a.origin !== location.origin || leaving) return;
      // Un ancla a la misma página no cambia de página: ahí no hay nada que tapar y
      // el salto lo hace TrackController (los enlaces del nav sirven para las dos
      // cosas, según desde dónde se los toque).
      if (a.pathname === location.pathname) return;

      e.preventDefault();
      leaving = true;
      try {
        sessionStorage.setItem(CURTAIN_KEY, a.dataset.curtain);
      } catch {}
      root.style.setProperty("--curtain-label", JSON.stringify(a.dataset.curtain));
      root.classList.add("curtain-in");
      // `a.href` y no el atributo: el botón de idioma le suma el #hash de la sección
      // visible en su propio onClick (components/Nav.jsx), que corre antes que esto.
      const href = a.href;
      onEnd(() => {
        location.href = href;
      }, CURTAIN_MS.in);
    };

    document.addEventListener("click", onClick);

    // Al volver con el botón "atrás", la página puede venir del bfcache con la cortina
    // todavía puesta: se saca y se vuelve a habilitar la salida.
    const onShow = () => {
      leaving = false;
      root.classList.remove("curtain-in", "curtain-hold", "curtain-out");
    };
    addEventListener("pageshow", onShow);

    return () => {
      document.removeEventListener("click", onClick);
      removeEventListener("pageshow", onShow);
    };
  }, []);

  return null;
}
