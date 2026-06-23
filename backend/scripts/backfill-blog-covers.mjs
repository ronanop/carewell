#!/usr/bin/env node
/** Backfill missing blog coverImage + seo.ogImage from WordPress Yoast. */
import { createClient } from "@sanity/client";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";
import { SanityAssetUploader } from "./lib/sanity-asset-upload.mjs";
import { fetchWpItem, getWpLinkIndex } from "./lib/wordpress-api.mjs";

function wpApiBase() {
  const raw =
    process.env.WORDPRESS_API_URL?.trim() ||
    process.env.SCRAPER_BASE_URL?.trim() ||
    "https://www.carewellmedicalcentre.com";
  return `${raw.replace(/\/$/, "")}/wp-json/wp/v2`;
}

async function fetchWpFeaturedUrl(featuredMediaId) {
  if (!featuredMediaId) return null;
  const url = `${wpApiBase()}/media/${featuredMediaId}?_fields=source_url`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) return null;
  const data = await res.json();
  return typeof data?.source_url === "string" ? data.source_url : null;
}

loadEnvFiles(repoRoot(import.meta.url));

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const uploader = new SanityAssetUploader(client);
const index = await getWpLinkIndex();

const posts = await client.fetch(
  `*[_type == "blogPost" && defined(legacyPath)]{
    _id, legacyPath, title,
    "coverUrl": coverImage.asset->url,
    "ogUrl": seo.ogImage.asset->url
  }`,
);

const missing = posts.filter((p) => !p.coverUrl && !p.ogUrl);
console.log(`Backfilling ${missing.length} posts without cover…`);

let ok = 0;
for (const row of missing) {
  const entry = index.byPath.get(row.legacyPath);
  if (!entry) {
    console.warn("  skip:", row.legacyPath);
    continue;
  }
  const wp = await fetchWpItem("post", entry.id);
  const ogUrl = wp?.yoast_head_json?.og_image?.[0]?.url;
  const imageUrl = ogUrl ?? (await fetchWpFeaturedUrl(wp?.featured_media));
  if (!imageUrl) {
    console.warn("  no WP image:", row.legacyPath);
    continue;
  }

  const coverImage = await uploader.imageField(imageUrl, row.title ?? "Blog cover");
  if (!coverImage) {
    console.warn("  upload fail:", row.legacyPath);
    continue;
  }

  await client.patch(row._id).set({ coverImage }).commit();

  ok += 1;
  console.log("  ok:", row.legacyPath);
}

console.log(`Done: ${ok}/${missing.length}`);
