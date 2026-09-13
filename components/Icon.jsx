// Icono SVG inline (los datos están en lib/icons.js). Mide 1em de alto, como el
// glifo de la fuente de Font Awesome que reemplaza, y usa el color del texto.
// Con `title` es una imagen con nombre accesible (y tooltip); sin `title`, es decorativo.
export default function Icon({ icon, title }) {
  const [name, width, path] = icon;
  return (
    <svg
      className={`icon icon-${name}`}
      viewBox={`0 0 ${width} 512`}
      {...(title ? { role: "img" } : { "aria-hidden": true })}
    >
      {title && <title>{title}</title>}
      <path d={path} />
    </svg>
  );
}
