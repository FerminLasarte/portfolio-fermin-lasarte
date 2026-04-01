document.addEventListener("DOMContentLoaded", () => {

    // ── 1. Intersection Observer (scroll animations) ──────────────────
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
                // Release GPU layer after animation completes
                setTimeout(() => { entry.target.style.willChange = 'auto'; }, 1000);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.08 });

    document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right, .animate-scale')
        .forEach(el => observer.observe(el));

    // ── 2. Dark Mode ──────────────────────────────────────────────────
    const themeBtn    = document.getElementById('theme-toggle');
    const metaTheme   = document.getElementById('meta-theme-color');

    function setTheme(dark) {
        document.body.classList.toggle('dark-mode', dark);
        if (metaTheme) metaTheme.setAttribute('content', dark ? '#0A0A0C' : '#F5F5F7');
    }

    // Honour saved preference; fall back to OS preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme === 'dark');
    } else {
        setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    themeBtn.addEventListener('click', () => {
        const dark = !document.body.classList.contains('dark-mode');
        setTheme(dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    });

    // ── 3. Language / i18n ───────────────────────────────────────────
    const langBtn    = document.getElementById('lang-toggle');
    let   currentLang = localStorage.getItem('language') || 'es';

    function applyTranslations(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang]?.[key]) el.textContent = translations[lang][key];
        });
        langBtn.textContent = lang === 'es' ? 'EN' : 'ES';
        document.documentElement.lang = lang;
    }

    applyTranslations(currentLang);

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('language', currentLang);
        applyTranslations(currentLang);
    });

    // ── 4. Dropdowns (CV + store download buttons) ───────────────────
    document.querySelectorAll('.dropdown-btn, #cv-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            const content = btn.nextElementSibling;
            // Close any other open dropdown first
            document.querySelectorAll('.dropdown-content').forEach(c => {
                if (c !== content) c.classList.remove('show');
            });
            content.classList.toggle('show');
        });
    });

    window.addEventListener('click', e => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-content').forEach(c => c.classList.remove('show'));
        }
    });

    // ── 5. Collapsible nav (touch devices) ───────────────────────────
    const navEl        = document.querySelector('nav');
    const isTouch      = () => !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    navEl.addEventListener('click', e => {
        if (!isTouch()) return;
        if (e.target.closest('.nav-links a')) {
            navEl.classList.remove('nav-expanded');
            return;
        }
        if (!e.target.closest('.dropdown-content')) {
            navEl.classList.toggle('nav-expanded');
        }
    });

    document.addEventListener('click', e => {
        if (isTouch() && !e.target.closest('nav')) navEl.classList.remove('nav-expanded');
    });

    // ── 6. Smooth scroll (with fixed-nav offset) ─────────────────────
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            navEl.classList.remove('nav-expanded');
            const offset = navEl.offsetHeight + 24;
            window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
        });
    });

    // ── 7. Active nav link (Intersection Observer) ───────────────────
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll('header[id], section[id]');

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
            }
        });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

    sections.forEach(s => sectionObserver.observe(s));

    // ── 8. Footer year ────────────────────────────────────────────────
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ── 9. Efecto Premium: Parallax 3D + Flotación orgánica en el Hero ──
const heroSection = document.querySelector('header#sobre-mi');
const floatBadges = document.querySelectorAll('.hero-badge-float');

// Solo ejecutamos esto si estamos en escritorio (en celular las ocultamos de todas formas)
if (heroSection && floatBadges.length > 0 && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let time = 0;

    // Capturamos el movimiento del mouse solo en la sección del Hero
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        // Convertimos la posición a valores entre -1 y 1
        targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        targetY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    });

    // Si el mouse sale del Hero, las etiquetas vuelven suavemente a su lugar
    heroSection.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });

    // Función de animación a 60fps
    function animateBadges() {
        time += 0.025; // Velocidad de la flotación natural
        
        // Lerp: Suaviza el movimiento hacia la posición del mouse
        mouseX += (targetX - mouseX) * 0.06;
        mouseY += (targetY - mouseY) * 0.06;

        floatBadges.forEach((badge, index) => {
            // Desactivamos la animación CSS para que no pelee con JS
            badge.style.animation = 'none';

            // Cada etiqueta tiene una profundidad distinta (efecto 3D)
            const depth = (index % 3 + 1.5) * -12; 
            
            // Flotación matemática (seno) para que sigan flotando solas
            const floatY = Math.sin(time + index * 2) * 6; 
            
            // Identificamos Python para mantener su centrado (-50%)
            const isPython = badge.classList.contains('hero-badge-float--5');
            const baseX = isPython ? '-50%' : '0px';

            // Calculamos la posición final combinando centro, mouse y flotación
            const tx = `calc(${baseX} + ${mouseX * depth}px)`;
            const ty = `${floatY + (mouseY * depth)}px`;
            
            badge.style.transform = `translate(${tx}, ${ty})`;
        });

        requestAnimationFrame(animateBadges);
    }
    
    animateBadges();
}

    // ── 10. Cursor Magnético Contextual ──
    // Solo creamos el cursor si el dispositivo usa mouse (no en touch)
    if (matchMedia('(pointer: fine)').matches) {
        const cursor = document.createElement('div');
        cursor.classList.add('premium-cursor');
        document.body.appendChild(cursor);

        // Movimiento suave del cursor
        document.addEventListener('mousemove', (e) => {
            // Usamos requestAnimationFrame implícito al actualizar el style directo para bajo lag
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        // Efecto magnético al pasar sobre enlaces o botones
        const interactives = document.querySelectorAll('a, button, .smart-mockup-container');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    }

    // ── 2. Smart Video Mockup (Play on Hover) ──
    const mockups = document.querySelectorAll('.smart-mockup-container');
    mockups.forEach(container => {
        const video = container.querySelector('video');
        if(video) {
            container.addEventListener('mouseenter', () => video.play());
            container.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0; // Reinicia el video al salir
            });
        }
    });

    // ── 3 y 4. Intersection Observer (Fade-Up y Terminal) ──
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    };

    const premiumObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Aplica el fade-up con blur
                entry.target.classList.add('is-visible');

                // Si el elemento revelado es la terminal, iniciamos el efecto de tipeo
                const terminalBody = entry.target.querySelector('.terminal-body');
                if (terminalBody && !terminalBody.dataset.typed) {
                    terminalBody.dataset.typed = 'true'; // Evita que se repita
                    typeWriterEffect(terminalBody);
                }

                // Opcional: deja de observar para que la animación ocurra solo 1 vez
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Seleccionamos todo lo que queremos animar al hacer scroll
    document.querySelectorAll('.premium-reveal').forEach(el => {
        premiumObserver.observe(el);
    });

    // ── Función de Tipeo para la Terminal ──
    function typeWriterEffect(element) {
        // Obtenemos el texto del atributo de datos
        const textToType = element.getAttribute('data-code');
        element.innerHTML = ''; // Limpiamos
        let i = 0;
        
        function type() {
            if (i < textToType.length) {
                // Manejamos saltos de línea
                if (textToType.charAt(i) === '\n') {
                    element.innerHTML += '<br>';
                } else {
                    element.innerHTML += textToType.charAt(i);
                }
                i++;
                // Añadimos el cursor titilante al final
                element.innerHTML = element.innerHTML.replace('<span class="terminal-cursor"></span>', '');
                element.innerHTML += '<span class="terminal-cursor"></span>';
                
                // Velocidad de tipeo irregular (más realista)
                const speed = Math.random() * 30 + 10; 
                setTimeout(type, speed);
            }
        }
        type();
    }

});
