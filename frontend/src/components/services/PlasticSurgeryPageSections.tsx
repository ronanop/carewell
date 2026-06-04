import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { LeadForm } from "@/components/leads/LeadForm";
import { ServiceHeroBookingForm } from "@/components/leads/ServiceHeroBookingForm";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { ServiceSidebarReveal } from "@/components/services/ServiceSidebarReveal";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  PLASTIC_SURGERY_FAQS,
  PLASTIC_SURGERY_PAGE,
  PLASTIC_SURGERY_PATH,
  PLASTIC_SURGERY_TREATMENT_CARDS,
} from "@/data/plastic-surgery-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { whatsappHref } from "@carewell/backend/lib/whatsapp";

const CLINIC_PHONE_DISPLAY = "+91-9667-977-499";

export function PlasticSurgeryPageSections({
  phone,
  whatsapp,
}: {
  phone?: string;
  whatsapp?: string;
}) {
  const treatment = PLASTIC_SURGERY_PAGE.treatmentDropdownLabel;
  const displayPhone = phone ?? CLINIC_PHONE_DISPLAY;
  const wa = whatsapp
    ? whatsappHref(whatsapp, "Hi, I'm interested in plastic surgery in Delhi.")
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PLASTIC_SURGERY_FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const procLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: PLASTIC_SURGERY_PAGE.h1,
    description: PLASTIC_SURGERY_PAGE.tagline,
    url: `${getSiteUrl()}${PLASTIC_SURGERY_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: PLASTIC_SURGERY_PAGE.h1, path: PLASTIC_SURGERY_PATH },
        ]}
      />

      <section className="relative min-h-[58svh] overflow-hidden bg-navy md:min-h-[65vh]">
        <div
          className="absolute inset-0 bg-cover bg-[center_35%] bg-no-repeat"
          style={{ backgroundImage: "url(/images/service-hero-theatre-bg.png)" }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.32]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, #1557A0 0%, transparent 40%), radial-gradient(circle at 70% 60%, #0B7B6B 0%, transparent 35%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/82 to-navy/62" />
        <div className="absolute inset-0 bg-black/5" aria-hidden />
        <div className="relative mx-auto grid min-h-[58svh] max-w-7xl items-center gap-8 px-4 py-12 sm:py-14 md:min-h-[65vh] md:grid-cols-[1fr_312px] md:items-start md:gap-10 md:px-6 md:py-20 lg:py-24">
          <div className="min-w-0">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: PLASTIC_SURGERY_PAGE.h1 },
              ]}
            />
            <h1 className="font-heading mt-5 text-[34px] font-bold leading-[1.1] text-white sm:text-[42px] md:mt-6 md:text-5xl">
              {PLASTIC_SURGERY_PAGE.h1}
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg">
              {PLASTIC_SURGERY_PAGE.tagline}
            </p>
            <div className="mt-7 flex flex-wrap gap-3 sm:gap-4 md:mt-8">
              <Button href="/book-consultation" variant="secondary">
                Book Free Consultation
              </Button>
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-button bg-[#25D366] px-6 py-3 text-base font-semibold text-white shadow-[0_8px_24px_-8px_rgba(37,211,102,0.55)] transition-transform duration-150 ease-out hover:scale-[1.01] hover:bg-[#1FB959] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] motion-reduce:transform-none"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                  </svg>
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
            <h2 className="font-heading text-2xl font-bold leading-tight text-navy md:text-3xl">
              {PLASTIC_SURGERY_PAGE.introHeading}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-navy/85">
              {PLASTIC_SURGERY_PAGE.introParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionHeader
              align="left"
              title={PLASTIC_SURGERY_PAGE.portfolioHeading}
              className="max-w-none text-left"
              titleClassName="text-2xl md:text-3xl"
            />
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PLASTIC_SURGERY_TREATMENT_CARDS.map((card) => (
                <li key={card.title}>
                  <Link
                    href={card.href}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-surface bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 92vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                      <h3 className="font-heading text-lg font-bold text-navy">{card.title}</h3>
                      <p className="text-sm leading-relaxed text-navy/75 line-clamp-4">{card.excerpt}</p>
                      <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-primary">
                        Learn more
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <h2 className="font-heading text-2xl font-bold leading-tight text-navy md:text-3xl">
              {PLASTIC_SURGERY_PAGE.whyTrustHeading}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-navy/85">
              {PLASTIC_SURGERY_PAGE.whyTrustParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Expert surgeons",
                  body: "Board-certified plastic surgeons with extensive experience in face, body, and reconstructive care.",
                  accent: "primary" as const,
                },
                {
                  title: "Advanced technology",
                  body: "FDA-approved methods and state-of-the-art facilities for safe procedures and smoother recovery.",
                  accent: "teal" as const,
                },
                {
                  title: "Natural results",
                  body: "Personalized treatment plans focused on subtle enhancements and lasting confidence.",
                  accent: "alert" as const,
                },
              ].map((card) => {
                const styles =
                  card.accent === "alert"
                    ? { ring: "border-alert/25", iconWrap: "bg-alert/15 text-alert", label: "text-alert" }
                    : card.accent === "primary"
                      ? { ring: "border-primary/25", iconWrap: "bg-primary/15 text-primary", label: "text-primary" }
                      : { ring: "border-teal/25", iconWrap: "bg-teal/15 text-teal", label: "text-teal" };
                return (
                  <div
                    key={card.title}
                    className={`rounded-2xl border ${styles.ring} bg-white p-4 shadow-sm sm:p-5`}
                  >
                    <p className={`font-heading text-sm font-bold uppercase tracking-wide ${styles.label}`}>
                      {card.title}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-navy/80">{card.body}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-primary/5 p-6 md:p-8">
              <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">
                {PLASTIC_SURGERY_PAGE.appointmentHeading}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy/85">
                {PLASTIC_SURGERY_PAGE.appointmentBody}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/book-consultation" variant="primary">
                  Book Free Consultation
                </Button>
                <Button
                  href={`tel:${displayPhone.replace(/[^\d+]/g, "")}`}
                  variant="outline"
                >
                  Call {displayPhone}
                </Button>
              </div>
              <p className="mt-5 text-sm text-navy/70">
                Visit us at Care Well Medical Centre, Chittaranjan Park (CR Park), South Delhi.
              </p>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <h2 className="font-heading text-2xl font-bold leading-tight text-navy md:text-3xl">
              {PLASTIC_SURGERY_PAGE.faqHeading}
            </h2>
            <div className="mt-8">
              <ServiceFaq items={PLASTIC_SURGERY_FAQS} />
            </div>
            <p className="mt-6 text-sm italic leading-relaxed text-navy/70 sm:text-[15px]">
              If you have more questions, our team at{" "}
              <span className="font-semibold not-italic text-navy">Care Well Medical Centre</span> will be
              happy to guide you during a personal consultation.
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-navy/10 bg-surface/60 p-4 sm:p-5">
              <span
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy/10 text-navy/70"
                aria-hidden
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </span>
              <p className="text-xs leading-relaxed text-navy/70 sm:text-sm">
                <span className="font-semibold text-navy/85">Disclaimer:</span> All medical information
                reviewed and verified by{" "}
                <span className="font-semibold text-navy/85">
                  Dr Sandeep Bhasin, Senior Cosmetic Surgeon, Delhi
                </span>
                . Individual results vary. Educational purpose only; not a substitute for consultation.
              </p>
            </div>
          </section>
        </article>

        <aside className="hidden overflow-x-clip lg:block">
          <div className="sticky top-28">
            <ServiceSidebarReveal>
              <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-surface" />}>
                <LeadForm defaultTreatment={treatment} source="service-sidebar" />
              </Suspense>
              <a
                href={`tel:${displayPhone.replace(/[^\d+]/g, "")}`}
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
              <div className="rounded-xl border border-surface bg-white p-4 text-sm text-navy/80">
                <p className="font-semibold text-navy">Clinic hours</p>
                <p className="mt-2">Mon–Sun · 10:00 – 19:00</p>
              </div>
            </ServiceSidebarReveal>
          </div>
        </aside>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex gap-2 border-t border-surface bg-white px-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-4px_24px_rgba(0,0,0,0.10)] lg:hidden">
        <a
          href={`tel:${displayPhone.replace(/[^\d+]/g, "")}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-navy py-3 text-[13px] font-semibold text-white"
        >
          Call
        </a>
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-3 text-[13px] font-semibold text-white"
          >
            WhatsApp
          </a>
        )}
        <Link
          href="/book-consultation"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary py-3 text-[13px] font-semibold text-white"
        >
          Book Free
        </Link>
      </div>

      <section className="bg-navy py-16 text-center text-white md:py-20">
        <h2 className="font-heading text-2xl font-bold md:text-3xl">Book your free consultation</h2>
        <p className="mx-auto mt-4 max-w-lg text-white/90">
          Speak with our team — no obligation, private, and fast callbacks.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/book-consultation" variant="secondary">
            Book Free Consultation
          </Button>
          <Button
            href={`tel:${displayPhone.replace(/[^\d+]/g, "")}`}
            variant="outline"
            className="!border-white !text-white"
          >
            Call Now
          </Button>
        </div>
        {wa && (
          <a href={wa} className="mt-6 inline-block text-sm font-medium text-white underline">
            Continue on WhatsApp
          </a>
        )}
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(procLd) }} />
    </div>
  );
}
