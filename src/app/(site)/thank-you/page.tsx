import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";
import { whatsappHref } from "@/lib/whatsapp";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: true },
  alternates: { canonical: `${getSiteUrl()}/thank-you` },
};

export default async function ThankYouPage() {
  const s = (await sanityFetch<{ whatsappNumber?: string }>(siteSettingsQuery)) ?? {};
  const wa = s.whatsappNumber
    ? whatsappHref(s.whatsappNumber, "Hi, I just submitted the form on your website.")
    : null;

  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="font-heading text-3xl font-bold text-navy">Thank you</h1>
      <p className="mt-4 text-navy/80">We&apos;ve received your details. Our team will reach out shortly.</p>
      {wa && (
        <Link
          href={wa}
          className="mt-8 inline-block rounded-xl bg-teal px-6 py-3 text-sm font-semibold text-white"
        >
          Continue on WhatsApp
        </Link>
      )}
      <p className="mt-8 text-sm">
        <Link href="/" className="text-primary underline">
          Back to home
        </Link>
      </p>
    </div>
  );
}
