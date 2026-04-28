import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://Lexiaoyao.github.io",
  base:"/podcast-site",
  integrations: [mdx(), sitemap()],
});
