import { AdminContentHeader } from "@/components/admin/content/AdminContentHeader";
import { PageEditForm } from "@/components/admin/content/PageEditForm";
import { ADMIN_SITE_PAGES } from "@/config/admin-content-routes";

export default function AdminNewSitePage() {
  return (
    <div>
      <AdminContentHeader title="New site page" backHref={ADMIN_SITE_PAGES} />
      <PageEditForm
        initial={{
          slug: "",
          title: "",
          excerpt: "",
          published: false,
          seoTitle: "",
          seoDescription: "",
          seoNoindex: false,
        }}
      />
    </div>
  );
}
