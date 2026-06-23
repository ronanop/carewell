#!/usr/bin/env node
/** Audit Sanity blog posts: images, headings for TOC. */
import { createClient } from "@sanity/client";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";
import * as cheerio from "cheerio";
import { fetchWpItem, getWpLinkIndex } from "./lib/wordpress-api.mjs";
import { sanitizeWpContentHtml } from "./lib/wp-sanitize.mjs";

const root = repoRoot(import.meta.url);
loadEnvFiles(root);

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

function wpImageCount(html) {
  const $ = cheerio.load(`<div>${sanitizeWpContentHtml(html)}</div>`);
  return $("img").length;
}

function wpHeadingTexts(html) {
  const $ = cheerio.load(`<div>${sanitizeWpContentHtml(html)}</div>`);
  const out = [];
  $("h2, h3").each((_, el) => {
    const t = $(el).text().replace(/\s+/g, " ").trim();
    if (t) out.push({ tag: el.tagName?.toLowerCase(), text: t });
  });
  return out;
}

function sanityBodyStats(body) {
  if (!Array.isArray(body)) return { images: 0, h2: 0, h3: 0, imagesNoAlt: 0, imagesNoAsset: 0 };
  let images = 0;
  let h2 = 0;
  let h3 = 0;
  let imagesNoAlt = 0;
  let imagesNoAsset = 0;
  for (const b of body) {
    if (b._type === "image") {
      images += 1;
      if (!b.alt?.trim()) imagesNoAlt += 1;
      if (!b.asset?._ref && !b.asset?.url) imagesNoAsset += 1;
    }
    if (b._type === "block") {
      if (b.style === "h2") h2 += 1;
      if (b.style === "h3") h3 += 1;
    }
  }
  return { images, h2, h3, imagesNoAlt, imagesNoAsset };
}

const posts = await client.fetch(`*[_type == "blogPost" && defined(legacyPath)]{
  _id, title, legacyPath, body, "coverUrl": coverImage.asset->url
}`);

const index = await getWpLinkIndex();
const issues = [];

for (const post of posts) {
  const entry = index.byPath.get(post.legacyPath);
  if (!entry) continue;
  const wp = await fetchWpItem("post", entry.id);
  if (!wp) continue;

  const wpHtml = wp.content?.rendered ?? "";
  const wpImgs = wpImageCount(wpHtml);
  const stats = sanityBodyStats(post.body);
  const wpHeads = wpHeadingTexts(wpHtml);

  if (stats.images < wpImgs) {
    issues.push({
      path: post.legacyPath,
      type: "missing-images",
      wp: wpImgs,
      sanity: stats.images,
    });
  }
  if (stats.imagesNoAlt > 0) {
    issues.push({ path: post.legacyPath, type: "images-no-alt", count: stats.imagesNoAlt });
  }
  if (stats.imagesNoAsset > 0) {
    issues.push({ path: post.legacyPath, type: "images-no-asset", count: stats.imagesNoAsset });
  }
  const wpH2 = wpHeads.filter((h) => h.tag === "h2").length;
  const wpH3 = wpHeads.filter((h) => h.tag === "h3").length;
  if (stats.h2 < wpH2 && stats.h2 + stats.h3 < wpH2 + wpH3) {
    issues.push({
      path: post.legacyPath,
      type: "toc-headings",
      wpH2,
      wpH3,
      sanityH2: stats.h2,
      sanityH3: stats.h3,
    });
  }
}

console.log(`Audited ${posts.length} blog posts`);
console.log(`Issues: ${issues.length}`);
const byType = {};
for (const i of issues) {
  byType[i.type] = (byType[i.type] || 0) + 1;
}
console.log("By type:", byType);
console.log("\nSample issues (first 15):");
issues.slice(0, 15).forEach((i) => console.log(JSON.stringify(i)));
