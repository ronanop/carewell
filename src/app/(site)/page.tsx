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
    embedUrl: "https://www.youtube.com/embed/9w6AOQ-QCA4",
  },
  {
    title: "Skin Treatment Results",
    subtitle: "Before & After Experience",
    embedUrl: "https://www.youtube.com/embed/ponGrbjeRfk",
  },
  {
    title: "Cosmetic Surgery Journey",
    subtitle: "Recovery & Confidence",
    embedUrl: "https://www.youtube.com/embed/du8ZUVeWiVA",
  },
  {
    title: "Rhinoplasty Transformation Story",
    subtitle: "Patient Feedback",
    embedUrl: "https://www.youtube.com/embed/6zOxOmMynnU",
  },
  {
    title: "Acne Scar Treatment Review",
    subtitle: "Skin Rejuvenation",
    embedUrl: "https://www.youtube.com/embed/25dsGI4MLpg",
  },
  {
    title: "Post-Procedure Recovery Journey",
    subtitle: "Healing Timeline",
    embedUrl: "https://www.youtube.com/embed/qpWzX46LP2A",
  },
];

const WHY_CHOOSE = [
  {
    title: "Expert Care",
    body: "All major treatments personally supervised by Dr. Sandeep Bhasin, senior cosmetic surgeon in Delhi.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="8.5" r="3.25" />
        <path d="M5.5 20c.8-3.8 3.35-6.25 6.5-6.25s5.7 2.45 6.5 6.25" />
      </svg>
    ),
  },
  {
    title: "Patient-Focused Approach",
    body: "We ensure a seamless experience with customized treatment plans and dedicated support.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M5.5 6.5h11a2 2 0 0 1 2 2v6.5a2 2 0 0 1-2 2h-3.5l-3.25 3.25V16.5H5.5a2 2 0 0 1-2-2V8.5a2 2 0 0 1 2-2z" />
        <circle cx="9.25" cy="11.25" r="0.65" fill="currentColor" stroke="none" />
        <circle cx="12.75" cy="11.25" r="0.65" fill="currentColor" stroke="none" />
        <path d="M9 13.75c.65.85 1.65 1.35 2.75 1.35s2.1-.5 2.75-1.35" />
      </svg>
    ),
  },
  {
    title: "Latest Technology",
    body: "Advanced FUE systems, medical-grade lasers, and modern surgical infrastructure at our South Delhi facility.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3.5" y="4.5" width="17" height="12" rx="1.75" />
        <path d="M8 19.5h8" />
        <path d="M7.5 13.5l2-2.25 1.75 3 2-4.25 1.75 2.75L16.5 10" />
      </svg>
    ),
  },
  {
    title: "Efficient & Professional",
    body: "Smooth appointment scheduling, timely follow-ups, and a stress-free experience.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="5.5" r="2" />
        <circle cx="6.5" cy="16.5" r="2" />
        <circle cx="17.5" cy="16.5" r="2" />
        <path d="M12 7.5v2.5M10.25 10L7 13.25M13.75 10L17 13.25" />
        <path d="M8.5 16.5V15M15.5 16.5V15" />
      </svg>
    ),
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

      <section className="section-pad container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-overline font-semibold uppercase tracking-[0.18em] text-primary">
            Fast, safe & doctor-led solutions
          </p>
          <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-navy sm:text-display-sm md:text-4xl">
            Your Treatment Journey at Care Well Medical Centre
          </h2>
          <p className="mt-3 text-base leading-relaxed text-primary/90 sm:text-lg">
            A clear, doctor-led process focused on safety, results, and personalised care.
          </p>
        </div>

        <ol className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          {[
            {
              title: "Step 1: Doctor Consultation",
              body:
                "Personal evaluation to understand your concern and goals. No sales team. Direct doctor interaction.",
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="10.5" cy="10.5" r="5.25" />
                  <path d="M14.25 14.25L19 19" />
                  <path d="M10.5 8.25v4.5M8.25 10.5h4.5" />
                </svg>
              ),
            },
            {
              title: "Step 2: Medical Assessment",
              body:
                "Detailed scalp, skin, or body analysis using medical protocols and experience.",
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="7" r="3.25" />
                  <path d="M5.5 20c.5-3.5 3-6 6.5-6s6 2.5 6.5 6" />
                  <path d="M9.5 14.5v2a2.5 2.5 0 005 0v-2" />
                  <circle cx="14.5" cy="18.5" r="1.25" />
                </svg>
              ),
            },
            {
              title: "Step 3: Personalised Treatment Plan",
              body:
                "Only treatments you medically need. Clear explanation of procedure, recovery, and cost.",
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3.5" y="5" width="14" height="14" rx="2" />
                  <path d="M3.5 9.5h14" />
                  <path d="M8 3.5v3M13 3.5v3" />
                  <circle cx="17.5" cy="17" r="3.5" fill="currentColor" stroke="none" opacity="0.15" />
                  <path d="M17.5 15v4M15.5 17h4" />
                </svg>
              ),
            },
            {
              title: "Step 4: Safe Procedure & Follow-up",
              body:
                "Advanced technology, strict hygiene, and proper post-treatment care.",
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="8.5" strokeDasharray="2 3" />
                  <circle cx="12" cy="9.5" r="2.25" />
                  <path d="M8 16c.5-2 2-3 4-3s3.5 1 4 3" />
                  <path d="M16 13l2 2 3-3" />
                </svg>
              ),
            },
          ].map((step) => (
            <li key={step.title} className="flex flex-col items-center text-center">
              <span
                className="inline-flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] sm:h-28 sm:w-28"
                aria-hidden
              >
                {step.icon}
              </span>
              <h3 className="mt-5 font-heading text-lg font-bold text-navy sm:text-xl">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-secondary sm:text-[15px]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-center gap-5 text-center sm:mt-14">
          <p className="text-base font-medium text-navy sm:text-lg">
            Not sure which treatment is right for you? Talk to our doctor.
          </p>
          <Button href="/book-consultation" variant="primary">
            Book Doctor Consultation
          </Button>
        </div>
      </section>

      <section className="section-pad container mt-6 sm:mt-10 lg:mt-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-overline font-semibold uppercase tracking-[0.18em] text-primary">
            Our Services
          </p>
          <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-navy sm:text-display-sm md:text-4xl">
            Comprehensive Hair Transplant, Skin &amp; Cosmetic Surgery Services
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            At Care Well Medical Centre, we provide doctor-led treatments across hair, skin, cosmetic,
            and surgical care, focused on safety, natural results, and personalised treatment planning.
          </p>
        </div>
        <div className="mt-8">
          <TreatmentsScroller services={homepageServices} />
        </div>
        <div className="mt-6 flex justify-center sm:mt-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            View all services
            <span aria-hidden>→</span>
          </Link>
        </div>
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

      <section className="section-pad bg-surface" aria-labelledby="about-care-well-heading">
        <div className="container grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col">
            <p className="text-overline font-semibold uppercase tracking-[0.18em] text-primary">About us</p>
            <h2
              id="about-care-well-heading"
              className="mt-3 text-2xl font-bold leading-tight tracking-tight text-navy sm:text-display-sm md:text-4xl"
            >
              Redefining Aesthetic & Cosmetic Care
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-text-secondary sm:mt-5 sm:text-lg">
              <p>
                At <span className="font-semibold text-navy">Care Well Medical Centre</span>, we believe aesthetic care is not about
                changing who you are, but enhancing your natural features safely and responsibly.
              </p>
              <p>
                Every treatment is planned with a personalised, doctor-led approach, combining advanced technology, medical expertise,
                and clear guidance—so you feel confident at every step.
              </p>
              <p>
                Cosmetic care goes beyond appearance. It impacts self-confidence, wellness, and long-term satisfaction. That is why we
                focus on <span className="font-semibold text-navy">natural-looking results</span>, ethical recommendations, and treatments
                tailored to individual needs.
              </p>
            </div>

            <h3 className="mt-8 font-heading text-lg font-bold text-navy sm:mt-9 sm:text-xl">Our special Features</h3>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3">
              {[
                "Advanced Skin & Anti-Aging Treatments",
                "Body Contouring & Fat Reduction",
                "Hair Restoration & Transplant",
                "Scar & Acne Treatment",
                "Laser & Non-Surgical Procedures",
                "Cosmetic Surgeries",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"
                    aria-hidden
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-base leading-snug text-text-secondary sm:text-[17px]">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 sm:mt-9">
              <Button href="/about" variant="primary">
                More About Us
              </Button>
            </div>
          </div>

          <div className="relative lg:self-start lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[22px] border border-[#E6EAEE] bg-white p-2 shadow-[0_10px_28px_rgba(2,14,32,0.08)]">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[18px]">
                <Image
                  src="/demo/about-us-consultation.png"
                  alt="Dr. Sandeep Bhasin in a doctor-led consultation with a patient at Care Well Medical Centre"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />

      <section className="section-pad container" aria-labelledby="consultation-specialties-heading">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-overline font-semibold uppercase tracking-[0.18em] text-primary">
              Consultation &amp; Expertise
            </p>
            <h2
              id="consultation-specialties-heading"
              className="mt-3 font-heading text-2xl font-bold leading-tight tracking-tight text-navy sm:text-display-sm md:text-4xl"
            >
              Our Aesthetic Consultation Specialties
            </h2>
            <div className="mt-4 space-y-3 text-base leading-relaxed text-text-secondary sm:mt-5 sm:text-lg">
              <p>
                At Care Well Medical Centre, every treatment begins with a personalised, doctor-led consultation.
              </p>
              <p>We focus on understanding your concern first, then recommending the safest and most effective option.</p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:mt-14 lg:grid-cols-6">
            {[
              {
                title: "Hair Transplant",
                href: "/hair-transplant-in-delhi",
                icon: (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 4.5c-3 0-5.5 2-5.5 5.5 0 1.2.35 2.3 1 3.25" />
                    <path d="M7.5 10c.8-2.2 2.8-3.75 5.25-3.75 2.1 0 3.9 1.1 4.85 2.75" />
                    <path d="M8.25 12.25c.5-1.4 1.85-2.4 3.5-2.4 1.4 0 2.6.7 3.35 1.75" />
                    <path d="M9.5 14.5c.35-.9 1.2-1.5 2.25-1.5.85 0 1.55.4 2 .95" />
                    <path d="M8.5 18c1-2.2 3.2-3.75 5.75-3.75 1.1 0 2.15.25 3.1.7" />
                  </svg>
                ),
              },
              {
                title: "Laser Hair Removal",
                href: "/services/laser-hair-removal",
                icon: (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="4" y="10" width="6" height="8" rx="1.25" />
                    <path d="M10 14h3.5l6.5 3.5" />
                    <path d="M14 12l7-5" />
                    <path d="M16.5 9.5L19 7" opacity="0.85" />
                  </svg>
                ),
              },
              {
                title: "Acne & Scar Treatment",
                href: "/services/acne-scar-treatment",
                icon: (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <ellipse cx="12" cy="11" rx="5.5" ry="6.5" />
                    <circle cx="9.5" cy="10" r="0.65" fill="currentColor" stroke="none" />
                    <circle cx="14" cy="9.25" r="0.55" fill="currentColor" stroke="none" />
                    <circle cx="12.5" cy="13" r="0.55" fill="currentColor" stroke="none" />
                    <path d="M8.5 15.5l1.5 1M13 16l1.25 1.25" opacity="0.9" />
                  </svg>
                ),
              },
              {
                title: "Cryolipolysis (Fat Freezing)",
                href: "/services/cryolipolysis",
                icon: (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 3v2.5M12 18.5V21M5.64 5.64l1.77 1.77M16.59 16.59l1.77 1.77M3 12h2.5M18.5 12H21M5.64 18.36l1.77-1.77M16.59 7.41l1.77-1.77" />
                    <rect x="9" y="8.5" width="6" height="9" rx="1" />
                    <path d="M10.5 11h3M10.5 13.5h3" />
                  </svg>
                ),
              },
              {
                title: "Anti-Aging Treatments",
                href: "/services/anti-aging",
                icon: (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M6 14c.8-3.2 3.5-5.5 6.75-5.5 2.6 0 4.85 1.35 6.1 3.4" />
                    <path d="M7.5 16.5c.35-.45.9-.75 1.5-.75.85 0 1.55.55 1.75 1.35" />
                    <path d="M8 11.5h1.5M14.5 10h1.25M12.25 8.25v1" />
                    <path d="M17 7l1.25 1.25M18.5 5.5l.9.9" />
                  </svg>
                ),
              },
              {
                title: "Botox",
                href: "/services/botox",
                icon: (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5.5 10.5c1-2.8 3.6-4.75 6.5-4.75 1.9 0 3.65.75 4.95 2" />
                    <rect x="14" y="11" width="5" height="7" rx="0.75" transform="rotate(-12 16.5 14.5)" />
                    <path d="M14.5 18l-2 3.5" />
                    <path d="M16 11.5V9" />
                  </svg>
                ),
              },
              {
                title: "Rhinoplasty",
                href: "/services/rhinoplasty",
                icon: (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M6 18c1.2-5 4.5-8.5 8.75-8.5 1.35 0 2.6.35 3.75 1" />
                    <path d="M11.25 11.5c.35 1.4 1.1 2.6 2.1 3.35" />
                    <path d="M13.35 9.5c.9.35 1.65 1.05 2.15 2" />
                  </svg>
                ),
              },
              {
                title: "Beard Transplant",
                href: "/services/beard-transplant",
                icon: (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M8.5 9.5c0-2.5 1.6-4.25 3.75-4.25S16 7 16 9.5v1.5c0 3-1.35 5.5-3.25 6.75" />
                    <path d="M8.5 11v3.5c0 3.2 2.1 5.75 4.75 6.5M15.5 11v3.5c0 1.1-.2 2.15-.55 3.1" />
                    <path d="M9.5 19.5c.9.6 2 .95 3.15.95 1.2 0 2.35-.4 3.35-1.1" />
                  </svg>
                ),
              },
              {
                title: "Hydrafacial",
                href: "/services/hydrafacial",
                icon: (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M8.5 9.5c0-2 1.55-3.5 3.5-3.5s3.5 1.5 3.5 3.5c0 2.5-2.5 5-3.5 7.5-1-2.5-3.5-5-3.5-7.5z" />
                    <path d="M17 6.5l.85.85M18.75 5.25l.6.6M17.5 8.25h1.25" />
                  </svg>
                ),
              },
              {
                title: "Liposuction",
                href: "/services/liposuction",
                icon: (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M10 5.5l-2 13h8l-2-13" />
                    <path d="M7.5 11.5l-2.5-1M7.5 14l-2.75-.25M16.5 11.5l2.5-1M16.5 14l2.75-.25" />
                    <path d="M11 9.5h2M11 12h2" />
                  </svg>
                ),
              },
              {
                title: "Breast Augmentation",
                href: "/services/breast-augmentation",
                icon: (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 6v11" />
                    <path d="M7.5 9.5c0 3 2 5.5 4.5 5.5s4.5-2.5 4.5-5.5" />
                    <path d="M8.25 10.75c1.1 1.65 2.35 2.5 3.75 2.5s2.65-.85 3.75-2.5" />
                  </svg>
                ),
              },
              {
                title: "Hymenoplasty",
                href: "/services/hymenoplasty",
                icon: (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="12" cy="9" r="3.25" />
                    <path d="M12 12.25v2.5" />
                    <path d="M8.5 19.5h7" />
                    <path d="M10 16.5h4" />
                  </svg>
                ),
              },
            ].map((specialty) => (
              <Link
                key={specialty.title}
                href={specialty.href}
                className="group flex aspect-square min-h-[140px] flex-col items-center justify-center gap-3 rounded-2xl border border-navy/10 bg-[#F5E9E3] p-4 text-center shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-navy/25 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <span className="flex shrink-0 items-center justify-center text-navy [&>svg]:block">{specialty.icon}</span>
                <span className="text-balance text-sm font-bold leading-tight text-navy sm:text-base">{specialty.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad container" aria-labelledby="why-choose-heading">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-overline font-semibold uppercase tracking-[0.18em] text-primary">We stand out</p>
            <h2
              id="why-choose-heading"
              className="mt-3 text-2xl font-bold leading-tight tracking-tight text-navy sm:text-display-sm md:text-4xl"
            >
              Why Choose Care Well Medical Centre?
            </h2>
          </div>

          <div className="mt-10 grid items-start gap-8 lg:mt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {WHY_CHOOSE.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-surface bg-white p-5 shadow-[0_4px_16px_rgba(2,14,32,0.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(2,14,32,0.08)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F5E9E3] text-primary">
                    {item.icon}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-navy sm:text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-[15px]">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-[#FCEEEA] via-white to-white p-3 sm:p-4">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#F5E9E3]/60">
                  <Image
                    src="/demo/doctor-profile-feature-vertical.png"
                    alt="Dr. Sandeep Bhasin, senior cosmetic and aesthetic surgeon"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <p className="font-heading text-lg font-bold text-navy sm:text-xl">Dr. Sandeep Bhasin</p>
                <p className="mt-1 text-sm leading-snug text-text-secondary sm:text-base">Senior Cosmetic &amp; Aesthetic Surgeon</p>
                <p className="mt-0.5 text-sm leading-snug text-navy/70 sm:text-base">Care Well Medical Centre, Delhi</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-surface pt-10 sm:mt-14 sm:pt-12">
          <h3
            id="serving-delhi-heading"
            className="text-center text-2xl font-bold text-navy md:text-3xl"
          >
            Serving South Delhi &amp; Delhi NCR with Doctor-Led Cosmetic Care
          </h3>
          <p className="mx-auto mt-4 max-w-4xl text-center text-base leading-relaxed text-text-secondary sm:text-lg">
            Care Well Medical Centre is located at House No. 1, NRI Complex, Chittaranjan Park (CR Park), New Delhi 110019, and serves
            patients from Greater Kailash, Kalkaji, Nehru Place, Alaknanda, Saket, and across Delhi NCR. Under the supervision of Dr.
            Sandeep Bhasin, senior cosmetic and hair transplant surgeon, we provide advanced cosmetic surgery, hair restoration, and
            skin treatments in a safe medical setting.
          </p>
        </div>
      </section>

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

      <section className="bg-navy py-16 sm:py-20 lg:py-24" aria-labelledby="book-consultation-stats-heading">
        <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2
            id="book-consultation-stats-heading"
            className="text-2xl font-bold text-white sm:text-display-sm md:text-4xl"
          >
            Book a Doctor Consultation at Care Well Medical Centre
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-white/85 sm:mt-5 sm:text-lg">
            At Care Well Medical Centre, consultations and procedures are personally supervised by{" "}
            <span className="font-semibold text-white">Dr. Sandeep Bhasin</span>, ensuring safe, medically guided, and
            personalised aesthetic care using advanced technology.
          </p>
          <div className="mt-8 flex justify-center sm:mt-10">
            <Button href="/book-consultation" variant="primary">
              get an appointment
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
              Chittaranjan Park, near market area. Mon-Sun 10:00 AM to 7:00 PM.
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
