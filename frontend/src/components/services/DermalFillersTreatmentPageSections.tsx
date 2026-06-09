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
  DERMAL_FILLERS_CLINIC,
  DERMAL_FILLERS_COST_ROWS,
  DERMAL_FILLERS_FAQS,
  DERMAL_FILLERS_IMAGES,
  DERMAL_FILLERS_PAGE,
  DERMAL_FILLERS_PATH,
  DERMAL_FILLERS_TREATMENT_AREAS,
} from "@/data/dermal-fillers-treatment-in-delhi";
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

function CtaRow({ phone, label }: { phone: string; label?: string }) {
  const tel = phone.replace(/\s/g, "");
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Button href="/book-consultation" variant="primary">{label ?? "Book Your Appointment Now"}</Button>
      <a href={`tel:${tel}`} className="inline-flex min-h-11 items-center rounded-button border border-navy/20 px-6 py-3 text-sm font-semibold text-navy">
        Call {phone}
      </a>
    </div>
  );
}

export function DermalFillersTreatmentPageSections({
  phone,
  whatsapp,
  mapEmbedUrl,
}: {
  phone?: string;
  whatsapp?: string;
  mapEmbedUrl?: string | null;
}) {
  const page = DERMAL_FILLERS_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? DERMAL_FILLERS_CLINIC.phone;
  const wa = whatsapp ? whatsappHref(whatsapp, "Hi, I'm interested in dermal fillers in Delhi.") : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: DERMAL_FILLERS_FAQS.map((f) => ({
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
    url: `${getSiteUrl()}${DERMAL_FILLERS_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.parentLabel, path: page.parentPath },
          { name: "Dermal Fillers", path: DERMAL_FILLERS_PATH },
        ]}
      />

      <section className="relative min-h-[52svh] overflow-hidden bg-navy md:min-h-[58vh]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/images/service-hero-theatre-bg.png)" }} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/70" />
        <div className="relative mx-auto grid min-h-[52svh] max-w-7xl items-center gap-8 px-4 py-12 md:min-h-[58vh] md:grid-cols-[1fr_312px] md:px-6 md:py-16">
          <div className="min-w-0">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: page.parentLabel, href: page.parentPath }, { label: "Dermal Fillers" }]} />
            <p className="mt-5 text-sm font-medium uppercase tracking-wide text-white/75">{page.subtitle}</p>
            <h1 className="font-heading mt-2 text-[28px] font-bold leading-[1.12] text-white sm:text-[36px] md:text-[40px]">{page.h1}</h1>
            <p className="mt-4 max-w-xl text-base text-white/90">{page.tagline}</p>
            <div className="mt-6">
              <Image src={DERMAL_FILLERS_IMAGES.hero.src} alt={DERMAL_FILLERS_IMAGES.hero.alt} width={170} height={170} className="rounded-2xl border-2 border-white/20 object-cover shadow-lg" priority />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/book-consultation" variant="secondary">Book Your Appointment Now</Button>
              {wa && (
                <a href={wa} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-button bg-[#25D366] px-6 py-3 text-base font-semibold text-white">WhatsApp</a>
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
            <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">{page.introHeading}</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-navy/85">
              {page.introParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whatIsHeading}</SectionTitle>
            <div className="mt-6"><SectionImage src={DERMAL_FILLERS_IMAGES.whatIs.src} alt={DERMAL_FILLERS_IMAGES.whatIs.alt} /></div>
            <div className="mt-6 space-y-4 text-base text-navy/85">
              {page.whatIsParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">{page.treatmentAreasHeading}</h3>
            <ul className="mt-4 space-y-3">
              {DERMAL_FILLERS_TREATMENT_AREAS.map((area) => (
                <li key={area.title} className="rounded-xl border border-surface bg-white p-4">
                  <p className="font-semibold text-navy">
                    {"href" in area && area.href ? (
                      <Link href={area.href} className="text-primary hover:underline">{area.title}</Link>
                    ) : (
                      area.title
                    )}
                  </p>
                  <p className="mt-1 text-sm text-navy/85">{area.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.benefitsHeading}</SectionTitle>
            <CheckList items={page.benefits} variant="do" />
            <p className="mt-4 text-sm text-navy/80">
              {page.prpNote}{" "}
              <Link href="/hair-loss-treatment-in-delhi/prp" className="font-semibold text-primary hover:underline">
                PRP therapy
              </Link>
              .
            </p>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.risksHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.risksIntro}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">Common Side Effects</h3>
            <CheckList items={page.commonSideEffects} variant="dont" />
            <h3 className="mt-6 font-heading text-base font-bold text-navy">Rare But Serious Risks</h3>
            <CheckList items={page.rareRisks} variant="dont" />
            <p className="mt-4 text-sm text-navy/80">Dr. Sandeep Bhasin performs all procedures with maximum safety and precision.</p>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.candidateHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.candidateIntro}</p>
            <CheckList items={page.candidateItems} variant="do" />
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.procedureHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.procedureIntro}</p>
            <ol className="mt-6 space-y-3">
              {page.procedureSteps.map((step, i) => (
                <li key={step.slice(0, 32)} className="flex gap-3 text-base text-navy/85">
                  <span className="font-bold text-teal">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm font-medium text-navy">{page.procedureNote}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.resultsHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.resultsIntro}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {DERMAL_FILLERS_IMAGES.beforeAfter.map((img) => (
                <SectionImage key={img.caption} src={img.src} alt={img.alt} caption={img.caption} />
              ))}
            </div>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.juvedermHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.juvedermIntro}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">Juvederm Types & Uses</h3>
            <CheckList items={page.juvedermTypes} variant="do" />
            <h3 className="mt-6 font-heading text-base font-bold text-navy">How Other Fillers Compare</h3>
            <CheckList items={page.otherFillers} variant="do" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.underEyeHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.underEyeIntro}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">Best Fillers for Under-Eyes</h3>
            <CheckList items={page.underEyeFillers} variant="do" />
            <h3 className="mt-6 font-heading text-base font-bold text-navy">Benefits of Under-Eye Fillers</h3>
            <CheckList items={page.underEyeBenefits} variant="do" />
            <p className="mt-4 rounded-xl border border-teal/20 bg-teal/5 p-4 text-sm text-navy/85">
              <strong>Cost:</strong> {page.underEyeCost}
            </p>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.permanentHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.permanentWarning}</p>
            <CheckList items={page.permanentRisks} variant="dont" />
            <h3 className="mt-6 font-heading text-base font-bold text-navy">Safer Alternatives to Permanent Fillers</h3>
            <CheckList items={page.saferAlternatives} variant="do" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.longevityHeading}</SectionTitle>
            <CheckList items={page.longevityPoints} variant="do" />
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyBestHeading}</SectionTitle>
            <CheckList items={page.whyBestItems} variant="do" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyChooseHeading}</SectionTitle>
            <CheckList items={page.whyChooseItems} variant="do" />
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.aftercareHeading}</SectionTitle>
            <CheckList items={page.aftercare} variant="do" />
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.costHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.costIntro}</p>
            <DataTable
              headers={["Treatment Area", "Price Range"]}
              keys={["area", "range"]}
              rows={DERMAL_FILLERS_COST_ROWS.map((r) => ({ area: r.area, range: r.range }))}
            />
            <p className="mt-4 text-sm text-navy/80">{page.bioFillersNote}</p>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-primary/5 p-6 md:p-8">
              <SectionTitle>{page.consultationHeading}</SectionTitle>
              <p className="mt-4 text-base text-navy/85">{page.consultationBody}</p>
              <CtaRow phone={displayPhone} />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>Fillers Treatment Video</SectionTitle>
            <div className="mt-6 overflow-hidden rounded-2xl border border-surface">
              <div className="relative aspect-video">
                <Image src={DERMAL_FILLERS_IMAGES.videoPoster.src} alt={DERMAL_FILLERS_IMAGES.videoPoster.alt} fill className="object-cover" sizes="720px" />
              </div>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.doctorHeading}</SectionTitle>
            <div className="mt-6 grid gap-6 md:grid-cols-[200px_1fr]">
              <SectionImage src={DERMAL_FILLERS_IMAGES.doctor.src} alt={DERMAL_FILLERS_IMAGES.doctor.alt} aspect="square" />
              <div>
                <p className="text-base leading-relaxed text-navy/85">{page.doctorBio}</p>
                <Link href="/about/dr-bhasin" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
                  View full doctor profile →
                </Link>
              </div>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>What Our Patients Say</SectionTitle>
            <div className="mt-6"><HairTransplantReviews /></div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>Visit Care Well Medical Centre – South Delhi</SectionTitle>
            <div className="mt-6"><MapEmbed embedSrc={mapEmbedUrl} title="Care Well Medical Centre on Google Maps" /></div>
            <div className="mt-6 space-y-2 text-base text-navy/85">
              <p className="font-semibold text-navy">{DERMAL_FILLERS_CLINIC.name}</p>
              <p>{DERMAL_FILLERS_CLINIC.address}</p>
              <p>
                <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="text-primary underline">{displayPhone}</a>
              </p>
              <p>
                <a href={`mailto:${DERMAL_FILLERS_CLINIC.email}`} className="text-primary underline">{DERMAL_FILLERS_CLINIC.email}</a>
              </p>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.faqHeading}</SectionTitle>
            <div className="mt-8"><ServiceFaq items={DERMAL_FILLERS_FAQS} /></div>
            <p className="mt-6 text-sm text-navy/80">
              Compare with{" "}
              <Link href="/cosmetic-treatments-in-delhi/botox" className="font-semibold text-primary hover:underline">
                Botox treatment in Delhi
              </Link>{" "}
              for dynamic wrinkles.
            </p>
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
                <LeadForm defaultTreatment={treatment} source="dermal-fillers-sidebar" />
              </Suspense>
              <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="block w-full rounded-xl bg-navy py-3 text-center text-sm font-semibold text-white">Call clinic</a>
              {wa && (
                <a href={wa} className="block w-full rounded-xl border-2 border-teal py-3 text-center text-sm font-semibold text-teal">WhatsApp</a>
              )}
            </ServiceSidebarReveal>
          </div>
        </aside>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex gap-2 border-t border-surface bg-white px-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 lg:hidden">
        <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="flex flex-1 justify-center rounded-xl bg-navy py-3 text-[13px] font-semibold text-white">Call</a>
        <Link href="/book-consultation" className="flex flex-1 justify-center rounded-xl bg-primary py-3 text-[13px] font-semibold text-white">Book Now</Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(procLd) }} />
    </div>
  );
}
