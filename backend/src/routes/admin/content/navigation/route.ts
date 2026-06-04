import { isErrorResponse } from "@/lib/http";
import { revalidatePaths } from "@/lib/revalidate";
import { requireAdminApi } from "@/lib/require-admin-api";
import { upsertNavigation } from "@/lib/cms/admin-write";
import { getNavigation } from "@/lib/cms/queries";

export async function GET() {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const navigation = await getNavigation();
  return Response.json({ ok: true, navigation });
}

export async function POST(req: Request) {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const body = await req.json();
  await upsertNavigation(body);
  await revalidatePaths(["/"], { layout: true });
  return Response.json({ ok: true });
}
