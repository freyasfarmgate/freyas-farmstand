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
  garlic: '🧄', egg: '🥚', honey: '🍯', flower: '💐
