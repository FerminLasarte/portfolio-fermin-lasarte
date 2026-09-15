import { PAGES } from "./lib/pages.mjs";

// Rutas en español de las páginas propias (/trayectoria): se sirven sin prefijo, igual
// que la home.
const esSlugs = Object.values(PAGES).map((page) => page.es);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // app/global-not-found.js: el 404 de las URLs que no son de ningún idioma (con
  // varios root layouts, uno por idioma, no hay un layout raíz para app/not-found.js).
  experimental: { globalNotFound: true },
  // Las páginas viven en app/[lang]. El español se sirve sin prefijo: "/" se reescribe
  // a "/es" y "/trayectoria" a "/es/trayectoria"; quien entra con "/es" se redirige a
  // la ruta sin prefijo.
  async rewrites() {
    return [
      { source: "/", destination: "/es" },
      ...esSlugs.map((slug) => ({ source: `/${slug}`, destination: `/es/${slug}` })),
    ];
  },
  async redirects() {
    return [
      { source: "/es", destination: "/", permanent: true },
      ...esSlugs.map((slug) => ({ source: `/es/${slug}`, destination: `/${slug}`, permanent: true })),
    ];
  },
};

export default nextConfig;
