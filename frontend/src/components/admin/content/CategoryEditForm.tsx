"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PortableTextBlock } from "@portabletext/types";
import { btnPrimary, inputClass, textareaClass } from "@/components/admin/content/AdminFormFields";
import { ContentEditLayout, SidebarPanel } from "@/components/admin/editor/ContentEditLayout";
import { VisualEditorDynamic } from "@/components/admin/editor/VisualEditorDynamic";
import { emptyPortableText } from "@/portable-text/from-html";

export function CategoryEditForm({
  initial,
}: {
  initial: {
    id: string;
    slug: string;
    title: string;
    megaMenuKey?: string | null;
    heroSubtitle?: string | null;
    intro?: unknown;
    seoTitle?: string | null;
    seoDescription?: string | null;
  };
}) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [intro, setIntro] = useState<PortableTextBlock[]>(
    (Array.isArray(initial.intro) ? initial.intro : emptyPortableText()) as PortableTextBlock[],
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/admin/content/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, intro }),
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
              {saving ? "Saving…" : "Save category"}
            </button>
            {message ? (
              <span className={`text-sm ${message === "Saved" ? "text-teal" : "text-alert"}`}>{message}</span>
            ) : null}
          </>
        }
        main={
          <VisualEditorDynamic
            label="Category introduction"
            value={intro}
            onChange={setIntro}
            placeholder="Introduce this treatment category — what patients can expect, who it's for, etc."
          />
        }
        sidebar={
          <>
            <SidebarPanel title="Category details">
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
                Mega menu key
                <input
                  className={`${inputClass} mt-1`}
                  value={form.megaMenuKey ?? ""}
                  onChange={(e) => setForm({ ...form, megaMenuKey: e.target.value })}
                />
              </label>
              <label className="block text-sm">
                Hero subtitle
                <textarea
                  className={`${textareaClass} mt-1`}
                  rows={2}
                  value={form.heroSubtitle ?? ""}
                  onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
                />
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
            </SidebarPanel>
          </>
        }
      />
    </form>
  );
}
