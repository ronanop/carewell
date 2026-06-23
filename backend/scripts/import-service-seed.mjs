#!/usr/bin/env node
/**
 * Import db/seed/services-content.json into PostgreSQL (production deploy).
 * Uses direct upserts (no long transactions) for reliable remote DB imports.
 */
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { PrismaClient } from "@prisma/client";
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

async function upsertServiceRow(row) {
  const {
    id,
    relatedServiceId,
    quickFacts = [],
    howItWorksSteps = [],
    faqs = [],
    ...data
  } = row;

  await prisma.service.upsert({
    where: { id },
    create: { id, ...data },
    update: data,
  });

  await prisma.serviceQuickFact.deleteMany({ where: { serviceId: id } });
  if (quickFacts.length) {
    await prisma.serviceQuickFact.createMany({
      data: quickFacts.map((f, i) => ({
        serviceId: id,
        sortOrder: i,
        label: f.label,
        value: f.value,
      })),
    });
  }

  await prisma.serviceHowItWorksStep.deleteMany({ where: { serviceId: id } });
  if (howItWorksSteps.length) {
    await prisma.serviceHowItWorksStep.createMany({
      data: howItWorksSteps.map((s, i) => ({
        serviceId: id,
        sortOrder: i,
        title: s.title,
        description: s.description,
      })),
    });
  }

  await prisma.serviceFaq.deleteMany({ where: { serviceId: id } });
  if (faqs.length) {
    await prisma.serviceFaq.createMany({
      data: faqs.map((f, i) => ({
        serviceId: id,
        sortOrder: i,
        question: f.question,
        answer: f.answer || "Discuss your case with our doctors during consultation.",
      })),
    });
  }

  await prisma.serviceRelated.deleteMany({ where: { fromServiceId: id } });
  if (relatedServiceId) {
    const relatedExists = await prisma.service.findUnique({
      where: { id: relatedServiceId },
      select: { id: true },
    });
    if (relatedExists) {
      await prisma.serviceRelated.create({
        data: { fromServiceId: id, toServiceId: relatedServiceId, sortOrder: 0 },
      });
    }
  }

  const from = `/services/${row.slug}`;
  const to = `${row.legacyPath}/`;
  await prisma.redirect.upsert({
    where: { fromPath: from },
    create: { fromPath: from, toPath: to, statusCode: 301 },
    update: { toPath: to, statusCode: 301 },
  });
}

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

    if (!DRY_RUN) {
      await upsertServiceRow(payload);
      if (imported % 10 === 0) {
        console.log(`  …${imported + 1}/${services.length}`);
      }
    }
    imported++;
  }

  console.log(`Done. Imported ${imported}, skipped ${skipped}.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
