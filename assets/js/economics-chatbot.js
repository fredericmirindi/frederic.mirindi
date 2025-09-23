/**
 * Economics AI Chatbot - Professional Implementation
 * Specialized AI assistant for Economics, Finance, and Mathematical calculations
 * Author: Frédéric Mirindi
 * Version: 1.0.0
 */

(function() {
    'use strict';

    // Global configuration
    const CONFIG = {
        name: 'Economics AI Assistant',
        version: '1.0.0',
        maxMessages: 100,
        typingDelay: 1200,
        animationDelay: 300,
        storageKey: 'economics-chat-history',
        theme: {
            primary: '#238C8C',
            secondary: '#1fb8cd',
            accent: '#00ff88'
        }
    };

    // Economics Knowledge Base
    const ECONOMICS_KB = {
        // Basic Economic Concepts
        'gdp': {
            definition: "Gross Domestic Product (GDP) is the total monetary value of all finished goods and services produced within a country's borders in a specific time period.",
            formula: "GDP = C + I + G + (X - M)",
            explanation: "Where C = Consumption, I = Investment, G = Government Spending, X = Exports, M = Imports",
            examples: ["US GDP in 2023 was approximately $25.46 trillion", "GDP per capita = GDP / Population"]
        },
        'inflation': {
            definition: "Inflation is the rate at which the general level of prices for goods and services rises, eroding purchasing power.",
            formula: "Inflation Rate = ((CPI_current - CPI_previous) / CPI_previous) × 100",
            explanation: "Measured using Consumer Price Index (CPI) or other price indices",
            examples: ["If CPI rises from 100 to 103, inflation rate = 3%", "Target inflation rate in many countries is around 2%"]
        },
        'elasticity': {
            definition: "Price elasticity of demand measures how responsive demand is to changes in price.",
            formula: "PED = (% Change in Quantity Demanded) / (% Change in Price)",
            explanation: "Elastic if |PED| > 1, Inelastic if |PED| < 1, Unit elastic if |PED| = 1",
            examples: ["Luxury goods tend to be elastic", "Necessities tend to be inelastic"]
        },
        'supply': {
            definition: "Supply is the quantity of a product that producers are willing and able to offer at various prices.",
            formula: "Qs = f(P, Pr, T, N, E)",
            explanation: "Where P=Price, Pr=Resource prices, T=Technology, N=Number of sellers, E=Expectations",
            examples: ["Law of supply: as price increases, quantity supplied increases"]
        },
        'demand': {
            definition: "Demand is the quantity of a product that consumers are willing and able to purchase at various prices.",
            formula: "Qd = f(P, I, Pr, T, E, N)",
            explanation: "Where P=Price, I=Income, Pr=Related prices, T=Tastes, E=Expectations, N=Number of buyers",
            examples: ["Law of demand: as price increases, quantity demanded decreases"]
        },
        'monetary policy': {
            definition: "Monetary policy involves managing money supply and interest rates to achieve macroeconomic objectives.",
            formula: "Money Supply × Velocity = Price Level × Real Output (MV = PY)",
            explanation: "Central banks use tools like interest rates, reserve requirements, and open market operations",
            examples: ["Lowering interest rates stimulates economic growth", "Raising rates helps control inflation"]
        }
    };

    // Economic Data for Visualizations
    const ECONOMIC_DATA = {
        gdp_growth: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
            data: [2.2, -3.4, 5.7, 2.1, 2.5, 2.8],
            title: 'GDP Growth Rate (%)',
            color: '#238C8C'
        },
        inflation_rate: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: [7.5, 7.9, 8.5, 8.3, 8.6, 9.1, 8.5, 8.3, 8.2, 7.7, 7.1, 6.5],
            title: 'Annual Inflation Rate (%)',
            color: '#1fb8cd'
        },
        unemployment: {
            labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
            data: [3.7, 3.6, 3.8, 3.7, 3.9, 4.0],
            title: 'Unemployment Rate (%)',
            color: '#00ff88'
        }
    };

    // Mathematical Functions
    const MATH_FUNCTIONS = {
        compound_interest: (P, r, t, n = 1) => {
            return P * Math.pow(1 + r/n, n*t);
        },
        present_value: (FV, r, t) => {
            return FV / Math.pow(1 + r, t);
        },
        elasticity: (q1, q2, p1, p2) => {
            const percentChangeQ = ((q2 - q1) / q1) * 100;
            const percentChangeP = ((p2 - p1) / p1) * 100;
            return percentChangeQ / percentChangeP;
        },
        gdp_calculation: (C, I, G, X, M) => {
            return C + I + G + (X - M);
        },
        inflation_rate: (current_cpi, previous_cpi) => {
            return ((current_cpi - previous_cpi) / previous_cpi) * 100;
        }
    };

    // Chat state management
    let chatState = {
        isOpen: false,
        messages: [],
        isTyping: false,
        currentChart: null
    };

    // DOM elements
    let elements = {};

    /**
     * Initialize the Economics AI Chatbot
     */
    function initEconomicsChatbot() {
        console.log('🤖 Initializing Economics AI Chatbot v' + CONFIG.version);
        
        createChatbotElements();
        bindEventHandlers();
        loadChatHistory();
        
        console.log('✅ Economics AI Chatbot initialized successfully');
    }

    /**
     * Create chatbot HTML elements
     */
    function createChatbotElements() {
        // Create floating action button
        const fab = document.createElement('div');
        fab.id = 'economics-chatbot-fab';
        fab.className = 'economics-chatbot-fab';
        fab.setAttribute('aria-label', 'Open Economics AI Assistant');
        fab.setAttribute('role', 'button');
        fab.setAttribute('tabindex', '0');
        
        fab.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
        `;
        
        document.body.appendChild(fab);
        elements.fab = fab;

        // Create modal
        const modal = document.createElement('div');
        modal.id = 'economics-chatbot-modal';
        modal.className = 'economics-chatbot-modal economics-hidden';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'economics-chatbot-title');
        
        modal.innerHTML = `
            <div class="economics-chatbot-header">
                <div class="economics-chatbot-title-section">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span id="economics-chatbot-title">Economics AI Assistant</span>
                </div>
                <button id="economics-chatbot-close" aria-label="Close chatbot" title="Close">&times;</button>
            </div>
            
            <div class="economics-chatbot-messages" id="economics-chatbot-messages">
                <div class="economics-bot-welcome-message">
                    <div class="economics-bot-avatar">🧠</div>
                    <div class="economics-welcome-content">
                        <p><strong>Hello! I'm your Economics AI Assistant.</strong></p>
                        <p>I specialize in:</p>
                        <div class="economics-capabilities-grid">
                            <span class="economics-capability-tag">📊 Economic Theory</span>
                            <span class="economics-capability-tag">🧮 Calculations</span>
                            <span class="economics-capability-tag">📈 Data Analysis</span>
                            <span class="economics-capability-tag">💰 Finance</span>
                        </div>
                        <p class="economics-example-text">Try: "What is GDP?" or "Calculate compound interest"</p>
                    </div>
                </div>
            </div>
            
            <div class="economics-quick-actions" id="economics-quick-actions">
                <button class="economics-quick-action" data-question="What is GDP?">GDP</button>
                <button class="economics-quick-action" data-question="Explain inflation">Inflation</button>
                <button class="economics-quick-action" data-question="Price elasticity">Elasticity</button>
                <button class="economics-quick-action" data-question="Show economic data">Charts</button>
            </div>
            
            <div class="economics-typing-indicator economics-hidden" id="economics-typing-indicator">
                <div class="economics-bot-avatar">🤖</div>
                <div class="economics-typing-dots">
                    <div class="economics-typing-dot"></div>
                    <div class="economics-typing-dot"></div>
                    <div class="economics-typing-dot"></div>
                </div>
            </div>
            
            <form id="economics-chatbot-form" class="economics-chatbot-input-area" autocomplete="off">
                <input 
                    id="economics-chatbot-input" 
                    type="text" 
                    placeholder="Ask about economics, calculations, or data..." 
                    autocomplete="off" 
                    maxlength="500"
                />
                <button type="submit" aria-label="Send message" title="Send">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="currentColor"/>
                    </svg>
                </button>
            </form>
        `;
        
        document.body.appendChild(modal);
        elements.modal = modal;
        elements.messages = modal.querySelector('#economics-chatbot-messages');
        elements.input = modal.querySelector('#economics-chatbot-input');
        elements.form = modal.querySelector('#economics-chatbot-form');
        elements.closeBtn = modal.querySelector('#economics-chatbot-close');
        elements.quickActions = modal.querySelector('#economics-quick-actions');
        elements.typingIndicator = modal.querySelector('#economics-typing-indicator');
    }

    /**
     * Bind event handlers
     */
    function bindEventHandlers() {
        // FAB click handler
        elements.fab.addEventListener('click', toggleChatbot);
        elements.fab.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleChatbot();
            }
        });

        // Close button handler
        elements.closeBtn.addEventListener('click', closeChatbot);

        // Form submission
        elements.form.addEventListener('submit', handleSubmit);

        // Quick actions
        elements.quickActions.addEventListener('click', (e) => {
            if (e.target.classList.contains('economics-quick-action')) {
                const question = e.target.dataset.question;
                if (question) {
                    elements.input.value = question;
                    handleSubmit(new Event('submit'));
                }
            }
        });

        // Click outside to close
        document.addEventListener('click', (e) => {
            if (chatState.isOpen && !elements.modal.contains(e.target) && !elements.fab.contains(e.target)) {
                closeChatbot();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && chatState.isOpen) {
                closeChatbot();
            }
        });
    }

    /**
     * Toggle chatbot visibility
     */
    function toggleChatbot() {
        if (chatState.isOpen) {
            closeChatbot();
        } else {
            openChatbot();
        }
    }

    /**
     * Open chatbot
     */
    function openChatbot() {
        chatState.isOpen = true;
        elements.modal.classList.remove('economics-hidden');
        setTimeout(() => {
            elements.modal.classList.add('show');
            elements.input.focus();
        }, 10);
    }

    /**
     * Close chatbot
     */
    function closeChatbot() {
        chatState.isOpen = false;
        elements.modal.classList.remove('show');
        setTimeout(() => {
            elements.modal.classList.add('economics-hidden');
        }, 300);
    }

    /**
     * Handle form submission
     */
    function handleSubmit(e) {
        e.preventDefault();
        
        const message = elements.input.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        elements.input.value = '';

        // Show typing indicator
        showTyping();

        // Process and respond
        setTimeout(() => {
            const response = processMessage(message);
            hideTyping();
            addMessage(response.text, 'bot');
            
            // Add chart if needed
            if (response.chart) {
                addChart(response.chart);
            }

            saveChatHistory();
        }, CONFIG.typingDelay);
    }

    /**
     * Add message to chat
     */
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `economics-message ${sender}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'economics-bot-avatar';
        avatar.textContent = sender === 'user' ? '👤' : '🧠';
        
        const content = document.createElement('div');
        content.className = 'economics-message-content';
        content.innerHTML = formatMessage(text);
        
        const time = document.createElement('div');
        time.className = 'economics-message-time';
        time.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        content.appendChild(time);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        elements.messages.appendChild(messageDiv);
        scrollToBottom();
        
        // Store in chat state
        chatState.messages.push({
            text: text,
            sender: sender,
            timestamp: new Date().toISOString()
        });
    }

    /**
     * Format message content
     */
    function formatMessage(text) {
        // Handle mathematical expressions
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        text = text.replace(/\n/g, '<br>');
        
        return text;
    }

    /**
     * Process user message and generate response
     */
    function processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for economic concepts
        for (const [key, concept] of Object.entries(ECONOMICS_KB)) {
            if (lowerMessage.includes(key)) {
                return {
                    text: `**${concept.definition}**\n\n**Formula:** ${concept.formula}\n\n**Explanation:** ${concept.explanation}\n\n**Examples:**\n• ${concept.examples.join('\n• ')}`,
                    chart: key === 'gdp' ? 'gdp_growth' : key === 'inflation' ? 'inflation_rate' : null
                };
            }
        }

        // Check for calculations
        if (lowerMessage.includes('calculate') || lowerMessage.includes('compute')) {
            return handleCalculation(message);
        }

        // Check for chart requests
        if (lowerMessage.includes('chart') || lowerMessage.includes('graph') || lowerMessage.includes('data')) {
            return {
                text: "Here are some key economic indicators:",
                chart: 'gdp_growth'
            };
        }

        // Mathematical expressions
        if (containsMathExpression(message)) {
            return handleMathExpression(message);
        }

        // Default responses based on keywords
        const responses = {
            'hello': 'Hello! I\'m here to help with economics, finance, and mathematical calculations. What would you like to explore?',
            'help': 'I can help you with:\n• Economic concepts (GDP, inflation, elasticity)\n• Financial calculations\n• Economic data visualization\n• Mathematical formulas\n\nWhat specific topic interests you?',
            'policy': 'Economic policy involves government decisions on spending, taxation, and regulation to influence the economy. Would you like to know about fiscal policy, monetary policy, or trade policy?',
            'market': 'Markets are where buyers and sellers interact to exchange goods and services. I can explain market structures, supply and demand, or market failures. What specific aspect interests you?'
        };

        for (const [keyword, response] of Object.entries(responses)) {
            if (lowerMessage.includes(keyword)) {
                return { text: response };
            }
        }

        // Default response
        return {
            text: "I'd be happy to help you with economics, finance, or mathematical questions! Try asking about:\n\n• **Economic concepts**: GDP, inflation, elasticity\n• **Calculations**: compound interest, present value\n• **Data visualization**: economic charts and trends\n• **Formulas**: economic and financial equations\n\nWhat would you like to explore?"
        };
    }

    /**
     * Handle calculation requests
     */
    function handleCalculation(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('compound interest')) {
            return {
                text: "**Compound Interest Formula:**\n\nA = P(1 + r/n)^(nt)\n\nWhere:\n• A = Final amount\n• P = Principal\n• r = Annual interest rate\n• n = Times compounded per year\n• t = Time in years\n\n**Example:** $1,000 at 5% for 10 years compounded annually = $1,628.89"
            };
        }
        
        if (lowerMessage.includes('present value')) {
            return {
                text: "**Present Value Formula:**\n\nPV = FV / (1 + r)^t\n\nWhere:\n• PV = Present Value\n• FV = Future Value\n• r = Discount rate\n• t = Time periods\n\n**Example:** $1,000 in 5 years at 6% discount rate = $747.26 today"
            };
        }
        
        if (lowerMessage.includes('elasticity')) {
            return {
                text: "**Price Elasticity of Demand:**\n\nPED = (% Change in Quantity) / (% Change in Price)\n\n**Interpretation:**\n• |PED| > 1: Elastic (responsive to price)\n• |PED| < 1: Inelastic (less responsive)\n• |PED| = 1: Unit elastic\n\n**Example:** If price increases 10% and quantity decreases 20%, PED = -2 (elastic)"
            };
        }
        
        return {
            text: "I can help calculate:\n• Compound interest\n• Present value\n• Price elasticity\n• GDP components\n• Inflation rates\n\nPlease specify which calculation you need!"
        };
    }

    /**
     * Check if message contains mathematical expressions
     */
    function containsMathExpression(message) {
        const mathPatterns = [
            /\d+\s*[+\-*/]\s*\d+/,
            /\d+\s*\^\s*\d+/,
            /sqrt\(\d+\)/,
            /log\(\d+\)/
        ];
        
        return mathPatterns.some(pattern => pattern.test(message));
    }

    /**
     * Handle mathematical expressions
     */
    function handleMathExpression(message) {
        try {
            // Simple math evaluation (secure for basic operations)
            let expression = message
                .replace(/\^/g, '**')
                .replace(/sqrt\((\d+)\)/g, 'Math.sqrt($1)')
                .replace(/log\((\d+)\)/g, 'Math.log($1)')
                .replace(/[^0-9+\-*/.() ]/g, '');
            
            if (expression) {
                const result = Function('"use strict"; return (' + expression + ')')();
                return {
                    text: `**Calculation Result:**\n\n${message} = **${result}**\n\n*Note: For complex financial calculations, please specify the type (compound interest, present value, etc.)*`
                };
            }
        } catch (e) {
            // Fall through to default response
        }
        
        return {
            text: "I can help with mathematical calculations! For accurate results, please use formats like:\n• 2 + 2\n• 5 * 10\n• sqrt(144)\n• 2^8\n\nOr ask for specific economic calculations like compound interest or elasticity."
        };
    }

    /**
     * Add chart to conversation
     */
    function addChart(chartType) {
        const chartContainer = document.createElement('div');
        chartContainer.className = 'economics-chart-container';
        
        const chartTitle = document.createElement('div');
        chartTitle.className = 'economics-chart-title';
        chartTitle.textContent = ECONOMIC_DATA[chartType].title;
        
        const canvas = document.createElement('canvas');
        canvas.className = 'economics-chart-canvas';
        canvas.width = 350;
        canvas.height = 200;
        
        chartContainer.appendChild(chartTitle);
        chartContainer.appendChild(canvas);
        elements.messages.appendChild(chartContainer);
        
        // Create chart using Chart.js if available
        if (typeof Chart !== 'undefined') {
            createChart(canvas, chartType);
        } else {
            // Fallback: draw simple chart
            drawSimpleChart(canvas, chartType);
        }
        
        scrollToBottom();
    }

    /**
     * Create chart using Chart.js
     */
    function createChart(canvas, chartType) {
        const data = ECONOMIC_DATA[chartType];
        
        new Chart(canvas, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: data.title,
                    data: data.data,
                    borderColor: data.color,
                    backgroundColor: data.color + '20',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3
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
                        beginAtZero: false,
                        grid: {
                            color: '#e1e8ed'
                        }
                    },
                    x: {
                        grid: {
                            color: '#e1e8ed'
                        }
                    }
                }
            }
        });
    }

    /**
     * Draw simple chart fallback
     */
    function drawSimpleChart(canvas, chartType) {
        const ctx = canvas.getContext('2d');
        const data = ECONOMIC_DATA[chartType];
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = data.color;
        ctx.lineWidth = 2;
        
        const padding = 40;
        const width = canvas.width - 2 * padding;
        const height = canvas.height - 2 * padding;
        
        const maxValue = Math.max(...data.data);
        const minValue = Math.min(...data.data);
        const valueRange = maxValue - minValue;
        
        ctx.beginPath();
        data.data.forEach((value, index) => {
            const x = padding + (index / (data.data.length - 1)) * width;
            const y = padding + height - ((value - minValue) / valueRange) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        // Add data points
        ctx.fillStyle = data.color;
        data.data.forEach((value, index) => {
            const x = padding + (index / (data.data.length - 1)) * width;
            const y = padding + height - ((value - minValue) / valueRange) * height;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    /**
     * Show typing indicator
     */
    function showTyping() {
        chatState.isTyping = true;
        elements.typingIndicator.classList.remove('economics-hidden');
        elements.typingIndicator.classList.add('show');
        scrollToBottom();
    }

    /**
     * Hide typing indicator
     */
    function hideTyping() {
        chatState.isTyping = false;
        elements.typingIndicator.classList.remove('show');
        elements.typingIndicator.classList.add('economics-hidden');
    }

    /**
     * Scroll to bottom of messages
     */
    function scrollToBottom() {
        elements.messages.scrollTop = elements.messages.scrollHeight;
    }

    /**
     * Save chat history to localStorage
     */
    function saveChatHistory() {
        try {
            const history = {
                messages: chatState.messages.slice(-CONFIG.maxMessages),
                timestamp: new Date().toISOString()
            };
            localStorage.setItem(CONFIG.storageKey, JSON.stringify(history));
        } catch (e) {
            console.warn('Could not save chat history:', e);
        }
    }

    /**
     * Load chat history from localStorage
     */
    function loadChatHistory() {
        try {
            const stored = localStorage.getItem(CONFIG.storageKey);
            if (stored) {
                const history = JSON.parse(stored);
                chatState.messages = history.messages || [];
                
                // Optionally restore messages to UI
                // (commented out to keep welcome message prominent)
                /*
                history.messages.forEach(msg => {
                    addMessage(msg.text, msg.sender);
                });
                */
            }
        } catch (e) {
            console.warn('Could not load chat history:', e);
        }
    }

    /**
     * Initialize when DOM is ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEconomicsChatbot);
    } else {
        initEconomicsChatbot();
    }

    // Export for global access (optional)
    window.EconomicsChatbot = {
        open: openChatbot,
        close: closeChatbot,
        toggle: toggleChatbot,
        addMessage: addMessage,
        version: CONFIG.version
    };

})();