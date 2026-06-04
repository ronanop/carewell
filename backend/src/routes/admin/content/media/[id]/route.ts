import { isErrorResponse } from "@/lib/http";
import { requireAdminApi } from "@/lib/require-admin-api";
import { updateMedia } from "@/lib/cms/admin-write";
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
  await prisma.media.delete({ where: { id: params.id } }).catch(() => null);
  return Response.json({ ok: true });
}
