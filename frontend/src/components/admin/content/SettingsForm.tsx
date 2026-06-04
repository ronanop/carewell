"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { btnPrimary, inputClass, textareaClass } from "@/components/admin/content/AdminFormFields";

type Settings = {
  siteName?: string | null;
  phone?: string | null;
  whatsappNumber?: string | null;
  email?: string | null;
  address?: string | null;
  mapEmbedUrl?: string | null;
  mbbsRegNo?: string | null;
  medicalDisclaimer?: string | null;
  gtmId?: string | null;
  ga4MeasurementId?: string | null;
  clarityProjectId?: string | null;
  patientCounterLabel?: string | null;
  patientCounterValue?: number | null;
  helloBarMessages?: string[];
  trustBadges?: string[];
  hours?: string[];
};

function linesToArray(text: string) {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function arrayToLines(arr?: string[]) {
  return (arr ?? []).join("\n");
}

export function SettingsForm({ initial }: { initial: Settings }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [helloBar, setHelloBar] = useState(arrayToLines(initial.helloBarMessages));
  const [trustBadges, setTrustBadges] = useState(arrayToLines(initial.trustBadges));
  const [hours, setHours] = useState(arrayToLines(initial.hours));
  const [saving, setSaving] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/content/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        helloBarMessages: linesToArray(helloBar),
        trustBadges: linesToArray(trustBadges),
        hours: linesToArray(hours),
        patientCounterValue: form.patientCounterValue ? Number(form.patientCounterValue) : null,
      }),
    });
    setSaving(false);
    router.refresh();
  }

  const fields: { key: keyof Settings; label: string; multiline?: boolean }[] = [
    { key: "siteName", label: "Site name" },
    { key: "phone", label: "Phone" },
    { key: "whatsappNumber", label: "WhatsApp number" },
    { key: "email", label: "Public email" },
    { key: "address", label: "Address", multiline: true },
    { key: "mapEmbedUrl", label: "Google Maps embed URL" },
    { key: "mbbsRegNo", label: "MBBS registration no." },
    { key: "medicalDisclaimer", label: "Medical disclaimer", multiline: true },
    { key: "gtmId", label: "Google Tag Manager ID" },
    { key: "ga4MeasurementId", label: "GA4 measurement ID" },
    { key: "clarityProjectId", label: "Microsoft Clarity project ID" },
    { key: "patientCounterLabel", label: "Patient counter label" },
  ];

  return (
    <form onSubmit={save} className="max-w-xl space-y-6">
      <section className="space-y-4">
        <h2 className="font-semibold text-navy">General</h2>
        {fields.map(({ key, label, multiline }) => (
          <label key={key} className="block text-sm">
            {label}
            {multiline ? (
              <textarea
                className={`${textareaClass} mt-1`}
                rows={3}
                value={(form[key] as string) ?? ""}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            ) : (
              <input
                className={`${inputClass} mt-1`}
                value={
                  key === "patientCounterValue"
                    ? String(form.patientCounterValue ?? "")
                    : ((form[key] as string) ?? "")
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    [key]:
                      key === "patientCounterValue"
                        ? e.target.value
                          ? Number(e.target.value)
                          : null
                        : e.target.value,
                  })
                }
              />
            )}
          </label>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold text-navy">Hello bar messages</h2>
        <p className="text-xs text-navy/60">One message per line — rotates in the top banner.</p>
        <textarea className={textareaClass} rows={3} value={helloBar} onChange={(e) => setHelloBar(e.target.value)} />
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold text-navy">Trust badges</h2>
        <textarea className={textareaClass} rows={3} value={trustBadges} onChange={(e) => setTrustBadges(e.target.value)} />
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold text-navy">Opening hours</h2>
        <textarea className={textareaClass} rows={4} value={hours} onChange={(e) => setHours(e.target.value)} />
      </section>

      <button type="submit" disabled={saving} className={btnPrimary}>
        {saving ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}
