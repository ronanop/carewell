import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { sanityFetch } from "@/sanity/client";
import { galleryItemsQuery } from "@/sanity/queries";
import { getSiteUrl } from "@/lib/site";

export const revalidate = 60;

const BeforeAfterSliders = dynamic(
  () => import("@/components/services/BeforeAfterSliders").then((m) => m.BeforeAfterSliders),
  { ssr: false, loading: () => <div className="h-40 animate-pulse rounded-xl bg-surface" /> },
);

export const metadata: Metadata = {
  title: "Before & After Gallery",
  alternates: { canonical: `${getSiteUrl()}/gallery` },
};

export default async function GalleryPage() {
  const items =
    (await sanityFetch<
      {
        title?: string;
        category?: string;
        beforeUrl?: string;
        afterUrl?: string;
        treatmentDetail?: string;
      }[]
    >(galleryItemsQuery)) ?? [];

  const cases =
    items.length ?
      items.map((i) => ({
        beforeUrl: i.beforeUrl,
        afterUrl: i.afterUrl,
        subtype: i.category,
        patientInitials: i.title,
      }))
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <h1 className="font-heading text-4xl font-bold text-navy">Gallery</h1>
      <p className="mt-4 max-w-2xl text-navy/80">
        Filter by category, compare before/after, and book a consultation. All images require consent on file in Sanity.
      </p>
      <div className="mt-10 flex flex-wrap gap-2">
        {["All", "Hair", "Face", "Body", "Skin", "Vitiligo"].map((c) => (
          <span
            key={c}
            className="rounded-full bg-surface px-4 py-1.5 text-sm text-navy/70"
          >
            {c}
          </span>
        ))}
      </div>
      <div className="mt-10">
        <BeforeAfterSliders cases={cases} />
      </div>
      <p className="mt-8 text-sm text-navy/55">
        ImageObject JSON-LD can be emitted per item when URLs are stable — see handover checklist.
      </p>
    </div>
  );
}
