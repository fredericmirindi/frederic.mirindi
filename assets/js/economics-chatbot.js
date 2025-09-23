/**
 * Economika - AI Economics Assistant - Professional Implementation
 * Specialized AI assistant for Microeconomics, Macroeconomics, Economic History, Econometrics, and Statistics
 * Author: Frédéric Mirindi
 * Version: 2.1.0 - Now with Famous Economists Database
 */

(function() {
    'use strict';

    // Global configuration
    const CONFIG = {
        name: 'Economika',
        version: '2.1.0',
        maxMessages: 100,
        typingDelay: 1200,
        animationDelay: 300,
        storageKey: 'economika-chat-history',
        theme: {
            primary: '#238C8C',
            secondary: '#1fb8cd',
            accent: '#00ff88'
        }
    };

    // Famous Economists Database
    const FAMOUS_ECONOMISTS = {
        'adam smith': {
            name: "Adam Smith (1723-1790)",
            description: "Scottish philosopher and economist, known as the 'Father of Modern Economics' and author of 'The Wealth of Nations'.",
            keyContributions: [
                "Invisible Hand theory - market self-regulation",
                "Division of labor and specialization",
                "Free trade and laissez-faire economics",
                "Theory of Moral Sentiments"
            ],
            famousQuote: "It is not from the benevolence of the butcher, the brewer, or the baker that we expect our dinner, but from their regard to their own interest.",
            majorWorks: ["The Wealth of Nations (1776)", "The Theory of Moral Sentiments (1759)"],
            school: "Classical Economics",
            field: "Microeconomics, Political Economy"
        },
        'john maynard keynes': {
            name: "John Maynard Keynes (1883-1946)",
            description: "British economist whose ideas fundamentally changed macroeconomic theory and government economic policy.",
            keyContributions: [
                "Keynesian economics - government intervention",
                "Liquidity preference theory",
                "Multiplier effect",
                "General Theory of Employment, Interest and Money"
            ],
            famousQuote: "In the long run we are all dead.",
            majorWorks: ["The General Theory of Employment, Interest and Money (1936)", "A Treatise on Money (1930)"],
            school: "Keynesian Economics",
            field: "Macroeconomics, Monetary Theory"
        },
        'milton friedman': {
            name: "Milton Friedman (1912-2006)",
            description: "American economist and Nobel Prize winner, leading advocate of free-market capitalism and monetarism.",
            keyContributions: [
                "Monetarism - money supply control",
                "Natural rate of unemployment",
                "Permanent income hypothesis",
                "School choice advocacy"
            ],
            famousQuote: "Inflation is always and everywhere a monetary phenomenon.",
            majorWorks: ["A Monetary History of the United States (1963)", "Free to Choose (1980)"],
            school: "Chicago School, Monetarism",
            field: "Macroeconomics, Monetary Policy"
        },
        'karl marx': {
            name: "Karl Marx (1818-1883)",
            description: "German philosopher and economist who developed the theory of communism and critiqued capitalism.",
            keyContributions: [
                "Labor theory of value",
                "Class struggle analysis",
                "Surplus value theory",
                "Historical materialism"
            ],
            famousQuote: "The philosophers have only interpreted the world in various ways; the point is to change it.",
            majorWorks: ["Das Kapital (1867)", "The Communist Manifesto (1848)"],
            school: "Marxian Economics",
            field: "Political Economy, Economic History"
        },
        'david ricardo': {
            name: "David Ricardo (1772-1823)",
            description: "British economist known for his theory of comparative advantage and contributions to classical economics.",
            keyContributions: [
                "Comparative advantage theory",
                "Iron law of wages",
                "Ricardian equivalence",
                "Rent theory"
            ],
            famousQuote: "The interest of the landlords is always opposed to the interest of every other class in the community.",
            majorWorks: ["On the Principles of Political Economy and Taxation (1817)"],
            school: "Classical Economics",
            field: "International Trade, Public Finance"
        },
        'alfred marshall': {
            name: "Alfred Marshall (1842-1924)",
            description: "British economist who developed many foundational microeconomic concepts and authored 'Principles of Economics'.",
            keyContributions: [
                "Supply and demand curves",
                "Price elasticity of demand",
                "Consumer and producer surplus",
                "Marginal utility theory"
            ],
            famousQuote: "Economics is a study of mankind in the ordinary business of life.",
            majorWorks: ["Principles of Economics (1890)"],
            school: "Neoclassical Economics",
            field: "Microeconomics, Market Theory"
        },
        'joseph schumpeter': {
            name: "Joseph Schumpeter (1883-1950)",
            description: "Austrian-American economist known for his work on innovation, entrepreneurship, and economic development.",
            keyContributions: [
                "Creative destruction theory",
                "Innovation and entrepreneurship",
                "Business cycle theory",
                "Economic development theory"
            ],
            famousQuote: "The fundamental impulse that sets and keeps the capitalist engine in motion comes from the new consumers' goods, the new methods of production or transportation, the new markets, the new forms of industrial organization that capitalist enterprise creates.",
            majorWorks: ["The Theory of Economic Development (1911)", "Capitalism, Socialism and Democracy (1942)"],
            school: "Austrian School",
            field: "Economic Development, Innovation"
        },
        'paul samuelson': {
            name: "Paul Samuelson (1915-2009)",
            description: "American economist and Nobel Prize winner who made fundamental contributions to economic theory and popularized economics education.",
            keyContributions: [
                "Revealed preference theory",
                "Stolper-Samuelson theorem",
                "Modern portfolio theory",
                "Economics textbook standardization"
            ],
            famousQuote: "Economics never was a dismal science. It should be a realistic science.",
            majorWorks: ["Economics: An Introductory Analysis (1948)", "Foundations of Economic Analysis (1947)"],
            school: "Neoclassical Synthesis",
            field: "Mathematical Economics, Trade Theory"
        },
        'friedrich hayek': {
            name: "Friedrich Hayek (1899-1992)",
            description: "Austrian-British economist and Nobel Prize winner, advocate of free-market capitalism and critic of central planning.",
            keyContributions: [
                "Knowledge problem in economics",
                "Spontaneous order theory",
                "Austrian business cycle theory",
                "Anti-socialist calculation argument"
            ],
            famousQuote: "The curious task of economics is to demonstrate to men how little they really know about what they imagine they can design.",
            majorWorks: ["The Road to Serfdom (1944)", "The Use of Knowledge in Society (1945)"],
            school: "Austrian School",
            field: "Political Economy, Knowledge Theory"
        },
        'gary becker': {
            name: "Gary Becker (1930-2014)",
            description: "American economist and Nobel Prize winner who applied economic analysis to human behavior and social issues.",
            keyContributions: [
                "Human capital theory",
                "Economic analysis of discrimination",
                "Economics of crime and punishment",
                "Family economics"
            ],
            famousQuote: "The economic approach is a comprehensive one that is applicable to all human behavior.",
            majorWorks: ["Human Capital (1964)", "The Economics of Discrimination (1957)"],
            school: "Chicago School",
            field: "Labor Economics, Social Economics"
        },
        'thomas malthus': {
            name: "Thomas Malthus (1766-1834)",
            description: "British economist known for his theory on population growth and its relationship to food supply.",
            keyContributions: [
                "Malthusian population theory",
                "Geometric vs arithmetic growth",
                "Demographic transition theory",
                "Say's law critique"
            ],
            famousQuote: "Population, when unchecked, increases in a geometrical ratio. Subsistence increases only in an arithmetical ratio.",
            majorWorks: ["An Essay on the Principle of Population (1798)"],
            school: "Classical Economics",
            field: "Population Economics, Development"
        },
        'jean-baptiste say': {
            name: "Jean-Baptiste Say (1767-1832)",
            description: "French economist known for Say's Law and contributions to classical economic theory.",
            keyContributions: [
                "Say's Law (supply creates demand)",
                "Entrepreneurship theory",
                "Three factors of production",
                "Market equilibrium theory"
            ],
            famousQuote: "Supply creates its own demand.",
            majorWorks: ["A Treatise on Political Economy (1803)"],
            school: "Classical Economics",
            field: "Macroeconomics, Entrepreneurship"
        },
        'irving fisher': {
            name: "Irving Fisher (1867-1947)",
            description: "American economist who contributed to monetary theory, capital theory, and econometrics.",
            keyContributions: [
                "Quantity theory of money",
                "Fisher equation (real vs nominal interest)",
                "Debt-deflation theory",
                "Index number theory"
            ],
            famousQuote: "The stock market has reached what looks like a permanently high plateau.",
            majorWorks: ["The Theory of Interest (1930)", "The Money Illusion (1928)"],
            school: "Neoclassical Economics",
            field: "Monetary Theory, Financial Economics"
        }
    };

    // Enhanced Economics Knowledge Base with expanded fields
    const ECONOMICS_KB = {
        // Microeconomics
        'microeconomics': {
            definition: "Microeconomics is the branch of economics that studies individual economic units, including consumers, firms, and markets, focusing on how they make decisions and interact.",
            formula: "Utility Maximization: MU/P = λ (marginal utility per dollar)",
            explanation: "Core concepts include supply and demand, elasticity, market structures, consumer choice, and firm behavior",
            examples: ["Consumer choice theory", "Price discrimination", "Market efficiency", "Game theory applications"]
        },
        'supply and demand': {
            definition: "The fundamental economic model explaining price determination through the interaction of supply (producers' willingness to sell) and demand (consumers' willingness to buy).",
            formula: "Equilibrium: Qd = Qs, where Qd is quantity demanded and Qs is quantity supplied",
            explanation: "Market equilibrium occurs where supply and demand curves intersect",
            examples: ["Housing market dynamics", "Labor market wages", "Commodity pricing"]
        },
        'elasticity': {
            definition: "Price elasticity of demand measures how responsive demand is to changes in price.",
            formula: "PED = (% Change in Quantity Demanded) / (% Change in Price)",
            explanation: "Elastic if |PED| > 1, Inelastic if |PED| < 1, Unit elastic if |PED| = 1",
            examples: ["Luxury goods tend to be elastic", "Necessities tend to be inelastic", "Cross-price elasticity between substitutes"]
        },
        
        // Macroeconomics
        'macroeconomics': {
            definition: "Macroeconomics studies the economy as a whole, focusing on aggregate variables like GDP, inflation, unemployment, and economic growth.",
            formula: "Aggregate Demand: AD = C + I + G + (X - M)",
            explanation: "Examines economy-wide phenomena and government policy impacts on economic performance",
            examples: ["Business cycles", "Fiscal policy effects", "International trade impacts", "Economic growth models"]
        },
        'gdp': {
            definition: "Gross Domestic Product (GDP) is the total monetary value of all finished goods and services produced within a country's borders in a specific time period.",
            formula: "GDP = C + I + G + (X - M)",
            explanation: "Where C = Consumption, I = Investment, G = Government Spending, X = Exports, M = Imports",
            examples: ["US GDP in 2023 was approximately $25.46 trillion", "GDP per capita = GDP / Population", "Real vs Nominal GDP"]
        },
        'inflation': {
            definition: "Inflation is the rate at which the general level of prices for goods and services rises, eroding purchasing power.",
            formula: "Inflation Rate = ((CPI_current - CPI_previous) / CPI_previous) × 100",
            explanation: "Measured using Consumer Price Index (CPI) or other price indices. Central banks typically target 2% inflation.",
            examples: ["If CPI rises from 100 to 103, inflation rate = 3%", "Hyperinflation in Germany (1920s)", "Deflation in Japan (1990s)"]
        },
        'unemployment': {
            definition: "Unemployment rate measures the percentage of the labor force that is jobless and actively seeking employment.",
            formula: "Unemployment Rate = (Unemployed / Labor Force) × 100",
            explanation: "Types include frictional, structural, cyclical, and seasonal unemployment",
            examples: ["Natural rate of unemployment (NAIRU)", "Phillips Curve relationship", "Full employment concept"]
        },
        'monetary policy': {
            definition: "Monetary policy involves managing money supply and interest rates to achieve macroeconomic objectives like price stability and full employment.",
            formula: "Money Supply × Velocity = Price Level × Real Output (MV = PY)",
            explanation: "Central banks use tools like interest rates, reserve requirements, and quantitative easing",
            examples: ["Federal Reserve policy rates", "European Central Bank operations", "Bank of Canada rate decisions"]
        },
        'fiscal policy': {
            definition: "Fiscal policy refers to government spending and taxation decisions aimed at influencing economic activity.",
            formula: "Budget Balance = Government Revenue - Government Expenditure",
            explanation: "Expansionary fiscal policy increases spending/cuts taxes; contractionary does the opposite",
            examples: ["Economic stimulus packages", "Automatic stabilizers", "Debt-to-GDP ratios"]
        },
        
        // Economic History
        'economic history': {
            definition: "Economic history examines how economies have evolved over time, studying past economic events, policies, and their long-term impacts.",
            formula: "Historical Analysis = Economic Data + Institutional Context + Policy Evolution",
            explanation: "Combines historical methodology with economic analysis to understand economic development patterns",
            examples: ["Industrial Revolution impacts", "Great Depression causes", "Post-WWII economic boom", "Development of financial markets"]
        },
        'great depression': {
            definition: "The Great Depression (1929-1939) was the worst economic downturn in modern history, characterized by massive unemployment and deflation.",
            formula: "Economic Contraction = ΔReal GDP + ΔEmployment + ΔPrice Level",
            explanation: "Caused by stock market crash, bank failures, and policy mistakes; led to Keynesian economics development",
            examples: ["25% unemployment rate", "Bank runs and failures", "New Deal programs", "Gold standard abandonment"]
        },
        'industrial revolution': {
            definition: "The Industrial Revolution (1760-1840) marked the transition from agricultural to industrial economies through mechanization and technological innovation.",
            formula: "Productivity Growth = Technological Change + Capital Accumulation + Labor Specialization",
            explanation: "Transformed production methods, urbanization patterns, and living standards globally",
            examples: ["Steam engine invention", "Factory system development", "Railroad expansion", "Labor movement emergence"]
        },
        
        // Econometrics
        'econometrics': {
            definition: "Econometrics applies statistical and mathematical methods to economic data to test economic theories and forecast future trends.",
            formula: "Y = β₀ + β₁X₁ + β₂X₂ + ... + βₙXₙ + ε (Multiple regression model)",
            explanation: "Combines economic theory, mathematics, and statistics to analyze economic relationships",
            examples: ["OLS regression", "Time series analysis", "Panel data models", "Instrumental variables"]
        },
        'regression analysis': {
            definition: "Regression analysis is a statistical method for examining relationships between a dependent variable and one or more independent variables.",
            formula: "Y = α + βX + ε, where Y is dependent, X is independent, β is slope, α is intercept, ε is error term",
            explanation: "Used to estimate causal relationships, make predictions, and test economic hypotheses",
            examples: ["Demand function estimation", "Production function analysis", "Wage determination studies"]
        },
        'hypothesis testing': {
            definition: "Hypothesis testing is a statistical procedure for determining whether sample data provides sufficient evidence to reject a null hypothesis.",
            formula: "t-statistic = (β̂ - β₀) / SE(β̂), where β̂ is estimated coefficient and SE is standard error",
            explanation: "Uses p-values and confidence intervals to assess statistical significance of economic relationships",
            examples: ["Testing market efficiency", "Evaluating policy effectiveness", "Comparing economic models"]
        },
        
        // Statistics
        'statistics': {
            definition: "Statistics involves collecting, analyzing, interpreting, and presenting numerical data to understand economic phenomena and inform decision-making.",
            formula: "Sample Mean: x̄ = Σxᵢ/n; Standard Deviation: s = √[Σ(xᵢ-x̄)²/(n-1)]",
            explanation: "Fundamental tool for empirical analysis in economics, including descriptive and inferential statistics",
            examples: ["Economic indicators", "Survey methodology", "Probability distributions", "Sampling techniques"]
        },
        'correlation': {
            definition: "Correlation measures the strength and direction of linear relationship between two variables.",
            formula: "Correlation coefficient: r = Σ[(xᵢ-x̄)(yᵢ-ȳ)] / √[Σ(xᵢ-x̄)²Σ(yᵢ-ȳ)²]",
            explanation: "Ranges from -1 to +1; positive values indicate positive relationship, negative values indicate inverse relationship",
            examples: ["Income and consumption correlation", "Education and wages", "Inflation and interest rates"]
        },
        'probability': {
            definition: "Probability theory provides the mathematical foundation for dealing with uncertainty in economic analysis and decision-making.",
            formula: "P(A) = Number of favorable outcomes / Total number of possible outcomes",
            explanation: "Essential for risk analysis, financial modeling, and econometric inference",
            examples: ["Expected utility theory", "Portfolio risk analysis", "Insurance mathematics", "Game theory payoffs"]
        },
        
        // Additional key concepts
        'market failure': {
            definition: "Market failure occurs when free markets fail to allocate resources efficiently, leading to welfare losses.",
            formula: "Deadweight Loss = ½ × |ΔQ| × |ΔP| (for price distortions)",
            explanation: "Causes include externalities, public goods, information asymmetry, and market power",
            examples: ["Environmental pollution", "Healthcare markets", "Education provision", "Natural monopolies"]
        },
        'game theory': {
            definition: "Game theory analyzes strategic interactions between rational decision-makers, widely used in microeconomics and industrial organization.",
            formula: "Nash Equilibrium: No player can improve payoff by unilaterally changing strategy",
            explanation: "Applications include oligopoly behavior, auction design, and policy analysis",
            examples: ["Prisoner's dilemma", "Cournot competition", "Auction mechanisms", "Bargaining theory"]
        },
        
        // Economic Schools of Thought
        'keynesian economics': {
            definition: "Economic theory developed by John Maynard Keynes emphasizing government intervention to stabilize economic fluctuations.",
            formula: "Aggregate Demand = C + I + G + (X - M), with focus on government spending (G)",
            explanation: "Advocates for active fiscal and monetary policy to address unemployment and economic downturns",
            examples: ["New Deal programs", "Economic stimulus packages", "Counter-cyclical policy", "Liquidity trap theory"]
        },
        'classical economics': {
            definition: "Economic school founded by Adam Smith emphasizing free markets, minimal government intervention, and self-regulating economies.",
            formula: "Say's Law: Supply creates its own demand",
            explanation: "Believes markets naturally tend toward full employment equilibrium through price flexibility",
            examples: ["Invisible hand theory", "Laissez-faire policy", "Free trade advocacy", "Gold standard support"]
        },
        'chicago school': {
            definition: "Economic school emphasizing free-market solutions, rational expectations, and minimal government regulation.",
            formula: "Efficient Market Hypothesis: Prices reflect all available information",
            explanation: "Associated with Milton Friedman, Gary Becker, and emphasis on mathematical economic models",
            examples: ["Monetarism", "Deregulation advocacy", "School choice programs", "Market efficiency theory"]
        }
    };

    // Enhanced Economic Data for Visualizations
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
        },
        interest_rates: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            data: [0.25, 0.50, 2.50, 5.25, 5.00],
            title: 'Federal Fund Rate (%)',
            color: '#FF6B6B'
        }
    };

    // Enhanced Mathematical Functions
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
        },
        correlation: (x, y) => {
            const n = x.length;
            const sumX = x.reduce((a, b) => a + b, 0);
            const sumY = y.reduce((a, b) => a + b, 0);
            const meanX = sumX / n;
            const meanY = sumY / n;
            
            let numerator = 0, sumXSq = 0, sumYSq = 0;
            for (let i = 0; i < n; i++) {
                numerator += (x[i] - meanX) * (y[i] - meanY);
                sumXSq += Math.pow(x[i] - meanX, 2);
                sumYSq += Math.pow(y[i] - meanY, 2);
            }
            
            return numerator / Math.sqrt(sumXSq * sumYSq);
        },
        standard_deviation: (arr) => {
            const n = arr.length;
            const mean = arr.reduce((a, b) => a + b, 0) / n;
            const variance = arr.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / (n - 1);
            return Math.sqrt(variance);
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
     * Initialize Economika Chatbot
     */
    function initEconomicsChatbot() {
        console.log('🤖 Initializing Economika v' + CONFIG.version);
        
        createChatbotElements();
        bindEventHandlers();
        loadChatHistory();
        
        console.log('✅ Economika initialized successfully');
    }

    /**
     * Create chatbot HTML elements
     */
    function createChatbotElements() {
        // Create floating action button
        const fab = document.createElement('div');
        fab.id = 'economics-chatbot-fab';
        fab.className = 'economics-chatbot-fab';
        fab.setAttribute('aria-label', 'Open Economika AI Assistant');
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
                    <span id="economics-chatbot-title">Economika</span>
                </div>
                <button id="economics-chatbot-close" aria-label="Close chatbot" title="Close">&times;</button>
            </div>
            
            <div class="economics-chatbot-messages" id="economics-chatbot-messages">
                <div class="economics-bot-welcome-message">
                    <div class="economics-bot-avatar">🧠</div>
                    <div class="economics-welcome-content">
                        <p><strong>Hello! I'm Economika, your AI Economics Assistant.</strong></p>
                        <p>I specialize in:</p>
                        <div class="economics-capabilities-grid">
                            <span class="economics-capability-tag">📊 Microeconomics</span>
                            <span class="economics-capability-tag">🌐 Macroeconomics</span>
                            <span class="economics-capability-tag">📚 Economic History</span>
                            <span class="economics-capability-tag">📈 Econometrics</span>
                            <span class="economics-capability-tag">📉 Statistics</span>
                            <span class="economics-capability-tag">🧮 Calculations</span>
                        </div>
                        <p class="economics-example-text">Try: "Adam Smith" or "What is regression analysis?"</p>
                    </div>
                </div>
            </div>
            
            <div class="economics-quick-actions" id="economics-quick-actions">
                <button class="economics-quick-action" data-question="Adam Smith">Adam Smith</button>
                <button class="economics-quick-action" data-question="John Maynard Keynes">Keynes</button>
                <button class="economics-quick-action" data-question="Milton Friedman">Friedman</button>
                <button class="economics-quick-action" data-question="What is microeconomics?">Microeconomics</button>
                <button class="economics-quick-action" data-question="Statistical analysis methods">Statistics</button>
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
                    placeholder="Ask about economists, theories, calculations, or economic history..." 
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
     * Enhanced message processing with famous economists and expanded knowledge base
     */
    function processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for famous economists first
        for (const [key, economist] of Object.entries(FAMOUS_ECONOMISTS)) {
            if (lowerMessage.includes(key) || 
                lowerMessage.includes(economist.name.toLowerCase()) ||
                (key.includes(' ') && key.split(' ').some(name => lowerMessage.includes(name)))) {
                
                return {
                    text: `**${economist.name}**\n\n**${economist.description}**\n\n**Key Contributions:**\n• ${economist.keyContributions.join('\n• ')}\n\n**Famous Quote:**\n*"${economist.famousQuote}"*\n\n**Major Works:**\n• ${economist.majorWorks.join('\n• ')}\n\n**School of Thought:** ${economist.school}\n**Field:** ${economist.field}`
                };
            }
        }
        
        // Check for economic concepts (expanded)
        for (const [key, concept] of Object.entries(ECONOMICS_KB)) {
            if (lowerMessage.includes(key) || (key.includes(' ') && key.split(' ').every(word => lowerMessage.includes(word)))) {
                const chartMap = {
                    'gdp': 'gdp_growth',
                    'inflation': 'inflation_rate',
                    'unemployment': 'unemployment',
                    'monetary policy': 'interest_rates',
                    'interest': 'interest_rates'
                };
                
                return {
                    text: `**${concept.definition}**\n\n**Formula/Model:** ${concept.formula}\n\n**Explanation:** ${concept.explanation}\n\n**Examples:**\n• ${concept.examples.join('\n• ')}`,
                    chart: chartMap[key] || null
                };
            }
        }

        // Enhanced calculation handling
        if (lowerMessage.includes('calculate') || lowerMessage.includes('compute')) {
            return handleCalculation(message);
        }

        // Enhanced chart requests
        if (lowerMessage.includes('chart') || lowerMessage.includes('graph') || lowerMessage.includes('data') || lowerMessage.includes('visualization')) {
            return {
                text: "Here are key economic indicators across different areas of economics:",
                chart: 'gdp_growth'
            };
        }

        // Mathematical expressions
        if (containsMathExpression(message)) {
            return handleMathExpression(message);
        }

        // Enhanced field-specific responses
        const fieldResponses = {
            'economists': 'I can tell you about famous economists like Adam Smith, John Maynard Keynes, Milton Friedman, Karl Marx, and many others. Just ask about any economist by name!',
            'famous economists': 'I can tell you about famous economists like Adam Smith, John Maynard Keynes, Milton Friedman, Karl Marx, David Ricardo, Alfred Marshall, Joseph Schumpeter, Paul Samuelson, Friedrich Hayek, Gary Becker, Thomas Malthus, Jean-Baptiste Say, and Irving Fisher. Who interests you?',
            'microeconomics': 'Microeconomics focuses on individual economic units like consumers, firms, and markets. I can help with supply and demand, market structures, consumer choice theory, elasticity, and firm behavior. What specific microeconomic concept interests you?',
            'macroeconomics': 'Macroeconomics studies the economy as a whole, including GDP, inflation, unemployment, and economic growth. I can explain fiscal policy, monetary policy, business cycles, and international economics. What macro topic would you like to explore?',
            'econometrics': 'Econometrics applies statistical methods to economic data for testing theories and forecasting. I can help with regression analysis, hypothesis testing, time series analysis, and model specification. What econometric technique interests you?',
            'statistics': 'Statistics provides the foundation for economic analysis through data collection, analysis, and interpretation. I can explain descriptive statistics, probability theory, sampling methods, and statistical inference. What statistical concept would you like to learn?',
            'economic history': 'Economic history examines how economies evolved over time, studying past events like the Great Depression, Industrial Revolution, and policy developments. I can discuss historical economic patterns and their modern relevance. What historical period interests you?',
            'regression': 'Regression analysis examines relationships between variables. I can explain OLS, multiple regression, assumptions, hypothesis testing, and model diagnostics. What aspect of regression would you like to understand?',
            'correlation': 'Correlation measures the strength of linear relationships between variables. I can explain correlation coefficients, causation vs correlation, and statistical significance. What correlation concept interests you?',
            'market failure': 'Market failures occur when free markets don\'t allocate resources efficiently. I can explain externalities, public goods, information asymmetry, and policy solutions. What type of market failure would you like to explore?',
            'help': 'I can help you with:\n\n**Famous Economists:**\n• Adam Smith, Keynes, Friedman, Marx, and many others\n\n**Core Fields:**\n• Microeconomics (supply/demand, elasticity, market structures)\n• Macroeconomics (GDP, inflation, policy)\n• Economic History (Great Depression, Industrial Revolution)\n• Econometrics (regression, hypothesis testing)\n• Statistics (correlation, probability, sampling)\n\n**Calculations:**\n• Financial mathematics\n• Statistical analysis\n• Economic formulas\n\n**Data Visualization:**\n• Economic charts and trends\n• Statistical graphs\n\nWhat specific area interests you?'
        };

        for (const [keyword, response] of Object.entries(fieldResponses)) {
            if (lowerMessage.includes(keyword)) {
                return { text: response };
            }
        }

        // Enhanced default response
        return {
            text: "Hello! I'm Economika, your specialized AI assistant for economics and statistics. I can help you with:\n\n**👨‍🎓 Famous Economists:** Adam Smith, Keynes, Friedman, Marx, and many others\n**📊 Microeconomics:** Supply & demand, market structures, consumer choice\n**🌐 Macroeconomics:** GDP, inflation, monetary & fiscal policy\n**📚 Economic History:** Great Depression, Industrial Revolution, policy evolution\n**📈 Econometrics:** Regression analysis, hypothesis testing, forecasting\n**📉 Statistics:** Correlation, probability, data analysis\n**🧮 Calculations:** Financial math, statistical computations\n\nTry asking about any of these topics! For example:\n• \"Who was Adam Smith?\"\n• \"What is price elasticity?\"\n• \"Explain the Great Depression\"\n• \"How does regression analysis work?\""
        };
    }

    /**
     * Enhanced calculation handling
     */
    function handleCalculation(message) {
        const lowerMessage = message.toLowerCase();
        
        const calculationTypes = {
            'compound interest': {
                text: "**Compound Interest Formula:**\n\nA = P(1 + r/n)^(nt)\n\nWhere:\n• A = Final amount\n• P = Principal ($)\n• r = Annual interest rate (decimal)\n• n = Times compounded per year\n• t = Time in years\n\n**Example:** $1,000 at 5% compounded annually for 10 years:\nA = 1000(1 + 0.05/1)^(1×10) = $1,628.89\n\n**Applications:** Savings accounts, investments, loan calculations"
            },
            'present value': {
                text: "**Present Value Formula:**\n\nPV = FV / (1 + r)^t\n\nWhere:\n• PV = Present Value\n• FV = Future Value\n• r = Discount rate (decimal)\n• t = Time periods\n\n**Example:** What's $1,000 in 5 years worth today at 6% discount?\nPV = 1000 / (1.06)^5 = $747.26\n\n**Applications:** Investment valuation, bond pricing, capital budgeting"
            },
            'elasticity': {
                text: "**Price Elasticity of Demand Formula:**\n\nPED = (% Change in Quantity) / (% Change in Price)\n\n**Alternative:** PED = (ΔQ/Q₁) / (ΔP/P₁)\n\n**Interpretation:**\n• |PED| > 1: Elastic (responsive to price)\n• |PED| < 1: Inelastic (less responsive)\n• |PED| = 1: Unit elastic\n\n**Example:** Price ↑10%, Quantity ↓20% → PED = -2 (elastic)\n\n**Applications:** Pricing strategy, tax policy, market analysis"
            },
            'correlation': {
                text: "**Correlation Coefficient Formula:**\n\nr = Σ[(xᵢ-x̄)(yᵢ-ȳ)] / √[Σ(xᵢ-x̄)²Σ(yᵢ-ȳ)²]\n\n**Interpretation:**\n• r = +1: Perfect positive correlation\n• r = 0: No linear correlation\n• r = -1: Perfect negative correlation\n\n**Example:** Income and consumption typically show r ≈ 0.8-0.9\n\n**Applications:** Economic forecasting, risk analysis, variable relationships"
            },
            'standard deviation': {
                text: "**Standard Deviation Formula:**\n\ns = √[Σ(xᵢ-x̄)²/(n-1)]\n\nWhere:\n• s = Sample standard deviation\n• xᵢ = Individual values\n• x̄ = Sample mean\n• n = Sample size\n\n**Interpretation:** Measures variability around the mean\n\n**Applications:** Risk measurement, quality control, economic volatility analysis"
            }
        };
        
        for (const [key, calc] of Object.entries(calculationTypes)) {
            if (lowerMessage.includes(key)) {
                return calc;
            }
        }
        
        return {
            text: "I can help calculate:\n\n**Financial:**\n• Compound interest\n• Present value\n• Future value\n• Annuities\n\n**Economic:**\n• Price elasticity\n• GDP components\n• Inflation rates\n• Market indices\n\n**Statistical:**\n• Correlation coefficients\n• Standard deviation\n• Regression parameters\n• Confidence intervals\n\nPlease specify which calculation you need!"
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
            /log\(\d+\)/,
            /\d+!/, // factorial
            /\b\d+\.\d+\b/ // decimals
        ];
        
        return mathPatterns.some(pattern => pattern.test(message));
    }

    /**
     * Handle mathematical expressions with enhanced capabilities
     */
    function handleMathExpression(message) {
        try {
            // Enhanced math evaluation (secure for basic operations)
            let expression = message
                .replace(/\^/g, '**')
                .replace(/sqrt\((\d+(?:\.\d+)?)\)/g, 'Math.sqrt($1)')
                .replace(/log\((\d+(?:\.\d+)?)\)/g, 'Math.log($1)')
                .replace(/sin\((\d+(?:\.\d+)?)\)/g, 'Math.sin($1)')
                .replace(/cos\((\d+(?:\.\d+)?)\)/g, 'Math.cos($1)')
                .replace(/tan\((\d+(?:\.\d+)?)\)/g, 'Math.tan($1)')
                .replace(/[^0-9+\-*/.() ]/g, '');
            
            if (expression && expression.length > 0) {
                const result = Function('"use strict"; return (' + expression + ')')();
                return {
                    text: `**Mathematical Calculation:**\n\n${message} = **${typeof result === 'number' ? result.toFixed(6).replace(/\.?0+$/, '') : result}**\n\n*For complex economic or statistical calculations, please specify the type (e.g., elasticity, correlation, present value).*`
                };
            }
        } catch (e) {
            // Fall through to default response
        }
        
        return {
            text: "I can help with mathematical calculations! Try formats like:\n\n**Basic Math:**\n• 2 + 2\n• 5 * 10\n• sqrt(144)\n• 2^8\n\n**Economic Functions:**\n• Compound interest calculations\n• Elasticity formulas\n• Statistical measures\n\n**Advanced:**\n• Regression analysis\n• Correlation coefficients\n• Probability calculations\n\nWhat calculation do you need help with?"
        };
    }

    /**
     * Add chart to conversation with enhanced styling
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
     * Create enhanced chart using Chart.js
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
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: data.color,
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 5
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
                        text: data.title,
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: '#e1e8ed',
                            lineWidth: 1
                        },
                        ticks: {
                            font: {
                                size: 11
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: '#e1e8ed',
                            lineWidth: 1
                        },
                        ticks: {
                            font: {
                                size: 11
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                }
            }
        });
    }

    /**
     * Draw enhanced simple chart fallback
     */
    function drawSimpleChart(canvas, chartType) {
        const ctx = canvas.getContext('2d');
        const data = ECONOMIC_DATA[chartType];
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = data.color;
        ctx.lineWidth = 3;
        
        const padding = 40;
        const width = canvas.width - 2 * padding;
        const height = canvas.height - 2 * padding;
        
        const maxValue = Math.max(...data.data);
        const minValue = Math.min(...data.data);
        const valueRange = maxValue - minValue || 1; // Avoid division by zero
        
        // Draw chart line
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
        
        // Add enhanced data points
        ctx.fillStyle = data.color;
        data.data.forEach((value, index) => {
            const x = padding + (index / (data.data.length - 1)) * width;
            const y = padding + height - ((value - minValue) / valueRange) * height;
            
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
            
            // Add white border to points
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.strokeStyle = data.color;
            ctx.lineWidth = 3;
        });
        
        // Add title
        ctx.fillStyle = '#333333';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(data.title, canvas.width / 2, 20);
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

    // Export for global access
    window.Economika = {
        open: openChatbot,
        close: closeChatbot,
        toggle: toggleChatbot,
        addMessage: addMessage,
        version: CONFIG.version
    };

})();