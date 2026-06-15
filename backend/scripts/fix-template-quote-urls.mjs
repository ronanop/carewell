#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { repoRoot } from "./lib/repo-root.mjs";

const root = repoRoot(import.meta.url);
const files = [
  "frontend/src/data/beard-transplant-in-delhi.ts",
  "frontend/src/data/eyebrow-transplant-in-delhi.ts",
  "frontend/src/data/female-hair-transplant-in-delhi.ts",
  "frontend/src/data/hair-transplant-before-after-in-delhi.ts",
  "frontend/src/data/hair-transplant-cost-in-delhi.ts",
];

let fixed = 0;
for (const rel of files) {
  const abs = join(root, rel);
  const content = readFileSync(abs, "utf8");
  const next = content.replace(/`"(https:\/\/[^"]+)"`/g, '"$1"');
  if (next !== content) {
    writeFileSync(abs, next, "utf8");
    fixed++;
    console.log("fixed", rel);
  }
}
console.log(`Done. ${fixed} files.`);
