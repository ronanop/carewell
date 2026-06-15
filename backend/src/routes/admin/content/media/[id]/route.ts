import { isErrorResponse } from "@/lib/http";
import { requireAdminApi } from "@/lib/require-admin-api";
import { updateMedia } from "@/lib/cms/admin-write";
import { deleteStoredMedia } from "@/lib/cms/upload";
import { prisma } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const { alt, filename } = await req.json();
  try {
    await updateMedia(params.id, { alt, filename });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const row = await prisma.media.findUnique({
    where: { id: params.id },
    select: { path: true, mimeType: true },
  });
  if (row) {
    try {
      await deleteStoredMedia(row);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Cloudinary delete failed";
      return Response.json({ ok: false, error: message }, { status: 500 });
    }
    await prisma.media.delete({ where: { id: params.id } }).catch(() => null);
  }
  return Response.json({ ok: true });
}
