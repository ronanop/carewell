import { getScraperDefaultBaseUrl, isAllowedScrapeUrl, normalizeScrapeUrl } from "@/lib/scraper-url";
import { legacyPathFromUrl, oldSlugFromUrl } from "@/lib/scraper-slug";

export type SitemapEntry = {
  url: string;
  oldSlug: string;
  legacyPath: string;
};

const MAX_SITEMAP_BYTES = 5_000_000;
const MAX_CHILD_SITEMAPS = 50;

/** Strip XML namespaces so <urlset xmlns="..."><loc> still matches. */
function stripXmlNamespaces(xml: string): string {
  return xml.replace(/\sxmlns(:\w+)?="[^"]*"/gi, "");
}

function decodeXmlEntities(value: string): string {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .trim();
}

export function extractLocUrls(xml: string): string[] {
  const normalized = stripXmlNamespaces(xml);
  const urls: string[] = [];
  const locRegex = /<loc>\s*(?:<!\[CDATA\[)?\s*([^\]<]+?)\s*(?:\]\]>)?\s*<\/loc>/gi;
  let match: RegExpExecArray | null;
  while ((match = locRegex.exec(normalized)) !== null) {
    const loc = decodeXmlEntities(match[1] ?? "");
    if (loc) urls.push(loc);
  }
  return urls;
}

function isChildSitemapUrl(url: string): boolean {
  try {
    const path = new URL(url).pathname.toLowerCase();
    if (!path.endsWith(".xml")) return false;
    const file = path.split("/").pop() ?? "";
    return file.startsWith("sitemap") || file.includes("sitemap");
  } catch {
    return false;
  }
}

function toPageEntry(url: string): SitemapEntry | null {
  const base = getScraperDefaultBaseUrl();
  const normalized = normalizeScrapeUrl(url, base);
  if (!normalized || !isAllowedScrapeUrl(normalized)) return null;
  if (isChildSitemapUrl(normalized)) return null;
  return {
    url: normalized,
    oldSlug: oldSlugFromUrl(normalized),
    legacyPath: legacyPathFromUrl(normalized),
  };
}

function dedupeEntries(entries: SitemapEntry[]): SitemapEntry[] {
  const seen = new Set<string>();
  const out: SitemapEntry[] = [];
  for (const entry of entries) {
    if (seen.has(entry.url)) continue;
    seen.add(entry.url);
    out.push(entry);
  }
  return out;
}

async function fetchChildSitemapXml(url: string): Promise<string | null> {
  if (!isAllowedScrapeUrl(url)) return null;
  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/xml,text/xml,*/*",
        "User-Agent": "CareWellAdminScraper/1.0 (+https://www.carewellmedicalcentre.com)",
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    if (buf.byteLength > MAX_SITEMAP_BYTES) return null;
    return new TextDecoder("utf-8", { fatal: false }).decode(buf);
  } catch {
    return null;
  }
}

/**
 * Parse sitemap XML (urlset or sitemap index). Merges page URLs and child sitemap locs.
 */
export async function parseSitemapXml(xml: string): Promise<{
  entries: SitemapEntry[];
  childSitemapsFetched: number;
  skipped: number;
  pageLocsInFile: number;
  childSitemapLocsInFile: number;
}> {
  if (xml.length > MAX_SITEMAP_BYTES) {
    throw new Error("Sitemap file is too large (max 5 MB)");
  }

  const locs = extractLocUrls(xml);
  const pageEntries: SitemapEntry[] = [];
  const childSitemapUrls: string[] = [];

  for (const loc of locs) {
    const entry = toPageEntry(loc);
    if (entry) {
      pageEntries.push(entry);
      continue;
    }
    if (isAllowedScrapeUrl(loc) && isChildSitemapUrl(loc)) {
      childSitemapUrls.push(loc);
    }
  }

  let childSitemapsFetched = 0;
  const toFetch = Array.from(new Set(childSitemapUrls)).slice(0, MAX_CHILD_SITEMAPS);

  for (const childUrl of toFetch) {
    const childXml = await fetchChildSitemapXml(childUrl);
    if (!childXml) continue;
    childSitemapsFetched += 1;
    for (const loc of extractLocUrls(childXml)) {
      const entry = toPageEntry(loc);
      if (entry) pageEntries.push(entry);
    }
  }

  const entries = dedupeEntries(pageEntries);
  const skipped = locs.filter(
    (loc) => !toPageEntry(loc) && !(isAllowedScrapeUrl(loc) && isChildSitemapUrl(loc)),
  ).length;

  return {
    entries,
    childSitemapsFetched,
    skipped,
    pageLocsInFile: locs.filter((loc) => toPageEntry(loc)).length,
    childSitemapLocsInFile: childSitemapUrls.length,
  };
}
