import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { repoRoot } from "./repo-root.mjs";

function normalizeLegacyPath(path) {
  let p = String(path).trim();
  if (!p.startsWith("/")) p = `/${p}`;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

/** @param {string} [rootDir] */
export function loadLegacyBlogPaths(rootDir) {
  const root = rootDir ?? repoRoot(import.meta.url);
  const manifestPath = join(root, "db", "seed", "legacy-sitemap-posts.json");
  if (!existsSync(manifestPath)) return new Set();
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  return new Set(
    (manifest.paths ?? [])
      .map(normalizeLegacyPath)
      .filter((p) => p !== "/blog"),
  );
}

export function isBlogLegacyPath(path, blogPaths) {
  return blogPaths.has(normalizeLegacyPath(path));
}
