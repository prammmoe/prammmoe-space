import { defineCollection, z } from "astro:content";

const baseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  pubDate: z.date(),
  updatedDate: z.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
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

export const collections = { blog, media, musics };
