import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getEpisodeAudioUrl, getEpisodeCoverUrl, getEpisodeUrl, getPublishedEpisodes } from "../lib/episodes";
import { SITE } from "../lib/site";

export async function GET(context: APIContext) {
  const episodes = await getPublishedEpisodes();

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    xmlns: {
      itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd",
      podcast: "https://podcastindex.org/namespace/1.0",
    },
    customData: `
      <language>zh-cn</language>
      <itunes:author>${SITE.title}</itunes:author>
      <itunes:summary>${SITE.description}</itunes:summary>
      <itunes:type>episodic</itunes:type>
      <itunes:image href="${new URL("/cover-placeholder.svg", context.site ?? SITE.url).toString()}" />
    `,
    items: episodes.map((episode) => {
      const audioUrl = getEpisodeAudioUrl(episode);
      const coverUrl = getEpisodeCoverUrl(episode);

      return {
        title: episode.data.title,
        description: episode.data.description,
        pubDate: episode.data.pubDate,
        link: getEpisodeUrl(episode),
        categories: [episode.data.category, ...episode.data.tags],
        enclosure: audioUrl
          ? {
              url: new URL(audioUrl, context.site ?? SITE.url).toString(),
              length: episode.data.audioSize ?? 0,
              type: "audio/mpeg",
            }
          : undefined,
        customData: `
          <itunes:duration>${episode.data.duration}</itunes:duration>
          <itunes:image href="${new URL(coverUrl, context.site ?? SITE.url).toString()}" />
        `,
      };
    }),
  });
}
