"use client";

import dynamic from "next/dynamic";

const LiteYouTubeEmbed = dynamic(() => import("react-lite-youtube-embed"), {
  ssr: false,
  loading: () => <div className="aspect-video w-full animate-pulse rounded-xl bg-surface" />,
});

export function LiteVideo({ id, title }: { id: string; title: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-surface shadow-sm">
      <LiteYouTubeEmbed id={id} title={title} poster="hqdefault" />
    </div>
  );
}
