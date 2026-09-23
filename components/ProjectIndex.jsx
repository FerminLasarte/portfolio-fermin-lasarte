import WorksHover from "@/components/WorksHover";
import { getImageProps } from "@/lib/image";
import { projectPath } from "@/lib/i18n";
import { EXPERIENCE, PROJECTS } from "@/lib/site";
import { padded } from "@/lib/text";

// Anchos de las imágenes. La vista previa de un teléfono mide unos 17rem de ancho; la de
// una ventana, casi la mitad de la pantalla. La miniatura de cada fila (celular y sin
// JS), unos 3,5rem.
const SIZES = {
  shot: "(min-width: 64rem) 18rem, 1px",
  window: "(min-width: 64rem) 42vw, 1px",
  thumb: "4rem",
};

// La imagen de un proyecto en un tamaño: la clara y, si hay, la oscura, que se muestra
// con el tema oscuro del sitio (styles/projects.css). Decorativas: el nombre ya está en
// el enlace, y la descripción de cada captura en la página del proyecto.
function Picture({ media, sizes }) {
  const img = (src, cls) => (
    // eslint-disable-next-line @next/next/no-img-element -- los atributos salen de getImageProps (R-M15)
    <img
      {...getImageProps({ src, width: media.width, height: media.height, sizes, alt: "" }).props}
      alt=""
      className={cls}
    />
  );
  return media.imageDark ? (
    <>
      {img(media.image, "plate__img--light")}
      {img(media.imageDark, "plate__img--dark")}
    </>
  ) : (
    img(media.image)
  );
}

// La vista previa de un proyecto, sin caja de color: el teléfono, la ventana o, si no
// hay captura, el nombre en grande.
function Preview({ project, name }) {
  const { media } = project;
  if (media.type === "shot") {
    return (
      <span className="works__phone">
        <Picture media={media} sizes={SIZES.shot} />
      </span>
    );
  }
  if (media.type === "window") {
    return (
      <span className="works__window">
        <span className="plate__bar">
          <span />
          <span />
          <span />
        </span>
        <Picture media={media} sizes={SIZES.window} />
      </span>
    );
  }
  return <span className="works__type poster">{name}</span>;
}

// Índice de proyectos (docs/DISENO.md, 7.3): la lista de nombres en grande y, al lado, la
// pantalla del que está bajo el mouse o con foco. Lo usan la home (un solo panel de la
// pista, components/Projects.jsx) y /proyectos (components/ProjectsPage.jsx). Cada fila
// es un enlace a la página del proyecto, con la cortina.
//  - Con puntero fino, desde 64rem y con JS: dos columnas, y la vista previa cambia con
//    WorksHover. Sin JS, en celular o en tablet no hay vista previa: cada fila lleva su
//    miniatura.
//  - Nada se mueve con el scroll: la versión anterior (tarjetas con paralaje) recalculaba
//    los estilos de cada tarjeta en cada cuadro y se trababa.
//  - `children`: lo que va arriba de la lista (el título y las cifras, en la home).
export default function ProjectIndex({ t, lang, children }) {
  const rows = PROJECTS.map((project, i) => {
    const name = t(`projects.${project.id}.name`, project.name);
    // Años si el proyecto es una etapa de Trayectoria; si no, su estado.
    const stage = EXPERIENCE.find((e) => e.id === project.id);
    const when = stage
      ? stage.end != null
        ? `${stage.start}–${stage.end}`
        : `${stage.start} · ${t("exp.ongoing")}`
      : project.status && t(`projects.${project.status}`);
    const meta = [project.origin && t(`projects.origin.${project.origin}`), when].filter(Boolean).join(" · ");
    return { project, i, name, meta };
  });

  return (
    <div className="works" data-works>
      <div className="works__side">
        {children}
        <ol className="works__list">
          {rows.map(({ project, i, name, meta }) => (
            <li key={project.id} id={`proyecto-${project.id}`} className="works__row">
              <a
                className={`works__link${i === 0 ? " is-on" : ""}`}
                href={projectPath(lang, project.id)}
                data-curtain={name}
              >
                <span className="works__n">{padded(i + 1)}</span>
                <span className="works__name poster">{name}</span>
                <span className="works__meta meta">{meta}</span>
                {project.media.type !== "type" && (
                  <span className={`works__thumb works__thumb--${project.media.type}`} aria-hidden="true">
                    <Picture media={project.media} sizes={SIZES.thumb} />
                  </span>
                )}
                <span className="works__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>

      <div className="works__view" aria-hidden="true">
        {rows.map(({ project, i, name }) => (
          <figure key={project.id} className={`works__shot${i === 0 ? " is-on" : ""}`}>
            <Preview project={project} name={name} />
            <figcaption>{t(`projects.${project.id}.solution`)}</figcaption>
          </figure>
        ))}
      </div>

      <WorksHover />
    </div>
  );
}
