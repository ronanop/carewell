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
  FEMALE_ALOPECIA_TYPES,
  FEMALE_BENEFIT_ROWS,
  FEMALE_CANDIDATE_AVOID,
  FEMALE_CANDIDATE_GOOD,
  FEMALE_CAUSES_LIFESTYLE,
  FEMALE_CAUSES_MEDICAL,
  FEMALE_CAUSES_MEDICATION,
  FEMALE_COST_FACTORS,
  FEMALE_COST_ROWS,
  FEMALE_DIAGNOSIS,
  FEMALE_FUE_BENEFITS,
  FEMALE_FUT_BENEFITS,
  FEMALE_HORMONAL,
  FEMALE_HT_CLINIC,
  FEMALE_HT_FAQS,
  FEMALE_HT_IMAGES,
  FEMALE_HT_PAGE,
  FEMALE_METRO,
  FEMALE_PROCEDURE_STEPS,
  FEMALE_QUICK_FACTS_ROWS,
  FEMALE_ROAD,
  FEMALE_SIDE_EFFECTS,
  FEMALE_VIDEO_TOPICS,
  FEMALE_WHY_CLINIC,
  FEMALE_HAIR_TRANSPLANT_PATH,
} from "@/data/female-hair-transplant-in-delhi";
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

export function FemaleHairTransplantPageSections({
  phone,
  whatsapp,
}: {
  phone?: string;
  whatsapp?: string;
}) {
  const page = FEMALE_HT_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? FEMALE_HT_CLINIC.phone ?? "+91 96679 77499";
  const wa = whatsapp
    ? whatsappHref(whatsapp, "Hi, I'm interested in female hair transplant in Delhi.")
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FEMALE_HT_FAQS.map((f) => ({
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
    url: `${getSiteUrl()}${FEMALE_HAIR_TRANSPLANT_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.parentLabel, path: page.parentPath },
          { name: "Female Hair Transplant", path: FEMALE_HAIR_TRANSPLANT_PATH },
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
                { label: "Female Hair Transplant" },
              ]}
            />
            <p className="mt-4 text-sm font-medium uppercase tracking-wide text-teal/90">{page.heroSubheading}</p>
            <h1 className="font-heading mt-2 text-[26px] font-bold leading-[1.12] text-white sm:text-[34px]">{page.h1}</h1>
            <div className="mt-6">
              <SectionImage src={FEMALE_HT_IMAGES.hero.src} alt={FEMALE_HT_IMAGES.hero.alt} priority aspect="wide" />
            </div>
            <div className="mt-6 space-y-3 text-base text-white/90">
              {page.heroParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <p className="mt-3 text-sm text-white/80">Hair loss in women can occur due to:</p>
            <ul className="mt-2 list-inside list-disc text-sm text-white/85">
              {page.hairLossCauses.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="mt-4 text-base text-white/90">{page.heroClosing}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/book-consultation" variant="secondary">
                Consult Now
              </Button>
              <a
                href={`tel:${displayPhone.replace(/\s/g, "")}`}
                className="inline-flex min-h-11 items-center rounded-button border-2 border-white/40 px-6 py-3 text-sm font-semibold text-white"
              >
                Call: {displayPhone}
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
            <SectionTitle>{page.whatIsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={FEMALE_HT_IMAGES.procedureDiagram.src} alt={FEMALE_HT_IMAGES.procedureDiagram.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.whatIsBody}</p>
            <p className="mt-3 text-base text-navy/85">The transplanted follicles continue growing naturally in their new location, resulting in:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {page.whatIsResults.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.alopeciaHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={FEMALE_HT_IMAGES.alopeciaTypes.src} alt={FEMALE_HT_IMAGES.alopeciaTypes.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.alopeciaIntro}</p>
            <div className="mt-8 space-y-8">
              {FEMALE_ALOPECIA_TYPES.map((type) => (
                <div key={type.title}>
                  <h3 className="font-heading text-lg font-bold text-navy">{type.title}</h3>
                  <ul className="mt-2 list-inside list-disc text-base text-navy/85">
                    {type.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.signsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={FEMALE_HT_IMAGES.causesSigns.src} alt={FEMALE_HT_IMAGES.causesSigns.alt} caption="Female hair loss progression" />
            </div>
            <p className="mt-4 text-base text-navy/85">Common signs include:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {page.signs.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="mt-4 text-base text-navy/85">{page.signsNote}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.causesHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={FEMALE_HT_IMAGES.causesSigns.src} alt="Causes of female hair loss infographic" />
            </div>
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">Medical Conditions</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {FEMALE_CAUSES_MEDICAL.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">Lifestyle & External Factors</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {FEMALE_CAUSES_LIFESTYLE.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">Medication Side Effects</h3>
            <p className="mt-2 text-base text-navy/85">Hair loss may occur due to medications used for:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {FEMALE_CAUSES_MEDICATION.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">Hormonal Changes</h3>
            <p className="mt-2 text-base text-navy/85">Temporary or genetic hair loss may occur during:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {FEMALE_HORMONAL.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.diagnoseHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={FEMALE_HT_IMAGES.procedureDiagram.src} alt="Female hair assessment consultation" />
            </div>
            <p className="mt-4 text-base text-navy/85">Diagnosis may include:</p>
            <div className="mt-6 space-y-6">
              {FEMALE_DIAGNOSIS.map((d) => (
                <div key={d.title}>
                  <h3 className="font-heading text-lg font-bold text-navy">{d.title}</h3>
                  {"body" in d && d.body && <p className="mt-2 text-base text-navy/85">{d.body}</p>}
                  {"intro" in d && d.intro && <p className="mt-2 text-base text-navy/85">{d.intro}</p>}
                  {"bullets" in d && d.bullets && (
                    <ul className="mt-2 list-inside list-disc text-base text-navy/85">
                      {d.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.proceduresHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={FEMALE_HT_IMAGES.fueFut.src} alt={FEMALE_HT_IMAGES.fueFut.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.proceduresIntro}</p>
            <h3 className="mt-8 font-heading text-xl font-bold text-navy">FUT (Follicular Unit Transplantation)</h3>
            <div className="mt-4">
              <SectionImage src={FEMALE_HT_IMAGES.futProcedure.src} alt={FEMALE_HT_IMAGES.futProcedure.alt} />
            </div>
            <p className="mt-4 font-semibold text-navy">Benefits:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {FEMALE_FUT_BENEFITS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <h3 className="mt-10 font-heading text-xl font-bold text-navy">FUE (Follicular Unit Extraction)</h3>
            <div className="mt-4">
              <SectionImage src={FEMALE_HT_IMAGES.fueProcedure.src} alt={FEMALE_HT_IMAGES.fueProcedure.alt} />
            </div>
            <p className="mt-4 font-semibold text-navy">Benefits:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {FEMALE_FUE_BENEFITS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-navy/85">{page.dhtNote}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.candidateGoodHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={FEMALE_HT_IMAGES.idealCandidate.src} alt={FEMALE_HT_IMAGES.idealCandidate.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.candidateGoodIntro}</p>
            <CheckList items={FEMALE_CANDIDATE_GOOD} variant="do" />
            <p className="mt-4 text-sm text-navy/75">Candidates should have sufficient healthy donor hair available.</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.candidateAvoidHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={FEMALE_HT_IMAGES.unsuitableCandidate.src} alt={FEMALE_HT_IMAGES.unsuitableCandidate.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.candidateAvoidIntro}</p>
            <CheckList items={FEMALE_CANDIDATE_AVOID} variant="dont" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.benefitsHeading}</SectionTitle>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_minmax(240px,360px)]">
              <DataTable headers={["Benefit", "Description"]} keys={["benefit", "description"]} rows={FEMALE_BENEFIT_ROWS} />
              <SectionImage src={FEMALE_HT_IMAGES.benefits.src} alt={FEMALE_HT_IMAGES.benefits.alt} />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.procedureHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={FEMALE_HT_IMAGES.procedureFlow.src} alt={FEMALE_HT_IMAGES.procedureFlow.alt} />
            </div>
            <ol className="mt-8 space-y-6">
              {FEMALE_PROCEDURE_STEPS.map((step) => (
                <li key={step.title}>
                  <h3 className="font-heading text-lg font-bold text-navy">{step.title}</h3>
                  {"prefix" in step && step.prefix && <p className="mt-2 text-base text-navy/85">{step.prefix}</p>}
                  {"body" in step && step.body && <p className="mt-2 text-base text-navy/85">{step.body}</p>}
                  {"bullets" in step && step.bullets && (
                    <ul className="mt-2 list-inside list-disc text-base text-navy/85">
                      {step.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.safeHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={FEMALE_HT_IMAGES.safety.src} alt={FEMALE_HT_IMAGES.safety.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.safeIntro}</p>
            <p className="mt-3 text-base text-navy/85">Potential temporary side effects include:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {FEMALE_SIDE_EFFECTS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="mt-4 text-base text-navy/85">{page.safeClosing}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.costHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={FEMALE_HT_IMAGES.cost.src} alt={FEMALE_HT_IMAGES.cost.alt} caption="Cost per 1000 grafts" />
            </div>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">Cost Per 1000 Grafts</h3>
            <DataTable headers={["Procedure", "Cost"]} keys={["procedure", "cost"]} rows={FEMALE_COST_ROWS} />
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">Factors Affecting Cost</h3>
            <div className="mt-4">
              <SectionImage src={FEMALE_HT_IMAGES.costFactors.src} alt={FEMALE_HT_IMAGES.costFactors.alt} />
            </div>
            <ul className="mt-4 list-inside list-disc text-base text-navy/85">
              {FEMALE_COST_FACTORS.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-navy/75">Final pricing is provided after consultation.</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.calculatorHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={FEMALE_HT_IMAGES.graftCalculator.src} alt={FEMALE_HT_IMAGES.graftCalculator.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.calculatorBody}</p>
            <div className="mt-6">
              <Button href={page.calculatorHref} variant="primary">
                {page.calculatorCta}
              </Button>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyClinicHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={FEMALE_HT_IMAGES.doctorPatient.src} alt={FEMALE_HT_IMAGES.doctorPatient.alt} />
            </div>
            <div className="mt-8 space-y-6">
              {FEMALE_WHY_CLINIC.map((block) => (
                <div key={block.title}>
                  <h3 className="font-heading text-lg font-bold text-navy">{block.title}</h3>
                  <p className="mt-2 text-base text-navy/85">{block.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.galleryHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.galleryNote}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {FEMALE_HT_IMAGES.gallery.map((img) => (
                <SectionImage key={`${img.src}-${img.caption}`} src={img.src} alt={img.alt} caption={img.caption} />
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.videosHeading}</SectionTitle>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {FEMALE_VIDEO_TOPICS.map((topic, i) => (
                <div key={topic} className="overflow-hidden rounded-2xl border border-surface">
                  {i === 0 ? (
                    <div className="relative aspect-video">
                      <Image src={FEMALE_HT_IMAGES.videoPoster.src} alt={FEMALE_HT_IMAGES.videoPoster.alt} fill className="object-cover" sizes="400px" />
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
            <SectionTitle>{page.quickFactsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={FEMALE_HT_IMAGES.quickFacts.src} alt={FEMALE_HT_IMAGES.quickFacts.alt} />
            </div>
            <DataTable headers={["Parameter", "Details"]} keys={["parameter", "details"]} rows={FEMALE_QUICK_FACTS_ROWS} />
          </section>

          <section className="section-y border-t border-surface">
            <p className="text-sm font-medium text-navy/70">Patient Reviews</p>
            <div className="mt-6">
              <HairTransplantReviews />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.locationHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={FEMALE_HT_IMAGES.clinicLocation.src} alt={FEMALE_HT_IMAGES.clinicLocation.alt} caption="Clinic location" />
            </div>
            <div className="mt-6 space-y-3 text-base text-navy/85">
              <p className="font-semibold text-navy">{FEMALE_HT_CLINIC.name}</p>
              <p>
                House No. 1, NRI Complex, Chittaranjan Park (C.R. Park)
                <br />
                NRI Colony, Mandakini Enclave Colony, Alaknanda
                <br />
                New Delhi – 110019
              </p>
              <p>
                <a href={`tel:${FEMALE_HT_CLINIC.phone.replace(/\s/g, "")}`} className="text-primary underline">
                  {FEMALE_HT_CLINIC.phone}
                </a>
              </p>
            </div>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">By Metro</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {FEMALE_METRO.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">By Road</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {FEMALE_ROAD.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-primary/5 p-6 md:p-8">
              <SectionTitle>{page.ctaHeading}</SectionTitle>
              <div className="mt-6">
                <SectionImage src={FEMALE_HT_IMAGES.ctaBanner.src} alt={FEMALE_HT_IMAGES.ctaBanner.alt} aspect="wide" />
              </div>
              <p className="mt-4 text-base text-navy/85">{page.ctaBody}</p>
              <p className="mt-4 text-base text-navy/85">Our goal is to help you achieve:</p>
              <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                {page.ctaGoals.map((g) => (
                  <li key={g} className="flex gap-2 text-sm text-navy/85">
                    <span className="text-teal" aria-hidden>
                      ✓
                    </span>
                    {g}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center rounded-button bg-navy px-6 py-3 text-sm font-semibold text-white">
                  Call Now: {displayPhone}
                </a>
                <Button href="/book-consultation" variant="primary">
                  Book Your Consultation Today
                </Button>
              </div>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.faqHeading}</SectionTitle>
            <div className="mt-8">
              <ServiceFaq items={FEMALE_HT_FAQS} />
            </div>
          </section>

          <section className="pb-8">
            <h2 className="font-heading text-lg font-bold text-navy">Medical Disclaimer</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy/70">{page.disclaimer}</p>
          </section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <ServiceSidebarReveal>
              <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-surface" />}>
                <LeadForm defaultTreatment={treatment} source="female-hair-transplant-sidebar" />
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
