import Link from "next/link";
import { AdminContentHeader } from "@/components/admin/content/AdminContentHeader";
import { btnPrimary, selectClass } from "@/components/admin/content/admin-form-styles";
import { updateSubmissionStatus } from "@/app/admin/(protected)/content/forms/actions";
import { prisma } from "@carewell/backend/lib/db";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "archived", label: "Archived" },
] as const;

export default async function AdminFormsPage({
  searchParams,
}: {
  searchParams?: { status?: string };
}) {
  const filter = searchParams?.status ?? "all";
  const submissions = await prisma.formSubmission.findMany({
    where: filter === "all" ? undefined : { status: filter },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <AdminContentHeader
        title="Form submissions"
        description="All leads and contact forms saved from the website. Mark as read or archive when handled."
      />

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((item) => {
            const active = filter === item.value;
            const href =
              item.value === "all"
                ? "/admin/content/forms"
                : `/admin/content/forms?status=${item.value}`;
            return (
              <Link
                key={item.value}
                href={href}
                className={`rounded-button px-3 py-1.5 text-sm font-semibold ${
                  active
                    ? "bg-primary text-white"
                    : "border border-border bg-white text-navy hover:border-teal/40"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/admin/content/forms" className={`${btnPrimary} ml-auto`}>
            Refresh
          </Link>
        </div>

        <div className="overflow-hidden rounded-card border border-border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-surface/50 text-xs uppercase text-navy/60">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Treatment</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id} className="border-b border-border/50">
                  <td className="px-4 py-3 text-xs text-navy/60">
                    {s.createdAt.toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3">
                    <a href={`tel:${s.phone}`} className="text-primary hover:underline">
                      {s.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3">{s.treatment ?? "—"}</td>
                  <td className="px-4 py-3 text-xs">{s.source ?? s.formType}</td>
                  <td className="px-4 py-3">
                    <form action={updateSubmissionStatus} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={s.id} />
                      <select
                        name="status"
                        defaultValue={s.status}
                        className={`${selectClass} w-auto py-1 text-xs`}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="archived">Archived</option>
                      </select>
                      <button
                        type="submit"
                        className="rounded border border-border px-2 py-1 text-xs font-medium text-navy hover:border-teal/40"
                      >
                        Save
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {submissions.length === 0 ? (
            <p className="p-6 text-sm text-navy/60">No form submissions yet.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
