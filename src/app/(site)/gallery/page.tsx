import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { sanityFetch } from "@/sanity/client";
import { galleryItemsQuery } from "@/sanity/queries";
import { getSiteUrl } from "@/lib/site";

export const revalidate = 60;

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

  const ld =
    items.some((i) => i.beforeUrl || i.afterUrl) ?
      {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        associatedMedia: items
          .filter((i) => i.beforeUrl || i.afterUrl)
          .map((i) => ({
            "@type": "ImageObject",
            contentUrl: i.beforeUrl || i.afterUrl,
            name: i.title ?? "Case",
            description: i.treatmentDetail ?? i.category,
          })),
      }
    : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <h1 className="font-heading text-4xl font-bold text-navy">Gallery</h1>
      <p className="mt-4 max-w-2xl text-navy/80">
        Filter by category, compare before/after, and book a consultation. All images require consent on file in Sanity.
      </p>
      <GalleryGrid cases={cases} />
      {ld && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      )}
    </div>
  );
}
