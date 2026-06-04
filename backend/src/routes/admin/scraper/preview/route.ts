import { isErrorResponse } from "@/lib/http";
import { requireAdminApi } from "@/lib/require-admin-api";
import { fetchAndParseScrapeUrl } from "@/lib/scraper-fetch";
import { getScraperDefaultBaseUrl } from "@/lib/scraper-url";
import { legacyPathFromUrl, oldSlugFromUrl } from "@/lib/scraper-slug";
export async function POST(req: Request) {
  const authResult = await requireAdminApi();
  if (isErrorResponse(authResult)) return authResult;

  let body: { url?: string; pageType?: string; slug?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const base = getScraperDefaultBaseUrl();
  const rawUrl = (body.url?.trim() || base).slice(0, 2048);
  const result = await fetchAndParseScrapeUrl(rawUrl);

  if (!result.ok) {
    const err = "error" in result ? result.error : "Scrape failed";
    const status =
      err.includes("not allowed") || err.includes("disallowed")
        ? 400
        : err.includes("too large")
          ? 413
          : 502;
    return Response.json({ ok: false, error: err }, { status });
  }

  const slugOverride = body.slug?.trim();
  const oldSlug = slugOverride || oldSlugFromUrl(result.url);

  return Response.json({
    ok: true,
    pageType: body.pageType ?? "service",
    slug: slugOverride || null,
    oldSlug,
    legacyPath: legacyPathFromUrl(result.url),
    preview: result.preview,
  });
}
