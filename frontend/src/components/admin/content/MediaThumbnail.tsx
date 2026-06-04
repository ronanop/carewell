import type { MediaItem } from "@/components/admin/content/media-types";

/** Direct upload URL — bypasses Next image optimizer (fixes new upload previews). */
export function mediaAssetUrl(url: string): string {
  if (!url.startsWith("/uploads/")) return url;
  return `/api/serve-upload/${url.replace(/^\/uploads\//, "")}`;
}

export function MediaThumbnail({
  item,
  className = "h-full w-full object-cover",
}: {
  item: Pick<MediaItem, "url" | "filename" | "alt" | "mimeType">;
  className?: string;
}) {
  const src = mediaAssetUrl(item.url);
  const isVideo = item.mimeType?.startsWith("video/") || /\.(mp4|webm)$/i.test(item.url);

  if (isVideo) {
    return (
      <video src={src} className={className} muted playsInline preload="metadata" aria-label={item.alt ?? item.filename} />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={item.alt ?? item.filename} className={className} loading="lazy" />
  );
}
