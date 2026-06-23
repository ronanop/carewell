import { revalidatePath, revalidateTag } from "next/cache";
import { clearWordpressCmsCache } from "@/lib/cms/wordpress/client";
import { WORDPRESS_CMS_TAG, wordpressPathTag } from "@/lib/cms/wordpress/cache-config";

/** Next.js only — ISR hooks; keep this route on the frontend app. */
export async function POST(req: Request) {
  const secret = req.headers.get("x-webhook-secret");
  if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    paths?: string[];
    slug?: string;
    type?: string;
    layout?: boolean;
    wordpress?: boolean;
  };
  const paths = new Set<string>(["/", "/blog", "/gallery"]);
  const tags = new Set<string>();

  if (Array.isArray(body.paths)) {
    for (const path of body.paths) {
      paths.add(path);
      const normalized = path.replace(/\/+$/, "") || "/";
      tags.add(wordpressPathTag(normalized));
    }
  }
  if (body.type === "service" && body.slug) {
    paths.add(`/services/${body.slug}`);
    const { findLegacyPathBySlug } = await import("@/lib/legacy-path-db");
    const legacyPath = await findLegacyPathBySlug(body.slug!);
    if (legacyPath) {
      paths.add(legacyPath);
      paths.add(`${legacyPath}/`);
    }
  }
  if (body.type === "blogPost" && body.slug) {
    paths.add(`/blog/${body.slug}`);
    const { findLegacyPathByBlogSlug } = await import("@/lib/legacy-path-db");
    const legacyPath = await findLegacyPathByBlogSlug(body.slug!);
    if (legacyPath) {
      paths.add(legacyPath);
      paths.add(`${legacyPath}/`);
    }
  }

  const layout = body.layout === true;
  for (const path of Array.from(paths)) {
    revalidatePath(path, layout ? "layout" : undefined);
  }
  if (body.wordpress === true) {
    tags.add(WORDPRESS_CMS_TAG);
  }
  for (const tag of Array.from(tags)) {
    revalidateTag(tag);
  }
  if (tags.has(WORDPRESS_CMS_TAG) || Array.from(tags).some((t) => t.startsWith("wp-path:"))) {
    clearWordpressCmsCache();
  }

  return Response.json({
    ok: true,
    revalidated: Array.from(paths),
    tags: Array.from(tags),
    layout,
  });
}
