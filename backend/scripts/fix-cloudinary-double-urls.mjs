#!/usr/bin/env node
/** Fix double Cloudinary URLs from repeated migrate runs. */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { repoRoot } from "./lib/repo-root.mjs";

const root = repoRoot(import.meta.url);
const SRC = join(root, "frontend", "src");

// Strip bogus prefix before a second https://res.cloudinary.com
const BROKEN =
  /https:\/\/res\.cloudinary\.com\/[^"'\s]+?\/carewell-media\/site(?=https:\/\/res\.cloudinary\.com)/g;

let fixed = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    if (statSync(abs).isDirectory()) {
      walk(abs);
      continue;
    }
    if (!/\.(ts|tsx)$/.test(name)) continue;
    let content = readFileSync(abs, "utf8");
    let next = content;
    let pass = 0;
    while (pass < 5) {
      const cleaned = next.replace(BROKEN, "");
      if (cleaned === next) break;
      next = cleaned;
      pass++;
    }
    if (next !== content) {
      writeFileSync(abs, next, "utf8");
      fixed++;
      console.log("fixed", relative(root, abs));
    }
  }
}

walk(SRC);
console.log(`Done. ${fixed} files fixed.`);
