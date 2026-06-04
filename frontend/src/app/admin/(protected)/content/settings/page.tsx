import { AdminContentHeader } from "@/components/admin/content/AdminContentHeader";
import { SettingsForm } from "@/components/admin/content/SettingsForm";
import { getSiteSettings } from "@carewell/backend/lib/cms/queries";

export default async function AdminSettingsPage() {
  const settings = (await getSiteSettings()) ?? {};

  return (
    <div>
      <AdminContentHeader title="Site settings" description="Contact info, analytics, hours, trust badges, and hello bar." />
      <SettingsForm initial={settings} />
    </div>
  );
}
