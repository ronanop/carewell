import { AdminContentHeader } from "@/components/admin/content/AdminContentHeader";
import { TeamManager } from "@/components/admin/content/TeamManager";
import { prisma } from "@carewell/backend/lib/db";

export default async function AdminTeamPage() {
  const users = await prisma.adminUser.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <AdminContentHeader
        title="Team"
        description="Add editors and admins who can sign in with email and password. Env-based admin login still works for the primary account."
      />
      <TeamManager
        initial={users.map((u) => ({
          id: u.id,
          email: u.email,
          name: u.name,
          role: u.role,
          active: u.active,
          lastLoginAt: u.lastLoginAt?.toISOString() ?? null,
        }))}
      />
    </div>
  );
}
