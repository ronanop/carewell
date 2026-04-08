import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageSections } from "@/components/services/ServicePageSections";
import { DEMO_SERVICE_SLUG, getDemoService } from "@/lib/demo-service";
import { mapSanityService } from "@/lib/map-service";
import { getSiteUrl } from "@/lib/site";
import { sanityFetch } from "@/sanity/client";
import { serviceBySlugQuery, servicesSlugsQuery, siteSettingsQuery } from "@/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string };

export async function generateStaticParams() {
  const rows = (await sanityFetch<{ slug: string }[]>(servicesSlugsQuery)) ?? [];
  const fromCms = rows.filter((r) => r.slug).map((r) => ({ slug: r.slug }));
  if (fromCms.length) return fromCms;
  return [{ slug: DEMO_SERVICE_SLUG }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const raw = await sanityFetch<Record<string, unknown>>(serviceBySlugQuery, { slug });
  const doc = raw ? mapSanityService(raw) : slug === DEMO_SERVICE_SLUG ? getDemoService() : null;
  if (!doc) return { title: "Service" };
  const base = getSiteUrl();
  return {
    title: doc.seo?.title ?? `${doc.title} in Delhi | Care Well`,
    description: doc.seo?.description,
    alternates: { canonical: `${base}/services/${slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const raw = await sanityFetch<Record<string, unknown>>(serviceBySlugQuery, { slug });
  const doc = raw ? mapSanityService(raw) : slug === DEMO_SERVICE_SLUG ? getDemoService() : null;
  if (!doc) notFound();

  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return <ServicePageSections doc={doc} phone={settings.phone} whatsapp={settings.whatsappNumber} />;
}
