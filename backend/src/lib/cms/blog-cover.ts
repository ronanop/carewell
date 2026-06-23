import type { PortableTextBlock } from "@portabletext/types";
import { resolveImageUrl } from "@/lib/media-url";

type BlogCoverSource = {
  coverUrl?: string | null;
  ogImageUrl?: string | null;
  seo?: { ogImageUrl?: string | null } | null;
  body?: unknown;
};

/** Resolve hero/banner image for a blog post (cover → SEO og → first inline image). */
export function resolveBlogCoverUrl(post: BlogCoverSource | null | undefined): string | undefined {
  if (!post) return undefined;

  const direct = post.coverUrl?.trim() || post.ogImageUrl?.trim() || post.seo?.ogImageUrl?.trim();
  if (direct) return direct;

  if (!Array.isArray(post.body)) return undefined;
  for (const block of post.body) {
    const b = block as PortableTextBlock & { _type?: string; asset?: { url?: string } };
    if (b._type === "image") {
      const url = resolveImageUrl(b);
      if (url) return url;
    }
  }

  return undefined;
}
