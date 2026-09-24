import { MOVED, PAGES } from "./lib/pages.mjs";

// Cabeceras de seguridad de todas las respuestas (R-M22 de la re-auditoría); HSTS lo
// pone Vercel. La CSP es mínima a propósito: no deja que otro sitio meta la página en
// un iframe, ni cambiar la base de las URLs, ni cargar plugins. Una completa
// (script-src) choca con los scripts inline de Next y del tema (lib/theme.js).
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'" },
];

// Caché de lo que está en public/ (R-M19), que Next sirve con max-age=0:
//  - los iconos de Devicon no cambian nunca: un año, sin revalidar. Si alguno cambia,
//    va con otro nombre de archivo;
//  - los CV y las imágenes de assets/ sí pueden cambiar: un día, y hasta una semana
//    más se sirve la copia guardada mientras se busca la nueva.
const cacheHeaders = [
  { source: "/icons/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
  {
    source: "/assets/:path*",
    headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
  },
];

// Rutas en español de las páginas propias (/trayectoria): se sirven sin prefijo, igual
// que la home. Cada una se lista dos veces, ella y lo que cuelgue de ella, porque
// Trabajos tiene una página por trabajo (/trabajos/travelpic). Las que no tienen
// hijas no pierden nada: esa ruta no existe y termina en el 404 igual.
const esRoutes = Object.values(PAGES).flatMap((page) => [page.es, `${page.es}/:slug`]);

// Las rutas viejas (MOVED en lib/pages.mjs), en los dos idiomas, a la actual: la
// página y cada hija (/proyectos/vault → /trabajos/vault). El español va sin prefijo.
const prefix = (lang) => (lang === "es" ? "" : `/${lang}`);
const movedRoutes = MOVED.flatMap(({ id, ...old }) =>
  Object.entries(old).flatMap(([lang, slug]) => {
    const from = `${prefix(lang)}/${slug}`;
    const to = `${prefix(lang)}/${PAGES[id][lang]}`;
    return [
      { source: from, destination: to, permanent: true },
      { source: `${from}/:slug`, destination: `${to}/:slug`, permanent: true },
    ];
  }),
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }, ...cacheHeaders];
  },
  // app/global-not-found.js: el 404 de las URLs que no son de ningún idioma (con
  // varios root layouts, uno por idioma, no hay un layout raíz para app/not-found.js).
  experimental: { globalNotFound: true },
  // Las páginas viven en app/[lang]. El español se sirve sin prefijo: "/" se reescribe
  // a "/es" y "/trayectoria" a "/es/trayectoria"; quien entra con "/es" se redirige a
  // la ruta sin prefijo.
  async rewrites() {
    return [
      { source: "/", destination: "/es" },
      ...esRoutes.map((route) => ({ source: `/${route}`, destination: `/es/${route}` })),
    ];
  },
  async redirects() {
    return [
      { source: "/es", destination: "/", permanent: true },
      ...esRoutes.map((route) => ({ source: `/es/${route}`, destination: `/${route}`, permanent: true })),
      ...movedRoutes,
    ];
  },
};

export default nextConfig;
