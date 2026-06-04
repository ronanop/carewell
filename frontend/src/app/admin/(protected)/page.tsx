import Link from "next/link";
import { Globe, Layers, Route, Users } from "lucide-react";
import { AdminEnvChecklist } from "@/components/admin/dashboard/AdminEnvChecklist";
import { AdminPageHeader } from "@/components/admin/dashboard/AdminPageHeader";
import { AdminPanel } from "@/components/admin/dashboard/AdminPanel";
import { AdminQuickActions } from "@/components/admin/dashboard/AdminQuickActions";
import { AdminRecentList } from "@/components/admin/dashboard/AdminRecentList";
import { AdminStatCard } from "@/components/admin/dashboard/AdminStatCard";
import { fetchAdminDashboardSnapshot } from "@carewell/backend/lib/admin-stats";

export default async function AdminDashboardPage() {
  const data = await fetchAdminDashboardSnapshot();
  const seoOk =
    data.services.total > 0
      ? Math.round(
          ((data.services.total - data.services.missingSeo) / data.services.total) * 100,
        )
      : 100;

  return (
    <div className="space-y-8 pb-20 md:pb-8">
      <AdminPageHeader
        title="Dashboard"
        description="Operations overview for Care Well Medical Centre — content, SEO, leads, and deploy readiness."
        actions={
          <a
            href={data.siteUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-button border border-border bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-teal/40"
          >
            View live site
          </a>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="Indexable URLs"
          value={data.sitemapUrlCount}
          hint="Sitemap.xml entries"
          accent="teal"
          icon={<Globe size={22} aria-hidden />}
        />
        <AdminStatCard
          label="Pages (services)"
          value={data.services.en}
          hint={`${data.services.total} total · ${data.services.hi} Hindi`}
          accent="primary"
          icon={<Layers size={22} aria-hidden />}
        />
        <AdminStatCard
          label="Posts"
          value={data.blog.total}
          hint={`${data.blog.featured} featured · /blog`}
        />
        <AdminStatCard
          label="Legacy redirects"
          value={data.redirects.migration}
          hint={`${data.redirects.legacyMap} mapped in legacy-url-map`}
          accent="default"
          icon={<Route size={22} aria-hidden />}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-card border border-border bg-white p-5 shadow-card lg:col-span-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
                Deploy readiness
              </p>
              <p className="mt-1 font-heading text-xl font-bold text-navy">
                {data.deployScore.ok} / {data.deployScore.total} checks passed
              </p>
            </div>
            <Link
              href="/admin/seo"
              className="text-sm font-semibold text-primary hover:text-primary-hover"
            >
              SEO details →
            </Link>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal to-primary"
              style={{
                width: `${Math.round((data.deployScore.ok / data.deployScore.total) * 100)}%`,
              }}
            />
          </div>
          <div className="mt-6">
            <AdminEnvChecklist checks={data.envChecks.slice(0, 4)} />
          </div>
        </div>

        <AdminStatCard
          label="Lead pipeline"
          value={`${data.leadsConfigured} / ${data.leadsTotal}`}
          hint="Configured notification channels"
          accent={data.leadsConfigured > 0 ? "teal" : "warn"}
          icon={<Users size={22} aria-hidden />}
          trend={{
            label: data.leadsConfigured > 0 ? "Receiving submissions" : "Configure webhooks in env",
            positive: data.leadsConfigured > 0,
          }}
        />
      </section>

      <section>
        <h2 className="mb-4 font-heading text-heading-sm text-navy">Quick actions</h2>
        <AdminQuickActions />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <AdminPanel title="Recently updated pages" description="Latest service page edits">
          <AdminRecentList items={data.recentServices} hrefPrefix="/services" />
        </AdminPanel>
        <AdminPanel title="SEO snapshot" description="Service pages with meta tags">
          <p className="font-heading text-4xl font-bold text-navy">{seoOk}%</p>
          <p className="mt-2 text-sm text-text-secondary">
            {data.services.missingSeo} service(s) missing title or description.
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            {data.services.missingFaq} service(s) with fewer than 8 FAQs.
          </p>
          <Link
            href="/admin/seo"
            className="mt-4 inline-flex text-sm font-semibold text-primary hover:text-primary-hover"
          >
            View SEO issues →
          </Link>
        </AdminPanel>
      </section>
    </div>
  );
}
