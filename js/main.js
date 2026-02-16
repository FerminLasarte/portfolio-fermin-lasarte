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