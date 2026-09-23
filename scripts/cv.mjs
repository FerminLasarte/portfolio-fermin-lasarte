#!/usr/bin/env node
// Genera los CV del sitio: public/assets/CV-Fermin-ES.pdf y CV-Fermin-EN.pdf (el botón
// "Descargar CV" del hero, `CV` en lib/site.js). Una página A4 cada uno.
//
// Es un HTML de una sola columna que Chrome imprime a PDF. Así el texto queda
// seleccionable y en orden, que es lo que leen los sistemas de selección (ATS); por eso
// también los títulos van casi sin espaciado entre letras: con .14em se extraían como
// "S U M M A RY". La letra es la de la web (assets/fonts/Archivo-web.woff2) y los
// colores se leen de styles/tokens.css, así que siguen al sitio sin copiarlos.
//
// Los textos están acá abajo, en `CV`, y son más largos que los de la web, que es a
// propósito: el CV se lee solo. Las URLs de contacto y de los proyectos salen de
// lib/site.js, para que no vuelvan a separarse (el CV viejo tenía otro LinkedIn y un
// link de TravelPic que daba 404).
//
// Uso: npm run cv. Necesita Google Chrome; si no está en la ruta de macOS, CHROME=<ruta>.
// Después de generarlos, revisar que cada uno siga en una página (`pdfinfo`).

import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { PERSON, PROJECTS, SOCIAL } from "../lib/site.js";

const root = new URL("../", import.meta.url);
const at = (path) => fileURLToPath(new URL(path, root));

const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const font64 = readFileSync(at("assets/fonts/Archivo-web.woff2")).toString("base64");

// Los colores del tema claro, de styles/tokens.css.
const tokens = readFileSync(at("styles/tokens.css"), "utf8").split(/^:root \{$/m)[1].split(/^\}$/m)[0];
const token = (name) => {
  const value = tokens.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{3,8})\\s*;`))?.[1];
  if (!value) throw new Error(`styles/tokens.css: no se encontró ${name}.`);
  return value;
};

// El enlace de un proyecto, de PROJECTS: el primero del tipo pedido.
const projectLink = (id, type) => {
  const url = PROJECTS.find((p) => p.id === id)?.links.find((l) => l.type === type)?.url;
  if (!url) throw new Error(`lib/site.js: ${id} no tiene un enlace "${type}".`);
  return url;
};

const LINKS = {
  // La URL de producción, escrita: SITE_URL, fuera de Vercel, es localhost.
  portfolio: "https://portfolio-fermin-lasarte.vercel.app",
  linkedin: SOCIAL.linkedin,
  github: SOCIAL.github,
  email: `mailto:${PERSON.email}`,
  travelpic: projectLink("travelpic", "demo"),
  // La web de DeporTurnos, que PROJECTS no tiene (ahí van las tiendas).
  deporturnos: "https://deporturnos.com/",
  vault: projectLink("vault", "demo"),
  chatbot: projectLink("chatbot", "repo"),
  compiler: projectLink("compiler", "repo"),
};

const CV = {
  es: {
    title: "Ingeniero de Sistemas · iOS & Cross-Platform Mobile Engineer",
    place: "Buenos Aires, Argentina",
    h: { summary: "Perfil", exp: "Experiencia", projects: "Proyectos", skills: "Habilidades", edu: "Educación", langs: "Idiomas" },
    summary:
      "Ingeniero de Sistemas (UNICEN) especializado en desarrollo móvil (Swift, Flutter) y backend. Construyo apps de punta a punta, desde la arquitectura del sistema hasta la publicación en App Store y Google Play. Creé y vendí DeporTurnos, una plataforma de reservas deportivas, y desarrollé TravelPic por encargo.",
    exp: [
      {
        role: "Desarrollador móvil freelance",
        org: "TravelPic",
        link: "travelpic",
        note: "Por encargo",
        where: "Argentina",
        years: "2024 – 2025",
        bullets: [
          "Diseñé la arquitectura y desarrollé en Flutter (BLoC) una plataforma estilo “Uber para fotógrafos”: los usuarios contratan fotógrafos cercanos con una búsqueda por radio.",
          "Integré pagos con Stripe y mapas en tiempo real con rutas (Google Maps), sobre un backend serverless en Firebase.",
          "Optimicé el rendimiento y llevé la app hasta su publicación en App Store y Google Play.",
          "Terminado el desarrollo, sigo a cargo del soporte.",
        ],
      },
      {
        role: "Creador y desarrollador móvil",
        org: "DeporTurnos",
        link: "deporturnos",
        note: "Proyecto propio, vendido",
        where: "Argentina",
        years: "2021 – 2025",
        bullets: [
          "Creé en Flutter una plataforma para que los complejos deportivos gestionen sus reservas en tiempo real.",
          "Diseñé el backend serverless en Firebase: Firestore para los datos en tiempo real y Cloud Messaging para las notificaciones push.",
          "Integré pagos con Mercado Pago y desarrollé desde cero un chat nativo en tiempo real entre jugadores y complejos.",
          "Publiqué la app en App Store y Google Play: llegó a 11 complejos, más de 4300 usuarios y más de 1300 reservas, y después vendí el producto.",
        ],
      },
    ],
    projects: [
      {
        name: "Chatbot con IA para pymes",
        link: "chatbot",
        note: "Por encargo, soporte a mi cargo",
        tags: "Python, FastAPI, Claude, pgvector, Next.js",
        desc: "Cada cliente tiene su prompt y su base de conocimiento: RAG sobre PostgreSQL y pgvector, con Claude como LLM, en WhatsApp y en un widget web.",
      },
      {
        name: "Vault: finanzas personales",
        link: "vault",
        note: "Proyecto propio",
        tags: "Tauri, Rust, React, TypeScript, SQLite",
        desc: "App de escritorio local-first: los datos quedan en SQLite, en el dispositivo, sin servidor ni cuentas.",
      },
      {
        name: "Compilador en Java",
        link: "compiler",
        note: "Proyecto integral de materia, UNICEN",
        tags: "Java, Yacc, Assembly x86",
        desc: "Pipeline completo: análisis léxico, parser con Yacc, código intermedio y generación de assembler x86 (MASM).",
      },
    ],
    skills: [
      ["Móvil", "Swift, SwiftUI, Objective-C, Flutter, Dart, React Native"],
      ["Backend", "Java, Python, FastAPI, Rust, C# / .NET, C / C++, APIs REST"],
      ["Web", "TypeScript, JavaScript, React, Next.js, HTML, CSS"],
      ["Datos y nube", "PostgreSQL, MongoDB, Firebase, Supabase, SQLite, Docker"],
      ["IA", "Claude API, RAG, Rasa, Machine Learning"],
      ["Herramientas", "Git, GitHub, Xcode, TestFlight, Figma, Tauri, Scrum"],
    ],
    edu: {
      title: "Ingeniero de Sistemas",
      org: "Universidad Nacional del Centro de la Provincia de Buenos Aires (UNICEN)",
      years: "2020 – 2026",
    },
    langs: [
      ["Español", "nativo"],
      ["Inglés", "B2 (intermedio-avanzado)"],
      ["Francés", "B2 (intermedio-avanzado)"],
    ],
  },
  en: {
    title: "Systems Engineer · iOS & Cross-Platform Mobile Engineer",
    place: "Buenos Aires, Argentina",
    h: { summary: "Summary", exp: "Experience", projects: "Projects", skills: "Skills", edu: "Education", langs: "Languages" },
    summary:
      "Systems Engineer (UNICEN) specializing in mobile development (Swift, Flutter) and backend. I build apps end to end, from system architecture to release on the App Store and Google Play. I founded and sold DeporTurnos, a sports booking platform, and built TravelPic for a client.",
    exp: [
      {
        role: "Freelance Mobile Developer",
        org: "TravelPic",
        link: "travelpic",
        note: "Client work",
        where: "Argentina",
        years: "2024 – 2025",
        bullets: [
          "Designed the architecture and built an “Uber for photographers” platform in Flutter (BLoC), letting users hire nearby photographers through a radius-based search.",
          "Integrated Stripe payments and real-time maps with directions (Google Maps) on a serverless Firebase backend.",
          "Optimized performance and took the app through release on the App Store and Google Play.",
          "Development is complete; I still handle its support.",
        ],
      },
      {
        role: "Founder and Mobile Developer",
        org: "DeporTurnos",
        link: "deporturnos",
        note: "Own project, sold",
        where: "Argentina",
        years: "2021 – 2025",
        bullets: [
          "Built a Flutter platform that lets sports complexes manage their bookings in real time.",
          "Designed the serverless backend on Firebase: Firestore for real-time data and Cloud Messaging for push notifications.",
          "Integrated Mercado Pago payments and built a native real-time chat between players and venues from scratch.",
          "Released the app on the App Store and Google Play, where it reached 11 venues, 4,300+ users and 1,300+ bookings, and later sold the product.",
        ],
      },
    ],
    projects: [
      {
        name: "AI chatbot for small businesses",
        link: "chatbot",
        note: "Client work, I handle support",
        tags: "Python, FastAPI, Claude, pgvector, Next.js",
        desc: "Each client gets its own prompt and knowledge base: RAG over PostgreSQL and pgvector, with Claude as the LLM, on WhatsApp and a web widget.",
      },
      {
        name: "Vault: personal finance",
        link: "vault",
        note: "Own project",
        tags: "Tauri, Rust, React, TypeScript, SQLite",
        desc: "Local-first desktop app: data stays in SQLite on the device, with no server and no accounts.",
      },
      {
        name: "Compiler built in Java",
        link: "compiler",
        note: "University course project, UNICEN",
        tags: "Java, Yacc, x86 Assembly",
        desc: "Full pipeline: lexical analysis, a Yacc parser, intermediate code and x86 assembly generation (MASM).",
      },
    ],
    skills: [
      ["Mobile", "Swift, SwiftUI, Objective-C, Flutter, Dart, React Native"],
      ["Backend", "Java, Python, FastAPI, Rust, C# / .NET, C / C++, REST APIs"],
      ["Web", "TypeScript, JavaScript, React, Next.js, HTML, CSS"],
      ["Data & cloud", "PostgreSQL, MongoDB, Firebase, Supabase, SQLite, Docker"],
      ["AI", "Claude API, RAG, Rasa, Machine Learning"],
      ["Tools", "Git, GitHub, Xcode, TestFlight, Figma, Tauri, Scrum"],
    ],
    edu: {
      title: "Systems Engineer",
      org: "National University of the Center of the Province of Buenos Aires (UNICEN)",
      years: "2020 – 2026",
    },
    langs: [
      ["Spanish", "native"],
      ["English", "B2 (upper intermediate)"],
      ["French", "B2 (upper intermediate)"],
    ],
  },
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const a = (key, text) => `<a href="${LINKS[key]}">${esc(text)}</a>`;
const short = (url) => url.replace(/^(https?:\/\/|mailto:)(www\.)?/, "").replace(/\/$/, "");

function html(lang) {
  const c = CV[lang];
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8">
<title>Fermin Lasarte · CV</title>
<style>
@font-face { font-family: Archivo; src: url(data:font/woff2;base64,${font64}) format("woff2"); font-weight: 400 800; font-stretch: 68% 100%; }
@page { size: A4; margin: 13mm 15mm 12mm; }
* { box-sizing: border-box; margin: 0; padding: 0; }
:root { --ink: ${token("--ink")}; --muted: ${token("--ink-muted")}; --accent: ${token("--accent")}; --rule: ${token("--surface")}; }
body { font: 400 9.5pt/1.42 Archivo, sans-serif; color: var(--ink); -webkit-print-color-adjust: exact; }
a { color: inherit; text-decoration: none; }
header { display: flex; justify-content: space-between; align-items: flex-end; gap: 12pt; padding-bottom: 9pt; border-bottom: 1.2pt solid var(--ink); }
h1 { font-size: 30pt; font-weight: 800; font-stretch: 72%; line-height: .9; letter-spacing: -.01em; text-transform: uppercase; }
.title { margin-top: 5pt; font-size: 10.5pt; white-space: nowrap; font-weight: 600; color: var(--accent); }
.contact { text-align: right; font-size: 8.8pt; white-space: nowrap; line-height: 1.5; color: var(--muted); }
.contact a { color: var(--ink); }
section { margin-top: 12pt; }
h2 { font-size: 8.8pt; font-weight: 700; letter-spacing: .03em; text-transform: uppercase; color: var(--accent); padding-bottom: 3pt; margin-bottom: 6pt; border-bottom: .6pt solid var(--rule); }
.item + .item { margin-top: 9pt; }
.row { display: flex; justify-content: space-between; gap: 10pt; align-items: baseline; }
.role { font-size: 10.2pt; font-weight: 700; }
.org a { border-bottom: .6pt solid var(--accent); }
.note { color: var(--muted); font-weight: 400; }
.when { font-size: 8.6pt; color: var(--muted); white-space: nowrap; font-variant-numeric: tabular-nums; }
ul { margin-top: 3pt; padding-left: 11pt; }
li { margin-top: 1.6pt; }
li::marker { color: var(--accent); }
.tags { font-size: 8.6pt; color: var(--muted); }
.desc { margin-top: 1.5pt; }
dl { display: grid; grid-template-columns: max-content 1fr; gap: 2.4pt 12pt; }
dt { font-weight: 700; }
.langs { display: flex; gap: 18pt; }
.langs b { font-weight: 700; }
</style></head><body>
<header>
  <div><h1>Fermin Lasarte</h1><p class="title">${esc(c.title)}</p></div>
  <p class="contact">${esc(c.place)}<br>
    <a href="${LINKS.email}">${short(LINKS.email)}</a><br>
    <a href="${LINKS.portfolio}">${short(LINKS.portfolio)}</a><br>
    <a href="${LINKS.linkedin}">${short(LINKS.linkedin)}</a><br><a href="${LINKS.github}">${short(LINKS.github)}</a></p>
</header>

<section><h2>${c.h.summary}</h2><p>${esc(c.summary)}</p></section>

<section><h2>${c.h.exp}</h2>
${c.exp
  .map(
    (e) => `<div class="item">
  <div class="row"><p class="role">${esc(e.role)} · <span class="org">${a(e.link, e.org)}</span> <span class="note">· ${esc(e.note)}</span></p>
  <p class="when">${esc(e.where)} · ${e.years}</p></div>
  <ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
</div>`,
  )
  .join("\n")}
</section>

<section><h2>${c.h.projects}</h2>
${c.projects
  .map(
    (p) => `<div class="item">
  <div class="row"><p class="role"><span class="org">${a(p.link, p.name)}</span> <span class="note">· ${esc(p.note)}</span></p>
  <p class="tags">${esc(p.tags)}</p></div>
  <p class="desc">${esc(p.desc)}</p>
</div>`,
  )
  .join("\n")}
</section>

<section><h2>${c.h.skills}</h2>
<dl>${c.skills.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>
</section>

<section><h2>${c.h.edu}</h2>
<div class="row"><p><span class="role">${esc(c.edu.title)}</span> <span class="note">· ${esc(c.edu.org)}</span></p><p class="when">${c.edu.years}</p></div>
</section>

<section><h2>${c.h.langs}</h2>
<p class="langs">${c.langs.map(([k, v]) => `<span><b>${esc(k)}:</b> ${esc(v)}</span>`).join("")}</p>
</section>
</body></html>`;
}

const dir = mkdtempSync(join(tmpdir(), "cv-"));
try {
  for (const lang of ["es", "en"]) {
    const file = join(dir, `cv-${lang}.html`);
    writeFileSync(file, html(lang));
    const out = at(`public/assets/CV-Fermin-${lang.toUpperCase()}.pdf`);
    execFileSync(CHROME, ["--headless", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${out}`, `file://${file}`], {
      stdio: "ignore",
    });
    console.log(`✓ ${out}`);
  }
} finally {
  rmSync(dir, { recursive: true, force: true });
}
