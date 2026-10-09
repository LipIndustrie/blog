/* Tableau des tolérances ISO 286-1 — arbres et alésages */
/* Écarts fondamentaux et valeurs IT selon ISO 286-1:2010 */

(function () {
  /* ── Valeurs IT (µm) selon le diamètre moyen géométrique ── */
  /* Plages de diamètre nominal (mm) : bornes supérieures des intervalles ISO */
  const RANGES = [3, 6, 10, 18, 30, 50, 80, 120, 180, 250, 315, 400, 500];
  /* D_moyen géométrique (√(d1*d2)) pour chaque intervalle, arrondi */
  const D_MEAN = [1.73, 4.24, 7.75, 13.45, 23.24, 39.37, 63.25, 98.99, 146.97, 212.13, 280.7, 355.15, 447.21];

  /* Facteur IT = 0.45*D^(1/3) + 0.001*D, puis valeurs IT = coefficient * facteur */
  /* Coefficients de grade pour IT1..IT18 */
  const IT_COEFF = [0.8, 1.2, 2, 3.2, 5, 8, 13, 21, 34, 52, 84, 130, 210];
  /* Correspond à IT5..IT17 (indices 0..12) */

  function itFactor(d) {
    return 0.45 * Math.pow(d, 1 / 3) + 0.001 * d;
  }

  /* Retourne l'indice de plage ISO pour un diamètre nominal (mm) */
  function rangeIndex(d) {
    for (let i = 0; i < RANGES.length; i++) {
      if (d <= RANGES[i]) return i;
    }
    return RANGES.length - 1;
  }

  /* Valeur IT en µm pour une qualité donnée (5..16) et un diamètre nominal */
  function itValue(grade, d) {
    const ri = rangeIndex(d);
    const dm = D_MEAN[ri];
    const f = itFactor(dm);
    /* IT5=grade index 0, IT6=1, ..., IT16=11, IT17=12 */
    const idx = grade - 5;
    if (idx < 0 || idx >= IT_COEFF.length) return null;
    return Math.round(IT_COEFF[idx] * f);
  }

  /* ── Écarts fondamentaux (µm) — ISO 286-1 tableaux 4 & 5 ── */
  /* Arbres : lettre → fonction(d_nominal) retournant l'écart supérieur es (µm, algébrique) */
  /* Convention : es = écart supérieur arbre, ei = es - IT */
  /* Alésages : EI = écart inférieur alésage, ES = EI + IT */

  /* Données tabulées pour les positions courantes (µm), d en mm */
  function shaftES(letter, d) {
    switch (letter) {
      /* grands jeux */
      case 'a': return -(265 + 1.3 * d);
      case 'b': return -(140 + 0.85 * d);
      case 'c': {
        if (d <= 3) return -60;
        if (d <= 6) return -70;
        if (d <= 10) return -80;
        if (d <= 18) return -95;
        if (d <= 30) return -110;
        if (d <= 50) return -130;
        if (d <= 80) return -150;
        if (d <= 120) return -170;
        if (d <= 180) return -200;
        if (d <= 250) return -230;
        if (d <= 315) return -240;
        if (d <= 400) return -260;
        return -280;
      }
      case 'd': {
        /* es = -16 * D^0.44 arrondi selon table */
        return -Math.round(16 * Math.pow(d, 0.44));
      }
      case 'e': {
        return -Math.round(11 * Math.pow(d, 0.41));
      }
      case 'f': {
        return -Math.round(5.5 * Math.pow(d, 0.41));
      }
      case 'g': {
        return -Math.round(2.5 * Math.pow(d, 0.34));
      }
      case 'h': return 0; /* arbre de référence */
      case 'j': return null; /* dépend de la qualité, traité séparément */
      case 'js': return null; /* symétrique : ±IT/2 */
      case 'k': {
        /* ei = +0 pour IT≤3, sinon formule — simplifié : es traité via ei=0 pour la plupart */
        return null;
      }
      case 'm': {
        if (d <= 3) return 2;
        if (d <= 6) return 4;
        if (d <= 10) return 6;
        if (d <= 18) return 7;
        if (d <= 30) return 8;
        if (d <= 50) return 9;
        if (d <= 80) return 11;
        if (d <= 120) return 13;
        if (d <= 180) return 15;
        if (d <= 250) return 17;
        if (d <= 315) return 20;
        if (d <= 400) return 21;
        return 23;
      }
      case 'n': {
        if (d <= 3) return 4;
        if (d <= 6) return 8;
        if (d <= 10) return 10;
        if (d <= 18) return 12;
        if (d <= 30) return 15;
        if (d <= 50) return 17;
        if (d <= 80) return 20;
        if (d <= 120) return 23;
        if (d <= 180) return 27;
        if (d <= 250) return 31;
        if (d <= 315) return 34;
        if (d <= 400) return 37;
        return 40;
      }
      case 'p': {
        /* ei positif : serrage */
        if (d <= 3) return 6;
        if (d <= 6) return 12;
        if (d <= 10) return 15;
        if (d <= 18) return 18;
        if (d <= 30) return 22;
        if (d <= 50) return 26;
        if (d <= 80) return 32;
        if (d <= 120) return 37;
        if (d <= 180) return 43;
        if (d <= 250) return 50;
        if (d <= 315) return 56;
        if (d <= 400) return 62;
        return 68;
      }
      case 'r': {
        if (d <= 3) return 10;
        if (d <= 6) return 15;
        if (d <= 10) return 19;
        if (d <= 18) return 23;
        if (d <= 30) return 28;
        if (d <= 50) return 34;
        if (d <= 80) return 41;
        if (d <= 120) return 51;
        if (d <= 180) return 63;
        if (d <= 250) return 77;
        if (d <= 315) return 87;
        if (d <= 400) return 98;
        return 108;
      }
      case 's': {
        if (d <= 3) return 14;
        if (d <= 6) return 19;
        if (d <= 10) return 23;
        if (d <= 18) return 28;
        if (d <= 30) return 35;
        if (d <= 50) return 42;
        if (d <= 80) return 53;
        if (d <= 120) return 71;
        if (d <= 180) return 98;
        if (d <= 250) return 125;
        if (d <= 315) return 144;
        if (d <= 400) return 166;
        return 189;
      }
      case 't': {
        if (d <= 24) return null; /* non normalisé sous 24 */
        if (d <= 30) return 41;
        if (d <= 40) return 48;
        if (d <= 50) return 54;
        if (d <= 65) return 66;
        if (d <= 80) return 75;
        if (d <= 100) return 91;
        if (d <= 120) return 104;
        if (d <= 140) return 122;
        if (d <= 160) return 134;
        if (d <= 180) return 146;
        if (d <= 200) return 166;
        if (d <= 225) return 180;
        if (d <= 250) return 196;
        return null;
      }
      case 'u': {
        if (d <= 3) return 18;
        if (d <= 6) return 23;
        if (d <= 10) return 28;
        if (d <= 18) return 33;
        if (d <= 30) return 41;
        if (d <= 50) return 50;
        if (d <= 65) return 60;
        if (d <= 80) return 62;
        if (d <= 100) return 73;
        if (d <= 120) return 76;
        if (d <= 140) return 88;
        if (d <= 160) return 90;
        if (d <= 180) return 93;
        if (d <= 200) return 106;
        if (d <= 225) return 109;
        if (d <= 250) return 113;
        if (d <= 280) return 126;
        if (d <= 315) return 130;
        if (d <= 355) return 144;
        if (d <= 400) return 150;
        if (d <= 450) return 166;
        return 172;
      }
      case 'x': {
        if (d <= 3) return 20;
        if (d <= 6) return 28;
        if (d <= 10) return 34;
        if (d <= 18) return 40;
        if (d <= 30) return 50;
        if (d <= 40) return 60;
        if (d <= 50) return 70;
        if (d <= 65) return 80;
        if (d <= 80) return 90;
        if (d <= 100) return 107;
        if (d <= 120) return 114;
        return null;
      }
      case 'z': {
        if (d <= 3) return 26;
        if (d <= 6) return 35;
        if (d <= 10) return 42;
        if (d <= 18) return 50;
        if (d <= 24) return 63;
        if (d <= 30) return 67;
        if (d <= 40) return 80;
        if (d <= 50) return 92;
        if (d <= 65) return 112;
        if (d <= 80) return 128;
        if (d <= 100) return 152;
        if (d <= 120) return 172;
        return null;
      }
      default: return null;
    }
  }

  /* Écart fondamental inférieur alésage EI (µm) — symétrique à es via règle générale */
  function holeEI(letter, d) {
    switch (letter) {
      case 'A': return -shaftES('a', d);  /* ≈ jeux importants */
      case 'B': return -shaftES('b', d);
      case 'C': return -shaftES('c', d);
      case 'D': return -shaftES('d', d);
      case 'E': return -shaftES('e', d);
      case 'F': return -shaftES('f', d);
      case 'G': return -shaftES('g', d);
      case 'H': return 0; /* alésage de référence */
      case 'JS': return null; /* symétrique */
      case 'K': {
        /* EI négatif, dépend de la qualité — valeurs approchées */
        if (d <= 3) return 0;
        if (d <= 6) return -1;
        if (d <= 10) return -1;
        if (d <= 18) return -1;
        if (d <= 30) return -2;
        if (d <= 50) return -2;
        if (d <= 80) return -2;
        if (d <= 120) return -3;
        if (d <= 180) return -3;
        if (d <= 250) return -4;
        if (d <= 315) return -4;
        if (d <= 400) return -5;
        return -5;
      }
      case 'M': return -shaftES('m', d);
      case 'N': return -shaftES('n', d);
      case 'P': return -shaftES('p', d);
      case 'R': return -shaftES('r', d);
      case 'S': return -shaftES('s', d);
      case 'T': return shaftES('t', d) != null ? -shaftES('t', d) : null;
      case 'U': return -shaftES('u', d);
      case 'X': return shaftES('x', d) != null ? -shaftES('x', d) : null;
      case 'Z': return shaftES('z', d) != null ? -shaftES('z', d) : null;
      default: return null;
    }
  }

  /* ── Qualités disponibles par type ── */
  const SHAFT_GRADES = [5, 6, 7, 8, 9, 10, 11, 12];
  const HOLE_GRADES = [5, 6, 7, 8, 9, 10, 11, 12];

  /* Déviations fondamentales arbre (es) — lettres courantes */
  const SHAFT_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'm', 'n', 'p', 'r', 's', 'u'];
  /* Déviations fondamentales alésage (EI) */
  const HOLE_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'K', 'M', 'N', 'P', 'R', 'S', 'U'];

  /* ── Ajustements courants recommandés ── */
  const COMMON_FITS = [
    { hole: 'H7', shaft: 'f7', label: 'Glissant', type: 'jeu' },
    { hole: 'H7', shaft: 'g6', label: 'Tournant serré', type: 'jeu' },
    { hole: 'H7', shaft: 'h6', label: 'Glissant précis', type: 'jeu' },
    { hole: 'H7', shaft: 'k6', label: 'Sans jeu', type: 'indéterminé' },
    { hole: 'H7', shaft: 'n6', label: 'Serrage léger', type: 'serrage' },
    { hole: 'H7', shaft: 'p6', label: 'Serrage normal', type: 'serrage' },
    { hole: 'H7', shaft: 's6', label: 'Serrage fort', type: 'serrage' },
    { hole: 'H8', shaft: 'f7', label: 'Tournant libre', type: 'jeu' },
    { hole: 'H8', shaft: 'h7', label: 'Centrage libre', type: 'jeu' },
    { hole: 'H11', shaft: 'c11', label: 'Libre (poussière)', type: 'jeu' },
    { hole: 'H11', shaft: 'h11', label: 'Glissant grossier', type: 'jeu' },
  ];

  /* ── Rendu ── */
  function fmt(val, decimals) {
    if (val === null || val === undefined || isNaN(val)) return '—';
    return val.toFixed(decimals !== undefined ? decimals : 3);
  }

  function sign(v) {
    if (v > 0) return '+' + v;
    return String(v);
  }

  function computeShaft(letter, grade, d) {
    const it = itValue(grade, d);
    if (it === null) return null;
    let es, ei;
    if (letter === 'js') {
      es = Math.round(it / 2);
      ei = -Math.floor(it / 2);
    } else {
      es = shaftES(letter, d);
      if (es === null) return null;
      ei = es - it;
    }
    return { es, ei, it, dmax: (d + es / 1000), dmin: (d + ei / 1000) };
  }

  function computeHole(letter, grade, d) {
    const it = itValue(grade, d);
    if (it === null) return null;
    let EI, ES;
    if (letter === 'JS') {
      EI = -Math.floor(it / 2);
      ES = Math.round(it / 2);
    } else {
      EI = holeEI(letter, d);
      if (EI === null) return null;
      ES = EI + it;
    }
    return { EI, ES, it, Dmax: (d + ES / 1000), Dmin: (d + EI / 1000) };
  }

  /* ── DOM ── */
  const root = document.getElementById('iso-tol');
  if (!root) return;

  /* Calcul du jeu/serrage pour un ajustement */
  function fitResult(holeData, shaftData) {
    if (!holeData || !shaftData) return null;
    const jeuMax = holeData.ES - shaftData.ei;
    const jeuMin = holeData.EI - shaftData.es;
    return { jeuMax, jeuMin };
  }

  function typeClass(jeuMax, jeuMin) {
    if (jeuMin >= 0) return 'jeu';
    if (jeuMax <= 0) return 'serrage';
    return 'indetermine';
  }

  function renderResult() {
    const dVal = parseFloat(root.querySelector('#tol-diam').value);
    if (isNaN(dVal) || dVal <= 0 || dVal > 500) {
      root.querySelector('#tol-output').innerHTML =
        '<p class="tol-error">Entrez un diamètre entre 1 et 500 mm.</p>';
      return;
    }

    const mode = root.querySelector('input[name="tol-mode"]:checked').value;
    const grade = parseInt(root.querySelector('#tol-grade').value, 10);

    let html = '';

    if (mode === 'shaft') {
      html += `<h3>Arbre — qualité IT${grade} — Ø ${dVal} mm</h3>`;
      html += '<div class="tol-table-wrap"><table class="tol-table"><thead><tr>';
      html += '<th>Position</th><th>es (µm)</th><th>ei (µm)</th><th>IT (µm)</th>';
      html += '<th>Ø max (mm)</th><th>Ø min (mm)</th></tr></thead><tbody>';
      for (const letter of SHAFT_LETTERS) {
        const r = computeShaft(letter, grade, dVal);
        if (!r) { html += `<tr><td>${letter}${grade}</td><td colspan="5" class="na">Non normalisé</td></tr>`; continue; }
        html += `<tr><td><strong>${letter}${grade}</strong></td>`;
        html += `<td>${sign(r.es)}</td><td>${sign(r.ei)}</td><td>${r.it}</td>`;
        html += `<td>${fmt(r.dmax)}</td><td>${fmt(r.dmin)}</td></tr>`;
      }
      html += '</tbody></table></div>';
    } else {
      html += `<h3>Alésage — qualité IT${grade} — Ø ${dVal} mm</h3>`;
      html += '<div class="tol-table-wrap"><table class="tol-table"><thead><tr>';
      html += '<th>Position</th><th>EI (µm)</th><th>ES (µm)</th><th>IT (µm)</th>';
      html += '<th>Ø min (mm)</th><th>Ø max (mm)</th></tr></thead><tbody>';
      for (const letter of HOLE_LETTERS) {
        const r = computeHole(letter, grade, dVal);
        if (!r) { html += `<tr><td>${letter}${grade}</td><td colspan="5" class="na">Non normalisé</td></tr>`; continue; }
        html += `<tr><td><strong>${letter}${grade}</strong></td>`;
        html += `<td>${sign(r.EI)}</td><td>${sign(r.ES)}</td><td>${r.it}</td>`;
        html += `<td>${fmt(r.Dmin)}</td><td>${fmt(r.Dmax)}</td></tr>`;
      }
      html += '</tbody></table></div>';
    }

    root.querySelector('#tol-output').innerHTML = html;
  }

  function renderFits() {
    const dVal = parseFloat(root.querySelector('#fit-diam').value);
    if (isNaN(dVal) || dVal <= 0 || dVal > 500) {
      root.querySelector('#fit-output').innerHTML =
        '<p class="tol-error">Entrez un diamètre entre 1 et 500 mm.</p>';
      return;
    }

    let html = `<h3>Ajustements courants — Ø ${dVal} mm</h3>`;
    html += '<div class="tol-table-wrap"><table class="tol-table"><thead><tr>';
    html += '<th>Ajustement</th><th>Description</th>';
    html += '<th>Jeu max (µm)</th><th>Jeu min (µm)</th><th>Type</th></tr></thead><tbody>';

    for (const fit of COMMON_FITS) {
      const hLetter = fit.hole.replace(/\d+/, '');
      const hGrade = parseInt(fit.hole.replace(/\D+/, ''), 10);
      const sLetter = fit.shaft.replace(/\d+/, '');
      const sGrade = parseInt(fit.shaft.replace(/\D+/, ''), 10);

      const hd = computeHole(hLetter, hGrade, dVal);
      const sd = computeShaft(sLetter, sGrade, dVal);
      const fr = fitResult(hd, sd);

      if (!fr) {
        html += `<tr><td>${fit.hole}/${fit.shaft}</td><td>${fit.label}</td><td colspan="3" class="na">—</td></tr>`;
        continue;
      }

      const tc = typeClass(fr.jeuMax, fr.jeuMin);
      const typeLabel = tc === 'jeu' ? 'Jeu' : tc === 'serrage' ? 'Serrage' : 'Indéterminé';
      const jMaxDisp = tc === 'serrage' ? sign(-fr.jeuMin) + ' (serrage)' : sign(fr.jeuMax);
      const jMinDisp = tc === 'jeu' ? sign(fr.jeuMin) : tc === 'serrage' ? sign(-fr.jeuMax) + ' (serrage)' : sign(fr.jeuMin);

      html += `<tr class="fit-${tc}"><td><strong>${fit.hole}/${fit.shaft}</strong></td>`;
      html += `<td>${fit.label}</td><td>${jMaxDisp}</td><td>${jMinDisp}</td>`;
      html += `<td><span class="fit-badge fit-badge--${tc}">${typeLabel}</span></td></tr>`;
    }

    html += '</tbody></table></div>';
    root.querySelector('#fit-output').innerHTML = html;
  }

  /* Init */
  root.querySelector('#tol-calc-btn').addEventListener('click', renderResult);
  root.querySelector('#fit-calc-btn').addEventListener('click', renderFits);

  root.querySelector('#tol-diam').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') renderResult();
  });
  root.querySelector('#fit-diam').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') renderFits();
  });
})();
