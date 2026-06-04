import { AdminContentHeader } from "@/components/admin/content/AdminContentHeader";
import { btnPrimary, inputClass } from "@/components/admin/content/admin-form-styles";
import { saveIntegrationsSettings } from "@/app/admin/(protected)/content/integrations/actions";
import { getSiteSettings } from "@carewell/backend/lib/cms/queries";
import { DEFAULT_WHATSAPP_NUMBER } from "@carewell/backend/lib/whatsapp";

function integrationField(integrations: Record<string, unknown> | null | undefined, key: string): string {
  const value = integrations?.[key];
  return typeof value === "string" ? value : "";
}

export default async function AdminIntegrationsPage() {
  const settings = await getSiteSettings();
  const integrations = (settings?.integrations as Record<string, unknown> | null) ?? {};
  const whatsappDefault =
    integrationField(integrations, "whatsappNumber") || settings?.whatsappNumber || DEFAULT_WHATSAPP_NUMBER;

  return (
    <div>
      <AdminContentHeader
        title="Email & integrations"
        description="Notification email, auto-replies, WhatsApp webhooks, and third-party lead sinks."
      />

      <form action={saveIntegrationsSettings} className="max-w-2xl space-y-6">
        <section className="space-y-3 rounded-card border border-border bg-white p-5">
          <h2 className="font-semibold text-navy">Email notifications</h2>
          <p className="text-xs text-navy/60">
            SendGrid API key stays in server env (<code>SENDGRID_API_KEY</code>). Configure routing here.
          </p>
          <label className="block text-sm">
            Notification inbox email
            <input
              name="notificationEmail"
              className={`${inputClass} mt-1`}
              defaultValue={settings?.notificationEmail ?? ""}
              placeholder="leads@carewellmedicalcentre.com"
            />
          </label>
          <label className="block text-sm">
            SendGrid from address (display)
            <input
              name="sendgridFrom"
              className={`${inputClass} mt-1`}
              defaultValue={integrationField(integrations, "sendgridFrom")}
            />
          </label>
          <label className="block text-sm">
            Auto-reply subject
            <input
              name="autoReplySubject"
              className={`${inputClass} mt-1`}
              defaultValue={settings?.autoReplySubject ?? "Thank you for contacting Care Well"}
            />
          </label>
          <label className="block text-sm">
            Auto-reply body
            <textarea
              name="autoReplyBody"
              className={`${inputClass} mt-1 min-h-[100px]`}
              defaultValue={settings?.autoReplyBody ?? ""}
            />
          </label>
        </section>

        <section className="space-y-3 rounded-card border border-border bg-white p-5">
          <h2 className="font-semibold text-navy">WhatsApp</h2>
          <label className="block text-sm">
            Public WhatsApp number (wa.me links)
            <input
              name="whatsappNumber"
              className={`${inputClass} mt-1`}
              defaultValue={whatsappDefault}
              placeholder="919876543210"
            />
          </label>
          <label className="block text-sm">
            Lead webhook URL (optional — WhatsApp Business / Zapier)
            <input
              name="whatsappWebhook"
              className={`${inputClass} mt-1`}
              defaultValue={integrationField(integrations, "whatsappWebhook")}
            />
          </label>
        </section>

        <section className="space-y-3 rounded-card border border-border bg-white p-5">
          <h2 className="font-semibold text-navy">Other webhooks</h2>
          <label className="block text-sm">
            Generic lead webhook
            <input
              name="leadWebhook"
              className={`${inputClass} mt-1`}
              defaultValue={integrationField(integrations, "leadWebhook")}
            />
          </label>
          <label className="block text-sm">
            Google Sheets webhook
            <input
              name="sheetsWebhook"
              className={`${inputClass} mt-1`}
              defaultValue={integrationField(integrations, "sheetsWebhook")}
            />
          </label>
        </section>

        <button type="submit" className={btnPrimary}>
          Save integrations
        </button>
      </form>
    </div>
  );
}
