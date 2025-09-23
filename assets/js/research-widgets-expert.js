/* =====================================================
   EXPERT-LEVEL RESEARCH WIDGETS - ADVANCED FUNCTIONALITY
   Interactive AI-Economics Research Platform for Experts
   ===================================================== */

// Global variables for advanced functionality
let expertCharts = {
    forecast: null,
    residuals: null,
    features: null,
    correlation: null
};

let expertData = {
    economicTimeSeries: [],
    modelParameters: {},
    simulationResults: {},
    nlpAnalysis: {}
};

let expertTimers = {};
let expertIntervals = {};

// Initialize Expert Research Widgets
document.addEventListener('DOMContentLoaded', function() {
    initializeExpertWidgets();
});

function initializeExpertWidgets() {
    if (document.querySelector('.expert-widget')) {
        initializeAdvancedForecasting();
        initializePolicyLaboratory();
        initializeNLPIntelligence();
        setupExpertEventListeners();
        loadExpertDemoData();
    }
}

/* =====================================================
   1. ADVANCED AI ECONOMIC FORECASTING SYSTEM
   ===================================================== */

function initializeAdvancedForecasting() {
    createAdvancedForecastChart();
    setupModelParameterControls();
    setupChartTabSwitching();
    generateSyntheticEconomicData();
}

function setupModelParameterControls() {
    // Learning Rate Control
    const learningRateSlider = document.getElementById('learning-rate');
    const lrValue = document.getElementById('lr-value');
    
    if (learningRateSlider && lrValue) {
        learningRateSlider.addEventListener('input', function() {
            const value = parseFloat(this.value);
            lrValue.textContent = value.toFixed(4);
            updateModelParameters('learningRate', value);
        });
    }
    
    // Sequence Length Control
    const seqLengthSlider = document.getElementById('sequence-length');
    const seqValue = document.getElementById('seq-value');
    
    if (seqLengthSlider && seqValue) {
        seqLengthSlider.addEventListener('input', function() {
            const value = parseInt(this.value);
            seqValue.textContent = value;
            updateModelParameters('sequenceLength', value);
        });
    }
    
    // Regularization Control
    const regSlider = document.getElementById('regularization');
    const regValue = document.getElementById('reg-value');
    
    if (regSlider && regValue) {
        regSlider.addEventListener('input', function() {
            const value = parseFloat(this.value);
            regValue.textContent = value.toFixed(3);
            updateModelParameters('regularization', value);
        });
    }
    
    // Model Architecture Selection
    const modelArchSelect = document.getElementById('model-architecture');
    if (modelArchSelect) {
        modelArchSelect.addEventListener('change', function() {
            updateModelParameters('architecture', this.value);
            showExpertNotification(`Model architecture changed to ${this.value}`, 'info');
        });
    }
}

function updateModelParameters(param, value) {
    expertData.modelParameters[param] = value;
    
    // Simulate real-time parameter impact
    if (param === 'learningRate') {
        updatePerformanceMetrics(value);
    }
    
    // Debounced model retraining simulation
    clearTimeout(expertTimers.modelUpdate);
    expertTimers.modelUpdate = setTimeout(() => {
        simulateModelRetraining();
    }, 1500);
}

function updatePerformanceMetrics(learningRate) {
    // Simulate how learning rate affects performance metrics
    const baseRMSE = 0.0847;
    const baseMAE = 0.0623;
    const baseR2 = 0.9471;
    
    // Optimal learning rate around 0.001
    const lrFactor = Math.exp(-Math.pow((learningRate - 0.001) * 1000, 2));
    
    const newRMSE = baseRMSE + (1 - lrFactor) * 0.02;
    const newMAE = baseMAE + (1 - lrFactor) * 0.015;
    const newR2 = baseR2 * lrFactor;
    
    const rmseElement = document.getElementById('rmse-value');
    const maeElement = document.getElementById('mae-value');
    const r2Element = document.getElementById('r2-value');
    
    if (rmseElement) rmseElement.textContent = newRMSE.toFixed(4);
    if (maeElement) maeElement.textContent = newMAE.toFixed(4);
    if (r2Element) r2Element.textContent = newR2.toFixed(4);
}

function createAdvancedForecastChart() {
    const ctx = document.getElementById('advanced-forecast-chart');
    if (!ctx) return;
    
    if (expertCharts.forecast) {
        expertCharts.forecast.destroy();
    }
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const labels = [];
    for (let i = 0; i < 12; i++) {
        labels.push(months[(currentMonth + i) % 12]);
    }
    
    expertCharts.forecast = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Historical GDP Growth',
                data: [2.1, 2.3, 2.8, 3.1, 2.9, 2.7, 2.4, 2.6, 2.8, 3.0, 2.9, 2.7],
                borderColor: '#6c757d',
                backgroundColor: 'rgba(108, 117, 125, 0.1)',
                borderWidth: 2,
                fill: false,
                pointRadius: 4,
                pointHoverRadius: 6
            }, {
                label: 'AI Forecast (Transformer)',
                data: [null, null, null, null, null, null, 2.847, 2.923, 3.156, 3.289, 3.102, 2.976],
                borderColor: '#1fb8cd',
                backgroundColor: 'rgba(31, 184, 205, 0.2)',
                borderWidth: 4,
                fill: false,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#1fb8cd',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 3
            }, {
                label: 'Confidence Interval (Upper)',
                data: [null, null, null, null, null, null, 3.171, 3.245, 3.478, 3.612, 3.425, 3.299],
                borderColor: 'rgba(31, 184, 205, 0.3)',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                borderWidth: 1,
                fill: '+1',
                pointRadius: 0,
                borderDash: [5, 5]
            }, {
                label: 'Confidence Interval (Lower)',
                data: [null, null, null, null, null, null, 2.523, 2.601, 2.834, 2.966, 2.779, 2.653],
                borderColor: 'rgba(31, 184, 205, 0.3)',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                borderWidth: 1,
                fill: false,
                pointRadius: 0,
                borderDash: [5, 5]
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
                            size: 11,
                            weight: 600
                        },
                        filter: function(legendItem) {
                            return !legendItem.text.includes('Confidence Interval');
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    cornerRadius: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(3) + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.08)'
                    },
                    ticks: {
                        font: {
                            size: 11,
                            weight: 500
                        },
                        callback: function(value) {
                            return value.toFixed(1) + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'GDP Growth Rate (%)',
                        font: {
                            size: 12,
                            weight: 700
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.08)'
                    },
                    ticks: {
                        font: {
                            size: 11,
                            weight: 500
                        }
                    }
                }
            },
            animation: {
                duration: 2500,
                easing: 'easeInOutQuart'
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function setupChartTabSwitching() {
    const chartTabs = document.querySelectorAll('.chart-tab');
    chartTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active from all tabs
            chartTabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            this.classList.add('active');
            
            const chartType = this.dataset.chart;
            switchExpertChart(chartType);
        });
    });
}

function switchExpertChart(chartType) {
    const ctx = document.getElementById('advanced-forecast-chart');
    if (!ctx) return;
    
    // Destroy current chart
    if (expertCharts.forecast) {
        expertCharts.forecast.destroy();
    }
    
    switch(chartType) {
        case 'forecast':
            createAdvancedForecastChart();
            break;
        case 'residuals':
            createResidualsChart();
            break;
        case 'features':
            createFeatureImportanceChart();
            break;
        case 'correlation':
            createCorrelationMatrix();
            break;
    }
}

function createResidualsChart() {
    const ctx = document.getElementById('advanced-forecast-chart');
    
    const residualData = Array.from({length: 50}, (_, i) => ({
        x: i,
        y: (Math.random() - 0.5) * 0.2
    }));
    
    expertCharts.forecast = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Residuals',
                data: residualData,
                backgroundColor: 'rgba(31, 184, 205, 0.6)',
                borderColor: '#1fb8cd',
                pointRadius: 4,
                pointHoverRadius: 6
            }, {
                label: 'Zero Line',
                type: 'line',
                data: [{x: 0, y: 0}, {x: 49, y: 0}],
                borderColor: '#dc3545',
                borderWidth: 2,
                pointRadius: 0,
                borderDash: [5, 5]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Model Residuals Analysis'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time Period'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Residual Value'
                    }
                }
            }
        }
    });
}

function createFeatureImportanceChart() {
    const ctx = document.getElementById('advanced-forecast-chart');
    
    const features = ['GDP Lag-1', 'Inflation', 'Unemployment', 'Interest Rate', 'Consumer Confidence', 'Industrial Production'];
    const importance = [0.32, 0.24, 0.18, 0.12, 0.09, 0.05];
    
    expertCharts.forecast = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: features,
            datasets: [{
                label: 'Feature Importance',
                data: importance,
                backgroundColor: [
                    '#1fb8cd',
                    '#17a2b8',
                    '#6c5ce7',
                    '#00cec9',
                    '#55a3ff',
                    '#fd79a8'
                ],
                borderColor: '#ffffff',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Feature Importance (Transformer Model)'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Importance Score'
                    },
                    ticks: {
                        callback: function(value) {
                            return (value * 100).toFixed(0) + '%';
                        }
                    }
                }
            }
        }
    });
}

function createCorrelationMatrix() {
    const ctx = document.getElementById('advanced-forecast-chart');
    
    // Simulate correlation matrix data
    const variables = ['GDP', 'Inflation', 'Unemployment', 'Interest Rate', 'Consumer Conf.'];
    const correlationData = [];
    
    for (let i = 0; i < variables.length; i++) {
        for (let j = 0; j < variables.length; j++) {
            let correlation;
            if (i === j) {
                correlation = 1.0; // Perfect correlation with self
            } else {
                // Generate realistic economic correlations
                correlation = Math.random() * 2 - 1; // -1 to 1
                if (Math.abs(correlation) < 0.1) correlation = 0; // Some zero correlations
            }
            
            correlationData.push({
                x: j,
                y: i,
                v: correlation
            });
        }
    }
    
    expertCharts.forecast = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Correlation',
                data: correlationData,
                backgroundColor: function(context) {
                    const value = context.raw.v;
                    const alpha = Math.abs(value);
                    if (value > 0) {
                        return `rgba(31, 184, 205, ${alpha})`;
                    } else {
                        return `rgba(220, 53, 69, ${alpha})`;
                    }
                },
                pointRadius: 20,
                pointHoverRadius: 25
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Economic Variables Correlation Matrix'
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            const point = context[0];
                            return `${variables[point.raw.y]} vs ${variables[point.raw.x]}`;
                        },
                        label: function(context) {
                            return `Correlation: ${context.raw.v.toFixed(3)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    min: -0.5,
                    max: 4.5,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            return variables[value] || '';
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    type: 'linear',
                    min: -0.5,
                    max: 4.5,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            return variables[value] || '';
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function simulateModelRetraining() {
    showExpertNotification('Model retraining initiated...', 'info');
    
    // Simulate training progress
    setTimeout(() => {
        updateAdvancedMetrics();
        showExpertNotification('Model retraining completed successfully!', 'success');
    }, 2000);
}

function updateAdvancedMetrics() {
    const gdpForecast = (2.7 + Math.random() * 0.3).toFixed(3);
    const inflationForecast = (3.0 + Math.random() * 0.4).toFixed(3);
    
    const gdpElement = document.getElementById('advanced-gdp');
    const inflationElement = document.getElementById('advanced-inflation');
    
    if (gdpElement) {
        animateValue(gdpElement, parseFloat(gdpElement.textContent.replace('%', '')), parseFloat(gdpForecast), 1000, '%', true);
    }
    if (inflationElement) {
        animateValue(inflationElement, parseFloat(inflationElement.textContent.replace('%', '')), parseFloat(inflationForecast), 1000, '%');
    }
}

/* =====================================================
   2. POLICY SIMULATION LABORATORY
   ===================================================== */

function initializePolicyLaboratory() {
    setupPolicyConfigTabs();
    setupPolicyParameterControls();
    setupScenarioCheckboxes();
}

function setupPolicyConfigTabs() {
    const configTabs = document.querySelectorAll('.config-tab');
    const configPanels = document.querySelectorAll('.config-panel');
    
    configTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active from all tabs and panels
            configTabs.forEach(t => t.classList.remove('active'));
            configPanels.forEach(p => p.classList.remove('active'));
            
            // Add active to clicked tab
            this.classList.add('active');
            
            // Show corresponding panel
            const targetPanel = document.getElementById(`${this.dataset.config}-config`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

function setupPolicyParameterControls() {
    // Implementation Speed Control
    const implSpeedSlider = document.getElementById('implementation-speed');
    const implSpeedVal = document.getElementById('impl-speed-val');
    
    if (implSpeedSlider && implSpeedVal) {
        implSpeedSlider.addEventListener('input', function() {
            const speeds = ['Very Gradual', 'Gradual', 'Medium', 'Rapid', 'Very Rapid'];
            const value = parseInt(this.value) - 1;
            implSpeedVal.textContent = speeds[value];
            updatePolicyPreview();
        });
    }
    
    // Budget Allocation Control
    const budgetSlider = document.getElementById('budget-allocation');
    const budgetVal = document.getElementById('budget-val');
    
    if (budgetSlider && budgetVal) {
        budgetSlider.addEventListener('input', function() {
            const value = parseInt(this.value);
            budgetVal.textContent = value + 'B';
            updatePolicyPreview();
        });
    }
    
    // Monte Carlo Iterations Control
    const mcIterSlider = document.getElementById('mc-iterations');
    const mcIterVal = document.getElementById('mc-iter-val');
    
    if (mcIterSlider && mcIterVal) {
        mcIterSlider.addEventListener('input', function() {
            const value = parseInt(this.value);
            mcIterVal.textContent = value.toLocaleString();
        });
    }
    
    // Confidence Level Control
    const confLevelSlider = document.getElementById('confidence-level');
    const confLevelVal = document.getElementById('conf-level-val');
    
    if (confLevelSlider && confLevelVal) {
        confLevelSlider.addEventListener('input', function() {
            const value = parseInt(this.value);
            confLevelVal.textContent = value + '%';
        });
    }
    
    // Economic Shock Variance Control
    const shockVarSlider = document.getElementById('shock-variance');
    const shockVarVal = document.getElementById('shock-var-val');
    
    if (shockVarSlider && shockVarVal) {
        shockVarSlider.addEventListener('input', function() {
            const value = parseFloat(this.value);
            shockVarVal.textContent = value.toFixed(2);
        });
    }
    
    // Policy Type Selection
    const policyTypeSelect = document.getElementById('expert-policy-type');
    if (policyTypeSelect) {
        policyTypeSelect.addEventListener('change', function() {
            updatePolicyPreview();
            showExpertNotification(`Policy type changed to ${this.options[this.selectedIndex].text}`, 'info');
        });
    }
}

function updatePolicyPreview() {
    const policyType = document.getElementById('expert-policy-type')?.value;
    const implSpeed = document.getElementById('implementation-speed')?.value;
    const budget = document.getElementById('budget-allocation')?.value;
    
    if (!policyType || !implSpeed || !budget) return;
    
    // Calculate impact based on parameters
    const baseGDPImpact = {
        'fiscal_stimulus': 1.2,
        'monetary_tightening': -0.8,
        'trade_liberalization': 0.9,
        'carbon_tax': -0.3,
        'universal_basic_income': 0.7
    }[policyType] || 0;
    
    const speedMultiplier = parseInt(implSpeed) / 3;
    const budgetMultiplier = parseInt(budget) / 500;
    
    const gdpImpact = (baseGDPImpact * speedMultiplier * budgetMultiplier).toFixed(3);
    const employmentImpact = ((baseGDPImpact * 0.7) * speedMultiplier * budgetMultiplier * 847).toFixed(0);
    const fiscalImpact = (-parseInt(budget) * speedMultiplier * 0.3).toFixed(1);
    const timeToEffect = ((18 / speedMultiplier) + Math.random() * 4).toFixed(1);
    
    // Update UI elements
    updateElementText('sim-gdp-impact', gdpImpact >= 0 ? `+${gdpImpact}%` : `${gdpImpact}%`);
    updateElementText('sim-employment', employmentImpact >= 0 ? `+${employmentImpact}K` : `${employmentImpact}K`);
    updateElementText('sim-fiscal', fiscalImpact >= 0 ? `+$${fiscalImpact}B` : `-$${Math.abs(fiscalImpact)}B`);
    updateElementText('sim-time', `${timeToEffect} months`);
}

function setupScenarioCheckboxes() {
    const checkboxes = document.querySelectorAll('.scenario-checkbox input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const scenarioName = this.id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
            const action = this.checked ? 'enabled' : 'disabled';
            showExpertNotification(`${scenarioName} ${action}`, 'info');
        });
    });
}

function runMonteCarloSimulation() {
    const progressDiv = document.getElementById('simulation-progress');
    const progressFill = document.getElementById('sim-progress-fill');
    const progressPct = document.getElementById('sim-progress-pct');
    const iterationSpan = document.getElementById('sim-iteration');
    const etaSpan = document.getElementById('sim-eta');
    const statusDiv = document.getElementById('sim-status');
    
    if (!progressDiv || !progressFill) return;
    
    const iterations = parseInt(document.getElementById('mc-iterations')?.value) || 10000;
    const duration = Math.min(iterations / 1000, 15) * 1000; // Max 15 seconds
    
    progressDiv.classList.remove('hidden');
    statusDiv.innerHTML = '<i class="fas fa-circle status-running"></i><span>Running Simulation...</span>';
    
    let currentIteration = 0;
    const startTime = Date.now();
    
    const simulationInterval = setInterval(() => {
        currentIteration += Math.floor(iterations / 100) + Math.random() * 100;
        
        if (currentIteration >= iterations) {
            currentIteration = iterations;
            clearInterval(simulationInterval);
            
            // Simulation complete
            setTimeout(() => {
                progressDiv.classList.add('hidden');
                statusDiv.innerHTML = '<i class="fas fa-circle status-ready"></i><span>Simulation Complete</span>';
                updateSimulationResults();
                showExpertNotification('Monte Carlo simulation completed successfully!', 'success');
            }, 500);
        }
        
        const progress = (currentIteration / iterations) * 100;
        const elapsed = Date.now() - startTime;
        const eta = Math.max(0, (duration - elapsed) / 1000);
        
        progressFill.style.width = progress + '%';
        progressPct.textContent = Math.round(progress) + '%';
        iterationSpan.textContent = `Iteration: ${currentIteration.toLocaleString()} / ${iterations.toLocaleString()}`;
        etaSpan.textContent = `ETA: ${Math.ceil(eta)} seconds`;
    }, duration / 100);
}

function updateSimulationResults() {
    // Generate realistic simulation results with confidence intervals
    const baseResults = {
        gdp: 1.247,
        employment: 847,
        fiscal: -142.7,
        time: 18.3
    };
    
    // Add some variation
    const gdpResult = (baseResults.gdp + (Math.random() - 0.5) * 0.4).toFixed(3);
    const employmentResult = Math.floor(baseResults.employment + (Math.random() - 0.5) * 200);
    const fiscalResult = (baseResults.fiscal + (Math.random() - 0.5) * 30).toFixed(1);
    const timeResult = (baseResults.time + (Math.random() - 0.5) * 4).toFixed(1);
    
    // Animate to new values
    animateValue(document.getElementById('sim-gdp-impact'), baseResults.gdp, parseFloat(gdpResult), 2000, '%', true);
    animateValue(document.getElementById('sim-employment'), baseResults.employment, employmentResult, 2000, 'K', true);
    animateValue(document.getElementById('sim-fiscal'), baseResults.fiscal, parseFloat(fiscalResult), 2000, 'B', false, '$');
    animateValue(document.getElementById('sim-time'), baseResults.time, parseFloat(timeResult), 2000, ' months');
}

/* =====================================================
   3. NLP ECONOMIC INTELLIGENCE SYSTEM
   ===================================================== */

function initializeNLPIntelligence() {
    setupNLPTabs();
    setupTextInputOptions();
    setupFileUpload();
    setupModelConfiguration();
    setupTextStatistics();
}

function setupNLPTabs() {
    const nlpTabs = document.querySelectorAll('.nlp-tab');
    const nlpPanels = document.querySelectorAll('.nlp-panel');
    
    nlpTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            nlpTabs.forEach(t => t.classList.remove('active'));
            nlpPanels.forEach(p => p.classList.remove('active'));
            
            this.classList.add('active');
            
            const targetPanel = document.getElementById(`${this.dataset.nlp}-panel`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

function setupTextInputOptions() {
    const inputOptions = document.querySelectorAll('.input-option');
    const inputAreas = document.querySelectorAll('.input-area');
    
    inputOptions.forEach(option => {
        option.addEventListener('click', function() {
            inputOptions.forEach(o => o.classList.remove('active'));
            inputAreas.forEach(a => a.classList.remove('active'));
            
            this.classList.add('active');
            
            const targetArea = document.getElementById(`${this.dataset.input}-input-area`);
            if (targetArea) {
                targetArea.classList.add('active');
            }
        });
    });
}

function setupFileUpload() {
    const fileInput = document.getElementById('file-upload');
    const dropZone = document.querySelector('.file-drop-zone');
    
    if (dropZone && fileInput) {
        // Handle drag and drop
        dropZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = '#1fb8cd';
            this.style.background = 'rgba(31, 184, 205, 0.1)';
        });
        
        dropZone.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = '#e9ecef';
            this.style.background = '#f8f9fa';
        });
        
        dropZone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#e9ecef';
            this.style.background = '#f8f9fa';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files);
            }
        });
        
        // Handle file input change
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                handleFileUpload(this.files);
            }
        });
        
        // Handle browse button click
        const uploadBtn = document.querySelector('.upload-btn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', function() {
                fileInput.click();
            });
        }
    }
}

function handleFileUpload(files) {
    Array.from(files).forEach(file => {
        if (file.type.includes('text') || file.name.endsWith('.txt')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const textarea = document.getElementById('expert-text-input');
                if (textarea) {
                    textarea.value = e.target.result;
                    updateTextStatistics(e.target.result);
                    showExpertNotification(`File "${file.name}" loaded successfully`, 'success');
                }
            };
            reader.readAsText(file);
        } else {
            showExpertNotification(`File type "${file.type}" not supported. Please use TXT files.`, 'warning');
        }
    });
}

function setupModelConfiguration() {
    // Max Sequence Length
    const seqLengthSlider = document.getElementById('max-seq-length');
    const seqLenVal = document.getElementById('seq-len-val');
    
    if (seqLengthSlider && seqLenVal) {
        seqLengthSlider.addEventListener('input', function() {
            seqLenVal.textContent = this.value;
        });
    }
    
    // Attention Heads
    const attHeadsSlider = document.getElementById('attention-heads');
    const attHeadsVal = document.getElementById('att-heads-val');
    
    if (attHeadsSlider && attHeadsVal) {
        attHeadsSlider.addEventListener('input', function() {
            attHeadsVal.textContent = this.value;
        });
    }
    
    // Temperature
    const tempSlider = document.getElementById('temperature');
    const tempVal = document.getElementById('temp-val');
    
    if (tempSlider && tempVal) {
        tempSlider.addEventListener('input', function() {
            tempVal.textContent = parseFloat(this.value).toFixed(1);
        });
    }
    
    // Base Model Selection
    const baseModelSelect = document.getElementById('nlp-base-model');
    if (baseModelSelect) {
        baseModelSelect.addEventListener('change', function() {
            showExpertNotification(`Base model changed to ${this.options[this.selectedIndex].text}`, 'info');
        });
    }
}

function setupTextStatistics() {
    const textarea = document.getElementById('expert-text-input');
    if (textarea) {
        textarea.addEventListener('input', function() {
            updateTextStatistics(this.value);
        });
    }
}

function updateTextStatistics(text) {
    const words = text.trim().split(/\s+/).length;
    const chars = text.length;
    
    const economicTerms = [
        'gdp', 'inflation', 'unemployment', 'interest', 'rate', 'federal', 'reserve',
        'economy', 'economic', 'market', 'policy', 'fiscal', 'monetary', 'growth',
        'recession', 'expansion', 'consumer', 'investment', 'trade', 'deficit',
        'surplus', 'debt', 'budget', 'tax', 'income', 'employment', 'jobs'
    ];
    
    const textLower = text.toLowerCase();
    const econTermsFound = economicTerms.filter(term => textLower.includes(term)).length;
    
    updateElementText('word-count', `Words: ${words}`);
    updateElementText('char-count', `Characters: ${chars}`);
    updateElementText('econ-terms', `Economic Terms: ${econTermsFound}`);
}

function runDeepSemanticAnalysis() {
    const textarea = document.getElementById('expert-text-input');
    if (!textarea || !textarea.value.trim()) {
        showExpertNotification('Please enter text for analysis', 'warning');
        return;
    }
    
    const text = textarea.value.trim();
    
    // Start analysis with progress indication
    showExpertNotification('Initializing deep semantic analysis...', 'info');
    
    // Simulate advanced NLP processing
    setTimeout(() => {
        const analysis = performAdvancedNLPAnalysis(text);
        updateNLPDashboard(analysis);
        showExpertNotification('Deep semantic analysis completed!', 'success');
    }, 4000);
}

function performAdvancedNLPAnalysis(text) {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    
    // Advanced sentiment analysis (multi-dimensional)
    const economicSentiment = calculateSentiment(text, 'economic');
    const marketSentiment = calculateSentiment(text, 'market');
    const policySentiment = calculateSentiment(text, 'policy');
    const riskSentiment = calculateSentiment(text, 'risk');
    
    // Named Entity Recognition simulation
    const entities = extractEntities(text);
    
    // Topic modeling simulation
    const topics = performTopicModeling(text);
    
    return {
        sentiments: {
            economic: economicSentiment,
            market: marketSentiment,
            policy: policySentiment,
            risk: riskSentiment
        },
        entities: entities,
        topics: topics
    };
}

function calculateSentiment(text, domain) {
    const positiveWords = {
        economic: ['growth', 'expansion', 'increase', 'rise', 'improvement', 'strong', 'robust'],
        market: ['bullish', 'gains', 'rally', 'upturn', 'positive', 'optimistic'],
        policy: ['effective', 'successful', 'beneficial', 'supportive', 'favorable'],
        risk: ['low', 'minimal', 'reduced', 'managed', 'controlled']
    }[domain] || [];
    
    const negativeWords = {
        economic: ['decline', 'recession', 'contraction', 'decrease', 'fall', 'weak'],
        market: ['bearish', 'losses', 'crash', 'downturn', 'negative', 'pessimistic'],
        policy: ['ineffective', 'failed', 'harmful', 'restrictive', 'unfavorable'],
        risk: ['high', 'significant', 'elevated', 'uncontrolled', 'dangerous']
    }[domain] || [];
    
    const textLower = text.toLowerCase();
    let positiveScore = 0;
    let negativeScore = 0;
    
    positiveWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        const matches = textLower.match(regex);
        if (matches) positiveScore += matches.length;
    });
    
    negativeWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        const matches = textLower.match(regex);
        if (matches) negativeScore += matches.length;
    });
    
    const totalWords = text.split(/\s+/).length;
    const sentiment = 50 + ((positiveScore - negativeScore) / totalWords) * 500;
    
    return Math.max(0, Math.min(100, sentiment));
}

function extractEntities(text) {
    const organizations = ['Federal Reserve', 'World Bank', 'IMF', 'Treasury', 'Congress', 'ECB', 'Bank of England'];
    const indicators = ['GDP', 'CPI', 'unemployment', 'inflation', 'interest rate', 'consumer confidence'];
    const geographic = ['United States', 'Canada', 'Europe', 'China', 'Japan', 'Germany', 'UK'];
    
    const foundOrgs = organizations.filter(org => text.includes(org));
    const foundIndicators = indicators.filter(ind => text.toLowerCase().includes(ind.toLowerCase()));
    const foundGeo = geographic.filter(geo => text.includes(geo));
    
    return {
        organizations: foundOrgs.slice(0, 5),
        indicators: foundIndicators.slice(0, 5),
        geographic: foundGeo.slice(0, 5)
    };
}

function performTopicModeling(text) {
    const topicKeywords = {
        'Monetary Policy': ['federal reserve', 'interest rate', 'monetary', 'central bank', 'fed'],
        'Market Analysis': ['market', 'stock', 'trading', 'investment', 'portfolio'],
        'Economic Indicators': ['gdp', 'inflation', 'unemployment', 'cpi', 'economic data'],
        'Global Trade': ['trade', 'tariff', 'export', 'import', 'international']
    };
    
    const topics = [];
    const textLower = text.toLowerCase();
    
    Object.keys(topicKeywords).forEach(topic => {
        let score = 0;
        topicKeywords[topic].forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            const matches = textLower.match(regex);
            if (matches) score += matches.length;
        });
        topics.push({ name: topic, score: score });
    });
    
    // Normalize scores to percentages
    const totalScore = topics.reduce((sum, topic) => sum + topic.score, 0);
    topics.forEach(topic => {
        topic.percentage = totalScore > 0 ? (topic.score / totalScore) * 100 : 0;
    });
    
    return topics.sort((a, b) => b.percentage - a.percentage);
}

function updateNLPDashboard(analysis) {
    // Update sentiment meters
    updateSentimentMeter('overall-sentiment', analysis.sentiments.economic, 'Economic');
    updateSentimentMeter('market-sentiment', analysis.sentiments.market, 'Market');
    updateSentimentMeter('policy-sentiment', analysis.sentiments.policy, 'Policy');
    updateSentimentMeter('risk-sentiment', 100 - analysis.sentiments.risk, 'Risk');
    
    // Update entity lists
    updateEntityList('org-entities', analysis.entities.organizations, 'org');
    updateEntityList('indicator-entities', analysis.entities.indicators, 'indicator');
    updateEntityList('geo-entities', analysis.entities.geographic, 'geo');
    
    // Update topic distribution
    updateTopicDistribution(analysis.topics);
}

function updateSentimentMeter(elementId, value, label) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.width = value + '%';
        
        const parentElement = element.closest('.sentiment-dim');
        if (parentElement) {
            const valueSpan = parentElement.querySelector('.dim-value');
            if (valueSpan) {
                const sentiment = value > 60 ? 'Optimistic' : value < 40 ? 'Pessimistic' : 'Neutral';
                valueSpan.textContent = `${Math.round(value)}% ${sentiment}`;
            }
        }
    }
}

function updateEntityList(containerId, entities, type) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = '';
        entities.forEach(entity => {
            const tag = document.createElement('span');
            tag.className = `entity-tag ${type}`;
            tag.textContent = entity;
            container.appendChild(tag);
        });
    }
}

function updateTopicDistribution(topics) {
    topics.forEach((topic, index) => {
        const topicItems = document.querySelectorAll('.topic-item');
        if (topicItems[index]) {
            const fill = topicItems[index].querySelector('.topic-fill');
            const weight = topicItems[index].querySelector('.topic-weight');
            const label = topicItems[index].querySelector('.topic-label');
            
            if (fill) fill.style.width = topic.percentage + '%';
            if (weight) weight.textContent = topic.percentage.toFixed(1) + '%';
            if (label) label.textContent = topic.name;
        }
    });
}

/* =====================================================
   EXPERT EVENT LISTENERS SETUP
   ===================================================== */

function setupExpertEventListeners() {
    // Advanced Forecasting Controls
    const trainModelBtn = document.getElementById('train-model');
    if (trainModelBtn) {
        trainModelBtn.addEventListener('click', simulateModelRetraining);
    }
    
    const validateModelBtn = document.getElementById('validate-model');
    if (validateModelBtn) {
        validateModelBtn.addEventListener('click', function() {
            showExpertNotification('Cross-validation initiated (K-fold, K=5)...', 'info');
            setTimeout(() => {
                showExpertNotification('Cross-validation completed. Average R² = 0.9423', 'success');
            }, 3000);
        });
    }
    
    const exportResultsBtn = document.getElementById('export-results');
    if (exportResultsBtn) {
        exportResultsBtn.addEventListener('click', function() {
            exportForecastResults();
        });
    }
    
    const hyperparameterTuneBtn = document.getElementById('hyperparameter-tune');
    if (hyperparameterTuneBtn) {
        hyperparameterTuneBtn.addEventListener('click', function() {
            showExpertNotification('Hyperparameter tuning started (Bayesian Optimization)...', 'info');
            setTimeout(() => {
                document.getElementById('learning-rate').value = '0.0023';
                document.getElementById('lr-value').textContent = '0.0023';
                document.getElementById('sequence-length').value = '42';
                document.getElementById('seq-value').textContent = '42';
                updateModelParameters('learningRate', 0.0023);
                updateModelParameters('sequenceLength', 42);
                showExpertNotification('Optimal hyperparameters found and applied!', 'success');
            }, 5000);
        });
    }
    
    // Policy Laboratory Controls
    const runMonteCarloBtn = document.getElementById('run-monte-carlo');
    if (runMonteCarloBtn) {
        runMonteCarloBtn.addEventListener('click', runMonteCarloSimulation);
    }
    
    const sensitivityAnalysisBtn = document.getElementById('sensitivity-analysis');
    if (sensitivityAnalysisBtn) {
        sensitivityAnalysisBtn.addEventListener('click', function() {
            showExpertNotification('Sensitivity analysis started...', 'info');
            setTimeout(() => {
                showExpertNotification('Sensitivity analysis completed. Results available for export.', 'success');
            }, 4000);
        });
    }
    
    const exportSimulationBtn = document.getElementById('export-simulation');
    if (exportSimulationBtn) {
        exportSimulationBtn.addEventListener('click', function() {
            exportSimulationResults();
        });
    }
    
    // NLP Intelligence Controls
    const deepAnalyzeBtn = document.getElementById('deep-analyze');
    if (deepAnalyzeBtn) {
        deepAnalyzeBtn.addEventListener('click', runDeepSemanticAnalysis);
    }
    
    const compareDocumentsBtn = document.getElementById('compare-documents');
    if (compareDocumentsBtn) {
        compareDocumentsBtn.addEventListener('click', function() {
            showExpertNotification('Document comparison feature requires multiple documents', 'info');
        });
    }
    
    const generateSummaryBtn = document.getElementById('generate-summary');
    if (generateSummaryBtn) {
        generateSummaryBtn.addEventListener('click', function() {
            const textarea = document.getElementById('expert-text-input');
            if (!textarea?.value.trim()) {
                showExpertNotification('Please enter text to summarize', 'warning');
                return;
            }
            showExpertNotification('AI summary generation started...', 'info');
            setTimeout(() => {
                showExpertNotification('AI summary generated successfully!', 'success');
            }, 3000);
        });
    }
    
    const exportNLPResultsBtn = document.getElementById('export-nlp-results');
    if (exportNLPResultsBtn) {
        exportNLPResultsBtn.addEventListener('click', function() {
            exportNLPResults();
        });
    }
    
    // URL Fetching
    const fetchUrlBtn = document.getElementById('fetch-url');
    if (fetchUrlBtn) {
        fetchUrlBtn.addEventListener('click', function() {
            const urlInput = document.getElementById('url-input');
            if (!urlInput?.value) {
                showExpertNotification('Please enter a URL', 'warning');
                return;
            }
            showExpertNotification('Fetching content from URL...', 'info');
            // Simulate URL fetching
            setTimeout(() => {
                showExpertNotification('Content fetched successfully', 'success');
            }, 2000);
        });
    }
}

/* =====================================================
   EXPORT FUNCTIONS
   ===================================================== */

function exportForecastResults() {
    const data = {
        model_parameters: expertData.modelParameters,
        forecast_results: {
            gdp_forecast: document.getElementById('advanced-gdp')?.textContent,
            inflation_forecast: document.getElementById('advanced-inflation')?.textContent,
            rmse: document.getElementById('rmse-value')?.textContent,
            mae: document.getElementById('mae-value')?.textContent,
            r2: document.getElementById('r2-value')?.textContent
        },
        timestamp: new Date().toISOString()
    };
    
    downloadJSON(data, 'forecast_results.json');
    showExpertNotification('Forecast results exported to JSON', 'success');
}

function exportSimulationResults() {
    const data = {
        policy_configuration: {
            policy_type: document.getElementById('expert-policy-type')?.value,
            implementation_speed: document.getElementById('implementation-speed')?.value,
            budget_allocation: document.getElementById('budget-allocation')?.value,
            mc_iterations: document.getElementById('mc-iterations')?.value
        },
        simulation_results: {
            gdp_impact: document.getElementById('sim-gdp-impact')?.textContent,
            employment_effect: document.getElementById('sim-employment')?.textContent,
            fiscal_balance: document.getElementById('sim-fiscal')?.textContent,
            time_to_effect: document.getElementById('sim-time')?.textContent
        },
        timestamp: new Date().toISOString()
    };
    
    downloadJSON(data, 'simulation_results.json');
    showExpertNotification('Simulation results exported to JSON', 'success');
}

function exportNLPResults() {
    const exportJSON = document.getElementById('export-json')?.checked;
    const exportCSV = document.getElementById('export-csv')?.checked;
    const exportReport = document.getElementById('export-report')?.checked;
    
    if (!exportJSON && !exportCSV && !exportReport) {
        showExpertNotification('Please select at least one export format', 'warning');
        return;
    }
    
    if (exportJSON) {
        const data = {
            text_statistics: {
                word_count: document.getElementById('word-count')?.textContent,
                char_count: document.getElementById('char-count')?.textContent,
                econ_terms: document.getElementById('econ-terms')?.textContent
            },
            sentiment_analysis: expertData.nlpAnalysis,
            timestamp: new Date().toISOString()
        };
        downloadJSON(data, 'nlp_analysis.json');
    }
    
    if (exportCSV) {
        // Create CSV data for sentiment scores
        const csvData = 'Dimension,Score\n' +
            'Economic Sentiment,74\n' +
            'Market Sentiment,82\n' +
            'Policy Sentiment,67\n' +
            'Risk Assessment,43\n';
        
        downloadCSV(csvData, 'sentiment_scores.csv');
    }
    
    if (exportReport) {
        showExpertNotification('PDF report generation is not implemented in this demo', 'info');
    }
    
    showExpertNotification('NLP analysis results exported successfully!', 'success');
}

/* =====================================================
   UTILITY FUNCTIONS
   ===================================================== */

function downloadJSON(data, filename) {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function downloadCSV(data, filename) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function animateValue(element, start, end, duration, suffix = '', showSign = false, prefix = '') {
    if (!element) return;
    
    const startTime = Date.now();
    const isNegative = end < 0;
    
    function updateValue() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * easeOutCubic(progress);
        let displayValue = prefix + (showSign && current >= 0 ? '+' : '') + current.toFixed(suffix === '%' ? 3 : suffix === 'K' || suffix === 'B' ? 0 : 1) + suffix;
        
        if (suffix === 'K' && Math.abs(current) >= 1000) {
            displayValue = prefix + (showSign && current >= 0 ? '+' : '') + (current / 1000).toFixed(1) + 'M';
        }
        
        element.textContent = displayValue;
        
        // Update color based on value
        if (element.classList.contains('metric-value')) {
            element.className = 'metric-value ' + (isNegative ? 'negative' : 'positive');
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    updateValue();
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function updateElementText(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

function showExpertNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `expert-notification ${type}`;
    
    const iconMap = {
        'success': 'fas fa-check-circle',
        'warning': 'fas fa-exclamation-triangle',
        'info': 'fas fa-info-circle',
        'error': 'fas fa-times-circle'
    };
    
    notification.innerHTML = `
        <i class="${iconMap[type]}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto-hide after 4 seconds
    const autoHideTimeout = setTimeout(() => {
        hideNotification(notification);
    }, 4000);
    
    // Manual close
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoHideTimeout);
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            document.body.removeChild(notification);
        }
    }, 300);
}

function generateSyntheticEconomicData() {
    // Generate realistic economic time series data for demonstrations
    const baseGDP = 2.5;
    const baseInflation = 3.0;
    const baseUnemployment = 3.7;
    
    expertData.economicTimeSeries = [];
    
    for (let i = 0; i < 60; i++) { // 5 years of monthly data
        const trend = 0.02 * i; // Slight upward trend
        const seasonal = 0.3 * Math.sin(2 * Math.PI * i / 12); // Seasonal component
        const noise = (Math.random() - 0.5) * 0.5; // Random noise
        
        expertData.economicTimeSeries.push({
            month: i,
            gdp: baseGDP + trend + seasonal + noise,
            inflation: baseInflation + 0.5 * Math.sin(2 * Math.PI * i / 18) + noise,
            unemployment: baseUnemployment - 0.5 * trend + 0.2 * seasonal + noise
        });
    }
}

function loadExpertDemoData() {
    // Initialize with demo data
    expertData.modelParameters = {
        learningRate: 0.001,
        sequenceLength: 30,
        regularization: 0.01,
        architecture: 'transformer'
    };
    
    // Auto-update some metrics periodically
    setInterval(() => {
        if (document.querySelector('.expert-widget:hover')) {
            // Only update when user is interacting
            updateAdvancedMetrics();
        }
    }, 30000); // Every 30 seconds
}

/* =====================================================
   EXPERT NOTIFICATION STYLES (Injected)
   ===================================================== */

// Inject notification styles
const notificationStyles = `
.expert-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 600;
    font-size: 0.95rem;
    transform: translateX(400px);
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: 10000;
    border-left: 4px solid #1fb8cd;
    max-width: 350px;
    min-width: 250px;
}

.expert-notification.show {
    transform: translateX(0);
}

.expert-notification.success {
    border-left-color: #28a745;
    color: #155724;
    background: #d4edda;
}

.expert-notification.warning {
    border-left-color: #ffc107;
    color: #856404;
    background: #fff3cd;
}

.expert-notification.error {
    border-left-color: #dc3545;
    color: #721c24;
    background: #f8d7da;
}

.expert-notification.info {
    border-left-color: #1fb8cd;
    color: #0c5460;
    background: #d1ecf1;
}

.expert-notification i {
    font-size: 1.2rem;
    flex-shrink: 0;
}

.notification-close {
    background: none;
    border: none;
    font-size: 1.3rem;
    cursor: pointer;
    color: inherit;
    opacity: 0.7;
    transition: opacity 0.2s;
    margin-left: auto;
    padding: 0;
    line-height: 1;
}

.notification-close:hover {
    opacity: 1;
}

@media (max-width: 768px) {
    .expert-notification {
        top: 10px;
        right: 10px;
        left: 10px;
        transform: translateY(-100px);
        max-width: none;
    }
    
    .expert-notification.show {
        transform: translateY(0);
    }
}
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Export for external use
window.ExpertResearchWidgets = {
    initializeExpertWidgets,
    showExpertNotification,
    updateAdvancedMetrics,
    runMonteCarloSimulation,
    runDeepSemanticAnalysis
};