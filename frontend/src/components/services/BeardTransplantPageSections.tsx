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
  BEARD_ACCESS_MODES,
  BEARD_CANDIDATE_AVOID,
  BEARD_CANDIDATE_GOOD,
  BEARD_CLINIC,
  BEARD_CLINIC_REASONS,
  BEARD_CONSULTATION_POINTS,
  BEARD_COST_ACCORDION,
  BEARD_COST_AREA_ROWS,
  BEARD_COST_SCOPE_ROWS,
  BEARD_FUE_FUT_ROWS,
  BEARD_IMAGES,
  BEARD_NEARBY_CITIES,
  BEARD_PAGE,
  BEARD_PROCEDURE_NOTE,
  BEARD_PROCEDURE_STEPS,
  BEARD_SUCCESS_FACTORS,
  BEARD_SUCCESS_NOTE,
  BEARD_TECHNIQUE_ACCORDION,
  BEARD_TECHNIQUE_ROWS,
  BEARD_TIMELINE_ROWS,
  BEARD_TRANSPLANT_PATH,
  BEARD_TREATMENTS_FAQS,
  BEARD_VIDEO_TOPICS,
} from "@/data/beard-transplant-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { whatsappHref } from "@carewell/backend/lib/whatsapp";

const CLINIC_PHONE_DISPLAY = "+91 96679 77499";

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

function ContentAccordion({ items }: { items: readonly { title: string; body: string }[] }) {
  return (
    <div className="mt-6 divide-y divide-surface rounded-2xl border border-surface bg-white">
      {items.map((item) => (
        <details key={item.title} className="group px-4 py-3 md:px-6 open:bg-surface/40">
          <summary className="cursor-pointer list-none font-heading text-base font-semibold text-navy marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-4">
              {item.title}
              <span className="text-primary group-open:hidden">+</span>
              <span className="hidden text-primary group-open:inline">−</span>
            </span>
          </summary>
          <p className="mt-3 pb-2 text-sm leading-relaxed text-navy/80">{item.body}</p>
        </details>
      ))}
    </div>
  );
}

export function BeardTransplantPageSections({
  phone,
  whatsapp,
}: {
  phone?: string;
  whatsapp?: string;
}) {
  const page = BEARD_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? BEARD_CLINIC.phone ?? CLINIC_PHONE_DISPLAY;
  const wa = whatsapp
    ? whatsappHref(whatsapp, "Hi, I'm interested in beard transplant in Delhi.")
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BEARD_TREATMENTS_FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const procLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: page.h1,
    description: page.heroSubheading,
    url: `${getSiteUrl()}${BEARD_TRANSPLANT_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.parentLabel, path: page.parentPath },
          { name: "Beard Transplant", path: BEARD_TRANSPLANT_PATH },
        ]}
      />

      {/* Hero */}
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
                { label: "Beard Transplant" },
              ]}
            />
            <p className="mt-4 text-sm font-medium uppercase tracking-wide text-teal/90">{page.heroSubheading}</p>
            <h1 className="font-heading mt-2 text-[26px] font-bold leading-[1.12] text-white sm:text-[36px]">{page.h1}</h1>
            <div className="mt-6">
              <SectionImage
                src={BEARD_IMAGES.heroBanner.src}
                alt={BEARD_IMAGES.heroBanner.alt}
                caption="Before & after beard transplant transformation"
                priority
                aspect="wide"
              />
            </div>
            <div className="mt-6 space-y-3 text-base text-white/90">
              {page.heroParagraphs.map((p) => (
                <p key={p.slice(0, 50)}>{p}</p>
              ))}
            </div>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {page.keyHighlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm font-medium text-white">
                  <span className="text-teal" aria-hidden>
                    ✓
                  </span>
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/book-consultation" variant="secondary">
                Book Your Appointment Now
              </Button>
              <a
                href={`tel:${displayPhone.replace(/\s/g, "")}`}
                className="inline-flex min-h-11 items-center rounded-button border-2 border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Call Us: {displayPhone}
              </a>
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center rounded-button bg-[#25D366] px-6 py-3 text-sm font-semibold text-white"
                >
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
          {/* Why beard transplant */}
          <section className="section-y">
            <SectionTitle>{page.whyTransplantHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage
                src={BEARD_IMAGES.procedureIllustration.src}
                alt={BEARD_IMAGES.procedureIllustration.alt}
                caption="Beard transplant procedure illustration"
              />
            </div>
            <div className="mt-6 space-y-3 text-base text-navy/85">
              {page.whyTransplantBody.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <h3 className="mt-8 font-heading text-xl font-bold text-navy">Techniques Used</h3>
            <DataTable headers={["Technique", "Description"]} keys={["technique", "description"]} rows={BEARD_TECHNIQUE_ROWS} />
            <p className="mt-4 text-sm text-navy/75">
              At Care Well Medical Centre, we carefully evaluate your condition before selecting the most suitable approach.
            </p>
          </section>

          {/* Why clinic */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyClinicHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage
                src={BEARD_IMAGES.clinicExterior.src}
                alt={BEARD_IMAGES.clinicExterior.alt}
                caption="Care Well Medical Centre — Delhi"
              />
            </div>
            <div className="mt-8 space-y-8">
              {BEARD_CLINIC_REASONS.map((block) => (
                <div key={block.heading}>
                  <h3 className="font-heading text-lg font-bold text-navy">{block.heading}</h3>
                  {"body" in block && block.body && <p className="mt-2 text-base text-navy/85">{block.body}</p>}
                  {"bullets" in block && block.bullets && (
                    <ul className="mt-2 list-inside list-disc text-base text-navy/85">
                      {block.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Candidates */}
          <section className="section-y border-t border-surface">
            <SectionTitle>Who Is a Good Candidate for a Beard Transplant?</SectionTitle>
            <div className="mt-6">
              <SectionImage
                src={BEARD_IMAGES.beardPatterns.src}
                alt={BEARD_IMAGES.beardPatterns.alt}
                caption="Beard pattern examples"
              />
            </div>
            <p className="mt-4 text-base text-navy/85">Many men visit us because of:</p>
            <div className="mt-6 space-y-6">
              {BEARD_CANDIDATE_GOOD.map((c) => (
                <div key={c.title}>
                  <h3 className="font-heading text-lg font-bold text-navy">✓ {c.title}</h3>
                  <p className="mt-1 text-base text-navy/85">{c.intro}</p>
                  {c.bullets.length > 0 && (
                    <ul className="mt-2 list-inside list-disc text-base text-navy/85">
                      {c.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <h3 className="mt-10 font-heading text-xl font-bold text-navy">When a Beard Transplant May Not Be Advised</h3>
            <div className="mt-6 space-y-6">
              {BEARD_CANDIDATE_AVOID.map((c) => (
                <div key={c.title}>
                  <h4 className="font-semibold text-navy">✗ {c.title}</h4>
                  <ul className="mt-2 list-inside list-disc text-base text-navy/85">
                    {c.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Cost */}
          <section className="section-y border-t border-surface">
            <SectionTitle>Beard Transplant Cost in Delhi</SectionTitle>
            <div className="mt-6">
              <SectionImage src={BEARD_IMAGES.costGraphic.src} alt={BEARD_IMAGES.costGraphic.alt} caption="Typical cost ranges" />
            </div>
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">Typical Cost Range</h3>
            <DataTable headers={["Treatment Scope", "Approximate Cost"]} keys={["scope", "cost"]} rows={BEARD_COST_SCOPE_ROWS} />
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">Detailed Pricing Guide</h3>
            <DataTable
              headers={["Beard Area", "Grafts Required", "Estimated Cost"]}
              keys={["area", "grafts", "cost"]}
              rows={BEARD_COST_AREA_ROWS}
            />
            <ContentAccordion items={BEARD_COST_ACCORDION} />
          </section>

          {/* Design */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.designHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage
                src={BEARD_IMAGES.beardDesignMapping.src}
                alt={BEARD_IMAGES.beardDesignMapping.alt}
                caption="Beard design mapping"
              />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.designIntro}</p>
            <h3 className="mt-6 font-semibold text-navy">Factors Considered</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {page.designFactors.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <blockquote className="mt-6 border-l-4 border-primary pl-4 text-base italic text-navy/85">
              {page.designQuote}
            </blockquote>
          </section>

          {/* Surgeon */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.surgeonHeading}</SectionTitle>
            <div className="mt-6 grid gap-8 md:grid-cols-[200px_1fr] md:items-start">
              <Image
                src={BEARD_IMAGES.doctorPortrait.src}
                alt={BEARD_IMAGES.doctorPortrait.alt}
                width={200}
                height={240}
                className="rounded-2xl border border-surface shadow-sm"
              />
              <div>
                <h3 className="font-heading text-2xl font-bold text-navy">Dr. Sandeep Bhasin</h3>
                <p className="mt-1 text-primary font-medium">Senior Cosmetic & Aesthetic Surgeon</p>
                <h4 className="mt-6 font-semibold text-navy">Why Patients Trust Him</h4>
                <ul className="mt-2 list-inside list-disc text-base text-navy/85">
                  <li>20+ Years Experience</li>
                  <li>Hair Restoration Specialist</li>
                  <li>Natural Beard Design Focus</li>
                  <li>Medical-Grade Assessment</li>
                  <li>Structured Follow-Up Care</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FUE vs FUT */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.techniquesHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage
                src={BEARD_IMAGES.fueFutComparison.src}
                alt={BEARD_IMAGES.fueFutComparison.alt}
                caption="FUE vs FUT comparison"
              />
            </div>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-surface">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-surface/80 text-navy">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Factor</th>
                    <th className="px-4 py-3 font-semibold">FUE</th>
                    <th className="px-4 py-3 font-semibold">FUT</th>
                  </tr>
                </thead>
                <tbody>
                  {BEARD_FUE_FUT_ROWS.map((row) => (
                    <tr key={row.factor} className="border-t border-surface">
                      <td className="px-4 py-3 font-medium text-navy">{row.factor}</td>
                      <td className="px-4 py-3 text-navy/85">{row.fue}</td>
                      <td className="px-4 py-3 text-navy/85">{row.fut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ContentAccordion items={BEARD_TECHNIQUE_ACCORDION} />
          </section>

          {/* Procedure */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.procedureHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage
                src={BEARD_IMAGES.procedureFlowchart.src}
                alt={BEARD_IMAGES.procedureFlowchart.alt}
                caption="Procedure overview"
              />
            </div>
            <ol className="mt-8 space-y-4">
              {BEARD_PROCEDURE_STEPS.map((step) => (
                <li key={step.title}>
                  <h3 className="font-heading text-lg font-bold text-navy">{step.title}</h3>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-base text-navy/85">{BEARD_PROCEDURE_NOTE}</p>
          </section>

          {/* Videos placeholder */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.videosHeading}</SectionTitle>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {BEARD_VIDEO_TOPICS.map((topic) => (
                <div
                  key={topic}
                  className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-surface bg-surface/50 p-6 text-center text-sm text-navy/60"
                >
                  <span>
                    <span className="block font-semibold text-navy/80">{topic}</span>
                    Video — add YouTube ID when available
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.galleryHeading}</SectionTitle>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {BEARD_IMAGES.gallery.map((img) => (
                <SectionImage key={`${img.src}-${img.caption}`} src={img.src} alt={img.alt} caption={img.caption} aspect="video" />
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.timelineHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage
                src={BEARD_IMAGES.resultsTimeline.src}
                alt={BEARD_IMAGES.resultsTimeline.alt}
                caption="Results timeline"
              />
            </div>
            <DataTable headers={["Timeline", "Expected Progress"]} keys={["timeline", "progress"]} rows={BEARD_TIMELINE_ROWS} />
          </section>

          {/* Success */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.successHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={BEARD_IMAGES.successFactors.src} alt={BEARD_IMAGES.successFactors.alt} />
            </div>
            <ul className="mt-6 space-y-3">
              {BEARD_SUCCESS_FACTORS.map((f) => (
                <li key={f} className="font-heading text-lg font-bold text-navy">
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-base text-navy/85">{BEARD_SUCCESS_NOTE}</p>
          </section>

          {/* Near me */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.nearMeHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={BEARD_IMAGES.clinicLocation.src} alt={BEARD_IMAGES.clinicLocation.alt} caption="Clinic location" />
            </div>
            <p className="mt-4 text-base text-navy/85">Patients regularly visit from:</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {BEARD_NEARBY_CITIES.map((city) => (
                <li key={city} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-navy">
                  {city}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-base text-navy/85">Easy access through:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {BEARD_ACCESS_MODES.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </section>

          {/* Reviews */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.reviewsHeading}</SectionTitle>
            <p className="mt-2 text-sm text-navy/70">Real Patient Experiences · Verified Google Reviews</p>
            <div className="mt-8">
              <HairTransplantReviews />
            </div>
          </section>

          {/* Consultation */}
          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-primary/5 p-6 md:p-8">
              <SectionTitle>{page.consultationHeading}</SectionTitle>
              <div className="mt-6">
                <SectionImage
                  src={BEARD_IMAGES.consultationBanner.src}
                  alt={BEARD_IMAGES.consultationBanner.alt}
                  aspect="wide"
                />
              </div>
              <p className="mt-4 text-base text-navy/85">A consultation helps determine:</p>
              <ul className="mt-2 list-inside list-disc text-base text-navy/85">
                {BEARD_CONSULTATION_POINTS.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`tel:${displayPhone.replace(/\s/g, "")}`}
                  className="inline-flex min-h-11 items-center rounded-button bg-navy px-6 py-3 text-sm font-semibold text-white"
                >
                  Call Now: {displayPhone}
                </a>
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center rounded-button bg-[#25D366] px-6 py-3 text-sm font-semibold text-white"
                  >
                    WhatsApp
                  </a>
                )}
                <Button href="/book-consultation" variant="primary">
                  Online Appointment Booking
                </Button>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.faqHeading}</SectionTitle>
            <div className="mt-8">
              <ServiceFaq items={BEARD_TREATMENTS_FAQS} />
            </div>
          </section>

          {/* Medical transparency */}
          <section className="section-y border-t border-surface">
            <SectionTitle>Medical Transparency</SectionTitle>
            <p className="mt-4 text-sm text-navy/80">
              <span className="font-semibold text-navy">Medically Reviewed By:</span> {page.medicalReview.by}
            </p>
            <p className="mt-2 text-sm text-navy/80">
              <span className="font-semibold text-navy">Clinic:</span> {page.medicalReview.clinic}
            </p>
            <p className="mt-2 text-sm text-navy/80">
              <span className="font-semibold text-navy">Last Reviewed:</span> {page.medicalReview.lastReviewed}
            </p>
          </section>

          <section className="pb-8">
            <h2 className="font-heading text-lg font-bold text-navy">Disclaimer</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy/70">{page.disclaimer}</p>
          </section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <ServiceSidebarReveal>
              <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-surface" />}>
                <LeadForm defaultTreatment={treatment} source="beard-transplant-sidebar" />
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
