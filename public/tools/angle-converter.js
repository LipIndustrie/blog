// Convertisseur d'angles — degrés / radians / grades (gon) / degrés-minutes-secondes (DMS).
// Chargé par les outils MDX via <script src="/tools/angle-converter.js">.
(() => {
	const init = () => {
		const root = document.querySelector('.angle-converter');
		if (!root) return;

		// Champs unité simple (une valeur décimale) : degrés, radians, grades.
		const simple = root.querySelectorAll('input[data-angle]');
		// Champs DMS : degrés / minutes / secondes d'arc.
		const dmsInputs = {
			d: root.querySelector('input[data-dms="d"]'),
			m: root.querySelector('input[data-dms="m"]'),
			s: root.querySelector('input[data-dms="s"]'),
		};

		// Facteurs de conversion vers les degrés (unité pivot).
		const toDeg = { deg: 1, rad: 180 / Math.PI, gon: 0.9 };
		const fromDeg = { deg: 1, rad: Math.PI / 180, gon: 1 / 0.9 };
		const round = (n) => Math.round(n * 1e6) / 1e6;

		const clearAll = () => {
			simple.forEach((i) => (i.value = ''));
			if (dmsInputs.d) dmsInputs.d.value = '';
			if (dmsInputs.m) dmsInputs.m.value = '';
			if (dmsInputs.s) dmsInputs.s.value = '';
		};

		// Met à jour tous les champs à partir d'une valeur en degrés décimaux.
		// `except` indique le champ en cours d'édition, qu'on ne réécrit pas.
		const updateFrom = (deg, except) => {
			simple.forEach((input) => {
				if (input === except) return;
				input.value = round(deg * fromDeg[input.dataset.angle]);
			});
			if (dmsInputs.d && dmsInputs.d !== except && dmsInputs.m !== except && dmsInputs.s !== except) {
				const sign = deg < 0 ? -1 : 1;
				const abs = Math.abs(deg);
				let d = Math.floor(abs);
				let m = Math.floor((abs - d) * 60);
				// Secondes arrondies à 4 décimales (précision d'affichage), ce qui
				// évite les 59,99999… parasites avant le test de débordement.
				let s = Math.round((abs - d - m / 60) * 3600 * 1e4) / 1e4;
				if (s >= 60) {
					s -= 60;
					m += 1;
				}
				if (m >= 60) {
					m -= 60;
					d += 1;
				}
				dmsInputs.d.value = sign * d;
				dmsInputs.m.value = m;
				dmsInputs.s.value = s;
			}
		};

		// Entrées unité simple.
		simple.forEach((input) => {
			input.addEventListener('input', () => {
				const value = parseFloat(input.value);
				if (Number.isNaN(value)) {
					clearAll();
					return;
				}
				updateFrom(value * toDeg[input.dataset.angle], input);
			});
		});

		// Entrées DMS : on recompose les degrés décimaux à partir des 3 champs.
		const onDmsInput = (edited) => {
			const d = parseFloat(dmsInputs.d.value) || 0;
			const m = parseFloat(dmsInputs.m.value) || 0;
			const s = parseFloat(dmsInputs.s.value) || 0;
			if (dmsInputs.d.value === '' && dmsInputs.m.value === '' && dmsInputs.s.value === '') {
				clearAll();
				return;
			}
			const sign = d < 0 ? -1 : 1;
			const deg = sign * (Math.abs(d) + m / 60 + s / 3600);
			updateFrom(deg, edited);
		};
		['d', 'm', 's'].forEach((key) => {
			if (dmsInputs[key]) {
				dmsInputs[key].addEventListener('input', () => onDmsInput(dmsInputs[key]));
			}
		});
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
