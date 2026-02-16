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

    // 2. Lógica del Modo Oscuro
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Revisar si el usuario ya tenía el modo oscuro guardado
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleBtn.textContent = '☀️';
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Guardar preferencia y cambiar el icono
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggleBtn.textContent = '🌙';
        }
    });

    // 3. Lógica del Idioma (Base para que en el futuro la expandas)
    const langToggleBtn = document.getElementById('lang-toggle');
    langToggleBtn.addEventListener('click', () => {
        // Acá a futuro podés agregar la lógica para cambiar los textos
        // Por ahora solo alterna visualmente el texto del botón
        if (langToggleBtn.textContent === 'ES') {
            langToggleBtn.textContent = 'EN';
        } else {
            langToggleBtn.textContent = 'ES';
        }
    });

    // 4. Lógica del Botón Descargar CV
    const cvBtn = document.getElementById('cv-btn');
    const cvContent = document.getElementById('cv-content');

    if (cvBtn && cvContent) {
        cvBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que salte hacia arriba si es un <a>
            e.stopPropagation(); // Evita que el clic llegue al window
            cvContent.classList.toggle('show');
        });

        // Cerrar el menú si se hace clic afuera
        window.addEventListener('click', (event) => {
            if (!event.target.matches('#cv-btn') && !event.target.closest('#cv-btn')) {
                if (cvContent.classList.contains('show')) {
                    cvContent.classList.remove('show');
                }
            }
        });
    }

    // Actualizar año del footer automáticamente
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});