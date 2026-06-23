"use client";

import { useLanguage } from "@/context/LanguageProvider";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contacto">
      <p className="section-label animate-on-scroll">
        <i className="fas fa-envelope" />
        <span>{t("contact.title")}</span>
      </p>
      <h2 className="animate-on-scroll">{t("contact.title")}</h2>

      <div className="contact-grid">
        <div className="contact-method animate-left">
          <div className="contact-icon-wrap">
            <i className="fas fa-paper-plane" />
          </div>
          <h3>Email</h3>
          <p>fermin.lasarte@icloud.com</p>
          <a href="mailto:fermin.lasarte@icloud.com" className="btn btn-sm btn-outline">
            {t("contact.write")}
          </a>
        </div>
        <div className="contact-method animate-on-scroll">
          <div className="contact-icon-wrap">
            <i className="fab fa-whatsapp" />
          </div>
          <h3>{t("contact.phone")}</h3>
          <p>+54 9 11 2171-1289</p>
          <a
            href="https://wa.me/5491121711289"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline"
          >
            {t("contact.msg")}
          </a>
        </div>
        <div className="contact-method animate-right">
          <div className="contact-icon-wrap">
            <i className="fab fa-linkedin" />
          </div>
          <h3>LinkedIn</h3>
          <p>{t("contact.connect")}</p>
          <a
            href="https://linkedin.com/in/ferminlasarte/"
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
