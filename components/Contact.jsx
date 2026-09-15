import { PERSON, SOCIAL } from "@/lib/site";
import CopyEmail from "@/components/CopyEmail";

// El usuario de un perfil, sacado de su URL ("https://github.com/FerminLasarte" → "FerminLasarte").
const handle = (url) => url.split("/").filter(Boolean).pop();

// Contacto (docs/DISENO.md, 7.5): el único panel lleno de color. El email en grande es
// el botón principal y al lado está el botón para copiarlo (M16). Debajo, WhatsApp
// (con el número como enlace tel:), LinkedIn y GitHub, con el tachado del nav.
export default function Contact({ t }) {
  const rows = [
    { name: "WhatsApp", href: PERSON.whatsapp, detail: PERSON.phone, detailHref: PERSON.phoneHref },
    { name: "LinkedIn", href: SOCIAL.linkedin, detail: handle(SOCIAL.linkedin) },
    { name: "GitHub", href: SOCIAL.github, detail: handle(SOCIAL.github) },
  ];

  return (
    <section
      id="contacto"
      className="panel panel--screen contact"
      data-section="contacto"
      data-label={t("nav.contact")}
      aria-labelledby="contacto-t"
    >
      <h2 id="contacto-t" className="display">
        {t("contact.title")}
      </h2>

      <div className="contact__email">
        <a className="contact__mail" href={`mailto:${PERSON.email}`}>
          {PERSON.email}
        </a>
        <CopyEmail
          email={PERSON.email}
          label={t("contact.copy")}
          done={t("contact.copied")}
          className="btn btn--on-accent"
        />
      </div>

      <ul className="contact__rows">
        {rows.map((row) => (
          <li key={row.name}>
            <a className="contact__row strike" href={row.href} target="_blank" rel="noopener noreferrer">
              {row.name}
            </a>
            {row.detailHref ? (
              <a className="contact__detail" href={row.detailHref}>
                {row.detail}
              </a>
            ) : (
              <span className="contact__detail">{row.detail}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
