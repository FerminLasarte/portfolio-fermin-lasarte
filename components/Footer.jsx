import { PERSON, SOCIAL } from "@/lib/site";

export default function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="copyright">
            © <span>{new Date().getFullYear()}</span> {PERSON.name}.{" "}
            <span>{t("footer.rights")}</span>
          </div>
          <div className="social-links">
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub"
            >
              <i className="fab fa-github" />
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin" />
            </a>
            <a
              href={`mailto:${PERSON.email}`}
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
