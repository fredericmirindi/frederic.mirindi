document.addEventListener('DOMContentLoaded', function() {

    // --- Update copyright year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Mobile navigation toggle ---
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            const isExpanded = mainNav.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
            navToggle.textContent = isExpanded ? '✕' : '☰'; // Toggle icon
        });

        // Close mobile menu if a link is clicked
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.textContent = '☰';
                }
            });
        });

        // Close mobile menu if clicked outside (optional improvement)
        document.addEventListener('click', function(event) {
            const isClickInsideNav = mainNav.contains(event.target);
            const isClickOnToggle = navToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
                 mainNav.classList.remove('active');
                 navToggle.setAttribute('aria-expanded', 'false');
                 navToggle.textContent = '☰';
            }
        });
    }

    // --- Fade-in animation on scroll ---
    const fadeElements = document.querySelectorAll('.fade-in');

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running'; // Start animation
                     // Optional: Unobserve after animation starts to prevent re-triggering
                    // observer.unobserve(entry.target);
                }
                // Optional: Reset animation if element scrolls out of view
                // else {
                //    entry.target.style.animationPlayState = 'paused'; // Or remove class/reset opacity
                //}
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        fadeElements.forEach(el => {
             // Set initial state for elements observed later
             el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers: just make elements visible
        fadeElements.forEach(el => el.style.opacity = 1);
    }


    // --- Placeholder for future innovative features ---
    // Example: Publication filtering logic would go here
    // const filterButtons = document.querySelectorAll('.filter-buttons button');
    // const publications = document.querySelectorAll('.publication-list li');
    // if(filterButtons.length > 0) { ... add event listeners ... }

    console.log("Website scripts updated and loaded.");

});
