import { preload } from "react-dom";
import { getImageProps } from "@/lib/image";
import DraggablePhoto from "@/components/DraggablePhoto";
import { CV, PERSON, ROLE } from "@/lib/site";

// Hero (docs/DISENO.md, 7.2). En horizontal es un panel de una pantalla. El nombre va
// en el <h1> como texto real; las letras sueltas son solo visuales, para la entrada
// letra por letra (styles/motion.css). La foto es el LCP: sin animación de entrada.
export default function Hero({ t, lang }) {
  const cv = CV.find((c) => c.lang === lang) ?? CV[0];
  const words = PERSON.name.split(" ");
  // Índice de la primera letra de cada palabra, para el retraso de la entrada.
  const starts = words.map((_, w) => words.slice(0, w).join("").length);

  // La foto con getImageProps (lib/image.js) y un <img> común (R-M15): los mismos
  // atributos que <Image>, armados en el servidor, sin el componente de cliente de
  // next/image. La precarga que ponía <Image> se pide acá, como lo hace Next por dentro.
  const { props: photo } = getImageProps({
    src: "/assets/foto_perfil.webp",
    width: 560,
    height: 715,
    sizes: "(min-width: 64rem) 24vw, (min-width: 48rem) 18rem, 20rem",
    loading: "eager",
    fetchPriority: "high",
    draggable: false,
    alt: t("hero.photoAlt"),
  });
  preload(photo.src, { as: "image", imageSrcSet: photo.srcSet, imageSizes: photo.sizes, fetchPriority: "high" });

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
        {/* El cargo está en inglés en los dos idiomas: en la página en español lleva
            lang="en", así un lector de pantalla no lo lee con fonética española (R-M13). */}
        <p className="hero__lead">
          <strong lang={lang === "en" ? undefined : "en"}>{ROLE}.</strong> {t("hero.lead")}
        </p>
        <div className="hero__ctas">
          <a className="btn btn--primary" href="#proyectos">
            <span className="btn__label">{t("hero.projectsBtn")}</span>
          </a>
          <a className="btn" href={cv.href} download={cv.download}>
            <span className="btn__label">{t("hero.cvBtn")}</span>
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
          {/* eslint-disable-next-line @next/next/no-img-element -- los atributos salen de getImageProps (R-M15) */}
          <img {...photo} alt={photo.alt} />
        </DraggablePhoto>
      </div>
    </section>
  );
}
