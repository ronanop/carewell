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
  BOTOX_CLINIC,
  BOTOX_COMPARISON_ROWS,
  BOTOX_COST_ROWS,
  BOTOX_FAQS,
  BOTOX_IMAGES,
  BOTOX_OVERVIEW_ROWS,
  BOTOX_PAGE,
  BOTOX_TREATMENT_PATH,
} from "@/data/botox-treatment-in-delhi";
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

function CtaRow({ phone, label }: { phone: string; label?: string }) {
  const tel = phone.replace(/\s/g, "");
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Button href="/book-consultation" variant="primary">
        {label ?? "Book Your Appointment Now"}
      </Button>
      <a
        href={`tel:${tel}`}
        className="inline-flex min-h-11 items-center rounded-button border border-navy/20 px-6 py-3 text-sm font-semibold text-navy"
      >
        Call {phone}
      </a>
    </div>
  );
}

export function BotoxTreatmentPageSections({
  phone,
  whatsapp,
  mapEmbedUrl,
}: {
  phone?: string;
  whatsapp?: string;
  mapEmbedUrl?: string | null;
}) {
  const page = BOTOX_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? BOTOX_CLINIC.phone;
  const wa = whatsapp
    ? whatsappHref(whatsapp, "Hi, I'm interested in Botox treatment in Delhi.")
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BOTOX_FAQS.map((f) => ({
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
    url: `${getSiteUrl()}${BOTOX_TREATMENT_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.parentLabel, path: page.parentPath },
          { name: "Botox", path: BOTOX_TREATMENT_PATH },
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
                { label: "Botox" },
              ]}
            />
            <p className="mt-5 text-sm font-medium uppercase tracking-wide text-white/75">{page.subtitle}</p>
            <h1 className="font-heading mt-2 text-[30px] font-bold leading-[1.1] text-white sm:text-[38px] md:text-[42px]">
              {page.h1}
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/90">{page.tagline}</p>
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <Image
                src={BOTOX_IMAGES.hero.src}
                alt={BOTOX_IMAGES.hero.alt}
                width={170}
                height={170}
                className="rounded-2xl border-2 border-white/20 object-cover shadow-lg"
                priority
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/book-consultation" variant="secondary">
                Book Your Appointment Now
              </Button>
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
            <div className="space-y-4 text-base leading-relaxed text-navy/85">
              {page.introParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <h2 className="font-heading mt-10 text-xl font-bold text-navy md:text-2xl">{page.overviewHeading}</h2>
            <DataTable
              headers={["Feature", "Details"]}
              keys={["feature", "details"]}
              rows={BOTOX_OVERVIEW_ROWS.map((r) => ({ feature: r.feature, details: r.details }))}
            />
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whatIsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={BOTOX_IMAGES.whatIs.src} alt={BOTOX_IMAGES.whatIs.alt} />
            </div>
            <div className="mt-6 space-y-4 text-base text-navy/85">
              {page.whatIsParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <p className="mt-4 text-sm font-medium text-primary">{page.whatIsCta}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.howWorksHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={BOTOX_IMAGES.procedure.src} alt={BOTOX_IMAGES.procedure.alt} />
            </div>
            <div className="mt-6 space-y-4 text-base text-navy/85">
              {page.howWorksParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">{page.benefitsHeading}</h3>
            <CheckList items={page.benefits} variant="do" />
            <div className="mt-6">
              <SectionImage src={BOTOX_IMAGES.benefits.src} alt={BOTOX_IMAGES.benefits.alt} />
            </div>
            <p className="mt-4 text-sm font-medium text-primary">{page.howWorksCta}</p>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.candidateHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.candidateIntro}</p>
            <CheckList items={page.candidateItems} variant="do" />
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">{page.avoidHeading}</h3>
            <CheckList items={page.avoidItems} variant="dont" />
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.areasHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.areasIntro}</p>
            <ol className="mt-6 space-y-4">
              {page.bodyAreas.map((area) => (
                <li key={area.title} className="rounded-xl border border-surface bg-white p-4">
                  <p className="font-semibold text-navy">{area.title}</p>
                  <p className="mt-1 text-sm text-navy/85">{area.body}</p>
                </li>
              ))}
            </ol>
            <CheckList items={page.areasPoints} variant="do" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.effectiveHeading}</SectionTitle>
            <div className="mt-6 space-y-4 text-base text-navy/85">
              {page.effectiveParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.injectionHeading}</SectionTitle>
            <div className="mt-6 space-y-4 text-base text-navy/85">
              {page.injectionParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <CheckList items={page.injectionSteps} variant="do" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.antiWrinkleHeading}</SectionTitle>
            <ol className="mt-6 space-y-4">
              {page.antiWrinkleBenefits.map((b, i) => (
                <li key={b.title} className="flex gap-3 text-base text-navy/85">
                  <span className="font-bold text-teal">{i + 1}.</span>
                  <span>
                    <strong className="text-navy">{b.title}:</strong> {b.body}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.comparisonHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.comparisonIntro}</p>
            <div className="mt-6">
              <SectionImage src={BOTOX_IMAGES.comparison.src} alt={BOTOX_IMAGES.comparison.alt} aspect="wide" />
            </div>
            <DataTable
              headers={["Feature", "Botox", "Dermal Fillers", "Thread Lift"]}
              keys={["feature", "botox", "fillers", "threads"]}
              rows={BOTOX_COMPARISON_ROWS.map((r) => ({
                feature: r.feature,
                botox: r.botox,
                fillers: r.fillers,
                threads: r.threads,
              }))}
            />
            <ul className="mt-4 space-y-2 text-sm text-navy/85">
              {page.comparisonTips.map((tip) => (
                <li key={tip}>• {tip}</li>
              ))}
            </ul>
            <p className="mt-4 rounded-xl border border-teal/20 bg-teal/5 p-4 text-sm text-navy/85">
              <strong>Pro tip:</strong> {page.comparisonProTip}
            </p>
            <CtaRow phone={displayPhone} label="Book Your Consultation" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.medicalUsesHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.medicalUsesIntro}</p>
            <ul className="mt-6 space-y-4">
              {page.medicalUses.map((use) => (
                <li key={use.title} className="rounded-xl border border-surface bg-white p-4">
                  <p className="font-semibold text-navy">✅ {use.title}</p>
                  <p className="mt-1 text-sm text-navy/85">{use.body}</p>
                </li>
              ))}
            </ul>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.risksHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.risksIntro}</p>
            <CheckList items={page.risks} variant="dont" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.overdoseHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.overdoseIntro}</p>
            <CheckList items={page.overdosePrecautions} variant="do" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.avoidInjectionHeading}</SectionTitle>
            <CheckList items={page.avoidInjectionItems} variant="dont" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.beforeHeading}</SectionTitle>
            <CheckList items={page.beforePrecautions} variant="do" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyChooseHeading}</SectionTitle>
            <div className="mt-6 space-y-4 text-base text-navy/85">
              {page.whyChooseParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.costHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.costIntro}</p>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-surface">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-surface/80 text-navy">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Treatment Area</th>
                    <th className="px-4 py-3 font-semibold">Price Range (Rs.)</th>
                  </tr>
                </thead>
                <tbody>
                  {BOTOX_COST_ROWS.map((row) => (
                    <tr key={row.area} className="border-t border-surface">
                      <td className="px-4 py-3 text-navy/85">
                        {row.href ? (
                          <Link href={row.href} className="font-medium text-primary hover:underline">
                            {row.area}
                          </Link>
                        ) : (
                          row.area
                        )}
                      </td>
                      <td className="px-4 py-3 text-navy/85">{row.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.resultsHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.resultsIntro}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {BOTOX_IMAGES.beforeAfter.map((img) => (
                <SectionImage key={img.caption} src={img.src} alt={img.alt} caption={img.caption} />
              ))}
            </div>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>About Dr. Sandeep Bhasin – Your Botox Expert in Delhi</SectionTitle>
            <div className="mt-6 grid gap-6 md:grid-cols-[200px_1fr]">
              <SectionImage src={BOTOX_IMAGES.doctor.src} alt={BOTOX_IMAGES.doctor.alt} aspect="square" />
              <div>
                <p className="text-base leading-relaxed text-navy/85">{page.doctorBio}</p>
                <ul className="mt-4 space-y-2 text-sm text-navy/85">
                  {page.doctorCredentials.map((c) => (
                    <li key={c}>🏆 {c}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-navy/80">✔️ Google Rating: ★4.4 | South Delhi&apos;s Trusted Clinic</p>
                <Link href="/about/dr-bhasin" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
                  View full doctor profile →
                </Link>
              </div>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>What Our Patients Say</SectionTitle>
            <div className="mt-6">
              <HairTransplantReviews />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.locationHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.locationIntro}</p>
            <div className="mt-6">
              <MapEmbed embedSrc={mapEmbedUrl} title="Care Well Medical Centre on Google Maps" />
            </div>
            <div className="mt-6 space-y-2 text-base text-navy/85">
              <p className="font-semibold text-navy">{BOTOX_CLINIC.name}</p>
              <p>{BOTOX_CLINIC.address}</p>
              <p>
                <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="text-primary underline">
                  {displayPhone}
                </a>
              </p>
            </div>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.contactHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.contactBody}</p>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.faqHeading}</SectionTitle>
            <div className="mt-8">
              <ServiceFaq items={BOTOX_FAQS} />
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
                <LeadForm defaultTreatment={treatment} source="botox-sidebar" />
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
