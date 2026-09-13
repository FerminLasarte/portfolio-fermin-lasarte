"use client";

import { useLanguage } from "@/context/LanguageProvider";
import Dropdown from "@/components/Dropdown";
import Terminal from "@/components/Terminal";

const STORES = {
  appstore: { icon: "fab fa-apple", label: "App Store" },
  playstore: { icon: "fab fa-google-play", label: "Google Play" },
};

const LINKS = {
  repo: { icon: "fab fa-github", labelKey: "projects.code" },
  demo: { icon: "fas fa-external-link-alt", labelKey: "projects.visit" },
};

function ProjectMedia({ project }) {
  const { media, status, name } = project;

  if (media.type === "terminal") {
    return (
      <div className="bento-card__image" style={{ background: "#1e1e1e" }}>
        <div className="engineer-terminal" style={{ height: "100%", border: "none", borderRadius: 0 }}>
          <div className="terminal-header">
            <div className="terminal-btn btn-close" />
            <div className="terminal-btn btn-min" />
            <div className="terminal-btn btn-max" />
          </div>
          <Terminal />
        </div>
      </div>
    );
  }

  const alt = `${name} screenshot`;
  const bgStyle = media.image
    ? { backgroundImage: `url('${media.image}')` }
    : { background: media.background };

  return (
    <div className="bento-card__image">
      <div className="bento-card__bg" style={bgStyle} />
      {status === "wip" && <div className="bento-wip-badge">WIP</div>}
      {media.type === "phone" && (
        <div className={`phone-mockup${media.small ? " phone-mockup--sm" : ""}`}>
          <div className="phone-mockup__screen">
            <img src={media.image} alt={alt} />
          </div>
        </div>
      )}
      {media.type === "browser" && (
        <div className="browser-mockup">
          <div className="browser-mockup__bar">
            <span className="browser-dot browser-dot--red" />
            <span className="browser-dot browser-dot--yellow" />
            <span className="browser-dot browser-dot--green" />
            <span className="browser-url">{media.url}</span>
          </div>
          <div className="browser-mockup__screen">
            <img src={media.image} alt={alt} />
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

export default function ProjectCard({ project }) {
  const { t } = useLanguage();
  const { id, name, size, status, badge, primary, tags, links } = project;

  const stores = links.filter((l) => l.type in STORES);
  const others = links.filter((l) => !(l.type in STORES));
  const btnClass = `btn btn-sm${primary ? "" : " btn-outline"}`;
  const problem = t(`projects.${id}.problem`, null);
  const showMeta = status === "live" || stores.length > 0 || badge;
  const showLinks = links.length > 0 || status === "wip";

  return (
    <article className={`bento-card${size ? ` bento-card--${size}` : ""} premium-reveal`}>
      <ProjectMedia project={project} />
      <div className="bento-card__content">
        {showMeta && (
          <div className="bento-card__meta">
            {status === "live" && (
              <div className="production-status">
                <span className="status-dot-sm" />
                <span>{t("projects.live")}</span>
              </div>
            )}
            {stores.length > 0 && (
              <div className="bento-card__platform">
                {stores.map((l) => (
                  <i key={l.type} className={STORES[l.type].icon} title={STORES[l.type].label} />
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
          {tags.map((tag) => {
            const label = typeof tag === "string" ? tag : t(tag.key);
            return (
              <span key={label} className="tag">
                {label}
              </span>
            );
          })}
        </div>
        {showLinks && (
          <div className="project-links">
            {stores.length > 0 && (
              <Dropdown
                up
                triggerClassName={`${btnClass} dropdown-btn`}
                triggerContent={
                  <>
                    <i className="fas fa-download" />
                    <span>{t("projects.download")}</span>
                  </>
                }
              >
                {stores.map((l) => (
                  <a key={l.type} href={l.url} target="_blank" rel="noopener noreferrer">
                    <i className={STORES[l.type].icon} /> {STORES[l.type].label}
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
                <i className={LINKS[l.type].icon} />
                <span>{t(LINKS[l.type].labelKey)}</span>
              </a>
            ))}
            {links.length === 0 && (
              <button className="btn btn-sm btn-outline btn-private" disabled>
                <i className="fas fa-lock" />
                <span>{t("projects.soon")}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
