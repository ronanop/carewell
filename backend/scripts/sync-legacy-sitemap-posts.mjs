#!/usr/bin/env node
/**
 * Replace BlogPost rows with legacy blog sitemap paths (root URLs, not /blog/{slug}).
 * Run: npm run cms:sync-legacy-sitemap-posts
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

const SKIP_DB_PATHS = new Set(["/blog"]);

async function main() {
  const manifestPath = join(root, "db", "seed", "legacy-sitemap-posts.json");
  if (!existsSync(manifestPath)) {
    console.error("Missing", manifestPath);
    process.exit(1);
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const paths = [...new Set((manifest.paths ?? []).map(normalizeLegacyPath))];

  const prisma = new PrismaClient();

  console.log("Removing existing blog posts…");
  await prisma.blogPostRelated.deleteMany({});
  await prisma.categoryBlogPost.deleteMany({});
  await prisma.blogPost.deleteMany({});

  let created = 0;
  let skipped = 0;

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "").replace(/\/$/, "");

  for (const legacyPath of paths) {
    if (SKIP_DB_PATHS.has(legacyPath)) {
      skipped++;
      continue;
    }

    const slug = slugFromLegacyPath(legacyPath);
    const title = titleFromLegacyPath(legacyPath);
    const canonical = siteUrl ? `${siteUrl}${legacyPath}/` : null;

    await prisma.$executeRaw`
      INSERT INTO "BlogPost" (
        id, slug, title, featured, "seoTitle", "seoCanonicalUrl", "legacyPath", "createdAt", "cmsUpdatedAt"
      ) VALUES (
        ${`blog-${slug}`},
        ${slug},
        ${title},
        false,
        ${`${title} | Care Well Medical Centre`},
        ${canonical},
        ${legacyPath},
        NOW(),
        NOW()
      )
    `;
    created++;
  }

  const posts = await prisma.$queryRaw`
    SELECT slug, "legacyPath" FROM "BlogPost" WHERE "legacyPath" IS NOT NULL
  `;

  for (const p of posts) {
    const from = `/blog/${p.slug}`;
    const to = `${p.legacyPath}/`;
    await prisma.redirect.upsert({
      where: { fromPath: from },
      create: { fromPath: from, toPath: to, statusCode: 301 },
      update: { toPath: to, statusCode: 301 },
    });
  }

  console.log(`Done. Created ${created} blog posts, skipped ${skipped} (/blog index).`);
  console.log("Redirects: /blog/{slug} → legacy root paths");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
