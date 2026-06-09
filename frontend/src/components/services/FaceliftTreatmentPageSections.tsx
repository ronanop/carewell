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
  FACELIFT_CLINIC,
  FACELIFT_COST_ROWS,
  FACELIFT_FAQS,
  FACELIFT_IMAGES,
  FACELIFT_NON_SURGICAL_LINKS,
  FACELIFT_PAGE,
  FACELIFT_PATH,
  FACELIFT_SURGICAL_LINKS,
} from "@/data/facelift-in-delhi";
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

function FaceliftTypeBlock({
  heading,
  intro,
  items,
  downtime,
  resultsLast,
  closing,
  links,
}: {
  heading: string;
  intro: string;
  items: readonly string[];
  downtime: string;
  resultsLast: string;
  closing?: string;
  links?: readonly { href: string; label: string }[];
}) {
  return (
    <article className="rounded-xl border border-surface bg-white p-5 md:p-6">
      <h3 className="font-heading text-lg font-bold text-navy">{heading}</h3>
      <p className="mt-2 text-sm text-navy/85">{intro}</p>
      <CheckList items={items} variant="do" />
      <p className="mt-3 text-sm text-navy/85">
        <strong>Downtime:</strong> {downtime} · <strong>Results last:</strong> {resultsLast}
      </p>
      {closing && <p className="mt-2 text-sm text-navy/80">{closing}</p>}
      {links && links.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-semibold text-primary hover:underline">
              {l.label} →
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}

export function FaceliftTreatmentPageSections({
  phone,
  whatsapp,
  mapEmbedUrl,
}: {
  phone?: string;
  whatsapp?: string;
  mapEmbedUrl?: string | null;
}) {
  const page = FACELIFT_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? FACELIFT_CLINIC.phone;
  const wa = whatsapp ? whatsappHref(whatsapp, "Hi, I'm interested in a facelift in Delhi.") : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FACELIFT_FAQS.map((f) => ({
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
    url: `${getSiteUrl()}${FACELIFT_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.parentLabel, path: page.parentPath },
          { name: "Facelift", path: FACELIFT_PATH },
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
                { label: "Facelift" },
              ]}
            />
            <p className="mt-5 text-sm font-medium uppercase tracking-wide text-white/75">{page.subtitle}</p>
            <h1 className="font-heading mt-2 text-[26px] font-bold leading-[1.12] text-white sm:text-[32px] md:text-[36px]">{page.h1}</h1>
            <p className="mt-4 max-w-xl text-base text-white/90">{page.tagline}</p>
            <div className="mt-6">
              <Image src={FACELIFT_IMAGES.hero.src} alt={FACELIFT_IMAGES.hero.alt} width={170} height={170} className="rounded-2xl border-2 border-white/20 object-cover shadow-lg" priority />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/book-consultation" variant="secondary">Book Your Consultation</Button>
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
            <CtaRow phone={displayPhone} label="Book Your Consultation Today" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whatIsHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.whatIsIntro}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">Key Benefits of a Facelift</h3>
            <CheckList items={page.whatIsBenefits} variant="do" />
            <p className="mt-4 text-sm text-navy/80">{page.whatIsClosing}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.candidateHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.candidateIntro}</p>
            <CheckList items={page.candidateItems} variant="do" />
            <p className="mt-4 text-sm text-navy/80">{page.candidateClosing}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.typesHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.typesIntro}</p>
            <div className="mt-8 space-y-6">
              <FaceliftTypeBlock
                heading={page.nonSurgicalHeading}
                intro={page.nonSurgicalIntro}
                items={page.nonSurgicalItems}
                downtime={page.nonSurgicalDowntime}
                resultsLast={page.nonSurgicalResults}
                closing={page.nonSurgicalClosing}
                links={FACELIFT_NON_SURGICAL_LINKS}
              />
              <FaceliftTypeBlock
                heading={page.surgicalHeading}
                intro={page.surgicalIntro}
                items={page.surgicalItems}
                downtime={page.surgicalDowntime}
                resultsLast={page.surgicalResults}
                closing={page.surgicalClosing}
                links={FACELIFT_SURGICAL_LINKS}
              />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.processHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.processIntro}</p>
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-heading text-base font-bold text-navy">Before the Procedure</h3>
                <CheckList items={page.processBefore} variant="do" />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-navy">During the Procedure</h3>
                <CheckList items={page.processDuring} variant="do" />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-navy">After the Procedure</h3>
                <CheckList items={page.processAfter} variant="do" />
              </div>
            </div>
            <p className="mt-4 text-sm text-navy/80">{page.processClosing}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.recoveryHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.recoveryIntro}</p>
            <CheckList items={page.recoveryItems} variant="do" />
            <p className="mt-4 text-sm text-navy/80">{page.recoveryClosing}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.resultsLastHeading}</SectionTitle>
            <CheckList items={page.resultsLastItems} variant="do" />
            <p className="mt-3 text-sm text-navy/80">{page.resultsLastTip}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.costHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.costIntro}</p>
            <DataTable headers={["Facelift Procedure", "Estimated Cost (INR)"]} keys={["procedure", "cost"]} rows={[...FACELIFT_COST_ROWS]} />
            <h3 className="mt-6 font-heading text-base font-bold text-navy">Cost factors</h3>
            <CheckList items={page.costFactors} variant="do" />
            <p className="mt-4 text-sm text-navy/80">{page.costClosing}</p>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyClinicHeading}</SectionTitle>
            <CheckList items={page.whyClinicItems} variant="do" />
            <div className="mt-6 grid gap-6 md:grid-cols-[200px_1fr]">
              <SectionImage src={FACELIFT_IMAGES.doctor.src} alt={FACELIFT_IMAGES.doctor.alt} aspect="square" />
              <div>
                <p className="text-base text-navy/85">{page.whyClinicClosing}</p>
                <Link href="/about/dr-bhasin" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
                  View full doctor profile →
                </Link>
              </div>
            </div>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.resultsHeading}</SectionTitle>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FACELIFT_IMAGES.beforeAfter.map((img) => (
                <SectionImage key={img.caption} src={img.src} alt={img.alt} caption={img.caption} />
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.videoHeading}</SectionTitle>
            <div className="mt-6 overflow-hidden rounded-2xl border border-surface">
              <div className="relative aspect-video">
                <Image src={FACELIFT_IMAGES.videoPoster.src} alt={FACELIFT_IMAGES.videoPoster.alt} fill className="object-cover" sizes="720px" />
              </div>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-primary/5 p-6 md:p-8">
              <SectionTitle>{page.consultationHeading}</SectionTitle>
              <p className="mt-3 text-sm text-navy/85">{page.consultationLocation}</p>
              <CtaRow phone={displayPhone} />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>Google Reviews</SectionTitle>
            <div className="mt-6"><HairTransplantReviews /></div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>Visit Care Well Medical Centre – Delhi</SectionTitle>
            <div className="mt-4 space-y-2 text-base text-navy/85">
              <p className="font-semibold text-navy">{FACELIFT_CLINIC.name}</p>
              <p>{FACELIFT_CLINIC.address}</p>
              <p>
                <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="text-primary underline">{displayPhone}</a>
              </p>
            </div>
            <div className="mt-6"><MapEmbed embedSrc={mapEmbedUrl} title="Care Well Medical Centre on Google Maps" /></div>
            <p className="mt-4 text-sm text-navy/80">
              Back to{" "}
              <Link href={page.parentPath} className="font-semibold text-primary hover:underline">
                Plastic Surgery in Delhi
              </Link>
              {" · "}
              <Link href="/cosmetic-treatments-in-delhi/anti-aging" className="font-semibold text-primary hover:underline">
                Anti-aging treatments
              </Link>.
            </p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.faqHeading}</SectionTitle>
            <p className="mt-4 text-sm text-navy/85">{page.faqIntro}</p>
            <div className="mt-8"><ServiceFaq items={FACELIFT_FAQS} /></div>
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
                <LeadForm defaultTreatment={treatment} source="facelift-sidebar" />
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
