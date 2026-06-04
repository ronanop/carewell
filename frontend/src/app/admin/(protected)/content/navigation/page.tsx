import { AdminContentHeader } from "@/components/admin/content/AdminContentHeader";
import { JsonEditorForm } from "@/components/admin/content/JsonEditorForm";
import { getNavigation } from "@carewell/backend/lib/cms/queries";

export default async function AdminNavigationPage() {
  const nav = await getNavigation();

  return (
    <div className="space-y-10">
      <AdminContentHeader title="Navigation" description="Main nav items and footer columns (JSON)." />
      <JsonEditorForm
        apiPath="/api/admin/content/navigation"
        field="items"
        label="Header navigation items"
        initial={nav?.items}
      />
      <JsonEditorForm
        apiPath="/api/admin/content/navigation"
        field="footerColumns"
        label="Footer columns"
        initial={nav?.footerColumns}
      />
    </div>
  );
}
