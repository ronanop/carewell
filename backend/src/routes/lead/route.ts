import { z } from "zod";
import { saveFormSubmission } from "@/lib/cms/admin-write";
import { getSiteSettings } from "@/lib/cms/queries";

const leadSchema = z.object({
  name: z.string().min(2),
  mobile: z.string().min(10),
  treatment: z.string().min(1),
  city: z.string().optional().default(""),
  pageUrl: z.string().optional().default(""),
  utmSource: z.string().optional().default(""),
  utmMedium: z.string().optional().default(""),
  utmCampaign: z.string().optional().default(""),
  source: z.string().optional().default("web"),
  website: z.string().optional().default(""),
});

const rateWindowMs = 60_000;
const rateLimit = 15;
const ipHits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const history = (ipHits.get(ip) || []).filter((ts) => now - ts < rateWindowMs);
  history.push(now);
  ipHits.set(ip, history);
  return history.length > rateLimit;
}

async function postJson(url: string, payload: Record<string, unknown>) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`non-200: ${res.status}`);
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (isRateLimited(ip)) {
    return Response.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "Invalid payload" }, { status: 422 });
  }

  const payload = {
    ...parsed.data,
    createdAt: new Date().toISOString(),
  };
  if (payload.website) {
    return Response.json({ ok: true, statuses: { bot: "blocked" } });
  }

  const settings = await getSiteSettings().catch(() => null);
  const integrations = (settings?.integrations ?? {}) as Record<string, string>;
  const notificationEmail = settings?.notificationEmail ?? process.env.SENDGRID_TO_EMAIL;
  const sendgridFrom =
    integrations.sendgridFrom ?? process.env.SENDGRID_FROM_EMAIL ?? "noreply@carewell.example";

  const jobs: Promise<void>[] = [];
  const statuses: Record<string, "sent" | "skipped" | "failed" | "saved"> = {
    database: "skipped",
    sheets: "skipped",
    webhook: "skipped",
    sendgrid: "skipped",
    whatsapp: "skipped",
  };

  try {
    await saveFormSubmission({
      formType: "lead",
      name: parsed.data.name,
      phone: parsed.data.mobile,
      treatment: parsed.data.treatment,
      pageUrl: parsed.data.pageUrl || null,
      source: parsed.data.source || null,
      utmSource: parsed.data.utmSource || null,
      utmMedium: parsed.data.utmMedium || null,
      utmCampaign: parsed.data.utmCampaign || null,
      ip,
      payload: payload as never,
    });
    statuses.database = "saved";
  } catch {
    statuses.database = "failed";
  }

  const sheetsWebhook = integrations.sheetsWebhook || process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (sheetsWebhook) {
    jobs.push(
      postJson(sheetsWebhook, payload)
        .then(() => {
          statuses.sheets = "sent";
        })
        .catch(() => {
          statuses.sheets = "failed";
        }),
    );
  }

  const webhook = integrations.leadWebhook || process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    jobs.push(
      postJson(webhook, payload)
        .then(() => {
          statuses.webhook = "sent";
        })
        .catch(() => {
          statuses.webhook = "failed";
        }),
    );
  }

  const sendgridKey = process.env.SENDGRID_API_KEY;
  if (sendgridKey && notificationEmail) {
    jobs.push(
      fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sendgridKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: notificationEmail }] }],
          from: { email: sendgridFrom, name: "Care Well Website" },
          subject: "New website lead",
          content: [{ type: "text/plain", value: JSON.stringify(payload, null, 2) }],
        }),
      })
        .then(() => {
          statuses.sendgrid = "sent";
        })
        .catch(() => {
          statuses.sendgrid = "failed";
        }),
    );
  }

  const waUrl = integrations.whatsappWebhook || process.env.LEAD_WHATSAPP_WEBHOOK_URL;
  if (waUrl) {
    jobs.push(
      postJson(waUrl, payload)
        .then(() => {
          statuses.whatsapp = "sent";
        })
        .catch(() => {
          statuses.whatsapp = "failed";
        }),
    );
  }

  await Promise.allSettled(jobs);
  console.info("[lead]", payload, statuses);
  return Response.json({ ok: true, statuses });
}
