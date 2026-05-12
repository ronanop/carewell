import clsx from "clsx";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { PortableBody } from "@/components/content/PortableBody";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/leads/LeadForm";
import { ServiceHeroBookingForm } from "@/components/leads/ServiceHeroBookingForm";
import { HowItWorksStepsAnimated } from "@/components/services/HowItWorksStepsAnimated";
import { ServiceSidebarReveal } from "@/components/services/ServiceSidebarReveal";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { TreatmentFinderQuiz } from "@/components/leads/TreatmentFinderQuiz";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import type { ServiceDoc } from "@/types/service";
import { whatsappHref } from "@/lib/whatsapp";
import { getSiteUrl } from "@/lib/site";

const BeforeAfterSliders = dynamic(
  () => import("@/components/services/BeforeAfterSliders").then((m) => m.BeforeAfterSliders),
  { ssr: false, loading: () => <div className="h-40 animate-pulse rounded-xl bg-surface" /> },
);

const LiteVideo = dynamic(
  () => import("@/components/services/LiteVideo").then((m) => m.LiteVideo),
  { ssr: false, loading: () => <div className="aspect-video animate-pulse rounded-xl bg-surface" /> },
);

const EMICalculator = dynamic(
  () => import("@/components/widgets/EMICalculator").then((m) => m.EMICalculator),
  { ssr: false, loading: () => <div className="h-32 animate-pulse rounded-xl bg-surface" /> },
);

const HAIR_TRANSPLANT_CANDIDACY = {
  title: "Is Hair Transplant Right for You?",
  intro:
    "We recommend a hair transplant when medicines and non-surgical treatments no longer improve visible hair loss and bald areas continue to progress.",
  bullets: [
    "Suitable for Grade 2–6 baldness",
    "Permanent hair restoration",
    "Customised natural hairline design",
    "Surgery performed personally by the doctor, not technicians",
  ],
};

/** Overview embed under the hero for English + Hindi hair transplant service pages. */
const HAIR_TRANSPLANT_OVERVIEW_YOUTUBE_ID = "J2tW5o82WK0";

/** Static before/after composite when no individual Sanity cases yet (consent on file for this asset). */
const HAIR_TRANSPLANT_BEFORE_AFTER_FALLBACK = {
  src: "/images/hair-transplant-before-after-promo.jpg",
  alt: "Hair transplant before and after — side profile and front view, Care Well Medical Centre",
  width: 1024,
  height: 537,
  belowCaptionParagraphs: [
    "Struggling with hair baldness due to heredity, illness, or any other reasons? Seeking the best-in-class hair transplant experience to overcome this issue? Welcome to Care Well Medical Centre, where treatment meets precision. Under the supervision of Dr. Sandeep Bhasin, a surgeon with around two decades of excellent healthcare track record, the clinic has become the go-to option for hair transplant in Delhi.",
    "You find a well-rounded medical team that is professional yet empathetic. Finding the root cause and implementing the custom and cost-effective solution with a 99% success rate make patients trust Care Well Medical Centre for this treatment.",
    "Dr. Sandeep Bhasin personally plans and supervises every procedure to ensure safe, natural outcomes.",
  ],
} as const;

export function ServicePageSections({
  doc,
  whatsapp,
  phone,
}: {
  doc: ServiceDoc;
  whatsapp?: string;
  phone?: string;
}) {
  const slug = doc.slug?.current ?? "service";
  const overviewYoutubeId =
    slug === "hair-transplant" || slug === "hair-transplant-hi"
      ? HAIR_TRANSPLANT_OVERVIEW_YOUTUBE_ID
      : doc.youtubeVideoId;
  const whatIsIllustrationSrc = doc.whatIsIllustrationUrl ?? null;
  const whatIsIllustrationAlt = whatIsIllustrationSrc ? `Illustration supporting ${doc.title}` : "";
  const treatment = doc.treatmentDropdownLabel ?? doc.title;
  const wa = whatsapp
    ? whatsappHref(whatsapp, `Hi, I'm interested in ${doc.title} (${slug}).`)
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (doc.faq ?? []).map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const procLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: doc.title,
    description: doc.seo?.description,
    url: `${getSiteUrl()}/services/${slug}`,
  };

  return (
    <div className="pb-[72px] lg:pb-0">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/treatments/hair" },
          { name: doc.title, path: `/services/${slug}` },
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
                { label: "Services", href: "/treatments/hair" },
                { label: doc.title },
              ]}
            />
            <h1 className="font-heading mt-5 text-[34px] font-bold leading-[1.1] text-white sm:text-[42px] md:mt-6 md:text-5xl">
              {doc.title} in Delhi
            </h1>
            {doc.tagline && (
              <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg">
                {doc.tagline}
              </p>
            )}
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

      {overviewYoutubeId && (
        <section className="border-b border-surface bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
            <p className="font-heading text-center text-lg font-semibold text-navy md:text-xl">
              Watch: {doc.title}
            </p>
            <div className="mx-auto mt-6 max-w-4xl">
              <LiteVideo id={overviewYoutubeId} title={`${doc.title} — overview video`} />
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-7xl px-4 pb-32 md:px-6 lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 lg:pb-24">
        <article className="max-w-3xl lg:max-w-none">
          <section className="py-16 md:py-24">
            <div
              className={clsx(
                "grid gap-10",
                whatIsIllustrationSrc ? "lg:grid-cols-2 lg:items-start" : "lg:grid-cols-1",
              )}
            >
              <div>
                <h2 className="font-heading text-2xl font-bold text-navy">What is {doc.title.toLowerCase()}?</h2>
                <div className="mt-6">
                  <PortableBody value={doc.whatIsBody} />
                </div>
                {slug === "hair-transplant" || slug === "hair-transplant-hi" ? (
                  <div className="mt-8 rounded-xl border border-teal/30 bg-surface p-5 md:p-6">
                    <p className="font-heading text-lg font-bold text-navy md:text-xl">{HAIR_TRANSPLANT_CANDIDACY.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-navy/85 md:text-[15px]">{HAIR_TRANSPLANT_CANDIDACY.intro}</p>
                    <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm text-navy/85 md:text-[15px]">
                      {HAIR_TRANSPLANT_CANDIDACY.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  doc.insightPoints &&
                  doc.insightPoints.length > 0 && (
                    <div className="mt-8 rounded-xl border border-teal/30 bg-surface p-5">
                      <p className="text-sm font-semibold text-teal">Key insights</p>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-navy/85">
                        {doc.insightPoints.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>
              {whatIsIllustrationSrc ? (
                <div className="relative aspect-square max-h-80 w-full overflow-hidden rounded-2xl bg-surface lg:justify-self-end">
                  <Image
                    src={whatIsIllustrationSrc}
                    alt={whatIsIllustrationAlt}
                    fill
                    className="object-contain object-center p-1"
                    sizes="(min-width: 1024px) 400px, 90vw"
                  />
                </div>
              ) : null}
            </div>
          </section>

          <section className="border-t border-surface py-16 md:py-24">
            <h2 className="font-heading text-2xl font-bold text-navy">How it works</h2>
            <HowItWorksStepsAnimated
              steps={doc.howItWorksSteps ?? []}
              belowStepsImageSrc={
                slug === "hair-transplant" || slug === "hair-transplant-hi"
                  ? "/images/hair-transplant-process-infographic.png"
                  : undefined
              }
              belowStepsImageAlt="Infographic: The 4-step hair transplant process — graft extraction, hairline design, graft implantation, and healing timeline"
              showStepsDetailAside={slug === "hair-transplant" || slug === "hair-transplant-hi"}
            />
          </section>

          <section className="border-t border-surface py-16 md:py-24">
            <h2 className="font-heading text-2xl font-bold text-navy">Before &amp; after</h2>
            <div className="mt-8">
              <BeforeAfterSliders
                cases={doc.beforeAfterCases ?? []}
                emptyFallback={
                  slug === "hair-transplant" || slug === "hair-transplant-hi"
                    ? HAIR_TRANSPLANT_BEFORE_AFTER_FALLBACK
                    : undefined
                }
              />
            </div>
            <div className="mt-8">
              <Button href="/gallery" variant="outline">
                Get Similar Results →
              </Button>
            </div>
          </section>

          <section className="border-t border-surface py-16 md:py-24">
            <h2 className="font-heading text-2xl font-bold text-navy">Am I a candidate?</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-teal/40 bg-teal/5 p-6">
                <p className="font-heading font-bold text-teal">Often a good fit</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-navy/85">
                  {(doc.candidateGood ?? []).map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-alert/40 bg-alert/5 p-6">
                <p className="font-heading font-bold text-alert">May not be ideal (yet)</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-navy/85">
                  {(doc.candidatePoor ?? []).map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8 max-w-md">
              <p className="text-sm text-navy/80">Still unsure? Try the treatment finder quiz.</p>
              <TreatmentFinderQuiz className="mt-4" />
            </div>
          </section>

          <section className="border-t border-surface py-16 md:py-24">
            <h2 className="font-heading text-2xl font-bold text-navy">Pricing</h2>
            <p className="mt-4 text-2xl font-bold text-primary">
              Starting from ₹{doc.pricingFromInr?.toLocaleString("en-IN") ?? "—"}
            </p>
            <p className="mt-2 text-sm text-navy/70">Final cost depends on assessment — we never quote fixed package prices online.</p>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-navy/85">
              {(doc.pricingFactors ?? []).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            {doc.pricingEmiNote && <p className="mt-4 text-sm text-navy/80">{doc.pricingEmiNote}</p>}
            <div className="mt-6 rounded-xl border border-surface bg-white p-5">
              <p className="text-sm font-semibold text-navy">What&apos;s included</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-navy/80">
                {(doc.valueStack ?? []).map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/book-consultation" variant="primary">
                Get Personalized Quote
              </Button>
              <Button href="/cost-estimator" variant="outline">
                Cost estimator
              </Button>
            </div>
            <div className="mt-8 max-w-md">
              <EMICalculator />
            </div>
          </section>

          <section className="border-t border-surface py-16 md:py-24">
            <h2 className="font-heading text-2xl font-bold text-navy">FAQ</h2>
            <div className="mt-8">
              <ServiceFaq items={doc.faq ?? []} />
            </div>
          </section>

          <section className="border-t border-surface py-16 md:py-24">
            <h2 className="font-heading text-2xl font-bold text-navy">Related services</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {(doc.relatedServices ?? []).map((s) => (
                <Link
                  key={s.slug?.current}
                  href={`/services/${s.slug?.current}`}
                  className="rounded-xl border border-surface bg-white p-5 shadow-sm transition hover:border-primary"
                >
                  <p className="font-heading font-semibold text-navy">{s.title}</p>
                  <p className="mt-2 text-sm text-primary">View service →</p>
                </Link>
              ))}
            </div>
          </section>
        </article>

        <aside className="hidden overflow-x-clip lg:block">
          <div className="sticky top-28">
            <ServiceSidebarReveal>
              <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-surface" />}>
                <LeadForm defaultTreatment={treatment} source="service-sidebar" />
              </Suspense>
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="block w-full rounded-xl bg-navy py-3 text-center text-sm font-semibold text-white"
                >
                  Call clinic
                </a>
              )}
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
                <p className="mt-2">Mon–Sat · 10:00 – 19:00</p>
              </div>
            </ServiceSidebarReveal>
          </div>
        </aside>
      </div>

      {/* Mobile sticky CTA bar — sits above every other fixed element */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex gap-2 border-t border-surface bg-white px-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-4px_24px_rgba(0,0,0,0.10)] lg:hidden"
      >
        {phone && (
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-navy py-3 text-[13px] font-semibold text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24 11.36 11.36 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.58 1 1 0 01-.25 1.05z" />
            </svg>
            Call
          </a>
        )}
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-3 text-[13px] font-semibold text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
            </svg>
            WhatsApp
          </a>
        )}
        <Link
          href="/book-consultation"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary py-3 text-[13px] font-semibold text-white"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          Book Free
        </Link>
      </div>

      <section className="bg-gradient-to-r from-navy to-teal py-16 text-center text-white md:py-20">
        <h2 className="font-heading text-2xl font-bold md:text-3xl">Book your free consultation</h2>
        <p className="mx-auto mt-4 max-w-lg text-white/90">Speak with our team — no obligation, private, and fast callbacks.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/book-consultation" variant="secondary">
            Book Free Consultation
          </Button>
          {phone && (
            <Button href={`tel:${phone.replace(/\s/g, "")}`} variant="outline" className="!border-white !text-white">
              Call Now
            </Button>
          )}
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
