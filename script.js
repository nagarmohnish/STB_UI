document.addEventListener('DOMContentLoaded', function () {

    // Hamburger Menu
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', function () {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Search Toggle
    const searchToggle = document.getElementById('searchToggle');
    const searchBox = document.getElementById('searchBox');
    if (searchToggle && searchBox) {
        searchToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            searchBox.classList.toggle('active');
            if (searchBox.classList.contains('active')) {
                searchBox.querySelector('input').focus();
            }
        });
        document.addEventListener('click', function (e) {
            if (!searchBox.contains(e.target) && e.target !== searchToggle) {
                searchBox.classList.remove('active');
            }
        });
    }

    // Sticky nav shadow
    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
        window.addEventListener('scroll', function () {
            mainNav.style.boxShadow = window.scrollY > 50
                ? '0 2px 15px rgba(0,0,0,0.4)'
                : 'none';
        });
    }

    // Scroll to Top
    const scrollTop = document.getElementById('scrollTop');
    if (scrollTop) {
        window.addEventListener('scroll', function () {
            scrollTop.classList.toggle('visible', window.scrollY > 400);
        });
        scrollTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Close mobile menu on resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 992) {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburgerBtn) hamburgerBtn.classList.remove('active');
        }
    });

    // Image error fallback - generate SVG placeholders
    document.querySelectorAll('img').forEach(function (img) {
        img.addEventListener('error', function () {
            const w = img.getAttribute('width') || 400;
            const h = img.getAttribute('height') || 250;
            const alt = img.alt || 'Image';
            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
                <rect fill="%231a1d24" width="${w}" height="${h}"/>
                <text fill="%2300bcd4" font-family="Arial,sans-serif" font-size="13" font-weight="600" text-anchor="middle" x="${w/2}" y="${h/2}" dy=".35em">${encodeURIComponent(alt)}</text>
            </svg>`;
            img.src = `data:image/svg+xml,${svg}`;
        });
    });
});
