import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageSections } from "@/components/services/ServicePageSections";
import { mapSanityService } from "@/lib/map-service";
import { serviceLanguageAlternates } from "@/lib/service-hreflang";
import { getSiteUrl } from "@/lib/site";
import { sanityFetch } from "@/sanity/client";
import { serviceBySlugQuery, servicesSlugsQuery, siteSettingsQuery } from "@/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string; mapEmbedUrl?: string };

export async function generateStaticParams() {
  const rows = (await sanityFetch<{ slug: string; locale?: string }[]>(servicesSlugsQuery)) ?? [];
  const hi = rows.filter((r) => r.slug && r.locale === "hi");
  return hi.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const raw = await sanityFetch<Record<string, unknown>>(serviceBySlugQuery, { slug });
  const doc =
    raw && (raw as { locale?: string }).locale === "hi" ? mapSanityService(raw) : null;
  if (!doc) return { title: "Service" };
  const base = getSiteUrl();
  const alternate = raw?.alternateLocaleService as { slug?: { current?: string } } | undefined;
  const languages = serviceLanguageAlternates(base, "hi", slug, alternate);
  return {
    title: doc.seo?.title ?? `${doc.title} | Care Well (Hindi)`,
    description: doc.seo?.description,
    alternates: {
      canonical: `${base}/hi/services/${slug}`,
      languages,
    },
  };
}

export default async function HindiServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const raw = await sanityFetch<Record<string, unknown>>(serviceBySlugQuery, { slug });
  const doc = raw && (raw as { locale?: string }).locale === "hi" ? mapSanityService(raw) : null;

  if (!doc) notFound();

  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};
  return (
    <ServicePageSections
      doc={doc}
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
      mapEmbedUrl={settings.mapEmbedUrl}
    />
  );
}
