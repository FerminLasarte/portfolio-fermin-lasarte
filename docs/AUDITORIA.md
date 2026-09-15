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
- **Actualización (2026-09-15, más tarde):** accesibilidad y flujo (R-M1 a R-M13) está cerrado, un commit por punto (de `bb6dc48` a `98750b8`). Sigue SEO y robustez (R-M21 a R-M27), en otra conversación. Antes de hacerlos hay que decidir con Fermin:
  - R-M21: los textos de `global-error.js`, en ES y EN.
  - R-M25: la descripción de la página, de unos 155 caracteres (la de EN tiene 177).
  - R-M27: si el tema tiene que seguir al del sistema cuando cambia con la página abierta.
  - R-M27: la imagen OG pesa 394 KB, y para saber si WhatsApp la muestra hay que compartir un enlace real.
  - **Respuestas de Fermin (2026-09-15):**
    - R-M21: hacer `global-error.js`, proponiéndole antes los textos.
    - R-M25: acortar las descripciones a unos 155 caracteres, proponiéndole antes la copia.
    - R-M27: sí, el tema sigue al del sistema cuando cambia, si no hay uno guardado.
    - R-M27: bajar el peso de la imagen OG y probarla compartiendo el enlace.
- **Actualización (2026-09-15, noche):** SEO, robustez y seguridad (R-M21 a R-M27) está cerrado, un commit por punto (de `5ff662b` a `b1bede4`). Después se arregló N9 (el relleno de los botones asomaba por abajo) y la rama se pusheó, con autorización de Fermin. Fermin aprobó los textos de `global-error`, dejar las descripciones como están (ya medían 130 y 144 caracteres) y pasar el favicon al violeta del acento.
  - **Queda para después del push, en el preview de Vercel:** las cabeceras de seguridad (R-M22), la caché de ISR (R-M27) y compartir el enlace por WhatsApp para ver la imagen OG (R-M27).
  - **Sigue (decidido por Fermin, 2026-09-15):** primero, en una conversación nueva, **una paleta cálida, tirando a naranja**, en lugar del violeta frío ("transmite más confianza y cercanía"). Empieza con una propuesta de dos o tres opciones aplicadas al hero, una tarjeta y el contacto, en claro y oscuro, y recién después se implementa. Condiciones:
    - contraste AA medido: un naranja vivo con texto blanco no llega a 4,5:1, así que hace falta un naranja quemado o texto oscuro sobre el naranja;
    - que no sea el naranja de douglus: DISENO.md, sección 1, marca el color como lo que diferencia al portfolio de una copia.
    - Toca `styles/tokens.css` (32 valores), `lib/og.js`, `lib/theme.js` (si cambia el papel), el favicon y el apple-icon (el script de R-M26), y DISENO.md, sección 2.
  - **Hecho (2026-09-15):** Fermin eligió "A · Teja" entre tres propuestas (teja, mandarina con texto oscuro, y naranja con cierre azul tinta). Acento `#A93C0B` / `#FF9A62`, papel arena `#F2EEE8` / `#14100D` y cierre café `#120B07`. Cambiaron `styles/tokens.css`, `lib/og.js`, `lib/theme.js` (el papel), el favicon, `favicon.ico` y el apple-icon. Los valores y el contraste están en DISENO.md, sección 2: el par más justo da 4,84.
    - **Verificado con Puppeteer** en el servidor local, en claro y oscuro. A 390px se midió el contraste de los 164 textos visibles sobre los colores calculados, y ninguno queda debajo de 4,5:1 (el mínimo da 5,90 en claro y 7,84 en oscuro). A 1440×900 se revisaron a la vista el hero, las tarjetas, la transición al cierre y el contacto. También se revisaron `theme-color`, la imagen OG y los íconos. No hay errores de consola.
  - **Después:** eficiencia (R-M14 a R-M20), limpieza (R-M28 a R-M36), documentación (R-M37 y R-M38), I12, N4 (Fermin va a sacar una foto nueva) y el merge a `main`. Dos commits de docs (`cba32e7` y `8592b65`) quedan locales y se pushean con el próximo grupo.
- **Actualización (2026-09-15, eficiencia):** R-M14 a R-M20 están cerrados, un commit por punto, en el orden que aprobó Fermin: R-M19 (`5e35694`), R-M20 (`1651267`), R-M15 (`3414512`), R-M16 (`6cf32d4`), R-M14 (`31b472c`), y R-M17 (`7b9b15f`) y R-M18 (`f5ed6db`) sin cambios, porque la medición dijo que no valía la pena.
  - **Cuánto se ganó**, en el build de producción, por página y en la primera visita:
    - fuente: 88,0 → 55,6 KB;
    - JS en el celular: 150,8 → 140,6 KB gz en la home y 147,7 → 137,1 en las páginas propias;
    - JS en escritorio: 150,8 → 145,9 y 147,7 → 142,4;
    - CSS: 8,9 → 8,5 KB gz;
    - con la página quieta, 0 frames por segundo en vez de 60;
    - CLS de `/trayectoria` con la fuente demorada: 0,0245 → 0,0102 a 1440 y 0,0225 → 0,0043 a 1024.
  - **Lo que cuesta:** el HTML de la home suma 0,4 KB gz (R-M15), y R-M14 no es idéntico píxel por píxel: el recorte de la fuente corre 0,35px como mucho el ancho de un título, sin cambiar la maquetación. Si Fermin prefiere el archivo de Google, se revierte `31b472c` y nada más.
  - **Rama:** estos commits están locales, sin push. Queda para después del push, en el preview de Vercel: las cabeceras de caché de `/icons` y `/assets` (R-M19). Después se pushearon (`fedd73d`), con autorización de Fermin, y R-M19 se verificó en el preview (`31b85da`).
  - **Sigue:** limpieza (R-M28 a R-M36), documentación (R-M37 y R-M38), I12, N4 y el merge a `main`.
- **Actualización (2026-09-15, limpieza):** R-M28 a R-M36 están cerrados, un commit por punto, en el orden que aprobó Fermin:
  - la prueba de `global-error.js` con la fuente recortada, que quedó pendiente de R-M14 (`01501a1`, solo la nota: funciona en los 8 casos);
  - R-M35 (`677d961`), R-M28 (`12d0533`), R-M29 (`d30fbd2`), R-M33 (`fa69000`), R-M34 (`8a5e34f`), R-M30 (`24b4034`), R-M32 (`46e48ba`), R-M31 (`c544f73`) y R-M36 (`1361fb4`).
  - **Lo que cambió a la vista:**
    - los textos de R-M34: las etapas llevan el nombre del proyecto con el rol debajo; "móvil", "de este sitio", "Back to top", comillas tipográficas y raya en las fechas; sin la frase del producto;
    - la foto vuelve con animación al cambiar el tamaño de la ventana (R-M33);
    - con colores forzados, el tachado de los enlaces se ve (R-M33).
    - Todo lo demás dio 0% o ruido contra el build anterior a cada punto.
  - **Nuevo:** `npm run build` corre `scripts/check.mjs` antes de compilar (R-M31). Si cambia una copia de la media query horizontal, falta una clave en un idioma o se separa un color copiado de los tokens, el build se detiene. N5 quedó cerrado con R-M35.
  - **Herramienta:** la comparación de capturas que venía de eficiencia salteaba, en horizontal, el panel de Trayectoria a 1440, porque buscaba el id "trayectoria" y no "experiencia". Ahora recorre toda la pista. En eficiencia, la maquetación de ese panel se había verificado aparte, midiendo los 513 textos de `/` y `/trayectoria` (R-M14).
  - **Rama:** estos commits están locales, sin push.
  - **Sigue:** la documentación (R-M37 y R-M38), para que DISENO.md quede en su versión definitiva; después, I12, N4 y el merge a `main`.
- **Actualización (2026-09-15, documentación):** R-M37 y R-M38 están cerrados, así que la re-auditoría no tiene más puntos abiertos.
  - R-M37 (`644f890`): DISENO.md queda en su versión final. Seis puntos ya no aplicaban y quedaron anotados. `--wdth-mega` se documentó en vez de borrarse.
  - R-M38 (`4ca37e7`): notas en I4, I7, I15, I16 y en cuatro líneas de la re-auditoría que se leían como estado actual.
  - Aparte, `c20c6bc`: el comentario de `lib/scroll.js` ya no atribuye la curva de los saltos a douglus.
  - **Rama:** la limpieza y N10 se pushearon (`b29bca9`). Estos commits también se pushearon, con autorización de Fermin (2026-09-15). Sigue sin merge a `main`.
  - **Vercel (confirmado por Fermin, 2026-09-15):** el log del build del preview muestra la línea `✓ scripts/check.mjs`, así que el control de R-M31 también corre en Vercel.
  - Aparte: el comentario de `styles/track.css` ya no dice que el recorte de la pista es "el único de la página" (lo mismo que se corrigió en DISENO 6.1).
  - **Sigue:** I12 y N4 (las capturas y la foto nueva, que tiene que conseguir Fermin) y el merge a `main`.
- **Siguen abiertos de antes:** I12 y N4 (contenido que tiene que conseguir Fermin), y M13. N10 quedó cerrado: en el preview, el tachado del nav cruza la palabra entera (ver R-M33).

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
    - **Cifras:** salen de los datos, con "+" en años y proyectos. Hoy: 2 apps en producción, 4+ años (2021–2025) y 8+ proyectos. *(Nota, 2026-09-15, R-M38: la home muestra "8", sin "+", porque la cantidad de proyectos es exacta. El "+" quedó solo en los años.)*
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
  - **Hecho (Fase 3):** paleta nueva (DISENO.md, sección 2). Medido en el navegador sobre los colores calculados, en claro y oscuro: el mínimo es 5,09 (claro) y 5,44 (oscuro), el texto secundario sobre el panel de contacto; el resto va de 5,92 a 16,69. Los bordes de control dan 3,09 o más. *(Nota, 2026-09-15, R-M38: esa medición es de la paleta cobalto de la Fase 3. El contacto ya no tiene texto secundario, porque el cierre nuevo son píldoras (DISENO 7.5), y la paleta cambió dos veces después: al violeta y a la teja. Los valores de hoy están en DISENO.md, sección 2; medido en pantalla, el mínimo es 5,90 en claro y 7,84 en oscuro.)*
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
  - **Hecho (Fase 3):** un botón por destino (App Store, Google Play, Código, Visitar), sin dropdown; la placa de cada tarjeta lleva al destino principal; "Descargar CV" baja directo el PDF del idioma de la página (en el hero y en la franja inferior); Proyectos va justo después del hero. *(Nota, 2026-09-15, R-M38: el CV salió de la franja en la ronda 4 de la Fase 3, a pedido de Fermin, y queda solo en el hero. En su lugar va "Hecho a mano en Buenos Aires".)*
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
      - **Fase 3:** *(Nota, 2026-09-15, R-M38: el cobalto ya no está; la imagen usa los colores de la paleta teja, y `scripts/check.mjs` controla que sigan iguales a los tokens. Desde R-M27 es un JPEG.)* La imagen pasó a la identidad nueva: papel, tinta y cobalto del tema claro (copiados de `styles/tokens.css`, porque next/og no lee variables de CSS), el nombre abajo a la izquierda en Archivo angosta y en mayúsculas, y la foto rectangular a la derecha, sin círculo ni sombra. Ya no baja fuentes: lee de `assets/fonts/` tres instancias estáticas de Archivo (OFL), porque Satori no aplica los ejes de una fuente variable (`assets/fonts/README.md`). Así el build ya no depende de la red, que es donde parecía estar el error pasajero de un build ("Cannot read properties of undefined (reading 'split')" al prerenderizar las dos imágenes; no se pudo reproducir). Verificado con dos builds seguidos en una copia aislada.
    - **apple-icon:** `public/apple-icon.png` es de 180×180 y opaco, generado con sharp a partir del favicon (cuadrado sin esquinas redondeadas, que iOS pone las suyas). Va en `ICONS` (`lib/site.js`) y no como archivo en `app/`, porque con `icons` en la metadata Next no suma el apple-icon de archivo.
    - **sitemap y robots:** `app/sitemap.js` lista `/` y `/en`, con sus alternativas hreflang, y `app/robots.js` permite todo y apunta al sitemap.
    - **404:** hay uno solo, bilingüe, para todas las URLs que no existen: `app/global-not-found.js` (con `experimental.globalNotFound`, porque no hay un layout raíz). Arma la página con `Document`, con el nav y el footer en español, y `components/NotFound.jsx` (server component) muestra el mensaje en español y en inglés, con un botón a cada home. El título es "Página no encontrada · Page not found — Fermin Lasarte" y Next agrega `noindex`. *(Nota, 2026-09-15, R-M38: con D4 de DISENO la raya se fue; hoy el título es "Página no encontrada · Page not found · Fermin Lasarte".)*
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
- [~] **M13.** `app/*.js` usa `.js` y el resto de componentes `.jsx`.
  - **Cerrado sin cambios (decidido por Fermin, 2026-09-15):** unificar no cambia nada para quien visita el sitio, porque Next trata igual las dos extensiones. La regla que quedó es coherente: los componentes van en `.jsx` (25 archivos) y los archivos que Next busca por nombre (`page.js`, `layout.js`, `global-error.js`, `global-not-found.js`, `opengraph-image.js`), en `.js`. La única excepción es `lib/og.js`, que tiene JSX. Los badges se numeran `--0,1,2,4,5` y se detecta Python por su clase (`Hero.jsx:61`).
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

- [x] **N9. El relleno de los botones asoma por abajo** · Fase 4 (hallado en R-M21) **[nav]**
  - **Hecho (pedido por Fermin, 2026-09-15):** en `styles/base.css`, el relleno en reposo baja de `translate: 0 75%` a `78%`, y la salida por arriba pasa de `-75%` a `-78%`. La animación no cambió. DISENO.md, 7.6.
  - **Verificado** con Puppeteer en 2x, midiendo la franja de 1px justo encima del borde de abajo de cada botón visible, en la home (1440 claro y oscuro, 375 claro), `/trayectoria`, el 404 y `/en/skills` (768, oscuro): antes, la línea asomaba en 16 de 30 botones (44% del camino del fondo al color del relleno); después, en 0. Con el mouse encima, el relleno sigue cubriendo el botón de arriba a abajo (hero, principal y con borde).
  - **Dónde:** `.btn::before` en `styles/base.css`: en reposo queda con `translate: 0 75%`, justo en el borde de abajo del botón.
  - **Problema:** en el 404 y en `global-error`, a 1440 en claro (en 1x y 2x), debajo de cada botón se ve un arco fino del relleno, en el color del relleno. No se revisó en el resto de las páginas, pero el estilo es el mismo en todos los botones.
  - **Solución:** si se confirma, bajar el relleno un poco más (por ejemplo, `translate: 0 78%`) sin cambiar la animación. Es un detalle visual: lo decide Fermin.

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
- **Menores:** están cerrados, cada uno en su commit:
  - accesibilidad y flujo (R-M1 a R-M13), de `bb6dc48` a `98750b8`;
  - SEO, robustez y seguridad (R-M21 a R-M27), de `5ff662b` a `b1bede4`;
  - eficiencia (R-M14 a R-M20), de `5e35694` a `f5ed6db`: R-M17 y R-M18 sin cambios, porque la medición dijo que no valía la pena;
  - limpieza (R-M28 a R-M36), de `677d961` a `1361fb4`. Solo R-M34 (los textos, con la copia que aprobó Fermin) y R-M33 (la foto al cambiar la ventana y el tachado con colores forzados) cambian algo a la vista.
  - documentación (R-M37 y R-M38): `644f890` y `4ca37e7`. DISENO.md queda en su versión final.
- N10, el tachado del nav, quedó cerrado: en el preview cruza la palabra entera (ver R-M33).
- **La re-auditoría no tiene más puntos abiertos.** El log de Vercel muestra la línea `✓ scripts/check.mjs`. Sigue lo que no es de esta fase: I12 y N4 (contenido de Fermin), M13, y el merge a `main`.

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

- [x] **R-M6. El tachado se anima igual con reduce motion**
  - **Hecho:** la `transition` de `.strike::after` pasó a `@media (prefers-reduced-motion: no-preference)`, como dice la tabla de DISENO 8 ("aparece sin transición"). Se revisaron las demás transiciones que están fuera de `no-preference`: el `translate` de "Menú" / "Cerrar" ya se corta con reduce motion (`nav.css`), y el `scale` de presionar (botones y foto) queda igual a propósito, porque no desplaza.
  - **Verificado** sobre el servidor local, a 1440, en el nav de la home y en "Ver el proyecto" de `/trayectoria`: sin reduce motion, la transición es `scale 0.22s` y a los 20ms de enfocar el tachado va por la mitad; con reduce motion es `all 0s` y aparece entero enseguida.
  - **Dónde:** `styles/base.css:279-290`: la `transition` de `.strike::after` está fuera de `no-preference`.
  - **Solución:** moverla dentro de `@media (prefers-reduced-motion: no-preference)`, como dice la tabla de DISENO 8.

- [x] **R-M7. Sin JS hay controles que no hacen nada** **[nav]**
  - **Hecho:**
    - `html:not(.js) .theme-toggle { display: none }` en `styles/nav.css`.
    - En `styles/hero.css`, el `cursor: grab` / `grabbing` de `.drag` pasó a `html.js`, dentro de la misma media query de puntero fino.
    - Se quitó el `touch-action: none`: `DraggablePhoto` solo atiende al mouse (`pointerType !== "mouse"`), así que no le servía a nada, y en un portátil táctil (que da `pointer: fine`) impedía scrollear tocando la foto.
  - **Verificado** sobre el servidor local:
    - **Sin JS** (a 1440 y 375 en la home, y en `/trayectoria`): los dos botones de tema tienen `display: none` y ninguno se puede enfocar. La foto queda con `cursor: auto`.
    - **Con JS:** a 1440 el botón vuelve (44px) y la foto sigue con `grab`; a 375, el del menú aparece al abrirlo.
    - En todos los casos, `touch-action: auto` y sin desbordes.
    - En la captura del nav sin JS, las demás herramientas (idioma, GitHub y LinkedIn) quedan en su lugar.
  - DISENO.md, 7.1 y 7.9.
  - **Sin confirmar:** que tocar la foto scrollee en un portátil táctil real (no hay uno para probar; Puppeteer no lo emula con `pointer: fine`).
  - **Dónde:** `components/ThemeToggle.jsx:22-33` y `styles/hero.css:137-141`.
  - **Problema:**
    - Sin JS, el botón de tema se ve y se puede enfocar, pero no hace nada.
    - La foto muestra `cursor: grab` y tiene `touch-action: none`. Con eso, en un portátil táctil tocar la foto no scrollea (sospecha).
  - **Solución:** `html:not(.js) .theme-toggle { display: none }` y poner el `cursor` y el `touch-action` de `.drag` bajo `html.js` y con puntero fino.

- [x] **R-M8. El botón de idioma: su nombre no incluye "EN" y desde una tarjeta vuelve a la entrada de Proyectos** **[nav]**
  - **Hecho:**
    - El `aria-label` del enlace de idioma pasó a "EN, English" / "ES, Español", como se aprobó en el plan. Se quitó `nav.langToggle` de los dos diccionarios y de `Document`, porque quedó sin uso; ES y EN siguen teniendo las mismas claves.
    - Al hacer clic, `handleLangClick` busca el panel con `id` que está en el centro de la ventana y al 40% del alto (`elementFromPoint`), que es la línea que usa `TrackController` en los dos modos. Si ahí está la transición al cierre, que no tiene `id`, usa la sección actual, como antes.
  - **Verificado** sobre el servidor local:
    - El árbol de accesibilidad da "EN, English" en `/` y en `/trayectoria`, y "ES, Español" en `/en`.
    - A 1440×900, desde la tarjeta de Vault se llega a `/en#proyecto-vault` con la tarjeta en el borde izquierdo (antes, `/en#proyectos`, con la tarjeta a 2.794px). Desde el hero y desde Habilidades se llega a su panel.
    - A 390×844, desde la tarjeta de Vault y desde Trayectoria el panel queda a 64px del borde, debajo del nav.
    - `/trayectoria` sigue llevando a `/en/experience`.
  - DISENO.md, 6.3 y 7.1.
  - **Dónde:** `components/Nav.jsx:40-44` y `:120-128`.
  - **Problema:**
    - El texto visible es "EN" y el nombre accesible es "Cambiar idioma: English" (2.5.3).
    - Desde la tarjeta de Vault, el cambio lleva a `/en#proyectos` y la tarjeta queda a 2.794px, porque las 8 tarjetas tienen `data-section="proyectos"`.
  - **Solución:** que el nombre empiece con lo visible ("EN, English") y que el enlace guarde el `id` del panel visible, no el de la sección.

- [x] **R-M9. Con el menú móvil abierto, el Tab sale del menú** **[nav]**
  - **Hecho:**
    - Con el menú abierto, `Nav` pone `inert` también en el enlace de salto, el nombre y las herramientas del nav, salvo el botón (`.nav__tools > :not(.nav__menu)`), además de `main`, el pie y la franja.
    - El nombre del botón es siempre "Menú" / "Menu", en un `sr-only`; el cambio a "Cerrar" es `aria-hidden` y solo visual, y el estado lo da `aria-expanded`.
    - Queda una tensión con 2.5.3: con el menú abierto se ve "Cerrar" y el nombre es "Menú". Quien use control por voz puede decir "Menú" o apretar Escape.
  - **Verificado** sobre el servidor local, a 375×812, en `/`, `/en` y `/trayectoria`:
    - **Antes:** después de LinkedIn, el foco pasaba por el enlace de salto, el nombre y el enlace de idioma (que quedan detrás del panel). El botón se anunciaba "Cerrar, expandido".
    - **Después:** con Tab y con Shift+Tab (14 pasos en cada sentido), el foco solo pasa por el botón y los enlaces del menú. Lo único que queda fuera es `<nextjs-portal>`, el indicador de Next en desarrollo, que en producción no existe, y el paso por la interfaz del navegador.
    - El árbol de accesibilidad da "Menú" con `expanded` en false, true y false; Escape devuelve el foco al botón y saca todos los `inert`.
    - El botón mide lo mismo (88×44) y sigue cambiando de palabra en pantalla.
  - DISENO.md, 7.1.
  - **Dónde:** `components/Nav.jsx:47-66` y `:131-143`.
  - **Problema:**
    - Después de LinkedIn, el foco pasa al enlace de salto, que lleva a un `main` inerte, y después al nombre y a "EN", que quedan detrás del menú.
    - El nombre del botón cambia de "Menú" a "Cerrar" al mismo tiempo que `aria-expanded`, así que se anuncia de más ("Cerrar, expandido").
  - **Solución:** poner `inert` también en el enlace de salto y en lo que queda del nav detrás del panel, o atrapar el foco. Dejar el nombre accesible fijo en "Menú" y el cambio de palabra solo como algo visual.

- [x] **R-M10. Enlaces con el mismo nombre y pestañas nuevas sin aviso** **[nav]**
  - **Hecho (textos aprobados por Fermin, 2026-09-15):**
    - **Botones de las tarjetas:** "Código" y "Visitar" llevan el proyecto en `sr-only` con una plantilla por idioma (`projects.codeOf`, `projects.visitOf`): "Código de Vault" / "Vault code" y "Visitar Bookit" / "Visit Bookit". Lo visible queda al principio o al final según el idioma. "App Store" y "Google Play" no se tocaron: aparecen una sola vez cada uno.
    - **"Ver el proyecto" de `/trayectoria`:** suma el nombre traducido del proyecto ("Ver el proyecto TravelPic").
    - **Pestañas nuevas:** cada `target="_blank"` dice "(abre en una pestaña nueva)" / "(opens in a new tab)" (`link.newTab`): en `sr-only` en los botones de las tarjetas y en las píldoras de WhatsApp, LinkedIn y GitHub del contacto, y dentro del `aria-label` en GitHub y LinkedIn del nav, que `Document` le pasa a `Nav`.
  - **Verificado** sobre el servidor local, con el árbol de accesibilidad de Chrome:
    - En `/` y `/en` a 1440, `/` a 375, `/trayectoria` y `/en/experience`, los únicos nombres repetidos son GitHub y LinkedIn del nav y del contacto, que llevan al mismo lugar. axe no marca `identical-links-same-purpose`, `link-name` ni `label-content-name-mismatch`.
    - Los 15 enlaces a pestaña nueva del árbol, a 1440, lo avisan. Los otros 2 del DOM son los del menú móvil, que está oculto.
    - Los 16 botones de la home y los 2 de `/trayectoria` miden lo mismo con y sin los `sr-only`, y en la captura de Vault se sigue viendo "Visitar" y "Código". Sin desbordes.
  - DISENO.md, 7.3 y 9.7.
  - **Dónde:** `components/ProjectCard.jsx:86-97` (en la home hay 5 "Código" y 3 "Visitar"), `components/ExperiencePage.jsx:68-72` y los `target="_blank"` (25 de los 43 enlaces de la home).
  - **Solución:** agregar un `sr-only` con el proyecto ("Código de Vault") y otro con "(abre en una pestaña nueva)".

- [x] **R-M11. "Buscar en la página" no llega a los paneles de la derecha** **[nav]**
  - **Hecho (decidido por Fermin, 2026-09-15: arreglarlo y anotarlo):**
    - `TrackController` escucha `selectionchange`. En horizontal, si la selección está dentro de un solo panel, entra en la ventana (ancho menor que la ventana menos 96px) y está fuera de la vista, la trae con `scrollBy` sin animación, igual que al foco (a 48px del borde).
    - Con esas condiciones, seleccionar todo no manda la pista al final.
    - Se corrigió DISENO: 6.1 y 7.10 decían que "buscar en la página" funcionaba como siempre.
  - **Es una mitigación parcial:**
    - Sirve para `window.find`, para la selección con el teclado o con la navegación con cursor y, en Chrome, para Cmd+F cuando se cierra la barra de búsqueda: recién ahí la coincidencia pasa a ser la selección.
    - Mientras la barra está abierta, Chrome resalta la coincidencia sin cambiar la selección, así que la pista no se mueve. Esto no se pudo probar: la barra de búsqueda no se puede manejar desde Puppeteer.
    - Tampoco sirve para el modo exploración de los lectores de pantalla ni para los enlaces `#:~:text=`.
  - **Verificado** sobre el servidor local, con `window.find` desde el principio de la página:
    - A 1440×900 y a 1024×680, "Bookit", "UNICEN", "WhatsApp" y "Compilador" quedan a la vista, a 48px del borde izquierdo.
    - Seleccionar todo (`selectAllChildren`, 4.528 caracteres) no mueve la pista, y una selección que ya estaba a la vista (en el hero) tampoco.
    - En vertical (900×900), la búsqueda sigue funcionando sola.
  - DISENO.md, 6.1, 6.5 y 7.10.
  - **Dónde:** `styles/track.css:55-60` y lo que dicen DISENO 6.1 y 7.10.
  - **Problema:** en horizontal, el navegador no puede traer una coincidencia que está en un panel de la derecha, porque el documento no tiene scroll horizontal. Con el modo exploración de los lectores de pantalla y con los enlaces `#:~:text=` pasa lo mismo.
  - **Solución:** documentarlo como limitación y corregir DISENO. Como mitigación parcial, un listener de `selectionchange` que traiga la selección a la vista.

- [x] **R-M12. Lenis y las anclas se comportan distinto según la página** **[nav]**
  - **Hecho:**
    - `SmoothScroll` pone `gestureOrientation: "both"` solo si se cumple la media query horizontal y además hay `.h-scroll`.
    - `lib/scroll.js` exporta `hasLenis()`.
    - `goTo` de `TrackController` también actúa en vertical: si hay Lenis y el salto es animado (clic o `hashchange`), usa `smoothScrollTo` hasta el panel menos el `scroll-padding` del nav. No hace `preventDefault`: el navegador actualiza la URL y el scroll de Lenis reemplaza al nativo. Sin Lenis (táctil, reduce motion) y en la carga inicial sigue el scroll nativo.
  - **Verificado** sobre el servidor local:
    - **Rueda de costado:** mueve el documento 719px en la home a 1440 y 0px en `/trayectoria`, `/habilidades` y la home en vertical (1024×640).
    - **Anclas en vertical con mouse** (1024×640 y 900×900), muestreadas cada 50ms: antes, el scroll nativo empezaba lento (0, 21, 100, 272…); ahora sigue la curva de Lenis (0, 576, 1101, 1583…), llega en unos 1,2 s, nunca retrocede y deja el panel a 64px. "Contacto" queda a 123px, porque es el final de la página.
    - **Táctil (390):** la trayectoria es la misma que antes.
    - **Horizontal:** los clics del nav (también dos veces al mismo ancla) y la carga con `#hash` siguen dejando el panel en el borde izquierdo.
    - **Carga con `#hash` en vertical:** el panel queda a 64px (Chrome aplica el `scroll-behavior: smooth` también al salto inicial, así que llega en poco más de un segundo).
  - DISENO.md, 6.3.
  - **Dónde:** `components/SmoothScroll.jsx:18-22` y `components/TrackController.jsx:72`.
  - **Problema:**
    - En `/trayectoria` y `/habilidades`, Lenis también toma el gesto de costado del trackpad (`gestureOrientation: "both"` depende solo de la media query), aunque ahí no hay pista.
    - En vertical con puntero fino, las anclas no pasan por Lenis, cuando DISENO 7.10 dice que sí.
  - **Solución:** que el gesto de costado dependa de que haya `.h-scroll`, y que `goTo` use `smoothScrollTo` también en vertical (o corregir el documento).

- [x] **R-M13. El cargo en inglés no lleva `lang="en"` en la página en español** (sospecha)
  - **Hecho:** en el hero, `<strong lang="en">` en el cargo, solo si la página no está en inglés (en `/en` ya lo hereda de `<html>`).
  - **Verificado** sobre el servidor local: en `/` el `<strong>` tiene `lang="en"` dentro de `<html lang="es">`; en `/en` no lleva atributo y hereda `en`. axe da 0 fallos en `valid-lang`, `html-has-lang` y `html-lang-valid`. DISENO.md, 7.2.
  - **Dónde:** `components/Hero.jsx:26`.
  - **Problema:** "iOS & Cross-Platform Mobile Engineer" se lee con fonética española (3.1.2). Es discutible, porque puede entrar en la excepción de términos técnicos.
  - **Solución:** usar `<strong lang="en">`.

### Eficiencia

- [x] **R-M14. La fuente es lo más pesado de la página** (el ahorro es una sospecha)
  - **Medido antes de tocar nada:** la solución propuesta no ahorraba nada. Google Fonts devuelve el mismo archivo "latin" de 90.096 bytes aunque se le pidan menos pesos o anchos (se probó `wght` 400..800 y `wdth` 68..100, juntos y por separado). El ahorro solo aparece recortando una copia propia.
  - **Hecho** (con el acuerdo de Fermin, 2026-09-15: no cambia nada a la vista, pero ya no hay pesos fuera de 400–800 ni anchos fuera de 68%–100% sin regenerar el archivo):
    - `assets/fonts/Archivo-web.woff2`: Archivo variable de google/fonts, recortada con `fonttools varLib.instancer` a `wght` 400–800 y `wdth` 68–100, con el rango de caracteres y las funciones tipográficas del archivo "latin" de Google (incluidas las cifras tabulares). El comando está en `assets/fonts/README.md`.
    - `lib/fonts.js` la carga con `next/font/local` (`weight: "400 800"` y `font-stretch: 68% 100%` en `declarations`; sin ese rango, el navegador no aplica el ancho angosto). La usan `Document` y `app/global-error.js`.
    - La fuente de respaldo es la de antes. `next/font/local` calculaba otra (`size-adjust: 102,8%` en vez de 98,7%) y el CLS de `/trayectoria` con la fuente demorada subía de 0,0102 a 0,0247 a 1440 y de 0,0043 a 0,0254 a 1024. Por eso va `adjustFontFallback: false` y el `@font-face` "Archivo Fallback" en `styles/tokens.css`, con las medidas que calculaba `next/font/google`.
  - **Antes y después**, en el build de producción:
    - **Fuente precargada en cada página:** 88,0 → 55,6 KB.
    - **CSS:** 8,9 → 8,5 KB gz (una sola regla `@font-face` en vez de tres subconjuntos).
    - **CLS con la fuente demorada 800ms,** a 1440 y 1024: igual que antes del cambio en las cuatro páginas (`/` 0,0138 y 0,0212; `/trayectoria` 0,0102 y 0,0043).
  - **Verificado** con Puppeteer contra el build anterior, a 1440 y 390, en claro y oscuro, en `/`, `/en`, `/trayectoria` y `/habilidades`:
    - **No es idéntico píxel por píxel:** en la peor vista difiere entre el 0,45% y el 1,65% de los píxeles, contra el 0,066% de ruido. Es redondeo. Al recortar los rangos de los ejes, los valores intermedios se recalculan en unidades enteras, y en los pesos y anchos que usa el sitio cada letra cambia su ancho 1/1000 de em como mucho (0 en los pesos 400 y 600). Eso es 0,15px por letra en el título más grande, que mide 153px. Los bordes de las letras se corren una fracción de píxel.
    - **La maquetación es la misma:** en `/` y `/trayectoria`, los 513 textos conservan su alto y su cantidad de líneas, y el ancho cambia centésimas de píxel (por ejemplo, 71,94 → 71,97px en "Proyectos" y 811,78 → 812,13px en el título "Trayectoria"). A simple vista no se distingue.
    - **Recortar desde el archivo de Google Fonts** en vez de desde google/fonts da exactamente los mismos anchos: el redondeo es del recorte.
    - La foto sigue siendo el LCP con la precarga; el scroll suave, el ancla, el imán, el cierre y la ola funcionan, y no hay errores de consola. `global-error.js` comparte el módulo de la fuente y compila, pero esta vez no se forzó un error para verlo.
    - **`global-error.js` con la fuente recortada** (2026-09-15, en la limpieza): se forzó un error como en R-M21, con un componente temporal montado en el layout raíz que rompe al hidratar con `?boom`. Estuvo solo en la copia aislada del build de producción, nunca en el repo. Con Puppeteer, en `/`, `/en`, `/trayectoria` y `/en/skills`, a 390 y a 1440, en claro y oscuro (8 casos): se ve la página de error en el idioma de la URL y con el tema correcto (`dark-mode` y `theme-color`), `Archivo-web.woff2` responde 200 y queda cargada (`archivo 400 800 68% 100%`), "ERROR" sale en Archivo angosta (68%, peso 800), no hay desborde y no hay otros errores de consola que el forzado.
  - **Dónde:** `components/Document.jsx:14-19`.
  - **Problema:** el archivo latin precargado pesa 90 KB, seis veces el JS propio de la home. Se piden `wght` de 100 a 900 y `wdth` de 62 a 125, pero se usan pesos de 400 a 800 y anchos de 68%, 75% y 100%.
  - **Solución:** `weight: "400 800"` en `Archivo()`, o una instancia local recortada con `fonttools varLib.instancer`.

- [x] **R-M15. next/image manda JS de cliente que no aporta nada**
  - **Hecho:** los tres `<Image>` (la foto del hero, los logos de las placas y los iconos de `/habilidades`) pasan a un `<img>` común con los atributos de `getImageProps()`. La foto pide su precarga con `preload()` de `react-dom`, con las mismas opciones que usaba `<Image>` por dentro (`imageSrcSet`, `imageSizes`, `fetchPriority: "high"`).
  - **Por qué hay un `lib/image.js`:** con el `getImageProps` de `next/image` el chunk no se iba. Ese módulo (`dist/shared/lib/image-external.js`) importa siempre el componente de cliente, así que las páginas lo seguían bajando aunque solo se usara la función. `lib/image.js` hace lo mismo que ese `getImageProps`, con las mismas dos piezas internas (`getImgProps` y el loader por defecto). Si una versión de Next las mueve, el build falla al importarlas.
  - **Antes y después**, en el build de producción (JS total de la página, gz):
    - home (`/` y `/en`): 150,8 → 145,2 KB (8 scripts en vez de 9);
    - páginas propias: 147,7 → 141,8 KB (7 en vez de 9);
    - `next/dist/client/image-component.js` ya no está en ningún manifiesto de cliente.
  - **El costo:** el HTML de la home suma unos 0,4 KB gz (19,7 → 20,1 en `/`). Ahora los `srcset` completos viajan también en el payload de React, porque el `<img>` es HTML del servidor. `/habilidades` no cambia (sus iconos no tienen `srcset`).
  - **Verificado:**
    - En `/`, `/en` y `/habilidades`, los `<img>` y la precarga tienen los mismos atributos que antes, salvo `data-nimg`, que nada usa.
    - Con Puppeteer contra el build anterior, a 1440 y 390, en claro y oscuro, en las cuatro páginas: las capturas difieren lo mismo que el ruido del build anterior contra sí mismo. La foto sigue siendo el LCP, con la precarga igual al `srcset`; el scroll suave, el ancla, el imán y el cierre funcionan, y no hay errores de consola.
  - **Dónde:** `components/Hero.jsx:55-64`, `ProjectCard.jsx:39-45` y `SkillsPage.jsx:39-43`.
  - **Problema:** son 5,6 KB gz, casi un tercio del JS propio de la home. `/trayectoria` también los baja, aunque no tiene imágenes. No se usa `placeholder` ni `onLoad`.
  - **Solución:** usar `getImageProps()` en los server components y un `<img>` común, y confirmar que se mantenga el preload de la foto.

- [x] **R-M16. Trabajo que corre de más: Lenis, Magnet y WaveText**
  - **Hecho:**
    - **Lenis** (`components/SmoothScroll.jsx`): sin `autoRaf`. Un `requestAnimationFrame` propio arranca con la rueda (el evento `virtual-scroll` de Lenis) o con un salto de `smoothScrollTo` (`lib/scroll.js` lo despierta), y para cuando Lenis termina (`isScrolling` deja de ser `"smooth"`). Lenis ve un reloj propio, que después de una pausa avanza un frame común: si viera la pausa como un solo frame, llegaría de golpe al destino. Y se importa con `import("lenis")` solo con puntero fino y sin reduce motion.
    - **Magnet:** un `IntersectionObserver` sobre la sección de las píldoras del cierre. Mientras no se ve, no se miden en cada movimiento del mouse. Se observa la sección y no cada píldora, porque "Copiar email" aparece recién al hidratar.
    - **WaveText:** escucha la actividad (mouse, scroll, teclado, foco) solo en horizontal; en vertical la franja no se ve.
  - **Antes y después**, en el build de producción:
    - **Cuadros pedidos en 2 s con la página quieta** (escritorio, las cuatro páginas): 120 → 0.
    - **JS en el celular:** home 145,2 → 140,6 KB gz, páginas propias 141,8 → 137,1 (ya no baja Lenis).
    - **JS en escritorio:** home 145,2 → 145,9 KB gz, páginas propias 141,8 → 142,4. Lenis quedó en un chunk aparte, de 5,3 KB gz, y eso cuesta unos 0,7 KB de más.
    - **`getBoundingClientRect` por movimiento del mouse sobre el hero:** 7,1 → 0.
  - **El scroll se siente igual.** Se midió `scrollY` en cada frame, en el build anterior y en el nuevo, a 1440×900, en claro y oscuro:
    - una rueda recién cargada, otra después de 1,5 s quieta y el gesto de costado del trackpad: el mismo recorrido, con 1px de diferencia como mucho (el mismo ruido que el build anterior contra sí mismo);
    - un ancla del nav: el mismo recorrido, pero empieza un frame antes (unos 16 ms), porque el bucle se despierta en el mismo clic. El build anterior también varía un frame de una corrida a otra.
  - **Verificado** con Puppeteer contra el build anterior, a 1440 y 390, en claro y oscuro, en las cuatro páginas: las capturas difieren lo mismo que el ruido. La foto sigue siendo el LCP con la precarga; el ancla, el imán de las píldoras, el cierre y la ola de la franja (a los 5 s quieta) funcionan, y no hay errores de consola.
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

- [x] **R-M17. El muro de Habilidades anima el color en el hilo principal** (sospecha)
  - **Se cierra sin cambios**, con el acuerdo de Fermin (2026-09-15): la traza dice que no vale la pena.
  - **Medición:** una traza de Chrome (Puppeteer, build de producción, 1440×900) mientras se recorre el tramo entero de la ola a 14px por frame (102 frames, como una rueda con Lenis), tres veces cada variante, en tres versiones: la actual, el muro sin animación (el control) y la propuesta (dos capas por palabra, animando solo la `opacity` de la llena).

    | Variante | CPU normal: hilo principal · Paint | CPU 4× más lenta: hilo principal · Paint | Frames de más de 20ms |
    |---|---|---|---|
    | Actual | 157 ms · 49,7 ms | 220 ms · 72,9 ms | 0 |
    | Sin animación | 163 ms · 15,2 ms | 165 ms · 18,2 ms | 0 |
    | Dos capas con `opacity` | 182 ms · 14,0 ms | 255 ms · 21,8 ms | 0 |

  - **Lectura:** la ola suma unos 35 ms de pintado en todo el recorrido con la CPU normal (0,3 ms por frame) y unos 55 ms con la CPU 4× más lenta (0,5 ms por frame), sobre los 16,7 ms que tiene cada frame, y ningún frame se atrasa. La propuesta pinta menos, pero el hilo principal trabaja más (la capa extra suma estilo y commit), así que no mejora.
  - **Dónde:** `styles/skills.css:114-155`.
  - **Problema:** son 27 animaciones de `color` y `-webkit-text-stroke-color`, que no pasan por el compositor, sobre texto de unos 80px mientras dura su tramo.
  - **Solución:** si una traza lo confirma, usar dos capas por palabra y animar solo la `opacity` de la capa llena.

- [x] **R-M18. El icono de GitHub se repite 12 veces en el HTML de la home**
  - **Se cierra sin cambios**, con el acuerdo de Fermin (2026-09-15): el ahorro es menor al 1%.
  - **Medición** sobre el HTML de la home en el build de producción (`cdb38f6`):
    - hoy el icono aparece 7 veces, no 12 (R-M10 cambió los enlaces de las tarjetas). Cada copia mide 1.399 bytes, pero gzip ya comprime la repetición: las 7 juntas pesan 835 bytes gz de 20,2 KB;
    - con un `<symbol>` y `<use href>`, el HTML baja 157 bytes gz (20.213 → 20.056), porque la definición del símbolo también pesa. Pasando todos los iconos a símbolos, 237 bytes (20.213 → 19.976).
  - Por menos del 1% del HTML no vale sumar el sprite, que además agrega un paso más a cada icono.
  - **Dónde:** `components/Icon.jsx`, `ProjectCard.jsx:10` y `:92`, y `Nav.jsx:79-88`.
  - **Problema:** son 1,6 KB de los 17,4 KB gz del HTML.
  - **Solución:** un `<symbol>` en `Document` y `<use href>` en `Icon`.

- [x] **R-M19. Lo de `public/` se revalida en cada visita**
  - **Hecho:** `headers()` en `next.config.mjs` suma dos reglas a las de seguridad:
    - `/icons/:path*` (Devicon): `public, max-age=31536000, immutable`. Si un icono cambia, va con otro nombre de archivo.
    - `/assets/:path*` (los CV, la foto y los logos): `public, max-age=86400, stale-while-revalidate=604800`, porque pueden cambiar.
  - **Antes y después**, con curl sobre `next start` (build aislado):
    - **Iconos:** `public, max-age=0` → `public, max-age=31536000, immutable`.
    - **CV y foto original:** `public, max-age=0` → `public, max-age=86400, stale-while-revalidate=604800`.
    - **Foto optimizada** (`/_next/image`), que hereda el `max-age` del original: `max-age=14400` → `max-age=86400`.
    - **En el preview de Vercel, antes:** `public, max-age=0, must-revalidate` en los iconos, los CV, la foto y el favicon. El favicon y el apple-icon quedan como están (Next y Vercel los sirven aparte).
    - **En el preview de Vercel, después del push** (`fedd73d`, 2026-09-15), con curl: los iconos salen con `public, max-age=31536000, immutable` (`x-vercel-cache: HIT`); los CV, la foto original y la optimizada (`/_next/image`), con `public, max-age=86400, stale-while-revalidate=604800`; la página sigue en `max-age=0, must-revalidate` (`PRERENDER`), y las cabeceras de seguridad no cambiaron.
  - **Verificado** con Puppeteer, contra el build anterior, a 1440 y 390, en claro y oscuro, en `/`, `/en`, `/trayectoria` y `/habilidades`: las capturas son iguales salvo el ruido de las transiciones del nav y de la franja; la foto sigue siendo el LCP, con la precarga; el scroll suave, el ancla a Contacto, el imán y el cierre funcionan, y no hay errores de consola.
  - **Dónde:** `next.config.mjs` (no tiene `headers()`).
  - **Problema:** los SVG de Devicon y los CV salen con `max-age=0`. Se midió en `next start`; en Vercel no se verificó.
  - **Solución:** `immutable` para `/icons/:path*` y un `max-age` con `stale-while-revalidate` para `/assets/:path*`.

- [x] **R-M20. La fuente mueve el layout en `/trayectoria`**
  - **Causa:** el párrafo de entrada (`.page__lead`) tenía `max-width: 52ch`. El `ch` sale del "0" de la fuente, y el de la de respaldo (Arial con `size-adjust`) es más angosto que el de Archivo: mientras cargaba, la caja medía 799px en vez de 834, el párrafo tenía 6 líneas en vez de 5 y todo lo de abajo subía 38px al llegar la fuente.
  - **Hecho:** en `styles/page.css`, los tres anchos en `ch` de las páginas propias pasan a `em`, con el mismo valor en Archivo (1ch = 0,5727em): `.page__lead` 29,78em, y `.chapter__desc` y `.skill-group__lead` 34,36em. Con la fuente cargada miden lo mismo que antes.
  - **Antes y después**, con Puppeteer y la fuente demorada 800ms (así se reproduce el 0,028 de Lighthouse), en claro y en oscuro:

    | Página | 1440×900 | 1024×768 | 390×844 |
    |---|---|---|---|
    | `/trayectoria` | 0,0245 → 0,0102 | 0,0225 → 0,0043 | 0 → 0 |
    | `/en/experience` | 0,0026 → 0,0026 | 0,0107 → 0,0107 | 0 → 0 |
    | `/habilidades` | 0 → 0 | 0,0001 → 0,0001 | 0 → 0 |

  - **Lo que queda** no se arregla con medidas: son los títulos de cada etapa, en Archivo al 68% de ancho. La fuente de respaldo no tiene ese ancho, así que un título puede ocupar dos líneas hasta que llega Archivo y bajar lo que sigue. Todo queda muy por debajo de 0,1, el límite de "bueno".
  - **Verificado** con Puppeteer contra el build anterior, a 1440 y 390, en claro y oscuro, en `/`, `/en`, `/trayectoria` y `/habilidades`: las capturas difieren lo mismo que el build anterior comparado consigo mismo (0,066% como mucho, las transiciones del nav y de la franja). La foto sigue siendo el LCP con la precarga; el scroll suave, el ancla, el imán y el cierre funcionan, y no hay errores de consola.
  - **Dónde:** Lighthouse, escritorio, primera visita: CLS de 0,028 en `ol.chapters`, causado por "Web font loaded".
  - **Solución:** revisar el ajuste de métricas de la fuente de respaldo con `wdth` angosto, o reservar el alto de los años.

### SEO, robustez y seguridad

- [x] **R-M21. Cualquier `/<algo>/opengraph-image` da 500, y no hay `global-error.js`** **[nav]**
  - **Hecho:**
    - `app/[lang]/opengraph-image.js` lleva `dynamicParams = false`, como la de las páginas propias: un idioma que no existe da el 404 global. `getT` no cambió: no hace falta que caiga en el idioma por defecto.
    - `app/global-error.js`, bilingüe como el 404 y con los textos que aprobó Fermin (2026-09-15): "ERROR" en Display, "Algo salió mal" / "Something went wrong", un párrafo, "Reintentar" (llama a `retry()`) y un botón a la home de cada idioma. Primero va el idioma de la URL (`/en…`, inglés), sigue el tema guardado o el del sistema, y arma su propio `<html>` con la fuente y los estilos.
    - Los textos están en `lib/error-text.js` y no en `translations.js`: Next carga `global-error` en todas las páginas, e importar el diccionario sumaba 5,9 KB gz al JS de cada una (medido en el build). Con el módulo aparte suma 1,4 KB gz.
  - **Verificado:**
    - **Rutas,** en `next start` sobre un build aislado: `/xx/opengraph-image`, `/habilidades/opengraph-image`, `/trayectoria/opengraph-image` y `/es/xx/opengraph-image` dan 404 con el 404 global; `/es/opengraph-image`, `/en/opengraph-image` y `/es/trayectoria/opengraph-image` siguen en 200. En `next dev` las inválidas muestran el 404 pero con estado 500: es cosa del modo dev.
    - **Error forzado** (un componente temporal que rompe al hidratar con `?boom`; no quedó en el repo), con Puppeteer en dev y en producción: `/` a 1440 en claro, `/en` a 1440 en oscuro, `/trayectoria` a 375 en oscuro y `/en/skills` a 375 en claro. En cada caso, el idioma, el `<title>`, el `theme-color`, los colores del tema, Archivo angosta en el título, 0 desborde y "Reintentar" funcionando. En producción, sin errores de consola.
  - **Dónde:** `app/[lang]/opengraph-image.js:16-18` y `lib/i18n.js:28-31`.
  - **Problema:** `/xx/opengraph-image` y `/habilidades/opengraph-image` responden 500 (verificado con curl) con la página de error de Next en inglés, porque `getT("xx")` rompe. Tampoco hay un `app/global-error.js` para los errores de cliente.
  - **Solución:** que `getT` caiga en el idioma por defecto (o que la ruta llame a `notFound()`), y crear un `global-error.js` bilingüe, como el 404.

- [x] **R-M22. No hay cabeceras de seguridad, salvo HSTS** **[nav]**
  - **Hecho:** `headers()` en `next.config.mjs`, para `/:path*`, con `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()` y la CSP mínima (`frame-ancestors 'none'; base-uri 'self'; object-src 'none'`). Además, `poweredByHeader: false`, que saca el `X-Powered-By: Next.js`. HSTS lo sigue poniendo Vercel.
  - **Verificado** en `next start` sobre un build aislado:
    - con curl, las cuatro cabeceras salen en `/`, `/en`, `/trayectoria`, `/en/opengraph-image`, `/assets/…`, `/icons/…`, `/sitemap.xml`, `/robots.txt`, un chunk de `/_next/static` y el 404; la redirección de `/es/trayectoria` sigue igual;
    - con Puppeteer, en `/`, `/en`, `/trayectoria`, `/en/skills` y el 404: sin errores de consola ni violaciones de CSP, con el script del tema, el JSON-LD, la fuente y las imágenes cargando;
    - la home dentro de un `<iframe>` de otro origen no se muestra.
  - **Verificado en Vercel** (preview de `c0f0de9`): las cuatro cabeceras salen en `/`, junto con el HSTS de Vercel y sin `X-Powered-By`.
  - **Solución:** un `headers()` con `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` y una CSP mínima: `frame-ancestors 'none'; base-uri 'self'; object-src 'none'`. Una CSP completa choca con los scripts inline de Next y del tema.

- [x] **R-M23. `SITE_URL` es frágil**
  - **Hecho** en `lib/site.js`: `||` en lugar de `??`, se le quita la barra final, y un build de producción que termina en localhost avisa en la consola (solo en el servidor; ningún componente de cliente importa `site.js`).
  - **Verificado:**
    - con `node` y las variables de entorno: vacía da localhost; `https://ferminlasarte.dev//` da `https://ferminlasarte.dev`; vacía con `VERCEL_PROJECT_PRODUCTION_URL` da la de Vercel; el aviso sale solo en producción y sin dominio;
    - con dos builds aislados: con `NEXT_PUBLIC_SITE_URL=""` el build termina (antes se rompía) y avisa (una vez por proceso, 9 en total); con `https://example.com/`, el canonical, `og:url`, `og:image`, el JSON-LD, el sitemap y robots no tienen ningún `//`.
  - **Dónde:** `lib/site.js:7-11`.
  - **Problema:**
    - Con `NEXT_PUBLIC_SITE_URL=""`, el build se rompe.
    - Con una barra final salen URLs con `//`.
    - Un build de producción fuera de Vercel publica `localhost` sin avisar.
  - **Solución:** usar `||` en lugar de `??`, quitar la barra final y avisar cuando el resultado sea localhost.

- [x] **R-M24. Sitemap: `lastModified` sale del build y falta `x-default`**
  - **Hecho:** `app/sitemap.js` ya no pone `lastModified`: no hay una fecha real por página, y la del build decía que todo cambiaba en cada deploy. Cada URL suma `x-default` a sus alternativas, con el mismo helper para la home y las páginas propias.
  - **Verificado** sobre el servidor local: `/sitemap.xml` es XML válido (`xmllint`), con 6 URLs, 0 `<lastmod>` y 6 `x-default`. Las alternativas de `/` y `/trayectoria` coinciden con los `hreflang` de su `<head>`.
  - **Dónde:** `app/sitemap.js:7-22`.
  - **Solución:** poner una fecha por página en los datos (o no poner ninguna) y sumar `x-default` como en el `<head>`.

- [x] **R-M25. El JSON-LD es solo `Person`, igual en todas las páginas, y la descripción en inglés es larga**
  - **Hecho:**
    - **Layout:** un `@graph` con `WebSite` y `Person`, cada uno con su `@id` (`LD_ID` en `lib/site.js`). `Person` suma `alumniOf` (UNICEN, con el nombre de `edu.unicen.company` en cada idioma), `homeLocation` (`PERSON.location`, que antes no se usaba; ver R-M29) y `knowsLanguage` (`PERSON.languages`: es, en y fr).
    - **La home** suma `ProfilePage`, con la persona como `mainEntity`, y **las páginas propias**, `BreadcrumbList` ("Inicio" › la página; `page.home`, "Inicio" / "Home").
    - `components/JsonLd.jsx` escapa el `<`, como indica la guía de Next.
    - **Descripciones:** no se tocaron, por decisión de Fermin (2026-09-15). Desde R-I7 miden 130 (ES) y 144 (EN) caracteres; los 177 eran de la frase anterior ("published on the App Store and Google Play").
  - **Verificado** sobre el servidor local, leyendo el JSON-LD de las 6 páginas: parsea bien, sin `<` sin escapar, con los `@id` que se referencian entre bloques y las migas en el idioma de cada página. El 404 no tiene JSON-LD. ES y EN tienen las mismas 109 claves. El `<script>` dentro de `<main>` no mueve nada: contra el build anterior, el alto del documento y las cajas de los paneles y títulos son idénticos (home a 1440, 375 y 1024; `/trayectoria` y `/en/skills`).
  - **Dónde:** `app/[lang]/layout.js:66-85` y `lib/translations.js:7` y `:151`.
  - **Problema:**
    - Faltan `ProfilePage` y `WebSite`, y `BreadcrumbList` en las páginas propias.
    - A `Person` le faltan `alumniOf`, `homeLocation` y `knowsLanguage`.
    - La descripción en EN mide 177 caracteres y se corta en los buscadores.
  - **Solución:** agregar esos tipos y campos, y dejar las descripciones en unos 155 caracteres.

- [x] **R-M26. `/favicon.ico` da 404 y devuelve la página entera del 404 (18,7 KB)**
  - **Hecho:**
    - `public/favicon.ico` con tres PNG (16, 32 y 48px) dentro, dibujados desde `favicon.svg` con Chrome (Puppeteer; no hay ImageMagick). Pesa 1,5 KB.
    - Por decisión de Fermin (2026-09-15, opción b), el favicon pasó del violeta viejo (`#5B5BD6`) al acento (`#6224F0`, `--accent` del tema claro), el mismo de los botones. Con eso también se regeneró `public/apple-icon.png`, que sale del favicon: 180×180, opaco y sin esquinas.
    - El `<head>` no cambió: sigue enlazando el SVG y el apple-icon (`ICONS`); el `.ico` es para quien lo pide por su cuenta.
  - **Verificado** sobre el servidor local: `/favicon.ico` da 200, `image/x-icon`, 1.512 bytes (`file` lo reconoce como icono con 3 imágenes); `/apple-icon.png` da 200 (180×180, RGB opaco) y `/favicon.svg` también. Los dos PNG se revisaron a la vista. `#5B5BD6` ya no aparece en el repo.
  - **Solución:** agregar un `public/favicon.ico` de 32×32.

- [x] **R-M27. Detalles de robustez** **[nav]**
  - **Hecho:**
    - **Años:** `revalidate = 86400` en `app/[lang]/layout.js`. Las 6 páginas se regeneran como máximo una vez por día (ISR), así el © y el "en curso" cambian solos al pasar de año, sin JS en el cliente.
    - **Tema:** sin un tema guardado, el script del tema (`lib/theme.js`) escucha el cambio del sistema y actualiza la clase, el `theme-color` y, con ellos, `aria-pressed`. Desde que se usa el botón, manda lo guardado. `global-error` hace lo mismo. DISENO.md, sección 2 y tabla de la 8.
    - **Imagen OG:** `lib/og.js` pasa el PNG de `next/og` a JPEG con `sharp` (dependencia opcional de `next`, ya en el lockfile): calidad 85, mozjpeg y color sin submuestrear (4:4:4). `contentType` es `image/jpeg` en las dos rutas. El diseño no cambió.
  - **Verificado:**
    - **Años,** en un build aislado: las 6 páginas figuran con 86.400 s en el `prerender-manifest`, y `next start` manda `s-maxage=86400, stale-while-revalidate`. Con un build temporal a 5 s (solo en la copia), el pedido que llega después sale como `STALE`, la página se regenera (el HTML guardado se reescribió) y el siguiente es `HIT`.
    - **Tema,** con Puppeteer en `/trayectoria`, cambiando `prefers-color-scheme` con la página abierta: sin tema guardado, sigue al sistema en los dos sentidos (clase, `theme-color`, fondo y `aria-pressed`); después de usar el botón, ya no; con "light" guardado, no se mueve.
    - **Imagen OG:** las 6 pasan de unos 380 KB a entre 50 y 61 KB, en dev y prerenderizadas en el build. El `<head>` dice `og:image:type` `image/jpeg`. El texto violeta chico, comparado recortado contra el PNG, no cambia a la vista.
  - **Verificado en Vercel** (preview de `c0f0de9`): la home sale de la caché de Vercel (`x-vercel-cache: HIT`) y `/trayectoria`, prerenderizada (`PRERENDER`); al navegador le manda `max-age=0`, porque la revalidación la maneja Vercel. Las imágenes OG son `image/jpeg` de 51 a 61 KB, y `/xx/opengraph-image` y `/habilidades/opengraph-image` dan 404.
  - **Queda:**
    - Que Fermin comparta el enlace del preview por WhatsApp y confirme que aparece la imagen.
    - El 404 global (`/_not-found`) no revalida: su © queda con el año del último deploy.
  - **Años:** el © y el "en curso" quedan con el año del build (`Strip.jsx:12`, `Footer.jsx:9`, `Preloader.jsx:43` y `ExperiencePage.jsx:14`).
  - **Tema:** si no hay tema guardado, la página no sigue al sistema cuando cambia con la página abierta (`lib/theme.js`).
  - **Imagen OG:** pesa 394 KB, y WhatsApp podría no mostrarla si pasa de unos 300 KB (sospecha: probarlo compartiendo el enlace).

### Código muerto y coherencia

- [x] **R-M28. Tokens sin uso y restos de diseños anteriores**
  - **Hecho:** se borraron `--on-accent-muted` (en los dos temas), `--fs-mega`, `--radius-0` y `--z-track` de `styles/tokens.css`; `--radius-device` queda, con un comentario (reservado para I12). También se fueron el `--focus` y la regla `.strip a` de la franja (ya no tiene enlaces desde que el CV pasó al hero), el `--line` del nav en horizontal (solo lo usa el borde del menú móvil, que en horizontal no se muestra) y el `--cursor-ink` de `.contact` (el cursor no está dentro de contacto; su color sobre el cierre lo pone `data-tone`). Lo que DISENO.md dice de esos tokens se corrige en R-M37.
  - **Verificado** contra el build anterior, con Puppeteer, en `/`, `/en`, `/trayectoria` y `/habilidades`, a 1440 y 390, en claro y oscuro: 0% de píxeles distintos en todas las vistas, salvo la home a 1440 (0,064% a 0,067%, lo mismo que el ruido de fondo medido en eficiencia, 0,066%). La foto sigue siendo el LCP con su precarga; el scroll suave, la ola, el ancla a Contacto, el cierre y el imán funcionan, sin errores de consola.
  - **Dónde:**
    - Tokens: `styles/tokens.css:16` y `:117` (`--on-accent-muted`), `:52` (`--fs-mega`), `:57` (`--radius-0`), `:59` (`--radius-device`, reservado para I12) y `:77` (`--z-track`).
    - Restos del CV en la franja: `styles/track.css:118` (`--focus`) y `:134-136` (`.strip a`).
    - `styles/nav.css:250`: el `--line` del nav, que en horizontal no pinta nada.
    - `styles/contact.css:67`: `--cursor-ink`, sin efecto; el cursor cambia con `data-tone`.
  - **Solución:** borrarlos y dejar `--radius-device` con un comentario.

- [x] **R-M29. Datos, claves y props sin uso**
  - **Hecho:**
    - **Borrados:**
      - la clave `projects.screenshotAlt`, en ES y EN;
      - `PERSON.firstName`;
      - los `label` de `CV` y de `EXPERIENCE`; el de `EDUCATION` sí se usa ("UNICEN" en la etapa) y queda documentado;
      - el prop `title` de `Icon`, que ahora es siempre decorativo;
      - `.strip` en el `inert` del menú, porque ya está dentro de `main`;
      - `reactStrictMode: true`, que en el App Router ya es el valor por defecto (guía de Next, `reactStrictMode.md`);
      - el `notFound()` inalcanzable de `app/[lang]/[page]/page.js`, porque con `dynamicParams = false` solo llegan los slugs conocidos.
    - **"Buenos Aires" sale del dato** (decidido por Fermin, 2026-09-15): `PERSON` guarda `city` y `country` por separado; la franja dice `fill(t("strip.credit"), { city })` ("Hecho a mano en {city}") y el `homeLocation` del JSON-LD arma "Buenos Aires, Argentina" con los dos.
  - **Verificado** contra el build anterior:
    - Capturas en las 16 combinaciones de siempre: 0%, salvo la home a 1440, dentro del ruido (0,065% a 0,068%).
    - El JSON-LD (`homeLocation`) y el crédito de la franja dan el mismo texto en `/` y `/en`.
    - `/trayectoria/xx`, `/en/experience/xx` y `/xx` siguen dando 404.
    - El menú móvil deja inertes el enlace de salto, el nombre, `main` (con la franja adentro) y el pie, igual que antes, y Escape devuelve el foco al botón.
    - La foto sigue siendo el LCP; el scroll suave, la ola, el ancla, el cierre y el imán funcionan; no hay errores de consola y el lint da 0.
  - **Dónde y problema:**
    - `projects.screenshotAlt` (`translations.js:93` y `:237`);
    - `PERSON.firstName` y `PERSON.location` (`site.js:15-16`); "Buenos Aires" está escrito a mano en `strip.credit`. Desde R-M25, `PERSON.location` se usa en el `homeLocation` del JSON-LD;
    - `CV[].label` y `EXPERIENCE[].label` (`site.js:55-56` y `:237-238`);
    - el prop `title` de `Icon`, que viaja en el JS del cliente;
    - `.strip` en el `inert` del menú (`Nav.jsx:50`), cuando ya está dentro de `main`;
    - `reactStrictMode: true`, que ya es el valor por defecto;
    - el `notFound()` inalcanzable en `app/[lang]/[page]/page.js:62`.
  - **Solución:** borrarlos, o usar `PERSON.location` en el crédito.

- [x] **R-M30. Lógica y CSS duplicados**
  - **Hecho:**
    - **En `lib/`:**
      - `lib/text.js` (nuevo): `twoDigits`, que usan Trayectoria y su página, y `wordStarts`, el `starts` del hero y el del preloader.
      - `lib/site.js` suma `STAGES`, las etapas con años con su `kind` (cada vista las ordena y arma sus textos); `EDUCATION_NOTES`, los idiomas; y `EXTERNAL`, que usan `Contact` y `ProjectCard`.
      - `lib/i18n.js` suma `shareMeta(lang, { url, title, description })`: los bloques `openGraph` y `twitter`, que el layout y `[page]` repetían.
    - **CSS, en `base.css`:**
      - `.display, .poster, .years` comparten el peso, el ancho y las mayúsculas. `.poster` es el título de proyecto y de capítulo (la placa tipográfica, `.card__title` y `.chapter__title`), que ahora solo ponen su tamaño y su interlineado.
      - `.years` y `.years__end` reúnen `.stage__years` y `.chapter__years`, con `var(--stroke, var(--ink))` para el acento de la etapa más reciente.
      - `.lead` reúne `.skills__lead` y `.trajectory__intro`, que conservan su ancho.
      - `forced-colors.css` usa los selectores nuevos. Las clases viejas quedan donde las usan los cortes de pantalla y `TrackController`.
  - **Verificado:**
    - **Contra el build de R-M34 (`8a5e34f`),** con toda la pista: 0% en todas las vistas, salvo la home y `/en` a 1440, que dan 0,059% a 0,071%, dentro del ruido.
    - **Con colores forzados emulados,** en `/` y `/trayectoria`, en claro y oscuro: 0%, con los contornos en el color del sistema.
    - **Las 22 etiquetas `og:` y `twitter:`** de `/`, `/en`, `/trayectoria` y `/en/skills` son idénticas.
    - La foto sigue siendo el LCP; el scroll suave, la ola, el ancla, el cierre y el imán funcionan, sin errores de consola, y el lint da 0.
  - **Dónde:**
    - `twoDigits` y el armado de etapas (`Trajectory.jsx` y `ExperiencePage.jsx`);
    - `EXTERNAL` (`Contact.jsx` y `ProjectCard.jsx`);
    - los bloques `openGraph` y `twitter` (layout y `[page]`);
    - `starts` (`Hero.jsx` y `Preloader.jsx`);
    - los años grandes (`.stage__years` y `.chapter__years`);
    - el estilo de título de proyecto, repetido tres veces;
    - `.skills__lead` y `.trajectory__intro`.
  - **Solución:** helpers en `lib/` y clases compartidas (`.years`, `.lead`).

- [x] **R-M31. La media query horizontal está copiada 10 veces y hay tres criterios de "puntero fino"**
  - **Hecho** (decidido por Fermin, 2026-09-15: las dos cosas, en chico):
    - **`scripts/check.mjs`,** sin dependencias, corre en `prebuild`: `npm run build` lo corre antes de `next build`, también en Vercel, y se puede correr solo con `npm run check`. Controla tres cosas y, si algo no coincide, detiene el build con el archivo, la línea y lo que esperaba:
      - que cada `@media` con el ancho del modo horizontal y el puntero fino en `styles/*.css` sea igual a `HORIZONTAL_QUERY` (hoy, 9 copias);
      - que ES y EN tengan las mismas claves (hoy, 108);
      - que los 4 colores de `lib/og.js` y los 2 de `THEME_COLORS` (`lib/theme.js`) sean iguales a sus tokens.
    - **`lib/media.js`:** `FINE_POINTER`, `HOVER_POINTER`, `REDUCED_MOTION` y `MOTION_OK` reemplazan las consultas escritas a mano en SmoothScroll, Cursor, Magnet, DraggablePhoto, WaveText, TrackController, `lib/scroll.js` y el script del tema.
    - **Los criterios siguen siendo tres,** a propósito, y el comentario de `lib/media.js` explica por qué: el puntero fino decide el modo horizontal y el scroll suave; con hover además, el cursor y el imán; `pointerType === "mouse"` se mira en cada evento. Unificarlos cambiaría qué pasa en una portátil táctil.
    - **Queda descartada la alternativa de fondo** (una clase `html.h` que ponga el script del tema), porque tocaba todas las hojas.
  - **Verificado:**
    - `node scripts/check.mjs` pasa sobre el repo. En una copia con tres errores a propósito (una copia con `min-height: 40rem`, una clave borrada en inglés y un color de la OG cambiado), falla con los tres mensajes y sale con código 1.
    - `npm run build` corre el control antes de compilar.
    - Contra el build de R-M32 (`46e48ba`):
      - capturas en el ruido (≤ 0,071%);
      - el script del tema idéntico en el HTML (1606 caracteres);
      - en cuatro casos, lo que se activa es igual en los dos: horizontal, Lenis, cursor propio e imán con mouse a 1440, y nada de eso con reduce motion, a 390 táctil ni a 1024×768 táctil;
      - la foto sigue siendo el LCP, el scroll suave, la ola, el ancla, el cierre y el imán funcionan, sin errores de consola, y el lint da 0.
  - **Dónde:**
    - Las 9 hojas de CSS y `lib/track.js:4-5`. El comentario de `track.js` solo nombra `track.css`.
    - Los tres criterios: `(pointer: fine)` en `track.js` y `SmoothScroll`; `(hover: hover) and (pointer: fine)` en `Cursor` y `Magnet`; `pointerType === "mouse"` en otros tres lugares.
    - Reduce motion escrito a mano en 8 lugares.
  - **Problema:** hoy las copias son idénticas, pero nada lo verifica. El umbral ya cambió una vez.
  - **Solución:**
    - Un `scripts/check.mjs` en `prebuild` que compare las copias, las claves ES/EN y los colores de la imagen OG con los tokens.
    - Constantes `FINE_POINTER` y `REDUCED_MOTION` en `lib/`.
    - Como alternativa de fondo: una clase `html.h` que ponga el script del tema.

- [x] **R-M32. Valores escritos a mano, cuando `tokens.css` dice que todo sale de ahí**
  - **Hecho** (decidido por Fermin, 2026-09-15: las dos cosas):
    - **Tokens nuevos para lo que se repite:**
      - `--ease-in`, la curva de las salidas (el nombre del nav y dos del preloader);
      - `--dur-reveal` (1100ms), las entradas de los paneles y de las páginas propias;
      - `--dur-fill` (500ms), `--dur-fill-out` (400ms) y `--dur-jump` (350ms): el relleno y el salto del texto de los botones;
      - `--radius-round` (50%), en los siete círculos;
      - `--z-below` (−1), el relleno de los botones, y `--z-lift` (1), la foto mientras se arrastra.
    - **En `DraggablePhoto`:** la vuelta usa `translate var(--dur-enter) var(--ease-expo)` y la estela lee `--ease-out` del CSS (la Web Animations API no acepta `var()`). Los 400ms de la estela pasan a una constante con nombre.
    - **La frase de `tokens.css` y de DISENO 9.4 se suavizó:** todo lo que se repite es un token. Las coreografías de un solo uso (el preloader, la ola, el nombre del nav y el menú) y los tamaños de un solo lugar llevan sus valores en su hoja, con un comentario, y los pesos se escriben directo. La sección 4 de DISENO (esquinas y capas) se pone al día en R-M37.
  - **Verificado** contra el build de R-M30 (`24b4034`):
    - Capturas: 0% o ruido (≤ 0,071%) en las 16 combinaciones, con toda la pista.
    - Valores calculados iguales en los dos, en 12 casos:
      - el relleno de los botones en reposo (0,5s), saliendo (0,4s) y el salto del texto con el mouse encima y al salir (0,35s);
      - la capa −1 y los círculos al 50% (cursor, etapas, tabla);
      - las entradas de la home y de `/habilidades` (1,1s, con 0,12s de retraso en el título).
    - La foto sigue volviendo a los 700ms al cambiar la ventana; la foto sigue siendo el LCP; el scroll suave, la ola, el ancla, el cierre y el imán funcionan, sin errores de consola, y el lint da 0.
  - **Dónde:**
    - **Duraciones:** 500, 400 y 350ms en `base.css`; 1100ms repetido en `motion.css` y `page.css`; todo `preloader.css`.
    - **Curvas:** `cubic-bezier(0.55, 0, 1, 0.45)` tres veces.
    - **Radios y capas:** `border-radius: 50%` en 7 lugares y `z-index: -1` en `base.css:171`.
    - **Tipografía:** 5 tamaños de letra sueltos y el peso 650.
    - **En el JS:** `DraggablePhoto.jsx:74` y `:102` copian curvas y duraciones.
  - **Solución:** sumar `--ease-in`, `--dur-reveal`, `--dur-fill` y `--radius-round` y usarlos. Si no, suavizar la frase de `tokens.css` y de DISENO 9.4.

- [x] **R-M33. Tres cosas que se comportan distinto de lo documentado**
  - **Hecho:**
    - **La foto** (decidido por Fermin, 2026-09-15: con animación, como dice DISENO 7.9): al cambiar el tamaño de la ventana, `DraggablePhoto` llama a `goHome`, la misma vuelta de 700ms con `--ease-expo` que cuando entra el foco del teclado. Si se está arrastrando, no hace nada. Con reduce motion sigue volviendo sin animación.
    - **El imán:** los 420ms de `Magnet.jsx` son a propósito, los 400ms de la salida del relleno (`.btn.is-out`) más 20 de margen para que no se corte. Se corrigió el comentario, que decía que eran el mismo valor.
    - **Colores forzados:** el tachado (`.strike::after`) es un fondo y el sistema lo pintaba con el color del fondo. Ahora va con `forced-color-adjust: none` y `LinkText` (`styles/forced-colors.css`). Lo demás que dice R-I8 (el riel de la barra de progreso) sigue como limitación documentada.
  - **Verificado** con Puppeteer contra el build anterior:
    - **La foto,** a 1440: se arrastró a (−150px, 20px) y se cambió la ventana a 1300×900 (sigue en horizontal). Antes, a los 120ms ya estaba en 0, sin transición. Ahora, a los 120ms va por (−40px, 5px), con `translate 700ms`, y al segundo está en 0.
    - **El tachado con colores forzados emulados** (CDP), en claro y oscuro, con el mouse encima: antes el `::after` salía blanco sobre blanco (o negro sobre negro); ahora sale del color de los enlaces (`rgb(0, 0, 159)` y amarillo). En "Ver el proyecto" de `/trayectoria` la fila del medio queda cubierta al 100%, contra el 58% de antes, que es solo el texto.
    - Sin colores forzados no cambia nada: las capturas de las 16 combinaciones dan 0%, salvo la home a 1440, dentro del ruido (0,065% a 0,067%). La foto sigue siendo el LCP; el scroll suave, la ola, el ancla, el cierre y el imán funcionan, sin errores de consola.
  - **Nuevo (N10), sin confirmar:** en las capturas sin ventana, el tachado de los enlaces del nav en horizontal queda dibujado hasta la mitad ("Trayec" de "Trayectoria"), aunque el estilo calculado dice `scale: 1`; con la transición apagada, la línea es completa. Pasa igual en el build anterior, así que no viene de este cambio. En "Ver el proyecto", que está en la página y no en el nav fijo, la línea sale completa. Una ventana visible de Chrome no sirvió para medirlo. Falta mirarlo a ojo, pasando el mouse por el nav.
  - **N10 cerrado (2026-09-15):** Fermin lo miró en el preview de la rama (`518b560`) y el tachado del nav cruza la palabra entera. Era un efecto de las capturas sin ventana, no del sitio.
  - La foto vuelve a su lugar sin animación cuando cambia el tamaño de la ventana (`DraggablePhoto.jsx:162-168`); DISENO dice 700ms.
  - `Magnet.jsx:10` espera 420ms, pero la transición dura 400ms (`base.css:220`), y el comentario dice que son el mismo valor.
  - En colores forzados, el `.strike` y otros detalles no tienen un estilo propio (ver R-I8).

- [x] **R-M34. Diferencias de copia entre ES y EN**
  - **Hecho** (copia aprobada por Fermin, 2026-09-15; también decidió sacar la frase del producto):
    - **EN:**
      - `contact.back` pasa a "Back to top": lleva arriba de la misma página. Los otros dos llevan a otra página y quedan "Back to home".
      - "View Projects" pasa a "View projects", y "Databases & Cloud", a "Databases and cloud".
    - **ES:**
      - "de esta página" pasa a "de este sitio" (`skills.pageLead` y `skills.matrixLead`), y "end-to-end", a "de punta a punta" (`exp.intro`).
      - "mobile" pasa a "móvil" en el texto (`exp.lead` y los roles) y en el grupo "Móvil"; el grupo también es el nombre de la fila del muro en la home. "Backend" con mayúscula ya se había arreglado con R-I7.
    - **Etapas:** `exp.*.company` es solo el nombre ("TravelPic", "DeporTurnos"), que es el título de la etapa, y `exp.*.title` es el rol: "Desarrollador móvil freelance" / "Freelance mobile developer" y "Creador y desarrollador móvil" / "Founder and mobile developer". "Argentina" pasó a `EXPERIENCE[].where`, así que ya no hay `split(" | ")` y en la home no se repite "Desarrollador".
    - **Tipografía:** comillas tipográficas en `exp.travelpic.desc` (“Uber para fotógrafos”) y apóstrofos tipográficos en EN (Let’s, you’re, doesn’t, Lasarte’s). Las fechas en texto van con raya, igual que los años grandes: "2021–2025".
    - **Sin la frase** "Mentalidad orientada al producto en entornos de alto crecimiento" (ni "Product-oriented mindset…" en EN).
  - **Antes y después** (texto sacado del HTML del build anterior y del nuevo):
    - Home ES: "Ideólogo y creador de DeporTurnos" / "Desarrollador mobile independiente" pasa a "DeporTurnos" / "Creador y desarrollador móvil"; "Desarrollador de TravelPic" / "Desarrollador mobile freelance" pasa a "TravelPic" / "Desarrollador móvil freelance"; "Experiencia · 2021-2025" pasa a "Experiencia · 2021–2025".
    - `/en/experience`: "Founder & Developer of DeporTurnos" / "Independent Mobile Developer · Argentina" pasa a "DeporTurnos" / "Founder and mobile developer · Argentina".
  - **Verificado:**
    - Capturas contra el build anterior: cambian solo las vistas con esos textos. La home a 1440 da hasta 0,97% en el panel de Trayectoria. A 390, las etapas son más cortas y todo lo de abajo sube, así que la comparación por píxel da hasta 47%.
    - Desbordes: 0 en `/`, `/en`, `/trayectoria`, `/en/experience`, `/habilidades` y `/en/skills`, a 1440×900 y 1024×768 (horizontal; nada se sale de su panel) y a 390 (vertical).
    - La foto sigue siendo el LCP; el scroll suave, la ola, el ancla, el cierre y el imán funcionan, sin errores de consola.
  - **Herramienta:** al revisar esto apareció un error en la comparación de capturas de esta ronda. En horizontal buscaba los paneles por id, con "trayectoria" en vez de "experiencia", así que el panel de Trayectoria a 1440 no se había comparado. Ahora recorre toda la pista de pantalla en pantalla. Se volvió a comparar el HEAD con R-M28, R-M29 y R-M33 (`fa69000`) contra el build anterior, con toda la pista: 0% o dentro del ruido. Una vista de `/en` a 1440 en claro dio 22,5% la primera vez: las dos capturas habían quedado en posiciones distintas de la pista. Repetida dos veces, dio 0,059% y 0,045%.
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

- [x] **R-M35. El lint: N5 pasa solo por casualidad y no detecta variables sin usar**
  - **Hecho:** `eslint.config.mjs` suma `.claude/**` a `globalIgnores` y `"no-unused-vars": "warn"`; el `catch (e)` de `toggleTheme` (`lib/theme.js`) pasa a `catch {}`. Los `catch (e)` del script del tema quedan: están dentro de un texto, el lint no los ve.
  - **Antes y después:** con la regla prendida sobre la configuración vieja, `npx eslint .` daba 1 aviso (`lib/theme.js:67`, `'e' is defined but never used`) y `--print-config` sobre `.claude/worktrees/` devolvía una configuración. Ahora `npx eslint .` y `npx eslint app components lib` dan 0 problemas y `--print-config` devuelve `undefined` (archivo ignorado). N5 queda cerrado.
  - **Dónde:** `eslint.config.mjs:7-8`.
  - **Problema:**
    - `npx eslint .` da 0 errores solo porque `.claude/worktrees/` quedó vacía: `--print-config` muestra que esa carpeta todavía no se ignora.
    - `core-web-vitals` no activa `no-unused-vars`. Con la regla prendida, solo aparece `lib/theme.js:36` (un `catch (e)`).
  - **Solución:** sumar `.claude/**` a `globalIgnores`, agregar `"no-unused-vars": "warn"` y cambiar ese `catch (e)` por `catch {}`.

- [x] **R-M36. El README describe el diseño anterior y hay comentarios viejos**
  - **Hecho:**
    - **El README** describe el diseño actual (la tira de pantallas, con enlaces a `docs/DISENO.md` y `docs/AUDITORIA.md`). El Stack nombra `styles/`, la pista en CSS con su respaldo en JS, Lenis, Archivo con `next/font/local`, las páginas propias y el tema que sigue al sistema. Los Scripts suman `npm run check` y el control antes del build, y la Estructura suma `app/[lang]/[page]`, `global-error.js`, `styles/`, `scripts/`, `docs/` y los módulos nuevos de `lib/` (`pages.mjs`, `track.js`, `media.js`, `scroll.js`, `fonts.js`, `og.js`, `text.js`…).
    - **Comentarios:**
      - `SkillsPage.jsx`: "muro de palabras" en vez de "marquesina";
      - `motion.css`: `.rv--grow` es solo la línea del cierre, porque las barras del eje ya no existen;
      - `site.js`: `OTHER_SKILLS` también va en "También" de `/habilidades`; el comentario de `label` ya se había corregido en R-M29;
      - `global-not-found.js`: "probado en 15.5 y 16.3" en vez de "Next 15";
      - `scripts/strip-metadata.mjs`: nombra WebP, que ya limpiaba;
      - `lib/scroll.js`: "Volver al inicio".
  - **Verificado** contra el build de R-M31 (`c544f73`): capturas en el ruido (≤ 0,071%), la foto sigue siendo el LCP, el scroll suave, la ola, el ancla, el cierre y el imán funcionan, sin errores de consola; el lint y `scripts/check.mjs` pasan.
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

- [x] **R-M37. DISENO.md quedó desactualizado**
  - **Hecho:** DISENO.md queda en su versión final, en un solo commit. Cada punto de abajo se confirmó contra el código (`c20c6bc`) antes de corregirlo.
    - Además de lo listado, entró lo que cambió la limpieza:
      - los tokens nuevos de R-M32 (secciones 4 y 8) y los borrados de R-M28;
      - las clases `.display`, `.poster`, `.years` y `.lead` (R-M30, sección 3);
      - `lib/media.js` y `scripts/check.mjs` (R-M31, secciones 2 y 6.2);
      - el imán de 420ms y el tachado con colores forzados (R-M33, 7.6 y 9.7);
      - los títulos de etapa y las cifras (R-M34, 7.3 y 7.4);
      - el crédito con `PERSON.city` (R-M29, 7.1).
    - **`--wdth-mega` queda** (decidido por Fermin, 2026-09-15): R-M37 no lo nombraba, pero todavía lo usan los números de la entrada de Proyectos. Se documentó como la fila "Cifras" de la sección 3, con una nota sobre el nombre.
    - **Fuera de DISENO:** el comentario de `lib/scroll.js` también atribuía la curva a douglus. Se corrigió en un commit aparte (`c20c6bc`).
  - **Descartados, porque ya no aplicaban:**
    - 6.1, "Buscar en la página funciona como siempre": ya se había corregido con R-M11.
    - 7.6, el imán del 50%: 7.6 ya lo decía; faltaba solo en la tabla de la sección 8, y ahí se agregó.
    - 7.9, la foto que vuelve sin animación: desde R-M33 el código vuelve con animación, como decía DISENO.
    - 7.10, "en vertical, las anclas no pasan por Lenis": desde R-M12 sí pasan.
    - Tabla de la sección 8, el tachado con reduce motion: R-M6 lo arregló, y la tabla ya decía lo correcto.
    - 9.4: ya se había reescrito con R-M32.
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

- [x] **R-M38. Textos viejos en esta misma auditoría**
  - **Hecho:** una nota con fecha en cada texto, sin cambiar lo que decía: I4 (el "8" sin "+"), I7 (la medición de la paleta vieja y el contacto sin texto secundario), I15 (el CV fuera de la franja) e I16 (la imagen OG sin cobalto y el título del 404 sin "—"). Con el mismo criterio se anotaron tres lugares de esta re-auditoría que se leían como estado actual: los criterios 4, 5 y 7 de "Criterios del rediseño, verificados" y N5 en "Pendientes anteriores".
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
| 4 | Tokens | Cumple en color, parcial en el resto | Todos los colores son tokens (las placas de marca y la imagen OG son excepciones documentadas). Hay duraciones, curvas, radios, un `z-index` y tamaños escritos a mano, y 5 tokens sin uso (R-M28, R-M32). *(Nota, R-M38: resuelto con R-M28 y R-M32. Lo que se repite es un token, y los tokens sin uso se borraron, salvo `--radius-device`, reservado para I12.)* |
| 5 | Assets | Cumple | `next/image` para la foto, los logos y Devicon; iconos SVG inline; un solo CSS propio de 8,4 KB gz y nada externo. La fuente pesa 90 KB (R-M14). *(Nota, R-M38: con R-M14 la fuente bajó a 55,6 KB, y el CSS a 8,5 KB gz después de la paleta.)* |
| 6 | Proyectos | Parcial | Los enlaces directos y los datos salen de `PROJECTS`. Faltan capturas reales: 6 de las 8 placas son tipográficas y 2 muestran el logo (I12). |
| 7 | Accesibilidad | Parcial | Cumple: `<main>` y enlace de salto; `:focus-visible` de 2px con 3px de separación en todos los focos recorridos; axe sin violaciones a 375px y en las páginas verticales a 1440, en los dos temas; zonas táctiles de 44px o más; niveles en texto en `/habilidades`. Fallan R-I3, R-I4, R-I8, R-M1, R-M2 y R-M4. **[nav]** *(Nota, R-M38: después se arreglaron R-I4, R-I8, R-M1, R-M2 y R-M4; R-I3 se dejó como está, por decisión de Fermin.)* |

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
- **N5:** sigue abierto en la configuración (R-M35). *(Nota, R-M38: cerrado con R-M35.)*
- **N6:** fuera de la auditoría, por decisión de Fermin.
- **N7:** hecho (tabla de arriba y Lighthouse).
- **N8:** medido; pasó a R-I3, que Fermin decidió dejar como está. El texto en contorno se lee bien sobre el papel y sobre el oscuro (los años de Trayectoria y las intermedias del muro, con 1px de `--ink`), pero en colores forzados pierde el contorno (R-I8).
