/* --- FREDERIC MIRINDI - SCRIPT.JS --- */

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
        mainNav.querySelectorAll('a').forEach(link => {
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
                    // Use requestAnimationFrame to ensure style change happens after intersection
                    requestAnimationFrame(() => {
                         entry.target.style.animationPlayState = 'running';
                    });
                    // Optional: Unobserve after animation starts to prevent re-triggering
                    // observer.unobserve(entry.target);
                }
                // Optional: Reset animation if element scrolls out of view
                // else {
                //    entry.target.style.animationPlayState = 'paused';
                //}
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        fadeElements.forEach(el => {
             // Set initial state for elements observed later
             el.style.animationPlayState = 'paused'; // Make sure animation doesn't run initially
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers: just make elements visible
        fadeElements.forEach(el => {
             if (el) { el.style.opacity = 1; } // Make visible if IntersectionObserver isn't supported
        });
    }


    // === Publication Filtering and Search Logic ===
    const filterButtons = document.querySelectorAll('.filter-btn');
    const keywordInput = document.getElementById('keyword-search');
    // Ensure publication list exists before selecting items
    const publicationList = document.getElementById('publication-list');
    const publicationListItems = publicationList ? publicationList.querySelectorAll('li') : [];

    function filterAndSearchPublications() {
        const activeFilterBtn = document.querySelector('.filter-btn.active');
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

    // Add event listeners to filter buttons if they exist
    if (filterButtons.length > 0 && publicationListItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                // Apply filters
                filterAndSearchPublications();
            });
        });
    }

    // Add event listener to search input if it exists
    if (keywordInput && publicationListItems.length > 0) {
        // Use 'input' for filtering as user types
        keywordInput.addEventListener('input', filterAndSearchPublications);
    }
    // === END Publication Filtering and Search Logic ===


    console.log("Frederic Mirindi website scripts updated and loaded.");

});
