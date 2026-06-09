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
  COSMETIC_CLINIC,
  COSMETIC_IMAGES,
  COSMETIC_OPENING_HOURS,
  COSMETIC_PAGE,
  COSMETIC_TREATMENTS,
  COSMETIC_TREATMENTS_FAQS,
  COSMETIC_TREATMENTS_PATH,
  COSMETIC_VIDEO_TOPICS,
  type CosmeticTreatmentItem,
} from "@/data/cosmetic-treatments-in-delhi";
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
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          className="object-cover"
          priority={priority}
        />
      </div>
      {caption && (
        <figcaption className="border-t border-surface px-4 py-2 text-center text-xs text-navy/70">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function BulletList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <>
      <h4 className="mt-4 text-sm font-semibold uppercase tracking-wide text-navy/70">{title}</h4>
      <ul className="mt-2 space-y-1.5 text-sm text-navy/85">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-teal" aria-hidden>
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

function TreatmentBlock({ item }: { item: CosmeticTreatmentItem }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
      <SectionImage src={item.image} alt={item.imageAlt} aspect="wide" />
      <div className="p-5 md:p-6">
        <h3 className="font-heading text-xl font-bold text-navy md:text-2xl">{item.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-navy/85">{item.description}</p>
        {item.benefits && item.benefits.length > 0 && <BulletList title="Benefits" items={item.benefits} />}
        {item.treatmentOptions && item.treatmentOptions.length > 0 && (
          <BulletList title="Treatment Options" items={item.treatmentOptions} />
        )}
        {item.commonAreas && item.commonAreas.length > 0 && (
          <BulletList title="Common Treatment Areas" items={item.commonAreas} />
        )}
        {item.href && !item.comingSoon ? (
          <Link href={item.href} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            Learn More
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        ) : item.comingSoon ? (
          <p className="mt-5 text-sm font-semibold text-navy/60">Coming soon — contact us for updates</p>
        ) : null}
      </div>
    </article>
  );
}

export function CosmeticTreatmentsPageSections({
  phone,
  whatsapp,
}: {
  phone?: string;
  whatsapp?: string;
}) {
  const page = COSMETIC_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? COSMETIC_CLINIC.phone;
  const wa = whatsapp
    ? whatsappHref(whatsapp, "Hi, I'm interested in cosmetic treatments in Delhi.")
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: COSMETIC_TREATMENTS_FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const procLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: page.h1,
    description: page.tagline,
    url: `${getSiteUrl()}${COSMETIC_TREATMENTS_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.h1, path: COSMETIC_TREATMENTS_PATH },
        ]}
      />

      <section className="relative min-h-[58svh] overflow-hidden bg-navy md:min-h-[65vh]">
        <div
          className="absolute inset-0 bg-cover bg-[center_35%] bg-no-repeat"
          style={{ backgroundImage: "url(/images/service-hero-theatre-bg.png)" }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.32]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, #1557A0 0%, transparent 40%), radial-gradient(circle at 70% 60%, #0B7B6B 0%, transparent 35%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/82 to-navy/62" />
        <div className="relative mx-auto grid min-h-[58svh] max-w-7xl items-center gap-8 px-4 py-12 sm:py-14 md:min-h-[65vh] md:grid-cols-[1fr_312px] md:items-start md:gap-10 md:px-6 md:py-20 lg:py-24">
          <div className="min-w-0">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: page.h1 }]} />
            <h1 className="font-heading mt-5 text-[34px] font-bold leading-[1.1] text-white sm:text-[42px] md:mt-6 md:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg">{page.tagline}</p>
            <div className="mt-7 flex flex-wrap gap-3 sm:gap-4 md:mt-8">
              <Button href="/book-consultation" variant="secondary">
                Book Your Consultation Today
              </Button>
              <a
                href={`tel:${displayPhone.replace(/\s/g, "")}`}
                className="inline-flex min-h-11 items-center justify-center rounded-button border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20"
              >
                Call Now: {displayPhone}
              </a>
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-button bg-[#25D366] px-6 py-3 text-base font-semibold text-white"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
          <aside className="hidden w-full min-w-0 shrink-0 md:block md:w-[312px]">
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
          <section className="pb-12 pt-10 md:pb-16 md:pt-12">
            <h2 className="font-heading text-2xl font-bold leading-tight text-navy md:text-3xl">
              {page.introHeading}
            </h2>
            <div className="mt-6">
              <SectionImage
                src={COSMETIC_IMAGES.heroBanner.src}
                alt={COSMETIC_IMAGES.heroBanner.alt}
                priority
                aspect="wide"
              />
            </div>
            <div className="mt-8 space-y-4 text-base leading-relaxed text-navy/85">
              {page.introParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">{page.whyChooseHeading}</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {page.whyChoose.map((item) => (
                <li key={item} className="flex gap-2 text-sm font-medium text-navy">
                  <span aria-hidden>✅</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/book-consultation" variant="primary">
                Book Your Consultation Today
              </Button>
              <a
                href={`tel:${displayPhone.replace(/\s/g, "")}`}
                className="inline-flex min-h-11 items-center rounded-button border border-navy/20 px-6 py-3 text-sm font-semibold text-navy"
              >
                Call Now: {displayPhone}
              </a>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.portfolioHeading}</SectionTitle>
            <div className="mt-8">
              <SectionImage
                src={COSMETIC_IMAGES.portfolioOverview.src}
                alt={COSMETIC_IMAGES.portfolioOverview.alt}
                aspect="wide"
              />
            </div>
            <div className="mt-10 space-y-12">
              {COSMETIC_TREATMENTS.map((item) => (
                <TreatmentBlock key={item.title} item={item} />
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyTrustHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={COSMETIC_IMAGES.whyTrust.src} alt={COSMETIC_IMAGES.whyTrust.alt} />
            </div>
            <p className="mt-6 text-base leading-relaxed text-navy/85">{page.whyTrustIntro}</p>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">{page.whyTrustSubheading}</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {page.whyTrustItems.map((item) => (
                <li key={item} className="flex gap-2 text-sm font-medium text-navy">
                  <span className="text-teal" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base leading-relaxed text-navy/85">{page.whyTrustClosing}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.galleryHeading}</SectionTitle>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {COSMETIC_IMAGES.gallery.map((img) => (
                <SectionImage key={img.src} src={img.src} alt={img.alt} caption={img.caption} />
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>What Our Patients Say</SectionTitle>
            <div className="mt-6">
              <HairTransplantReviews />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.testimonialsHeading}</SectionTitle>
            <div className="mt-6 overflow-hidden rounded-2xl border border-surface">
              <div className="relative aspect-video">
                <Image
                  src={COSMETIC_IMAGES.videoPoster.src}
                  alt={COSMETIC_IMAGES.videoPoster.alt}
                  fill
                  className="object-cover"
                  sizes="720px"
                />
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {COSMETIC_VIDEO_TOPICS.map((topic) => (
                <div
                  key={topic}
                  className="flex aspect-video items-center justify-center gap-2 rounded-2xl border border-dashed border-surface bg-surface/40 p-4 text-center text-sm text-navy/70"
                >
                  <span aria-hidden>🎥</span>
                  {topic}
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-primary/5 p-6 md:p-8">
              <SectionTitle>{page.appointmentHeading}</SectionTitle>
              <div className="mt-6">
                <SectionImage src={COSMETIC_IMAGES.ctaBanner.src} alt={COSMETIC_IMAGES.ctaBanner.alt} aspect="wide" />
              </div>
              <p className="mt-4 text-base text-navy/85">{page.appointmentBody}</p>
              <p className="mt-3 text-sm font-semibold text-navy">Take the first step toward:</p>
              <ul className="mt-2 space-y-1">
                {page.appointmentGoals.map((goal) => (
                  <li key={goal} className="flex gap-2 text-sm text-navy/85">
                    <span className="text-teal" aria-hidden>
                      ✓
                    </span>
                    {goal}
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-2 text-sm text-navy/85">
                <p>
                  <span className="font-semibold text-navy">Care Well Medical Centre, Delhi</span>
                </p>
                <p>
                  <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="text-primary underline">
                    Call Now: {displayPhone}
                  </a>
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/book-consultation" variant="primary">
                  Book Your Consultation Today
                </Button>
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center rounded-button bg-[#25D366] px-6 py-3 text-sm font-semibold text-white"
                  >
                    WhatsApp Us
                  </a>
                )}
              </div>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.faqHeading}</SectionTitle>
            <div className="mt-8">
              <ServiceFaq items={COSMETIC_TREATMENTS_FAQS} />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.clinicHeading}</SectionTitle>
            <div className="mt-6 space-y-3 text-base text-navy/85">
              <p className="font-semibold text-navy">{COSMETIC_CLINIC.name}</p>
              <p>{COSMETIC_CLINIC.address}</p>
              <p>
                <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="text-primary underline">
                  {displayPhone}
                </a>
              </p>
              <p>
                <a href={`mailto:${COSMETIC_CLINIC.email}`} className="text-primary underline">
                  {COSMETIC_CLINIC.email}
                </a>
              </p>
            </div>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">Opening Hours</h3>
            <DataTable
              headers={["Day", "Timing"]}
              keys={["day", "timing"]}
              rows={COSMETIC_OPENING_HOURS.map((row) => ({ day: row.day, timing: row.timing }))}
            />
          </section>

          <section className="pb-8">
            <p className="text-sm leading-relaxed text-navy/70">
              <strong>Medical Disclaimer.</strong> {page.disclaimer}
            </p>
          </section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <ServiceSidebarReveal>
              <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-surface" />}>
                <LeadForm defaultTreatment={treatment} source="cosmetic-treatments-sidebar" />
              </Suspense>
              <a
                href={`tel:${displayPhone.replace(/\s/g, "")}`}
                className="block w-full rounded-xl bg-navy py-3 text-center text-sm font-semibold text-white"
              >
                Call clinic
              </a>
              {wa && (
                <a
                  href={wa}
                  className="block w-full rounded-xl border-2 border-teal py-3 text-center text-sm font-semibold text-teal"
                >
                  WhatsApp
                </a>
              )}
              <div className="rounded-xl border border-surface bg-white p-4 text-sm text-navy/80">
                <p className="font-semibold text-navy">Clinic hours</p>
                <p className="mt-2">Mon–Sun · 10:00 – 20:00</p>
              </div>
            </ServiceSidebarReveal>
          </div>
        </aside>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex gap-2 border-t border-surface bg-white px-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 lg:hidden">
        <a
          href={`tel:${displayPhone.replace(/\s/g, "")}`}
          className="flex flex-1 justify-center rounded-xl bg-navy py-3 text-[13px] font-semibold text-white"
        >
          Call
        </a>
        <Link href="/book-consultation" className="flex flex-1 justify-center rounded-xl bg-primary py-3 text-[13px] font-semibold text-white">
          Book Now
        </Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(procLd) }} />
    </div>
  );
}
