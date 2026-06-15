#!/usr/bin/env node
/**
 * Remove wrong redirects (legacy blog URL → /services/{slug}) and Service rows
 * that were created when blog posts were misclassified as services.
 *
 * Run on production after deploy: npm run redirects:fix-blogs
 */
import { PrismaClient } from "@prisma/client";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { loadLegacyBlogPaths } from "./lib/legacy-blog-paths.mjs";
import { repoRoot } from "./lib/repo-root.mjs";

const root = repoRoot(import.meta.url);
loadEnvFiles(root);

const DRY_RUN = process.argv.includes("--dry-run");

if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

function normalizePath(path) {
  let p = String(path).trim();
  if (!p.startsWith("/")) p = `/${p}`;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

async function main() {
  const blogPaths = loadLegacyBlogPaths(root);
  const prisma = new PrismaClient();

  const redirects = await prisma.redirect.findMany({
    select: { id: true, fromPath: true, toPath: true },
  });

  const toDeleteRedirectIds = [];
  for (const r of redirects) {
    const from = normalizePath(r.fromPath);
    const to = normalizePath(r.toPath);
    if (!blogPaths.has(from)) continue;
    if (to.startsWith("/services/")) {
      toDeleteRedirectIds.push(r.id);
    }
  }

  const services = await prisma.$queryRaw`
    SELECT id, "legacyPath" FROM "Service" WHERE "legacyPath" IS NOT NULL
  `;
  const toDeleteServiceIds = services
    .filter((s) => s.legacyPath && blogPaths.has(normalizePath(s.legacyPath)))
    .map((s) => s.id);

  console.log(`Blog legacy paths: ${blogPaths.size}`);
  console.log(`Inverted redirects to remove: ${toDeleteRedirectIds.length}`);
  console.log(`Misclassified services to remove: ${toDeleteServiceIds.length}`);
  if (DRY_RUN) {
    console.log("(dry run — no database writes)");
    await prisma.$disconnect();
    return;
  }

  if (toDeleteRedirectIds.length) {
    await prisma.redirect.deleteMany({ where: { id: { in: toDeleteRedirectIds } } });
  }
  if (toDeleteServiceIds.length) {
    await prisma.serviceRelated.deleteMany({
      where: {
        OR: [
          { fromServiceId: { in: toDeleteServiceIds } },
          { toServiceId: { in: toDeleteServiceIds } },
        ],
      },
    });
    await prisma.service.deleteMany({ where: { id: { in: toDeleteServiceIds } } });
  }

  console.log("Done. Run: npm run redirects:legacy && npm run cms:import-redirects");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
