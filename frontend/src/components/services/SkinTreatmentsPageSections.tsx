import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MapEmbed } from "@/components/layout/MapEmbed";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { LeadForm } from "@/components/leads/LeadForm";
import { ServiceHeroBookingForm } from "@/components/leads/ServiceHeroBookingForm";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { ServiceSidebarReveal } from "@/components/services/ServiceSidebarReveal";
import { DataTable, SectionTitle } from "@/components/services/hub-page-table";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  SKIN_CATEGORIES,
  SKIN_CLINIC,
  SKIN_FAQS,
  SKIN_IMAGES,
  SKIN_NEARBY,
  SKIN_PAGE,
  SKIN_PRICE_ROWS,
  SKIN_TREATMENTS_PATH,
  SKIN_VIDEO_TOPICS,
  type SkinCategory,
  type SkinTreatmentItem,
} from "@/data/skin-treatments-in-delhi";
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

function categoryBanner(category: SkinCategory) {
  const img = SKIN_IMAGES[category.bannerKey];
  if (!img || Array.isArray(img)) return null;
  return <SectionImage src={img.src} alt={img.alt} aspect="wide" />;
}

function TreatmentBlock({ item }: { item: SkinTreatmentItem }) {
  const rows = item.details.map((d) => ({ label: d.label, value: d.value }));
  return (
    <article className="rounded-2xl border border-surface bg-white p-5 shadow-sm md:p-6">
      <h3 className="font-heading text-xl font-bold text-navy">{item.title}</h3>
      {item.description && <p className="mt-3 text-base leading-relaxed text-navy/85">{item.description}</p>}
      {item.benefits && item.benefits.length > 0 && (
        <>
          <h4 className="mt-4 text-sm font-semibold uppercase tracking-wide text-navy/70">Benefits</h4>
          <ul className="mt-2 space-y-1.5 text-sm text-navy/85">
            {item.benefits.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-teal" aria-hidden>
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        </>
      )}
      <h4 className="mt-5 text-sm font-semibold text-navy">Treatment Details</h4>
      <DataTable headers={["", "Information"]} keys={["label", "value"]} rows={rows} />
      <Link href={item.href} className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
        Learn More →
      </Link>
    </article>
  );
}

export function SkinTreatmentsPageSections({
  phone,
  whatsapp,
  mapEmbedUrl,
}: {
  phone?: string;
  whatsapp?: string;
  mapEmbedUrl?: string | null;
}) {
  const page = SKIN_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? SKIN_CLINIC.phone;
  const wa = whatsapp
    ? whatsappHref(whatsapp, "Hi, I'm interested in skin treatments in Delhi.")
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SKIN_FAQS.map((f) => ({
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
    url: `${getSiteUrl()}${SKIN_TREATMENTS_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.h1, path: SKIN_TREATMENTS_PATH },
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
            <p className="mt-5 text-sm font-medium uppercase tracking-wide text-white/75">{page.heroSubheading}</p>
            <h1 className="font-heading mt-2 text-[30px] font-bold leading-[1.12] text-white sm:text-[38px] md:text-[42px] lg:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg">{page.tagline}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {page.whyChoose.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-white/90">
                  <span aria-hidden>✅</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3 sm:gap-4 md:mt-8">
              <Button href="/book-consultation" variant="secondary">
                Book a Quick Skin Consultation
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
            <div className="grid gap-6 md:grid-cols-2">
              <SectionImage
                src={SKIN_IMAGES.heroGlow.src}
                alt={SKIN_IMAGES.heroGlow.alt}
                priority
                caption="Glowing skin transformation"
              />
              <SectionImage src={SKIN_IMAGES.heroClinic.src} alt={SKIN_IMAGES.heroClinic.alt} caption="South Delhi skin clinic" />
            </div>
            <div className="mt-8 space-y-4 text-base leading-relaxed text-navy/85">
              {page.introParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionHeader
              align="left"
              title="Our Skin Treatments"
              eyebrow={page.treatmentsIntroHeading}
              description={page.treatmentsIntro}
              className="max-w-none text-left"
              titleClassName="text-2xl md:text-3xl"
            />
            <div className="mt-8">
              <SectionImage
                src={SKIN_IMAGES.servicesCollage.src}
                alt={SKIN_IMAGES.servicesCollage.alt}
                aspect="wide"
              />
            </div>
          </section>

          {SKIN_CATEGORIES.map((category) => (
            <section key={category.id} className="section-y border-t border-surface">
              <SectionTitle>{category.heading}</SectionTitle>
              <div className="mt-6">{categoryBanner(category)}</div>
              <div className="mt-8 space-y-8">
                {category.treatments.map((item) => (
                  <TreatmentBlock key={item.title} item={item} />
                ))}
              </div>
            </section>
          ))}

          <section className="section-y border-t border-surface">
            <SectionTitle>Skin Treatment Price List</SectionTitle>
            <div className="mt-6">
              <SectionImage src={SKIN_IMAGES.pricing.src} alt={SKIN_IMAGES.pricing.alt} />
            </div>
            <DataTable
              headers={["Treatment", "Price Range"]}
              keys={["treatment", "range"]}
              rows={SKIN_PRICE_ROWS.map((r) => ({ treatment: r.treatment, range: r.range }))}
            />
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/80 p-4">
              <p className="font-semibold text-navy">Important Note</p>
              <p className="mt-1 text-sm text-navy/80">Prices vary based on:</p>
              <ul className="mt-2 list-inside list-disc text-sm text-navy/80">
                {page.priceNoteFactors.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>Before &amp; After Results</SectionTitle>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {SKIN_IMAGES.gallery.map((img) => (
                <SectionImage key={img.src} src={img.src} alt={img.alt} caption={img.caption} />
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyClinicHeading}</SectionTitle>
            <h3 className="mt-2 font-heading text-lg font-bold text-navy">{page.whyClinicSubheading}</h3>
            <div className="mt-6">
              <SectionImage src={SKIN_IMAGES.whyChoose.src} alt={SKIN_IMAGES.whyChoose.alt} />
            </div>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {page.whyClinicItems.map((item) => (
                <li key={item} className="flex gap-2 text-sm font-medium text-navy">
                  <span className="text-teal" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
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
                  src={SKIN_IMAGES.videoPoster.src}
                  alt={SKIN_IMAGES.videoPoster.alt}
                  fill
                  className="object-cover"
                  sizes="720px"
                />
              </div>
              <p className="px-4 py-3 text-center text-sm text-navy/70">
                Patient testimonial videos — add YouTube IDs when available
              </p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {SKIN_VIDEO_TOPICS.map((topic) => (
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
              <SectionTitle>{page.consultationHeading}</SectionTitle>
              <div className="mt-6">
                <SectionImage src={SKIN_IMAGES.ctaBanner.src} alt={SKIN_IMAGES.ctaBanner.alt} aspect="wide" />
              </div>
              <p className="mt-4 text-base text-navy/85">{page.consultationBody}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`tel:${displayPhone.replace(/\s/g, "")}`}
                  className="inline-flex min-h-11 items-center rounded-button bg-navy px-6 py-3 text-sm font-semibold text-white"
                >
                  Call: {displayPhone}
                </a>
                <Button href="/book-consultation" variant="primary">
                  Book Consultation
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
            <SectionTitle>{page.locationHeading}</SectionTitle>
            <div className="mt-6">
              <MapEmbed embedSrc={mapEmbedUrl} title="Care Well Medical Centre on Google Maps" />
            </div>
            <div className="mt-6 space-y-3 text-base text-navy/85">
              <p className="font-semibold text-navy">{SKIN_CLINIC.name}</p>
              <p>
                House No. 1, NRI Complex, Chittaranjan Park (C.R. Park)
                <br />
                NRI Colony, Mandakini Enclave Colony, Alaknanda
                <br />
                New Delhi – 110019
              </p>
              <h3 className="pt-2 font-heading text-lg font-bold text-navy">Nearby Landmarks</h3>
              <ul className="list-inside list-disc">
                {SKIN_NEARBY.map((place) => (
                  <li key={place}>{place}</li>
                ))}
              </ul>
              <p className="font-medium text-navy">✅ Free Parking Available</p>
              <p>
                <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="text-primary underline">
                  {displayPhone}
                </a>
              </p>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.faqHeading}</SectionTitle>
            <div className="mt-8">
              <ServiceFaq items={SKIN_FAQS} />
            </div>
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
                <LeadForm defaultTreatment={treatment} source="skin-treatments-sidebar" />
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
