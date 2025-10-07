// Research Page Enhanced JavaScript - Mobile-First Interactive Features

class ResearchPageManager {
    constructor() {
        this.currentTab = 'publications';
        this.currentView = 'grid';
        this.publications = [];
        this.filteredPublications = [];
        this.visibleCount = 9;
        this.increment = 6;
        this.searchTimeout = null;
        
        this.init();
    }

    init() {
        this.initEventListeners();
        this.loadPublications();
        this.initChart();
        this.setupMobileOptimizations();
    }

    initEventListeners() {
        // Tab navigation
        document.querySelectorAll('.research-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.handleTabChange(e));
        });

        // Search and filters
        const searchInput = document.getElementById('publications-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e));
        }

        const yearFilter = document.getElementById('year-filter');
        if (yearFilter) {
            yearFilter.addEventListener('change', (e) => this.handleFilter(e));
        }

        const typeFilter = document.getElementById('type-filter');
        if (typeFilter) {
            typeFilter.addEventListener('change', (e) => this.handleFilter(e));
        }

        // View toggles
        document.querySelectorAll('.view-toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleViewToggle(e));
        });

        // Load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMorePublications());
        }

        // Tool buttons
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleToolAction(e));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));

        // Intersection Observer for animations
        this.setupIntersectionObserver();
    }

    handleTabChange(e) {
        e.preventDefault();
        const tab = e.currentTarget;
        const tabName = tab.dataset.tab;

        // Update active tab
        document.querySelectorAll('.research-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update active content
        document.querySelectorAll('.research-content').forEach(content => {
            content.classList.remove('active');
        });
        const targetContent = document.getElementById(tabName);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        this.currentTab = tabName;

        // Announce to screen readers
        this.announceTabChange(tabName);
    }

    handleSearch(e) {
        clearTimeout(this.searchTimeout);
        const query = e.target.value.toLowerCase().trim();
        
        this.searchTimeout = setTimeout(() => {
            this.filterPublications(query);
        }, 300);
    }

    handleFilter(e) {
        this.filterPublications();
    }

    filterPublications(searchQuery = null) {
        const yearFilter = document.getElementById('year-filter')?.value || 'all';
        const typeFilter = document.getElementById('type-filter')?.value || 'all';
        const searchInput = document.getElementById('publications-search');
        const query = searchQuery !== null ? searchQuery : (searchInput?.value.toLowerCase().trim() || '');

        this.filteredPublications = this.publications.filter(pub => {
            const matchesYear = yearFilter === 'all' || pub.year === yearFilter;
            const matchesType = typeFilter === 'all' || pub.type === typeFilter;
            const matchesSearch = !query || 
                pub.title.toLowerCase().includes(query) ||
                pub.authors.toLowerCase().includes(query) ||
                pub.venue.toLowerCase().includes(query);

            return matchesYear && matchesType && matchesSearch;
        });

        this.visibleCount = Math.min(9, this.filteredPublications.length);
        this.renderPublications();
        this.updateLoadMoreButton();
    }

    handleViewToggle(e) {
        const btn = e.currentTarget;
        const view = btn.dataset.view;

        document.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const grid = document.querySelector('.publications-grid');
        if (grid) {
            grid.className = `publications-grid ${view === 'list' ? 'list-view' : ''}`;
        }

        this.currentView = view;
    }

    loadPublications() {
        const publicationCards = document.querySelectorAll('.publication-card');
        this.publications = Array.from(publicationCards).map(card => ({
            element: card,
            year: card.dataset.year,
            type: card.dataset.type,
            title: card.querySelector('.publication-title a')?.textContent || '',
            authors: card.querySelector('.publication-authors')?.textContent || '',
            venue: card.querySelector('.publication-venue')?.textContent || ''
        }));

        this.filteredPublications = [...this.publications];
        this.renderPublications();
        this.updateLoadMoreButton();
    }

    renderPublications() {
        const grid = document.getElementById('publications-grid');
        if (!grid) return;

        // Hide all publications first
        this.publications.forEach(pub => {
            pub.element.style.display = 'none';
        });

        // Show filtered publications up to visible count
        this.filteredPublications.slice(0, this.visibleCount).forEach(pub => {
            pub.element.style.display = 'block';
        });

        this.updateResultsCount();
    }

    loadMorePublications() {
        this.visibleCount = Math.min(
            this.visibleCount + this.increment,
            this.filteredPublications.length
        );
        this.renderPublications();
        this.updateLoadMoreButton();

        // Smooth scroll to new content
        const newItems = this.filteredPublications.slice(
            this.visibleCount - this.increment,
            this.visibleCount
        );
        if (newItems.length > 0) {
            setTimeout(() => {
                newItems[0].element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }

    updateLoadMoreButton() {
        const btn = document.getElementById('load-more-btn');
        if (!btn) return;

        if (this.visibleCount >= this.filteredPublications.length) {
            btn.style.display = 'none';
        } else {
            btn.style.display = 'inline-flex';
            const remaining = this.filteredPublications.length - this.visibleCount;
            btn.innerHTML = `
                <i class="fas fa-chevron-down"></i>
                Load More Publications (${remaining} remaining)
            `;
        }
    }

    updateResultsCount() {
        const countElement = document.getElementById('results-count');
        if (countElement) {
            const showing = Math.min(this.visibleCount, this.filteredPublications.length);
            countElement.textContent = `Showing ${showing} of ${this.filteredPublications.length} publications`;
        }
    }

    handleToolAction(e) {
        const btn = e.currentTarget;
        const toolCard = btn.closest('.tool-card');
        const toolName = toolCard?.querySelector('h3')?.textContent || 'Unknown Tool';
        
        if (btn.classList.contains('primary')) {
            this.launchTool(toolName);
        } else {
            this.showToolInfo(toolName);
        }
    }

    launchTool(toolName) {
        const notification = this.showNotification(`Launching ${toolName}...`, 'info');
        
        setTimeout(() => {
            notification.remove();
            this.showNotification(`${toolName} interface would load here`, 'success');
        }, 2000);
    }

    showToolInfo(toolName) {
        const modal = this.createModal(`${toolName} Information`, `
            <p>This research tool provides advanced capabilities for economic analysis:</p>
            <ul style="margin: 1rem 0; padding-left: 1.5rem;">
                <li>Interactive visualizations and real-time data processing</li>
                <li>Advanced machine learning algorithms</li>
                <li>Export functionality for research data</li>
                <li>Mobile-responsive interface design</li>
            </ul>
            <p>Click "Launch Tool" to access the full research interface.</p>
        `);
        document.body.appendChild(modal);
    }

    initChart() {
        const canvas = document.getElementById('publication-timeline-chart');
        if (!canvas || typeof Chart === 'undefined') return;

        const ctx = canvas.getContext('2d');
        
        // Data based on your actual publications
        const publicationData = {
            2024: 3,
            2025: 18
        };

        const years = Object.keys(publicationData).sort();
        const counts = years.map(year => publicationData[year]);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: 'Publications per Year',
                    data: counts,
                    borderColor: 'rgb(33, 128, 141)',
                    backgroundColor: 'rgba(33, 128, 141, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgb(33, 128, 141)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    setupMobileOptimizations() {
        if ('ontouchstart' in window) {
            this.setupSwipeNavigation();
        }
        this.setupScrollOptimization();
        this.setupLoadingStates();
    }

    setupSwipeNavigation() {
        const tabContainer = document.querySelector('.research-tabs');
        if (!tabContainer) return;

        let startX = 0;
        let startY = 0;
        let threshold = 50;

        tabContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        tabContainer.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const deltaX = endX - startX;
            const deltaY = endY - startY;

            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
                const tabs = Array.from(document.querySelectorAll('.research-tab'));
                const currentIndex = tabs.findIndex(tab => tab.classList.contains('active'));
                
                if (deltaX > 0 && currentIndex > 0) {
                    tabs[currentIndex - 1].click();
                } else if (deltaX < 0 && currentIndex < tabs.length - 1) {
                    tabs[currentIndex + 1].click();
                }
            }
        }, { passive: true });
    }

    setupScrollOptimization() {
        let scrollTimeout = null;
        
        window.addEventListener('scroll', () => {
            if (scrollTimeout) return;
            
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
                scrollTimeout = null;
            }, 16);
        }, { passive: true });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        const header = document.querySelector('.research-minimal-hero');
        
        if (header) {
            const opacity = Math.max(0, 1 - scrollTop / 300);
            header.style.opacity = opacity;
        }
    }

    setupLoadingStates() {
        const grid = document.getElementById('publications-grid');
        if (grid) {
            grid.addEventListener('load', () => {
                grid.classList.add('loaded');
            });
        }
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        document.querySelectorAll('.publication-card, .tool-card, .metric-card').forEach(card => {
            observer.observe(card);
        });
    }

    handleKeyboardNavigation(e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'f':
                    e.preventDefault();
                    document.getElementById('publications-search')?.focus();
                    break;
                case '1':
                    e.preventDefault();
                    document.querySelector('[data-tab="publications"]')?.click();
                    break;
                case '2':
                    e.preventDefault();
                    document.querySelector('[data-tab="tools"]')?.click();
                    break;
                case '3':
                    e.preventDefault();
                    document.querySelector('[data-tab="metrics"]')?.click();
                    break;
            }
        }
    }

    announceTabChange(tabName) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Switched to ${tabName} section`;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            if (document.body.contains(announcement)) {
                document.body.removeChild(announcement);
            }
        }, 1000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        `;

        const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${bgColor};
            color: white;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.closeNotification(notification);
        });

        setTimeout(() => {
            this.closeNotification(notification);
        }, 5000);

        return notification;
    }

    closeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" aria-label="Close modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;

        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            padding: 1rem;
        `;

        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: white;
            border-radius: 15px;
            padding: 2rem;
            max-width: 500px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        `;

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        const escHandler = (e) => {
            if (e.key === 'Escape') {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        return modal;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ResearchPageManager();
    });
} else {
    new ResearchPageManager();
}

// Export for potential external use
window.ResearchPageManager = ResearchPageManager;