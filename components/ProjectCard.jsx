import Image from "next/image";
import Roll from "@/components/Roll";
import Icon from "@/components/Icon";
import { isFeatured } from "@/lib/site";
import { faApple, faGithub, faGooglePlay, faUpRightFromSquare } from "@/lib/icons";

// Un botón por destino (I15): las tiendas directo, sin dropdown.
const LINKS = {
  appstore: { icon: faApple, label: () => "App Store" },
  playstore: { icon: faGooglePlay, label: () => "Google Play" },
  repo: { icon: faGithub, label: (t) => t("projects.code") },
  demo: { icon: faUpRightFromSquare, label: (t) => t("projects.visit") },
};

const PLATFORMS = { ios: "iOS", android: "Android" };

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" };

// Tarjeta de proyecto (docs/DISENO.md, 7.3). De arriba a abajo: la placa, el estado y
// las plataformas en texto, el título, el problema (si hay) y la solución, las
// tecnologías y los enlaces. Las apps móviles en producción van en un panel más ancho.
function Plate({ project, t, featured }) {
  const { id, name, media, links } = project;
  const style = media.plate ? { "--plate": media.plate } : undefined;

  // La placa lleva al destino principal, fuera del orden de foco: los botones de
  // abajo ya tienen el mismo enlace.
  return (
    <a
      className={`card__plate card__plate--${media.type}`}
      href={links[0].url}
      tabIndex={-1}
      aria-hidden="true"
      style={style}
      {...EXTERNAL}
    >
      {media.type === "type" ? (
        <span>{t(`projects.${id}.name`, name)}</span>
      ) : (
        <Image
          src={media.image}
          width={media.width}
          height={media.height}
          sizes={featured ? "(min-width: 64rem) 34vw, 80vw" : "(min-width: 64rem) 22vw, (min-width: 48rem) 36vw, 80vw"}
          alt=""
        />
      )}
    </a>
  );
}

export default function ProjectCard({ project, t }) {
  const { id, name, status, platforms = [], tags, links } = project;
  const featured = isFeatured(project);
  const problem = t(`projects.${id}.problem`, null);
  const platformText = platforms.map((p) => PLATFORMS[p]).join(` ${t("projects.and")} `);
  const titleId = `proyecto-${id}-t`;

  return (
    <article
      id={`proyecto-${id}`}
      className={`panel card ${featured ? "panel--card-lg card--lg" : "panel--card"}`}
      data-section="proyectos"
      data-label={t("nav.projects")}
      aria-labelledby={titleId}
    >
      <Plate project={project} t={t} featured={featured} />

      {(status || platformText) && (
        <p className="card__meta meta">
          {status && <span className={status === "live" ? "is-live" : undefined}>{t(`projects.${status}`)}</span>}
          {platformText && <span>{platformText}</span>}
        </p>
      )}

      <h3 className="card__title" id={titleId}>
        {t(`projects.${id}.title`, name)}
      </h3>

      <div className="card__text">
        {problem && <p className="card__problem">{problem}</p>}
        <p>{t(`projects.${id}.solution`)}</p>
      </div>

      <p className="card__tags meta">{tags.join(", ")}</p>

      <div className="card__links">
        {links.map((link, i) => {
          const { icon, label } = LINKS[link.type];
          return (
            <a key={link.url} className={i === 0 ? "btn btn--primary" : "btn"} href={link.url} {...EXTERNAL}>
              <Icon icon={icon} />
              <Roll>{label(t)}</Roll>
            </a>
          );
        })}
      </div>
    </article>
  );
}
