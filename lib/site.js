// Datos del sitio en un solo lugar. Los textos traducibles están en
// lib/translations.js; acá va lo que es igual en los dos idiomas.

import { faDatabase, faGlobe, faMobileScreenButton, faScrewdriverWrench, faServer } from "@/lib/icons";

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
  location: "Buenos Aires, Argentina",
  email: "fermin.lasarte@icloud.com",
  phone: "+54 9 11 2171-1289",
  phoneHref: "tel:+5491121711289",
  whatsapp: "https://wa.me/5491121711289",
};

// Cargo: ROLE para el JSON-LD, ROLE_SHORT para el <title> y ROLE_TAGLINE para el hero.
export const ROLE = "iOS & Cross-Platform Mobile Engineer";
export const ROLE_SHORT = "iOS & Mobile Engineer";
export const ROLE_TAGLINE = `${ROLE} · Backend Developer`;

export const SOCIAL = {
  github: "https://github.com/FerminLasarte",
  linkedin: "https://linkedin.com/in/ferminlasarte/",
  twitter: "@FerminLasarte",
};

// Secciones del nav, en orden: `id` de la sección y clave de su texto.
export const NAV_SECTIONS = [
  { id: "sobre-mi", key: "nav.about" },
  { id: "experiencia", key: "nav.experience" },
  { id: "educacion", key: "nav.education" },
  { id: "habilidades", key: "nav.skills" },
  { id: "proyectos", key: "nav.projects" },
  { id: "contacto", key: "nav.contact" },
];

export const CV = [
  { lang: "es", label: "Español", href: "/assets/CV-Fermin-ES.pdf", download: "CV_Fermin_ES.pdf" },
  { lang: "en", label: "English", href: "/assets/CV-Fermin-EN.pdf", download: "CV_Fermin_EN.pdf" },
];

// Iconos de tecnologías: SVG de Devicon 2.17.0 (MIT) copiados a public/icons/devicon,
// con la misma estructura de carpetas que el repo (`<nombre>/<nombre>-<variante>.svg`).
export const DEVICON = "/icons/devicon";

// Tecnologías. De acá salen la sección Skills, los badges del hero y el
// `knowsAbout` del JSON-LD. `name` es el texto del tooltip y `alt` el nombre corto.
export const SKILL_GROUPS = [
  {
    id: "mobile",
    icon: faMobileScreenButton,
    titleKey: "skills.mobile",
    extraClass: "skill-card--featured",
    skills: [
      { name: "Swift", icon: "swift/swift-original", level: "advanced" },
      {
        name: "SwiftUI",
        icon: "swift/swift-original",
        level: "advanced",
        style: { filter: "hue-rotate(200deg) saturate(1.5)" },
      },
      { name: "Objective-C", icon: "objectivec/objectivec-plain", level: "intermediate" },
      { name: "Flutter", icon: "flutter/flutter-original", level: "advanced" },
      { name: "Dart", icon: "dart/dart-original", level: "advanced" },
      { name: "React Native", icon: "reactnative/reactnative-original", level: "advanced" },
    ],
  },
  {
    id: "backend",
    icon: faServer,
    titleKey: "skills.backend",
    skills: [
      { name: "Java", icon: "java/java-original", level: "advanced" },
      { name: "Python", icon: "python/python-original", level: "intermediate" },
      { name: "FastAPI", icon: "fastapi/fastapi-original", level: "intermediate" },
      { name: "C# / .NET", alt: "C#", icon: "csharp/csharp-original", level: "intermediate" },
    ],
  },
  {
    id: "web",
    icon: faGlobe,
    titleKey: "skills.web",
    skills: [
      { name: "TypeScript", icon: "typescript/typescript-original", level: "intermediate" },
      { name: "Next.js", icon: "nextjs/nextjs-original", level: "intermediate", darkInvert: true },
      { name: "React", icon: "react/react-original", level: "intermediate" },
      { name: "JavaScript", icon: "javascript/javascript-original", level: "advanced" },
      { name: "HTML", icon: "html5/html5-original", level: "advanced" },
      { name: "CSS", icon: "css3/css3-original", level: "advanced" },
    ],
  },
  {
    id: "data",
    icon: faDatabase,
    titleKey: "skills.db",
    skills: [
      { name: "PostgreSQL", icon: "postgresql/postgresql-original", level: "advanced" },
      { name: "MongoDB", icon: "mongodb/mongodb-original", level: "advanced" },
      { name: "Firebase", icon: "firebase/firebase-original", level: "advanced" },
      { name: "Supabase", icon: "supabase/supabase-original", level: "advanced" },
      { name: "SQLite", icon: "sqlite/sqlite-original", level: "advanced" },
      { name: "Docker", icon: "docker/docker-original", level: "intermediate" },
    ],
  },
  {
    id: "tools",
    icon: faScrewdriverWrench,
    titleKey: "skills.tools",
    extraClass: "skill-card--wide",
    skills: [
      { name: "Git", icon: "git/git-original", level: "advanced" },
      { name: "Xcode", icon: "xcode/xcode-original", level: "advanced" },
      { name: "C / C++", alt: "C++", icon: "cplusplus/cplusplus-original", level: "advanced" },
      { name: "Figma", icon: "figma/figma-original", level: "advanced" },
      { name: "GitHub", icon: "github/github-original", level: "advanced", darkInvert: true },
    ],
  },
];

export const SKILLS = SKILL_GROUPS.flatMap((g) => g.skills);

// Tecnologías sin icono en la sección Skills; solo van al JSON-LD (y a los CV).
export const OTHER_SKILLS = [
  "REST API",
  "Tauri",
  "TestFlight",
  "Scrum",
  "Claude API",
  "Rasa",
  "Machine Learning",
];

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

// La sangría de los bloques de código decorativos usa espacios de no separación
// (\u00a0) para que no se colapse.
const INDENT = "\u00a0\u00a0";

// Proyectos, en el orden de la grilla. Los textos están en translations con la
// clave `projects.<id>.*`: `title` (si falta se usa `name`), `problem` (opcional)
// y `solution`.
//   status:    "live" (en producción) | "wip" (en desarrollo) | sin definir
//   size:      "large" (2 columnas) | "full" (ancho completo) | sin definir
//   platforms: "ios" | "android" (iconos junto al estado)
//   media:     "phone" | "image" (solo fondo) | "terminal" | "gradient". `image` es la
//              captura (~800px, WebP; `width` y `height` en px) y `thumb` la miniatura del
//              fondo difuminado (48px).
//   links:     "appstore" | "playstore" | "repo" | "demo"
export const PROJECTS = [
  {
    id: "travelpic",
    name: "TravelPic",
    size: "large",
    status: "live",
    platforms: ["ios", "android"],
    primary: true,
    media: {
      type: "phone",
      image: "/assets/travelpic.webp",
      width: 800,
      height: 396,
      thumb: "/assets/travelpic-thumb.webp",
    },
    tags: ["Flutter", "Stripe", "Google Maps", "Firebase"],
    // La app se está volviendo a publicar; mientras tanto se enlaza la web.
    links: [{ type: "demo", url: "https://www.travelpicapp.com" }],
  },
  {
    id: "deporturnos",
    name: "DeporTurnos",
    status: "live",
    platforms: ["ios", "android"],
    media: {
      type: "phone",
      image: "/assets/deporturnos.webp",
      width: 800,
      height: 396,
      thumb: "/assets/deporturnos-thumb.webp",
      small: true,
    },
    tags: ["Flutter", "Firebase", "Mercado Pago"],
    links: [
      { type: "appstore", url: "https://apps.apple.com/ar/app/deporturnos/id6670566502" },
      { type: "playstore", url: "https://play.google.com/store/apps/details?id=com.vldevelopment.deporturnos" },
    ],
  },
  {
    id: "impostor",
    name: "Impostor",
    status: "wip",
    media: { type: "image", thumb: "/assets/impostor-thumb.webp" },
    tags: ["Swift", "SwiftUI", "Firebase"],
    links: [{ type: "repo", url: "https://github.com/FerminLasarte/impostor-app" }],
  },
  {
    id: "chatbot",
    name: "chatbot-ai",
    status: "live",
    media: { type: "image", thumb: "/assets/chatbot-thumb.webp" },
    tags: ["Python", "FastAPI", "Claude", "pgvector", "Next.js"],
    links: [{ type: "repo", url: "https://github.com/FerminLasarte/chatbot-ai" }],
  },
  {
    id: "compiler",
    name: "Compilador",
    media: { type: "terminal" },
    tags: ["Java", "Yacc", "Assembly x86"],
    links: [{ type: "repo", url: "https://github.com/FerminLasarte/Compilador" }],
  },
  {
    id: "vault",
    name: "Vault",
    size: "large",
    status: "wip",
    media: {
      type: "gradient",
      background: "linear-gradient(135deg, #064E3B 0%, #065F46 50%, #047857 100%)",
      code: ["const vault = {", `${INDENT}storage: "sqlite",`, `${INDENT}cloud: false,`, "}"],
    },
    tags: ["Tauri", "React", "TypeScript", "SQLite"],
    links: [
      { type: "repo", url: "https://github.com/FerminLasarte/vault-ai" },
      { type: "demo", url: "https://landing-vault.vercel.app" },
    ],
  },
  {
    id: "bookit",
    name: "Bookit",
    status: "wip",
    media: {
      type: "gradient",
      background: "linear-gradient(135deg, #111827 0%, #1F2937 55%, #374151 100%)",
    },
    tags: ["Flutter", "Dart", "Supabase"],
    links: [{ type: "demo", url: "https://www.somosbookit.com.ar" }],
  },
  {
    id: "clubsystem",
    name: "ClubSystem",
    size: "full",
    status: "wip",
    badge: "SaaS",
    media: {
      type: "gradient",
      background: "linear-gradient(135deg, #0C4A6E 0%, #0369A1 50%, #0891B2 100%)",
      code: [
        "class ClubSystem: SaaS {",
        `${INDENT}let tenants: [Club]`,
        `${INDENT}var ai: AnomalyDetector`,
        `${INDENT}func insights() {}`,
        "}",
      ],
    },
    tags: ["React Native", "Next.js", "FastAPI", "PostgreSQL", "Claude"],
    links: [{ type: "repo", url: "https://github.com/FerminLasarte/clubsystem" }],
  },
];

// Trayectoria. Textos en translations: `exp.<id>.title`, `.company` y `.desc`.
export const EXPERIENCE = [
  { id: "travelpic", start: 2024, end: 2025, tags: ["Flutter", "Stripe", "Firebase", "Google Maps"] },
  { id: "deporturnos", start: 2021, end: 2025, tags: ["Flutter", "Firebase", "Mercado Pago"] },
];

// Educación. Textos en translations: `edu.<id>.title`, `.company` (opcional),
// `.desc` y `.period` (si no tiene años).
export const EDUCATION = [
  { id: "unicen", start: 2020, end: 2026 },
  { id: "languages" },
];

// Cifras del hero. "Apps en producción" cuenta solo las apps móviles (las que
// tienen `platforms`), no los servicios web como chatbot-ai.
export const STATS = {
  appsLive: PROJECTS.filter((p) => p.status === "live" && p.platforms?.length).length,
  years: Math.max(...EXPERIENCE.map((e) => e.end)) - Math.min(...EXPERIENCE.map((e) => e.start)),
  projects: PROJECTS.length,
};
