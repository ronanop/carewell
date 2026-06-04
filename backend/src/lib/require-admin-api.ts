import {
  ADMIN_SESSION_COOKIE,
  isAdminAuthConfigured,
  verifySessionToken,
  type AdminSession,
} from "@/lib/admin-auth";
import { getActiveRequest } from "@/lib/request-context";
import { getCookie } from "@/lib/http";

type AdminApiOk = { session: AdminSession };

export async function requireAdminApi(): Promise<AdminApiOk | Response> {
  if (!isAdminAuthConfigured()) {
    return Response.json(
      { ok: false, error: "Admin login is not configured on this server." },
      { status: 503 },
    );
  }

  const req = getActiveRequest();
  const token = req ? getCookie(req, ADMIN_SESSION_COOKIE) : undefined;
  const session = await verifySessionToken(token);
  if (!session) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  return { session };
}
