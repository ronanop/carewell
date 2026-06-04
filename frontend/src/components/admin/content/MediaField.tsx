"use client";

import { useState } from "react";
import { btnSecondary } from "@/components/admin/content/AdminFormFields";
import { MediaPicker } from "@/components/admin/content/MediaPicker";
import { mediaAssetUrl, MediaThumbnail } from "@/components/admin/content/MediaThumbnail";
import type { MediaItem } from "@/components/admin/content/media-types";
import { MEDIA_ACCEPT } from "@/components/admin/content/media-types";

export function MediaField({
  label,
  mediaId,
  mediaUrl,
  onChange,
}: {
  label: string;
  mediaId?: string | null;
  mediaUrl?: string | null;
  onChange: (media: { id: string; url: string } | null) => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.set("file", file);
    const res = await fetch("/api/admin/content/upload", { method: "POST", body: fd });
    const json = (await res.json()) as { ok?: boolean; media?: { id: string; url: string } };
    setUploading(false);
    if (json.ok && json.media) {
      onChange({ id: json.media.id, url: json.media.url });
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-navy">{label}</p>
      {mediaUrl ? (
        <div className="relative aspect-video w-full max-w-xs overflow-hidden rounded-button border border-border bg-surface">
          <MediaThumbnail item={{ url: mediaUrl, filename: label, alt: label }} />
        </div>
      ) : (
        <div className="flex h-24 max-w-xs items-center justify-center rounded-button border border-dashed border-border bg-surface/50 text-xs text-navy/50">
          No image selected
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <button type="button" className={btnSecondary} onClick={() => setPickerOpen(true)}>
          Choose from library
        </button>
        <label className={`${btnSecondary} cursor-pointer`}>
          {uploading ? "Uploading…" : "Upload new"}
          <input
            type="file"
            accept={MEDIA_ACCEPT}
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void upload(f);
              e.target.value = "";
            }}
          />
        </label>
        {mediaId ? (
          <a href={mediaAssetUrl(mediaUrl ?? "")} download className="text-xs text-primary hover:underline">
            Download
          </a>
        ) : null}
        {mediaId ? (
          <button type="button" className="text-xs text-alert hover:underline" onClick={() => onChange(null)}>
            Remove
          </button>
        ) : null}
      </div>
      {mediaId ? <p className="text-[10px] font-mono text-navy/45">{mediaId}</p> : null}

      <MediaPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        title={label}
        onSelect={(m: MediaItem) => onChange({ id: m.id, url: m.url })}
      />
    </div>
  );
}
