import { AdminContentHeader } from "@/components/admin/content/AdminContentHeader";
import { LocationsAdminList } from "@/components/admin/content/CmsLists";
import { prisma } from "@carewell/backend/lib/db";

export default async function AdminLocationsPage() {
  const pages = await prisma.hyperlocalPage.findMany({ orderBy: { title: "asc" } });

  return (
    <div>
      <AdminContentHeader
        title="Location pages"
        description="Hyperlocal SEO pages for areas near the clinic (Noida, Gurgaon, Faridabad, etc.)."
      />
      <LocationsAdminList
        initial={pages.map((p) => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          areaName: p.areaName,
        }))}
      />
    </div>
  );
}
