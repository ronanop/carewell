export type CmsProvider = "prisma" | "sanity" | "wordpress";

export function getCmsProvider(): CmsProvider {
  const v = (process.env.CMS_PROVIDER ?? "prisma").toLowerCase();
  if (v === "sanity") return "sanity";
  if (v === "wordpress") return "wordpress";
  return "prisma";
}

export function isPrismaCmsEnabled(): boolean {
  return getCmsProvider() === "prisma" && Boolean(process.env.DATABASE_URL);
}

export function isWordpressCmsEnabled(): boolean {
  return getCmsProvider() === "wordpress" && Boolean(getWordpressApiUrl());
}

export function isSanityCmsEnabled(): boolean {
  return getCmsProvider() === "sanity" && Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim());
}

export function getWordpressApiUrl(): string {
  const raw =
    process.env.WORDPRESS_API_URL?.trim() ||
    process.env.SCRAPER_BASE_URL?.trim() ||
    "https://www.carewellmedicalcentre.com";
  return raw.replace(/\/$/, "");
}

/** @deprecated Use isPrismaCmsEnabled */
export const usePrismaCms = isPrismaCmsEnabled;
