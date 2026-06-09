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
  RHINOPLASTY_CLINIC,
  RHINOPLASTY_COST_ROWS,
  RHINOPLASTY_FAQS,
  RHINOPLASTY_IMAGES,
  RHINOPLASTY_INITIAL_TYPES,
  RHINOPLASTY_PAGE,
  RHINOPLASTY_PATH,
  RHINOPLASTY_TYPES,
  type RhinoplastyType,
} from "@/data/rhinoplasty-in-delhi";
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

function TypeCard({ item }: { item: RhinoplastyType }) {
  return (
    <article className="rounded-xl border border-surface bg-white p-5">
      <h3 className="font-heading text-lg font-bold text-navy">{item.title}</h3>
      <p className="mt-2 text-sm text-navy/85">{item.body}</p>
      {item.href && item.linkLabel && (
        <Link href={item.href} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          {item.linkLabel}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </article>
  );
}

export function RhinoplastyTreatmentPageSections({
  phone,
  whatsapp,
  mapEmbedUrl,
}: {
  phone?: string;
  whatsapp?: string;
  mapEmbedUrl?: string | null;
}) {
  const page = RHINOPLASTY_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? RHINOPLASTY_CLINIC.phone;
  const wa = whatsapp ? whatsappHref(whatsapp, "Hi, I'm interested in rhinoplasty in Delhi.") : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: RHINOPLASTY_FAQS.map((f) => ({
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
    url: `${getSiteUrl()}${RHINOPLASTY_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.parentLabel, path: page.parentPath },
          { name: "Rhinoplasty", path: RHINOPLASTY_PATH },
        ]}
      />

      <section className="relative min-h-[52svh] overflow-hidden bg-navy md:min-h-[58vh]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/images/service-hero-theatre-bg.png)" }} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/70" />
        <div className="relative mx-auto grid min-h-[52svh] max-w-7xl items-center gap-8 px-4 py-12 md:min-h-[58vh] md:grid-cols-[1fr_312px] md:px-6 md:py-16">
          <div className="min-w-0">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: page.parentLabel, href: page.parentPath },
                { label: "Rhinoplasty" },
              ]}
            />
            <p className="mt-5 text-sm font-medium uppercase tracking-wide text-white/75">{page.subtitle}</p>
            <h1 className="font-heading mt-2 text-[26px] font-bold leading-[1.12] text-white sm:text-[32px] md:text-[36px]">{page.h1}</h1>
            <p className="mt-4 max-w-xl text-base text-white/90">{page.tagline}</p>
            <div className="mt-6">
              <Image src={RHINOPLASTY_IMAGES.hero.src} alt={RHINOPLASTY_IMAGES.hero.alt} width={170} height={170} className="rounded-2xl border-2 border-white/20 object-cover shadow-lg" priority />
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
            <div className="space-y-4 text-base leading-relaxed text-navy/85">
              {page.introParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyChooseHeading}</SectionTitle>
            <div className="mt-4 space-y-4 text-base text-navy/85">
              {page.whyChooseParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <p className="mt-4 text-sm text-navy/85">{page.whyChooseTypesIntro}</p>
            <CheckList items={RHINOPLASTY_INITIAL_TYPES} variant="do" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.surgeonHeading}</SectionTitle>
            <div className="mt-6 grid gap-6 md:grid-cols-[200px_1fr]">
              <SectionImage src={RHINOPLASTY_IMAGES.doctor.src} alt={RHINOPLASTY_IMAGES.doctor.alt} aspect="square" />
              <div>
                <CheckList items={page.surgeonPoints} variant="do" />
                <p className="mt-4 text-sm text-navy/80">{page.surgeonClosing}</p>
                <Link href="/about/dr-bhasin" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
                  View full doctor profile →
                </Link>
              </div>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.candidateHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.candidateIntro}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.candidateSubheading}</h3>
            <CheckList items={page.candidateItems} variant="do" />
            <p className="mt-4 text-sm text-navy/80">{page.candidateClosing}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.problemsHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.problemsIntro}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.aestheticHeading}</h3>
            <p className="mt-2 text-sm text-navy/85">{page.aestheticBody}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.functionalHeading}</h3>
            <p className="mt-2 text-sm text-navy/85">{page.functionalBody}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.traumaHeading}</h3>
            <p className="mt-2 text-sm text-navy/85">{page.traumaBody}</p>
            <CtaRow phone={displayPhone} label="Call Now" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.typesHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.typesIntro}</p>
            <div className="mt-8 space-y-4">
              {RHINOPLASTY_TYPES.map((item) => (
                <TypeCard key={item.title} item={item} />
              ))}
            </div>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.processHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.processIntro}</p>
            <div className="mt-6"><SectionImage src={RHINOPLASTY_IMAGES.procedure.src} alt={RHINOPLASTY_IMAGES.procedure.alt} aspect="wide" /></div>
            <div className="mt-8 space-y-6">
              {page.processSteps.map((step) => (
                <div key={step.title}>
                  <h3 className="font-heading text-lg font-bold text-navy">{step.title}</h3>
                  <p className="mt-2 text-base text-navy/85">{step.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.recoveryHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.recoveryIntro}</p>
            <div className="mt-6"><SectionImage src={RHINOPLASTY_IMAGES.recovery.src} alt={RHINOPLASTY_IMAGES.recovery.alt} /></div>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.recoveryTimelineHeading}</h3>
            <CheckList items={page.recoveryTimeline} variant="do" />
            <p className="mt-3 text-sm text-navy/80">{page.recoveryTimelineClosing}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.afterCareHeading}</h3>
            <CheckList items={page.afterCareItems} variant="do" />
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.finalResultsHeading}</h3>
            <p className="mt-2 text-sm text-navy/85">{page.finalResultsBody}</p>
            <CtaRow phone={displayPhone} label="Call Now" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.resultsHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.resultsIntro}</p>
            <CheckList items={page.resultsPoints} variant="do" />
            <p className="mt-3 text-sm text-navy/80">{page.resultsClosing}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {RHINOPLASTY_IMAGES.beforeAfter.map((img) => (
                <SectionImage key={img.caption} src={img.src} alt={img.alt} caption={img.caption} />
              ))}
            </div>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.costHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.costIntro}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.costTableHeading}</h3>
            <DataTable headers={["Procedure Type", "Approx. Cost Range (INR)"]} keys={["procedure", "cost"]} rows={[...RHINOPLASTY_COST_ROWS]} />
            <p className="mt-4 text-sm text-navy/80">{page.costTableNote}</p>
            <p className="mt-4 text-sm text-navy/85">{page.costVsCities}</p>
            <p className="mt-3 text-sm text-navy/85">{page.costAiims}</p>
            <p className="mt-3 text-sm text-navy/85">{page.costNonSurgical}</p>
            <p className="mt-3 text-sm text-navy/80">{page.costClosing}</p>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyClinicHeading}</SectionTitle>
            <h3 className="mt-4 font-heading text-base font-bold text-navy">{page.whyClinicSurgeonHeading}</h3>
            <CheckList items={page.whyClinicItems} variant="do" />
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.hospitalHeading}</h3>
            <CheckList items={page.hospitalItems} variant="do" />
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.locationHeading}</h3>
            <CheckList items={page.locationItems} variant="do" />
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.doctorProfileHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.doctorProfileBody}</p>
            <CheckList items={page.doctorProfileItems} variant="do" />
          </section>

          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-primary/5 p-6 md:p-8">
              <SectionTitle>{page.consultationHeading}</SectionTitle>
              <p className="mt-4 text-base text-navy/85">{page.consultationBody}</p>
              <CtaRow phone={displayPhone} />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.testimonialsHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.testimonialsIntro}</p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-surface">
              <div className="relative aspect-video">
                <Image src={RHINOPLASTY_IMAGES.videoPoster.src} alt={RHINOPLASTY_IMAGES.videoPoster.alt} fill className="object-cover" sizes="720px" />
              </div>
            </div>
            <div className="mt-8"><HairTransplantReviews /></div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.directionsHeading}</SectionTitle>
            <p className="mt-3 text-sm font-semibold text-navy">{page.directionsAddress}</p>
            <h3 className="mt-4 text-sm font-bold text-navy">Nearby Landmarks:</h3>
            <CheckList items={page.landmarks} variant="do" />
            <h3 className="mt-4 text-sm font-bold text-navy">Travel Options:</h3>
            <CheckList items={page.travelOptions} variant="do" />
            <p className="mt-3 text-sm text-navy/80">{page.directionsClosing}</p>
            <p className="mt-2 text-sm text-navy/80">
              {page.directionsNote}{" "}
              <Link href={page.parentPath} className="font-semibold text-primary hover:underline">
                Plastic surgery in Delhi
              </Link>.
            </p>
            <div className="mt-6"><MapEmbed embedSrc={mapEmbedUrl} title="Care Well Medical Centre on Google Maps" /></div>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.faqHeading}</SectionTitle>
            <div className="mt-8"><ServiceFaq items={RHINOPLASTY_FAQS} /></div>
          </section>

          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
              <SectionTitle>{page.bookConsultHeading}</SectionTitle>
              <p className="mt-4 text-base text-navy/85">{page.bookConsultBody}</p>
              <p className="mt-3 text-sm font-medium text-navy/85">{page.bookConsultGoal}</p>
              <CheckList items={page.bookConsultOptions} variant="do" />
              <p className="mt-3 text-sm text-navy/80">{page.bookConsultClosing}</p>
              <CtaRow phone={displayPhone} />
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
                <LeadForm defaultTreatment={treatment} source="rhinoplasty-sidebar" />
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
