import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@carewell/backend/lib/admin-session";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const USE_PRISMA_CMS =
  (process.env.CMS_PROVIDER ?? "prisma").toLowerCase() !== "sanity" &&
  Boolean(process.env.DATABASE_URL);

type RedirectRow = { fromPath: string; toPath: string; statusCode: number };

/** App Router pages that must not be overridden by CMS/migration redirects. */
const PROTECTED_SITE_PATHS = new Set([
  "/about",
  "/about/dr-bhasin",
  "/contact",
  "/faq",
  "/gallery",
  "/blog",
  "/book-consultation",
  "/hair-transplant-in-delhi",
  "/hair-transplant-in-delhi/beard",
  "/hair-transplant-in-delhi/eyebrow",
  "/hair-transplant-in-delhi/female",
  "/hair-transplant-in-delhi/cost",
  "/hair-transplant-in-delhi/before-and-after",
  "/hair-loss-treatment-in-delhi",
  "/hair-loss-treatment-in-delhi/prp",
  "/hair-loss-treatment-in-delhi/growth-factor-concentrate",
  "/cosmetic-treatments-in-delhi",
  "/cosmetic-treatments-in-delhi/botox",
  "/cosmetic-treatments-in-delhi/dermal-fillers",
  "/cosmetic-treatments-in-delhi/anti-aging",
  "/cosmetic-treatments-in-delhi/lip-augmentation",
  "/cosmetic-treatments-in-delhi/laser-hair-removal",
  "/skin-treatments-in-delhi",
  "/skin-treatments-in-delhi/acne-scar",
  "/skin-treatments-in-delhi/skin-whitening",
  "/skin-treatments-in-delhi/dark-circles",
  "/skin-treatments-in-delhi/vitiligo",
  "/plastic-surgery-in-delhi",
  "/plastic-surgery-in-delhi/liposuction",
  "/plastic-surgery-in-delhi/rhinoplasty",
  "/plastic-surgery-in-delhi/breast-augmentation",
  "/plastic-surgery-in-delhi/facelift",
  "/plastic-surgery-in-delhi/tummy-tuck",
  "/plastic-surgery-in-delhi/male-to-female-surgery",
  "/intimate-surgery-in-delhi",
  "/body-contouring-in-delhi",
  "/body-contouring-in-delhi/cryolipolysis",
  "/cost-estimator",
  "/skin-scan",
  "/thank-you",
]);

function isProtectedSitePath(path: string): boolean {
  const normalized = path.replace(/\/+$/, "") || "/";
  return PROTECTED_SITE_PATHS.has(normalized);
}

let redirectCache: { at: number; list: RedirectRow[] } | null = null;
const REDIRECT_TTL_MS = 60_000;

async function getSanityRedirects(): Promise<RedirectRow[]> {
  if (!PROJECT_ID) return [];
  const now = Date.now();
  if (redirectCache && now - redirectCache.at < REDIRECT_TTL_MS) return redirectCache.list;

  const query = encodeURIComponent(
    `*[_type == "redirect"]{ "fromPath": fromPath, "toPath": toPath, "statusCode": statusCode }`,
  );
  const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return redirectCache?.list ?? [];
    const json = (await res.json()) as { result?: RedirectRow[] };
    const list = json.result ?? [];
    redirectCache = { at: now, list };
    return list;
  } catch {
    return redirectCache?.list ?? [];
  }
}

async function getPrismaRedirects(request: NextRequest): Promise<RedirectRow[]> {
  const now = Date.now();
  if (redirectCache && now - redirectCache.at < REDIRECT_TTL_MS) return redirectCache.list;
  const url = new URL("/api/cms/redirects", request.url);
  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return redirectCache?.list ?? [];
    const json = (await res.json()) as { redirects?: RedirectRow[] };
    const list = json.redirects ?? [];
    redirectCache = { at: now, list };
    return list;
  } catch {
    return redirectCache?.list ?? [];
  }
}

async function getRedirects(request: NextRequest): Promise<RedirectRow[]> {
  if (USE_PRISMA_CMS) return getPrismaRedirects(request);
  return getSanityRedirects();
}

async function handleAdminGate(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === "/admin/login" || path.startsWith("/api/admin/")) {
    return NextResponse.next();
  }

  if (!path.startsWith("/admin")) {
    return null;
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  if (session) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  const loginUrl = new URL("/admin/login", request.url);
  if (path !== "/admin") loginUrl.searchParams.set("next", path);
  return NextResponse.redirect(loginUrl);
}

async function handleSanityRedirects(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path.startsWith("/api") || path.startsWith("/admin")) {
    return NextResponse.next();
  }

  const list = await getRedirects(request);
  if (isProtectedSitePath(path)) return NextResponse.next();

  const match = list.find((r) => r.fromPath === path || r.fromPath === path + "/");
  if (!match) return NextResponse.next();

  const toNorm = match.toPath.replace(/\/+$/, "") || match.toPath;
  // Stale DB rows may point legacy blog URLs at /services/{slug}; SEO URLs live at legacy paths.
  if (
    !match.fromPath.startsWith("/services/") &&
    !match.fromPath.startsWith("/blog/") &&
    toNorm.startsWith("/services/")
  ) {
    return NextResponse.next();
  }

  const target = match.toPath.startsWith("http")
    ? match.toPath
    : new URL(match.toPath, request.url).toString();
  return NextResponse.redirect(target, match.statusCode === 302 ? 302 : 301);
}

function isStaticOrFrameworkAsset(path: string): boolean {
  return (
    path.startsWith("/_next") ||
    path.startsWith("/favicon") ||
    /\.(?:css|js|mjs|map|json|ico|png|jpe?g|gif|webp|svg|woff2?|ttf|otf)$/i.test(path)
  );
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (isStaticOrFrameworkAsset(path)) {
    return NextResponse.next();
  }

  const adminResponse = await handleAdminGate(request);
  if (adminResponse) return adminResponse;

  return handleSanityRedirects(request);
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    /*
     * Never run redirect middleware on Next assets — avoids edge cases where
     * middleware latency races with CSS/JS chunk loads during client navigation.
     */
    "/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
