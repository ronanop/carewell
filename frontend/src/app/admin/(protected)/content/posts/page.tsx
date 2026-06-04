import Link from "next/link";
import { readFileSync } from "fs";
import { join } from "path";
import { AdminContentHeader } from "@/components/admin/content/AdminContentHeader";
import { ADMIN_POSTS } from "@/config/admin-content-routes";
import { getRepoRoot } from "@carewell/backend/lib/repo-root";
import { legacyPathWithTrailingSlash, normalizeLegacyPath } from "@carewell/backend/lib/legacy-path";
import { listBlogPostsForAdmin } from "@carewell/backend/lib/cms/queries";

type Manifest = { paths?: string[] };

function loadManifestPaths(): string[] {
  try {
    const file = join(getRepoRoot(), "db", "seed", "legacy-sitemap-posts.json");
    const json = JSON.parse(readFileSync(file, "utf8")) as Manifest;
    return [...new Set((json.paths ?? []).map(normalizeLegacyPath))].filter((p) => p !== "/blog");
  } catch {
    return [];
  }
}

export default async function AdminPostsPage() {
  const [posts, manifestPaths] = await Promise.all([
    listBlogPostsForAdmin(),
    Promise.resolve(loadManifestPaths()),
  ]);

  const byPath = new Map(
    posts
      .filter((p) => p.legacyPath)
      .map((p) => [normalizeLegacyPath(p.legacyPath!), p]),
  );

  const rows =
    manifestPaths.length > 0
      ? manifestPaths.map((legacyPath) => ({
          legacyPath,
          post: byPath.get(legacyPath) ?? null,
        }))
      : posts.map((p) => ({
          legacyPath: p.legacyPath ? normalizeLegacyPath(p.legacyPath) : null,
          post: p,
        }));

  return (
    <div>
      <AdminContentHeader
        title="Posts"
        description="Legacy blog URLs from carewellmedicalcentre.com — articles live at the root path, not /blog/{slug}."
      />
      <p className="mb-4 text-sm text-navy/70">
        {rows.length} URLs from legacy blog sitemap. Run{" "}
        <code className="rounded bg-surface px-1">npm run cms:sync-legacy-sitemap-posts</code> to
        reset the list from{" "}
        <code className="rounded bg-surface px-1">db/seed/legacy-sitemap-posts.json</code>.
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
            {rows.map(({ legacyPath, post }) => (
              <tr key={legacyPath ?? post?.id} className="border-b border-border/60 last:border-0">
                <td className="max-w-md px-4 py-3 font-mono text-xs text-navy/80">
                  {legacyPath ? (
                    <a
                      href={legacyPathWithTrailingSlash(legacyPath)}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-primary hover:underline"
                    >
                      {legacyPathWithTrailingSlash(legacyPath)}
                    </a>
                  ) : (
                    <span className="text-navy/40">—</span>
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-navy">
                  {post?.title ?? <span className="text-navy/40">—</span>}
                </td>
                <td className="px-4 py-3 text-navy/70">{post?.category ?? "—"}</td>
                <td className="px-4 py-3 text-right">
                  {post ? (
                    <Link
                      href={`${ADMIN_POSTS}/${encodeURIComponent(post.slug)}`}
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
        {rows.length === 0 ? (
          <p className="p-6 text-sm text-navy/60">
            No posts yet. Run the sync script or import content.
          </p>
        ) : null}
      </div>
    </div>
  );
}
