export type SuggestedBlogPost = {
  title: string;
  slug: string;
  legacyPath?: string | null;
  excerpt?: string | null;
  coverUrl?: string;
  readTimeMinutes?: number | null;
};

export function blogPostPublicHref(post: { slug: string; legacyPath?: string | null }): string {
  if (post.legacyPath) {
    const path = post.legacyPath.endsWith("/") ? post.legacyPath : `${post.legacyPath}/`;
    return path;
  }
  return `/blog/${post.slug}`;
}
