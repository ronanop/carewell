/**
 * Builds redirects.migration.json from data/legacy-url-map.json
 * Run: node scripts/sync-legacy-redirects.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mapPath = join(root, "data", "legacy-url-map.json");
const outPath = join(root, "redirects.migration.json");

if (!existsSync(mapPath)) {
  console.error("Missing data/legacy-url-map.json");
  process.exit(1);
}

const { services, staticRedirects = [] } = JSON.parse(readFileSync(mapPath, "utf8"));

/** @type {{ from: string; to: string; permanent: boolean }[]} */
const rows = [];
/** @param {string} fromOnly */
const seenFrom = new Set();

function addRule(fromSrc, to) {
  const toNorm = to.replace(/\/$/, "") || to;
  if (!fromSrc || !toNorm) return;
  if (seenFrom.has(fromSrc)) return;
  seenFrom.add(fromSrc);
  rows.push({ from: fromSrc, to: toNorm, permanent: true });
}

function addLegacyPath(legacyFrom, destination) {
  const from = legacyFrom.replace(/\/$/, "");
  const to = destination.replace(/\/$/, "");
  if (from === to) return;
  addRule(from, to);
  addRule(`${from}/`, to);
}

for (const s of services) {
  addLegacyPath(s.from, `/services/${s.slug}`);
}

for (const r of staticRedirects) {
  if (r.from && r.to) addLegacyPath(r.from, r.to);
}

writeFileSync(outPath, JSON.stringify(rows, null, 2), "utf8");
console.log("Wrote", rows.length, "redirect rules to redirects.migration.json");
