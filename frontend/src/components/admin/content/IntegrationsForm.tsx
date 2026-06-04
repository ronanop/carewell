"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { btnPrimary, inputClass } from "@/components/admin/content/AdminFormFields";

export function IntegrationsForm({
  initial,
}: {
  initial: {
    notificationEmail?: string | null;
    autoReplySubject?: string | null;
    autoReplyBody?: string | null;
    integrations?: Record<string, unknown> | null;
  };
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    notificationEmail: initial.notificationEmail ?? "",
    autoReplySubject: initial.autoReplySubject ?? "Thank you for contacting Care Well",
    autoReplyBody: initial.autoReplyBody ?? "",
    whatsappNumber: (initial.integrations?.whatsappNumber as string) ?? "",
    whatsappWebhook: (initial.integrations?.whatsappWebhook as string) ?? "",
    sendgridFrom: (initial.integrations?.sendgridFrom as string) ?? "",
    leadWebhook: (initial.integrations?.leadWebhook as string) ?? "",
    sheetsWebhook: (initial.integrations?.sheetsWebhook as string) ?? "",
  });
  const [saving, setSaving] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/content/integrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        notificationEmail: form.notificationEmail || null,
        autoReplySubject: form.autoReplySubject || null,
        autoReplyBody: form.autoReplyBody || null,
        integrations: {
          whatsappNumber: form.whatsappNumber,
          whatsappWebhook: form.whatsappWebhook,
          sendgridFrom: form.sendgridFrom,
          leadWebhook: form.leadWebhook,
          sheetsWebhook: form.sheetsWebhook,
        },
      }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <form onSubmit={save} className="max-w-2xl space-y-6">
      <section className="space-y-3 rounded-card border border-border bg-white p-5">
        <h2 className="font-semibold text-navy">Email notifications</h2>
        <p className="text-xs text-navy/60">
          SendGrid API key stays in server env (<code>SENDGRID_API_KEY</code>). Configure routing here.
        </p>
        <label className="block text-sm">
          Notification inbox email
          <input
            className={`${inputClass} mt-1`}
            value={form.notificationEmail}
            onChange={(e) => setForm({ ...form, notificationEmail: e.target.value })}
            placeholder="leads@carewellmedicalcentre.com"
          />
        </label>
        <label className="block text-sm">
          SendGrid from address (display)
          <input
            className={`${inputClass} mt-1`}
            value={form.sendgridFrom}
            onChange={(e) => setForm({ ...form, sendgridFrom: e.target.value })}
          />
        </label>
        <label className="block text-sm">
          Auto-reply subject
          <input
            className={`${inputClass} mt-1`}
            value={form.autoReplySubject}
            onChange={(e) => setForm({ ...form, autoReplySubject: e.target.value })}
          />
        </label>
        <label className="block text-sm">
          Auto-reply body
          <textarea
            className={`${inputClass} mt-1 min-h-[100px]`}
            value={form.autoReplyBody}
            onChange={(e) => setForm({ ...form, autoReplyBody: e.target.value })}
          />
        </label>
      </section>

      <section className="space-y-3 rounded-card border border-border bg-white p-5">
        <h2 className="font-semibold text-navy">WhatsApp</h2>
        <label className="block text-sm">
          Public WhatsApp number (wa.me links)
          <input
            className={`${inputClass} mt-1`}
            value={form.whatsappNumber}
            onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
            placeholder="919876543210"
          />
        </label>
        <label className="block text-sm">
          Lead webhook URL (optional — WhatsApp Business / Zapier)
          <input
            className={`${inputClass} mt-1`}
            value={form.whatsappWebhook}
            onChange={(e) => setForm({ ...form, whatsappWebhook: e.target.value })}
          />
        </label>
      </section>

      <section className="space-y-3 rounded-card border border-border bg-white p-5">
        <h2 className="font-semibold text-navy">Other webhooks</h2>
        <label className="block text-sm">
          Generic lead webhook
          <input className={`${inputClass} mt-1`} value={form.leadWebhook} onChange={(e) => setForm({ ...form, leadWebhook: e.target.value })} />
        </label>
        <label className="block text-sm">
          Google Sheets webhook
          <input className={`${inputClass} mt-1`} value={form.sheetsWebhook} onChange={(e) => setForm({ ...form, sheetsWebhook: e.target.value })} />
        </label>
      </section>

      <button type="submit" disabled={saving} className={btnPrimary}>
        {saving ? "Saving…" : "Save integrations"}
      </button>
    </form>
  );
}
