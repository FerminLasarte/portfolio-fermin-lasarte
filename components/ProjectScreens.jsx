import { getImageProps } from "@/lib/image";

// El `sizes` de cada captura. El teléfono mide unos 21rem de ancho desde escritorio (el
// alto de la pantalla menos el nav) y cerca del 45% de la pantalla en celular; la
// ventana, la columna izquierda de la historia (5/12 de la página) o casi todo el ancho.
const SIZES = {
  shot: "(min-width: 64rem) 22rem, 45vw",
  window: "(min-width: 64rem) 36vw, 90vw",
};

// Las capturas de un proyecto, o nada si no tiene (media.type "shot" o "window").
// La principal primero y después las de `media.gallery`, cada una con su descripción
// (`projects.<id>.shotAlt`, y `.shotAlt.<key>` las de la galería).
export function screensOf(project, t) {
  const { id, media } = project;
  if (media.type !== "shot" && media.type !== "window") return [];
  return [
    { shot: media, alt: t(`projects.${id}.shotAlt`, "") },
    ...(media.gallery ?? []).map((g) => ({ shot: g, alt: t(`projects.${id}.shotAlt.${g.key}`, "") })),
  ];
}

// Las pantallas de la página de un proyecto (docs/DISENO.md, 7.13): van en la columna
// izquierda de la historia, sin caja de color, y acompañan la lectura.
//  - Desde escritorio y con JS: quedan fijas mientras se leen los capítulos y se ve una
//    sola, la del capítulo que se está leyendo (components/ScreenSync.jsx cambia
//    .is-on). Los puntos de abajo dicen cuál de cuántas; son decorativos.
//  - Sin JS: todas, una debajo de otra, al lado del texto.
//  - En celular y tablet: antes de los capítulos. Dos o tres teléfonos van en abanico y
//    dos o tres ventanas en cascada; de más de tres, una fila que se desliza de costado
//    (se enfoca con Tab y se mueve con las flechas, y lleva su nombre).
// Las capturas muestran la app y llevan su descripción, que leen los lectores de
// pantalla. Con `imageDark`, cada ventana tiene su versión oscura, y el CSS muestra la
// del tema del sitio (styles/projects.css).
export default function ProjectScreens({ project, screens, t, name }) {
  const { type } = project.media;
  const sizes = SIZES[type];
  const n = screens.length;
  const layout = n > 3 ? "many" : n > 1 ? (type === "shot" ? "fan" : "cascade") : "one";

  const image = (shot, file, alt, cls) => (
    // eslint-disable-next-line @next/next/no-img-element -- los atributos salen de getImageProps (R-M15)
    <img
      {...getImageProps({ src: file, width: shot.width, height: shot.height, sizes, alt }).props}
      alt={alt}
      className={cls}
    />
  );

  const frame = ({ shot, alt }) =>
    type === "shot" ? (
      <span className="screens__phone">{image(shot, shot.image, alt)}</span>
    ) : (
      <span className="screens__window">
        <span className="plate__bar" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        {shot.imageDark ? (
          <>
            {image(shot, shot.image, alt, "plate__img--light")}
            {image(shot, shot.imageDark, alt, "plate__img--dark")}
          </>
        ) : (
          image(shot, shot.image, alt)
        )}
      </span>
    );

  return (
    <div className={`screens screens--${type} screens--${layout}`} data-screens data-reveal>
      <div
        className="screens__stack"
        {...(layout === "many"
          ? { tabIndex: 0, role: "region", "aria-label": t("projects.screens").replace("{name}", name) }
          : null)}
      >
        {screens.map((s, i) => (
          <div key={s.shot.image} className={`screens__item${i === 0 ? " is-on" : ""}`}>
            {frame(s)}
          </div>
        ))}
      </div>
      {screens.length > 1 && (
        <span className="screens__dots" aria-hidden="true">
          {screens.map((s, i) => (
            <span key={s.shot.image} className={i === 0 ? "is-on" : undefined} />
          ))}
        </span>
      )}
    </div>
  );
}
