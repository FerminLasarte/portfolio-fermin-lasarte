// Reemplaza {clave} en un texto traducido: fill("Captura de {name}", { name: "TravelPic" }).
export const fill = (text, vars) => text.replace(/\{(\w+)\}/g, (m, k) => vars[k] ?? m);

export const translations = {
  es: {
    "meta.description":
      "Portfolio de {name}. {role} especializado en Swift, Flutter y Backend. {apps} apps publicadas en App Store y Google Play.",

    "nav.about": "Sobre mí",
    "nav.experience": "Trayectoria",
    "nav.education": "Educación",
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
    "hero.description":
      "Estudiante avanzado de Ingeniería de Sistemas (UNICEN) con sólido enfoque en desarrollo móvil (Swift, Flutter) y backend. Experiencia creando soluciones end-to-end, desde la arquitectura del sistema hasta la publicación en tiendas. Mentalidad orientada al producto en entornos de alto crecimiento.",
    "hero.projectsBtn": "Ver proyectos",
    "hero.cvBtn": "Descargar CV",
    "hero.stat1": "Apps en producción",
    "hero.stat2": "Años de experiencia",
    "hero.stat3": "Proyectos",

    "exp.sectionLabel": "Experiencia",
    "exp.title": "Trayectoria",
    "exp.travelpic.title": "Desarrollador mobile freelance",
    "exp.travelpic.company": "Desarrollador de TravelPic | Argentina",
    "exp.travelpic.desc":
      'Diseñé la arquitectura y desarrollé una plataforma estilo "Uber para fotógrafos" utilizando Flutter. Integré la pasarela de pagos Stripe, implementé mapas en tiempo real con rutas (Google Maps) y optimicé el rendimiento general para asegurar una alta disponibilidad en tiendas.',
    "exp.deporturnos.title": "Desarrollador mobile independiente",
    "exp.deporturnos.company": "Ideólogo y creador de DeporTurnos | Argentina",
    "exp.deporturnos.desc":
      "Desarrollé una plataforma para la gestión de reservas deportivas en tiempo real. Diseñé una arquitectura backend serverless con Firebase (Firestore, Cloud Messaging), integré pagos con Mercado Pago y desarrollé desde cero un chat nativo en tiempo real.",

    "edu.title": "Educación",
    "edu.unicen.title": "Ingeniería de Sistemas",
    "edu.unicen.company": "Universidad Nacional del Centro de la Provincia de Buenos Aires (UNICEN)",
    "edu.unicen.desc":
      "Formación sólida en algoritmos, diseño de compiladores, inteligencia artificial y arquitectura de software.",
    "edu.languages.title": "Inglés y francés (B2)",
    "edu.languages.period": "Actualidad",
    "edu.languages.desc":
      "Nivel intermedio-avanzado (B2) en ambos idiomas, suficiente para leer documentación técnica y colaborar con equipos internacionales.",

    "skills.title": "Mis habilidades",
    "skills.mobile": "Mobile",
    "skills.backend": "Backend",
    "skills.web": "Web",
    "skills.db": "Bases de datos y nube",
    "skills.tools": "Herramientas",
    "skills.level.advanced": "Avanzado",
    "skills.level.intermediate": "Intermedio",

    "projects.title": "Proyectos destacados",
    "projects.live": "En producción",
    "projects.code": "Código",
    "projects.download": "Descargar",
    "projects.visit": "Visitar",
    "projects.soon": "Próximamente",
    "projects.problem": "Problema",
    "projects.solution": "Solución técnica",
    "projects.screenshotAlt": "Captura de {name}",

    "projects.travelpic.problem":
      "Los fotógrafos no tenían forma de conectar con clientes cercanos en tiempo real.",
    "projects.travelpic.solution":
      "App Flutter con arquitectura BLoC, Stripe SDK, Google Maps Platform y backend Firebase serverless.",

    "projects.deporturnos.solution":
      "Arquitectura serverless Firebase Firestore para reservas en tiempo real, chat nativo con Streams y pagos con Mercado Pago SDK.",

    "projects.impostor.title": "Juego iOS Nativo",
    "projects.impostor.solution":
      "Juego del impostor para jugar en grupo con un solo iPhone, hecho en SwiftUI con MVVM. Cuentas e historial de partidas con Firebase Auth y Firestore; el modo online está en desarrollo.",

    "projects.chatbot.title": "Chatbot con IA para pymes",
    "projects.chatbot.solution":
      "Motor multi-tenant: cada cliente tiene su propio System Prompt y su base de conocimiento. Backend FastAPI con RAG sobre PostgreSQL + pgvector, Claude como LLM, panel en Next.js y canales de WhatsApp y widget web.",

    "projects.compiler.title": "Compilador en Java",
    "projects.compiler.solution":
      "Pipeline completo: análisis léxico, parser generado con Yacc, código intermedio y generación de assembler x86 (MASM).",
    "projects.compiler.terminal": [
      "> Inicializando compilador UNICEN...",
      "> Análisis léxico y parser (Yacc)... OK",
      "> Generando código intermedio... OK",
      "> Traducción a assembler x86 completada en 0.42s.",
      "> ",
    ],

    "projects.vault.title": "Vault — Finanzas personales",
    "projects.vault.solution":
      "App de escritorio local-first: Tauri (Rust) con React y TypeScript, y los datos en SQLite en el dispositivo, sin servidor ni cuentas.",

    "projects.bookit.title": "Bookit — Turnos para centros de estética",
    "projects.bookit.solution":
      "App de reservas de turnos para barberías, peluquerías, uñas, depilación y estética, en Flutter con Supabase. La landing con lista de espera ya está online.",

    "projects.clubsystem.title": "ClubSystem — Gestión de clubes con IA",
    "projects.clubsystem.problem":
      "Los clubes deportivos carecen de herramientas modernas para gestionar socios, stock y gastos.",
    "projects.clubsystem.solution":
      "Plataforma SaaS multi-tenant: backend FastAPI + PostgreSQL, panel web en Next.js y app de socios en React Native (Expo). Detección de anomalías con la API de Anthropic.",

    "contact.title": "Trabajemos juntos",
    "contact.write": "Escribir",
    "contact.msg": "Mensaje",
    "contact.connect": "Conectá conmigo",
    "contact.profile": "Ver perfil",

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
    "nav.education": "Education",
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
    "hero.description":
      "Final-year Systems Engineering student (UNICEN) with a strong focus on mobile development (Swift, Flutter) and backend. Experience building end-to-end solutions, from system architecture to app store publishing. Product-oriented mindset in high-growth environments.",
    "hero.projectsBtn": "View Projects",
    "hero.cvBtn": "Download CV",
    "hero.stat1": "Apps in Production",
    "hero.stat2": "Years of Experience",
    "hero.stat3": "Projects",

    "exp.sectionLabel": "Experience",
    "exp.title": "Experience",
    "exp.travelpic.title": "Freelance Mobile Developer",
    "exp.travelpic.company": "Developer at TravelPic | Argentina",
    "exp.travelpic.desc":
      'Designed the architecture and developed an "Uber for photographers" platform using Flutter. Integrated Stripe payment gateway, implemented real-time maps with routing (Google Maps), and optimized overall performance to ensure high availability in stores.',
    "exp.deporturnos.title": "Independent Mobile Developer",
    "exp.deporturnos.company": "Founder & Developer of DeporTurnos | Argentina",
    "exp.deporturnos.desc":
      "Developed a real-time sports reservation management platform. Designed a serverless backend architecture with Firebase (Firestore, Cloud Messaging), integrated Mercado Pago for payments, and built a native real-time chat from scratch.",

    "edu.title": "Education",
    "edu.unicen.title": "Systems Engineering",
    "edu.unicen.company": "National University of the Center of the Province of Buenos Aires (UNICEN)",
    "edu.unicen.desc":
      "Solid foundation in algorithms, compiler design, artificial intelligence, and software architecture.",
    "edu.languages.title": "English and French (B2)",
    "edu.languages.period": "Present",
    "edu.languages.desc":
      "Upper-intermediate (B2) in both languages, enough to read technical documentation and collaborate with international teams.",

    "skills.title": "My Skills",
    "skills.mobile": "Mobile",
    "skills.backend": "Backend",
    "skills.web": "Web",
    "skills.db": "Databases & Cloud",
    "skills.tools": "Tools",
    "skills.level.advanced": "Advanced",
    "skills.level.intermediate": "Intermediate",

    "projects.title": "Featured Projects",
    "projects.live": "In Production",
    "projects.code": "Code",
    "projects.download": "Download",
    "projects.visit": "Visit",
    "projects.soon": "Coming Soon",
    "projects.problem": "Problem",
    "projects.solution": "Technical Solution",
    "projects.screenshotAlt": "{name} screenshot",

    "projects.travelpic.problem":
      "Photographers had no way to connect with nearby clients in real time.",
    "projects.travelpic.solution":
      "Flutter app with BLoC architecture, Stripe SDK, Google Maps Platform, and Firebase serverless backend.",

    "projects.deporturnos.solution":
      "Serverless Firebase Firestore architecture for real-time bookings, native chat with Streams, and Mercado Pago SDK payments.",

    "projects.impostor.title": "Native iOS Game",
    "projects.impostor.solution":
      "Impostor party game for a group sharing one iPhone, built in SwiftUI with MVVM. Accounts and game history with Firebase Auth and Firestore; online mode is in development.",

    "projects.chatbot.title": "AI Chatbot for Small Businesses",
    "projects.chatbot.solution":
      "Multi-tenant engine: each client has its own system prompt and knowledge base. FastAPI backend with RAG over PostgreSQL + pgvector, Claude as the LLM, a Next.js dashboard, and WhatsApp and web widget channels.",

    "projects.compiler.title": "Compiler Built in Java",
    "projects.compiler.solution":
      "Full pipeline: lexical analysis, Yacc-generated parser, intermediate code, and x86 assembly generation (MASM).",
    "projects.compiler.terminal": [
      "> Initializing UNICEN compiler...",
      "> Lexical analysis and parser (Yacc)... OK",
      "> Generating intermediate code... OK",
      "> x86 assembly translation completed in 0.42s.",
      "> ",
    ],

    "projects.vault.title": "Vault — Personal Finance",
    "projects.vault.solution":
      "Local-first desktop app: Tauri (Rust) with React and TypeScript, with data stored in SQLite on the device, no server and no accounts.",

    "projects.bookit.title": "Bookit — Beauty Salon Bookings",
    "projects.bookit.solution":
      "Booking app for barbershops, hair salons, nail, waxing, and beauty studios, built in Flutter with Supabase. The landing page with a waitlist is already live.",

    "projects.clubsystem.title": "ClubSystem — AI-Powered Club Management",
    "projects.clubsystem.problem":
      "Sports clubs lack modern tools to manage members, stock, and expenses.",
    "projects.clubsystem.solution":
      "Multi-tenant SaaS platform: FastAPI + PostgreSQL backend, Next.js web dashboard, and a React Native (Expo) member app. Anomaly detection with the Anthropic API.",

    "contact.title": "Let's work together",
    "contact.write": "Email me",
    "contact.msg": "Message",
    "contact.connect": "Connect with me",
    "contact.profile": "View Profile",

    "footer.rights": "All rights reserved.",

    "meta.ogTagline": "Swift, Flutter & backend. {apps} apps published on the App Store and Google Play.",

    "notFound.title": "Page not found",
    "notFound.text": "The page you're looking for doesn't exist or has moved.",
    "notFound.back": "Back to home",
  },
};
