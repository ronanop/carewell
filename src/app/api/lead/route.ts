import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch {
      /* continue to optional channels */
    }
  }

  const sendgridKey = process.env.SENDGRID_API_KEY;
  const sendgridTo = process.env.SENDGRID_TO_EMAIL;
  if (sendgridKey && sendgridTo) {
    try {
      await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sendgridKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: sendgridTo }] }],
          from: { email: process.env.SENDGRID_FROM_EMAIL || "noreply@carewell.example", name: "Care Well Website" },
          subject: "New website lead",
          content: [{ type: "text/plain", value: JSON.stringify(body, null, 2) }],
        }),
      });
    } catch {
      /* non-fatal */
    }
  }

  const waUrl = process.env.LEAD_WHATSAPP_WEBHOOK_URL;
  if (waUrl) {
    try {
      await fetch(waUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch {
      /* non-fatal */
    }
  }

  console.info("[lead]", body);
  return NextResponse.json({ ok: true });
}
