import { existsSync } from "fs";
import { join } from "path";

/** Monorepo root (folder containing frontend/, backend/, db/). */
export function getRepoRoot(): string {
  const cwd = process.cwd();
  const candidates = [cwd, join(cwd, ".."), join(cwd, "../..")];
  for (const dir of candidates) {
    if (existsSync(join(dir, "frontend")) && existsSync(join(dir, "backend"))) {
      return dir;
    }
  }
  return cwd;
}
