// ======= Mobile Navigation Toggle =======
document.addEventListener('DOMContentLoaded', function () {
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mainNav = document.getElementById('main-nav');

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', function () {
            mainNav.classList.toggle('nav-open');
            // Accessibility: toggle aria-expanded
            const expanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            mobileNavToggle.setAttribute('aria-expanded', String(!expanded));
        });
    }

    // ======= Light/Dark Theme Toggle =======
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const darkModeClass = 'dark-mode';

    if (themeToggle && themeIcon) {
        // Apply saved theme on load
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add(darkModeClass);
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle(darkModeClass);
            if (document.body.classList.contains(darkModeClass)) {
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                localStorage.setItem('theme', 'light');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        });
    }

    // ======= Set Current Year in Footer =======
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ======= Optional: Carousel Auto-Scroll =======
    const track = document.querySelector('.carousel-track');
    if (track) {
        let step = 1;
        let pos = 0;
        function scrollLoop() {
            pos += step;
            if (pos >= track.scrollWidth / 2) pos = 0;
            track.style.transform = `translateX(-${pos}px)`;
            requestAnimationFrame(scrollLoop);
        }
        scrollLoop();
    }
});
