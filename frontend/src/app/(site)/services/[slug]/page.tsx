import { redirect, notFound } from "next/navigation";
import { findLegacyPathByBlogSlug, findLegacyPathBySlug } from "@carewell/backend/lib/legacy-path-db";
import { legacyPathWithTrailingSlash } from "@carewell/backend/lib/legacy-path";

/** Legacy /services/{slug} URLs redirect to production-style paths (no /services/ in SEO URLs). */
export default async function LegacyServicesSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const legacyPath =
    (await findLegacyPathBySlug(slug, "en")) ?? (await findLegacyPathByBlogSlug(slug));
  if (!legacyPath) notFound();
  redirect(legacyPathWithTrailingSlash(legacyPath));
}
