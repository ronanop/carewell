"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { btnSecondary, inputClass } from "@/components/admin/content/AdminFormFields";
import { mediaAssetUrl, MediaThumbnail } from "@/components/admin/content/MediaThumbnail";
import type { MediaItem } from "@/components/admin/content/media-types";
import { MEDIA_ACCEPT } from "@/components/admin/content/media-types";

export function MediaLibrary({ initial }: { initial: MediaItem[] }) {
  const router = useRouter();
  const [items, setItems] = useState<MediaItem[]>(initial);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAlt, setEditAlt] = useState("");
  const [editFilename, setEditFilename] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/admin/content/media");
    const json = (await res.json()) as { ok?: boolean; media?: MediaItem[] };
    if (json.ok && json.media) setItems(json.media);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (m) =>
        m.filename.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q) ||
        (m.alt ?? "").toLowerCase().includes(q),
    );
  }, [items, query]);

  async function onUpload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.set("file", file);
      await fetch("/api/admin/content/upload", { method: "POST", body: fd });
    }
    setUploading(false);
    await refresh();
    router.refresh();
  }

  function startEdit(m: MediaItem) {
    setEditingId(m.id);
    setEditAlt(m.alt ?? "");
    setEditFilename(m.filename);
  }

  async function saveEdit(id: string) {
    await fetch(`/api/admin/content/media/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alt: editAlt, filename: editFilename }),
    });
    setEditingId(null);
    await refresh();
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this file from the library? Pages using it may show broken images.")) return;
    await fetch(`/api/admin/content/media/${id}`, { method: "DELETE" });
    await refresh();
    router.refresh();
  }

  async function copyText(label: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-navy/70">
        Upload images, GIFs, and short videos once — then reuse them on services, blog posts, gallery cases, and page
        content via <strong>Choose from library</strong> in any editor.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-button bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark">
          {uploading ? "Uploading…" : "Upload media"}
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
          placeholder="Search filename, alt, or ID…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="text-xs text-navy/50">{filtered.length} items</span>
        {copied ? <span className="text-xs text-teal">Copied {copied}!</span> : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((m) => (
          <div key={m.id} className="rounded-card border border-border bg-white p-3 shadow-sm">
            <div className="relative mb-2 aspect-video overflow-hidden rounded-button bg-surface">
              <MediaThumbnail item={m} />
            </div>
            {editingId === m.id ? (
              <div className="space-y-2">
                <input className={inputClass} value={editFilename} onChange={(e) => setEditFilename(e.target.value)} />
                <input className={inputClass} placeholder="Alt text" value={editAlt} onChange={(e) => setEditAlt(e.target.value)} />
                <div className="flex gap-2">
                  <button type="button" className={btnSecondary} onClick={() => void saveEdit(m.id)}>
                    Save
                  </button>
                  <button type="button" className="text-xs text-navy/60" onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="truncate text-xs font-medium text-navy">{m.filename}</p>
                {m.mimeType ? <p className="truncate text-[10px] text-navy/45">{m.mimeType}</p> : null}
                {m.alt ? <p className="truncate text-xs text-navy/50">{m.alt}</p> : null}
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                  <a
                    href={mediaAssetUrl(m.url)}
                    download={m.filename}
                    className="text-primary hover:underline"
                  >
                    Download
                  </a>
                  <button type="button" className="text-primary hover:underline" onClick={() => void copyText("URL", m.url)}>
                    Copy URL
                  </button>
                  <button type="button" className="text-primary hover:underline" onClick={() => void copyText("ID", m.id)}>
                    Copy ID
                  </button>
                  <button type="button" className="text-navy/70 hover:underline" onClick={() => startEdit(m)}>
                    Edit
                  </button>
                  <button type="button" className="text-alert hover:underline" onClick={() => void remove(m.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-card border border-dashed border-border bg-white p-8 text-center text-sm text-navy/60">
          No media files yet. Upload images or GIFs to get started.
        </p>
      ) : null}
    </div>
  );
}
