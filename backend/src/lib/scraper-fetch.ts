import { parseHtmlPreview, type ScrapePreview } from "@/lib/scraper-parse";
import { getScraperDefaultBaseUrl, normalizeScrapeUrl } from "@/lib/scraper-url";

const MAX_HTML_BYTES = 1_500_000;
const FETCH_TIMEOUT_MS = 12_000;

export type ScrapeFetchResult =
  | { ok: true; url: string; preview: ScrapePreview }
  | { ok: false; url: string; error: string };

export async function fetchAndParseScrapeUrl(rawUrl: string): Promise<ScrapeFetchResult> {
  const base = getScraperDefaultBaseUrl();
  const target = normalizeScrapeUrl(rawUrl.trim().slice(0, 2048), base);
  if (!target) {
    return {
      ok: false,
      url: rawUrl,
      error:
        "URL not allowed. Only carewellmedicalcentre.com (and localhost in development) may be scraped.",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(target, {
      signal: controller.signal,
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": "CareWellAdminScraper/1.0 (+https://www.carewellmedicalcentre.com)",
      },
      redirect: "follow",
      cache: "no-store",
    });

    if (!res.ok) {
      return { ok: false, url: target, error: `Upstream returned ${res.status}` };
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html") && !contentType.includes("application/xhtml")) {
      return { ok: false, url: target, error: "Response is not HTML" };
    }

    const buf = await res.arrayBuffer();
    if (buf.byteLength > MAX_HTML_BYTES) {
      return { ok: false, url: target, error: "Page too large to preview" };
    }

    const finalUrl = normalizeScrapeUrl(res.url);
    if (!finalUrl) {
      return { ok: false, url: target, error: "Redirected to a disallowed host" };
    }

    const html = new TextDecoder("utf-8", { fatal: false }).decode(buf);
    const preview = parseHtmlPreview(html, finalUrl);
    return { ok: true, url: finalUrl, preview };
  } catch (err) {
    const message =
      err instanceof Error && err.name === "AbortError" ? "Request timed out" : "Fetch failed";
    return { ok: false, url: target, error: message };
  } finally {
    clearTimeout(timeout);
  }
}

/** Run scrape jobs with limited concurrency. */
export async function fetchAndParseScrapeUrls(
  urls: string[],
  options?: { concurrency?: number; onProgress?: (done: number, total: number) => void },
): Promise<ScrapeFetchResult[]> {
  const concurrency = Math.min(Math.max(options?.concurrency ?? 2, 1), 5);
  const results: ScrapeFetchResult[] = new Array(urls.length);
  let nextIndex = 0;
  let completed = 0;

  async function worker(): Promise<void> {
    while (nextIndex < urls.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await fetchAndParseScrapeUrl(urls[index]!);
      completed += 1;
      options?.onProgress?.(completed, urls.length);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, () => worker()));
  return results;
}
