export const ADMIN_SESSION_COOKIE = "carewell_admin_session";
const SESSION_TTL_SEC = 60 * 60 * 24;

export type AdminSession = {
  sub: string;
  exp: number;
};

function getSessionSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  return secret && secret.length >= 16 ? secret : null;
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const buf = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (let i = 0; i < buf.length; i++) binary += String.fromCharCode(buf[i]!);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

async function hmacSign(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return toBase64Url(sig);
}

export function isAdminAuthConfigured(): boolean {
  const secret = getSessionSecret();
  const hasPassword = Boolean(process.env.ADMIN_PASSWORD?.length);
  const hasHash = Boolean(process.env.ADMIN_PASSWORD_HASH?.length);
  return Boolean(secret && (hasPassword || hasHash));
}

export async function createSessionToken(session: AdminSession): Promise<string> {
  const secret = getSessionSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured (min 16 characters).");

  const payload = toBase64Url(new TextEncoder().encode(JSON.stringify(session)));
  const signature = await hmacSign(payload, secret);
  return `${payload}.${signature}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<AdminSession | null> {
  if (!token) return null;
  const secret = getSessionSecret();
  if (!secret) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = await hmacSign(payload, secret);
  const a = new TextEncoder().encode(signature);
  const b = new TextEncoder().encode(expected);
  if (a.length !== b.length) return null;

  let match = 0;
  for (let i = 0; i < a.length; i++) match |= a[i]! ^ b[i]!;
  if (match !== 0) return null;

  try {
    const json = new TextDecoder().decode(fromBase64Url(payload));
    const session = JSON.parse(json) as AdminSession;
    if (!session?.sub || typeof session.exp !== "number") return null;
    if (session.exp < Math.floor(Date.now() / 1000)) return null;
    return session;
  } catch {
    return null;
  }
}

export async function createAdminSession(email?: string): Promise<{ token: string; session: AdminSession }> {
  const sub = email?.trim() || process.env.ADMIN_EMAIL?.trim() || "admin";
  const session: AdminSession = {
    sub,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SEC,
  };
  const token = await createSessionToken(session);
  return { token, session };
}

export function sessionCookieOptions(maxAge = SESSION_TTL_SEC) {
  const secure = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}
