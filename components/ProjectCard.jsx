import Image from "next/image";
import Dropdown from "@/components/Dropdown";
import Terminal from "@/components/Terminal";
import { fill } from "@/lib/translations";
import Icon from "@/components/Icon";
import { faApple, faDownload, faGithub, faGooglePlay, faLock, faUpRightFromSquare } from "@/lib/icons";

const STORES = {
  appstore: { icon: faApple, label: "App Store" },
  playstore: { icon: faGooglePlay, label: "Google Play" },
};

const PLATFORMS = {
  ios: { icon: faApple, label: "iOS" },
  android: { icon: faGooglePlay, label: "Android" },
};

const LINKS = {
  repo: { icon: faGithub, labelKey: "projects.code" },
  demo: { icon: faUpRightFromSquare, labelKey: "projects.visit" },
};

function ProjectMedia({ project, t }) {
  const { id, media, status, name } = project;

  if (media.type === "terminal") {
    return (
      <div className="bento-card__image" style={{ background: "#1e1e1e" }}>
        <div className="engineer-terminal" style={{ height: "100%", border: "none", borderRadius: 0 }}>
          <div className="terminal-header">
            <div className="terminal-btn btn-close" />
            <div className="terminal-btn btn-min" />
            <div className="terminal-btn btn-max" />
          </div>
          <Terminal lines={t(`projects.${id}.terminal`)} />
        </div>
      </div>
    );
  }

  // El fondo difuminado usa la miniatura: con blur(14px) no se nota la diferencia.
  const bgStyle = media.thumb
    ? { backgroundImage: `url('${media.thumb}')` }
    : { background: media.background };

  return (
    <div className="bento-card__image">
      <div className="bento-card__bg" style={bgStyle} />
      {status === "wip" && <div className="bento-wip-badge">{t("projects.soon")}</div>}
      {media.type === "phone" && (
        <div className={`phone-mockup${media.small ? " phone-mockup--sm" : ""}`}>
          <div className="phone-mockup__screen">
            {/* La captura llena la pantalla con object-fit: cover, así que se dibuja
                más ancha que el teléfono: ~360px en el grande y ~290px en el chico. */}
            <Image
              src={media.image}
              width={media.width}
              height={media.height}
              sizes={media.small ? "290px" : "360px"}
              alt={fill(t("projects.screenshotAlt"), { name })}
            />
          </div>
        </div>
      )}
      {media.code && (
        <div className="bento-code-decoration" aria-hidden="true">
          {media.code.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectCard({ project, t }) {
  const { id, name, size, status, platforms = [], badge, primary, tags, links } = project;

  const stores = links.filter((l) => l.type in STORES);
  const others = links.filter((l) => !(l.type in STORES));
  const btnClass = `btn btn-sm${primary ? "" : " btn-outline"}`;
  const problem = t(`projects.${id}.problem`, null);
  const showMeta = status === "live" || platforms.length > 0 || badge;
  const showLinks = links.length > 0 || status === "wip";

  return (
    <article className={`bento-card${size ? ` bento-card--${size}` : ""} premium-reveal`}>
      <ProjectMedia project={project} t={t} />
      <div className="bento-card__content">
        {showMeta && (
          <div className="bento-card__meta">
            {status === "live" && (
              <div className="production-status">
                <span className="status-dot-sm" />
                <span>{t("projects.live")}</span>
              </div>
            )}
            {platforms.length > 0 && (
              <div className="bento-card__platform">
                {platforms.map((p) => (
                  <Icon key={p} icon={PLATFORMS[p].icon} title={PLATFORMS[p].label} />
                ))}
              </div>
            )}
            {badge && <div className="bento-saas-badge">{badge}</div>}
          </div>
        )}
        <h3>{t(`projects.${id}.title`, name)}</h3>
        <div className="project-story">
          {problem && (
            <div className="story-block">
              <span className="story-label">{t("projects.problem")}</span>
              <p>{problem}</p>
            </div>
          )}
          <div className="story-block">
            <span className="story-label story-label--accent">{t("projects.solution")}</span>
            <p>{t(`projects.${id}.solution`)}</p>
          </div>
        </div>
        <div className="project-tags">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        {showLinks && (
          <div className="project-links">
            {stores.length > 0 && (
              <Dropdown
                up
                triggerClassName={`${btnClass} dropdown-btn`}
                triggerContent={
                  <>
                    <Icon icon={faDownload} />
                    <span>{t("projects.download")}</span>
                  </>
                }
              >
                {stores.map((l) => (
                  <a key={l.type} href={l.url} target="_blank" rel="noopener noreferrer">
                    <Icon icon={STORES[l.type].icon} /> {STORES[l.type].label}
                  </a>
                ))}
              </Dropdown>
            )}
            {others.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className={btnClass}
              >
                <Icon icon={LINKS[l.type].icon} />
                <span>{t(LINKS[l.type].labelKey)}</span>
              </a>
            ))}
            {links.length === 0 && (
              <button className="btn btn-sm btn-outline btn-private" disabled>
                <Icon icon={faLock} />
                <span>{t("projects.soon")}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
