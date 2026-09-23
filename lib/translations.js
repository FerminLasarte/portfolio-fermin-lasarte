// Reemplaza {clave} en un texto traducido: fill("Captura de {name}", { name: "TravelPic" }).
export const fill = (text, vars) => text.replace(/\{(\w+)\}/g, (m, k) => vars[k] ?? m);

export const translations = {
  es: {
    "meta.description":
      "Portfolio de {name}. {role} especializado en Swift, Flutter y backend. {apps} apps en producción.",

    "nav.about": "Sobre mí",
    "nav.experience": "Trayectoria",
    "nav.skills": "Habilidades",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "nav.themeToggle": "Tema oscuro",
    "nav.skip": "Saltar al contenido",
    "nav.sections": "Secciones",
    "nav.menu": "Menú",
    "nav.close": "Cerrar",
    "lang.es": "Español",
    "lang.en": "English",

    "hero.availability": "Disponible para nuevos desafíos",
    "hero.lead":
      "Ingeniero de Sistemas que hace apps móviles de punta a punta: arquitectura, backend y publicación en App Store y Google Play.",
    "hero.photoAlt": "Foto de Fermin",
    "hero.dragCursor": "Arrastrame",
    "exp.intro":
      "Ingeniero de Sistemas (UNICEN) con sólido enfoque en desarrollo móvil (Swift, Flutter) y backend. Experiencia creando soluciones de punta a punta, desde la arquitectura del sistema hasta la publicación en tiendas.",
    "hero.projectsBtn": "Ver proyectos",
    "hero.cvBtn": "Descargar CV",

    "exp.kind.work": "Experiencia",
    "exp.kind.edu": "Educación",
    "exp.lead": "Ingeniero de Sistemas, con foco en desarrollo móvil (Swift, Flutter) y backend.",
    "exp.ongoing": "en curso",
    "exp.travelpic.short": "Un “Uber para fotógrafos” en Flutter, con pagos de Stripe y mapas en tiempo real.",
    "exp.deporturnos.short": "Reservas deportivas en tiempo real: backend serverless, pagos con Mercado Pago y un chat propio.",
    "edu.unicen.short": "Algoritmos, compiladores, inteligencia artificial y arquitectura de software.",
    "edu.languages.label": "Idiomas",
    "exp.more": "Ver trayectoria completa",
    "exp.pageDescription": "La trayectoria de Fermin Lasarte: DeporTurnos, TravelPic e Ingeniería de Sistemas en la UNICEN, con el detalle de cada etapa.",
    "page.back": "Volver al inicio",
    "page.home": "Inicio",
    "page.techs": "Tecnologías",
    "page.seeProject": "Ver el proyecto",
    "exp.title": "Trayectoria",
    "exp.travelpic.title": "Desarrollador móvil freelance",
    "exp.travelpic.company": "TravelPic",
    "exp.travelpic.desc":
      "Diseñé la arquitectura y desarrollé una plataforma estilo “Uber para fotógrafos” utilizando Flutter. Integré la pasarela de pagos Stripe, implementé mapas en tiempo real con rutas (Google Maps) y optimicé el rendimiento general para asegurar una alta disponibilidad en tiendas. Hoy sigo a cargo del soporte.",
    "exp.deporturnos.title": "Creador y desarrollador móvil",
    "exp.deporturnos.company": "DeporTurnos",
    "exp.deporturnos.desc":
      "Desarrollé una plataforma para la gestión de reservas deportivas en tiempo real. Diseñé una arquitectura backend serverless con Firebase (Firestore, Cloud Messaging), integré pagos con Mercado Pago y desarrollé desde cero un chat nativo en tiempo real. Fue un proyecto propio, que después vendí.",

    "edu.unicen.title": "Ingeniería de Sistemas",
    "edu.unicen.company": "Universidad Nacional del Centro de la Provincia de Buenos Aires (UNICEN)",
    "edu.unicen.desc":
      "Formación sólida en algoritmos, diseño de compiladores, inteligencia artificial y arquitectura de software.",
    "edu.languages.title": "Inglés y francés (B2)",
    "edu.languages.period": "Actualidad",
    "edu.languages.desc":
      "Nivel intermedio-avanzado (B2) en ambos idiomas, suficiente para leer documentación técnica y colaborar con equipos internacionales.",

    "skills.title": "Habilidades",
    "skills.mobile": "Móvil",
    "skills.backend": "Backend",
    "skills.web": "Web",
    "skills.db": "Bases de datos y nube",
    "skills.tools": "Herramientas",
    "skills.level.advanced": "Avanzado",
    "skills.level.intermediate": "Intermedio",
    "skills.lead": "Swift, Flutter y Firebase, todos los días.",
    "skills.row.back": "Backend, datos y nube",
    "skills.row.web": "Web y herramientas",
    "skills.more": "Ver todas las habilidades",
    "skills.pageDescription": "Las tecnologías con las que trabaja Fermin Lasarte, su nivel en cada una y en qué proyectos las usó.",
    "skills.pageLead": "Las tecnologías con las que trabajo, qué tan bien las manejo y en qué proyectos de este sitio las usé.",
    "skills.usedIn": "Usada en",
    "skills.matrixTitle": "Dónde las usé",
    "skills.matrixLead": "Cada punto es un proyecto de este sitio.",
    "skills.tech": "Tecnología",
    "skills.yes": "Sí",
    "skills.no": "No",
    "skills.other": "También",

    "projects.title": "Proyectos",
    "projects.live": "En producción",
    "projects.wip": "En desarrollo",
    "projects.and": "y",
    "projects.code": "Código",
    "projects.visit": "Visitar",
    // Nombre accesible de los botones que se repiten (R-M10): {label} es lo que se ve.
    "projects.codeOf": "{label} de {name}",
    "projects.visitOf": "{label} {name}",
    "link.newTab": "(abre en una pestaña nueva)",
    "projects.stat.apps": "apps en producción",
    "projects.stat.years": "años de experiencia",
    "projects.stat.projects": "proyectos",
    // De quién es cada proyecto (`origin`, `sold` y `support` en PROJECTS).
    "projects.origin.own": "Proyecto propio",
    "projects.origin.client": "Por encargo",
    "projects.origin.partner": "Con un socio",
    "projects.origin.university": "Proyecto integral universitario",
    "projects.sold": "Vendido",
    "projects.support": "Soporte a mi cargo",

    // Página de Proyectos (/proyectos) y la de cada uno (/proyectos/<id>). Los títulos
    // de los bloques del detalle se muestran solo si el proyecto tiene ese texto
    // (`projects.<id>.context`, `.build`, `.decisions` y `.result`): hoy no los tiene
    // ninguno, así que las páginas salen con el resumen y los enlaces
    // (components/ProjectPage.jsx).
    "projects.pageDescription":
      "Apps móviles, herramientas de escritorio y servicios que construí: qué resolvía cada uno y con qué.",
    "projects.pageLead": "Cada proyecto, con el problema que resolvía, cómo está hecho y dónde verlo.",
    "projects.all": "Todos los proyectos",
    "projects.next": "Siguiente proyecto",
    "projects.prev": "Proyecto anterior",
    "projects.context": "Contexto",
    "projects.build": "Qué construí",
    "projects.decisions": "Decisiones técnicas",
    "projects.result": "Resultado",

    "projects.travelpic.problem":
      "Los fotógrafos no tenían forma de conectar con clientes cercanos en tiempo real.",
    "projects.travelpic.solution":
      "App Flutter con arquitectura BLoC, pagos con Stripe, Google Maps y backend serverless en Firebase.",

    "projects.deporturnos.solution":
      "Reservas deportivas en tiempo real sobre Firebase, con chat nativo y pagos con Mercado Pago.",
    "projects.deporturnos.shotAlt":
      "La pantalla Reservar de DeporTurnos: una búsqueda de canchas de fútbol 8 para mañana, con dos complejos y sus horarios libres.",

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

    "contact.title": "Trabajemos juntos",
    "contact.back": "Volver al inicio",
    "curtain.home": "Inicio",

    "preloader.words": "HAGO SOFTWARE QUE INNOVA",
    "strip.credit": "Hecho a mano en {city}",

    "footer.rights": "Todos los derechos reservados.",

    "meta.ogTagline": "Swift, Flutter y backend. {apps} apps en producción.",

    "notFound.title": "Página no encontrada",
    "notFound.text": "La página que buscás no existe o cambió de dirección.",
    "notFound.back": "Volver al inicio",
  },
  en: {
    "meta.description":
      "Portfolio of {name}. {role} specializing in Swift, Flutter, and backend development. {apps} apps in production.",

    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.themeToggle": "Dark theme",
    "nav.skip": "Skip to content",
    "nav.sections": "Sections",
    "nav.menu": "Menu",
    "nav.close": "Close",
    "lang.es": "Español",
    "lang.en": "English",

    "hero.availability": "Available for new challenges",
    "hero.lead":
      "Systems Engineer who builds mobile apps end to end: architecture, backend, and release on the App Store and Google Play.",
    "hero.photoAlt": "Photo of Fermin",
    "hero.dragCursor": "Drag me",
    "exp.intro":
      "Systems Engineer (UNICEN) with a strong focus on mobile development (Swift, Flutter) and backend. Experience building end-to-end solutions, from system architecture to app store publishing.",
    "hero.projectsBtn": "View projects",
    "hero.cvBtn": "Download CV",

    "exp.kind.work": "Work",
    "exp.kind.edu": "Education",
    "exp.lead": "Systems Engineer focused on mobile (Swift, Flutter) and backend.",
    "exp.ongoing": "ongoing",
    "exp.travelpic.short": "An “Uber for photographers” built in Flutter, with Stripe payments and real-time maps.",
    "exp.deporturnos.short": "Real-time sports court booking: a serverless backend, Mercado Pago payments and a custom chat.",
    "edu.unicen.short": "Algorithms, compilers, artificial intelligence and software architecture.",
    "edu.languages.label": "Languages",
    "exp.more": "See full experience",
    "exp.pageDescription": "Fermin Lasarte’s experience: DeporTurnos, TravelPic and Systems Engineering at UNICEN, with the details of each stage.",
    "page.back": "Back to home",
    "page.home": "Home",
    "page.techs": "Technologies",
    "page.seeProject": "See the project",
    "exp.title": "Experience",
    "exp.travelpic.title": "Freelance mobile developer",
    "exp.travelpic.company": "TravelPic",
    "exp.travelpic.desc":
      "Designed the architecture and developed an “Uber for photographers” platform using Flutter. Integrated Stripe payment gateway, implemented real-time maps with routing (Google Maps), and optimized overall performance to ensure high availability in stores. I still handle its support.",
    "exp.deporturnos.title": "Founder and mobile developer",
    "exp.deporturnos.company": "DeporTurnos",
    "exp.deporturnos.desc":
      "Developed a real-time sports reservation management platform. Designed a serverless backend architecture with Firebase (Firestore, Cloud Messaging), integrated Mercado Pago for payments, and built a native real-time chat from scratch. It was my own project, and I later sold it.",

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
    "skills.db": "Databases and cloud",
    "skills.tools": "Tools",
    "skills.level.advanced": "Advanced",
    "skills.level.intermediate": "Intermediate",
    "skills.lead": "Swift, Flutter and Firebase, every day.",
    "skills.row.back": "Backend, data and cloud",
    "skills.row.web": "Web and tools",
    "skills.more": "See all skills",
    "skills.pageDescription": "The technologies Fermin Lasarte works with, his level in each one and the projects he used them in.",
    "skills.pageLead": "The technologies I work with, how well I know them, and which projects on this site use them.",
    "skills.usedIn": "Used in",
    "skills.matrixTitle": "Where I used them",
    "skills.matrixLead": "Each dot is a project on this site.",
    "skills.tech": "Technology",
    "skills.yes": "Yes",
    "skills.no": "No",
    "skills.other": "Also",

    "projects.title": "Projects",
    "projects.live": "In production",
    "projects.wip": "In development",
    "projects.and": "and",
    "projects.code": "Code",
    "projects.visit": "Visit",
    "projects.codeOf": "{name} {label}",
    "projects.visitOf": "{label} {name}",
    "link.newTab": "(opens in a new tab)",
    "projects.stat.apps": "apps in production",
    "projects.stat.years": "years of experience",
    "projects.stat.projects": "projects",
    "projects.origin.own": "Own project",
    "projects.origin.client": "Client work",
    "projects.origin.partner": "With a partner",
    "projects.origin.university": "University course project",
    "projects.sold": "Sold",
    "projects.support": "I handle support",

    "projects.pageDescription":
      "Mobile apps, desktop tools and services I built: what each one solved, and with what.",
    "projects.pageLead": "Every project, with the problem it solved, how it is built and where to see it.",
    "projects.all": "All projects",
    "projects.next": "Next project",
    "projects.prev": "Previous project",
    "projects.context": "Context",
    "projects.build": "What I built",
    "projects.decisions": "Technical decisions",
    "projects.result": "Outcome",

    "projects.travelpic.problem":
      "Photographers had no way to connect with nearby clients in real time.",
    "projects.travelpic.solution":
      "Flutter app with BLoC architecture, Stripe payments, Google Maps, and a serverless Firebase backend.",

    "projects.deporturnos.solution":
      "Real-time sports bookings on Firebase, with native chat and Mercado Pago payments.",
    "projects.deporturnos.shotAlt":
      "The DeporTurnos booking screen: a search for 8-a-side football pitches for tomorrow, showing two venues and their open time slots.",

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

    "contact.title": "Let’s work together",
    "contact.back": "Back to top",
    "curtain.home": "Home",

    "preloader.words": "BUILDING SOFTWARE THAT INNOVATES",
    "strip.credit": "Handmade in {city}",

    "footer.rights": "All rights reserved.",

    "meta.ogTagline": "Swift, Flutter & backend. {apps} apps in production.",

    "notFound.title": "Page not found",
    "notFound.text": "The page you’re looking for doesn’t exist or has moved.",
    "notFound.back": "Back to home",
  },
};
