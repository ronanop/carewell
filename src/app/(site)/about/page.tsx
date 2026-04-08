import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Care Well Medical Centre",
  alternates: { canonical: `${getSiteUrl()}/about` },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <h1 className="font-heading text-4xl font-bold text-navy">About Care Well</h1>
      <p className="mt-6 text-lg text-navy/85">
        Care Well Medical Centre in Chittaranjan Park, South Delhi, combines surgical excellence with ethical counselling —
        especially in cosmetic surgery, hair restoration, and vitiligo care.
      </p>
      <p className="mt-4 text-navy/80">
        Content for this page is fully editable in Sanity (mission, team, facility photos, credentials).
      </p>
      <Button href="/about/dr-bhasin" variant="primary" className="mt-8">
        Meet Dr. Sandeep Bhasin
      </Button>
      <Link href="/contact" className="ml-4 text-sm font-semibold text-primary">
        Contact →
      </Link>
    </div>
  );
}
