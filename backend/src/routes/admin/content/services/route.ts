import { isErrorResponse } from "@/lib/http";
import { revalidateServicePaths } from "@/lib/revalidate-service";
import { requireAdminApi } from "@/lib/require-admin-api";
import { upsertServiceFromAdmin, type ServiceAdminPayload } from "@/lib/cms/admin-write";
import { listServicesForAdmin } from "@/lib/cms/queries";

export async function GET(req: Request) {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? undefined;
  const services = await listServicesForAdmin(q ?? undefined);
  return Response.json({ ok: true, services });
}

export async function POST(req: Request) {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;

  const body = (await req.json()) as ServiceAdminPayload;
  if (!body.slug?.trim() || !body.title?.trim()) {
    return Response.json({ ok: false, error: "slug and title required" }, { status: 400 });
  }

  try {
    const id = await upsertServiceFromAdmin(body);
    await revalidateServicePaths(body.legacyPath ?? null, body.slug);
    return Response.json({ ok: true, id });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Save failed";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
