import { createClient } from "@sanity/client";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";
import { fetchWpItem, getWpLinkIndex } from "./lib/wordpress-api.mjs";

const path = process.argv[2] || "/yo-yo-honey-singh-reveals-baldness-wig-bipolar-disorder-battle";
loadEnvFiles(repoRoot(import.meta.url));

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const post = await client.fetch(
  `*[_type == "blogPost" && legacyPath == $p][0]{
    _id, title,
    "coverUrl": coverImage.asset->url,
    "ogUrl": seo.ogImage.asset->url
  }`,
  { p: path },
);

const index = await getWpLinkIndex();
const entry = index.byPath.get(path);
const wp = entry ? await fetchWpItem("post", entry.id) : null;

console.log("Sanity:", post);
console.log("WP og_image:", wp?.yoast_head_json?.og_image?.[0]?.url);
console.log("WP featured_media:", wp?.featured_media);
