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
  parseCSV(text) {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim().toLowerCase());
    return lines.slice(1).map(line => {
      const values = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') {
          inQuotes = !inQuotes;
        } else if (line[i] === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += line[i];
        }
      }
      values.push(current.trim());
      const obj = {};
      headers.forEach((h, i) => { obj[h] = values[i] || ''; });
      return obj;
    }).filter(row => Object.values(row).some(v => v !== ''));
  },

  // Fetch produce list from "Produce" tab
  async fetchProduce() {
    const res = await fetch(this.cs
