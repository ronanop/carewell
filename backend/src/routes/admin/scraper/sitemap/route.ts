import { isErrorResponse } from "@/lib/http";
import { requireAdminApi } from "@/lib/require-admin-api";
import { parseSitemapXml } from "@/lib/scraper-sitemap";
const MAX_BODY_CHARS = 5_000_000;

export async function POST(req: Request) {
  const authResult = await requireAdminApi();
  if (isErrorResponse(authResult)) return authResult;

  const contentType = req.headers.get("content-type") ?? "";
  let xml = "";

  try {
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const file = form.get("file");
      if (!(file instanceof File)) {
        return Response.json({ ok: false, error: "No sitemap file uploaded" }, { status: 400 });
      }
      if (!file.name.toLowerCase().endsWith(".xml") && file.type && !file.type.includes("xml")) {
        return Response.json(
          { ok: false, error: "Upload a .xml sitemap file" },
          { status: 400 },
        );
      }
      xml = await file.text();
    } else {
      const body = (await req.json()) as { xml?: string };
      xml = body.xml?.trim() ?? "";
      if (!xml) {
        return Response.json({ ok: false, error: "Missing sitemap XML" }, { status: 400 });
      }
    }
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  if (xml.length > MAX_BODY_CHARS) {
    return Response.json({ ok: false, error: "Sitemap too large" }, { status: 413 });
  }

  try {
    const { entries, childSitemapsFetched, skipped, pageLocsInFile, childSitemapLocsInFile } =
      await parseSitemapXml(xml);
    return Response.json({
      ok: true,
      count: entries.length,
      childSitemapsFetched,
      skipped,
      pageLocsInFile,
      childSitemapLocsInFile,
      entries,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to parse sitemap";
    return Response.json({ ok: false, error: message }, { status: 400 });
  }
}
