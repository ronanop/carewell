"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { btnSecondary, inputClass } from "@/components/admin/content/AdminFormFields";
import { MediaThumbnail } from "@/components/admin/content/MediaThumbnail";
import type { MediaItem } from "@/components/admin/content/media-types";
import { MEDIA_ACCEPT } from "@/components/admin/content/media-types";

function isImageMedia(m: MediaItem): boolean {
  if (m.mimeType?.startsWith("image/")) return true;
  return /\.(png|jpe?g|gif|webp|svg|avif)$/i.test(m.url);
}

export function MediaPicker({
  open,
  onClose,
  onSelect,
  title = "Choose media",
  imagesOnly = false,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (media: MediaItem) => void;
  title?: string;
  /** When true, only show image/GIF assets (for inline editor inserts). */
  imagesOnly?: boolean;
}) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content/media");
      const json = (await res.json()) as { ok?: boolean; media?: MediaItem[] };
      if (json.ok && json.media) setItems(json.media);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) void load();
  }, [open, load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((m) => {
      if (imagesOnly && !isImageMedia(m)) return false;
      if (!q) return true;
      return (
        m.filename.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q) ||
        (m.alt ?? "").toLowerCase().includes(q)
      );
    });
  }, [items, query, imagesOnly]);

  async function onUpload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.set("file", file);
      await fetch("/api/admin/content/upload", { method: "POST", body: fd });
    }
    setUploading(false);
    await load();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-card border border-border bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-heading text-lg font-semibold text-navy">{title}</h2>
          <button type="button" className="text-sm text-navy/60 hover:text-navy" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-b border-border px-5 py-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-button border border-border bg-white px-4 py-2 text-sm font-medium text-navy">
            {uploading ? "Uploading…" : "Upload files"}
            <input
              type="file"
              accept={MEDIA_ACCEPT}
              multiple
              className="hidden"
              disabled={uploading}
              onChange={(e) => void onUpload(e.target.files)}
            />
          </label>
          <input
            className={`${inputClass} max-w-xs`}
            placeholder="Search…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="text-xs text-navy/50">{filtered.length} items</span>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {loading ? (
            <p className="text-sm text-navy/60">Loading library…</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-navy/60">No media yet. Upload images or GIFs above.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className="rounded-card border border-border bg-white p-3 text-left transition hover:border-teal/40 hover:shadow-card"
                  onClick={() => {
                    onSelect(m);
                    onClose();
                  }}
                >
                  <div className="relative mb-2 aspect-video overflow-hidden rounded-button bg-surface">
                    <MediaThumbnail item={m} />
                  </div>
                  <p className="truncate text-xs font-medium text-navy">{m.filename}</p>
                  {m.mimeType ? <p className="truncate text-[10px] text-navy/50">{m.mimeType}</p> : null}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-border px-5 py-3 text-right">
          <button type="button" className={btnSecondary} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
