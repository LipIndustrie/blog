import rss from '@astrojs/rss';
import { SITE_TITLE } from '../../consts';
import { getArticlesByLang, getArticleUrl } from '../../i18n/posts';

export async function GET(context) {
	const posts = await getArticlesByLang('en');
	return rss({
		title: SITE_TITLE,
		description:
			'Precision machining, turning, milling and EDM in Besançon, France — from LIP Industrie Précision.',
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: getArticleUrl(post),
		})),
	});
}
