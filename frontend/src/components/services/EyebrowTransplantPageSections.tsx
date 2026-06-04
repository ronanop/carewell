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
import { CheckList, DataTable, SectionTitle } from "@/components/services/hub-page-table";
import { Button } from "@/components/ui/Button";
import {
  EYEBROW_AFTERCARE,
  EYEBROW_BENEFIT_ROWS,
  EYEBROW_CLINIC,
  EYEBROW_COMPARE_ROWS,
  EYEBROW_CONS,
  EYEBROW_COST_FACTORS,
  EYEBROW_COST_ROWS,
  EYEBROW_DIFFICULTY_NOTE,
  EYEBROW_DIFFICULTY_POINTS,
  EYEBROW_DONOR_FACTS,
  EYEBROW_FUE_BENEFITS,
  EYEBROW_FUE_BULLETS,
  EYEBROW_FUE_FUT_ROWS,
  EYEBROW_FUE_IDEAL,
  EYEBROW_FUT_BENEFITS,
  EYEBROW_FUT_BULLETS,
  EYEBROW_FUT_IDEAL,
  EYEBROW_GRAFT_FACTORS,
  EYEBROW_GRAFT_ROWS,
  EYEBROW_IMAGES,
  EYEBROW_NEARBY,
  EYEBROW_PAGE,
  EYEBROW_POPULAR_REASONS,
  EYEBROW_PROCEDURE_STEPS,
  EYEBROW_PROS,
  EYEBROW_QUICK_FACTS_ROWS,
  EYEBROW_RECOVERY_ROWS,
  EYEBROW_TRANSPLANT_PATH,
  EYEBROW_TREATMENTS_FAQS,
  EYEBROW_VIDEO_TOPICS,
  EYEBROW_WHY_CLINIC,
} from "@/data/eyebrow-transplant-in-delhi";
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

export function EyebrowTransplantPageSections({
  phone,
  whatsapp,
}: {
  phone?: string;
  whatsapp?: string;
}) {
  const page = EYEBROW_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? EYEBROW_CLINIC.phone ?? "+91 96679 77499";
  const wa = whatsapp
    ? whatsappHref(whatsapp, "Hi, I'm interested in eyebrow transplant in Delhi.")
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: EYEBROW_TREATMENTS_FAQS.map((f) => ({
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
    url: `${getSiteUrl()}${EYEBROW_TRANSPLANT_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.parentLabel, path: page.parentPath },
          { name: "Eyebrow Transplant", path: EYEBROW_TRANSPLANT_PATH },
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
                { label: "Eyebrow Transplant" },
              ]}
            />
            <p className="mt-4 text-sm font-medium uppercase tracking-wide text-teal/90">{page.heroSubheading}</p>
            <h1 className="font-heading mt-2 text-[26px] font-bold leading-[1.12] text-white sm:text-[34px]">{page.h1}</h1>
            <div className="mt-6">
              <SectionImage src={EYEBROW_IMAGES.hero.src} alt={EYEBROW_IMAGES.hero.alt} priority aspect="wide" />
            </div>
            <div className="mt-6 space-y-3 text-base text-white/90">
              {page.heroParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {page.heroTrustPoints.map((t) => (
                <li key={t} className="flex gap-2 text-sm font-medium text-white">
                  <span className="text-teal" aria-hidden>
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
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
            <SectionTitle>{page.fullerBrowsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={EYEBROW_IMAGES.resultsGallery.src} alt={EYEBROW_IMAGES.resultsGallery.alt} caption="Natural eyebrow restoration results" />
            </div>
            <div className="mt-6 space-y-3 text-base text-navy/85">
              {page.fullerBrowsBody.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">Why Patients Choose Us</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {page.whyPatientsChoose.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <p className="mt-4 text-base text-navy/85">{page.goalsIntro}</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {page.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <p className="mt-4 text-base text-navy/85">{page.goalsOutro}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whatIsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={EYEBROW_IMAGES.processDiagram.src} alt={EYEBROW_IMAGES.processDiagram.alt} aspect="square" />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.whatIsBody}</p>
            <p className="mt-3 text-base text-navy/85">The procedure helps restore:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {page.whatIsHelps.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">{page.causesHeading}</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {page.causes.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="mt-4 text-base text-navy/85">{page.causesNote}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.techniquesHeading}</SectionTitle>
            <h3 className="mt-8 font-heading text-xl font-bold text-navy">FUE (Follicular Unit Extraction)</h3>
            <div className="mt-4">
              <SectionImage src={EYEBROW_IMAGES.fueIllustration.src} alt={EYEBROW_IMAGES.fueIllustration.alt} />
            </div>
            <p className="mt-4 font-semibold text-navy">Benefits:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {EYEBROW_FUE_BENEFITS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="mt-4 font-semibold text-navy">Ideal for:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {EYEBROW_FUE_IDEAL.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <h3 className="mt-10 font-heading text-xl font-bold text-navy">FUT (Follicular Unit Transplantation)</h3>
            <div className="mt-4">
              <SectionImage src={EYEBROW_IMAGES.futIllustration.src} alt={EYEBROW_IMAGES.futIllustration.alt} />
            </div>
            <p className="mt-4 font-semibold text-navy">Benefits:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {EYEBROW_FUT_BENEFITS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="mt-4 font-semibold text-navy">Ideal for:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {EYEBROW_FUT_IDEAL.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-navy/75">
              Our surgeons recommend the most appropriate technique after evaluating your condition.
            </p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.popularHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={EYEBROW_IMAGES.densityComparison.src} alt={EYEBROW_IMAGES.densityComparison.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">Eyebrow transplantation continues to gain popularity because it offers:</p>
            <div className="mt-6 space-y-5">
              {EYEBROW_POPULAR_REASONS.map((r) => (
                <div key={r.title}>
                  <h3 className="font-heading text-lg font-bold text-navy">{r.title}</h3>
                  <p className="mt-1 text-base text-navy/85">{r.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.benefitsHeading}</SectionTitle>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_minmax(240px,360px)]">
              <DataTable headers={["Benefit", "Description"]} keys={["benefit", "description"]} rows={EYEBROW_BENEFIT_ROWS} />
              <SectionImage src={EYEBROW_IMAGES.naturalDesign.src} alt={EYEBROW_IMAGES.naturalDesign.alt} caption="Natural eyebrow design" />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.fueFutHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={EYEBROW_IMAGES.fueFutComparison.src} alt={EYEBROW_IMAGES.fueFutComparison.alt} />
            </div>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-surface">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-surface/80 text-navy">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Feature</th>
                    <th className="px-4 py-3 font-semibold">FUE</th>
                    <th className="px-4 py-3 font-semibold">FUT</th>
                  </tr>
                </thead>
                <tbody>
                  {EYEBROW_FUE_FUT_ROWS.map((row) => (
                    <tr key={row.feature} className="border-t border-surface">
                      <td className="px-4 py-3 font-medium text-navy">{row.feature}</td>
                      <td className="px-4 py-3 text-navy/85">{row.fue}</td>
                      <td className="px-4 py-3 text-navy/85">{row.fut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="mt-8 font-semibold text-navy">FUE Benefits</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {EYEBROW_FUE_BULLETS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <h3 className="mt-6 font-semibold text-navy">FUT Benefits</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {EYEBROW_FUT_BULLETS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.prosConsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={EYEBROW_IMAGES.prosCons.src} alt={EYEBROW_IMAGES.prosCons.alt} />
            </div>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">Pros</h3>
            <CheckList items={EYEBROW_PROS} variant="do" />
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">Cons</h3>
            <ul className="mt-3 space-y-2 text-base text-navy/85">
              {EYEBROW_CONS.map((c) => (
                <li key={c} className="flex gap-2">
                  <span aria-hidden>⚠</span>
                  {c}
                </li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.graftsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={EYEBROW_IMAGES.graftDiagram.src} alt={EYEBROW_IMAGES.graftDiagram.alt} aspect="square" />
            </div>
            <p className="mt-4 text-base text-navy/85">The number of grafts depends on:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {EYEBROW_GRAFT_FACTORS.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">Average Requirement</h3>
            <DataTable headers={["Procedure", "Grafts"]} keys={["procedure", "grafts"]} rows={EYEBROW_GRAFT_ROWS} />
            <p className="mt-4 text-sm text-navy/75">
              Our surgeons carefully angle each graft to achieve the most natural appearance.
            </p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.difficultHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={EYEBROW_IMAGES.facialSymmetry.src} alt={EYEBROW_IMAGES.facialSymmetry.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">Eyebrow transplantation requires:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {EYEBROW_DIFFICULTY_POINTS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="mt-4 text-base text-navy/85">{EYEBROW_DIFFICULTY_NOTE}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.donorHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={EYEBROW_IMAGES.donorExtraction.src} alt={EYEBROW_IMAGES.donorExtraction.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">Donor hairs are usually extracted from the scalp.</p>
            <h3 className="mt-6 font-semibold text-navy">Important Facts</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {EYEBROW_DONOR_FACTS.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.procedureHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={EYEBROW_IMAGES.procedureFlowchart.src} alt={EYEBROW_IMAGES.procedureFlowchart.alt} aspect="square" />
            </div>
            <ol className="mt-8 space-y-6">
              {EYEBROW_PROCEDURE_STEPS.map((step) => (
                <li key={step.title}>
                  <h3 className="font-heading text-lg font-bold text-navy">{step.title}</h3>
                  {"body" in step && step.body && <p className="mt-2 text-base text-navy/85">{step.body}</p>}
                  {"bullets" in step && step.bullets && (
                    <>
                      <p className="mt-2 text-base text-navy/85">Assessment of:</p>
                      <ul className="mt-2 list-inside list-disc text-base text-navy/85">
                        {step.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </li>
              ))}
            </ol>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.compareHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={EYEBROW_IMAGES.clinicComparison.src} alt={EYEBROW_IMAGES.clinicComparison.alt} />
            </div>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-surface">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-surface/80 text-navy">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Key Factor</th>
                    <th className="px-4 py-3 font-semibold">Care Well Medical Centre</th>
                    <th className="px-4 py-3 font-semibold">Other Clinics</th>
                  </tr>
                </thead>
                <tbody>
                  {EYEBROW_COMPARE_ROWS.map((row) => (
                    <tr key={row.factor} className="border-t border-surface">
                      <td className="px-4 py-3 font-medium text-navy">{row.factor}</td>
                      <td className="px-4 py-3 text-navy/85">{row.carewell}</td>
                      <td className="px-4 py-3 text-navy/85">{row.other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.costHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={EYEBROW_IMAGES.costGraphic.src} alt={EYEBROW_IMAGES.costGraphic.alt} />
            </div>
            <DataTable headers={["Service", "Price Range"]} keys={["service", "price"]} rows={EYEBROW_COST_ROWS} />
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">Important Note</h3>
            <p className="mt-2 text-base text-navy/85">Final pricing depends on:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {EYEBROW_COST_FACTORS.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.recoveryHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={EYEBROW_IMAGES.recoveryTimeline.src} alt={EYEBROW_IMAGES.recoveryTimeline.alt} caption="Recovery timeline" />
            </div>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">Recovery Timeline</h3>
            <DataTable headers={["Milestone", "Time"]} keys={["milestone", "time"]} rows={EYEBROW_RECOVERY_ROWS} />
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">Aftercare Instructions</h3>
            <CheckList items={EYEBROW_AFTERCARE} variant="do" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyClinicHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={EYEBROW_IMAGES.doctorPatient.src} alt={EYEBROW_IMAGES.doctorPatient.alt} />
            </div>
            <div className="mt-8 space-y-6">
              {EYEBROW_WHY_CLINIC.map((block) => (
                <div key={block.title}>
                  <h3 className="font-heading text-lg font-bold text-navy">{block.title}</h3>
                  <p className="mt-2 text-base text-navy/85">{block.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.reviewsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={EYEBROW_IMAGES.reviewCollage.src} alt={EYEBROW_IMAGES.reviewCollage.alt} caption="Patient experiences" />
            </div>
            <p className="mt-4 text-sm text-navy/75">
              Read genuine reviews from patients who underwent eyebrow restoration at Care Well Medical Centre.
            </p>
            <div className="mt-8">
              <HairTransplantReviews />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.galleryHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.galleryNote}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {EYEBROW_IMAGES.gallery.map((img) => (
                <SectionImage key={`${img.src}-${img.caption}`} src={img.src} alt={img.alt} caption={img.caption} />
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.quickFactsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={EYEBROW_IMAGES.quickFacts.src} alt={EYEBROW_IMAGES.quickFacts.alt} />
            </div>
            <DataTable headers={["Parameter", "Details"]} keys={["parameter", "details"]} rows={EYEBROW_QUICK_FACTS_ROWS} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.locationHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={EYEBROW_IMAGES.clinicLocation.src} alt={EYEBROW_IMAGES.clinicLocation.alt} caption="Clinic location" />
            </div>
            <div className="mt-6 space-y-3 text-base text-navy/85">
              <p className="font-semibold text-navy">{EYEBROW_CLINIC.name}</p>
              <p>
                House No. 1, NRI Complex, Chittaranjan Park (C.R. Park)
                <br />
                New Delhi – 110019
              </p>
              <p>
                <a href={`tel:${EYEBROW_CLINIC.phone.replace(/\s/g, "")}`} className="text-primary underline">
                  {EYEBROW_CLINIC.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${EYEBROW_CLINIC.email}`} className="text-primary underline">
                  {EYEBROW_CLINIC.email}
                </a>
              </p>
            </div>
            <p className="mt-4 text-base text-navy/85">Conveniently located in South Delhi with easy access from:</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {EYEBROW_NEARBY.map((city) => (
                <li key={city} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-navy">
                  {city}
                </li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-primary/5 p-6 md:p-8">
              <SectionTitle>{page.ctaHeading}</SectionTitle>
              <div className="mt-6">
                <SectionImage src={EYEBROW_IMAGES.ctaBanner.src} alt={EYEBROW_IMAGES.ctaBanner.alt} aspect="wide" />
              </div>
              <p className="mt-4 text-base text-navy/85">{page.ctaBody}</p>
              <h3 className="mt-6 font-heading text-lg font-bold text-navy">Why Patients Trust Us</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {page.trustBadges.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-navy/85">
                    <span className="text-teal" aria-hidden>
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center rounded-button bg-navy px-6 py-3 text-sm font-semibold text-white">
                  Call Now: {displayPhone}
                </a>
                <Button href="/book-consultation" variant="primary">
                  Book Your Appointment Today
                </Button>
              </div>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.videosHeading}</SectionTitle>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {EYEBROW_VIDEO_TOPICS.map((topic, i) => (
                <div key={topic} className="overflow-hidden rounded-2xl border border-surface">
                  {i === 0 ? (
                    <div className="relative aspect-video">
                      <Image src={EYEBROW_IMAGES.videoPoster.src} alt={EYEBROW_IMAGES.videoPoster.alt} fill className="object-cover" sizes="400px" />
                    </div>
                  ) : (
                    <div className="flex aspect-video items-center justify-center bg-surface/50 p-4 text-center text-sm text-navy/60">
                      {topic}
                    </div>
                  )}
                  <p className="px-4 py-2 text-center text-sm font-medium text-navy">{topic}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.faqHeading}</SectionTitle>
            <div className="mt-8">
              <ServiceFaq items={EYEBROW_TREATMENTS_FAQS} />
            </div>
          </section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <ServiceSidebarReveal>
              <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-surface" />}>
                <LeadForm defaultTreatment={treatment} source="eyebrow-transplant-sidebar" />
              </Suspense>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(procLd) }} />
    </div>
  );
}
