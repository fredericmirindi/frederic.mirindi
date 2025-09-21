/* =====================================================
   RESEARCH WIDGETS - INTERACTIVE FUNCTIONALITY
   Enhanced AI-Economics Research Demonstrations
   ===================================================== */

// Global variables for charts and data
let forecastChart = null;
const economicData = {
    gdp: [2.1, 2.3, 2.8, 3.1, 2.9, 2.7],
    inflation: [3.2, 3.1, 3.0, 2.9, 3.1, 3.2],
    unemployment: [3.7, 3.6, 3.5, 3.4, 3.5, 3.6]
};

// Initialize Research Widgets when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeResearchWidgets();
});

function initializeResearchWidgets() {
    // Only initialize if we're on the research page or if research widgets exist
    if (document.getElementById('forecast-chart')) {
        initializeForecastingWidget();
        initializePolicyWidget();
        initializeNLPWidget();
    }
}

/* =====================================================
   1. AI-POWERED ECONOMIC FORECASTING WIDGET
   ===================================================== */

function initializeForecastingWidget() {
    // Initialize the forecast chart
    createForecastChart();
    
    // Event listeners
    const runForecastBtn = document.getElementById('run-forecast');
    const timeframeSelect = document.getElementById('forecast-timeframe');
    
    if (runForecastBtn) {
        runForecastBtn.addEventListener('click', runForecastAnalysis);
    }
    
    if (timeframeSelect) {
        timeframeSelect.addEventListener('change', updateForecastTimeframe);
    }
    
    // Auto-update forecast metrics every 30 seconds
    setInterval(updateForecastMetrics, 30000);
}

function createForecastChart() {
    const ctx = document.getElementById('forecast-chart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (forecastChart) {
        forecastChart.destroy();
    }
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const labels = [];
    for (let i = 0; i < 6; i++) {
        labels.push(months[(currentMonth + i) % 12]);
    }
    
    forecastChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'GDP Growth Forecast (%)',
                data: economicData.gdp,
                borderColor: '#1fb8cd',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#1fb8cd',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }, {
                label: 'Inflation Rate (%)',
                data: economicData.inflation,
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointBackgroundColor: '#ff6b6b',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        font: {
                            size: 12,
                            weight: 600
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    cornerRadius: 8,
                    displayColors: true
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            size: 11
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function runForecastAnalysis() {
    const button = document.getElementById('run-forecast');
    const loadingDiv = document.getElementById('forecast-loading');
    
    if (!button || !loadingDiv) return;
    
    // Show loading animation
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    loadingDiv.classList.remove('hidden');
    
    // Simulate AI analysis with realistic timing
    setTimeout(() => {
        // Update forecast metrics with new predictions
        updateForecastMetrics();
        
        // Update chart with new data
        updateForecastChart();
        
        // Hide loading and reset button
        loadingDiv.classList.add('hidden');
        button.disabled = false;
        button.innerHTML = '<i class="fas fa-play"></i> Generate Forecast';
        
        // Show success message
        showNotification('Forecast updated successfully!', 'success');
    }, 3000);
}

function updateForecastMetrics() {
    // Generate realistic forecast values
    const gdpForecast = (2.5 + Math.random() * 0.8).toFixed(1);
    const inflationForecast = (2.8 + Math.random() * 0.6).toFixed(1);
    const accuracy = (92 + Math.random() * 6).toFixed(1);
    
    // Update DOM elements
    const gdpElement = document.getElementById('gdp-forecast');
    const inflationElement = document.getElementById('inflation-forecast');
    const accuracyElement = document.getElementById('model-accuracy');
    
    if (gdpElement) gdpElement.textContent = `+${gdpForecast}%`;
    if (inflationElement) inflationElement.textContent = `${inflationForecast}%`;
    if (accuracyElement) accuracyElement.textContent = `${accuracy}%`;
}

function updateForecastChart() {
    if (!forecastChart) return;
    
    // Generate new forecast data
    const newGdpData = economicData.gdp.map(val => val + (Math.random() - 0.5) * 0.5);
    const newInflationData = economicData.inflation.map(val => val + (Math.random() - 0.5) * 0.3);
    
    // Update chart data
    forecastChart.data.datasets[0].data = newGdpData;
    forecastChart.data.datasets[1].data = newInflationData;
    forecastChart.update('active');
}

function updateForecastTimeframe() {
    const timeframe = document.getElementById('forecast-timeframe').value;
    let newLabels, newData;
    
    switch(timeframe) {
        case '1':
            newLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            newData = [2.8, 2.9, 3.1, 3.0];
            break;
        case '3':
            newLabels = ['Month 1', 'Month 2', 'Month 3'];
            newData = [2.8, 3.1, 2.9];
            break;
        case '6':
            newLabels = ['Q1', 'Q2'];
            newData = [2.9, 3.0];
            break;
        case '12':
            newLabels = ['2025'];
            newData = [2.8];
            break;
    }
    
    if (forecastChart) {
        forecastChart.data.labels = newLabels;
        forecastChart.data.datasets[0].data = newData;
        forecastChart.update();
    }
}

/* =====================================================
   2. AUTOMATED POLICY ANALYSIS WIDGET
   ===================================================== */

function initializePolicyWidget() {
    const analyzeButton = document.getElementById('analyze-policy');
    const policySlider = document.getElementById('policy-magnitude');
    const policyTypeSelect = document.getElementById('policy-type');
    
    if (analyzeButton) {
        analyzeButton.addEventListener('click', runPolicyAnalysis);
    }
    
    if (policySlider) {
        policySlider.addEventListener('input', updatePolicyPreview);
    }
    
    if (policyTypeSelect) {
        policyTypeSelect.addEventListener('change', updatePolicyType);
    }
}

function runPolicyAnalysis() {
    const button = document.getElementById('analyze-policy');
    const progressBar = document.getElementById('policy-progress');
    const statusText = document.getElementById('policy-status');
    
    if (!button || !progressBar || !statusText) return;
    
    // Start analysis
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    statusText.textContent = 'Initializing policy simulation...';
    
    // Simulate analysis progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        
        if (progress < 30) {
            statusText.textContent = 'Loading economic models...';
        } else if (progress < 60) {
            statusText.textContent = 'Running simulations...';
        } else if (progress < 90) {
            statusText.textContent = 'Calculating impacts...';
        } else if (progress >= 100) {
            statusText.textContent = 'Analysis complete!';
            clearInterval(interval);
            
            // Update policy impacts
            updatePolicyImpacts();
            
            // Reset button
            setTimeout(() => {
                button.disabled = false;
                button.innerHTML = '<i class="fas fa-chart-bar"></i> Analyze Policy Impact';
                statusText.textContent = 'Ready for new analysis';
                progressBar.style.width = '0%';
            }, 2000);
        }
    }, 200);
}

function updatePolicyPreview() {
    const magnitude = document.getElementById('policy-magnitude').value;
    const policyType = document.getElementById('policy-type').value;
    
    // Calculate preview impacts based on slider value
    const baseImpact = magnitude / 100;
    let gdpImpact, employmentImpact, inflationImpact;
    
    switch(policyType) {
        case 'fiscal':
            gdpImpact = (baseImpact * 1.5).toFixed(1);
            employmentImpact = (baseImpact * 1.2).toFixed(1);
            inflationImpact = (baseImpact * 0.8).toFixed(1);
            break;
        case 'monetary':
            gdpImpact = (baseImpact * 1.0).toFixed(1);
            employmentImpact = (baseImpact * 0.8).toFixed(1);
            inflationImpact = (baseImpact * 1.5).toFixed(1);
            break;
        case 'trade':
            gdpImpact = (baseImpact * 1.3).toFixed(1);
            employmentImpact = (baseImpact * 1.1).toFixed(1);
            inflationImpact = (baseImpact * 0.6).toFixed(1);
            break;
        default:
            gdpImpact = (baseImpact * 1.0).toFixed(1);
            employmentImpact = (baseImpact * 0.9).toFixed(1);
            inflationImpact = (baseImpact * 0.7).toFixed(1);
    }
    
    // Update preview values (but don't show until analysis runs)
    window.previewImpacts = { gdpImpact, employmentImpact, inflationImpact };
}

function updatePolicyImpacts() {
    const impacts = window.previewImpacts || {
        gdpImpact: '1.2',
        employmentImpact: '0.8', 
        inflationImpact: '0.3'
    };
    
    // Update DOM with calculated impacts
    const gdpElement = document.getElementById('gdp-impact');
    const employmentElement = document.getElementById('employment-impact');
    const inflationElement = document.getElementById('inflation-impact');
    
    if (gdpElement) {
        gdpElement.textContent = `+${impacts.gdpImpact}%`;
        gdpElement.className = 'impact-value ' + (parseFloat(impacts.gdpImpact) > 0 ? 'positive' : 'negative');
    }
    
    if (employmentElement) {
        employmentElement.textContent = `+${impacts.employmentImpact}%`;
        employmentElement.className = 'impact-value ' + (parseFloat(impacts.employmentImpact) > 0 ? 'positive' : 'negative');
    }
    
    if (inflationElement) {
        inflationElement.textContent = `+${impacts.inflationImpact}%`;
        inflationElement.className = 'impact-value ' + (parseFloat(impacts.inflationImpact) < 0.5 ? 'neutral' : 'negative');
    }
}

function updatePolicyType() {
    const policyType = document.getElementById('policy-type').value;
    const statusText = document.getElementById('policy-status');
    
    if (statusText) {
        statusText.textContent = `Ready to analyze ${policyType} policy`;
    }
    
    updatePolicyPreview();
}

/* =====================================================
   3. NATURAL LANGUAGE PROCESSING WIDGET
   ===================================================== */

function initializeNLPWidget() {
    const analyzeButton = document.getElementById('analyze-text');
    const textInput = document.getElementById('economic-text-input');
    
    if (analyzeButton) {
        analyzeButton.addEventListener('click', analyzeEconomicText);
    }
    
    if (textInput) {
        textInput.addEventListener('input', debounce(previewTextAnalysis, 1000));
    }
}

function analyzeEconomicText() {
    const button = document.getElementById('analyze-text');
    const textInput = document.getElementById('economic-text-input');
    const processingDiv = document.getElementById('nlp-processing');
    
    if (!button || !textInput || !processingDiv) return;
    
    const text = textInput.value.trim();
    if (!text) {
        showNotification('Please enter some text to analyze', 'warning');
        return;
    }
    
    // Start processing
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    processingDiv.classList.remove('hidden');
    
    // Simulate NLP processing
    setTimeout(() => {
        // Perform text analysis
        const analysis = performTextAnalysis(text);
        
        // Update UI with results
        updateSentimentAnalysis(analysis.sentiment);
        updateKeyInsights(analysis.insights);
        updateEconomicKeywords(analysis.keywords);
        
        // Hide processing and reset button
        processingDiv.classList.add('hidden');
        button.disabled = false;
        button.innerHTML = '<i class="fas fa-brain"></i> Analyze Economic Text';
        
        showNotification('Text analysis complete!', 'success');
    }, 4000);
}

function performTextAnalysis(text) {
    // Simulate advanced NLP analysis
    const economicTerms = [
        'GDP', 'inflation', 'unemployment', 'growth', 'recession', 'market', 'economy',
        'fiscal', 'monetary', 'policy', 'investment', 'trade', 'deficit', 'surplus',
        'interest', 'rate', 'bank', 'federal', 'consumer', 'business', 'economic'
    ];
    
    const positiveWords = ['growth', 'increase', 'rise', 'positive', 'improvement', 'expansion', 'boom', 'surge'];
    const negativeWords = ['decline', 'decrease', 'fall', 'negative', 'recession', 'contraction', 'drop', 'crisis'];
    
    // Extract keywords
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const foundKeywords = words.filter(word => economicTerms.some(term => term.toLowerCase().includes(word) || word.includes(term.toLowerCase())));
    const uniqueKeywords = [...new Set(foundKeywords)].slice(0, 8);
    
    // Calculate sentiment
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;
    const sentimentScore = Math.max(10, Math.min(90, 50 + (positiveCount - negativeCount) * 10 + Math.random() * 20));
    
    // Generate insights
    const insights = generateEconomicInsights(text, uniqueKeywords, sentimentScore);
    
    return {
        sentiment: sentimentScore,
        insights: insights,
        keywords: uniqueKeywords
    };
}

function generateEconomicInsights(text, keywords, sentiment) {
    const insights = [];
    
    if (sentiment > 70) {
        insights.push('Overall positive economic sentiment detected');
    } else if (sentiment < 40) {
        insights.push('Bearish economic outlook identified');
    } else {
        insights.push('Neutral economic sentiment with mixed indicators');
    }
    
    if (keywords.includes('inflation') || keywords.includes('price')) {
        insights.push('Inflationary concerns mentioned in text');
    }
    
    if (keywords.includes('growth') || keywords.includes('gdp')) {
        insights.push('Economic growth factors discussed');
    }
    
    if (keywords.includes('unemployment') || keywords.includes('job')) {
        insights.push('Labor market conditions referenced');
    }
    
    if (keywords.includes('policy') || keywords.includes('federal')) {
        insights.push('Government policy implications noted');
    }
    
    // Add word count insight
    const wordCount = text.split(/\s+/).length;
    insights.push(`Document contains ${wordCount} words with ${keywords.length} economic terms`);
    
    return insights.slice(0, 5); // Limit to 5 insights
}

function updateSentimentAnalysis(sentimentScore) {
    const sentimentFill = document.getElementById('sentiment-fill');
    const sentimentScoreElement = document.getElementById('sentiment-score');
    
    if (sentimentFill) {
        sentimentFill.style.width = sentimentScore + '%';
    }
    
    if (sentimentScoreElement) {
        const label = sentimentScore > 60 ? 'Bullish' : sentimentScore < 40 ? 'Bearish' : 'Neutral';
        sentimentScoreElement.textContent = `${Math.round(sentimentScore)}% ${label}`;
        
        // Update color class
        sentimentScoreElement.className = 'sentiment-score';
        if (sentimentScore > 60) sentimentScoreElement.style.color = '#28a745';
        else if (sentimentScore < 40) sentimentScoreElement.style.color = '#dc3545';
        else sentimentScoreElement.style.color = '#ffc107';
    }
}

function updateKeyInsights(insights) {
    const insightsList = document.getElementById('nlp-insights');
    if (!insightsList) return;
    
    insightsList.innerHTML = '';
    
    insights.forEach(insight => {
        const insightElement = document.createElement('div');
        insightElement.className = 'insight-item';
        insightElement.innerHTML = `
            <i class="fas fa-lightbulb"></i>
            <span>${insight}</span>
        `;
        insightsList.appendChild(insightElement);
    });
}

function updateEconomicKeywords(keywords) {
    const keywordsContainer = document.getElementById('economic-keywords');
    if (!keywordsContainer) return;
    
    keywordsContainer.innerHTML = '';
    
    keywords.forEach(keyword => {
        const keywordElement = document.createElement('span');
        keywordElement.className = 'keyword-tag';
        keywordElement.textContent = keyword;
        keywordsContainer.appendChild(keywordElement);
    });
}

function previewTextAnalysis() {
    const text = document.getElementById('economic-text-input').value;
    if (text.length > 50) {
        // Show quick preview of keyword extraction
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const economicWords = words.filter(word => 
            ['gdp', 'inflation', 'economy', 'market', 'growth', 'policy'].includes(word)
        );
        
        if (economicWords.length > 0) {
            updateEconomicKeywords([...new Set(economicWords)].slice(0, 4));
        }
    }
}

/* =====================================================
   UTILITY FUNCTIONS
   ===================================================== */

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `research-notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Hide and remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

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

/* =====================================================
   NOTIFICATION STYLES
   ===================================================== */

.research-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    padding: 15px 20px;
    border-radius: 25px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    transform: translateX(400px);
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: 1000;
    border-left: 4px solid #1fb8cd;
}

.research-notification.show {
    transform: translateX(0);
}

.research-notification.success {
    border-left-color: #28a745;
    color: #28a745;
}

.research-notification.warning {
    border-left-color: #ffc107;
    color: #856404;
}

.research-notification i {
    font-size: 1.1rem;
}

/* =====================================================
   RESPONSIVE DESIGN FOR WIDGETS
   ===================================================== */

@media (max-width: 768px) {
    .research-widgets-grid {
        grid-template-columns: 1fr;
        gap: 20px;
        margin-top: 30px;
    }
    
    .research-widget {
        padding: 25px 20px;
    }
    
    .forecast-dashboard {
        grid-template-columns: 1fr;
        gap: 10px;
        padding: 15px;
    }
    
    .policy-impact-dashboard {
        grid-template-columns: 1fr;
        gap: 10px;
        padding: 15px;
    }
    
    .forecast-controls {
        flex-direction: column;
        gap: 10px;
    }
    
    .widget-btn {
        min-width: unset;
        width: 100%;
    }
    
    .research-notification {
        top: 10px;
        right: 10px;
        left: 10px;
        transform: translateY(-100px);
    }
    
    .research-notification.show {
        transform: translateY(0);
    }
}

@media (max-width: 480px) {
    .widget-header h3 {
        font-size: 1.2rem;
    }
    
    .widget-description {
        font-size: 0.9rem;
    }
    
    .widget-icon {
        width: 50px;
        height: 50px;
    }
    
    .widget-icon i {
        font-size: 20px;
    }
    
    .nlp-textarea {
        min-height: 100px;
    }
    
    .forecast-controls {
        gap: 8px;
    }
}

/* =====================================================
   DARK MODE SUPPORT
   ===================================================== */

[data-color-scheme="dark"] .research-widget {
    background: linear-gradient(145deg, #2d3748, #4a5568);
    color: #e2e8f0;
    border-color: rgba(31, 184, 205, 0.3);
}

[data-color-scheme="dark"] .widget-header {
    border-bottom-color: #4a5568;
}

[data-color-scheme="dark"] .widget-header h3 {
    color: #e2e8f0;
}

[data-color-scheme="dark"] .forecast-dashboard,
[data-color-scheme="dark"] .policy-impact-dashboard,
[data-color-scheme="dark"] .sentiment-analysis {
    background: linear-gradient(135deg, #1a202c, #2d3748);
}

[data-color-scheme="dark"] .forecast-metric,
[data-color-scheme="dark"] .impact-metric,
[data-color-scheme="dark"] .key-insights,
[data-color-scheme="dark"] .keyword-extraction,
[data-color-scheme="dark"] .chart-container {
    background: #4a5568;
    color: #e2e8f0;
}

[data-color-scheme="dark"] .nlp-textarea,
[data-color-scheme="dark"] .widget-select {
    background: #4a5568;
    border-color: #718096;
    color: #e2e8f0;
}

[data-color-scheme="dark"] .research-notification {
    background: #2d3748;
    color: #e2e8f0;
}

/* =====================================================
   PRINT STYLES
   ===================================================== */

@media print {
    .research-widget {
        break-inside: avoid;
        box-shadow: none;
        border: 1px solid #ddd;
        margin-bottom: 20px;
    }
    
    .widget-btn,
    .loading-animation,
    .processing-animation,
    .research-notification {
        display: none;
    }
    
    .chart-container {
        border: 1px solid #ddd;
    }
}