import type { Metadata } from "next";
import { IntimateSurgeryPageSections } from "@/components/services/IntimateSurgeryPageSections";
import { INTIMATE_SURGERY_PATH, INTIMATE_SURGERY_SEO } from "@/data/intimate-surgery-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string; mapEmbedUrl?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: INTIMATE_SURGERY_SEO.title,
    description: INTIMATE_SURGERY_SEO.description,
    alternates: { canonical: `${base}${INTIMATE_SURGERY_PATH}` },
  };
}

export default async function IntimateSurgeryInDelhiPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <IntimateSurgeryPageSections
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
      mapEmbedUrl={settings.mapEmbedUrl}
    />
  );
}
