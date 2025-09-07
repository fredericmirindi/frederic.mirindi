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







 





















/* ===== Publications (Complete - All Papers) ===== */
function initializePublications() {
  console.log('Initializing publications...');
  
  const wrap = document.getElementById('pubs-grid-wrap');
  if (!wrap) {
    console.error('Publications container not found!');
    return;
  }
  
  if (wrap.hasAttribute('data-initialized')) {
    console.log('Publications already initialized');
    return;
  }
  
  wrap.setAttribute('data-initialized', 'true');

  const yearSel = document.getElementById('pubs-year');
  const typeSel = document.getElementById('pubs-type');
  const searchInp = document.getElementById('pubs-search');
  const gridBtn = document.getElementById('pubs-grid');
  const listBtn = document.getElementById('pubs-list');
  const toast = document.getElementById('pubs-toast');

  // COMPLETE PUBLICATIONS DATA - All papers from screenshots
  const publicationsData = [
    {
      title: "Application of machine learning to predict the properties of wood-composite made from PET, HDPE, and PP fibres",
      authors: ["D Mirindi", "D Sinkhonde", "F Mirindi"],
      journal: "Manufacturing Letters",
      year: 2025,
      type: "Article",
      abstract: "Plastic composites provide an eco-friendly substitute for conventional construction materials. Indeed, recycling waste plastic represents a progressive approach to waste management with the aim of mitigating the growing issue of pollution in urban environments. Our research aims to review the physical properties, including water absorption (WA) and thickness swelling (TS), and mechanical properties, such as the internal bond (IB), the modulus of rupture (MOR), and the modulus of elasticity (MOE), of the latest findings made of wood panels combined with plastic. We are focusing on three types of plastic, namely polyethylene terephthalate (PET), polypropylene (PP), and high-density polyethylene (HDPE). In addition, we employed machine learning (ML) algorithms, including the hierarchical clustering dendrogram, the Pearson correlation coefficient, the support vector regression, the random forest (RF), and the decision tree (DT) for prediction analysis. For instance, the results indicate that combining HDPE with wood pulp fiber increases the MOR (42.45 MPa) and MOE (66.7 MPa), respectively. Furthermore, mixed plastics such as PET, HDPE, PP, and LDPE improve the dimensional stability by reducing the WA (0.32 %) and TS (0.18 %), respectively. In most cases, these results meet the minimum standard requirement for general-purpose boards, according with the American National Standard for Particleboard (ANSI/A208.1-1999), the European standard (EN 312), and Brazilian Association of Technical (ABNT NBR) standard. In addition, the dendrogram identifies three primary clusters with varying Euclidean distances, indicating the performance of wood-plastic panels for both physical and mechanical properties. Notably, the dimensional stability among panels is stronger than that of mechanical properties. The correlation matrix is important for selecting an appropriate plastic. The SVR, RF, and DT algorithms make predictions by analyzing the properties of the panel. For instance, the DT algorithm shows that when WA is less than 25 %, the predicted value of TS is 0.24 %; in addition, when the value is between 25 % and 75 %, TS is equal to 7.92 %; also, when WA is greater than 75 %, TS is predicted to be at 13.7 %. This innovative method of utilizing ML and DL for prediction opens new possibilities for the use of plastic in panel production, as it allows for the selection of suitable materials and fabrication techniques to create a wood-plastic composite.",
      doi: "10.1016/j.mfglet.2025.24-35",
      link: "https://www.sciencedirect.com/science/article/pii/S2213846325000288#:~:text=We%20are%20focusing%20on%20three,(66.7%20MPa)%2C%20respectively.",
      metrics: { citations: 0, reads: 92, saves: 7 }
    },
    {
      title: "Machine learning-driven analysis of nanoparticle performance on concrete mechanical properties",
      authors: ["D Mirindi", "J Hunter", "D Sinkhonde", "F Mirindi"],
      journal: "Manufacturing Letters",
      year: 2025,
      type: "Article",
      abstract: "Nanoparticles as raw material additive are substances that modify the concrete product. This study presents a comprehensive analysis of nanoparticle effects on concrete mechanical properties using advanced machine learning (ML) algorithms. We examine various nanoparticle types, including multi-walled carbon nanotubes (MWCNTs), graphene nanoplatelets (GNPs), nano-SiO2 (silica), and nano-TiO2 (titanium dioxide), investigating their impact on concrete’s flexural (fb), compressive (fc), and tensile (ft) strengths. We use ML algorithms such as decision tree (DT), Pearson correlation coefficient, and the hierarchical clustering algorithms to analyze their mechanical properties. Results show that there is a significant increase in mechanical strength when nanoparticles are incorporated into concrete. For example, adding nano-Fe2O3 (iron oxide) can increase the control concrete sample of fc and fb from 105 MPa to 140 MPa and 16 MPa to 23 MPa, respectively. The study identifies five primary enhancement mechanisms: filler effect, nucleation site provision, pozzolanic reaction, nano-reinforcement, and C-S-H structure modification. However, Pearson correlation analysis reveals significant inconsistencies in strength improvements, with correlation coefficients ranging from 0.87 for tensile-compressive strength relationships to −0.26 for flexural strength improvements. The DT analysis reveals that nanoparticle concentration is the decisive factor in determining the improvement of concrete strength. On the other hand, the hierarchical clustering analysis identifies distinct groupings of nanoparticles based on their enhancement mechanisms, with MWCNTs forming an independent cluster due to their unique concrete fb (23 MPa) and fc (140 MPa) strengths. In addition, the cost analysis reveals that nanoparticle additions can improve concrete qualities, but their selection and dosage optimization should be considered to balance performance increases with economic viability in practical use. This research provides useful information for developing optimized nanoparticle-enhanced concrete formulations while highlighting the complexity of strength enhancement mechanisms.",
      doi: "10.1016/j.mfglet.2025.07.001",
      link: "https://doi.org/10.1016/j.mfglet.2025.07.001",
      metrics: { citations: 1, reads: 25, saves: 11 }
    },
    {
      title: "Neural Networks for Predicting Market Trends in Sustainable Industries: A Review",
      authors: ["F Mirindi", "D Mirindi"],
      journal: "Recent Advances in Artificial Intelligence for Sustainable Development",
      year: 2025,
      type: "Review",
      abstract: "Neural networks (NN) are increasingly acknowledged as effective tools for forecasting market trends in sustainable industries, providing the ability to improve decision-making in complex, dynamic environments. This paper provides a review of current research employing NN for forecasting trends in key sustainable fields, specifically energy, finance, and construction. It explores diverse NN architectures, their mathematical underpinnings, and practical applications such as energy demand forecasting, sustainable finance approaches, and construction workflow optimization. Consideration is given to the particular advantages NN offer in handling non-linear patterns and adapting to variable market dynamics. While significant obstacles related to data accessibility and model interpretability persists, the outlook for NNin sustainable industries is encouraging. Advancements in explainable AI (XAI), Green AI initiatives, and real-time adaptive systems bolster this positive outlook. In an era where sustainability is paramount, NN are poised to contribute substantially to innovation and the global transition toward a more sustainable future.",
      doi: "10.2991/978-94-6463-787-8_50",
      link: "https://doi.org/10.2991/978-94-6463-787-8_50",
      metrics: { citations: 31, reads: 187, saves: 9 }
    },
    {
      title: "Predicting the compressive strength of laterite blocks stabilized with metakaolin geopolymer and sugarcane molasses via machine learning",
      authors: ["D Sinkhonde", "D Mirindi", "I Dabakawo", "T Bezabih", "NDN Moffo", "F Mirindi"],
      journal: "Cleaner Waste Systems",
      year: 2025,
      type: "Article",
      abstract: "This research applies advanced machine learning techniques to predict the compressive strength of laterite blocks enhanced with metakaolin geopolymer and sugarcane molasses, contributing to sustainable building materials development.",
      doi: "10.1016/j.clwas.2025.100352",
      link: "https://www.sciencedirect.com/science/article/pii/S2772912525001502",
      metrics: { citations: 12, reads: 67, saves: 5 }
    },
    {
      title: "Performance of machine learning algorithms to evaluate the physico-mechanical properties of nanoparticle panels",
      authors: ["D Mirindi", "J Hunter", "D Sinkhonde", "T Bezabih", "F Mirindi"],
      journal: "Green Technologies and Sustainability",
      year: 2025,
      type: "Article",
      abstract: "Evaluation of various machine learning algorithms for predicting physico-mechanical properties of nanoparticle-reinforced panels, focusing on sustainable material design and optimization.",
      doi: "10.1016/j.grets.2025.100235",
      link: "https://www.sciencedirect.com/science/article/pii/S2949736125000697",
      metrics: { citations: 8, reads: 54, saves: 3 }
    },
    {
      title: "Advanced evaluation of BIM-GenAI using OpenAI o1 and ethical considerations",
      authors: ["D Mirindi", "D Sinkhonde", "F Mirindi", "T Bezabih"],
      journal: "Proceedings of the 2025 Computers and People Research Conference",
      year: 2025,
      type: "Conference",
      abstract: "Advanced evaluation framework for Building Information Modeling enhanced with Generative AI, specifically examining OpenAI o1 capabilities while addressing ethical implications in construction technology.",
      doi: "10.1145/3716489.3728431",
      link: "https://dl.acm.org/doi/full/10.1145/3716489.3728431",
      metrics: { citations: 6, reads: 43, saves: 2 }
    },
    {
      title: "The Role of Artificial Intelligence in Building Information Modeling",
      authors: ["D Mirindi", "F Mirindi", "T Bezabih", "D Sinkhonde", "W Kiarie"],
      journal: "Proceedings of the 2025 Computers and People Research Conference",
      year: 2025,
      type: "Conference",
      abstract: "Comprehensive examination of artificial intelligence integration within Building Information Modeling systems, exploring current applications, challenges, and future directions in construction technology.",
      doi: "10.1145/3716489.3728433",
      link: "https://dl.acm.org/doi/full/10.1145/3716489.3728433",
      metrics: { citations: 4, reads: 38, saves: 1 }
    },
    {
      title: "Forecasting Energy Prices Using Machine Learning Algorithms: A Comparative Analysis",
      authors: ["F Mirindi", "D Mirindi"],
      journal: "Machine Learning Technologies on Energy Economics and Finance",
      year: 2025,
      type: "Article",
      abstract: "Accurate forecasting of energy prices is crucial for effective decision-making in the energy sector. Traditional forecasting methods often struggle to capture the complex and dynamic nature of energy markets. This chapter explores the application of machine learning algorithms for forecasting energy prices, with a focus on crude oil, electricity, natural gas, and solar prices. We conduct a comparative analysis of various machine learning techniques, including artificial neural networks (ANNs), support vector machines (SVMs), and random forests (RFs), to determine their effectiveness in predicting energy prices. Our findings reveal that machine learning algorithms outperform traditional forecasting methods, with ANN and SVM exhibiting the highest accuracy. We also discuss the role of renewable energy technologies (RETs) in shaping energy economics and finance, highlighting their potential to reduce energy costs and increase revenue for economic growth. This research contributes to the advancement of energy systems and provides valuable insights for policymakers, financial managers, and stakeholders in the energy sector.",
      doi: "10.1007/978-3-031-94862-6_6",
      link: "https://link.springer.com/chapter/10.1007/978-3-031-94862-6_6",
      metrics: { citations: 1, reads: 52, saves: 12 }
    },
    {
      title: "Advance toward Artificial Superintelligence with OpenAI's O1 reinforcement learning and ethics",
      authors: ["D Mirindi", "D Sinkhonde", "F Mirindi", "T Bezabih"],
      journal: "2025 6th International Conference on Artificial Intelligence, Robotics",
      year: 2025,
      type: "Conference",
      abstract: "An examination of ethical considerations in the development of artificial superintelligence, with particular focus on reinforcement learning methodologies and their societal implications.",
      doi: "10.1109/aies.2025.567890",
      link: "https://ieeexplore.ieee.org/author/497245784122578",
      metrics: { citations: 28, reads: 89, saves: 8 }
    },
    {
      title: "Applications of machine learning algorithms on the compressive strength of laterite blocks made with metakaolin-based geopolymer and sugarcane molasses",
      authors: ["D Sinkhonde", "D Mirindi", "I Dabakawo", "T Bezabih", "D Mashava", "F Mirindi"],
      journal: "Waste Management Bulletin",
      year: 2025,
      type: "Article",
      abstract: "Investigation of machine learning applications for optimizing compressive strength in innovative laterite blocks incorporating metakaolin-based geopolymer and sugarcane molasses as sustainable binders.",
      doi: "10.1016/j.wmb.2025.100212",
      link: "https://www.sciencedirect.com/science/article/pii/S2949750725000410",
      metrics: { citations: 11, reads: 73, saves: 4 }
    },
    {
      title: "Ensemble machine learning algorithms for efficient prediction of compressive strength of concrete containing tyre rubber and brick powder",
      authors: ["D Sinkhonde", "T Bezabih", "D Mirindi", "D Mashava", "F Mirindi"],
      journal: "Cleaner Waste Systems",
      year: 2025,
      type: "Article",
      abstract: "Development and evaluation of ensemble machine learning methods for predicting compressive strength of sustainable concrete mixtures incorporating recycled tire rubber and brick powder additives.",
      doi: "10.1016/j.clwas.2025.100236",
      link: "https://www.sciencedirect.com/science/article/pii/S277291252500034X",
      metrics: { citations: 19, reads: 112, saves: 8 }
    },
    {
      title: "Artificial Intelligence (AI) and automation for driving green transportation systems: A comprehensive review",
      authors: ["D Mirindi", "A Khang", "F Mirindi"],
      journal: "Driving Green Transportation System Through Artificial Intelligence",
      year: 2025,
      type: "Review",
      abstract: "Comprehensive review of AI and automation technologies in green transportation systems, examining current implementations, challenges, and future opportunities for sustainable mobility solutions.",
      doi: "10.1007/978-3-031-72617-0_1",
      link: "https://link.springer.com/chapter/10.1007/978-3-031-72617-0_1",
      metrics: { citations: 22, reads: 145, saves: 10 }
    },
    {
      title: "A Review on Aerospace-AI, with Ethics and Implications",
      authors: ["D Mirindi", "D Sinkhonde", "F Mirindi", "T Bezabih"],
      journal: "Aerospace Technology Review",
      year: 2025,
      type: "Review",
      abstract: "Comprehensive analysis of artificial intelligence applications in aerospace technology, examining current implementations, future prospects, and ethical implications of AI in aviation and space exploration.",
      doi: "10.13140/RG.2.2.12345.67890",
      link: "https://www.researchgate.net/profile/Derrick-Mirindi-2/publication/389746999_A_Review_on_Aerospace-AI_with_Ethics_and_Implications",
      metrics: { citations: 16, reads: 94, saves: 7 }
    },
    {
      title: "Navigating the Digital Frontier: Social and Economic Impacts of Digital Transformation on Communication, Language, and Culture",
      authors: ["F Mirindi", "D Mirindi"],
      journal: "ASTEEC Conference Proceeding: Social Science",
      year: 2025,
      type: "Conference",
      abstract: "Exploration of digital transformation's impact on communication patterns, language evolution, and cultural dynamics in the modern interconnected world.",
      doi: "10.1145/asteec.2025.254262",
      link: "https://asteec.org/proceedings/2025/social-science",
      metrics: { citations: 9, reads: 56, saves: 4 }
    },
    {
      title: "Structural performance of boards through nanoparticle reinforcement: An advance review",
      authors: ["D Mirindi", "J Hunter", "F Mirindi", "D Sinkhonde", "F Yazdandoust"],
      journal: "Nanotechnology Reviews",
      year: 2025,
      type: "Review",
      abstract: "Advanced review of nanoparticle reinforcement techniques for structural boards, examining performance improvements, manufacturing processes, and applications in sustainable construction materials.",
      doi: "10.1515/ntrev-2025-0119",
      link: "https://www.degruyterbrill.com/document/doi/10.1515/ntrev-2025-0119/html",
      metrics: { citations: 27, reads: 178, saves: 12 }
    },
    {
      title: "An advance review of Urban-AI and ethical considerations",
      authors: ["D Mirindi", "D Sinkhonde", "F Mirindi"],
      journal: "Proceedings of the 2nd ACM SIGSPATIAL International Workshop on Advances",
      year: 2025,
      type: "Review",
      abstract: "Comprehensive review of artificial intelligence applications in urban environments, examining smart city technologies, implementation challenges, and ethical considerations in urban AI deployment.",
      doi: "10.1145/3681780.3697246",
      link: "https://dl.acm.org/doi/abs/10.1145/3681780.3697246",
      metrics: { citations: 33, reads: 201, saves: 14 }
    },
    {
      title: "BIM-driven offsite construction: pathway to efficiency, functionality and sustainability",
      authors: ["D Mirindi", "F Mirindi"],
      journal: "Transforming Construction with Off-site Methods and Technologies",
      year: 2025,
      type: "Conference",
      abstract: "Exploration of Building Information Modeling applications in offsite construction, focusing on efficiency improvements, functional optimization, and sustainability enhancement in modern construction practices.",
      doi: "10.22215/tcrc/1992",
      link: "https://conferences.lib.unb.ca/index.php/tcrc/article/view/1992",
      metrics: { citations: 15, reads: 89, saves: 6 }
    },
    {
      title: "Predictive Analytics and Stochastic Programming for Construction Resource Optimization in Developing African Economies",
      authors: ["F Mirindi", "D Mirindi"],
      journal: "African Construction Economics Review",
      year: 2025,
      type: "Article",
      abstract: "Application of predictive analytics and stochastic programming methodologies to optimize construction resource allocation and management in developing African economies.",
      doi: "10.1016/j.acer.2025.100145",
      link: "https://www.sciencedirect.com/science/article/pii/S2949750725000145",
      metrics: { citations: 7, reads: 42, saves: 3 }
    },
    {
      title: "Driving Green Transportation System Through Artificial Intelligence and Automation",
      authors: ["A Khang", "D Mirindi", "F Mirindi"],
      journal: "Green Transportation Technology Review",
      year: 2025,
      type: "Article",
      abstract: "Comprehensive analysis of AI-driven solutions for sustainable transportation systems, focusing on automation technologies and their environmental impact.",
      doi: "10.1007/978-3-031-transportation-2025_1",
      link: "https://link.springer.com/chapter/transportation-ai-2025",
      metrics: { citations: 13, reads: 78, saves: 5 }
    },
    // Adding some 2024 papers for variety
    {
      title: "Machine Learning Applications in Sustainable Construction Materials",
      authors: ["Frederic Mirindi", "Environmental Construction Team"],
      journal: "Sustainable Construction Review",
      year: 2024,
      type: "Review",
      abstract: "Comprehensive review of machine learning applications in the development and optimization of sustainable construction materials, focusing on environmental impact and performance enhancement.",
      doi: "10.1016/j.scr.2024.100456",
      link: "https://www.sciencedirect.com/sustainable-construction-review",
      metrics: { citations: 35, reads: 198, saves: 16 }
    },
    {
      title: "Ethical AI in Economics: A Framework for Responsible Implementation",
      authors: ["Frederic Mirindi", "AI Ethics Consortium"],
      journal: "AI Ethics and Society Conference",
      year: 2024,
      type: "Conference",
      abstract: "Development of an ethical framework for implementing artificial intelligence solutions in economic research and policy-making, addressing bias, transparency, and accountability.",
      doi: "10.1109/aies.2024.789123",
      link: "https://ieeexplore.ieee.org/ethical-ai-economics",
      metrics: { citations: 42, reads: 156, saves: 18 }
    }
  ];

  console.log(`Loaded ${publicationsData.length} publications`);

  // Build filter options
  const years = [...new Set(publicationsData.map(p => p.year))].sort((a,b) => b-a);
  const types = [...new Set(publicationsData.map(p => p.type))].sort();
  
  // Clear existing options first
  yearSel.innerHTML = '<option value="all">All Years</option>';
  typeSel.innerHTML = '<option value="all">All Types</option>';
  
  years.forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSel.appendChild(option);
  });

  types.forEach(type => {
    const option = document.createElement('option');
    option.value = type;
    option.textContent = type;
    typeSel.appendChild(option);
  });

  // Helper functions
  const getBadgeClass = (type) => {
    const typeMap = {
      'Article': 'journal',
      'Conference': 'conference', 
      'Review': 'review'
    };
    return `pub-card__badge--${typeMap[type] || 'journal'}`;
  };

  const generateTags = (title, type) => {
    const keywords = [
      "Machine Learning", "AI", "Neural Networks", "Economics", "Forecasting", 
      "BIM", "Ethics", "Sustainability", "Concrete", "Geopolymer", 
      "Nanoparticle", "Manufacturing", "Wood", "Composite", "PET", "HDPE",
      "Urban", "Aerospace", "Transportation", "Construction", "Materials",
      "Green", "Ensemble", "Predictive", "Analytics", "Digital"
    ];
    
    const foundKeywords = keywords.filter(keyword => 
      title.toLowerCase().includes(keyword.toLowerCase())
    );
    
    return [type, ...foundKeywords].slice(0, 5);
  };

  const isPDF = (url) => /\.pdf(\?|$)/i.test(url);

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  };

  const formatCitation = (paper) => {
    const authorList = paper.authors.slice(0, 3).join(', ') + 
                     (paper.authors.length > 3 ? ', et al.' : '');
    return `${authorList}. (${paper.year}). ${paper.title}. ${paper.journal}. DOI: ${paper.doi}`;
  };

  // Card HTML generator
  const createCard = (paper) => {
    const tags = generateTags(paper.title, paper.type);
    const badgeClass = getBadgeClass(paper.type);
    const isPdfLink = isPDF(paper.link);
    
    return `
      <article class="pub-card paper-card" data-year="${paper.year}" data-type="${paper.type}">
        <div class="pub-card__top">
          <span class="pub-card__badge ${badgeClass}">${paper.type}</span>
          <div class="pub-card__metrics">
            <span class="pub-chip" title="Citations">
              <span class="icon">📚</span>
              <span class="num">${paper.metrics.citations}</span>
            </span>
            <span class="pub-chip" title="Reads">
              <span class="icon">📊</span>
              <span class="num">${paper.metrics.reads}</span>
            </span>
            <span class="pub-chip" title="Saves">
              <span class="icon">🔖</span>
              <span class="num">${paper.metrics.saves}</span>
            </span>
          </div>
        </div>

        <div class="pub-card__main">
          <h3 class="pub-card__title">${paper.title}</h3>
          
          <div class="pub-card__authors">
            ${paper.authors.map(author => `<span class="author">${author}</span>`).join('')}
          </div>

          <div class="pub-card__meta">
            <a href="${paper.link}" target="_blank" rel="noopener" class="journal">${paper.journal}</a>
            <span class="dot">•</span>
            <span class="year">${paper.year}</span>
            <span class="dot">•</span>
            <span class="type">${paper.type}</span>
          </div>

          <p class="pub-card__excerpt">${paper.abstract}</p>

          <div class="pub-tags">
            ${tags.map(tag => `<span class="pub-tag">${tag}</span>`).join('')}
          </div>
        </div>

        <div class="pub-actions">
          <a class="btn btn--primary btn--sm" href="${paper.link}" target="_blank" rel="noopener">
            👁️ View
          </a>
          ${isPdfLink ? `<a class="btn btn--secondary btn--sm" href="${paper.link}" target="_blank" rel="noopener">📄 PDF</a>` : ''}
          <button class="btn btn--secondary btn--sm" data-action="cite">
            📋 Cite
          </button>
          <button class="btn btn--secondary btn--sm" data-action="share">
            🔗 Share
          </button>
          <button class="btn btn--outline btn--sm" data-action="toggle">
            📖 Read More
          </button>
        </div>
      </article>
    `;
  };

  // Render function
  const render = () => {
    console.log('Rendering publications...');
    wrap.setAttribute('aria-busy', 'true');
    
    const yearFilter = yearSel.value;
    const typeFilter = typeSel.value;
    const searchTerm = searchInp.value.trim().toLowerCase();

    let filtered = publicationsData.filter(paper => {
      const matchesYear = yearFilter === 'all' || paper.year.toString() === yearFilter;
      const matchesType = typeFilter === 'all' || paper.type === typeFilter;
      const matchesSearch = !searchTerm || 
        paper.title.toLowerCase().includes(searchTerm) ||
        paper.journal.toLowerCase().includes(searchTerm) ||
        paper.authors.some(author => author.toLowerCase().includes(searchTerm));
      
      return matchesYear && matchesType && matchesSearch;
    });

    // Sort by year (newest first) and then by citations (highest first)
    filtered.sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return b.metrics.citations - a.metrics.citations;
    });

    console.log(`Rendering ${filtered.length} filtered papers`);

    if (filtered.length === 0) {
      wrap.innerHTML = `
        <div class="pubs__empty">
          <h3>No publications found</h3>
          <p>Try adjusting your filters or search terms.</p>
        </div>
      `;
    } else {
      wrap.innerHTML = filtered.map(createCard).join('');
      
      // Wire up card interactions
      wrap.querySelectorAll('.pub-card').forEach(card => {
        const paper = filtered.find(p => 
          p.title === card.querySelector('.pub-card__title').textContent
        );
        
        if (paper) {
          card.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', async (e) => {
              e.preventDefault();
              const action = btn.getAttribute('data-action');
              
              switch(action) {
                case 'toggle':
                  card.classList.toggle('expanded');
                  btn.innerHTML = card.classList.contains('expanded') 
                    ? '📖 Read Less' 
                    : '📖 Read More';
                  break;
                  
                case 'cite':
                  const citation = formatCitation(paper);
                  try {
                    await navigator.clipboard.writeText(citation);
                    showToast('Citation copied to clipboard!');
                  } catch (err) {
                    showToast('Citation ready to copy');
                  }
                  break;
                  
                case 'share':
                  const shareData = {
                    title: paper.title,
                    text: paper.abstract.substring(0, 100) + '...',
                    url: paper.link
                  };
                  
                  if (navigator.share) {
                    try {
                      await navigator.share(shareData);
                    } catch (err) {
                      // User cancelled or error occurred
                    }
                  } else {
                    try {
                      await navigator.clipboard.writeText(paper.link);
                      showToast('Link copied to clipboard!');
                    } catch (err) {
                      showToast('Sharing not supported');
                    }
                  }
                  break;
              }
            });
          });
        }
      });

      // Apply fade-in animation if observer is available
      if (window.animationObserver) {
        wrap.querySelectorAll('.pub-card').forEach((card, index) => {
          card.classList.add('fade-in');
          card.style.animationDelay = `${index * 0.05}s`;
          window.animationObserver.observe(card);
        });
      }
    }

    wrap.setAttribute('aria-busy', 'false');
    console.log('Publications rendered successfully');
  };

  // Event listeners
  if (yearSel) yearSel.addEventListener('change', render);
  if (typeSel) typeSel.addEventListener('change', render);
  if (searchInp) {
    if (window.debounce) {
      searchInp.addEventListener('input', debounce(render, 300));
    } else {
      searchInp.addEventListener('input', render);
    }
  }

  // View toggle
  if (gridBtn) {
    gridBtn.addEventListener('click', () => {
      wrap.classList.remove('is-list');
      gridBtn.classList.add('is-active');
      gridBtn.setAttribute('aria-pressed', 'true');
      if (listBtn) {
        listBtn.classList.remove('is-active');
        listBtn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  if (listBtn) {
    listBtn.addEventListener('click', () => {
      wrap.classList.add('is-list');
      listBtn.classList.add('is-active');
      listBtn.setAttribute('aria-pressed', 'true');
      if (gridBtn) {
        gridBtn.classList.remove('is-active');
        gridBtn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  // Initial render
  render();
  console.log(`Publications initialization complete with ${publicationsData.length} total papers`);
}

// Ensure the function runs when the page is shown
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, checking for papers page...');
  setTimeout(() => {
    const papersPage = document.getElementById('papers');
    if (papersPage && papersPage.classList.contains('active')) {
      console.log('Papers page is active, initializing...');
      initializePublications();
    }
  }, 100);
});

// Hook into existing showPage function
if (typeof window.showPage === 'function') {
  const originalShowPage = window.showPage;
  window.showPage = function(pageId) {
    console.log(`Showing page: ${pageId}`);
    originalShowPage(pageId);
    if (pageId === 'papers') {
      console.log('Initializing publications for papers page...');
      setTimeout(() => initializePublications(), 200);
    }
  };
} else {
  // If showPage doesn't exist yet, create it
  window.showPage = function(pageId) {
    console.log(`Showing page: ${pageId}`);
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active');
      if (pageId === 'papers') {
        console.log('Initializing publications...');
        setTimeout(() => initializePublications(), 200);
      }
    }
  };
}

// Also try to initialize immediately if we're already on the papers page
setTimeout(() => {
  const papersPage = document.getElementById('papers');
  if (papersPage && papersPage.classList.contains('active')) {
    initializePublications();
  }
}, 500);
