"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { btnPrimary, inputClass } from "@/components/admin/content/AdminFormFields";
import { MediaField } from "@/components/admin/content/MediaField";
import { MediaThumbnail } from "@/components/admin/content/MediaThumbnail";

type GalleryItemRow = {
  id: string;
  title: string;
  category?: string | null;
  treatmentDetail?: string | null;
  consentOnFile?: boolean;
  beforeImageId?: string | null;
  afterImageId?: string | null;
  beforeUrl?: string | null;
  afterUrl?: string | null;
};

export function GalleryAdminList({ initial }: { initial: GalleryItemRow[] }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    category: "",
    treatmentDetail: "",
    beforeImageId: null as string | null,
    beforeUrl: null as string | null,
    afterImageId: null as string | null,
    afterUrl: null as string | null,
  });
  const [saving, setSaving] = useState(false);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/content/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        category: form.category || null,
        treatmentDetail: form.treatmentDetail || null,
        beforeImageId: form.beforeImageId,
        afterImageId: form.afterImageId,
      }),
    });
    setForm({
      title: "",
      category: "",
      treatmentDetail: "",
      beforeImageId: null,
      beforeUrl: null,
      afterImageId: null,
      afterUrl: null,
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={add} className="space-y-4 rounded-card border border-border bg-white p-5">
        <h2 className="font-semibold text-navy">Add before/after case</h2>
        <p className="text-sm text-navy/60">
          Pick images from your media library. These appear on the public{" "}
          <a href="/gallery" target="_blank" rel="noreferrer" className="text-primary hover:underline">
            /gallery
          </a>{" "}
          page.
        </p>
        <input
          className={inputClass}
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className={inputClass}
          placeholder="Category (e.g. Hair transplant)"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          className={inputClass}
          placeholder="Treatment detail"
          value={form.treatmentDetail}
          onChange={(e) => setForm({ ...form, treatmentDetail: e.target.value })}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <MediaField
            label="Before image"
            mediaId={form.beforeImageId}
            mediaUrl={form.beforeUrl}
            onChange={(m) =>
              setForm({ ...form, beforeImageId: m?.id ?? null, beforeUrl: m?.url ?? null })
            }
          />
          <MediaField
            label="After image"
            mediaId={form.afterImageId}
            mediaUrl={form.afterUrl}
            onChange={(m) =>
              setForm({ ...form, afterImageId: m?.id ?? null, afterUrl: m?.url ?? null })
            }
          />
        </div>
        <button type="submit" disabled={saving} className={btnPrimary}>
          {saving ? "Saving…" : "Add gallery case"}
        </button>
      </form>

      <div className="overflow-hidden rounded-card border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-surface/50 text-xs uppercase text-navy/60">
            <tr>
              <th className="px-4 py-3">Case</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Images</th>
            </tr>
          </thead>
          <tbody>
            {initial.map((item) => (
              <tr key={item.id} className="border-b border-border/60">
                <td className="px-4 py-3">
                  <p className="font-medium">{item.title}</p>
                  {item.treatmentDetail ? (
                    <p className="text-xs text-navy/55">{item.treatmentDetail}</p>
                  ) : null}
                </td>
                <td className="px-4 py-3 text-navy/70">{item.category ?? "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {item.beforeUrl ? (
                      <div className="relative h-12 w-16 overflow-hidden rounded border border-border">
                        <MediaThumbnail item={{ url: item.beforeUrl, filename: "Before", alt: "Before" }} className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <span className="text-xs text-navy/40">No before</span>
                    )}
                    {item.afterUrl ? (
                      <div className="relative h-12 w-16 overflow-hidden rounded border border-border">
                        <MediaThumbnail item={{ url: item.afterUrl, filename: "After", alt: "After" }} className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <span className="text-xs text-navy/40">No after</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {initial.length === 0 ? <p className="p-6 text-sm text-navy/60">No gallery cases yet.</p> : null}
      </div>
    </div>
  );
}
