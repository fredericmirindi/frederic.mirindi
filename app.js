// Frédéric Mirindi Personal Website - Interactive Features

class PersonalWebsite {
    constructor() {
        this.currentSection = 'home';
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupThemeToggle();
        this.setupNavigationHighlighting();
        this.setupPublicationsFilter();
        this.setupContactForm();
        this.setupTimeBasedGreeting();
        this.setupSmoothScrolling();
        this.setupMobileNavigation();
        this.setupAnimations();
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Mobile navigation toggle
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => this.toggleMobileNav());
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container') && this.isMenuOpen) {
                this.closeMobileNav();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Window resize handler
        window.addEventListener('resize', () => this.handleResize());
    }

    setupIntersectionObserver() {
        const sections = document.querySelectorAll('section[id]');
        const options = {
            threshold: 0.3,
            rootMargin: '-50px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveNavLink(entry.target.id);
                    this.triggerSectionAnimations(entry.target);
                }
            });
        }, options);

        sections.forEach(section => observer.observe(section));
    }

    setupThemeToggle() {
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        this.setTheme(initialTheme);

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-color-scheme', theme);
        
        const themeIcon = document.querySelector('.theme-icon');
        const themeToggle = document.getElementById('themeToggle');
        
        if (themeIcon) {
            themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
        }
        
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
        }

        // Update navigation styling based on theme
        this.updateNavigationTheme(theme);
    }

    updateNavigationTheme(theme) {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navContainer) {
            navContainer.style.background = theme === 'light' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(38, 40, 40, 0.9)';
            navContainer.style.borderBottom = theme === 'light' 
                ? '1px solid rgba(255, 255, 255, 0.1)' 
                : '1px solid rgba(119, 124, 124, 0.3)';
        }

        if (navMenu) {
            navMenu.style.background = theme === 'light' 
                ? 'rgba(255, 255, 253, 0.95)' 
                : 'rgba(38, 40, 40, 0.95)';
        }
    }

    setupNavigationHighlighting() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-2px)';
            });
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0)';
            });
        });
    }

    updateActiveNavLink(sectionId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
        this.currentSection = sectionId;
    }

    setupPublicationsFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const publicationCards = document.querySelectorAll('.publication-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter publications with smooth animation
                publicationCards.forEach((card, index) => {
                    const year = card.getAttribute('data-year');
                    if (filter === 'all' || year === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Add form validation
        const formInputs = contactForm?.querySelectorAll('input, select, textarea');
        formInputs?.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        // Validate form
        if (!this.validateForm(form)) {
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        submitButton.style.opacity = '0.7';
        
        // Simulate form submission with realistic delay
        setTimeout(() => {
            this.showFormSuccess(form);
            form.reset();
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            submitButton.style.opacity = '1';
        }, 1500);
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name');
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(field);

        // Required field check
        if (field.hasAttribute('required') && !value) {
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
            isValid = false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
        }

        // Message length validation
        if (field.name === 'message' && value && value.length < 10) {
            errorMessage = 'Please provide a more detailed message (minimum 10 characters)';
            isValid = false;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
        
        // Add shake animation
        field.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    showFormSuccess(form) {
        // Remove any existing success message
        const existingSuccess = form.querySelector('.form-success');
        if (existingSuccess) {
            existingSuccess.remove();
        }

        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <div class="form-success-message">
                <div style="font-size: 1.2em; margin-bottom: 0.5em;">✓ Message Sent Successfully!</div>
                <div>Thank you for reaching out. I'll get back to you within 24 hours.</div>
            </div>
        `;
        
        form.appendChild(successDiv);
        
        // Auto-remove success message after 5 seconds
        setTimeout(() => {
            successDiv.style.opacity = '0';
            successDiv.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                successDiv.remove();
            }, 300);
        }, 5000);

        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    setupTimeBasedGreeting() {
        const greetingElement = document.getElementById('greeting');
        if (greetingElement) {
            const hour = new Date().getHours();
            let greeting = '';
            let emoji = '';

            if (hour < 12) {
                greeting = 'Good morning';
                emoji = '🌅';
            } else if (hour < 17) {
                greeting = 'Good afternoon';
                emoji = '☀️';
            } else {
                greeting = 'Good evening';
                emoji = '🌙';
            }

            greetingElement.textContent = `${greeting}! ${emoji}`;
        }
    }

    setupSmoothScrolling() {
        // Add smooth scrolling behavior
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    setupMobileNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            // Initial state
            navMenu.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-expanded', 'false');
            
            // Ensure proper initial styling
            navMenu.style.display = 'flex';
        }
    }

    toggleMobileNav() {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu && navToggle) {
            this.isMenuOpen = !this.isMenuOpen;
            
            navMenu.classList.toggle('active', this.isMenuOpen);
            navToggle.classList.toggle('active', this.isMenuOpen);
            
            navMenu.setAttribute('aria-expanded', this.isMenuOpen);
            navToggle.setAttribute('aria-expanded', this.isMenuOpen);
            
            // Update theme-specific styling when menu is toggled
            const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
            this.updateNavigationTheme(currentTheme);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
        }
    }

    closeMobileNav() {
        if (this.isMenuOpen) {
            this.toggleMobileNav();
        }
    }

    handleNavClick(e) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        const targetId = href.substring(1);
        
        // Close mobile menu if open
        this.closeMobileNav();
        
        // Scroll to section
        this.scrollToSection(targetId);
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navHeight = document.querySelector('.nav-container').offsetHeight;
            const sectionTop = section.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        }
    }

    handleKeyPress(e) {
        // Handle keyboard navigation
        if (e.key === 'Escape' && this.isMenuOpen) {
            this.closeMobileNav();
        }
        
        // Handle arrow key navigation through sections
        if (e.altKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
            e.preventDefault();
            const sections = ['home', 'about', 'research', 'teaching', 'awards', 'contact'];
            const currentIndex = sections.indexOf(this.currentSection);
            
            if (e.key === 'ArrowUp' && currentIndex > 0) {
                this.scrollToSection(sections[currentIndex - 1]);
            } else if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                this.scrollToSection(sections[currentIndex + 1]);
            }
        }
    }

    handleResize() {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.closeMobileNav();
        }
    }

    setupAnimations() {
        // Animate elements on scroll
        const animateElements = document.querySelectorAll('.timeline-item, .skill-card, .interest-card, .publication-card, .award-card, .course-card');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const animateObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            animateObserver.observe(element);
        });

        // Parallax effect for floating shapes
        this.setupParallaxEffect();
    }

    setupParallaxEffect() {
        const shapes = document.querySelectorAll('.shape');
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxRate = scrolled * -0.3;
            
            shapes.forEach((shape, index) => {
                const rate = parallaxRate * (0.5 + index * 0.1);
                shape.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.02}deg)`;
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }

    triggerSectionAnimations(section) {
        const sectionId = section.id;
        
        // Trigger specific animations based on section
        switch (sectionId) {
            case 'about':
                this.animateTimelineItems();
                break;
            case 'research':
                this.animatePublications();
                break;
            case 'awards':
                this.animateAwards();
                break;
        }
    }

    animateTimelineItems() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-in');
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }

    animatePublications() {
        const publicationCards = document.querySelectorAll('.publication-card[style*="opacity: 1"], .publication-card:not([style*="opacity"])');
        publicationCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    animateAwards() {
        const awardCards = document.querySelectorAll('.award-card');
        awardCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, index * 150);
        });
    }
}

// Global functions for button clicks
window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.nav-container').offsetHeight;
        const sectionTop = section.offsetTop - navHeight - 20;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
};

// Initialize website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PersonalWebsite();
});

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--color-background);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.5s ease-out;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 1rem;">🎓</div>
            <div style="font-size: 1.2rem; color: var(--color-text);">Loading...</div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 800);
});

// Add enhanced accessibility features
class AccessibilityEnhancer {
    constructor() {
        this.setupKeyboardNavigation();
        this.setupScreenReaderSupport();
        this.setupFocusManagement();
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }

    setupScreenReaderSupport() {
        // Add ARIA labels and descriptions
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const title = section.querySelector('h2, h3');
            if (title) {
                section.setAttribute('aria-labelledby', title.id || `${section.id}-title`);
                if (!title.id) {
                    title.id = `${section.id}-title`;
                }
            }
        });

        // Add live region for dynamic content
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    }

    setupFocusManagement() {
        // Ensure focus is properly managed during navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                setTimeout(() => {
                    const targetId = link.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.setAttribute('tabindex', '-1');
                        targetSection.focus();
                        
                        // Announce section change to screen readers
                        const liveRegion = document.getElementById('live-region');
                        if (liveRegion) {
                            const sectionTitle = targetSection.querySelector('h2, h3');
                            if (sectionTitle) {
                                liveRegion.textContent = `Navigated to ${sectionTitle.textContent} section`;
                            }
                        }
                    }
                }, 100);
            });
        });
    }
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', () => {
    new AccessibilityEnhancer();
});

// Add CSS for animations and improvements
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .keyboard-nav *:focus {
        outline: 2px solid var(--color-primary) !important;
        outline-offset: 2px !important;
    }
    
    .keyboard-nav .btn:focus {
        box-shadow: var(--focus-ring) !important;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .timeline-item {
        opacity: 0;
        transform: translateX(-20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .timeline-item.animate-in {
        opacity: 1;
        transform: translateX(0);
    }
    
    .publication-card {
        transition: opacity 0.3s ease-out, transform 0.3s ease-out;
    }
    
    .award-card {
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .form-success-message {
        animation: slideInUp 0.5s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-link {
        transition: all 0.3s ease;
    }
    
    .nav-link:hover {
        background: var(--color-secondary);
    }
    
    .theme-toggle {
        transition: all 0.3s ease;
    }
    
    .theme-toggle:active {
        transform: scale(0.95);
    }
`;
document.head.appendChild(additionalStyles);