import Image from "next/image";

/** Parse WxH from Sanity CDN filenames (e.g. …-1650x1100.webp). */
function dimensionsFromUrl(url: string): { width: number; height: number } | null {
  const match = url.match(/-(\d+)x(\d+)\.(?:webp|jpe?g|png|gif)(?:\?|$)/i);
  if (!match) return null;
  const width = Number(match[1]);
  const height = Number(match[2]);
  if (!width || !height) return null;
  return { width, height };
}

/** Blog cover image at original aspect ratio (no crop). */
export function BlogArticleCover({
  src,
  alt,
}: {
  src?: string | null;
  alt: string;
}) {
  if (!src) return null;

  const dims = dimensionsFromUrl(src);

  return (
    <figure className="overflow-hidden rounded-2xl bg-surface">
      {dims ? (
        <Image
          src={src}
          alt={alt}
          width={dims.width}
          height={dims.height}
          priority
          sizes="(max-width: 1024px) 100vw, 480px"
          className="h-auto w-full max-w-full"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-auto w-full max-w-full" loading="eager" fetchPriority="high" />
      )}
    </figure>
  );
}
