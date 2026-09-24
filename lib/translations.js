// Reemplaza {clave} en un texto traducido: fill("Captura de {name}", { name: "TravelPic" }).
export const fill = (text, vars) => text.replace(/\{(\w+)\}/g, (m, k) => vars[k] ?? m);

export const translations = {
  es: {
    "meta.description":
      "Portfolio de {name}. {role} especializado en Swift, Flutter y backend. {apps} {appsLabel}.",

    "nav.about": "Sobre mí",
    "nav.experience": "Trayectoria",
    "nav.skills": "Habilidades",
    "nav.projects": "Trabajos",
    "nav.contact": "Contacto",
    "nav.themeToggle": "Tema oscuro",
    "nav.skip": "Saltar al contenido",
    "nav.sections": "Secciones",
    "nav.menu": "Menú",
    "nav.close": "Cerrar",
    "lang.es": "Español",
    "lang.en": "English",

    "hero.availability": "Disponible para nuevos desafíos",
    // Los datos de arriba del hero y la tarjeta del último trabajo (components/Hero.jsx).
    "hero.fact.avail": "Disponibilidad",
    "hero.fact.base": "Base",
    "hero.fact.now": "Ahora",
    "hero.fact.focus": "Enfoque",
    "hero.now": "Construyendo",
    "hero.latest": "Último trabajo",
    "hero.lead":
      "Ingeniero de Sistemas que hace apps móviles de punta a punta: arquitectura, backend y publicación en App Store y Google Play.",
    "hero.photoAlt": "Foto de Fermin",
    "hero.dragCursor": "Arrastrame",
    "exp.intro":
      "Ingeniero de Sistemas (UNICEN) con sólido enfoque en desarrollo móvil (Swift, Flutter) y backend. Experiencia creando soluciones de punta a punta, desde la arquitectura del sistema hasta la publicación en tiendas.",
    "hero.projectsBtn": "Ver trabajos",
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
    "exp.pageDescription": "La trayectoria de Fermin Lasarte: Bookit, chatbot-ai, DeporTurnos, TravelPic e Ingeniería de Sistemas en la UNICEN, con el detalle de cada etapa.",
    "page.back": "Volver al inicio",
    "page.home": "Inicio",
    "page.techs": "Tecnologías",
    "page.seeProject": "Ver el trabajo",
    "exp.title": "Trayectoria",
    "exp.bookit.short":
      "Una app de turnos para barberías y centros de estética, con dos socios, que arranca en Tandil.",
    "exp.bookit.title": "Cofundador: diseño y desarrollo",
    "exp.bookit.company": "Bookit",
    "exp.bookit.desc":
      "Con dos socios estamos haciendo Bookit, una app de turnos para barberías, peluquerías y centros de estética que arranca en Tandil. Me ocupo del diseño y de parte de las funcionalidades, en Flutter con Supabase, y también hice la landing con la lista de espera, en Next.js.",
    "exp.chatbot.short":
      "Un motor de chatbots con IA para pymes, con RAG y WhatsApp, para la agencia que formé con un empresario.",
    "exp.chatbot.title": "Socio y desarrollador",
    "exp.chatbot.company": "chatbot-ai",
    "exp.chatbot.desc":
      "Con un empresario formamos una agencia que vende chatbots con IA a pymes, y construí solo el producto: un motor multi-tenant en Python con FastAPI, RAG sobre PostgreSQL y pgvector, Claude como modelo y WhatsApp como canal. Está desplegado y sigo a cargo del soporte.",
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
    "skills.pageDescription": "Las tecnologías con las que trabaja Fermin Lasarte, su nivel en cada una y en qué trabajos las usó.",
    "skills.pageLead": "Las tecnologías con las que trabajo, qué tan bien las manejo y en qué trabajos de este sitio las usé.",
    "skills.usedIn": "Usada en",
    "skills.matrixTitle": "Dónde las usé",
    "skills.matrixLead": "Cada punto es un trabajo de este sitio.",
    "skills.tech": "Tecnología",
    "skills.yes": "Sí",
    "skills.no": "No",
    "skills.other": "También",

    "projects.title": "Trabajos",
    "projects.live": "En producción",
    "projects.wip": "En desarrollo",
    "projects.relaunch": "Por relanzar",
    "projects.and": "y",
    "projects.code": "Código",
    "projects.visit": "Visitar",
    // Nombre accesible de los botones que se repiten (R-M10): {label} es lo que se ve.
    "projects.codeOf": "{label} de {name}",
    "projects.visitOf": "{label} {name}",
    "link.newTab": "(abre en una pestaña nueva)",
    "projects.stat.apps": "apps en producción",
    "projects.stat.apps.one": "app en producción",
    "projects.stat.years": "años de experiencia",
    "projects.stat.projects": "trabajos",
    "projects.stat.venues": "complejos",
    "projects.stat.users": "usuarios",
    "projects.stat.bookings": "reservas",
    // De quién es cada proyecto (`origin`, `sold` y `support` en PROJECTS).
    "projects.origin.own": "Proyecto propio",
    "projects.origin.client": "Por encargo",
    "projects.origin.partners": "Con dos socios",
    "projects.origin.university": "Proyecto integral universitario",
    "projects.sold": "Vendido",
    "projects.support": "Soporte a mi cargo",

    // Página de Trabajos (/trabajos) y la de cada uno (/trabajos/<id>). Los títulos
    // de los bloques del detalle se muestran solo si el proyecto tiene ese texto
    // (`projects.<id>.context`, `.build`, `.decisions` y `.result`); los que no tienen
    // ninguno salen con el resumen y los enlaces (components/ProjectPage.jsx).
    "projects.pageDescription":
      "Apps móviles, herramientas de escritorio y servicios que construí: qué resolvía cada uno y con qué.",
    "projects.pageLead": "Cada trabajo, con el problema que resolvía, cómo está hecho y dónde verlo.",
    "projects.all": "Todos los trabajos",
    "projects.next": "Siguiente trabajo",
    "projects.screens": "Pantallas de {name}",
    "projects.prev": "Trabajo anterior",
    "projects.context": "Contexto",
    "projects.build": "Qué construí",
    "projects.decisions": "Decisiones técnicas",
    "projects.result": "Resultado",

    "projects.travelpic.problem":
      "Los fotógrafos no tenían forma de conectar con clientes cercanos en tiempo real.",
    "projects.travelpic.solution":
      "App Flutter con arquitectura BLoC, pagos con Stripe, Google Maps y backend serverless en Firebase.",
    "projects.travelpic.shotAlt":
      "La pantalla de inicio de TravelPic: la lista de fotógrafos cercanos, cada uno con su puntaje, a cuántos minutos está y desde qué precio.",
    "projects.travelpic.shotAlt.profile": "El perfil de un fotógrafo en TravelPic, con sus sesiones, su puntaje y una presentación.",
    "projects.travelpic.shotAlt.payments": "Los medios de pago de TravelPic: las tarjetas guardadas con Stripe y la que se usa por defecto.",
    "projects.travelpic.context":
      "Un emprendedor nos contrató a mi socio y a mí para construir TravelPic desde cero: una app para contratar a un fotógrafo en el momento, como quien pide un auto. La idea venía de algo simple: quien viaja o tiene un evento quiere buenas fotos, y encontrar a un fotógrafo cerca dependía del boca a boca o de buscar en redes y esperar respuesta.",
    "projects.travelpic.build":
      "Junto a mi socio hicimos la app para iOS y Android y su backend: una sola app con dos modos, uno para quien busca fotos y otro para el fotógrafo. El usuario ve en el mapa a los fotógrafos disponibles dentro de un radio, elige uno, reserva y paga con Stripe. El fotógrafo recibe el pedido, lo acepta y llega guiado por el mapa, mientras el usuario sigue su recorrido en tiempo real, como en una app de viajes. Los dos se hablan por un chat nativo, dentro de la app. Detrás, un backend serverless en Firebase guarda los perfiles, las reservas y las notificaciones.",
    "projects.travelpic.decisions":
      "Elegí Flutter para llegar a iOS y Android con un solo código: era un proyecto para un cliente, y el tiempo y el presupuesto contaban. Organicé la app con BLoC, que separa la lógica de la interfaz, para que el mapa, las reservas y los pagos pudieran crecer sin pisarse. La búsqueda por radio consulta solo a los fotógrafos cercanos, en lugar de traerlos a todos y filtrar en el teléfono. Lo más exigente fueron dos cosas: los pagos, con Stripe Connect, que divide cada cobro entre la plataforma y el fotógrafo; y el mapa en tiempo real, que muestra al fotógrafo acercándose sin gastar batería ni datos de más.",
    "projects.travelpic.result":
      "Entregué la app terminada y publicada en App Store y Google Play en 2025, y desde entonces sigo a cargo del soporte, aparte. El lanzamiento comercial todavía está por delante: hoy la app se está volviendo a publicar en las tiendas y, mientras tanto, la web es travelpicapp.com.",

    "projects.deporturnos.solution":
      "Reservas deportivas en tiempo real sobre Firebase, con chat nativo y pagos con Mercado Pago.",
    "projects.deporturnos.shotAlt":
      "La pantalla Reservar de DeporTurnos: una búsqueda de canchas de fútbol 8 para mañana, con dos complejos y sus horarios libres.",
    "projects.deporturnos.shotAlt.filters":
      "Los filtros de búsqueda de DeporTurnos: ordenar por cercanía o precio, el tipo de superficie, solo favoritos, confirmación inmediata y canchas techadas.",
    "projects.deporturnos.shotAlt.venue":
      "La ficha de un complejo en DeporTurnos: la foto de la cancha, sus servicios, cómo llegar en el mapa y los horarios de atención.",
    "projects.deporturnos.shotAlt.slots":
      "La reserva en un complejo de DeporTurnos: el deporte, el día, los horarios libres y las canchas disponibles, con su precio.",
    "projects.deporturnos.shotAlt.confirm":
      "La confirmación de una reserva en DeporTurnos: el turno, el valor de la seña a pagar y con quién se juega.",
    "projects.deporturnos.context":
      "En 2021, reservar una cancha seguía siendo llamar por teléfono o mandar un WhatsApp y esperar a que alguien contestara. Los complejos anotaban los turnos en un cuaderno o en una planilla, y el jugador no tenía cómo saber qué horarios quedaban libres sin preguntar. DeporTurnos nació para resolver las dos puntas: que reservar lleve segundos y que el complejo deje de vivir pendiente del teléfono.",
    "projects.deporturnos.build":
      "La idea fue mía y empecé solo; a los tres meses se sumó un socio, que después fue quien me compró el producto. Hice la app para iOS y Android y su backend. El jugador busca por deporte, día, horario y distancia, ve los complejos en una lista o en el mapa, y reserva y paga con Mercado Pago sin salir de la app. Recibe una notificación cuando se confirma el turno y puede hablar con el complejo por un chat en tiempo real. Del otro lado, cada complejo carga sus canchas y horarios y ve las reservas en el momento en que entran.",
    "projects.deporturnos.decisions":
      "Elegí Flutter para sostener iOS y Android con un solo código, cuando todavía estaba solo. El backend es serverless, sobre Firebase: Firestore mantiene la disponibilidad sincronizada en tiempo real y Cloud Messaging manda las notificaciones, sin servidores que mantener. Lo más delicado fue que dos jugadores no se quedaran con el mismo turno: cada reserva se confirma dentro de una transacción, que falla si alguien llegó antes. El chat lo hice desde cero sobre la misma base, en lugar de sumar un servicio externo, para no pagar por mensaje ni depender de otro proveedor.",
    "projects.deporturnos.result":
      "La app se publicó en App Store y Google Play y sigue en producción. En 2025 se la vendí a mi socio, que hoy la sigue llevando adelante. Fue mi primer producto de punta a punta: además de programarlo, tuve que publicarlo, cobrar y sostenerlo mientras otros lo usaban todos los días.",

    "projects.chatbot.title": "Chatbot con IA para pymes",
    "projects.chatbot.solution":
      "Cada cliente tiene su prompt y su base de conocimiento: RAG sobre PostgreSQL y pgvector, Claude como LLM, WhatsApp y widget web.",
    "projects.chatbot.context":
      "Un empresario me contrató para construir un chatbot con IA, tanto para su propia web como para venderlo a las pymes que lo necesitaran, y con él formé una agencia para eso. Casi todas las consultas que recibe un comercio se repiten (precios, horarios, turnos, dónde queda), y uno chico no tiene a nadie que las conteste a toda hora. El desafío era que un solo sistema sirviera a muchos negocios distintos, cada uno con su información y su forma de hablar.",
    "projects.chatbot.build":
      "El sistema completo, que hice solo: el motor en Python con FastAPI, el panel web en Next.js y la conexión con WhatsApp. Cada negocio es un cliente aparte, con su propio prompt, su ficha (qué vende, precios, horarios, cómo quiere que se hable) y su base de conocimiento, que se arma subiendo documentos. El bot responde con esa información y, cuando algo lo supera, deriva la conversación a una persona. El dueño puede tomar un chat en cualquier momento, incluso contestando desde su propio celular: el bot se da cuenta y se calla solo. El panel muestra las conversaciones, el consumo de cada cliente y las incidencias.",
    "projects.chatbot.decisions":
      "Es multi-tenant: un solo motor para todos, con una regla que no se rompe: toda búsqueda filtra por cliente, y un test lo verifica, para que la información de un negocio nunca aparezca en la respuesta de otro. Las respuestas salen de RAG: los documentos se cortan en fragmentos, se convierten en vectores con Voyage AI y se guardan en PostgreSQL con pgvector, y ante cada pregunta Claude responde con los fragmentos relevantes, no con lo que se imagina. Para elegir el modelo armé evaluaciones propias: una peluquería ficticia y 30 preguntas que miden precios, alucinaciones, memoria, temas fuera de alcance e intentos de manipular al bot. Ganó Claude Haiku 4.5, por calidad y costo. Los canales son adaptadores que solo traducen formatos, así sumar uno nuevo no toca el motor. Los mensajes de WhatsApp se verifican con firma y se procesan una sola vez aunque Meta los reenvíe, y los tokens de cada cliente se guardan cifrados. Lo construí trabajando con Claude Code: yo defino la arquitectura y reviso cada cambio, y el agente acelera la escritura del código y de los tests.",
    "projects.chatbot.result":
      "Está desplegado y funciona de punta a punta con WhatsApp, listo para sumar los primeros negocios. Terminé el desarrollo y sigo a cargo del soporte.",

    "projects.compiler.name": "Compilador",
    "projects.compiler.title": "Compilador en Java",
    "projects.compiler.solution":
      "Pipeline completo: análisis léxico, parser con Yacc, código intermedio y assembler x86 (MASM).",
    "projects.compiler.context":
      "Fue el trabajo integral de Diseño de Compiladores, en la UNICEN, en 2025: construir de cero un compilador para un lenguaje definido por la cátedra, desde el texto del programa hasta un ejecutable de Windows. Lo hicimos de a dos, a lo largo del cuatrimestre, en cuatro etapas. Se podía escribir en Python o en Java, y elegimos Java.",
    "projects.compiler.build":
      "El compilador completo, en Java: un analizador léxico hecho como autómata finito, con una acción semántica en cada transición; un parser generado con Yacc a partir de la gramática; la generación de código intermedio en tercetos; y la traducción a assembler x86, que MASM convierte en un .exe. El lenguaje tiene enteros sin signo y punto flotante, conversiones, inferencia de tipos, funciones con retornos múltiples, funciones lambda, ámbitos anidados, cadenas multilínea y ciclos do-while. El compilador reporta los errores léxicos, sintácticos y semánticos con la línea donde aparecen.",
    "projects.compiler.decisions":
      "El léxico es una matriz de transición de estados y otra de acciones semánticas, así agregar un token nuevo es tocar una tabla y no el código. Como código intermedio nos tocaron los tercetos: cada operación queda numerada y se puede referenciar, lo que simplifica los saltos de las estructuras de control y la generación del assembler. El código generado controla en tiempo de ejecución el overflow de sumas, restas y productos, y corta el programa con un mensaje en lugar de dar un resultado equivocado. Para probarlo armamos 66 programas de prueba: cada construcción del lenguaje con y sin errores, y cuatro casos integrales.",
    "projects.compiler.result":
      "El trabajo quedó aprobado. Fue el proyecto que más me enseñó sobre cómo funciona un lenguaje por dentro: después de escribir un compilador, un error de Swift o de Dart se lee de otra manera.",

    "projects.vault.title": "Vault: finanzas personales",
    "projects.vault.solution":
      "App de escritorio local-first en Tauri, React y TypeScript. Los datos quedan en SQLite, en el dispositivo, sin servidor ni cuentas.",
    "projects.vault.shotAlt":
      "La pantalla de estadísticas de Vault: el balance, los ingresos y los gastos del período, un gráfico de gastos por categoría y otro de ingresos contra gastos por mes.",
    "projects.vault.shotAlt.transactions":
      "El historial de transacciones de Vault, con filtros por moneda, categoría, etiqueta, fecha y monto.",
    "projects.vault.shotAlt.savings":
      "Los objetivos de ahorro de Vault, cada uno con lo que falta, el ritmo por mes y la fecha en que se llegaría.",
    "projects.vault.context":
      "Llevar las finanzas personales en Argentina es llevar dos monedas a la vez: se cobra en pesos, se ahorra en dólares, se paga en cuotas, y el dólar tiene cinco precios distintos. Las apps que probé no lo resolvían, o pedían subir cada movimiento a un servidor ajeno. Vault nació como una herramienta para mí: una app de escritorio donde los datos quedan en la computadora y nadie más los ve.",
    "projects.vault.build":
      "Una app de escritorio para macOS y Windows, que hice solo, de punta a punta. Registra cuentas y movimientos en pesos y en dólares, con la cotización del día (MEP, blue, oficial, tarjeta o cripto) o una cargada a mano. Suma presupuestos por categoría, reglas que categorizan solas, gastos recurrentes, compras en cuotas, préstamos, metas de ahorro y un cierre mensual que se puede imprimir. Importa movimientos desde un CSV del banco, guarda comprobantes adjuntos y muestra estadísticas de ingresos y gastos.",
    "projects.vault.decisions":
      "Elegí Tauri en lugar de Electron: el núcleo es Rust y usa la vista web del sistema, así el instalador pesa entre 4 y 10 MB y la app arranca rápido. La interfaz es React con TypeScript, y los datos viven en SQLite, en un archivo en la computadora, con migraciones versionadas para que cada actualización respete lo que ya había. La app solo sale a internet para buscar la cotización y las actualizaciones: la política de seguridad de la propia app bloquea cualquier otra conexión. Cada versión pasa por tests, lint y los chequeos de Rust antes de publicarse, y las actualizaciones llegan firmadas: una copia instalada rechaza cualquier paquete que no esté firmado por mí. La hice trabajando con Claude Code, un agente de IA: yo defino la arquitectura y reviso cada cambio, y el agente acelera la escritura del código y de los tests.",
    "projects.vault.result":
      "Está publicada: ocho versiones en tres semanas, con instaladores para macOS y Windows que se actualizan solos. Es gratis, con donaciones opcionales por Mercado Pago. La uso todos los días para mis propias cuentas.",

    "projects.bookit.title": "Bookit: turnos para centros de estética",
    "projects.bookit.solution":
      "Reservas de turnos para barberías, peluquerías y centros de estética, en Flutter con Supabase. La lista de espera ya está online.",
    "projects.bookit.shotAlt":
      "La pantalla de inicio de Bookit: los rubros para buscar y los locales cercanos de Tandil, con su distancia y desde qué precio.",
    "projects.bookit.shotAlt.booking":
      "La elección del horario en Bookit: los días de la semana y los horarios libres de la mañana y de la tarde para un corte y barba.",
    "projects.bookit.shotAlt.agenda":
      "La agenda de un local en Bookit: los turnos confirmados del día y los huecos libres, con la opción de publicarlos.",
    "projects.bookit.context":
      "En Tandil, sacar un turno en una barbería o una peluquería sigue siendo mandar un WhatsApp y esperar a que alguien conteste entre cliente y cliente. Del otro lado, los locales llevan la agenda como pueden, pierden turnos por ausencias y no tienen cómo llegar a gente nueva. Bookit junta las dos puntas en una sola app, y arranca por Tandil para después ir ciudad por ciudad.",
    "projects.bookit.build":
      "Somos tres socios y estamos haciendo la app, en Flutter para iOS y Android, con dos lados. Quien saca turnos encuentra los locales de la ciudad con sus servicios, precios y horarios reales, elige un hueco y confirma sin esperar respuesta. Recibe recordatorios, cancela o reprograma desde la app y suma Puntos Bookit por cada turno, además de un programa de referidos. El local tiene una agenda digital que se actualiza sola, la ficha de cada cliente, su propio link para Instagram y la opción de cobrar por Mercado Pago. También hice la landing con la lista de espera, en Next.js, con Supabase y un mail de bienvenida por Resend.",
    "projects.bookit.decisions":
      "Flutter, por lo mismo que en mis otras apps: iOS y Android con un solo código. El backend es Supabase, que da Postgres y autenticación, con reglas de acceso por fila, para que cada local vea solo su agenda y sus clientes, y actualizaciones en tiempo real, para que dos personas no tomen el mismo hueco. Los puntos y los referidos se calculan en el servidor, para que nadie pueda sumarse puntos desde la app. En la landing, el formulario se valida con Zod, los pedidos por visitante tienen un límite y la lista de espera se guarda en la misma base. Lo construimos trabajando con Claude Code: definimos la arquitectura y revisamos cada cambio, y el agente acelera la escritura del código y de los tests.",
    "projects.bookit.result":
      "Todavía no lanzó: la lista de espera está abierta en somosbookit.com.ar, con 500 puntos de regalo para quien se anota y precio fundador de por vida para los primeros locales. Arranca por Tandil.",

    "contact.title": "Trabajemos juntos",
    "contact.back": "Volver al inicio",
    "curtain.home": "Inicio",

    "preloader.label": "Hago apps",
    "strip.credit": "Hecho a mano en {city}",

    "footer.rights": "Todos los derechos reservados.",

    "meta.ogTagline": "Swift, Flutter y backend. {apps} {appsLabel}.",

    "notFound.title": "Página no encontrada",
    "notFound.text": "La página que buscás no existe o cambió de dirección.",
    "notFound.back": "Volver al inicio",
  },
  en: {
    "meta.description":
      "Portfolio of {name}. {role} specializing in Swift, Flutter, and backend development. {apps} {appsLabel}.",

    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.projects": "Work",
    "nav.contact": "Contact",
    "nav.themeToggle": "Dark theme",
    "nav.skip": "Skip to content",
    "nav.sections": "Sections",
    "nav.menu": "Menu",
    "nav.close": "Close",
    "lang.es": "Español",
    "lang.en": "English",

    "hero.availability": "Available for new challenges",
    "hero.fact.avail": "Availability",
    "hero.fact.base": "Based in",
    "hero.fact.now": "Now",
    "hero.fact.focus": "Focus",
    "hero.now": "Building",
    "hero.latest": "Latest work",
    "hero.lead":
      "Systems Engineer who builds mobile apps end to end: architecture, backend, and release on the App Store and Google Play.",
    "hero.photoAlt": "Photo of Fermin",
    "hero.dragCursor": "Drag me",
    "exp.intro":
      "Systems Engineer (UNICEN) with a strong focus on mobile development (Swift, Flutter) and backend. Experience building end-to-end solutions, from system architecture to app store publishing.",
    "hero.projectsBtn": "View work",
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
    "exp.pageDescription": "Fermin Lasarte’s experience: Bookit, chatbot-ai, DeporTurnos, TravelPic and Systems Engineering at UNICEN, with the details of each stage.",
    "page.back": "Back to home",
    "page.home": "Home",
    "page.techs": "Technologies",
    "page.seeProject": "See the project",
    "exp.title": "Experience",
    "exp.bookit.short":
      "A booking app for barbershops and beauty salons, with two partners, launching in Tandil.",
    "exp.bookit.title": "Co-founder: design and development",
    "exp.bookit.company": "Bookit",
    "exp.bookit.desc":
      "With two partners I’m building Bookit, a booking app for barbershops, hair salons and beauty studios that launches in Tandil. I handle the design and part of the features, in Flutter with Supabase, and I also built the landing page with the waitlist, in Next.js.",
    "exp.chatbot.short":
      "An AI chatbot engine for small businesses, with RAG and WhatsApp, for the agency I started with a businessman.",
    "exp.chatbot.title": "Partner and developer",
    "exp.chatbot.company": "chatbot-ai",
    "exp.chatbot.desc":
      "A businessman and I started an agency that sells AI chatbots to small businesses, and I built the product on my own: a multi-tenant engine in Python with FastAPI, RAG over PostgreSQL and pgvector, Claude as the model and WhatsApp as the channel. It’s deployed and I still handle its support.",
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

    "projects.title": "Work",
    "projects.live": "In production",
    "projects.wip": "In development",
    "projects.relaunch": "Relaunch pending",
    "projects.and": "and",
    "projects.code": "Code",
    "projects.visit": "Visit",
    "projects.codeOf": "{name} {label}",
    "projects.visitOf": "{label} {name}",
    "link.newTab": "(opens in a new tab)",
    "projects.stat.apps": "apps in production",
    "projects.stat.apps.one": "app in production",
    "projects.stat.years": "years of experience",
    "projects.stat.projects": "projects",
    "projects.stat.venues": "venues",
    "projects.stat.users": "users",
    "projects.stat.bookings": "bookings",
    "projects.origin.own": "Own project",
    "projects.origin.client": "Client work",
    "projects.origin.partners": "With two partners",
    "projects.origin.university": "University course project",
    "projects.sold": "Sold",
    "projects.support": "I handle support",

    "projects.pageDescription":
      "Mobile apps, desktop tools and services I built: what each one solved, and with what.",
    "projects.pageLead": "Every project, with the problem it solved, how it is built and where to see it.",
    "projects.all": "All work",
    "projects.next": "Next project",
    "projects.screens": "{name} screens",
    "projects.prev": "Previous project",
    "projects.context": "Context",
    "projects.build": "What I built",
    "projects.decisions": "Technical decisions",
    "projects.result": "Outcome",

    "projects.travelpic.problem":
      "Photographers had no way to connect with nearby clients in real time.",
    "projects.travelpic.solution":
      "Flutter app with BLoC architecture, Stripe payments, Google Maps, and a serverless Firebase backend.",
    "projects.travelpic.shotAlt":
      "The TravelPic home screen: a list of nearby photographers, each with their rating, how many minutes away they are and their starting price.",
    "projects.travelpic.shotAlt.profile": "A photographer’s profile in TravelPic, with their sessions, rating and a short bio.",
    "projects.travelpic.shotAlt.payments": "TravelPic payment methods: the cards saved with Stripe and the default one.",
    "projects.travelpic.context":
      "An entrepreneur hired my partner and me to build TravelPic from scratch: an app to hire a photographer on the spot, the way you’d hail a ride. The idea came from something simple: people who travel or have an event want good photos, and finding a photographer nearby meant word of mouth, or searching social media and waiting for a reply.",
    "projects.travelpic.build":
      "Together with my partner, I built the iOS and Android app and its backend: a single app with two modes, one for people looking for photos and one for photographers. Users see the available photographers within a radius on the map, pick one, and book and pay with Stripe. The photographer gets the request, accepts it and is guided there by the map, while the user follows their route in real time, like in a ride-hailing app. The two talk through a native chat inside the app. Behind it, a serverless Firebase backend stores profiles, bookings and notifications.",
    "projects.travelpic.decisions":
      "I chose Flutter to reach iOS and Android with a single codebase: it was a client project, and time and budget mattered. I structured the app with BLoC, which separates logic from UI, so the map, bookings and payments could grow without stepping on each other. The radius search only queries nearby photographers instead of fetching all of them and filtering on the phone. The hardest parts were two: payments, with Stripe Connect splitting each charge between the platform and the photographer; and the real-time map, which shows the photographer approaching without draining battery or data.",
    "projects.travelpic.result":
      "I delivered the finished app, published on the App Store and Google Play, in 2025, and I still handle its support separately. The commercial launch is still ahead: the app is currently being republished on the stores, and in the meantime the website is travelpicapp.com.",

    "projects.deporturnos.solution":
      "Real-time sports bookings on Firebase, with native chat and Mercado Pago payments.",
    "projects.deporturnos.shotAlt":
      "The DeporTurnos booking screen: a search for 8-a-side football pitches for tomorrow, showing two venues and their open time slots.",
    "projects.deporturnos.shotAlt.filters":
      "The DeporTurnos search filters: sort by distance or price, surface type, favorites only, instant confirmation and covered courts.",
    "projects.deporturnos.shotAlt.venue":
      "A venue page in DeporTurnos: a photo of the pitch, its amenities, directions on the map and opening hours.",
    "projects.deporturnos.shotAlt.slots":
      "Booking at a venue in DeporTurnos: the sport, the day, the open time slots and the available courts, with their price.",
    "projects.deporturnos.shotAlt.confirm":
      "Confirming a booking in DeporTurnos: the slot, the deposit to pay and who you are playing with.",
    "projects.deporturnos.context":
      "In 2021, booking a court still meant calling or sending a WhatsApp message and waiting for someone to answer. Venues kept their bookings in a notebook or a spreadsheet, and players had no way of knowing which slots were free without asking. DeporTurnos was built to fix both ends: booking should take seconds, and venues should stop living by the phone.",
    "projects.deporturnos.build":
      "The idea was mine and I started on my own; three months in, a partner joined, the same partner who later bought the product from me. I built the iOS and Android app and its backend. Players search by sport, day, time and distance, see venues in a list or on a map, and book and pay with Mercado Pago without leaving the app. They get a notification when a booking is confirmed and can talk to the venue through a real-time chat. On the other side, each venue sets up its courts and hours and sees bookings the moment they come in.",
    "projects.deporturnos.decisions":
      "I chose Flutter to support iOS and Android with a single codebase while I was still working alone. The backend is serverless, on Firebase: Firestore keeps availability in sync in real time and Cloud Messaging sends the notifications, with no servers to maintain. The trickiest part was making sure two players could never get the same slot: every booking is confirmed inside a transaction that fails if someone got there first. I built the chat from scratch on the same database instead of adding an external service, so there was no per-message cost and no other provider to depend on.",
    "projects.deporturnos.result":
      "The app shipped on the App Store and Google Play and is still live. In 2025 I sold it to my partner, who still runs it today. It was my first end-to-end product: beyond writing the code, I had to ship it, charge for it and keep it running while other people used it every day.",

    "projects.chatbot.title": "AI chatbot for small businesses",
    "projects.chatbot.solution":
      "Each client gets its own prompt and knowledge base: RAG over PostgreSQL and pgvector, Claude as the LLM, WhatsApp, and a web widget.",
    "projects.chatbot.context":
      "A businessman hired me to build an AI chatbot, both for his own website and to sell to the small businesses that needed one, and together we started an agency for it. Almost every question a shop gets is a repeat (prices, opening hours, appointments, where it is), and a small one has nobody to answer them around the clock. The challenge was making a single system serve many different businesses, each with its own information and its own way of talking.",
    "projects.chatbot.build":
      "The whole system, which I built on my own: the engine in Python with FastAPI, the web dashboard in Next.js and the WhatsApp integration. Each business is a separate client, with its own prompt, its own profile (what it sells, prices, hours, how it wants to sound) and its own knowledge base, built by uploading documents. The bot answers with that information and, when something is beyond it, hands the conversation to a person. The owner can take over a chat at any moment, even by replying from their own phone: the bot notices and goes quiet on its own. The dashboard shows the conversations, each client’s usage and the incidents.",
    "projects.chatbot.decisions":
      "It’s multi-tenant: one engine for everyone, with one rule that never breaks: every search filters by client, and a test checks it, so one business’s information never shows up in another’s answer. Answers come from RAG: documents are split into chunks, turned into vectors with Voyage AI and stored in PostgreSQL with pgvector, and for every question Claude answers from the relevant chunks, not from what it imagines. To choose the model I built my own evaluations: a fictional hair salon and 30 questions that test prices, hallucinations, memory, out-of-scope topics and attempts to manipulate the bot. Claude Haiku 4.5 won, on quality and cost. Channels are adapters that only translate formats, so adding a new one doesn’t touch the engine. WhatsApp messages are verified by signature and processed exactly once even if Meta resends them, and each client’s tokens are stored encrypted. I built it working with Claude Code: I define the architecture and review every change, and the agent speeds up writing the code and the tests.",
    "projects.chatbot.result":
      "It’s deployed and works end to end with WhatsApp, ready to take on its first businesses. Development is complete and I still handle its support.",

    "projects.compiler.name": "Compiler",
    "projects.compiler.title": "Compiler built in Java",
    "projects.compiler.solution":
      "Full pipeline: lexical analysis, Yacc parser, intermediate code, and x86 assembly (MASM).",
    "projects.compiler.context":
      "It was the integrative assignment for the Compiler Design course at UNICEN, in 2025: building from scratch a compiler for a language defined by the course, from the program’s source text to a Windows executable. We did it as a pair, over the semester, in four stages. It could be written in Python or Java, and we chose Java.",
    "projects.compiler.build":
      "The whole compiler, in Java: a lexer built as a finite automaton, with a semantic action on every transition; a parser generated with Yacc from the grammar; intermediate code generation as triples; and translation to x86 assembly, which MASM turns into an .exe. The language has unsigned integers and floating point, conversions, type inference, functions with multiple return values, lambda functions, nested scopes, multiline strings and do-while loops. The compiler reports lexical, syntax and semantic errors with the line where they occur.",
    "projects.compiler.decisions":
      "The lexer is a state transition matrix plus a matrix of semantic actions, so adding a new token means editing a table, not the code. For intermediate code we were assigned triples: every operation is numbered and can be referenced, which simplifies the jumps in control structures and the assembly generation. The generated code checks for overflow in additions, subtractions and multiplications at runtime, and stops the program with a message instead of giving a wrong result. To test it we wrote 66 test programs: every language construct with and without errors, plus four end-to-end cases.",
    "projects.compiler.result":
      "The assignment was approved. It’s the project that taught me the most about how a language works on the inside: after writing a compiler, a Swift or Dart error reads differently.",

    "projects.vault.title": "Vault: personal finance",
    "projects.vault.solution":
      "Local-first desktop app built with Tauri, React, and TypeScript. Data stays in SQLite on the device, with no server and no accounts.",
    "projects.vault.shotAlt":
      "The Vault statistics screen: the period’s balance, income and expenses, a chart of spending by category and another of monthly income against expenses.",
    "projects.vault.shotAlt.transactions":
      "Vault’s transaction history, with filters by currency, category, tag, date and amount.",
    "projects.vault.shotAlt.savings":
      "Vault’s savings goals, each with what’s left, the monthly pace and the date it would be reached.",
    "projects.vault.context":
      "Managing personal finances in Argentina means handling two currencies at once: you get paid in pesos, save in dollars, pay in installments, and the dollar has five different prices. The apps I tried didn’t handle it, or asked me to upload every transaction to someone else’s server. Vault started as a tool for myself: a desktop app where the data stays on the computer and nobody else sees it.",
    "projects.vault.build":
      "A desktop app for macOS and Windows that I built on my own, end to end. It tracks accounts and transactions in pesos and dollars, with the day’s exchange rate (MEP, blue, official, card or crypto) or one entered by hand. It adds budgets by category, rules that categorize on their own, recurring expenses, installment purchases, loans, savings goals and a printable monthly close. It imports transactions from a bank CSV, stores attached receipts and shows income and expense statistics.",
    "projects.vault.decisions":
      "I chose Tauri over Electron: the core is Rust and it uses the system’s web view, so the installer weighs between 4 and 10 MB and the app starts fast. The interface is React with TypeScript, and the data lives in SQLite, in a file on the computer, with versioned migrations so every update respects what was already there. The app only goes online to fetch the exchange rate and updates: the app’s own security policy blocks any other connection. Every version goes through tests, lint and Rust checks before it ships, and updates arrive signed: an installed copy rejects any package I didn’t sign. I built it working with Claude Code, an AI agent: I define the architecture and review every change, and the agent speeds up writing the code and the tests.",
    "projects.vault.result":
      "It’s released: eight versions in three weeks, with installers for macOS and Windows that update themselves. It’s free, with optional donations through Mercado Pago. I use it every day for my own finances.",

    "projects.bookit.title": "Bookit: beauty salon bookings",
    "projects.bookit.solution":
      "Booking app for barbershops, hair salons, and beauty studios, built in Flutter with Supabase. The waitlist is already live.",
    "projects.bookit.shotAlt":
      "The Bookit home screen: the categories to search and the nearby venues in Tandil, with their distance and starting price.",
    "projects.bookit.shotAlt.booking":
      "Picking a time in Bookit: the days of the week and the open morning and afternoon slots for a haircut and beard trim.",
    "projects.bookit.shotAlt.agenda":
      "A venue’s agenda in Bookit: the day’s confirmed appointments and the free slots, with the option to publish them.",
    "projects.bookit.context":
      "In Tandil, booking a barber or a hair salon still means sending a WhatsApp message and waiting for someone to answer between clients. On the other side, venues keep their agenda however they can, lose appointments to no-shows and have no way to reach new people. Bookit brings both ends together in one app, starting in Tandil and then going city by city.",
    "projects.bookit.build":
      "We’re three partners building the app, in Flutter for iOS and Android, with two sides. People booking find the city’s venues with their real services, prices and hours, pick a slot and confirm without waiting for a reply. They get reminders, cancel or reschedule from the app and earn Bookit Points for every booking, plus a referral program. Venues get a digital agenda that updates itself, a record for each client, their own link for Instagram and the option to charge through Mercado Pago. I also built the landing page with the waitlist, in Next.js, with Supabase and a welcome email through Resend.",
    "projects.bookit.decisions":
      "Flutter, for the same reason as in my other apps: iOS and Android with a single codebase. The backend is Supabase, which provides Postgres and authentication, with row-level access rules so each venue only sees its own agenda and clients, and real-time updates so two people can’t take the same slot. Points and referrals are calculated on the server, so nobody can award themselves points from the app. On the landing page, the form is validated with Zod, requests per visitor are rate-limited and the waitlist is stored in the same database. We build it working with Claude Code: we define the architecture and review every change, and the agent speeds up writing the code and the tests.",
    "projects.bookit.result":
      "It hasn’t launched yet: the waitlist is open at somosbookit.com.ar, with 500 points as a gift for signing up and a lifetime founder price for the first venues. It starts in Tandil.",

    "contact.title": "Let’s work together",
    "contact.back": "Back to top",
    "curtain.home": "Home",

    "preloader.label": "I build apps",
    "strip.credit": "Handmade in {city}",

    "footer.rights": "All rights reserved.",

    "meta.ogTagline": "Swift, Flutter & backend. {apps} {appsLabel}.",

    "notFound.title": "Page not found",
    "notFound.text": "The page you’re looking for doesn’t exist or has moved.",
    "notFound.back": "Back to home",
  },
};
