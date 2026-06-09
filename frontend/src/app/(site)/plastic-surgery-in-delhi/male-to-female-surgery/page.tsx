import type { Metadata } from "next";
import { MaleToFemaleSurgeryTreatmentPageSections } from "@/components/services/MaleToFemaleSurgeryTreatmentPageSections";
import { MTF_SURGERY_PATH, MTF_SURGERY_SEO } from "@/data/male-to-female-surgery-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string; mapEmbedUrl?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: MTF_SURGERY_SEO.title,
    description: MTF_SURGERY_SEO.description,
    alternates: { canonical: `${base}${MTF_SURGERY_PATH}` },
  };
}

export default async function MaleToFemaleSurgeryPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <MaleToFemaleSurgeryTreatmentPageSections
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
      mapEmbedUrl={settings.mapEmbedUrl}
    />
  );
}
