import { NextResponse } from "next/server";
import { z } from "zod";

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
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 422 });
  }

  const payload = {
    ...parsed.data,
    createdAt: new Date().toISOString(),
  };
  if (payload.website) {
    return NextResponse.json({ ok: true, statuses: { bot: "blocked" } });
  }

  const jobs: Promise<void>[] = [];
  const statuses: Record<string, "sent" | "skipped" | "failed"> = {
    sheets: "skipped",
    webhook: "skipped",
    sendgrid: "skipped",
    whatsapp: "skipped",
  };

  const sheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
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

  const webhook = process.env.LEAD_WEBHOOK_URL;
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
  const sendgridTo = process.env.SENDGRID_TO_EMAIL;
  if (sendgridKey && sendgridTo) {
    jobs.push(
      fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sendgridKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: sendgridTo }] }],
          from: { email: process.env.SENDGRID_FROM_EMAIL || "noreply@carewell.example", name: "Care Well Website" },
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

  const waUrl = process.env.LEAD_WHATSAPP_WEBHOOK_URL;
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
  return NextResponse.json({ ok: true, statuses });
}
