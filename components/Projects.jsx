"use client";

import { useLanguage } from "@/context/LanguageProvider";
import Dropdown from "@/components/Dropdown";
import Terminal from "@/components/Terminal";

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="proyectos">
      <p className="section-label premium-reveal">
        <i className="fas fa-rocket" />
        <span>{t("projects.title")}</span>
      </p>
      <h2 className="premium-reveal">{t("projects.title")}</h2>

      <div className="bento-grid">
        {/* TravelPic */}
        <article className="bento-card bento-card--large premium-reveal">
          <div className="bento-card__image">
            <div
              className="bento-card__bg"
              style={{ backgroundImage: "url('/assets/travelpic.jpeg')" }}
            />
            <div className="phone-mockup">
              <div className="phone-mockup__screen">
                <img src="/assets/travelpic.jpeg" alt="TravelPic screenshot" />
              </div>
            </div>
          </div>
          <div className="bento-card__content">
            <div className="bento-card__meta">
              <div className="production-status">
                <span className="status-dot-sm" />
                <span>{t("projects.live")}</span>
              </div>
              <div className="bento-card__platform">
                <i className="fab fa-apple" title="App Store" />
                <i className="fab fa-google-play" title="Google Play" />
              </div>
            </div>
            <h3>TravelPic</h3>
            <div className="project-story">
              <div className="story-block">
                <span className="story-label">{t("projects.problem")}</span>
                <p>{t("projects.p1.problem")}</p>
              </div>
              <div className="story-block">
                <span className="story-label story-label--accent">{t("projects.solution")}</span>
                <p>{t("projects.p1.solution")}</p>
              </div>
            </div>
            <div className="project-tags">
              <span className="tag">Flutter</span>
              <span className="tag">Stripe</span>
              <span className="tag">Google Maps</span>
              <span className="tag">Firebase</span>
            </div>
            <div className="project-links">
              <Dropdown
                up
                triggerClassName="btn btn-sm dropdown-btn"
                triggerContent={
                  <>
                    <i className="fas fa-download" />
                    <span>{t("projects.download")}</span>
                  </>
                }
              >
                <a
                  href="https://apps.apple.com/ar/app/travelpic-reserva-fotógrafos/id6689491895"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-apple" /> App Store
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.carreterofabricio.travelpic"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-google-play" /> Google Play
                </a>
              </Dropdown>
            </div>
          </div>
        </article>

        {/* DeporTurnos */}
        <article className="bento-card premium-reveal">
          <div className="bento-card__image">
            <div
              className="bento-card__bg"
              style={{ backgroundImage: "url('/assets/deporturnos.png')" }}
            />
            <div className="phone-mockup phone-mockup--sm">
              <div className="phone-mockup__screen">
                <img src="/assets/deporturnos.png" alt="DeporTurnos screenshot" />
              </div>
            </div>
          </div>
          <div className="bento-card__content">
            <div className="bento-card__meta">
              <div className="production-status">
                <span className="status-dot-sm" />
                <span>{t("projects.live")}</span>
              </div>
              <div className="bento-card__platform">
                <i className="fab fa-apple" />
                <i className="fab fa-google-play" />
              </div>
            </div>
            <h3>DeporTurnos</h3>
            <div className="project-story">
              <div className="story-block">
                <span className="story-label story-label--accent">{t("projects.solution")}</span>
                <p>{t("projects.p2.solution")}</p>
              </div>
            </div>
            <div className="project-tags">
              <span className="tag">Flutter</span>
              <span className="tag">Firebase</span>
              <span className="tag">Mercado Pago</span>
            </div>
            <div className="project-links">
              <Dropdown
                up
                triggerClassName="btn btn-sm btn-outline dropdown-btn"
                triggerContent={
                  <>
                    <i className="fas fa-download" />
                    <span>{t("projects.download")}</span>
                  </>
                }
              >
                <a
                  href="https://apps.apple.com/ar/app/deporturnos/id6670566502"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-apple" /> App Store
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.vldevelopment.deporturnos"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-google-play" /> Google Play
                </a>
              </Dropdown>
            </div>
          </div>
        </article>

        {/* Impostor — iOS game */}
        <article className="bento-card premium-reveal">
          <div className="bento-card__image">
            <div
              className="bento-card__bg"
              style={{ backgroundImage: "url('/assets/impostor.jpeg')" }}
            />
          </div>
          <div className="bento-card__content">
            <h3>{t("projects.p5.title")}</h3>
            <div className="project-story">
              <div className="story-block">
                <span className="story-label story-label--accent">{t("projects.solution")}</span>
                <p>{t("projects.p5.solution")}</p>
              </div>
            </div>
            <div className="project-tags">
              <span className="tag">Swift</span>
              <span className="tag">SwiftUI</span>
              <span className="tag">Multiplayer</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/FerminLasarte/ImpostorApp"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline"
              >
                <i className="fab fa-github" />
                <span>{t("projects.code")}</span>
              </a>
            </div>
          </div>
        </article>

        {/* AI Chatbot */}
        <article className="bento-card premium-reveal">
          <div className="bento-card__image">
            <div
              className="bento-card__bg"
              style={{ backgroundImage: "url('/assets/chatbot.jpeg')" }}
            />
          </div>
          <div className="bento-card__content">
            <h3>AI Chatbot NLU</h3>
            <div className="project-story">
              <div className="story-block">
                <span className="story-label story-label--accent">{t("projects.solution")}</span>
                <p>{t("projects.p4.solution")}</p>
              </div>
            </div>
            <div className="project-tags">
              <span className="tag">Python</span>
              <span className="tag">Rasa</span>
              <span className="tag">NLU</span>
            </div>
          </div>
        </article>

        {/* Java Compiler — terminal */}
        <article className="bento-card premium-reveal">
          <div className="bento-card__image" style={{ background: "#1e1e1e" }}>
            <div
              className="engineer-terminal"
              style={{ height: "100%", border: "none", borderRadius: 0 }}
            >
              <div className="terminal-header">
                <div className="terminal-btn btn-close" />
                <div className="terminal-btn btn-min" />
                <div className="terminal-btn btn-max" />
              </div>
              <Terminal />
            </div>
          </div>
          <div className="bento-card__content">
            <h3>{t("projects.p3.title")}</h3>
            <div className="project-story">
              <div className="story-block">
                <span className="story-label story-label--accent">{t("projects.solution")}</span>
                <p>{t("projects.p3.solution")}</p>
              </div>
            </div>
            <div className="project-tags">
              <span className="tag">Java</span>
              <span className="tag">Compilers</span>
              <span className="tag">{t("projects.p3.tag")}</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/FerminLasarte/Compilador"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline"
              >
                <i className="fab fa-github" />
                <span>{t("projects.code")}</span>
              </a>
            </div>
          </div>
        </article>

        {/* Landing Page with AI — browser mockup */}
        <article className="bento-card bento-card--large premium-reveal">
          <div className="bento-card__image">
            <div
              className="bento-card__bg"
              style={{ backgroundImage: "url('/assets/landing-ia.png')" }}
            />
            <div className="browser-mockup">
              <div className="browser-mockup__bar">
                <span className="browser-dot browser-dot--red" />
                <span className="browser-dot browser-dot--yellow" />
                <span className="browser-dot browser-dot--green" />
                <span className="browser-url">beltran-grupo-briones.vercel.app</span>
              </div>
              <div className="browser-mockup__screen">
                <img src="/assets/landing-ia.png" alt="Landing IA screenshot" />
              </div>
            </div>
          </div>
          <div className="bento-card__content">
            <h3>{t("projects.p6.title")}</h3>
            <div className="project-story">
              <div className="story-block">
                <span className="story-label story-label--accent">{t("projects.solution")}</span>
                <p>{t("projects.p6.solution")}</p>
              </div>
            </div>
            <div className="project-tags">
              <span className="tag">Next.js</span>
              <span className="tag">OpenAI</span>
              <span className="tag">TypeScript</span>
              <span className="tag">Vercel</span>
            </div>
            <div className="project-links">
              <a
                href="https://beltran-grupo-briones.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline"
              >
                <i className="fas fa-external-link-alt" />
                <span>{t("projects.visit")}</span>
              </a>
            </div>
          </div>
        </article>

        {/* Barbershop — WIP */}
        <article className="bento-card premium-reveal">
          <div className="bento-card__image">
            <div
              className="bento-card__bg"
              style={{
                background: "linear-gradient(135deg, #111827 0%, #1F2937 55%, #374151 100%)",
              }}
            />
            <div className="bento-wip-badge">WIP</div>
          </div>
          <div className="bento-card__content">
            <h3>{t("projects.p7.title")}</h3>
            <div className="project-story">
              <div className="story-block">
                <span className="story-label story-label--accent">{t("projects.solution")}</span>
                <p>{t("projects.p7.solution")}</p>
              </div>
            </div>
            <div className="project-tags">
              <span className="tag">Flutter</span>
              <span className="tag">Dart</span>
              <span className="tag">Firebase</span>
            </div>
            <div className="project-links">
              <button className="btn btn-sm btn-outline btn-private" disabled>
                <i className="fas fa-lock" />
                <span>{t("projects.soon")}</span>
              </button>
            </div>
          </div>
        </article>

        {/* ClubSystem — WIP / full width */}
        <article className="bento-card bento-card--full premium-reveal">
          <div className="bento-card__image">
            <div
              className="bento-card__bg"
              style={{
                background: "linear-gradient(135deg, #0C4A6E 0%, #0369A1 50%, #0891B2 100%)",
              }}
            />
            <div className="bento-wip-badge">WIP</div>
            <div className="bento-code-decoration" aria-hidden="true">
              <span>{"class ClubSystem: SaaS {"}</span>
              <span>{"  let tenants: [Club]"}</span>
              <span>{"  var ai: VectorSearch"}</span>
              <span>{"  func insights() {}"}</span>
              <span>{"}"}</span>
            </div>
          </div>
          <div className="bento-card__content">
            <div className="bento-card__meta">
              <div className="bento-saas-badge">SaaS</div>
            </div>
            <h3>{t("projects.p8.title")}</h3>
            <div className="project-story">
              <div className="story-block">
                <span className="story-label">{t("projects.problem")}</span>
                <p>{t("projects.p8.problem")}</p>
              </div>
              <div className="story-block">
                <span className="story-label story-label--accent">{t("projects.solution")}</span>
                <p>{t("projects.p8.solution")}</p>
              </div>
            </div>
            <div className="project-tags">
              <span className="tag">React Native</span>
              <span className="tag">Next.js</span>
              <span className="tag">FastAPI</span>
              <span className="tag">PostgreSQL</span>
              <span className="tag">AI</span>
            </div>
            <div className="project-links">
              <button className="btn btn-sm btn-outline btn-private" disabled>
                <i className="fas fa-lock" />
                <span>{t("projects.soon")}</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
