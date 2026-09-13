import { PERSON, SOCIAL } from "@/lib/site";
import Icon from "@/components/Icon";
import { faEnvelope, faGithub, faLinkedin } from "@/lib/icons";

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
              <Icon icon={faGithub} />
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <Icon icon={faLinkedin} />
            </a>
            <a
              href={`mailto:${PERSON.email}`}
              className="social-link"
              aria-label="Email"
            >
              <Icon icon={faEnvelope} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
