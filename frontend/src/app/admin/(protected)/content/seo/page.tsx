import { AdminContentHeader } from "@/components/admin/content/AdminContentHeader";
import { GlobalSeoForm } from "@/components/admin/content/GlobalSeoForm";
import { getSiteSettings } from "@carewell/backend/lib/cms/queries";

export default async function AdminGlobalSeoPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <AdminContentHeader
        title="Global SEO"
        description="Default title and meta description used when pages do not define their own SEO fields."
      />
      <GlobalSeoForm
        initial={{
          globalSeoTitle: settings?.globalSeoTitle,
          globalSeoDescription: settings?.globalSeoDescription,
        }}
      />
    </div>
  );
}
