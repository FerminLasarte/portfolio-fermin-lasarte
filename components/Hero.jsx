import { preload } from "react-dom";
import { getImageProps } from "@/lib/image";
import DraggablePhoto from "@/components/DraggablePhoto";
import LocalTime from "@/components/LocalTime";
import ProjectPicture from "@/components/ProjectPicture";
import { projectPath } from "@/lib/i18n";
import { CURRENT_WORK, CV, FOCUS, LATEST_WORK, PERSON, ROLE } from "@/lib/site";
import { wordStarts } from "@/lib/text";

// Un enlace a la página de un trabajo, con la cortina (docs/DISENO.md, 8).
function WorkLink({ project, name, lang, children }) {
  return (
    <a className="strike" href={projectPath(lang, project.id)} data-curtain={name}>
      {children ?? name}
    </a>
  );
}

// Hero (docs/DISENO.md, 7.2). En horizontal es un panel de una pantalla. Arriba, cuatro
// datos (disponibilidad, base con la hora, lo que está en curso y el enfoque); al medio,
// el párrafo con los botones y la tarjeta del último trabajo; abajo, el nombre. El
// nombre va en el <h1> como texto real; las letras sueltas son solo visuales, para la
// entrada letra por letra (styles/motion.css). La foto es el LCP: sin animación de
// entrada.
export default function Hero({ t, lang }) {
  const cv = CV.find((c) => c.lang === lang) ?? CV[0];
  const words = PERSON.name.split(" ");
  // Índice de la primera letra de cada palabra, para el retraso de la entrada.
  const starts = wordStarts(words);
  const nameOf = (project) => t(`projects.${project.id}.name`, project.name);

  // "Construyendo Bookit y chatbot-ai": cada trabajo en curso lleva a su página.
  const current = CURRENT_WORK.flatMap((project, i) => [
    i === 0 ? "" : i === CURRENT_WORK.length - 1 ? ` ${t("projects.and")} ` : ", ",
    <WorkLink key={project.id} project={project} name={nameOf(project)} lang={lang} />,
  ]);
  const facts = [
    { key: "avail", value: t("hero.availability") },
    {
      key: "base",
      value: (
        <>
          {PERSON.city}
          <LocalTime lang={lang} timeZone={PERSON.timeZone} />
        </>
      ),
    },
    CURRENT_WORK.length > 0 && { key: "now", value: <>{t("hero.now")} {current}</> },
    { key: "focus", value: FOCUS.join(" · ") },
  ].filter(Boolean);

  // La foto con getImageProps (lib/image.js) y un <img> común (R-M15): los mismos
  // atributos que <Image>, armados en el servidor, sin el componente de cliente de
  // next/image. La precarga que ponía <Image> se pide acá, como lo hace Next por dentro.
  const { props: photo } = getImageProps({
    src: "/assets/fermin.webp",
    width: 1120,
    height: 1400,
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
      <dl className="hero__facts">
        {facts.map((fact) => (
          <div key={fact.key} className={`hero__fact hero__fact--${fact.key}`}>
            <dt className="meta">{t(`hero.fact.${fact.key}`)}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="hero__copy">
        {/* El cargo está en inglés en los dos idiomas: en la página en español lleva
            lang="en", así un lector de pantalla no lo lee con fonética española (R-M13). */}
        <p className="hero__lead">
          <strong lang={lang === "en" ? undefined : "en"}>{ROLE}.</strong> {t("hero.lead")}
        </p>
        <div className="hero__ctas">
          <a className="btn btn--primary" href="#trabajos">
            <span className="btn__label">{t("hero.projectsBtn")}</span>
          </a>
          <a className="btn" href={cv.href} download={cv.download}>
            <span className="btn__label">{t("hero.cvBtn")}</span>
          </a>
        </div>
      </div>

      {LATEST_WORK && (
        <div className="hero__latest">
          <span className="phone hero__phone" aria-hidden="true">
            <ProjectPicture media={LATEST_WORK.media} sizes="7rem" />
          </span>
          <div className="hero__latest-text">
            <p className="meta">
              {t("hero.latest")} · <span className="is-live">{t("projects.live")}</span>
            </p>
            <p className="hero__latest-name poster">{nameOf(LATEST_WORK)}</p>
            <p className="hero__latest-line">{t(`exp.${LATEST_WORK.id}.short`)}</p>
            <WorkLink project={LATEST_WORK} name={nameOf(LATEST_WORK)} lang={lang}>
              {t("page.seeProject")}
              <span className="sr-only"> {nameOf(LATEST_WORK)}</span>
            </WorkLink>
          </div>
        </div>
      )}

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
