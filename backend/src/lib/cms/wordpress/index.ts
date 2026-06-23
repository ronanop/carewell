export {
  clearWordpressCmsCache,
  getWpBlogPostByLegacyPath,
  getWpLinkIndex,
  getWpServiceByLegacyPath,
  listWpPagePaths,
  listWpPostPaths,
} from "@/lib/cms/wordpress/client";
export {
  getCachedWpBlogPostByLegacyPath,
  getCachedWpPagePaths,
  getCachedWpPostPaths,
  getCachedWpServiceByLegacyPath,
} from "@/lib/cms/wordpress/cached";
export {
  WORDPRESS_CMS_TAG,
  wordpressContentRevalidateSeconds,
  wordpressIndexRevalidateSeconds,
  wordpressPathTag,
} from "@/lib/cms/wordpress/cache-config";
