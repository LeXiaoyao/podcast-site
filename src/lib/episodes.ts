import path from "node:path";
import { getCollection, type CollectionEntry } from "astro:content";
import { CATEGORY_DESCRIPTIONS } from "./site";

export type EpisodeEntry = CollectionEntry<"episodes">;

export async function getPublishedEpisodes() {
  const entries = await getCollection("episodes", ({ data }) => data.status === "published");
  return entries.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export function getEpisodeUrl(entry: EpisodeEntry) {
  return `/episodes/${entry.data.slug}/`;
}

function getLocalMediaUrl(
  episodeId: string,
  sourcePath: string | undefined,
  filename: "audio" | "cover",
) {
  if (!episodeId || !sourcePath) {
    return undefined;
  }

  const extension = path.extname(sourcePath).toLowerCase();
  if (!extension) {
    return undefined;
  }

  return `/site-media/${episodeId}/${filename}${extension}`;
}

export function getEpisodeAudioUrl(entry: EpisodeEntry) {
  return entry.data.audioUrl ?? getLocalMediaUrl(entry.data.episodeId, entry.data.localAudioPath, "audio");
}

export function getEpisodeCoverUrl(entry: EpisodeEntry) {
  if (entry.data.coverUrl && entry.data.coverUrl !== "/cover-placeholder.svg") {
    return entry.data.coverUrl;
  }

  return (
    getLocalMediaUrl(entry.data.episodeId, entry.data.localCoverPath, "cover") ??
    entry.data.coverUrl ??
    "/cover-placeholder.svg"
  );
}

export function slugifySegment(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getCategoryUrl(category: string) {
  return `/categories/${slugifySegment(category)}/`;
}

export function formatZhDate(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function getCategorySummaries(entries: EpisodeEntry[]) {
  const counts = new Map<string, number>();

  for (const entry of entries) {
    counts.set(entry.data.category, (counts.get(entry.data.category) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, count]) => ({
      name,
      count,
      slug: slugifySegment(name),
      description:
        CATEGORY_DESCRIPTIONS[name] ?? "围绕 AI 行业、产品与组织变化的长期内容沉淀。",
    }))
    .sort((a, b) => b.count - a.count);
}
