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
  HT_CITY_ROWS,
  HT_CLINIC_OFFERS,
  HT_COMPARE_ROWS,
  HT_COST_CLINIC,
  HT_COST_FAQS,
  HT_COST_IMAGES,
  HT_COST_MAJOR_FACTORS,
  HT_COST_PAGE,
  HT_DIFFERENT_ITEMS,
  HT_EMI_OPTIONS,
  HT_GRAFT_COUNT_ROWS,
  HT_HIDDEN_COSTS,
  HT_NORWOOD_ROWS,
  HT_SURGEON_POINTS,
  HT_TECHNIQUE_COSTS,
  HT_VIDEO_TOPICS,
  HAIR_TRANSPLANT_COST_PATH,
} from "@/data/hair-transplant-cost-in-delhi";
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

function WideCostTable({
  headers,
  rows,
  keys,
}: {
  headers: string[];
  rows: readonly Record<string, string>[];
  keys: string[];
}) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-surface">
      <table className="min-w-[640px] w-full text-left text-sm">
        <thead className="bg-surface/80 text-navy">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-3 py-3 font-semibold whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-surface">
              {keys.map((k) => (
                <td key={k} className="px-3 py-3 text-navy/85 whitespace-nowrap">
                  {row[k]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function HairTransplantCostPageSections({
  phone,
  whatsapp,
}: {
  phone?: string;
  whatsapp?: string;
}) {
  const page = HT_COST_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? HT_COST_CLINIC.phone ?? "+91 96679 77499";
  const wa = whatsapp
    ? whatsappHref(whatsapp, "Hi, I'd like to know hair transplant cost in Delhi.")
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HT_COST_FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const procLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: page.h1,
    description: page.heroSubheading,
    url: `${getSiteUrl()}${HAIR_TRANSPLANT_COST_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.parentLabel, path: page.parentPath },
          { name: "Hair Transplant Cost", path: HAIR_TRANSPLANT_COST_PATH },
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
                { label: "Cost" },
              ]}
            />
            <p className="mt-4 text-sm font-medium uppercase tracking-wide text-teal/90">{page.heroSubheading}</p>
            <h1 className="font-heading mt-2 text-[24px] font-bold leading-[1.12] text-white sm:text-[32px]">{page.h1}</h1>
            <div className="mt-6">
              <SectionImage src={HT_COST_IMAGES.hero.src} alt={HT_COST_IMAGES.hero.alt} priority aspect="wide" />
            </div>
            <div className="mt-6 space-y-3 text-base text-white/90">
              {page.heroParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-white/20 bg-white/5 p-4">
              <p className="font-semibold text-white">{page.commonQuestion}</p>
              <p className="mt-2 text-sm text-white/85">The answer depends on:</p>
              <ul className="mt-2 list-inside list-disc text-sm text-white/85">
                {page.costDepends.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-teal/90">{page.transparentNote}</p>
            </div>
            <p className="mt-6 text-sm font-medium text-white">What You&apos;ll Learn in This Guide</p>
            <ul className="mt-2 grid gap-1 sm:grid-cols-2">
              {page.learnPoints.map((l) => (
                <li key={l} className="flex gap-2 text-sm text-white/90">
                  <span className="text-teal" aria-hidden>
                    ✔
                  </span>
                  {l}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/book-consultation" variant="secondary">
                Book Consultation
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
            <SectionTitle>{page.factorsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={HT_COST_IMAGES.costFactors.src} alt={HT_COST_IMAGES.costFactors.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.factorsIntro}</p>
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">Major Cost Factors</h3>
            <div className="mt-6 space-y-6">
              {HT_COST_MAJOR_FACTORS.map((f) => (
                <div key={f.title}>
                  <h4 className="font-semibold text-navy">{f.title}</h4>
                  {"body" in f && f.body && <p className="mt-1 text-base text-navy/85">{f.body}</p>}
                  {"items" in f && f.items && (
                    <ul className="mt-2 list-inside list-disc text-base text-navy/85">
                      {f.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.techniqueCostHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={HT_COST_IMAGES.techniqueComparison.src} alt={HT_COST_IMAGES.techniqueComparison.alt} />
            </div>
            <div className="mt-8 space-y-8">
              {HT_TECHNIQUE_COSTS.map((t) => (
                <div key={t.name} className="rounded-2xl border border-surface bg-white p-5 shadow-sm">
                  <h3 className="font-heading text-lg font-bold text-navy">{t.name}</h3>
                  <p className="mt-3 font-semibold text-navy">Benefits</p>
                  <ul className="mt-1 list-inside list-disc text-base text-navy/85">
                    {t.benefits.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <p className="mt-4 font-heading text-lg font-bold text-primary">Cost: {t.cost}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.galleryHeading}</SectionTitle>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {HT_COST_IMAGES.gallery.map((img) => (
                <SectionImage key={`${img.src}-${img.caption}`} src={img.src} alt={img.alt} caption={img.caption} />
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.graftTableHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={HT_COST_IMAGES.graftDiagram.src} alt={HT_COST_IMAGES.graftDiagram.alt} />
            </div>
            <WideCostTable
              headers={["Technique", "1000 Grafts", "2000 Grafts", "3000 Grafts", "4000 Grafts"]}
              keys={["technique", "g1000", "g2000", "g3000", "g4000"]}
              rows={HT_GRAFT_COUNT_ROWS}
            />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.calculatorHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={HT_COST_IMAGES.graftDiagram.src} alt="Hair graft calculator planning" />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.calculatorBody}</p>
            <div className="mt-6">
              <Button href={page.calculatorHref} variant="primary">
                {page.calculatorCta}
              </Button>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.norwoodHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={HT_COST_IMAGES.norwoodChart.src} alt={HT_COST_IMAGES.norwoodChart.alt} />
            </div>
            <WideCostTable
              headers={["Grade", "Grafts Needed", "FUE Cost", "DHI Cost", "Robotic Cost"]}
              keys={["grade", "grafts", "fue", "dhi", "robotic"]}
              rows={HT_NORWOOD_ROWS}
            />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.videosHeading}</SectionTitle>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {HT_VIDEO_TOPICS.map((topic, i) => (
                <div key={topic} className="overflow-hidden rounded-2xl border border-surface">
                  {i === 0 ? (
                    <div className="relative aspect-video">
                      <Image src={HT_COST_IMAGES.videoPoster.src} alt={HT_COST_IMAGES.videoPoster.alt} fill className="object-cover" sizes="400px" />
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
            <SectionTitle>{page.hiddenHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={HT_COST_IMAGES.hiddenCharges.src} alt={HT_COST_IMAGES.hiddenCharges.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.hiddenIntro}</p>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">Common Hidden Costs Elsewhere</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {HT_HIDDEN_COSTS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">{page.promiseHeading}</h3>
            <ul className="mt-3 space-y-2">
              {page.promiseItems.map((p) => (
                <li key={p} className="flex gap-2 font-medium text-navy">
                  <span className="text-teal" aria-hidden>
                    ✓
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.emiHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={HT_COST_IMAGES.emi.src} alt={HT_COST_IMAGES.emi.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.emiIntro}</p>
            <ul className="mt-3 list-inside list-disc text-base text-navy/85">
              {HT_EMI_OPTIONS.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.delhiHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={HT_COST_IMAGES.cityComparison.src} alt={HT_COST_IMAGES.cityComparison.alt} />
            </div>
            <DataTable headers={["City", "Average FUE Cost Per Graft"]} keys={["city", "cost"]} rows={HT_CITY_ROWS} />
            <p className="mt-4 text-base text-navy/85">{page.delhiClosing}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyClinicHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={HT_COST_IMAGES.clinic.src} alt={HT_COST_IMAGES.clinic.alt} />
            </div>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">What We Offer</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {HT_CLINIC_OFFERS.map((o) => (
                <li key={o} className="flex gap-2 text-sm text-navy/85">
                  <span className="text-teal" aria-hidden>
                    ✓
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.compareHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={HT_COST_IMAGES.costComparison.src} alt={HT_COST_IMAGES.costComparison.alt} />
            </div>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">Delhi Hair Transplant Cost Comparison</h3>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-surface">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-surface/80 text-navy">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Feature</th>
                    <th className="px-4 py-3 font-semibold">Typical Delhi Clinic</th>
                    <th className="px-4 py-3 font-semibold">Care Well Medical Centre</th>
                  </tr>
                </thead>
                <tbody>
                  {HT_COMPARE_ROWS.map((row) => (
                    <tr key={row.feature} className="border-t border-surface">
                      <td className="px-4 py-3 font-medium text-navy">{row.feature}</td>
                      <td className="px-4 py-3 text-navy/85">{row.typical}</td>
                      <td className="px-4 py-3 text-navy/85">{row.carewell}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.differentHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={HT_COST_IMAGES.trustBanner.src} alt={HT_COST_IMAGES.trustBanner.alt} />
            </div>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {HT_DIFFERENT_ITEMS.map((d) => (
                <li key={d} className="flex gap-2 text-sm font-medium text-navy">
                  <span className="text-teal" aria-hidden>
                    ✓
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.surgeonHeading}</SectionTitle>
            <div className="mt-6 grid gap-8 md:grid-cols-[200px_1fr] md:items-start">
              <Image
                src={HT_COST_IMAGES.doctor.src}
                alt={HT_COST_IMAGES.doctor.alt}
                width={200}
                height={240}
                className="rounded-2xl border border-surface shadow-sm"
              />
              <div>
                <h3 className="font-heading text-2xl font-bold text-navy">Dr. Sandeep Bhasin</h3>
                <ul className="mt-2 list-inside list-disc text-base text-navy/85">
                  <li>Cosmetic Surgeon</li>
                  <li>Hair Restoration Specialist</li>
                  <li>15+ Years Experience</li>
                </ul>
                <p className="mt-4 text-base text-navy/85">
                  Providing personalized hair restoration solutions with a focus on:
                </p>
                <ul className="mt-2 list-inside list-disc text-base text-navy/85">
                  {HT_SURGEON_POINTS.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.reviewsHeading}</SectionTitle>
            <p className="mt-2 text-sm text-navy/70">Verified Google Reviews from Hair Transplant Patients</p>
            <div className="mt-8">
              <HairTransplantReviews />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.visitHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={HT_COST_IMAGES.clinic.src} alt="Clinic exterior and location" caption="Care Well Medical Centre, CR Park" />
            </div>
            <div className="mt-6 space-y-2 text-base text-navy/85">
              <p className="font-semibold text-navy">{HT_COST_CLINIC.name}</p>
              <p>
                House No. 1, NRI Complex, Chittaranjan Park (C.R. Park)
                <br />
                NRI Colony, Mandakini Enclave Colony, Alaknanda
                <br />
                New Delhi – 110019
              </p>
              <p>
                <a href={`tel:${HT_COST_CLINIC.phone.replace(/\s/g, "")}`} className="text-primary underline">
                  {HT_COST_CLINIC.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${HT_COST_CLINIC.email}`} className="text-primary underline">
                  {HT_COST_CLINIC.email}
                </a>
              </p>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-primary/5 p-6 md:p-8">
              <SectionTitle>{page.ctaHeading}</SectionTitle>
              <div className="mt-6">
                <SectionImage src={HT_COST_IMAGES.ctaBanner.src} alt={HT_COST_IMAGES.ctaBanner.alt} aspect="wide" />
              </div>
              <p className="mt-4 text-base text-navy/85">{page.ctaBody}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/book-consultation" variant="primary">
                  Book Consultation
                </Button>
                <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center rounded-button bg-navy px-6 py-3 text-sm font-semibold text-white">
                  Call Now: {displayPhone}
                </a>
                {wa && (
                  <a href={wa} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-button bg-[#25D366] px-6 py-3 text-sm font-semibold text-white">
                    WhatsApp Consultation
                  </a>
                )}
              </div>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.faqHeading}</SectionTitle>
            <div className="mt-8">
              <ServiceFaq items={HT_COST_FAQS} />
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
                <LeadForm defaultTreatment={treatment} source="ht-cost-sidebar" />
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
