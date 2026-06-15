import { readFileSync, existsSync } from "fs";
import { join } from "path";

import { repoRoot } from "./repo-root.mjs";

/** @param {string} [root] */
export function envFilePaths(root) {
  return [
    join(root, ".env"),
    join(root, "frontend", ".env"),
    join(root, ".env.local"),
    join(root, "frontend", ".env.local"),
  ];
}

/** Load monorepo env (later files override). */
export function loadEnvFiles(root = repoRoot(import.meta.url)) {
  for (const p of envFilePaths(root)) {
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
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
      if (process.env[key] === undefined) {
        process.env[key] = val;
      }
    }
  }
}
