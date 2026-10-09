// Requêtes de contenu localisées pour les deux collections : `articles` et
// `tools`. La langue et le slug « nu » sont déduits de l'id (fr/mon-article).

import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, type Lang } from './ui';

type Article = CollectionEntry<'articles'>;
type Tool = CollectionEntry<'tools'>;
type Entry = Article | Tool;

/** Langue d'une entrée : champ frontmatter `lang` sinon dossier (fr/ ou en/). */
export function getEntryLang(entry: Entry): Lang {
	if (entry.data.lang) return entry.data.lang;
	const [maybeLang] = entry.id.split('/');
	return maybeLang === 'en' ? 'en' : 'fr';
}

/** Slug sans le préfixe de langue : `fr/mon-article` => `mon-article`. */
export function getEntrySlug(entry: Entry): string {
	const parts = entry.id.split('/');
	if (parts[0] === 'fr' || parts[0] === 'en') return parts.slice(1).join('/');
	return entry.id;
}

/** URL publique d'un article (FR sans préfixe, EN sous /en/). */
export function getArticleUrl(article: Article): string {
	const lang = getEntryLang(article);
	const slug = getEntrySlug(article);
	return lang === defaultLang ? `/articles/${slug}/` : `/${lang}/articles/${slug}/`;
}

/** URL publique d'un outil (FR /outils/, EN /en/tools/). */
export function getToolUrl(tool: Tool): string {
	const lang = getEntryLang(tool);
	const slug = getEntrySlug(tool);
	return lang === defaultLang ? `/outils/${slug}/` : `/${lang}/tools/${slug}/`;
}

/** Articles d'une langue, triés du plus récent au plus ancien. Exclut les drafts. */
export async function getArticlesByLang(lang: Lang): Promise<Article[]> {
	const articles = await getCollection('articles');
	return articles
		.filter((a) => getEntryLang(a) === lang && !a.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Outils d'une langue, triés du plus récent au plus ancien. */
export async function getToolsByLang(lang: Lang): Promise<Tool[]> {
	const tools = await getCollection('tools');
	return tools
		.filter((t) => getEntryLang(t) === lang)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
