/**
 * Import redirects.migration.json into Prisma Redirect table.
 */
import { PrismaClient } from "@prisma/client";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";

const root = repoRoot(import.meta.url);
loadEnvFiles(root);

if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

const file = join(root, "db", "redirects.migration.json");
if (!existsSync(file)) {
  console.error("Missing db/redirects.migration.json");
  process.exit(1);
}

const rules = JSON.parse(readFileSync(file, "utf8"));
const prisma = new PrismaClient();

async function main() {
  let n = 0;
  for (const r of rules) {
    const fromPath = r.source || r.from || r.fromPath;
    const toPath = r.destination || r.to || r.toPath;
    const statusCode = r.permanent === false ? 302 : r.statusCode ?? 301;
    if (!fromPath || !toPath) continue;
    await prisma.redirect.upsert({
      where: { fromPath },
      create: { fromPath, toPath, statusCode },
      update: { toPath, statusCode },
    });
    n += 1;
  }
  console.log(`Imported ${n} redirects`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
