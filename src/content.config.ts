import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const episodes = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/episodes",
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    duration: z.string(),
    durationSeconds: z.number().int().positive(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    audioUrl: z.string().optional(),
    audioSize: z.number().int().nonnegative().optional(),
    coverUrl: z.string().default("/cover-placeholder.svg"),
    localAudioPath: z.string().optional(),
    localCoverPath: z.string().optional(),
    episodeId: z.string(),
    flowType: z.enum(["solo", "dual_host"]).default("solo"),
    status: z
      .enum(["draft", "draft_ready", "pending_confirmation", "published"])
      .default("published"),
    sourcePath: z.string().optional(),
    references: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
        }),
      )
      .default([]),
    platforms: z
      .object({
        xiaoyuzhou: z.string().url().optional(),
        apple: z.string().url().optional(),
        spotify: z.string().url().optional(),
      })
      .optional(),
  }),
});

export const collections = { episodes };
