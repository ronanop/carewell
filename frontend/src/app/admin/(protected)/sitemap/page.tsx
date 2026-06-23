import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/dashboard/AdminPageHeader";
import { groupLegacySitemapEntries, loadLegacyScrapeSitemap } from "@carewell/backend/lib/legacy-sitemap";
import { buildMetadataSitemap } from "@carewell/backend/lib/site-sitemap";
import { getSiteUrl } from "@carewell/backend/lib/site";

type SitemapGroup = {
  label: string;
  paths: string[];
};

function groupSitemapPaths(urls: string[]): SitemapGroup[] {
  const buckets: Record<string, string[]> = {
    "Static & marketing": [],
    Services: [],
    Blog: [],
    "Treatment categories": [],
    Other: [],
  };

  for (const url of urls) {
    let path = "/";
    try {
      path = new URL(url).pathname.replace(/\/$/, "") || "/";
    } catch {
      buckets.Other.push(url);
      continue;
    }

    if (path.startsWith("/services/")) buckets.Services.push(path);
    else if (path.startsWith("/blog/")) buckets.Blog.push(path);
    else if (path.startsWith("/treatments/")) buckets["Treatment categories"].push(path);
    else buckets["Static & marketing"].push(path);
  }

  for (const key of Object.keys(buckets)) {
    buckets[key]!.sort((a, b) => a.localeCompare(b));
  }

  return [
    { label: "Static & marketing", paths: buckets["Static & marketing"]! },
    { label: "Services", paths: buckets.Services! },
    { label: "Blog", paths: buckets.Blog! },
    { label: "Treatment categories", paths: buckets["Treatment categories"]! },
    { label: "Other", paths: buckets.Other! },
  ].filter((g) => g.paths.length > 0);
}

export default async function AdminSitemapPage() {
  const base = getSiteUrl().replace(/\/$/, "");
  const legacyEntries = loadLegacyScrapeSitemap();
  const legacyGroups = groupLegacySitemapEntries(legacyEntries);
  const entries = await buildMetadataSitemap(base);
  const urls = entries.map((e) => e.url);
  const groups = groupSitemapPaths(urls);

  return (
    <div className="space-y-8 pb-20 md:pb-8">
      <AdminPageHeader
        title="Site sitemap"
        description="Legacy WordPress URLs from the old sitemap plus all URLs in the current /sitemap.xml."
        actions={
          <>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-button bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              Open sitemap.xml
            </a>
            <span className="inline-flex items-center rounded-full bg-surface px-3 py-1.5 text-sm font-semibold text-navy">
              {legacyEntries.length} legacy · {urls.length} live
            </span>
          </>
        }
      />
      <p className="text-sm text-text-secondary">
        Base URL: <span className="font-mono text-navy">{base}</span>
      </p>

      <div className="space-y-4">
        <div>
          <h2 className="font-heading text-heading-sm text-navy">Legacy site sitemap</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Imported from <code className="rounded bg-surface px-1 text-xs">db/seed/legacy-scrape-sitemap.xml</code>
            . Click a path to open it on this site (redirects may apply). Use{" "}
            <span className="font-medium text-navy">Open original</span> for the live legacy URL.
          </p>
        </div>

        {legacyGroups.length === 0 ? (
          <p className="rounded-card border border-border bg-white px-4 py-6 text-sm text-navy/60">
            No legacy sitemap file found.
          </p>
        ) : (
          legacyGroups.map((group) => (
            <section
              key={`legacy-${group.label}`}
              className="overflow-hidden rounded-card border border-amber-200/80 bg-amber-50/30 shadow-card"
            >
              <div className="flex items-center justify-between border-b border-amber-200/60 bg-amber-50/50 px-4 py-3">
                <h3 className="font-heading text-sm font-semibold text-navy">{group.label}</h3>
                <span className="text-xs font-semibold text-navy/50">{group.entries.length}</span>
              </div>
              <ul className="max-h-[24rem] divide-y divide-border/80 overflow-y-auto bg-white">
                {group.entries.map((entry) => (
                  <li key={entry.url}>
                    <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-sm hover:bg-surface/60">
                      <Link
                        href={entry.path}
                        className="font-mono text-primary underline-offset-2 hover:underline"
                      >
                        {entry.path}
                      </Link>
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 text-xs font-medium text-navy/55 hover:text-primary"
                      >
                        Open original ↗
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>

      <div className="space-y-4 border-t border-border pt-6">
        <div>
          <h2 className="font-heading text-heading-sm text-navy">Current site sitemap</h2>
          <p className="mt-1 text-sm text-text-secondary">
            URLs included in the generated <code className="rounded bg-surface px-1 text-xs">/sitemap.xml</code> today.
          </p>
        </div>

        {groups.map((group) => (
          <section
            key={group.label}
            className="overflow-hidden rounded-card border border-border bg-white shadow-card"
          >
            <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
              <h3 className="font-heading text-sm font-semibold text-navy">{group.label}</h3>
              <span className="text-xs font-semibold text-text-tertiary">{group.paths.length}</span>
            </div>
            <ul className="max-h-[28rem] divide-y divide-border overflow-y-auto">
              {group.paths.map((path) => (
                <li key={path}>
                  <Link
                    href={path}
                    className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-sm transition hover:bg-surface/80"
                  >
                    <span className="font-mono text-primary underline-offset-2 hover:underline">{path}</span>
                    <span className="text-xs text-text-tertiary">
                      {base}
                      {path === "/" ? "" : path}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="text-sm text-text-secondary">
        Legacy URLs are also listed in <code className="rounded bg-surface px-1 text-xs">db/redirects.migration.json</code>
        . Site content is managed in Sanity Studio and import scripts, not in this admin panel.
      </p>

      <Link href="/admin" className="text-sm font-semibold text-primary hover:text-primary-hover">
        ← Back to dashboard
      </Link>
    </div>
  );
}
