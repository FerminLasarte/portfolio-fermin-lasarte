// Icono SVG inline (los datos están en lib/icons.js). Mide 1em de alto, como el
// glifo de la fuente de Font Awesome que reemplaza, y usa el color del texto.
// Siempre es decorativo: el nombre accesible lo lleva el enlace o el botón que lo
// contiene (M3).
export default function Icon({ icon }) {
  const [name, width, path] = icon;
  return (
    <svg className={`icon icon-${name}`} viewBox={`0 0 ${width} 512`} aria-hidden="true">
      <path d={path} />
    </svg>
  );
}
