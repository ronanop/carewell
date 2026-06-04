import { notFound } from "next/navigation";
import { AdminContentHeader } from "@/components/admin/content/AdminContentHeader";
import { PageEditForm } from "@/components/admin/content/PageEditForm";
import { ADMIN_SITE_PAGES } from "@/config/admin-content-routes";
import { prisma } from "@carewell/backend/lib/db";

export default async function AdminSitePageEditPage({ params }: { params: { slug: string } }) {
  const page = await prisma.page.findUnique({ where: { slug: params.slug } });
  if (!page) notFound();

  return (
    <div>
      <AdminContentHeader
        title={page.title}
        description={`Site page · /pages/${page.slug}`}
        backHref={ADMIN_SITE_PAGES}
      />
      <PageEditForm
        initial={{
          id: page.id,
          slug: page.slug,
          title: page.title,
          excerpt: page.excerpt,
          body: page.body,
          published: page.published,
          seoTitle: page.seoTitle,
          seoDescription: page.seoDescription,
          seoNoindex: page.seoNoindex,
        }}
      />
      {page.published ? (
        <p className="mt-4 text-sm text-navy/60">
          Live at{" "}
          <a href={`/pages/${page.slug}`} target="_blank" rel="noreferrer" className="text-primary hover:underline">
            /pages/{page.slug}
          </a>
        </p>
      ) : null}
    </div>
  );
}
