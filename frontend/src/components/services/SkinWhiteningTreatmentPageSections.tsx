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
import { CheckList, DataTable, SectionTitle } from "@/components/services/hub-page-table";
import { Button } from "@/components/ui/Button";
import {
  SKIN_WHITENING_AVOID,
  SKIN_WHITENING_BENEFIT_GROUPS,
  SKIN_WHITENING_CHOOSE_ROWS,
  SKIN_WHITENING_CLINIC,
  SKIN_WHITENING_COMPARE_ROWS,
  SKIN_WHITENING_COST_ROWS,
  SKIN_WHITENING_DOCTOR_EXPERTISE,
  SKIN_WHITENING_FAQS,
  SKIN_WHITENING_IMAGES,
  SKIN_WHITENING_LONG_TERM,
  SKIN_WHITENING_MAINTENANCE,
  SKIN_WHITENING_NEARBY,
  SKIN_WHITENING_PAGE,
  SKIN_WHITENING_PATH,
  SKIN_WHITENING_PROCEDURE_ROWS,
  SKIN_WHITENING_SIDE_EFFECTS,
  SKIN_WHITENING_TREATMENTS,
  SKIN_WHITENING_VIDEO_TOPICS,
  SKIN_WHITENING_WHY_CLINIC,
  SKIN_WHITENING_WHY_TREATMENT,
} from "@/data/skin-whitening-treatment-in-delhi";
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

export function SkinWhiteningTreatmentPageSections({
  phone,
  whatsapp,
  mapEmbedUrl,
}: {
  phone?: string;
  whatsapp?: string;
  mapEmbedUrl?: string | null;
}) {
  const page = SKIN_WHITENING_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? SKIN_WHITENING_CLINIC.phone;
  const wa = whatsapp
    ? whatsappHref(whatsapp, "Hi, I'm interested in skin whitening treatment in Delhi.")
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SKIN_WHITENING_FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const procLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: page.h1,
    description: page.subtitle,
    url: `${getSiteUrl()}${SKIN_WHITENING_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.parentLabel, path: page.parentPath },
          { name: "Skin Whitening Treatment", path: SKIN_WHITENING_PATH },
        ]}
      />

      <section className="relative min-h-[52svh] overflow-hidden bg-navy md:min-h-[58vh]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/service-hero-theatre-bg.png)" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/70" />
        <div className="relative mx-auto grid min-h-[52svh] max-w-7xl items-center gap-8 px-4 py-12 md:min-h-[58vh] md:grid-cols-[1fr_312px] md:px-6 md:py-16">
          <div className="min-w-0">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: page.parentLabel, href: page.parentPath },
                { label: "Skin Whitening" },
              ]}
            />
            <p className="mt-5 text-sm font-medium uppercase tracking-wide text-white/75">{page.subtitle}</p>
            <h1 className="font-heading mt-2 text-[26px] font-bold leading-[1.15] text-white sm:text-[32px] md:text-[36px]">
              {page.h1}
            </h1>
            <p className="mt-2 text-sm text-white/80">{SKIN_WHITENING_CLINIC.location}</p>
            <p className="mt-4 max-w-xl text-base text-white/90">{page.introQuestion}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Image
                src={SKIN_WHITENING_IMAGES.hero.src}
                alt={SKIN_WHITENING_IMAGES.hero.alt}
                width={280}
                height={180}
                className="max-h-36 w-full rounded-2xl border-2 border-white/20 object-cover shadow-lg"
                priority
              />
              <Image
                src={SKIN_WHITENING_IMAGES.heroGlow.src}
                alt={SKIN_WHITENING_IMAGES.heroGlow.alt}
                width={280}
                height={180}
                className="max-h-36 w-full rounded-2xl border-2 border-white/20 object-cover shadow-lg"
              />
            </div>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {page.whyChoose.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-white/90">
                  <span aria-hidden>✅</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/book-consultation" variant="secondary">
                Book Your Consultation Today
              </Button>
              <a
                href={`tel:${displayPhone.replace(/\s/g, "")}`}
                className="inline-flex min-h-11 items-center rounded-button border border-white/40 px-5 py-3 text-sm font-semibold text-white"
              >
                Call: {displayPhone}
              </a>
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center rounded-button bg-[#25D366] px-6 py-3 text-base font-semibold text-white"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
          <aside className="hidden md:block md:w-[312px]">
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
          <section className="pb-12 pt-10">
            <p className="text-base leading-relaxed text-navy/85">{page.introBody}</p>
            <p className="mt-4 font-medium text-navy">Whether you&apos;re looking for:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-base text-navy/85">
              {page.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <p className="mt-4 text-base text-navy/85">{page.introClosing}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.causesHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={SKIN_WHITENING_IMAGES.causes.src} alt={SKIN_WHITENING_IMAGES.causes.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.causesIntro}</p>
            <h3 className="mt-4 font-semibold text-navy">Common Causes</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {page.causesList.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="mt-4 text-base text-navy/85">These factors may lead to:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {page.causesEffects.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyTreatmentHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={SKIN_WHITENING_IMAGES.whyChoose.src} alt={SKIN_WHITENING_IMAGES.whyChoose.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">Many patients choose skin whitening treatments to:</p>
            <CheckList items={SKIN_WHITENING_WHY_TREATMENT} variant="do" />
            <p className="mt-4 text-base text-navy/85">{page.whyTreatmentNote}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.typesHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage
                src={SKIN_WHITENING_IMAGES.technologies.src}
                alt={SKIN_WHITENING_IMAGES.technologies.alt}
                aspect="wide"
              />
            </div>
            <div className="mt-8 space-y-10">
              {SKIN_WHITENING_TREATMENTS.map((tx, i) => (
                <article key={tx.title} className="rounded-2xl border border-surface bg-white p-5 shadow-sm md:p-6">
                  <h3 className="font-heading text-xl font-bold text-navy">
                    {i + 1}. {tx.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-navy/70">Purpose</p>
                  <ul className="mt-1 list-inside list-disc text-sm text-navy/85">
                    {tx.purpose.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  {tx.howItWorks && (
                    <>
                      <p className="mt-3 text-sm font-semibold text-navy/70">How It Works</p>
                      <p className="mt-1 text-sm text-navy/85">{tx.howItWorks}</p>
                    </>
                  )}
                  <h4 className="mt-4 text-sm font-semibold text-navy">Treatment Details</h4>
                  <DataTable
                    headers={["Parameter", "Details"]}
                    keys={["label", "value"]}
                    rows={tx.details.map((d) => ({ label: d.label, value: d.value }))}
                  />
                  <p className="mt-3 text-sm font-semibold text-navy/70">Benefits</p>
                  <CheckList items={tx.benefits} variant="do" />
                  <Link href={tx.href} className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline">
                    Learn more →
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.chooseHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={SKIN_WHITENING_IMAGES.assessment.src} alt={SKIN_WHITENING_IMAGES.assessment.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">The ideal treatment depends on:</p>
            <DataTable
              headers={["Concern", "Recommended Treatment"]}
              keys={["concern", "treatment"]}
              rows={SKIN_WHITENING_CHOOSE_ROWS.map((r) => ({ concern: r.concern, treatment: r.treatment }))}
            />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.comparisonHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={SKIN_WHITENING_IMAGES.comparison.src} alt={SKIN_WHITENING_IMAGES.comparison.alt} />
            </div>
            <DataTable
              headers={["Treatment", "Price Per Session", "Sessions", "Downtime"]}
              keys={["treatment", "price", "sessions", "downtime"]}
              rows={SKIN_WHITENING_COMPARE_ROWS.map((r) => ({
                treatment: r.treatment,
                price: r.price,
                sessions: r.sessions,
                downtime: r.downtime,
              }))}
            />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.permanentHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={SKIN_WHITENING_IMAGES.permanent.src} alt={SKIN_WHITENING_IMAGES.permanent.alt} />
            </div>
            <p className="mt-4 text-lg font-semibold text-navy">{page.permanentQuestion}</p>
            <p className="mt-2 text-base text-navy/85">{page.permanentIntro}</p>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">Treatments Offering Long-Term Results</h3>
            <ul className="mt-4 space-y-3">
              {SKIN_WHITENING_LONG_TERM.map((item) => (
                <li key={item.name} className="rounded-xl border border-surface bg-surface/30 p-4 text-sm text-navy/85">
                  <strong className="text-navy">{item.name}</strong> — {item.duration}
                </li>
              ))}
            </ul>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">Maintenance Required</h3>
            <CheckList items={SKIN_WHITENING_MAINTENANCE} variant="do" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.costHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={SKIN_WHITENING_IMAGES.cost.src} alt={SKIN_WHITENING_IMAGES.cost.alt} />
            </div>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">Estimated Price Guide</h3>
            <DataTable
              headers={["Treatment", "Cost Per Session"]}
              keys={["treatment", "range"]}
              rows={SKIN_WHITENING_COST_ROWS.map((r) => ({ treatment: r.treatment, range: r.range }))}
            />
            <p className="mt-4 font-semibold text-navy">{page.packageNote}</p>
            <p className="mt-2 text-sm text-navy/75">Pricing depends on:</p>
            <ul className="mt-2 list-inside list-disc text-sm text-navy/75">
              {page.packageFactors.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.benefitsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={SKIN_WHITENING_IMAGES.benefits.src} alt={SKIN_WHITENING_IMAGES.benefits.alt} />
            </div>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">Key Benefits</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {SKIN_WHITENING_BENEFIT_GROUPS.map((group) => (
                <div key={group.title} className="rounded-2xl border border-surface bg-white p-5 shadow-sm">
                  <h4 className="font-heading font-bold text-navy">{group.title}</h4>
                  <ul className="mt-2 list-inside list-disc text-sm text-navy/85">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.sideEffectsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={SKIN_WHITENING_IMAGES.safety.src} alt={SKIN_WHITENING_IMAGES.safety.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">Temporary side effects may include:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {SKIN_WHITENING_SIDE_EFFECTS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-navy/75">{page.sideEffectsNote}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.avoidHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={SKIN_WHITENING_IMAGES.eligibility.src} alt={SKIN_WHITENING_IMAGES.eligibility.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">Treatment may not be suitable for:</p>
            <CheckList items={SKIN_WHITENING_AVOID} variant="dont" />
            <p className="mt-4 text-sm text-navy/75">{page.avoidNote}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.advancedHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={SKIN_WHITENING_IMAGES.procedures.src} alt={SKIN_WHITENING_IMAGES.procedures.alt} />
            </div>
            <DataTable
              headers={["Procedure", "Duration", "Sessions"]}
              keys={["procedure", "duration", "sessions"]}
              rows={SKIN_WHITENING_PROCEDURE_ROWS.map((r) => ({
                procedure: r.procedure,
                duration: r.duration,
                sessions: r.sessions,
              }))}
            />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyClinicHeading}</SectionTitle>
            <h3 className="mt-2 font-heading text-lg font-bold text-navy">{page.whyClinicSubheading}</h3>
            <div className="mt-6">
              <SectionImage src={SKIN_WHITENING_IMAGES.clinic.src} alt={SKIN_WHITENING_IMAGES.clinic.alt} />
            </div>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {SKIN_WHITENING_WHY_CLINIC.map((item) => (
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
            <SectionTitle>{page.doctorHeading}</SectionTitle>
            <div className="mt-6 grid gap-6 md:grid-cols-[180px_1fr]">
              <Image
                src={SKIN_WHITENING_IMAGES.drBhasin.src}
                alt={SKIN_WHITENING_IMAGES.drBhasin.alt}
                width={180}
                height={220}
                className="rounded-2xl border border-surface shadow-sm"
              />
              <div>
                <p className="text-base text-navy/85">{page.doctorBody}</p>
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-navy/70">Expertise Includes</h3>
                <ul className="mt-2 list-inside list-disc text-sm text-navy/85">
                  {SKIN_WHITENING_DOCTOR_EXPERTISE.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-navy/70">Why Patients Trust Him</h3>
                <CheckList items={page.doctorTrust} variant="do" />
                <Link href="/about/dr-bhasin" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
                  View profile →
                </Link>
              </div>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.galleryHeading}</SectionTitle>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {SKIN_WHITENING_IMAGES.gallery.map((img) => (
                <SectionImage key={img.src} src={img.src} alt={img.alt} caption={img.caption} />
              ))}
            </div>
            <p className="mt-6 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium text-navy">
              {page.galleryNote}
            </p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>What Our Patients Say</SectionTitle>
            <div className="mt-6">
              <HairTransplantReviews />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.testimonialsHeading}</SectionTitle>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {SKIN_WHITENING_VIDEO_TOPICS.map((topic) => (
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
            <SectionTitle>{page.locationHeading}</SectionTitle>
            <div className="mt-6">
              <MapEmbed embedSrc={mapEmbedUrl} title="Care Well Medical Centre location" />
            </div>
            <div className="mt-6 space-y-2 text-base text-navy/85">
              <p className="font-semibold text-navy">📍 {SKIN_WHITENING_CLINIC.name}</p>
              <p>
                House No. 1, NRI Complex, Chittaranjan Park (C.R. Park)
                <br />
                Alaknanda, New Delhi – 110019
              </p>
              <p>
                <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="text-primary underline">
                  📞 {displayPhone}
                </a>
              </p>
              <h3 className="pt-2 font-heading text-lg font-bold text-navy">Nearby Locations</h3>
              <ul className="list-inside list-disc">
                {SKIN_WHITENING_NEARBY.map((place) => (
                  <li key={place}>{place}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-primary/5 p-6 md:p-8">
              <SectionTitle>{page.ctaHeading}</SectionTitle>
              <div className="mt-6">
                <SectionImage src={SKIN_WHITENING_IMAGES.ctaBanner.src} alt={SKIN_WHITENING_IMAGES.ctaBanner.alt} aspect="wide" />
              </div>
              <p className="mt-4 text-base text-navy/85">{page.ctaBody}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`tel:${displayPhone.replace(/\s/g, "")}`}
                  className="inline-flex min-h-11 items-center rounded-button bg-navy px-6 py-3 text-sm font-semibold text-white"
                >
                  Call Now: {displayPhone}
                </a>
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
              <ServiceFaq items={SKIN_WHITENING_FAQS} />
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
                <LeadForm defaultTreatment={treatment} source="skin-whitening-sidebar" />
              </Suspense>
              <Link
                href={page.parentPath}
                className="block w-full rounded-xl border-2 border-primary py-3 text-center text-sm font-semibold text-primary"
              >
                All skin treatments
              </Link>
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
