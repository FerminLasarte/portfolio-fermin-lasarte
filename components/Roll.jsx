// Texto que rueda al pasar el mouse (styles/base.css, .roll): sube y se va, y desde
// abajo entra una copia. La copia es solo visual.
export default function Roll({ children }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}
