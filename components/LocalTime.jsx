"use client";

import { useSyncExternalStore } from "react";

// La hora de la ciudad de Fermin, en vivo: " · 13:32 (GMT-3)" en la línea "Base" del
// hero. Se escribe recién en el navegador (en el servidor la hora sería otra y no
// coincidiría al hidratar), así que sin JS la línea queda solo con la ciudad. Cambia al
// empezar cada minuto, no cada segundo.
const MINUTE = 60000;
const minute = () => Math.floor(Date.now() / MINUTE);

function subscribe(onChange) {
  let timer;
  const wait = () => {
    timer = setTimeout(() => {
      onChange();
      wait();
    }, MINUTE - (Date.now() % MINUTE));
  };
  wait();
  return () => clearTimeout(timer);
}

export default function LocalTime({ lang, timeZone }) {
  const now = useSyncExternalStore(subscribe, minute, () => null);
  if (now == null) return null;

  const parts = new Intl.DateTimeFormat(lang, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone,
    timeZoneName: "shortOffset",
  }).formatToParts(now * MINUTE);
  const part = (type) => parts.find((p) => p.type === type)?.value;
  const time = `${part("hour")}:${part("minute")}`;

  return (
    <>
      {" · "}
      <span className="local-time">
        <time dateTime={time}>{time}</time> ({part("timeZoneName")})
      </span>
    </>
  );
}
