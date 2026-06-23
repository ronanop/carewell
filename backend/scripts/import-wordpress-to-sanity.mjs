#!/usr/bin/env node
/**
 * One-time import: live WordPress → Sanity (full HTML body, SEO, FAQs, images).
 *
 * Prerequisites:
 *   - Sanity Studio schemas include optional fields on `service` and `blogPost`:
 *       legacyPath (string), wpSourceId (number), wpSourceLink (url)
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_WRITE_TOKEN
 *   - WORDPRESS_API_URL (defaults to carewellmedicalcentre.com)
 *
 * Usage:
 *   npm run cms:import-wordpress-to-sanity
 *   npm run cms:import-wordpress-to-sanity -- --dry-run
 *   npm run cms:import-wordpress-to-sanity -- --limit=10 --pages-only
 */
import { createClient } from "@sanity/client";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";
import { SanityAssetUploader } from "./lib/sanity-asset-upload.mjs";
import {
  SERVICE_CATEGORIES,
  categorySeedDoc,
  wpPageToSanityDoc,
  wpPostToSanityDoc,
} from "./lib/wp-to-sanity-doc.mjs";
import { getWpLinkIndex, fetchWpItem } from "./lib/wordpress-api.mjs";

const root = repoRoot(import.meta.url);
loadEnvFiles(root);

const DRY_RUN = process.argv.includes("--dry-run");
const PAGES_ONLY = process.argv.includes("--pages-only");
const POSTS_ONLY = process.argv.includes("--posts-only");
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const LIMIT = limitArg ? Math.max(1, Number(limitArg.split("=")[1]) || 0) : 0;

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const token = process.env.SANITY_API_WRITE_TOKEN?.trim();

if (!projectId || !token) {
  console.error(
    "Missing Sanity credentials. Set in .env.local:\n" +
      "  NEXT_PUBLIC_SANITY_PROJECT_ID=...\n" +
      "  SANITY_API_WRITE_TOKEN=... (Editor token)\n",
  );
  process.exit(1);
}

const sanity = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const uploader = DRY_RUN
  ? {
      refByUrl: new Map(),
      async uploadFromUrl() {
        return null;
      },
      async imageField() {
        return undefined;
      },
      async normalizePortableImages(blocks) {
        return blocks;
      },
    }
  : new SanityAssetUploader(sanity);

async function upsert(doc) {
  if (DRY_RUN) return;
  await sanity.createOrReplace(doc);
}

async function ensureCategories() {
  console.log("Ensuring service categories…");
  for (const cat of SERVICE_CATEGORIES) {
    const doc = categorySeedDoc(cat);
    if (DRY_RUN) {
      console.log(`  [dry-run] category ${doc._id}`);
      continue;
    }
    await sanity.createOrReplace(doc);
  }
}

async function importPages(paths) {
  const slice = LIMIT ? paths.slice(0, LIMIT) : paths;
  console.log(`Importing ${slice.length} WordPress pages → Sanity services…`);
  let ok = 0;
  let fail = 0;

  for (let i = 0; i < slice.length; i++) {
    const legacyPath = slice[i];
    const index = await getWpLinkIndex();
    const entry = index.byPath.get(legacyPath);
    if (!entry || entry.kind !== "page") {
      console.warn(`  skip (not a page): ${legacyPath}`);
      fail += 1;
      continue;
    }

    const page = await fetchWpItem("page", entry.id);
    if (!page) {
      console.warn(`  FAIL fetch: ${legacyPath}`);
      fail += 1;
      continue;
    }

    try {
      const doc = await wpPageToSanityDoc(page, legacyPath, uploader);
      await upsert(doc);
      ok += 1;
      if ((i + 1) % 10 === 0 || i === slice.length - 1) {
        console.log(`  pages ${i + 1}/${slice.length} (${ok} ok, ${fail} fail)`);
      }
    } catch (err) {
      console.warn(`  FAIL ${legacyPath}:`, err instanceof Error ? err.message : err);
      fail += 1;
    }
  }

  return { ok, fail };
}

async function importPosts(paths) {
  const slice = LIMIT ? paths.slice(0, LIMIT) : paths;
  console.log(`Importing ${slice.length} WordPress posts → Sanity blogPost…`);
  let ok = 0;
  let fail = 0;

  for (let i = 0; i < slice.length; i++) {
    const legacyPath = slice[i];
    const index = await getWpLinkIndex();
    const entry = index.byPath.get(legacyPath);
    if (!entry || entry.kind !== "post") {
      console.warn(`  skip (not a post): ${legacyPath}`);
      fail += 1;
      continue;
    }

    const post = await fetchWpItem("post", entry.id);
    if (!post) {
      console.warn(`  FAIL fetch: ${legacyPath}`);
      fail += 1;
      continue;
    }

    try {
      const doc = await wpPostToSanityDoc(post, legacyPath, uploader);
      await upsert(doc);
      ok += 1;
      if ((i + 1) % 10 === 0 || i === slice.length - 1) {
        console.log(`  posts ${i + 1}/${slice.length} (${ok} ok, ${fail} fail)`);
      }
    } catch (err) {
      console.warn(`  FAIL ${legacyPath}:`, err instanceof Error ? err.message : err);
      fail += 1;
    }
  }

  return { ok, fail };
}

async function main() {
  console.log(
    `WordPress → Sanity import${DRY_RUN ? " (dry-run)" : ""} | project=${projectId} dataset=${dataset}`,
  );

  const index = await getWpLinkIndex();
  console.log(`WordPress index: ${index.pagePaths.length} pages, ${index.postPaths.length} posts`);

  await ensureCategories();

  const results = { pages: { ok: 0, fail: 0 }, posts: { ok: 0, fail: 0 } };

  if (!POSTS_ONLY) {
    results.pages = await importPages(index.pagePaths);
  }
  if (!PAGES_ONLY) {
    results.posts = await importPosts(index.postPaths);
  }

  console.log("\nDone.");
  console.log(`  Services: ${results.pages.ok} imported, ${results.pages.fail} failed`);
  console.log(`  Blog posts: ${results.posts.ok} imported, ${results.posts.fail} failed`);
  console.log(`  Images uploaded: ${uploader.refByUrl.size}`);
  if (!DRY_RUN) {
    console.log("\nNext: set CMS_PROVIDER=sanity in .env.local and restart the dev server.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
