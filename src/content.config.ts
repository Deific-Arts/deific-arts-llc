import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
    layout: z.string().optional(),
    permalink: z.string().optional(),
		title: z.string(),
		excerpt: z.string().optional(),
		date: z.coerce.date(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    banner: z.string().optional(),
	}),
});


export const collections = { blog };
