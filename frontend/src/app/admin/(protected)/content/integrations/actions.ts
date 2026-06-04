"use server";

import { revalidatePath } from "next/cache";
import { upsertSiteSettings } from "@carewell/backend/lib/cms/admin-write";

export async function saveIntegrationsSettings(formData: FormData) {
  const notificationEmail = String(formData.get("notificationEmail") ?? "").trim() || null;
  const autoReplySubject = String(formData.get("autoReplySubject") ?? "").trim() || null;
  const autoReplyBody = String(formData.get("autoReplyBody") ?? "").trim() || null;

  const whatsappNumber = String(formData.get("whatsappNumber") ?? "").trim();

  await upsertSiteSettings({
    notificationEmail,
    autoReplySubject,
    autoReplyBody,
    whatsappNumber: whatsappNumber || null,
    integrations: {
      whatsappNumber,
      whatsappWebhook: String(formData.get("whatsappWebhook") ?? ""),
      sendgridFrom: String(formData.get("sendgridFrom") ?? ""),
      leadWebhook: String(formData.get("leadWebhook") ?? ""),
      sheetsWebhook: String(formData.get("sheetsWebhook") ?? ""),
    },
  });

  revalidatePath("/admin/content/integrations");
  revalidatePath("/", "layout");
}
