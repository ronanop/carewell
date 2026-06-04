import Link from "next/link";
import { AdminBarChart } from "@/components/admin/dashboard/AdminBarChart";
import { AdminPageHeader } from "@/components/admin/dashboard/AdminPageHeader";
import { AdminPanel } from "@/components/admin/dashboard/AdminPanel";
import { AdminRecentList } from "@/components/admin/dashboard/AdminRecentList";
import { AdminStatCard } from "@/components/admin/dashboard/AdminStatCard";
import { fetchAdminWebsiteStats } from "@carewell/backend/lib/admin-stats";

export default async function AdminWebsiteStatsPage() {
  const stats = await fetchAdminWebsiteStats();

  const contentItems = [
    { label: "Service categories", value: stats.categories },
    { label: "Gallery items", value: stats.gallery },
    { label: "Testimonials", value: stats.testimonials },
    { label: "Hyperlocal pages", value: stats.hyperlocal },
  ];

  return (
    <div className="space-y-8 pb-20 md:pb-8">
      <AdminPageHeader
        title="Website stats"
        description="Live counts from Sanity CMS and the generated sitemap. Refreshes on each page load."
        actions={
          <>
            <Link
              href="/admin/sitemap"
              className="inline-flex rounded-button bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              Browse sitemap
            </Link>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-button border border-border bg-white px-4 py-2 text-sm font-semibold text-navy"
            >
              sitemap.xml
            </a>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Sitemap URLs" value={stats.sitemapUrlCount} hint="Indexable routes" accent="teal" />
        <AdminStatCard
          label="Static pages"
          value={stats.staticPageCount}
          hint="Home, about, hubs, tools"
        />
        <AdminStatCard
          label="Pages — services (EN)"
          value={stats.services.en}
          hint={`${stats.services.missingSeo} missing SEO`}
          accent="primary"
        />
        <AdminStatCard
          label="Posts"
          value={stats.blog.total}
          hint={`${stats.blog.missingSeo} missing SEO`}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <AdminPanel title="Services by category" description="English locale service count per category">
          <AdminBarChart items={stats.byCategory.map((c) => ({ label: c.title, value: c.count }))} />
        </AdminPanel>

        <AdminPanel title="Content library" description="Other published document types">
          <AdminBarChart items={contentItems} />
        </AdminPanel>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <AdminPanel title="URL migration" description="Redirects preserving legacy SEO equity">
          <dl className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-surface/80 p-4">
              <dt className="text-xs font-semibold uppercase text-text-tertiary">Sanity redirects</dt>
              <dd className="mt-1 font-heading text-2xl font-bold text-navy">{stats.redirects.sanity}</dd>
            </div>
            <div className="rounded-xl bg-surface/80 p-4">
              <dt className="text-xs font-semibold uppercase text-text-tertiary">Build redirects</dt>
              <dd className="mt-1 font-heading text-2xl font-bold text-navy">
                {stats.redirects.migration}
              </dd>
            </div>
            <div className="rounded-xl bg-surface/80 p-4">
              <dt className="text-xs font-semibold uppercase text-text-tertiary">Legacy map</dt>
              <dd className="mt-1 font-heading text-2xl font-bold text-navy">
                {stats.redirects.legacyMap}
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-text-secondary">
            Run <code className="rounded bg-surface px-1 text-xs">npm run redirects:legacy</code> after
            updating <code className="rounded bg-surface px-1 text-xs">db/seed/legacy-url-map.json</code>.
          </p>
        </AdminPanel>

        <AdminPanel title="Site URL" description="Canonical base used for sitemap and metadata">
          <p className="break-all font-mono text-sm text-navy">{stats.siteUrl}</p>
          <a
            href={stats.siteUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-sm font-semibold text-primary hover:text-primary-hover"
          >
            Open production site →
          </a>
        </AdminPanel>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <AdminPanel title="Recent page updates">
          <AdminRecentList items={stats.recentServices} hrefPrefix="/services" />
        </AdminPanel>
        <AdminPanel title="Recent post updates">
          <AdminRecentList items={stats.recentBlog} hrefPrefix="/blog" />
        </AdminPanel>
      </section>
    </div>
  );
}
