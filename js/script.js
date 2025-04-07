document.addEventListener('DOMContentLoaded', function() {

    // Update copyright year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Mobile navigation toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            const isExpanded = mainNav.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
            // Optional: Change button text/icon based on state
             if (isExpanded) {
                 navToggle.textContent = '✕'; // Close icon
             } else {
                 navToggle.textContent = '☰'; // Hamburger icon
             }
        });
    }

    // Optional: Close mobile menu if a link is clicked
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

    // Optional: Close mobile menu if clicked outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = mainNav.contains(event.target);
        const isClickOnToggle = navToggle.contains(event.target);

        if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
             mainNav.classList.remove('active');
             navToggle.setAttribute('aria-expanded', 'false');
             navToggle.textContent = '☰';
        }
    });


    // You can add more interactive features here later
    // e.g., filtering publications, fetching data dynamically, animations.
    console.log("Website scripts loaded.");

});
