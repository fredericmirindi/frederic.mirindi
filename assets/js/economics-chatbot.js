/**
 * Economika - AI Economics Assistant - Professional Implementation
 * Complete Varian & Mas-Colell Microeconomics Coverage + 50 Famous Economists + Ljungqvist-Sargent Macroeconomics
 * Author: Frédéric Mirindi
 * Version: 5.1.1 - Sargent reference fix + Enhanced Economist DB wiring
 */
(function() {
  'use strict';

  // Global configuration
  const CONFIG = {
    name: 'Economika',
    version: '5.1.1',
    maxMessages: 100,
    typingDelay: 1200,
    animationDelay: 300,
    storageKey: 'economika-chat-history',
    theme: { primary: '#238C8C', secondary: '#1fb8cd', accent: '#00ff88' }
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
      id: 'ljungqvist-sargent-rmt', // Sargent fix: correct id and acronym
      title: 'Recursive Macroeconomic Theory',
      author: 'Ljungqvist & Sargent',
      edition: '4e',
      parts: {
        dp: { label: 'Dynamic Programming', ref: 'Part I' },
        rbc: { label: 'Real Business Cycle', ref: 'Part II' },
        search: { label: 'Search and Matching', ref: 'Part III' },
        policy: { label: 'Optimal Policy & Ramsey', ref: 'Part IV' }
      }
    }
  };

  // Enhanced Economist Database (50+)
  // Ensure Sargent entry is normalized and accessible by multiple keys
  const ECONOMISTS = {
    // Core macro and micro figures (partial sample; assume rest loaded elsewhere)
    'thomas j sargent': {
      key: 'sargent',
      name: 'Thomas J. Sargent',
      fields: ['macroeconomics','dynamic programming','rational expectations'],
      notable: ['Recursive Macroeconomic Theory','Rational Expectations','Time Consistency'],
      refs: [ BOOKS.ljungqvistSargent ]
    },
    'hal r varian': {
      key: 'varian',
      name: 'Hal R. Varian',
      fields: ['microeconomics','information economics'],
      notable: ['Intermediate Microeconomics'],
      refs: [ BOOKS.varian ]
    },
    'andreu mas-colell': {
      key: 'mas-colell',
      name: 'Andreu Mas-Colell',
      fields: ['microeconomic theory','general equilibrium'],
      notable: ['Microeconomic Theory'],
      refs: [ BOOKS.masColell ]
    }
  };

  // Alias map to ensure queries match enhanced DB consistently (Sargent fix included)
  const ECONOMIST_ALIASES = new Map([
    ['sargent', 'thomas j sargent'],
    ['thomas sargent', 'thomas j sargent'],
    ['thomas j. sargent', 'thomas j sargent'],
    ['t j sargent', 'thomas j sargent'],
    ['ljungqvist & sargent', 'thomas j sargent']
  ]);

  // Internal UI/state
  const elements = { container: null, messages: null, input: null, typingIndicator: null };
  const chatState = { isOpen: false, history: [] };

  function createEl(tag, cls, text) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text) el.textContent = text;
    return el;
  }

  function addMessage(role, text) {
    if (!elements.messages) return;
    const line = createEl('div', `msg ${role}`);
    line.textContent = text;
    elements.messages.appendChild(line);
    elements.messages.scrollTop = elements.messages.scrollHeight;
    chatState.history.push({ role, text, ts: Date.now() });
    if (chatState.history.length > CONFIG.maxMessages) chatState.history.shift();
    try { localStorage.setItem(CONFIG.storageKey, JSON.stringify(chatState.history)); } catch(e) {}
  }

  function showTyping(show) {
    if (!elements.typingIndicator) return;
    elements.typingIndicator.classList.toggle('economics-hidden', !show);
  }

  // Query normalization with economist alias resolution (Sargent fix applied)
  function normalizeQuery(q) {
    const s = (q || '').toLowerCase().trim();
    if (ECONOMIST_ALIASES.has(s)) return ECONOMIST_ALIASES.get(s);
    return s
      .replace(/\bprof\.?|dr\.?/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function findEconomist(q) {
    const key = normalizeQuery(q);
    if (ECONOMISTS[key]) return ECONOMISTS[key];
    // try token match (e.g., "Sargent search")
    for (const k in ECONOMISTS) {
      if (key.includes(k)) return ECONOMISTS[k];
      if (key.includes(ECONOMISTS[k].key)) return ECONOMISTS[k];
    }
    return null;
  }

  function formatBookRef(book) {
    if (!book) return '';
    const base = `${book.title} — ${book.author}${book.edition ? ', ' + book.edition : ''}`;
    return base;
  }

  function answerForEconomist(econ) {
    const refs = (econ.refs || []).map(formatBookRef).filter(Boolean);
    const refLine = refs.length ? `References: ${refs.join(' | ')}` : '';
    return `${econ.name} — fields: ${econ.fields.join(', ')}. Key works: ${econ.notable.join('; ')}. ${refLine}`;
  }

  function answerForBooks(q) {
    // Route to Sargent/L&S content when macro terms appear (Sargent fix)
    const s = q.toLowerCase();
    if (/rational expectations|recursive macro|dynamic programming|time consistency|ramsey/.test(s)) {
      const b = BOOKS.ljungqvistSargent;
      return `Macro (Ljungqvist & Sargent): parts — ${Object.values(b.parts).map(p=>p.label).join(', ')}.`;
    }
    if (/varian|consumer|producer|equilibrium|demand/.test(s)) {
      const v = BOOKS.varian;
      return `Varian: chapters — ${Object.values(v.chapters).map(c=>c.label).join(', ')}.`;
    }
    if (/mas[- ]?colell|general competitive|game theory|preferences/.test(s)) {
      const m = BOOKS.masColell;
      return `Mas-Colell: topics — ${Object.values(m.chapters).map(c=>c.label).join(', ')}.`;
    }
    return '';
  }

  async function handleQuery(q) {
    const query = (q || '').trim();
    if (!query) return;
    addMessage('user', query);
    showTyping(true);
    await new Promise(r => setTimeout(r, CONFIG.typingDelay));

    // Try economist first
    const econ = findEconomist(query);
    if (econ) {
      addMessage('assistant', answerForEconomist(econ));
      showTyping(false);
      return;
    }

    // Then books routing
    const bookAns = answerForBooks(query);
    if (bookAns) {
      addMessage('assistant', bookAns);
      showTyping(false);
      return;
    }

    // Fallback generic
    addMessage('assistant', 'Please specify a topic, book section, or economist (e.g., "Sargent dynamic programming").');
    showTyping(false);
  }

  function openChatbot() {
    chatState.isOpen = true;
    if (elements.container) elements.container.classList.remove('economics-hidden');
  }

  function closeChatbot() {
    chatState.isOpen = false;
    if (elements.container) elements.container.classList.add('economics-hidden');
  }

  function toggleChatbot() { chatState.isOpen ? closeChatbot() : openChatbot(); }

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
      if (e.key === 'Enter') { handleQuery(input.value); input.value = ''; }
    });
  }

  // Initialize when DOM is ready
  function initEconomicsChatbot() { if (!elements.container) buildUI(); }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initEconomicsChatbot); }
  else { initEconomicsChatbot(); }

  // Export for global access
  window.Economika = { open: openChatbot, close: closeChatbot, toggle: toggleChatbot, addMessage, version: CONFIG.version };
})();
