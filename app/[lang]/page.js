import { getT } from "@/lib/i18n";
import { PROJECTS, isFeatured } from "@/lib/site";
import Preloader from "@/components/Preloader";
import Track from "@/components/Track";
import Strip from "@/components/Strip";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Trajectory from "@/components/Trajectory";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

// Orden de los paneles (docs/DISENO.md, sección 5): Proyectos va justo después del
// hero (I15), y Experiencia y Educación van juntas en Trayectoria.
export default async function Home({ params }) {
  const { lang } = await params;
  const t = getT(lang);
  const cardsLg = PROJECTS.filter(isFeatured).length;

  return (
    <>
      <Preloader words={t("preloader.words")} />
      <Track cards={PROJECTS.length - cardsLg} cardsLg={cardsLg}>
        <Hero t={t} lang={lang} />
        <Projects t={t} />
        <Trajectory t={t} />
        <Skills t={t} />
        <Contact t={t} />
      </Track>
      <Strip t={t} />
    </>
  );
}
