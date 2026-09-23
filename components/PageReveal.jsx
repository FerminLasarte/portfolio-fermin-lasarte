"use client";

import { useEffect } from "react";
import { setupReveal } from "@/lib/reveal";

// Lo que entra por separado en cada bloque de una página propia, en el orden del HTML
// (styles/motion.css).
const ITEMS = [
  ".card__plate",
  ".story__label",
  ".stats > div",
  ".chapter__desc",
  ".chapter__title",
  ".chapter__body > p",
  ".card__links > .btn",
  ".project__next",
  ".project__step",
].join(", ");

// El título de un capítulo ya entra con su rótulo (.story__label, que lo contiene).
const SKIP = ".story__label *";

// Los títulos suben en su máscara y la placa se destapa, como en la home.
const variant = (el) =>
  el.matches(".story__label, .chapter__title") ? ["rv--mask"] : el.matches(".card__plate") ? ["rv--plate"] : [];

// Las entradas de la home en una página propia (docs/DISENO.md, 7.13): cada bloque
// marcado con `data-reveal` es un grupo de lib/reveal.js, y entra cuando llega al 85%
// del alto de la ventana. El encabezado no pasa por acá: tiene su propia entrada al
// cargar (styles/page.css). No renderiza nada.
export default function PageReveal() {
  useEffect(
    () =>
      setupReveal({
        groups: document.querySelectorAll("[data-reveal]"),
        items: ITEMS,
        skip: SKIP,
        variant,
        isSeen: (group) => group.getBoundingClientRect().top < innerHeight,
        rootMargin: "0px 0px -15% 0px",
        focusRoot: document,
      }),
    [],
  );

  return null;
}
