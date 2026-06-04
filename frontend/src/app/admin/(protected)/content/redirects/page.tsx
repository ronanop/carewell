import { AdminContentHeader } from "@/components/admin/content/AdminContentHeader";
import { RedirectsManager } from "@/components/admin/content/RedirectsManager";
import { getRedirects } from "@carewell/backend/lib/cms/queries";

export default async function AdminRedirectsPage() {
  const redirects = await getRedirects();

  return (
    <div>
      <AdminContentHeader
        title="Redirects"
        description="Runtime redirects served from PostgreSQL (middleware)."
      />
      <RedirectsManager initial={redirects} />
    </div>
  );
}
