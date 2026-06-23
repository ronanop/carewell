#!/usr/bin/env node
/** List blog posts missing coverImage in Sanity. */
import { createClient } from "@sanity/client";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";
import { fetchWpItem, getWpLinkIndex } from "./lib/wordpress-api.mjs";

loadEnvFiles(repoRoot(import.meta.url));

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const posts = await client.fetch(
  `*[_type == "blogPost" && defined(legacyPath)]{
    _id, legacyPath, title,
    "coverUrl": coverImage.asset->url,
    "ogUrl": seo.ogImage.asset->url
  }`,
);

const missing = posts.filter((p) => !p.coverUrl && !p.ogUrl);
const coverOnly = posts.filter((p) => !p.coverUrl && p.ogUrl);

console.log(`Total: ${posts.length}`);
console.log(`Missing cover + og: ${missing.length}`);
console.log(`Has og only (no coverImage): ${coverOnly.length}`);

if (missing.length) {
  console.log("\nNo image at all:");
  missing.slice(0, 20).forEach((p) => console.log(" ", p.legacyPath));
}
