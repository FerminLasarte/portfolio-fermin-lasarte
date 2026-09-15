import { getImageProps } from "@/lib/image";
import { DEVICON, OTHER_SKILLS, PROJECTS, SKILL_GROUPS } from "@/lib/site";
import { homePath } from "@/lib/i18n";

// Página de Habilidades (docs/DISENO.md, 7.12): el detalle del muro de palabras de la home.
//  - Cada grupo de SKILL_GROUPS con sus tecnologías: icono, nombre, nivel en texto (M4)
//    y en qué proyectos de la home se usó (sale de los `tags` de PROJECTS).
//  - "Dónde las usé": una tabla de tecnologías por proyecto, con cada celda dicha en
//    texto para los lectores de pantalla (el punto es visual).
//  - "También": las que no tienen icono (OTHER_SKILLS).
// Un <h1> (el título) y un <h2> por bloque.
export default function SkillsPage({ t, lang }) {
  const home = homePath(lang);
  const usedIn = (name) => PROJECTS.filter((p) => p.tags.includes(name));
  // El nombre traducido, como en ProjectCard ("Compilador" / "Compiler").
  const projectName = (p) => t(`projects.${p.id}.name`, p.name);
  const rows = SKILL_GROUPS.flatMap((g) => g.skills)
    .map((skill) => ({ name: skill.name, used: new Set(usedIn(skill.name).map((p) => p.id)) }))
    .filter((row) => row.used.size > 0)
    .sort((a, b) => b.used.size - a.used.size);

  return (
    <article className="page" aria-labelledby="page-t">
      <header className="page__head">
        <h1 id="page-t" className="display page__title">
          {t("skills.title")}
        </h1>
        <p className="page__lead">{t("skills.pageLead")}</p>
      </header>

      {SKILL_GROUPS.map((group) => (
        <section key={group.id} className="skill-group" aria-labelledby={`grupo-${group.id}`}>
          <h2 id={`grupo-${group.id}`} className="chapter__title poster">
            {t(group.titleKey)}
          </h2>
          <ul className="skill-list">
            {group.skills.map((skill) => {
              const used = usedIn(skill.name);
              return (
                <li key={skill.name} className="skill-row">
                  {/* eslint-disable-next-line @next/next/no-img-element -- los atributos salen de getImageProps (R-M15) */}
                  <img
                    {...getImageProps({
                      src: `${DEVICON}/${skill.icon}.svg`,
                      alt: "",
                      width: 28,
                      height: 28,
                      style: skill.style,
                      ...(skill.darkInvert ? { "data-dark-invert": "" } : {}),
                    }).props}
                    alt=""
                  />
                  <span className="skill-row__name">{skill.name}</span>
                  <span className="skill-row__level meta">{t(`skills.level.${skill.level}`)}</span>
                  {used.length > 0 && (
                    <span className="skill-row__used">
                      {t("skills.usedIn")} {used.map(projectName).join(", ")}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      {/* Sin aria-labelledby en la sección: el nombre lo lleva la caja de la tabla, y
          dos regiones con el mismo nombre se confunden (axe, landmark-unique). */}
      <section className="skill-group">
        <h2 id="donde-t" className="chapter__title poster">
          {t("skills.matrixTitle")}
        </h2>
        <p className="skill-group__lead">{t("skills.matrixLead")}</p>
        {/* La caja se desplaza a lo ancho en teléfonos y tablets (R-M1): se puede
            enfocar para moverla con las flechas, y ella y la tabla llevan el nombre
            del bloque. */}
        <div className="matrix-scroll" tabIndex={0} role="region" aria-labelledby="donde-t">
          <table className="matrix" aria-labelledby="donde-t">
            <thead>
              <tr>
                <th scope="col">{t("skills.tech")}</th>
                {PROJECTS.map((p) => (
                  <th key={p.id} scope="col">
                    {projectName(p)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name}>
                  <th scope="row">{row.name}</th>
                  {PROJECTS.map((p) => (
                    <td key={p.id}>
                      {row.used.has(p.id) ? (
                        <span className="matrix__dot">
                          <span className="sr-only">{t("skills.yes")}</span>
                        </span>
                      ) : (
                        <span className="sr-only">{t("skills.no")}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="skill-group" aria-labelledby="tambien-t">
        <h2 id="tambien-t" className="chapter__title poster">
          {t("skills.other")}
        </h2>
        <p className="skill-group__lead">{OTHER_SKILLS.join(", ")}</p>
      </section>

      <p className="page__back">
        <a className="btn" href={`${home}#habilidades`}>
          <span className="btn__label">{t("page.back")}</span>
        </a>
      </p>
    </article>
  );
}
