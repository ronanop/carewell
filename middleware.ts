import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

type RedirectRow = { fromPath: string; toPath: string; statusCode: number };

let cache: { at: number; list: RedirectRow[] } | null = null;
const TTL_MS = 60_000;

async function getRedirects(): Promise<RedirectRow[]> {
  if (!PROJECT_ID) return [];
  const now = Date.now();
  if (cache && now - cache.at < TTL_MS) return cache.list;

  const query = encodeURIComponent(
    `*[_type == "redirect"]{ "fromPath": fromPath, "toPath": toPath, "statusCode": statusCode }`,
  );
  const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return cache?.list ?? [];
    const json = (await res.json()) as { result?: RedirectRow[] };
    const list = json.result ?? [];
    cache = { at: now, list };
    return list;
  } catch {
    return cache?.list ?? [];
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path.startsWith("/_next") || path.startsWith("/api") || path.startsWith("/studio")) {
    return NextResponse.next();
  }

  const list = await getRedirects();
  const match = list.find((r) => r.fromPath === path || r.fromPath === path + "/");
  if (!match) return NextResponse.next();

  const target = match.toPath.startsWith("http")
    ? match.toPath
    : new URL(match.toPath, request.url).toString();
  return NextResponse.redirect(target, match.statusCode === 302 ? 302 : 301);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
