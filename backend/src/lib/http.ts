export function isErrorResponse(value: unknown): value is Response {
  return value instanceof Response && !value.ok;
}

export function getCookie(req: Request, name: string): string | undefined {
  const header = req.headers.get("cookie");
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const [rawKey, ...rest] = part.trim().split("=");
    if (rawKey === name) return decodeURIComponent(rest.join("="));
  }
  return undefined;
}

type CookieOptions = {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
  path?: string;
  maxAge?: number;
};

export function serializeSetCookie(name: string, value: string, options: CookieOptions = {}): string {
  const segments = [`${name}=${encodeURIComponent(value)}`];
  if (options.maxAge !== undefined) segments.push(`Max-Age=${options.maxAge}`);
  if (options.path) segments.push(`Path=${options.path}`);
  if (options.httpOnly) segments.push("HttpOnly");
  if (options.secure) segments.push("Secure");
  if (options.sameSite) segments.push(`SameSite=${options.sameSite}`);
  return segments.join("; ");
}

export function jsonWithCookie<T>(
  data: T,
  cookie: { name: string; value: string; options?: CookieOptions },
  init?: ResponseInit,
): Response {
  const res = Response.json(data, init);
  res.headers.append("Set-Cookie", serializeSetCookie(cookie.name, cookie.value, cookie.options));
  return res;
}

export function clearSessionCookie(name: string): Response {
  const res = Response.json({ ok: true });
  res.headers.append(
    "Set-Cookie",
    serializeSetCookie(name, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    }),
  );
  return res;
}
