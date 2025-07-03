import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Maciej Wisniewski'),
    authorImage: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      ogImage: z.string().optional(),
      ogType: z.string().default('article'),
      twitterCard: z.string().default('summary_large_image'),
    }).optional(),
    readingTime: z.number().optional(),
    relatedPosts: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog,
}; 