import { isErrorResponse } from "@/lib/http";
import { requireAdminApi } from "@/lib/require-admin-api";
import { fetchAndParseScrapeUrls } from "@/lib/scraper-fetch";
import { legacyPathFromUrl, oldSlugFromUrl } from "@/lib/scraper-slug";
import type { ScrapePreview } from "@/lib/scraper-parse";
const MAX_BATCH_SIZE = 200;

export type ScrapeBatchResultItem = {
  url: string;
  oldSlug: string;
  legacyPath: string;
  pageType: string;
  ok: boolean;
  preview: ScrapePreview | null;
  error: string | null;
};

export async function POST(req: Request) {
  const authResult = await requireAdminApi();
  if (isErrorResponse(authResult)) return authResult;

  let body: {
    urls?: string[];
    entries?: { url: string; oldSlug?: string; legacyPath?: string }[];
    pageType?: string;
  };

  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const pageType = body.pageType?.trim() || "service";
  const inputEntries =
    body.entries ??
    (body.urls ?? []).map((url) => ({
      url,
      oldSlug: oldSlugFromUrl(url),
      legacyPath: legacyPathFromUrl(url),
    }));

  if (inputEntries.length === 0) {
    return Response.json({ ok: false, error: "No URLs to scrape" }, { status: 400 });
  }

  if (inputEntries.length > MAX_BATCH_SIZE) {
    return Response.json(
      { ok: false, error: `Maximum ${MAX_BATCH_SIZE} URLs per batch` },
      { status: 400 },
    );
  }

  const urls = inputEntries.map((e) => e.url);
  const fetchResults = await fetchAndParseScrapeUrls(urls, { concurrency: 2 });

  const results: ScrapeBatchResultItem[] = fetchResults.map((result, index) => {
    const input = inputEntries[index]!;
    const oldSlug = input.oldSlug ?? oldSlugFromUrl(input.url);
    const legacyPath = input.legacyPath ?? legacyPathFromUrl(input.url);

    if (result.ok) {
      return {
        url: result.url,
        oldSlug,
        legacyPath,
        pageType,
        ok: true,
        preview: result.preview,
        error: null,
      };
    }

    return {
      url: result.url,
      oldSlug,
      legacyPath,
      pageType,
      ok: false,
      preview: null,
      error: "error" in result ? result.error : "Scrape failed",
    };
  });

  const okCount = results.filter((r) => r.ok).length;

  return Response.json({
    ok: true,
    pageType,
    stats: { total: results.length, ok: okCount, failed: results.length - okCount },
    results,
  });
}
