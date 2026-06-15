#!/usr/bin/env node
/**
 * Import db/seed/services-content.json into PostgreSQL (production deploy).
 */
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { PrismaClient } from "@prisma/client";
import { upsertImportedService } from "./lib/scrape-import-core.mjs";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";

const root = repoRoot(import.meta.url);
loadEnvFiles(root);

const DRY_RUN = process.argv.includes("--dry-run");

if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

const seedPath = join(root, "db", "seed", "services-content.json");
if (!existsSync(seedPath)) {
  console.error("Missing", seedPath, "— run: npm run cms:export-service-seed");
  process.exit(1);
}

const { services = [] } = JSON.parse(readFileSync(seedPath, "utf8"));
const prisma = new PrismaClient();

async function main() {
  console.log(`Importing ${services.length} services from seed…`);
  if (DRY_RUN) console.log("(dry run)\n");

  let imported = 0;
  let skipped = 0;

  for (const row of services) {
    if (
      !row.id ||
      !row.slug ||
      !row.legacyPath ||
      !Array.isArray(row.whatIsBody) ||
      !row.whatIsBody.length
    ) {
      skipped++;
      continue;
    }

    const payload = {
      id: row.id,
      slug: row.slug,
      legacyPath: row.legacyPath,
      locale: row.locale ?? "en",
      title: row.title,
      tagline: row.tagline ?? null,
      whatIsBody: row.whatIsBody,
      heroImageId: row.heroImageId ?? null,
      whatIsIllustrationId: row.whatIsIllustrationId ?? null,
      categoryId: row.categoryId ?? null,
      insightPoints: row.insightPoints ?? [],
      candidateGood: row.candidateGood ?? [],
      candidatePoor: row.candidatePoor ?? [],
      pricingFromInr: row.pricingFromInr ?? null,
      pricingFactors: row.pricingFactors ?? [],
      pricingEmiNote: row.pricingEmiNote ?? null,
      valueStack: row.valueStack ?? [],
      youtubeVideoId: row.youtubeVideoId ?? null,
      treatmentDropdownLabel: row.treatmentDropdownLabel ?? row.title,
      seoTitle: row.seoTitle ?? null,
      seoDescription: row.seoDescription ?? null,
      seoCanonicalUrl: row.seoCanonicalUrl ?? null,
      quickFacts: row.quickFacts ?? [],
      howItWorksSteps: row.howItWorksSteps ?? [],
      faqs: row.faqs ?? [],
      relatedServiceId: row.relatedServiceId ?? null,
    };

    if (!DRY_RUN) await upsertImportedService(prisma, payload);
    imported++;
  }

  console.log(`Done. Imported ${imported}, skipped ${skipped}.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
