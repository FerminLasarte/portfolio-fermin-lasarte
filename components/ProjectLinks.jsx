import Icon from "@/components/Icon";
import { EXTERNAL } from "@/lib/site";
import { faApple, faGithub, faGooglePlay, faUpRightFromSquare } from "@/lib/icons";

// Un botón por destino (I15): las tiendas directo, sin dropdown. "Código" y "Visitar"
// se repiten entre proyectos, así que su nombre accesible suma el proyecto (`named`,
// R-M10): "Código de Vault", "Vault code".
const LINKS = {
  appstore: { icon: faApple, label: () => "App Store" },
  playstore: { icon: faGooglePlay, label: () => "Google Play" },
  repo: { icon: faGithub, label: (t) => t("projects.code"), named: "projects.codeOf" },
  demo: { icon: faUpRightFromSquare, label: (t) => t("projects.visit"), named: "projects.visitOf" },
};

// Arma el texto de un botón con una plantilla ("{label} de {name}"): lo que se ve es
// `label`; lo que está antes y después va solo para los lectores de pantalla, así el
// nombre empieza o termina con lo visible según el idioma.
function Named({ template, label, name, icon }) {
  const [before, after = ""] = template.split("{label}");
  const fill = (s) => s.replace("{name}", name);
  return (
    <>
      {before && <span className="sr-only">{fill(before)}</span>}
      <Icon icon={icon} />
      {label}
      {after && <span className="sr-only">{fill(after)}</span>}
    </>
  );
}

// Los enlaces de afuera de un proyecto (tienda, repo, demo), iguales en la tarjeta de
// la home y en la página del proyecto. `primary` rellena el primero: en la página, que
// no tiene otro botón principal; en la tarjeta no, porque ahí el relleno es "Ver el
// proyecto" (docs/DISENO.md, 7.3).
export default function ProjectLinks({ links, t, name, primary = false }) {
  return links.map((link, i) => {
    const { icon, label, named } = LINKS[link.type];
    return (
      <a key={link.url} className={`btn${primary && i === 0 ? " btn--primary" : ""}`} href={link.url} {...EXTERNAL}>
        <span className="btn__label">
          {named ? (
            <Named template={t(named)} label={label(t)} name={name} icon={icon} />
          ) : (
            <>
              <Icon icon={icon} />
              {label(t)}
            </>
          )}
          <span className="sr-only"> {t("link.newTab")}</span>
        </span>
      </a>
    );
  });
}
