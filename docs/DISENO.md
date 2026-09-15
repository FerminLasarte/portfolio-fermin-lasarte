# Diseño del portfolio (Fase 3)

- **Fecha:** 2026-09-14
- **Estado:** aprobado por Fermin el 2026-09-14 e implementado en la rama `fase-3-rediseno`, un commit por paso (sección 10). Donde la implementación se apartó del brief, este documento ya lo dice.
- **Fuentes, en orden de prioridad:** los "Criterios del rediseño" de `docs/AUDITORIA.md`; [douglus.site](https://douglus.site) (navegación horizontal y sus animaciones); las skills `design-taste-frontend`, `impeccable` y `emil-design-eng`. Si dos fuentes chocan, manda la de más arriba.
- **Cómo se analizó douglus.site:** en el panel del navegador a 1440×900 (modo horizontal) y a 390×844 (modo vertical), leyendo el DOM, su CSS y su JS publicado. Los datos concretos están en el anexo A.

## 1. Dirección visual

**Lectura del brief:** portfolio de un desarrollador mobile para reclutadores y clientes, con el lenguaje de un afiche suizo: tipografía grotesca muy grande, fondo liso, un solo color de acento, y un recorrido horizontal como el de douglus en PC.

**Diales** (`design-taste-frontend`): `DESIGN_VARIANCE 7` · `MOTION_INTENSITY 6` · `VISUAL_DENSITY 3`. El preset de portfolio de desarrollador es 6/5/4; se sube la variación y el movimiento porque la navegación horizontal es la pieza central, y se baja la densidad porque cada panel muestra una sola cosa.

**Idea: una tira de pantallas.** Un desarrollador mobile trabaja con pantallas puestas una al lado de la otra: el storyboard de Xcode, un flujo en Figma, las páginas de la pantalla de inicio del iPhone. La web se recorre igual: cada sección es un panel del alto de la ventana, puesto al lado del anterior, y el scroll vertical los pasa de costado. Lo que se queda en la memoria es el nombre enorme, abajo a la izquierda, y la sensación de estar pasando pantallas.

**Qué la hace propia (y no una copia de douglus):**

| | douglus.site | Este portfolio |
|---|---|---|
| Fondo y acento | Crema `#fefff8` con naranja `rgb(255,100,50)` | Papel frío `#F1F2EE` con cobalto `#1D3FD8` (y tema oscuro) |
| Tipografía | Neue Montreal y FK Screamer (comerciales) | Archivo variable: angosta y pesada para los títulos, ancho normal para el texto |
| Scroll | Lenis intercepta la rueda; el `body` tiene `overflow: hidden` | Scroll nativo del documento; `sticky` más `translate` atado al scroll |
| Proyectos | Capturas en marcos de escritorio | Placas del color de cada app, con capturas verticales de teléfono |
| Cierre | Panel con degradado y nombre gigante | Panel de contacto lleno de cobalto, con el email como botón principal |

**Qué se toma de douglus y qué no:**

| Se toma | No se toma, y por qué |
|---|---|
| Recorrido horizontal en PC, vertical en móvil | **Preloader** ("BUILD THINGS THAT MATTER"): tapa el contenido y retrasa el LCP (criterio 2). Del preloader queda solo la entrada letra por letra del nombre. |
| Nav de tres zonas: marca a la izquierda, secciones al centro, redes a la derecha | **Números de sección ("01/", "02/")**: no son navegación y la ubicación ya la da la barra de progreso. |
| Tachado al pasar el mouse por los enlaces del nav | **Mancha de fluido en WebGL detrás del cursor:** es un canvas a pantalla completa que corre siempre; queda para después (D10). |
| Barra fina de progreso abajo, al centro, con franja inferior fija | **Stickers** (el disco y la carita) y el **efecto de celdas en canvas** sobre las imágenes: opcionales para después. |
| Botón "Menú / Cerrar" con menú a pantalla completa en móvil | **Tooltip en grilla naranja con el email:** muestra información solo con hover (criterio 7). |
| Cortina curva con el nombre del destino al cambiar de página (acá: al cambiar de idioma) | |
| Texto que "rueda" al pasar el mouse (el pie "Design & code by") | |
| **Cursor propio:** un círculo que sigue al mouse con retraso y un punto; crece sobre enlaces e imágenes y sobre la foto dice "Arrastrame" (7.8) | |
| **Foto del hero arrastrable,** con inercia y estela de copias (7.9) | |

El cursor propio y la foto arrastrable los pidió Fermin el 2026-09-14. La skill `design-taste-frontend` desaconseja los cursores propios, pero douglus.site va antes que las skills y el pedido de Fermin va antes que todo. Se rehacen sin los problemas de M7 y con las condiciones de 7.8 y 7.9.

Todo el texto es HTML real. Nada se dibuja en canvas.

## 2. Paleta

Estrategia **restringida con un bloque comprometido**: neutros fríos más un solo acento, cobalto, que aparece en los botones principales, los estados y el progreso, y que llena un panel completo, el de contacto, como cierre. No hay verdes, ámbar ni grises sueltos: el estado de un proyecto se dice con texto, no con un punto de color.

Los tokens van en `:root` y se redefinen bajo `html.dark-mode` (se mantiene el mecanismo actual de `lib/theme.js`, que respeta `prefers-color-scheme` y guarda la elección). `THEME_COLORS` pasa a `--paper` de cada tema.

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--paper` | `#F1F2EE` | `#0E1012` | Fondo de la página |
| `--surface` | `#E6E8E3` | `#181B1F` | Placas sin imagen, zonas hundidas |
| `--ink` | `#101214` | `#ECEDE9` | Texto principal |
| `--ink-muted` | `#4E5358` | `#A3A8AD` | Texto secundario, nav sin activar |
| `--line` | `#7E838A` | `#6B7076` | Bordes de botón, reglas del timeline, riel del progreso |
| `--accent` | `#1D3FD8` | `#8CA3FF` | Botón principal, texto de acento, panel de contacto |
| `--accent-soft` | `#DCE2FB` | `#1B2240` | Placas tipográficas de proyecto |
| `--on-accent` | `#F4F6FF` | `#0E1012` | Texto y foco sobre `--accent` |
| `--on-accent-muted` | `#C8D1FF` | `#26304F` | Texto secundario sobre `--accent` |
| `--focus` | `= --accent` | `= --accent` | Anillo de foco (sobre el panel de contacto pasa a `--on-accent`) |

**Contraste medido** (WCAG 2.x, luminancia relativa; script en el anexo B). Texto: mínimo 4,5:1. Bordes y controles: mínimo 3:1.

| Par | Claro | Oscuro |
|---|---|---|
| `--ink` sobre `--paper` | 16,69 | 16,21 |
| `--ink` sobre `--surface` | 15,21 | 14,69 |
| `--ink-muted` sobre `--paper` | 6,91 | 7,95 |
| `--ink-muted` sobre `--surface` | 6,30 | 7,21 |
| `--accent` (texto) sobre `--paper` | 6,78 | 7,99 |
| `--accent` (texto) sobre `--surface` | 6,18 | 7,24 |
| `--accent` (texto) sobre `--accent-soft` | 5,92 | 6,52 |
| `--ink` sobre `--accent-soft` | 14,58 | 13,23 |
| `--on-accent` sobre `--accent` (botón, panel de contacto) | 7,07 | 7,99 |
| `--on-accent-muted` sobre `--accent` | 5,09 | 5,44 |
| `--line` sobre `--paper` (borde, 3:1) | 3,40 | 3,82 |
| `--line` sobre `--surface` (borde, 3:1) | 3,09 | 3,46 |

Reglas:
- `--ink-muted` nunca va sobre `--accent` (da 1,02).
- Las placas de proyecto con el color de la marca (TravelPic negro, DeporTurnos blanco) son datos del proyecto (`media.plate` en `PROJECTS`), no tokens del tema; no llevan texto encima.
- Sin sombras. Si un componente la necesita, se agrega como token (`--shadow-*`), teñida con el tono del fondo.

## 3. Tipografía y escala

**Familia:** [Archivo](https://fonts.google.com/specimen/Archivo), variable, con los ejes `wght` (100–900) y `wdth` (62–125). Un solo archivo sirve para los títulos angostos, que tienen la fuerza de un afiche, y para el texto de lectura. Se carga con `next/font/google`, con `axes: ["wdth"]`, `subsets: ["latin"]` y `display: "swap"` (el eje de ancho no viene por defecto; ver `node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md`). Se sirve desde el propio dominio y no hay CSS externo. Reemplaza a Inter, que la skill desaconseja como fuente por defecto. No hay monoespaciada: las cifras usan `font-variant-numeric: tabular-nums`.

| Rol | Ancho (`wdth`) | Peso | Tamaño | Interlineado y tracking |
|---|---|---|---|---|
| Display (nombre, título de panel) | 68 | 800 | `--fs-display` | 0,86 · −0,01em · mayúsculas |
| Mega (email de contacto) | 75 | 700 | `--fs-mega` | 0,95 · −0,02em |
| Título de proyecto (h3) | 68 | 800 | `--fs-4` | 0,9 · mayúsculas |
| Título (h2 en vertical) | 100 | 600 | `--fs-4` | 1,05 · −0,02em |
| Destacado | 100 | 500 | `--fs-2` | 1,35 |
| Cuerpo | 100 | 400 | `--fs-1` | 1,55 · máximo 60ch |
| Meta (estado, fechas, tags) | 100 | 500 | `--fs-0` | 1,4 · +0,01em · sin mayúsculas |

**Escala.** En horizontal, lo que limita es el alto de la ventana, así que los tamaños grandes usan `vmin` (el menor entre ancho y alto):

```css
--fs-0: 0.8125rem;                              /* 13px */
--fs-1: 1rem;                                   /* 16px */
--fs-2: clamp(1.125rem, 0.9rem + 0.6vw, 1.375rem);
--fs-3: clamp(1.375rem, 1rem + 1vw, 1.75rem);
--fs-4: clamp(2rem, 1rem + 4vmin, 4.25rem);
--fs-display: clamp(3.5rem, 17vmin, 13rem);     /* 153px a 1440×900; 66px a 390px */
--fs-section: clamp(2.5rem, 7.5vmin, 6rem);     /* títulos de sección en paneles angostos */
--fs-mega: clamp(2.25rem, 9vmin, 7.5rem);
```

Solo hay un tamaño Display por panel. Las mayúsculas se reservan para Display y títulos de proyecto: no hay etiquetas chicas en mayúsculas espaciadas sobre cada sección (máximo 1 cada 3 secciones, según la skill).

## 4. Forma, espacio y capas

- **Esquinas:** los paneles, las placas y las imágenes van rectos (`--radius-0: 0`). Los botones son píldora (`--radius-pill: 999px`). Las capturas de teléfono usan el radio de un iPhone (`--radius-device: 12%` del ancho). No hay otras esquinas.
- **Espaciado:** base de 4px (`--space-1` = 0,25rem … `--space-9` = 8rem). Margen lateral de panel `--pad-x: clamp(1rem, 3cqi, 3rem)`: nunca menos de 16px.
- **Alturas fijas:** `--nav-h: 4rem` (64px), `--strip-h: 3rem` (la franja inferior del modo horizontal).
- **Capas:** `--z-track: 0`, `--z-nav: 10`, `--z-strip: 10`, `--z-menu: 20`, `--z-skip: 30`, `--z-cursor: 40`. La foto que se está arrastrando usa `z-index: 1` dentro del hero. No hay otros `z-index`.
- **Cortes:** 30rem (480), 48rem (768), 64rem (1024; umbral del modo horizontal), 90rem (1440; ancho máximo del texto en vertical).

## 5. Orden de las secciones

Proyectos pasa a estar justo después del hero (I15). Experiencia y Educación se unen en un solo panel, "Trayectoria", con una línea de tiempo (las dos cuentan lo mismo: años y lugares). Los `id` actuales se mantienen, para no romper enlaces ni SEO.

| # | Panel | `id` | Ancho en horizontal |
|---|---|---|---|
| 1 | Hero | `sobre-mi` | `100cqi` (una pantalla) |
| 2 | Proyectos: entrada con las cifras | `proyectos` | `--w-intro: clamp(22rem, 30cqi, 30rem)` (con 26rem, "PROYECTOS" no entraba) |
| 3 | Un panel por proyecto, en el orden de `PROJECTS` | `proyecto-<id>` | `--w-card-lg: clamp(30rem, 40cqi, 42rem)` para las apps en producción con plataforma móvil; `--w-card: clamp(22rem, 28cqi, 28rem)` para el resto |
| 4 | Trayectoria (experiencia y educación) | `experiencia`; la fila de UNICEN lleva `educacion` | `--w-timeline: clamp(96rem, 130cqi, 110rem)`: ancha también en 1024px, para que las cuatro fichas entren a lo alto |
| 5 | Habilidades | `habilidades` | `--w-skills: clamp(48rem, 80cqi, 80rem)` |
| 6 | Contacto | `contacto` | `100cqi` |

En vertical, después del último panel va un `<footer>` corto (© y derechos). En horizontal el pie no se muestra: la página termina con la pista, sin scroll de más (antes el pie agregaba 85px al final), y el © ya está en la franja inferior. El nav queda con **cuatro enlaces**: Proyectos, Trayectoria, Habilidades y Contacto; "Sobre mí" es el nombre, a la izquierda. **Esto cambia las etiquetas del nav y hay que aprobarlo** (sección 10).

## 6. Navegación horizontal

### 6.1 Cómo funciona

El documento se scrollea en vertical, como cualquier página. Una sección alta contiene un panel `sticky` del alto de la ventana, y adentro va la pista con los paneles en fila. El scroll vertical, mientras dura esa sección alta, se traduce en un `translate` horizontal de la pista: 1px de scroll mueve 1px la pista. No se intercepta la rueda, no hay suavizado ni inercia agregados, y la barra de scroll del navegador, el teclado, "buscar en la página" y la restauración del scroll al volver atrás funcionan como siempre.

```html
<main id="contenido">
  <div class="h-scroll" style="--n-card: 6; --n-card-lg: 2">   <!-- alto = recorrido horizontal + 1 pantalla -->
    <div class="h-sticky">                                     <!-- sticky, 100dvh, overflow: clip -->
      <div class="h-track">                                    <!-- fila de paneles; se mueve con translate -->
        <section id="sobre-mi" class="panel">…</section>
        <section id="proyectos" class="panel">…</section>
        <article id="proyecto-travelpic" class="panel card card--lg">…</article>
        …
        <section id="contacto" class="panel">…</section>
      </div>
    </div>
  </div>
</main>
```

```css
main, .h-sticky { container-type: inline-size; }  /* cqi = ancho sin la barra de scroll de Windows */

/* En .h-scroll y no en :root: un var() dentro de una custom property se resuelve
   en el elemento donde se declara, y --n-card / --n-card-lg recién existen acá. En
   :root quedaba inválida y el alto caía a auto (se vio en el mockup). Los `cqi` sí
   se resuelven donde se usa la variable (en .h-scroll, contra main; en el keyframe,
   contra .h-sticky), y los dos miden lo mismo. */
.h-scroll {
  --track-w: calc(100cqi + var(--w-intro)
                + var(--n-card-lg) * var(--w-card-lg) + var(--n-card) * var(--w-card)
                + var(--w-timeline) + var(--w-skills) + 100cqi);
}

@media (min-width: 64rem) and (min-height: 42.5rem) and (pointer: fine)
       and (prefers-reduced-motion: no-preference) {
  html.js .h-scroll { height: calc(var(--track-w) - 100cqi + 100dvh); view-timeline: --pan block; }
  html.js .h-sticky { position: sticky; top: 0; height: 100dvh; overflow: clip; }
  html.js .h-track  { display: flex; width: max-content; height: 100%; }
  html.js .panel    { flex: none; height: 100%; }

  /* Solo si el navegador soporta la línea de tiempo. Sin este @supports, la
     animación correría por tiempo con duración 0 y saltaría al final. */
  @supports (animation-timeline: view()) {
    html.js .h-track {
      animation: pan linear both;
      animation-timeline: --pan;
      animation-range: contain 0% contain 100%;
    }
  }
}

@keyframes pan { to { translate: calc(-1 * (var(--track-w) - 100cqi)) 0; } }
```

Detalles que importan:
- **El ancho de la pista sale del CSS, no de medir.** Cada panel declara su ancho con un token, y el servidor escribe cuántos proyectos de cada tamaño hay (`--n-card`, `--n-card-lg`, calculados de `PROJECTS`). Así el alto de la sección es exacto desde el primer pintado, sin JS y sin salto. Regla de diseño que sale de esto: **ningún panel tiene un ancho que dependa de su contenido**; el contenido se acomoda (y se prueba) dentro del ancho y el alto declarados.
- **Unidades de contenedor (`cqi`), no `vw`**, para que en Windows la barra de scroll no deje un sobrante.
- **`overflow: clip` en el `sticky`, no `hidden`.** `hidden` crea un contenedor de scroll, y entonces el navegador lo scrollearía de costado al enfocar o al saltar a un ancla, desarmando la pista. Es el único recorte de la página y es intencional: está donde nace el desborde (criterio 1). `html` y `body` no llevan `overflow`.
- **Se anima `translate`**, la propiedad independiente, así no compite con otros `transform` (I6).
- La franja inferior está fuera de `.h-scroll`, así que para que el progreso use la misma línea de tiempo, `body` lleva `timeline-scope: --pan`.

### 6.2 Cuándo es horizontal

Las cinco condiciones a la vez: `html.js` (lo pone `themeInitScript` antes del primer pintado), ancho ≥ 64rem, alto ≥ 42,5rem (680px), puntero fino y sin `prefers-reduced-motion: reduce`. El alto empezó en 37,5rem, pero a 1024×640 Trayectoria y ClubSystem no entraban en su panel; con 42,5rem, y con menos aire vertical por debajo de 50rem de alto, entra todo desde 1024×680 (probado en 1024×680, 1024×720, 1024×768, 1366×680 y 1440×900). Si falta cualquiera, la página es vertical: los mismos paneles, uno debajo del otro, en el mismo orden.

| Situación | Resultado |
|---|---|
| PC, Chrome/Edge 115+ o Safari 26+ | Horizontal, movido por CSS (fuera del hilo principal) |
| PC, Firefox (a junio de 2026, `animation-timeline` sigue detrás de un flag en la versión estable) | Horizontal, movido por el respaldo de JS (6.4) |
| Móvil, tablet táctil, ventana baja o angosta | Vertical |
| Reduce motion activado | Vertical: mover el contenido de costado mientras el usuario scrollea hacia abajo es justo lo que molesta con problemas vestibulares |
| Sin JS | Vertical, con todo el contenido y todos los enlaces funcionando |
| Impresión | Vertical |

### 6.3 Anclas del nav

Los enlaces son anclas nativas, como hoy: `href="/#proyectos"` en ES y `/en#proyectos` en EN. La URL toma el `#hash` y funcionan desde cualquier página (el 404 incluido).

- **En vertical (y sin JS),** el navegador hace todo: `scroll-behavior: smooth` y `scroll-margin-top: var(--nav-h)` en los paneles.
- **En horizontal,** el panel destino está dentro de la pista y el navegador no sabe llevarlo a la vista (el documento no tiene scroll horizontal). Una mejora de JS, dentro del componente de la pista, lo resuelve sin cambiar el HTML:
  - al hacer clic en un enlace a una sección de la misma página, al cargar con un `#hash` y en `hashchange`/`popstate`, calcula `top = h-scroll.offsetTop + panel.offsetLeft` (limitado al máximo del recorrido) y hace `window.scrollTo({ top, behavior })`, con `smooth` salvo en carga inicial;
  - no hace `preventDefault` del clic en sí: el navegador igual actualiza la URL; el script solo corrige a dónde se scrollea.
- **`aria-current="location"`** en el enlace de la sección visible, con un `IntersectionObserver` sobre los paneles: en horizontal, con `rootMargin: "0px -50% 0px -50%"` (una línea vertical en el centro de la ventana; `IntersectionObserver` tiene en cuenta el `translate`); en vertical, `"-40% 0px -59% 0px"`. Se vuelve a crear si cambia el modo (`matchMedia` con `change`).
- El botón de idioma conserva la sección visible, como hoy (`/en#proyectos`).

### 6.4 Respaldo para navegadores sin `animation-timeline`

Si `CSS.supports("animation-timeline: view()")` da falso y el modo horizontal está activo, el componente de la pista escribe el `translate` directo en el elemento (y el `scale` de la barra de progreso) desde un listener de `scroll` pasivo, agrupado con `requestAnimationFrame`: `progreso = clamp((scrollY − top) / (alto − innerHeight), 0, 1)`. No pasa por estado de React. La skill desaconseja listeners de `scroll`, pero en este caso no hay alternativa nativa: es lo mismo que hace por dentro `scroll()` de Motion cuando no hay `ScrollTimeline`, y agregar esa dependencia solo para Firefox no se justifica. Cuando Firefox habilite la función en la versión estable, este camino deja de ejecutarse solo.

### 6.5 Teclado y lectores de pantalla

- Flechas, `Re Pág`/`Av Pág`, `Espacio`, `Inicio` y `Fin` scrollean el documento, así que mueven la pista.
- **Foco fuera de la vista:** al tabular hasta un elemento de un panel que todavía está a la derecha, el navegador no puede mostrarlo (no hay scroll horizontal). Un listener de `focusin` en la pista mide el elemento y, si queda fuera de la ventana, hace `scrollBy({ top: rect.left − margen })` **sin animación**: con teclado, el movimiento tiene que ser inmediato.
- El orden del DOM es el orden visual, así que la lectura lineal es la misma en los dos modos.
- **Enlace para saltar al contenido** (`#contenido`, el `<main>`), primero en el orden de foco.
- **Opcional:** en trackpads, un gesto horizontal no hace nada (el documento no scrollea de costado). Un listener de `wheel` pasivo puede convertir `deltaX` en `scrollBy({ top: deltaX })`. Se decide al probarlo.

### 6.6 Móvil (vertical)

- Los paneles se apilan a lo ancho, con alto automático; nada queda atado a `100dvh`, salvo el hero (`min-height: 100svh`).
- Proyectos: una columna por debajo de 48rem, dos columnas entre 48 y 64rem.
- Trayectoria: lista vertical (años a la izquierda, contenido a la derecha; por debajo de 30rem, los años arriba).
- Nav: nombre a la izquierda; a la derecha, idioma y un botón "Menú" que abre un menú a pantalla completa (7.1).
- La franja inferior y la barra de progreso no se muestran.

## 7. Componentes

### 7.1 Nav

**Escritorio:** barra fija de `--nav-h`, con fondo `--paper` (sin transparencia ni blur) y tres zonas.
- Izquierda: "Fermin Lasarte", enlace a `#sobre-mi`.
- Centro: `<nav aria-label="Secciones">` con `<ul>` de cuatro enlaces en `--ink-muted`.
  - **Hover y foco (puntero fino):** el texto pasa a `--ink` y se dibuja un tachado de 2px a media altura, que crece desde la izquierda (`scale: 0 1 → 1 1`, 220ms, `--ease-out`) y se va hacia la derecha al salir. Es el efecto `menu--linethrough` de douglus, que allá aparece de golpe.
  - **Sección actual:** `aria-current="location"`, texto en `--ink` y subrayado de 1px abajo. El indicador no depende solo del color, y no usa el tachado (que se leería como "descartado").
- Derecha: botón de idioma (`<a hreflang>`, con `aria-label` "Cambiar idioma: English"), botón de tema (`<button aria-pressed>`, M3) y GitHub y LinkedIn, iconos con `aria-label`. Cada control mide al menos 44×44px. El email no va acá: tiene su lugar en Contacto.

**Franja inferior (solo en horizontal):** fija, `--strip-h`, con tres zonas, como el pie de douglus.
- Izquierda: "© 2026 Fermin Lasarte".
- Centro: riel de 10rem × 1px en `--line` con el relleno en `--accent` (`scale` en X, con la línea de tiempo `--pan`), y a su lado el nombre de la sección actual (`aria-hidden`: la información útil ya está en `aria-current`).
- Derecha: "Descargar CV", enlace directo al PDF del idioma de la página (I15, sin dropdown).

**Móvil:** botón `<button aria-expanded aria-controls="menu">` con el texto "Menú" / "Cerrar", que rueda de uno al otro (7.6).
- Abre un panel fijo a pantalla completa con los cuatro enlaces en tamaño Display, y abajo el tema y las redes.
- Mientras está abierto: `main` y el `footer` quedan `inert`; `Escape` lo cierra y devuelve el foco al botón; tocar un enlace también lo cierra.
- Sin JS no hay botón: la lista de enlaces se ve directamente, en una fila que puede partirse en dos (`html:not(.js)`).

### 7.2 Hero

Un panel del ancho de la ventana, en una grilla de 12 columnas.
- **Arriba a la izquierda:** disponibilidad ("Disponible para nuevos desafíos"), en `--fs-0` y `--ink-muted`, con un punto de `--accent`. Es el único punto de estado de la página, y es real.
- **Al medio, a la izquierda (columnas 1–5):** un párrafo de hasta 20 palabras, con el cargo en negrita al principio, y dos botones:
  - "Ver proyectos": principal, `--accent`, ancla a `#proyectos`;
  - "Descargar CV": secundario, borde `--line`, PDF directo del idioma actual.
- **Abajo a la izquierda (columnas 1–8):** `<h1>` con el nombre completo (M16) en Display, en dos líneas: FERMIN / LASARTE.
- **Derecha (columnas 10–12), abajo, con el 62% de la altura útil:** la foto (antes iba en las columnas 8–12 a toda la altura, 550×740px a 1440×900, y Fermin la pidió más chica el 2026-09-14; ahora mide unos 320×460). En tablet va a la derecha con un máximo de 18rem y en móvil, debajo, con un máximo de 20rem. Va con `next/image`, `priority`, `fetchPriority="high"`, `object-fit: cover`, sin esquinas y **sin animación de entrada** (es el LCP, C5). Se puede arrastrar con el mouse (7.9).
- Se van los badges flotantes de tecnologías, las cifras (pasan a la entrada de Proyectos) y el botón "Contactame" (repetía la intención del enlace "Contacto" del nav).
- **Móvil:** disponibilidad, nombre, párrafo y botones entran en la primera pantalla a 375×667 (M16); la foto va debajo, en 4:5.

Copia propuesta para el párrafo (hoy `hero.description` tiene 45 palabras y pasaría a Trayectoria):
- ES: "**iOS & Cross-Platform Mobile Engineer.** Hago apps móviles de punta a punta: arquitectura, backend y publicación en App Store y Google Play."
- EN: "**iOS & Cross-Platform Mobile Engineer.** I build mobile apps end to end: architecture, backend, and release on the App Store and Google Play."

### 7.3 Entrada de Proyectos y tarjeta de proyecto

**Entrada** (`#proyectos`): `<h2>` "Proyectos" en Display y las cifras de `STATS` como una `<dl>`: número en `--fs-4` con `tabular-nums` y la etiqueta en Meta ("2 apps en producción", "4+ años", "8 proyectos").

**Tarjeta:** un panel por proyecto, generado de `PROJECTS` (M11). De arriba a abajo:
1. **Placa** (alrededor del 55% del alto):
   - Si hay captura vertical real: la captura en proporción de teléfono, con `--radius-device`, sobre una placa del color de la app.
   - Si todavía no hay captura pero sí logo (TravelPic, DeporTurnos): el logo sobre su color de marca.
   - Si no hay ninguno de los dos: placa tipográfica en `--accent-soft`, con el nombre del proyecto en Display y `--accent`.
   - No hay terminales falsos, degradados ni código decorativo: la skill los prohíbe y hoy eran relleno.
   - La placa es un enlace al destino principal (tienda o demo, I15), con `tabindex="-1"` y `aria-hidden`, para no duplicar el enlace en el orden de foco.
2. **Meta:** estado en texto ("En producción" / "En desarrollo") y plataformas en texto ("iOS y Android"), con los iconos de `lib/icons.js` como apoyo y no como única información.
3. **Título** (`<h3>`) con el título traducido, en el estilo de título de proyecto.
4. **Problema** (si hay) y **solución:** dos párrafos de hasta 25 palabras cada uno. Sin etiquetas "Problema" y "Solución técnica": el orden ya lo dice. Varios textos actuales son más largos y hay que acortarlos (sección 10).
5. **Tecnologías:** en una línea de texto Meta, separadas por comas.
6. **Enlaces directos:** un botón por destino ("App Store", "Google Play", "Código", "Visitar"). El primero es el principal y el resto van con borde. Se van el dropdown de "Descargar" y el botón deshabilitado "Próximamente" (M16).

- **Tamaños:** `card--lg` para las apps móviles en producción; el resto, `card`.
- **Sin cortes entre paneles** (pedido de Fermin, 2026-09-14): los paneles no llevan bordes que los separen, ni en horizontal ni en vertical, y el pie tampoco. Los separa el aire (el margen lateral de cada panel), así el recorrido se lee como una sola tira. Las líneas que son parte del contenido (el eje de años, el título de cada grupo de habilidades) se quedan.
- **En vertical:** las mismas tarjetas, en una grilla de una o dos columnas, con la placa en 4:3.

### 7.4 Timeline (Trayectoria)

**Horizontal:**
- `<h2>` "Trayectoria" en Display y, al lado, el párrafo largo que hoy está en el hero (estudiante de Ingeniería de Sistemas, foco en mobile y backend).
- Debajo, un eje de años de 2020 a 2026 con marcas cada año (`--line`, cifras `tabular-nums`). Cada ítem es una fila con una barra que va de su inicio a su fin:
  - DeporTurnos 2021–2025;
  - TravelPic 2024–2025;
  - UNICEN 2020–2026.
- La experiencia usa barra llena de `--accent` y la educación, barra con borde de `--ink`. Además, cada fila dice qué es ("Experiencia" o "Educación"), así que no depende del color.
- Bajo cada barra van el título, el lugar, una descripción corta y las tecnologías.
- Idiomas (sin años) cierra el panel como una nota aparte: "Inglés y francés (B2)".

**Vertical:** `<ol>` de ítems. Las fechas van a la izquierda, con `<time datetime>`, y el contenido a la derecha.

Los rangos de años se escriben con guion corto normal ("2021-2025") en el texto visible, o con "a" en la lectura ("2021 a 2025").

### 7.5 Contacto

**El único panel lleno de color:** fondo `--accent`, texto `--on-accent` y foco `--on-accent`.
- `<h2>` "Trabajemos juntos" en Display.
- Debajo, el email en tamaño Mega como enlace `mailto:` (es el botón principal), con un botón "Copiar" al lado. Al copiar, dice "Copiado" durante 2 s, anunciado con `aria-live="polite"`. Si el portapapeles no está disponible, el botón no se muestra (M16).
- Tres filas grandes: WhatsApp, LinkedIn y GitHub, con el mismo tachado del nav al pasar el mouse. El teléfono sigue siendo un `tel:`.
- **En vertical:** el mismo bloque, a lo ancho.

### 7.6 Botones

- **Principal:** `--accent` con `--on-accent`. **Secundario:** borde de 1px en `--line`, texto `--ink`.
- Alto de 44px, píldora, sin salto de línea (`white-space: nowrap`; los textos son de 1 a 3 palabras).
- **Al presionar:** `scale: 0.97`, 140ms, `--ease-out`.
- **Hover con puntero fino:** el texto "rueda". Sube y se va, y desde abajo entra una copia (un `<span aria-hidden>` duplicado), en 260ms con `--ease-out`. Es el giro de letras de douglus, pero con la palabra entera: más calmo y más barato que por letra.

### 7.7 Habilidades

Cinco grupos (los de `SKILL_GROUPS`) en columnas. Cada tecnología lleva:
- el icono de Devicon de 20px (`next/image`);
- el nombre;
- el nivel **en texto visible** ("Avanzado" / "Intermedio"), no en un tooltip (M4).

En vertical, los grupos van en dos columnas (una por debajo de 30rem).

### 7.8 Cursor propio

Es el de douglus, rehecho sin los problemas de M7 (reemplaza a `PremiumCursor`).

**Qué es:**
- Un círculo de `--cursor-size` (28px) con borde de 1px y un punto de 4px, los dos en `--cursor-ink` (que vale `--ink`; sobre el panel de contacto, `--on-accent`).
- El punto sigue al mouse con un retraso de 0,35 por frame y el círculo con 0,2 (los valores de douglus), así que el círculo llega un poco después.

**Estados**, según lo que tenga debajo:

| Debajo del cursor | Círculo | Punto | Texto |
|---|---|---|---|
| Nada interactivo | 1× | Visible | |
| Enlace o botón | 1,7×, relleno de `--cursor-ink` al 8% | Visible | |
| Foto del hero | 3,4× | Oculto | "Arrastrame" / "Drag me" (del diccionario) |
| Al presionar | 0,78× (2,8× sobre la foto) | | |

El estado sale de `data-cursor` o, si no hay, de `a` y `button`. Se lee con un solo listener de `pointerover` en el documento (delegación), no con uno por enlace.

**Cuándo existe:** solo con `(hover: hover) and (pointer: fine)`, sin `prefers-reduced-motion: reduce` y sin `forced-colors: active`. En cualquier otro caso queda el cursor del sistema. Nada depende del cursor: "Arrastrame" es un extra y la foto también muestra `cursor: grab`.

**Cómo se arreglan los problemas de M7:**
- **Nunca hay un momento sin cursor.** El cursor del sistema se oculta recién cuando llega el primer `pointermove` del mouse y el propio ya está en su lugar. Recién ahí se agrega `html.has-cursor`, que pone `cursor: none`.
- **No aparece el punto en (0, 0) al cargar.** El cursor empieza con `opacity: 0` y aparece en la posición real del mouse.
- **No hay dos cursores sobre los enlaces.** `cursor: none` vale para todo, enlaces y botones incluidos.
- **Se mueve con `translate`,** no con `left`/`top`.
- **Un solo listener,** con delegación.
- **El `requestAnimationFrame` no corre siempre:** se para cuando el círculo alcanzó al mouse (a menos de 0,2px), se reanuda con el próximo movimiento y se esconde cuando el mouse sale de la ventana.

**En el DOM:** es `aria-hidden`, con `pointer-events: none`, y va en la capa `--z-cursor: 40`, la más alta.

Es un componente de cliente aislado, montado en `Document`.

### 7.9 Foto arrastrable

La foto del hero se puede arrastrar con el mouse, como en douglus.

**Cómo se arrastra:**
- No usa librería. Douglus usa GSAP Draggable con InertiaPlugin, pero para esto alcanza con Pointer Events (`setPointerCapture`) y `translate` sobre un envoltorio (`.drag`) alrededor del `<img>`.
- El `<img>` no cambia y la foto sigue sin animación de entrada (es el LCP, C5).

**Al presionar:** el marco se achica a 0,8 y la imagen de adentro se agranda a 1,5 (260ms, `--ease-out`). Son los valores de douglus.

**Estela:** mientras se arrastra, cada 30px de recorrido queda una copia de la foto en ese punto, que se desvanece en 300ms. Hay 8 copias que se reusan en rueda (douglus usa 10). Son `<img>` con el mismo `src` (ya está en caché), `aria-hidden`, y se crean al hidratar.

**Al soltar:**
- La foto sigue con la velocidad que traía y frena con fricción (0,92 por frame).
- No puede salir del panel del hero. Si se pasa del borde, el arrastre se amortigua (cuanto más se tira, menos se mueve) y al soltar vuelve con un rebote suave.
- Queda donde frena, como en douglus (decidido por Fermin el 2026-09-14), aunque tape el nombre, el párrafo o los botones: quien la movió la puede volver a mover.
- Vuelve a su lugar (700ms, `--ease-expo`) en dos casos:
  - si el foco del teclado entra al hero, para no tapar un botón enfocado (WCAG 2.4.11, criterio 7);
  - si cambia el tamaño de la ventana, porque cambian los límites.
- Con reduce motion vuelve sin animación.

**Cuándo se puede arrastrar:**
- Solo con puntero fino. En táctil, arrastrar es scrollear.
- Con reduce motion se arrastra igual (el movimiento lo hace la persona), pero sin inercia ni estela.
- Durante el arrastre, la rueda sigue scrolleando la página.

**Accesibilidad:** es decorativo. La foto no es enfocable, no tiene rol y conserva su `alt`. No se mueve con teclado ni hace falta: no muestra ni esconde información (criterio 7).

## 8. Movimiento

Principios (de `emil-design-eng`, con el recorrido de douglus como modelo):
1. **El recorrido no se anima: sigue al scroll.** El `translate` de la pista es lineal y 1:1 con el scroll nativo. No se suaviza, que es lo que hace Lenis en douglus (con `lerp: 0.12`), porque suavizar el scroll es interceptarlo.
2. **Cada animación tiene un motivo:** orientar (progreso, sección actual), dar respuesta (presionar, hover) o acompañar un cambio de estado (menú, idioma). Nada se mueve en loop.
3. **Solo `transform` (`translate`/`scale`), `opacity` y `clip-path`.** No se anima `filter: blur` ni el layout. `will-change` solo durante la animación.
4. **Todo lo que oculta contenido de entrada va bajo `html.js`** (criterio 2), y todo movimiento, bajo `(prefers-reduced-motion: no-preference)`. Con reduce motion quedan los cambios de color y opacidad cortos; se van los desplazamientos.
5. **El hover solo existe con `(hover: hover) and (pointer: fine)`.** Nada de hover en táctil.
6. **Transiciones para lo interactivo** (se pueden interrumpir); `@keyframes` solo para las entradas que pasan una vez.
7. **Lo que se hace con teclado es instantáneo:** el foco que mueve la pista, abrir el menú con Enter.

**Tokens:**

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);      /* respuestas de UI */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* cosas que se mueven en pantalla */
--ease-expo: cubic-bezier(0.16, 1, 0.3, 1);      /* entradas; aproxima el 1 - 2^(-10t) de douglus */
--dur-press: 140ms;  --dur-hover: 220ms;  --dur-ui: 260ms;
--dur-menu: 420ms;   --dur-enter: 700ms;  --dur-curtain: 800ms;
```

| Animación | Disparador | Propiedades | Duración y curva | Con reduce motion |
|---|---|---|---|---|
| Pista horizontal | Scroll | `translate` | Lineal, 1:1 | Modo vertical |
| Barra de progreso | Scroll | `scale` X | Lineal | No existe (vertical) |
| Tachado del nav y de contacto | Hover o foco | `scale` X del pseudo-elemento | 220ms `--ease-out` | Aparece sin transición |
| Botón que rueda | Hover | `translate` Y de dos `span` | 260ms `--ease-out` | Sin movimiento |
| Presionar botón | `:active` | `scale: 0.97` | 140ms `--ease-out` | Igual (no desplaza) |
| Nombre del hero, letra por letra | Carga | `translate` Y desde 105%, dentro de una máscara | 700ms `--ease-expo`, 28ms entre letras | Sin animación |
| Entrada de cada panel | El panel entra en la vista (`IntersectionObserver`, una vez) | Placa: `clip-path: inset(0 0 0 100%) → inset(0)`, desde el lado por donde entra; texto: `opacity` y `translate` de 12px | 700ms `--ease-expo`; texto 60ms después | Sin animación |
| Menú móvil | Botón | Panel: `clip-path` desde arriba; enlaces: `translate` Y 16px y `opacity`, 40ms entre cada uno; `@starting-style` | Abre en 420ms `--ease-out`; cierra en 200ms | Fundido de 150ms |
| "Menú" / "Cerrar" | Botón | `translate` Y | 260ms `--ease-out` | Cambio directo |
| Cambio de idioma | Navegación a `/en` o `/` | View Transition entre documentos (`@view-transition { navigation: auto }`): la página nueva sube desde abajo con borde curvo, `clip-path: ellipse(150% 0% at 50% 100%) → ellipse(150% 150% at 50% 100%)`. Sin el nombre del idioma encima (a diferencia de douglus): con View Transitions entre documentos, ese texto tendría que estar en las dos páginas | 800ms `--ease-in-out` | Fundido de 150ms |
| Cursor: seguimiento | Movimiento del mouse | `translate` del punto y del círculo | Retraso de 0,35 y 0,2 por frame; se detiene al alcanzar al mouse | No existe (cursor del sistema) |
| Cursor: estados | Hover o presionar | `scale` del círculo, `opacity` del punto y del texto | 260ms `--ease-out` | No existe |
| Foto: presionar | `pointerdown` | Marco a `scale: 0.8`, imagen a `scale: 1.5` | 260ms `--ease-out` | Igual |
| Foto: arrastre | Mouse | `translate`, 1:1 con el mouse; amortiguado pasado el borde | Directo | Igual |
| Foto: inercia y rebote | Soltar | `translate` con fricción de 0,92 por frame; vuelve adentro del hero si se pasó | Hasta frenar | Sin inercia: queda donde se suelta, dentro del hero |
| Foto: estela | Cada 30px de arrastre | `opacity` de 8 copias reusadas | 400ms `--ease-out` | Sin estela |
| Foto: vuelta a su lugar | Foco del teclado en el hero o cambio de tamaño (si no, queda donde cae) | `translate` a 0 | 700ms `--ease-expo` | Sin animación |
| Tema | Botón | Ninguna (cambio instantáneo) | | |

- La cortina es la de douglus (un `path` SVG con curva que cubre la pantalla y muestra el destino), hecha con la API nativa. Donde no hay View Transitions entre documentos (Firefox, por ahora), el cambio de idioma es una navegación normal.
- La entrada del nombre usa máscaras (`overflow: clip` en cada línea). El `<h1>` lleva el nombre como texto real en un `<span class="sr-only">` y las letras animadas van en `aria-hidden`. Si Lighthouse marca al `<h1>` como LCP en lugar de la foto, la entrada se acorta o se quita.

## 9. Los 7 criterios

1. **Sin desbordes tapados.**
   - `html` y `body` no llevan `overflow`. El único recorte es `overflow: clip` en `.h-sticky`, que es donde nace el desborde intencional de la pista.
   - Los anchos de panel usan `cqi` (sin el sobrante de la barra de scroll) y el texto largo se parte (`overflow-wrap: anywhere` en el email).
   - Se prueba en 375, 768, 900, 1024 y 1440px: 1024 y 1440 en horizontal (con alto ≥ 680px); el resto, y 1024×640, en vertical. En cada ancho se verifica con JS que ningún elemento pase de `document.documentElement.clientWidth`, salvo la pista.
2. **Contenido visible sin JS.**
   - Sin JS, la página es vertical y completa: hero, proyectos, trayectoria, habilidades y contacto.
   - Todos los enlaces son `<a href>` reales, y las anclas del nav, nativas.
   - El menú móvil sin JS es la lista visible.
   - Las entradas animadas solo ocultan bajo `html.js`. La foto no se anima.
3. **Nav.**
   - `<button aria-expanded aria-controls>` en móvil, que cierra con Escape y devuelve el foco (7.1).
   - Anclas nativas `/#seccion` y `/en#seccion`.
   - `aria-current="location"` en la sección visible, en los dos modos.
   - Botón de tema con `aria-pressed`, idioma con `aria-label` y `hreflang`, iconos con `aria-label` o `aria-hidden` (M3).
4. **Tokens.**
   - Colores, esquinas, espacios, alturas, capas, fuentes, tamaños, duraciones, curvas y anchos de panel son tokens (secciones 2 a 6 y 8).
   - El único color fuera del tema es el de las placas de marca, y vive en los datos de `PROJECTS`, no en el CSS.
   - Se borran las tres pilas monoespaciadas, `#FBB124` y los comentarios sueltos (M14).
5. **Assets.**
   - Foto, capturas, logos e iconos de Devicon con `next/image`; iconos de interfaz SVG inline (`lib/icons.js`).
   - Archivo con `next/font`, servida desde el propio dominio. No hay ninguna hoja de estilos externa.
6. **Proyectos.**
   - Todo sale de `PROJECTS`: el orden, el tamaño de panel, `--n-card`/`--n-card-lg`, el estado, las plataformas, el color de placa y los enlaces directos (tiendas, repo o demo).
   - La placa enlaza al destino principal.
   - Las capturas son reales: hoy `travelpic.webp` y `deporturnos.webp` son los logos, no pantallas de las apps (ver sección 10).
7. **Accesibilidad.**
   - `<main id="contenido">` y enlace para saltar a él.
   - `:focus-visible` propio: anillo de 2px en `--focus` con separación de 3px; sobre el panel de contacto, en `--on-accent`.
   - Contraste AA medido en los dos temas (tabla de la sección 2).
   - Zonas táctiles de 44px en el nav, los botones y las filas de contacto, y de al menos 24px en los enlaces dentro del texto.
   - Los niveles de skills se ven sin hover (M4) y el estado de un proyecto va en texto, no solo en color.
   - Un solo `<h1>` (el nombre), un `<h2>` por sección y un `<h3>` por proyecto. Se quita la etiqueta que repetía el h2 (M6).
   - El foco con teclado mueve la pista (6.5) y reduce motion da el modo vertical.
   - El cursor propio (7.8) no aparece con táctil, reduce motion ni colores forzados, y nunca deja la pantalla sin cursor. La foto arrastrable (7.9) es decorativa: no esconde información y no se enfoca.

## 10. Decisiones y pendientes para aprobar

| # | Tema | Propuesta | Hace falta |
|---|---|---|---|
| D1 | Etiquetas del nav | Cuatro enlaces: Proyectos, Trayectoria, Habilidades y Contacto. "Sobre mí" pasa al nombre y "Educación" se une a Trayectoria (los `id` se mantienen) | Aprobación |
| D2 | Párrafo del hero | El texto corto de 7.2; el largo pasa a Trayectoria | Aprobación de la copia ES y EN |
| D3 | Textos de solución | Acortar cada uno a 25 palabras o menos | Aprobar la copia en la implementación |
| D4 | Rayas largas en textos visibles | "Vault — Finanzas personales", "Bookit — …", "ClubSystem — …" y el `<title>` usan "—", que la skill prohíbe. Pasan a ":" ("Vault: finanzas personales") y el `<title>` a "Fermin Lasarte · iOS & Mobile Engineer" | Aprobación |
| D5 | Capturas (I12) | Capturas verticales de TravelPic y DeporTurnos, idealmente también del juego iOS, chatbot-ai, Vault, Bookit y ClubSystem. Mientras no estén: placa con logo o placa tipográfica | Que Fermin las consiga |
| D6 | Cursor propio y foto arrastrable | **Decidido por Fermin (2026-09-14):** se hacen como en douglus (7.8 y 7.9). `PremiumCursor` se reemplaza. El preloader y los números "01/" no se toman | Nada |
| D10 | Mancha de fluido en WebGL detrás del cursor | Queda fuera de esta fase: es un canvas a pantalla completa que corre siempre | Opcional |
| D7 | Firefox | Respaldo de JS (6.4), en vez de dejarlo en vertical | Aprobación |
| D8 | Efecto de celdas en las imágenes | Queda fuera de esta fase | Opcional |
| D9 | PRODUCT.md | La skill `impeccable` pide un PRODUCT.md. No se creó porque la dirección la fija douglus.site y este documento cumple ese papel. Se puede generar después con `/impeccable init` | Opcional |

Después de la aprobación, la implementación sigue este orden:
1. tokens y fuente;
2. pista horizontal y modo vertical;
3. nav;
4. hero;
5. tarjeta de proyecto;
6. el resto de las secciones;
7. movimiento;
8. pruebas en los cinco anchos, en los dos temas y en los dos idiomas, sin JS, con teclado y con reduce motion.

## Anexo A. Lo que se midió en douglus.site

- **Escritorio (≥ 1200px, `matchMedia("(min-width: 1200px)")`):**
  - `.home-container` es `position: fixed` con `overflow: hidden`, y `.home-page-content` es una fila de 8424px a 1440px de ancho con seis paneles: intro 1440, expert 1440, process 1728, contact 1440, gradient 936 y outro 1440.
  - La mueve Lenis con `orientation: "horizontal"`, `lerp: 0.12`, `wheelMultiplier: 0.6`, `touchMultiplier: 1.3`, `duration: 0.8` y la curva `1 - 2^(-10t)`.
  - El `body` tiene `overflow: hidden` y el documento mide 900px de alto, así que no hay scroll nativo.
- **Móvil (< 1200px):** vertical, con un botón "Menu" / "Close" y un menú fijo a pantalla completa.
- **Nav:**
  - `nav-bar` fija de 80px: logo a la izquierda, "Works, About, Contact" al centro y "Github, LinkedIn, Email" a la derecha.
  - Hover `menu--linethrough`: una línea de 2px a media altura, con `opacity` de 0 a 1.
  - Works, About y Contact son rutas, con una cortina SVG (un `path` que pasa de recto a curvo con `Q` y cubre la pantalla) y el nombre del destino en grande.
- **Pie fijo:** "© 2026 Portfolio" a la izquierda, barra de progreso de 160×1px al centro (con `scale` en X) y "Design & code by Douglus" a la derecha, con giro 3D por letra.
- **Tipografía y color:** Neue Montreal, FK Screamer, DM Sans y Bebas Neue; fondo `#fefff8`, texto negro, acento `rgb(255, 100, 50)` / `#ff6a3d` y preloader en `#0e0e0e`.
- **Canvas:** el fijo a pantalla completa es la mancha de fluido del cursor, en WebGL (OGL). El otro es 2D: se crea sobre las imágenes de proyectos y pinta celdas al pasar el mouse (con `mix-blend-mode: overlay`). No se dibuja texto en ninguno de los dos.
- **Cursor:**
  - Círculo de 28px con borde de 1px y un punto; siguen al mouse con un retraso de 0,2 y 0,35 por frame.
  - El círculo cambia de escala: 1,78 sobre el nav, 1,71 sobre enlaces, 3,36 sobre imágenes y 0,78 al presionar.
  - "DRAG ME" y "VIEW" son texto dentro del cursor, no etiquetas sobre la imagen.
- **Foto arrastrable:**
  - GSAP Draggable con inercia.
  - Al presionar, el marco pasa a 0,8 y la imagen a 1,5.
  - Deja 10 copias de estela, una cada 30px, y la foto queda donde cae.
- **Táctil:** el cursor y la foto arrastrable se desactivan.

## Anexo B. Script de contraste

```js
const hex = (h) => h.replace("#", "").match(/../g).map((x) => parseInt(x, 16) / 255);
const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const L = (h) => { const [r, g, b] = hex(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const [x, y] = [L(a), L(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
```

Durante la implementación, el contraste se vuelve a medir en el navegador, sobre los colores calculados.

## Anexo C. Referencias

- [douglus.site](https://douglus.site)
- [MDN: CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [Mozilla Connect: pedido de `animation-timeline` en Firefox](https://connect.mozilla.org/t5/ideas/implement-css-scroll-driven-animations-animation-timeline/idi-p/116931)
- [CSS Scroll-Driven Animations Guide (2026)](https://cssawwwards.com/blog/css-scroll-driven-animations-guide-2026)
- [MDN: View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- [CSS-Tricks: Cross-Document View Transitions](https://css-tricks.com/cross-document-view-transitions-part-1/)
- Documentación de `next/font` instalada: `node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md`
