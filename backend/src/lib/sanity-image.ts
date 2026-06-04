import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const builder =
  projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null;

/** Legacy Sanity CDN URLs in imported Portable Text (optional fallback). */
export function urlForImage(source: SanityImageSource | undefined | null): string | null {
  if (!builder || !source) return null;
  try {
    return builder.image(source).width(1200).auto("format").url();
  } catch {
    return null;
  }
}
