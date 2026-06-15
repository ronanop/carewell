#!/usr/bin/env node
/**
 * Import blog + service content seeds into PostgreSQL (run on Render build).
 */
import { spawnSync } from "child_process";
import { join } from "path";
import { PrismaClient } from "@prisma/client";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";

const root = repoRoot(import.meta.url);
loadEnvFiles(root);
const node = process.execPath;

function run(script) {
  const res = spawnSync(node, [join(root, "backend", "scripts", script)], {
    stdio: "inherit",
    env: process.env,
    cwd: root,
  });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

if (!process.env.DATABASE_URL) {
  console.error("cms:import-content-seed — Missing DATABASE_URL (required on Render build)");
  process.exit(1);
}

run("import-blog-seed.mjs");
run("import-service-seed.mjs");

const prisma = new PrismaClient();
const [blogSample, serviceSample] = await Promise.all([
  prisma.blogPost.findFirst({
    where: { legacyPath: "/penile-vitiligo-can-be-treated-see-how" },
    select: { title: true, body: true },
  }),
  prisma.service.findFirst({
    where: { legacyPath: "/skin-treatments-in-delhi/microneedling" },
    select: { title: true, whatIsBody: true },
  }),
]);
await prisma.$disconnect();

const blogBlocks = Array.isArray(blogSample?.body) ? blogSample.body.length : 0;
const svcBlocks = Array.isArray(serviceSample?.whatIsBody) ? serviceSample.whatIsBody.length : 0;

console.log(`Verify blog body blocks: ${blogBlocks}, service body blocks: ${svcBlocks}`);
if (blogBlocks < 1 || svcBlocks < 1) {
  console.error(
    "Content import verification failed — DB rows still missing body. Check seed files are committed and DATABASE_URL is set during build.",
  );
  process.exit(1);
}

console.log("Content seed import complete.");
