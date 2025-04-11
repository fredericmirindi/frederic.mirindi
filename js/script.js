/* === Full Updated script.js === */

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
            // Use innerHTML to ensure Font Awesome icons render correctly
            navToggle.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu if a link is clicked
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });

        // Close mobile menu if clicked outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = mainNav.contains(event.target);
            // Check if navToggle itself exists before checking contains
            const isClickOnToggle = navToggle && navToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
                 mainNav.classList.remove('active');
                 navToggle.setAttribute('aria-expanded', 'false');
                 navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // --- Fade-in animation on scroll ---
    const fadeElements = document.querySelectorAll('.fade-in');

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                         entry.target.style.animationPlayState = 'running';
                    });
                    // observer.unobserve(entry.target); // Optional: unobserve after first time
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        fadeElements.forEach(el => {
             el.style.animationPlayState = 'paused'; // Make sure animation doesn't run initially
             observer.observe(el);
        });
    } else {
        // Fallback for older browsers: just make elements visible
        fadeElements.forEach(el => { if (el) { el.style.opacity = 1; } });
    }


    // --- Publication Filtering and Search Logic ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const keywordInput = document.getElementById('keyword-search');
    // Ensure publication list exists before selecting items
    const publicationList = document.getElementById('publication-list');
    const publicationListItems = publicationList ? publicationList.querySelectorAll('li') : [];

    function filterAndSearchPublications() {
         const activeFilterBtn = document.querySelector('.filter-btn.active');
         // Ensure activeFilterBtn exists before trying to get attribute
         const selectedCategory = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
         const searchTerm = keywordInput ? keywordInput.value.toLowerCase() : '';

         publicationListItems.forEach(item => {
             const itemCategory = item.getAttribute('data-category') || 'all';
             // Example: Add year filtering if data-year attribute exists
             // const itemYear = item.getAttribute('data-year') || '';
             const itemText = item.textContent.toLowerCase();

             // Check category filter
             const categoryMatch = (selectedCategory === 'all' || itemCategory === selectedCategory);

             // Check search term
             const searchMatch = (searchTerm === '' || itemText.includes(searchTerm));

             // Show item only if both filters match
             if (categoryMatch && searchMatch) {
                 item.classList.remove('hidden'); // Or item.style.display = 'list-item';
             } else {
                 item.classList.add('hidden'); // Or item.style.display = 'none';
             }
         });
    }

    // Add event listeners only if the elements exist on the current page (research.html)
    if (filterButtons.length > 0 && publicationListItems.length > 0) {
        filterButtons.forEach(button => {
             button.addEventListener('click', function() {
                 filterButtons.forEach(btn => btn.classList.remove('active'));
                 this.classList.add('active');
                 filterAndSearchPublications();
             });
        });
    }
    if (keywordInput && publicationListItems.length > 0) {
        // Use 'input' for filtering as user types
        keywordInput.addEventListener('input', filterAndSearchPublications);
    }
    // --- End Publication Filtering Logic ---

    // === Light/Dark Mode Toggle Logic ===
    const themeToggle = document.getElementById('theme-toggle');
    // Function to set the theme
    function setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme); // Save preference
        // Update button icon and aria-label only if button exists
        if (themeToggle) {
             if (theme === 'dark') {
                 themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for dark mode
                 themeToggle.setAttribute('aria-label', 'Switch to light theme');
             } else {
                 themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for light mode
                 themeToggle.setAttribute('aria-label', 'Switch to dark theme');
             }
        }
    }

    // Apply theme on initial load
    const currentTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (currentTheme) { // If user preference is saved
        setTheme(currentTheme);
    } else if (prefersDark) { // If OS prefers dark and no user preference
        setTheme('dark');
    } else { // Default to light
         // Set default theme explicitly on body tag if not already set
         if (!document.body.hasAttribute('data-theme')) {
              document.body.setAttribute('data-theme', 'light');
         }
         // Ensure button reflects initial state if default is light
         if (themeToggle && document.body.getAttribute('data-theme') === 'light') {
             themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
             themeToggle.setAttribute('aria-label', 'Switch to dark theme');
         }
    }


    // Add click listener to the toggle button if it exists
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Directly check the attribute on body, as localStorage might not be updated instantly on other tabs
            const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
    // === END Light/Dark Mode Toggle Logic ===


    console.log("Frederic Mirindi website scripts updated and loaded.");

}); // End of DOMContentLoaded
