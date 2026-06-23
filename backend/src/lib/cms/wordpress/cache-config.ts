/** WordPress CMS cache TTLs (seconds). Override via env in production. */
export function wordpressIndexRevalidateSeconds(): number {
  const v = Number(process.env.WORDPRESS_INDEX_REVALIDATE_SECONDS ?? 600);
  return Number.isFinite(v) && v > 0 ? v : 600;
}

export function wordpressContentRevalidateSeconds(): number {
  const v = Number(process.env.WORDPRESS_CACHE_REVALIDATE_SECONDS ?? 300);
  return Number.isFinite(v) && v > 0 ? v : 300;
}

export const WORDPRESS_CMS_TAG = "wordpress-cms";

export function wordpressPathTag(path: string): string {
  return `wp-path:${path}`;
}
