/**
 * Import admin scraper PDF exports into PostgreSQL service pages (full body, slug from PDF).
 *
 * Usage:
 *   node scripts/import-scrape-pdfs.mjs
 *   node scripts/import-scrape-pdfs.mjs --dry-run
 */
import { PrismaClient } from "@prisma/client";
import { readFileSync, existsSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";
import { PDFParse } from "pdf-parse";
import {
  slugFromPdfFilename,
  parseScrapePdfText,
  inferCategory,
  defaultPriceForCategory,
} from "./lib/scrape-pdf-parse.mjs";
import {
  portableTextFromBody,
  ensureFaqs,
  resetPortableKeys,
} from "./lib/sanity-portable.mjs";
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

const PDF_DIR =
  process.env.SCRAPE_PDF_DIR ||
  "C:/Users/risha/Downloads/scrape-export-2026-05-26";

const relatedByCategory = {
  "cat-hair": "svc-hair-transplant",
  "cat-face": "svc-rhinoplasty",
  "cat-body": "svc-liposuction",
  "cat-skin-vitiligo": "svc-vitiligo-treatment",
  "cat-therapies": "svc-hbot",
};

const SKIP_SLUGS = new Set(["blog"]);

function legacyFromPath(legacyPath, url) {
  if (legacyPath) {
    const p = legacyPath.startsWith("/") ? legacyPath : `/${legacyPath}`;
    return p.replace(/\/$/, "") || p;
  }
  try {
    return new URL(url).pathname.replace(/\/$/, "") || "/";
  } catch {
    return "";
  }
}

async function readPdf(filePath) {
  const buf = readFileSync(filePath);
  const parser = new PDFParse({ data: buf });
  const result = await parser.getText();
  await parser.destroy();
  return result.text;
}

function loadLegacyMap() {
  const p = join(root, "db", "seed", "legacy-url-map.json");
  const data = JSON.parse(readFileSync(p, "utf8"));
  if (!Array.isArray(data.services)) data.services = [];
  return data;
}

function buildServicePayload(parsed, slug) {
  resetPortableKeys();
  const title = parsed.h1 || parsed.title || slug.replace(/-/g, " ");
  const categoryId = inferCategory(slug, parsed.title, parsed.h1);
  const whatIsBody = portableTextFromBody(parsed.fullBody);
  const faqs = ensureFaqs(parsed.faqs, parsed.fullBody, title);
  const rel = relatedByCategory[categoryId] || "svc-hair-transplant";
  const price = defaultPriceForCategory(categoryId);

  return {
    id: `svc-${slug}`,
    slug,
    locale: "en",
    title,
    categoryId,
    tagline: `${title} — expert guidance at Care Well Medical Centre, South Delhi.`,
    whatIsBody,
    insightPoints: [
      "Content reviewed for patient education — confirm treatment plans in clinic.",
      "Individual results depend on medical history and examination findings.",
      "Book a consultation for personalised advice from Dr. Sandeep Bhasin.",
    ],
    pricingFromInr: price,
    pricingFactors: ["Clinical complexity", "Extent of treatment", "Technique and materials used"],
    pricingEmiNote:
      "EMI options may be available for eligible treatment plans — ask during your consultation.",
    valueStack: ["Doctor-led consultation", "Treatment planning", "Structured follow-up guidance"],
    candidateGood: [
      "Seeking medically supervised care in Delhi NCR",
      "Ready to follow pre- and post-care instructions",
    ],
    candidatePoor: [
      "Uncontrolled conditions without medical clearance",
      "Expecting outcomes without professional assessment",
    ],
    treatmentDropdownLabel: title,
    seoTitle: parsed.title ? `${parsed.title} | Care Well` : `${title} | Care Well Medical Centre`,
    seoDescription:
      parsed.metaDescription ||
      `${title} — information and treatment options at Care Well Medical Centre, Delhi.`,
    quickFacts: [
      { label: "Consultation", value: "Free initial assessment" },
      { label: "Location", value: "Chittaranjan Park, South Delhi" },
    ],
    howItWorksSteps: [
      { title: "Consultation", description: "Discuss your goals and medical history." },
      { title: "Assessment", description: "Clinical evaluation and suitability check." },
      { title: "Treatment plan", description: "Personalised plan with risks and expectations explained." },
      { title: "Follow-up", description: "Aftercare instructions and progress reviews as needed." },
    ],
    faqs,
    relatedServiceId: rel,
  };
}

async function upsertService(payload) {
  const { id, relatedServiceId, quickFacts, howItWorksSteps, faqs, ...data } = payload;
  await prisma.$transaction(async (tx) => {
    await tx.service.upsert({
      where: { id },
      create: { id, ...data },
      update: data,
    });
    await tx.serviceQuickFact.deleteMany({ where: { serviceId: id } });
    for (let i = 0; i < quickFacts.length; i++) {
      await tx.serviceQuickFact.create({
        data: { serviceId: id, sortOrder: i, label: quickFacts[i].label, value: quickFacts[i].value },
      });
    }
    await tx.serviceHowItWorksStep.deleteMany({ where: { serviceId: id } });
    for (let i = 0; i < howItWorksSteps.length; i++) {
      const s = howItWorksSteps[i];
      await tx.serviceHowItWorksStep.create({
        data: { serviceId: id, sortOrder: i, title: s.title, description: s.description },
      });
    }
    await tx.serviceFaq.deleteMany({ where: { serviceId: id } });
    for (let i = 0; i < faqs.length; i++) {
      const f = faqs[i];
      await tx.serviceFaq.create({
        data: { serviceId: id, sortOrder: i, question: f.question, answer: f.answer },
      });
    }
    await tx.serviceRelated.deleteMany({ where: { fromServiceId: id } });
    if (relatedServiceId) {
      await tx.serviceRelated
        .create({
          data: { fromServiceId: id, toServiceId: relatedServiceId, sortOrder: 0 },
        })
        .catch(() => {});
    }
  });
}

async function main() {
  if (!existsSync(PDF_DIR)) {
    console.error("PDF folder not found:", PDF_DIR);
    process.exit(1);
  }

  const files = readdirSync(PDF_DIR)
    .filter((f) => f.toLowerCase().endsWith(".pdf"))
    .sort();

  console.log(`Found ${files.length} PDFs in ${PDF_DIR}`);
  if (DRY_RUN) console.log("(dry run — no database writes)\n");

  const legacyMap = loadLegacyMap();
  const bySlug = new Map();

  for (const file of files) {
    const fileSlug = slugFromPdfFilename(file);
    if (!fileSlug) {
      console.warn(`  Skip (bad filename): ${file}`);
      continue;
    }

    const text = await readPdf(join(PDF_DIR, file));
    const parsed = parseScrapePdfText(text);
    const slug = (parsed.oldSlug || fileSlug).trim() || fileSlug;

    if (SKIP_SLUGS.has(slug)) {
      console.warn(`  Skip hub slug: ${slug} (${file})`);
      continue;
    }

    if (!parsed.fullBody || parsed.fullBody.length < 80) {
      console.warn(`  Skip (thin body): ${slug} (${file})`);
      continue;
    }

    const existing = bySlug.get(slug);
    if (existing && parsed.fullBody.length <= existing.parsed.fullBody.length) {
      console.warn(`  Duplicate slug (keeping longer): ${slug} — skipped ${file}`);
      continue;
    }

    bySlug.set(slug, { file, parsed, slug });
  }

  let imported = 0;
  let mapAdded = 0;

  for (const { file, parsed, slug } of bySlug.values()) {
    if (ONLY_SLUG && slug !== ONLY_SLUG) continue;
    const payload = buildServicePayload(parsed, slug);
    const from = legacyFromPath(parsed.legacyPath, parsed.url);
    const bodyChars = parsed.fullBody.length;

    console.log(`→ ${slug} (${bodyChars} chars) [${file}]`);

    if (!DRY_RUN) {
      await upsertService(payload);
      imported += 1;
    }

    if (from && from !== "/") {
      const idx = legacyMap.services.findIndex((s) => s.slug === slug);
      const entry = {
        from,
        slug,
        title: payload.title,
        category: payload.categoryId,
        price: payload.pricingFromInr,
      };
      if (idx === -1) {
        legacyMap.services.push(entry);
        if (!DRY_RUN) mapAdded += 1;
      } else {
        legacyMap.services[idx] = { ...legacyMap.services[idx], ...entry };
      }
    }
  }

  if (!DRY_RUN) {
    writeFileSync(join(root, "db", "seed", "legacy-url-map.json"), `${JSON.stringify(legacyMap, null, 2)}\n`, "utf8");
    console.log(`\nWrote legacy-url-map.json (${legacyMap.services.length} services, ${mapAdded} new paths)`);
    console.log(`Imported ${imported} service rows into PostgreSQL.`);
    console.log("Run: npm run redirects:legacy && npm run cms:import-redirects");
  } else {
    console.log(`\nDry run complete — would import ${bySlug.size} pages.`);
  }

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});
