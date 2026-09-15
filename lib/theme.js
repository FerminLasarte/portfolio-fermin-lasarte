// Color de la barra del navegador: el --paper de cada tema (styles/tokens.css).
export const THEME_COLORS = {
  light: "#F1F2EE",
  dark: "#0E1012",
};

// Inline script injected in <head> to apply the saved/preferred theme
// before first paint (avoids a flash of the wrong theme).
// También marca `html.js`: las animaciones de entrada solo ocultan el contenido
// si hay JS para revelarlo después (sin JS la página se ve completa).
export const themeInitScript = `(function () {
  document.documentElement.classList.add('js');
  try {
    if (!sessionStorage.getItem('preloader') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('pl');
      sessionStorage.setItem('preloader', '1');
      setTimeout(function () { document.documentElement.classList.remove('pl'); }, 8000);
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
