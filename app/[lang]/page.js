import { getT } from "@/lib/i18n";
import { PROJECTS, isFeatured } from "@/lib/site";
import Track from "@/components/Track";
import Strip from "@/components/Strip";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

// Orden de los paneles (docs/DISENO.md, sección 5): Proyectos va justo después del
// hero (I15).
export default async function Home({ params }) {
  const { lang } = await params;
  const t = getT(lang);
  const cardsLg = PROJECTS.filter(isFeatured).length;

  return (
    <>
      <Track cards={PROJECTS.length - cardsLg} cardsLg={cardsLg}>
        <Hero t={t} />
        <Projects t={t} />
        <Experience t={t} />
        <Education t={t} />
        <Skills t={t} />
        <Contact t={t} />
      </Track>
      <Strip t={t} lang={lang} />
    </>
  );
}
