"use client";

import { useLanguage } from "@/context/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="copyright">
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Fermin Lasarte.{" "}
            <span>{t("footer.rights")}</span>
          </div>
          <div className="social-links">
            <a
              href="https://github.com/FerminLasarte"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub"
            >
              <i className="fab fa-github" />
            </a>
            <a
              href="https://linkedin.com/in/ferminlasarte/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin" />
            </a>
            <a
              href="mailto:fermin.lasarte@icloud.com"
              className="social-link"
              aria-label="Email"
            >
              <i className="fas fa-envelope" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
