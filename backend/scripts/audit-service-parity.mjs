#!/usr/bin/env node
/**
 * Compare WordPress pages vs Sanity `service` documents (non-blog, non-home).
 * Usage: node ./backend/scripts/audit-service-parity.mjs [--sample=20] [--verbose]
 */
import { createClient } from "@sanity/client";
import * as cheerio from "cheerio";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";
import { sanitizeWpContentHtml } from "./lib/wp-sanitize.mjs";
import { fetchWpItem, getWpLinkIndex } from "./lib/wordpress-api.mjs";

const root = repoRoot(import.meta.url);
loadEnvFiles(root);

const SAMPLE = Number(process.argv.find((a) => a.startsWith("--sample="))?.split("=")[1] || 0);
const VERBOSE = process.argv.includes("--verbose");
const DELAY_MS = 80;

const STATIC_EXCLUDE = new Set([
  "/",
  "/about",
  "/about/dr-bhasin",
  "/about/dr-sandeep-bhasin",
  "/contact",
  "/faq",
  "/gallery",
  "/blog",
  "/book-consultation",
  "/cost-estimator",
  "/skin-scan",
  "/thank-you",
]);

function decodeHtml(text) {
  return String(text ?? "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function wpFaqPlainText(yoast) {
  const graph = yoast?.schema?.["@graph"];
  if (!Array.isArray(graph)) return "";
  return graph
    .filter((node) => {
      const t = node?.["@type"];
      return t === "Question" || (Array.isArray(t) && t.includes("Question"));
    })
    .map((node) => `${node.name ?? ""} ${node.acceptedAnswer?.text ?? ""}`)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function wpPlainText(html) {
  const sanitized = sanitizeWpContentHtml(html ?? "");
  const $ = cheerio.load(`<div>${sanitized}</div>`);
  return decodeHtml($.text().replace(/\s+/g, " ").trim());
}

function portablePlainText(blocks) {
  if (!Array.isArray(blocks)) return "";
  const parts = [];
  for (const block of blocks) {
    if (block._type === "block" && Array.isArray(block.children)) {
      parts.push(block.children.map((c) => c.text ?? "").join(""));
    }
  }
  return parts.join(" ").replace(/\s+/g, " ").trim();
}

function faqPlainText(faqs) {
  if (!Array.isArray(faqs)) return "";
  return faqs
    .map((f) => `${f.question ?? ""} ${f.answer ?? ""}`)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function sanityFullText(doc) {
  return `${portablePlainText(doc.whatIsBody)} ${faqPlainText(doc.faq)}`.replace(/\s+/g, " ").trim();
}

function countPortableImages(blocks) {
  if (!Array.isArray(blocks)) return 0;
  return blocks.filter((b) => b._type === "image").length;
}

function countWpImages(html) {
  const sanitized = sanitizeWpContentHtml(html ?? "");
  const $ = cheerio.load(`<div>${sanitized}</div>`);
  return $("img").length;
}

function normTitle(t) {
  return decodeHtml(t).toLowerCase().replace(/\s+/g, " ");
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Collect static React route paths from frontend app directory. */
function collectStaticAppPaths() {
  const appDir = join(root, "frontend/src/app/(site)");
  const paths = new Set();

  function walk(dir, prefix) {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (!statSync(full).isDirectory()) continue;
      if (name.startsWith("(") || name === "api") continue;

      if (name === "[...path]" || name.startsWith("[")) continue;

      const segment = name;
      const nextPrefix = prefix ? `${prefix}/${segment}` : `/${segment}`;
      const pageFile = join(full, "page.tsx");
      if (statSync(join(full)).isDirectory()) {
        try {
          if (statSync(pageFile).isFile()) paths.add(nextPrefix);
        } catch {
          /* no page */
        }
        walk(full, nextPrefix);
      }
    }
  }

  walk(appDir, "");
  return paths;
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  process.exit(1);
}

const sanity = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

console.log("Fetching WordPress page index…");
const wpIndex = await getWpLinkIndex();
const wpPagePaths = wpIndex.pagePaths.filter((p) => p !== "/");

console.log("Fetching Sanity services…");
const sanityServices = await sanity.fetch(
  `*[_type == "service" && defined(legacyPath) && locale != "hi"]{
    _id, title, legacyPath, wpSourceId,
    "heroUrl": heroImage.asset->url,
    "bodyLen": length(whatIsBody),
    "faqCount": count(faq),
    "seoTitle": seo.title,
    whatIsBody,
    faq
  }`,
);

const sanityByPath = new Map(sanityServices.map((s) => [s.legacyPath, s]));
const wpPathSet = new Set(wpPagePaths);
const sanityPathSet = new Set(sanityServices.map((s) => s.legacyPath));

const wpOnly = wpPagePaths.filter((p) => !sanityPathSet.has(p));
const sanityOnly = [...sanityPathSet].filter((p) => !wpPathSet.has(p));
const both = wpPagePaths.filter((p) => sanityPathSet.has(p));

const staticPaths = collectStaticAppPaths();
const staticTreatmentPaths = [...staticPaths].filter(
  (p) => !STATIC_EXCLUDE.has(p) && !p.startsWith("/blog") && !p.startsWith("/treatments") && !p.startsWith("/locations") && !p.startsWith("/pages") && !p.startsWith("/services") && !p.startsWith("/hi"),
);

const otherSanity = await sanity.fetch(`{
  "categories": count(*[_type == "serviceCategory"]),
  "hyperlocal": count(*[_type == "hyperlocalPage"]),
  "gallery": count(*[_type == "galleryItem"]),
  "testimonials": count(*[_type == "testimonial"]),
  "redirects": count(*[_type == "redirect"]),
  "settings": count(*[_type == "siteSettings"])
}`);

console.log("\n=== COVERAGE (WordPress pages → Sanity service) ===");
console.log(`WordPress pages:     ${wpPagePaths.length}`);
console.log(`Sanity services:     ${sanityServices.length} (en, with legacyPath)`);
console.log(`Matched paths:       ${both.length}`);
console.log(`WP only (missing):   ${wpOnly.length}`);
console.log(`Sanity only (extra): ${sanityOnly.length}`);
console.log(`Other Sanity types:  categories=${otherSanity.categories}, hyperlocal=${otherSanity.hyperlocal}, gallery=${otherSanity.gallery}, testimonials=${otherSanity.testimonials}`);

if (wpOnly.length) {
  console.log("\n--- Missing from Sanity (WP pages) ---");
  for (const p of wpOnly.slice(0, 30)) console.log("  ", p);
  if (wpOnly.length > 30) console.log(`  … +${wpOnly.length - 30} more`);
}

if (sanityOnly.length) {
  console.log("\n--- In Sanity but not WP pages ---");
  for (const p of sanityOnly.slice(0, 15)) console.log("  ", p);
  if (sanityOnly.length > 15) console.log(`  … +${sanityOnly.length - 15} more`);
}

console.log("\n=== STATIC REACT ROUTES (override CMS catch-all) ===");
console.log(`Dedicated page.tsx routes: ${staticTreatmentPaths.length}`);
console.log("(These may show hardcoded React content instead of Sanity even when imported.)");
const staticAlsoInSanity = staticTreatmentPaths.filter((p) => sanityPathSet.has(p));
console.log(`Static routes also in Sanity: ${staticAlsoInSanity.length}`);
if (VERBOSE) {
  for (const p of staticAlsoInSanity.sort()) console.log("  ", p);
}

console.log("\n=== CONTENT PARITY (WP HTML vs Sanity whatIsBody) ===");
const toCheck = SAMPLE > 0 ? both.slice(0, SAMPLE) : both;
console.log(`Checking ${toCheck.length} matched pages…`);

const issues = {
  titleMismatch: [],
  lowTextRatio: [],
  imageGap: [],
  missingBody: [],
  missingHero: [],
  missingFaq: [],
  wpFetchFail: [],
};

let okCount = 0;

for (let i = 0; i < toCheck.length; i++) {
  const path = toCheck[i];
  const sanityDoc = sanityByPath.get(path);
  const entry = wpIndex.byPath.get(path);
  if (!entry || entry.kind !== "page") continue;

  const wp = await fetchWpItem("page", entry.id);
  await sleep(DELAY_MS);

  if (!wp) {
    issues.wpFetchFail.push(path);
    continue;
  }

  const wpTitle = normTitle(wp.title?.rendered);
  const sanityTitle = normTitle(sanityDoc.title);
  const wpBodyText = wpPlainText(wp.content?.rendered);
  const wpFaqText = wpFaqPlainText(wp.yoast_head_json);
  const wpText = wpFaqText ? `${wpBodyText} ${wpFaqText}`.replace(/\s+/g, " ").trim() : wpBodyText;
  const sanityText = sanityFullText(sanityDoc);
  const wpImages = countWpImages(wp.content?.rendered);
  const sanityImages = countPortableImages(sanityDoc.whatIsBody);
  const wpFaqs = (wp.yoast_head_json?.schema?.["@graph"] ?? []).filter(
    (n) => n?.["@type"] === "Question" || (Array.isArray(n?.["@type"]) && n["@type"].includes("Question")),
  ).length;

  const bodyBlocks = sanityDoc.bodyLen ?? 0;
  const hasBody = bodyBlocks > 0 && sanityText.length > 100;

  if (wpTitle !== sanityTitle) issues.titleMismatch.push({ path, wp: wpTitle.slice(0, 60), sanity: sanityTitle.slice(0, 60) });
  if (!hasBody) issues.missingBody.push(path);
  if (wpText.length > 200 && sanityText.length / wpText.length < 0.85) {
    issues.lowTextRatio.push({ path, wpLen: wpText.length, sanityLen: sanityText.length, ratio: (sanityText.length / wpText.length).toFixed(2) });
  }
  if (wpImages > 0 && sanityImages < wpImages * 0.5) {
    issues.imageGap.push({ path, wpImages, sanityImages });
  }
  if (!sanityDoc.heroUrl && wp.yoast_head_json?.og_image?.[0]?.url) {
    issues.missingHero.push(path);
  }
  if (wpFaqs >= 3 && (sanityDoc.faqCount ?? 0) < wpFaqs * 0.5) {
    issues.missingFaq.push({ path, wpFaqs, sanityFaqs: sanityDoc.faqCount ?? 0 });
  }

  const pageOk =
    wpTitle === sanityTitle &&
    hasBody &&
    !(wpText.length > 200 && sanityText.length / wpText.length < 0.85);

  if (pageOk) okCount += 1;

  if (VERBOSE && !pageOk) {
    console.log(`\n  ${path}`);
    console.log(`    title match: ${wpTitle === sanityTitle}`);
    console.log(`    text: WP ${wpText.length} / Sanity ${sanityText.length}`);
    console.log(`    images: WP ${wpImages} / Sanity ${sanityImages}`);
    console.log(`    faqs: WP ${wpFaqs} / Sanity ${sanityDoc.faqCount ?? 0}`);
  }

  if ((i + 1) % 25 === 0) process.stdout.write(`  … ${i + 1}/${toCheck.length}\n`);
}

console.log(`\nPassed basic parity: ${okCount}/${toCheck.length}`);

function printIssue(label, arr, limit = 12) {
  if (!arr.length) return;
  console.log(`\n--- ${label} (${arr.length}) ---`);
  for (const item of arr.slice(0, limit)) {
    console.log("  ", typeof item === "string" ? item : JSON.stringify(item));
  }
  if (arr.length > limit) console.log(`  … +${arr.length - limit} more`);
}

printIssue("Title mismatch", issues.titleMismatch);
printIssue("Missing/short body in Sanity", issues.missingBody);
printIssue("Text <85% of WordPress (import gap)", issues.lowTextRatio);
printIssue("Images <50% of WP", issues.imageGap);
printIssue("Missing hero when WP has og_image", issues.missingHero);
printIssue("FAQ count gap", issues.missingFaq);
printIssue("WP fetch failed", issues.wpFetchFail);

console.log("\n=== SUMMARY ===");
const coveragePct = ((both.length / wpPagePaths.length) * 100).toFixed(1);
console.log(`URL coverage: ${both.length}/${wpPagePaths.length} (${coveragePct}%)`);
if (wpOnly.length === 0 && okCount === toCheck.length) {
  console.log("All WP pages are in Sanity and passed content checks.");
} else if (wpOnly.length === 0) {
  console.log("All WP pages exist in Sanity; some have content gaps (see above).");
} else {
  console.log(`${wpOnly.length} WP pages still need importing to Sanity.`);
}
