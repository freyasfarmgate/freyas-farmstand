// ============================================================
//  MAIN.JS — Homepage logic
// ============================================================

// Set today's date in the welcome band
const dateEl = document.getElementById('today-date');
if (dateEl) {
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateEl.textContent = new Date().toLocaleDateString('en-CA', opts);
}

// Mobile nav toggle
function toggleNav() {
  document.getElementById('nav-links').classList.toggle('open');
}

// Emoji map for common produce (fallback if not set in sheet)
const EMOJI_MAP = {
  strawberr: '🍓', tomato: '🍅', carrot: '🥕', zucchini: '🥒', corn: '🌽',
  lettuce: '🥬', silverbeet: '🥬', spinach: '🥬', herb: '🌿', basil: '🌿',
  onion: '🧅', potato: '🥔', pumpkin: '🎃', apple: '🍎', pear: '🍐',
  bean: '🫘', pea: '🫛', cucumber: '🥒', kale: '🥦', broccoli: '🥦',
  garlic: '🧄', egg: '🥚', honey: '🍯', flower: '💐', default: '🌱',
};

function getEmoji(name, emoji) {
  if (emoji && emoji.trim()) return emoji.trim();
  const lower = (name || '').toLowerCase();
  for (const [key, val] of Object.entries(EMOJI_MAP)) {
    if (lower.includes(key)) return val;
  }
  return EMOJI_MAP.default;
}

function getBadgeClass(status) {
  if (!status) return 'available';
  const s = status.toLowerCase();
  if (s.includes('limited')) return 'limited';
  if (s.includes('unavailable') || s.includes('out') || s.includes('sold')) return 'unavailable';
  return '';
}

function getBadgeLabel(status) {
  if (!status || status.toLowerCase() === 'available') return 'Available';
  return status;
}

// Build produce cards
function renderProduce(items) {
  const grid = document.getElementById('produce-grid');
  if (!grid) return;

  const available = items.filter(i => {
    const s = (i.status || '').toLowerCase();
    return s !== 'unavailable' && s !== 'out of stock' && s !== 'sold out';
  });

  if (available.length === 0) {
    grid.style.display = 'none';
    const err = document.getElementById('error-state');
    if (err) {
      err.style.display = 'block';
      err.innerHTML = '<p>🌱 No produce listed for today yet.<br><small>Check back soon — we\'re out in the fields!</small></p>';
    }
    return;
  }

  grid.innerHTML = available.map((item, i) => `
    <div class="produce-card" style="animation-delay:${i * 0.07}s">
      <span class="produce-emoji">${getEmoji(item.name, item.emoji)}</span>
      <div class="produce-name">${item.name || 'Produce'}</div>
      <div class="produce-desc">${item.description || ''}</div>
      <span class="produce-badge ${getBadgeClass(item.status)}">${getBadgeLabel(item.status)}</span>
    </div>
  `).join('');
  grid.style.display = 'grid';
}

// Build recipe preview cards (max 3)
function renderRecipePreview(recipes) {
  const el = document.getElementById('recipe-preview');
  if (!el) return;
  const shown = recipes.slice(0, 3);
  if (shown.length === 0) {
    el.innerHTML = '<p style="color:var(--green-soft);font-style:italic;text-align:center;padding:2rem;">Recipes coming soon…</p>';
    return;
  }
  el.innerHTML = shown.map(r => `
    <a href="recipes.html" class="recipe-card">
      <div class="recipe-tag">${r.tag || r.category || '🌿 From the farm'}</div>
      <h3>${r.title || r.name || 'Recipe'}</h3>
      <p>${r.description || r.intro || ''}</p>
      <div class="recipe-meta">
        ${r.time ? `<span>⏱ ${r.time}</span>` : ''}
        ${r.serves ? `<span>🍽 ${r.serves}</span>` : ''}
      </div>
    </a>
  `).join('');
}

// Load everything
async function loadPage() {
  try {
    const [produce, recipes] = await Promise.all([
      SHEETS.fetchProduce(),
      SHEETS.fetchRecipes().catch(() => []),
    ]);
    document.getElementById('loading-state').style.display = 'none';
    renderProduce(produce);
    renderRecipePreview(recipes);
  } catch (err) {
    document.getElementById('loading-state').style.display = 'none';
    const errEl = document.getElementById('error-state');
    if (errEl) errEl.style.display = 'block';
    console.error('Load error:', err);
  }
}

// Only run if Sheet ID has been configured
if (CONFIG.SHEET_ID && CONFIG.SHEET_ID !== 'YOUR_SHEET_ID_HERE') {
  loadPage();
} else {
  // Show demo data if not yet configured
  document.getElementById('loading-state').style.display = 'none';
  renderProduce([
    { name: 'Strawberries', description: 'Sweet, sun-ripened and picked this morning', status: 'Limited', emoji: '🍓' },
    { name: 'Heritage Carrots', description: 'Rainbow mix — purple, orange & yellow', status: 'Available', emoji: '🥕' },
    { name: 'Silverbeet', description: 'Lush green bunches, crisp and fresh', status: 'Available', emoji: '🥬' },
    { name: 'Fresh Herbs', description: 'Basil, rosemary, thyme & parsley', status: 'Available', emoji: '🌿' },
    { name: 'Zucchini', description: 'Baby through to large — take your pick', status: 'Available', emoji: '🥒' },
    { name: 'Sweet Corn', description: 'Fresh picked, best eaten same day', status: 'Limited', emoji: '🌽' },
  ]);
  renderRecipePreview([
    { tag: '🍓 Strawberries', title: 'Strawberry & Basil Jam', description: 'A simple, fragrant preserve that captures the taste of summer in every jar.', time: '45 min', serves: 'Makes 3 jars' },
    { tag: '🥕 Heritage Carrots', title: 'Roasted Rainbow Carrot Salad', description: 'Honey-glazed heritage carrots over whipped feta with dukkah and fresh herbs.', time: '30 min', serves: 'Serves 4' },
    { tag: '🌽 Sweet Corn', title: 'Summer Corn Fritters', description: 'Crispy golden fritters with fresh corn, zucchini and spring onion.', time: '20 min', serves: 'Serves 2–3' },
  ]);
}
