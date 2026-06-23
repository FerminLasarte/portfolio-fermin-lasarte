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

## Scripts

| Comando         | Descripción                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Servidor de desarrollo en el puerto 3000 |
| `npm run build` | Build de producción                      |
| `npm run start` | Sirve el build de producción             |
| `npm run lint`  | Lint con ESLint / Next                   |

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
