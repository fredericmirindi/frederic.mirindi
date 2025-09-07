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
      abstract: "In domains such as the construction industry, predicting the compressive strength of laterized blocks is crucial for building trust in their results. Poor material properties can result in reduced strength, durability, and structural integrity of buildings and can have even life-threatening consequences for building occupants. Machine learning (ML) algorithms can provide predictive abilities for compressive strength of laterized blocks, thereby improving confidence in their use in buildings. This research aims to predict the compressive strength of laterite blocks stabilized with metakaolin-based geopolymer (MKG) and sugarcane molasses (SM) using gradient boosting regression (GBR), multi-layer perceptron (MLP), k-means clustering, and AdaBoost models. The correlation matrix results show that stabilized compressed earth block (CEB)'s age has the strongest correlation with compressive strength (R = 0.83) based on its highly meaningful relationship (p < 0.001). The research establishes the credibility of the ML algorithms during the training phase through R-squared values higher than 0.93 for GBR, MLP, k-means clustering, and AdaBoost models. However, the R-squared values during the testing phase are less than 0.68 for all the models. The Taylor diagram analysis indicates that the GBR model is the best-performing model, while the k-means clustering model emerges as the lowest-performing model during the training phase. Based on mean SHapley Additive exPlanations (SHAP) analysis values, age emerges as the most significant variable in influencing the compressive strength of laterite blocks stabilized with MKG and SM mixtures. Moreover, water, MKG, and SM have also emerged as influential variables in the order of decreasing influence. This research therefore lays a foundation and contributes to the widespread applications of laterite blocks stabilized with MKG and SM mixtures in sustainable construction.",
      doi: "10.1016/j.clwas.2025.100352",
      link: "https://doi.org/10.1016/j.clwas.2025.100352",
      metrics: { citations: 4, reads: 67, saves: 5 }
    },
    {
      title: "Performance of machine learning algorithms to evaluate the physico-mechanical properties of nanoparticle panels",
      authors: ["D Mirindi", "J Hunter", "D Sinkhonde", "T Bezabih", "F Mirindi"],
      journal: "Green Technologies and Sustainability",
      year: 2025,
      type: "Article",
      abstract: "Nanoparticles significantly enhance the properties of wood-based materials, especially particleboards and wood panels. This review analyzes secondary data on nanoparticle integration in board production, aiming to evaluate the relationships among physical (water absorption (WA) and thickness swelling (TS)) and mechanical (modulus of rupture (MOR), modulus of elasticity (MOE); and internal bond (IB) strength) properties and to predict performance using machine learning (ML) algorithms. These algorithms include Pearson correlation, hierarchical clustering, and decision tree (DT) models. Results indicate that nanoparticles such as graphene oxide (GO), reduced graphene oxide (rGO), hydrolysis lignin, and calcium carbonate improve mechanical properties, with MOR values of 27.38–52.65 MPa and MOE of 2591.6–4680 MPa, meeting EN312 load-bearing standards. Zinc oxide nanoparticles yield superior dimensional stability by achieving a low TS of 9.33%. However, according to the American National Standard for Particleboard (ANSI/A208.1-1999), most nanoparticle boards produced met general-purpose standards except for WA and TS, which exceeded the maximum limits of 8% and 3%, respectively. Only crosslinked chitosan and zinc oxide nanoparticle panels meet the minimum requirements for TS (17%) and the maximum MOR (11.00 MPa) and MOE (1,800.00 MPa) for general purposes in dry conditions (furniture and interior fitments) according to the Brazilian standard (ABNT NBR). The Pearson correlation analysis reveals a strong relationship between board properties (R = 0.94 for WA–TS; R = 0.93 for MOR–MOE), confirming that nanoparticle treatments enhance performance while maintaining inherent material behavior. Hierarchical clustering grouped nanoparticles by performance: zinc oxide and chitosan+UF+epoxy formed a cluster with the lowest WA and TS, indicating optimal dimensional stability, while GO, rGO, and chitosan-based composites clustered with moderate values. For mechanical properties, APTES-modified nanocellulose, aluminum oxide, and zinc oxide formed a high-performance cluster (high MOR, MOE, IB). DT algorithms demonstrated high predictive accuracy (R for WA-TS, 0.96 for MOR-MOE, and 0.80 for IB-MOE), identifying critical thresholds: WA below 29.73% corresponded to minimal TS (9.94%), MOR above 38.18 MPa led to MOE above 3598.86 MPa, and IB above 0.88 MPa corresponds to MOE greater than 2,747.99 MPa. This data-driven framework enables targeted nanoparticle selection to fabricate engineered wood products and can be included in industry quality control standards to advance sustainable material development through ML-guided optimization.",
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
      abstract: "The rapid advancement of artificial intelligence (AI) has led the AI community to speculate that artificial superintelligence (ASI) may be within reach, particularly if an AI system can iteratively search for solutions, learn from results, and leverage improved knowledge for more searches. In this context, this study explores the integration of Generative Artificial Intelligence (GenAI) into Building Information Modeling (BIM) by focusing on the four key pillars of the OpenAI o1 model and their ethical implications. Through comprehensive analysis of existing literature, we examine these pillars—policy initialization, reward design, search strategies, and learning mechanisms—and their application in BIM-GenAI within a continuous improvement cycle. Results demonstrate that policy initialization generates human-like reasoning behaviors and domain-specific knowledge for BIM tasks. Reward design, central to reinforcement learning, optimizes BIM objectives through measurable metrics and learned evaluation methods. Search strategies prove valuable for exploring complex design spaces and generating high-quality BIM solutions, while learning mechanisms, including policy gradient and behavior cloning, enable continuous model improvement through feedback. The study emphasizes the importance of establishing BIM-AI protocols, maintaining human expertise in decision-making, and balancing automation with human input. Our findings suggest that while GenAI, powered by reinforcement learning, offers significant potential for enhancing BIM capabilities, three critical ethical considerations—data privacy and security, algorithmic bias mitigation, and transparency and accountability—must guide responsible implementation. This research contributes to the growing body of knowledge on AI in construction technologies and provides a foundation for the ethical advancement of BIM-GenAI systems using OpenAI o1.",
      doi: "10.1145/3716489.3728431",
      link: "https://doi.org/10.1145/3716489.3728431",
      metrics: { citations: 6, reads: 43, saves: 2 }
    },
    {
      title: "Review: The Role of Artificial Intelligence in Building Information Modeling",
      authors: ["D Mirindi", "F Mirindi", "T Bezabih", "D Sinkhonde", "W Kiarie"],
      journal: "Proceedings of the 2025 Computers and People Research Conference",
      year: 2025,
      type: "Conference",
      abstract: "The integration of Artificial Intelligence (AI) and Building Information Modeling (BIM) represents a paradigm shift in the architecture, engineering, and construction (AEC) industry. This change revolutionizes how buildings are designed, constructed, and managed throughout their lifecycle. Using secondary data, this research aims to evaluate the current advances in the role of AI in BIM, emphasizing leveraging AI to improve organizational performance, decision-making, and project delivery. Based on the four classifications of AI systems which are Reactive AI, Limited Memory AI, Theory of Mind AI, and Self-Aware AI, this study analyzed the prospects of BIM applications. Results show that AI in BIM applications offers capabilities across domains such as generative design, predictive maintenance, energy optimization, automated code compliance, clash detection, construction simulation, sustainability analysis, project risk assessment, facility management, and natural language processing. The research also presents major issues arising from the integration of AI in a BIM setting, including Interoperability problems, Data management problems, and Technological resistance problems. Based on the evaluation of the current status and challenges associated with AI integration, this work expects to offer practical recommendations for the stakeholders interested in implementing AI technologies within their BIM projects. In addition, the research reveals new directions in integrating AI into BIM, including digital twins and generative design that will likely transform the project lifecycle. This research fills the gap in the current literature by exploring the AI limitations and opportunities in BIM environments and thereby provides insights into the application of these technologies to enhance innovation and sustainability in construction. Finally, this research provides a basis for new and more rational approaches to construction that would meet the needs of contemporary society.",
      doi: "10.1145/3716489.3728433",
      link: "https://doi.org/10.1145/3716489.3728433",
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
      abstract: "We acknowledge why the larger AI community believes that superintelligence is not far away if an artificial intelligence (AI) can search for answers, learn from its findings, and apply that improved knowledge to conduct even better searches in the future. This study aims to assess OpenAI O1's reinforcement learning framework and its potential implications for superintelligence by examining its four fundamental pillars: policy initialization, reward design, search mechanisms, and learning processes. We examine how O1's architecture implements elaborate methods such as Process Reward Modeling (PRM) and advanced search strategies using recent developments in AI technology, with a particular focus on the transition from artificial narrow intelligence (ANI) to artificial superintelligence (ASI) and the emergence of hybrid artificial intelligence (HAI). Our method involves examining the types of AI, using recent research on OpenAI O1 reinforcement learning and elaborate ethical considerations. Key findings demonstrate the superiority of PRM over traditional Outcome Reward Modeling (ORM) in providing granular feedback for learning optimization. In addition, the advance toward ASI emphasizes the critical importance of ethical considerations. This includes safety protocols, transparency requirements, and human-aligned development practices in advancing toward superintelligence. This study contributes to the understanding of how advanced AI systems can be developed responsibly while ensuring progress toward superintelligence remains beneficial to humanity. Future research directions should focus on enhancing the integration of ethical frameworks within the reinforcement learning system.",
      doi: "10.1109/AIRC64931.2025.11077494",
      link: "https://doi.org/10.1109/AIRC64931.2025.11077494",
      metrics: { citations: 4, reads: 89, saves: 8 }
    },
    {
      title: "Applications of machine learning algorithms on the compressive strength of laterite blocks made with metakaolin-based geopolymer and sugarcane molasses",
      authors: ["D Sinkhonde", "D Mirindi", "I Dabakawo", "T Bezabih", "D Mashava", "F Mirindi"],
      journal: "Waste Management Bulletin",
      year: 2025,
      type: "Article",
      abstract: "To refine the process of anticipating the structural integrity of laterite block components, the use of machine learning (ML) algorithms is required. This study initiates an exploration into forecasting the compressive strength of laterite blocks infused with metakaolin-based geopolymer (MKG) and sugarcane molasses (SM), utilizing machine learning techniques such as artificial neural networks (ANN), random forests (RF), decision trees (DT), and support vector machines (SVM). The models were developed using four input values, including the MKG, SM, laterite soil, and water, with compressive strength as the output. Results show that for all the models, the majority of the data points lie within the error lines range of −20 % and +20 %. Using the Taylor diagram model, the results demonstrate that the SVM (train) model achieves the highest performance in predicting the compressive strength of laterite blocks, with a correlation coefficient of 0.99 and the lowest root mean square error (RMSE) of 0.139. The correlation coefficient values (R) for training and testing algorithm models ranged between 0.65 and 0.99, implying that all models fairly predict the compressive strength of laterite blocks containing MKG and SM. The RF model emerges as an important model for generalization across training and testing phases, with R values of 0.9828 and 0.789, respectively. SHapley Additive exPlanations (SHAP) analysis assesses the model’s explainability behavior. According to a SHAP-based feature importance study, age (85.33 %) and water content (17.87 %) are critical components that may improve compressive strength compared to MKG (8.60 %) and SM (6.74 %), respectively. This study not only assists in comprehending the essential parameters necessary for making well-informed decisions but also opens exciting possibilities for the application of ML in fostering sustainable construction practices.",
      doi: "10.1016/j.wmb.2025.100212",
      link: "https://www.sciencedirect.com/science/article/pii/S2949750725000410",
      metrics: { citations: 4, reads: 73, saves: 4 }
    },
    {
      title: "Ensemble machine learning algorithms for efficient prediction of compressive strength of concrete containing tyre rubber and brick powder",
      authors: ["D Sinkhonde", "T Bezabih", "D Mirindi", "D Mashava", "F Mirindi"],
      journal: "Cleaner Waste Systems",
      year: 2025,
      type: "Article",
      abstract: "In order to increase the efficiency of predicting concrete compressive strength, ensemble machine learning (ML) algorithms are required. Considering that each ML algorithm continuously varies in methodology, one ML algorithm cannot generate exhaustive prediction results since limited parameters are available to tune. This research serves as a beginning step towards predicting the compressive strength of concrete containing waste tyre rubber (WTR) and clay brick powder (CBP) using artificial neural network (ANN), random forest (RF), decision tree (DT) and support vector machine (SVM) algorithms. Taylor diagram model analysis shows that when the four algorithms are compared, the SVM (train) model demonstrates the highest performance in predicting the compressive strength of concrete containing CBP and WTR. The R2 values ranging from 0.60 – 0.97 imply that all the models fairly predict the compressive strength of concrete containing CBP and WTR. The same predictive abilities are demonstrated by the clustering of the data points for train and test models around the y = x line. It is shown that the majority of the data points lie within the error lines range of −20 and + 20 %. The SHapley Additive exPlanations (SHAP) analysis reveals that WTR has the highest impact on model predictions with a mean SHAP value of 3.83, while cement shows a moderate influence with a mean SHAP value of 0.77. Moreover, these findings suggest that WTR content is the most critical factor in controlling the concrete's compressive strength, while cement content plays a supporting role in the mixture design. Since the prediction behaviour of concrete using ML models is governed by the replacement levels of CBP and WTR, the models used in this study can be extended to the concrete mixes containing other waste materials.",
      doi: "10.1016/j.clwas.2025.100236",
      link: "https://doi.org/10.1016/j.clwas.2025.100236",
      metrics: { citations: 6, reads: 112, saves: 8 }
    },
    {
      title: "Artificial Intelligence (AI) and automation for driving green transportation systems: A comprehensive review",
      authors: ["D Mirindi", "A Khang", "F Mirindi"],
      journal: "Driving Green Transportation System Through Artificial Intelligence",
      year: 2025,
      type: "Review",
      abstract: "Comprehensive review of AI and automation technologies in green transportation systems, examining current implementations, challenges, and future opportunities for sustainable mobility solutions.",
      doi: "10.1007/978-3-031-72617-0_1",
      link: "https://doi.org/10.1007/978-3-031-72617-0_1",
      metrics: { citations: 10, reads: 145, saves: 10 }
    },
    {
      title: "A Review on Aerospace-AI, with Ethics and Implications",
      authors: ["D Mirindi", "D Sinkhonde", "F Mirindi", "T Bezabih"],
      journal: "Aerospace Technology Review",
      year: 2025,
      type: "Review",
      abstract: "The rapid advancement of aerospace technology, coupled with the exponential growth in available data, has catalyzed the integration of artificial intelligence (AI) across the aerospace sector. This comprehensive review examines the state-of-the-art applications of AI, machine learning (ML), deep learning (DL), and generative artificial intelligence (GenAI) in aerospace. Our analysis reveals that ML algorithms demonstrate remarkable capabilities: Random forest (RF) algorithm achieves precision within 10 meters for trajectory prediction, while support vector machines (SVMs) algorithms show 99.89% accuracy in aircraft fault detection. Decision trees (DTs) algorithms excel in aircraft system diagnostics with adaptive learning capabilities. In the realm of deep learning, convolutional neural networks (CNNs) algorithms achieve 79% accuracy in satellite component detection and structural inspection, while recurrent neural networks (RNNs) algorithms and Long Short-Term Memory (LSTM) networks demonstrate superior performance in 4D trajectory prediction and engine health monitoring. GenAI, particularly through Generative adversarial networks (GANs), has revolutionized airfoil design optimization, achieving less than 1% error in profile fitting and 10% error in aerodynamic stealth characteristics. However, these algorithms face scalability challenges when processing large-scale datasets in real-time applications, particularly in mission-critical scenarios. Our research also identifies four ethical considerations, including bias prevention in automated systems, transparency in decision-making processes, privacy protection in data handling, and the implementation of important safety protocols. This study provides a foundation for understanding the current landscape of aerospace-AI integration while highlighting the importance of addressing ethical implications in future developments. The successful implementation of these technologies will require continuous innovation in validation methodologies, establish universal ethical considerations standard, and enhanced community engagement through citizen science initiatives to involve stakeholders.",
      doi: "10.11648/j.jccee.20251002.12",
      link: "https://www.sciencepublishinggroup.com/article/10.11648/j.jccee.20251002.12",
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
      abstract: "Under the turbulence of global change, the production of boards has been influenced by the rising demand and price of wood-based materials. To improve the structural performance of boards, reinforcement materials have been added, such as nanoparticles. The purpose of this review is to explore the application of nanomaterials, including nano-SiO2, nano-Al2O3, nano-ZnO, nano-Fe2O3, nano-cellulose, nano-lignin, and nano-chitosan, to evaluate the physical and mechanical properties of particleboards. These nanoparticles have demonstrated their ability to reduce formaldehyde emissions, enhance the dimensional stability, bending strength, bending stiffness, fire resistance, and resistance to thermal conductivity in board production. For example, the addition of nano-SiO2, known for its hydrophilicity, attracts and holds water molecules and acts as a thermal barrier due to its high melting point and low thermal conductivity. In contrast, nano-Al2O3 is known for its high compressive strength (up to 3 GPa), hardness strength (9 Mohs scale), and high thermal conductivity, which helps to dissipate heat more effectively. This comprehensive evaluation brings together recent advances in producing particleboards and medium density fiberboard reinforced with nanoparticles, which are essential for future research and industry applications. The study emphasizes how innovative nanoparticles can contribute to sustainable urban development and construction practices, reduce deforestation, preserve natural habitats, and provide affordable housing. The research indicates that nanoparticle boards meet (e.g., nanoclay and nanoalumina panels) and in some cases exceed the minimum requirement for general-purpose panels set standards such as the ANSI/A208.1-1999, including water absorption of 8%, thickness swelling of 3% and EN 312 for the bending strength (15–16 MPa) and bending stiffness (2.2–2.4 GPa) for P4 and P6 boards, respectively. These results support the transformative power of nanomaterials in promoting a more sustainable and future solution for boards in the building construction industry.",
      doi: "10.1515/ntrev-2025-0119",
      link: "https://www.degruyterbrill.com/document/doi/10.1515/ntrev-2025-0119/html",
      metrics: { citations: 2, reads: 178, saves: 12 }
    },
    {
      title: "An advance review of Urban-AI and ethical considerations",
      authors: ["D Mirindi", "D Sinkhonde", "F Mirindi"],
      journal: "Proceedings of the 2nd ACM SIGSPATIAL International Workshop on Advances",
      year: 2025,
      type: "Review",
      abstract: "Comprehensive review of artificial intelligence applications in urban environments, examining smart city technologies, implementation challenges, and ethical considerations in urban AI deployment.",
      doi: "10.1515/ntrev-2024-0119",
      link: "https://doi.org/10.1515/ntrev-2024-0119",
      metrics: { citations: 3, reads: 201, saves: 14 }
    },
    {
      title: "BIM-driven offsite construction: pathway to efficiency, functionality and sustainability",
      authors: ["D Mirindi", "F Mirindi"],
      journal: "Transforming Construction with Off-site Methods and Technologies",
      year: 2025,
      type: "Conference",
      abstract: "In the fast-paced world of construction, Building Information Modeling (BIM) is revolutionizing offsite construction, leading to significant improvements in efficiency, functionality, and sustainability. This study examines BIM's critical role in enhancing offsite construction, aiming to showcase its potential to transform construction practices towards better efficiency and environmental care. By analyzing data from observations, discussions, and digital sources, the research investigates BIM's impact on offsite construction. The findings reveal BIM's key role in addressing traditional offsite construction challenges, with examples like Autodesk Revit enhancing 3D modeling, Open Studio reducing energy modeling errors, and ArchiCAD optimizing design processes. Also, Autodesk Insight speeds up project completion through energy analysis, and Flixo promotes collaboration with thermal bridge analysis. These tools, including WUFI for moisture and sustainability analysis, highlight BIM's ability to tackle ecological issues. Additionally, the integration of AI in ArchiCAD and SketchUp further advances rendering capabilities. The study concludes that BIM is essential for achieving top efficiency, functionality, and sustainability in offsite construction. It urges stakeholders to embrace BIM fully, leading to a shift towards more sustainable and efficient construction methods. Recommendations based on results include investing in BIM development and promoting its widespread adoption. Future research should assess BIM's quantitative and qualitative impact, explore its accessibility, and investigate its long-term sustainability effects.",
      doi: "10.22215/tcrc/1992",
      link: "https://conferences.lib.unb.ca/tcrc/article/view/1992/1314",
      metrics: { citations: 5, reads: 89, saves: 6 }
    },
    {
      title: "Predictive Analytics and Stochastic Programming for Construction Resource Optimization in Developing African Economies",
      authors: ["F Mirindi", "D Mirindi"],
      journal: "African Construction Economics Review",
      year: 2025,
      type: "Article",
      abstract: "AThis research investigates the application of AI-driven predictive models for optimizing resource allocation and mitigating economic risks in large-scale construction projects across developing African economies. Through the development of sophisticated mathematical frameworks, including linear programming for resource optimization, multivariate failure prediction models, and stochastic programming for supply chain management, we present a comprehensive approach to addressing the complex challenges facing the African construction sector. The study demonstrates significant improvements in project outcomes, with the predictive maintenance model achieving 91.5% accuracy in equipment failure prediction and the cost estimation framework explaining 81.3% of cost variance. However, implementation challenges including data scarcity, infrastructure limitations, and the need for local expertise development must be carefully addressed. The research provides valuable insights for construction project managers, policymakers, and researchers, contributing to more efficient and sustainable infrastructure development across Africa.",
      doi: "10.5281/zenodo.17011408",
      link: "http://dx.doi.org/10.5281/zenodo.17011408",
      metrics: { citations: 7, reads: 42, saves: 3 }
    },
    {
      title: "Driving Green Transportation System Through Artificial Intelligence and Automation",
      authors: ["A Khang", "D Mirindi", "F Mirindi"],
      journal: "Green Transportation Technology Review",
      year: 2025,
      type: "Article",
      abstract: "This book is designed to help transportation professionals and construction experts to develop and implement successful smart systems, leveraging the current trends, equipment, and advanced technologies to drive the green transportation system development. Artificial intelligence (AI) is a new direction that has opened a revolution in technology and smart applications, and it is also the basis for creating a green environment in the net-zero era. Therefore, machines, devices, self-driving car, and robots controlled by artificial intelligence-based systems are now the model of a smart transportation ecosystem for which all these technologies are referred to as "green" industries. In past years, the idea of making a green environment has been existing and moving on the society 5.0 being as a country strategy, and today, AI technology continues its development on this prototype. Nowadays, AI has begun actions to resemble a person in a real sense, and the idea of human-liked robotics put forward by scientists has started to be realized and will probably complete its development as living machines in the near future. AI has many subsystems and application in various industries, some of which have automation more accurately and are more integrated in modern industries.  This book also targets a mixed audience of specialists, analysts, engineers, scholars, researchers, academics, professionals, and students from different communities to share and contribute new ideas, methodologies, technologies, approaches, models, frameworks, theories, and practices to resolve the challenging issues associated with the leveraging of AI and Industrial Internet of Things (IIoT) in green transportation ecosystem.",
      doi: "10.1007/978-3-031-72617-0",
      link: "https://link.springer.com/book/10.1007/978-3-031-72617-0",
      metrics: { citations: 13, reads: 78, saves: 5 }
    },
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
