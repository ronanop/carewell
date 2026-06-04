import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ADMIN_SESSION_COOKIE, isAdminAuthConfigured, verifySessionToken } from "@carewell/backend/lib/admin-auth";

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  if (!isAdminAuthConfigured()) {
    redirect("/admin/login");
  }

  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminShell session={{ sub: session.sub, exp: session.exp }}>
      {children}
    </AdminShell>
  );
}
