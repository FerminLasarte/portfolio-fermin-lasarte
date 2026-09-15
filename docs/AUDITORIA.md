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
| **3. Rediseño** | Nuevo diseño visual (skills de diseño + douglus.site) + los "Criterios del rediseño" | La mayoría de los problemas de CSS, animaciones y accesibilidad visual se resuelven en el diseño nuevo, en vez de parchear el actual. |
| **4. Re-auditoría** | Repetir esta auditoría sobre el resultado | Confirmar que no volvieron los problemas. |

**Estado (2026-09-15):** las fases 0 a 3 están hechas. La Fase 3 está en la rama `fase-3-rediseno`, todavía sin merge a `main` (que publica en producción). El diseño final, con todo lo que cambió respecto del brief a pedido de Fermin, está en `docs/DISENO.md`. Sigue la Fase 4, conviene hacerla sobre el deploy de preview de Vercel de la rama. Quedan abiertos I12 y N4 (contenido que tiene que conseguir Fermin), M13 (decidir si se unifica `.js`/`.jsx`) y N5 a N8.

**Estado (2026-09-15, Fase 4):** la re-auditoría está hecha, sobre `a9eeb81` y el preview de la rama. Está al final de este archivo, en "Re-auditoría (Fase 4)": 9 puntos importantes (R-I1 a R-I9), 38 menores (R-M1 a R-M38), los 7 criterios verificados, Lighthouse y el movimiento en un navegador visible. N7 está hecho, N6 quedó fuera y N8 pasó a R-I3.

**Estado (2026-09-15, fin del día):**
- **Importantes:** los 9 están cerrados, cada uno en su commit. Se arreglaron R-I1, R-I2, R-I4, R-I5, R-I6, R-I7, R-I8 y R-I9. R-I3 se deja como está, por decisión de Fermin.
- **Rama:** los commits están pusheados en `fase-3-rediseno` (el último es `0601232`) y todavía no hay merge a `main`.
- **Sigue:** los menores (R-M1 a R-M38), en una conversación nueva. El orden propuesto es accesibilidad (R-M1 a R-M13), SEO y robustez (R-M21 a R-M27), eficiencia (R-M14 a R-M20), limpieza (R-M28 a R-M36) y, al final, la documentación (R-M37 y R-M38), para que DISENO.md quede en su versión definitiva.
- **Siguen abiertos de antes:** I12 y N4 (contenido que tiene que conseguir Fermin), M13 y N5 (este último está en R-M35).

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

- [x] **C5. Sin JS la página sale casi vacía y la foto del hero depende de JS** · Fase 2 (y → Rediseño)
  - **Hecho (Fase 3):** en el diseño nuevo, todo lo que oculta contenido de entrada (letras del nombre, paneles que esperan con `.is-waiting`) va bajo `html.js` y `prefers-reduced-motion: no-preference`. Sin JS la página es vertical y completa: el HTML de `/` y `/en` trae el h1, los seis `id`, las 8 tarjetas, los enlaces directos a las tiendas, el CV, `mailto:` y `tel:`. La foto sigue sin animación de entrada (`loading="eager"` y `fetchPriority="high"`; en Next 16 `priority` está deprecado).
  - **Dónde:** `app/globals.css:1514-1544` y `:1795-1803`, `components/RevealObserver.jsx:25` y `components/Hero.jsx:146`.
  - **Problema:** todo el contenido animado empieza con `opacity: 0` y solo aparece tras la hidratación. Si JS falla, no se ve nada. El LCP (la foto) espera a JS más una animación de 1s.
  - **Solución:**
    - Ocultar solo bajo `html.js`, con la clase puesta desde `themeInitScript` en `lib/theme.js`.
    - No animar la foto del hero y ponerle `fetchpriority="high"`.
  - **Hecho (Fase 2):** `themeInitScript` agrega `html.js` antes del primer pintado, y el estado oculto de `.animate-on-scroll`, `.animate-left`, `.animate-right`, `.premium-reveal` y `.bento-card.premium-reveal` quedó bajo `:where(html.js)`. `:where()` no suma especificidad, así que con JS todo pesa lo mismo que antes y no cambia nada (tampoco lo que queda para el rediseño: I5, I6, I10). La foto del hero ya no tiene `animate-scale` (la clase quedó sin uso y se borró del CSS y de RevealObserver) y lleva `fetchPriority="high"` además de `priority` (en Next 15, `priority` solo agrega el preload y no pone `fetchpriority` en el `<img>`).
  - **Verificado:** sin JS (HTML sin `<script>` en un iframe), la base tenía los 31 elementos animados con `opacity: 0`, foto incluida; ahora hay 0 ocultos de 30, en ES y EN. Con JS, al cargar siguen ocultos los de más abajo, la foto se ve de entrada (`opacity: 1`, sin `transform`), y la huella del layout ya revelado coincide con la base en ES y EN, a 375px y 1024px.

## 🟠 Importante

- [x] **I1. En táctil, tocar idioma o tema también abre el menú; no hay botón de menú** · → Rediseño **[nav]**
  - **Hecho (Fase 3):** en móvil hay un `<button>` "Menú" con `aria-expanded` y `aria-controls` que abre un menú a pantalla completa; el resto de la página queda `inert`, Escape lo cierra y devuelve el foco, y se cierra solo al pasar a escritorio. Idioma y tema son controles aparte. Sin JS, la lista se ve en una segunda fila.
  - **Dónde:** `components/Nav.jsx:64-73`.
  - **Problema:** cualquier toque que no sea un enlace de sección hace `toggle("nav-expanded")`. En móvil las secciones están ocultas (`globals.css:193-199`) y nada indica que el menú se puede abrir.
  - **Solución:** un botón de menú explícito con `aria-expanded` y `aria-controls`, estado en `useState` y cierre con Escape.

- [x] **I2. Los enlaces del nav no funcionan fuera de la home y no actualizan la URL** · Fase 2 **[nav]**
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

- [~] **I5. `prefers-reduced-motion` no tiene efecto en Skills ni en Proyectos** · → Rediseño
  - **Fuera de los criterios (2026-09-14):** el movimiento lo definen las skills de diseño y douglus.site, no la auditoría.
  - **Dónde:** `app/globals.css:1762-1788`, anulado por `:1795` y `:1815`. El `:1778` pierde contra `.availability-badge .status-dot` (`:349`).
  - **Problema:** tampoco se desactivan el scroll suave (`:74`, `Nav.jsx:30`), el parpadeo del terminal (`:1890`) ni el tecleo de `Terminal.jsx`.
  - **Requisito para el diseño nuevo:** envolver los efectos en `@media (prefers-reduced-motion: no-preference)`.

- [~] **I6. Las tarjetas no se elevan al hacer hover** · → Rediseño **[nav]**
  - **Fuera de los criterios (2026-09-14):** el movimiento lo definen las skills de diseño y douglus.site, no la auditoría.
  - **Dónde:** `globals.css:1546-1549` (`.visible { transform … !important }`), `:1804` y `:1819`, que pisan los hovers de `:1399`, `:849` y `:998`.
  - **Requisito:** que las animaciones de entrada y los hovers no compitan por `transform`; por ejemplo, usar la propiedad independiente `translate`.

- [x] **I7. Contraste por debajo de WCAG AA** · → Rediseño
  - **Hecho (Fase 3):** paleta nueva (DISENO.md, sección 2). Medido en el navegador sobre los colores calculados, en claro y oscuro: el mínimo es 5,09 (claro) y 5,44 (oscuro), el texto secundario sobre el panel de contacto; el resto va de 5,92 a 16,69. Los bordes de control dan 3,09 o más.
  - **Dónde:**
    - Botón primario en modo oscuro, `#fff` sobre `#818CF8` (`globals.css:45`, `:600`): **2,98**.
    - `.production-status` (`:1360`): **3,30**.
    - `.availability-badge` (`:339`): **2,88**.
    - Píldora WIP sobre el degradado azul (`:1109`, `:1120`): entre 1,2 y 2,9.
  - **Requisito:** la paleta nueva tiene que pasar 4,5:1 en texto normal y en los dos temas.

- [x] **I8. Idioma: `localStorage` sin try/catch, parpadeo al cargar y sin detección** · Fase 2
  - **Dónde:** `context/LanguageProvider.jsx:11-16`.
  - **Problema:**
    - En la línea 14, si el almacenamiento está bloqueado, se lanza una excepción, React desmonta todo y (junto con C5) la página queda en blanco.
    - Quien eligió EN ve primero la versión en ES.
    - No se usa `navigator.language`.
  - **Solución:** se resuelve con I14 (idioma en la ruta). Como mínimo, try/catch más `navigator.language`.
  - **Hecho (Fase 2, con I14):** el idioma sale de la URL, así que se borró `context/LanguageProvider.jsx` y ya no se usa `localStorage` para el idioma. El HTML llega en el idioma correcto, sin parpadeo, y `<html lang>` se genera en el servidor. No hay detección automática: Fermin eligió no redirigir por `Accept-Language` ni por `navigator.language` (el bot de Google entra sin esa cabecera, y quien comparte `/` espera que el otro vea lo mismo). El botón de idioma es un enlace a la otra ruta y conserva la sección visible (`/en#proyectos`).

- [~] **I9. El bucle `requestAnimationFrame` del hero no para nunca** · → Rediseño
  - **Fuera de los criterios (2026-09-14):** el movimiento lo definen las skills de diseño y douglus.site, no la auditoría. El hero actual se reemplaza entero.
  - **Dónde:** `components/Hero.jsx:52-71`.
  - **Problema:**
    - Corre a 60fps siempre, aunque el hero no se vea.
    - Escribe `style.animation = "none"` en cada frame.
    - Tiene un caso especial para Python (`:61`).
    - Usa un corte en 768px, mientras el CSS lo hace en 900px.
    - Tiene un `backdrop-filter` inútil sobre fondo opaco (`globals.css:514`).
  - **Requisito:** los efectos de ratón solo escriben variables CSS y se pausan fuera del viewport.

- [~] **I10. Efectos costosos para la GPU** · → Rediseño
  - **Fuera de los criterios (2026-09-14):** el movimiento lo definen las skills de diseño y douglus.site, no la auditoría.
  - **Dónde:**
    - Orbes con `blur(80px)` animados sin fin (`globals.css:93-136`).
    - `will-change` permanente en unos 31 elementos (`:1519-1543`, `:1802`, más `RevealObserver.jsx:28`).
    - `filter: blur` animado (`:1798`, `:1063-1069`).
  - **Requisito:** animar solo `opacity` y `transform`, sin `will-change` fijo ni blur animado.

- [x] **I11. Font Awesome completo por CDN y Devicon con `@latest`** · Fase 2
  - **Dónde:** `app/layout.js:73-76`, `components/Hero.jsx:7` y `components/Skills.jsx:5` (constante duplicada).
  - **Problema:** la hoja de estilos bloquea el render y usa `font-display: block` para unos 23 iconos. Devicon hace 20 peticiones sin versión fija.
  - **Solución:** iconos SVG inline y los SVG de Devicon copiados a `public/icons/`.
  - **Hecho (Fase 2):** se quitó la hoja de Font Awesome. Los 23 iconos que se usaban están en `lib/icons.js` como SVG inline de Font Awesome Free 6.4.0 (la misma versión del CDN; licencia CC BY 4.0), con un export por icono para que el JS del cliente solo lleve los que usa. Se dibujan con `components/Icon.jsx`: 1em de alto, ancho según el viewBox, `vertical-align: -0.125em` y `fill: currentColor`, igual que el glifo. Son decorativos (`aria-hidden`), salvo los de plataforma, que llevan `<title>` (iOS, Android). Los nombres viejos pasaron a los de FA 6 (`map-marker-alt` → `location-dot`, `external-link-alt` → `up-right-from-square`, `mobile-alt` → `mobile-screen-button`, `tools` → `screwdriver-wrench`). El CSS que apuntaba a `i` o a `.fa-*` ahora apunta a `.icon` o a `.icon-*`; el icono de cada tarjeta de Skills va dentro de un `<span class="skill-card-icon">`, que es la caja de 1.4rem que antes era el `<i>`. En `.section-label` (inline-flex, que toma la línea base del icono) se compensó con márgenes la línea base del glifo y el `letter-spacing` que se le sumaba.
  - Los 26 SVG de Devicon están en `public/icons/devicon/`, fijados en la versión 2.17.0 (la que resolvía `@latest`, idénticos byte a byte). `DEVICON` apunta ahí y se quitó `unoptimized`: next/image sirve los `.svg` locales tal cual.
  - **Verificado:** el HTML ya no tiene ninguna referencia a cdnjs ni a jsDelivr. Solo cambian los `<i>`, que pasan a `<svg>`, y el `src` y el preload de Devicon. En el navegador se comparó posición y tamaño de los 467 elementos con la base (ES a 1024px y EN a 375px, oscuro): la diferencia máxima es de 0,27px en x, 0,09px en y y 0,15px de ancho (los `.btn` con icono miden 0,14px menos, porque ya no se suma el `letter-spacing` de 0,01em al glifo). El único cambio de más de medio píxel es el ancho propio de los iconos de `.section-label`, porque ahora el `letter-spacing` es un margen; el texto que sigue está en el mismo lugar. Antes del ajuste de `vertical-align`, cada etiqueta de sección quedaba 1,88px más arriba y toda la página se acortaba unos 9px.

- [ ] **I12. Los mockups de teléfono muestran capturas horizontales recortadas** · Fase 1 (contenido) **[nav]**
  - **Fase 3:** mientras no haya capturas verticales, TravelPic y DeporTurnos muestran su logo sobre el color de fondo de la imagen, y el resto, su nombre en grande (`media.type` en `PROJECTS`). Falta conseguir las capturas.
  - **Dónde:** `components/Projects.jsx:26-30`, `:97-101` y `globals.css:1200-1204`.
  - **Problema:** se leen "TravelPi" y "epor". En Juego iOS y Chatbot (`:157-163` y `:192-198`) solo se ve un borrón.
  - **Solución:** conseguir capturas verticales reales de cada app (es contenido; se necesita para el rediseño).
  - **Pendiente (Fase 1):** faltan las capturas verticales de TravelPic y DeporTurnos (las que se muestran en el teléfono), y opcionalmente del juego iOS, el chatbot, Vault, Bookit y ClubSystem, que hoy solo tienen fondo o degradado. Cuando lleguen: pasarlas a WebP de ~800px de alto con `sharp`, quitarles los metadatos con `scripts/strip-metadata.mjs` y actualizar `image`, `width`, `height` y `thumb` en `PROJECTS` (`lib/site.js`). Los `sizes` de `ProjectCard` suponen capturas horizontales 2:1; con capturas verticales bajan al ancho del teléfono (~90px y ~72px).

- [x] **I13. Recortes en anchos intermedios** · → Rediseño **[nav]**
  - **Hecho (Fase 3):** probado en 375, 768, 900, 1024 y 1440px, más 1024×640, 1024×680, 1024×720, 1024×768 y 1366×680: ningún elemento pasa del ancho de la ventana (salvo la pista, a propósito) y en horizontal ningún panel se desborda a lo alto. Arreglos que salieron de esas pruebas: la foto del hero en tablet se medía por el alto, el nombre podía cortarse entre letras y el umbral de alto del modo horizontal pasó a 42,5rem.
  - **Badges:** a 1024px, los badges Swift y C++ se salen (acaban en 1056 y 1064px; `globals.css:530-551`).
  - **Franja sin badges:** entre 769 y 900px no se ve ninguna de las dos versiones (`:1593` frente a `:1672`).
  - **Terminal:** se corta 62px (`:1044`, `:1879-1884`).
  - **Requisito:** probar el diseño nuevo en 375, 768, 900, 1024 y 1440px.

- [x] **I14. Toda la web es de cliente solo para poder traducir** · Fase 2
  - **Dónde:** `"use client"` en Experience, Education, Skills, Projects, Contact y Footer.
  - **Problema:** se envían los dos idiomas y todo el JSX al navegador, y el inglés no se indexa.
  - **Solución:** usar `app/[lang]` con `generateStaticParams`, el diccionario en el servidor, `generateMetadata` por idioma y `hreflang`. Solo quedan de cliente Dropdown, Terminal, Nav y los efectos.
  - **Hecho (Fase 2):** esquema elegido por Fermin: **`/` en español y `/en` en inglés, sin redirección**. Las páginas viven en `app/[lang]` (`generateStaticParams` con `es` y `en`, `dynamicParams = false`); `next.config` reescribe `/` a `/es` y redirige `/es` a `/` (308), sin middleware, así que las dos páginas son estáticas. `lib/i18n.js` tiene `LOCALES`, `homePath()` y `getT(lang)` (el diccionario solo se importa en el servidor). `generateMetadata` arma por idioma la descripción, el canonical (`/` o `/en`), `hreflang` (`es`, `en` y `x-default` → `/`), `og:locale` y `og:url`; el JSON-LD usa la descripción del idioma.
  - Hero, Experience, Education, Skills, Projects, ProjectCard, Contact y Footer pasaron a server components y reciben `t` por prop. Siguen de cliente Dropdown, Terminal (recibe las líneas), Nav (recibe los textos ya traducidos), `HeroParallax` (el efecto del hero, separado de Hero), PremiumCursor y RevealObserver. El botón de idioma pasó de `<button>` a `<a hreflang>`, con `font-family: Arial` para que se vea igual que antes (es la fuente que Chrome le daba al botón).
  - **Verificado:** el HTML de `/` y `/en` es igual al anterior (el de EN se comparó con un build de la base con el idioma inicial en inglés), salvo el `<head>` por idioma y el `<a>` del botón. En el navegador, posición, tamaño, fuente y color de los 467 elementos coinciden con la base en ES y EN, a 375px y 1024px. El diccionario ya no está en el JS del cliente y la página pasó de 118 kB a 109 kB de First Load JS. `/foo` y `/en/foo` dan 404 (el 404 traducido llega con I16).

- [x] **I15. UX de proyectos y CV** · Fase 1 (datos) y → Rediseño (presentación)
  - **Hecho (Fase 3):** un botón por destino (App Store, Google Play, Código, Visitar), sin dropdown; la placa de cada tarjeta lleva al destino principal; "Descargar CV" baja directo el PDF del idioma de la página (en el hero y en la franja inferior); Proyectos va justo después del hero.
  - **Problema:**
    - Las apps publicadas piden 2 clics a la tienda, a través de un dropdown (`Projects.jsx:61-85`, `:127-151`), y los mockups no enlazan a nada.
    - El CV es el botón menos visible y pide elegir idioma aunque ya se conoce (`Hero.jsx:127-142`).
    - Proyectos aparece después de Educación y Skills (`app/page.js:11-16`) y repite lo que ya cuenta Experiencia.
  - **Solución:** botones directos a las tiendas, mockup clicable, CV directo según el idioma de la interfaz y Proyectos justo después del hero.
  - **Datos hechos (Fase 1):** cada proyecto de `PROJECTS` (`lib/site.js`) declara sus enlaces por tipo (`appstore`, `playstore`, `repo` o `demo`) y sus plataformas, y los CV están en `CV` con su idioma. Todos los proyectos tienen al menos un enlace (antes el chatbot, la app de barberías y ClubSystem no tenían ninguno). Queda para el rediseño cómo se presentan: botones directos en vez del dropdown, mockup clicable, CV según el idioma y el orden de las secciones.

- [x] **I16. SEO e iconos** · Fase 2
  - **Problema:**
    - La imagen OG declara 1200×630, pero la foto mide 970×1238 (`app/layout.js:36-38`).
    - Faltan `apple-touch-icon`, `sitemap`, `robots` y `not-found`; el 404 es el de Next, en inglés **[nav]**.
  - **Solución:** `app/opengraph-image.jsx`, `apple-icon.png`, `sitemap.js`, `robots.js` y un `not-found.js` traducido.
  - **Hecho (Fase 2):**
    - **Open Graph:** `app/[lang]/opengraph-image.js` genera en el build una imagen de 1200×630 por idioma (`/es/opengraph-image` y `/en/opengraph-image`): cargo, nombre, una línea traducida (`meta.ogTagline`, con la cantidad de apps de `STATS`) y la foto. Usa Inter, bajando de Google Fonts solo los glifos que necesita; si el build no tiene red, usa la fuente de `next/og`. X usa la misma imagen. El `alt` es el `<title>`, igual en los dos idiomas, para que la imagen sea estática; `meta.ogAlt` quedó sin uso y se borró. La foto sigue en el JSON-LD.
      - **Fase 3:** la imagen pasó a la identidad nueva: papel, tinta y cobalto del tema claro (copiados de `styles/tokens.css`, porque next/og no lee variables de CSS), el nombre abajo a la izquierda en Archivo angosta y en mayúsculas, y la foto rectangular a la derecha, sin círculo ni sombra. Ya no baja fuentes: lee de `assets/fonts/` tres instancias estáticas de Archivo (OFL), porque Satori no aplica los ejes de una fuente variable (`assets/fonts/README.md`). Así el build ya no depende de la red, que es donde parecía estar el error pasajero de un build ("Cannot read properties of undefined (reading 'split')" al prerenderizar las dos imágenes; no se pudo reproducir). Verificado con dos builds seguidos en una copia aislada.
    - **apple-icon:** `public/apple-icon.png` es de 180×180 y opaco, generado con sharp a partir del favicon (cuadrado sin esquinas redondeadas, que iOS pone las suyas). Va en `ICONS` (`lib/site.js`) y no como archivo en `app/`, porque con `icons` en la metadata Next no suma el apple-icon de archivo.
    - **sitemap y robots:** `app/sitemap.js` lista `/` y `/en`, con sus alternativas hreflang, y `app/robots.js` permite todo y apunta al sitemap.
    - **404:** hay uno solo, bilingüe, para todas las URLs que no existen: `app/global-not-found.js` (con `experimental.globalNotFound`, porque no hay un layout raíz). Arma la página con `Document`, con el nav y el footer en español, y `components/NotFound.jsx` (server component) muestra el mensaje en español y en inglés, con un botón a cada home. El título es "Página no encontrada · Page not found — Fermin Lasarte" y Next agrega `noindex`.
    - **Por qué no un 404 por idioma (decidido por Fermin, opción 1):** se probó `app/[lang]/[...rest]/page.js` con `notFound()` y un `not-found.js` en `[lang]/` o en `[...rest]/`. Next 15.5 respondía 404, pero no lo renderizaba en el servidor: mandaba un documento de error (`<html id="__next_error__">`) que el navegador completaba después. Sin JS la página quedaba vacía y el script del tema no corría (se perdía el modo oscuro). Pasaba igual sin `globalNotFound`, sin `dynamicParams = false`, con un layout mínimo y con un `not-found.js` estático, así que es el comportamiento de Next con el root layout dentro de `[lang]`. Con Next 16.3 (N3) se volvió a probar y pasa lo mismo.
    - El `<html>`, el nav y el footer pasaron del layout a `components/Document.jsx`, para que el 404 global use la misma estructura. El HTML de la home no cambió.
  - **Verificado:** `/` y `/en` dan 200 y `/es` da 308 a `/`. `/no-existe`, `/en/no-existe`, `/es/no-existe`, `/foo/bar` y `/en/a/b` dan 404 con el 404 bilingüe, generado en el servidor (el HTML trae el contenido y el script del tema). El sitemap, robots, el apple-icon y las dos imágenes OG responden con el tipo correcto. En la home solo cambian las etiquetas de imagen OG y Twitter (ahora 1200×630 y por idioma) y se agrega el `apple-touch-icon`; el `<body>` es igual.

## 🟡 Menor

### Accesibilidad (→ Rediseño)

- [x] **M1.** No hay `<main>` ni enlace para saltar al contenido (`app/layout.js:84-92`).
  - **Hecho (Fase 3):** `<main id="contenido">` en `Document` y enlace "Saltar al contenido", primero en el orden de foco.
- [~] **M2.** El Dropdown no se cierra con Escape ni con `focusout`, y usa `aria-haspopup` sin `role="menu"` (`components/Dropdown.jsx:14-39`).
  - **Hecho (Fase 3):** ya no hay dropdowns: las tiendas y el CV son enlaces directos. `Dropdown.jsx` se borró.
- [x] **M3.** Nombres y estados accesibles en `Nav.jsx`:
  - **Hecho (Fase 3):** idioma con `aria-label` ("Cambiar idioma: English") y `hreflang`; GitHub y LinkedIn con `aria-label`; `aria-current="location"` en la sección visible (lo pone `TrackController`); tema con `aria-pressed`; los iconos decorativos van con `aria-hidden`.
  - El botón de idioma no tiene `aria-label`.
  - Los iconos sociales solo tienen `title`.
  - Falta `aria-current` en el enlace activo.
  - El botón de tema no tiene `aria-pressed`.
  - Los `<i>` de iconos no tienen `aria-hidden`.
- [x] **M4.** El nivel de cada skill solo se ve al hacer hover (`globals.css:927-966`), no con teclado ni en táctil.
  - **Hecho (Fase 3):** cada tecnología muestra su nivel en texto, debajo del nombre.
- [x] **M5.** Zonas táctiles pequeñas en móvil: sociales del footer de 15–18px y botones de 26px **[nav]**.
  - **Hecho (Fase 3):** botones, herramientas del nav y filas de contacto de 44px (`--tap`).
- [x] **M6.** La etiqueta de cada sección repite el texto del h2 (Projects `:14/16`, Skills `:76/78`, Education/Contact `:12/14`), y los lectores de pantalla lo leen dos veces.
  - **Hecho (Fase 3):** no hay etiquetas sobre los títulos: cada sección tiene solo su h2.

### Cursor personalizado (→ Rediseño: quitarlo o rehacerlo)

- [~] **M7.** Problemas en `globals.css:1825-1842` y `components/PremiumCursor.jsx`:
  - **Fuera de los criterios (2026-09-14):** si hay cursor personalizado lo decide el diseño (douglus.site tiene uno).
  - `cursor: none` se aplica antes de que exista el cursor personalizado.
  - Al cargar, aparece un punto en la posición (0,0) **[nav]**.
  - Sobre `.btn` y los enlaces se ven dos cursores.
  - Se mueve con `left`/`top` y registra un listener por cada enlace o botón.

### Código muerto y redundante

- [x] **M8.** En `app/globals.css`:
  - **Hecho (Fase 3):** el CSS anterior se reemplazó entero por `styles/*.css`, importados desde `globals.css`.
  - `:286`: `section > h2 i` no afecta a nada.
  - `:33`: la variable `--nav-h` no se usa.
  - Reglas repetidas en `:1596`, `:1622-1624`, `:1695`, `:1448-1449` y `:1655`.
  - `floatBadge` (`:1504`) nunca se ve.
- [x] **M9.** En el JS:
  - **Hecho (Fase 3):** se borraron Dropdown, Terminal, HeroParallax, BackgroundOrbs, PremiumCursor, RevealObserver, Experience, Education y Timeline, y los 16 iconos de `lib/icons.js` que ya no se usaban. La fuente es Archivo variable (sin pesos sueltos).
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
- [~] **M12.** Hay dos sistemas de animación de entrada (`animate-*` y `premium-reveal`) → Rediseño: dejar uno solo.
  - **Fuera de los criterios (2026-09-14):** el movimiento lo definen las skills de diseño y douglus.site, no la auditoría.
- [ ] **M13.** `app/*.js` usa `.js` y el resto de componentes `.jsx`. Los badges se numeran `--0,1,2,4,5` y se detecta Python por su clase (`Hero.jsx:61`).
  - **Fase 3:** los badges ya no existen. Queda la mezcla de `.js` en `app/` y `.jsx` en `components/`.

### Estilos (→ Rediseño: tokens desde el inicio)

- [x] **M14.**
  - **Hecho (Fase 3):** colores, esquinas, espacios, capas, fuentes, tamaños, curvas, duraciones y anchos de panel en `styles/tokens.css`. El único color fuera del tema es el de las placas de marca, que es un dato de `PROJECTS`.
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

- [x] **M16.**
  - **Hecho (Fase 3):** botón "Copiar email" con aviso por `aria-live`; sin botones deshabilitados; chatbot-ai enlaza al repo; nombre completo en el h1; en móvil los botones del hero entran en la primera pantalla (terminan en y=473 a 390×844).
  - Botón para copiar el email con feedback (`Contact.jsx:22-25`).
  - Quitar los botones deshabilitados "Próximamente" (`Projects.jsx:329`, `:378`).
  - AI Chatbot no tiene ningún enlace.
  - Poner el nombre completo en el h1 (`Hero.jsx:94-97`).
  - En móvil, los botones de acción quedan por debajo de la primera pantalla.

### Herramientas (Fase 2)

- [x] **M17.** `next lint` desaparece en Next 16: migrar con `npx @next/codemod next-lint-to-eslint-cli .`.
  - **Hecho (Fase 2):** el codemod cambió el script a `eslint .`, pero el `eslint.config.mjs` que generó no funcionaba (hacía spread de `eslint-config-next/core-web-vitals`, que en la 15 sigue siendo formato eslintrc). Se reescribió con `FlatCompat` (`@eslint/eslintrc` como devDependency), se agregó `files: ["**/*.{js,jsx,mjs,cjs}"]` (sin eso el CLI se salteaba todos los `.jsx`) y se ignoran `.next/`, `out/` y `build/`. Se borró `.eslintrc.json`. Comprobado con un `<img>` de prueba en un `.jsx` (salta `no-img-element`); el lint da 0 avisos y `next build` lo sigue usando. Con Next 16 (N3) se reemplazó por el import directo de `eslint-config-next/core-web-vitals`, que ya viene en formato plano.

---

## Criterios del rediseño (Fase 3)

El diseño visual y el movimiento salen de las skills `design-taste-frontend`, `impeccable` y `emil-design-eng`, y de [douglus.site](https://douglus.site) (navegación horizontal y animaciones). Estos criterios son solo buenas prácticas de programación que el código nuevo tiene que cumplir (decidido por Fermin el 2026-09-14):

1. **Sin desbordes tapados:** nada de `overflow-x: hidden` en `html` o `body` para esconder lo que se sale; un desborde que no es intencional se arregla donde nace. Probar en 375, 768, 900, 1024 y 1440px (C2, I13).
2. **Contenido visible sin JS:** el HTML trae todo el contenido y los enlaces; lo que agrega JS es una mejora progresiva (C5).
3. **Nav:** botón de menú explícito en móvil (`<button>` con `aria-expanded` y `aria-controls`, que cierra con Escape), anclas nativas y `aria-current` (I1, I2, M3).
4. **Tokens:** colores, radios, sombras y fuentes como tokens, sin hex sueltos (M14).
5. **Assets:** imágenes con `next/image`, iconos SVG y ningún CSS externo que bloquee el render (C3, I11).
6. **Proyectos:** enlaces directos a tiendas, repo o demo; capturas reales; los datos salen de un array (I12, I15, M11).
7. **Accesibilidad:** `<main>`, enlace para saltar al contenido, `:focus-visible` propio, contraste AA (4,5:1) en los dos temas, verificado, zonas táctiles de al menos 24px (mejor 44px) e información que no dependa del hover (I7, M1–M6).

## Hallazgos nuevos

_(Agregá aquí lo que aparezca durante las fases.)_

- [ ] **N4. La foto del hero se ve blanda en pantallas 2x** · Fase 3 (contenido)
  - **Dónde:** `public/assets/foto_perfil.webp` (560×715).
  - **Problema:** en horizontal la foto se dibuja a unos 550×740px, así que en una pantalla 2x haría falta una imagen de unos 1100×1480. La original se borró por el GPS (C1).
  - **Solución:** conseguir una foto de al menos 1200px de alto, sin metadatos (`scripts/strip-metadata.mjs`), y actualizar `width` y `height` en `Hero.jsx`.
  - **Fase 4:** desde que la foto se achicó (7.2), en horizontal se dibuja a 320×459. Con `cover` ocupa 360px de ancho, así que en 2x alcanzaría una de unos 720×920. La actual (560×715) sigue quedando corta.

- [ ] **N5. `npx eslint .` también revisa `.claude/worktrees/`** · Fase 4 (hallado en la Fase 3)
  - **Problema:** una sesión de Claude Code dejó un worktree en `.claude/worktrees/`, y como `eslint.config.mjs` no ignora esa carpeta, `npx eslint .` da 241 errores que no son del proyecto. `npx eslint app components lib` da 0.
  - **Solución:** sumar `.claude/**` a los `ignores` de `eslint.config.mjs` (y revisar si ese worktree todavía hace falta).
  - **Fase 4:** `npx eslint .` da 0 errores, pero solo porque la carpeta quedó vacía. `--print-config` muestra que todavía no se ignora. Sigue en R-M35.

- [~] **N6. El respaldo para Firefox no se probó en Firefox** · Fase 4
  - **Fase 4 (2026-09-15):** Fermin decidió dejar Firefox fuera de la re-auditoría. El código del respaldo se revisó leyéndolo: las cuentas coinciden con las del CSS, y en Chrome no corre.
  - **Dónde:** `components/TrackController.jsx` (`paint`): sin `animation-timeline`, escribe el `translate` de la pista, el progreso, la transición al cierre (`scale` del degradado) y la línea de Trayectoria (`--rail`). El muro de Habilidades queda en su estado final.
  - **Problema:** las cuentas replican las del CSS y se revisaron leyendo el código, pero nunca corrieron en un Firefox real.
  - **Solución:** probar en Firefox a 1440×900 y 1024×680: recorrido, anclas del nav, foco con teclado, degradado y línea.

- [x] **N7. Movimiento sin verse en un navegador visible; LCP con el preloader** · Fase 4
  - **Hecho (Fase 4):** se revisó en un Chrome visible y se corrió Lighthouse sobre el preview, con y sin preloader. Todo lo que se pudo capturar funciona como está documentado. El LCP sigue siendo la foto aunque el preloader la tape; lo que sube es el Speed Index. Los detalles están en "Re-auditoría (Fase 4)": las secciones "Movimiento en un navegador visible" y "Lighthouse".
  - **Problema:** durante la Fase 3 el panel del navegador de las pruebas estaba oculto, y ahí no avanzan ni las animaciones atadas al scroll ni las de CSS. Por eso el recorrido, el degradado, la línea de Trayectoria, el muro, la ola de la franja, el preloader, las entradas por elemento y Lenis se verificaron midiendo sus tramos calculados (`animation-range`), sus clases y sus retrasos, no mirándolos. Además, el preloader tapa unos 5 s la primera visita y puede cambiar qué elemento cuenta como LCP.
  - **Solución:** revisar todo en un navegador visible y correr Lighthouse (rendimiento, LCP, accesibilidad, SEO) sobre el deploy de preview, con y sin preloader (primera visita y siguientes de la sesión).

- [~] **N8. Contraste del nav y la franja con `difference`; texto en contorno** · Fase 4
  - **Medido (Fase 4):** sobre la transición al cierre, el contraste baja a entre 1,0 y 1,5:1 en claro y a 2,6:1 en oscuro, durante unos 1.800px de scroll; en el resto del recorrido da 4,5:1 o más. El texto en contorno se lee bien. Pasó a R-I3, y Fermin decidió dejarlo como está (2026-09-15).
  - **Problema:** en horizontal, el nav y la franja inferior son blancos con `mix-blend-mode: difference` (como douglus): sobre el papel y sobre el cierre se leen bien, pero al pasar sobre tonos medios (un botón violeta, el degradado) el inverso contrasta cerca de 2:1 por un momento. Aparte, hay texto en contorno (`-webkit-text-stroke`): el fin de los rangos de años y las tecnologías intermedias del muro. Es decorativo (`aria-hidden`, la información está en texto), pero conviene mirar que se lea.
  - **Solución:** medirlo en la Fase 4 y decidir con Fermin (por ejemplo, que el nav no pase sobre esos tonos o que el contorno sea más grueso).

- [x] **N1. La foto con GPS sigue en el historial de git** · Fase 0
  - **Hecho (2026-09-13):** se reescribió el historial con `git filter-repo --invert-paths` (sobre un clon nuevo) y se hizo force-push. Cambiaron todos los hashes, así que los que se citan en este archivo son de antes de la reescritura. Ningún commit contiene ya la foto y el árbol final no cambió.
  - **Dónde:** blob `ee01416`, como `assets/foto_perfil.jpeg` desde `fc441bf` (2026-02-15) y como `public/assets/foto_perfil.jpeg` en `5b87af2`. Aparece en 34 commits y el repo es público.
  - **Opciones:** reescribir el historial con `git filter-repo` y hacer force-push, o dejarlo como está. Ver la explicación de la Fase 0.

- [x] **N2. Los datos de `lib/site.js` viajan en el JS del cliente** · Fase 2 (hallado en I11)
  - **Hecho:** Nav ya no importa `lib/site.js`. `Document` le pasa `social` (`github`, `linkedin` y `email`) por props, igual que los textos. El HTML de ES y EN no cambió. En el JS del cliente ya no están `PROJECTS` ni los iconos de `SKILL_GROUPS`: el chunk del nav y la página bajó de 6,6 KB a 3,5 KB comprimido.
  - **Dónde:** `components/Nav.jsx` importa `PERSON` y `SOCIAL` de `lib/site.js`.
  - **Problema:** como `site.js` calcula `SKILLS`, `HERO_BADGES` y `STATS` con llamadas a funciones, el bundler no puede descartar el resto del módulo. El chunk del layout lleva `PROJECTS`, `SKILL_GROUPS` (con sus 5 iconos) y demás, aunque Nav solo use el email y dos URLs. Ya pasaba antes de la Fase 2.
  - **Solución:** que el layout le pase a Nav el email y las URLs por props (como ya hace con los textos), o separar `PERSON` y `SOCIAL` en un módulo aparte.

- [x] **N3. Pasar de Next 15.5 a Next 16** · Fase 2 (pedido por Fermin antes del rediseño)
  - **Hecho:** `next` 16.3.5, `react`/`react-dom` 19.3.0 y `eslint-config-next` 16.3.5. El build usa Turbopack (el valor por defecto en la 16). Se siguió la guía que viene en `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`; el código ya estaba listo para lo que rompe compatibilidad (`params` asincrónicos, también en `opengraph-image`; sin `next lint`; sin middleware, imágenes con query string ni `images.domains`).
  - `eslint.config.mjs` usa `eslint-config-next/core-web-vitals` directo (formato plano) y se quitó `@eslint/eslintrc`. La regla nueva `react-hooks/set-state-in-effect` marcaba `PremiumCursor`; ahora lee `(pointer: fine)` con `useSyncExternalStore`, con el mismo comportamiento (el cursor aparece al hidratar).
  - Se agregaron `AGENTS.md` y `CLAUDE.md`, que `next dev` crea solo y que apuntan a la documentación de la versión instalada.
  - `experimental.globalNotFound` sigue siendo necesario: en la 16 todavía está documentado como experimental. Un 404 por idioma tampoco se renderiza en el servidor en la 16 (ver I16).
  - **Verificado:** en el HTML solo cambian los nombres de los archivos generados, la clase de la fuente y los `srcset` (sin 16w, que ya no está entre los tamaños por defecto). En el navegador, posición, tamaño, color y fuente de los 516 elementos coinciden exactamente con Next 15, en ES y EN, a 1024px (claro) y 375px (oscuro). Las rutas, los 404, el sitemap, robots, el apple-icon y las imágenes OG responden igual.

---

# Re-auditoría (Fase 4)

- **Fecha:** 2026-09-15
- **Commit auditado:** `a9eeb81` (rama `fase-3-rediseno`, sin merge a `main`). Los números de línea se refieren a ese commit.
- **Sitio probado:** el deploy de preview de la rama, https://portfolio-fermin-lasarte-git-fase-3-rediseno-ferminlasarte.vercel.app. No pidió login. Manda `x-robots-tag: noindex`, que lo pone Vercel en los previews.
- **Método:**
  - **Código:** 5 subagentes, uno por categoría (incoherencias, eficiencia, código muerto, flujo y accesibilidad, y mejoras), con un build en una copia aislada. Cada hallazgo se volvió a verificar contra el código, con curl sobre el preview o en el navegador antes de anotarlo.
  - **Navegador:** scripts de Puppeteer con el Chrome instalado, fuera del repo:
    - **Matriz de 84 casos:** 375×812 y 768×1024 (táctiles), 900×900, 1024×680, 1024×768 y 1440×900, en claro y oscuro, sobre `/`, `/en`, `/trayectoria`, `/en/experience`, `/habilidades`, `/en/skills` y el 404. En cada caso se miraron los desbordes contra `clientWidth`, lo que se sale de su panel en horizontal, el texto que queda invisible y los errores de consola, y a 375 y 1440 se corrió axe-core.
    - **Interacción:** teclado (Tab y Shift+Tab, menú móvil), anclas, cambio de idioma, sin JS, reduce motion, colores forzados (emulados con CDP, en claro y oscuro) e impresión.
    - **N7, en una ventana de Chrome visible** (con perfil aparte). La extensión Claude in Chrome no estaba conectada y el panel del navegador de la app suele estar oculto, así que se usó una ventana real, donde las animaciones corren.
    - **N8:** el contraste medido cada 120px de scroll, a lo largo de toda la pista y en los dos temas.
  - **Lighthouse 13.4.1 sobre el preview,** en móvil y escritorio, en tres situaciones:
    - **A:** primera visita, con preloader y caché vacía.
    - **B:** sin preloader (la marca de `sessionStorage` puesta antes del script del tema) y con caché vacía.
    - **C:** la visita siguiente real, en la misma pestaña y con caché.
    - La home en ES y EN se corrió tres veces (se da la mediana) y las páginas propias, una.
  - **[nav]** marca lo que se confirmó en el navegador.
- **Fuera de la auditoría:** Firefox (N6), por decisión de Fermin del 2026-09-15.
- **Descartados:**
  - `/trayectoria` a 320px no desborda: el h1 termina en 313px.
  - Recargar después de scrollear no vuelve al `#hash`: Chrome restaura la posición.
  - "Ver el proyecto" desde `/trayectoria` deja la tarjeta en el borde izquierdo.
  - Tabulando hacia adelante, ningún foco queda debajo del nav ni de la franja una vez que terminan la entrada del panel y el scroll suave. Lo que se veía al principio era la animación de entrada (R-I4).
  - axe marca 39 fallos de contraste en el nav a 1440 en claro. Es un falso positivo: no entiende `difference` y calcula blanco sobre el papel. La medición real está en R-I3.
  - Una de las tres corridas de Lighthouse (escritorio, A, `/en`) marcó `color-contrast`. No se repitió; seguramente midió en medio de una animación.
  - **Cosas que se revisaron y están bien:** el respaldo de TrackController no corre en Chrome; las 10 copias de la media query horizontal son idénticas; ES y EN tienen las mismas 106 claves; todos los `target="_blank"` llevan `rel="noopener noreferrer"`; el `sizes` de la foto es correcto en los tres anchos, y la estela no vuelve a pedir la imagen.
- **Sin confirmar:** Safari, lectores de pantalla reales, pantallas táctiles y portátiles híbridos reales, el relleno y el imán de los botones (no quedaron en ninguna captura) y la ola del muro de Habilidades en un cuadro intermedio.

## Resumen

**Estado de los arreglos (2026-09-15):**
- **Importantes:** los 9 están cerrados, cada uno en su commit.
  - R-I1 (`03bbd6a`), R-I2 (`e9b12f0`) y R-I4 (`02b1ee3`);
  - R-I5 (`6ac71a9`), R-I6 (`bd6c925`) y R-I9 (`c893007`);
  - R-I8 (`df28bec`), R-I3 (`0d52325`, se deja como está) y R-I7 (`0601232`).
- **Menores:** todavía abiertos. Solo el detalle de "Backend" en `meta.description` de R-M34 quedó hecho, con R-I7.

No hay nada crítico. Los problemas más visibles son cuatro:
- **R-I1:** dos nombres de proyecto quedan cortados en su placa.
- **R-I2:** con el mouse, un clic en un botón cortado por el borde se pierde.
- **R-I3:** el nav y la franja se vuelven ilegibles sobre la transición al cierre (era N8).
- **R-I4:** al tabular, el foco cae en botones que todavía no se ven.

Lighthouse da 100 en accesibilidad y buenas prácticas en todas las páginas. En rendimiento da entre 93 y 100; el preloader es lo único que lo baja. Los 7 criterios se cumplen, con excepciones en el 1, el 4, el 6 y el 7 (la tabla está más abajo).

## 🟠 Importante

- [x] **R-I1. El nombre de Compilador y el de ClubSystem quedan cortados en su placa** **[nav]**
  - **Hecho:** la placa tipográfica es un contenedor (`container-type: inline-size`) y el nombre usa `min(clamp(2rem, 4.6vw, 4.5rem), 18cqi)`. El tamaño de antes queda donde ya entraba, con un tope del 18% del ancho útil de la placa. Se usa `vw` porque dentro de la placa el `cqi` ya es el de la placa. Se probó primero con una variable registrada con `@property`, pero el CSS que genera Turbopack no incluía la regla `@property`.
  - **Verificado** en 375, 768, 900, 1024×680, 1024×768, 1280, 1440, 1920 y 2560, en ES y EN, sobre el servidor local: los ocho nombres entran en una línea, con al menos 13px de margen. En vertical el tamaño no cambió (32, 35 y 41px); en horizontal pasó de 47 a 44px a 1024, de 66 a 48px a 1440 y de 72 a 55px a 1920.
  - **Dónde:** `styles/projects.css:82-89` (`.card__plate--type span { font-size: clamp(2rem, 4.6cqi, 4.5rem) }`) y `:61` (`overflow: clip` en `.card__plate`).
  - **Problema:** el tamaño de letra sale del ancho de la ventana (el `cqi` es el de `main` o `.h-sticky`), pero la tarjeta chica mide `--w-card: clamp(22rem, 28cqi, 28rem)`, que deja de crecer antes. Medido:
    - a 1440×900 la placa mide 317px: "COMPILADOR" mide 348px (se cortan 55px) y "CLUBSYSTEM", 342px (49px);
    - a 1920×1080 se cortan 51px y 43px;
    - en EN solo pasa con ClubSystem, porque "Compiler" entra;
    - a 1024px y en vertical entra todo.
  - Se lee "CLUBSYSTE". Es un desborde tapado (criterio 1), justo lo que la Fase 3 aprendió a evitar en la pista.
  - **Solución:** que la placa sea el contenedor (`container-type: inline-size` en `.card__plate--type`) y medir la letra contra ella, por ejemplo `clamp(2rem, 18cqi, 4.5rem)`. La palabra más larga mide unos 5,3em, así que eso deja margen. Probar los ocho nombres en los dos idiomas.

- [x] **R-I2. Con el mouse, un clic en un botón cortado por el borde derecho se pierde** **[nav]**
  - **Hecho:** `onFocus` sale si el foco no es `:focus-visible`, así que solo el teclado mueve la pista.
  - **Verificado** sobre el servidor local, a 1440×900. Con el mouse, en tres botones cortados a la mitad ("Visitar", "App Store" y "Código"), el scroll no se mueve en el `mousedown` y el clic llega al enlace. Con Tab, a 1440×900 y a 1024×680, las 21 paradas dentro de la pista quedan a la vista y la pista avanza. DISENO.md, 6.5.
  - **Dónde:** `components/TrackController.jsx:87-91` (`onFocus`).
  - **Problema:** en Chrome, los enlaces toman el foco en el `mousedown`. Si el botón está cortado por el borde derecho, el listener de `focusin` lo trae a la vista con un `scrollBy` sin animación: la pista salta, el `mouseup` cae en otro lado y el clic no llega al enlace. Medido a 1440×900 con el botón "Visitar" cortado a la mitad: en el `mousedown` el scroll pasó de 530 a 1.865 y el `click` fue a la sección `projects`, no al enlace.
  - **Solución:** atender solo el foco de teclado, con `if (!e.target.matches(":focus-visible")) return;` al principio de `onFocus`.

- [~] **R-I3. El nav y la franja se vuelven ilegibles sobre la transición al cierre (era N8)** **[nav]**
  - **Decidido por Fermin (2026-09-15): se deja como está**, como en douglus (opción c). La medición queda anotada en DISENO 7.1.
  - **Dónde:** `styles/nav.css:246-259` y `styles/track.css:111-132` (blanco con `mix-blend-mode: difference`). El tramo es `.bleed` (`styles/contact.css`).
  - **Problema:** se midió cada 120px de scroll, en 84 posiciones por tema, a 1440×900. Fuera del cierre, el texto del nav y de la franja da 4,5:1 o más en todo el recorrido. Mientras pasa la transición (de 7.800 a 9.600px de un recorrido de 10.038, unos 1.800px de scroll):
    - **En claro:**
      - los enlaces del nav bajan a entre 1,03 y 1,18:1;
      - las herramientas, a entre 1,06 y 1,43:1;
      - el nombre, a 1,13:1;
      - la franja, a entre 1,26 y 1,54:1.
      - No se leen: el blanco invertido sobre `--wash-2` da un verde oliva casi del mismo brillo que el fondo.
    - **En oscuro:** los enlaces bajan a 2,57:1 y el resto queda entre 4,0 y 4,2:1.
    - **Riel de la barra de progreso:** es blanco al 40% y en claro da 2,6:1 sobre el papel durante todo el recorrido, por debajo del 3:1 de 1.4.11. Es decorativo (`aria-hidden`).
    - **Anillo de foco del nav** (`--focus: var(--blend-ink)`, `nav.css:252`): pasa por el mismo `difference`.
    - **Por qué no lo ven las herramientas:** axe da falsos positivos y Lighthouse mide al cargar, con el nav sobre el papel.
  - **Solución:** decidir con Fermin. En 7.1 se aceptó que el contraste bajara "un momento" sobre tonos medios, pero lo medido es casi 1:1 durante unos 1.800px de scroll. Opciones:
    - (a) mientras el cierre está debajo del nav, pasarlo a `--on-night` sin `difference`, con una clase desde el `IntersectionObserver` que ya existe o con un tramo de `animation-range` sobre `--pan`;
    - (b) darle al nav un fondo en ese tramo;
    - (c) dejarlo como está.

- [x] **R-I4. Al tabular, el foco cae en botones que todavía no se ven** **[nav]**
  - **Hecho:** un `focusin` en la pista (en los dos modos) revela al instante el panel que está esperando o todavía entrando: lo pasa a `.is-revealed`, le agrega `.is-instant` y deja de observarlo. En `styles/motion.css`, `.is-revealed.is-instant .rv` pone `animation: none`. Como las entradas solo rellenan hacia atrás, en un panel que ya entró no cambia nada.
  - **Verificado** sobre el servidor local:
    - tabulando cada 60ms a 1440×900, a 1024×680 y a 900×900 (vertical), ninguna de las 32 paradas tiene el foco en algo con opacidad menor a 0,95 (antes eran 17 con opacidad 0);
    - un panel que entra por scroll se sigue animando;
    - con reduce motion no cambia nada;
    - las pruebas de R-I2 siguen pasando.
  - DISENO.md, sección 8.
  - **Dónde:** `components/TrackController.jsx:185-200` (paneles `.is-waiting`) y `styles/motion.css:45-87`.
  - **Problema:** al tabular hacia un panel que todavía no se reveló, el foco llega antes que la entrada. Cada elemento tarda hasta 720ms de retraso más 1,1 s de animación en aparecer. Tabulando rápido desde el hero, 17 elementos recibieron el foco con opacidad 0: los botones de las tarjetas, los de Trayectoria y Habilidades, y las píldoras del contacto. El anillo de foco rodea algo que no se ve (2.4.7).
  - **Solución:** en `onFocus`, si el foco entra a un panel `.is-waiting`, revelarlo sin animación. Es lo mismo que ya pide DISENO 8.7: lo que se hace con teclado es instantáneo.

- [x] **R-I5. `/en/skills` dice "Compilador" en español**
  - **Hecho:** SkillsPage usa `projectName(p)`, que pasa por `t(\`projects.${id}.name\`, name)`, igual que ProjectCard, en "Usada en" y en la cabecera de la tabla.
  - **Verificado** sobre el servidor local: `/en/skills` ya no tiene ningún "Compilador" y dice "Compiler" 4 veces; `/habilidades` sigue diciendo "Compilador".
  - **Dónde:** `components/SkillsPage.jsx:51` y `:73` (`p.name`).
  - **Problema:** usa el nombre de `PROJECTS` sin traducir, así que "Compilador" sale 4 veces en `/en/skills` (en la columna de la tabla y en "Used in"). Verificado en el HTML del preview. `ProjectCard` ya usa `t(\`projects.${id}.name\`, name)`.
  - **Solución:** usar lo mismo en SkillsPage, o un helper compartido.

- [x] **R-I6. Las páginas propias no tienen imagen de Open Graph ni de X**
  - **Hecho:** `app/[lang]/[page]/opengraph-image.js` genera una imagen por página y por idioma, con el nombre arriba, la descripción de la página y su título en grande. Tiene `dynamicParams = false`, y una ruta que no existe da 404.
  - El diseño pasó a `lib/og.js`, que comparten la home y las páginas propias; la imagen de la home no cambió (pesa los mismos bytes que en el preview). Los textos de cada página quedaron en `PAGE_TEXT` (`lib/i18n.js`), que usan la metadata y la imagen.
  - **Verificado:** en el servidor local, `/trayectoria`, `/habilidades`, `/en/experience` y `/en/skills` tienen `og:image` y `twitter:image` apuntando a su imagen (PNG de 1200×630). En un build aislado, las cuatro se prerenderizan (SSG).
  - **Queda para R-M21:** `/trayectoria/opengraph-image` (sin `/es`) sigue dando 500. Ninguna página la usa.
  - **Dónde:** `app/[lang]/[page]/page.js:40-55`.
  - **Problema:** `/trayectoria`, `/habilidades`, `/en/experience` y `/en/skills` no tienen `og:image` ni `twitter:image`, aunque declaran `summary_large_image` (verificado en el HTML del preview). El `openGraph` de la página reemplaza entero al del layout, porque la metadata se combina de forma superficial, y con eso se pierde la imagen de `opengraph-image.js`. Compartida en LinkedIn o WhatsApp, la tarjeta sale sin imagen.
  - **Solución:** crear `app/[lang]/[page]/opengraph-image.js` con el título de la página. Como mínimo, sumar la imagen de la home a `openGraph.images` y `twitter.images`.

- [x] **R-I7. "2 apps publicadas en App Store y Google Play" no se sostiene mientras TravelPic esté fuera de las tiendas**
  - **Hecho (decidido por Fermin, 2026-09-15: "que tenga coherencia"):** la descripción de la página (que también va en el JSON-LD) y la línea de la imagen OG dicen ahora "{apps} apps en producción" / "{apps} apps in production", lo mismo que las cifras de Proyectos y el estado de las tarjetas. En la misma frase, "Backend" pasó a minúscula, como en la línea de la imagen OG (parte de R-M34).
  - **Qué no cambió:** el hero ("publicación en App Store y Google Play") describe lo que hace Fermin, y la experiencia en TravelPic ("disponibilidad en tiendas") cuenta cuando la app estaba publicada; las dos cosas siguen siendo ciertas.
  - **Verificado** sobre el servidor local: la `<meta name="description">` y el JSON-LD de `/` y `/en` ya no dicen "publicadas" ni "published", y la imagen OG se regeneró con la línea nueva.
  - **Dónde:** `lib/translations.js:7` y `:151` (`meta.description`), `:143` y `:287` (`meta.ogTagline`), y `lib/site.js:159-163`.
  - **Problema:** la descripción, la imagen OG y el JSON-LD dicen que las dos apps están publicadas, pero el propio `site.js` dice que TravelPic "se está volviendo a publicar" (I4). Quien la busque en las tiendas no la va a encontrar.
  - **Solución:** que decida Fermin. Se puede cambiar la copia a "apps en producción" o "apps lanzadas", o contar solo las que tienen enlace a una tienda (hoy daría 1).

- [x] **R-I8. Con colores forzados se pierde información** **[nav]**
  - **Hecho:** `styles/forced-colors.css`, dentro de `@media (forced-colors: active)`:
    - el nav y la franja en horizontal van con `mix-blend-mode: normal` y fondo `Canvas`;
    - el muro, su leyenda y los años en contorno (en la home y en `/trayectoria`) usan `forced-color-adjust: none`, con relleno transparente y contorno `CanvasText`; lo lleno va en `CanvasText`, y la ola del muro queda quieta;
    - la línea de Trayectoria, sus puntos y los puntos de la tabla se dibujan con `CanvasText`, `GrayText` y `Canvas`.
  - **Verificado** con la emulación de CDP a 1440×900, en claro y oscuro:
    - el nav y la franja se leen (texto del sistema sobre `Canvas`) y el botón de tema vuelve a verse;
    - el muro distingue avanzado de intermedio y la leyenda también;
    - Trayectoria tiene su línea y sus puntos, y la tabla de `/habilidades`, los suyos;
    - sin colores forzados no cambió nada (sigue `difference` y la ola del muro).
  - **Queda:** el riel de la barra de progreso, que es decorativo, no se ve en colores forzados; el nombre de la sección se lee al lado. DISENO.md, 9.7.
  - **Dónde:** no hay ningún `@media (forced-colors: active)` en `styles/`. Afecta a `styles/page.css:201-219` (los puntos de la tabla), `nav.css:246-259` y `track.css:111-132`.
  - **Problema:** con la emulación de CDP:
    - **La tabla "Dónde las usé" queda vacía:** los puntos son `background` y el "Sí"/"No" es `sr-only`.
    - **Con el tema claro, el nav y la franja siguen con `difference`:** el texto sale amarillo sobre una placa negra, GitHub y LinkedIn salen en amarillo claro sobre blanco y el botón de tema desaparece. Con el tema oscuro se leen bien.
    - **La línea de Trayectoria y el contorno del muro se pierden.** Lo segundo borra el nivel de las tecnologías en la home (R-M4).
  - **Solución:** con `forced-colors: active`, sacar el `mix-blend-mode` del nav y la franja y darles fondo `Canvas`. Los puntos de la tabla, con `forced-color-adjust: none` y `CanvasText`, o como un glifo "●" en texto.

- [x] **R-I9. Al imprimir en apaisado sale solo el hero y después páginas en blanco** **[nav]**
  - **Hecho:**
    - Las 10 copias de la media query del modo horizontal (9 CSS y `lib/track.js`) piden `screen`, igual que las entradas animadas (`motion.css`) y la ola del muro en vertical (`skills.css`).
    - El tema oscuro es solo de pantalla (`@media screen` en `tokens.css`).
    - `styles/print.css`:
      - esconde el nav, el menú, la franja, el cursor, el preloader, el enlace de salto, `.bleed`, la estela de la foto y "Copiar email";
      - deja la foto en su lugar;
      - le da al cierre la paleta clara;
      - pone el botón principal sin fondo;
      - imprime los rellenos que dicen algo (los puntos de la tabla y la leyenda del muro), con `print-color-adjust: exact`;
      - evita que un título quede solo al pie de una hoja o que se parta una tarjeta.
  - **Verificado** con PDF en A4 sobre el servidor local:
    - La home sale vertical: 14 páginas en apaisado y 9 en vertical.
    - `/trayectoria` sale en 3 páginas y `/habilidades` en 4.
    - Siempre en el tema claro, aunque la página esté en oscuro. El cierre, el muro (en su estado final) y la tabla con sus puntos se leen.
    - Ningún texto queda con opacidad baja.
    - En pantalla no cambió nada: a 1440 sigue el modo horizontal, y el tema oscuro y el modo vertical en 375 siguen igual.
  - DISENO.md, 6.2.
  - **Dónde:** las 10 copias de la media query del modo horizontal (`styles/track.css:46` y las demás) no piden `screen`. `styles/motion.css` (`.is-waiting`) tampoco. No hay ningún `@media print`.
  - **Problema:** en A4 apaisado (1123×794) se cumplen las condiciones del modo horizontal. El PDF sale con el hero en la primera página y 10 páginas en blanco, con el nav, la franja y el enlace de salto repetidos en cada una. En vertical, los paneles que todavía no se vieron se imprimirían con `opacity: 0`. DISENO 6.2 dice que la impresión es vertical.
  - **Solución:** agregar `screen and` en las 10 copias de la media query y en la regla de `.is-waiting`, y un `@media print` que esconda el nav, la franja, el cursor, el preloader, el enlace de salto y `.bleed`.

## 🟡 Menor

### Accesibilidad y flujo

- [x] **R-M1. La tabla de `/habilidades` no tiene nombre y su caja con scroll no se puede enfocar** **[nav]**
  - **Hecho:** `.matrix-scroll` lleva `tabIndex={0}`, `role="region"` y `aria-labelledby="donde-t"`, y la tabla, `aria-labelledby="donde-t"`. La sección de "Dónde las usé" dejó de tener `aria-labelledby`: si no, había dos regiones con el mismo nombre y axe marcaba `landmark-unique`. El `<h2>` sigue encabezando el bloque.
  - **Verificado** sobre el servidor local, en `/habilidades` a 375 (claro) y 768 (oscuro), `/en/skills` a 375 (oscuro) y `/habilidades` a 1440: con Tab se llega a la caja, se ve el anillo de 2px en `--focus` y las flechas la desplazan (de 0 a 120px a 375). El árbol de accesibilidad da "región: Dónde las usé" / "Where I used them", y axe da 0 fallos en los cuatro casos. A 1440 la tabla entra y la caja sigue siendo una parada de Tab, sin nada que desplazar. DISENO.md, 7.12.
  - **Dónde:** `components/SkillsPage.jsx:66-97` y `styles/page.css:171-174`.
  - **Problema:** `.matrix-scroll` se desplaza a lo ancho: a 375px mide 343px con una tabla de 757px, y también se desplaza a 768 y a 1024 en vertical. Pero no tiene nada enfocable, y axe lo marca como serio (`scrollable-region-focusable`). Además, la tabla no tiene `<caption>` ni `aria-labelledby`.
  - **Solución:** poner `tabindex="0" role="region" aria-labelledby="donde-t"` en la caja, y `aria-labelledby="donde-t"` (o un `<caption>` con `sr-only`) en la tabla.

- [x] **R-M2. En vertical, Shift+Tab puede dejar el foco debajo del nav (2.4.11)** **[nav]**
  - **Hecho:** `html { scroll-padding-block-start: var(--nav-h) }` en `styles/base.css`, y se sacó el `scroll-margin-top` de `.panel`. En horizontal vale 0 (`html.js:has(.h-scroll)`, en la media query de `track.css`): con el margen, al enfocar algo a menos de 64px del borde de arriba, Chrome correría el documento y con él la pista. Las páginas propias no tienen pista y lo conservan en todos los anchos.
  - **Verificado** sobre el servidor local, recorriendo la página entera con Tab y con Shift+Tab (con reduce motion, para que el scroll sea inmediato):
    - Antes: en la home a 390×844, "Código" quedaba 39px debajo del nav; a 900×900, "Código" y "Visitar" quedaban 46px. En `/habilidades` a 390, la caja de la tabla (R-M1, más alta que la pantalla) quedaba 64px.
    - Después: 0 focos tapados en `/` a 390 y 900, `/en` a 768, y `/trayectoria` y `/habilidades` a 390, en los dos sentidos.
    - En horizontal (1440×900), el `scrollY` de las 45 paradas de Tab es idéntico al de antes.
    - Las anclas del nav siguen dejando el panel a 64px del borde, a 390 y a 900.
  - DISENO.md, 6.3.
  - **Dónde:** `styles/nav.css:7-18` (el nav es `sticky`) y `styles/track.css:31-34` (solo `.panel` tiene `scroll-margin-top`).
  - **Problema:** en la home a 390×844, con Shift+Tab, el botón "Código" quedó con 39 de sus 57px debajo del nav. En `/trayectoria` y `/habilidades` a 1280×800 no se reprodujo.
  - **Solución:** `html { scroll-padding-block-start: var(--nav-h) }` y sacar el `scroll-margin-top` de `.panel`.

- [x] **R-M3. El preloader tapa el enlace de salto, no se puede saltear y se gasta en otras páginas** **[nav]**
  - **Hecho (decidido por Fermin, 2026-09-15):**
    - `--z-skip` pasó a 36, arriba de `--z-preloader` (35).
    - El script del tema pone `html.pl` como antes, pero guarda la marca de la sesión recién en el `DOMContentLoaded`, y solo si el documento tiene `.preloader`. Si no la tiene, saca `pl`. No depende de las rutas.
    - La primera tecla, `pointerdown` o `wheel` (listeners en captura, pasivos) le pone `html.pl-skip`: el velo se desvanece en 250ms (`@keyframes pl-skip`) y a los 250ms se saca `pl`. El nombre del hero vuelve a entrar con `rise-skip`, una copia de `rise` con otro nombre, porque si solo cambiara el retraso las letras aparecerían de golpe. A los 4,8 s se sacan los listeners: el velo ya se está yendo solo.
    - El fundido del salteo tiene su propio `@keyframes`. Con el mismo `pl-exit`, el navegador solo le cambiaba la duración y el velo desaparecía de golpe (se vio en la primera prueba).
  - **Verificado** sobre el servidor local, con Chrome sin sesión, a 1440×900:
    - Con el velo, el enlace de salto queda arriba (`elementFromPoint` da el enlace).
    - Con Tab, clic y rueda a los 1,5 s: a los 120ms el velo tiene opacidad de entre 0,28 y 0,35, a los 420ms `pl` ya no está, y el nombre del hero entra (a los 1,6 s, `translate` 0). Con Tab, el foco queda en el enlace de salto.
    - Sin tocar nada, a los 6 s una tecla no cambia nada y a los 8,5 s `pl` ya no está, como antes.
    - Entrando primero por `/trayectoria`, `/en/skills` o una ruta que no existe, no se guarda la marca, y después `/` muestra el preloader y `/en` ya no.
    - Con reduce motion no hay preloader.
  - DISENO.md, secciones 4, 7.11 y 8.
  - **Dónde:** `styles/tokens.css:81-82`, `styles/preloader.css:20-30` y `lib/theme.js:14-17`.
  - **Problema:**
    - El enlace de salto (`--z-skip: 30`) queda debajo del velo (`--z-preloader: 35`), así que con Tab se enfoca algo que no se ve.
    - No hay forma de saltear los 5,35 s.
    - La marca de `sessionStorage` se pone en cualquier página. Si la primera visita entra por `/trayectoria` o por el 404, la home ya no muestra el preloader, y DISENO 7.11 dice "primera visita de la sesión".
  - **Solución:** `--z-skip` por encima del preloader; sacar `html.pl` con el primer `keydown`, `pointerdown` o `wheel`, con un fundido corto; y poner la marca solo si la página tiene `.preloader`.

- [x] **R-M4. El muro de la home no dice el nivel en texto** **[nav]**
  - **Hecho (decidido por Fermin, 2026-09-15: solo para los lectores de pantalla):** en la lista de texto de abajo del muro, cada tecnología lleva su nivel en un `sr-only` (" (avanzado)" / " (advanced)"). En pantalla la lista se ve igual; el nivel lo sigue mostrando el muro, y en colores forzados ya se distingue desde R-I8.
  - **Verificado** sobre el servidor local:
    - En el árbol de accesibilidad, en `/` y `/en` a 1440 y a 375, dice "Swift (avanzado), SwiftUI (avanzado), Objective-C (intermedio)…".
    - Con y sin los `sr-only`, los tres párrafos miden lo mismo y parten en los mismos lugares (1440, 768 y 375). Comparando píxel a píxel: a 375, 0 píxeles distintos. A 768 y 1440 cambian algunos subpíxeles en las letras, porque el `span` corta la tira de texto; a simple vista no se nota.
    - Sin desbordes. axe da 0 fallos a 375; a 1440 solo marca el `color-contrast` del nav, que es el falso positivo ya descartado (`difference`).
  - DISENO.md, 7.7.
  - **Dónde:** `components/Skills.jsx:44-72`.
  - **Problema:** el muro es `aria-hidden` y la lista en texto de abajo tiene los nombres pero no el nivel, aunque DISENO 7.7 dice que es "la misma información". En colores forzados, las intermedias además se ven llenas y la leyenda no distingue nada. El detalle está en `/habilidades`.
  - **Solución:** sumar el nivel a la lista (visible o `sr-only`), o corregir DISENO.

- [x] **R-M5. La ola de la franja se repite sin fin y el teclado no la corta** **[nav]**
  - **Hecho (decidido por Fermin, 2026-09-15: lo que propone la auditoría):** en `WaveText`, la ola pasa dos veces como máximo por cada vez que la página queda quieta. `pointermove`, `scroll`, `keydown` y `focusin` vuelven a empezar la espera y ponen la cuenta en cero. Solo corre si se cumple la media query horizontal (`HORIZONTAL_QUERY`, con listener de `change`). El timer de la ola y el de su final son dos timers separados, así una actividad a mitad de la ola ya no deja puesta la clase `is-waving`.
  - **Verificado** sobre el servidor local, contando con un `MutationObserver` cada vez que se pone `is-waving`:
    - a 1440×900, con la página quieta 22 s, hay olas a los 4,5 s y a los 11,2 s, y después ninguna más;
    - con dos teclas (a los 0 y a los 3 s), vuelven dos olas, a los 5 s de la última tecla y a los 11,8 s;
    - un cambio de foco a los 3 s reinicia la espera: no hay olas antes de los 6,5 s;
    - a 375 (táctil, vertical) y con reduce motion no hay olas en 12 s.
  - DISENO.md, 7.1 y 8.
  - **Dónde:** `components/WaveText.jsx:23-45`.
  - **Problema:** se repite cada 5 s mientras no se mueva el mouse ni se scrollee. Quien navega con teclado la ve siempre (2.2.2), y choca con "nada se mueve en loop" (DISENO 8.2). También corre en móvil, donde la franja está oculta.
  - **Solución:** reiniciar la espera también con `keydown` y `focusin`, limitarla a una o dos repeticiones y activarla solo en horizontal.

- [ ] **R-M6. El tachado se anima igual con reduce motion**
  - **Dónde:** `styles/base.css:279-290`: la `transition` de `.strike::after` está fuera de `no-preference`.
  - **Solución:** moverla dentro de `@media (prefers-reduced-motion: no-preference)`, como dice la tabla de DISENO 8.

- [ ] **R-M7. Sin JS hay controles que no hacen nada** **[nav]**
  - **Dónde:** `components/ThemeToggle.jsx:22-33` y `styles/hero.css:137-141`.
  - **Problema:**
    - Sin JS, el botón de tema se ve y se puede enfocar, pero no hace nada.
    - La foto muestra `cursor: grab` y tiene `touch-action: none`. Con eso, en un portátil táctil tocar la foto no scrollea (sospecha).
  - **Solución:** `html:not(.js) .theme-toggle { display: none }` y poner el `cursor` y el `touch-action` de `.drag` bajo `html.js` y con puntero fino.

- [ ] **R-M8. El botón de idioma: su nombre no incluye "EN" y desde una tarjeta vuelve a la entrada de Proyectos** **[nav]**
  - **Dónde:** `components/Nav.jsx:40-44` y `:120-128`.
  - **Problema:**
    - El texto visible es "EN" y el nombre accesible es "Cambiar idioma: English" (2.5.3).
    - Desde la tarjeta de Vault, el cambio lleva a `/en#proyectos` y la tarjeta queda a 2.794px, porque las 8 tarjetas tienen `data-section="proyectos"`.
  - **Solución:** que el nombre empiece con lo visible ("EN, English") y que el enlace guarde el `id` del panel visible, no el de la sección.

- [ ] **R-M9. Con el menú móvil abierto, el Tab sale del menú** **[nav]**
  - **Dónde:** `components/Nav.jsx:47-66` y `:131-143`.
  - **Problema:**
    - Después de LinkedIn, el foco pasa al enlace de salto, que lleva a un `main` inerte, y después al nombre y a "EN", que quedan detrás del menú.
    - El nombre del botón cambia de "Menú" a "Cerrar" al mismo tiempo que `aria-expanded`, así que se anuncia de más ("Cerrar, expandido").
  - **Solución:** poner `inert` también en el enlace de salto y en lo que queda del nav detrás del panel, o atrapar el foco. Dejar el nombre accesible fijo en "Menú" y el cambio de palabra solo como algo visual.

- [ ] **R-M10. Enlaces con el mismo nombre y pestañas nuevas sin aviso**
  - **Dónde:** `components/ProjectCard.jsx:86-97` (en la home hay 5 "Código" y 3 "Visitar"), `components/ExperiencePage.jsx:68-72` y los `target="_blank"` (25 de los 43 enlaces de la home).
  - **Solución:** agregar un `sr-only` con el proyecto ("Código de Vault") y otro con "(abre en una pestaña nueva)".

- [ ] **R-M11. "Buscar en la página" no llega a los paneles de la derecha**
  - **Dónde:** `styles/track.css:55-60` y lo que dicen DISENO 6.1 y 7.10.
  - **Problema:** en horizontal, el navegador no puede traer una coincidencia que está en un panel de la derecha, porque el documento no tiene scroll horizontal. Con el modo exploración de los lectores de pantalla y con los enlaces `#:~:text=` pasa lo mismo.
  - **Solución:** documentarlo como limitación y corregir DISENO. Como mitigación parcial, un listener de `selectionchange` que traiga la selección a la vista.

- [ ] **R-M12. Lenis y las anclas se comportan distinto según la página**
  - **Dónde:** `components/SmoothScroll.jsx:18-22` y `components/TrackController.jsx:72`.
  - **Problema:**
    - En `/trayectoria` y `/habilidades`, Lenis también toma el gesto de costado del trackpad (`gestureOrientation: "both"` depende solo de la media query), aunque ahí no hay pista.
    - En vertical con puntero fino, las anclas no pasan por Lenis, cuando DISENO 7.10 dice que sí.
  - **Solución:** que el gesto de costado dependa de que haya `.h-scroll`, y que `goTo` use `smoothScrollTo` también en vertical (o corregir el documento).

- [ ] **R-M13. El cargo en inglés no lleva `lang="en"` en la página en español** (sospecha)
  - **Dónde:** `components/Hero.jsx:26`.
  - **Problema:** "iOS & Cross-Platform Mobile Engineer" se lee con fonética española (3.1.2). Es discutible, porque puede entrar en la excepción de términos técnicos.
  - **Solución:** usar `<strong lang="en">`.

### Eficiencia

- [ ] **R-M14. La fuente es lo más pesado de la página** (el ahorro es una sospecha)
  - **Dónde:** `components/Document.jsx:14-19`.
  - **Problema:** el archivo latin precargado pesa 90 KB, seis veces el JS propio de la home. Se piden `wght` de 100 a 900 y `wdth` de 62 a 125, pero se usan pesos de 400 a 800 y anchos de 68%, 75% y 100%.
  - **Solución:** `weight: "400 800"` en `Archivo()`, o una instancia local recortada con `fonttools varLib.instancer`.

- [ ] **R-M15. next/image manda JS de cliente que no aporta nada**
  - **Dónde:** `components/Hero.jsx:55-64`, `ProjectCard.jsx:39-45` y `SkillsPage.jsx:39-43`.
  - **Problema:** son 5,6 KB gz, casi un tercio del JS propio de la home. `/trayectoria` también los baja, aunque no tiene imágenes. No se usa `placeholder` ni `onLoad`.
  - **Solución:** usar `getImageProps()` en los server components y un `<img>` común, y confirmar que se mantenga el preload de la foto.

- [ ] **R-M16. Trabajo que corre de más: Lenis, Magnet y WaveText**
  - **Dónde:** `components/SmoothScroll.jsx:26`, `components/Magnet.jsx:93-117` y `components/WaveText.jsx:23-40`.
  - **Problema:**
    - Con `autoRaf: true`, el `requestAnimationFrame` de Lenis corre en cada frame aunque la página esté quieta.
    - Lenis (5,4 KB gz) se descarga también en táctil, donde no se usa.
    - Magnet mide las 7 píldoras del cierre en cada `pointermove`, en toda la home.
    - WaveText corre en móvil (R-M5).
  - **Solución:**
    - Un rAF propio que arranque con la rueda y pare cuando Lenis se detiene.
    - `import("lenis")` solo con puntero fino.
    - Un `IntersectionObserver` que active Magnet solo cuando se ve el contacto.

- [ ] **R-M17. El muro de Habilidades anima el color en el hilo principal** (sospecha)
  - **Dónde:** `styles/skills.css:114-155`.
  - **Problema:** son 27 animaciones de `color` y `-webkit-text-stroke-color`, que no pasan por el compositor, sobre texto de unos 80px mientras dura su tramo.
  - **Solución:** si una traza lo confirma, usar dos capas por palabra y animar solo la `opacity` de la capa llena.

- [ ] **R-M18. El icono de GitHub se repite 12 veces en el HTML de la home**
  - **Dónde:** `components/Icon.jsx`, `ProjectCard.jsx:10` y `:92`, y `Nav.jsx:79-88`.
  - **Problema:** son 1,6 KB de los 17,4 KB gz del HTML.
  - **Solución:** un `<symbol>` en `Document` y `<use href>` en `Icon`.

- [ ] **R-M19. Lo de `public/` se revalida en cada visita**
  - **Dónde:** `next.config.mjs` (no tiene `headers()`).
  - **Problema:** los SVG de Devicon y los CV salen con `max-age=0`. Se midió en `next start`; en Vercel no se verificó.
  - **Solución:** `immutable` para `/icons/:path*` y un `max-age` con `stale-while-revalidate` para `/assets/:path*`.

- [ ] **R-M20. La fuente mueve el layout en `/trayectoria`**
  - **Dónde:** Lighthouse, escritorio, primera visita: CLS de 0,028 en `ol.chapters`, causado por "Web font loaded".
  - **Solución:** revisar el ajuste de métricas de la fuente de respaldo con `wdth` angosto, o reservar el alto de los años.

### SEO, robustez y seguridad

- [ ] **R-M21. Cualquier `/<algo>/opengraph-image` da 500, y no hay `global-error.js`**
  - **Dónde:** `app/[lang]/opengraph-image.js:16-18` y `lib/i18n.js:28-31`.
  - **Problema:** `/xx/opengraph-image` y `/habilidades/opengraph-image` responden 500 (verificado con curl) con la página de error de Next en inglés, porque `getT("xx")` rompe. Tampoco hay un `app/global-error.js` para los errores de cliente.
  - **Solución:** que `getT` caiga en el idioma por defecto (o que la ruta llame a `notFound()`), y crear un `global-error.js` bilingüe, como el 404.

- [ ] **R-M22. No hay cabeceras de seguridad, salvo HSTS**
  - **Solución:** un `headers()` con `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` y una CSP mínima: `frame-ancestors 'none'; base-uri 'self'; object-src 'none'`. Una CSP completa choca con los scripts inline de Next y del tema.

- [ ] **R-M23. `SITE_URL` es frágil**
  - **Dónde:** `lib/site.js:7-11`.
  - **Problema:**
    - Con `NEXT_PUBLIC_SITE_URL=""`, el build se rompe.
    - Con una barra final salen URLs con `//`.
    - Un build de producción fuera de Vercel publica `localhost` sin avisar.
  - **Solución:** usar `||` en lugar de `??`, quitar la barra final y avisar cuando el resultado sea localhost.

- [ ] **R-M24. Sitemap: `lastModified` sale del build y falta `x-default`**
  - **Dónde:** `app/sitemap.js:7-22`.
  - **Solución:** poner una fecha por página en los datos (o no poner ninguna) y sumar `x-default` como en el `<head>`.

- [ ] **R-M25. El JSON-LD es solo `Person`, igual en todas las páginas, y la descripción en inglés es larga**
  - **Dónde:** `app/[lang]/layout.js:66-85` y `lib/translations.js:7` y `:151`.
  - **Problema:**
    - Faltan `ProfilePage` y `WebSite`, y `BreadcrumbList` en las páginas propias.
    - A `Person` le faltan `alumniOf`, `homeLocation` y `knowsLanguage`.
    - La descripción en EN mide 177 caracteres y se corta en los buscadores.
  - **Solución:** agregar esos tipos y campos, y dejar las descripciones en unos 155 caracteres.

- [ ] **R-M26. `/favicon.ico` da 404 y devuelve la página entera del 404 (18,7 KB)**
  - **Solución:** agregar un `public/favicon.ico` de 32×32.

- [ ] **R-M27. Detalles de robustez**
  - **Años:** el © y el "en curso" quedan con el año del build (`Strip.jsx:12`, `Footer.jsx:9`, `Preloader.jsx:43` y `ExperiencePage.jsx:14`).
  - **Tema:** si no hay tema guardado, la página no sigue al sistema cuando cambia con la página abierta (`lib/theme.js`).
  - **Imagen OG:** pesa 394 KB, y WhatsApp podría no mostrarla si pasa de unos 300 KB (sospecha: probarlo compartiendo el enlace).

### Código muerto y coherencia

- [ ] **R-M28. Tokens sin uso y restos de diseños anteriores**
  - **Dónde:**
    - Tokens: `styles/tokens.css:16` y `:117` (`--on-accent-muted`), `:52` (`--fs-mega`), `:57` (`--radius-0`), `:59` (`--radius-device`, reservado para I12) y `:77` (`--z-track`).
    - Restos del CV en la franja: `styles/track.css:118` (`--focus`) y `:134-136` (`.strip a`).
    - `styles/nav.css:250`: el `--line` del nav, que en horizontal no pinta nada.
    - `styles/contact.css:67`: `--cursor-ink`, sin efecto; el cursor cambia con `data-tone`.
  - **Solución:** borrarlos y dejar `--radius-device` con un comentario.

- [ ] **R-M29. Datos, claves y props sin uso**
  - **Dónde y problema:**
    - `projects.screenshotAlt` (`translations.js:93` y `:237`);
    - `PERSON.firstName` y `PERSON.location` (`site.js:15-16`); "Buenos Aires" está escrito a mano en `strip.credit`;
    - `CV[].label` y `EXPERIENCE[].label` (`site.js:55-56` y `:237-238`);
    - el prop `title` de `Icon`, que viaja en el JS del cliente;
    - `.strip` en el `inert` del menú (`Nav.jsx:50`), cuando ya está dentro de `main`;
    - `reactStrictMode: true`, que ya es el valor por defecto;
    - el `notFound()` inalcanzable en `app/[lang]/[page]/page.js:62`.
  - **Solución:** borrarlos, o usar `PERSON.location` en el crédito.

- [ ] **R-M30. Lógica y CSS duplicados**
  - **Dónde:**
    - `twoDigits` y el armado de etapas (`Trajectory.jsx` y `ExperiencePage.jsx`);
    - `EXTERNAL` (`Contact.jsx` y `ProjectCard.jsx`);
    - los bloques `openGraph` y `twitter` (layout y `[page]`);
    - `starts` (`Hero.jsx` y `Preloader.jsx`);
    - los años grandes (`.stage__years` y `.chapter__years`);
    - el estilo de título de proyecto, repetido tres veces;
    - `.skills__lead` y `.trajectory__intro`.
  - **Solución:** helpers en `lib/` y clases compartidas (`.years`, `.lead`).

- [ ] **R-M31. La media query horizontal está copiada 10 veces y hay tres criterios de "puntero fino"**
  - **Dónde:**
    - Las 9 hojas de CSS y `lib/track.js:4-5`. El comentario de `track.js` solo nombra `track.css`.
    - Los tres criterios: `(pointer: fine)` en `track.js` y `SmoothScroll`; `(hover: hover) and (pointer: fine)` en `Cursor` y `Magnet`; `pointerType === "mouse"` en otros tres lugares.
    - Reduce motion escrito a mano en 8 lugares.
  - **Problema:** hoy las copias son idénticas, pero nada lo verifica. El umbral ya cambió una vez.
  - **Solución:**
    - Un `scripts/check.mjs` en `prebuild` que compare las copias, las claves ES/EN y los colores de la imagen OG con los tokens.
    - Constantes `FINE_POINTER` y `REDUCED_MOTION` en `lib/`.
    - Como alternativa de fondo: una clase `html.h` que ponga el script del tema.

- [ ] **R-M32. Valores escritos a mano, cuando `tokens.css` dice que todo sale de ahí**
  - **Dónde:**
    - **Duraciones:** 500, 400 y 350ms en `base.css`; 1100ms repetido en `motion.css` y `page.css`; todo `preloader.css`.
    - **Curvas:** `cubic-bezier(0.55, 0, 1, 0.45)` tres veces.
    - **Radios y capas:** `border-radius: 50%` en 7 lugares y `z-index: -1` en `base.css:171`.
    - **Tipografía:** 5 tamaños de letra sueltos y el peso 650.
    - **En el JS:** `DraggablePhoto.jsx:74` y `:102` copian curvas y duraciones.
  - **Solución:** sumar `--ease-in`, `--dur-reveal`, `--dur-fill` y `--radius-round` y usarlos. Si no, suavizar la frase de `tokens.css` y de DISENO 9.4.

- [ ] **R-M33. Tres cosas que se comportan distinto de lo documentado**
  - La foto vuelve a su lugar sin animación cuando cambia el tamaño de la ventana (`DraggablePhoto.jsx:162-168`); DISENO dice 700ms.
  - `Magnet.jsx:10` espera 420ms, pero la transición dura 400ms (`base.css:220`), y el comentario dice que son el mismo valor.
  - En colores forzados, el `.strike` y otros detalles no tienen un estilo propio (ver R-I8).

- [ ] **R-M34. Diferencias de copia entre ES y EN**
  - **EN:**
    - "Back to start" (`contact.back`) contra "Back to home" (`page.back`, `notFound.back`).
    - "View Projects" en Title Case, contra "See all skills".
  - **ES:**
    - "de esta página" en `skills.pageLead` y `skills.matrixLead`, cuando los proyectos están en la home; EN dice "on this site".
    - "end-to-end" en `exp.intro`, contra "de punta a punta" en el hero.
    - "Backend" con mayúscula en `meta.description`.
    - Conviven "mobile" y "móvil".
  - **ES y EN:**
    - Comillas rectas y tipográficas mezcladas.
    - `exp.*.company` guarda el rol más "| Argentina" y el código lo parte con `split(" | ")` (`Trajectory.jsx:26-27`); en la home queda "Desarrollador" dos veces.
    - Guion corto entre las fechas y raya en los años grandes.
    - "Mentalidad orientada al producto en entornos de alto crecimiento" es relleno que la trayectoria no respalda.
  - **Solución:** unificar cada caso. Lo del relleno lo decide Fermin.

- [ ] **R-M35. El lint: N5 pasa solo por casualidad y no detecta variables sin usar**
  - **Dónde:** `eslint.config.mjs:7-8`.
  - **Problema:**
    - `npx eslint .` da 0 errores solo porque `.claude/worktrees/` quedó vacía: `--print-config` muestra que esa carpeta todavía no se ignora.
    - `core-web-vitals` no activa `no-unused-vars`. Con la regla prendida, solo aparece `lib/theme.js:36` (un `catch (e)`).
  - **Solución:** sumar `.claude/**` a `globalIgnores`, agregar `"no-unused-vars": "warn"` y cambiar ese `catch (e)` por `catch {}`.

- [ ] **R-M36. El README describe el diseño anterior y hay comentarios viejos**
  - **Dónde:**
    - `README.md:9`: "CSS plano (`app/globals.css`), diseño Apple minimal + glassmorphism + bento grid". La estructura (`:43-65`) no tiene `styles/`, `app/[lang]/[page]`, `lib/pages.mjs`, `lib/track.js`, `lib/scroll.js`, `docs/` ni Lenis.
    - Comentarios viejos:
      - `SkillsPage.jsx:5` habla de la "marquesina";
      - `motion.css:44` habla de las "barras del eje";
      - `site.js:132` y `:235`;
      - `global-not-found.js:13` dice "Next 15";
      - `scripts/strip-metadata.mjs:2` no menciona WebP;
      - `lib/scroll.js:2` dice "Volver arriba".
  - **Solución:** reescribir el Stack y la Estructura del README, enlazar `docs/`, y actualizar esos comentarios.

### Documentación

- [ ] **R-M37. DISENO.md quedó desactualizado**
  - **Sección 1:** la cortina "con el nombre del destino" contradice la sección 8, que dice "sin el nombre", y ya no se usa solo al cambiar de idioma.
  - **Sección 2:**
    - `--line` no es el color de la línea de Trayectoria, que usa `--ink`.
    - `--on-accent-muted` no se usa.
  - **Sección 3:**
    - La fila "Mega (email)" y `--fs-mega` ya no se usan.
    - La fila "Título (h2 en vertical)" no existe: los h2 son `.display--section` en los dos modos.
    - "Destacado" pesa 400, no 500.
    - Falta el peso 650.
    - `--fs-stage` y `--fs-wall` no están en la escala.
  - **Sección 4:**
    - Hay otras esquinas (`50%`) y otro `z-index` (`-1`).
    - El corte de 30rem no se usa.
    - Faltan los cortes de alto (42,5rem y 50rem), el de 100rem y `--tap`.
  - **Sección 5:** "hay que aprobarlo" ya se aprobó.
  - **Sección 6.1:**
    - El ejemplo de `--track-w` no suma `--w-bleed`. El código arma `--x-timeline`, `--x-skills` y `--x-bleed` y termina en `--x-bleed + --w-bleed + 100cqi` (`styles/track.css:23-28`).
    - En el HTML del ejemplo faltan las clases `panel--*` y el panel `.bleed`.
    - En el CSS del ejemplo falta el `padding-block` de `.panel`.
    - "El único recorte de la página" exagera: también llevan `overflow: clip` `.btn`, `.card__plate`, `.drag__frame`, las líneas del nombre, `.swap` y `.brand__last`. Lo mismo dice 9.1.
    - "Buscar en la página funciona como siempre" no es cierto en horizontal (R-M11).
  - **Sección 6.3:**
    - Dice que se usa `window.scrollTo` y que escucha `popstate`. El código usa `smoothScrollTo` (Lenis) y no escucha `popstate`.
    - Dice `offsetTop`; el código usa `getBoundingClientRect().top + scrollY`.
  - **Sección 6.6:**
    - El hero no tiene `min-height: 100svh`.
    - Trayectoria pone los años arriba por debajo de 48rem, no de 30rem.
    - Proyectos va en dos columnas desde 48rem siempre que la página esté en vertical, no solo hasta 64rem.
  - **Sección 7.1:** sin JS el código oculta con `html.js`, no con `html:not(.js)`.
  - **Sección 7.2:**
    - El nombre ocupa 9 columnas, no 8.
    - `priority` está deprecado; el código usa `loading="eager"`.
    - `hero.description` pasó a llamarse `exp.intro`.
  - **Sección 7.3:**
    - La tarjeta no tiene iconos de plataforma.
    - Los textos ya tienen 25 palabras o menos.
    - `card--lg` usa 16:9 en vertical, no 4:3.
    - Las etiquetas del ejemplo ("4+ años") no son las del código.
  - **Sección 7.6 y la tabla de la sección 8:** no mencionan el imán del 50% de las píldoras grandes.
  - **Sección 7.8:**
    - `--cursor-size` no existe (es un `--size` local).
    - Sobre el cierre, el color lo cambia `data-tone`, no `--cursor-ink`.
  - **Sección 7.9:**
    - La estela dura 400ms, no 300ms.
    - Al cambiar el tamaño de la ventana, la foto vuelve sin animación.
  - **Sección 7.10:**
    - La curva `1 − (1 − t)³` no es la de douglus (el anexo A dice `1 − 2^(−10t)`).
    - En vertical, las anclas no pasan por Lenis.
    - "Volver arriba" se llama "Volver al inicio".
  - **Sección 8, principios:** la ola se repite en loop (2); el nombre del nav anima `grid-template-columns` y el muro anima `color` (3); `btn-in`, `brand-in` y `wave` son `@keyframes` que corren en hover o en loop (6); el menú abre en 420ms aunque se lo active con teclado (7).
  - **Sección 8, tabla:**
    - Contacto ya no tiene tachado.
    - Con reduce motion, el tachado se anima igual (R-M6).
    - Las "barras del eje" ya no existen.
    - La cortina también aplica a las páginas propias.
    - El cambio de tema tiene transiciones de color.
  - **Sección 9:**
    - 9.1: no hay `overflow-wrap: anywhere` en el email.
    - 9.4: la afirmación de que todo son tokens (R-M32).
    - 9.7: ya no hay "filas de contacto".
  - **Sección 10:**
    - D1, D2, D3, D4 y D7 ya están implementados. El único abierto es D5 (I12).
    - La lista del orden de implementación describe algo que ya pasó.
    - D10 está entre D6 y D7.
  - **Solución:** actualizarlo en un solo commit, después de decidir los arreglos, para que quede la versión final.

- [ ] **R-M38. Textos viejos en esta misma auditoría**
  - I15 dice que el CV también está "en la franja inferior".
  - I16 habla de "cobalto" y de un título del 404 con "—".
  - I4 dice "8+ proyectos"; se muestra "8".
  - I7 menciona "el texto secundario sobre el panel de contacto".
  - **Solución:** agregar una nota en cada uno, sin reescribir la historia.

## Criterios del rediseño, verificados

| # | Criterio | Estado | Evidencia |
|---|---|---|---|
| 1 | Sin desbordes tapados | Cumple, salvo R-I1 | `html` y `body` sin `overflow`. En los 84 casos de la matriz, `scrollWidth` es igual a `clientWidth`, y en horizontal ningún panel se pasa de su caja. La tabla de `/habilidades` se desplaza en su caja, a propósito. La excepción es la placa tipográfica, que recorta el nombre con `overflow: clip`. **[nav]** |
| 2 | Contenido visible sin JS | Cumple | Sin JS la página es vertical: 0 textos ocultos, los 4 enlaces del nav visibles, 43 enlaces y el h1 completo en la home, y lo mismo en `/trayectoria` y el 404. Solo sobra el botón de tema (R-M7). **[nav]** |
| 3 | Nav | Cumple | El menú cambia `aria-expanded` y deja `main` y el pie inertes; Escape lo cierra y devuelve el foco. Las anclas desde la home y desde `/trayectoria` dejan el panel en el borde izquierdo, con `aria-current` y el nombre de la franja correctos. El idioma conserva la sección y la página propia. Detalles en R-M8 y R-M9. **[nav]** |
| 4 | Tokens | Cumple en color, parcial en el resto | Todos los colores son tokens (las placas de marca y la imagen OG son excepciones documentadas). Hay duraciones, curvas, radios, un `z-index` y tamaños escritos a mano, y 5 tokens sin uso (R-M28, R-M32). |
| 5 | Assets | Cumple | `next/image` para la foto, los logos y Devicon; iconos SVG inline; un solo CSS propio de 8,4 KB gz y nada externo. La fuente pesa 90 KB (R-M14). |
| 6 | Proyectos | Parcial | Los enlaces directos y los datos salen de `PROJECTS`. Faltan capturas reales: 6 de las 8 placas son tipográficas y 2 muestran el logo (I12). |
| 7 | Accesibilidad | Parcial | Cumple: `<main>` y enlace de salto; `:focus-visible` de 2px con 3px de separación en todos los focos recorridos; axe sin violaciones a 375px y en las páginas verticales a 1440, en los dos temas; zonas táctiles de 44px o más; niveles en texto en `/habilidades`. Fallan R-I3, R-I4, R-I8, R-M1, R-M2 y R-M4. **[nav]** |

## Lighthouse (preview, 13.4.1)

**SEO** da entre 66 y 69 solo por `is-crawlable`: es el `noindex` del preview. En producción ese punto no cuenta. **Accesibilidad** y **buenas prácticas** dan 100 en todas las corridas. Los tiempos están en segundos.

| Página | Dispositivo | Visita | Rendimiento | FCP | LCP | Speed Index | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| `/` | Móvil | A (preloader) | 98 | 1,57 | 1,61 | 2,97 | 0,02 | 0 |
| `/` | Móvil | B (sin preloader) | 100 | 1,16 | 1,69 | 1,67 | 0,01 | 0 |
| `/` | Móvil | C (siguiente) | 100 | 0,78 | 0,85 | 0,78 | 0 | 0 |
| `/en` | Móvil | A | 98 | 1,19 | 1,79 | 3,84 | 0 | 0 |
| `/en` | Móvil | B | 100 | 1,10 | 1,73 | 1,35 | 0,01 | 0 |
| `/` | Escritorio | A | 93 | 0,95 | 1,36 | 1,50 | 0 | 0 |
| `/` | Escritorio | B | 100 | 0,28 | 0,35 | 0,50 | 0 | 0 |
| `/` | Escritorio | C | 100 | 0,22 | 0,24 | 0,22 | 0 | 0 |
| `/en` | Escritorio | A | 97 | 0,73 | 1,02 | 1,47 | 0 | 0 |
| `/en` | Escritorio | B | 100 | 0,36 | 0,44 | 0,56 | 0 | 0 |
| Páginas propias (4) | Móvil | A y B | 100 | 0,90–1,24 | 1,24–1,55 | 1,02–1,96 | ≤ 0,02 | 0 |
| Páginas propias (4) | Escritorio | A y B | 96–100 | 0,43–1,04 | 0,57–1,04 | 0,58–1,04 | 0 | 0–0,028 (R-M20) |

- **El elemento LCP de la home es la foto** (`.drag__frame > img`) en todas las corridas, con preloader y sin él. En las páginas propias es texto: la entrada de `/trayectoria`, un capítulo o el título de un grupo.
- **El LCP no ve el preloader.** La API de LCP no tiene en cuenta que el velo tapa la página. En un Chrome sin límite de red, el LCP llega a los 0,44 s (el párrafo) y a los 0,56 s (la foto) aunque el preloader tape todo hasta los 5,35 s. Lo que sí lo muestra es el **Speed Index**: en móvil, 3,0 s (ES) y 3,8 s (EN) contra 1,7 y 1,4 s sin preloader; en escritorio, 1,5 s contra 0,5 s. En escritorio el LCP también sube: 1,36 y 1,02 s contra 0,35 y 0,44 s.
- **Lo que queda afuera:** Lighthouse no ve R-I3 (mide al cargar, con el nav sobre el papel) ni R-I4.

## Movimiento en un navegador visible (N7)

Se revisó en Chrome visible a 1440×900, en claro y en oscuro.

| Qué | Resultado |
|---|---|
| Recorrido con la rueda (Lenis) | En 9 muestras por tema, el `translate` de la pista es igual a −(scroll − inicio de la pista), con 1px de diferencia como mucho. **[nav]** |
| Barra de progreso, nombre de la sección y `aria-current` | Van juntos: 0,12 en Proyectos, 0,60 en Trayectoria y 1,0 en Contacto. **[nav]** |
| Línea de Trayectoria | Pasa de 0 a 0,86 y termina en 1. **[nav]** |
| Transición al cierre | El `scale` va de 0,05 a 1,02, y el borde izquierdo nunca deja ver papel. **[nav]** |
| Preloader | Las palabras suben de a una; después aparecen el nombre letra por letra, la línea y el cargo; el velo se va y queda con `visibility: hidden`. **[nav]** |
| Nombre del hero y entradas de cada panel | Se ven; ver R-I4. **[nav]** |
| Nombre del nav | Con el mouse encima, "Lasarte" se abre. **[nav]** |
| Cursor | El círculo y "ARRASTRAME" sobre la foto. Sobre los botones no quedó capturado. **[nav]** |
| Foto arrastrable | Estela de copias; queda donde cae (−360px, −144px) y vuelve a 0 cuando el foco del teclado entra al hero. **[nav]** |
| Ola de la franja | Letras girando en "Hecho a mano" después de 5 s quieta. **[nav]** |
| Muro de Habilidades | Se ve el estado final (llenas, contorno y acento). Ningún cuadro intermedio de la ola quedó capturado. |
| Reduce motion | Vertical, sin preloader, 0 animaciones corriendo, nada esperando y sin cursor propio. **[nav]** |
| Relleno e imán de los botones | Sin confirmar: no quedaron en ninguna captura. |

## Pendientes anteriores

- **I12** (capturas verticales): sigue abierto. Seis de las ocho tarjetas muestran solo el nombre en una placa, y dos de esas placas cortan el nombre (R-I1).
- **M13** (`.js` y `.jsx`): sin cambios.
- **N4** (foto blanda en 2x): sigue. A 1440×900 la foto se dibuja a 320×459 (360px de ancho con `cover`), así que en 2x haría falta una de al menos 720×920. La actual mide 560×715.
- **N5:** sigue abierto en la configuración (R-M35).
- **N6:** fuera de la auditoría, por decisión de Fermin.
- **N7:** hecho (tabla de arriba y Lighthouse).
- **N8:** medido; pasó a R-I3, que Fermin decidió dejar como está. El texto en contorno se lee bien sobre el papel y sobre el oscuro (los años de Trayectoria y las intermedias del muro, con 1px de `--ink`), pero en colores forzados pierde el contorno (R-I8).
