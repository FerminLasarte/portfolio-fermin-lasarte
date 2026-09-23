import { getT, homeUrl } from "@/lib/i18n";
import { LD_ID, PROJECTS, SITE_TITLE, STAGES, isFeatured } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
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

  // La home es la página de perfil de la persona que define el layout (R-M25).
  const profile = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: homeUrl(lang),
    name: SITE_TITLE,
    inLanguage: lang,
    isPartOf: { "@id": LD_ID.website },
    mainEntity: { "@id": LD_ID.person },
  };

  return (
    <>
      <JsonLd data={profile} />
      <Preloader words={t("preloader.words")} />
      <Track cards={PROJECTS.length - cardsLg} cardsLg={cardsLg} stages={STAGES.length}>
        <Hero t={t} lang={lang} />
        <Projects t={t} lang={lang} />
        <Trajectory t={t} lang={lang} />
        <Skills t={t} lang={lang} />
        <Contact t={t} />
      </Track>
      <Strip t={t} />
    </>
  );
}
