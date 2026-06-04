import { isErrorResponse } from "@/lib/http";
import { revalidatePaths } from "@/lib/revalidate";
import { requireAdminApi } from "@/lib/require-admin-api";
import { upsertPage } from "@/lib/cms/admin-write";
import { prisma } from "@/lib/db";

export async function GET() {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const pages = await prisma.page.findMany({ orderBy: { title: "asc" } });
  return Response.json({ ok: true, pages });
}

export async function POST(req: Request) {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const body = await req.json();
  if (!body.slug?.trim() || !body.title?.trim()) {
    return Response.json({ ok: false, error: "slug and title required" }, { status: 400 });
  }
  const id = await upsertPage(body);
  await revalidatePaths([`/pages/${body.slug}`]);
  return Response.json({ ok: true, id });
}
