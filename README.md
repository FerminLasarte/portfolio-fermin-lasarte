# Portfolio — Fermin Lasarte

Portfolio personal de Fermin Lasarte (iOS & Cross-Platform Mobile Engineer), construido con **Next.js (App Router)** en JavaScript.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- React 19
- CSS plano (`app/globals.css`) — diseño Apple minimal + glassmorphism + bento grid
- i18n por ruta: `/` en español y `/en` en inglés, prerenderizadas, con el diccionario en el servidor (`lib/i18n.js`)
- Tema claro/oscuro con persistencia y sin parpadeo (FOUC)

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
```

## Despliegue (Vercel)

La web está en **https://portfolio-fermin-lasarte.vercel.app** y Vercel la despliega sola con cada push a `main` (los PR generan previews).

- `SITE_URL` (canonical, Open Graph y JSON-LD) está en `lib/site.js`. Se arma con `VERCEL_PROJECT_PRODUCTION_URL`, una variable de sistema que Vercel expone en el build, así que si se agrega un dominio propio se actualiza sola.
- Para forzar otra URL, definí `NEXT_PUBLIC_SITE_URL` en Settings → Environment Variables del proyecto.
- En local, `SITE_URL` es `http://localhost:3000`.

**Imágenes nuevas:** antes de subir capturas o fotos, quitales los metadatos (EXIF puede incluir la ubicación GPS):

```bash
node scripts/strip-metadata.mjs public/assets/nueva.jpeg
```

## Scripts

| Comando         | Descripción                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Servidor de desarrollo en el puerto 3000 |
| `npm run build` | Build de producción                      |
| `npm run start` | Sirve el build de producción             |
| `npm run lint`  | Lint con el CLI de ESLint (`eslint .`)   |

## Estructura

```
app/
  [lang]/
    layout.js           # layout raíz por idioma: metadata y hreflang
    page.js             # composición de secciones
    opengraph-image.js  # imagen de Open Graph de cada idioma
  global-not-found.js   # 404 bilingüe de todas las URLs que no existen
  sitemap.js, robots.js
  globals.css           # estilos globales
components/              # Document (html, nav y footer), secciones, Icon, efectos, etc.
lib/
  site.js               # datos del sitio (persona, proyectos, tecnologías…)
  i18n.js               # idiomas, rutas por idioma y getT(lang)
  translations.js       # textos ES/EN
  icons.js              # iconos de Font Awesome como SVG
  theme.js              # lógica de tema (toggle + script anti-FOUC)
assets/fonts/           # Archivo (OFL) para la imagen de Open Graph
public/
  assets/               # imágenes y CVs
  icons/devicon/        # SVG de Devicon (2.17.0)
```
