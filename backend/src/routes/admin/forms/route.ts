import { isErrorResponse } from "@/lib/http";
import { requireAdminApi } from "@/lib/require-admin-api";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? undefined;
  const take = Math.min(Number(searchParams.get("limit") ?? 50), 200);

  const submissions = await prisma.formSubmission.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    take,
  });

  const counts = await prisma.formSubmission.groupBy({
    by: ["status"],
    _count: { id: true },
  });

  return Response.json({
    ok: true,
    submissions,
    counts: Object.fromEntries(counts.map((c) => [c.status, c._count.id])),
  });
}

export async function PATCH(req: Request) {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;

  const { id, status } = await req.json();
  if (!id || !status) {
    return Response.json({ ok: false, error: "id and status required" }, { status: 400 });
  }

  await prisma.formSubmission.update({ where: { id }, data: { status } });
  return Response.json({ ok: true });
}
