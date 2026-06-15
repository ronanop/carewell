/**
 * Import admin scraper exports into PostgreSQL (JSON preferred, PDF fallback).
 *
 * Usage:
 *   npm run scrape:import
 *   npm run scrape:import -- --dry-run
 *   npm run scrape:import -- --only=plastic-surgery-in-delhi--liposuction--arms
 *
 * Set SCRAPE_PDF_DIR to folder with scrape-*.json (and/or .pdf) from admin ZIP export.
 */
import { PrismaClient } from "@prisma/client";
import { readFileSync, existsSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";
import { parseScrapePdfText } from "./lib/scrape-pdf-parse.mjs";
import { slugFromLegacyPath, normalizeLegacyPath, legacyPathFromUrl, categoryIdFromLegacyPath } from "./lib/legacy-path.mjs";
import {
  importScrapePreview,
  resolveImportMeta,
} from "./lib/scrape-import-core.mjs";
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
  process.env.SCRAPE_PDF_DIR ||
  process.env.SCRAPE_IMPORT_DIR ||
  join(root, "db", "scrape-export");

function slugFromExportFilename(filename) {
  const base = filename.replace(/\.(json|pdf)$/i, "");
  const m = base.match(/^scrape-(.+)-\d{4}-\d{2}-\d{2}$/i);
  if (!m) return null;
  return m[1].replace(/-\d{3}$/, "");
}

async function readPdf(filePath) {
  const { PDFParse } = await import("pdf-parse");
  const buf = readFileSync(filePath);
  const parser = new PDFParse({ data: buf });
  const result = await parser.getText();
  await parser.destroy();
  return result.text;
}

function pdfParseToPreview(parsed) {
  const legacyPath = normalizeLegacyPath(
    parsed.legacyPath || legacyPathFromUrl(parsed.url),
  );
  return {
    url: parsed.url,
    legacyPath,
    title: parsed.title,
    metaDescription: parsed.metaDescription,
    h1: parsed.h1,
    bodyText: parsed.fullBody,
    fullBody: parsed.fullBody,
    bodyHtml: null,
    heroImageUrl: null,
    faqs: parsed.faqs,
  };
}

function loadLegacyMap() {
  const p = join(root, "db", "seed", "legacy-url-map.json");
  const data = JSON.parse(readFileSync(p, "utf8"));
  if (!Array.isArray(data.services)) data.services = [];
  return data;
}

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

  const files = readdirSync(IMPORT_DIR)
    .filter((f) => /\.(json|pdf)$/i.test(f))
    .sort();

  const jsonFiles = files.filter((f) => f.toLowerCase().endsWith(".json"));
  const pdfFiles = files.filter((f) => f.toLowerCase().endsWith(".pdf"));

  console.log(`Found ${jsonFiles.length} JSON + ${pdfFiles.length} PDF in ${IMPORT_DIR}`);
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
      const { legacyPath, slug } = resolveImportMeta(preview);
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

  for (const file of pdfFiles) {
    const fileSlug = slugFromExportFilename(file);
    if (!fileSlug) {
      console.warn(`  Skip (bad filename): ${file}`);
      continue;
    }

    let text;
    try {
      text = await readPdf(join(IMPORT_DIR, file));
    } catch (err) {
      if (String(err).includes("Cannot find package 'pdf-parse'")) {
        console.error("pdf-parse not installed — use JSON exports only, or: npm install pdf-parse -w @carewell/backend");
        process.exit(1);
      }
      throw err;
    }
    const parsed = parseScrapePdfText(text);
    const preview = pdfParseToPreview(parsed);
    const { legacyPath, slug } = resolveImportMeta(preview);

    if (!preview.bodyText || String(preview.bodyText).length < 80) {
      console.warn(`  Skip (thin body): ${legacyPath} [${file}]`);
      continue;
    }

    if (byLegacyPath.has(legacyPath)) {
      console.warn(`  PDF skipped (JSON exists): ${legacyPath} [${file}]`);
      continue;
    }

    byLegacyPath.set(legacyPath, { file, preview, slug });
  }

  let imported = 0;
  let skipped = 0;
  const legacyMap = loadLegacyMap();
  let mapAdded = 0;

  for (const { file, preview, slug } of byLegacyPath.values()) {
    if (ONLY_SLUG && slug !== ONLY_SLUG) continue;

    const htmlLen = preview.bodyHtml ? String(preview.bodyHtml).length : 0;
    const textLen = String(preview.bodyText ?? preview.fullBody ?? "").length;
    console.log(
      `→ ${preview.legacyPath ?? slug} (html:${htmlLen || "—"} text:${textLen}) [${file}]`,
    );

    if (!DRY_RUN) {
      const result = await importScrapePreview(prisma, preview);
      if (result.skipped) {
        skipped++;
        continue;
      }
      imported++;

      const from = result.legacyPath;
      const idx = legacyMap.services.findIndex((s) => s.from === from);
      const entry = {
        from,
        slug: result.slug,
        title: String(preview.h1 ?? preview.title ?? result.slug),
        category: categoryIdFromLegacyPath(from),
      };
      if (idx === -1) {
        legacyMap.services.push(entry);
        mapAdded++;
      } else {
        legacyMap.services[idx] = { ...legacyMap.services[idx], ...entry };
      }
    }
  }

  if (!DRY_RUN) {
    writeFileSync(join(root, "db", "seed", "legacy-url-map.json"), `${JSON.stringify(legacyMap, null, 2)}\n`, "utf8");
    console.log(`\nWrote legacy-url-map.json (${legacyMap.services.length} services, ${mapAdded} new paths)`);
    console.log(`Imported ${imported} pages, skipped ${skipped}.`);
    console.log("Run: npm run redirects:legacy && npm run cms:import-redirects");
  } else {
    console.log(`\nDry run complete — would import ${byLegacyPath.size} pages.`);
  }

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});
