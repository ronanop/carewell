import { existsSync } from "fs";
import { join } from "path";
import { getRepoRoot } from "@/lib/repo-root";

/** CMS uploads at repo root `uploads/`. */
export function getUploadsRoot(): string {
  const root = getRepoRoot();
  const candidates = [
    join(root, "uploads"),
    join(process.cwd(), "uploads"),
    join(process.cwd(), "..", "uploads"),
    join(root, "frontend", "public", "uploads"),
  ];
  for (const dir of candidates) {
    if (existsSync(dir)) return dir;
  }
  return join(root, "uploads");
}

/** Resolve frontend/public for static demo assets. */
export function getFrontendPublicDir(): string {
  const root = getRepoRoot();
  const candidates = [
    join(root, "frontend", "public"),
    join(process.cwd(), "public"),
    join(process.cwd(), "frontend", "public"),
  ];
  for (const dir of candidates) {
    if (existsSync(dir)) return dir;
  }
  return join(root, "frontend", "public");
}

export function getUploadsDir(year = new Date().getFullYear()): string {
  return join(getUploadsRoot(), String(year));
}

export function mimeFromExt(ext: string): string {
  const map: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    avif: "image/avif",
    mp4: "video/mp4",
    webm: "video/webm",
  };
  return map[ext.toLowerCase()] ?? "application/octet-stream";
}
