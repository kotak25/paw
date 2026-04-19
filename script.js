document.addEventListener('DOMContentLoaded', () => {

    /* ---- Mobile Navigation ---- */
    const burger = document.getElementById('burger');
    const nav = document.getElementById('mainNav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('open');
            nav.classList.toggle('open');
        });

        nav.querySelectorAll('a').forEach(link =>
            link.addEventListener('click', () => {
                burger.classList.remove('open');
                nav.classList.remove('open');
            })
        );

        document.addEventListener('click', (e) => {
            if (!burger.contains(e.target) && !nav.contains(e.target)) {
                burger.classList.remove('open');
                nav.classList.remove('open');
            }
        });
    }

    /* ---- Scroll Reveal Animation ---- */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.post, .pet-card, .hero-badge-float').forEach(el => {
        el.classList.add('pre-reveal');
        revealObserver.observe(el);
    });

    // Inject animation styles
    const animStyles = document.createElement('style');
    animStyles.textContent = `
        .pre-reveal { opacity: 0; transform: translateY(34px); transition: opacity .7s ease, transform .7s ease; }
        .revealed { opacity: 1 !important; transform: translateY(0) !important; }
    `;
    document.head.appendChild(animStyles);

    /* ---- Sticky Header Shadow + Auto-hide ---- */
    const header = document.getElementById('header');
    if (header) {
        let lastY = 0;
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            header.style.boxShadow = y > 30 ? '0 2px 20px rgba(14,145,140,.07)' : 'none';
            header.style.transform = y > 500 && y > lastY ? 'translateY(-100%)' : 'translateY(0)';
            header.style.transition = 'transform .35s ease, box-shadow .3s ease';
            lastY = y;
        }, { passive: true });
    }

    /* ---- Smooth scroll for anchor links ---- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});