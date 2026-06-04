const DEFAULT_SCRAPER_BASE = "https://www.carewellmedicalcentre.com/";

/** Hostnames permitted for server-side scrape preview (SSRF guard). */
const ALLOWED_HOSTS = new Set([
  "carewellmedicalcentre.com",
  "www.carewellmedicalcentre.com",
  "localhost",
  "127.0.0.1",
]);

export function getScraperDefaultBaseUrl(): string {
  const fromEnv = process.env.SCRAPER_BASE_URL?.trim();
  if (fromEnv) {
    try {
      return new URL(fromEnv).href;
    } catch {
      /* fall through */
    }
  }
  return DEFAULT_SCRAPER_BASE;
}

export function isAllowedScrapeUrl(raw: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return false;
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return false;
  if (parsed.username || parsed.password) return false;

  const host = parsed.hostname.toLowerCase();
  if (!ALLOWED_HOSTS.has(host)) return false;

  if (host === "localhost" || host === "127.0.0.1") {
    return process.env.NODE_ENV !== "production";
  }

  return true;
}

export function normalizeScrapeUrl(raw: string, base?: string): string | null {
  try {
    const resolved = base ? new URL(raw, base) : new URL(raw);
    if (!isAllowedScrapeUrl(resolved.href)) return null;
    return resolved.href;
  } catch {
    return null;
  }
}
