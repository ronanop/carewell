import Link from "next/link";
import { AdminContentHeader } from "@/components/admin/content/AdminContentHeader";
import { getCategoriesWithServices } from "@carewell/backend/lib/cms/queries";

export default async function AdminCategoriesPage() {
  const categories = await getCategoriesWithServices();

  return (
    <div>
      <AdminContentHeader title="Treatment categories" description="Hub pages under /treatments/[slug]." />
      <div className="overflow-hidden rounded-card border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-surface/50 text-xs uppercase text-navy/60">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Services</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.slug} className="border-b border-border/60">
                <td className="px-4 py-3 font-medium">{c.title}</td>
                <td className="px-4 py-3 text-navy/70">{c.slug}</td>
                <td className="px-4 py-3">{c.services?.length ?? 0}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/content/categories/${encodeURIComponent(c.slug)}`}
                    className="text-primary hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
