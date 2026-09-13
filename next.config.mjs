/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
