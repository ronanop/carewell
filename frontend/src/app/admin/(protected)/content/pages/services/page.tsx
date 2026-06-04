import Link from "next/link";
import { readFileSync } from "fs";
import { join } from "path";
import { AdminContentHeader } from "@/components/admin/content/AdminContentHeader";
import { ADMIN_PAGES_HUB, ADMIN_SERVICE_PAGES } from "@/config/admin-content-routes";
import { getRepoRoot } from "@carewell/backend/lib/repo-root";
import { legacyPathWithTrailingSlash, normalizeLegacyPath } from "@carewell/backend/lib/legacy-path";
import { listServicesForAdmin } from "@carewell/backend/lib/cms/queries";

type Manifest = { paths?: string[] };

function loadManifestPaths(): string[] {
  try {
    const file = join(getRepoRoot(), "db", "seed", "legacy-sitemap-pages.json");
    const json = JSON.parse(readFileSync(file, "utf8")) as Manifest;
    return [...new Set((json.paths ?? []).map(normalizeLegacyPath))].filter((p) => p !== "/");
  } catch {
    return [];
  }
}

export default async function AdminServicePagesListPage() {
  const [services, manifestPaths] = await Promise.all([
    listServicesForAdmin(),
    Promise.resolve(loadManifestPaths()),
  ]);

  const byPath = new Map(
    services
      .filter((s) => s.legacyPath)
      .map((s) => [normalizeLegacyPath(s.legacyPath!), s]),
  );

  const rows =
    manifestPaths.length > 0
      ? manifestPaths.map((legacyPath) => ({
          legacyPath,
          service: byPath.get(legacyPath) ?? null,
        }))
      : services.map((s) => ({
          legacyPath: s.legacyPath ? normalizeLegacyPath(s.legacyPath) : null,
          service: s,
        }));

  return (
    <div>
      <AdminContentHeader
        title="Service pages"
        description="Legacy SEO URLs from carewellmedicalcentre.com — no /services/ prefix."
        backHref={ADMIN_PAGES_HUB}
      />
      <p className="mb-4 text-sm text-navy/70">
        {rows.length} URLs from legacy sitemap. Run{" "}
        <code className="rounded bg-surface px-1">npm run cms:sync-legacy-sitemap</code> to reset the
        list from <code className="rounded bg-surface px-1">db/seed/legacy-sitemap-pages.json</code>.
      </p>
      <div className="overflow-hidden rounded-card border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-surface/50 text-xs uppercase tracking-wide text-navy/60">
            <tr>
              <th className="px-4 py-3">Public URL</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map(({ legacyPath, service }) => (
              <tr key={legacyPath} className="border-b border-border/60 last:border-0">
                <td className="max-w-md px-4 py-3 font-mono text-xs text-navy/80">
                  <a
                    href={legacyPathWithTrailingSlash(legacyPath)}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary hover:underline"
                  >
                    {legacyPathWithTrailingSlash(legacyPath)}
                  </a>
                </td>
                <td className="px-4 py-3 font-medium text-navy">
                  {service?.title ?? <span className="text-navy/40">—</span>}
                </td>
                <td className="px-4 py-3 text-navy/70">{service?.category?.title ?? "—"}</td>
                <td className="px-4 py-3 text-right">
                  {service ? (
                    <Link
                      href={`${ADMIN_SERVICE_PAGES}/${service.id}`}
                      className="text-primary hover:underline"
                    >
                      Edit
                    </Link>
                  ) : (
                    <span className="text-xs text-navy/40">Not synced</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
