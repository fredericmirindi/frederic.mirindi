/* === Full Updated script.js (Reverted - No Theme Toggle) === */

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


    // === Light/Dark Mode Toggle Logic is REMOVED from this version ===


    console.log("Frederic Mirindi website scripts loaded.");

}); // End of DOMContentLoaded

/* === Full Updated script.js (No Theme Toggle) === */

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
        // ... (Mobile nav logic) ...
         navToggle.addEventListener('click', function() { /* ... */ });
         mainNav.querySelectorAll('a').forEach(link => { /* ... */ });
         document.addEventListener('click', function(event) { /* ... */ });
    }

    // --- Fade-in animation on scroll ---
    const fadeElements = document.querySelectorAll('.fade-in');
    if ("IntersectionObserver" in window) {
        // ... (Intersection Observer logic) ...
        const observer = new IntersectionObserver((entries, observer) => { /* ... */ }, { threshold: 0.1 });
        fadeElements.forEach(el => { /* ... */ });
    } else {
        fadeElements.forEach(el => { if (el) { el.style.opacity = 1; } });
    }

    // --- Publication Filtering and Search Logic ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const keywordInput = document.getElementById('keyword-search');
    const publicationList = document.getElementById('publication-list');
    const publicationListItems = publicationList ? publicationList.querySelectorAll('li') : [];

    function filterAndSearchPublications() {
        // ... (Filtering function) ...
         const activeFilterBtn = document.querySelector('.filter-btn.active');
         const selectedCategory = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
         const searchTerm = keywordInput ? keywordInput.value.toLowerCase() : '';
         publicationListItems.forEach(item => { /* ... show/hide logic ... */ });
    }
    // Add event listeners only if the elements exist on the current page
    if (filterButtons.length > 0 && publicationListItems.length > 0) {
        filterButtons.forEach(button => { /* ... Event listener ... */ });
    }
    if (keywordInput && publicationListItems.length > 0) {
        keywordInput.addEventListener('input', filterAndSearchPublications);
    }
    // --- End Publication Filtering Logic ---

    // Note: Theme toggle logic was removed

    console.log("Frederic Mirindi website scripts updated and loaded.");

}); // End of DOMContentLoaded

/* Add this inside the DOMContentLoaded function in js/script.js */

    // === D3.js Decision Tree Example ===
    function drawDecisionTree() {
        const svgElement = document.getElementById('decision-tree-svg');
        if (!svgElement) return; // Exit if SVG container not found

        // ** VERY IMPORTANT: Replace this sample data with your actual tree structure **
        // Format: { name: "Node Label", children: [ ...child nodes... ] }
        const sampleTreeData = {
            name: "Root (e.g., Credit Score > 650?)",
            children: [
                {
                    name: "Yes (e.g., Income > $50k?)",
                    children: [
                        { name: "Yes (Predict: Low Risk)" },
                        { name: "No (Predict: Medium Risk)" }
                    ]
                },
                { name: "No (Predict: High Risk)" }
            ]
        };

        // --- D3 Setup ---
        const width = svgElement.clientWidth || 600; // Use container width or fallback
        const height = svgElement.clientHeight || 400; // Use container height or fallback
        const marginTop = 20;
        const marginRight = 20;
        const marginBottom = 20;
        const marginLeft = 40; // Adjust margin for labels if needed

        // Create SVG element within the container
        const svg = d3.select("#decision-tree-svg")
            .attr("viewBox", [0, 0, width, height])
            .append("g")
            .attr("transform", `translate(${marginLeft},${marginTop})`);

        // Create tree layout generator
        const treeLayout = d3.tree()
            // Adjust size: [height, width] because tree grows left-to-right or top-to-bottom
            // For a top-to-bottom tree, use [width - marginRight - marginLeft, height - marginTop - marginBottom]
            .size([height - marginTop - marginBottom, width - marginLeft - marginRight]);

        // Create hierarchy from data
        const root = d3.hierarchy(sampleTreeData);
        treeLayout(root); // Calculate node positions

        // --- Draw Links (Lines) ---
        svg.append("g")
            .attr("class", "tree-links")
            .selectAll("path")
            .data(root.links()) // Get parent-child links
            .join("path")
              .attr("class", "tree-link")
              // Use d3.link(Vertical or Horizontal) for path generation
              .attr("d", d3.linkVertical() // Or d3.linkHorizontal()
                    // Swap source and target x/y depending on orientation
                    .x(d => d.y) // Use calculated y for horizontal position in vertical tree
                    .y(d => d.x) // Use calculated x for vertical position
              );


        // --- Draw Nodes ---
        const node = svg.append("g")
            .attr("class", "tree-nodes")
            .selectAll("g")
            .data(root.descendants()) // Get all nodes including root
            .join("g")
              // Position nodes: Swap x/y for vertical tree
              .attr("transform", d => `translate(${d.y},${d.x})`)
              .attr("class", d => d.children ? "tree-node" : "tree-node leaf"); // Add 'leaf' class

        node.append("circle"); // Add circle marker

        // --- Add Text Labels ---
        node.append("text")
            .text(d => d.data.name)
            // Add x, y offsets based on whether it's a leaf node or not (see CSS)
            // You might need more complex logic for label placement
            .attr("paint-order", "stroke") // Make text more readable over lines
            .attr("stroke", "white")
            .attr("stroke-width", 3);


        console.log("D3 tree drawn (basic example).");
    }

    // Call the function only if the SVG element exists (i.e., on ai-ml.html)
    if (document.getElementById('decision-tree-svg')) {
        drawDecisionTree();
    }
    // === END D3.js Decision Tree Example ===

/* The closing }); of the main DOMContentLoaded function should be after this */
