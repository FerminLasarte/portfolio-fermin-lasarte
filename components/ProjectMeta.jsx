// La línea de meta de un proyecto: el estado y las plataformas, en texto (docs/DISENO.md,
// 7.3). Sin iconos de plataforma: los de lib/icons.js van en los botones de enlace.
// La usan la tarjeta de la home y la página del proyecto, que le suma los años como
// `children`.
const PLATFORMS = { ios: "iOS", android: "Android" };

export default function ProjectMeta({ project, t, children }) {
  const { status, platforms = [] } = project;
  const platformText = platforms.map((p) => PLATFORMS[p]).join(` ${t("projects.and")} `);
  if (!status && !platformText && !children) return null;

  return (
    <p className="card__meta meta">
      {status && <span className={status === "live" ? "is-live" : undefined}>{t(`projects.${status}`)}</span>}
      {platformText && <span>{platformText}</span>}
      {children}
    </p>
  );
}
