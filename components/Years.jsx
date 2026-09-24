import { RANGE_DASH, twoDigits } from "@/lib/text";

// Los años de una etapa de Trayectoria, iguales en la home, en su página y en la de
// cada trabajo: en texto, con <time> ("2024 – 2025", o solo el inicio si sigue en
// curso); y los grandes ("2024 – 25"), que son visuales (aria-hidden) porque las
// fechas ya están en texto. El formato del guion está en lib/text.js.
export function YearRange({ start, end }) {
  return (
    <>
      <time dateTime={String(start)}>{start}</time>
      {end != null && (
        <>
          {RANGE_DASH}
          <time dateTime={String(end)}>{end}</time>
        </>
      )}
    </>
  );
}

export function BigYears({ start, end, className }) {
  return (
    <p className={`years ${className}`} aria-hidden="true">
      <span>{start}</span>
      <span className="years__end">
        {RANGE_DASH}
        {end != null && twoDigits(end)}
      </span>
    </p>
  );
}
