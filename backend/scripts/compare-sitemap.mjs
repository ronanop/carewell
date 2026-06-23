import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { getWpLinkIndex } from "../src/lib/cms/wordpress/client.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

function norm(loc) {
  try {
    return new URL(loc).pathname.replace(/\/+$/, "") || "/";
  } catch {
    return loc;
  }
}

const xml = readFileSync("C:/Users/risha/Downloads/carewell_sitemap.xml", "utf8");
const sitemapPaths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => norm(m[1]))
  .filter((p) => p !== "/");

const seed = JSON.parse(readFileSync(join(root, "db/seed/legacy-sitemap-pages.json"), "utf8"));
const seedSet = new Set(seed.paths.filter((p) => p !== "/"));

const idx = await getWpLinkIndex();
const wpPages = new Set(idx.pagePaths);
const wpPosts = new Set(idx.postPaths);
const wpAll = new Set([...wpPages, ...wpPosts]);
const sitemapSet = new Set(sitemapPaths);

const inSitemapNotWp = sitemapPaths.filter((p) => !wpAll.has(p));
const inWpNotSitemap = [...wpAll].filter((p) => !sitemapSet.has(p));
const inSitemapNotSeed = sitemapPaths.filter((p) => !seedSet.has(p));
const inSeedNotSitemap = [...seedSet].filter((p) => !sitemapSet.has(p));

const newSiteStatic = new Set([
  "/about",
  "/about/dr-bhasin",
  "/contact",
  "/faq",
  "/gallery",
  "/blog",
  "/book-consultation",
  "/cost-estimator",
  "/skin-scan",
  "/thank-you",
]);

console.log("Sitemap URLs (excl home):", sitemapPaths.length);
console.log("Seed pages (excl home):", seedSet.size);
console.log("WordPress pages:", wpPages.size, "| posts:", wpPosts.size, "| total:", wpAll.size);
console.log("");

console.log("=== Sitemap vs WordPress ===");
console.log("In sitemap but NOT in WordPress:", inSitemapNotWp.length);
for (const p of inSitemapNotWp) console.log("  -", p);
console.log("In WordPress but NOT in sitemap:", inWpNotSitemap.length);
for (const p of inWpNotSitemap.slice(0, 25)) console.log("  +", p);
if (inWpNotSitemap.length > 25) console.log(`  ... +${inWpNotSitemap.length - 25} more (mostly blog posts)`);
console.log("");

console.log("=== Sitemap vs db/seed/legacy-sitemap-pages.json ===");
console.log("Sitemap only:", inSitemapNotSeed.length);
for (const p of inSitemapNotSeed) console.log("  -", p);
console.log("Seed only:", inSeedNotSitemap.length);
for (const p of inSeedNotSitemap) console.log("  -", p);
console.log("");

console.log("=== Sitemap static pages vs new React site ===");
for (const p of ["/about", "/about/dr-sandeep-bhasin", "/contact", "/faq"]) {
  if (!sitemapSet.has(p)) continue;
  let note = "custom React page";
  if (p === "/about/dr-sandeep-bhasin") note = "WP has this; new site uses /about/dr-bhasin";
  console.log(`  ${p} -> ${note}`);
}

const wpTreatment = sitemapPaths.filter(
  (p) => !["/about", "/about/dr-sandeep-bhasin", "/contact", "/faq"].includes(p),
);
const wpReady = wpTreatment.filter((p) => wpPages.has(p));
console.log("");
console.log("Treatment URLs in sitemap served by WordPress catch-all:", wpReady.length, "/", wpTreatment.length);
