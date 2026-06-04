import { getRedirects } from "@/lib/cms/queries";
import { isPrismaCmsEnabled } from "@/lib/cms/provider";

export const revalidate = 60;

export async function GET() {
  if (!isPrismaCmsEnabled()) {
    return Response.json({ redirects: [] });
  }
  try {
    const redirects = await getRedirects();
    return Response.json(
      { redirects },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } },
    );
  } catch {
    return Response.json({ redirects: [] }, { status: 500 });
  }
}
