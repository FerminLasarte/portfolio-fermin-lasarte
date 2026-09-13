# Portfolio — Fermin Lasarte

Portfolio personal de Fermin Lasarte (iOS & Cross-Platform Mobile Engineer), construido con **Next.js (App Router)** en JavaScript.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- React 19
- CSS plano (`app/globals.css`) — diseño Apple minimal + glassmorphism + bento grid
- i18n propio (ES / EN) vía React Context
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
  layout.js        # layout raíz: metadata, fuente, tema, providers
  page.js          # composición de secciones
  globals.css      # estilos globales
components/         # Nav, Hero, Skills, Projects, Contact, efectos, etc.
context/
  LanguageProvider.jsx
lib/
  translations.js  # textos ES/EN
  theme.js         # lógica de tema (toggle + script anti-FOUC)
public/assets/     # imágenes y CVs
```
