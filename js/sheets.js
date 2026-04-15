// ============================================================
//  SHEETS.JS — Reads data from Google Sheets (published CSV)
//  No API key needed — uses the public CSV export feature
// ============================================================

const SHEETS = {

  // Build the CSV export URL for a given tab name
  csvUrl(tabName) {
    return `https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;
  },

  // Parse raw CSV text into an array of objects
  // Handles quoted fields that contain commas or newlines (multi-line cells)
  parseCSV(text) {
    const rows = [];
    let current = '';
    let inQuotes = false;

    // Walk character by character to handle quoted newlines
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === '\n' && !inQuotes) {
        rows.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
    if (current.trim()) rows.push(current);

    if (rows.length < 2) return [];

    const parseRow = (line) => {
      const values = [];
      let cur = '';
      let inQ = false;
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') { inQ = !inQ; }
        else if (line[i] === ',' && !inQ) { values.push(cur.trim()); cur = ''; }
        else { cur += line[i]; }
      }
      values.push(cur.trim());
      return values;
    };

    const headers = parseRow(rows[0]).map(h => h.replace(/"/g, '').trim().toLowerCase());

    return rows.slice(1).map(line => {
      const values = parseRow(line);
      const obj = {};
      headers.forEach((h, i) => { obj[h] = values[i] || ''; });
      return obj;
    }).filter(row => Object.values(row).some(v => v !== ''));
  },

  // Fetch produce list from "Produce" tab
  async fetchProduce() {
    const res = await fetch(this.csvUrl('Produce'));
    if (!res.ok) throw new Error('Could not load produce');
    const text = await res.text();
    return this.parseCSV(text);
  },

  // Fetch recipes from "Recipes" tab
  async fetchRecipes() {
    const res = await fetch(this.csvUrl('Recipes'));
    if (!res.ok) throw new Error('Could not load recipes');
    const text = await res.text();
    return this.parseCSV(text);
  },

};
