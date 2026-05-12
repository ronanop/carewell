import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { SkinScanBeam } from "@/components/home/SkinScanBeam";
import { MapEmbed } from "@/components/layout/MapEmbed";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TreatmentsScroller } from "@/components/home/TreatmentsScroller";
import { ExitIntentLead } from "@/components/leads/ExitIntentLead";
import { LeadForm } from "@/components/leads/LeadForm";
import { TrustMarquee } from "@/components/layout/TrustMarquee";
import { Button } from "@/components/ui/Button";
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

const demoServices = [
  {
    title: "Hair Treatments",
    slug: "hair-transplant",
    heroImageUrl: "/demo/hair-treatments-card.png",
    description: "FUE & FUT hair restoration, PRP, and medical hair therapies for natural density and a natural hairline.",
  },
  {
    title: "Skin & Aesthetic",
    slug: "botox-treatment",
    heroImageUrl: "/demo/skin-aesthetic-card.png",
    description: "Botox, fillers, lasers, and skin peels tailored to your goals with minimal downtime.",
  },
  {
    title: "Surgical Procedures",
    slug: "rhinoplasty",
    heroImageUrl: "/demo/surgical-procedures-card.png",
    description: "Rhinoplasty, body contouring, and facial surgery with clear planning and aftercare support.",
  },
  {
    title: "Wellness",
    slug: "iv-therapy",
    heroImageUrl: "/demo/wellness-card.png",
    description: "IV drips, recovery protocols, and wellness plans to support healing and long-term balance.",
  },
];

const demoBlogs = [
  {
    title: "How to Choose the Right Cosmetic Procedure for Your Goals",
    slug: "choose-right-cosmetic-procedure",
    excerpt: "A practical checklist to align expectations, recovery time, and outcomes before your consultation.",
    coverUrl: "/demo/blog-card.svg",
    category: "Consultation Guide",
  },
  {
    title: "Recovery Timeline: What to Expect in the First 30 Days",
    slug: "recovery-timeline-first-30-days",
    excerpt: "Understand healing milestones and the aftercare habits that help patients recover confidently.",
    coverUrl: "/demo/blog-card.svg",
    category: "Post-Care",
  },
  {
    title: "5 Questions to Ask Before Booking Aesthetic Surgery",
    slug: "questions-before-booking-aesthetic-surgery",
    excerpt: "Use these patient-first questions to compare options and make a safe, informed decision.",
    coverUrl: "/demo/blog-card.svg",
    category: "Patient Education",
  },
];

const blogCardFallbackImages = [
  "/demo/hair-treatments-card.png",
  "/demo/skin-aesthetic-card.png",
  "/demo/surgical-procedures-card.png",
];

const videoTestimonials = [
  {
    title: "Hair Transplant Testimonial",
    subtitle: "Patient Story",
    embedUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
  },
  {
    title: "Skin Treatment Results",
    subtitle: "Before & After Experience",
    embedUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
  },
  {
    title: "Cosmetic Surgery Journey",
    subtitle: "Recovery & Confidence",
    embedUrl: "https://www.youtube.com/embed/M7lc1UVf-VE",
  },
  {
    title: "Rhinoplasty Transformation Story",
    subtitle: "Patient Feedback",
    embedUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
  },
  {
    title: "Acne Scar Treatment Review",
    subtitle: "Skin Rejuvenation",
    embedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },
  {
    title: "Post-Procedure Recovery Journey",
    subtitle: "Healing Timeline",
    embedUrl: "https://www.youtube.com/embed/e-ORhEE9VVg",
  },
];

export default async function HomePage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};
  const reviewsSnap = await readReviewsSnapshot();
  const blogs =
    (await sanityFetch<{ title: string; slug: string; excerpt?: string; coverUrl?: string; category?: string }[]>(
      blogPostsListQuery,
    )) ?? [];
  const homepageServices = demoServices;
  const homepageBlogs = blogs.length ? blogs : demoBlogs;

  return (
    <>
      <Suspense fallback={null}>
        <ExitIntentLead />
      </Suspense>
      <Hero />
      <TrustMarquee />

      <section className="section-pad container mt-6 sm:mt-10 lg:mt-12">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-display-sm">What does carewell offer?</h2>
          <Link href="/services" className="shrink-0 text-sm font-medium text-text-secondary hover:text-primary">
            View All →
          </Link>
        </div>
        <TreatmentsScroller services={homepageServices} />
      </section>

      <section className="container section-pad">
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="analyze-skin-ai-frame rounded-2xl p-[2px] shadow-[0_12px_48px_-12px_rgba(139,92,246,0.45)] motion-reduce:p-px motion-reduce:shadow-md">
            <div className="overflow-hidden rounded-[14px] bg-[#f2f4f8]">
              <div className="grid items-center gap-6 px-5 py-8 sm:gap-8 sm:px-8 sm:py-10 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
            <div className="text-center lg:text-left">
              <h2 className="text-[26px] font-semibold leading-tight text-[#111827] sm:text-[32px] lg:text-[36px]">Analyze My Skin</h2>
              <p className="mx-auto mt-3 max-w-[440px] text-base leading-relaxed text-[#6B7280] sm:mt-4 sm:text-lg lg:mx-0">
                AI-powered analysis to identify your skin concerns and recommend the right treatment
              </p>
              <Link
                href="/skin-scan"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-black/90 sm:mt-8 sm:px-6"
              >
                Scan My Skin
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative h-[180px] w-[180px] overflow-hidden rounded-full border-[6px] border-white bg-white shadow-[0_10px_40px_rgba(15,23,42,0.12)] sm:h-[220px] sm:w-[220px] sm:border-[8px] lg:h-[330px] lg:w-[330px]">
                <Image
                  src="/demo/ai-skin-scan-v3.jpg"
                  alt="AI skin scan preview"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center", transform: "scale(1.08)" }}
                />
                {/* Face-scan overlay: animated beam + grid + sheen (hidden when reduced motion) */}
                <div
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-full motion-reduce:hidden"
                  aria-hidden
                >
                  <div
                    className="absolute inset-0 rounded-full opacity-[0.2]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(180deg, transparent 0px, transparent 10px, rgba(11,123,107,0.14) 10px, rgba(11,123,107,0.14) 11px)",
                    }}
                  />
                  <div className="absolute inset-0 animate-skin-scan-sheen rounded-full bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,rgba(20,184,166,0.18),transparent_72%)]" />
                  <SkinScanBeam />
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="container grid items-stretch gap-8 lg:gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative h-full">
            <div className="h-full overflow-hidden rounded-[22px] border border-[#E6EAEE] bg-white p-2 shadow-[0_10px_28px_rgba(2,14,32,0.08)]">
              <div className="relative h-[320px] w-full overflow-hidden rounded-[18px] sm:h-[420px] lg:h-full">
                <Image
                  src="/demo/doctor-profile-feature-vertical.png"
                  alt="Dr. Sandeep Bhasin profile"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#177E75]">Chief Surgeon & Founder</p>
            <h2 className="mt-3 text-3xl font-bold leading-[1.08] text-[#0A2E52] sm:text-[40px] md:text-[48px] lg:text-[56px]">Dr. Sandeep Bhasin</h2>
            <p className="mt-4 max-w-[680px] text-base leading-relaxed text-[#4B5563] sm:mt-5 sm:text-lg">
              A highly acclaimed Senior Cosmetic Surgeon dedicated to delivering natural, harmonious results. With a meticulous eye
              for detail, Dr. Bhasin combines advanced medical science with an artistic touch to restore your confidence.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-7 sm:grid-cols-3 sm:gap-4">
              <div
                className="group relative overflow-hidden rounded-2xl border border-[#DCE5E8] bg-white p-5 shadow-[0_4px_14px_rgba(2,14,32,0.06)] ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#177E75]/40 hover:shadow-[0_14px_36px_rgba(23,126,117,0.14)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                role="group"
                aria-label="20 plus years clinical experience"
              >
                <div
                  className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0F766E] via-[#14B8A6] to-[#0D9488]"
                  aria-hidden
                />
                <p className="font-heading text-xl font-bold tracking-tight text-[#0A2E52] md:text-2xl">20+ Years</p>
                <p className="mt-2 text-sm font-medium leading-snug text-[#177E75]">Clinical Experience</p>
              </div>
              <div
                className="group relative overflow-hidden rounded-2xl border border-[#DCE5E8] bg-white p-5 shadow-[0_4px_14px_rgba(2,14,32,0.06)] ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#177E75]/40 hover:shadow-[0_14px_36px_rgba(23,126,117,0.14)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                role="group"
                aria-label="Cosmetic specialist skin and hair expert"
              >
                <div
                  className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0F766E] via-[#14B8A6] to-[#0D9488]"
                  aria-hidden
                />
                <p className="font-heading text-xl font-bold tracking-tight text-[#0A2E52] md:text-2xl">Cosmetic Specialist</p>
                <p className="mt-2 text-sm font-medium leading-snug text-[#177E75]">Skin & Hair Expert</p>
              </div>
              <div
                className="group relative overflow-hidden rounded-2xl border border-[#DCE5E8] bg-white p-5 shadow-[0_4px_14px_rgba(2,14,32,0.06)] ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#177E75]/40 hover:shadow-[0_14px_36px_rgba(23,126,117,0.14)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                role="group"
                aria-label="Over ten thousand successful procedures"
              >
                <div
                  className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0F766E] via-[#14B8A6] to-[#0D9488]"
                  aria-hidden
                />
                <p className="font-heading text-xl font-bold tracking-tight text-[#0A2E52] md:text-2xl">10,000+</p>
                <p className="mt-2 text-sm font-medium leading-snug text-[#177E75]">Successful Procedures</p>
              </div>
            </div>

            <div className="mt-7">
              <p className="text-xl font-semibold text-[#0A2E52]">Qualifications & Memberships</p>
              <ul className="mt-4 space-y-2 text-[17px] text-[#4B5563]">
                <li>MBBS, MS (General Surgery)</li>
                <li>MCh (Plastic Surgery)</li>
                <li>Board Certified Cosmetic Surgeon</li>
                <li>Member of ISAPS, ISHRS, APSI</li>
              </ul>
            </div>

            <div className="mt-8">
              <Button href="/book-consultation" size="lg" className="rounded-xl bg-[#0A2E52] px-8 !text-white hover:!bg-[#134373]">
                Book Consultation with Doctor
              </Button>
            </div>
          </div>
        </div>
      </section>
      <HowItWorks />

      <section className="container pb-8 pt-4 lg:pt-6">
        <div className="rounded-3xl border border-[var(--color-border-light)] bg-white p-4 shadow-sm sm:p-5 lg:p-6">
          <p className="text-overline text-center uppercase text-teal">Video Testimonials</p>
          <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-navy sm:text-display-sm">Real Patient Stories on YouTube</h2>
          <p className="mt-3 text-center text-sm text-text-secondary sm:text-body-md">
            ⭐ {reviewsSnap.rating} out of 5 - Based on {reviewsSnap.reviewCount}+ Google Reviews
          </p>

          <div className="testimonial-marquee mt-5 pb-2">
            <div className="testimonial-marquee-track">
              {[...videoTestimonials, ...videoTestimonials].map((video, index) => (
                <article
                  key={`${video.title}-${index}`}
                  className="min-w-[260px] overflow-hidden rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-surface)] sm:min-w-[300px] lg:min-w-[320px]"
                >
                  <div className="aspect-[16/9] w-full">
                    <iframe
                      src={video.embedUrl}
                      title={video.title}
                      className="h-full w-full"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-teal">{video.subtitle}</p>
                    <h3 className="mt-1 text-sm font-semibold leading-snug text-navy">{video.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button href="/gallery" size="lg">
              Watch More Patient Stories
            </Button>
          </div>
        </div>
      </section>

      <section className="section-pad container">
        <p className="text-overline text-center uppercase text-teal">From The Blog</p>
        <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-navy sm:text-display-sm">Expert Insights by Dr. Bhasin</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-10 lg:grid-cols-3">
          {homepageBlogs.slice(0, 3).map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="overflow-hidden rounded-card border-2 border-solid border-[#0A2E52] bg-white shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative aspect-[16/9] bg-surface">
                <Image
                  src={post.coverUrl || blogCardFallbackImages[index % blogCardFallbackImages.length]}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-overline uppercase text-teal">{post.category || "Article"}</p>
                <h3 className="mt-2 text-heading-md">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-body-sm text-text-secondary">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-pad relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <iframe
            className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.08] opacity-60"
            src="https://www.youtube.com/embed/Bv-J4XSRLx4?autoplay=1&mute=1&controls=0&loop=1&playlist=Bv-J4XSRLx4&modestbranding=1&playsinline=1&rel=0"
            title="Treatment finder background video"
            allow="autoplay; encrypted-media; picture-in-picture"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container relative z-10 mx-auto max-w-content text-center">
          <p className="text-overline uppercase text-white/70">Not Sure Which Treatment?</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-display-sm">Take Our 60-Second Treatment Finder Quiz</h2>
          <p className="mt-3 text-sm text-white/80 sm:mt-4 sm:text-base">Answer 5 quick questions and get a personalized recommendation.</p>
          <div className="mt-6 sm:mt-8">
            <Button href="/cost-estimator" size="lg" className="bg-white !text-navy hover:!bg-primary-light">
              Start Quiz →
            </Button>
          </div>
        </div>
      </section>

      <section className="section-pad container">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <div className="rounded-xl bg-surface p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-navy sm:text-heading-lg">Conveniently Located in South Delhi</h2>
            <p className="mt-2 text-sm text-text-secondary sm:mt-3 sm:text-body-md">
              Chittaranjan Park, near market area. Mon-Sat 10:00 AM to 7:00 PM.
            </p>
            <div className="mt-4">
              <MapEmbed
                embedSrc={settings.mapEmbedUrl}
                title="Clinic location in Chittaranjan Park, New Delhi"
                frameClassName="h-52 w-full sm:h-72"
              />
            </div>
          </div>
          <LeadForm defaultTreatment="General consultation" source="homepage-location-card" />
        </div>
      </section>

      <section className="section-pad bg-navy text-center text-white">
        <div className="container mx-auto max-w-content">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-display-sm">Ready to Begin Your Transformation?</h2>
          <p className="mt-3 text-base text-white/75 sm:mt-4 sm:text-body-lg">Book a free consultation with Dr. Bhasin. No obligations.</p>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button href="/book-consultation" size="lg" className="bg-white !text-navy hover:!bg-primary-light">
              Book Free Consultation
            </Button>
            <Button href="/contact" size="lg" variant="outline" className="!border-white/40 !text-white">
              Call Now
            </Button>
          </div>
          <Link href="/contact" className="mt-5 inline-block text-sm text-white/70 underline">
            Or WhatsApp us for priority callback
          </Link>
        </div>
      </section>

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
