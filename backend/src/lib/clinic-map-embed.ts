/** Allowed iframe origins for clinic map embeds (avoid arbitrary URL injection). */
const ALLOWED = [
  /^https:\/\/(www\.)?google\.com\/maps/i,
  /^https:\/\/maps\.google\.com\//i,
  /^https:\/\/www\.openstreetmap\.org\/export\/embed\.html/i,
];

/** Fallback: interactive preview near Chittaranjan Park, South Delhi (no API key). */
export const DEFAULT_CLINIC_MAP_EMBED =
  "https://maps.google.com/maps?q=28.5401,77.2450&z=16&output=embed&hl=en";

function isAllowedHttpsUrl(url: string): boolean {
  try {
    const u = new URL(url.trim());
    if (u.protocol !== "https:") return false;
    return ALLOWED.some((re) => re.test(url.trim()));
  } catch {
    return false;
  }
}

/**
 * Resolve iframe src: Sanity/env override, then env-only, then default Delhi-area preview.
 */
export function getClinicMapEmbedSrc(sanityOrOverride?: string | null): string {
  const fromEnv = process.env.NEXT_PUBLIC_CLINIC_MAP_EMBED_URL?.trim();
  const candidates = [sanityOrOverride?.trim(), fromEnv].filter(Boolean) as string[];
  for (const c of candidates) {
    if (isAllowedHttpsUrl(c)) return c;
  }
  return DEFAULT_CLINIC_MAP_EMBED;
}
