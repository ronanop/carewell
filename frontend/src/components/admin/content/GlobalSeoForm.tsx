"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { btnPrimary, inputClass, textareaClass } from "@/components/admin/content/AdminFormFields";

export function GlobalSeoForm({
  initial,
}: {
  initial: { globalSeoTitle?: string | null; globalSeoDescription?: string | null };
}) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/content/integrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <form onSubmit={save} className="max-w-xl space-y-4">
      <label className="block text-sm">
        Default site title (fallback)
        <input
          className={`${inputClass} mt-1`}
          value={form.globalSeoTitle ?? ""}
          onChange={(e) => setForm({ ...form, globalSeoTitle: e.target.value })}
        />
      </label>
      <label className="block text-sm">
        Default meta description
        <textarea
          className={`${textareaClass} mt-1`}
          rows={3}
          value={form.globalSeoDescription ?? ""}
          onChange={(e) => setForm({ ...form, globalSeoDescription: e.target.value })}
        />
      </label>
      <button type="submit" disabled={saving} className={btnPrimary}>
        {saving ? "Saving…" : "Save global SEO"}
      </button>
    </form>
  );
}
