import { preload } from "react-dom";
import { getImageProps } from "@/lib/image";
import Draggable from "@/components/Draggable";
import { CV, PERSON } from "@/lib/site";
import { wordStarts } from "@/lib/text";

// Los iconos del escritorio: una carpeta, un PDF y un sobre, en los colores del sitio.
const FOLDER = (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path className="icon-accent" d="M6 16a4 4 0 0 1 4-4h14l6 6h24a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z" />
    <path className="icon-accent-light" d="M6 24h52v26a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z" />
  </svg>
);
const PDF = (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path className="icon-paper" d="M16 6h22l12 12v38a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
    <path className="icon-fold" d="M38 6v12h12" />
    <rect className="icon-accent" x="18" y="38" width="28" height="12" rx="2" />
    <text className="icon-tag" x="32" y="47" textAnchor="middle">
      PDF
    </text>
  </svg>
);
const MAIL = (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <rect className="icon-paper" x="8" y="14" width="48" height="36" rx="6" />
    <path className="icon-flap" d="m10 18 22 16 22-16" />
  </svg>
);

// La barra de una ventana de macOS (la de styles/projects.css) con su título al medio.
function Bar({ title }) {
  return (
    <div className="plate__bar hero__bar" aria-hidden="true">
      <span />
      <span />
      <span />
      <small>{title}</small>
    </div>
  );
}

// Hero (docs/DISENO.md, 7.2): un escritorio. De fondo, el nombre enorme en contorno;
// encima, cosas para mover: una terminal con la presentación, la foto en su ventana y un
// papel con la disponibilidad. A la derecha, los iconos: Trabajos, el CV y el mail. El
// nombre real va en el <h1> de la terminal; el del fondo es visual, con la entrada letra
// por letra (styles/motion.css). La foto es el LCP: sin animación de entrada.
export default function Hero({ t, lang }) {
  const cv = CV.find((c) => c.lang === lang) ?? CV[0];
  const words = PERSON.name.split(" ");
  // Índice de la primera letra de cada palabra, para el retraso de la entrada.
  const starts = wordStarts(words);
  const drag = t("hero.dragCursor");

  // La foto con getImageProps (lib/image.js) y un <img> común (R-M15): los mismos
  // atributos que <Image>, armados en el servidor, sin el componente de cliente de
  // next/image. La precarga que ponía <Image> se pide acá, como lo hace Next por dentro.
  const { props: photo } = getImageProps({
    src: "/assets/fermin.webp",
    width: 1120,
    height: 1400,
    sizes: "(min-width: 64rem) 20vw, (min-width: 48rem) 18rem, 20rem",
    loading: "eager",
    fetchPriority: "high",
    draggable: false,
    alt: t("hero.photoAlt"),
  });
  preload(photo.src, { as: "image", imageSrcSet: photo.srcSet, imageSizes: photo.sizes, fetchPriority: "high" });

  const icons = [
    { key: "work", href: "#trabajos", label: t("hero.icon.work"), art: FOLDER },
    { key: "cv", href: cv.href, download: cv.download, label: cv.download, extra: t("hero.icon.cv"), art: PDF },
    { key: "mail", href: `mailto:${PERSON.email}`, label: t("hero.icon.mail"), art: MAIL },
  ];

  return (
    <section
      id="sobre-mi"
      className="panel panel--screen hero"
      data-section="sobre-mi"
      data-label={t("nav.about")}
      aria-labelledby="hero-name"
    >
      <p className="hero__name display" aria-hidden="true">
        {words.map((word, w) => (
          <span key={word} className="line">
            {[...word].map((ch, k) => (
              <span key={k} className="ch" style={{ "--i": starts[w] + k }}>
                {ch}
              </span>
            ))}
          </span>
        ))}
      </p>

      <div className="hero__obj hero__obj--term">
        <Draggable label={drag}>
          <div className="hero__win hero__term">
            <Bar title="fermin — zsh" />
            <div className="hero__term-body">
              <p className="hero__cmd" aria-hidden="true">
                <span className="hero__prompt">~ %</span> whoami
              </p>
              <h1 id="hero-name" className="hero__title poster">
                {PERSON.name}
              </h1>
              <p>{t("hero.lead.1")}</p>
              <p>{t("hero.lead.2")}</p>
              <p className="hero__cmd" aria-hidden="true">
                <span className="hero__prompt">~ %</span> <span className="hero__caret" />
              </p>
            </div>
          </div>
        </Draggable>
      </div>

      <div className="hero__obj hero__obj--photo">
        <Draggable label={drag} trail>
          <div className="hero__win">
            <Bar title="fermin.jpg" />
            <div className="hero__photo">
              {/* eslint-disable-next-line @next/next/no-img-element -- los atributos salen de getImageProps (R-M15) */}
              <img {...photo} alt={photo.alt} />
            </div>
          </div>
        </Draggable>
      </div>

      <div className="hero__obj hero__obj--note">
        <Draggable label={drag}>
          <p className="hero__note">
            {t("hero.note")}
            <small>
              {PERSON.city}, {PERSON.country}
            </small>
          </p>
        </Draggable>
      </div>

      <ul className="hero__icons">
        {icons.map((icon) => (
          <li key={icon.key}>
            <a className="hero__icon" href={icon.href} download={icon.download}>
              {icon.art}
              <span className="hero__icon-label">{icon.label}</span>
              {icon.extra && <span className="sr-only">, {icon.extra}</span>}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
