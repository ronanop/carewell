#!/usr/bin/env node
/**
 * Export Service rows (with whatIsBody + related blocks) to db/seed/services-content.json.
 */
import { writeFileSync } from "fs";
import { join } from "path";
import { PrismaClient } from "@prisma/client";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";

const root = repoRoot(import.meta.url);
loadEnvFiles(root);

if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

const prisma = new PrismaClient();

async function main() {
  const rows = await prisma.service.findMany({
    where: { whatIsBody: { not: null }, locale: "en" },
    include: {
      quickFacts: { orderBy: { sortOrder: "asc" } },
      howItWorksSteps: { orderBy: { sortOrder: "asc" } },
      faqs: { orderBy: { sortOrder: "asc" } },
      relatedFrom: { orderBy: { sortOrder: "asc" }, take: 1 },
    },
    orderBy: { legacyPath: "asc" },
  });

  const services = rows.filter(
    (s) => Array.isArray(s.whatIsBody) && s.whatIsBody.length > 0,
  );

  const outPath = join(root, "db", "seed", "services-content.json");
  const payload = {
    description: "Service CMS content for production import (npm run cms:import-content-seed).",
    exportedAt: new Date().toISOString(),
    services: services.map((s) => ({
      id: s.id,
      slug: s.slug,
      legacyPath: s.legacyPath,
      locale: s.locale,
      title: s.title,
      tagline: s.tagline,
      whatIsBody: s.whatIsBody,
      insightPoints: s.insightPoints,
      candidateGood: s.candidateGood,
      candidatePoor: s.candidatePoor,
      pricingFromInr: s.pricingFromInr,
      pricingFactors: s.pricingFactors,
      pricingEmiNote: s.pricingEmiNote,
      valueStack: s.valueStack,
      youtubeVideoId: s.youtubeVideoId,
      treatmentDropdownLabel: s.treatmentDropdownLabel,
      categoryId: s.categoryId,
      heroImageId: s.heroImageId,
      whatIsIllustrationId: s.whatIsIllustrationId,
      seoTitle: s.seoTitle,
      seoDescription: s.seoDescription,
      seoCanonicalUrl: s.seoCanonicalUrl,
      quickFacts: s.quickFacts.map((f) => ({ label: f.label, value: f.value })),
      howItWorksSteps: s.howItWorksSteps.map((step) => ({
        title: step.title,
        description: step.description,
      })),
      faqs: s.faqs.map((f) => ({ question: f.question, answer: f.answer })),
      relatedServiceId: s.relatedFrom[0]?.toServiceId ?? null,
    })),
  };

  writeFileSync(outPath, `${JSON.stringify(payload)}\n`, "utf8");
  console.log(`Wrote ${services.length} services to ${outPath}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
