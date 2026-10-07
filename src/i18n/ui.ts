// Dictionnaire d'interface (libellés UI) pour le blog multilingue.
// Le contenu vit dans src/content/articles/<lang>/ et tools/<lang>/ ; ici on ne gère
// que les textes d'interface (navigation, footer, etc.).

export const languages = {
	fr: 'Français',
	en: 'English',
} as const;

// Emoji drapeau par langue (affiché dans le sélecteur de langue).
// Note : les emojis drapeaux ne s'affichent pas sur Windows (pas de police
// dédiée) ; ils apparaissent correctement sur mobile, macOS, Linux.
export const flags = {
	fr: '🇫🇷',
	en: '🇬🇧',
} as const;

export const defaultLang = 'fr';

export type Lang = keyof typeof languages;

export const ui = {
	fr: {
		'nav.home': 'Accueil',
		'nav.articles': 'Articles',
		'nav.tools': 'Outils',
		'nav.about': 'À propos',
		'footer.rights': 'Tous droits réservés.',
		'articles.title': 'Articles',
		'articles.backToList': '← Retour aux articles',
		'tools.title': 'Outils gratuits',
		'tools.intro':
			'Nos outils en ligne gratuits pour la mécanique de précision : convertisseurs, tableaux de référence et aides au calcul.',
		'lang.switchTo': 'English',
	},
	en: {
		'nav.home': 'Home',
		'nav.articles': 'Articles',
		'nav.tools': 'Tools',
		'nav.about': 'About',
		'footer.rights': 'All rights reserved.',
		'articles.title': 'Articles',
		'articles.backToList': '← Back to the articles',
		'tools.title': 'Free tools',
		'tools.intro':
			'Our free online tools for precision mechanics: converters, reference tables and calculation aids.',
		'lang.switchTo': 'Français',
	},
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
