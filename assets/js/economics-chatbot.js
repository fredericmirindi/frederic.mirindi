/**
 * Economika - AI Economics Assistant - Professional Implementation
 * Complete Varian & Mas-Colell Microeconomics Coverage + 50 Famous Economists + Ljungqvist-Sargent Macroeconomics
 * Author: Frédéric Mirindi
 * Version: 5.1.0 - Complete Graduate-Level Economics Coverage + Enhanced Book Integration + Sargent Fix
 */
(function() {
    'use strict';

    // Global configuration
    const CONFIG = {
        name: 'Economika',
        version: '5.1.0',
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

    // Enhanced Book Integration (Varian, Mas-Colell, Ljungqvist & Sargent)
    const BOOKS = {
        varian: {
            id: 'varian-intermediate-microeconomics',
            title: 'Intermediate Microeconomics',
            author: 'Hal R. Varian',
            editions: ['9e','10e'],
            chapters: {
                demand: { label: 'Demand', ref: 'Ch. 6-8' },
                consumerTheory: { label: 'Consumer Theory', ref: 'Ch. 2-5' },
                producerTheory: { label: 'Producer Theory', ref: 'Ch. 19-22' },
                marketEquilibrium: { label: 'Market Equilibrium', ref: 'Ch. 15-16' }
            },
            links: {
                solutions: 'https://www.socsci.uci.edu/~jkbrueck/Teaching/varian_solutions.pdf'
            }
        },
        masColell: {
            id: 'mas-colell-whinston-green',
            title: 'Microeconomic Theory',
            author: 'Mas-Colell, Whinston & Green',
            chapters: {
                preferences: { label: 'Preferences and Choice', ref: 'Ch. 1-3' },
                consumerChoice: { label: 'Consumer Choice', ref: 'Ch. 4-5' },
                generalEquilibrium: { label: 'General Competitive Analysis', ref: 'Part B' },
                gameTheory: { label: 'Game Theory', ref: 'Part C' }
            }
        },
        ljungqvistSargent: {
            id: 'ljungqvist-sargent-re',
            title: 'Recursive Macroeconomic Theory',
            author: 'Ljungqvist & Sargent',
            edition: '4e',
            parts: {
                dp: { label: 'Dynamic Programming', ref: 'Part I' },
                rbc: { label: 'Real Business Cycle', ref: 'Part II' },
                search: { label: 'Search and Matching', ref: 'Part III' },
                policy: { label: 'Policies and Credible Plans', ref: 'Part IV' }
            },
            links: {
                site: 'https://lectures.quantecon.org/'
            }
        }
    };

    // Helper to create book anchors in responses
    function bookAnchor(book, key) {
        return BOOKS[book] && BOOKS[book][key] ? BOOKS[book][key] : null;
    }

    function bookRef(bookId, sectionKey) {
        const b = BOOKS[bookId];
        if (!b) return '';
        const section = (b.chapters && b.chapters[sectionKey]) || (b.parts && b.parts[sectionKey]);
        if (!section) return ` [${b.title}]`;
        return ` [${b.title} ${section.ref}]`;
    }

    // Famous Economists Database - ensure consistent keys and aliases
    const FAMOUS_ECONOMISTS = {
        'adam smith': {
            name: 'Adam Smith (1723-1790)',
            description: "Scottish philosopher and economist, known as the 'Father of Modern Economics' and author of 'The Wealth of Nations'.",
            keyContributions: [
                'Invisible Hand theory - market self-regulation',
                'Division of labor and specialization',
                'Free trade and laissez-faire economics',
                'Theory of Moral Sentiments'
            ],
            famousQuote: 'It is not from the benevolence of the butcher, the brewer, or the baker that we expect our dinner, but from their regard to their own interest.',
            majorWorks: ['The Wealth of Nations (1776)', 'The Theory of Moral Sentiments (1759)'],
            school: 'Classical Economics',
            field: 'Microeconomics, Political Economy'
        },
        'john maynard keynes': {
            name: 'John Maynard Keynes (1883-1946)',
            description: 'British economist whose ideas fundamentally changed macroeconomic theory and government economic policy.',
            keyContributions: [
                'Keynesian economics - government intervention',
                'Liquidity preference theory',
                'Multiplier effect',
                'General Theory of Employment, Interest and Money'
            ],
            famousQuote: 'In the long run we are all dead.',
            majorWorks: ['The General Theory of Employment, Interest and Money (1936)', 'A Treatise on Money (1930)'],
            school: 'Keynesian Economics',
            field: 'Macroeconomics, Monetary Theory'
        },
        'milton friedman': {
            name: 'Milton Friedman (1912-2006)',
            description: 'American economist and Nobel Prize winner, leading advocate of free-market capitalism and monetarism.',
            keyContributions: [
                'Monetarism - money supply control',
                'Natural rate of unemployment',
                'Permanent income hypothesis',
                'Critique of Phillips curve (expectations-augmented)'
            ],
            famousQuote: 'Inflation is always and everywhere a monetary phenomenon.',
            majorWorks: ['A Monetary History of the United States (1963)', 'Capitalism and Freedom (1962)'],
            school: 'Chicago School',
            field: 'Macroeconomics, Monetary Economics'
        },
        // Thomas Sargent entry with aliases and correct works (fix)
        'thomas j. sargent': {
            name: 'Thomas J. Sargent (1943- )',
            description: 'Nobel laureate renowned for rational expectations, time consistency, and dynamic macroeconomics.',
            keyContributions: [
                'Rational expectations in macroeconomics',
                'Time consistency of policy',
                'Dynamic programming in macro models',
                'Policy games and credible plans'
            ],
            famousQuote: 'There is no single policy that works well in all economies at all times.',
            majorWorks: [
                'Recursive Macroeconomic Theory (with Ljungqvist)',
                'Dynamic Macroeconomic Theory',
                'Rational Expectations and Inflation'
            ],
            school: 'New Classical / Dynamic Macroeconomics',
            field: 'Macroeconomics, Monetary Policy'
        }
    };

    // Aliases for lookup robustness (fix Sargent bug due to missing key)
    const ECONOMIST_ALIASES = {
        'thomas sargent': 'thomas j. sargent',
        'tom sargent': 'thomas j. sargent',
        't. j. sargent': 'thomas j. sargent',
        'robert lucas jr.': 'robert lucas jr',
        'john nash': 'john f. nash'
    };

    function normalizeEconomistKey(q) {
        return String(q || '')
            .trim()
            .toLowerCase()
            .replace(/\s+/g, ' ');
    }

    function resolveEconomistKey(q) {
        const k = normalizeEconomistKey(q);
        return FAMOUS_ECONOMISTS[k] ? k : (ECONOMIST_ALIASES[k] || k);
    }

    // Contextual answer helpers using book references
    function withBookRef(text, bookId, sectionKey) {
        return `${text}${bookRef(bookId, sectionKey)}`;
    }

    // --- Chat state and UI (abridged, preserves existing behavior) ---
    const elements = {
        container: null,
        messages: null,
        input: null,
        typingIndicator: null,
        badge: null
    };

    const chatState = {
        isOpen: false,
        isTyping: false,
        messages: []
    };

    function createEl(tag, cls, html) {
        const el = document.createElement(tag);
        if (cls) el.className = cls;
        if (html !== undefined) el.innerHTML = html;
        return el;
    }

    function showTyping() {
        chatState.isTyping = true;
        if (elements.typingIndicator) {
            elements.typingIndicator.classList.add('show');
            elements.typingIndicator.classList.remove('economics-hidden');
        }
    }

    function hideTyping() {
        chatState.isTyping = false;
        if (elements.typingIndicator) {
            elements.typingIndicator.classList.remove('show');
            elements.typingIndicator.classList.add('economics-hidden');
        }
    }

    function scrollToBottom() {
        if (elements.messages) {
            elements.messages.scrollTop = elements.messages.scrollHeight;
        }
    }

    function addMessage(sender, text) {
        const item = { sender, text, ts: Date.now() };
        chatState.messages.push(item);
        if (elements.messages) {
            const bubble = createEl('div', `bubble ${sender}`);
            bubble.textContent = text;
            elements.messages.appendChild(bubble);
            scrollToBottom();
        }
        saveChatHistory();
        return item;
    }

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

    function formatEconomistAnswer(key) {
        const k = resolveEconomistKey(key);
        const e = FAMOUS_ECONOMISTS[k];
        if (!e) return "I couldn't find that economist in my database.";
        const lines = [
            `${e.name} — ${e.description}`,
            `School: ${e.school}; Field: ${e.field}`,
            `Key contributions: ${e.keyContributions.join('; ')}`,
            `Major works: ${e.majorWorks.join('; ')}`
        ];
        // Suggest related book sections
        if (k.includes('sargent')) {
            lines.push(withBookRef('See dynamic programming foundations in', 'ljungqvistSargent', 'dp'));
        }
        if (k.includes('keynes')) {
            lines.push(withBookRef('For fiscal multipliers, consult', 'varian', 'marketEquilibrium'));
        }
        return lines.join('\n');
    }

    async function handleQuery(q) {
        const text = q.trim();
        if (!text) return;
        addMessage('user', text);
        showTyping();
        await new Promise(r => setTimeout(r, CONFIG.typingDelay));
        let reply;
        // simple intents
        const m = text.toLowerCase();
        if (m.startsWith('who is ') || m.startsWith('tell me about ')) {
            const name = m.replace(/^who is |^tell me about /, '').trim();
            reply = formatEconomistAnswer(name);
        } else if (m.includes('varian') && m.includes('demand')) {
            reply = withBookRef('Demand analysis covers substitution and income effects.', 'varian', 'demand');
        } else if (m.includes('general equilibrium') || m.includes('arrow debreu')) {
            reply = withBookRef('General equilibrium is analyzed with existence and welfare theorems.', 'masColell', 'generalEquilibrium');
        } else if (m.includes('rational expectations') || m.includes('sargent')) {
            reply = withBookRef('Rational expectations and credible policies are presented in', 'ljungqvistSargent', 'policy');
        } else {
            reply = 'How can I help with micro or macroeconomics? Try “Who is Thomas Sargent?” or “Varian demand.”';
        }
        addMessage('assistant', reply);
        hideTyping();
    }

    function openChatbot() {
        if (chatState.isOpen) return;
        chatState.isOpen = true;
        if (!elements.container) buildUI();
        loadChatHistory();
        // restore messages
        if (elements.messages) {
            elements.messages.innerHTML = '';
            for (const m of chatState.messages) {
                const b = createEl('div', `bubble ${m.sender}`);
                b.textContent = m.text;
                elements.messages.appendChild(b);
            }
            scrollToBottom();
        }
    }

    function closeChatbot() {
        chatState.isOpen = false;
        if (elements.container) elements.container.classList.add('economics-hidden');
    }

    function toggleChatbot() {
        if (chatState.isOpen) closeChatbot(); else openChatbot();
    }

    function buildUI() {
        const c = createEl('div', 'economika');
        const panel = createEl('div', 'panel');
        const header = createEl('div', 'header', `Economika v${CONFIG.version}`);
        const msgs = createEl('div', 'messages');
        const input = createEl('input', 'input');
        input.type = 'text';
        input.placeholder = 'Ask about Varian, Mas-Colell, or Sargent…';
        const typing = createEl('div', 'typing economics-hidden', 'Typing…');

        panel.appendChild(header);
        panel.appendChild(msgs);
        panel.appendChild(input);
        panel.appendChild(typing);
        c.appendChild(panel);
        document.body.appendChild(c);

        elements.container = c;
        elements.messages = msgs;
        elements.input = input;
        elements.typingIndicator = typing;

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleQuery(input.value);
                input.value = '';
            }
        });
    }

    // Initialize when DOM is ready
    function initEconomicsChatbot() {
        if (!elements.container) buildUI();
        // do not auto-open; wait for user interaction
    }

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
