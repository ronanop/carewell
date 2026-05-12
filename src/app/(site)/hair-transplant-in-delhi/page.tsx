import type { Metadata } from "next";
import { ServicePageSections } from "@/components/services/ServicePageSections";
import { mapSanityService } from "@/lib/map-service";
import { getSiteUrl } from "@/lib/site";
import { sanityFetch } from "@/sanity/client";
import { serviceBySlugQuery, siteSettingsQuery } from "@/sanity/queries";

export const revalidate = 60;

const SLUG = "hair-transplant";
const PATH = "/hair-transplant-in-delhi";

type Settings = { phone?: string; whatsappNumber?: string; mapEmbedUrl?: string };

export async function generateMetadata(): Promise<Metadata> {
  const raw = await sanityFetch<Record<string, unknown>>(serviceBySlugQuery, { slug: SLUG });
  const doc = raw ? mapSanityService(raw) : null;
  const base = getSiteUrl();
  if (!doc) {
    return {
      title: "Hair Transplant in Delhi | Care Well",
      alternates: { canonical: `${base}${PATH}` },
    };
  }
  return {
    title: doc.seo?.title ?? `${doc.title} in Delhi | Care Well`,
    description: doc.seo?.description,
    alternates: {
      canonical: `${base}${PATH}`,
      languages: {
        "en-IN": `${base}${PATH}`,
        "hi-IN": `${base}/hi/services/hair-transplant-hi`,
      },
    },
  };
}

export default async function HairTransplantInDelhiPage() {
  const raw = await sanityFetch<Record<string, unknown>>(serviceBySlugQuery, { slug: SLUG });
  const doc = raw ? mapSanityService(raw) : null;

  if (!doc) {
    return (
      <main className="container section-pad">
        <div className="rounded-2xl border border-[var(--color-border-light)] bg-white p-8">
          <h1 className="text-display-sm text-navy">Service Page Coming Soon</h1>
          <p className="mt-3 text-body-md text-text-secondary">
            This service page is being prepared and will be available shortly.
          </p>
        </div>
      </main>
    );
  }

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
