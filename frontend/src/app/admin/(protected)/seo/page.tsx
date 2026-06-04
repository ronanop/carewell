import Link from "next/link";
import { AdminEnvChecklist } from "@/components/admin/dashboard/AdminEnvChecklist";
import { AdminPageHeader } from "@/components/admin/dashboard/AdminPageHeader";
import { AdminPanel } from "@/components/admin/dashboard/AdminPanel";
import { AdminStatCard } from "@/components/admin/dashboard/AdminStatCard";
import { AdminStatusPill } from "@/components/admin/dashboard/AdminStatusPill";
import {
  fetchAdminWebsiteStats,
  fetchSeoIssues,
  getEnvChecks,
} from "@carewell/backend/lib/admin-stats";

export default async function AdminSeoPage() {
  const [stats, issues, envChecks] = await Promise.all([
    fetchAdminWebsiteStats(),
    fetchSeoIssues(),
    Promise.resolve(getEnvChecks()),
  ]);

  const serviceSeoPct =
    stats.services.en > 0
      ? Math.round(
          ((stats.services.en - stats.services.missingSeo) / stats.services.en) * 100,
        )
      : 100;

  return (
    <div className="space-y-8 pb-20 md:pb-8">
      <AdminPageHeader
        title="SEO & deploy health"
        description="Meta coverage, redirect inventory, and production environment checks."
        actions={
          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-button border border-border bg-white px-4 py-2 text-sm font-semibold text-navy"
          >
            Google Search Console
          </a>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          label="Service SEO coverage"
          value={`${serviceSeoPct}%`}
          hint={`${stats.services.missingSeo} pages need title/description`}
          accent={stats.services.missingSeo === 0 ? "teal" : "warn"}
        />
        <AdminStatCard
          label="FAQ completeness"
          value={stats.services.missingFaq}
          hint="Services with fewer than 8 FAQs"
          accent={stats.services.missingFaq === 0 ? "teal" : "warn"}
        />
        <AdminStatCard label="Sitemap URLs" value={stats.sitemapUrlCount} hint="Submit to GSC after deploy" />
        <AdminStatCard
          label="Open issues"
          value={issues.length}
          hint={issues.length > 40 ? "Showing first 40 in list" : "From Sanity audit query"}
          accent={issues.length === 0 ? "teal" : "warn"}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <AdminPanel title="Production checklist" description="Environment variables for SEO & deploy">
          <AdminEnvChecklist checks={envChecks} />
        </AdminPanel>

        <AdminPanel title="SEO tooling" description="Scripts and public endpoints">
          <ul className="space-y-3 text-sm text-text-secondary">
            <li className="flex items-center justify-between gap-2">
              <span>
                <code className="rounded bg-surface px-1 text-xs">npm run seo:audit</code>
              </span>
              <AdminStatusPill status="neutral" label="CLI" />
            </li>
            <li className="flex items-center justify-between gap-2">
              <Link href="/robots.txt" target="_blank" className="font-medium text-primary">
                /robots.txt
              </Link>
              <AdminStatusPill status="ok" label="Live" />
            </li>
            <li className="flex items-center justify-between gap-2">
              <Link href="/sitemap.xml" target="_blank" className="font-medium text-primary">
                /sitemap.xml
              </Link>
              <AdminStatusPill status="ok" label="Live" />
            </li>
            <li className="flex items-center justify-between gap-2">
              <span>ISR webhook</span>
              <AdminStatusPill
                status={process.env.SANITY_REVALIDATE_SECRET ? "ok" : "warn"}
                label={process.env.SANITY_REVALIDATE_SECRET ? "Configured" : "Set secret"}
              />
            </li>
          </ul>
        </AdminPanel>
      </section>

      <AdminPanel
        title="Pages needing attention"
        description="Fix in Sanity Studio → open the document and complete SEO + FAQs"
        footer={
          issues.length > 0 ? (
            <Link href="/studio" className="text-sm font-semibold text-primary hover:text-primary-hover">
              Open Sanity Studio →
            </Link>
          ) : null
        }
      >
        {issues.length === 0 ? (
          <p className="text-sm text-success font-medium">
            All audited services and blog posts have basic SEO fields filled.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs font-semibold uppercase text-text-tertiary">
                  <th className="pb-3 pr-4">Type</th>
                  <th className="pb-3 pr-4">Page</th>
                  <th className="pb-3">Issue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {issues.map((row) => (
                  <tr key={`${row.type}-${row.slug}`}>
                    <td className="py-3 pr-4 capitalize text-text-secondary">{row.type}</td>
                    <td className="py-3 pr-4">
                      <Link
                        href={row.type === "service" ? `/services/${row.slug}` : `/blog/${row.slug}`}
                        target="_blank"
                        className="font-medium text-navy hover:text-primary"
                      >
                        {row.title}
                      </Link>
                    </td>
                    <td className="py-3 text-text-secondary">{row.issue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminPanel>
    </div>
  );
}
