#!/usr/bin/env node
/**
 * Apply cloudinary-asset-map using safe quoted-string replacement only.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";

const root = repoRoot(import.meta.url);
loadEnvFiles(root);
const map = JSON.parse(
  readFileSync(join(root, "db", "seed", "cloudinary-asset-map.json"), "utf8"),
);
const WP_BASE = "https://www.carewellmedicalcentre.com/wp-content/uploads";

function splitPreservingHeroBlocks(content) {
  const re = /\b(hero(?:Banner|Image|ImageUrl|Face|Legs|Cheek|Glow)?)\s*:\s*\{/g;
  const heroRanges = [];
  let m;
  while ((m = re.exec(content)) !== null) {
    let depth = 1;
    let i = re.lastIndex;
    while (i < content.length && depth > 0) {
      if (content[i] === "{") depth++;
      else if (content[i] === "}") depth--;
      i++;
    }
    heroRanges.push({ start: m.index, end: i });
  }
  return heroRanges;
}

function isInHeroBlock(pos, ranges) {
  return ranges.some((r) => pos >= r.start && pos < r.end);
}

function isHeroLine(line) {
  return (
    /\bhero(?:Banner|Image|ImageUrl|Face|Legs|Cheek|Glow)?\s*:/.test(line) ||
    /\bheroImageUrl\s*:/.test(line) ||
    /service-hero-theatre|hero-background|hero-figure|home-hero/.test(line) ||
    /backgroundImage:.*service-hero-theatre/.test(line)
  );
}

function resolveUrl(from) {
  const entry = map[from];
  return entry && !entry.skipHero && entry.url?.startsWith("http") ? entry.url : null;
}

function transformLine(line) {
  let out = line;
  let changed = false;

  out = out.replace(/\$\{WP\}(\/[^`"']+)/g, (match, suffix) => {
    const url = resolveUrl(`${WP_BASE}${suffix}`);
    if (url) {
      changed = true;
      return url;
    }
    return match;
  });

  out = out.replace(
    /"(https:\/\/www\.carewellmedicalcentre\.com\/wp-content\/uploads\/[^"]+)"/g,
    (match, full) => {
      const url = resolveUrl(full);
      if (url) {
        changed = true;
        return `"${url}"`;
      }
      return match;
    },
  );

  out = out.replace(/"(\/[^"]+\.(?:webp|jpg|jpeg|png|gif|svg|avif))"/gi, (match, localPath) => {
    if (localPath.startsWith("//")) return match;
    const url = resolveUrl(localPath);
    if (url) {
      changed = true;
      return `"${url}"`;
    }
    return match;
  });

  return { out, changed };
}

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
    const heroRanges = splitPreservingHeroBlocks(content);
    const lines = content.split("\n");
    let changed = false;
    let offset = 0;

    const newLines = lines.map((line) => {
      const lineStart = offset;
      offset += line.length + 1;
      if (isHeroLine(line) || isInHeroBlock(lineStart, heroRanges)) return line;
      const result = transformLine(line);
      if (result.changed) changed = true;
      return result.out;
    });

    if (changed) {
      writeFileSync(abs, newLines.join("\n"), "utf8");
      filesChanged++;
      console.log("updated", relative(root, abs));
    }
  }
}

walk(join(root, "frontend", "src"));
console.log(`Done. ${filesChanged} files updated.`);
