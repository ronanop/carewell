"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function JsonEditorForm({
  apiPath,
  field,
  initial,
  label,
}: {
  apiPath: string;
  field: string;
  initial: unknown;
  label: string;
}) {
  const router = useRouter();
  const [text, setText] = useState(JSON.stringify(initial ?? (field === "items" ? [] : {}), null, 2));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      setError("Invalid JSON");
      setSaving(false);
      return;
    }
    const res = await fetch(apiPath, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: parsed }),
    });
    const json = await res.json();
    setSaving(false);
    if (!json.ok) setError(json.error ?? "Save failed");
    else router.refresh();
  }

  return (
    <form onSubmit={save} className="space-y-3">
      <label className="block text-sm font-semibold text-navy">{label}</label>
      {error ? <p className="text-sm text-alert">{error}</p> : null}
      <textarea
        className="min-h-[320px] w-full rounded-card border border-border bg-white p-3 font-mono text-xs"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        disabled={saving}
        className="rounded-button bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
