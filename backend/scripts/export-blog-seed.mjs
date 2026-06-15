#!/usr/bin/env node
/**
 * Export BlogPost rows (with body) to db/seed/blog-posts-content.json for production deploy.
 * Run locally after scrape:import-blog: npm run cms:export-blog-seed
 */
import { writeFileSync } from "fs";
import { join } from "path";
import { PrismaClient } from "@prisma/client";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";

const root = repoRoot(import.meta.url);
loadEnvFiles(root);

if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.blogPost.findMany({
    where: { body: { not: null } },
    orderBy: { legacyPath: "asc" },
  });

  const withBody = posts.filter((p) => Array.isArray(p.body) && p.body.length > 0);
  const outPath = join(root, "db", "seed", "blog-posts-content.json");
  const payload = {
    description: "Blog post CMS content for production import (npm run cms:import-blog-seed).",
    exportedAt: new Date().toISOString(),
    posts: withBody.map((p) => ({
      id: p.id,
      slug: p.slug,
      legacyPath: p.legacyPath,
      title: p.title,
      excerpt: p.excerpt,
      body: p.body,
      featured: p.featured,
      readTimeMinutes: p.readTimeMinutes,
      seoTitle: p.seoTitle,
      seoDescription: p.seoDescription,
      seoCanonicalUrl: p.seoCanonicalUrl,
      publishedAt: p.publishedAt?.toISOString() ?? null,
      updatedAt: p.updatedAt?.toISOString() ?? null,
    })),
  };

  writeFileSync(outPath, `${JSON.stringify(payload)}\n`, "utf8");
  console.log(`Wrote ${withBody.length} posts to ${outPath}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
