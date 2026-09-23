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
  // Dónde vive: la ciudad va en el crédito de la franja y las dos en el `homeLocation`
  // del JSON-LD.
  city: "Buenos Aires",
  country: "Argentina",
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

// Iconos de la metadata: el favicon y el de pantalla de inicio de iOS (180×180, opaco
// y a sangre, porque iOS le pone su propia máscara redondeada). Los tres los genera
// scripts/icons.mjs desde la F de Archivo Display (`npm run icons`): no se editan a
// mano. Están en public/ porque, con `icons` en la metadata, Next no suma el
// apple-icon de archivo.
export const ICONS = {
  icon: { url: "/favicon.svg", type: "image/svg+xml" },
  apple: { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
};

export const SOCIAL = {
  github: "https://github.com/FerminLasarte",
  linkedin: "https://linkedin.com/in/ferminlasarte/",
  twitter: "@FerminLasarte",
};

// Atributos de los enlaces que abren otra pestaña. El aviso para los lectores de
// pantalla ("(abre en una pestaña nueva)") lo suma cada enlace (R-M10).
export const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" };

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
  { lang: "es", href: "/assets/CV-Fermin-ES.pdf", download: "CV_Fermin_ES.pdf" },
  { lang: "en", href: "/assets/CV-Fermin-EN.pdf", download: "CV_Fermin_EN.pdf" },
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

// Tecnologías sin icono: van en "También" de /habilidades (SkillsPage) y en el
// `knowsAbout` del JSON-LD.
export const OTHER_SKILLS = [
  "REST API",
  "Tauri",
  "TestFlight",
  "Scrum",
  "Claude API",
  "Rasa",
  "Machine Learning",
];

// Proyectos, en el orden de la pista. El `id` es también el slug de su página propia
// (/proyectos/<id>, el mismo en los dos idiomas), así que cambiarlo rompe una URL
// publicada. `stats` (opcional) son las cifras grandes del bloque Resultado de esa
// página, con su texto en `projects.stat.<key>`. Los textos están en translations con la clave `projects.<id>.*`: `title`
// (si falta se usa `name`), `name` (el de la placa, si cambia con el idioma), `problem`
// (opcional) y `solution`. La página propia suma `context`, `build`, `decisions` y
// `result`, todas opcionales: cada bloque aparece solo si su clave existe
// (components/ProjectPage.jsx).
//   origin:    de quién es: "own" (propio) | "client" (por encargo) | "partners" (con dos
//              socios) | "university" (proyecto integral de la facultad). Va primero en la
//              línea de meta de la tarjeta y de la página (components/ProjectMeta.jsx).
//   sold:      true si se vendió. support: true si Fermin sigue a cargo del soporte.
//   status:    "live" (en producción) | "relaunch" (estuvo publicada y se está volviendo a
//              publicar) | "wip" (en desarrollo) | sin definir
//   platforms: "ios" | "android"
//   media:     la placa de la tarjeta (docs/DISENO.md, 7.3):
//              { type: "logo", image, width, height, plate }: el logo sobre el color de
//              fondo de la imagen (`plate` es un dato de la marca, no un token del tema).
//              { type: "type" }: el nombre del proyecto en grande.
//              { type: "window", image, imageDark, width, height, gallery }: capturas de
//              una app de escritorio, en una ventana de macOS; `imageDark` (opcional) es
//              la versión oscura, que se muestra con el tema oscuro del sitio.
//              { type: "shot", image, width, height, plate, gallery }: la captura vertical de la
//              app dentro de un marco de teléfono, que se desplaza sola mientras el
//              panel cruza la pantalla (I12). La imagen tiene que ser más alta que
//              ancha (proporción de teléfono o más larga: cuanto más larga, más
//              recorrido; una de una sola pantalla queda quieta). Necesita su
//              descripción en translations, `projects.<id>.shotAlt`: en la página
//              del proyecto la captura es contenido, no decoración. `gallery`
//              (opcional) son más capturas, `{ key, image, width, height }`, que solo
//              muestra la página del proyecto, en abanico detrás de la principal; su
//              descripción va en `projects.<id>.shotAlt.<key>`.
//   links:     "appstore" | "playstore" | "repo" | "demo". El primero es el principal
//              de afuera; el botón relleno de la tarjeta lleva a la página del
//              proyecto y estos van al lado, con borde (docs/DISENO.md, 7.3).
export const PROJECTS = [
  {
    id: "travelpic",
    name: "TravelPic",
    origin: "client",
    support: true,
    // Se entregó publicada, pero hoy no está en las tiendas: se está volviendo a
    // publicar (Fermin, 2026-09-22). Por eso no cuenta entre las apps en producción.
    status: "relaunch",
    platforms: ["ios", "android"],
    // Capturas del simulador (Fermin sigue con el soporte): Inicio en la tarjeta, y en
    // la página, en abanico con el perfil de un fotógrafo y los medios de pago. La
    // placa es el negro de la marca.
    media: {
      type: "shot",
      image: "/assets/travelpic-inicio.webp",
      width: 920,
      height: 2000,
      plate: "#020303",
      gallery: [
        { key: "profile", image: "/assets/travelpic-perfil.webp", width: 920, height: 2000 },
        { key: "payments", image: "/assets/travelpic-pagos.webp", width: 920, height: 2000 },
      ],
    },
    tags: ["Flutter", "Stripe", "Google Maps", "Firebase"],
    // La app se está volviendo a publicar; mientras tanto se enlaza la web.
    links: [{ type: "demo", url: "https://www.travelpicapp.com" }],
  },
  {
    id: "deporturnos",
    name: "DeporTurnos",
    origin: "own",
    sold: true,
    status: "live",
    platforms: ["ios", "android"],
    // La captura de Reservar, de la app publicada (Fermin la vendió, así que no hay
    // simulador): barra de estado tapada, 828×1800. La placa es el violeta de la app.
    media: {
      type: "shot",
      image: "/assets/deporturnos-reservas.webp",
      width: 828,
      height: 1800,
      plate: "#A833E1",
    },
    tags: ["Flutter", "Firebase", "Mercado Pago"],
    // Cifras del bloque Resultado de su página, al momento de la venta. `plus` es "más
    // de": se muestra como "4300+" (en inglés, "4,300+": el formato de cada idioma).
    stats: [
      { key: "venues", value: 11 },
      { key: "users", value: 4300, plus: true },
      { key: "bookings", value: 1300, plus: true },
    ],
    links: [
      { type: "appstore", url: "https://apps.apple.com/ar/app/deporturnos/id6670566502" },
      { type: "playstore", url: "https://play.google.com/store/apps/details?id=com.vldevelopment.deporturnos" },
    ],
  },
  {
    id: "vault",
    name: "Vault",
    origin: "own",
    status: "live",
    // Capturas de la app con datos de ejemplo, en claro y en oscuro (se muestra la del
    // tema del sitio), sin la franja negra de arriba: 1600×1004. Estadísticas en la
    // tarjeta; en la página, en cascada con Transacciones y Ahorros.
    media: {
      type: "window",
      image: "/assets/vault-estadisticas.webp",
      imageDark: "/assets/vault-estadisticas-oscuro.webp",
      width: 1600,
      height: 1004,
      gallery: [
        {
          key: "transactions",
          image: "/assets/vault-transacciones.webp",
          imageDark: "/assets/vault-transacciones-oscuro.webp",
          width: 1600,
          height: 1004,
        },
        {
          key: "savings",
          image: "/assets/vault-ahorros.webp",
          imageDark: "/assets/vault-ahorros-oscuro.webp",
          width: 1600,
          height: 1004,
        },
      ],
    },
    tags: ["Tauri", "Rust", "React", "TypeScript", "SQLite"],
    links: [
      { type: "demo", url: "https://landing-vault.vercel.app" },
      { type: "repo", url: "https://github.com/FerminLasarte/vault-ai" },
    ],
  },
  {
    id: "chatbot",
    name: "chatbot-ai",
    origin: "client",
    support: true,
    status: "live",
    media: { type: "type" },
    tags: ["Python", "FastAPI", "Claude", "pgvector", "Next.js"],
    links: [{ type: "repo", url: "https://github.com/FerminLasarte/chatbot-ai" }],
  },
  {
    id: "bookit",
    name: "Bookit",
    origin: "partners",
    status: "wip",
    platforms: ["ios", "android"],
    // Capturas del simulador con datos de ejemplo: Inicio (quien saca turnos) en la
    // tarjeta; en la página, con la elección del horario y la agenda del local, los dos
    // lados de la app. La placa es el ámbar de la marca.
    media: {
      type: "shot",
      image: "/assets/bookit-inicio.webp",
      width: 920,
      height: 2000,
      plate: "#D88A1C",
      gallery: [
        { key: "booking", image: "/assets/bookit-reserva.webp", width: 920, height: 2000 },
        { key: "agenda", image: "/assets/bookit-agenda.webp", width: 920, height: 2000 },
      ],
    },
    tags: ["Flutter", "Dart", "Supabase"],
    links: [{ type: "demo", url: "https://www.somosbookit.com.ar" }],
  },
  {
    id: "compiler",
    name: "Compilador",
    origin: "university",
    media: { type: "type" },
    tags: ["Java", "Yacc", "Assembly x86"],
    links: [{ type: "repo", url: "https://github.com/FerminLasarte/Compilador" }],
  },
];

// Las apps móviles van en un panel más ancho (no los servicios web como chatbot-ai).
// Las que además están en producción son las que cuenta "apps en producción".
export const isFeatured = (p) => p.platforms?.length > 0;
const isLiveApp = (p) => isFeatured(p) && p.status === "live";

// Trayectoria. Textos en translations: `exp.<id>.company` (el nombre, que es el título
// de la etapa), `.title` (el rol) y `.desc`. `where` es igual en los dos idiomas.
export const EXPERIENCE = [
  { id: "travelpic", start: 2024, end: 2025, where: "Argentina", tags: ["Flutter", "Stripe", "Firebase", "Google Maps"] },
  { id: "deporturnos", start: 2021, end: 2025, where: "Argentina", tags: ["Flutter", "Firebase", "Mercado Pago"] },
];

// Educación. Textos en translations: `edu.<id>.title`, `.company` (opcional),
// `.desc` y `.period` (si no tiene años). `done` marca una etapa terminada aunque su
// último año sea el actual, así no dice "en curso" (Fermin se recibió en 2026). `label` es el nombre corto del lugar, el que
// muestra la etapa en la home.
export const EDUCATION = [
  { id: "unicen", label: "UNICEN", start: 2020, end: 2026, done: true },
  { id: "languages" },
];

// Las etapas con años, sin ordenar: la home y /trayectoria las ordenan y arman sus
// textos cada una a su manera. Las que no tienen años (los idiomas) van como nota.
export const STAGES = [
  ...EXPERIENCE.map((e) => ({ ...e, kind: "work" })),
  ...EDUCATION.filter((e) => e.start).map((e) => ({ ...e, kind: "edu" })),
];
export const EDUCATION_NOTES = EDUCATION.filter((e) => !e.start);

// Cifras de la entrada de Proyectos (appsLive cuenta solo las apps móviles en
// producción).
export const STATS = {
  appsLive: PROJECTS.filter(isLiveApp).length,
  years: Math.max(...EXPERIENCE.map((e) => e.end)) - Math.min(...EXPERIENCE.map((e) => e.start)),
  projects: PROJECTS.length,
};
