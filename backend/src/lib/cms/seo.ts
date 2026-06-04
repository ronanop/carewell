import type { Media } from "@prisma/client";
import { mediaPublicUrl } from "@/lib/media-url";

type SeoMedia = Pick<Media, "url"> | null | undefined;

export function buildSeoObject(row: {
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoCanonicalUrl?: string | null;
  seoOgTitle?: string | null;
  seoOgDescription?: string | null;
  seoNoindex?: boolean;
  seoOgImage?: SeoMedia;
}): {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  noindex?: boolean;
  ogImageUrl?: string;
} | undefined {
  const title = row.seoTitle ?? undefined;
  const description = row.seoDescription ?? undefined;
  if (!title && !description && !row.seoCanonicalUrl && !row.seoOgTitle) return undefined;
  return {
    title,
    description,
    canonicalUrl: row.seoCanonicalUrl ?? undefined,
    ogTitle: row.seoOgTitle ?? undefined,
    ogDescription: row.seoOgDescription ?? undefined,
    noindex: row.seoNoindex ?? false,
    ogImageUrl: row.seoOgImage?.url ? mediaPublicUrl(row.seoOgImage.url) : undefined,
  };
}
