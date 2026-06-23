import { unstable_cache } from "next/cache";
import { normalizeLegacyPath } from "@/lib/legacy-path";
import {
  WORDPRESS_CMS_TAG,
  wordpressContentRevalidateSeconds,
  wordpressIndexRevalidateSeconds,
  wordpressPathTag,
} from "@/lib/cms/wordpress/cache-config";
import {
  getWpBlogPostByLegacyPath,
  getWpLinkIndex,
  getWpServiceByLegacyPath,
  listWpPagePaths,
  listWpPostPaths,
} from "@/lib/cms/wordpress/client";

const getCachedLinkIndex = unstable_cache(
  async () => getWpLinkIndex(),
  ["wp-link-index"],
  {
    revalidate: wordpressIndexRevalidateSeconds(),
    tags: [WORDPRESS_CMS_TAG, "wp-link-index"],
  },
);

export async function getCachedWpServiceByLegacyPath(path: string) {
  const legacyPath = normalizeLegacyPath(path);
  return unstable_cache(
    async () => getWpServiceByLegacyPath(legacyPath),
    ["wp-service", legacyPath],
    {
      revalidate: wordpressContentRevalidateSeconds(),
      tags: [WORDPRESS_CMS_TAG, wordpressPathTag(legacyPath)],
    },
  )();
}

export async function getCachedWpBlogPostByLegacyPath(path: string) {
  const legacyPath = normalizeLegacyPath(path);
  return unstable_cache(
    async () => getWpBlogPostByLegacyPath(legacyPath),
    ["wp-post", legacyPath],
    {
      revalidate: wordpressContentRevalidateSeconds(),
      tags: [WORDPRESS_CMS_TAG, wordpressPathTag(legacyPath)],
    },
  )();
}

export async function getCachedWpPagePaths(): Promise<string[]> {
  const index = await getCachedLinkIndex();
  return index.pagePaths;
}

export async function getCachedWpPostPaths(): Promise<string[]> {
  const index = await getCachedLinkIndex();
  return index.postPaths;
}
