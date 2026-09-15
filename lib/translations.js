// Reemplaza {clave} en un texto traducido: fill("Captura de {name}", { name: "TravelPic" }).
export const fill = (text, vars) => text.replace(/\{(\w+)\}/g, (m, k) => vars[k] ?? m);

export const translations = {
  es: {
    "meta.description":
      "Portfolio de {name}. {role} especializado en Swift, Flutter y Backend. {apps} apps publicadas en App Store y Google Play.",

    "nav.about": "Sobre mí",
    "nav.experience": "Trayectoria",
    "nav.skills": "Habilidades",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "nav.langToggle": "Cambiar idioma",
    "nav.themeToggle": "Tema oscuro",
    "nav.skip": "Saltar al contenido",
    "nav.sections": "Secciones",
    "nav.menu": "Menú",
    "nav.close": "Cerrar",
    "lang.es": "Español",
    "lang.en": "English",

    "hero.availability": "Disponible para nuevos desafíos",
    "hero.lead":
      "Hago apps móviles de punta a punta: arquitectura, backend y publicación en App Store y Google Play.",
    "hero.photoAlt": "Foto de Fermin",
    "hero.dragCursor": "Arrastrame",
    "exp.intro":
      "Estudiante avanzado de Ingeniería de Sistemas (UNICEN) con sólido enfoque en desarrollo móvil (Swift, Flutter) y backend. Experiencia creando soluciones end-to-end, desde la arquitectura del sistema hasta la publicación en tiendas. Mentalidad orientada al producto en entornos de alto crecimiento.",
    "hero.projectsBtn": "Ver proyectos",
    "hero.cvBtn": "Descargar CV",

    "exp.kind.work": "Experiencia",
    "exp.kind.edu": "Educación",
    "exp.title": "Trayectoria",
    "exp.travelpic.title": "Desarrollador mobile freelance",
    "exp.travelpic.company": "Desarrollador de TravelPic | Argentina",
    "exp.travelpic.desc":
      'Diseñé la arquitectura y desarrollé una plataforma estilo "Uber para fotógrafos" utilizando Flutter. Integré la pasarela de pagos Stripe, implementé mapas en tiempo real con rutas (Google Maps) y optimicé el rendimiento general para asegurar una alta disponibilidad en tiendas.',
    "exp.deporturnos.title": "Desarrollador mobile independiente",
    "exp.deporturnos.company": "Ideólogo y creador de DeporTurnos | Argentina",
    "exp.deporturnos.desc":
      "Desarrollé una plataforma para la gestión de reservas deportivas en tiempo real. Diseñé una arquitectura backend serverless con Firebase (Firestore, Cloud Messaging), integré pagos con Mercado Pago y desarrollé desde cero un chat nativo en tiempo real.",

    "edu.unicen.title": "Ingeniería de Sistemas",
    "edu.unicen.company": "Universidad Nacional del Centro de la Provincia de Buenos Aires (UNICEN)",
    "edu.unicen.desc":
      "Formación sólida en algoritmos, diseño de compiladores, inteligencia artificial y arquitectura de software.",
    "edu.languages.title": "Inglés y francés (B2)",
    "edu.languages.period": "Actualidad",
    "edu.languages.desc":
      "Nivel intermedio-avanzado (B2) en ambos idiomas, suficiente para leer documentación técnica y colaborar con equipos internacionales.",

    "skills.title": "Habilidades",
    "skills.mobile": "Mobile",
    "skills.backend": "Backend",
    "skills.web": "Web",
    "skills.db": "Bases de datos y nube",
    "skills.tools": "Herramientas",
    "skills.level.advanced": "Avanzado",
    "skills.level.intermediate": "Intermedio",

    "projects.title": "Proyectos",
    "projects.live": "En producción",
    "projects.wip": "En desarrollo",
    "projects.and": "y",
    "projects.code": "Código",
    "projects.visit": "Visitar",
    "projects.screenshotAlt": "Captura de {name}",
    "projects.stat.apps": "apps en producción",
    "projects.stat.years": "años de experiencia",
    "projects.stat.projects": "proyectos",

    "projects.travelpic.problem":
      "Los fotógrafos no tenían forma de conectar con clientes cercanos en tiempo real.",
    "projects.travelpic.solution":
      "App Flutter con arquitectura BLoC, pagos con Stripe, Google Maps y backend serverless en Firebase.",

    "projects.deporturnos.solution":
      "Reservas deportivas en tiempo real sobre Firebase, con chat nativo y pagos con Mercado Pago.",

    "projects.impostor.title": "Juego iOS nativo",
    "projects.impostor.solution":
      "Juego del impostor para un grupo con un solo iPhone, en SwiftUI con MVVM y Firebase. El modo online está en desarrollo.",

    "projects.chatbot.title": "Chatbot con IA para pymes",
    "projects.chatbot.solution":
      "Cada cliente tiene su prompt y su base de conocimiento: RAG sobre PostgreSQL y pgvector, Claude como LLM, WhatsApp y widget web.",

    "projects.compiler.name": "Compilador",
    "projects.compiler.title": "Compilador en Java",
    "projects.compiler.solution":
      "Pipeline completo: análisis léxico, parser con Yacc, código intermedio y assembler x86 (MASM).",

    "projects.vault.title": "Vault: finanzas personales",
    "projects.vault.solution":
      "App de escritorio local-first en Tauri, React y TypeScript. Los datos quedan en SQLite, en el dispositivo, sin servidor ni cuentas.",

    "projects.bookit.title": "Bookit: turnos para centros de estética",
    "projects.bookit.solution":
      "Reservas de turnos para barberías, peluquerías y centros de estética, en Flutter con Supabase. La lista de espera ya está online.",

    "projects.clubsystem.title": "ClubSystem: gestión de clubes con IA",
    "projects.clubsystem.problem":
      "Los clubes deportivos carecen de herramientas modernas para gestionar socios, stock y gastos.",
    "projects.clubsystem.solution":
      "SaaS multi-tenant: FastAPI y PostgreSQL, panel en Next.js, app de socios en React Native y detección de anomalías con Claude.",

    "contact.title": "Trabajemos juntos",
    "contact.copy": "Copiar email",
    "contact.copied": "Copiado",
    "contact.back": "Volver al inicio",

    "footer.rights": "Todos los derechos reservados.",

    "meta.ogTagline": "Swift, Flutter y backend. {apps} apps publicadas en App Store y Google Play.",

    "notFound.title": "Página no encontrada",
    "notFound.text": "La página que buscás no existe o cambió de dirección.",
    "notFound.back": "Volver al inicio",
  },
  en: {
    "meta.description":
      "Portfolio of {name}. {role} specializing in Swift, Flutter, and backend development. {apps} apps published on the App Store and Google Play.",

    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.langToggle": "Change language",
    "nav.themeToggle": "Dark theme",
    "nav.skip": "Skip to content",
    "nav.sections": "Sections",
    "nav.menu": "Menu",
    "nav.close": "Close",
    "lang.es": "Español",
    "lang.en": "English",

    "hero.availability": "Available for new challenges",
    "hero.lead":
      "I build mobile apps end to end: architecture, backend, and release on the App Store and Google Play.",
    "hero.photoAlt": "Photo of Fermin",
    "hero.dragCursor": "Drag me",
    "exp.intro":
      "Final-year Systems Engineering student (UNICEN) with a strong focus on mobile development (Swift, Flutter) and backend. Experience building end-to-end solutions, from system architecture to app store publishing. Product-oriented mindset in high-growth environments.",
    "hero.projectsBtn": "View Projects",
    "hero.cvBtn": "Download CV",

    "exp.kind.work": "Work",
    "exp.kind.edu": "Education",
    "exp.title": "Experience",
    "exp.travelpic.title": "Freelance Mobile Developer",
    "exp.travelpic.company": "Developer at TravelPic | Argentina",
    "exp.travelpic.desc":
      'Designed the architecture and developed an "Uber for photographers" platform using Flutter. Integrated Stripe payment gateway, implemented real-time maps with routing (Google Maps), and optimized overall performance to ensure high availability in stores.',
    "exp.deporturnos.title": "Independent Mobile Developer",
    "exp.deporturnos.company": "Founder & Developer of DeporTurnos | Argentina",
    "exp.deporturnos.desc":
      "Developed a real-time sports reservation management platform. Designed a serverless backend architecture with Firebase (Firestore, Cloud Messaging), integrated Mercado Pago for payments, and built a native real-time chat from scratch.",

    "edu.unicen.title": "Systems Engineering",
    "edu.unicen.company": "National University of the Center of the Province of Buenos Aires (UNICEN)",
    "edu.unicen.desc":
      "Solid foundation in algorithms, compiler design, artificial intelligence, and software architecture.",
    "edu.languages.title": "English and French (B2)",
    "edu.languages.period": "Present",
    "edu.languages.desc":
      "Upper-intermediate (B2) in both languages, enough to read technical documentation and collaborate with international teams.",

    "skills.title": "Skills",
    "skills.mobile": "Mobile",
    "skills.backend": "Backend",
    "skills.web": "Web",
    "skills.db": "Databases & Cloud",
    "skills.tools": "Tools",
    "skills.level.advanced": "Advanced",
    "skills.level.intermediate": "Intermediate",

    "projects.title": "Projects",
    "projects.live": "In production",
    "projects.wip": "In development",
    "projects.and": "and",
    "projects.code": "Code",
    "projects.visit": "Visit",
    "projects.screenshotAlt": "{name} screenshot",
    "projects.stat.apps": "apps in production",
    "projects.stat.years": "years of experience",
    "projects.stat.projects": "projects",

    "projects.travelpic.problem":
      "Photographers had no way to connect with nearby clients in real time.",
    "projects.travelpic.solution":
      "Flutter app with BLoC architecture, Stripe payments, Google Maps, and a serverless Firebase backend.",

    "projects.deporturnos.solution":
      "Real-time sports bookings on Firebase, with native chat and Mercado Pago payments.",

    "projects.impostor.title": "Native iOS game",
    "projects.impostor.solution":
      "Impostor party game for a group sharing one iPhone, built in SwiftUI with MVVM and Firebase. Online mode is in development.",

    "projects.chatbot.title": "AI chatbot for small businesses",
    "projects.chatbot.solution":
      "Each client gets its own prompt and knowledge base: RAG over PostgreSQL and pgvector, Claude as the LLM, WhatsApp, and a web widget.",

    "projects.compiler.name": "Compiler",
    "projects.compiler.title": "Compiler built in Java",
    "projects.compiler.solution":
      "Full pipeline: lexical analysis, Yacc parser, intermediate code, and x86 assembly (MASM).",

    "projects.vault.title": "Vault: personal finance",
    "projects.vault.solution":
      "Local-first desktop app built with Tauri, React, and TypeScript. Data stays in SQLite on the device, with no server and no accounts.",

    "projects.bookit.title": "Bookit: beauty salon bookings",
    "projects.bookit.solution":
      "Booking app for barbershops, hair salons, and beauty studios, built in Flutter with Supabase. The waitlist is already live.",

    "projects.clubsystem.title": "ClubSystem: AI-powered club management",
    "projects.clubsystem.problem":
      "Sports clubs lack modern tools to manage members, stock, and expenses.",
    "projects.clubsystem.solution":
      "Multi-tenant SaaS: FastAPI and PostgreSQL, a Next.js dashboard, a React Native member app, and anomaly detection with Claude.",

    "contact.title": "Let's work together",
    "contact.copy": "Copy email",
    "contact.copied": "Copied",
    "contact.back": "Back to start",

    "footer.rights": "All rights reserved.",

    "meta.ogTagline": "Swift, Flutter & backend. {apps} apps published on the App Store and Google Play.",

    "notFound.title": "Page not found",
    "notFound.text": "The page you're looking for doesn't exist or has moved.",
    "notFound.back": "Back to home",
  },
};
