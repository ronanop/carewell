#!/usr/bin/env node
/**
 * Import db/seed/blog-posts-content.json into PostgreSQL (production deploy).
 */
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { PrismaClient } from "@prisma/client";
import { upsertImportedBlog } from "./lib/blog-import-core.mjs";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";

const root = repoRoot(import.meta.url);
loadEnvFiles(root);

const DRY_RUN = process.argv.includes("--dry-run");

if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

const seedPath = join(root, "db", "seed", "blog-posts-content.json");
if (!existsSync(seedPath)) {
  console.error("Missing", seedPath, "— run: npm run cms:export-blog-seed");
  process.exit(1);
}

const { posts = [] } = JSON.parse(readFileSync(seedPath, "utf8"));
const prisma = new PrismaClient();

async function main() {
  console.log(`Importing ${posts.length} blog posts from seed…`);
  if (DRY_RUN) console.log("(dry run)\n");

  let imported = 0;
  let skipped = 0;

  for (const row of posts) {
    if (!row.id || !row.slug || !row.legacyPath || !Array.isArray(row.body) || !row.body.length) {
      skipped++;
      continue;
    }

    const payload = {
      id: row.id,
      slug: row.slug,
      legacyPath: row.legacyPath,
      title: row.title,
      excerpt: row.excerpt ?? null,
      body: row.body,
      coverImageId: null,
      featured: row.featured ?? false,
      readTimeMinutes: row.readTimeMinutes ?? null,
      seoTitle: row.seoTitle ?? null,
      seoDescription: row.seoDescription ?? null,
      seoCanonicalUrl: row.seoCanonicalUrl ?? null,
    };

    if (!DRY_RUN) {
      await upsertImportedBlog(prisma, payload);
      if (row.publishedAt || row.updatedAt) {
        await prisma.blogPost.update({
          where: { id: row.id },
          data: {
            ...(row.publishedAt ? { publishedAt: new Date(row.publishedAt) } : {}),
            ...(row.updatedAt ? { updatedAt: new Date(row.updatedAt) } : {}),
          },
        });
      }
    }
    imported++;
  }

  console.log(`Done. Imported ${imported}, skipped ${skipped}.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
