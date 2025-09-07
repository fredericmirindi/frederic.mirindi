// Global state
let currentPage = 'home';
let isDarkMode = false;
let animationObserver;

// DOM elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const footnoteModal = document.getElementById('footnote-modal');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeAnimations();
    initializeInteractiveElements();
    initializeCharts();
    initializeForms();
    initializeFootnotes();
    
    // Set initial page
    showPage('home');
});

// Theme Management
function initializeTheme() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        isDarkMode = savedTheme === 'dark';
    } else {
        isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    document.documentElement.setAttribute('data-color-scheme', isDarkMode ? 'dark' : 'light');
    updateThemeIcon();

    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-color-scheme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('.theme-icon');
    icon.textContent = isDarkMode ? '☀️' : '🌙';
}

// Navigation
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Page navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
            
            // Close mobile menu
            navMenu.classList.remove('active');
        });
    });

    // Hero buttons navigation
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn') && e.target.hasAttribute('data-page')) {
            const page = e.target.getAttribute('data-page');
            showPage(page);
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function showPage(pageId) {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Trigger any page-specific initialization
        if (pageId === 'ai-implementation') {
            initializeAIToolsPage();
        }
    }

    // Update navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.research-card, .paper-card, .conference-card, .ai-tool-card');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        animationObserver.observe(el);
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    // Research page interactions
    initializeResearchDemos();
    
    // Skills animation
    initializeSkillsAnimation();
}

function initializeResearchDemos() {
    // Policy simulation
    const simulateBtn = document.querySelector('.simulate-btn');
    if (simulateBtn) {
        simulateBtn.addEventListener('click', function() {
            const resultDiv = document.querySelector('.simulation-result');
            
            // Add loading state
            this.textContent = 'Running...';
            this.disabled = true;
            
            setTimeout(() => {
                const results = [
                    'GDP Growth: +2.3%',
                    'Unemployment Rate: -0.8%',
                    'Inflation Impact: +0.5%',
                    'Consumer Confidence: +5.2%'
                ];
                
                resultDiv.innerHTML = `
                    <h4>Policy Simulation Results</h4>
                    <ul>
                        ${results.map(result => `<li>${result}</li>`).join('')}
                    </ul>
                `;
                
                this.textContent = 'Run Policy Simulation';
                this.disabled = false;
            }, 2000);
        });
    }

    // NLP sentiment analysis
    const analyzeBtn = document.querySelector('.analyze-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            const textarea = document.querySelector('.nlp-demo textarea');
            const resultDiv = document.querySelector('.sentiment-result');
            
            if (!textarea.value.trim()) {
                alert('Please enter some text to analyze.');
                return;
            }
            
            this.textContent = 'Analyzing...';
            this.disabled = true;
            
            setTimeout(() => {
                const sentiment = Math.random() > 0.5 ? 'Positive' : 'Negative';
                const score = (Math.random() * 0.4 + 0.6).toFixed(2);
                
                resultDiv.innerHTML = `
                    <h4>Sentiment Analysis Result</h4>
                    <p><strong>Overall Sentiment:</strong> ${sentiment}</p>
                    <p><strong>Confidence Score:</strong> ${score}</p>
                    <p><strong>Key Indicators:</strong> Market optimism, economic growth, policy impact</p>
                `;
                
                this.textContent = 'Analyze Sentiment';
                this.disabled = false;
            }, 1500);
        });
    }
}

function initializeAIToolsPage() {
    // Initialize AI tools when page loads
    setTimeout(() => {
        initializeAITools();
    }, 100);
}

function initializeAITools() {
    // Economic Forecasting Tool
    const forecastBtn = document.getElementById('run-forecast');
    if (forecastBtn && !forecastBtn.hasAttribute('data-initialized')) {
        forecastBtn.setAttribute('data-initialized', 'true');
        forecastBtn.addEventListener('click', function() {
            const indicator = document.getElementById('indicator-select').value;
            const period = document.getElementById('forecast-period').value;
            const resultDiv = document.querySelector('.forecast-result');
            
            this.textContent = 'Generating...';
            this.disabled = true;
            
            setTimeout(() => {
                // Show result container
                resultDiv.style.display = 'block';
                
                // Generate forecast chart
                const canvas = document.getElementById('forecast-result-chart');
                if (canvas) {
                    generateForecastChart(canvas, indicator, period);
                }
                
                // Add forecast summary
                const summary = document.createElement('div');
                summary.innerHTML = `
                    <h4>Forecast Summary</h4>
                    <p><strong>Indicator:</strong> ${indicator.toUpperCase()}</p>
                    <p><strong>Period:</strong> ${period} months</p>
                    <p><strong>Trend:</strong> ${Math.random() > 0.5 ? 'Upward' : 'Stable'}</p>
                    <p><strong>Confidence:</strong> ${(Math.random() * 20 + 75).toFixed(1)}%</p>
                `;
                
                // Clear previous summary and add new one
                const existingSummary = resultDiv.querySelector('div:not(canvas)');
                if (existingSummary) {
                    existingSummary.remove();
                }
                resultDiv.appendChild(summary);
                
                this.textContent = 'Generate Forecast';
                this.disabled = false;
            }, 1500);
        });
    }

    // Policy Impact Simulator
    const simulateBtn = document.getElementById('simulate-policy');
    if (simulateBtn && !simulateBtn.hasAttribute('data-initialized')) {
        simulateBtn.setAttribute('data-initialized', 'true');
        simulateBtn.addEventListener('click', function() {
            const policyType = document.getElementById('policy-type').value;
            const magnitude = document.getElementById('impact-magnitude').value;
            const resultsDiv = document.querySelector('.simulation-results');
            
            this.textContent = 'Simulating...';
            this.disabled = true;
            
            setTimeout(() => {
                const metrics = generatePolicyMetrics(policyType, magnitude);
                
                resultsDiv.innerHTML = `
                    <h4>Policy Impact Results</h4>
                    <div class="result-metrics">
                        ${metrics.map(metric => `
                            <div class="metric-item">
                                <span class="metric-value">${metric.value}</span>
                                <span class="metric-label">${metric.label}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
                
                this.textContent = 'Run Simulation';
                this.disabled = false;
            }, 1500);
        });
    }

    // Market Sentiment Analyzer
    const sentimentBtn = document.getElementById('analyze-sentiment');
    if (sentimentBtn && !sentimentBtn.hasAttribute('data-initialized')) {
        sentimentBtn.setAttribute('data-initialized', 'true');
        sentimentBtn.addEventListener('click', function() {
            const text = document.getElementById('sentiment-text').value;
            const resultDiv = document.querySelector('.sentiment-analysis-result');
            
            if (!text.trim()) {
                alert('Please enter some text to analyze.');
                return;
            }
            
            this.textContent = 'Analyzing...';
            this.disabled = true;
            
            setTimeout(() => {
                const sentiment = analyzeSentiment(text);
                
                resultDiv.innerHTML = `
                    <div class="sentiment-score">
                        <div class="sentiment-value">${sentiment.score}</div>
                        <div>Overall Sentiment Score</div>
                    </div>
                    <div class="sentiment-breakdown">
                        <div class="sentiment-item">
                            <div><strong>Positive</strong></div>
                            <div>${sentiment.positive}%</div>
                        </div>
                        <div class="sentiment-item">
                            <div><strong>Neutral</strong></div>
                            <div>${sentiment.neutral}%</div>
                        </div>
                        <div class="sentiment-item">
                            <div><strong>Negative</strong></div>
                            <div>${sentiment.negative}%</div>
                        </div>
                    </div>
                `;
                
                this.textContent = 'Analyze Sentiment';
                this.disabled = false;
            }, 1000);
        });
    }

    // Range input updates
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(input => {
        const valueSpan = input.nextElementSibling;
        
        if (valueSpan && valueSpan.classList.contains('range-value')) {
            input.addEventListener('input', function() {
                let value = this.value;
                if (this.id === 'impact-magnitude') {
                    value += '%';
                }
                valueSpan.textContent = value;
            });
        }
    });
}

function initializeSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
                
                skillObserver.unobserve(bar);
            }
        });
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Charts
function initializeCharts() {
    // Initialize demo charts
    setTimeout(() => {
        const forecastChart = document.getElementById('forecast-chart');
        const tradingChart = document.getElementById('trading-chart');
        
        if (forecastChart) {
            generateDemoChart(forecastChart, 'Economic Forecast');
        }
        
        if (tradingChart) {
            generateDemoChart(tradingChart, 'Trading Algorithm');
        }
    }, 1000);
}

function generateDemoChart(canvas, title) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Generate sample data
    const data = [];
    for (let i = 0; i < 20; i++) {
        data.push(Math.random() * 100 + 50);
    }
    
    // Draw chart
    ctx.strokeStyle = '#21808D';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let i = 0; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width;
        const y = height - (data[i] / 150) * height;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
    
    // Add points
    ctx.fillStyle = '#21808D';
    for (let i = 0; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width;
        const y = height - (data[i] / 150) * height;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function generateForecastChart(canvas, indicator, period) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Generate forecast data
    const data = [];
    let baseValue = 100;
    
    for (let i = 0; i < parseInt(period); i++) {
        baseValue += (Math.random() - 0.5) * 10;
        data.push(Math.max(0, baseValue));
    }
    
    // Draw forecast line
    ctx.strokeStyle = '#1FB8CD';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let i = 0; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width;
        const y = height - (data[i] / 150) * height;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
    
    // Add confidence band
    ctx.fillStyle = 'rgba(31, 184, 205, 0.2)';
    ctx.beginPath();
    ctx.moveTo(0, height);
    
    for (let i = 0; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((data[i] + 20) / 150) * height;
        ctx.lineTo(x, y);
    }
    
    for (let i = data.length - 1; i >= 0; i--) {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((data[i] - 20) / 150) * height;
        ctx.lineTo(x, y);
    }
    
    ctx.closePath();
    ctx.fill();
    
    // Add data points
    ctx.fillStyle = '#1FB8CD';
    for (let i = 0; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width;
        const y = height - (data[i] / 150) * height;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    }
}

// Utility functions
function generatePolicyMetrics(policyType, magnitude) {
    const multiplier = magnitude / 100;
    const metrics = [];
    
    switch (policyType) {
        case 'fiscal':
            metrics.push(
                { value: `+${(2.1 * multiplier).toFixed(1)}%`, label: 'GDP Growth' },
                { value: `${(1.5 * multiplier).toFixed(1)}%`, label: 'Inflation' },
                { value: `-${(0.8 * multiplier).toFixed(1)}%`, label: 'Unemployment' },
                { value: `+${(3.2 * multiplier).toFixed(1)}%`, label: 'Consumer Spending' }
            );
            break;
        case 'monetary':
            metrics.push(
                { value: `+${(1.8 * multiplier).toFixed(1)}%`, label: 'Investment' },
                { value: `${(0.9 * multiplier).toFixed(1)}%`, label: 'Interest Rate' },
                { value: `+${(2.5 * multiplier).toFixed(1)}%`, label: 'Money Supply' },
                { value: `-${(1.2 * multiplier).toFixed(1)}%`, label: 'Currency Value' }
            );
            break;
        case 'trade':
            metrics.push(
                { value: `+${(1.4 * multiplier).toFixed(1)}%`, label: 'Export Growth' },
                { value: `${(0.6 * multiplier).toFixed(1)}%`, label: 'Import Change' },
                { value: `+${(2.8 * multiplier).toFixed(1)}%`, label: 'Trade Balance' },
                { value: `${(1.1 * multiplier).toFixed(1)}%`, label: 'Tariff Impact' }
            );
            break;
    }
    
    return metrics;
}

function analyzeSentiment(text) {
    // Simple sentiment analysis simulation
    const positiveWords = ['growth', 'increase', 'positive', 'bullish', 'optimistic', 'strong', 'good', 'excellent'];
    const negativeWords = ['decline', 'decrease', 'negative', 'bearish', 'pessimistic', 'weak', 'bad', 'crisis'];
    
    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
        if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
        if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
    });
    
    const total = positiveCount + negativeCount;
    const positive = total > 0 ? Math.round((positiveCount / total) * 100) : 33;
    const negative = total > 0 ? Math.round((negativeCount / total) * 100) : 33;
    const neutral = 100 - positive - negative;
    
    const overallScore = positive > negative ? 
        (0.5 + (positive - negative) / 200).toFixed(2) : 
        (0.5 - (negative - positive) / 200).toFixed(2);
    
    return {
        score: overallScore,
        positive: positive,
        negative: negative,
        neutral: neutral
    };
}

// Forms
function initializeForms() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! Dr. Mirindi will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Footnotes
function initializeFootnotes() {
    const footnoteButtons = document.querySelectorAll('.footnote-btn');
    const footnoteClose = document.querySelector('.footnote-close');
    
    // Make footnote buttons more visible
    footnoteButtons.forEach((button, index) => {
        button.style.display = 'inline-block';
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const footnoteId = this.getAttribute('data-footnote');
            showFootnote(footnoteId);
        });
    });
    
    if (footnoteClose) {
        footnoteClose.addEventListener('click', hideFootnote);
    }
    
    // Close modal when clicking outside
    if (footnoteModal) {
        footnoteModal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideFootnote();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && footnoteModal && footnoteModal.classList.contains('active')) {
            hideFootnote();
        }
    });
}

function showFootnote(footnoteId) {
    const footnoteBody = document.querySelector('.footnote-body');
    
    if (!footnoteBody) return;
    
    // Sample footnote content
    const footnotes = {
        '1': {
            title: 'Machine Learning Applications in Macroeconomic Forecasting',
            citation: 'Mirindi, F. (2024). Machine Learning Applications in Macroeconomic Forecasting. Journal of Economic Analysis, 45(3), 123-145.',
            doi: 'doi:10.1000/jea.2024.0123',
            citations: 47,
            downloads: 1250,
            altmetric: 18
        },
        '2': {
            title: 'AI-Driven Policy Evaluation: A Comprehensive Framework',
            citation: 'Mirindi, F. (2024). AI-Driven Policy Evaluation: A Comprehensive Framework. Economic Policy Review, 78(2), 67-89.',
            doi: 'doi:10.1000/epr.2024.0456',
            citations: 35,
            downloads: 890,
            altmetric: 15
        },
        '3': {
            title: 'Natural Language Processing for Economic Sentiment Analysis',
            citation: 'Mirindi, F. (2023). Natural Language Processing for Economic Sentiment Analysis. Computational Economics, 62(4), 234-256.',
            doi: 'doi:10.1000/ce.2023.0789',
            citations: 62,
            downloads: 1560,
            altmetric: 22
        },
        '4': {
            title: 'Deep Learning Models for Financial Market Prediction',
            citation: 'Mirindi, F. (2023). Deep Learning Models for Financial Market Prediction. Financial Economics Review, 91(1), 34-52.',
            doi: 'doi:10.1000/fer.2023.0012',
            citations: 28,
            downloads: 720,
            altmetric: 12
        }
    };
    
    const footnote = footnotes[footnoteId];
    
    if (footnote) {
        footnoteBody.innerHTML = `
            <h4>${footnote.title}</h4>
            <div class="citation-info">
                <p><strong>Citation:</strong> ${footnote.citation}</p>
                <p><strong>DOI:</strong> <a href="#" target="_blank">${footnote.doi}</a></p>
            </div>
            <div class="impact-metrics">
                <h5>Impact Metrics</h5>
                <div class="metrics-grid">
                    <div class="metric">
                        <span class="metric-number">${footnote.citations}</span>
                        <span class="metric-label">Citations</span>
                    </div>
                    <div class="metric">
                        <span class="metric-number">${footnote.downloads}</span>
                        <span class="metric-label">Downloads</span>
                    </div>
                    <div class="metric">
                        <span class="metric-number">${footnote.altmetric}</span>
                        <span class="metric-label">Altmetric Score</span>
                    </div>
                </div>
            </div>
        `;
    } else {
        footnoteBody.innerHTML = '<p>Citation information not available.</p>';
    }
    
    footnoteModal.classList.add('active');
}

function hideFootnote() {
    if (footnoteModal) {
        footnoteModal.classList.remove('active');
    }
}

// Utility functions for smooth interactions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
window.addEventListener('beforeunload', function() {
    // Clean up observers
    if (animationObserver) {
        animationObserver.disconnect();
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// Export functions for global access
window.showPage = showPage;
window.toggleTheme = toggleTheme;






// ----------- WATCH WIDGET (Winnipeg Local Time - handles DST) -----------
function updateWinnipegTime() {
    const watchSpan = document.getElementById('watch-time');
    if (!watchSpan) return;

    // Use "America/Winnipeg" time zone for perfect handling of DST
    const now = new Date();
    // Format: HH:MM:SS (24h)
    const timeString = now.toLocaleTimeString("en-CA", { hour12: false, timeZone: "America/Winnipeg" });
    watchSpan.textContent = timeString;
}
setInterval(updateWinnipegTime, 1000);
updateWinnipegTime();

// ----------- WEATHER WIDGET (Winnipeg, Open-Meteo API, no API key needed) -----------
async function updateWinnipegWeather() {
    // Check if widget exists to avoid errors on page changes
    const tempSpan = document.getElementById('weather-temp');
    const descSpan = document.getElementById('weather-desc');
    const iconSpan = document.getElementById('weather-icon');
    if (!tempSpan || !descSpan || !iconSpan) return;

    try {
        // Winnipeg: 49.8951° N, 97.1384° W
        const url = `https://api.open-meteo.com/v1/forecast?latitude=49.8951&longitude=-97.1384&current_weather=true`;
        const response = await fetch(url);
        const json = await response.json();
        const temp = Math.round(json.current_weather.temperature);
        const code = json.current_weather.weathercode;

        // Weather code → icon + desc
        let description = "Clear", icon = "☀️";
        if (code >= 51 && code < 70)      { icon = "🌧️"; description = "Rain"; }
        else if (code >= 71 && code < 80) { icon = "❄️"; description = "Snow"; }
        else if (code === 0)              { icon = "☀️"; description = "Sunny"; }
        else if (code > 2 && code < 5)    { icon = "⛅"; description = "Partly Cloudy"; }
        else if (code < 3)                { icon = "🌤️"; description = "Mainly Sunny"; }
        else if (code >= 3 && code < 5)   { icon = "☁️"; description = "Cloudy"; }

        tempSpan.textContent = temp + "°C";
        descSpan.textContent = description;
        iconSpan.textContent = icon;
    } catch (e) {
        tempSpan.textContent = "—";
        descSpan.textContent = "Unavailable";
        iconSpan.textContent = "⚠️";
    }
}
updateWinnipegWeather();
setInterval(updateWinnipegWeather, 10 * 60 * 1000); // every 10 minutes

// ----------- ECONOMIC FACTS / QUOTES WIDGET -----------
const econFacts = [
    "Canada’s S&P/TSX is among the world’s top 10 largest stock exchanges.",
    "The Consumer Price Index (CPI) measures the average change in prices paid by consumers for goods and services.",
    "AI in economics enables better policy simulations and more accurate forecasting.",
    "\"In the middle of difficulty lies opportunity.\" — Albert Einstein",
    "Central banks use interest rates to regulate inflation and stimulate or cool the economy.",
    "Gross Domestic Product (GDP) is the broadest quantitative measure of a nation’s total economic activity.",
    "Elasticity measures how much demand or supply responds to changes in price.",
    "\"Economics is the study of how society manages its scarce resources.\" — Gregory Mankiw",
    "Scarcity is the basic economic problem that arises because resources are limited and wants are unlimited.",
    "Inflation represents the rate at which the general level of prices for goods and services rises.",
    "Unemployment is measured as a percentage of the labor force without a job but actively seeking work.",
    "Fiscal policy involves government spending and taxation to influence the economy.",
    "Monetary policy is controlled by central banks and involves managing money supply and interest rates.",
    "Opportunity cost is the value of the best alternative forgone when a choice is made.",
    "\"The only function of economic forecasting is to make astrology look respectable.\" — John Kenneth Galbraith",
    "A recession is defined as two consecutive quarters of negative economic growth.",
    "A bull market is characterized by rising asset prices, while a bear market features falling prices.",
    "Trade deficits occur when a country imports more goods and services than it exports.",
    "The law of supply and demand is the foundation of market economies.",
    "The World Bank’s mission is to reduce global poverty by providing financial and technical assistance.",
    "Market equilibrium occurs where the quantity demanded equals quantity supplied.",
    "Marginal cost is the increase in total cost from producing one more unit.",
    "Productivity growth is a key driver of long-term economic prosperity.",
    "Microeconomics focuses on individual agents; macroeconomics studies the economy as a whole.",
    "\"It's not the employer who pays the wages. Employers only handle the money. It's the customer who pays the wages.\" — Henry Ford",
    "Deflation is a general decline in prices, often linked to reduced demand and economic stagnation.",
    "Bonds are considered lower-risk investments but typically offer lower returns than stocks.",
    "Sustainable economic growth meets present needs without compromising future generations.",
    "A budget deficit occurs when government expenditures exceed revenues.",
    "The invisible hand describes how individuals’ pursuit of self-interest can benefit society — Adam Smith.",
    "Progressive taxes charge a higher percentage as income increases; regressive taxes do the opposite.",
    "BRICS refers to the emerging economies: Brazil, Russia, India, China, and South Africa.",
    "The Federal Reserve is the central bank of the United States.",
    "\"Not everything that can be counted counts, and not everything that counts can be counted.\" — Albert Einstein",
    "Compounding makes savings and investments grow faster over time.",
    "Cryptocurrency is a digital or virtual currency that uses cryptography for security.",
    "A tariff is a tax imposed by a government on imported goods.",
    "Subsidies are government payments that support businesses or market activities.",
    "Externalities are costs or benefits of economic activity, borne by third parties.",
    "The Phillips curve suggests an inverse relationship between inflation and unemployment.",
    "Stagflation describes a period of high inflation and high unemployment.",
    "Public goods are non-excludable and non-rivalrous, like clean air or national defense.",
    "GDP per capita divides total economic output by the population to measure average living standards.",
    "\"The four most dangerous words in investing are: ‘This time it’s different.’\" — Sir John Templeton",
    "Real GDP is adjusted for inflation, while nominal GDP is not.",
    "An exchange rate is the price of one country’s currency in terms of another’s.",
    "Purchasing Power Parity (PPP) compares costs of a standard basket of goods across countries.",
    "The Gini coefficient measures income inequality within a nation.",
    "Entrepreneurs drive innovation and job creation in modern economies.",
    "Labor force participation measures the percentage of people either working or actively seeking work.",
    "The Great Depression was the world’s worst economic downturn, starting in 1929.",
    "Hyperinflation is extremely rapid, excessive, and out-of-control price increases.",
    "A monopoly exists when a single company or group owns all or nearly all of the market for a given product or service.",
    "Perfect competition describes a market with many buyers and sellers and no barriers to entry.",
    "\"Price is what you pay. Value is what you get.\" — Warren Buffett",
    "The IMF (International Monetary Fund) provides financial help to countries facing balance of payments crises.",
    "NAFTA, now USMCA, is a major trade agreement between the United States, Canada, and Mexico.",
    "Economic sanctions restrict trade and financial transactions for political reasons.",
    "Interest rates affect consumer spending, borrowing, and investment throughout the economy.",
    "Venture capital funds high-growth startups in exchange for equity ownership.",
    "A stock’s dividend is a portion of the company’s earnings paid to shareholders.",
    "The yield curve plots interest rates of bonds with different maturities and can signal recession.",
    "Austerity denotes government policies aimed at reducing public sector debt.",
    "Financial markets allocate resources and facilitate trade between savers and borrowers.",
    "Behavioral economics studies how psychological factors affect economic decision-making.",
    "Remittances are funds sent by migrants to their home countries.",
    "\"There is no such thing as a free lunch.\" — Milton Friedman",
    "The Laffer Curve illustrates the relationship between tax rates and total tax revenue.",
    "The share economy (gig economy) includes flexible, temporary, or freelance jobs.",
    "The WTO (World Trade Organization) regulates global trade rules.",
    "The gold standard linked a country's currency to a fixed amount of gold.",
    "Index funds passively track a specific index and often offer lower fees to investors.",
    "A soft landing refers to a gradual slowdown in economic growth, avoiding a recession.",
    "Debt-to-GDP ratio is used to compare a country’s public debt to its economic output.",
    "The balance of payments records all transactions between a country and the rest of the world.",
    "Capital flight describes large-scale exit of financial assets from a country.",
    "A trade war is a situation where countries impose tariffs or restrictions against each other.",
    "Liquidity describes how easily assets can be converted to cash.",
    "\"The stock market is filled with individuals who know the price of everything, but the value of nothing.\" — Philip Fisher",
    "Product differentiation makes a product stand out from competitors’ offerings.",
    "Emerging markets are nations with social or business activity in the process of rapid growth.",
    "Market capitalization is the total value of a company’s shares of stock.",
    "Shadow banking occurs outside the traditional banking system and is less regulated.",
    "A supply shock is an unexpected event that changes the supply of a product or commodity.",
    "The efficient market hypothesis states that asset prices reflect all available information.",
    "Universal basic income proposes unconditional payments to all citizens.",
    "Crowdfunding enables businesses or individuals to raise small amounts of money from many people.",
    "A trade surplus happens when exports exceed imports.",
    "Digital currencies like Bitcoin challenge traditional financial systems.",
    "Green bonds finance projects with environmental benefits.",
    "“Economics is extremely useful as a form of employment for economists.” — John Kenneth Galbraith",
    "Seigniorage is the profit made by a government issuing currency.",
    "Poverty lines define the minimum income needed to meet basic needs.",
    "Network effects mean a product becomes more valuable as more people use it.",
    "Microfinance provides financial services to low-income individuals or groups.",
    "“The curious task of economics is to demonstrate to men how little they really know about what they imagine they can design.” — F.A. Hayek",
    "Sunk cost is money already spent and cannot be recovered.",
    "Devaluation reduces the value of a currency relative to others.",
    "The green economy aims to reduce environmental risks and ecological scarcities.",
    "A cartel is a group of independent companies colluding to control prices.",
    "The Lorenz curve graphs the cumulative share of income earned by different segments of a population.",
    "A hard currency is widely accepted around the world as a form of payment.",
    "A black market operates outside official, regulated channels.",
    "Keynesian economics advocates government intervention to manage economic cycles.",
    "The velocity of money is the rate at which money circulates in the economy.",
    "The sharing economy uses technology to facilitate peer-to-peer sharing of goods and services.",
    "\"An investment in knowledge pays the best interest.\" — Benjamin Franklin"
];





// **Replace #fact-box with your widget's element ID**
function displayRandomFact() {
    const factBox = document.getElementById('fact-box');
    if (!factBox) return;
    const index = Math.floor(Math.random() * econFacts.length);
    factBox.textContent = econFacts[index];
}
displayRandomFact();









// Example: Fetch from your backend, not directly from Twitter
fetch('/api/latest-tweets')
  .then(res => res.json())
  .then(data => {
    const tweetContainer = document.getElementById('latest-tweets');
    data.tweets.forEach(tweet => {
      const tweetDiv = document.createElement('div');
      tweetDiv.classList.add('tweet');
      tweetDiv.innerHTML = `
        <div class="tweet-date">${tweet.created_at}</div>
        <div class="tweet-text">${tweet.text}</div>
        <a href="https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}"
           target="_blank">View on X</a>
      `;
      tweetContainer.appendChild(tweetDiv);
    });
  }).catch(err => {
    console.error(err);
  });







 




















// Publications Enhancement JavaScript
class PublicationsManager {
    constructor() {
        this.papers = document.querySelectorAll('.enhanced-card');
        this.currentView = 'grid';
        this.currentFilters = {
            year: '',
            type: '',
            topic: '',
            search: ''
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.updateStats();
        this.setupTopicCloud();
        this.setupTimeline();
    }
    
    setupEventListeners() {
        // Filter controls
        const yearFilter = document.getElementById('year-filter');
        const typeFilter = document.getElementById('type-filter');
        const topicFilter = document.getElementById('topic-filter');
        const searchInput = document.getElementById('search-publications');
        const clearFilters = document.getElementById('clear-filters');
        
        if (yearFilter) yearFilter.addEventListener('change', (e) => this.handleFilter('year', e.target.value));
        if (typeFilter) typeFilter.addEventListener('change', (e) => this.handleFilter('type', e.target.value));
        if (topicFilter) topicFilter.addEventListener('change', (e) => this.handleFilter('topic', e.target.value));
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => this.handleFilter('search', e.target.value), 300));
        }
        if (clearFilters) clearFilters.addEventListener('click', () => this.clearAllFilters());
        
        // View controls
        const gridView = document.getElementById('grid-view');
        const listView = document.getElementById('list-view');
        const timelineView = document.getElementById('timeline-view');
        
        if (gridView) gridView.addEventListener('click', () => this.setView('grid'));
        if (listView) listView.addEventListener('click', () => this.setView('list'));
        if (timelineView) timelineView.addEventListener('click', () => this.setView('timeline'));
        
        // Citation buttons
        document.querySelectorAll('.cite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const title = e.target.closest('.cite-btn').dataset.title;
                this.showCitationModal(title);
            });
        });
        
        // Share buttons
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.enhanced-card');
                const title = card.querySelector('h3').textContent;
                const url = card.querySelector('.btn--primary').href;
                this.sharePublication(title, url);
            });
        });
        
        // Topic cloud interactions
        document.querySelectorAll('.topic-tag').forEach(tag => {
            tag.addEventListener('click', (e) => {
                const topic = e.target.textContent;
                document.getElementById('topic-filter').value = topic;
                this.handleFilter('topic', topic);
            });
        });
    }
    
    setupAnimations() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = `${Array.from(this.papers).indexOf(entry.target) * 0.1}s`;
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });
        
        this.papers.forEach(paper => observer.observe(paper));
    }
    
    handleFilter(filterType, value) {
        this.currentFilters[filterType] = value.toLowerCase();
        this.applyFilters();
        this.updateStats();
    }
    
    applyFilters() {
        let visibleCount = 0;
        
        this.papers.forEach(paper => {
            const year = paper.dataset.year;
            const type = paper.dataset.type;
            const topics = paper.dataset.topics.toLowerCase();
            const title = paper.querySelector('h3').textContent.toLowerCase();
            const abstract = paper.querySelector('.paper-abstract p')?.textContent.toLowerCase() || '';
            
            const matchesYear = !this.currentFilters.year || year === this.currentFilters.year;
            const matchesType = !this.currentFilters.type || type.toLowerCase() === this.currentFilters.type;
            const matchesTopic = !this.currentFilters.topic || topics.includes(this.currentFilters.topic);
            const matchesSearch = !this.currentFilters.search || 
                title.includes(this.currentFilters.search) || 
                abstract.includes(this.currentFilters.search);
            
            const shouldShow = matchesYear && matchesType && matchesTopic && matchesSearch;
            
            if (shouldShow) {
                paper.classList.remove('hidden');
                visibleCount++;
                this.highlightSearchTerms(paper);
            } else {
                paper.classList.add('hidden');
            }
        });
        
        // Update results count
        this.showResultsCount(visibleCount);
    }
    
    highlightSearchTerms(paper) {
        if (!this.currentFilters.search) return;
        
        const elements = paper.querySelectorAll('h3, .paper-abstract p');
        elements.forEach(el => {
            const text = el.textContent;
            const regex = new RegExp(`(${this.currentFilters.search})`, 'gi');
            el.innerHTML = text.replace(regex, '<span class="highlight">$1</span>');
        });
    }
    
    clearAllFilters() {
        this.currentFilters = { year: '', type: '', topic: '', search: '' };
        
        document.getElementById('year-filter').value = '';
        document.getElementById('type-filter').value = '';
        document.getElementById('topic-filter').value = '';
        document.getElementById('search-publications').value = '';
        
        this.papers.forEach(paper => {
            paper.classList.remove('hidden');
            // Remove highlights
            const highlighted = paper.querySelectorAll('.highlight');
            highlighted.forEach(el => {
                el.outerHTML = el.textContent;
            });
        });
        
        this.updateStats();
    }
    
    setView(viewType) {
        this.currentView = viewType;
        const container = document.getElementById('publications-container');
        
        // Update button states
        document.querySelectorAll('.view-controls .btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${viewType}-view`).classList.add('active');
        
        // Update container classes
        container.className = 'publications-container';
        container.classList.add(`${viewType}-view`);
        
        // Animate transition
        container.style.opacity = '0';
        setTimeout(() => {
            container.style.opacity = '1';
        }, 150);
    }
    
    updateStats() {
        const visiblePapers = Array.from(this.papers).filter(paper => !paper.classList.contains('hidden'));
        const totalPubs = visiblePapers.length;
        const recentPubs = visiblePapers.filter(paper => parseInt(paper.dataset.year) >= 2024).length;
        const aiPubs = visiblePapers.filter(paper => 
            paper.dataset.topics.toLowerCase().includes('ai') || 
            paper.dataset.topics.toLowerCase().includes('machine learning')
        ).length;
        
        // Animate counter updates
        this.animateCounter('total-publications', totalPubs);
        this.animateCounter('recent-publications', recentPubs);
        this.animateCounter('ai-publications', aiPubs);
    }
    
    animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const startValue = parseInt(element.textContent) || 0;
        const duration = 500;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
            
            element.textContent = currentValue + (targetValue > 20 ? '+' : '');
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
    
    setupTopicCloud() {
        const topics = document.querySelectorAll('.topic-tag');
        topics.forEach(topic => {
            const weight = parseInt(topic.dataset.weight);
            topic.style.fontSize = `${0.8 + weight * 0.2}rem`;
            topic.style.opacity = `${0.6 + weight * 0.1}`;
        });
    }
    
    setupTimeline() {
        const timelineYears = document.querySelectorAll('.timeline-year');
        timelineYears.forEach((year, index) => {
            setTimeout(() => {
                year.style.opacity = '1';
                year.style.transform = 'translateX(0)';
            }, index * 200);
            
            year.style.opacity = '0';
            year.style.transform = 'translateX(-20px)';
            year.style.transition = 'all 0.5s ease';
        });
    }
    
    showCitationModal(title) {
        const modal = document.getElementById('citation-modal');
        
        // Generate citations
        const apa = `Mirindi, F. (2025). ${title}. Journal Name.`;
        const ieee = `F. Mirindi, "${title}," Journal Name, 2025.`;
        const bibtex = `@article{mirindi2025,
    title={${title}},
    author={Mirindi, Frederic},
    year={2025},
    journal={Journal Name}
}`;
        
        document.getElementById('apa-citation').textContent = apa;
        document.getElementById('ieee-citation').textContent = ieee;
        document.getElementById('bibtex-citation').textContent = bibtex;
        
        modal.classList.add('active');
    }
    
    sharePublication(title, url) {
        if (navigator.share) {
            navigator.share({
                title: title,
                url: url
            });
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(url).then(() => {
                this.showNotification('Link copied to clipboard!');
            });
        }
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-success);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 3000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    showResultsCount(count) {
        let counter = document.getElementById('results-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.id = 'results-counter';
            counter.style.cssText = `
                text-align: center;
                margin: 20px 0;
                font-weight: 500;
                color: var(--color-text-secondary);
            `;
            document.querySelector('.papers-list').parentNode.insertBefore(counter, document.querySelector('.papers-list'));
        }
        
        counter.textContent = `Showing ${count} publications`;
    }
}

// Citation modal functions
function closeCitationModal() {
    document.getElementById('citation-modal').classList.remove('active');
}

function copyCitation(format) {
    const citationText = document.getElementById(`${format}-citation`).textContent;
    navigator.clipboard.writeText(citationText).then(() => {
        // Show success feedback
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.background = 'var(--color-success)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    });
}

// Utility function for debouncing search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize publications manager when the papers page is active
    if (document.getElementById('papers')) {
        new PublicationsManager();
    }
    
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('citation-modal');
        if (modal && e.target === modal) {
            closeCitationModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCitationModal();
        }
    });
});

// CSS for animations (add to your existing CSS)
const additionalStyles = `
.animate-in {
    animation: slideInUp 0.6s ease-out forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.notification {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
`;

// Add additional styles to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
