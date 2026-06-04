import { isErrorResponse } from "@/lib/http";
import { requireAdminApi } from "@/lib/require-admin-api";
import { prisma } from "@/lib/db";

export async function GET() {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    select: {
      id: true,
      url: true,
      filename: true,
      alt: true,
      mimeType: true,
      createdAt: true,
    },
  });
  return Response.json({
    ok: true,
    media: media.map((m) => ({ ...m, createdAt: m.createdAt.toISOString() })),
  });
}
