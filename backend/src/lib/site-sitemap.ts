import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/client";
import { blogPostsListQuery, servicesSlugsQuery } from "@/sanity/queries";

const STATIC_ROUTES: { path: string; priority?: number; changeFrequency?: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/about", changeFrequency: "monthly" },
  { path: "/about/dr-bhasin", changeFrequency: "monthly" },
  { path: "/contact", changeFrequency: "monthly" },
  { path: "/faq", changeFrequency: "monthly" },
  { path: "/blog", changeFrequency: "weekly" },
  { path: "/gallery", changeFrequency: "weekly" },
  { path: "/book-consultation", changeFrequency: "monthly" },
  { path: "/hair-transplant-in-delhi", priority: 0.9, changeFrequency: "weekly" },
  { path: "/cosmetic-treatments-in-delhi", changeFrequency: "weekly" },
  { path: "/plastic-surgery-in-delhi", changeFrequency: "weekly" },
  { path: "/cost-estimator", changeFrequency: "monthly" },
  { path: "/skin-scan", changeFrequency: "monthly" },
];

function entry(
  base: string,
  path: string,
  opts?: { priority?: number; changeFrequency?: MetadataRoute.Sitemap[0]["changeFrequency"] },
): MetadataRoute.Sitemap[0] {
  return {
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: opts?.changeFrequency ?? "monthly",
    priority: opts?.priority,
  };
}

export async function buildMetadataSitemap(baseUrl: string): Promise<MetadataRoute.Sitemap> {
  const base = baseUrl.replace(/\/$/, "");
  const items: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) =>
    entry(base, r.path === "" ? "" : r.path, {
      priority: r.priority,
      changeFrequency: r.changeFrequency,
    }),
  );

  const [services, blogs] = await Promise.all([
    sanityFetch<{ slug: string; locale?: string }[]>(servicesSlugsQuery).catch(() => []),
    sanityFetch<{ slug: string }[]>(blogPostsListQuery).catch(() => []),
  ]);

  for (const s of services ?? []) {
    if (!s.slug || s.locale === "hi" || s.slug === "hair-transplant") continue;
    items.push(entry(base, `/services/${s.slug}`, { changeFrequency: "weekly", priority: 0.8 }));
  }

  for (const b of blogs ?? []) {
    if (!b.slug) continue;
    items.push(entry(base, `/blog/${b.slug}`, { changeFrequency: "monthly", priority: 0.6 }));
  }

  const categories = ["hair", "skin-vitiligo", "face", "body", "therapies"] as const;
  for (const slug of categories) {
    items.push(entry(base, `/treatments/${slug}`, { changeFrequency: "weekly", priority: 0.7 }));
  }

  return items;
}
