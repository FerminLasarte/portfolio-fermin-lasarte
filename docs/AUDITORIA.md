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

- [x] **C3. Se descargan ~14,8 MB en la primera carga** · Fase 1 **[nav]**
  - **Hecho (Fase 1):** las capturas pasaron a WebP de 800px (`travelpic.webp` 4,7 KB y `deporturnos.webp` 8,8 KB) y los fondos difuminados usan miniaturas de 48px (`*-thumb.webp`, entre 0,2 y 0,6 KB). Se borraron los originales (`travelpic.jpeg`, `deporturnos.png`, `impostor.jpeg` y `chatbot.jpeg`), y los de Impostor y Chatbot no se regeneraron porque esas tarjetas solo muestran el fondo. La foto del hero, las capturas y los iconos usan `next/image`: la foto con `sizes` según los cortes del CSS y `priority`; las capturas con `sizes` de 360px y 290px, porque con `object-fit: cover` se dibujan más anchas que el teléfono; los SVG de Devicon con `unoptimized` hasta I11. Se quitó `no-img-element: off` de `.eslintrc.json` y el lint da 0 avisos. Medido en local: las imágenes propias pesan unos 20 KB en total (foto 10 KB, capturas 3,6 y 5,4 KB, miniaturas 1,3 KB).
  - `scripts/strip-metadata.mjs` ahora también limpia WebP (quita los chunks EXIF y XMP y apaga sus flags en VP8X). Se probó con una imagen con metadatos y se pasó por las imágenes nuevas.
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
  - **Hecho (Fase 2):** `themeInitScript` agrega `html.js` antes del primer pintado, y el estado oculto de `.animate-on-scroll`, `.animate-left`, `.animate-right`, `.premium-reveal` y `.bento-card.premium-reveal` quedó bajo `:where(html.js)`. `:where()` no suma especificidad, así que con JS todo pesa lo mismo que antes y no cambia nada (tampoco lo que queda para el rediseño: I5, I6, I10). La foto del hero ya no tiene `animate-scale` (la clase quedó sin uso y se borró del CSS y de RevealObserver) y lleva `fetchPriority="high"` además de `priority` (en Next 15, `priority` solo agrega el preload y no pone `fetchpriority` en el `<img>`).
  - **Verificado:** sin JS (HTML sin `<script>` en un iframe), la base tenía los 31 elementos animados con `opacity: 0`, foto incluida; ahora hay 0 ocultos de 30, en ES y EN. Con JS, al cargar siguen ocultos los de más abajo, la foto se ve de entrada (`opacity: 1`, sin `transform`), y la huella del layout ya revelado coincide con la base en ES y EN, a 375px y 1024px.

## 🟠 Importante

- [ ] **I1. En táctil, tocar idioma o tema también abre el menú; no hay botón de menú** · → Rediseño **[nav]**
  - **Dónde:** `components/Nav.jsx:64-73`.
  - **Problema:** cualquier toque que no sea un enlace de sección hace `toggle("nav-expanded")`. En móvil las secciones están ocultas (`globals.css:193-199`) y nada indica que el menú se puede abrir.
  - **Solución:** un botón de menú explícito con `aria-expanded` y `aria-controls`, estado en `useState` y cierre con Escape.

- [ ] **I2. Los enlaces del nav no funcionan fuera de la home y no actualizan la URL** · Fase 2 **[nav]**
  - **Dónde:** `components/Nav.jsx:21-32`.
  - **Problema:** hace `preventDefault()` y después `querySelector(href)`, que en `/no-existe` devuelve `null`. La URL nunca recibe el `#hash`. Además duplica lo que ya hacen `scroll-behavior` y `scroll-margin-top`.
  - **Solución:** quitar `handleLinkClick` y usar enlaces nativos `href="/#proyectos"`.
  - **Hecho (Fase 2):** se quitó `handleLinkClick`. Los enlaces son anclas nativas a la home del idioma (`/#proyectos` en ES, `/en#proyectos` en EN), armadas en el layout con `homePath()`. El scroll suave y el margen del nav fijo salen del CSS (`scroll-behavior: smooth` y `scroll-margin-top: 6rem`), así que cada sección queda 96px por debajo del borde superior; antes el JS la dejaba a la altura del nav más 24px (~71px). El resaltado del enlace activo compara `a.hash`. En táctil, el menú se sigue cerrando al tocar un enlace (`onNavClick`). El HTML solo cambia en los `href` del nav.
  - **Verificado:** al hacer clic, la URL toma el `#hash` y la página baja a la sección, en ES y EN, y en táctil (375px) el menú se cierra. Desde otra página (el 404 traducido de I16, que lleva el nav) el enlace vuelve a la home del idioma, en la sección. El panel del navegador de las pruebas estaba oculto (`visibilityState: hidden`, sin `requestAnimationFrame`), y ahí el scroll suave no avanza, ni con el código viejo ni cargando `/#proyectos`; por eso las pruebas de scroll se hicieron con `scroll-behavior: auto` inyectado. Por lo mismo, el `IntersectionObserver` no dispara con el panel oculto y el resaltado del enlace activo no se pudo ver ahí (tampoco en la base).

- [x] **I3. En modo EN quedan textos en español** · Fase 1 **[nav]**
  - **Hecho (Fase 1):** todo pasa por `translations.js`: tooltips de Skills con el nivel como clave (`skills.level.advanced` / `.intermediate`), títulos de las tarjetas de Skills (sin el sufijo " & Cloud" suelto), las líneas del terminal (`projects.compiler.terminal`; el tipeo usa el texto del idioma actual), el `alt` de la foto y de las capturas (`projects.screenshotAlt` con `fill()`), `title` y `aria-label` del nav, el badge "WIP" (ahora "Próximamente" / "Coming Soon") y la metadata (`meta.description`, `meta.ogAlt`). "AI Chatbot NLU" y las etiquetas "Multiplayer", "Compilers" y "AI" desaparecieron con I4. La metadata se genera en español porque el HTML se prerenderiza en un solo idioma; el idioma por ruta llega con I14. Verificado en el navegador en ES y EN.
  - **Dónde:**
    - `components/Skills.jsx:13-64`: tooltips "· Avanzado".
    - `Skills.jsx:11,26,36,47`: títulos y el sufijo " & Cloud".
    - `components/Terminal.jsx:5-11`: todas las líneas.
    - `components/Hero.jsx:148`: `alt`.
    - `components/Nav.jsx:102,110,112`: `title` y `aria-label`.
    - `components/Projects.jsx`: `:200` "AI Chatbot NLU", `:313` y `:346` "WIP", `:28`, `:99` y `:272` los `alt`, y las etiquetas `:175`, `:240` y `:375`.
    - La metadata de `app/layout.js`.
  - **Solución:** todo a traducciones, con los niveles como clave (`skills.level.advanced`).

- [x] **I4. Datos contradictorios** · Fase 1
  - **Hecho (Fase 1), según lo que decidió Fermin el 2026-09-13:**
    - **Ubicación:** "Buenos Aires, Argentina" (vive en Capital Federal), igual que en los CV.
    - **Cifras:** salen de los datos, con "+" en años y proyectos. Hoy: 2 apps en producción, 4+ años (2021–2025) y 8+ proyectos.
    - **Trayectoria:** DeporTurnos pasa a 2021–2025, con el rol "Ideólogo y creador". TravelPic termina en 2025.
    - **TravelPic:** la dieron de baja las tiendas por inactividad y falta volver a subirla. Sigue como "En producción", pero el botón lleva a travelpicapp.com. Los iconos de plataforma ahora salen de `platforms` y no de los enlaces.
    - **Compilador:** "Compilador en Java". El texto y el terminal describen lo que hace el repo: parser con Yacc, código intermedio y assembler x86 (MASM), no LL(1) ni bytecode.
    - **Proyectos:** se quitó la Landing con IA (y `landing-ia.png`). La app de barberías pasa a ser Bookit (Flutter y Supabase, en desarrollo, enlace a la landing). El chatbot con Rasa se reemplazó por `chatbot-ai`. Se sumó Vault (repo y landing). El juego iOS se describe como es (un solo dispositivo; el modo online está en desarrollo) y está marcado en desarrollo. ClubSystem sigue en desarrollo, con enlace al repo y detección de anomalías con la API de Anthropic, sin embeddings. El repo del juego pasó a llamarse `impostor-app`.
    - **ES/EN:** los textos que tenían agregados en una sola versión se reescribieron iguales en los dos idiomas.
    - **Idiomas:** el ítem de inglés pasó a "Inglés y francés (B2)".
    - **Tecnologías:** Objective-C (intermedio), JavaScript (avanzado), HTML y CSS (avanzado), React Native, Supabase y SQLite (intermedio) en Skills. REST API, Tauri, TestFlight, Scrum, Claude API, Rasa y Machine Learning, sin icono, van a `OTHER_SKILLS` (JSON-LD).
  - **Ajustes posteriores:** chatbot-ai está en producción. "Apps en producción" cuenta solo los proyectos en producción con plataformas móviles, así que sigue en 2. React Native, Supabase y SQLite pasan a avanzado. El rol en inglés en DeporTurnos es "Founder & Developer". Sobre el enfoque, se mantiene el de la web ("móvil (Swift, Flutter) y backend") porque es coherente con el cargo; el CV se alinea a eso.
  - **CV:** los CV no se editan desde el repo (se generan en Google Docs); la lista de cambios se le pasó a Fermin.
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
  - **Hecho (Fase 2, con I14):** el idioma sale de la URL, así que se borró `context/LanguageProvider.jsx` y ya no se usa `localStorage` para el idioma. El HTML llega en el idioma correcto, sin parpadeo, y `<html lang>` se genera en el servidor. No hay detección automática: Fermin eligió no redirigir por `Accept-Language` ni por `navigator.language` (el bot de Google entra sin esa cabecera, y quien comparte `/` espera que el otro vea lo mismo). El botón de idioma es un enlace a la otra ruta y conserva la sección visible (`/en#proyectos`).

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
  - **Hecho (Fase 2):** se quitó la hoja de Font Awesome. Los 23 iconos que se usaban están en `lib/icons.js` como SVG inline de Font Awesome Free 6.4.0 (la misma versión del CDN; licencia CC BY 4.0), con un export por icono para que el JS del cliente solo lleve los que usa. Se dibujan con `components/Icon.jsx`: 1em de alto, ancho según el viewBox, `vertical-align: -0.125em` y `fill: currentColor`, igual que el glifo. Son decorativos (`aria-hidden`), salvo los de plataforma, que llevan `<title>` (iOS, Android). Los nombres viejos pasaron a los de FA 6 (`map-marker-alt` → `location-dot`, `external-link-alt` → `up-right-from-square`, `mobile-alt` → `mobile-screen-button`, `tools` → `screwdriver-wrench`). El CSS que apuntaba a `i` o a `.fa-*` ahora apunta a `.icon` o a `.icon-*`; el icono de cada tarjeta de Skills va dentro de un `<span class="skill-card-icon">`, que es la caja de 1.4rem que antes era el `<i>`. En `.section-label` (inline-flex, que toma la línea base del icono) se compensó con márgenes la línea base del glifo y el `letter-spacing` que se le sumaba.
  - Los 26 SVG de Devicon están en `public/icons/devicon/`, fijados en la versión 2.17.0 (la que resolvía `@latest`, idénticos byte a byte). `DEVICON` apunta ahí y se quitó `unoptimized`: next/image sirve los `.svg` locales tal cual.
  - **Verificado:** el HTML ya no tiene ninguna referencia a cdnjs ni a jsDelivr. Solo cambian los `<i>`, que pasan a `<svg>`, y el `src` y el preload de Devicon. En el navegador se comparó posición y tamaño de los 467 elementos con la base (ES a 1024px y EN a 375px, oscuro): la diferencia máxima es de 0,27px en x, 0,09px en y y 0,15px de ancho (los `.btn` con icono miden 0,14px menos, porque ya no se suma el `letter-spacing` de 0,01em al glifo). El único cambio de más de medio píxel es el ancho propio de los iconos de `.section-label`, porque ahora el `letter-spacing` es un margen; el texto que sigue está en el mismo lugar. Antes del ajuste de `vertical-align`, cada etiqueta de sección quedaba 1,88px más arriba y toda la página se acortaba unos 9px.

- [ ] **I12. Los mockups de teléfono muestran capturas horizontales recortadas** · Fase 1 (contenido) **[nav]**
  - **Dónde:** `components/Projects.jsx:26-30`, `:97-101` y `globals.css:1200-1204`.
  - **Problema:** se leen "TravelPi" y "epor". En Juego iOS y Chatbot (`:157-163` y `:192-198`) solo se ve un borrón.
  - **Solución:** conseguir capturas verticales reales de cada app (es contenido; se necesita para el rediseño).
  - **Pendiente (Fase 1):** faltan las capturas verticales de TravelPic y DeporTurnos (las que se muestran en el teléfono), y opcionalmente del juego iOS, el chatbot, Vault, Bookit y ClubSystem, que hoy solo tienen fondo o degradado. Cuando lleguen: pasarlas a WebP de ~800px de alto con `sharp`, quitarles los metadatos con `scripts/strip-metadata.mjs` y actualizar `image`, `width`, `height` y `thumb` en `PROJECTS` (`lib/site.js`). Los `sizes` de `ProjectCard` suponen capturas horizontales 2:1; con capturas verticales bajan al ancho del teléfono (~90px y ~72px).

- [ ] **I13. Recortes en anchos intermedios** · → Rediseño **[nav]**
  - **Badges:** a 1024px, los badges Swift y C++ se salen (acaban en 1056 y 1064px; `globals.css:530-551`).
  - **Franja sin badges:** entre 769 y 900px no se ve ninguna de las dos versiones (`:1593` frente a `:1672`).
  - **Terminal:** se corta 62px (`:1044`, `:1879-1884`).
  - **Requisito:** probar el diseño nuevo en 375, 768, 900, 1024 y 1440px.

- [ ] **I14. Toda la web es de cliente solo para poder traducir** · Fase 2
  - **Dónde:** `"use client"` en Experience, Education, Skills, Projects, Contact y Footer.
  - **Problema:** se envían los dos idiomas y todo el JSX al navegador, y el inglés no se indexa.
  - **Solución:** usar `app/[lang]` con `generateStaticParams`, el diccionario en el servidor, `generateMetadata` por idioma y `hreflang`. Solo quedan de cliente Dropdown, Terminal, Nav y los efectos.
  - **Hecho (Fase 2):** esquema elegido por Fermin: **`/` en español y `/en` en inglés, sin redirección**. Las páginas viven en `app/[lang]` (`generateStaticParams` con `es` y `en`, `dynamicParams = false`); `next.config` reescribe `/` a `/es` y redirige `/es` a `/` (308), sin middleware, así que las dos páginas son estáticas. `lib/i18n.js` tiene `LOCALES`, `homePath()` y `getT(lang)` (el diccionario solo se importa en el servidor). `generateMetadata` arma por idioma la descripción, el canonical (`/` o `/en`), `hreflang` (`es`, `en` y `x-default` → `/`), `og:locale` y `og:url`; el JSON-LD usa la descripción del idioma.
  - Hero, Experience, Education, Skills, Projects, ProjectCard, Contact y Footer pasaron a server components y reciben `t` por prop. Siguen de cliente Dropdown, Terminal (recibe las líneas), Nav (recibe los textos ya traducidos), `HeroParallax` (el efecto del hero, separado de Hero), PremiumCursor y RevealObserver. El botón de idioma pasó de `<button>` a `<a hreflang>`, con `font-family: Arial` para que se vea igual que antes (es la fuente que Chrome le daba al botón).
  - **Verificado:** el HTML de `/` y `/en` es igual al anterior (el de EN se comparó con un build de la base con el idioma inicial en inglés), salvo el `<head>` por idioma y el `<a>` del botón. En el navegador, posición, tamaño, fuente y color de los 467 elementos coinciden con la base en ES y EN, a 375px y 1024px. El diccionario ya no está en el JS del cliente y la página pasó de 118 kB a 109 kB de First Load JS. `/foo` y `/en/foo` dan 404 (el 404 traducido llega con I16).

- [ ] **I15. UX de proyectos y CV** · Fase 1 (datos) y → Rediseño (presentación)
  - **Problema:**
    - Las apps publicadas piden 2 clics a la tienda, a través de un dropdown (`Projects.jsx:61-85`, `:127-151`), y los mockups no enlazan a nada.
    - El CV es el botón menos visible y pide elegir idioma aunque ya se conoce (`Hero.jsx:127-142`).
    - Proyectos aparece después de Educación y Skills (`app/page.js:11-16`) y repite lo que ya cuenta Experiencia.
  - **Solución:** botones directos a las tiendas, mockup clicable, CV directo según el idioma de la interfaz y Proyectos justo después del hero.
  - **Datos hechos (Fase 1):** cada proyecto de `PROJECTS` (`lib/site.js`) declara sus enlaces por tipo (`appstore`, `playstore`, `repo` o `demo`) y sus plataformas, y los CV están en `CV` con su idioma. Todos los proyectos tienen al menos un enlace (antes el chatbot, la app de barberías y ClubSystem no tenían ninguno). Queda para el rediseño cómo se presentan: botones directos en vez del dropdown, mockup clicable, CV según el idioma y el orden de las secciones.

- [ ] **I16. SEO e iconos** · Fase 2
  - **Problema:**
    - La imagen OG declara 1200×630, pero la foto mide 970×1238 (`app/layout.js:36-38`).
    - Faltan `apple-touch-icon`, `sitemap`, `robots` y `not-found`; el 404 es el de Next, en inglés **[nav]**.
  - **Solución:** `app/opengraph-image.jsx`, `apple-icon.png`, `sitemap.js`, `robots.js` y un `not-found.js` traducido.
  - **Hecho (Fase 2):**
    - **Open Graph:** `app/[lang]/opengraph-image.js` genera en el build una imagen de 1200×630 por idioma (`/es/opengraph-image` y `/en/opengraph-image`): cargo, nombre, una línea traducida (`meta.ogTagline`, con la cantidad de apps de `STATS`) y la foto. Usa Inter, bajando de Google Fonts solo los glifos que necesita; si el build no tiene red, usa la fuente de `next/og`. X usa la misma imagen. El `alt` es el `<title>`, igual en los dos idiomas, para que la imagen sea estática; `meta.ogAlt` quedó sin uso y se borró. La foto sigue en el JSON-LD.
    - **apple-icon:** `public/apple-icon.png` es de 180×180 y opaco, generado con sharp a partir del favicon (cuadrado sin esquinas redondeadas, que iOS pone las suyas). Va en `ICONS` (`lib/site.js`) y no como archivo en `app/`, porque con `icons` en la metadata Next no suma el apple-icon de archivo.
    - **sitemap y robots:** `app/sitemap.js` lista `/` y `/en`, con sus alternativas hreflang, y `app/robots.js` permite todo y apunta al sitemap.
    - **404:** hay uno solo, bilingüe, para todas las URLs que no existen: `app/global-not-found.js` (con `experimental.globalNotFound`, porque no hay un layout raíz). Arma la página con `Document`, con el nav y el footer en español, y `components/NotFound.jsx` (server component) muestra el mensaje en español y en inglés, con un botón a cada home. El título es "Página no encontrada · Page not found — Fermin Lasarte" y Next agrega `noindex`.
    - **Por qué no un 404 por idioma (decidido por Fermin, opción 1):** se probó `app/[lang]/[...rest]/page.js` con `notFound()` y un `not-found.js` en `[lang]/` o en `[...rest]/`. Next 15.5 respondía 404, pero no lo renderizaba en el servidor: mandaba un documento de error (`<html id="__next_error__">`) que el navegador completaba después. Sin JS la página quedaba vacía y el script del tema no corría (se perdía el modo oscuro). Pasaba igual sin `globalNotFound`, sin `dynamicParams = false`, con un layout mínimo y con un `not-found.js` estático, así que es el comportamiento de Next con el root layout dentro de `[lang]`.
    - El `<html>`, el nav y el footer pasaron del layout a `components/Document.jsx`, para que el 404 global use la misma estructura. El HTML de la home no cambió.
  - **Verificado:** `/` y `/en` dan 200 y `/es` da 308 a `/`. `/no-existe`, `/en/no-existe`, `/es/no-existe`, `/foo/bar` y `/en/a/b` dan 404 con el 404 bilingüe, generado en el servidor (el HTML trae el contenido y el script del tema). El sitemap, robots, el apple-icon y las dos imágenes OG responden con el tipo correcto. En la home solo cambian las etiquetas de imagen OG y Twitter (ahora 1200×630 y por idioma) y se agrega el `apple-touch-icon`; el `<body>` es igual.

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

- [x] **M10.** Crear `lib/site.js` con las URLs de GitHub y LinkedIn, el email, el teléfono, el cargo y `SITE_URL`.
  - **Hecho (Fase 1):** `lib/site.js` tiene `PERSON` (nombre, ubicación, email, teléfono, WhatsApp), `SOCIAL`, `CV`, el cargo (`ROLE` para el JSON-LD, `ROLE_SHORT` para el `<title>` y `ROLE_TAGLINE` para el hero) y una sola lista de tecnologías (`SKILL_GROUPS`) de la que salen Skills, los badges del hero (`HERO_BADGES`) y `knowsAbout`. Nav, Footer, Contact, Hero y `layout.js` los importan; `DEVICON` ya no está duplicado. El HTML generado es igual al anterior salvo `knowsAbout`, que ahora lista todas las tecnologías.
  - Hoy esos datos están repetidos en Nav, Footer, Contact y layout.
  - El cargo aparece en 3 versiones: `layout.js:24`, `:61` y `translations.js:13`.
  - `knowsAbout` (`layout.js:63`), `TECH_BADGES` y `CARDS` usan listas de tecnologías distintas.
- [x] **M11.** Pasar Proyectos, Experiencia y Educación a arrays de datos más un componente (`ProjectCard` o `Timeline`).
  - **Hecho (Fase 1):** `PROJECTS`, `EXPERIENCE` y `EDUCATION` en `lib/site.js`; `components/ProjectCard.jsx` (medio, estado, enlaces por tipo: tiendas, repo o demo) y `components/Timeline.jsx`. Los textos siguen en `translations.js`, con claves por id (`projects.travelpic.*`, `exp.travelpic.*`, `edu.unicen.*`), y `t(clave, fallback)` permite que el título o el bloque "Problema" sean opcionales. Las cifras del hero (`STATS`) salen de los datos: apps con `status: "live"`, años entre el primer inicio y el último fin de la trayectoria, y cantidad de proyectos. Las diferencias accidentales quedaron unificadas: los iconos de plataforma siempre tienen `title` y "Problema" aparece si hay texto. El estilo relleno del botón de TravelPic se mantiene con `primary: true`. HTML comparado con el anterior: solo cambió "5+" → "4+" (2021–2025).
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

- [x] **M15.** Correcciones de redacción:
  - **Hecho (Fase 1), aprobado por Fermin:**
    - Mayúsculas normales en ES: "Ver proyectos", "Solución técnica", "En producción", "Apps en producción", "Años de experiencia", "Mis habilidades", "Proyectos destacados", "Ver perfil", "Bases de datos y nube", "Herramientas" (EN: "Tools") y "Desarrollador mobile freelance / independiente".
    - La tarjeta "Teléfono" pasa a llamarse "WhatsApp", y el número es un enlace `tel:` que hereda el color del texto.
    - "XCode" pasa a "Xcode".
    - Idiomas: se quitaron "capacidad fluida" y "escritura de código".
    - `locale: "es_AR"` con `alternateLocale: ["en_US"]`.
    - Hero EN: "Final-year Systems Engineering student".
    - La cuenta de Twitter existe: `@FerminLasarte`.
    - TravelPic: "Desarrollador de TravelPic" / "Developer at TravelPic".
    - "Notificaciones push locales" dejó de aplicar porque el proyecto se quitó en I4.
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

- [x] **M17.** `next lint` desaparece en Next 16: migrar con `npx @next/codemod next-lint-to-eslint-cli .`.
  - **Hecho (Fase 2):** el codemod cambió el script a `eslint .`, pero el `eslint.config.mjs` que generó no funcionaba (hacía spread de `eslint-config-next/core-web-vitals`, que en la 15 sigue siendo formato eslintrc). Se reescribió con `FlatCompat` (`@eslint/eslintrc` como devDependency), se agregó `files: ["**/*.{js,jsx,mjs,cjs}"]` (sin eso el CLI se salteaba todos los `.jsx`) y se ignoran `.next/`, `out/` y `build/`. Se borró `.eslintrc.json`. Comprobado con un `<img>` de prueba en un `.jsx` (salta `no-img-element`); el lint da 0 avisos y `next build` lo sigue usando. Al pasar a Next 16 se puede cambiar por el import directo de `eslint-config-next`.

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
  - **Dónde:** blob `ee01416`, como `assets/foto_perfil.jpeg` desde `fc441bf` (2026-02-15) y como `public/assets/foto_perfil.jpeg` en `5b87af2`. Aparece en 34 commits y el repo es público.
  - **Opciones:** reescribir el historial con `git filter-repo` y hacer force-push, o dejarlo como está. Ver la explicación de la Fase 0.

- [ ] **N2. Los datos de `lib/site.js` viajan en el JS del cliente** · Fase 2 (hallado en I11)
  - **Dónde:** `components/Nav.jsx` importa `PERSON` y `SOCIAL` de `lib/site.js`.
  - **Problema:** como `site.js` calcula `SKILLS`, `HERO_BADGES` y `STATS` con llamadas a funciones, el bundler no puede descartar el resto del módulo. El chunk del layout lleva `PROJECTS`, `SKILL_GROUPS` (con sus 5 iconos) y demás, aunque Nav solo use el email y dos URLs. Ya pasaba antes de la Fase 2.
  - **Solución:** que el layout le pase a Nav el email y las URLs por props (como ya hace con los textos), o separar `PERSON` y `SOCIAL` en un módulo aparte.
