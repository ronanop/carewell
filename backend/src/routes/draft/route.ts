import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site";

/** Enables Next.js draft mode for Sanity Presentation preview. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  if (!secret || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new NextResponse("Invalid secret", { status: 401 });
  }
  const path = searchParams.get("redirect") ?? "/";
  draftMode().enable();
  const base = getSiteUrl();
  const target = path.startsWith("http") ? path : `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
  return NextResponse.redirect(target);
}
