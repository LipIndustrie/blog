import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Schéma commun aux articles et aux outils : même frontmatter.
// La langue est optionnelle (déduite du dossier fr/ ou en/ si absente).
const contentSchema = ({ image }: { image: () => z.ZodType }) =>
	z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.optional(image()),
		// Texte alternatif de l'image hero (SEO image + accessibilité).
		// Si absent, on retombe sur le titre de l'article.
		heroAlt: z.string().optional(),
		lang: z.enum(['fr', 'en']).optional(),
		draft: z.boolean().optional(),
	});

// Articles de blog : src/content/articles/<lang>/
const articles = defineCollection({
	loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
	schema: contentSchema,
});

// Outils gratuits en ligne (convertisseurs, tableaux de normes…) :
// src/content/tools/<lang>/
const tools = defineCollection({
	loader: glob({ base: './src/content/tools', pattern: '**/*.{md,mdx}' }),
	schema: contentSchema,
});

export const collections = { articles, tools };
