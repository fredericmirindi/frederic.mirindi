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
            const isClickOnToggle = navToggle.contains(event.target);
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
        }, { threshold: 0.1 });
        fadeElements.forEach(el => {
             el.style.animationPlayState = 'paused';
             observer.observe(el);
        });
    } else {
        fadeElements.forEach(el => { if (el) { el.style.opacity = 1; } });
    }

    // --- Publication Filtering and Search Logic ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const keywordInput = document.getElementById('keyword-search');
    const publicationList = document.getElementById('publication-list');
    const publicationListItems = publicationList ? publicationList.querySelectorAll('li') : [];

    function filterAndSearchPublications() {
        // ... (Filtering logic remains the same as before) ...
         const activeFilterBtn = document.querySelector('.filter-btn.active');
         const selectedCategory = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
         const searchTerm = keywordInput ? keywordInput.value.toLowerCase() : '';

         publicationListItems.forEach(item => {
             const itemCategory = item.getAttribute('data-category') || 'all';
             const itemText = item.textContent.toLowerCase();
             const categoryMatch = (selectedCategory === 'all' || itemCategory === selectedCategory);
             const searchMatch = (searchTerm === '' || itemText.includes(searchTerm));
             if (categoryMatch && searchMatch) {
                 item.classList.remove('hidden');
             } else {
                 item.classList.add('hidden');
             }
         });
    }
    if (filterButtons.length > 0 && publicationListItems.length > 0) {
        filterButtons.forEach(button => { /* ... Event listener ... */
             button.addEventListener('click', function() {
                 filterButtons.forEach(btn => btn.classList.remove('active'));
                 this.classList.add('active');
                 filterAndSearchPublications();
             });
        });
    }
    if (keywordInput && publicationListItems.length > 0) {
        keywordInput.addEventListener('input', filterAndSearchPublications);
    }
    // --- End Publication Filtering Logic ---


    // --- Read More Button Logic IS REMOVED ---


    console.log("Frederic Mirindi website scripts updated and loaded.");

});
