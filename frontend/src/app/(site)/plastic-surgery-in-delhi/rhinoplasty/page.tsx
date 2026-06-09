import type { Metadata } from "next";
import { RhinoplastyTreatmentPageSections } from "@/components/services/RhinoplastyTreatmentPageSections";
import { RHINOPLASTY_PATH, RHINOPLASTY_SEO } from "@/data/rhinoplasty-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string; mapEmbedUrl?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: RHINOPLASTY_SEO.title,
    description: RHINOPLASTY_SEO.description,
    alternates: { canonical: `${base}${RHINOPLASTY_PATH}` },
  };
}

export default async function RhinoplastyPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <RhinoplastyTreatmentPageSections
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
      mapEmbedUrl={settings.mapEmbedUrl}
    />
  );
}
