import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageSections } from "@/components/services/ServicePageSections";
import { getDemoService } from "@/lib/demo-service";
import { mapSanityService } from "@/lib/map-service";
import { getSiteUrl } from "@/lib/site";
import { sanityFetch } from "@/sanity/client";
import { serviceBySlugQuery, servicesSlugsQuery, siteSettingsQuery } from "@/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string };

export async function generateStaticParams() {
  const rows = (await sanityFetch<{ slug: string; locale?: string }[]>(servicesSlugsQuery)) ?? [];
  const hi = rows.filter((r) => r.slug);
  if (hi.length) return hi.map((r) => ({ slug: r.slug }));
  return [{ slug: "sample-hair-transplant-hi" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const base = getSiteUrl();
  return {
    title: `${slug} (Hindi)`,
    alternates: {
      canonical: `${base}/hi/services/${slug}`,
      languages: { "hi-IN": `${base}/hi/services/${slug}`, "en-IN": `${base}/services/${slug.replace(/-hi$/, "")}` },
    },
  };
}

export default async function HindiServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const raw = await sanityFetch<Record<string, unknown>>(serviceBySlugQuery, { slug });
  let doc = raw && (raw as { locale?: string }).locale === "hi" ? mapSanityService(raw) : null;

  if (!doc && slug === "sample-hair-transplant-hi") {
    const d = getDemoService();
    doc = {
      ...d,
      title: `${d.title} (हिंदी)`,
      slug: { current: slug },
      seo: { ...d.seo, title: `${d.title} दिल्ली | Care Well` },
    };
  }

  if (!doc) notFound();

  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};
  return <ServicePageSections doc={doc} phone={settings.phone} whatsapp={settings.whatsappNumber} />;
}
