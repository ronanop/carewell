#!/usr/bin/env node
/**
 * Verify Cloudinary env and optional upload test.
 * Usage: npm run cloudinary:check
 */
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";
import { isCloudinaryEnabled } from "../src/lib/cloudinary.ts";

loadEnvFiles(repoRoot(import.meta.url));

const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const folder = process.env.CLOUDINARY_FOLDER?.trim() || "carewell-media";

if (!isCloudinaryEnabled()) {
  console.error("Cloudinary is NOT configured.");
  console.error("Set in frontend/.env.local (or repo .env.local):");
  console.error("  CLOUDINARY_CLOUD_NAME");
  console.error("  CLOUDINARY_API_KEY");
  console.error("  CLOUDINARY_API_SECRET");
  console.error("  CLOUDINARY_FOLDER=carewell-media  (optional)");
  process.exit(1);
}

console.log(`Cloudinary OK — cloud: ${cloudName}, folder: ${folder}`);
console.log("Admin uploads and scrape:import will store images on Cloudinary.");
console.log("\nRe-upload migrated images:");
console.log("  npm run scrape:import");
console.log("  npm run scrape:import-blog");
