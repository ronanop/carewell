"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PortableTextBlock } from "@portabletext/types";
import { btnPrimary, inputClass, textareaClass } from "@/components/admin/content/AdminFormFields";
import { ContentEditLayout, SidebarPanel } from "@/components/admin/editor/ContentEditLayout";
import { VisualEditorDynamic } from "@/components/admin/editor/VisualEditorDynamic";
import { emptyPortableText } from "@/portable-text/from-html";

export function PageEditForm({
  initial,
}: {
  initial: {
    id?: string;
    slug: string;
    title: string;
    excerpt?: string | null;
    body?: unknown;
    published?: boolean;
    seoTitle?: string | null;
    seoDescription?: string | null;
    seoNoindex?: boolean;
  };
}) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [body, setBody] = useState<PortableTextBlock[]>(
    (Array.isArray(initial.body) ? initial.body : emptyPortableText()) as PortableTextBlock[],
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/admin/content/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, body }),
    });
    const json = (await res.json()) as { ok?: boolean; error?: string };
    setSaving(false);
    if (!json.ok) {
      setMessage(json.error ?? "Save failed");
      return;
    }
    setMessage("Saved");
    router.refresh();
  }

  return (
    <form onSubmit={save}>
      <ContentEditLayout
        actions={
          <>
            <button type="submit" disabled={saving} className={btnPrimary}>
              {saving ? "Saving…" : "Save page"}
            </button>
            {message ? (
              <span className={`text-sm ${message === "Saved" ? "text-teal" : "text-alert"}`}>{message}</span>
            ) : null}
          </>
        }
        main={<VisualEditorDynamic label="Page content" value={body} onChange={setBody} />}
        sidebar={
          <>
            <SidebarPanel title="Page details">
              <label className="block text-sm">
                Title
                <input
                  className={`${inputClass} mt-1`}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </label>
              <label className="block text-sm">
                URL slug
                <input
                  className={`${inputClass} mt-1`}
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  required
                />
              </label>
              <label className="block text-sm">
                Short excerpt
                <textarea
                  className={`${textareaClass} mt-1`}
                  rows={3}
                  value={form.excerpt ?? ""}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.published ?? false}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                />
                Published (visible on site)
              </label>
            </SidebarPanel>
            <SidebarPanel title="SEO">
              <label className="block text-sm">
                SEO title
                <input
                  className={`${inputClass} mt-1`}
                  value={form.seoTitle ?? ""}
                  onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                />
              </label>
              <label className="block text-sm">
                SEO description
                <textarea
                  className={`${textareaClass} mt-1`}
                  rows={2}
                  value={form.seoDescription ?? ""}
                  onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.seoNoindex ?? false}
                  onChange={(e) => setForm({ ...form, seoNoindex: e.target.checked })}
                />
                Hide from Google (noindex)
              </label>
            </SidebarPanel>
          </>
        }
      />
    </form>
  );
}
