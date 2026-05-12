import clsx from "clsx";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { PortableBody } from "@/components/content/PortableBody";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MapEmbed } from "@/components/layout/MapEmbed";
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

const HairTransplantTechniques = dynamic(
  () =>
    import("@/components/services/HairTransplantTechniques").then(
      (m) => m.HairTransplantTechniques,
    ),
  { ssr: false, loading: () => <div className="h-40 animate-pulse rounded-2xl bg-surface" /> },
);

const HairTransplantReviews = dynamic(
  () =>
    import("@/components/services/HairTransplantReviews").then(
      (m) => m.HairTransplantReviews,
    ),
  { ssr: false, loading: () => <div className="h-64 animate-pulse rounded-2xl bg-surface" /> },
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

const HAIR_TRANSPLANT_FAQS: { question: string; answer?: string }[] = [
  {
    question: "Is hair transplant a permanent solution for hair loss?",
    answer:
      "Yes. Hair transplant is considered a permanent solution because transplanted follicles are taken from areas genetically resistant to hair loss. Once healed, these follicles continue to grow naturally for years.",
  },
  {
    question: "How many grafts do I need for a hair transplant?",
    answer:
      "The number of grafts depends on baldness grade, area to be covered, hair thickness, and desired density. Most patients require 2,000–4,000 grafts, but the exact count is confirmed after detailed scalp analysis.",
  },
  {
    question: "What is the cost of the best hair transplant in Delhi?",
    answer:
      "There is no single fixed price. The cost depends on graft requirements and surgical planning. At Care Well Medical Centre, hair transplant cost usually ranges from ₹40,000 to ₹2,00,000 (approx.), discussed transparently before surgery.",
  },
  {
    question: "What is the hair transplant cost per graft in Delhi?",
    answer:
      "Hair transplant cost per graft in Delhi generally ranges between ₹25 and ₹50, depending on graft quality, density planning, and surgical complexity.",
  },
  {
    question: "Is hair transplant available near me in Delhi NCR?",
    answer:
      "Yes. Care Well Medical Centre is located in South Delhi and is easily accessible from major areas of Delhi NCR, including Gurgaon, Noida, and Faridabad. Online consultations and appointment scheduling are also available for patients travelling from Delhi NCR.",
  },
  {
    question: "Who is considered the best hair transplant doctor in Delhi?",
    answer:
      "The best hair transplant doctor is one who prioritises medical safety, realistic outcomes, and long-term planning. Many patients choose Dr Sandeep Bhasin for his direct involvement in every surgery and honest case evaluation.",
  },
  {
    question: "Does hair transplant look natural?",
    answer:
      "Yes, when hairline design and graft placement are planned correctly. Natural results depend on angle, spacing, and surgeon involvement, not graft numbers alone.",
  },
  {
    question: "How long does hair transplant surgery take?",
    answer:
      "Hair transplant surgery usually takes 4–8 hours, depending on the number of grafts required. Most procedures are completed in a single day.",
  },
  {
    question: "Is hair transplant painful?",
    answer:
      "The procedure is performed under local anaesthesia. Patients may experience mild discomfort during recovery, which is usually manageable with prescribed medication.",
  },
  {
    question: "When will I see results after hair transplant?",
    answer:
      "Initial hair shedding is normal. New hair growth usually begins around 3–4 months, with visible improvement by 6 months and final density by 12 months.",
  },
  {
    question: "Can hair transplant be combined with PRP therapy?",
    answer:
      "Yes. PRP (Platelet-Rich Plasma) therapy is often used after hair transplant to support graft survival and strengthen existing hair. This is discussed during treatment planning.",
  },
  {
    question: "Is consultation necessary before deciding on hair transplant?",
    answer:
      "Yes. A consultation allows scalp analysis, graft estimation, and realistic outcome planning. It helps confirm whether surgery is medically appropriate and timed correctly.",
  },
  {
    question: "Is hair transplant available in CR Park, Delhi?",
    answer:
      "Yes. Care Well Medical Centre is located in Chittaranjan Park (CR Park), South Delhi, making it convenient for patients across Delhi NCR.",
  },
];

export function ServicePageSections({
  doc,
  whatsapp,
  phone,
  mapEmbedUrl,
}: {
  doc: ServiceDoc;
  whatsapp?: string;
  phone?: string;
  mapEmbedUrl?: string;
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
    <div>
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
            {slug === "hair-transplant" || slug === "hair-transplant-hi" ? (
              <h2 className="font-heading mx-auto max-w-3xl text-center text-2xl font-bold leading-tight text-navy md:text-3xl">
                Best Hair Transplant in Delhi – Cost, Before & After Results by Expert Surgeons & Clinic
              </h2>
            ) : (
              <p className="font-heading text-center text-lg font-semibold text-navy md:text-xl">
                Watch: {doc.title}
              </p>
            )}
            <div className="mx-auto mt-6 max-w-4xl">
              <LiteVideo id={overviewYoutubeId} title={`${doc.title} — overview video`} />
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-7xl px-4 pb-32 md:px-6 lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 lg:pb-24">
        <article className="max-w-3xl lg:max-w-none">
          <section className="pb-12 pt-10 md:pb-16 md:pt-12">
            <div
              className={clsx(
                "grid gap-10",
                whatIsIllustrationSrc ? "lg:grid-cols-2 lg:items-start" : "lg:grid-cols-1",
              )}
            >
              <div>
                {slug !== "hair-transplant" && slug !== "hair-transplant-hi" && (
                  <h2 className="font-heading text-2xl font-bold text-navy">
                    What is {doc.title.toLowerCase()}?
                  </h2>
                )}
                <div
                  className={
                    slug === "hair-transplant" || slug === "hair-transplant-hi" ? "" : "mt-6"
                  }
                >
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

          <section className="border-t border-surface pb-12 pt-10 md:pb-16 md:pt-12">
            <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">
              {slug === "hair-transplant" || slug === "hair-transplant-hi"
                ? "How Hair Transplant in Delhi Works"
                : "How it works"}
            </h2>
            {(slug === "hair-transplant" || slug === "hair-transplant-hi") && (
              <div className="mt-4 max-w-3xl space-y-3 text-base leading-relaxed text-navy/85">
                <p>
                  Understanding each step of the procedure helps patients feel more confident
                  about what to expect during surgery.
                </p>
                <p>
                  Doctors plan and perform hair transplant in defined stages to ensure a{" "}
                  <span className="font-semibold text-navy">natural appearance</span> and{" "}
                  <span className="font-semibold text-navy">long-term graft survival</span>.
                </p>
              </div>
            )}
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

          {(slug === "hair-transplant" || slug === "hair-transplant-hi") && (
            <section className="border-t border-surface pb-12 pt-10 md:pb-16 md:pt-12">
              <h2 className="font-heading text-2xl font-bold leading-tight text-navy md:text-3xl">
                Why Choose Hair Transplant in Delhi?
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-navy/85">
                Delhi often experiences high levels of pollution, which leads to a rise in
                hairfall cases across the capital city. According to a report published by the{" "}
                <span className="font-semibold text-navy">
                  Centre for Research on Energy and Clean Air
                </span>
                , Delhi was found to be among the top ten most polluted cities in India by PM2.5
                concentration in 2024–25. Other factors contributing to the growing cases include
                the city&apos;s fast-paced lifestyle and poor diet intake by many.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
                {[
                  {
                    title: "High pollution",
                    body: "Among India's top 10 PM2.5 cities (CREA, 2024–25).",
                    accent: "alert" as const,
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 15h11a3 3 0 100-6 5 5 0 00-9.6-1A3 3 0 003 15z" />
                        <path d="M16 19h2a2 2 0 100-4" />
                      </svg>
                    ),
                  },
                  {
                    title: "Fast-paced lifestyle",
                    body: "Chronic stress and irregular sleep accelerate hair loss.",
                    accent: "primary" as const,
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                    ),
                  },
                  {
                    title: "Poor diet intake",
                    body: "Nutrient deficiencies weaken follicles over time.",
                    accent: "teal" as const,
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2c2 4 2 7 0 10-2-3-2-6 0-10z" />
                        <path d="M6 12c0 5 3 9 6 10 3-1 6-5 6-10H6z" />
                      </svg>
                    ),
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
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${styles.iconWrap}`}
                          aria-hidden
                        >
                          {card.icon}
                        </span>
                        <p className={`font-heading text-sm font-bold uppercase tracking-wide sm:text-[13px] ${styles.label}`}>
                          {card.title}
                        </p>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-navy/80">{card.body}</p>
                    </div>
                  );
                })}
              </div>

              <p className="mt-8 max-w-3xl text-base leading-relaxed text-navy/85">
                That&apos;s why several individuals look for the{" "}
                <span className="font-semibold text-navy">best hair transplant surgeon in Delhi</span>.
                These individuals often come with stable hair loss patterns and are affected by
                genetic issues. This is where the best hair transplant executed by a reputed
                surgeon and a caring medical team makes a difference. It ensures a{" "}
                <span className="font-semibold text-navy">permanent baldness treatment</span>{" "}
                instead of temporary results expected from hairpieces or topical treatments. The
                techniques usually employed to achieve such outcomes are{" "}
                <span className="font-semibold text-navy">FUE, FUT and DHI</span>.
              </p>

              <div className="mt-8 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-white to-teal/10 p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary"
                      aria-hidden
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11a3 3 0 116 0 3 3 0 01-6 0z" />
                        <path d="M3 21a9 9 0 0118 0" />
                        <path d="M19 4l2 2-2 2M21 6h-6" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-heading text-base font-bold leading-tight text-navy sm:text-lg">
                        Your first consultation
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-navy/80 sm:text-[15px]">
                        Includes a scalp examination and personalised graft estimate, helping you
                        make an informed and confident decision.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/book-consultation"
                    className="inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 sm:self-auto"
                  >
                    <span aria-hidden>👉</span>
                    Talk to a Hair Transplant Expert
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>
          )}

          {(slug === "hair-transplant" || slug === "hair-transplant-hi") && (
            <section className="border-t border-surface pb-12 pt-10 md:pb-16 md:pt-12">
              <h2 className="font-heading text-2xl font-bold leading-tight text-navy md:text-3xl">
                Hair Transplant Results in Delhi{" "}
                <span className="text-navy/70">— Real Patient Transformations at Care Well Medical Centre</span>
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-navy/85">
                Real patient results from Care Well Medical Centre, Delhi — designed and performed
                by Dr Sandeep Bhasin, focusing on{" "}
                <span className="font-semibold text-navy">natural hairline</span> and{" "}
                <span className="font-semibold text-navy">consistent density</span>.
              </p>
              <p className="mt-2 text-xs text-navy/60 sm:text-sm">
                Photos shown with patient consent · Identities masked for privacy · Individual
                results may vary.
              </p>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {[
                  { src: "/images/hair-transplant-results/result-3500-grafts-1.png", grafts: "3500 grafts", view: "Side view" },
                  { src: "/images/hair-transplant-results/result-3500-grafts-2.png", grafts: "3500 grafts", view: "Side view" },
                  { src: "/images/hair-transplant-results/result-3500-grafts-3.png", grafts: "3500 grafts", view: "Front view" },
                  { src: "/images/hair-transplant-results/result-8000-grafts-1.png", grafts: "8000 grafts", view: "Crown view" },
                  { src: "/images/hair-transplant-results/result-8000-grafts-2.png", grafts: "8000 grafts", view: "Side view" },
                  { src: "/images/hair-transplant-results/result-8000-grafts-3.png", grafts: "8000 grafts", view: "Top view" },
                ].map((r) => (
                  <li
                    key={r.src}
                    className="group overflow-hidden rounded-2xl border border-surface bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
                  >
                    <div className="relative aspect-[1024/870] w-full bg-surface">
                      <Image
                        src={r.src}
                        alt={`Hair transplant before and after — ${r.grafts}, ${r.view.toLowerCase()} — Care Well Medical Centre, Delhi`}
                        fill
                        sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 92vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-3.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary sm:text-xs">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {r.grafts}
                      </span>
                      <span className="text-xs font-medium text-navy/60 sm:text-[13px]">
                        {r.view}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-8">
                <div className="space-y-4 text-sm leading-relaxed text-navy/85 sm:text-[15px]">
                  <p>
                    These before-and-after results show real patients treated at{" "}
                    <span className="font-semibold text-navy">Care Well Medical Centre, Delhi</span>.
                    Each case reflects personalised hairline design, precise graft placement, and
                    natural density planned according to each patient&apos;s pattern of baldness.
                  </p>
                  <p>
                    These stories reflect real journeys of men and women who regained confidence
                    through carefully planned hair transplant treatment.
                  </p>
                  <p>
                    We show results from{" "}
                    <span className="font-semibold text-navy">verified patients</span> treated at
                    Care Well Medical Centre. Every transformation shown here is from a verified
                    case record, reviewed for accuracy by our clinical team.
                  </p>
                </div>

                <aside className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/10 via-white to-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal/15 text-teal"
                      aria-hidden
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                    </span>
                    <p className="font-heading text-sm font-bold uppercase tracking-wide text-teal">
                      Growth timeline
                    </p>
                  </div>
                  <ul className="mt-4 space-y-3 text-sm text-navy/85 sm:text-[15px]">
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-7 w-12 shrink-0 items-center justify-center rounded-full bg-teal/15 text-[11px] font-bold uppercase tracking-wide text-teal">
                        4–8 mo
                      </span>
                      <span>
                        <span className="font-semibold text-navy">Most visible improvement</span>{" "}
                        appears between four and eight months after surgery.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-7 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold uppercase tracking-wide text-primary">
                        12 mo
                      </span>
                      <span>
                        <span className="font-semibold text-navy">Final density</span> is typically
                        achieved by twelve months as hair growth stabilises.
                      </span>
                    </li>
                  </ul>
                </aside>
              </div>

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
                  <span className="font-semibold text-navy/85">Disclaimer:</span> Individual
                  outcomes may vary based on graft count, scalp condition, and healing response.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90"
                >
                  View more transformations
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/book-consultation"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-primary/40 hover:text-primary"
                >
                  Get a similar result
                </Link>
              </div>

              <p className="mt-10 max-w-3xl text-base font-medium leading-relaxed text-navy/85 sm:mt-12">
                Here is what these real transformations highlight about modern hair restoration.
              </p>

              <div className="mt-6 grid gap-4 sm:gap-5 lg:grid-cols-2">
                <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal/15 text-teal"
                      aria-hidden
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M12 22c5-4 8-8 8-12a8 8 0 10-16 0c0 4 3 8 8 12z" />
                        <path d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
                      </svg>
                    </span>
                    <h3 className="font-heading text-base font-bold leading-tight text-navy sm:text-lg">
                      What These Results Represent
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-navy/85 sm:text-[15px]">
                    {[
                      "Natural hairline reconstruction",
                      "Gradual growth over several months",
                      "Doctor-performed procedures, not technician-led",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          className="mt-0.5 shrink-0 text-teal"
                          aria-hidden
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 border-t border-teal/15 pt-4 text-sm leading-relaxed text-navy/75 sm:text-[15px]">
                    Patients searching for{" "}
                    <span className="font-semibold text-navy">hair transplant in Delhi reviews</span>{" "}
                    usually want visual proof before technical explanations. This section answers
                    that question with real, verified results.
                  </p>
                </div>

                <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/5 via-white to-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary"
                      aria-hidden
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M12 2l3 6 6 1-4.5 4.5L18 21l-6-3-6 3 1.5-7.5L3 9l6-1z" />
                      </svg>
                    </span>
                    <h3 className="font-heading text-base font-bold leading-tight text-navy sm:text-lg">
                      Why Patients Trust These Outcomes
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-navy/85 sm:text-[15px]">
                    {[
                      "No stock images or exaggerated promises",
                      "Results vary based on graft number, hair texture, and healing response",
                      "Focus on natural appearance, not artificial density",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          className="mt-0.5 shrink-0 text-primary"
                          aria-hidden
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-navy/10 bg-navy/5 p-5 sm:p-6">
                <span
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy"
                  aria-hidden
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M12 2l9 4v6c0 5-3.5 9-9 10-5.5-1-9-5-9-10V6l9-4z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </span>
                <p className="text-sm leading-relaxed text-navy/85 sm:text-[15px]">
                  Consistent, natural outcomes make{" "}
                  <span className="font-semibold text-navy">Care Well Medical Centre</span> one of
                  Delhi&apos;s trusted destinations for hair transplant surgery. We perform all
                  procedures at our{" "}
                  <span className="font-semibold text-navy">certified surgical centre in Delhi</span>
                  , equipped for advanced{" "}
                  <span className="font-semibold text-navy">FUE and FUT</span> techniques.
                </p>
              </div>
            </section>
          )}

          <section className="border-t border-surface pb-12 pt-10 md:pb-16 md:pt-12">
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

          <section className="border-t border-surface pb-12 pt-10 md:pb-16 md:pt-12">
            {slug === "hair-transplant" || slug === "hair-transplant-hi" ? (
              <>
                <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">
                  When Doctors Recommend Hair Transplant
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-navy/85">
                  We advise a hair transplant after proper medical evaluation when non-surgical
                  options no longer provide meaningful improvement.
                </p>

                <div className="mt-8 overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
                  <div className="relative aspect-square w-full bg-white sm:aspect-[5/4] md:aspect-[4/3] lg:aspect-[4/3]">
                    <Image
                      src="/images/hair-transplant-baldness-grades.png"
                      alt="Baldness grade progression chart — hair transplant is usually considered from Grade 2 onwards, with donor hair availability shown for suitable and not suitable candidates"
                      fill
                      sizes="(min-width: 1024px) 720px, (min-width: 640px) 90vw, 100vw"
                      className="object-contain p-3 sm:p-4 md:p-5"
                    />
                  </div>
                </div>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    "Grade 2–6 baldness with visible thinning or bald patches",
                    "Adequate donor hair available for transplantation",
                    "Realistic expectations regarding density and growth timeline",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 rounded-xl border border-teal/25 bg-teal/5 p-4 text-sm leading-relaxed text-navy/85"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        className="mt-0.5 shrink-0 text-teal"
                        aria-hidden
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5">
                  <span
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary"
                    aria-hidden
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M21 12a9 9 0 11-9-9 9 9 0 019 9z" />
                      <path d="M12 8v4M12 16h.01" />
                    </svg>
                  </span>
                  <p className="text-sm leading-relaxed text-navy/85">
                    <span className="font-semibold text-navy">At Care Well Medical Centre,</span>{" "}
                    we recommend surgery only when it offers a clear and lasting benefit.
                  </p>
                </div>

                <div className="mt-10 sm:mt-12">
                  <HairTransplantTechniques />
                </div>

                <div className="mt-10 max-w-md sm:mt-12">
                  <p className="text-sm text-navy/80">Still unsure? Try the treatment finder quiz.</p>
                  <TreatmentFinderQuiz className="mt-4" />
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </section>

          <section className="border-t border-surface pb-12 pt-10 md:pb-16 md:pt-12">
            {slug === "hair-transplant" || slug === "hair-transplant-hi" ? (
              <>
                <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">
                  Hair Transplant Cost in Delhi
                </h2>
                <p className="mt-2 text-sm font-medium uppercase tracking-wide text-teal">
                  Quick snapshot
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/10 via-white to-white p-4 shadow-sm sm:p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-teal/80 sm:text-xs">
                      Per graft cost
                    </p>
                    <p className="mt-2 text-xl font-extrabold text-navy sm:text-2xl md:text-3xl">
                      ₹25 – ₹50
                    </p>
                  </div>
                  <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-white to-white p-4 shadow-sm sm:p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-primary/80 sm:text-xs">
                      Typical total cost
                    </p>
                    <p className="mt-2 text-xl font-extrabold text-navy sm:text-2xl md:text-3xl">
                      ₹40,000 – ₹2,00,000
                    </p>
                    <p className="mt-1 text-xs text-navy/60">approximate range</p>
                  </div>
                  <div className="rounded-2xl border border-alert/25 bg-gradient-to-br from-alert/10 via-white to-white p-4 shadow-sm sm:col-span-2 sm:p-5 lg:col-span-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-alert/80 sm:text-xs">
                      5000 grafts cost
                    </p>
                    <p className="mt-2 text-xl font-extrabold text-navy sm:text-2xl md:text-3xl">
                      ₹1,25,000 – ₹2,00,000
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-surface bg-surface/60 p-5">
                  <p className="text-sm leading-relaxed text-navy/85">
                    <span className="font-semibold text-navy">Note:</span>{" "}
                    We confirm the final cost after a detailed scalp analysis
                    and graft estimation — we never quote fixed package prices online.
                  </p>
                </div>

                {doc.pricingFactors && doc.pricingFactors.length > 0 && (
                  <div className="mt-8 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm md:p-6">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary"
                        aria-hidden
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M3 12h4l3 8 4-16 3 8h4" />
                        </svg>
                      </span>
                      <h3 className="font-heading text-base font-bold text-navy md:text-lg">
                        What affects your price
                      </h3>
                    </div>
                    <ul className="mt-4 grid gap-2.5 text-sm text-navy/85 sm:grid-cols-2">
                      {doc.pricingFactors.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <span
                            className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                            aria-hidden
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {doc.pricingEmiNote && (
                  <div className="mt-4 flex items-start gap-3 rounded-xl border border-teal/20 bg-teal/5 p-4">
                    <span
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal"
                      aria-hidden
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <rect x="2" y="6" width="20" height="13" rx="2" />
                        <path d="M2 11h20" />
                      </svg>
                    </span>
                    <p className="text-sm leading-relaxed text-navy/85">{doc.pricingEmiNote}</p>
                  </div>
                )}

                {doc.valueStack && doc.valueStack.length > 0 && (
                  <div className="mt-6 rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-white p-5 shadow-sm md:p-6">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-teal/15 text-teal"
                        aria-hidden
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                      <h3 className="font-heading text-base font-bold text-navy md:text-lg">
                        What&apos;s included
                      </h3>
                    </div>
                    <ul className="mt-4 grid gap-2.5 text-sm text-navy/85 sm:grid-cols-2">
                      {doc.valueStack.map((v) => (
                        <li key={v} className="flex items-start gap-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            className="mt-0.5 shrink-0 text-teal"
                            aria-hidden
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          <span>{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <>
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
              </>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/book-consultation" variant="primary">
                Get Personalized Quote
              </Button>
              <Button href="/cost-estimator" variant="outline">
                Cost estimator
              </Button>
            </div>
            <div className="mt-8">
              <EMICalculator />
            </div>
          </section>

          {(slug === "hair-transplant" || slug === "hair-transplant-hi") && (
            <section className="border-t border-surface pb-12 pt-10 md:pb-16 md:pt-12">
              <h2 className="font-heading text-2xl font-bold leading-tight text-navy md:text-3xl">
                Meet the Best Hair Transplant Surgeon in Delhi
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-navy/85">
                Dr. Sandeep Bhasin ranks among the top hair transplant surgeon in Delhi &amp;
                Cosmetic surgeons in India with a 99% success rate. Employing advanced
                technologies, he has successfully executed hair transplants, anti-aging treatments
                and skin aesthetics over two decades. Patients often experience long-lasting hair
                restoration with natural-looking outcomes.
              </p>

              <div className="mt-8 overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
                <div className="grid gap-0 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
                  <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-primary/10 via-white to-teal/10 md:aspect-auto md:min-h-[360px]">
                    <Image
                      src="/demo/doctor-profile-feature-vertical.png"
                      alt="Dr Sandeep Bhasin, senior cosmetic and aesthetic surgeon at Care Well Medical Centre in Delhi"
                      fill
                      sizes="(min-width: 768px) 260px, 100vw"
                      className="object-cover object-top md:object-center"
                    />
                  </div>

                  <div className="flex flex-col gap-4 p-5 sm:p-6 md:p-7">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-primary/80 sm:text-xs">
                        Why patients trust Dr Sandeep Bhasin
                      </p>
                      <h3 className="mt-1 font-heading text-lg font-bold leading-tight text-navy sm:text-xl">
                        Hair Transplant Surgeon in Delhi
                      </h3>
                      <p className="mt-1 text-xs text-navy/60 sm:text-sm">
                        Dr Sandeep Bhasin, senior cosmetic and aesthetic surgeon at Care Well
                        Medical Centre in Delhi
                      </p>
                    </div>

                    <blockquote className="relative rounded-xl border-l-4 border-primary/60 bg-primary/5 p-4 text-sm leading-relaxed text-navy/85 sm:text-[15px]">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="absolute -top-3 left-3 text-primary/40"
                        aria-hidden
                      >
                        <path d="M9 7H5a2 2 0 00-2 2v4a2 2 0 002 2h2v2a2 2 0 01-2 2H4v2h1a4 4 0 004-4V7zm11 0h-4a2 2 0 00-2 2v4a2 2 0 002 2h2v2a2 2 0 01-2 2h-1v2h1a4 4 0 004-4V7z" />
                      </svg>
                      <p>
                        Every patient I see has a different pattern of hair loss, expectations, and
                        long-term goals. My role is not to recommend surgery to everyone, but to
                        determine whether a hair transplant is truly appropriate for that stage of
                        hair loss.
                      </p>
                    </blockquote>

                    <p className="text-sm leading-relaxed text-navy/85 sm:text-[15px]">
                      I focus on{" "}
                      <span className="font-semibold text-navy">donor hair safety</span>, realistic
                      density, and natural hairline planning, rather than aggressive graft numbers.
                      If surgery is unlikely to deliver a meaningful or lasting result, I advise
                      waiting or choosing non-surgical options first. This honest discussion helps
                      patients make informed, pressure-free decisions about their treatment.
                    </p>

                    <ul className="grid gap-2 sm:grid-cols-3">
                      {[
                        "Donor hair safety",
                        "Natural hairline planning",
                        "Honest, pressure-free advice",
                      ].map((chip) => (
                        <li
                          key={chip}
                          className="flex items-start gap-2 rounded-lg bg-surface/60 px-3 py-2 text-xs font-medium text-navy/80 sm:text-sm"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.6"
                            className="mt-0.5 shrink-0 text-teal"
                            aria-hidden
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          <span>{chip}</span>
                        </li>
                      ))}
                    </ul>

                    <div>
                      <p className="text-sm text-navy/75 sm:text-[15px]">
                        You can learn more about my experience, qualifications, and surgical
                        approach here:
                      </p>
                      <Link
                        href="/about/dr-bhasin"
                        className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                      >
                        <span aria-hidden>👉</span>
                        Know Your Doctor — Dr Sandeep Bhasin
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          aria-hidden
                        >
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-teal/25 bg-teal/5 p-4 sm:p-5">
                <span
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal/15 text-teal"
                  aria-hidden
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <p className="text-sm leading-relaxed text-navy/85 sm:text-[15px]">
                  <span className="font-semibold text-navy">Dr Sandeep Bhasin</span> follows a
                  patient-first philosophy and performs every hair transplant at Care Well Medical
                  Centre with full transparency, ethical care, and medical accountability.
                </p>
              </div>
            </section>
          )}

          {(slug === "hair-transplant" || slug === "hair-transplant-hi") && (
            <section className="border-t border-surface pb-12 pt-10 md:pb-16 md:pt-12">
              <HairTransplantReviews />
            </section>
          )}

          {(slug === "hair-transplant" || slug === "hair-transplant-hi") && (
            <section className="border-t border-surface pb-12 pt-10 md:pb-16 md:pt-12">
              <h2 className="font-heading text-2xl font-bold leading-tight text-navy md:text-3xl">
                Book a Hair Transplant Consultation in Delhi{" "}
                <span className="text-navy/70">— Care Well Medical Centre</span>
              </h2>

              <p className="mt-4 max-w-3xl border-l-4 border-primary/50 bg-primary/5 px-4 py-3 text-base font-medium italic leading-relaxed text-navy/85 sm:text-[17px]">
                If you are considering hair transplant in Delhi, the right next step is a{" "}
                <span className="font-bold not-italic text-navy">personal medical evaluation</span>
                , not guesswork.
              </p>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-navy/85">
                <p>
                  A successful hair transplant is not just about implanting grafts — it is about
                  designing a{" "}
                  <span className="font-semibold text-navy">natural hairline</span> that suits your
                  face, age, and future hair loss pattern. At Care Well Medical Centre, every
                  procedure is carefully planned with a personalised approach, ensuring{" "}
                  <span className="font-semibold text-navy">balanced density</span>, proper{" "}
                  angle placement, and{" "}
                  <span className="font-semibold text-navy">long-term sustainability</span> of
                  results.
                </p>
                <p>
                  We focus on{" "}
                  <span className="font-semibold text-navy">optimal donor area management</span> to
                  prevent over-harvesting and maintain future transplant options if needed. Our
                  advanced techniques ensure{" "}
                  <span className="font-semibold text-navy">high graft survival rates</span>,
                  leading to consistent and natural growth over time.
                </p>
                <p>
                  Unlike temporary treatments, a well-planned hair transplant delivers{" "}
                  <span className="font-semibold text-navy">permanent results</span>, with
                  transplanted hair growing naturally for a lifetime. With expert supervision and
                  detailed planning, we aim to provide results that not only look natural today
                  but continue to look appropriate and dense in the years ahead.
                </p>
              </div>

              <ul className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
                {[
                  {
                    title: "Personalised hairline design",
                    body: "Planned around your face, age, and future hair pattern.",
                    accent: "primary" as const,
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 3a4 4 0 014 4v3a8 8 0 11-8 0V7a4 4 0 014-4z" />
                        <path d="M9 11h6M10 14h4" />
                      </svg>
                    ),
                  },
                  {
                    title: "Donor area protection",
                    body: "No over-harvesting — future transplants stay possible.",
                    accent: "teal" as const,
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2l9 4v6c0 5-3.5 9-9 10-5.5-1-9-5-9-10V6l9-4z" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    ),
                  },
                  {
                    title: "Permanent, natural results",
                    body: "High graft survival and consistent density over years.",
                    accent: "alert" as const,
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 21s-7-5-7-11a7 7 0 0114 0c0 6-7 11-7 11z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                    ),
                  },
                ].map((card) => {
                  const styles =
                    card.accent === "alert"
                      ? { ring: "border-alert/25", iconWrap: "bg-alert/15 text-alert", label: "text-alert" }
                      : card.accent === "primary"
                        ? { ring: "border-primary/25", iconWrap: "bg-primary/15 text-primary", label: "text-primary" }
                        : { ring: "border-teal/25", iconWrap: "bg-teal/15 text-teal", label: "text-teal" };
                  return (
                    <li
                      key={card.title}
                      className={`rounded-2xl border ${styles.ring} bg-white p-4 shadow-sm sm:p-5`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${styles.iconWrap}`}
                          aria-hidden
                        >
                          {card.icon}
                        </span>
                        <p className={`font-heading text-[13px] font-bold uppercase leading-tight tracking-wide sm:text-sm ${styles.label}`}>
                          {card.title}
                        </p>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-navy/80">{card.body}</p>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-navy via-navy to-primary p-6 text-white shadow-md sm:p-8">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center lg:gap-10">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-xs">
                      Doctor-led evaluation
                    </p>
                    <p className="mt-2 font-heading text-xl font-bold leading-tight sm:text-2xl">
                      Every evaluation is conducted personally by{" "}
                      <span className="text-teal-200" style={{ color: "#7DD3C0" }}>
                        Dr Sandeep Bhasin
                      </span>{" "}
                      to ensure safe and realistic treatment planning.
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-[15px]">
                      Patients across{" "}
                      <span className="font-semibold text-white">Delhi NCR and abroad</span> trust
                      our centre for honest, doctor-led planning and clear medical guidance.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link
                      href="/book-consultation"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-navy shadow-sm transition-transform hover:scale-[1.02] sm:text-base"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                        <rect x="3" y="4" width="18" height="18" rx="2.5" />
                        <path d="M8 2v4M16 2v4M3 10h18" />
                      </svg>
                      Book a consultation
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </Link>

                    {phone && (
                      <a
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:text-[15px]"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.12.9.32 1.78.6 2.62a2 2 0 01-.45 2.11L8 9.6a16 16 0 006 6l1.15-1.27a2 2 0 012.11-.45c.84.28 1.72.48 2.62.6A2 2 0 0122 16.92z" />
                        </svg>
                        Call {phone}
                      </a>
                    )}

                    {whatsapp && (
                      <a
                        href={whatsappHref(whatsapp, `Hi, I'd like to book a hair transplant consultation at Care Well Medical Centre, Delhi.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1ebe5b] sm:text-[15px]"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M20.52 3.48A12 12 0 003.49 20.5L2 22l1.55-.41A12 12 0 1020.52 3.48zM12 21.5a9.5 9.5 0 01-4.83-1.33l-.35-.2-3.18.83.85-3.1-.23-.36A9.5 9.5 0 1112 21.5zm5.32-7.13c-.29-.15-1.7-.84-1.97-.94-.26-.1-.46-.15-.65.15-.2.29-.74.94-.91 1.13-.17.2-.33.22-.62.07-.29-.15-1.22-.45-2.32-1.44-.86-.77-1.43-1.71-1.6-2-.17-.29-.02-.45.13-.6.13-.13.29-.33.43-.5.15-.17.2-.29.29-.48.1-.2.05-.36-.02-.5-.07-.15-.65-1.55-.89-2.13-.23-.56-.47-.48-.65-.49l-.55-.01a1.06 1.06 0 00-.77.36c-.26.29-1 1-1 2.43s1.03 2.83 1.18 3.03c.15.2 2.04 3.12 4.94 4.37.69.3 1.23.48 1.65.61.69.22 1.33.19 1.83.12.56-.08 1.7-.7 1.94-1.37.24-.66.24-1.23.17-1.36-.07-.13-.27-.2-.56-.34z" />
                        </svg>
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {(slug === "hair-transplant" || slug === "hair-transplant-hi") && (
            <section className="border-t border-surface pb-12 pt-10 md:pb-16 md:pt-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-teal sm:text-xs">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                    <path d="M12 2l9 4v6c0 5-3.5 9-9 10-5.5-1-9-5-9-10V6l9-4z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                  Trusted Locally
                </span>
              </div>

              <h2 className="mt-3 font-heading text-2xl font-bold leading-tight text-navy md:text-3xl">
                A trusted hair transplant centre in{" "}
                <span className="text-navy/70">South Delhi</span>
              </h2>

              <ul className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
                {[
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" aria-hidden>
                        <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7-6.3-3.8L5.7 21.2l1.7-7L2 9.5l7.1-.6L12 2z" />
                      </svg>
                    ),
                    iconBg: "bg-[#FACC15]/15",
                    title: "Strong Google patient ratings",
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B7B6B" strokeWidth="2" aria-hidden>
                        <path d="M12 11a4 4 0 100-8 4 4 0 000 8z" />
                        <path d="M5 21a7 7 0 0114 0" />
                        <path d="M14 4l2 2-2 2" />
                      </svg>
                    ),
                    iconBg: "bg-teal/15",
                    title: "Years of clinical experience in hair restoration",
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1557A0" strokeWidth="2" aria-hidden>
                        <path d="M9 3h6v3l4 4v8a3 3 0 01-3 3H8a3 3 0 01-3-3v-8l4-4V3z" />
                        <path d="M10 14h4" />
                      </svg>
                    ),
                    iconBg: "bg-primary/15",
                    title: "Procedures performed under direct doctor supervision",
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-3 rounded-2xl border border-surface bg-white p-4 shadow-sm sm:p-5"
                  >
                    <span
                      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}
                      aria-hidden
                    >
                      {item.icon}
                    </span>
                    <p className="text-sm font-medium leading-snug text-navy/85 sm:text-[15px]">
                      {item.title}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
                <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
                  <div className="flex flex-col gap-4 p-5 sm:p-6 md:p-7">
                    <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary sm:text-xs">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                        <path d="M12 22s-7-5-7-12a7 7 0 0114 0c0 7-7 12-7 12z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                      Visit our clinic
                    </div>

                    <h3 className="font-heading text-lg font-bold leading-tight text-navy sm:text-xl">
                      Care Well Medical Centre, Chittaranjan Park, South Delhi
                    </h3>

                    <p className="text-sm leading-relaxed text-navy/80 sm:text-[15px]">
                      Located in{" "}
                      <span className="font-semibold text-navy">Chittaranjan Park (CR Park)</span>,
                      South Delhi, near{" "}
                      <span className="font-semibold text-navy">Saket</span> and{" "}
                      <span className="font-semibold text-navy">Greater Kailash</span>, Care Well
                      Medical Centre is easily accessible from Gurgaon, Noida, Faridabad, and
                      across Delhi NCR.
                    </p>

                    <ul className="mt-1 space-y-2 text-sm text-navy/80 sm:text-[15px]">
                      <li className="flex items-start gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="mt-0.5 shrink-0 text-primary" aria-hidden>
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 2" />
                        </svg>
                        <span>Mon – Sat · 10:00 AM – 7:00 PM</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="mt-0.5 shrink-0 text-teal" aria-hidden>
                          <path d="M3 12l9-9 9 9" />
                          <path d="M5 10v10h14V10" />
                        </svg>
                        <span>Walk-in directions available on request</span>
                      </li>
                    </ul>

                    <div className="mt-2 flex flex-wrap gap-3">
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=Care+Well+Medical+Centre+Chittaranjan+Park+Delhi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                          <path d="M12 22s-7-5-7-12a7 7 0 0114 0c0 7-7 12-7 12z" />
                          <circle cx="12" cy="10" r="2.5" />
                        </svg>
                        Get directions
                      </a>
                      {phone && (
                        <a
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-primary/40 hover:text-primary"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.12.9.32 1.78.6 2.62a2 2 0 01-.45 2.11L8 9.6a16 16 0 006 6l1.15-1.27a2 2 0 012.11-.45c.84.28 1.72.48 2.62.6A2 2 0 0122 16.92z" />
                          </svg>
                          Call clinic
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="relative min-h-[300px] border-t border-surface lg:border-l lg:border-t-0">
                    <MapEmbed
                      embedSrc={mapEmbedUrl}
                      title="Care Well Medical Centre — Chittaranjan Park, South Delhi"
                      frameClassName="h-72 w-full sm:h-80 lg:h-full"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          <section className="border-t border-surface pb-12 pt-10 md:pb-16 md:pt-12">
            <h2 className="font-heading text-2xl font-bold leading-tight text-navy md:text-3xl">
              {slug === "hair-transplant" || slug === "hair-transplant-hi"
                ? "FAQs About Hair Transplant in Delhi"
                : "FAQ"}
            </h2>
            <div className="mt-8">
              <ServiceFaq
                items={
                  slug === "hair-transplant" || slug === "hair-transplant-hi"
                    ? HAIR_TRANSPLANT_FAQS
                    : doc.faq ?? []
                }
              />
            </div>
            {(slug === "hair-transplant" || slug === "hair-transplant-hi") && (
              <>
                <p className="mt-6 text-sm italic leading-relaxed text-navy/70 sm:text-[15px]">
                  If you have more questions, our team at{" "}
                  <span className="font-semibold not-italic text-navy">Care Well Medical Centre</span>{" "}
                  will be happy to guide you during a personal consultation.
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
                    <span className="font-semibold text-navy/85">Disclaimer:</span> All medical
                    information reviewed and verified by{" "}
                    <span className="font-semibold text-navy/85">
                      Dr Sandeep Bhasin, Senior Cosmetic Surgeon, Delhi
                    </span>
                    . Individual results vary. Educational purpose only; not a substitute for
                    consultation.
                  </p>
                </div>
              </>
            )}
          </section>

          <section className="border-t border-surface pb-12 pt-10 md:pb-16 md:pt-12">
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

      <section className="bg-navy py-16 text-center text-white md:py-20">
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
