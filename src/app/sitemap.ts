import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { sanityFetch } from "@/sanity/client";
import { blogPostsListQuery, servicesSlugsQuery } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const [services, blogs] = await Promise.all([
    sanityFetch<{ slug: string }[]>(servicesSlugsQuery),
    sanityFetch<{ slug: string }[]>(blogPostsListQuery),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/about/dr-bhasin",
    "/blog",
    "/contact",
    "/gallery",
    "/cost-estimator",
    "/skin-scan",
  ];
  const staticEntries = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceEntries = (services || []).map((item) => ({
    url: `${base}/services/${item.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogEntries = (blogs || [])
    .filter((item) => !!item.slug)
    .map((item) => ({
      url: `${base}/blog/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticEntries, ...serviceEntries, ...blogEntries];
}
