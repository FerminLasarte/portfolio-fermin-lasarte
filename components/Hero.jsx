"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageProvider";
import Dropdown from "@/components/Dropdown";
import { CV, DEVICON, HERO_BADGES, PERSON, ROLE_TAGLINE, STATS } from "@/lib/site";

export default function Hero() {
  const { t } = useLanguage();
  const heroRef = useRef(null);

  // Premium effect: 3D parallax + organic floating of the hero tech badges.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.innerWidth <= 768) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const badges = hero.querySelectorAll(".hero-badge-float");
    if (badges.length === 0) return;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let time = 0;
    let rafId;

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);

    const animate = () => {
      time += 0.025;
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      badges.forEach((badge, index) => {
        badge.style.animation = "none";
        const depth = ((index % 3) + 1.5) * -12;
        const floatY = Math.sin(time + index * 2) * 6;
        const isPython = badge.classList.contains("hero-badge-float--5");
        const baseX = isPython ? "-50%" : "0px";
        const tx = `calc(${baseX} + ${mouseX * depth}px)`;
        const ty = `${floatY + mouseY * depth}px`;
        badge.style.transform = `translate(${tx}, ${ty})`;
      });

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <header id="sobre-mi" ref={heroRef}>
      <div className="hero-content">
        <div className="hero-badges">
          <div className="availability-badge">
            <div className="status-dot" />
            <span>{t("hero.availability")}</span>
          </div>
          <div className="location-badge">
            <i className="fas fa-map-marker-alt" />
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
                <i className="fas fa-download" />
                <span>{t("hero.cvBtn")}</span>
              </>
            }
          >
            {CV.map((cv) => (
              <a key={cv.lang} href={cv.href} download={cv.download}>
                <i className="far fa-file-pdf" /> {cv.label}
              </a>
            ))}
          </Dropdown>
        </div>
      </div>

      <div className="hero-image animate-scale">
        <div className="hero-image-frame">
          <img src="/assets/foto_perfil.webp" width="560" height="715" alt={t("hero.photoAlt")} />
        </div>
        {HERO_BADGES.map((b) => (
          <div key={b.alt} className={`hero-badge-float hero-badge-float--${b.pos}`} aria-hidden="true">
            <img src={`${DEVICON}/${b.icon}.svg`} width="16" height="16" alt="" />
            <span>{b.alt}</span>
          </div>
        ))}
      </div>

      {/* Horizontal tech strip — visible only on mobile (floating badges hide ≤768px). */}
      <div className="hero-badges-mobile" aria-hidden="true">
        {HERO_BADGES.map((b) => (
          <div key={b.alt} className="mobile-badge">
            <img src={`${DEVICON}/${b.icon}.svg`} width="14" height="14" alt="" />
            <span>{b.alt}</span>
          </div>
        ))}
      </div>
    </header>
  );
}
