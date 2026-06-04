#!/usr/bin/env node
/**
 * Replace Service rows with legacy sitemap paths (no /services/ URLs).
 * Run: npm run cms:sync-legacy-sitemap
 */
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { PrismaClient } from "@prisma/client";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";

const root = repoRoot(import.meta.url);
loadEnvFiles(root);

function normalizeLegacyPath(path) {
  let p = String(path).trim();
  if (!p.startsWith("/")) p = `/${p}`;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

function slugFromLegacyPath(legacyPath) {
  const p = normalizeLegacyPath(legacyPath);
  if (p === "/") return "home";
  return p
    .slice(1)
    .replace(/\//g, "--")
    .replace(/[^a-z0-9-]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 180);
}

function titleFromLegacyPath(legacyPath) {
  const p = normalizeLegacyPath(legacyPath);
  if (p === "/") return "Home";
  const last = p.split("/").filter(Boolean).pop() ?? "page";
  return last
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function categoryIdFromLegacyPath(legacyPath) {
  const seg = normalizeLegacyPath(legacyPath).split("/").filter(Boolean)[0] ?? "";
  const map = {
    "cosmetic-treatments-in-delhi": "cat-face",
    "skin-treatments-in-delhi": "cat-skin-vitiligo",
    "plastic-surgery-in-delhi": "cat-body",
    "hair-transplant-in-delhi": "cat-hair",
    "hair-loss-treatment-in-delhi": "cat-hair",
    "body-contouring-in-delhi": "cat-body",
    "iv-therapy-in-delhi": "cat-therapies",
    "holistic-wellness-treatments-in-delhi": "cat-therapies",
    "hyperbaric-oxygen-therapy-in-delhi": "cat-therapies",
    "intimate-surgery-in-delhi": "cat-body",
    "urology-in-delhi": "cat-body",
    "proctology-treatments-in-delhi": "cat-body",
    "non-surgical-weight-loss-treatment-in-delhi": "cat-body",
    "fatty-liver-treatment-in-delhi": "cat-therapies",
  };
  return map[seg] ?? null;
}

const SKIP_DB_PATHS = new Set(["/"]);

async function main() {
  const manifestPath = join(root, "db", "seed", "legacy-sitemap-pages.json");
  const mapPath = join(root, "db", "seed", "legacy-url-map.json");
  if (!existsSync(manifestPath)) {
    console.error("Missing", manifestPath);
    process.exit(1);
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const paths = [...new Set((manifest.paths ?? []).map(normalizeLegacyPath))];

  const titleByFrom = new Map();
  if (existsSync(mapPath)) {
    const legacyMap = JSON.parse(readFileSync(mapPath, "utf8"));
    for (const s of legacyMap.services ?? []) {
      if (s.from) titleByFrom.set(normalizeLegacyPath(s.from), s);
    }
  }

  const prisma = new PrismaClient();

  console.log("Removing existing service pages…");
  await prisma.service.deleteMany({});

  let created = 0;
  let skipped = 0;

  for (const legacyPath of paths) {
    if (SKIP_DB_PATHS.has(legacyPath)) {
      skipped++;
      continue;
    }

    const hint = titleByFrom.get(legacyPath);
    const slug = slugFromLegacyPath(legacyPath);
    const title = hint?.title?.trim() || titleFromLegacyPath(legacyPath);
    const categoryId = hint?.category ?? categoryIdFromLegacyPath(legacyPath);
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "").replace(/\/$/, "");
    const canonical = siteUrl ? `${siteUrl}${legacyPath}/` : null;

    await prisma.service.create({
      data: {
        id: `svc-${slug}`,
        slug,
        legacyPath,
        locale: "en",
        title,
        categoryId,
        pricingFromInr: hint?.price ?? null,
        seoTitle: `${title} in Delhi | Care Well Medical Centre`,
        seoCanonicalUrl: canonical,
      },
    });
    created++;
  }

  await prisma.redirect.upsert({
    where: { fromPath: "/about/dr-sandeep-bhasin" },
    create: { fromPath: "/about/dr-sandeep-bhasin", toPath: "/about/dr-bhasin", statusCode: 301 },
    update: { toPath: "/about/dr-bhasin", statusCode: 301 },
  });

  const services = await prisma.service.findMany({
    where: { legacyPath: { not: null } },
    select: { slug: true, legacyPath: true },
  });
  for (const s of services) {
    const from = `/services/${s.slug}`;
    await prisma.redirect.upsert({
      where: { fromPath: from },
      create: { fromPath: from, toPath: `${s.legacyPath}/`, statusCode: 301 },
      update: { toPath: `${s.legacyPath}/`, statusCode: 301 },
    });
  }

  console.log(`Done. Created ${created} service pages, skipped ${skipped} (homepage).`);
  console.log(`Redirects: /services/* → legacy paths, /about/dr-sandeep-bhasin → /about/dr-bhasin`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
