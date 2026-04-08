import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from "@/sanity/env";

const builder =
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset })
    : null;

export function urlForImage(source: SanityImageSource | undefined | null): string | null {
  if (!builder || !source) return null;
  try {
    return builder.image(source).width(1200).auto("format").url();
  } catch {
    return null;
  }
}
