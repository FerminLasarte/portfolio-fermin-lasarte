"use client";

import { useLanguage } from "@/context/LanguageProvider";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const CARDS = [
  {
    extraClass: "skill-card--featured",
    icon: "fas fa-mobile-alt",
    title: "Mobile",
    skills: [
      { tooltip: "Swift · Avanzado", icon: "swift/swift-original", alt: "Swift" },
      {
        tooltip: "SwiftUI · Avanzado",
        icon: "swift/swift-original",
        alt: "SwiftUI",
        style: { filter: "hue-rotate(200deg) saturate(1.5)" },
      },
      { tooltip: "Flutter · Avanzado", icon: "flutter/flutter-original", alt: "Flutter" },
      { tooltip: "Dart · Avanzado", icon: "dart/dart-original", alt: "Dart" },
    ],
  },
  {
    icon: "fas fa-server",
    title: "Backend",
    skills: [
      { tooltip: "Java · Avanzado", icon: "java/java-original", alt: "Java" },
      { tooltip: "Python · Intermedio", icon: "python/python-original", alt: "Python" },
      { tooltip: "FastAPI · Intermedio", icon: "fastapi/fastapi-original", alt: "FastAPI" },
      { tooltip: "C# / .NET · Intermedio", icon: "csharp/csharp-original", alt: "C#" },
    ],
  },
  {
    icon: "fas fa-globe",
    title: "Web",
    skills: [
      { tooltip: "TypeScript · Intermedio", icon: "typescript/typescript-original", alt: "TypeScript" },
      { tooltip: "Next.js · Intermedio", icon: "nextjs/nextjs-original", alt: "Next.js", darkInvert: true },
      { tooltip: "React · Intermedio", icon: "react/react-original", alt: "React" },
      { tooltip: "JavaScript · Intermedio", icon: "javascript/javascript-original", alt: "JavaScript" },
    ],
  },
  {
    icon: "fas fa-database",
    titleKey: "skills.db",
    titleSuffix: " & Cloud",
    skills: [
      { tooltip: "PostgreSQL · Avanzado", icon: "postgresql/postgresql-original", alt: "PostgreSQL" },
      { tooltip: "MongoDB · Avanzado", icon: "mongodb/mongodb-original", alt: "MongoDB" },
      { tooltip: "Firebase · Avanzado", icon: "firebase/firebase-original", alt: "Firebase" },
      { tooltip: "Docker · Intermedio", icon: "docker/docker-original", alt: "Docker" },
    ],
  },
  {
    extraClass: "skill-card--wide",
    icon: "fas fa-tools",
    titleKey: "skills.tools",
    skills: [
      { tooltip: "Git · Avanzado", icon: "git/git-original", alt: "Git" },
      { tooltip: "XCode · Avanzado", icon: "xcode/xcode-original", alt: "XCode" },
      { tooltip: "C / C++ · Avanzado", icon: "cplusplus/cplusplus-original", alt: "C++" },
      { tooltip: "Figma · Avanzado", icon: "figma/figma-original", alt: "Figma" },
      { tooltip: "GitHub · Avanzado", icon: "github/github-original", alt: "GitHub", darkInvert: true },
    ],
  },
];

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="habilidades">
      <p className="section-label premium-reveal">
        <i className="fas fa-laptop-code" />
        <span>{t("skills.title")}</span>
      </p>
      <h2 className="premium-reveal">{t("skills.title")}</h2>

      <div className="skills-bento">
        {CARDS.map((card, i) => (
          <div key={i} className={`skill-card ${card.extraClass ?? ""} premium-reveal`.trim()}>
            <div className="skill-card-header">
              <i className={card.icon} />
              <h3>
                {card.titleKey ? <span>{t(card.titleKey)}</span> : card.title}
                {card.titleSuffix}
              </h3>
            </div>
            <div className="skill-icons-grid">
              {card.skills.map((s) => (
                <div key={s.alt} className="skill-icon" data-tooltip={s.tooltip}>
                  <img
                    src={`${DEVICON}/${s.icon}.svg`}
                    alt={s.alt}
                    loading="lazy"
                    style={s.style}
                    {...(s.darkInvert ? { "data-dark-invert": "" } : {})}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
