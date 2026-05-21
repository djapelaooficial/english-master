// public/js/travel.js
// Dynamic loader for travel phrases – renders categories as tabs and cards
// ---------------------------------------------------------------
// Expected HTML structure (in travel.html):
//   <nav class="tab-container" id="tabs"></nav>
//   <main class="cards" id="phrases"></main>
//   <input id="search" placeholder="Search phrases...">
// ---------------------------------------------------------------

(() => {
  const API_URL = "/data/travel_phrases.json";
  const tabsEl = document.getElementById("tabs");
  const phrasesEl = document.getElementById("phrases");
  const searchEl = document.getElementById("search");

  let data = null; // full JSON data
  let activeCategory = null;

  // Utility: create element with class & text
  const el = (tag, className, text) => {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (text) e.textContent = text;
    return e;
  };

  // Render tabs based on categories
  const renderTabs = () => {
    tabsEl.innerHTML = "";
    data.categories.forEach((cat, idx) => {
      const btn = el("button", "tab-button", cat.name);
      btn.dataset.idx = idx;
      btn.onclick = () => setActiveCategory(idx);
      if (idx === 0) btn.classList.add("active");
      tabsEl.appendChild(btn);
    });
  };

  // Render phrase cards for the currently active category
  const renderPhrases = () => {
    phrasesEl.innerHTML = "";
    if (activeCategory == null) return;
    const phrases = data.categories[activeCategory].phrases;
    const filter = searchEl.value.trim().toLowerCase();
    const filtered = phrases.filter(p =>
      p.english.toLowerCase().includes(filter) ||
      p.portuguese.toLowerCase().includes(filter)
    );
    filtered.forEach(p => {
      const card = el("div", "phrase-card");
      const eng = el("p", "eng", p.english);
      const pt = el("p", "pt", p.portuguese);
      card.appendChild(eng);
      card.appendChild(pt);
      phrasesEl.appendChild(card);
    });
  };

  const setActiveCategory = idx => {
    activeCategory = idx;
    // update tab active class
    Array.from(tabsEl.children).forEach((b, i) => {
      b.classList.toggle("active", i === idx);
    });
    renderPhrases();
  };

  const init = async () => {
    try {
      const resp = await fetch(API_URL);
      data = await resp.json();
      // default to first category
      activeCategory = 0;
      renderTabs();
      renderPhrases();
    } catch (e) {
      console.error("Failed to load travel phrases", e);
      phrasesEl.textContent = "Erro ao carregar frases. Verifique a conexão.";
    }
  };

  // Search live filter
  searchEl.addEventListener("input", () => renderPhrases());

  // Start
  init();
})();
