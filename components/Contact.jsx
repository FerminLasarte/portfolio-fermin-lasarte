import { EXTERNAL, PERSON, SOCIAL } from "@/lib/site";

// Cierre (docs/DISENO.md, 7.5), como el final de douglus. Primero, la transición: un
// panel decorativo con un degradado que se dibuja con el scroll y termina en el color
// noche. Después, el contacto en noche: el título gigante con la última palabra en
// acento, una línea y las píldoras (Email, que abre el correo, WhatsApp, LinkedIn y
// GitHub), con "Volver al inicio" a la derecha. Los nombres son iguales en los dos
// idiomas, así que no pasan por el diccionario.
export default function Contact({ t }) {
  const words = t("contact.title").split(" ");
  const last = words.pop();
  const pills = [
    { label: "Email", href: `mailto:${PERSON.email}` },
    { label: "WhatsApp", href: PERSON.whatsapp, external: true },
    { label: "LinkedIn", href: SOCIAL.linkedin, external: true },
    { label: "GitHub", href: SOCIAL.github, external: true },
  ];

  return (
    <>
      <div
        className="panel panel--bleed bleed"
        data-section="contacto"
        data-label={t("nav.contact")}
        aria-hidden="true"
      >
        <div className="bleed__wash" />
      </div>

      <section
        id="contacto"
        className="panel panel--screen contact"
        data-section="contacto"
        data-label={t("nav.contact")}
        aria-labelledby="contacto-t"
      >
        <h2 id="contacto-t" className="display contact__title">
          {words.join(" ")} <em>{last}</em>
        </h2>

        <div className="contact__rule" aria-hidden="true" />

        <div className="contact__actions">
          <div className="contact__pills">
            {pills.map((pill) => (
              <a
                key={pill.label}
                className="btn btn--night btn--lg"
                href={pill.href}
                {...(pill.external ? EXTERNAL : {})}
              >
                <span className="btn__label">
                  {pill.label}
                  {pill.external && <span className="sr-only"> {t("link.newTab")}</span>}
                </span>
              </a>
            ))}
          </div>

          <a className="btn btn--night btn--lg contact__back" href="#sobre-mi">
            <span className="btn__label">
              <svg viewBox="0 0 56 9" aria-hidden="true">
                <path d="M1.5 4.5h53M1.5 4.5l5-3M1.5 4.5l5 3" />
              </svg>
              {t("contact.back")}
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
