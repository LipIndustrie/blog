import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getArticlesByLang, getArticleUrl } from '../i18n/posts';

export async function GET(context) {
	const posts = await getArticlesByLang('fr');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: getArticleUrl(post),
		})),
	});
}
