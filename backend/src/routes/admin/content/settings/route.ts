import { isErrorResponse } from "@/lib/http";
import { revalidatePaths } from "@/lib/revalidate";
import { requireAdminApi } from "@/lib/require-admin-api";
import { upsertSiteSettings } from "@/lib/cms/admin-write";
import { getSiteSettings } from "@/lib/cms/queries";

export async function GET() {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const settings = await getSiteSettings();
  return Response.json({ ok: true, settings });
}

export async function POST(req: Request) {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const body = await req.json();
  await upsertSiteSettings(body);
  await revalidatePaths(["/"], { layout: true });
  return Response.json({ ok: true });
}
