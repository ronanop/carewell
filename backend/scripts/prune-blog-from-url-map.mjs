#!/usr/bin/env node
/**
 * Remove blog post entries from legacy-url-map.json services array.
 * Blogs belong in legacy-sitemap-posts.json, not as /services/{slug} targets.
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { loadLegacyBlogPaths } from "./lib/legacy-blog-paths.mjs";
import { repoRoot } from "./lib/repo-root.mjs";

const root = repoRoot(import.meta.url);
const mapPath = join(root, "db", "seed", "legacy-url-map.json");
const blogPaths = loadLegacyBlogPaths(root);

const map = JSON.parse(readFileSync(mapPath, "utf8"));
const before = (map.services ?? []).length;
map.services = (map.services ?? []).filter((s) => !blogPaths.has(String(s.from ?? "").replace(/\/$/, "")));
const removed = before - map.services.length;

writeFileSync(mapPath, `${JSON.stringify(map, null, 2)}\n`, "utf8");
console.log(`Removed ${removed} blog entries from legacy-url-map.json (${map.services.length} services remain)`);
