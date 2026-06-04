import { isErrorResponse } from "@/lib/http";
import { requireAdminApi } from "@/lib/require-admin-api";
import { upsertRedirect, deleteRedirect } from "@/lib/cms/admin-write";
import { prisma } from "@/lib/db";

export async function GET() {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const redirects = await prisma.redirect.findMany({ orderBy: { fromPath: "asc" }, take: 500 });
  return Response.json({ ok: true, redirects });
}

export async function POST(req: Request) {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const { fromPath, toPath, statusCode } = await req.json();
  if (!fromPath || !toPath) {
    return Response.json({ ok: false, error: "fromPath and toPath required" }, { status: 400 });
  }
  await upsertRedirect(fromPath, toPath, statusCode ?? 301);
  return Response.json({ ok: true });
}

export async function DELETE(req: Request) {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const { fromPath } = await req.json();
  if (!fromPath) return Response.json({ ok: false, error: "fromPath required" }, { status: 400 });
  await deleteRedirect(fromPath);
  return Response.json({ ok: true });
}
