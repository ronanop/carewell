/** Admin paths that edit CMS content — disabled; content is managed in Sanity Studio / import scripts. */

const ALLOWED_ADMIN_CONTENT_PREFIXES = [
  "/admin/content/forms",
  "/admin/content/integrations",
  "/admin/content/team",
] as const;

const ALLOWED_ADMIN_API_PREFIXES = [
  "/api/admin/forms",
  "/api/admin/content/integrations",
  "/api/admin/team",
  "/api/admin/login",
  "/api/admin/logout",
] as const;

function normalizeAdminPath(path: string): string {
  return path.replace(/\/+$/, "") || "/";
}

function isAllowedPrefix(path: string, prefixes: readonly string[]): boolean {
  const normalized = normalizeAdminPath(path);
  return prefixes.some((p) => normalized === p || normalized.startsWith(`${p}/`));
}

/** UI routes under /admin that edit site content (blocked). */
export function isBlockedAdminContentEditingPath(path: string): boolean {
  const normalized = normalizeAdminPath(path);

  if (normalized === "/admin/scraper" || normalized.startsWith("/admin/scraper/")) {
    return true;
  }

  if (!normalized.startsWith("/admin/content")) {
    return false;
  }

  return !isAllowedPrefix(normalized, ALLOWED_ADMIN_CONTENT_PREFIXES);
}

/** API routes that mutate CMS content (blocked). */
export function isBlockedAdminContentEditingApi(path: string): boolean {
  const normalized = normalizeAdminPath(path);

  if (!normalized.startsWith("/api/admin")) {
    return false;
  }

  if (isAllowedPrefix(normalized, ALLOWED_ADMIN_API_PREFIXES)) {
    return false;
  }

  if (normalized.startsWith("/api/admin/scraper")) {
    return true;
  }

  if (normalized.startsWith("/api/admin/content")) {
    return true;
  }

  return false;
}
