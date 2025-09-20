/**
 * Economics AI Chatbot
 * A sophisticated chatbot for economics education and analysis
 * Designed for fredericmirindi.com
 */

class EconomicsAIChat {
    constructor() {
        this.isOpen = false;
        this.isMinimized = false;
        this.messages = [];
        this.currentTheme = 'auto';
        this.isTyping = false;
        this.currentChart = null;
        
        // Economic concepts and responses database
        this.economicConcepts = {
            'elasticity': {
                keywords: ['elasticity', 'elastic', 'inelastic', 'price elasticity'],
                response: `**Price Elasticity of Demand** measures how responsive quantity demanded is to price changes.\n\n**Formula:** PED = (% Change in Quantity Demanded) / (% Change in Price)\n\n**Types:**\n• Elastic (|PED| > 1): Luxury goods, substitutes available\n• Inelastic (|PED| < 1): Necessities, few substitutes\n• Unit Elastic (|PED| = 1): Proportional response\n• Perfectly Elastic: Horizontal demand curve\n• Perfectly Inelastic: Vertical demand curve\n\n**Example:** If coffee price increases 10% and demand falls 20%, PED = -20%/10% = -2 (elastic)`
            },
            
            'gdp': {
                keywords: ['gdp', 'gross domestic product', 'economic growth'],
                response: `**Gross Domestic Product (GDP)** measures the total value of goods and services produced in an economy.\n\n**Three Approaches:**\n1. **Expenditure:** GDP = C + I + G + (X - M)\n   - C = Consumption, I = Investment, G = Government, X-M = Net Exports\n\n2. **Income:** Sum of all factor payments (wages, profits, rent, interest)\n\n3. **Output:** Value added by each industry\n\n**Real vs Nominal:**\n• Nominal GDP: Current prices (affected by inflation)\n• Real GDP: Constant prices (inflation-adjusted)\n\n**Growth Rate:** ((GDP₂ - GDP₁) / GDP₁) × 100`
            },
            
            'inflation': {
                keywords: ['inflation', 'cpi', 'consumer price index', 'deflation'],
                response: `**Inflation** is the sustained increase in the general price level of goods and services.\n\n**Measurement:**\n• **CPI:** (Cost of basket today / Cost of base year) × 100\n• **Inflation Rate:** ((CPI₂ - CPI₁) / CPI₁) × 100\n\n**Types:**\n• **Demand-Pull:** Excessive demand relative to supply\n• **Cost-Push:** Rising production costs\n• **Built-in:** Expectations of future inflation\n\n**Effects:**\n• Erodes purchasing power\n• Redistributes wealth (debtors benefit, creditors lose)\n• Creates uncertainty in economic planning\n\n**Control:** Central banks use monetary policy (interest rates)`
            },
            
            'supply and demand': {
                keywords: ['supply', 'demand', 'market equilibrium', 'shortage', 'surplus'],
                response: `**Supply and Demand** determine market prices and quantities.\n\n**Demand Law:** As price ↑, quantity demanded ↓ (ceteris paribus)\n**Demand Shifters:**\n• Income changes (normal vs inferior goods)\n• Preferences and tastes\n• Population and demographics\n• Related goods prices (substitutes/complements)\n• Future expectations\n\n**Supply Law:** As price ↑, quantity supplied ↑\n**Supply Shifters:**\n• Input costs\n• Technology\n• Number of sellers\n• Government regulations\n• Future expectations\n\n**Equilibrium:** Where supply and demand curves intersect\n• **Shortage:** Demand > Supply → Price ↑\n• **Surplus:** Supply > Demand → Price ↓`
            },
            
            'monetary policy': {
                keywords: ['monetary policy', 'federal reserve', 'interest rates', 'money supply'],
                response: `**Monetary Policy** involves central bank actions to influence money supply and interest rates.\n\n**Tools:**\n1. **Open Market Operations:** Buying/selling government securities\n2. **Discount Rate:** Interest rate for bank borrowing from central bank\n3. **Reserve Requirements:** Minimum reserves banks must hold\n\n**Expansionary Policy:** (Economic downturn)\n• Lower interest rates\n• Increase money supply\n• Encourage borrowing and spending\n\n**Contractionary Policy:** (High inflation)\n• Raise interest rates\n• Decrease money supply\n• Reduce borrowing and spending\n\n**Transmission Mechanism:**\nPolicy → Interest Rates → Investment → Aggregate Demand → GDP & Inflation`
            }
        };
        
        // Sample economic data for visualization
        this.sampleData = {
            gdp: {
                labels: ['2019', '2020', '2021', '2022', '2023'],
                data: [21.43, 20.95, 23.32, 25.46, 26.85],
                title: 'US GDP (Trillions USD)'
            },
            inflation: {
                labels: ['2019', '2020', '2021', '2022', '2023'],
                data: [1.8, 1.3, 5.4, 8.0, 4.1],
                title: 'US Inflation Rate (%)'
            },
            unemployment: {
                labels: ['2019', '2020', '2021', '2022', '2023'],
                data: [3.7, 8.1, 5.4, 3.6, 3.7],
                title: 'US Unemployment Rate (%)'
            }
        };
    }

    init() {
        this.createChatWidget();
        this.bindEvents();
        this.loadConversationHistory();
    }

    createChatWidget() {
        const widget = document.createElement('div');
        widget.id = 'economics-chat-widget';
        widget.innerHTML = `
            <!-- Chat Toggle Button -->
            <button id="chat-toggle" class="chat-toggle" aria-label="Open Economics AI Assistant">
                <div class="chat-icon">
                    <svg viewBox="0 0 24 24">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                    </svg>
                </div>
                <div class="chat-badge">AI</div>
                <div class="chat-pulse"></div>
            </button>

            <!-- Chat Window -->
            <div id="chat-window" class="chat-window">
                <div class="chat-header">
                    <div class="chat-title">
                        <h3>Economics AI Assistant</h3>
                        <p>Specialized in economic analysis & research</p>
                    </div>
                    <div class="chat-controls">
                        <button id="minimize-chat" class="control-btn" aria-label="Minimize">−</button>
                        <button id="close-chat" class="control-btn" aria-label="Close">×</button>
                    </div>
                </div>

                <div class="chat-body">
                    <div id="chat-messages" class="chat-messages"></div>
                    
                    <!-- Quick Actions -->
                    <div id="quick-actions" class="quick-actions">
                        <div class="quick-action" data-action="explain-gdp">
                            <span class="action-icon">📊</span>
                            <span class="action-text">Explain GDP</span>
                        </div>
                        <div class="quick-action" data-action="elasticity-calculator">
                            <span class="action-icon">📈</span>
                            <span class="action-text">Price Elasticity</span>
                        </div>
                        <div class="quick-action" data-action="show-economic-data">
                            <span class="action-icon">📉</span>
                            <span class="action-text">Economic Data</span>
                        </div>
                        <div class="quick-action" data-action="inflation-analysis">
                            <span class="action-icon">💰</span>
                            <span class="action-text">Inflation Analysis</span>
                        </div>
                        <div class="quick-action" data-action="supply-demand">
                            <span class="action-icon">⚖️</span>
                            <span class="action-text">Supply & Demand</span>
                        </div>
                        <div class="quick-action" data-action="monetary-policy">
                            <span class="action-icon">🏦</span>
                            <span class="action-text">Monetary Policy</span>
                        </div>
                    </div>
                </div>

                <div class="chat-footer">
                    <div class="chat-input-container">
                        <input type="text" id="chat-input" placeholder="Ask about economics concepts, calculations, or data analysis..." maxlength="500" />
                        <button id="send-message" class="send-btn" aria-label="Send message">
                            <svg viewBox="0 0 24 24">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="input-actions">
                        <button class="action-btn" id="clear-chat-btn" title="Clear conversation">
                            <svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/></svg>
                            Clear
                        </button>
                        <button class="action-btn" id="export-chat-btn" title="Export conversation">
                            <svg viewBox="0 0 24 24"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>
                            Export
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(widget);
    }

    bindEvents() {
        const toggleBtn = document.getElementById('chat-toggle');
        const closeBtn = document.getElementById('close-chat');
        const minimizeBtn = document.getElementById('minimize-chat');
        const sendBtn = document.getElementById('send-message');
        const chatInput = document.getElementById('chat-input');
        const clearBtn = document.getElementById('clear-chat-btn');
        const exportBtn = document.getElementById('export-chat-btn');
        const quickActions = document.querySelectorAll('.quick-action');

        toggleBtn?.addEventListener('click', () => this.toggleChat());
        closeBtn?.addEventListener('click', () => this.closeChat());
        minimizeBtn?.addEventListener('click', () => this.minimizeChat());
        sendBtn?.addEventListener('click', () => this.sendMessage());
        clearBtn?.addEventListener('click', () => this.clearChat());
        exportBtn?.addEventListener('click', () => this.exportChat());
        
        chatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        quickActions.forEach(action => {
            action.addEventListener('click', () => {
                const actionType = action.getAttribute('data-action');
                this.handleQuickAction(actionType);
            });
        });

        // Handle outside clicks to close chat
        document.addEventListener('click', (e) => {
            const chatWidget = document.getElementById('economics-chat-widget');
            if (this.isOpen && !chatWidget?.contains(e.target)) {
                // Don't close if clicking on charts or other interactive elements
                if (!e.target.closest('.chart-container')) {
                    this.closeChat();
                }
            }
        });
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        const chatWindow = document.getElementById('chat-window');
        const toggleBtn = document.getElementById('chat-toggle');
        
        if (chatWindow && toggleBtn) {
            this.isOpen = true;
            this.isMinimized = false;
            chatWindow.classList.add('open');
            toggleBtn.classList.add('active');
            
            // Show welcome message if no previous messages
            if (this.messages.length === 0) {
                this.addMessage('assistant', this.getWelcomeMessage());
                this.showQuickActions();
            }
            
            // Focus on input
            setTimeout(() => {
                const input = document.getElementById('chat-input');
                input?.focus();
            }, 300);
        }
    }

    closeChat() {
        const chatWindow = document.getElementById('chat-window');
        const toggleBtn = document.getElementById('chat-toggle');
        
        if (chatWindow && toggleBtn) {
            this.isOpen = false;
            this.isMinimized = false;
            chatWindow.classList.remove('open', 'minimized');
            toggleBtn.classList.remove('active');
        }
    }

    minimizeChat() {
        const chatWindow = document.getElementById('chat-window');
        
        if (chatWindow) {
            this.isMinimized = true;
            chatWindow.classList.add('minimized');
        }
    }

    getWelcomeMessage() {
        return `👋 Hello! I'm your **Economics AI Assistant**, specialized in helping with:\n\n• **Economic Concepts**: Supply & demand, elasticity, market structures\n• **Calculations**: GDP, inflation rates, economic indicators  \n• **Data Analysis**: Visualizing and interpreting economic data\n• **Policy Analysis**: Monetary & fiscal policy impacts\n• **Research Support**: Econometric methods, statistical analysis\n\nWhat would you like to explore today? You can use the quick actions below or ask me anything about economics!`;
    }

    addMessage(sender, content, options = {}) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        const messageId = 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        const message = {
            id: messageId,
            sender,
            content,
            timestamp: new Date(),
            ...options
        };

        this.messages.push(message);

        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}`;
        messageElement.id = messageId;
        
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageElement.innerHTML = `
            <div class="message-content">
                <div class="message-text">${this.formatMessage(content)}</div>
                <div class="message-time">${time}</div>
            </div>
        `;

        messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
        
        // Save to localStorage
        this.saveConversationHistory();

        return messageId;
    }

    formatMessage(content) {
        // Convert markdown-like formatting to HTML
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/•/g, '&bullet;');
    }

    showTyping() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const typingElement = document.createElement('div');
        typingElement.className = 'message assistant typing';
        typingElement.id = 'typing-indicator';
        
        typingElement.innerHTML = `
            <div class="message-content">
                <div class="typing-animation">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;

        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer?.appendChild(typingElement);
        this.scrollToBottom();
    }

    hideTyping() {
        const typingElement = document.getElementById('typing-indicator');
        if (typingElement) {
            typingElement.remove();
            this.isTyping = false;
        }
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        if (!input) return;

        const message = input.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage('user', message);
        input.value = '';

        // Hide quick actions
        this.hideQuickActions();

        // Show typing indicator and generate response
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(message);
            this.addMessage('assistant', response);
        }, 1000 + Math.random() * 1000);
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Check for specific economic concepts
        for (const [concept, data] of Object.entries(this.economicConcepts)) {
            if (data.keywords.some(keyword => message.includes(keyword))) {
                return data.response;
            }
        }
        
        // Check for calculation requests
        if (message.includes('calculate') || message.includes('compute')) {
            return this.getCalculationResponse(message);
        }
        
        // Check for data visualization requests
        if (message.includes('show') || message.includes('chart') || message.includes('graph')) {
            return this.getDataVisualizationResponse(message);
        }
        
        // Default response
        return this.getDefaultResponse(message);
    }

    getCalculationResponse(message) {
        if (message.includes('gdp')) {
            return `I can help you calculate GDP! Here are the main methods:\n\n**Expenditure Approach:** GDP = C + I + G + (X - M)\n- C = Consumer spending\n- I = Business investment  \n- G = Government purchases\n- X = Exports, M = Imports\n\n**Example Calculation:**\n- Consumption: $15 trillion\n- Investment: $3 trillion\n- Government: $3.5 trillion\n- Net Exports: -$0.5 trillion\n- **GDP = $21 trillion**\n\nWould you like me to help with a specific GDP calculation?`;
        }
        
        if (message.includes('elasticity')) {
            return `**Price Elasticity of Demand Calculation:**\n\n**Formula:** PED = (% Change in Qd) ÷ (% Change in Price)\n\n**Step-by-step:**\n1. Calculate % change in quantity: ((Q₂ - Q₁) ÷ Q₁) × 100\n2. Calculate % change in price: ((P₂ - P₁) ÷ P₁) × 100  \n3. Divide the results: PED = Step 1 ÷ Step 2\n\n**Example:**\n- Original: Price = $10, Quantity = 100\n- New: Price = $12, Quantity = 80\n- % Change in Qd = ((80-100)/100) × 100 = -20%\n- % Change in Price = ((12-10)/10) × 100 = 20%\n- **PED = -20% ÷ 20% = -1.0 (Unit Elastic)**\n\nNeed help with specific numbers?`;
        }
        
        return `I can help you calculate various economic indicators! Some examples:\n\n• **GDP** using expenditure, income, or output approach\n• **Inflation rate** using CPI data\n• **Price elasticity** of demand or supply\n• **Economic growth** rates\n• **Real vs nominal** values\n• **Present value** and discounting\n\nWhat specific calculation would you like help with?`;
    }

    getDataVisualizationResponse(message) {
        // Create a chart based on the request
        setTimeout(() => {
            if (message.includes('gdp')) {
                this.createChart('gdp');
            } else if (message.includes('inflation')) {
                this.createChart('inflation');
            } else if (message.includes('unemployment')) {
                this.createChart('unemployment');
            } else {
                this.createChart('gdp'); // Default
            }
        }, 500);
        
        return `I'll show you the economic data visualization. Charts are great for understanding trends and patterns in economic data.\n\nHere's what I can visualize:\n• GDP growth trends\n• Inflation rates over time  \n• Unemployment statistics\n• Economic indicators comparison\n• Custom data you provide\n\nThe chart will appear below this message.`;
    }

    getDefaultResponse(message) {
        const responses = [
            `That's an interesting economics question! Could you be more specific about what aspect you'd like to explore?\n\nI can help with:\n• **Theory**: Economic concepts and models\n• **Calculations**: Quantitative analysis\n• **Data**: Trends and visualizations  \n• **Policy**: Impact analysis\n• **Research**: Methods and interpretation`,

            `I'm here to help with economics! Based on your question, you might be interested in:\n\n• **Microeconomics**: Individual markets, firms, consumers\n• **Macroeconomics**: National economy, GDP, inflation\n• **Econometrics**: Statistical analysis of economic data\n• **Development**: Growth, poverty, international trade\n\nWhat specific area would you like to dive into?`,

            `Great question! Economics covers many fascinating topics. Let me know if you want to explore:\n\n• **Market Analysis**: Supply, demand, equilibrium\n• **Economic Indicators**: GDP, CPI, unemployment\n• **Policy Effects**: Government intervention impacts\n• **Quantitative Methods**: Statistics, modeling, forecasting\n\nWhich direction interests you most?`
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    handleQuickAction(actionType) {
        this.hideQuickActions();
        
        const actions = {
            'explain-gdp': () => {
                this.addMessage('user', 'Explain GDP and how it\'s calculated');
                this.showTyping();
                setTimeout(() => {
                    this.hideTyping();
                    this.addMessage('assistant', this.economicConcepts.gdp.response);
                }, 1200);
            },
            
            'elasticity-calculator': () => {
                this.addMessage('user', 'Help me calculate price elasticity of demand');
                this.showTyping();
                setTimeout(() => {
                    this.hideTyping();
                    this.addMessage('assistant', this.economicConcepts.elasticity.response);
                }, 1000);
            },
            
            'show-economic-data': () => {
                this.addMessage('user', 'Show me economic data trends');
                this.showTyping();
                setTimeout(() => {
                    this.hideTyping();
                    this.addMessage('assistant', 'Here are key US economic indicators over recent years:');
                    this.createChart('gdp');
                }, 1200);
            },
            
            'inflation-analysis': () => {
                this.addMessage('user', 'Explain inflation and show recent trends');
                this.showTyping();
                setTimeout(() => {
                    this.hideTyping();
                    this.addMessage('assistant', this.economicConcepts.inflation.response);
                    this.createChart('inflation');
                }, 1500);
            },
            
            'supply-demand': () => {
                this.addMessage('user', 'Explain supply and demand theory');
                this.showTyping();
                setTimeout(() => {
                    this.hideTyping();
                    this.addMessage('assistant', this.economicConcepts['supply and demand'].response);
                }, 1300);
            },
            
            'monetary-policy': () => {
                this.addMessage('user', 'Explain monetary policy and its tools');
                this.showTyping();
                setTimeout(() => {
                    this.hideTyping();
                    this.addMessage('assistant', this.economicConcepts['monetary policy'].response);
                }, 1400);
            }
        };
        
        const action = actions[actionType];
        if (action) {
            action();
        }
    }

    createChart(dataType) {
        const data = this.sampleData[dataType];
        if (!data) return;
        
        const chartId = 'chart-' + Date.now();
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        chartContainer.innerHTML = `
            <canvas id="${chartId}" width="400" height="200"></canvas>
            <div class="chart-info">
                <h4>${data.title}</h4>
                <p>Data visualization showing trends over time</p>
            </div>
        `;
        
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer?.appendChild(chartContainer);
        
        // Create chart after DOM update
        setTimeout(() => {
            const ctx = document.getElementById(chartId)?.getContext('2d');
            if (ctx && window.Chart) {
                this.currentChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: data.labels,
                        datasets: [{
                            label: data.title,
                            data: data.data,
                            borderColor: '#2563eb',
                            backgroundColor: 'rgba(37, 99, 235, 0.1)',
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4,
                            pointBackgroundColor: '#2563eb',
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 8
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
                                beginAtZero: dataType === 'unemployment',
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.1)'
                                }
                            },
                            x: {
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.1)'
                                }
                            }
                        }
                    }
                });
            }
        }, 100);
        
        this.scrollToBottom();
    }

    showQuickActions() {
        const quickActions = document.getElementById('quick-actions');
        if (quickActions) {
            quickActions.style.display = 'grid';
        }
    }

    hideQuickActions() {
        const quickActions = document.getElementById('quick-actions');
        if (quickActions) {
            quickActions.style.display = 'none';
        }
    }

    clearChat() {
        const messagesContainer = document.getElementById('chat-messages');
        if (messagesContainer) {
            messagesContainer.innerHTML = '';
            this.messages = [];
            this.addMessage('assistant', this.getWelcomeMessage());
            this.showQuickActions();
            this.saveConversationHistory();
        }
    }

    exportChat() {
        const conversation = this.messages.map(msg => 
            `[${msg.timestamp.toLocaleString()}] ${msg.sender.toUpperCase()}: ${msg.content}`
        ).join('\\n\\n');
        
        const blob = new Blob([conversation], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `economics-chat-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chat-messages');
        if (messagesContainer) {
            setTimeout(() => {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 100);
        }
    }

    saveConversationHistory() {
        try {
            localStorage.setItem('economics-chat-history', JSON.stringify(this.messages));
        } catch (e) {
            console.warn('Could not save chat history:', e);
        }
    }

    loadConversationHistory() {
        try {
            const saved = localStorage.getItem('economics-chat-history');
            if (saved) {
                this.messages = JSON.parse(saved);
                // Don't restore messages on load, start fresh each session
            }
        } catch (e) {
            console.warn('Could not load chat history:', e);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.economicsChat = new EconomicsAIChat();
        window.economicsChat.init();
    });
} else {
    window.economicsChat = new EconomicsAIChat();
    window.economicsChat.init();
}