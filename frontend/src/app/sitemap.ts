import type { MetadataRoute } from "next";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { buildMetadataSitemap } from "@carewell/backend/lib/site-sitemap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return buildMetadataSitemap(getSiteUrl());
}
