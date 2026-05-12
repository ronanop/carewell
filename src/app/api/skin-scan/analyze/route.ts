import { NextResponse } from "next/server";

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BASE64_LENGTH = 4_500_000;

const SYSTEM_PROMPT = `You are a vision-enabled assistant for a cosmetic clinic website.
The user's message always includes a photograph of skin (face or other) as an image attachment (base64 data URL).
You MUST look at that photograph and base your entire answer on what is visible in it.
Never say you cannot view, receive, or analyze images, and never give a generic answer that ignores the photo.
If the image is too dark, blurry, or does not show skin, say exactly that and ask for a clearer photo.
Stay non-diagnostic: describe observations and suggest discussing concerns with a dermatologist rather than naming a definitive medical diagnosis.`;

const USER_PROMPT = `Analyse my skin and tell me if any skin issues are there.

Instructions:
- Answer in plain English, concise but helpful.
- Describe what you can see (texture, tone, anything noticeable in the photo).
- Mention possible concerns only as things to discuss with a dermatologist — do not state a definitive diagnosis.
- End with one short sentence: this is general information only, not medical advice; see a doctor in person for diagnosis.`;

type OpenAIChatResponse = {
  choices?: { message?: { content?: string | null; refusal?: string | null } }[];
  error?: { message?: string; type?: string };
};

/** Models that accept image_url in chat completions. Non-vision models get upgraded so analysis always uses sight. */
function resolveVisionModel(requested: string | undefined): string {
  const m = requested?.trim();
  if (!m) return "gpt-4o";

  const lower = m.toLowerCase();
  const likelyNoVision =
    lower.startsWith("gpt-3.5") ||
    /^gpt-4-0314|^gpt-4-0613|^gpt-4-32k|^gpt-4$/.test(lower) ||
    lower.startsWith("text-") ||
    lower.startsWith("davinci") ||
    lower.startsWith("babbage");

  if (likelyNoVision) {
    console.warn(`[skin-scan] OPENAI_SKIN_MODEL="${m}" may not support vision; using gpt-4o`);
    return "gpt-4o";
  }
  return m;
}

export async function POST(req: Request) {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) {
    return NextResponse.json(
      {
        ok: false,
        error: "Skin scan is not configured. Add OPENAI_API_KEY on the server (see .env.example).",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const { imageBase64, mimeType } = body as { imageBase64?: unknown; mimeType?: unknown };
  if (typeof imageBase64 !== "string" || typeof mimeType !== "string") {
    return NextResponse.json({ ok: false, error: "Expected imageBase64 and mimeType strings." }, { status: 400 });
  }
  if (!ALLOWED_MIME.has(mimeType)) {
    return NextResponse.json({ ok: false, error: "Unsupported image type." }, { status: 400 });
  }
  if (imageBase64.length > MAX_BASE64_LENGTH || imageBase64.length < 100) {
    return NextResponse.json({ ok: false, error: "Image payload size is invalid." }, { status: 400 });
  }

  const cleanedB64 = imageBase64.replace(/\s/g, "");
  const dataUrl = `data:${mimeType};base64,${cleanedB64}`;

  const model = resolveVisionModel(process.env.OPENAI_SKIN_MODEL);
  const baseUrl = (process.env.OPENAI_BASE_URL?.trim() || "https://api.openai.com/v1").replace(/\/$/, "");
  const url = `${baseUrl}/chat/completions`;

  /** Image first improves multimodal grounding; `high` detail helps skin texture. */
  const payload = {
    model,
    max_tokens: 1200,
    temperature: 0.35,
    messages: [
      { role: "system" as const, content: SYSTEM_PROMPT },
      {
        role: "user" as const,
        content: [
          { type: "image_url" as const, image_url: { url: dataUrl, detail: "high" as const } },
          { type: "text" as const, text: USER_PROMPT },
        ],
      },
    ],
  };

  const isDev = process.env.NODE_ENV === "development";

  let openaiRes: Response;
  try {
    openaiRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error("skin-scan OpenAI fetch", e);
    return NextResponse.json(
      {
        ok: false,
        error: "Could not reach OpenAI. Check your network and OPENAI_BASE_URL if set.",
        ...(isDev && { devDetail: String(e) }),
      },
      { status: 502 },
    );
  }

  const raw = await openaiRes.text();
  let data: OpenAIChatResponse;
  try {
    data = JSON.parse(raw) as OpenAIChatResponse;
  } catch {
    console.error("OpenAI non-JSON", openaiRes.status, raw.slice(0, 400));
    return NextResponse.json(
      {
        ok: false,
        error: "Analysis service returned an unexpected response.",
        ...(isDev && { devDetail: raw.slice(0, 500) }),
      },
      { status: 502 },
    );
  }

  if (!openaiRes.ok) {
    const msg = data?.error?.message ?? raw.slice(0, 280);
    console.error("OpenAI HTTP", openaiRes.status, msg);
    if (openaiRes.status === 401) {
      return NextResponse.json(
        {
          ok: false,
          error: "OpenAI rejected the API key. Check OPENAI_API_KEY.",
          ...(isDev && { devDetail: msg }),
        },
        { status: 502 },
      );
    }
    if (openaiRes.status === 429) {
      return NextResponse.json(
        {
          ok: false,
          error: "Too many requests. Wait a moment and try again.",
          ...(isDev && { devDetail: msg }),
        },
        { status: 429 },
      );
    }
    return NextResponse.json(
      {
        ok: false,
        error: "Analysis service unavailable. Try again later.",
        ...(isDev && { devDetail: msg }),
      },
      { status: 502 },
    );
  }

  const choice = data.choices?.[0];
  let text = choice?.message?.content?.trim();
  const refusal = choice?.message?.refusal?.trim();

  const dodgesImage = (t: string | undefined) =>
    !!t &&
    /unable to (view|see|analyze) (images?|photos?|pictures?)|can'?t (view|see|analyze) (images?|photos?)|I don'?t have (the )?ability to (view|see|analyze)|I can'?t analyze images/i.test(
      t,
    );

  if (refusal && !text) {
    return NextResponse.json(
      {
        ok: false,
        error: "The model declined to analyse this image. Try a different photo or try again later.",
        ...(isDev && { devDetail: refusal }),
      },
      { status: 422 },
    );
  }

  /** Retry once with gpt-4o if the chosen model ignored vision (common with wrong deployment / non-vision model). */
  if ((!text || dodgesImage(text)) && model !== "gpt-4o") {
    console.warn("[skin-scan] Retrying with gpt-4o after empty or non-vision reply");
    const retryPayload = { ...payload, model: "gpt-4o" };
    try {
      const retryRes = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify(retryPayload),
      });
      const retryRaw = await retryRes.text();
      const retryData = JSON.parse(retryRaw) as OpenAIChatResponse;
      if (retryRes.ok) {
        const t = retryData.choices?.[0]?.message?.content?.trim();
        if (t) text = t;
      }
    } catch {
      /* keep text as-is */
    }
  }

  if (!text) {
    console.error("OpenAI empty content", JSON.stringify(data).slice(0, 500));
    return NextResponse.json(
      {
        ok: false,
        error: "Could not generate analysis for this image. Try a clearer, well-lit photo.",
        ...(isDev && { devDetail: "Empty message.content from OpenAI" }),
      },
      { status: 422 },
    );
  }

  if (dodgesImage(text)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "The model still did not use your photo. In .env.local set OPENAI_SKIN_MODEL=gpt-4o, confirm your OpenAI project allows image inputs, restart npm run dev, and try again.",
        ...(isDev && { devDetail: text.slice(0, 400) }),
      },
      { status: 422 },
    );
  }

  return NextResponse.json({ ok: true, text });
}
