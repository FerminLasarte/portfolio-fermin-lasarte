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
});
