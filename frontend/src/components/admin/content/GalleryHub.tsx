"use client";

import { useState } from "react";
import { GalleryAdminList } from "@/components/admin/content/GalleryAdminList";
import { MediaLibrary } from "@/components/admin/content/MediaLibrary";
import type { MediaItem } from "@/components/admin/content/media-types";

type Tab = "media" | "cases";

export function GalleryHub({
  media,
  galleryItems,
}: {
  media: MediaItem[];
  galleryItems: {
    id: string;
    title: string;
    category?: string | null;
    treatmentDetail?: string | null;
    consentOnFile?: boolean;
    beforeImageId?: string | null;
    afterImageId?: string | null;
    beforeUrl?: string | null;
    afterUrl?: string | null;
  }[];
}) {
  const [tab, setTab] = useState<Tab>("media");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 border-b border-border pb-1">
        <button
          type="button"
          className={`rounded-t-button px-4 py-2 text-sm font-semibold ${
            tab === "media" ? "border-b-2 border-primary text-primary" : "text-navy/60 hover:text-navy"
          }`}
          onClick={() => setTab("media")}
        >
          Media library
        </button>
        <button
          type="button"
          className={`rounded-t-button px-4 py-2 text-sm font-semibold ${
            tab === "cases" ? "border-b-2 border-primary text-primary" : "text-navy/60 hover:text-navy"
          }`}
          onClick={() => setTab("cases")}
        >
          Before/after cases
        </button>
      </div>

      {tab === "media" ? <MediaLibrary initial={media} /> : <GalleryAdminList initial={galleryItems} />}
    </div>
  );
}
