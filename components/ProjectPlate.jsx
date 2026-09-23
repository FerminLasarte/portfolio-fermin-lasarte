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

// Placa de un proyecto (docs/DISENO.md, 7.3): la captura dentro del marco, el logo
// sobre el color de la marca o el nombre en grande. La comparten la tarjeta de la home
// y la página del proyecto.
//  - `href`: si viene, la placa es un enlace fuera del orden de foco y para los lectores
//    de pantalla, porque el botón de abajo ya lleva al mismo lado. `curtain` es el
//    nombre del destino: lleva a otra página, así que necesita la cortina igual que el
//    botón (components/Curtain.jsx solo mira los enlaces con data-curtain).
//  - `sizes`: el del <img>, que cambia según dónde se muestre.
//  - `gallery`: en la página del proyecto, las capturas de `media.gallery` van en abanico
//    detrás de la principal (docs/DISENO.md, 7.13). Cada una con su profundidad (--k),
//    que decide cuánto se mueve con el scroll: las de atrás, menos.
// El logo y el nombre repiten el título, así que son decorativos (alt vacío). La
// captura no: muestra la app. En la página del proyecto lleva su descripción
// (`projects.<id>.shotAlt`) y los lectores de pantalla la leen; en la tarjeta la placa
// entera es un enlace oculto que repite el botón, así que ahí sigue vacía.
// La profundidad de cada teléfono del abanico: el de adelante y, detrás, uno a cada lado.
const DEPTH = [1, 0.5, 0.75];

export default function ProjectPlate({ project, t, sizes, href, curtain, gallery = false, className = "" }) {
  const { id, name, media } = project;
  const style = { ...(media.plate ? { "--plate": media.plate } : null) };
  const described = media.type === "shot" && !href;
  const alt = described ? t(`projects.${id}.shotAlt`, "") : "";
  const image = (src, { alt: text, className: imgClass }) => (
    // eslint-disable-next-line @next/next/no-img-element -- los atributos salen de getImageProps (R-M15)
    <img
      {...getImageProps({
        src: src.image,
        width: src.width,
        height: src.height,
        sizes: media.type === "shot" ? SHOT_SIZES : sizes,
        alt: text,
      }).props}
      alt={text}
      className={imgClass}
    />
  );
  const frame = (shot, altText, extraStyle) => (
    <span
      key={shot.image}
      className="plate__frame"
      style={{ "--shot-travel": `${(travel(shot) * 100).toFixed(2)}%`, ...extraStyle }}
    >
      {image(shot, { className: "plate__shot", alt: altText })}
    </span>
  );

  let inner;
  if (media.type === "type") {
    inner = <span className="poster">{t(`projects.${id}.name`, name)}</span>;
  } else if (media.type === "shot" && gallery && media.gallery?.length) {
    const shots = [
      { shot: media, alt },
      ...media.gallery.map((g) => ({ shot: g, alt: described ? t(`projects.${id}.shotAlt.${g.key}`, "") : "" })),
    ];
    inner = (
      <span className="plate__fan">{shots.map((s, i) => frame(s.shot, s.alt, { "--k": DEPTH[i] ?? 0.5 }))}</span>
    );
  } else if (media.type === "shot") {
    inner = frame(media, alt);
  } else {
    inner = image(media, { alt: "" });
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
