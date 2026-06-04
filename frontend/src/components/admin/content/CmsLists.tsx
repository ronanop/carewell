"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { btnPrimary, inputClass } from "@/components/admin/content/AdminFormFields";

export function TestimonialsAdminList({
  initial,
}: {
  initial: { id: string; quote: string; attribution?: string | null; rating?: number | null }[];
}) {
  const router = useRouter();
  const [quote, setQuote] = useState("");
  const [attribution, setAttribution] = useState("");
  const [saving, setSaving] = useState(false);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/content/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quote, attribution }),
    });
    setQuote("");
    setAttribution("");
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={add} className="max-w-lg space-y-3 rounded-card border border-border bg-white p-5">
        <h2 className="font-semibold text-navy">Add testimonial</h2>
        <textarea className={`${inputClass} min-h-[80px]`} placeholder="Quote" value={quote} onChange={(e) => setQuote(e.target.value)} required />
        <input className={inputClass} placeholder="Attribution (name)" value={attribution} onChange={(e) => setAttribution(e.target.value)} />
        <button type="submit" disabled={saving} className={btnPrimary}>
          {saving ? "Saving…" : "Add testimonial"}
        </button>
      </form>

      <ul className="space-y-3">
        {initial.map((t) => (
          <li key={t.id} className="rounded-card border border-border bg-white p-4">
            <p className="text-sm italic text-navy/90">&ldquo;{t.quote}&rdquo;</p>
            {t.attribution ? <p className="mt-2 text-xs font-semibold text-navy/70">— {t.attribution}</p> : null}
          </li>
        ))}
        {initial.length === 0 ? <p className="text-sm text-navy/60">No testimonials yet.</p> : null}
      </ul>
    </div>
  );
}

export function LocationsAdminList({
  initial,
}: {
  initial: { id: string; slug: string; title: string; areaName?: string | null }[];
}) {
  const router = useRouter();
  const [form, setForm] = useState({ slug: "", title: "", areaName: "" });
  const [saving, setSaving] = useState(false);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/content/locations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ slug: "", title: "", areaName: "" });
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={add} className="max-w-lg space-y-3 rounded-card border border-border bg-white p-5">
        <h2 className="font-semibold text-navy">Add location page</h2>
        <input className={inputClass} placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input className={inputClass} placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
        <input className={inputClass} placeholder="Area name" value={form.areaName} onChange={(e) => setForm({ ...form, areaName: e.target.value })} />
        <button type="submit" disabled={saving} className={btnPrimary}>
          {saving ? "Saving…" : "Add location"}
        </button>
      </form>

      <div className="overflow-hidden rounded-card border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-surface/50 text-xs uppercase text-navy/60">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {initial.map((p) => (
              <tr key={p.id} className="border-b border-border/60">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-navy/70">{p.slug}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/locations/${p.slug}`} target="_blank" className="text-primary hover:underline">
                    View ↗
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {initial.length === 0 ? <p className="p-6 text-sm text-navy/60">No hyperlocal pages yet.</p> : null}
      </div>
    </div>
  );
}
