/** Mirrors backend/src/lib/legacy-path.ts for import scripts. */

export function normalizeLegacyPath(path) {
  let p = String(path ?? "").trim();
  if (!p.startsWith("/")) p = `/${p}`;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

export function legacyPathFromUrl(url) {
  try {
    return normalizeLegacyPath(new URL(url).pathname);
  } catch {
    return "/";
  }
}

export function slugFromLegacyPath(legacyPath) {
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

export function categoryIdFromLegacyPath(legacyPath) {
  const seg = normalizeLegacyPath(legacyPath).split("/").filter(Boolean)[0] ?? "";
  const map = {
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

export function legacyPathWithTrailingSlash(path) {
  const p = normalizeLegacyPath(path);
  if (p === "/") return "/";
  return `${p}/`;
}
