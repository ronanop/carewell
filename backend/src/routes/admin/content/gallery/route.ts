import { isErrorResponse } from "@/lib/http";
import { requireAdminApi } from "@/lib/require-admin-api";
import { upsertGalleryItem } from "@/lib/cms/admin-write";
import { prisma } from "@/lib/db";

export async function GET() {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
    include: { beforeImage: true, afterImage: true },
  });
  return Response.json({ ok: true, items });
}

export async function POST(req: Request) {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const body = await req.json();
  if (!body.title?.trim()) {
    return Response.json({ ok: false, error: "title required" }, { status: 400 });
  }
  const id = await upsertGalleryItem(body);
  return Response.json({ ok: true, id });
}
