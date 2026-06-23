import { legacyPathFromUrl, normalizeLegacyPath } from "@/lib/legacy-path";
import { getWordpressApiUrl } from "@/lib/cms/provider";
import {
  wordpressContentRevalidateSeconds,
  wordpressIndexRevalidateSeconds,
} from "@/lib/cms/wordpress/cache-config";
import { mapWpPageToService } from "@/lib/cms/wordpress/map-page";
import { mapWpPostToBlogDoc } from "@/lib/cms/wordpress/map-post";
import type { WpContentItem, WpIndexEntry, WpLinkIndex, WpPage, WpPost } from "@/lib/cms/wordpress/types";

const INDEX_TTL_MS = wordpressIndexRevalidateSeconds() * 1000;
const ITEM_TTL_MS = wordpressContentRevalidateSeconds() * 1000;
const FETCH_TIMEOUT_MS = 15_000;
const PER_PAGE = 100;

let linkIndex: WpLinkIndex | null = null;
const itemCache = new Map<string, { at: number; data: WpContentItem }>();

function wpApiBase(): string {
  return `${getWordpressApiUrl()}/wp-json/wp/v2`;
}

async function wpFetchJson<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      next: { revalidate: wordpressContentRevalidateSeconds() },
    });
    if (!res.ok) {
      throw new Error(`WordPress API ${res.status} for ${url}`);
    }
    return (await res.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

type WpLinkRow = { id: number; slug: string; link: string };

async function fetchLinkRows(kind: "pages" | "posts"): Promise<WpLinkRow[]> {
  const endpoint = kind === "pages" ? "pages" : "posts";
  const rows: WpLinkRow[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const url = `${wpApiBase()}/${endpoint}?per_page=${PER_PAGE}&page=${page}&_fields=id,slug,link&status=publish`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: wordpressIndexRevalidateSeconds() },
    });
    if (!res.ok) break;

    const totalHeader = res.headers.get("X-WP-TotalPages");
    if (totalHeader) totalPages = Math.max(1, Number(totalHeader) || 1);

    const batch = (await res.json()) as WpLinkRow[];
    if (!Array.isArray(batch) || batch.length === 0) break;

    rows.push(...batch);
    page += 1;
  }

  return rows;
}

async function refreshLinkIndex(): Promise<WpLinkIndex> {
  const [pages, posts] = await Promise.all([fetchLinkRows("pages"), fetchLinkRows("posts")]);

  const byPath = new Map<string, WpIndexEntry>();
  const pagePaths: string[] = [];
  const postPaths: string[] = [];

  for (const row of pages) {
    const path = normalizeLegacyPath(legacyPathFromUrl(row.link));
    if (path === "/") continue;
    byPath.set(path, { id: row.id, slug: row.slug, kind: "page" });
    pagePaths.push(path);
  }

  for (const row of posts) {
    const path = normalizeLegacyPath(legacyPathFromUrl(row.link));
    if (path === "/") continue;
    byPath.set(path, { id: row.id, slug: row.slug, kind: "post" });
    postPaths.push(path);
  }

  pagePaths.sort();
  postPaths.sort();

  linkIndex = { builtAt: Date.now(), byPath, pagePaths, postPaths };
  return linkIndex;
}

export async function getWpLinkIndex(): Promise<WpLinkIndex> {
  if (linkIndex && Date.now() - linkIndex.builtAt < INDEX_TTL_MS) {
    return linkIndex;
  }
  try {
    return await refreshLinkIndex();
  } catch {
    return (
      linkIndex ?? {
        builtAt: 0,
        byPath: new Map(),
        pagePaths: [],
        postPaths: [],
      }
    );
  }
}

export async function fetchWpItem(kind: "page" | "post", id: number): Promise<WpContentItem | null> {
  const cacheKey = `${kind}:${id}`;
  const cached = itemCache.get(cacheKey);
  if (cached && Date.now() - cached.at < ITEM_TTL_MS) {
    return cached.data;
  }

  const endpoint = kind === "page" ? "pages" : "posts";
  const url = `${wpApiBase()}/${endpoint}/${id}`;
  try {
    const data = (await wpFetchJson<WpPage | WpPost>(url)) as WpContentItem;
    itemCache.set(cacheKey, { at: Date.now(), data });
    return data;
  } catch {
    return null;
  }
}

async function getEntryForPath(legacyPath: string): Promise<{ entry: WpIndexEntry; path: string } | null> {
  const path = normalizeLegacyPath(legacyPath);
  const index = await getWpLinkIndex();
  const entry = index.byPath.get(path);
  if (!entry) return null;
  return { entry, path };
}

export async function getWpServiceByLegacyPath(path: string) {
  const match = await getEntryForPath(path);
  if (!match || match.entry.kind !== "page") return null;

  const page = await fetchWpItem("page", match.entry.id);
  if (!page) return null;

  return mapWpPageToService(page as WpPage, match.path);
}

export async function getWpBlogPostByLegacyPath(path: string) {
  const match = await getEntryForPath(path);
  if (!match || match.entry.kind !== "post") return null;

  const post = await fetchWpItem("post", match.entry.id);
  if (!post) return null;

  return mapWpPostToBlogDoc(post as WpPost, match.path);
}

export async function listWpPagePaths(): Promise<string[]> {
  const index = await getWpLinkIndex();
  return index.pagePaths;
}

export async function listWpPostPaths(): Promise<string[]> {
  const index = await getWpLinkIndex();
  return index.postPaths;
}

/** Clear in-process caches (e.g. after revalidate webhook). */
export function clearWordpressCmsCache(): void {
  linkIndex = null;
  itemCache.clear();
}
