// Datos del sitio en un solo lugar. Los textos traducibles están en
// lib/translations.js; acá va lo que es igual en los dos idiomas.

// URL pública del sitio (canonical, Open Graph y JSON-LD).
// En Vercel se toma del dominio de producción del proyecto; NEXT_PUBLIC_SITE_URL
// permite forzar otra (por ejemplo, un dominio propio). R-M23 de la re-auditoría:
//  - `||` y no `??`, así una variable vacía cae en la siguiente opción en vez de
//    romper el build (`new URL("")`);
//  - sin barra final, porque las rutas se le suman con "/" (si no, salía "//en");
//  - un build de producción que termina en localhost (fuera de Vercel y sin la
//    variable) avisa en la consola: publicaría canonical y Open Graph a localhost.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/+$/, "");

if (typeof window === "undefined" && process.env.NODE_ENV === "production" && SITE_URL.includes("localhost")) {
  console.warn(
    `⚠ SITE_URL es ${SITE_URL}: las URLs de canonical, Open Graph, JSON-LD y el sitemap van a apuntar a localhost. ` +
      "Definí NEXT_PUBLIC_SITE_URL con la URL pública del sitio.",
  );
}

// `@id` de los nodos del JSON-LD: el layout define la persona y el sitio, y cada
// página los referencia (la home con ProfilePage).
export const LD_ID = {
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
};

export const PERSON = {
  name: "Fermin Lasarte",
  firstName: "Fermin",
  location: "Buenos Aires, Argentina",
  // Idiomas (BCP 47) para el `knowsLanguage` del JSON-LD: el nativo y los de
  // `edu.languages` en translations.
  languages: ["es", "en", "fr"],
  email: "fermin.lasarte@icloud.com",
  phone: "+54 9 11 2171-1289",
  phoneHref: "tel:+5491121711289",
  whatsapp: "https://wa.me/5491121711289",
};

// Cargo: ROLE para el JSON-LD y el hero, ROLE_SHORT para el <title>.
export const ROLE = "iOS & Cross-Platform Mobile Engineer";
export const ROLE_SHORT = "iOS & Mobile Engineer";

// <title> del sitio, igual en los dos idiomas (D4: sin raya larga).
export const SITE_TITLE = `${PERSON.name} · ${ROLE_SHORT}`;

// Iconos de la metadata: el favicon y el de pantalla de inicio de iOS (180×180, opaco,
// hecho a partir del favicon). Están en public/ porque, con `icons` en la metadata,
// Next no suma el apple-icon de archivo.
export const ICONS = {
  icon: { url: "/favicon.svg", type: "image/svg+xml" },
  apple: { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
};

export const SOCIAL = {
  github: "https://github.com/FerminLasarte",
  linkedin: "https://linkedin.com/in/ferminlasarte/",
  twitter: "@FerminLasarte",
};

// Secciones del nav, en orden: `id` del panel y clave de su texto. "Sobre mí" no va
// porque el nombre, a la izquierda del nav, ya lleva al hero, y Educación es parte de
// Trayectoria (docs/DISENO.md, D1). Los `id` son los de siempre, para no romper enlaces.
export const NAV_SECTIONS = [
  { id: "proyectos", key: "nav.projects" },
  { id: "experiencia", key: "nav.experience" },
  { id: "habilidades", key: "nav.skills" },
  { id: "contacto", key: "nav.contact" },
];

export const CV = [
  { lang: "es", label: "Español", href: "/assets/CV-Fermin-ES.pdf", download: "CV_Fermin_ES.pdf" },
  { lang: "en", label: "English", href: "/assets/CV-Fermin-EN.pdf", download: "CV_Fermin_EN.pdf" },
];

// Iconos de tecnologías: SVG de Devicon 2.17.0 (MIT) copiados a public/icons/devicon,
// con la misma estructura de carpetas que el repo (`<nombre>/<nombre>-<variante>.svg`).
export const DEVICON = "/icons/devicon";

// Tecnologías. De acá salen la sección Habilidades y el `knowsAbout` del JSON-LD.
// `level` se muestra como texto (M4) y `darkInvert` invierte el icono en el tema oscuro.
export const SKILL_GROUPS = [
  {
    id: "mobile",
    titleKey: "skills.mobile",
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
    titleKey: "skills.backend",
    skills: [
      { name: "Java", icon: "java/java-original", level: "advanced" },
      { name: "Python", icon: "python/python-original", level: "intermediate" },
      { name: "FastAPI", icon: "fastapi/fastapi-original", level: "intermediate" },
      { name: "C# / .NET", icon: "csharp/csharp-original", level: "intermediate" },
    ],
  },
  {
    id: "web",
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
    titleKey: "skills.tools",
    skills: [
      { name: "Git", icon: "git/git-original", level: "advanced" },
      { name: "Xcode", icon: "xcode/xcode-original", level: "advanced" },
      { name: "C / C++", icon: "cplusplus/cplusplus-original", level: "advanced" },
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

// Proyectos, en el orden de la pista. Los textos están en translations con la clave
// `projects.<id>.*`: `title` (si falta se usa `name`), `name` (el de la placa, si
// cambia con el idioma), `problem` (opcional) y `solution`.
//   status:    "live" (en producción) | "wip" (en desarrollo) | sin definir
//   platforms: "ios" | "android"
//   media:     la placa de la tarjeta (docs/DISENO.md, 7.3):
//              { type: "logo", image, width, height, plate }: el logo sobre el color de
//              fondo de la imagen (`plate` es un dato de la marca, no un token del tema).
//              { type: "type" }: el nombre del proyecto en grande.
//              Las capturas verticales de las apps (I12) van a ser otro tipo.
//   links:     "appstore" | "playstore" | "repo" | "demo". El primero es el principal:
//              la placa lleva ahí y su botón es el relleno.
export const PROJECTS = [
  {
    id: "travelpic",
    name: "TravelPic",
    status: "live",
    platforms: ["ios", "android"],
    media: { type: "logo", image: "/assets/travelpic.webp", width: 800, height: 396, plate: "#020303" },
    tags: ["Flutter", "Stripe", "Google Maps", "Firebase"],
    // La app se está volviendo a publicar; mientras tanto se enlaza la web.
    links: [{ type: "demo", url: "https://www.travelpicapp.com" }],
  },
  {
    id: "deporturnos",
    name: "DeporTurnos",
    status: "live",
    platforms: ["ios", "android"],
    media: { type: "logo", image: "/assets/deporturnos.webp", width: 800, height: 396, plate: "#FCFCFA" },
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
    media: { type: "type" },
    tags: ["Swift", "SwiftUI", "Firebase"],
    links: [{ type: "repo", url: "https://github.com/FerminLasarte/impostor-app" }],
  },
  {
    id: "chatbot",
    name: "chatbot-ai",
    status: "live",
    media: { type: "type" },
    tags: ["Python", "FastAPI", "Claude", "pgvector", "Next.js"],
    links: [{ type: "repo", url: "https://github.com/FerminLasarte/chatbot-ai" }],
  },
  {
    id: "compiler",
    name: "Compilador",
    media: { type: "type" },
    tags: ["Java", "Yacc", "Assembly x86"],
    links: [{ type: "repo", url: "https://github.com/FerminLasarte/Compilador" }],
  },
  {
    id: "vault",
    name: "Vault",
    status: "wip",
    media: { type: "type" },
    tags: ["Tauri", "React", "TypeScript", "SQLite"],
    links: [
      { type: "demo", url: "https://landing-vault.vercel.app" },
      { type: "repo", url: "https://github.com/FerminLasarte/vault-ai" },
    ],
  },
  {
    id: "bookit",
    name: "Bookit",
    status: "wip",
    media: { type: "type" },
    tags: ["Flutter", "Dart", "Supabase"],
    links: [{ type: "demo", url: "https://www.somosbookit.com.ar" }],
  },
  {
    id: "clubsystem",
    name: "ClubSystem",
    status: "wip",
    media: { type: "type" },
    tags: ["React Native", "Next.js", "FastAPI", "PostgreSQL", "Claude"],
    links: [{ type: "repo", url: "https://github.com/FerminLasarte/clubsystem" }],
  },
];

// Las apps móviles en producción: van en un panel más ancho y son las que cuenta
// "apps en producción" (no los servicios web como chatbot-ai).
export const isFeatured = (p) => p.status === "live" && p.platforms?.length > 0;

// Trayectoria. Textos en translations: `exp.<id>.title`, `.company` y `.desc`.
// `label` es el nombre corto de la barra en el eje de años.
export const EXPERIENCE = [
  { id: "travelpic", label: "TravelPic", start: 2024, end: 2025, tags: ["Flutter", "Stripe", "Firebase", "Google Maps"] },
  { id: "deporturnos", label: "DeporTurnos", start: 2021, end: 2025, tags: ["Flutter", "Firebase", "Mercado Pago"] },
];

// Educación. Textos en translations: `edu.<id>.title`, `.company` (opcional),
// `.desc` y `.period` (si no tiene años).
export const EDUCATION = [
  { id: "unicen", label: "UNICEN", start: 2020, end: 2026 },
  { id: "languages" },
];

// Cifras de la entrada de Proyectos (isFeatured cuenta solo las apps móviles en
// producción).
export const STATS = {
  appsLive: PROJECTS.filter(isFeatured).length,
  years: Math.max(...EXPERIENCE.map((e) => e.end)) - Math.min(...EXPERIENCE.map((e) => e.start)),
  projects: PROJECTS.length,
};
