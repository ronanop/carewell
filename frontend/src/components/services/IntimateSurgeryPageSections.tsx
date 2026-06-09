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
  INTIMATE_SURGERY_ADDITIONAL,
  INTIMATE_SURGERY_CLINIC,
  INTIMATE_SURGERY_COST_ROWS,
  INTIMATE_SURGERY_FAQS,
  INTIMATE_SURGERY_IMAGES,
  INTIMATE_SURGERY_MAIN_PROCEDURES,
  INTIMATE_SURGERY_NON_SURGICAL,
  INTIMATE_SURGERY_PAGE,
  INTIMATE_SURGERY_PATH,
  type IntimateProcedure,
} from "@/data/intimate-surgery-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { whatsappHref } from "@carewell/backend/lib/whatsapp";

const HairTransplantReviews = dynamic(
  () => import("@/components/services/HairTransplantReviews").then((m) => m.HairTransplantReviews),
  { loading: () => <div className="h-64 animate-pulse rounded-2xl bg-surface" aria-hidden /> },
);

function SectionImage({
  src,
  alt,
  aspect = "video",
}: {
  src: string;
  alt: string;
  aspect?: "video" | "square" | "wide";
}) {
  const aspectClass =
    aspect === "square" ? "aspect-square" : aspect === "wide" ? "aspect-[21/9]" : "aspect-video";
  return (
    <figure className="overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
      <div className={`relative w-full ${aspectClass} bg-surface`}>
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 720px" className="object-cover" />
      </div>
    </figure>
  );
}

function CtaRow({ phone, label }: { phone: string; label?: string }) {
  const tel = phone.replace(/\s/g, "");
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Button href="/book-consultation" variant="primary">{label ?? "Book Private Consultation"}</Button>
      <a href={`tel:${tel}`} className="inline-flex min-h-11 items-center rounded-button border border-navy/20 px-6 py-3 text-sm font-semibold text-navy">
        Call {phone}
      </a>
    </div>
  );
}

function ProcedureCard({ item }: { item: IntimateProcedure }) {
  return (
    <article className="rounded-xl border border-surface bg-white p-5 md:p-6">
      <h3 className="font-heading text-lg font-bold text-navy">{item.title}</h3>
      <p className="mt-2 text-sm text-navy/85">{item.body}</p>
      <p className="mt-3 text-sm text-navy/85">
        <strong>Purpose:</strong> {item.purpose}
      </p>
      <CheckList items={item.benefits} variant="do" />
      <p className="mt-3 text-sm text-navy/85">
        <strong>Estimated cost:</strong> {item.cost} · <strong>Recovery:</strong> {item.recovery}
      </p>
      {item.closing && <p className="mt-2 text-sm text-navy/80">{item.closing}</p>}
      {item.href && item.linkLabel && (
        <Link href={item.href} className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
          {item.linkLabel} →
        </Link>
      )}
    </article>
  );
}

export function IntimateSurgeryPageSections({
  phone,
  whatsapp,
  mapEmbedUrl,
}: {
  phone?: string;
  whatsapp?: string;
  mapEmbedUrl?: string | null;
}) {
  const page = INTIMATE_SURGERY_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? INTIMATE_SURGERY_CLINIC.phone;
  const wa = whatsapp
    ? whatsappHref(whatsapp, "Hi, I'd like a confidential consultation about intimate surgery in Delhi.")
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: INTIMATE_SURGERY_FAQS.map((f) => ({
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
    url: `${getSiteUrl()}${INTIMATE_SURGERY_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Intimate Surgery in Delhi", path: INTIMATE_SURGERY_PATH },
        ]}
      />

      <section className="relative min-h-[52svh] overflow-hidden bg-navy md:min-h-[58vh]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/images/service-hero-theatre-bg.png)" }} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/70" />
        <div className="relative mx-auto grid min-h-[52svh] max-w-7xl items-center gap-8 px-4 py-12 md:min-h-[58vh] md:grid-cols-[1fr_312px] md:px-6 md:py-16">
          <div className="min-w-0">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Intimate Surgery in Delhi" }]} />
            <p className="mt-5 text-sm font-medium uppercase tracking-wide text-white/75">{page.subtitle}</p>
            <h1 className="font-heading mt-2 text-[26px] font-bold leading-[1.12] text-white sm:text-[32px] md:text-[36px]">{page.h1}</h1>
            <p className="mt-4 max-w-xl text-base text-white/90">{page.tagline}</p>
            <div className="mt-6">
              <Image src={INTIMATE_SURGERY_IMAGES.hero.src} alt={INTIMATE_SURGERY_IMAGES.hero.alt} width={170} height={170} className="rounded-2xl border-2 border-white/20 object-cover shadow-lg" priority />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/book-consultation" variant="secondary">Book Private Consultation</Button>
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
            <CtaRow phone={displayPhone} label="Book a Private Consultation Today" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whatIsHeading}</SectionTitle>
            <div className="mt-6"><SectionImage src={INTIMATE_SURGERY_IMAGES.whatIs.src} alt={INTIMATE_SURGERY_IMAGES.whatIs.alt} aspect="wide" /></div>
            <p className="mt-4 text-base text-navy/85">{page.whatIsBody}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.benefitsHeading}</h3>
            <CheckList items={page.benefits} variant="do" />
            <p className="mt-4 text-sm text-navy/80">{page.whatIsClosing}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.proceduresHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.proceduresIntro}</p>
            <div className="mt-8 space-y-6">
              {INTIMATE_SURGERY_MAIN_PROCEDURES.map((item) => (
                <ProcedureCard key={item.title} item={item} />
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.additionalHeading}</SectionTitle>
            <div className="mt-6 space-y-4">
              {INTIMATE_SURGERY_ADDITIONAL.map((item) => (
                <article key={item.title} className="rounded-xl border border-surface bg-white p-5">
                  <h3 className="font-heading text-base font-bold text-navy">{item.title}</h3>
                  <CheckList items={item.bullets} variant="do" />
                </article>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.nonSurgicalHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.nonSurgicalIntro}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {INTIMATE_SURGERY_NON_SURGICAL.map((item) => (
                <div key={item.title} className="rounded-xl border border-surface bg-white p-5">
                  <h3 className="font-heading text-sm font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-navy/85">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-navy/80">{page.nonSurgicalClosing}</p>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.costHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.costIntro}</p>
            <DataTable headers={["Procedure", "Estimated Cost (INR)"]} keys={["procedure", "cost"]} rows={[...INTIMATE_SURGERY_COST_ROWS]} />
            <p className="mt-4 text-sm text-navy/80">{page.costClosing}</p>
            <CtaRow phone={displayPhone} label="Call Now" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyChooseHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.whyChooseIntro}</p>
            <div className="mt-6 grid gap-6 md:grid-cols-[200px_1fr]">
              <SectionImage src={INTIMATE_SURGERY_IMAGES.doctor.src} alt={INTIMATE_SURGERY_IMAGES.doctor.alt} aspect="square" />
              <div>
                <CheckList items={page.whyChooseItems} variant="do" />
                <Link href="/about/dr-bhasin" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
                  View Dr. Sandeep Bhasin&apos;s profile →
                </Link>
              </div>
            </div>
            <CtaRow phone={displayPhone} label="Call Now" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.reviewsHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.reviewsIntro}</p>
            <div className="mt-6"><HairTransplantReviews /></div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.directionsHeading}</SectionTitle>
            <div className="mt-4 space-y-3 text-base text-navy/85">
              <p className="font-semibold text-navy">{INTIMATE_SURGERY_CLINIC.name}</p>
              <p>{page.directionsAddress}</p>
              <p>
                <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="text-primary underline">{displayPhone}</a>
              </p>
              <p className="text-sm text-navy/80">Timings: {page.directionsTimings}</p>
            </div>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">Nearest Metro Stations</h3>
            <CheckList items={page.metroStations} variant="do" />
            <p className="mt-2 text-sm text-navy/80">{page.metroNote}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">By Cab or Auto</h3>
            <p className="mt-2 text-sm text-navy/85">{page.cabNote}</p>
            <h3 className="mt-4 font-heading text-base font-bold text-navy">By E-Rickshaw</h3>
            <p className="mt-2 text-sm text-navy/85">{page.erickshawNote}</p>
            <p className="mt-4 text-sm text-navy/80">{page.directionsAssistance}</p>
            <div className="mt-6"><MapEmbed embedSrc={mapEmbedUrl} title="Care Well Medical Centre on Google Maps" /></div>
          </section>

          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-primary/5 p-6 md:p-8">
              <SectionTitle>{page.consultationHeading}</SectionTitle>
              <p className="mt-4 text-base text-navy/85">{page.consultationBody}</p>
              <CtaRow phone={displayPhone} />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.faqHeading}</SectionTitle>
            <div className="mt-8"><ServiceFaq items={INTIMATE_SURGERY_FAQS} /></div>
            <p className="mt-6 text-sm text-navy/80">
              Related:{" "}
              <Link href={`${INTIMATE_SURGERY_PATH}/vaginoplasty`} className="font-semibold text-primary hover:underline">Vaginoplasty</Link>
              {", "}
              <Link href={`${INTIMATE_SURGERY_PATH}/labiaplasty`} className="font-semibold text-primary hover:underline">Labiaplasty</Link>
              {", "}
              <Link href={`${INTIMATE_SURGERY_PATH}/hymenoplasty`} className="font-semibold text-primary hover:underline">Hymenoplasty</Link>
              {", "}
              <Link href="/plastic-surgery-in-delhi" className="font-semibold text-primary hover:underline">Plastic Surgery</Link>.
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
                <LeadForm defaultTreatment={treatment} source="intimate-surgery-sidebar" />
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
