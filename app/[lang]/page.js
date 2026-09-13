import { getT } from "@/lib/i18n";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default async function Home({ params }) {
  const { lang } = await params;
  const t = getT(lang);

  return (
    <>
      <Hero t={t} />
      <Experience t={t} />
      <Education t={t} />
      <Skills t={t} />
      <Projects t={t} />
      <Contact t={t} />
    </>
  );
}
