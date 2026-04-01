const translations = {
    es: {
        "nav.about":      "Sobre mí",
        "nav.experience": "Trayectoria",
        "nav.education":  "Educación",
        "nav.skills":     "Habilidades",
        "nav.projects":   "Proyectos",
        "nav.contact":    "Contacto",

        "hero.availability": "Disponible para nuevos desafíos",
        "hero.location":     "Tandil, Argentina",
        "hero.greeting":     "Hola, soy",
        "hero.role":         "iOS & Cross-Platform Mobile Engineer · Backend Developer",
        "hero.description":  "Estudiante avanzado de Ingeniería de Sistemas (UNICEN) con sólido enfoque en desarrollo móvil (Swift, Flutter) y backend. Experiencia creando soluciones end-to-end, desde la arquitectura del sistema hasta la publicación en tiendas. Mentalidad orientada al producto en entornos de alto crecimiento.",
        "hero.projectsBtn":  "Ver Proyectos",
        "hero.contactBtn":   "Contactame",
        "hero.cvBtn":        "CV",
        "hero.stat1":        "Apps en Producción",
        "hero.stat2":        "Años de Experiencia",
        "hero.stat3":        "Proyectos",

        "exp.sectionLabel":  "Experiencia",
        "exp.title":         "Trayectoria",
        "exp.job1.title":    "Desarrollador Mobile Freelance",
        "exp.job1.company":  "Creador de TravelPic | Argentina",
        "exp.job1.desc":     "Diseñé la arquitectura y desarrollé una plataforma estilo \"Uber para fotógrafos\" utilizando Flutter. Integré la pasarela de pagos Stripe, implementé mapas en tiempo real con rutas (Google Maps) y optimicé el rendimiento general para asegurar una alta disponibilidad en tiendas.",
        "exp.job2.title":    "Desarrollador Mobile Independiente",
        "exp.job2.company":  "Creador de DeporTurnos | Argentina",
        "exp.job2.desc":     "Desarrollé una plataforma para la gestión de reservas deportivas en tiempo real. Diseñé una arquitectura backend serverless con Firebase (Firestore, Cloud Messaging), integré pagos con Mercado Pago y desarrollé un chat nativo desde cero.",

        "edu.title":         "Educación",
        "edu.item1.title":   "Ingeniería de Sistemas",
        "edu.item1.company": "Universidad Nacional del Centro de la Provincia de Buenos Aires (UNICEN)",
        "edu.item1.desc":    "Formación sólida en algoritmos, diseño de compiladores, inteligencia artificial y arquitectura de software.",
        "edu.item2.title":   "Inglés B2 (Intermedio-Avanzado)",
        "edu.item2.period":  "Actualidad",
        "edu.item2.desc":    "Capacidad fluida para la lectura de documentación técnica, escritura de código y colaboración eficaz en equipos internacionales y multidisciplinarios.",

        "skills.title": "Mis Habilidades",
        "skills.db":    "Bases de Datos",
        "skills.tools": "Herramientas Base",

        "projects.title":    "Proyectos Destacados",
        "projects.live":     "En Producción",
        "projects.code":     "Código",
        "projects.download": "Descargar",
        "projects.visit":    "Visitar",
        "projects.soon":     "Próximamente",
        "projects.private":  "Repositorio Privado",
        "projects.problem":  "Problema",
        "projects.solution": "Solución Técnica",

        "projects.p1.problem":  "Los fotógrafos no tenían forma de conectar con clientes cercanos en tiempo real.",
        "projects.p1.solution": "App Flutter con arquitectura BLoC, Stripe SDK, Google Maps Platform y backend Firebase serverless.",

        "projects.p2.solution": "Arquitectura serverless Firebase Firestore para reservas en tiempo real, chat nativo con Streams y pagos con Mercado Pago SDK.",

        "projects.p3.title":    "Compilador de Java",
        "projects.p3.tag":      "Arquitectura",
        "projects.p3.solution": "Pipeline completo: análisis léxico (scanner), sintáctico (parser LL(1)) y generación de código MiniJava a bytecode.",

        "projects.p4.solution": "Pipeline NLU con Rasa: entrenamiento de modelos de intención, manejo de contexto conversacional y fallback handling.",

        "projects.p5.title":    "Juego iOS Nativo",
        "projects.p5.solution": "Juego multijugador en SwiftUI con patrón MVVM, sincronización online y generación procedural de partidas.",

        "projects.p6.title":    "Landing Page con IA",
        "projects.p6.solution": "Next.js App Router con integración OpenAI API para asistente conversacional y contenido dinámico. Desplegado en Vercel con Edge Functions.",

        "projects.p7.title":    "App de Turnos para Barberías",
        "projects.p7.solution": "App Flutter con reservas en tiempo real, notificaciones push locales y panel de control para el barbero con analytics de ocupación.",

        "projects.p8.title":    "ClubSystem — Sistema con IA",
        "projects.p8.problem":  "Los clubes deportivos carecen de herramientas modernas para gestionar socios, pagos y comunicación.",
        "projects.p8.solution": "Plataforma multi-tenant: Next.js + FastAPI + PostgreSQL con vector embeddings para búsqueda semántica, React Native para la app de socios.",

        "contact.title":   "Trabajemos juntos",
        "contact.phone":   "Teléfono",
        "contact.write":   "Escribir",
        "contact.msg":     "Mensaje",
        "contact.connect": "Conectá conmigo",
        "contact.profile": "Ver Perfil",

        "footer.rights": "Todos los derechos reservados."
    },
    en: {
        "nav.about":      "About",
        "nav.experience": "Experience",
        "nav.education":  "Education",
        "nav.skills":     "Skills",
        "nav.projects":   "Projects",
        "nav.contact":    "Contact",

        "hero.availability": "Available for new challenges",
        "hero.location":     "Tandil, Argentina",
        "hero.greeting":     "Hi, I'm",
        "hero.role":         "iOS & Cross-Platform Mobile Engineer · Backend Developer",
        "hero.description":  "Advanced Systems Engineering student (UNICEN) with a strong focus on mobile development (Swift, Flutter) and backend. Experience building end-to-end solutions, from system architecture to app store publishing. Product-oriented mindset in high-growth environments.",
        "hero.projectsBtn":  "View Projects",
        "hero.contactBtn":   "Contact me",
        "hero.cvBtn":        "CV",
        "hero.stat1":        "Apps in Production",
        "hero.stat2":        "Years of Experience",
        "hero.stat3":        "Projects",

        "exp.sectionLabel":  "Experience",
        "exp.title":         "Experience",
        "exp.job1.title":    "Freelance Mobile Developer",
        "exp.job1.company":  "Creator of TravelPic | Argentina",
        "exp.job1.desc":     "Designed the architecture and developed an \"Uber for photographers\" platform using Flutter. Integrated Stripe payment gateway, implemented real-time maps with routing (Google Maps), and optimized overall performance to ensure high availability in stores.",
        "exp.job2.title":    "Independent Mobile Developer",
        "exp.job2.company":  "Creator of DeporTurnos | Argentina",
        "exp.job2.desc":     "Developed a real-time sports reservation management platform. Designed a serverless backend architecture with Firebase (Firestore, Cloud Messaging), integrated Mercado Pago for payments, and built a native real-time chat from scratch.",

        "edu.title":         "Education",
        "edu.item1.title":   "Systems Engineering",
        "edu.item1.company": "National University of the Center of the Province of Buenos Aires (UNICEN)",
        "edu.item1.desc":    "Solid foundation in algorithms, compiler design, artificial intelligence, and software architecture.",
        "edu.item2.title":   "English B2 (Upper-Intermediate)",
        "edu.item2.period":  "Present",
        "edu.item2.desc":    "Fluent ability to read technical documentation, write code, and collaborate effectively in international and multidisciplinary teams.",

        "skills.title": "My Skills",
        "skills.db":    "Databases",
        "skills.tools": "Core Tools",

        "projects.title":    "Featured Projects",
        "projects.live":     "In Production",
        "projects.code":     "Code",
        "projects.download": "Download",
        "projects.visit":    "Visit",
        "projects.soon":     "Coming Soon",
        "projects.private":  "Private Repository",
        "projects.problem":  "Problem",
        "projects.solution": "Technical Solution",

        "projects.p1.problem":  "Photographers had no way to connect with nearby clients in real time.",
        "projects.p1.solution": "Flutter app with BLoC architecture, Stripe SDK, Google Maps Platform, and Firebase serverless backend.",

        "projects.p2.solution": "Serverless Firebase Firestore architecture for real-time bookings, native chat with Streams, and Mercado Pago SDK payments.",

        "projects.p3.title":    "Java Compiler",
        "projects.p3.tag":      "Architecture",
        "projects.p3.solution": "Full pipeline: lexical analysis (scanner), syntactic analysis (LL(1) parser), and MiniJava-to-bytecode code generation.",

        "projects.p4.solution": "NLU pipeline with Rasa: intent model training, conversational context management, and fallback handling.",

        "projects.p5.title":    "Native iOS Game",
        "projects.p5.solution": "Multiplayer SwiftUI game with MVVM state pattern, online synchronization, and procedural game generation.",

        "projects.p6.title":    "Landing Page with AI",
        "projects.p6.solution": "Next.js App Router with OpenAI API integration for conversational assistant and dynamic content. Deployed on Vercel with Edge Functions.",

        "projects.p7.title":    "Barbershop Booking App",
        "projects.p7.solution": "Flutter app with real-time bookings, local push notifications, and a barber control panel with occupancy analytics.",

        "projects.p8.title":    "ClubSystem — AI-Powered Sports Platform",
        "projects.p8.problem":  "Sports clubs lack modern tools to manage members, payments, and communication.",
        "projects.p8.solution": "Multi-tenant SaaS platform: Next.js + FastAPI + PostgreSQL with vector embeddings for semantic search, React Native for the member app.",

        "contact.title":   "Let's work together",
        "contact.phone":   "Phone",
        "contact.write":   "Email me",
        "contact.msg":     "Message",
        "contact.connect": "Connect with me",
        "contact.profile": "View Profile",

        "footer.rights": "All rights reserved."
    }
};
