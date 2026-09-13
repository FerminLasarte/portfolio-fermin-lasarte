import { PERSON, SOCIAL } from "@/lib/site";
import Icon from "@/components/Icon";
import { faEnvelope, faLinkedin, faPaperPlane, faWhatsapp } from "@/lib/icons";

export default function Contact({ t }) {
  return (
    <section id="contacto">
      <p className="section-label animate-on-scroll">
        <Icon icon={faEnvelope} />
        <span>{t("contact.title")}</span>
      </p>
      <h2 className="animate-on-scroll">{t("contact.title")}</h2>

      <div className="contact-grid">
        <div className="contact-method animate-left">
          <div className="contact-icon-wrap">
            <Icon icon={faPaperPlane} />
          </div>
          <h3>Email</h3>
          <p>{PERSON.email}</p>
          <a href={`mailto:${PERSON.email}`} className="btn btn-sm btn-outline">
            {t("contact.write")}
          </a>
        </div>
        <div className="contact-method animate-on-scroll">
          <div className="contact-icon-wrap">
            <Icon icon={faWhatsapp} />
          </div>
          <h3>WhatsApp</h3>
          <p>
            <a href={PERSON.phoneHref}>{PERSON.phone}</a>
          </p>
          <a
            href={PERSON.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline"
          >
            {t("contact.msg")}
          </a>
        </div>
        <div className="contact-method animate-right">
          <div className="contact-icon-wrap">
            <Icon icon={faLinkedin} />
          </div>
          <h3>LinkedIn</h3>
          <p>{t("contact.connect")}</p>
          <a
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline"
          >
            {t("contact.profile")}
          </a>
        </div>
      </div>
    </section>
  );
}
