import { htmlToPortableText, resetPortableKeys } from "../../../../scripts/lib/html-to-portable.mjs";
import { mapYoastToSeo, readTimeFromYoast } from "@/lib/cms/wordpress/yoast";
import { decodeHtmlEntities, sanitizeWpContentHtml, stripHtmlTags } from "@/lib/cms/wordpress/sanitize-html";
import type { WpPost } from "@/lib/cms/wordpress/types";

export async function mapWpPostToBlogDoc(post: WpPost, legacyPath: string) {
  const yoast = post.yoast_head_json;
  const rawHtml = post.content?.rendered ?? "";
  const sanitized = sanitizeWpContentHtml(rawHtml);

  resetPortableKeys();
  const body = await htmlToPortableText(sanitized);
  const coverUrl = yoast?.og_image?.[0]?.url ?? null;

  return {
    id: String(post.id),
    slug: post.slug,
    legacyPath,
    title: decodeHtmlEntities(post.title?.rendered ?? "Blog"),
    excerpt: stripHtmlTags(post.excerpt?.rendered ?? "") || undefined,
    body,
    publishedAt: post.date ? new Date(post.date).toISOString() : undefined,
    updatedAt: post.modified ? new Date(post.modified).toISOString() : undefined,
    readTimeMinutes: readTimeFromYoast(yoast) ?? 5,
    coverUrl,
    relatedPosts: [] as {
      title: string;
      slug: string;
      legacyPath?: string | null;
      excerpt?: string | null;
      readTimeMinutes?: number | null;
      coverUrl?: string;
    }[],
    seo: mapYoastToSeo(yoast),
  };
}
