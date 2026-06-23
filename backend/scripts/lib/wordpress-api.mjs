import { legacyPathFromUrl, normalizeLegacyPath } from "./legacy-path.mjs";

const PER_PAGE = 100;
const FETCH_TIMEOUT_MS = 15_000;

function wpApiBase() {
  const raw =
    process.env.WORDPRESS_API_URL?.trim() ||
    process.env.SCRAPER_BASE_URL?.trim() ||
    "https://www.carewellmedicalcentre.com";
  return `${raw.replace(/\/$/, "")}/wp-json/wp/v2`;
}

async function wpFetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`WordPress API ${res.status} for ${url}`);
    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchLinkRows(kind) {
  const endpoint = kind === "pages" ? "pages" : "posts";
  const rows = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const url = `${wpApiBase()}/${endpoint}?per_page=${PER_PAGE}&page=${page}&_fields=id,slug,link&status=publish`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) break;

    const totalHeader = res.headers.get("X-WP-TotalPages");
    if (totalHeader) totalPages = Math.max(1, Number(totalHeader) || 1);

    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;

    rows.push(...batch);
    page += 1;
  }

  return rows;
}

let linkIndex = null;

export async function getWpLinkIndex() {
  if (linkIndex) return linkIndex;

  const [pages, posts] = await Promise.all([fetchLinkRows("pages"), fetchLinkRows("posts")]);
  const byPath = new Map();
  const pagePaths = [];
  const postPaths = [];

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
  linkIndex = { byPath, pagePaths, postPaths };
  return linkIndex;
}

export async function fetchWpItem(kind, id) {
  const endpoint = kind === "page" ? "pages" : "posts";
  const url = `${wpApiBase()}/${endpoint}/${id}`;
  try {
    return await wpFetchJson(url);
  } catch {
    return null;
  }
}
