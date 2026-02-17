document.addEventListener("DOMContentLoaded", () => {
    // Configuramos el observador
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // El elemento se anima cuando el 15% es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregamos la clase visible para disparar el CSS
                entry.target.classList.add('visible');
                // Dejamos de observar el elemento para que la animación se ejecute una sola vez
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Buscamos todos los elementos con la clase animate-on-scroll
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    
    elementsToAnimate.forEach((elem) => {
        observer.observe(elem);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // 1. Lógica del Intersection Observer (Animaciones al scroll)
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach((elem) => observer.observe(elem));

    // 2. Lógica del Modo Oscuro y Color del Navegador
    const themeToggleBtn = document.getElementById('theme-toggle');
    const metaThemeColor = document.getElementById('meta-theme-color');
    
    // Revisar si el usuario ya tenía el modo oscuro guardado al entrar
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        // Pintamos la barra del navegador de oscuro
        if (metaThemeColor) metaThemeColor.setAttribute('content', '#1e1e1e');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Guardar preferencia y cambiar color de la barra del navegador
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            if (metaThemeColor) metaThemeColor.setAttribute('content', '#1e1e1e');
        } else {
            localStorage.setItem('theme', 'light');
            if (metaThemeColor) metaThemeColor.setAttribute('content', '#ffffff');
        }
    });

    // 3. Lógica del Idioma (Traductor Funcional)
    const langToggleBtn = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('language') || 'es';

    function applyTranslations(lang) {
        // Busca todos los elementos que tengan el atributo data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            // Si la traducción existe en translations.js, la reemplaza
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        // Cambia el texto del botón al idioma contrario
        langToggleBtn.textContent = lang === 'es' ? 'EN' : 'ES';
        document.documentElement.lang = lang; // Le avisa al navegador en qué idioma está la web
    }

    // Aplicar el idioma al entrar a la página
    applyTranslations(currentLang);

    // Evento al hacer clic en el botón
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('language', currentLang); // Guarda la preferencia del usuario
        applyTranslations(currentLang);
    });

    // 4. Lógica de Menús Desplegables Generales (CV y Tiendas)
    const dropdownBtns = document.querySelectorAll('.dropdown-btn, #cv-btn');
    
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Busca el contenedor con las opciones que está justo abajo del botón en el HTML
            const dropdownContent = btn.nextElementSibling;
            
            // Cierra cualquier otro menú que esté abierto
            document.querySelectorAll('.dropdown-content').forEach(content => {
                if (content !== dropdownContent) {
                    content.classList.remove('show');
                }
            });
            
            // Abre o cierra este menú
            dropdownContent.classList.toggle('show');
        });
    });

    // Cierra cualquier menú si se hace clic afuera
    window.addEventListener('click', (event) => {
        if (!event.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.classList.remove('show');
            });
        }
    });

    // Actualizar año del footer automáticamente
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});