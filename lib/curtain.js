import { REDUCED_MOTION } from "@/lib/media";

// Cortina entre páginas (docs/DISENO.md, 8). Lo que comparten el script del tema
// (lib/theme.js, que corre antes del primer pintado), el componente
// (components/Curtain.jsx) y styles/curtain.css.

// Dónde viaja el nombre del destino de una página a la otra.
export const CURTAIN_KEY = "curtain";

// Las posiciones del path, las mismas que douglus (medidas de su bundle, anexo A de
// docs/DISENO.md). Todas tienen los mismos comandos, así que se interpolan número a
// número. `TAPADA` es además el estado en el que llega la página de destino, y es el
// valor que trae el atributo `d` en el HTML (components/Document.jsx).
export const TAPADA = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

export const SUBE = {
  desde: "M 0 100 V 100 Q 50 100 100 100 V 100 z",
  curva: "M 0 100 V 50 Q 50 0 100 50 V 100 z",
  hasta: TAPADA,
};

// `SALE` no se exporta y `SUBE` sí, porque el componente necesita la posición de
// arranque de la subida para dejarla puesta antes de mostrar la cortina; de la salida
// no necesita nada suelto, le alcanza con `SALIDA`.
const SALE = {
  desde: "M 0 0 V 100 Q 50 100 100 100 V 0 z",
  curva: "M 0 0 V 50 Q 50 100 100 50 V 0 z",
  hasta: "M 0 0 V 0 Q 50 0 100 0 V 0 z",
};

// Los tramos de douglus, en milisegundos y con sus curvas. La suma de cada uno es
// --dur-curtain-in y --dur-curtain-out (styles/tokens.css); scripts/check.mjs controla
// antes de cada build que no se separen, porque el CSS los usa para el nombre del
// destino y la línea.
const potencia = (n) => (t) => t ** n;
const salida = (n) => (t) => 1 - (1 - t) ** n;

// `hold` es lo que la página de destino se queda tapada, con el nombre a la vista,
// antes de destaparse. Va solo de ese lado: el nombre es el mismo texto en las dos
// páginas, así que se lee continuo aunque el documento cambie en el medio, y el
// recorrido no se alarga dos veces. Antes el nombre entraba a 1,1 s, justo cuando
// arrancaba la navegación, y no se llegaba a leer (2026-09-21). douglus lo tiene más
// fácil: es una SPA y no recarga, así que puede esperar todo lo que quiera.
export const CURTAIN_MS = { in: 1000, hold: 500, out: 1050 };

export const SUBIDA = [
  { de: SUBE.desde, a: SUBE.curva, ms: 700, curva: potencia(5) }, // power4.in
  { de: SUBE.curva, a: SUBE.hasta, ms: 300, curva: salida(3) }, // power2.out
];

export const SALIDA = [
  { de: SALE.desde, a: SALE.curva, ms: 250, curva: (t) => 1 - Math.cos((t * Math.PI) / 2) }, // sine.in
  { de: SALE.curva, a: SALE.hasta, ms: 800, curva: salida(5) }, // power4.out
];

// Por si la cortina se queda puesta (un error de JS, o llegar con la pestaña en
// segundo plano y sin frames): a los 4 s la página se destapa sola. Es el mismo
// respaldo que tiene el preloader, que también termina solo.
export const CURTAIN_FAILSAFE_MS = 4000;

// Mezcla dos posiciones interpolando sus números en orden. Es lo que hace GSAP en
// douglus, y por eso el movimiento va por el atributo `d` y no por la propiedad CSS del
// mismo nombre: esa no existe en Safari (probado el 2026-09-21, y caniuse lo confirma
// hasta la 27.2), así que con CSS la cortina no se veía y el parpadeo del hero volvía
// tal cual.
//
// Interpolar así **exige** que las dos posiciones tengan la misma secuencia de comandos
// y la misma cantidad de números: si no, los números se cruzan entre comandos distintos
// y la forma sale cualquier cosa, o quedan en NaN y el path desaparece. Nada en el
// lenguaje lo obliga, así que lo obliga scripts/check.mjs antes de cada build.
const NUMEROS = /-?\d+(?:\.\d+)?/g;

function mezclar(de, a, t) {
  const otros = a.match(NUMEROS);
  let i = 0;
  return de.replace(NUMEROS, (n) => {
    const v = Number(n) + (Number(otros[i]) - Number(n)) * t;
    i += 1;
    return Math.round(v * 100) / 100;
  });
}

// Recorre los tramos y va escribiendo el atributo. Devuelve una función para cortarlo
// (si el componente se desmonta a mitad de camino).
export function animar(path, tramos, onEnd) {
  const total = tramos.reduce((suma, tramo) => suma + tramo.ms, 0);
  let raf = 0;
  // `null` y no 0: el primer timestamp puede ser 0 y con `||=` el reloj se reasignaría
  // en el frame siguiente, corriendo el arranque y dejando la animación sin terminar.
  let inicio = null;

  const paso = (ahora) => {
    if (inicio === null) inicio = ahora;
    let t = ahora - inicio;
    if (t >= total) {
      path.setAttribute("d", tramos[tramos.length - 1].a);
      onEnd();
      return;
    }
    for (const tramo of tramos) {
      if (t < tramo.ms) {
        path.setAttribute("d", mezclar(tramo.de, tramo.a, tramo.curva(t / tramo.ms)));
        break;
      }
      t -= tramo.ms;
    }
    raf = requestAnimationFrame(paso);
  };

  path.setAttribute("d", tramos[0].de);
  raf = requestAnimationFrame(paso);
  return () => cancelAnimationFrame(raf);
}

// Hay cortina si no hay reduce motion. Ya no se pregunta por la propiedad `d` en CSS:
// el movimiento lo escribe JS sobre el atributo, que funciona en todos los navegadores.
export const curtainSupported = () => !matchMedia(REDUCED_MOTION).matches;
