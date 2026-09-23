"use client";

import { useEffect, useRef } from "react";

// La vista previa del índice de proyectos (components/ProjectIndex.jsx): muestra la del
// proyecto que está bajo el mouse o tiene el foco del teclado, y se queda en esa al
// salir, así la columna nunca queda vacía. Solo cambia clases (.is-on); lo que se ve y
// cómo aparece está en styles/projects.css. No renderiza nada visible: se engancha al
// índice que lo contiene.
export default function WorksHover() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current?.closest("[data-works]");
    if (!root) return;
    const links = [...root.querySelectorAll(".works__link")];
    const shots = [...root.querySelectorAll(".works__shot")];

    // La fila entera cuenta, con sus enlaces de afuera: el foco en uno de ellos (con
    // Shift+Tab se llega desde la fila de abajo) activa su fila.
    const show = (e) => {
      const link = e.target.closest?.(".works__row")?.querySelector(".works__link");
      if (!link || link.classList.contains("is-on")) return;
      const i = links.indexOf(link);
      links.forEach((l, k) => l.classList.toggle("is-on", k === i));
      shots.forEach((s, k) => s.classList.toggle("is-on", k === i));
    };

    root.addEventListener("pointerover", show);
    root.addEventListener("focusin", show);
    return () => {
      root.removeEventListener("pointerover", show);
      root.removeEventListener("focusin", show);
    };
  }, []);

  return <span ref={ref} hidden />;
}
