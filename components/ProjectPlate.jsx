import { getImageProps } from "@/lib/image";

// Proporción del marco de teléfono: la de una pantalla de iPhone moderno.
const FRAME = 19.5 / 9;

// Cuánto puede desplazarse una captura dentro del marco, como porcentaje de su propio
// alto: lo que le sobra después de llenarlo. Una captura de una pantalla entra justa y
// da 0 (queda quieta y encuadrada); una captura larga, de scroll, da el recorrido.
const travel = ({ width, height }) => Math.max(0, 1 - (FRAME * width) / height);

// El `sizes` de una captura: el ancho del teléfono, no el de la placa. El marco toma el
// alto de la placa y es angosto (9:19,5), así que mide unos 150px en la tarjeta
// horizontal y 235px en la página del proyecto; en vertical, cerca de la mitad del
// ancho de la pantalla. Con el `sizes` de la placa pedía la imagen para 3840px.
const SHOT_SIZES = "(min-width: 48rem) 16rem, 50vw";

// La profundidad de cada captura de la página del proyecto (--k): cuánto se mueve con el
// scroll. La principal, adelante, más; las de atrás, menos.
const DEPTH = [1, 0.5, 0.75];

// Placa de un proyecto (docs/DISENO.md, 7.3 y 7.13): la captura en su marco, el logo
// sobre el color de la marca o el nombre en grande. La comparten la tarjeta de la home
// y la página del proyecto.
//  - media.type "shot": capturas de una app móvil, en un marco de teléfono.
//  - media.type "window": capturas de una app de escritorio, en una ventana de macOS.
//    Con `imageDark`, cada una tiene su versión oscura, que se muestra con el tema
//    oscuro del sitio (styles/projects.css).
//  - `href`: si viene, la placa es un enlace fuera del orden de foco y para los lectores
//    de pantalla, porque el botón de abajo ya lleva al mismo lado. `curtain` es el
//    nombre del destino: lleva a otra página, así que necesita la cortina igual que el
//    botón (components/Curtain.jsx solo mira los enlaces con data-curtain).
//  - `sizes`: el del <img>, que cambia según dónde se muestre.
//  - `gallery`: en la página del proyecto se suman las capturas de `media.gallery`,
//    detrás de la principal: los teléfonos en abanico, las ventanas en cascada.
// El logo y el nombre repiten el título, así que son decorativos (alt vacío). Las
// capturas no: muestran la app. En la página del proyecto llevan su descripción
// (`projects.<id>.shotAlt`, y `.shotAlt.<key>` las de la galería) y los lectores de
// pantalla la leen; en la tarjeta la placa entera es un enlace oculto que repite el
// botón, así que ahí sigue vacía.
export default function ProjectPlate({ project, t, sizes, href, curtain, gallery = false, className = "" }) {
  const { id, name, media } = project;
  const style = { ...(media.plate ? { "--plate": media.plate } : null) };
  const captures = media.type === "shot" || media.type === "window";
  const described = captures && !href;
  const alt = described ? t(`projects.${id}.shotAlt`, "") : "";

  const image = (src, file, text, imgClass) => (
    // eslint-disable-next-line @next/next/no-img-element -- los atributos salen de getImageProps (R-M15)
    <img
      {...getImageProps({
        src: file,
        width: src.width,
        height: src.height,
        sizes: media.type === "shot" ? SHOT_SIZES : sizes,
        alt: text,
      }).props}
      alt={text}
      className={imgClass}
    />
  );

  // La principal y, en la página, las de la galería, cada una con su descripción.
  const shots = [
    { shot: media, alt },
    ...(gallery && captures ? (media.gallery ?? []) : []).map((g) => ({
      shot: g,
      alt: described ? t(`projects.${id}.shotAlt.${g.key}`, "") : "",
    })),
  ];

  const phone = ({ shot, alt: text }, i) => (
    <span
      key={shot.image}
      className="plate__frame"
      style={{ "--shot-travel": `${(travel(shot) * 100).toFixed(2)}%`, "--k": DEPTH[i] ?? 0.5 }}
    >
      {image(shot, shot.image, text, "plate__shot")}
    </span>
  );

  // La ventana: la barra con los tres botones de macOS (decorativa) y la captura. Si hay
  // versión oscura van las dos, y el CSS muestra la del tema; la otra no se ve ni se lee.
  const desktop = ({ shot, alt: text }, i) => (
    <span key={shot.image} className="plate__window" style={{ "--k": DEPTH[i] ?? 0.5 }}>
      <span className="plate__bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      {shot.imageDark ? (
        <>
          {image(shot, shot.image, text, "plate__img--light")}
          {image(shot, shot.imageDark, text, "plate__img--dark")}
        </>
      ) : (
        image(shot, shot.image, text)
      )}
    </span>
  );

  let inner;
  if (media.type === "type") {
    inner = <span className="poster">{t(`projects.${id}.name`, name)}</span>;
  } else if (media.type === "shot") {
    inner = shots.length > 1 ? <span className="plate__fan">{shots.map(phone)}</span> : phone(shots[0], 0);
  } else if (media.type === "window") {
    inner = shots.length > 1 ? <span className="plate__stack">{shots.map(desktop)}</span> : desktop(shots[0], 0);
  } else {
    inner = image(media, media.image, "");
  }

  const Tag = href ? "a" : "div";
  const link = href
    ? { href, tabIndex: -1, "aria-hidden": true, "data-curtain": curtain }
    : alt
      ? null
      : { "aria-hidden": true };

  return (
    <Tag className={`card__plate card__plate--${media.type} ${className}`.trim()} style={style} {...link}>
      {inner}
    </Tag>
  );
}
