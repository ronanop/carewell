import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";
import { clearSessionCookie } from "@/lib/http";

export async function POST() {
  return clearSessionCookie(ADMIN_SESSION_COOKIE);
}
