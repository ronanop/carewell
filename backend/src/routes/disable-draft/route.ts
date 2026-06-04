import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site";

export async function GET() {
  draftMode().disable();
  return NextResponse.redirect(getSiteUrl());
}
