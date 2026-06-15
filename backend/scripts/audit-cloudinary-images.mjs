#!/usr/bin/env node
/**
 * Audit image URLs in frontend source vs cloudinary-asset-map.json
 */
import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import { join, relative } from "path";
import { repoRoot } from "./lib/repo-root.mjs";
import { loadEnvFiles } from "./lib/load-env.mjs";

const root = repoRoot(import.meta.url);
loadEnvFiles(root);
const SRC = join(root, "frontend", "src");
const MAP_PATH = join(root, "db", "seed", "cloudinary-asset-map.json");
const map = existsSync(MAP_PATH) ? JSON.parse(readFileSync(MAP_PATH, "utf8")) : {};

const SKIP_LOCAL = new Set(
  Object.entries(map)
    .filter(([, e]) => e.skipHero)
    .map(([p]) => p),
);

const LOCAL_UI = new Set([
  "/carewell-logo-icon.png",
  "/navbar-logo.png",
  "/whatsapp-icon-custom.png",
  "/google-icon.png",
  "/hero-background.png",
  "/hero-figure.png",
  "/how-it-works-bg.jpg",
  "/images/service-hero-theatre-bg.png",
  "/treatments-row-fallback.png",
  "/demo/home-hero.svg",
]);

function resolveCloudinary(pathOrUrl) {
  if (map[pathOrUrl]?.url?.startsWith("http")) return map[pathOrUrl].url;
  const wp = pathOrUrl.startsWith("http") ? pathOrUrl : null;
  if (wp && map[wp]?.url?.startsWith("http")) return map[wp].url;
  return null;
}

/** @type {Map<string, { file: string, line: number, text: string }[]>} */
const findings = new Map();

function add(category, file, line, text) {
  if (!findings.has(category)) findings.set(category, []);
  findings.get(category).push({ file: relative(root, file), line, text: text.trim().slice(0, 120) });
}

function scanFile(abs) {
  const content = readFileSync(abs, "utf8");
  const lines = content.split("\n");
  lines.forEach((line, i) => {
    const lineNo = i + 1;
    for (const m of line.matchAll(/"(https:\/\/[^"]+\.(?:webp|jpg|jpeg|png|gif|svg|avif))"/gi)) {
      const url = m[1];
      if (url.includes("res.cloudinary.com")) continue;
      if (url.includes("carewellmedicalcentre.com/wp-content")) {
        const mapped = resolveCloudinary(url);
        add(mapped ? "wp-hero-or-unmapped" : "wp-not-in-map", abs, lineNo, line);
        if (mapped && !line.match(/\bhero/i)) add("wp-should-be-cloudinary", abs, lineNo, line);
        continue;
      }
      add("external-url", abs, lineNo, line);
    }
    for (const m of line.matchAll(/"(\/[^"]+\.(?:webp|jpg|jpeg|png|gif|svg|avif))"/gi)) {
      const p = m[1];
      if (LOCAL_UI.has(p) || SKIP_LOCAL.has(p)) {
        add("local-ui-ok", abs, lineNo, line);
        continue;
      }
      if (p.startsWith("/uploads/")) {
        const mapped = resolveCloudinary(p);
        add(mapped ? "uploads-should-be-cloudinary" : "uploads-not-in-map", abs, lineNo, line);
        continue;
      }
      const mapped = resolveCloudinary(p);
      if (mapped) add("local-should-be-cloudinary", abs, lineNo, line);
      else add("local-missing-or-deleted", abs, lineNo, line);
    }
    if (/\$\{WP\}\//.test(line)) {
      const full = line.replace(/\$\{WP\}/g, "https://www.carewellmedicalcentre.com/wp-content/uploads");
      const wpMatch = full.match(
        /https:\/\/www\.carewellmedicalcentre\.com\/wp-content\/uploads\/[^\s`"',]+/,
      );
      if (wpMatch) {
        const mapped = resolveCloudinary(wpMatch[0]);
        const isHero =
          /\bhero\s*:/.test(lines[Math.max(0, i - 1)] || "") ||
          /\bhero(?:Banner|Image|ImageUrl|Face|Legs|Cheek|Glow)?\s*:/.test(line) ||
          /^\s*hero\s*:/.test(lines.slice(Math.max(0, i - 3), i + 1).join("\n"));
        add(
          isHero
            ? "wp-hero-intentional"
            : mapped
              ? "wp-template-should-be-cloudinary"
              : "wp-template-not-in-map",
          abs,
          lineNo,
          line,
        );
      }
    }
  });
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    if (statSync(abs).isDirectory()) walk(abs);
    else if (/\.(ts|tsx)$/.test(name)) scanFile(abs);
  }
}

walk(SRC);

async function auditCms() {
  if (!process.env.DATABASE_URL) {
    console.log("\n(CMS DB audit skipped — no DATABASE_URL)\n");
    return;
  }
  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    function scanJson(value, acc = { wp: 0, cloud: 0, uploads: 0, local: 0 }) {
      if (value == null) return acc;
      if (typeof value === "string") {
        if (value.includes("res.cloudinary.com")) acc.cloud++;
        if (value.includes("wp-content/uploads")) acc.wp++;
        if (/\/uploads\/\d{4}\//.test(value)) acc.uploads++;
        if (value.startsWith("cloudinary:")) acc.cloud++;
        if (/^\/(?!uploads)[^"'\s]+\.(?:webp|jpg|jpeg|png|gif|svg)/i.test(value)) acc.local++;
        return acc;
      }
      if (Array.isArray(value)) {
        for (const item of value) scanJson(item, acc);
        return acc;
      }
      if (typeof value === "object") {
        for (const v of Object.values(value)) scanJson(v, acc);
      }
      return acc;
    }

    const services = await prisma.service.findMany({
      where: { legacyPath: { not: null } },
      select: { legacyPath: true, whatIsBody: true },
    });
    const blogs = await prisma.blogPost.findMany({
      where: { legacyPath: { not: null } },
      select: { legacyPath: true, body: true },
    });
    const media = await prisma.media.findMany({
      select: { path: true, url: true },
    });

    const svcStats = { wp: 0, cloud: 0, uploads: 0, local: 0 };
    for (const s of services) scanJson(s.whatIsBody, svcStats);
    const blogStats = { wp: 0, cloud: 0, uploads: 0, local: 0 };
    for (const b of blogs) scanJson(b.body, blogStats);

    const mediaCloud = media.filter((m) => m.url?.includes("res.cloudinary.com") || m.path?.startsWith("cloudinary:")).length;
    const mediaLocal = media.filter((m) => m.url?.startsWith("/uploads/")).length;
    const mediaOther = media.length - mediaCloud - mediaLocal;

    console.log("\n## CMS database (scraped imports)");
    console.log(`Legacy services: ${services.length}, legacy blogs: ${blogs.length}`);
    console.log(`Service body — Cloudinary refs: ${svcStats.cloud}, WP URLs: ${svcStats.wp}${svcStats.wp ? " ⚠" : " ✓"}, local paths: ${svcStats.local}`);
    console.log(`Blog body — Cloudinary refs: ${blogStats.cloud}, WP URLs: ${blogStats.wp}${blogStats.wp ? " ⚠" : " ✓"}, local paths: ${blogStats.local}`);
    console.log(`Media table — Cloudinary: ${mediaCloud}, local /uploads/: ${mediaLocal}, other: ${mediaOther}`);

    await prisma.$disconnect();
  } catch (e) {
    console.log("\n(CMS DB audit failed:", e instanceof Error ? e.message : e, ")\n");
  }
}

console.log("# Cloudinary image audit\n");

const order = [
  "local-missing-or-deleted",
  "local-should-be-cloudinary",
  "uploads-not-in-map",
  "uploads-should-be-cloudinary",
  "wp-template-not-in-map",
  "wp-template-should-be-cloudinary",
  "wp-should-be-cloudinary",
  "wp-not-in-map",
  "wp-hero-intentional",
  "wp-hero-or-unmapped",
  "local-ui-ok",
  "external-url",
];

for (const cat of order) {
  const items = findings.get(cat) || [];
  if (!items.length) continue;
  const icon =
    cat.includes("missing") || cat.includes("not-in-map") || cat.includes("should-be")
      ? "⚠"
      : cat.includes("hero") || cat.includes("ui-ok")
        ? "○"
        : "·";
  console.log(`\n### ${icon} ${cat} (${items.length})`);
  const seen = new Set();
  for (const it of items.slice(0, 15)) {
    const key = `${it.file}:${it.line}`;
    if (seen.has(key)) continue;
    seen.add(key);
    console.log(`  ${it.file}:${it.line}  ${it.text}`);
  }
  if (items.length > 15) console.log(`  … and ${items.length - 15} more`);
}

const issues = [
  "local-missing-or-deleted",
  "local-should-be-cloudinary",
  "uploads-not-in-map",
  "uploads-should-be-cloudinary",
  "wp-template-not-in-map",
  "wp-template-should-be-cloudinary",
  "wp-should-be-cloudinary",
  "wp-not-in-map",
].reduce((n, c) => n + (findings.get(c)?.length || 0), 0);

console.log("\n## Summary");
console.log(`Mapped assets in manifest: ${Object.keys(map).length}`);

// count cloudinary in src
let cloudRefs = 0;
function countCloud(dir) {
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    if (statSync(abs).isDirectory()) countCloud(abs);
    else if (/\.(ts|tsx)$/.test(name)) {
      cloudRefs += (readFileSync(abs, "utf8").match(/res\.cloudinary\.com/g) || []).length;
    }
  }
}
countCloud(SRC);
console.log(`Cloudinary refs in frontend/src: ${cloudRefs}`);
console.log(`Issues needing migration: ${issues}`);
console.log(`Intentional WP hero images: ${(findings.get("wp-hero-intentional") || []).length}`);
console.log(`Intentional local UI assets: ${(findings.get("local-ui-ok") || []).length}`);

await auditCms();

if (issues === 0) {
  console.log("\n✓ Static pages: all non-hero images are on Cloudinary or intentional local UI.");
} else {
  console.log("\n⚠ Some references still need Cloudinary URLs — see categories above.");
}
