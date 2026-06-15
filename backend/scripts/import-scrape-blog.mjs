/**
 * Import scraped blog JSON exports into PostgreSQL BlogPost rows.
 *
 * Usage:
 *   npm run scrape:import-blog
 *   npm run scrape:import-blog -- --dry-run
 *   npm run scrape:import-blog -- --only=is-eyelid-lifting-blepharoplasty-safe-procedure
 */
import { PrismaClient } from "@prisma/client";
import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";
import {
  importBlogScrapePreview,
  resolveBlogImportMeta,
} from "./lib/blog-import-core.mjs";
import { isCloudinaryEnabled } from "./lib/wp-image-import.mjs";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";

const root = repoRoot(import.meta.url);
loadEnvFiles(root);

const DRY_RUN = process.argv.includes("--dry-run");
const ONLY_SLUG = process.argv.find((a) => a.startsWith("--only="))?.split("=")[1];

if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL in .env.local");
  process.exit(1);
}

const prisma = new PrismaClient();

const IMPORT_DIR =
  process.env.SCRAPE_BLOG_IMPORT_DIR ||
  process.env.SCRAPE_BLOG_EXPORT_DIR ||
  join(root, "db", "scrape-export-blog");

function previewRichness(preview) {
  const htmlLen = preview.bodyHtml ? String(preview.bodyHtml).length : 0;
  const textLen = String(preview.bodyText ?? preview.fullBody ?? "").length;
  return htmlLen > 40 ? htmlLen + 100_000 : textLen;
}

async function main() {
  if (!existsSync(IMPORT_DIR)) {
    console.error("Import folder not found:", IMPORT_DIR);
    process.exit(1);
  }

  const jsonFiles = readdirSync(IMPORT_DIR)
    .filter((f) => f.toLowerCase().endsWith(".json"))
    .sort();

  console.log(`Found ${jsonFiles.length} JSON in ${IMPORT_DIR}`);
  if (isCloudinaryEnabled()) {
    console.log("Cloudinary: enabled — images will be uploaded to CDN");
  } else {
    console.log("Cloudinary: not configured — images will hotlink WordPress URLs");
  }
  if (DRY_RUN) console.log("(dry run — no database writes)\n");

  /** @type {Map<string, { file: string, preview: Record<string, unknown>, slug: string }>} */
  const byLegacyPath = new Map();

  for (const file of jsonFiles) {
    try {
      const preview = JSON.parse(readFileSync(join(IMPORT_DIR, file), "utf8"));
      const { legacyPath, slug } = resolveBlogImportMeta(preview);
      if (!preview.bodyHtml && !preview.bodyText && !preview.fullBody) {
        console.warn(`  Skip (no body): ${legacyPath} [${file}]`);
        continue;
      }
      const existing = byLegacyPath.get(legacyPath);
      if (existing && previewRichness(preview) <= previewRichness(existing.preview)) {
        console.warn(`  Duplicate (keeping richer): ${legacyPath} — skipped ${file}`);
        continue;
      }
      byLegacyPath.set(legacyPath, { file, preview, slug });
    } catch (err) {
      console.warn(`  Skip (bad JSON): ${file}`, err instanceof Error ? err.message : err);
    }
  }

  let imported = 0;
  let skipped = 0;

  for (const { file, preview, slug } of byLegacyPath.values()) {
    if (ONLY_SLUG && slug !== ONLY_SLUG) continue;

    const htmlLen = preview.bodyHtml ? String(preview.bodyHtml).length : 0;
    const textLen = String(preview.bodyText ?? preview.fullBody ?? "").length;
    console.log(
      `→ ${preview.legacyPath ?? slug} (html:${htmlLen || "—"} text:${textLen}) [${file}]`,
    );

    if (!DRY_RUN) {
      const result = await importBlogScrapePreview(prisma, preview);
      if (result.skipped) {
        skipped++;
        continue;
      }
      imported++;
    }
  }

  if (!DRY_RUN) {
    console.log(`\nImported ${imported} blog posts, skipped ${skipped}.`);
  } else {
    console.log(`\nDry run complete — would import ${byLegacyPath.size} blog posts.`);
  }

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});
