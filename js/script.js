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




document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('current-year').textContent = new Date().getFullYear();
});
























document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Navigation Toggle Logic ---
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = mainNav ? mainNav.querySelectorAll('a') : []; // Ensure mainNav exists before querying links

    if (mobileNavToggle && mainNav) {
        // Function to close the menu
        function closeMenu() {
            mainNav.classList.remove('active');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            mobileNavToggle.querySelector('i').classList.remove('fa-xmark'); // Change icon back to bars
            mobileNavToggle.querySelector('i').classList.add('fa-bars');
        }

        // Function to open the menu
        function openMenu() {
            mainNav.classList.add('active');
            mobileNavToggle.setAttribute('aria-expanded', 'true');
            mobileNavToggle.querySelector('i').classList.remove('fa-bars'); // Change icon to 'x'
            mobileNavToggle.querySelector('i').classList.add('fa-xmark');
        }

        // Toggle function
        mobileNavToggle.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when a navigation link is clicked (for single-page sites with smooth scroll)
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Optional: Close menu if clicked outside
        document.addEventListener('click', function(event) {
            // Check if the click is outside the nav and outside the toggle button
            const isClickInsideNav = mainNav.contains(event.target);
            const isClickOnToggle = mobileNavToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
                closeMenu();
            }
        });

        // Optional: Close menu on window resize if it transitions to desktop view
        window.addEventListener('resize', function() {
            if (window.innerWidth > 900 && mainNav.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // --- Light/Dark Mode Toggle Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const darkModeClass = 'dark-mode';

    if (themeToggleBtn && themeIcon) {
        // Apply saved theme on load
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add(darkModeClass);
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }

        themeToggleBtn.addEventListener('click', function() {
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

    // --- Update Current Year in Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Map Initialization Logic ---
    const mapElement = document.getElementById('map-container');
    if (mapElement) {
        // Initialize map WITH scrollWheelZoom disabled
        const map = L.map('map-container', { scrollWheelZoom: false }).setView([25, 15], 2);

        // Add Tile Layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Define Locations (using categories for potential icon switching)
        const locations = [
            { lat: 49.8951, lng: -97.1384, name: "University of Manitoba", type: "Education (PhD)", city: "Winnipeg, Canada", category: 'education' },
            { lat: 51.2194, lng: 4.4025, name: "University of Antwerp", type: "Education (M.Sc.)", city: "Antwerp, Belgium", category: 'education' },
            { lat: -1.2921, lng: 36.8219, name: "AERC", type: "Education (Masters Bridge)", city: "Nairobi, Kenya", category: 'education' },
            { lat: -2.5044, lng: 28.8611, name: "Catholic University of Bukavu", type: "Education (B.Sc, M.Sc)", city: "Bukavu, DRC", category: 'education' },
            { lat: 45.5019, lng: -73.5674, name: "CEA Annual Meeting (UQAM)", type: "Conference (2025)", city: "Montreal, Canada", category: 'conference' },
            { lat: 52.3833, lng: -1.5609, name: "University of Warwick (CSWG)", type: "Seminar (2025)", city: "Warwick, UK", category: 'conference' },
            { lat: 51.7520, lng: -1.2577, name: "University of Oxford (ESHS)", type: "Seminar (2024)", city: "Oxford, UK", category: 'conference' },
            { lat: 51.6214, lng: -3.9436, name: "Human-Agent Interaction Conf. (HAI)", type: "Conference Workshop (2024)", city: "Swansea, UK", category: 'conference' },
            { lat: 23.3441, lng: 85.3096, name: "RAISD Conference (JRU)", type: "Conference (2025)", city: "Ranchi, India", category: 'conference' },
            { lat: 50.0880, lng: 14.4208, name: "CERGE-EI", type: "Research Experience", city: "Prague, Czech Republic", category: 'research'},
            { lat: 49.9350, lng: 11.5758, name: "University of Bayreuth (BIGSAS)", type: "Research Experience", city: "Bayreuth, Germany", category: 'research'}
        ];

        // Define custom icons
        const educationIcon = L.divIcon({ html: '<i class="fas fa-graduation-cap" style="color: #2c3e50;"></i>', className: 'map-fa-icon', iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -12] });
        const conferenceIcon = L.divIcon({ html: '<i class="fas fa-map-pin" style="color: #e74c3c;"></i>', className: 'map-fa-icon', iconSize: [24, 24], iconAnchor: [12, 24], popupAnchor: [0, -26] });
        const researchIcon = L.divIcon({ html: '<i class="fas fa-flask" style="color: #f39c12;"></i>', className: 'map-fa-icon', iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -12] });

        // Add Markers using custom icons
        locations.forEach(location => {
            let iconToUse;
            switch(location.category) {
                case 'education': iconToUse = educationIcon; break;
                case 'conference': iconToUse = conferenceIcon; break;
                case 'research': iconToUse = researchIcon; break;
                default: iconToUse = undefined;
            }

            L.marker([location.lat, location.lng], { icon: iconToUse })
                .addTo(map)
                .bindPopup(`<b>${location.name}</b><br>${location.type}<br><em>${location.city}</em>`);
        });
    }
});




document.addEventListener('DOMContentLoaded', function () {
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mainNav = document.getElementById('main-nav');

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', function () {
            mainNav.classList.toggle('nav-open');
            // Optionally update aria-expanded for accessibility
            const expanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            mobileNavToggle.setAttribute('aria-expanded', !expanded);
        });
    }
});
