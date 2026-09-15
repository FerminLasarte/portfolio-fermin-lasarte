"use client";

import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Icon from "@/components/Icon";
import { faGithub, faLinkedin } from "@/lib/icons";

const MOBILE = "(max-width: 47.99rem)";

// Nav (docs/DISENO.md, 7.1). Recibe los textos ya traducidos desde Document, así el
// diccionario no viaja al navegador.
//  - brand: { href, label }. El nombre, que lleva al hero.
//  - links: [{ id, href, label }]. Anclas nativas a la home del idioma ("/#proyectos",
//    "/en#proyectos"); la sección actual (aria-current) la marca TrackController.
//  - switchTo: el otro idioma, { lang, href, name }.
//  - labels: { sections, menu, close, lang, theme }.
//  - social: { github, linkedin }.
// En móvil las secciones van en un menú a pantalla completa (I1): un <button> con
// aria-expanded y aria-controls que cierra con Escape. Sin JS no hay botón y la lista
// se ve directamente (styles/nav.css).
export default function Nav({ brand, links, switchTo, labels, social }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  // El nombre, como el logo de douglus: con mouse se ve el nombre y el apellido
  // aparece letra por letra al pasar por encima o al enfocarlo (styles/nav.css).
  const [brandState, setBrandState] = useState("");
  const [first, ...rest] = brand.label.split(" ");
  const last = rest.join(" ");
  const showLast = () => setBrandState("in");
  const hideLast = () => setBrandState("out");

  // El cambio de idioma vuelve a la sección visible (/en#proyectos).
  const handleLangClick = (e) => {
    const current = document.querySelector("a[data-section][aria-current]")?.dataset.section;
    if (current) e.currentTarget.href = `${switchTo.href}#${current}`;
  };

  // Con el menú abierto, el resto de la página queda inerte; Escape lo cierra y
  // devuelve el foco al botón, y se cierra solo si la ventana deja de ser de móvil.
  useEffect(() => {
    if (!open) return;
    const rest = document.querySelectorAll("main, body > footer, .strip");
    rest.forEach((el) => (el.inert = true));
    const mq = matchMedia(MOBILE);
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onResize = () => {
      if (!mq.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => {
      rest.forEach((el) => (el.inert = false));
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open]);

  const sectionLinks = (className, onClick) =>
    links.map((link, i) => (
      <li key={link.id} style={{ "--i": i }}>
        <a className={className} href={link.href} data-section={link.id} onClick={onClick}>
          {link.label}
        </a>
      </li>
    ));

  const socialLinks = (className) => (
    <>
      <a className={className} href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <Icon icon={faGithub} />
      </a>
      <a className={className} href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <Icon icon={faLinkedin} />
      </a>
    </>
  );

  return (
    <>
      <header className="nav">
        <a
          className="nav__brand"
          href={brand.href}
          data-brand={brandState}
          onMouseEnter={showLast}
          onMouseLeave={hideLast}
          onFocus={showLast}
          onBlur={hideLast}
        >
          {first}
          {last && (
            <span className="brand__last">
              <span className="brand__chars" aria-hidden="true" style={{ "--n": last.length }}>
                {[...last].map((ch, i) => (
                  <span key={i} className="brand__ch" style={{ "--i": i }}>
                    {ch}
                  </span>
                ))}
              </span>
              <span className="sr-only"> {last}</span>
            </span>
          )}
        </a>
        <nav className="nav__sections" aria-label={labels.sections}>
          <ul className="nav__links">{sectionLinks("strike")}</ul>
        </nav>
        <div className="nav__tools">
          <a
            className="tool"
            href={switchTo.href}
            hrefLang={switchTo.lang}
            aria-label={`${labels.lang}: ${switchTo.name}`}
            onClick={handleLangClick}
          >
            {switchTo.lang.toUpperCase()}
          </a>
          <ThemeToggle className="tool tool--wide" label={labels.theme} />
          {socialLinks("tool tool--wide")}
          <button
            ref={buttonRef}
            type="button"
            className="btn nav__menu"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="swap">
              <span aria-hidden={open}>{labels.menu}</span>
              <span aria-hidden={!open}>{labels.close}</span>
            </span>
          </button>
        </div>
      </header>

      <div id="menu" className="menu" hidden={!open}>
        <nav aria-label={labels.sections}>
          <ul className="menu__links">{sectionLinks(undefined, () => setOpen(false))}</ul>
        </nav>
        <div className="menu__foot">
          <ThemeToggle className="tool" label={labels.theme} />
          {socialLinks("tool")}
        </div>
      </div>
    </>
  );
}
