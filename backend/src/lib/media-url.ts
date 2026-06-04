import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlForImage } from "@/lib/sanity-image";

/** Resolve image URL from portable text block, Media row, or legacy Sanity asset. */
export function resolveImageUrl(
  source:
    | { url?: string | null; asset?: { url?: string } }
    | SanityImageSource
    | null
    | undefined,
): string | null {
  if (!source || typeof source !== "object") return null;
  if ("url" in source && typeof source.url === "string" && source.url) {
    return source.url.startsWith("/") ? source.url : source.url;
  }
  if ("asset" in source && source.asset && typeof source.asset === "object") {
    const u = (source.asset as { url?: string }).url;
    if (u) return u;
  }
  return urlForImage(source as SanityImageSource);
}

export function mediaPublicUrl(path: string): string {
  if (path.startsWith("http") || path.startsWith("/")) return path;
  return `/${path.replace(/^\/+/, "")}`;
}
