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
    
    // Función infalible para forzar al navegador a actualizar la barra superior
    function updateBrowserBarColor(colorHex) {
        let metaTheme = document.getElementById('meta-theme-color');
        if (metaTheme) {
            metaTheme.remove(); // La borramos
        }
        // La volvemos a crear con el color nuevo para forzar el refresco visual
        metaTheme = document.createElement('meta');
        metaTheme.id = 'meta-theme-color';
        metaTheme.name = 'theme-color';
        metaTheme.content = colorHex;
        document.head.appendChild(metaTheme);
    }

    // Revisar si el usuario ya tenía el modo oscuro guardado al entrar
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        updateBrowserBarColor('#1e1e1e');
    } else {
        updateBrowserBarColor('#ffffff');
    }

    // Evento al tocar el botón de la luna/sol
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            updateBrowserBarColor('#1e1e1e');
        } else {
            localStorage.setItem('theme', 'light');
            updateBrowserBarColor('#ffffff');
        }
    });

    // 3. Lógica del Idioma (Traductor Funcional)
    const langToggleBtn = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('language') || 'es';

    function applyTranslations(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        langToggleBtn.textContent = lang === 'es' ? 'EN' : 'ES';
        document.documentElement.lang = lang;
    }

    applyTranslations(currentLang);

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('language', currentLang);
        applyTranslations(currentLang);
    });

    // 4. Lógica de Menús Desplegables Generales (CV y Tiendas)
    const dropdownBtns = document.querySelectorAll('.dropdown-btn, #cv-btn');
    
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdownContent = btn.nextElementSibling;
            
            document.querySelectorAll('.dropdown-content').forEach(content => {
                if (content !== dropdownContent) {
                    content.classList.remove('show');
                }
            });
            
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

    // 5. Actualizar año del footer automáticamente
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});