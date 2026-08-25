import { defineCollection, z } from "astro:content";

const baseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  pubDate: z.date(),
  updatedDate: z.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
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
  techStack: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

const blog = defineCollection({
  type: "content",
  schema: baseSchema,
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
