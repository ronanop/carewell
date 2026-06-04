import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { getRepoRoot } from "@/lib/repo-root";
import { extractLocUrls } from "@/lib/scraper-sitemap";

export type LegacySitemapEntry = {
  url: string;
  path: string;
};

export function loadLegacyScrapeSitemap(): LegacySitemapEntry[] {
  const filePath = join(getRepoRoot(), "db", "seed", "legacy-scrape-sitemap.xml");
  if (!existsSync(filePath)) return [];

  const urls = extractLocUrls(readFileSync(filePath, "utf8"));
  const seen = new Set<string>();
  const entries: LegacySitemapEntry[] = [];

  for (const url of urls) {
    if (seen.has(url)) continue;
    seen.add(url);
    let path = "/";
    try {
      path = new URL(url).pathname.replace(/\/$/, "") || "/";
    } catch {
      path = url;
    }
    entries.push({ url, path });
  }

  return entries.sort((a, b) => a.path.localeCompare(b.path));
}

export function groupLegacySitemapEntries(
  entries: LegacySitemapEntry[],
): { label: string; entries: LegacySitemapEntry[] }[] {
  const buckets = new Map<string, LegacySitemapEntry[]>();

  for (const entry of entries) {
    const segment = entry.path === "/" ? "Home" : entry.path.split("/").filter(Boolean)[0] ?? "Other";
    const label =
      segment === "Home"
        ? "Home"
        : segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
    if (!buckets.has(label)) buckets.set(label, []);
    buckets.get(label)!.push(entry);
  }

  return Array.from(buckets.entries())
    .map(([label, items]) => ({ label, entries: items }))
    .sort((a, b) => a.label.localeCompare(b.label));
}
