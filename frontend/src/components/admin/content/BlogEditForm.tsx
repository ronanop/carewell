"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PortableTextBlock } from "@portabletext/types";
import { MediaField } from "@/components/admin/content/MediaField";
import { btnPrimary, inputClass, textareaClass } from "@/components/admin/content/AdminFormFields";
import { ContentEditLayout, SidebarPanel } from "@/components/admin/editor/ContentEditLayout";
import { VisualEditorDynamic } from "@/components/admin/editor/VisualEditorDynamic";
import { BlogSuggestedPostsField } from "@/components/admin/content/BlogSuggestedPostsField";
import { emptyPortableText } from "@/portable-text/from-html";

export function BlogEditForm({
  initial,
}: {
  initial: {
    id: string;
    slug: string;
    legacyPath?: string | null;
    title: string;
    excerpt?: string | null;
    body?: unknown;
    category?: string | null;
    featured?: boolean;
    publishedAt?: string | null;
    readTimeMinutes?: number | null;
    coverImageId?: string | null;
    coverImageUrl?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    suggestedPostSlugs?: string[];
  };
}) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [suggestedPostSlugs, setSuggestedPostSlugs] = useState<string[]>(
    initial.suggestedPostSlugs ?? [],
  );
  const [body, setBody] = useState<PortableTextBlock[]>(
    (Array.isArray(initial.body) ? initial.body : emptyPortableText()) as PortableTextBlock[],
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<{ id: string | null; url: string | null }>({
    id: initial.coverImageId ?? null,
    url: initial.coverImageUrl ?? null,
  });

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/admin/content/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, body, suggestedPostSlugs }),
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
              {saving ? "Saving…" : "Save post"}
            </button>
            {message ? (
              <span className={`text-sm ${message === "Saved" ? "text-teal" : "text-alert"}`}>{message}</span>
            ) : null}
          </>
        }
        main={<VisualEditorDynamic label="Article body" value={body} onChange={setBody} />}
        sidebar={
          <>
            <SidebarPanel title="Post details">
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
              {form.legacyPath ? (
                <p className="text-xs text-navy/60">
                  Legacy public URL:{" "}
                  <a
                    href={`${form.legacyPath}/`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-primary hover:underline"
                  >
                    {form.legacyPath}/
                  </a>
                </p>
              ) : null}
              <label className="block text-sm">
                Category
                <input
                  className={`${inputClass} mt-1`}
                  value={form.category ?? ""}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Hair transplant"
                />
              </label>
              <label className="block text-sm">
                Excerpt
                <textarea
                  className={`${textareaClass} mt-1`}
                  rows={3}
                  value={form.excerpt ?? ""}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                />
              </label>
              <MediaField
                label="Cover image"
                mediaId={coverPreview.id}
                mediaUrl={coverPreview.url}
                onChange={(m) => {
                  setCoverPreview({ id: m?.id ?? null, url: m?.url ?? null });
                  setForm((f) => ({ ...f, coverImageId: m?.id ?? null }));
                }}
              />
              <label className="block text-sm">
                Publish date
                <input
                  type="date"
                  className={`${inputClass} mt-1`}
                  value={form.publishedAt?.slice(0, 10) ?? ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      publishedAt: e.target.value ? new Date(e.target.value).toISOString() : null,
                    })
                  }
                />
              </label>
              <label className="block text-sm">
                Read time (minutes)
                <input
                  type="number"
                  min={1}
                  className={`${inputClass} mt-1`}
                  value={form.readTimeMinutes ?? ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      readTimeMinutes: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={Boolean(form.featured)}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                />
                Featured on homepage
              </label>
            </SidebarPanel>
            <SidebarPanel title="Suggested posts">
              <BlogSuggestedPostsField
                currentSlug={form.slug}
                value={suggestedPostSlugs}
                onChange={setSuggestedPostSlugs}
              />
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
            </SidebarPanel>
          </>
        }
      />
    </form>
  );
}
