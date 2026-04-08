import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableBody } from "@/components/content/PortableBody";
import Link from "next/link";
import { sanityFetch } from "@/sanity/client";
import { hyperlocalBySlugQuery, hyperlocalSlugsQuery } from "@/sanity/queries";
import { getSiteUrl } from "@/lib/site";

export const revalidate = 60;

export async function generateStaticParams() {
  const rows = (await sanityFetch<{ slug: string }[]>(hyperlocalSlugsQuery)) ?? [];
  if (rows.length) return rows.map((r) => ({ slug: r.slug }));
  return [{ slug: "hair-transplant-faridabad" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await sanityFetch<{ title?: string; seo?: { title?: string; description?: string } }>(
    hyperlocalBySlugQuery,
    { slug },
  );
  return {
    title: doc?.seo?.title ?? doc?.title ?? slug,
    description: doc?.seo?.description,
    alternates: { canonical: `${getSiteUrl()}/locations/${slug}` },
  };
}

export default async function HyperlocalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await sanityFetch<Record<string, unknown>>(hyperlocalBySlugQuery, { slug });

  if (!doc && slug !== "hair-transplant-faridabad") notFound();

  const title =
    (doc?.title as string) ??
    "Hair transplant for Faridabad patients";
  const distance = (doc?.distanceFromClinic as string) ?? "~25 km from Chittaranjan Park";
  const service = doc?.linkedService as { title?: string; slug?: { current?: string } } | undefined;
  const directions = doc?.directions;
  const hasDirections = Array.isArray(directions) && directions.length > 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <h1 className="font-heading text-4xl font-bold text-navy">{title}</h1>
      <p className="mt-4 text-navy/80">Distance from clinic: {distance}</p>
      {hasDirections && (
        <div className="mt-8">
          <PortableBody value={directions as never} />
        </div>
      )}
      {!hasDirections && (
        <p className="mt-8 text-navy/80">
          Add travel directions and hyperlocal copy in Sanity. This route supports unlimited area pages (Noida, Gurgaon, etc.).
        </p>
      )}
      {service?.slug?.current && (
        <Link href={`/services/${service.slug.current}`} className="mt-8 inline-block font-semibold text-primary">
          View {service.title} →
        </Link>
      )}
    </div>
  );
}
