import type { Metadata } from "next";
import { FaceliftTreatmentPageSections } from "@/components/services/FaceliftTreatmentPageSections";
import { FACELIFT_PATH, FACELIFT_SEO } from "@/data/facelift-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string; mapEmbedUrl?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: FACELIFT_SEO.title,
    description: FACELIFT_SEO.description,
    alternates: { canonical: `${base}${FACELIFT_PATH}` },
  };
}

export default async function FaceliftPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <FaceliftTreatmentPageSections
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
      mapEmbedUrl={settings.mapEmbedUrl}
    />
  );
}
