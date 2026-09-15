import Image from "next/image";
import DraggablePhoto from "@/components/DraggablePhoto";
import Roll from "@/components/Roll";
import { CV, PERSON, ROLE } from "@/lib/site";

// Hero (docs/DISENO.md, 7.2). En horizontal es un panel de una pantalla. El nombre va
// en el <h1> como texto real; las letras sueltas son solo visuales, para la entrada
// letra por letra (styles/motion.css). La foto es el LCP: sin animación de entrada.
export default function Hero({ t, lang }) {
  const cv = CV.find((c) => c.lang === lang) ?? CV[0];
  const words = PERSON.name.split(" ");
  // Índice de la primera letra de cada palabra, para el retraso de la entrada.
  const starts = words.map((_, w) => words.slice(0, w).join("").length);

  return (
    <section
      id="sobre-mi"
      className="panel panel--screen hero"
      data-section="sobre-mi"
      data-label={t("nav.about")}
      aria-labelledby="hero-name"
    >
      <p className="hero__avail meta">{t("hero.availability")}</p>

      <div className="hero__copy">
        <p className="hero__lead">
          <strong>{ROLE}.</strong> {t("hero.lead")}
        </p>
        <div className="hero__ctas">
          <a className="btn btn--primary" href="#proyectos">
            <Roll>{t("hero.projectsBtn")}</Roll>
          </a>
          <a className="btn" href={cv.href} download={cv.download}>
            <Roll>{t("hero.cvBtn")}</Roll>
          </a>
        </div>
      </div>

      <h1 className="hero__name display" id="hero-name">
        <span className="sr-only">{PERSON.name}</span>
        <span aria-hidden="true">
          {words.map((word, w) => (
            <span key={word} className="line">
              {[...word].map((ch, k) => (
                <span key={k} className="ch" style={{ "--i": starts[w] + k }}>
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </span>
      </h1>

      <div className="hero__photo">
        <DraggablePhoto label={t("hero.dragCursor")}>
          <Image
            src="/assets/foto_perfil.webp"
            width={560}
            height={715}
            sizes="(min-width: 48rem) 42vw, 100vw"
            loading="eager"
            fetchPriority="high"
            draggable={false}
            alt={t("hero.photoAlt")}
          />
        </DraggablePhoto>
      </div>
    </section>
  );
}
