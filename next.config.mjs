/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // app/global-not-found.js: el 404 de las URLs que no son de ningún idioma (con
  // varios root layouts, uno por idioma, no hay un layout raíz para app/not-found.js).
  experimental: { globalNotFound: true },
  // Las páginas viven en app/[lang]. El español se sirve en "/" sin prefijo:
  // "/" se reescribe a "/es", y quien entra a "/es" se redirige a "/".
  async rewrites() {
    return [{ source: "/", destination: "/es" }];
  },
  async redirects() {
    return [{ source: "/es", destination: "/", permanent: true }];
  },
};

export default nextConfig;
