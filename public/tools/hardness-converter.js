/* Convertisseur de dureté — HRC / HB / HV / Rm
   Table de correspondance normalisée EN ISO 18265:2013
   Valeurs pour aciers non-alliés et faiblement alliés (tableau A.1) */

const TABLE = [
  // [HRC, HB,  HV,   Rm(MPa)]
  [68,  null, 940,  null],
  [67,  null, 900,  null],
  [66,  null, 865,  null],
  [65,  null, 832,  null],
  [64,  null, 800,  null],
  [63,  null, 772,  null],
  [62,  null, 746,  null],
  [61,  null, 720,  null],
  [60,  null, 697,  null],
  [59,  null, 674,  null],
  [58,  null, 653,  null],
  [57,  null, 633,  null],
  [56,  null, 613,  null],
  [55,  null, 595,  null],
  [54,  null, 577,  null],
  [53,  null, 560,  null],
  [52,  null, 544,  null],
  [51,  null, 528,  null],
  [50,  null, 513,  null],
  [49,  null, 498,  null],
  [48,  null, 484,  null],
  [47,  452, 471,  null],
  [46,  442, 458,  null],
  [45,  432, 446,  null],
  [44,  421, 434,  null],
  [43,  409, 423,  null],
  [42,  400, 412,  null],
  [41,  390, 402,  null],
  [40,  381, 392,  1290],
  [39,  371, 382,  1250],
  [38,  362, 372,  1215],
  [37,  353, 363,  1180],
  [36,  344, 354,  1150],
  [35,  336, 345,  1115],
  [34,  327, 336,  1080],
  [33,  319, 327,  1055],
  [32,  311, 318,  1025],
  [31,  301, 310,   995],
  [30,  294, 302,   970],
  [29,  286, 294,   940],
  [28,  279, 286,   915],
  [27,  271, 279,   890],
  [26,  264, 272,   865],
  [25,  258, 266,   845],
  [24,  253, 260,   825],
  [23,  247, 254,   805],
  [22,  243, 248,   785],
  [21,  237, 243,   770],
  [20,  231, 238,   750],
];

// Table HB seul pour valeurs < HRC 20 (HB 85–231)
const TABLE_HB_HV = [
  [null, 228, 235, 745],
  [null, 225, 232, 735],
  [null, 220, 228, 720],
  [null, 215, 222, 705],
  [null, 210, 216, 690],
  [null, 205, 211, 675],
  [null, 200, 206, 655],
  [null, 195, 201, 640],
  [null, 190, 196, 625],
  [null, 185, 191, 610],
  [null, 180, 185, 590],
  [null, 175, 180, 575],
  [null, 170, 175, 560],
  [null, 165, 170, 545],
  [null, 160, 165, 530],
  [null, 155, 160, 515],
  [null, 150, 155, 495],
  [null, 145, 150, 480],
  [null, 140, 145, 465],
  [null, 135, 139, 450],
  [null, 130, 134, 430],
  [null, 125, 128, 415],
  [null, 120, 124, 400],
  [null, 115, 118, 385],
  [null, 110, 113, 370],
  [null, 105, 108, 350],
  [null, 100, 103, 335],
  [null,  95,  98, 320],
  [null,  90,  92, 305],
  [null,  85,  87, 290],
];

const FULL_TABLE = [...TABLE, ...TABLE_HB_HV];

const FIELDS = ['hrc', 'hb', 'hv', 'rm'];
const LABELS = { hrc: 'HRC', hb: 'HB', hv: 'HV', rm: 'Rm (MPa)' };
const IDX    = { hrc: 0, hb: 1, hv: 2, rm: 3 };

function findRows(field, value) {
  const idx = IDX[field];
  const v = parseFloat(value);
  if (isNaN(v)) return [];
  // cherche la ligne la plus proche
  let best = null, bestDist = Infinity;
  for (const row of FULL_TABLE) {
    if (row[idx] === null) continue;
    const d = Math.abs(row[idx] - v);
    if (d < bestDist) { bestDist = d; best = row; }
  }
  if (!best || bestDist > 20) return [];
  return [best];
}

function renderResult(rows) {
  const out = document.getElementById('hd-output');
  if (!rows.length) {
    out.innerHTML = '<p class="hd-warn">Valeur hors plage ou non trouvée dans la table ISO 18265.</p>';
    return;
  }
  const [hrc, hb, hv, rm] = rows[0];
  const fmt = v => v !== null ? v : '<span class="hd-na">—</span>';
  out.innerHTML = `
    <div class="hd-result-grid">
      <div class="hd-res-card"><span class="hd-res-label">HRC</span><span class="hd-res-val">${fmt(hrc)}</span></div>
      <div class="hd-res-card"><span class="hd-res-label">HB</span><span class="hd-res-val">${fmt(hb)}</span></div>
      <div class="hd-res-card"><span class="hd-res-label">HV</span><span class="hd-res-val">${fmt(hv)}</span></div>
      <div class="hd-res-card"><span class="hd-res-label">Rm (MPa)</span><span class="hd-res-val">${fmt(rm)}</span></div>
    </div>
    <p class="hd-note">Valeurs issues de la table EN ISO 18265:2013 — aciers non-alliés et faiblement alliés (tableau A.1). La valeur affichée est la ligne la plus proche de votre saisie.</p>
  `;
}

function renderFullTable() {
  const tbody = document.getElementById('hd-table-body');
  if (!tbody) return;
  tbody.innerHTML = FULL_TABLE.map(([hrc, hb, hv, rm]) => {
    const c = v => v !== null ? `<td>${v}</td>` : '<td class="hd-na">—</td>';
    return `<tr>${c(hrc)}${c(hb)}${c(hv)}${c(rm)}</tr>`;
  }).join('');
}

function init() {
  const btn = document.getElementById('hd-convert-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const field = document.getElementById('hd-from').value;
    const value = document.getElementById('hd-value').value;
    const rows = findRows(field, value);
    renderResult(rows);
  });

  document.getElementById('hd-value').addEventListener('keydown', e => {
    if (e.key === 'Enter') btn.click();
  });

  renderFullTable();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
