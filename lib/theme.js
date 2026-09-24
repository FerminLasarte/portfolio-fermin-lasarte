import { REDUCED_MOTION } from "@/lib/media";
import { CURTAIN_FAILSAFE_MS, CURTAIN_KEY } from "@/lib/curtain";

// Color de la barra del navegador: el --paper de cada tema (styles/tokens.css), copiado
// a mano; scripts/check.mjs controla antes de cada build que sean iguales.
export const THEME_COLORS = {
  light: "#F2EEE8",
  dark: "#14100D",
};

// Inline script injected in <head> to apply the saved/preferred theme
// before first paint (avoids a flash of the wrong theme).
// Sin un tema guardado, sigue al del sistema también si cambia con la página abierta
// (R-M27 de la re-auditoría). Desde que se usa el botón, manda lo guardado.
// También marca `html.js`: las animaciones de entrada solo ocultan el contenido
// si hay JS para revelarlo después (sin JS la página se ve completa).
// Cortina entre páginas (docs/DISENO.md, 8; styles/curtain.css):
//  - si se llegó por un enlace con cortina, `html.curtain-hold` deja la pantalla
//    tapada desde el primer pintado. Tiene que ser acá y no en React: si se pusiera
//    al montar, el visitante alcanzaría a ver el hero antes de que la pista salte a
//    su sección, que es justo el parpadeo que la cortina viene a tapar;
//  - la marca se borra al leerla, así una recarga o un "atrás" no la vuelve a usar;
//  - `components/Curtain.jsx` la retira cuando la pista ya está en su lugar. Si eso
//    no llega a pasar (un error de JS, o frames que nunca corren), a los 4 s se
//    destapa sola: la página nunca queda tapada.
// Preloader (docs/DISENO.md, 7.11; R-M3 de la re-auditoría):
//  - `html.pl` se pone en la primera visita de la sesión, pero la marca se guarda
//    recién cuando el documento tiene `.preloader` (la home): entrar primero por una
//    página propia o por el 404 no lo gasta. En esas páginas, `pl` no hace nada.
//  - La primera tecla, clic o rueda lo saltea: `pl-skip` lo desvanece en 250ms
//    (styles/preloader.css) y vuelve a lanzar la entrada del nombre del hero
//    (styles/motion.css). A los 1,45 s (--pl-zoom) ya se está yendo solo y no hace
//    falta. Si las animaciones no corren, a los 5 s se saca igual.
export const themeInitScript = `(function () {
  var root = document.documentElement;
  root.classList.add('js');
  try {
    var curtain = sessionStorage.getItem('${CURTAIN_KEY}');
    sessionStorage.removeItem('${CURTAIN_KEY}');
    if (curtain && !window.matchMedia('${REDUCED_MOTION}').matches) {
      root.classList.add('curtain-hold');
      root.style.setProperty('--curtain-label', JSON.stringify(curtain));
      setTimeout(function () { root.classList.remove('curtain-hold', 'curtain-out'); }, ${CURTAIN_FAILSAFE_MS});
    }
  } catch (e) {}
  try {
    if (!sessionStorage.getItem('preloader') && !window.matchMedia('${REDUCED_MOTION}').matches) {
      root.classList.add('pl');
      var events = ['keydown', 'pointerdown', 'wheel'];
      var off = function () {
        events.forEach(function (e) { removeEventListener(e, skip, true); });
      };
      var skip = function () {
        off();
        root.classList.add('pl-skip');
        setTimeout(function () { root.classList.remove('pl'); }, 250);
      };
      events.forEach(function (e) { addEventListener(e, skip, { capture: true, passive: true }); });
      setTimeout(off, 1450);
      setTimeout(function () { root.classList.remove('pl'); }, 5000);
      document.addEventListener('DOMContentLoaded', function () {
        if (document.querySelector('.preloader')) sessionStorage.setItem('preloader', '1');
        else { off(); root.classList.remove('pl'); }
      });
    }
  } catch (e) {}
  try {
    var saved = localStorage.getItem('theme');
    var system = window.matchMedia('(prefers-color-scheme: dark)');
    var meta = document.querySelector('meta[name="theme-color"]');
    var apply = function (dark) {
      root.classList.toggle('dark-mode', dark);
      if (meta) meta.setAttribute('content', dark ? '${THEME_COLORS.dark}' : '${THEME_COLORS.light}');
    };
    apply(saved ? saved === 'dark' : system.matches);
    system.addEventListener('change', function (e) {
      try { if (localStorage.getItem('theme')) return; } catch (err) {}
      apply(e.matches);
    });
  } catch (e) {}
})();`;

// Toggles dark mode imperatively. The moon/sun icon swap is handled purely in
// CSS via the `html.dark-mode` class, so no React state is needed here.
export function toggleTheme() {
  const dark = !document.documentElement.classList.contains("dark-mode");
  document.documentElement.classList.toggle("dark-mode", dark);
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {}
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", dark ? THEME_COLORS.dark : THEME_COLORS.light);
}
