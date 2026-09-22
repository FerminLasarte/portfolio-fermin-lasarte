import { getImageProps } from "@/lib/image";

// Proporción del marco de teléfono: la de una pantalla de iPhone moderno.
const FRAME = 19.5 / 9;

// Cuánto puede desplazarse una captura dentro del marco, como porcentaje de su propio
// alto: lo que le sobra después de llenarlo. Una captura de una pantalla entra justa y
// da 0 (queda quieta y encuadrada); una captura larga, de scroll, da el recorrido.
const travel = ({ width, height }) => Math.max(0, 1 - (FRAME * width) / height);

// Placa de un proyecto (docs/DISENO.md, 7.3): la captura dentro del marco, el logo
// sobre el color de la marca o el nombre en grande. La comparten la tarjeta de la home
// y la página del proyecto.
//  - `href`: si viene, la placa es un enlace fuera del orden de foco y para los lectores
//    de pantalla, porque el botón de abajo ya lleva al mismo lado. `curtain` es el
//    nombre del destino: lleva a otra página, así que necesita la cortina igual que el
//    botón (components/Curtain.jsx solo mira los enlaces con data-curtain).
//  - `sizes`: el del <img>, que cambia según dónde se muestre.
// El contenido es decorativo en los tres casos (el logo y el nombre repiten el título),
// así que va con alt vacío. Cuando lleguen las capturas (I12), cada una necesita su
// propia descripción: ahí esto deja de alcanzar.
export default function ProjectPlate({ project, t, sizes, href, curtain, className = "" }) {
  const { id, name, media } = project;
  const style = { ...(media.plate ? { "--plate": media.plate } : null) };
  const image = (extra) => (
    // eslint-disable-next-line @next/next/no-img-element -- los atributos salen de getImageProps (R-M15)
    <img
      {...getImageProps({ src: media.image, width: media.width, height: media.height, sizes, alt: "" }).props}
      alt=""
      {...extra}
    />
  );

  let inner;
  if (media.type === "type") {
    inner = <span className="poster">{t(`projects.${id}.name`, name)}</span>;
  } else if (media.type === "shot") {
    style["--shot-travel"] = `${(travel(media) * 100).toFixed(2)}%`;
    inner = <span className="plate__frame">{image({ className: "plate__shot" })}</span>;
  } else {
    inner = image();
  }

  const Tag = href ? "a" : "div";
  const link = href ? { href, tabIndex: -1, "aria-hidden": true, "data-curtain": curtain } : { "aria-hidden": true };

  return (
    <Tag className={`card__plate card__plate--${media.type} ${className}`.trim()} style={style} {...link}>
      {inner}
    </Tag>
  );
}
