# Auditoría del portfolio

- **Fecha:** 2026-09-13
- **Commit auditado:** `5b87af2` ("cambio a jsx"). Los números de línea se refieren a ese commit y se irán desplazando: antes de tocar algo, volvé a ubicar el código.
- **Método:** 5 subagentes, uno por categoría (incoherencias, eficiencia, código muerto, flujo/accesibilidad y mejoras), más una verificación manual del código y del navegador (375px y 1024px, modo claro y oscuro, ES y EN, ruta 404). **[nav]** marca lo que se confirmó en el navegador.
- **Descartados:** `.DS_Store` ya no está en git, y memoizar el `value` del contexto de idioma no tiene impacto real.
- **Sin confirmar (fuera del informe):** que el `:hover` quede pegado en táctil y que se recorte el anillo de foco.

## Cómo usar este archivo

1. Trabajá por **fases**, en orden (ver el plan abajo). Cada fase es una conversación distinta.
2. Al terminar un punto, marcá la casilla `[x]` y agregá una nota corta (commit o decisión tomada).
3. Si un punto queda obsoleto (por ejemplo, porque el rediseño lo reemplaza), marcalo `[~]` con el motivo.
4. Si aparece algo nuevo, agregalo al final, en "Hallazgos nuevos".

## Plan por fases

| Fase | Qué | Por qué en este orden |
|---|---|---|
| **0. Urgente** | C1, C4, C2 | Privacidad, despliegue roto y bug visible en móvil. Son independientes del diseño y baratos. |
| **1. Contenido y datos** | I4, I3, C3, I12, datos centralizados, textos menores | El rediseño va a necesitar el contenido correcto, las imágenes buenas y los datos en un solo lugar. |
| **2. Arquitectura** | I14, I8, I2, C5, I11, I16, lint | Es la base técnica sobre la que se apoya el rediseño (i18n por ruta, server components, iconos, SEO). No depende de lo visual. |
| **3. Rediseño** | Nuevo diseño visual + los "Criterios del rediseño" | La mayoría de los problemas de CSS, animaciones y accesibilidad visual se resuelven en el diseño nuevo, en vez de parchear el actual. |
| **4. Re-auditoría** | Repetir esta auditoría sobre el resultado | Confirmar que no volvieron los problemas. |

Los puntos marcados como **→ Rediseño** **no se arreglan en el código actual**: se usan como requisitos del diseño nuevo.

---

## 🔴 Crítico

- [x] **C1. La foto de perfil publica dónde se tomó** · Fase 0
  - **Hecho (Fase 0):** `foto_perfil.jpeg` se reemplazó por `foto_perfil.webp` (hero, 14 KB) y `foto_perfil.jpg` (OG y JSON-LD, 24 KB), las dos de 560×715 y sin metadatos. A las capturas de proyectos se les quitó el EXIF y el XMP sin recomprimirlas, con `scripts/strip-metadata.mjs` (reutilizable para capturas nuevas). Los PDF no tenían datos personales (solo `Title` y `Producer` de Google Docs) y no se tocaron.
  - **Historial:** la foto original se eliminó de todo el historial de git con `git filter-repo` (ver N1 en "Hallazgos nuevos").
  - **Dónde:** `public/assets/foto_perfil.jpeg`, usada en `components/Hero.jsx:148` y `app/layout.js:36,49,64`.
  - **Problema:** el EXIF incluye coordenadas GPS (latitud, longitud y altitud, con unos 16 m de precisión), el modelo del teléfono y la fecha. Está en la web y en el historial de git.
  - **Solución:**
    - Reexportar la foto sin metadatos (`exiftool -all=` o reexportando la imagen) y reducirla a unos 560px en WebP.
    - Si el repo es público, valorar reescribir el historial con `git filter-repo`.
    - Revisar también los PDF del CV y el resto de imágenes.

- [x] **C2. En móvil el texto del hero queda cortado a la derecha** · Fase 0 **[nav]**
  - **Hecho (Fase 0):** `grid-template-columns: minmax(0, 1fr)` en el hero (≤900px) y `.stat-label { white-space: normal }` en ≤48rem. Verificado en el navegador: a 375px la columna pasó de 381,6px a 327px, ya no hay nada del hero que pase del viewport y los tres `.stat-label` entran (dos van en dos líneas); a 1024px no cambió nada (`640px 272px`). Fuera del hero, lo único que se sale es decorativo o transitorio: un `.bg-orb` y el `translateX` inicial de `.animate-right` antes de revelarse. El `overflow-x: hidden` de `html` y `body` sigue ahí (se quita en el rediseño, criterio 1).
  - **Dónde:** `app/globals.css:1578` (`grid-template-columns: 1fr`), `:436` (`.stat-label { white-space: nowrap }`) y `:412`.
  - **Problema:** a 375px, la columna del grid mide 381,6px, porque `1fr` no baja del ancho mínimo de su contenido. El `overflow-x: hidden` de `html` y `body` recorta el sobrante sin avisar.
  - **Solución:** usar `grid-template-columns: minmax(0, 1fr)` y dejar que `.stat-label` haga salto de línea a partir de 48rem. Es un parche de 2 líneas y vale la pena aunque venga el rediseño.

- [ ] **C3. Se descargan ~14,8 MB en la primera carga** · Fase 1 **[nav]**
  - **Dónde:** `components/Projects.jsx:24,28,95,99,161,196,262,272`.
  - **Problema:**
    - `landing-ia.png` (6,4 MB) y `deporturnos.png` (5 MB), de ~2900×1440px, se muestran a 230×110 y 66×142px.
    - Cada imagen se usa dos veces: como `<img>` sin `loading="lazy"` y como `backgroundImage` inline, que se descarga siempre.
  - **Solución:**
    - Reescalar a ~800px en WebP o AVIF.
    - Usar miniaturas de 32–64px para el fondo difuminado.
    - Usar `next/image` con `sizes` y quitar `no-img-element: off` de `.eslintrc.json`.

- [x] **C4. El canonical, el Open Graph y el JSON-LD apuntan a una URL que no sirve esta web** · Fase 0
  - **Hecho (Fase 0):** se despliega en **Vercel** (`portfolio-fermin-lasarte.vercel.app`). `SITE_URL` pasó a `lib/site.js` y sale de `NEXT_PUBLIC_SITE_URL` o, si no está, de `VERCEL_PROJECT_PRODUCTION_URL`. `next.config` queda sin cambios. Está documentado en el README. Primero se configuró para GitHub Pages por error y se revirtió en el mismo commit.
  - GitHub Pages (modo "legacy", publicaba el README en `ferminlasarte.github.io/portfolio-fermin-lasarte`) se desactivó el 2026-09-13; la web solo vive en Vercel.
  - **Dónde:** `app/layout.js:18` y `next.config.mjs:2-4`.
  - **Problema:** `SITE_URL = …github.io/portfolio-fermin-lasarte` responde con un README de GitHub Pages (Jekyll), y `/assets/foto_perfil.jpeg` da 404. Además, no hay `output: 'export'` ni `basePath`.
  - **Solución:**
    - **Decidir dónde se despliega.**
    - Si es Vercel: sacar `SITE_URL` a una variable de entorno (`NEXT_PUBLIC_SITE_URL`).
    - Si es GitHub Pages: configurar `output: 'export'`, `basePath`, `images.unoptimized` y un workflow de despliegue.
    - Documentarlo en el README.

- [ ] **C5. Sin JS la página sale casi vacía y la foto del hero depende de JS** · Fase 2 (y → Rediseño)
  - **Dónde:** `app/globals.css:1514-1544` y `:1795-1803`, `components/RevealObserver.jsx:25` y `components/Hero.jsx:146`.
  - **Problema:** todo el contenido animado empieza con `opacity: 0` y solo aparece tras la hidratación. Si JS falla, no se ve nada. El LCP (la foto) espera a JS más una animación de 1s.
  - **Solución:**
    - Ocultar solo bajo `html.js`, con la clase puesta desde `themeInitScript` en `lib/theme.js`.
    - No animar la foto del hero y ponerle `fetchpriority="high"`.

## 🟠 Importante

- [ ] **I1. En táctil, tocar idioma o tema también abre el menú; no hay botón de menú** · → Rediseño **[nav]**
  - **Dónde:** `components/Nav.jsx:64-73`.
  - **Problema:** cualquier toque que no sea un enlace de sección hace `toggle("nav-expanded")`. En móvil las secciones están ocultas (`globals.css:193-199`) y nada indica que el menú se puede abrir.
  - **Solución:** un botón de menú explícito con `aria-expanded` y `aria-controls`, estado en `useState` y cierre con Escape.

- [ ] **I2. Los enlaces del nav no funcionan fuera de la home y no actualizan la URL** · Fase 2 **[nav]**
  - **Dónde:** `components/Nav.jsx:21-32`.
  - **Problema:** hace `preventDefault()` y después `querySelector(href)`, que en `/no-existe` devuelve `null`. La URL nunca recibe el `#hash`. Además duplica lo que ya hacen `scroll-behavior` y `scroll-margin-top`.
  - **Solución:** quitar `handleLinkClick` y usar enlaces nativos `href="/#proyectos"`.

- [ ] **I3. En modo EN quedan textos en español** · Fase 1 **[nav]**
  - **Dónde:**
    - `components/Skills.jsx:13-64`: tooltips "· Avanzado".
    - `Skills.jsx:11,26,36,47`: títulos y el sufijo " & Cloud".
    - `components/Terminal.jsx:5-11`: todas las líneas.
    - `components/Hero.jsx:148`: `alt`.
    - `components/Nav.jsx:102,110,112`: `title` y `aria-label`.
    - `components/Projects.jsx`: `:200` "AI Chatbot NLU", `:313` y `:346` "WIP", `:28`, `:99` y `:272` los `alt`, y las etiquetas `:175`, `:240` y `:375`.
    - La metadata de `app/layout.js`.
  - **Solución:** todo a traducciones, con los niveles como clave (`skills.level.advanced`).

- [ ] **I4. Datos contradictorios** · Fase 1
  - **Ubicación:** `lib/translations.js:11,109` dice "Tandil", pero los dos CV dicen "Buenos Aires" y el teléfono tiene prefijo 11.
  - **Años de experiencia:** `Hero.jsx:110` dice "5+ años", pero la trayectoria (`Experience.jsx:22,40`) va de 2021 a 2023 y de 2024 a 2025.
  - **Cantidad de proyectos:** `Hero.jsx:115` dice "8+ proyectos", pero hay exactamente 8 y dos están en curso.
  - **Compilador:** `translations.js:65-68` dice "MiniJava a bytecode", el CV en español dice "código de máquina", el CV en inglés dice "Java-based compiler" y `Terminal.jsx:9` dice "Bytecode".
  - **ES frente a EN:**
    - `:85` frente a `:183`: EN agrega "Sports Platform".
    - `:89` frente a `:187`: EN agrega "SaaS".
    - `:32` frente a `:130`: EN agrega "real-time".
    - `:75` frente a `:173`.
  - **Los CV entre sí:** el de inglés incluye Objective-C y JavaScript pero no SwiftUI; el de español al revés. El de inglés dice "System Engineering". Además, el francés B2 de los CV no aparece en la web.
  - **Solución:** decidir la versión correcta de cada dato y sacar las cifras de los datos, no escribirlas a mano. Regenerar los dos CV desde la misma fuente.

- [ ] **I5. `prefers-reduced-motion` no tiene efecto en Skills ni en Proyectos** · → Rediseño
  - **Dónde:** `app/globals.css:1762-1788`, anulado por `:1795` y `:1815`. El `:1778` pierde contra `.availability-badge .status-dot` (`:349`).
  - **Problema:** tampoco se desactivan el scroll suave (`:74`, `Nav.jsx:30`), el parpadeo del terminal (`:1890`) ni el tecleo de `Terminal.jsx`.
  - **Requisito para el diseño nuevo:** envolver los efectos en `@media (prefers-reduced-motion: no-preference)`.

- [ ] **I6. Las tarjetas no se elevan al hacer hover** · → Rediseño **[nav]**
  - **Dónde:** `globals.css:1546-1549` (`.visible { transform … !important }`), `:1804` y `:1819`, que pisan los hovers de `:1399`, `:849` y `:998`.
  - **Requisito:** que las animaciones de entrada y los hovers no compitan por `transform`; por ejemplo, usar la propiedad independiente `translate`.

- [ ] **I7. Contraste por debajo de WCAG AA** · → Rediseño
  - **Dónde:**
    - Botón primario en modo oscuro, `#fff` sobre `#818CF8` (`globals.css:45`, `:600`): **2,98**.
    - `.production-status` (`:1360`): **3,30**.
    - `.availability-badge` (`:339`): **2,88**.
    - Píldora WIP sobre el degradado azul (`:1109`, `:1120`): entre 1,2 y 2,9.
  - **Requisito:** la paleta nueva tiene que pasar 4,5:1 en texto normal y en los dos temas.

- [ ] **I8. Idioma: `localStorage` sin try/catch, parpadeo al cargar y sin detección** · Fase 2
  - **Dónde:** `context/LanguageProvider.jsx:11-16`.
  - **Problema:**
    - En la línea 14, si el almacenamiento está bloqueado, se lanza una excepción, React desmonta todo y (junto con C5) la página queda en blanco.
    - Quien eligió EN ve primero la versión en ES.
    - No se usa `navigator.language`.
  - **Solución:** se resuelve con I14 (idioma en la ruta). Como mínimo, try/catch más `navigator.language`.

- [ ] **I9. El bucle `requestAnimationFrame` del hero no para nunca** · → Rediseño
  - **Dónde:** `components/Hero.jsx:52-71`.
  - **Problema:**
    - Corre a 60fps siempre, aunque el hero no se vea.
    - Escribe `style.animation = "none"` en cada frame.
    - Tiene un caso especial para Python (`:61`).
    - Usa un corte en 768px, mientras el CSS lo hace en 900px.
    - Tiene un `backdrop-filter` inútil sobre fondo opaco (`globals.css:514`).
  - **Requisito:** los efectos de ratón solo escriben variables CSS y se pausan fuera del viewport.

- [ ] **I10. Efectos costosos para la GPU** · → Rediseño
  - **Dónde:**
    - Orbes con `blur(80px)` animados sin fin (`globals.css:93-136`).
    - `will-change` permanente en unos 31 elementos (`:1519-1543`, `:1802`, más `RevealObserver.jsx:28`).
    - `filter: blur` animado (`:1798`, `:1063-1069`).
  - **Requisito:** animar solo `opacity` y `transform`, sin `will-change` fijo ni blur animado.

- [ ] **I11. Font Awesome completo por CDN y Devicon con `@latest`** · Fase 2
  - **Dónde:** `app/layout.js:73-76`, `components/Hero.jsx:7` y `components/Skills.jsx:5` (constante duplicada).
  - **Problema:** la hoja de estilos bloquea el render y usa `font-display: block` para unos 23 iconos. Devicon hace 20 peticiones sin versión fija.
  - **Solución:** iconos SVG inline y los SVG de Devicon copiados a `public/icons/`.

- [ ] **I12. Los mockups de teléfono muestran capturas horizontales recortadas** · Fase 1 (contenido) **[nav]**
  - **Dónde:** `components/Projects.jsx:26-30`, `:97-101` y `globals.css:1200-1204`.
  - **Problema:** se leen "TravelPi" y "epor". En Juego iOS y Chatbot (`:157-163` y `:192-198`) solo se ve un borrón.
  - **Solución:** conseguir capturas verticales reales de cada app (es contenido; se necesita para el rediseño).

- [ ] **I13. Recortes en anchos intermedios** · → Rediseño **[nav]**
  - **Badges:** a 1024px, los badges Swift y C++ se salen (acaban en 1056 y 1064px; `globals.css:530-551`).
  - **Franja sin badges:** entre 769 y 900px no se ve ninguna de las dos versiones (`:1593` frente a `:1672`).
  - **Terminal:** se corta 62px (`:1044`, `:1879-1884`).
  - **Requisito:** probar el diseño nuevo en 375, 768, 900, 1024 y 1440px.

- [ ] **I14. Toda la web es de cliente solo para poder traducir** · Fase 2
  - **Dónde:** `"use client"` en Experience, Education, Skills, Projects, Contact y Footer.
  - **Problema:** se envían los dos idiomas y todo el JSX al navegador, y el inglés no se indexa.
  - **Solución:** usar `app/[lang]` con `generateStaticParams`, el diccionario en el servidor, `generateMetadata` por idioma y `hreflang`. Solo quedan de cliente Dropdown, Terminal, Nav y los efectos.

- [ ] **I15. UX de proyectos y CV** · Fase 1 (datos) y → Rediseño (presentación)
  - **Problema:**
    - Las apps publicadas piden 2 clics a la tienda, a través de un dropdown (`Projects.jsx:61-85`, `:127-151`), y los mockups no enlazan a nada.
    - El CV es el botón menos visible y pide elegir idioma aunque ya se conoce (`Hero.jsx:127-142`).
    - Proyectos aparece después de Educación y Skills (`app/page.js:11-16`) y repite lo que ya cuenta Experiencia.
  - **Solución:** botones directos a las tiendas, mockup clicable, CV directo según el idioma de la interfaz y Proyectos justo después del hero.

- [ ] **I16. SEO e iconos** · Fase 2
  - **Problema:**
    - La imagen OG declara 1200×630, pero la foto mide 970×1238 (`app/layout.js:36-38`).
    - Faltan `apple-touch-icon`, `sitemap`, `robots` y `not-found`; el 404 es el de Next, en inglés **[nav]**.
  - **Solución:** `app/opengraph-image.jsx`, `apple-icon.png`, `sitemap.js`, `robots.js` y un `not-found.js` traducido.

## 🟡 Menor

### Accesibilidad (→ Rediseño)

- [ ] **M1.** No hay `<main>` ni enlace para saltar al contenido (`app/layout.js:84-92`).
- [ ] **M2.** El Dropdown no se cierra con Escape ni con `focusout`, y usa `aria-haspopup` sin `role="menu"` (`components/Dropdown.jsx:14-39`).
- [ ] **M3.** Nombres y estados accesibles en `Nav.jsx`:
  - El botón de idioma no tiene `aria-label`.
  - Los iconos sociales solo tienen `title`.
  - Falta `aria-current` en el enlace activo.
  - El botón de tema no tiene `aria-pressed`.
  - Los `<i>` de iconos no tienen `aria-hidden`.
- [ ] **M4.** El nivel de cada skill solo se ve al hacer hover (`globals.css:927-966`), no con teclado ni en táctil.
- [ ] **M5.** Zonas táctiles pequeñas en móvil: sociales del footer de 15–18px y botones de 26px **[nav]**.
- [ ] **M6.** La etiqueta de cada sección repite el texto del h2 (Projects `:14/16`, Skills `:76/78`, Education/Contact `:12/14`), y los lectores de pantalla lo leen dos veces.

### Cursor personalizado (→ Rediseño: quitarlo o rehacerlo)

- [ ] **M7.** Problemas en `globals.css:1825-1842` y `components/PremiumCursor.jsx`:
  - `cursor: none` se aplica antes de que exista el cursor personalizado.
  - Al cargar, aparece un punto en la posición (0,0) **[nav]**.
  - Sobre `.btn` y los enlaces se ven dos cursores.
  - Se mueve con `left`/`top` y registra un listener por cada enlace o botón.

### Código muerto y redundante

- [ ] **M8.** En `app/globals.css`:
  - `:286`: `section > h2 i` no afecta a nada.
  - `:33`: la variable `--nav-h` no se usa.
  - Reglas repetidas en `:1596`, `:1622-1624`, `:1695`, `:1448-1449` y `:1655`.
  - `floatBadge` (`:1504`) nunca se ve.
- [ ] **M9.** En el JS:
  - `.dropdown-btn` no tiene CSS (`Projects.jsx:63,129`).
  - La condición de `Nav.jsx:70` siempre es verdadera.
  - El `.trim()` de `Skills.jsx:82` es inútil.
  - El peso 300 de Inter no se usa (`app/layout.js:13`).
  - `THEME_COLORS` no se importa en `layout.js:72`.
  - Los estilos inline de `Projects.jsx:217-220` pisan `.engineer-terminal`.

### Datos y estructura (Fase 1)

- [ ] **M10.** Crear `lib/site.js` con las URLs de GitHub y LinkedIn, el email, el teléfono, el cargo y `SITE_URL`.
  - Hoy esos datos están repetidos en Nav, Footer, Contact y layout.
  - El cargo aparece en 3 versiones: `layout.js:24`, `:61` y `translations.js:13`.
  - `knowsAbout` (`layout.js:63`), `TECH_BADGES` y `CARDS` usan listas de tecnologías distintas.
- [ ] **M11.** Pasar Proyectos, Experiencia y Educación a arrays de datos más un componente (`ProjectCard` o `Timeline`).
  - Hoy son JSX copiado a mano, con diferencias accidentales: `title` en los iconos de plataforma, estilo del botón Descargar y el bloque "Problema".
  - Las cifras del hero tienen que salir de estos datos.
- [ ] **M12.** Hay dos sistemas de animación de entrada (`animate-*` y `premium-reveal`) → Rediseño: dejar uno solo.
- [ ] **M13.** `app/*.js` usa `.js` y el resto de componentes `.jsx`. Los badges se numeran `--0,1,2,4,5` y se detecta Python por su clase (`Hero.jsx:61`).

### Estilos (→ Rediseño: tokens desde el inicio)

- [ ] **M14.**
  - `#FBB124` es una errata de `#FBBF24` (`globals.css:1120`).
  - Verdes, ámbar y grises escritos a mano en vez de tokens.
  - Tres pilas de fuentes monoespaciadas distintas.
  - Radios en px aunque ya existen tokens.
  - Comentarios sueltos: "Tu código original", "Verde hacker" (`:530`, `:537`, `:1835`, `:1861`).

### Textos (Fase 1)

- [ ] **M15.** Correcciones de redacción:
  - Mayúsculas de estilo inglés en ES ("Ver Proyectos", "Solución Técnica").
  - La tarjeta "Teléfono" abre WhatsApp y no hay `tel:` (`Contact.jsx:29-34`).
  - "XCode" en `Skills.jsx:61`.
  - "notificaciones push locales" (`translations.js:83`).
  - Inglés B2 descrito como "capacidad fluida".
  - `locale: "es_ES"` en una web con voseo: usar `es_AR` con `alternateLocale`.
  - Verificar si la cuenta `@ferminlasarte` de Twitter existe.
  - Revisar la redacción "Creador de TravelPic/DeporTurnos", porque los paquetes de tienda son de otros publicadores.

### UX pequeña (→ Rediseño)

- [ ] **M16.**
  - Botón para copiar el email con feedback (`Contact.jsx:22-25`).
  - Quitar los botones deshabilitados "Próximamente" (`Projects.jsx:329`, `:378`).
  - AI Chatbot no tiene ningún enlace.
  - Poner el nombre completo en el h1 (`Hero.jsx:94-97`).
  - En móvil, los botones de acción quedan por debajo de la primera pantalla.

### Herramientas (Fase 2)

- [ ] **M17.** `next lint` desaparece en Next 16: migrar con `npx @next/codemod next-lint-to-eslint-cli .`.

---

## Criterios del rediseño (Fase 3)

Requisitos que el diseño nuevo tiene que cumplir para no repetir lo encontrado:

1. **Responsive:** sin desborde horizontal en 375, 768, 900, 1024 y 1440px. Nada de `overflow-x: hidden` en `body` para tapar desbordes (C2, I13).
2. **Contenido visible sin JS:** las animaciones de entrada son una mejora progresiva (C5).
3. **Movimiento:** solo se anima `opacity` y `transform`; sin `will-change` fijo, sin blur animado y sin bucles rAF permanentes. Todo desactivable con `prefers-reduced-motion` (I5, I9, I10).
4. **Contraste:** AA (4,5:1) en los dos temas, verificado (I7).
5. **Nav:** accesible, con botón de menú explícito en móvil, anclas nativas y `aria-current` (I1, I2, M3).
6. **Tokens:** colores, radios, sombras y fuentes como tokens, sin hex sueltos (M14).
7. **Un solo sistema** de animación de entrada, y sin conflictos entre el hover y la entrada (I6, M12).
8. **Assets:** imágenes optimizadas con `next/image`, iconos SVG y cero CSS externo bloqueante (C3, I11).
9. **Proyectos:** enlaces directos a tiendas, repo o demo; capturas reales; los datos salen de un array (I12, I15, M11).
10. **Accesibilidad:** `<main>`, enlace para saltar al contenido, `:focus-visible` propio, zonas táctiles de al menos 24px (mejor 44px), información que no dependa del hover (M1–M6).

## Hallazgos nuevos

_(Agregá aquí lo que aparezca durante las fases.)_

- [x] **N1. La foto con GPS sigue en el historial de git** · Fase 0
  - **Hecho (2026-09-13):** se reescribió el historial con `git filter-repo --invert-paths` (sobre un clon nuevo) y se hizo force-push. Cambiaron todos los hashes, así que los que se citan en este archivo son de antes de la reescritura. Ningún commit contiene ya la foto y el árbol final no cambió.
  - **Pendiente (manual):** pedirle a GitHub Support que purgue de la caché los commits viejos, y borrar en Vercel los deploys anteriores, que todavía sirven la foto en sus URLs propias.
  - **Dónde:** blob `ee01416`, como `assets/foto_perfil.jpeg` desde `fc441bf` (2026-02-15) y como `public/assets/foto_perfil.jpeg` en `5b87af2`. Aparece en 34 commits y el repo es público.
  - **Opciones:** reescribir el historial con `git filter-repo` y hacer force-push, o dejarlo como está. Ver la explicación de la Fase 0.
