import type { Metadata } from "next";
import { LiposuctionTreatmentPageSections } from "@/components/services/LiposuctionTreatmentPageSections";
import { LIPOSUCTION_PATH, LIPOSUCTION_SEO } from "@/data/liposuction-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string; mapEmbedUrl?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: LIPOSUCTION_SEO.title,
    description: LIPOSUCTION_SEO.description,
    alternates: { canonical: `${base}${LIPOSUCTION_PATH}` },
  };
}

export default async function LiposuctionPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <LiposuctionTreatmentPageSections
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
      mapEmbedUrl={settings.mapEmbedUrl}
    />
  );
}
