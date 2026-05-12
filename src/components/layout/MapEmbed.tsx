import clsx from "clsx";
import { getClinicMapEmbedSrc } from "@/lib/clinic-map-embed";

type MapEmbedProps = {
  /** Prefer Sanity `mapEmbedUrl`; falls back to env / default preview */
  embedSrc?: string | null;
  title: string;
  className?: string;
  /** Outer wrapper; default full-width responsive 16:9 */
  frameClassName?: string;
};

export function MapEmbed({ embedSrc, title, className, frameClassName }: MapEmbedProps) {
  const src = getClinicMapEmbedSrc(embedSrc);

  return (
    <div className={clsx("relative w-full overflow-hidden rounded-xl bg-surface", frameClassName ?? "aspect-video", className)}>
      <iframe
        title={title}
        src={src}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
