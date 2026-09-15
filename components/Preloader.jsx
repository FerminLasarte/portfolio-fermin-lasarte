import { PERSON, ROLE_SHORT } from "@/lib/site";

// Preloader (docs/DISENO.md, 7.11), el de douglus: las palabras de `words`, de a una,
// y después el nombre letra por letra con el cargo. Es solo visual (aria-hidden): el
// contenido real ya está debajo. Todo el movimiento está en styles/preloader.css y
// solo se ve bajo html.pl (primera visita de la sesión, con JS y sin reduce motion).
export default function Preloader({ words }) {
  const list = words.split(" ");
  const names = PERSON.name.toUpperCase().split(" ");
  // Índice de la primera letra de cada palabra del nombre, para el escalonado.
  const starts = names.map((_, w) => names.slice(0, w).join("").length);
  const letters = names.join("").length;

  return (
    <div className="preloader" aria-hidden="true">
      <div className="pl-stage">
        {list.map((word, k) => (
          <span key={k} className="pl-mask">
            <span className={k === list.length - 1 ? "pl-word pl-word--last" : "pl-word"} style={{ "--i": k }}>
              {word}
            </span>
          </span>
        ))}
      </div>

      <div className="pl-id">
        <div className="pl-name" style={{ "--n": letters }}>
          {names.map((name, w) => (
            <span key={name}>
              {[...name].map((ch, k) => (
                <span key={k} className="pl-ch-mask">
                  <span className="pl-ch" style={{ "--i": starts[w] + k }}>
                    {ch}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </div>
        <div className="pl-rule" />
        <div className="pl-sub">
          <span>
            {ROLE_SHORT} · {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </div>
  );
}
