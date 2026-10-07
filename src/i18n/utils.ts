// Helpers i18n : déduire la langue depuis l'URL, traduire un libellé,
// et construire des chemins localisés (FR sans préfixe, EN sous /en/).

import { defaultLang, ui, type Lang, type UIKey } from './ui';

/**
 * Slug de section par langue. Les articles gardent « articles » dans les deux
 * langues ; les outils utilisent « outils » en FR et « tools » en EN.
 */
const SECTION_SLUGS = {
	articles: { fr: 'articles', en: 'articles' },
	tools: { fr: 'outils', en: 'tools' },
} as const;

type Section = keyof typeof SECTION_SLUGS;

/** Déduit la langue à partir du pathname. `/en/...` => 'en', sinon 'fr'. */
export function getLangFromUrl(url: URL): Lang {
	const [, maybeLang] = url.pathname.split('/');
	if (maybeLang === 'en') return 'en';
	return defaultLang;
}

/** Retourne une fonction de traduction pour la langue donnée. */
export function useTranslations(lang: Lang) {
	return function t(key: UIKey): string {
		return ui[lang][key] ?? ui[defaultLang][key];
	};
}

/**
 * Préfixe un chemin selon la langue.
 * FR (défaut) => pas de préfixe ; EN => préfixe /en.
 * localizePath('/about', 'en') === '/en/about'
 */
export function localizePath(path: string, lang: Lang): string {
	const clean = path.startsWith('/') ? path : `/${path}`;
	if (lang === defaultLang) return clean;
	return `/${lang}${clean === '/' ? '' : clean}`;
}

/** URL de l'index d'une section (articles / outils) selon la langue. */
export function getSectionPath(section: Section, lang: Lang): string {
	return localizePath(`/${SECTION_SLUGS[section][lang]}`, lang);
}

/** Détecte à quelle section appartient un pathname (pour la nav active). */
export function getSectionFromUrl(url: URL): Section | null {
	const segments = url.pathname.split('/').filter(Boolean);
	const slug = segments[0] === 'en' ? segments[1] : segments[0];
	for (const section of Object.keys(SECTION_SLUGS) as Section[]) {
		const slugs = SECTION_SLUGS[section];
		if (slug === slugs.fr || slug === slugs.en) return section;
	}
	return null;
}

/**
 * Chemin équivalent dans l'autre langue (sélecteur de langue).
 * Pour une page de section (ex. un outil), on renvoie vers l'index de section
 * de la langue cible, car les slugs des contenus diffèrent d'une langue à
 * l'autre (pas de correspondance 1-à-1 garantie).
 */
export function getAlternatePath(url: URL, target: Lang): string {
	const section = getSectionFromUrl(url);
	if (section) return getSectionPath(section, target);

	// Pages simples (accueil, à propos…) : on retire/ajoute le préfixe /en.
	let path = url.pathname.replace(/\/$/, '') || '/';
	if (path.startsWith('/en/')) path = path.slice(3);
	else if (path === '/en') path = '/';
	return localizePath(path, target);
}
