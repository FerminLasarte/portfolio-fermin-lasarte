import { REDUCED_MOTION } from "@/lib/media";
import { CURTAIN_FAILSAFE_MS } from "@/lib/curtain";

// Entradas (docs/DISENO.md, sección 8), como en douglus: cada elemento de un grupo entra
// por separado. La usan la pista de la home (components/TrackController.jsx, un grupo
// por panel) y las páginas propias (components/PageReveal.jsx, un grupo por bloque),
// así las dos entran igual.
//
// Los elementos se marcan con .rv, su variante y su orden (--rv, con tope de 12 para
// que el último no espere de más). Los grupos que no se ven al cargar esperan con
// .is-waiting y, cuando cruzan `rootMargin`, pasan a .is-revealed, una vez;
// styles/motion.css anima ese paso. Sin JS o con reduce motion, nada espera.
//
// El grupo que ya se ve entra igual que los demás, pero solo si se llegó con la cortina
// puesta (styles/curtain.css): ahí la pantalla está tapada, así que esconderlo para que
// entre no se nota, y aparece armándose cuando la cortina se retira. Sin cortina se lo
// deja como está: esconder algo que ya se pintó sería justo el parpadeo que la cortina
// viene a sacar.
//
// El foco nunca cae en algo invisible (R-I4): si el teclado entra a un grupo que todavía
// espera su entrada, o que la está haciendo, se muestra al instante (.is-instant corta
// las animaciones; como solo rellenan hacia atrás, en uno que ya entró no cambia nada).
//
//  - groups: los grupos, en orden.
//  - items: el selector de lo que entra por separado dentro de cada grupo.
//  - skip: lo que coincide con `items` pero tiene su propia entrada.
//  - variant(el): las clases de la variante (.rv--mask, .rv--plate, .rv--grow).
//  - isSeen(group): si se ve al cargar.
//  - rootMargin: la del IntersectionObserver que decide cuándo entra.
//  - focusRoot: dónde escuchar el foco.
// Devuelve la función que lo desarma.
export function setupReveal({ groups, items, skip, variant, isSeen, rootMargin, focusRoot }) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.replace("is-waiting", "is-revealed");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin },
  );

  const mark = (group) => {
    const els = [...group.querySelectorAll(items)].filter((el) => !skip || !el.matches(skip));
    els.forEach((el, i) => {
      el.classList.add("rv", ...variant(el));
      el.style.setProperty("--rv", Math.min(i, 12));
    });
    group.classList.add("is-waiting");
  };

  let enter = null;
  let enterTimer = 0;
  if (!matchMedia(REDUCED_MOTION).matches) {
    const curtained = document.documentElement.classList.contains("curtain-hold");
    const here = [];

    for (const group of groups) {
      const seen = isSeen(group);
      if (seen && !curtained) continue;
      mark(group);
      if (seen) here.push(group);
      else observer.observe(group);
    }

    // Cuando la cortina terminó de irse (components/Curtain.jsx avisa con
    // `curtain:done`). El timeout es el mismo respaldo que tiene la cortina: si el aviso
    // no llega, el grupo entra igual y nunca queda escondido.
    if (here.length) {
      enter = () => {
        clearTimeout(enterTimer);
        removeEventListener("curtain:done", enter);
        for (const group of here) group.classList.replace("is-waiting", "is-revealed");
      };
      addEventListener("curtain:done", enter);
      enterTimer = setTimeout(enter, CURTAIN_FAILSAFE_MS);
    }
  }

  const onFocus = (e) => {
    const group = e.target.closest(".is-waiting, .is-revealed");
    if (!group || group.classList.contains("is-instant")) return;
    group.classList.replace("is-waiting", "is-revealed");
    group.classList.add("is-instant");
    observer.unobserve(group);
  };
  focusRoot.addEventListener("focusin", onFocus);

  return () => {
    focusRoot.removeEventListener("focusin", onFocus);
    observer.disconnect();
    clearTimeout(enterTimer);
    if (enter) removeEventListener("curtain:done", enter);
  };
}
