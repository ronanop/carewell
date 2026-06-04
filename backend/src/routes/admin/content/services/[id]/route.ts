import { isErrorResponse } from "@/lib/http";
import { requireAdminApi } from "@/lib/require-admin-api";
import { getServiceForAdmin } from "@/lib/cms/queries";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const service = await getServiceForAdmin(params.id);
  if (!service) return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  return Response.json({ ok: true, service });
}
