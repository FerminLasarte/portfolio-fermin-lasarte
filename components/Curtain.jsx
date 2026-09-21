"use client";

import { useEffect } from "react";
import { CURTAIN_KEY, CURTAIN_MS, SALIDA, SUBE, SUBIDA, animar, curtainSupported } from "@/lib/curtain";

// Cortina entre páginas (docs/DISENO.md, 8; styles/curtain.css), la de douglus: tapa
// la pantalla de abajo hacia arriba con el borde curvo, muestra el nombre del destino
// y del otro lado se retira.
//
// El movimiento del borde lo escribe este componente sobre el atributo `d`, con un
// requestAnimationFrame, igual que GSAP en douglus. No va por CSS: la propiedad `d` no
// existe en Safari (ninguna versión), así que con `@supports` la cortina quedaba
// invisible justo ahí y el parpadeo del hero volvía tal cual (2026-09-21). Lo que sí
// queda en CSS es el nombre y la línea, que se mueven con translate, opacity y scale.
//
// Lo demás que hace acá:
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
// Sin JS o con reduce motion no hay cortina y la navegación es la de siempre: en esos
// casos la página es vertical y el ancla la resuelve el navegador.
export default function Curtain() {
  useEffect(() => {
    const root = document.documentElement;
    const path = document.querySelector(".curtain__path");
    const done = () => dispatchEvent(new Event("curtain:done"));
    if (!path) {
      done();
      return;
    }

    // Llegada: el script del tema ya dejó la pantalla tapada (el atributo `d` que trae
    // el HTML es justo esa posición, así que no hay nada que escribir antes de pintar).
    if (root.classList.contains("curtain-hold")) {
      let cortar = null;
      // Un frame para que la pista ya esté en su sección antes de destapar.
      const raf = requestAnimationFrame(() => {
        root.classList.replace("curtain-hold", "curtain-out");
        cortar = animar(path, SALIDA, () => {
          root.classList.remove("curtain-out");
          done();
        });
      });
      // Respaldo: con la pestaña en segundo plano no corren los frames y la animación
      // no arranca. Nadie está mirando, pero la página no puede quedar tapada.
      const red = setTimeout(() => {
        cortar?.();
        root.classList.remove("curtain-hold", "curtain-out");
        done();
      }, CURTAIN_MS.out + 400);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(red);
        cortar?.();
      };
    }

    done();

    if (!curtainSupported()) return;

    // Salida: solo los enlaces marcados con data-curtain, que son los que cambian de
    // página (las páginas propias, el 404, los del nav y el botón de idioma). El valor
    // es el nombre del destino, ya traducido por quien renderiza el enlace.
    let yendo = false;
    let cortar = null;
    let red = 0;

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.("a[data-curtain]");
      if (!a || a.target || a.origin !== location.origin || yendo) return;
      // Un ancla a la misma página no cambia de página: ahí no hay nada que tapar y
      // el salto lo hace TrackController (los enlaces del nav sirven para las dos
      // cosas, según desde dónde se los toque).
      if (a.pathname === location.pathname) return;

      e.preventDefault();
      yendo = true;
      try {
        sessionStorage.setItem(CURTAIN_KEY, a.dataset.curtain);
      } catch {}
      root.style.setProperty("--curtain-label", JSON.stringify(a.dataset.curtain));
      // La posición de arranque, antes de mostrar la cortina: si no, el primer frame
      // sería la pantalla tapada de golpe (el `d` que trae el HTML).
      path.setAttribute("d", SUBE.desde);
      root.classList.add("curtain-in");

      // `a.href` y no el atributo: el botón de idioma le suma el #hash de la sección
      // visible en su propio onClick (components/Nav.jsx), que corre antes que esto.
      const href = a.href;
      const ir = () => {
        clearTimeout(red);
        location.href = href;
      };
      cortar = animar(path, SUBIDA, ir);
      red = setTimeout(ir, CURTAIN_MS.in + 400);
    };

    document.addEventListener("click", onClick);

    // Al volver con el botón "atrás", la página puede venir del bfcache con la cortina
    // todavía puesta: se saca y se vuelve a habilitar la salida.
    const onShow = () => {
      yendo = false;
      cortar?.();
      clearTimeout(red);
      root.classList.remove("curtain-in", "curtain-hold", "curtain-out");
    };
    addEventListener("pageshow", onShow);

    return () => {
      document.removeEventListener("click", onClick);
      removeEventListener("pageshow", onShow);
      clearTimeout(red);
      cortar?.();
    };
  }, []);

  return null;
}
