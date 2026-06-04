/** Normalize legacy carewellmedicalcentre.com pathnames for DB + routing. */
export function normalizeLegacyPath(path: string): string {
  let p = path.trim();
  if (!p.startsWith("/")) p = `/${p}`;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

/** Trailing-slash form used in redirects and public URLs (matches old WordPress). */
export function legacyPathWithTrailingSlash(path: string): string {
  const p = normalizeLegacyPath(path);
  if (p === "/") return "/";
  return `${p}/`;
}

export function legacyPathFromUrl(url: string): string {
  try {
    return normalizeLegacyPath(new URL(url).pathname);
  } catch {
    return "/";
  }
}

/** Stable slug for Prisma unique (no slashes). */
export function slugFromLegacyPath(legacyPath: string): string {
  const p = normalizeLegacyPath(legacyPath);
  if (p === "/") return "home";
  return p
    .slice(1)
    .replace(/\//g, "--")
    .replace(/[^a-z0-9-]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 180);
}

export function titleFromLegacyPath(legacyPath: string): string {
  const p = normalizeLegacyPath(legacyPath);
  if (p === "/") return "Home";
  const last = p.split("/").filter(Boolean).pop() ?? "page";
  return last
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function categoryIdFromLegacyPath(legacyPath: string): string | null {
  const seg = normalizeLegacyPath(legacyPath).split("/").filter(Boolean)[0] ?? "";
  const map: Record<string, string> = {
    "cosmetic-treatments-in-delhi": "cat-face",
    "skin-treatments-in-delhi": "cat-skin-vitiligo",
    "plastic-surgery-in-delhi": "cat-body",
    "hair-transplant-in-delhi": "cat-hair",
    "hair-loss-treatment-in-delhi": "cat-hair",
    "body-contouring-in-delhi": "cat-body",
    "iv-therapy-in-delhi": "cat-therapies",
    "holistic-wellness-treatments-in-delhi": "cat-therapies",
    "hyperbaric-oxygen-therapy-in-delhi": "cat-therapies",
    "intimate-surgery-in-delhi": "cat-body",
    "urology-in-delhi": "cat-body",
    "proctology-treatments-in-delhi": "cat-body",
    "non-surgical-weight-loss-treatment-in-delhi": "cat-body",
    "fatty-liver-treatment-in-delhi": "cat-therapies",
  };
  return map[seg] ?? null;
}
