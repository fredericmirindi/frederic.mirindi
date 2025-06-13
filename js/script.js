/* === Full Corrected script.js === */

document.addEventListener('DOMContentLoaded', function() {

    // --- Update copyright year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Mobile navigation toggle ---
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) { // Check if both elements were found
        navToggle.addEventListener('click', function() {
            const isExpanded = mainNav.classList.toggle('active'); // Toggles the class on the nav
            navToggle.setAttribute('aria-expanded', isExpanded);
            // Use innerHTML to ensure Font Awesome icons render correctly
            navToggle.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu if a link is clicked
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    // Ensure navToggle exists before trying to update it
                    if (navToggle) {
                         navToggle.setAttribute('aria-expanded', 'false');
                         navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });
        });

        // Close mobile menu if clicked outside
        document.addEventListener('click', function(event) {
            // Make sure mainNav exists before checking contains
            const isClickInsideNav = mainNav.contains(event.target);
            // Check if navToggle itself exists before checking contains
            const isClickOnToggle = navToggle && navToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
                 mainNav.classList.remove('active');
                 // Ensure navToggle exists before trying to update it
                 if (navToggle) {
                     navToggle.setAttribute('aria-expanded', 'false');
                     navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                 }
            }
        });
    } else {
         // Log an error if elements aren't found - check console!
         if (!navToggle) console.log("Note: Mobile nav toggle button (.mobile-nav-toggle) not found on this page."); // Use log instead of error for optional elements
         if (!mainNav) console.log("Note: Main nav element (.main-nav) not found on this page.");
    }

    // --- Fade-in animation on scroll ---
    const fadeElements = document.querySelectorAll('.fade-in');
    if ("IntersectionObserver" in window && fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                         // Check if target still exists before changing style
                         if(entry.target) {
                            entry.target.style.animationPlayState = 'running';
                         }
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
        // Fallback for older browsers or if no fade elements exist
        fadeElements.forEach(el => { if (el) { el.style.opacity = 1; } });
    }


    // --- Publication Filtering and Search Logic ---
    // Run this only if filter controls actually exist on the current page (i.e., research.html)
    const filterControls = document.querySelector('.filter-controls');
    if (filterControls) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const keywordInput = document.getElementById('keyword-search');
        const publicationList = document.getElementById('publication-list');
        const publicationListItems = publicationList ? publicationList.querySelectorAll('li') : [];

        function filterAndSearchPublications() {
            const activeFilterBtn = filterControls.querySelector('.filter-btn.active');
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
            filterButtons.forEach(button => {
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
    }
    // --- End Publication Filtering Logic ---

    // CV Access Passcode Functionality Removed
    // Theme Toggle Functionality Removed
    // D3 / Chart initialization logic should ideally be on the specific page (ai-ml.html / index.html) using it

    console.log("Frederic Mirindi website scripts loaded correctly.");

}); // End of DOMContentLoaded


function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}










i18next.init({
  lng: 'en', // default language
  debug: true,
  resources: {
    en: {
      translation: {
        heroTitle: "PhD Student in Economics & Econometrics"
      }
    },
    fr: {
      translation: {
        heroTitle: "Doctorant en économie et économétrie"
      }
    }
  }
}, function(err, t) {
  document.querySelector("#hero h2").textContent = t('heroTitle');
});



document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const darkModeClass = 'dark-mode';

  // Apply saved theme on load
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add(darkModeClass);
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }

  toggleBtn.addEventListener('click', function() {
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
});


