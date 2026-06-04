import Link from "next/link";
import { AdminContentHeader } from "@/components/admin/content/AdminContentHeader";
import { ADMIN_PAGES_HUB, ADMIN_SITE_PAGES } from "@/config/admin-content-routes";
import { prisma } from "@carewell/backend/lib/db";

export default async function AdminSitePagesListPage() {
  const pages = await prisma.page.findMany({ orderBy: { title: "asc" } });

  return (
    <div>
      <AdminContentHeader
        title="Site pages"
        description="Static pages such as About and Privacy — live at /pages/{slug}."
        backHref={ADMIN_PAGES_HUB}
        actions={
          <Link
            href={`${ADMIN_SITE_PAGES}/new`}
            prefetch={false}
            className="rounded-button bg-primary px-4 py-2 text-sm font-semibold text-white"
          >
            New site page
          </Link>
        }
      />
      <div className="overflow-hidden rounded-card border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-surface/50 text-xs uppercase text-navy/60">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {pages.map((p) => (
              <tr key={p.id} className="border-b border-border/60">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-navy/70">/pages/{p.slug}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      p.published
                        ? "rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success"
                        : "rounded-full bg-surface px-2 py-0.5 text-xs font-semibold text-navy/50"
                    }
                  >
                    {p.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`${ADMIN_SITE_PAGES}/${encodeURIComponent(p.slug)}`}
                    prefetch={false}
                    className="text-primary hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pages.length === 0 ? (
          <p className="p-6 text-sm text-navy/60">No site pages yet. Create your first page.</p>
        ) : null}
      </div>
    </div>
  );
}
