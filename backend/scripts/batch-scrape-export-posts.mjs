#!/usr/bin/env node
/**
 * Batch-scrape legacy blog sitemap URLs and write JSON for npm run scrape:import-blog.
 *
 * Usage:
 *   node backend/scripts/batch-scrape-export-posts.mjs
 *   node backend/scripts/batch-scrape-export-posts.mjs --limit=5
 *   node backend/scripts/batch-scrape-export-posts.mjs --only=/is-eyelid-lifting-blepharoplasty-safe-procedure
 */
import { readFileSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";
import { slugFromLegacyPath, normalizeLegacyPath, legacyPathWithTrailingSlash } from "./lib/legacy-path.mjs";

const root = repoRoot(import.meta.url);
loadEnvFiles(root);

const OUT_DIR = process.env.SCRAPE_BLOG_EXPORT_DIR || join(root, "db", "scrape-export-blog");
const SITE = (process.env.SCRAPE_BASE_URL || "https://www.carewellmedicalcentre.com").replace(/\/$/, "");

const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const LIMIT = limitArg ? Number(limitArg.split("=")[1]) : 0;
const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const ONLY_PATH = onlyArg ? normalizeLegacyPath(onlyArg.split("=")[1]) : null;

function loadBlogPaths() {
  const manifestPath = join(root, "db", "seed", "legacy-sitemap-posts.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  return [...new Set((manifest.paths ?? []).map(normalizeLegacyPath))].filter(
    (p) => p !== "/" && p !== "/blog",
  );
}

async function main() {
  const { fetchAndParseScrapeUrls } = await import("../src/lib/scraper-fetch.ts");
  const { oldSlugFromUrl } = await import("../src/lib/scraper-slug.ts");

  let paths = loadBlogPaths();
  if (ONLY_PATH) paths = paths.filter((p) => p === ONLY_PATH);
  if (LIMIT > 0) paths = paths.slice(0, LIMIT);

  if (!paths.length) {
    console.error("No blog paths to scrape.");
    process.exit(1);
  }

  mkdirSync(OUT_DIR, { recursive: true });
  console.log(`Scraping ${paths.length} blog URL(s) → ${OUT_DIR}`);

  const urls = paths.map((p) => `${SITE}${legacyPathWithTrailingSlash(p)}`);
  const results = await fetchAndParseScrapeUrls(urls, {
    concurrency: 3,
    onProgress: (done, total) => process.stdout.write(`\r  Progress: ${done}/${total}`),
  });
  console.log("");

  const date = new Date().toISOString().slice(0, 10);
  let ok = 0;
  let failed = 0;

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const legacyPath = paths[i];
    const slug = slugFromLegacyPath(legacyPath);
    const filename = `scrape-${slug}-${date}.json`;

    if (!result.ok) {
      failed++;
      console.warn(`  FAIL ${legacyPath}: ${result.error}`);
      continue;
    }

    const payload = {
      ...result.preview,
      url: result.url,
      legacyPath,
      oldSlug: oldSlugFromUrl(result.url),
      contentType: "blog",
    };

    writeFileSync(join(OUT_DIR, filename), `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    ok++;
  }

  console.log(`\nDone. ${ok} JSON written, ${failed} failed.`);
  console.log(`Import with: npm run scrape:import-blog`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
