// Color de la barra del navegador: el --paper de cada tema (styles/tokens.css).
export const THEME_COLORS = {
  light: "#F1F2EE",
  dark: "#0E1012",
};

// Inline script injected in <head> to apply the saved/preferred theme
// before first paint (avoids a flash of the wrong theme).
// También marca `html.js`: las animaciones de entrada solo ocultan el contenido
// si hay JS para revelarlo después (sin JS la página se ve completa).
// Preloader (docs/DISENO.md, 7.11; R-M3 de la re-auditoría):
//  - `html.pl` se pone en la primera visita de la sesión, pero la marca se guarda
//    recién cuando el documento tiene `.preloader` (la home): entrar primero por una
//    página propia o por el 404 no lo gasta. En esas páginas, `pl` no hace nada.
//  - La primera tecla, clic o rueda lo saltea: `pl-skip` lo desvanece en 250ms
//    (styles/preloader.css) y vuelve a lanzar la entrada del nombre del hero
//    (styles/motion.css). A los 4,8 s ya se está yendo solo y no hace falta.
export const themeInitScript = `(function () {
  var root = document.documentElement;
  root.classList.add('js');
  try {
    if (!sessionStorage.getItem('preloader') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
      setTimeout(off, 4800);
      setTimeout(function () { root.classList.remove('pl'); }, 8000);
      document.addEventListener('DOMContentLoaded', function () {
        if (document.querySelector('.preloader')) sessionStorage.setItem('preloader', '1');
        else { off(); root.classList.remove('pl'); }
      });
    }
  } catch (e) {}
  try {
    var saved = localStorage.getItem('theme');
    var dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark-mode');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '${THEME_COLORS.dark}' : '${THEME_COLORS.light}');
  } catch (e) {}
})();`;

// Toggles dark mode imperatively. The moon/sun icon swap is handled purely in
// CSS via the `html.dark-mode` class, so no React state is needed here.
export function toggleTheme() {
  const dark = !document.documentElement.classList.contains("dark-mode");
  document.documentElement.classList.toggle("dark-mode", dark);
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch (e) {}
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", dark ? THEME_COLORS.dark : THEME_COLORS.light);
}
