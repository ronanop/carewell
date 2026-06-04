import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

/** Monorepo root from any workspace cwd or script location. */
export function repoRoot(fromFileUrl = import.meta.url) {
  let dir = dirname(fileURLToPath(fromFileUrl));
  for (let i = 0; i < 6; i++) {
    if (existsSync(join(dir, "frontend")) && existsSync(join(dir, "backend"))) {
      return dir;
    }
    dir = join(dir, "..");
  }
  return join(dirname(fileURLToPath(fromFileUrl)), "..", "..");
}
