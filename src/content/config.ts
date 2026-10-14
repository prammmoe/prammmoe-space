import { defineCollection, z } from "astro:content";

const baseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  pubDate: z.date(),
  updatedDate: z.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  lang: z.enum(['en', 'id']).default('en'),
  coverImage: z.string().optional(),
  coverCredit: z.string().optional(),
  coverCreditUrl: z.string().url().optional(),
});

const projectSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  pubDate: z.date(),
  updatedDate: z.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  thumbnail: z.string().optional(),
  github: z.string().optional(),
  demo: z.string().optional(),
  appStore: z.string().url().optional(),
  techStack: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

const blog = defineCollection({
  type: "content",
  schema: baseSchema.extend({ featured: z.boolean().default(false) }),
});

const media = defineCollection({
  type: "content",
  schema: baseSchema,
});

const musics = defineCollection({
  type: "content",
  schema: baseSchema,
});

const projects = defineCollection({
  type: "content",
  schema: projectSchema,
});

export const collections = { blog, media, musics, projects };
