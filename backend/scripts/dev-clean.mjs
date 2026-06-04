#!/usr/bin/env node
/**
 * Clean Next dev artifacts before starting (fixes corrupt webpack chunks on OneDrive).
 * Usage: node scripts/dev-clean.mjs  (then npm run dev)
 */
import { rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { repoRoot } from "./lib/repo-root.mjs";

const root = repoRoot(import.meta.url);
const targets = [
  join(root, "frontend", ".next"),
  join(tmpdir(), "carewell-next-webpack"),
];

const rmOpts = { recursive: true, force: true, maxRetries: 8, retryDelay: 500 };

for (const path of targets) {
  try {
    rmSync(path, rmOpts);
    console.log("Removed:", path);
  } catch (e) {
    console.warn("Skip:", path, e.message);
    console.warn("Stop `npm run dev`, wait for OneDrive sync, then re-run dev:fresh.");
  }
}

console.log("Done. Run: npm run dev:all");
