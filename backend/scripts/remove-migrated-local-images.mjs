#!/usr/bin/env node
/**
 * Remove local copies of images that are on Cloudinary (per cloudinary-asset-map.json).
 * Updates any remaining source references to Cloudinary URLs first.
 *
 * Usage:
 *   npm run images:prune-local
 *   npm run images:prune-local -- --dry-run
 */
import { readFileSync, writeFileSync, unlinkSync, readdirSync, statSync, existsSync, rmdirSync } from "fs";
import { join, relative } from "path";
import { repoRoot } from "./lib/repo-root.mjs";

const root = repoRoot(import.meta.url);
const DRY_RUN = process.argv.includes("--dry-run");
const MAP_PATH = join(root, "db", "seed", "cloudinary-asset-map.json");
const PUBLIC_DIR = join(root, "frontend", "public");
const SRC_DIR = join(root, "frontend", "src");
const UPLOADS_DIR = join(root, "uploads");

const map = JSON.parse(readFileSync(MAP_PATH, "utf8"));

/** @type {{ webPath: string, cloudinaryUrl: string }[]} */
const toPrune = Object.entries(map)
  .filter(
    ([webPath, entry]) =>
      webPath.startsWith("/") &&
      !entry.skipHero &&
      typeof entry.url === "string" &&
      entry.url.startsWith("https://res.cloudinary.com/"),
  )
  .map(([webPath, entry]) => ({ webPath, cloudinaryUrl: entry.url }));

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function applyMapToContent(content) {
  let out = content;
  let changed = false;
  for (const { webPath, cloudinaryUrl } of toPrune) {
    const quoted = `"${webPath}"`;
    if (out.includes(quoted)) {
      out = out.split(quoted).join(`"${cloudinaryUrl}"`);
      changed = true;
    }

    const segments = webPath.split("/").filter(Boolean);
    for (let i = 1; i < segments.length; i++) {
      const suffix = segments.slice(i).join("/");
      const re = new RegExp(`\\$\\{[A-Z_]+\\}/${escapeRegExp(suffix)}`, "g");
      if (re.test(out)) {
        out = out.replace(re, cloudinaryUrl);
        changed = true;
      }
    }
  }
  return { out, changed };
}

function localFilePath(webPath) {
  if (webPath.startsWith("/uploads/")) {
    return join(root, webPath.slice(1));
  }
  return join(PUBLIC_DIR, webPath.slice(1));
}

function updateSourceRefs() {
  let filesChanged = 0;
  function walk(dir) {
    for (const name of readdirSync(dir)) {
      const abs = join(dir, name);
      if (statSync(abs).isDirectory()) {
        walk(abs);
        continue;
      }
      if (!/\.(ts|tsx)$/.test(name)) continue;

      const content = readFileSync(abs, "utf8");
      const { out, changed } = applyMapToContent(content);
      if (changed) {
        if (!DRY_RUN) writeFileSync(abs, out, "utf8");
        filesChanged++;
        console.log(`${DRY_RUN ? "would update" : "updated"}`, relative(root, abs));
      }
    }
  }
  walk(SRC_DIR);
  return filesChanged;
}

function pruneEmptyDirs(dir, { keepRoot = false } = {}) {
  if (!existsSync(dir)) return 0;
  let removed = 0;
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    if (statSync(abs).isDirectory()) {
      removed += pruneEmptyDirs(abs);
    }
  }
  if (!keepRoot && dir !== UPLOADS_DIR && readdirSync(dir).length === 0) {
    if (!DRY_RUN) rmdirSync(dir);
    console.log(`${DRY_RUN ? "would remove dir" : "removed dir"}`, relative(root, dir));
    removed++;
  }
  return removed;
}

function deleteLocalFiles() {
  let deleted = 0;
  let missing = 0;
  for (const { webPath } of toPrune) {
    const abs = localFilePath(webPath);
    if (!existsSync(abs)) {
      missing++;
      continue;
    }
    if (DRY_RUN) {
      console.log("would delete", relative(root, abs));
    } else {
      unlinkSync(abs);
      console.log("deleted", relative(root, abs));
    }
    deleted++;
  }
  return { deleted, missing };
}

function removeOrphanUploads() {
  const yearDir = join(UPLOADS_DIR, "2026");
  if (!existsSync(yearDir)) return 0;
  let removed = 0;
  for (const name of readdirSync(yearDir)) {
    const abs = join(yearDir, name);
    if (!statSync(abs).isFile()) continue;
    if (DRY_RUN) {
      console.log("would delete orphan", relative(root, abs));
    } else {
      unlinkSync(abs);
      console.log("deleted orphan", relative(root, abs));
    }
    removed++;
  }
  return removed;
}

console.log(DRY_RUN ? "(dry run)\n" : "");
console.log(`Pruning ${toPrune.length} migrated assets…\n`);

const refs = updateSourceRefs();
console.log(`\n${refs} source file(s) updated.\n`);

const { deleted, missing } = deleteLocalFiles();
const orphans = removeOrphanUploads();
const dirsRemoved = pruneEmptyDirs(PUBLIC_DIR, { keepRoot: true });
const uploadDirsRemoved = pruneEmptyDirs(UPLOADS_DIR, { keepRoot: true });

console.log(
  `\n${deleted} migrated file(s) ${DRY_RUN ? "would be " : ""}removed (${missing} already absent).`,
);
console.log(`${orphans} orphan upload file(s) ${DRY_RUN ? "would be " : ""}removed.`);
console.log(`${dirsRemoved + uploadDirsRemoved} empty folder(s) ${DRY_RUN ? "would be " : ""}removed.`);
console.log("\nKept local: logos, hero UI, navbar/whatsapp/google icons, service-hero-theatre-bg, demo/home-hero.svg.");
