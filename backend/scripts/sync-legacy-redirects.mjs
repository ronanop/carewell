/**
 * Builds db/redirects.migration.json from db/seed/legacy-url-map.json
 * and upserts rules into PostgreSQL when DATABASE_URL is set.
 * Run: node scripts/sync-legacy-redirects.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";

const root = repoRoot(import.meta.url);
loadEnvFiles(root);

const mapPath = join(root, "db", "seed", "legacy-url-map.json");
const outPath = join(root, "db", "redirects.migration.json");

async function main() {
  if (!existsSync(mapPath)) {
    console.error("Missing db/seed/legacy-url-map.json");
    process.exit(1);
  }

  const { services, staticRedirects = [] } = JSON.parse(readFileSync(mapPath, "utf8"));

  const rows = [];
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

  /** SEO URLs live at legacy paths; /services/{slug} redirects to legacy. */
  for (const s of services) {
    if (!s.from || !s.slug) continue;
    addLegacyPath(`/services/${s.slug}`, s.from);
  }

  for (const r of staticRedirects) {
    if (r.from && r.to) addLegacyPath(r.from, r.to);
  }

  writeFileSync(outPath, JSON.stringify(rows, null, 2), "utf8");
  console.log("Wrote", rows.length, "redirect rules to redirects.migration.json");

  if (process.env.DATABASE_URL) {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();
    let db = 0;
    for (const r of rows) {
      await prisma.redirect.upsert({
        where: { fromPath: r.from },
        create: {
          fromPath: r.from,
          toPath: r.to,
          statusCode: r.permanent === false ? 302 : 301,
        },
        update: { toPath: r.to, statusCode: r.permanent === false ? 302 : 301 },
      });
      db += 1;
    }
    await prisma.$disconnect();
    console.log("Upserted", db, "redirect rows into PostgreSQL");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
