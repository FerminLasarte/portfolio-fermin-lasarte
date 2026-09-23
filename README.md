# Portfolio — Fermin Lasarte

Portfolio personal de Fermin Lasarte (iOS & Cross-Platform Mobile Engineer), construido con **Next.js (App Router)** en JavaScript.

El diseño es una "tira de pantallas": en escritorio, las secciones pasan de costado en una pista horizontal que mueve el scroll; en móvil, con reduce motion o sin JS, la página es vertical. El diseño completo está en [`docs/DISENO.md`](docs/DISENO.md).

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack) y React 19.
- CSS plano, repartido en `styles/` (tokens, base y una hoja por componente) y reunido en `app/globals.css`. La pista horizontal es CSS: `position: sticky` y una animación atada al scroll, con un respaldo en JS para los navegadores sin `animation-timeline`.
- [Lenis](https://github.com/darkroomengineering/lenis) para el scroll suave con la rueda, solo con mouse y sin reduce motion.
- Archivo, variable y recortada a lo que usa el sitio, con `next/font/local`.
- i18n por ruta: `/` en español y `/en` en inglés, las páginas propias (`/proyectos` y `/en/projects`, `/trayectoria` y `/en/experience`, `/habilidades` y `/en/skills`) y una página por proyecto (`/proyectos/<id>`, con el mismo slug en los dos idiomas). Todo se prerenderiza, con el diccionario en el servidor (`lib/i18n.js`).
- Tema claro y oscuro sin parpadeo al cargar: sigue al sistema hasta que se usa el botón, y desde ahí manda lo elegido.

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
- Antes de cada build corre `scripts/check.mjs` (ver Scripts): si algo no coincide, el deploy se detiene con un mensaje que dice qué arreglar.

**Imágenes nuevas:** antes de subir capturas o fotos, quitales los metadatos (EXIF puede incluir la ubicación GPS):

```bash
node scripts/strip-metadata.mjs public/assets/nueva.jpeg
```

## Scripts

| Comando         | Descripción                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`   | Servidor de desarrollo en el puerto 3000                                                                                        |
| `npm run build` | Build de producción; antes corre `npm run check`                                                                                |
| `npm run start` | Sirve el build de producción                                                                                                    |
| `npm run lint`  | Lint con el CLI de ESLint (`eslint .`; ignora `.claude/`)                                                                       |
| `npm run check` | Controla lo que está copiado a mano: la media query horizontal en `styles/`, las claves ES/EN, los colores de la OG, del tema y de los iconos, los tiempos de la cortina y que el script del tema parsee |
| `npm run icons` | Regenera `favicon.svg`, `favicon.ico` y `apple-icon.png` desde la fuente (no se editan a mano)                                   |
| `npm run cv`    | Regenera los CV en PDF (`public/assets/CV-Fermin-ES.pdf` y `-EN.pdf`) desde `scripts/cv.mjs`, donde están los textos; necesita Google Chrome |

## Estructura

```
app/
  [lang]/
    layout.js            # layout raíz por idioma: metadata, hreflang y JSON-LD
    page.js              # la home: la pista con sus paneles
    opengraph-image.js   # imagen de Open Graph de cada home
    [page]/              # páginas propias (Proyectos, Trayectoria y Habilidades), con su imagen
      [slug]/            # la página de cada proyecto, con su imagen de Open Graph
  global-not-found.js    # 404 bilingüe de todas las URLs que no existen
  global-error.js        # error bilingüe que reemplaza al layout raíz
  sitemap.js, robots.js
  globals.css            # junta las hojas de styles/
components/              # Document (html, nav y pie), secciones, páginas propias y efectos
lib/
  site.js                # datos: persona, proyectos, trayectoria y tecnologías
  translations.js        # textos ES/EN
  i18n.js                # idiomas, rutas, getT(lang) y la metadata para compartir
  pages.mjs              # slugs de las páginas propias (también los usa next.config)
  track.js               # la media query del modo horizontal
  media.js               # las demás media queries del JS
  scroll.js              # scroll suave compartido (Lenis o el nativo)
  theme.js               # tema: el botón y el script que lo aplica antes de pintar
  fonts.js               # Archivo con next/font/local
  og.js                  # diseño de las imágenes de Open Graph
  image.js, icons.js, text.js, error-text.js
styles/                  # tokens.css, base.css y una hoja por componente, más print y forced-colors
scripts/
  check.mjs              # controles antes de cada build
  icons.mjs              # genera los tres iconos desde la F de Archivo Display
  cv.mjs                 # genera los CV en PDF (ES y EN) con Chrome
  strip-metadata.mjs     # quita los metadatos de JPEG, PNG y WebP
docs/
  DISENO.md              # el diseño: dirección, tokens, componentes y movimiento
assets/fonts/            # Archivo (OFL): la de la web y las de la imagen de Open Graph
public/
  assets/                # foto, logos y CVs (los CV, generados por scripts/cv.mjs)
  icons/devicon/         # SVG de Devicon (2.17.0)
  favicon.svg, favicon.ico, apple-icon.png   # generados por scripts/icons.mjs
```
