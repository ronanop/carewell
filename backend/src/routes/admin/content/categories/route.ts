import { isErrorResponse } from "@/lib/http";
import { revalidatePaths } from "@/lib/revalidate";
import { requireAdminApi } from "@/lib/require-admin-api";
import { upsertCategory } from "@/lib/cms/admin-write";
import { getCategoriesWithServices } from "@/lib/cms/queries";
export async function GET() {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const categories = await getCategoriesWithServices();
  return Response.json({ ok: true, categories });
}

export async function POST(req: Request) {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const body = await req.json();
  if (!body.slug || !body.title) {
    return Response.json({ ok: false, error: "slug and title required" }, { status: 400 });
  }
  const id = await upsertCategory(body);
  await revalidatePaths(["/treatments", `/treatments/${body.slug}`]);
  return Response.json({ ok: true, id });
}
