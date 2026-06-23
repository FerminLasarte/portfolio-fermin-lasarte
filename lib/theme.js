// Theme color values kept in sync with the CSS design tokens.
export const THEME_COLORS = {
  light: "#F5F5F7",
  dark: "#0A0A0C",
};

// Inline script injected in <head> to apply the saved/preferred theme
// before first paint (avoids a flash of the wrong theme).
export const themeInitScript = `(function () {
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
