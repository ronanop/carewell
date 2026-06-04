import {
  ADMIN_SESSION_COOKIE,
  createAdminSession,
  isAdminLoginAvailable,
  sessionCookieOptions,
  touchAdminUserLogin,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import { jsonWithCookie } from "@/lib/http";

export async function POST(req: Request) {
  try {
    if (!(await isAdminLoginAvailable())) {
      return Response.json(
        { ok: false, error: "Admin login is not configured on this server." },
        { status: 503 },
      );
    }

    let body: { password?: string; email?: string };
    try {
      body = await req.json();
    } catch {
      return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
    }

    const password = body.password ?? "";
    const email = body.email?.trim();
    if (!password) {
      return Response.json({ ok: false, error: "Password is required" }, { status: 422 });
    }

    const valid = await verifyAdminPassword(password, email);
    if (!valid) {
      return Response.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    }

    if (email) await touchAdminUserLogin(email);

    const { token } = await createAdminSession(email);
    return jsonWithCookie(
      { ok: true },
      { name: ADMIN_SESSION_COOKIE, value: token, options: sessionCookieOptions() },
    );
  } catch (err) {
    console.error("[admin/login]", err);
    return Response.json({ ok: false, error: "Login failed. Check server logs." }, { status: 500 });
  }
}
