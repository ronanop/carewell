"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PortableTextBlock } from "@portabletext/types";
import { MediaField } from "@/components/admin/content/MediaField";
import { btnPrimary, inputClass, textareaClass } from "@/components/admin/content/AdminFormFields";
import { ContentEditLayout, SidebarPanel } from "@/components/admin/editor/ContentEditLayout";
import {
  FaqRepeater,
  QuickFactsRepeater,
  StepsRepeater,
  StringListEditor,
} from "@/components/admin/editor/RepeaterFields";
import { VisualEditorDynamic } from "@/components/admin/editor/VisualEditorDynamic";
import { emptyPortableText } from "@/portable-text/from-html";

type QuickFact = { label: string; value: string };
type Step = { title: string; description: string };
type Faq = { question: string; answer: string };

export type ServiceFormInitial = {
  id: string;
  slug: string;
  legacyPath?: string | null;
  locale: string;
  title: string;
  tagline?: string | null;
  categoryId?: string | null;
  heroImageId?: string | null;
  heroImageUrl?: string | null;
  youtubeVideoId?: string | null;
  treatmentDropdownLabel?: string | null;
  pricingFromInr?: number | null;
  pricingEmiNote?: string | null;
  whatIsBody?: unknown;
  seoTitle?: string | null;
  seoDescription?: string | null;
  insightPoints: string[];
  quickFacts: QuickFact[];
  howItWorksSteps: Step[];
  faqs: Faq[];
};

export function ServiceEditForm({
  initial,
  categories,
}: {
  initial: ServiceFormInitial;
  categories: { id: string; title: string; slug: string }[];
}) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [whatIsBody, setWhatIsBody] = useState<PortableTextBlock[]>(
    (Array.isArray(initial.whatIsBody) ? initial.whatIsBody : emptyPortableText()) as PortableTextBlock[],
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [heroPreview, setHeroPreview] = useState<{ id: string | null; url: string | null }>({
    id: initial.heroImageId ?? null,
    url: initial.heroImageUrl ?? null,
  });

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch("/api/admin/content/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: form.id,
        slug: form.slug,
        legacyPath: form.legacyPath ?? null,
        locale: form.locale,
        title: form.title,
        tagline: form.tagline,
        categoryId: form.categoryId,
        heroImageId: form.heroImageId,
        youtubeVideoId: form.youtubeVideoId,
        treatmentDropdownLabel: form.treatmentDropdownLabel,
        pricingFromInr: form.pricingFromInr,
        pricingEmiNote: form.pricingEmiNote,
        whatIsBody,
        seoTitle: form.seoTitle,
        seoDescription: form.seoDescription,
        insightPoints: form.insightPoints.filter(Boolean),
        quickFacts: form.quickFacts.filter((f) => f.label.trim() || f.value.trim()),
        howItWorksSteps: form.howItWorksSteps.filter((s) => s.title.trim()),
        faqs: form.faqs.filter((f) => f.question.trim()),
      }),
    });
    const json = await res.json();
    setSaving(false);
    if (!json.ok) {
      setError(json.error ?? "Save failed");
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={save} className="space-y-6">
      {error ? <p className="rounded-button bg-alert-light px-3 py-2 text-sm text-alert">{error}</p> : null}

      <ContentEditLayout
        actions={
          <button type="submit" disabled={saving} className={btnPrimary}>
            {saving ? "Saving…" : "Save service page"}
          </button>
        }
        main={
          <div className="space-y-6">
            <VisualEditorDynamic
              label="What is this treatment? (main article)"
              value={whatIsBody}
              onChange={setWhatIsBody}
              contextServiceSlug={initial.slug}
              placeholder="Explain the procedure, benefits, and what makes Care Well different…"
            />
            <div className="rounded-card border border-border bg-white p-5 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-navy">Key insights</p>
              <StringListEditor
                label=""
                items={form.insightPoints.length ? form.insightPoints : [""]}
                onChange={(insightPoints) => setForm({ ...form, insightPoints })}
                placeholder="Bullet point"
              />
            </div>
            <div className="rounded-card border border-border bg-white p-5 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-navy">How it works (steps)</p>
              <StepsRepeater
                items={form.howItWorksSteps}
                onChange={(howItWorksSteps) => setForm({ ...form, howItWorksSteps })}
              />
            </div>
            <div className="rounded-card border border-border bg-white p-5 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-navy">FAQs</p>
              <FaqRepeater items={form.faqs} onChange={(faqs) => setForm({ ...form, faqs })} />
            </div>
          </div>
        }
        sidebar={
          <>
            <SidebarPanel title="Service details">
              <label className="block text-sm">
                Title
                <input
                  className={`${inputClass} mt-1`}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </label>
              {form.legacyPath ? (
                <p className="text-sm text-navy/70">
                  Public URL{" "}
                  <code className="mt-1 block rounded bg-surface px-2 py-1 text-xs">
                    {form.legacyPath}/
                  </code>
                </p>
              ) : null}
              <label className="block text-sm">
                Internal slug
                <input
                  className={`${inputClass} mt-1 font-mono text-xs`}
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  required
                />
              </label>
              <label className="block text-sm">
                Tagline
                <input
                  className={`${inputClass} mt-1`}
                  value={form.tagline ?? ""}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                />
              </label>
              <label className="block text-sm">
                Category
                <select
                  className={`${inputClass} mt-1`}
                  value={form.categoryId ?? ""}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value || null })}
                >
                  <option value="">— None —</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </label>
              <MediaField
                label="Hero image"
                mediaId={heroPreview.id}
                mediaUrl={heroPreview.url}
                onChange={(m) => {
                  setHeroPreview({ id: m?.id ?? null, url: m?.url ?? null });
                  setForm((f) => ({ ...f, heroImageId: m?.id ?? null }));
                }}
              />
              <label className="block text-sm">
                YouTube video ID
                <input
                  className={`${inputClass} mt-1`}
                  value={form.youtubeVideoId ?? ""}
                  onChange={(e) => setForm({ ...form, youtubeVideoId: e.target.value })}
                  placeholder="e.g. dQw4w9WgXcQ"
                />
              </label>
              <label className="block text-sm">
                Starting price (₹ INR)
                <input
                  type="number"
                  className={`${inputClass} mt-1`}
                  value={form.pricingFromInr ?? ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      pricingFromInr: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                />
              </label>
              <label className="block text-sm">
                EMI / pricing note
                <textarea
                  className={`${textareaClass} mt-1`}
                  rows={2}
                  value={form.pricingEmiNote ?? ""}
                  onChange={(e) => setForm({ ...form, pricingEmiNote: e.target.value })}
                />
              </label>
            </SidebarPanel>
            <SidebarPanel title="Quick facts">
              <QuickFactsRepeater
                items={form.quickFacts.length ? form.quickFacts : [{ label: "", value: "" }]}
                onChange={(quickFacts) => setForm({ ...form, quickFacts })}
              />
            </SidebarPanel>
            <SidebarPanel title="SEO">
              <label className="block text-sm">
                Meta title
                <input
                  className={`${inputClass} mt-1`}
                  value={form.seoTitle ?? ""}
                  onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                />
              </label>
              <label className="block text-sm">
                Meta description
                <textarea
                  className={`${textareaClass} mt-1`}
                  rows={3}
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
