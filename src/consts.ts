// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'LIP Industrie Précision — Le blog';
export const SITE_DESCRIPTION =
	'Usinage de précision, tournage, fraisage et électroérosion à Besançon. Conseils, savoir-faire et actualités de la mécanique de précision.';

// Coordonnées et réseaux de LIP Industrie Précision.
// Centralisés ici pour être réutilisés dans le header, le footer et les données structurées.
export const COMPANY = {
	name: 'LIP Industrie Précision',
	mainSite: 'https://www.lip-industrie.com/',
	linkedin: 'https://fr.linkedin.com/company/lip-industrie',
	email: 'contact@lip-industrie.com',
	phone: '+33 (0)3 81 53 50 88',
	// Format RFC 3966 pour le lien tel: (sans espaces ni parenthèses).
	phoneHref: 'tel:+33381535088',
} as const;

// Liens externes vers les pages techniques des machines du parc.
// Provisoire : on pointe vers les pages officielles AgieCharmilles (FR) en
// attendant nos propres articles dédiés par machine.
export const MACHINE_DOCS = {
	cutF350: 'https://www.agiecharmilles.com/fr/usinage-par-electro-erosion-a-fil/cut-f-350-600',
	cutE600: 'https://www.agiecharmilles.com/fr/usinage-par-electro-erosion-a-fil/cut-e-350-600-800',
} as const;
