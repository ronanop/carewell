import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getRepoRoot } from "@/lib/repo-root";

/** Env files in load order — later entries override earlier ones. */
export function repoEnvFilePaths(root = getRepoRoot()): string[] {
  return [
    join(root, ".env"),
    join(root, "frontend", ".env"),
    join(root, ".env.local"),
    join(root, "frontend", ".env.local"),
  ];
}

/** Load monorepo env files into `process.env` (for API server and scripts). */
export function loadRepoEnv(root = getRepoRoot()): void {
  for (const filePath of repoEnvFilePaths(root)) {
    if (!existsSync(filePath)) continue;
    for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const eq = t.indexOf("=");
      if (eq === -1) continue;
      const key = t.slice(0, eq).trim();
      let val = t.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  }
}
