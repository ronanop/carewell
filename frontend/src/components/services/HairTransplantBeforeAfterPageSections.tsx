import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { LeadForm } from "@/components/leads/LeadForm";
import { ServiceHeroBookingForm } from "@/components/leads/ServiceHeroBookingForm";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { ServiceSidebarReveal } from "@/components/services/ServiceSidebarReveal";
import { DataTable, SectionTitle } from "@/components/services/hub-page-table";
import { Button } from "@/components/ui/Button";
import {
  HAIR_TRANSPLANT_BEFORE_AFTER_PATH,
  HT_BA_ACHIEVEMENTS,
  HT_BA_CLINIC,
  HT_BA_FAQS,
  HT_BA_IMAGES,
  HT_BA_PAGE,
  HT_BA_SERVICES,
  HT_BA_TIMELINE_ROWS,
  HT_BA_TRUST_CTA,
  HT_BA_VIDEO_TOPICS,
  HT_BA_WHY_ITEMS,
} from "@/data/hair-transplant-before-after-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { whatsappHref } from "@carewell/backend/lib/whatsapp";

const HairTransplantReviews = dynamic(
  () => import("@/components/services/HairTransplantReviews").then((m) => m.HairTransplantReviews),
  { loading: () => <div className="h-64 animate-pulse rounded-2xl bg-surface" aria-hidden /> },
);

function SectionImage({
  src,
  alt,
  caption,
  priority,
  aspect = "video",
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  aspect?: "video" | "square" | "wide";
}) {
  const aspectClass =
    aspect === "square" ? "aspect-square" : aspect === "wide" ? "aspect-[21/9]" : "aspect-video";
  return (
    <figure className="overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
      <div className={`relative w-full ${aspectClass} bg-surface`}>
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 720px" className="object-cover" priority={priority} />
      </div>
      {caption && (
        <figcaption className="border-t border-surface px-4 py-2 text-center text-xs text-navy/70">{caption}</figcaption>
      )}
    </figure>
  );
}

export function HairTransplantBeforeAfterPageSections({
  phone,
  whatsapp,
}: {
  phone?: string;
  whatsapp?: string;
}) {
  const page = HT_BA_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? HT_BA_CLINIC.phone ?? "+91 96679 77499";
  const wa = whatsapp
    ? whatsappHref(whatsapp, "Hi, I'd like to see hair transplant before and after results in Delhi.")
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HT_BA_FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: page.h1,
    description: page.heroSubheading,
    url: `${getSiteUrl()}${HAIR_TRANSPLANT_BEFORE_AFTER_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.parentLabel, path: page.parentPath },
          { name: "Before & After Results", path: HAIR_TRANSPLANT_BEFORE_AFTER_PATH },
        ]}
      />

      <section className="relative overflow-hidden bg-navy">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url(/images/service-hero-theatre-bg.png)" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14 lg:grid lg:grid-cols-[1fr_300px] lg:gap-10">
          <div className="min-w-0">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: page.parentLabel, href: page.parentPath },
                { label: "Before & After" },
              ]}
            />
            <p className="mt-4 text-sm font-medium uppercase tracking-wide text-teal/90">{page.heroSubheading}</p>
            <h1 className="font-heading mt-2 text-[24px] font-bold leading-[1.12] text-white sm:text-[32px]">{page.h1}</h1>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {HT_BA_IMAGES.vijayHero.map((img, i) => (
                <SectionImage
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  caption={img.caption}
                  priority={i === 0}
                />
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/book-consultation" variant="secondary">
                Book Your Appointment Now
              </Button>
              <a
                href={`tel:${displayPhone.replace(/\s/g, "")}`}
                className="inline-flex min-h-11 items-center rounded-button border-2 border-white/40 px-6 py-3 text-sm font-semibold text-white"
              >
                Call Us: {displayPhone}
              </a>
              {wa && (
                <a href={wa} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-button bg-[#25D366] px-6 py-3 text-sm font-semibold text-white">
                  WhatsApp
                </a>
              )}
            </div>
          </div>
          <aside className="mt-8 hidden lg:block">
            <div className="sticky top-28">
              <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-white/10" aria-hidden />}>
                <ServiceHeroBookingForm defaultTreatment={treatment} />
              </Suspense>
            </div>
          </aside>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-32 md:px-6 lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 lg:pb-24">
        <article className="max-w-3xl lg:max-w-none">
          <section className="section-y">
            <SectionTitle>{page.witnessHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.witnessIntro}</p>
            <p className="mt-3 text-base text-navy/85">Our gallery demonstrates how:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {page.witnessPoints.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="mt-4 font-medium text-navy">{page.witnessNote}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={HT_BA_IMAGES.successCollage.src} alt={HT_BA_IMAGES.successCollage.alt} aspect="wide" />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {HT_BA_WHY_ITEMS.map((item) => (
                <div key={item.title} className="rounded-xl border border-surface bg-white p-4 shadow-sm">
                  <p className="flex gap-2 font-semibold text-navy">
                    <span className="text-teal" aria-hidden>
                      ✓
                    </span>
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-navy/80">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/book-consultation" variant="primary">
                {page.whyCta}
              </Button>
              <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center rounded-button border-2 border-navy px-6 py-3 text-sm font-semibold text-navy">
                Call Now: {displayPhone}
              </a>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.storiesHeading}</SectionTitle>
            <div className="mt-6 overflow-hidden rounded-2xl border border-surface">
              <div className="relative aspect-video">
                <Image src={HT_BA_IMAGES.videoPoster.src} alt={HT_BA_IMAGES.videoPoster.alt} fill className="object-cover" sizes="720px" />
              </div>
              <p className="px-4 py-3 text-center text-sm text-navy/70">Patient transformation video — add YouTube ID when available</p>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.galleryHeading}</SectionTitle>
            <h3 className="mt-4 font-heading text-lg font-bold text-navy">{page.gallerySubheading}</h3>
            <div className="mt-10 space-y-12">
              {HT_BA_IMAGES.gallerySections.map((section) => (
                <div key={section.title}>
                  <h4 className="font-heading text-xl font-bold text-navy">{section.title}</h4>
                  <div className="mt-4 grid gap-6 sm:grid-cols-2">
                    {section.images.map((img) => (
                      <SectionImage key={`${section.title}-${img.src}`} src={img.src} alt={img.alt} caption={img.caption} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50/80 p-4">
              <p className="font-semibold text-navy">Important Note</p>
              <p className="mt-1 text-sm text-navy/80">{page.galleryNoteIntro}</p>
              <ul className="mt-2 list-inside list-disc text-sm text-navy/80">
                {page.galleryNoteFactors.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.servicesHeading}</SectionTitle>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {HT_BA_SERVICES.map((svc) => (
                <div key={svc.title} className="flex flex-col rounded-2xl border border-surface bg-white p-5 shadow-sm">
                  <h3 className="font-heading text-lg font-bold text-navy">{svc.title}</h3>
                  <ul className="mt-3 flex-1 space-y-1 text-sm text-navy/85">
                    {svc.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="text-teal" aria-hidden>
                          ✓
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link href={svc.href} className="mt-4 text-sm font-semibold text-primary hover:underline">
                    {svc.linkLabel} →
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.reviewsHeading}</SectionTitle>
            <p className="mt-2 text-base text-navy/85">{page.reviewsSubheading}</p>
            <div className="mt-8">
              <HairTransplantReviews />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.journeyHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.journeyBody}</p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-surface">
              <div className="relative aspect-video">
                <Image src={HT_BA_IMAGES.videoPoster.src} alt="12-month hair transplant journey video" fill className="object-cover" sizes="720px" />
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-navy/70">Schedule your free hair analysis after viewing our gallery</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button href="/book-consultation" variant="primary">
                Schedule Free Hair Analysis
              </Button>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.timelineHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={HT_BA_IMAGES.timeline.src} alt={HT_BA_IMAGES.timeline.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">Hair transplant results improve gradually over time.</p>
            <DataTable headers={["Time Frame", "Expected Progress"]} keys={["time", "progress"]} rows={HT_BA_TIMELINE_ROWS} />
            <p className="mt-4 text-sm text-navy/75">{page.timelineNote}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.testimonialsHeading}</SectionTitle>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {HT_BA_VIDEO_TOPICS.slice(2).map((topic) => (
                <div
                  key={topic}
                  className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-surface bg-surface/40 p-4 text-center text-sm text-navy/60"
                >
                  {topic}
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.doctorHeading}</SectionTitle>
            <div className="mt-6 grid gap-8 md:grid-cols-[200px_1fr] md:items-start">
              <Image
                src={HT_BA_IMAGES.doctor.src}
                alt={HT_BA_IMAGES.doctor.alt}
                width={200}
                height={260}
                className="rounded-2xl border border-surface shadow-sm"
              />
              <div>
                <h3 className="font-heading text-2xl font-bold text-navy">Dr. Sandeep Bhasin</h3>
                <blockquote className="mt-4 space-y-3 text-base leading-relaxed text-navy/85">
                  {page.doctorQuote.split("\n\n").map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                </blockquote>
                <p className="mt-4 font-medium text-navy">During your consultation, we will:</p>
                <ul className="mt-2 list-inside list-disc text-base text-navy/85">
                  {page.doctorBullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <p className="mt-6 font-semibold text-primary">— Dr. Sandeep Bhasin</p>
              </div>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.achievementsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={HT_BA_IMAGES.clinic.src} alt={HT_BA_IMAGES.clinic.alt} />
            </div>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">{page.achievementsSubheading}</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {HT_BA_ACHIEVEMENTS.map((a) => (
                <li key={a} className="flex gap-2 text-sm font-medium text-navy">
                  <span className="text-teal" aria-hidden>
                    ✓
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.treatmentTypesHeading}</SectionTitle>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {HT_BA_IMAGES.treatmentGrid.map((item) => (
                <figure key={item.title} className="overflow-hidden rounded-2xl border border-surface shadow-sm">
                  <div className="relative aspect-[4/3] bg-surface">
                    <Image src={item.src} alt={item.alt} fill sizes="280px" className="object-cover" />
                  </div>
                  <figcaption className="px-3 py-2 text-center text-sm font-semibold text-navy">{item.title}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.faqHeading}</SectionTitle>
            <div className="mt-8">
              <ServiceFaq items={HT_BA_FAQS} />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-primary/5 p-6 md:p-8">
              <SectionTitle>{page.ctaHeading}</SectionTitle>
              <div className="mt-6">
                <SectionImage src={HT_BA_IMAGES.ctaBanner.src} alt={HT_BA_IMAGES.ctaBanner.alt} aspect="wide" />
              </div>
              <p className="mt-4 text-lg font-medium text-navy">{page.ctaBody}</p>
              <h3 className="mt-6 font-semibold text-navy">Why Patients Trust Us</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {HT_BA_TRUST_CTA.map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-navy/85">
                    <span className="text-teal" aria-hidden>
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center rounded-button bg-navy px-6 py-3 text-sm font-semibold text-white">
                  Call Now: {displayPhone}
                </a>
                {wa && (
                  <a href={wa} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-button bg-[#25D366] px-6 py-3 text-sm font-semibold text-white">
                    WhatsApp Us
                  </a>
                )}
                <Button href="/book-consultation" variant="primary">
                  Book Your Appointment Today
                </Button>
              </div>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>Clinic Location</SectionTitle>
            <div className="mt-6">
              <SectionImage src={HT_BA_IMAGES.clinic.src} alt="Care Well Medical Centre location" caption="CR Park, South Delhi" />
            </div>
            <div className="mt-6 space-y-2 text-base text-navy/85">
              <p className="font-semibold text-navy">{HT_BA_CLINIC.name}</p>
              <p>
                House No. 1, NRI Complex, Chittaranjan Park (C.R. Park)
                <br />
                Alaknanda, New Delhi – 110019
              </p>
              <p>
                <span className="font-semibold">Clinic Hours:</span> Monday – Saturday, 10:00 AM – 7:00 PM
              </p>
              <p>
                <a href={`tel:${HT_BA_CLINIC.phone.replace(/\s/g, "")}`} className="text-primary underline">
                  {HT_BA_CLINIC.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${HT_BA_CLINIC.email}`} className="text-primary underline">
                  {HT_BA_CLINIC.email}
                </a>
              </p>
            </div>
            <p className="mt-8 text-lg font-semibold text-navy">{page.journeyClosing}</p>
          </section>

          <section className="pb-8">
            <p className="text-sm leading-relaxed text-navy/70">{page.disclaimer}</p>
          </section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <ServiceSidebarReveal>
              <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-surface" />}>
                <LeadForm defaultTreatment={treatment} source="ht-before-after-sidebar" />
              </Suspense>
              <Link
                href="/hair-transplant-in-delhi/cost"
                className="block w-full rounded-xl border-2 border-primary py-3 text-center text-sm font-semibold text-primary"
              >
                View transplant cost
              </Link>
              <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="block w-full rounded-xl bg-navy py-3 text-center text-sm font-semibold text-white">
                Call clinic
              </a>
              {wa && (
                <a href={wa} className="block w-full rounded-xl border-2 border-teal py-3 text-center text-sm font-semibold text-teal">
                  WhatsApp
                </a>
              )}
            </ServiceSidebarReveal>
          </div>
        </aside>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex gap-2 border-t border-surface bg-white px-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 lg:hidden">
        <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="flex flex-1 justify-center rounded-xl bg-navy py-3 text-[13px] font-semibold text-white">
          Call
        </a>
        <Link href="/book-consultation" className="flex flex-1 justify-center rounded-xl bg-primary py-3 text-[13px] font-semibold text-white">
          Book Now
        </Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
    </div>
  );
}
