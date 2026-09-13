"use client";

import { useEffect, useRef } from "react";
import { toggleTheme } from "@/lib/theme";
import { PERSON, SOCIAL } from "@/lib/site";

// Recibe los textos ya traducidos desde el layout (así el diccionario no viaja al
// navegador). `links`: [{ href, label }]; `switchTo`: el otro idioma, { lang, href }.
export default function Nav({ links, switchTo, langLabel, themeLabel }) {
  const navRef = useRef(null);
  // Sección visible, para que el cambio de idioma vuelva a la misma sección.
  const activeRef = useRef(null);

  // Smooth scroll with fixed-nav offset + collapse on touch devices.
  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const nav = navRef.current;
    nav?.classList.remove("nav-expanded");
    const offset = (nav?.offsetHeight ?? 0) + 24;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.pageYOffset - offset,
      behavior: "smooth",
    });
  };

  const handleLangClick = (e) => {
    if (activeRef.current) e.currentTarget.href = `${switchTo.href}#${activeRef.current}`;
  };

  // Active nav link highlight via IntersectionObserver.
  useEffect(() => {
    const navLinks = navRef.current?.querySelectorAll('.nav-links a[href^="#"]') ?? [];
    const sections = document.querySelectorAll("header[id], section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            activeRef.current = id;
            navLinks.forEach((l) =>
              l.classList.toggle("active", l.getAttribute("href") === `#${id}`),
            );
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Collapsible nav on touch devices.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const isTouch = () =>
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const onNavClick = (e) => {
      if (!isTouch()) return;
      if (e.target.closest(".nav-links a")) {
        nav.classList.remove("nav-expanded");
        return;
      }
      if (!e.target.closest(".dropdown-content")) {
        nav.classList.toggle("nav-expanded");
      }
    };

    const onDocClick = (e) => {
      if (isTouch() && !e.target.closest("nav")) nav.classList.remove("nav-expanded");
    };

    nav.addEventListener("click", onNavClick);
    document.addEventListener("click", onDocClick);
    return () => {
      nav.removeEventListener("click", onNavClick);
      document.removeEventListener("click", onDocClick);
    };
  }, []);

  return (
    <nav ref={navRef}>
      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={(e) => handleLinkClick(e, link.href)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="nav-controls">
        <a
          id="lang-toggle"
          className="icon-btn"
          href={switchTo.href}
          hrefLang={switchTo.lang}
          title={langLabel}
          onClick={handleLangClick}
        >
          {switchTo.lang.toUpperCase()}
        </a>
        <button
          id="theme-toggle"
          className="icon-btn"
          title={themeLabel}
          onClick={toggleTheme}
          aria-label={themeLabel}
        >
          <i className="fas fa-moon" />
          <i className="fas fa-sun" />
        </button>
        <a
          href={SOCIAL.github}
          target="_blank"
          rel="noopener noreferrer"
          className="icon-btn"
          title="GitHub"
        >
          <i className="fab fa-github" />
        </a>
        <a
          href={SOCIAL.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="icon-btn"
          title="LinkedIn"
        >
          <i className="fab fa-linkedin" />
        </a>
        <a href={`mailto:${PERSON.email}`} className="icon-btn" title="Email">
          <i className="fas fa-envelope" />
        </a>
      </div>
    </nav>
  );
}
