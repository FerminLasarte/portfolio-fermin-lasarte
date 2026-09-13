import Image from "next/image";
import Dropdown from "@/components/Dropdown";
import HeroParallax from "@/components/HeroParallax";
import { CV, DEVICON, HERO_BADGES, PERSON, ROLE_TAGLINE, STATS } from "@/lib/site";
import Icon from "@/components/Icon";
import { faDownload, faFilePdf, faLocationDot } from "@/lib/icons";

export default function Hero({ t }) {
  return (
    <header id="sobre-mi">
      <HeroParallax />
      <div className="hero-content">
        <div className="hero-badges">
          <div className="availability-badge">
            <div className="status-dot" />
            <span>{t("hero.availability")}</span>
          </div>
          <div className="location-badge">
            <Icon icon={faLocationDot} />
            <span>{PERSON.location}</span>
          </div>
        </div>

        <h1>
          <span>{t("hero.greeting")}</span>
          <span className="hero-name"> {PERSON.firstName}</span>
        </h1>

        <p className="hero-role">{ROLE_TAGLINE}</p>

        <p className="hero-desc">{t("hero.description")}</p>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">{STATS.appsLive}</span>
            <span className="stat-label">{t("hero.stat1")}</span>
          </div>
          <div className="stat-divider" aria-hidden="true" />
          <div className="stat">
            <span className="stat-number">{STATS.years}+</span>
            <span className="stat-label">{t("hero.stat2")}</span>
          </div>
          <div className="stat-divider" aria-hidden="true" />
          <div className="stat">
            <span className="stat-number">{STATS.projects}+</span>
            <span className="stat-label">{t("hero.stat3")}</span>
          </div>
        </div>

        <div className="hero-buttons">
          <a href="#proyectos" className="btn">
            {t("hero.projectsBtn")}
          </a>
          <a href="#contacto" className="btn btn-outline">
            {t("hero.contactBtn")}
          </a>
          <Dropdown
            triggerClassName="btn btn-ghost"
            triggerContent={
              <>
                <Icon icon={faDownload} />
                <span>{t("hero.cvBtn")}</span>
              </>
            }
          >
            {CV.map((cv) => (
              <a key={cv.lang} href={cv.href} download={cv.download}>
                <Icon icon={faFilePdf} /> {cv.label}
              </a>
            ))}
          </Dropdown>
        </div>
      </div>

      {/* La foto es el LCP: sin animación de entrada y con prioridad alta. */}
      <div className="hero-image">
        <div className="hero-image-frame">
          <Image
            src="/assets/foto_perfil.webp"
            width={560}
            height={715}
            sizes="(max-width: 25rem) 8.5rem, (max-width: 48rem) 10rem, (max-width: 56.25rem) 12rem, 17rem"
            priority
            fetchPriority="high"
            alt={t("hero.photoAlt")}
          />
        </div>
        {HERO_BADGES.map((b) => (
          <div key={b.alt} className={`hero-badge-float hero-badge-float--${b.pos}`} aria-hidden="true">
            <Image src={`${DEVICON}/${b.icon}.svg`} width={16} height={16} alt="" loading="eager" />
            <span>{b.alt}</span>
          </div>
        ))}
      </div>

      {/* Horizontal tech strip — visible only on mobile (floating badges hide ≤768px). */}
      <div className="hero-badges-mobile" aria-hidden="true">
        {HERO_BADGES.map((b) => (
          <div key={b.alt} className="mobile-badge">
            <Image src={`${DEVICON}/${b.icon}.svg`} width={14} height={14} alt="" loading="eager" />
            <span>{b.alt}</span>
          </div>
        ))}
      </div>
    </header>
  );
}
