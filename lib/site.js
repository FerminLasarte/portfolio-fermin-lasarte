// Datos del sitio en un solo lugar. Los textos traducibles están en
// lib/translations.js; acá va lo que es igual en los dos idiomas.

// URL pública del sitio (canonical, Open Graph y JSON-LD).
// En Vercel se toma del dominio de producción del proyecto; NEXT_PUBLIC_SITE_URL
// permite forzar otra (por ejemplo, un dominio propio).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const PERSON = {
  name: "Fermin Lasarte",
  firstName: "Fermin",
  location: "Tandil, Argentina",
  email: "fermin.lasarte@icloud.com",
  phone: "+54 9 11 2171-1289",
  whatsapp: "https://wa.me/5491121711289",
};

// Cargo: ROLE para el JSON-LD, ROLE_SHORT para el <title> y ROLE_TAGLINE para el hero.
export const ROLE = "iOS & Cross-Platform Mobile Engineer";
export const ROLE_SHORT = "iOS & Mobile Engineer";
export const ROLE_TAGLINE = `${ROLE} · Backend Developer`;

export const SOCIAL = {
  github: "https://github.com/FerminLasarte",
  linkedin: "https://linkedin.com/in/ferminlasarte/",
  twitter: "@ferminlasarte",
};

export const CV = [
  { lang: "es", label: "Español", href: "/assets/CV-Fermin-ES.pdf", download: "CV_Fermin_ES.pdf" },
  { lang: "en", label: "English", href: "/assets/CV-Fermin-EN.pdf", download: "CV_Fermin_EN.pdf" },
];

export const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

// Tecnologías. De acá salen la sección Skills, los badges del hero y el
// `knowsAbout` del JSON-LD. `name` es el texto del tooltip y `alt` el nombre corto.
export const SKILL_GROUPS = [
  {
    id: "mobile",
    icon: "fas fa-mobile-alt",
    title: "Mobile",
    extraClass: "skill-card--featured",
    skills: [
      { name: "Swift", icon: "swift/swift-original", level: "advanced" },
      {
        name: "SwiftUI",
        icon: "swift/swift-original",
        level: "advanced",
        style: { filter: "hue-rotate(200deg) saturate(1.5)" },
      },
      { name: "Flutter", icon: "flutter/flutter-original", level: "advanced" },
      { name: "Dart", icon: "dart/dart-original", level: "advanced" },
    ],
  },
  {
    id: "backend",
    icon: "fas fa-server",
    title: "Backend",
    skills: [
      { name: "Java", icon: "java/java-original", level: "advanced" },
      { name: "Python", icon: "python/python-original", level: "intermediate" },
      { name: "FastAPI", icon: "fastapi/fastapi-original", level: "intermediate" },
      { name: "C# / .NET", alt: "C#", icon: "csharp/csharp-original", level: "intermediate" },
    ],
  },
  {
    id: "web",
    icon: "fas fa-globe",
    title: "Web",
    skills: [
      { name: "TypeScript", icon: "typescript/typescript-original", level: "intermediate" },
      { name: "Next.js", icon: "nextjs/nextjs-original", level: "intermediate", darkInvert: true },
      { name: "React", icon: "react/react-original", level: "intermediate" },
      { name: "JavaScript", icon: "javascript/javascript-original", level: "intermediate" },
    ],
  },
  {
    id: "data",
    icon: "fas fa-database",
    titleKey: "skills.db",
    titleSuffix: " & Cloud",
    skills: [
      { name: "PostgreSQL", icon: "postgresql/postgresql-original", level: "advanced" },
      { name: "MongoDB", icon: "mongodb/mongodb-original", level: "advanced" },
      { name: "Firebase", icon: "firebase/firebase-original", level: "advanced" },
      { name: "Docker", icon: "docker/docker-original", level: "intermediate" },
    ],
  },
  {
    id: "tools",
    icon: "fas fa-tools",
    titleKey: "skills.tools",
    extraClass: "skill-card--wide",
    skills: [
      { name: "Git", icon: "git/git-original", level: "advanced" },
      { name: "XCode", icon: "xcode/xcode-original", level: "advanced" },
      { name: "C / C++", alt: "C++", icon: "cplusplus/cplusplus-original", level: "advanced" },
      { name: "Figma", icon: "figma/figma-original", level: "advanced" },
      { name: "GitHub", icon: "github/github-original", level: "advanced", darkInvert: true },
    ],
  },
];

export const SKILLS = SKILL_GROUPS.flatMap((g) => g.skills);

const skillByAlt = (alt) => SKILLS.find((s) => (s.alt ?? s.name) === alt);

// Badges flotantes del hero, en orden de aparición. `pos` es la posición en el CSS
// (.hero-badge-float--N).
export const HERO_BADGES = [
  { alt: "Swift", pos: 1 },
  { alt: "Flutter", pos: 2 },
  { alt: "TypeScript", pos: 0 },
  { alt: "C++", pos: 4 },
  { alt: "Python", pos: 5 },
].map((b) => ({ ...b, icon: skillByAlt(b.alt).icon }));
