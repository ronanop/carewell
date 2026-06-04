/**
 * Run: npm run test:scraper
 * Live: npm run test:scraper:live
 * Fetch fixture: npm run test:scraper:fixture
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function loadModules() {
  const { parseSitemapXml } = await import("../src/lib/scraper-sitemap.ts");
  const { parseHtmlPreview } = await import("../src/lib/scraper-parse.ts");
  return { parseSitemapXml, parseHtmlPreview };
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

import { repoRoot } from "./lib/repo-root.mjs";

const FIXTURE = join(repoRoot(import.meta.url), "db", "seed", "legacy-scrape-sitemap.xml");
const SAMPLE_HTML = join(__dirname, "fixtures", "scraper-sample-entry.html");

const args = process.argv.slice(2);

if (args.includes("--fetch-fixture")) {
  const url = "https://www.carewellmedicalcentre.com/cosmetic-treatments-in-delhi/botox/forehead-lines/";
  const res = await fetch(url, {
    headers: { Accept: "text/html", "User-Agent": "CareWellAdminScraper/1.0" },
  });
  const html = await res.text();
  mkdirSync(join(__dirname, "fixtures"), { recursive: true });
  writeFileSync(SAMPLE_HTML, html, "utf8");
  console.log("Wrote", SAMPLE_HTML);
  process.exit(0);
}

const { parseSitemapXml, parseHtmlPreview } = await loadModules();

const xml = readFileSync(FIXTURE, "utf8");
const sitemapResult = await parseSitemapXml(xml);
assert(sitemapResult.entries.length === 127, `expected 127 entries, got ${sitemapResult.entries.length}`);
console.log("✓ legacy sitemap:", sitemapResult.entries.length, "URLs");

const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://www.carewellmedicalcentre.com/post-sitemap.xml</loc></sitemap>
</sitemapindex>`;
const childXml = `<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc><![CDATA[https://www.carewellmedicalcentre.com/cosmetic-treatments-in-delhi/botox/]]></loc></url>
  <url><loc>https://www.carewellmedicalcentre.com/skin-treatments-in-delhi/microneedling/</loc></url>
</urlset>`;

const originalFetch = globalThis.fetch;
globalThis.fetch = async (url) => {
  if (String(url).includes("post-sitemap.xml")) {
    return new Response(childXml, { status: 200, headers: { "content-type": "application/xml" } });
  }
  return originalFetch(url);
};
const indexResult = await parseSitemapXml(indexXml);
globalThis.fetch = originalFetch;
assert(indexResult.entries.length >= 2, `index merge failed: ${indexResult.entries.length}`);
assert(indexResult.childSitemapsFetched === 1, "expected 1 child fetch");
console.log("✓ sitemap index + CDATA:", indexResult.entries.length, "URLs");

if (existsSync(SAMPLE_HTML)) {
  const html = readFileSync(SAMPLE_HTML, "utf8");
  const preview = parseHtmlPreview(
    html,
    "https://www.carewellmedicalcentre.com/cosmetic-treatments-in-delhi/botox/forehead-lines/",
  );
  assert(preview.h1, "expected h1");
  assert(preview.introParagraphs.length >= 1, "expected intro");
  assert(preview.sections.some((s) => s.paragraphs.length > 0), "expected section paragraphs");
  assert(preview.faqs.length >= 1, "expected faqs");
  assert(preview.bodyText.length > 500, "expected body text");
  console.log("✓ HTML fixture:", {
    intro: preview.introParagraphs.length,
    sections: preview.sections.length,
    sectionParas: preview.sections.reduce((n, s) => n + s.paragraphs.length, 0),
    faqs: preview.faqs.length,
    bodyLen: preview.bodyText.length,
  });
} else {
  console.log("⊘ no HTML fixture — run: npm run test:scraper:fixture");
}

if (args.includes("--live")) {
  const { fetchAndParseScrapeUrl } = await import("../backend/src/lib/scraper-fetch.ts");
  const url = "https://www.carewellmedicalcentre.com/cosmetic-treatments-in-delhi/botox/forehead-lines/";
  const result = await fetchAndParseScrapeUrl(url);
  assert(result.ok, result.ok ? "" : result.error);
  const p = result.preview;
  assert(p.faqs.length >= 5, `expected FAQs, got ${p.faqs.length}`);
  assert(
    p.sections.filter((s) => s.paragraphs.length > 0).length >= 2,
    "expected multiple sections with text",
  );
  assert(p.bodyText.length > 1000, `body too short: ${p.bodyText.length}`);
  assert(
    !p.bodyText.endsWith("…"),
    "bodyText must not be truncated (no length cap)",
  );
  console.log("✓ live scrape:", {
    faqs: p.faqs.length,
    sectionsWithText: p.sections.filter((s) => s.paragraphs.length > 0).length,
    bodyLen: p.bodyText.length,
  });
}

console.log("\nAll scraper tests passed.");
