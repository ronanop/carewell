import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import {
  AboutUsSection,
  BlogPreviewSection,
  BookConsultationBand,
  ConsultationSpecialtiesSection,
  FinalCtaSection,
  GoogleReviewsSection,
  LocationLeadSection,
  ServicesSection,
  SkinScanSection,
  SurgeonSpotlightSection,
  TreatmentFinderBand,
  TreatmentJourneySection,
  VideoTestimonialsSection,
  WhyChooseSection,
} from "@/components/home/sections";
import { ExitIntentLead } from "@/components/leads/ExitIntentLead";
import { TrustMarquee } from "@/components/layout/TrustMarquee";
import { demoBlogs, HOMEPAGE_SERVICES } from "@/data/homepage";
import { readReviewsSnapshot } from "@/lib/reviews";
import { sanityFetch } from "@/sanity/client";
import { blogPostsListQuery, siteSettingsQuery } from "@/sanity/queries";

export const revalidate = 60;

type Settings = {
  patientCounterLabel?: string;
  patientCounterValue?: number;
  mapEmbedUrl?: string;
  phone?: string;
  email?: string;
  address?: string;
};

export default async function HomePage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};
  const reviewsSnap = await readReviewsSnapshot();
  const blogs =
    (await sanityFetch<{ title: string; slug: string; excerpt?: string; coverUrl?: string; category?: string }[]>(
      blogPostsListQuery,
    )) ?? [];
  const homepageBlogs = blogs.length ? blogs : demoBlogs;

  return (
    <>
      <Suspense fallback={null}>
        <ExitIntentLead />
      </Suspense>
      <Hero />
      <TrustMarquee />
      <TreatmentJourneySection />
      <ServicesSection services={HOMEPAGE_SERVICES} />
      <SkinScanSection />
      <SurgeonSpotlightSection />
      <AboutUsSection />
      <HowItWorks />
      <ConsultationSpecialtiesSection />
      <WhyChooseSection />
      <GoogleReviewsSection reviews={reviewsSnap} />
      <BookConsultationBand />
      <VideoTestimonialsSection />
      <BlogPreviewSection posts={homepageBlogs} />
      <TreatmentFinderBand />
      <LocationLeadSection mapEmbedUrl={settings.mapEmbedUrl} />
      <FinalCtaSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["MedicalClinic", "LocalBusiness"],
            name: "Care Well Medical Centre",
            ...(settings.phone ? { telephone: settings.phone } : {}),
            ...(settings.email ? { email: settings.email } : {}),
            address: {
              "@type": "PostalAddress",
              streetAddress: settings.address ?? "Chittaranjan Park, South Delhi",
              addressLocality: "New Delhi",
              addressRegion: "Delhi",
              addressCountry: "IN",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: reviewsSnap.rating,
              reviewCount: reviewsSnap.reviewCount,
            },
          }),
        }}
      />
    </>
  );
}
