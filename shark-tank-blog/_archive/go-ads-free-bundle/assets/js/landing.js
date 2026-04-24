/* ============================================
   GO ADS-FREE LANDING PAGE - INTERACTIVITY
   ============================================ */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        // 1. CTA buttons -> open payment popup (provided by go-ad-free.js)
        var ctaButtons = document.querySelectorAll('.js-open-payment');
        ctaButtons.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                if (typeof window.gafOpenPopup === 'function') {
                    window.gafOpenPopup();
                } else {
                    console.warn('gafOpenPopup not loaded — payment widget unavailable');
                }
            });
        });

        // 2. Smooth scroll from hero down arrow to value strip
        var scrollDown = document.querySelector('.js-scroll-down');
        if (scrollDown) {
            scrollDown.addEventListener('click', function () {
                var target = document.getElementById('valueStrip');
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // 3. Sticky CTA bar — show after scrolling past 60% of viewport height
        var stickyBar = document.getElementById('stickyBar');
        if (stickyBar) {
            var threshold = window.innerHeight * 0.6;
            var ticking = false;

            function updateSticky() {
                if (window.scrollY > threshold) {
                    stickyBar.classList.add('visible');
                } else {
                    stickyBar.classList.remove('visible');
                }
                ticking = false;
            }

            window.addEventListener('scroll', function () {
                if (!ticking) {
                    window.requestAnimationFrame(updateSticky);
                    ticking = true;
                }
            }, { passive: true });

            // Recalculate threshold on resize
            window.addEventListener('resize', function () {
                threshold = window.innerHeight * 0.6;
            });
        }
    });
})();
