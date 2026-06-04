/** Full pathname from a scraped URL (e.g. `/cosmetic-treatments/botox/`). */
export function legacyPathFromUrl(url: string): string {
  try {
    const path = new URL(url).pathname;
    if (!path || path === "/") return "/";
    return path.endsWith("/") ? path : `${path}/`;
  } catch {
    return "/";
  }
}

/** Last path segment, normalized for filenames and Sanity slugs. */
export function oldSlugFromUrl(url: string): string {
  try {
    const segments = new URL(url).pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1] ?? "page";
    return last
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "page";
  } catch {
    return "page";
  }
}
