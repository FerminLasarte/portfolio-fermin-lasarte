// La línea de meta de un proyecto: de quién es (propio, por encargo, con un socio o de
// la facultad, más si se vendió o si Fermin sigue con el soporte), el estado y las
// plataformas, en texto (docs/DISENO.md, 7.3). Sin iconos de plataforma: los de lib/icons.js van en los botones de enlace.
// La usan la tarjeta de la home y la página del proyecto, que le suma los años como
// `children`.
const PLATFORMS = { ios: "iOS", android: "Android" };

export default function ProjectMeta({ project, t, children }) {
  const { origin, sold, support, status, platforms = [] } = project;
  const platformText = platforms.map((p) => PLATFORMS[p]).join(` ${t("projects.and")} `);
  if (!origin && !status && !platformText && !children) return null;

  return (
    <p className="card__meta meta">
      {origin && <span>{t(`projects.origin.${origin}`)}</span>}
      {sold && <span>{t("projects.sold")}</span>}
      {support && <span>{t("projects.support")}</span>}
      {status && <span className={status === "live" ? "is-live" : undefined}>{t(`projects.${status}`)}</span>}
      {platformText && <span>{platformText}</span>}
      {children}
    </p>
  );
}
