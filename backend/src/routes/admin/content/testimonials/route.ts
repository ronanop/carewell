import { isErrorResponse } from "@/lib/http";
import { requireAdminApi } from "@/lib/require-admin-api";
import { upsertTestimonial } from "@/lib/cms/admin-write";
import { prisma } from "@/lib/db";

export async function GET() {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const items = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
  return Response.json({ ok: true, items });
}

export async function POST(req: Request) {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const body = await req.json();
  if (!body.quote?.trim()) {
    return Response.json({ ok: false, error: "quote required" }, { status: 400 });
  }
  const id = await upsertTestimonial(body);
  return Response.json({ ok: true, id });
}
