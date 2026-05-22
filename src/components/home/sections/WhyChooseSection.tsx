import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { WHY_CHOOSE_ITEMS, WHY_CHOOSE_SECTION } from "@/data/homepage";

function WhyChooseIcon({ index }: { index: number }) {
  const icons = [
    <svg key="0" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="8.5" r="3.25" />
      <path d="M5.5 20c.8-3.8 3.35-6.25 6.5-6.25s5.7 2.45 6.5 6.25" />
    </svg>,
    <svg key="1" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M5.5 6.5h11a2 2 0 0 1 2 2v6.5a2 2 0 0 1-2 2h-3.5l-3.25 3.25V16.5H5.5a2 2 0 0 1-2-2V8.5a2 2 0 0 1 2-2z" />
      <path d="M9 13.75c.65.85 1.65 1.35 2.75 1.35s2.1-.5 2.75-1.35" />
    </svg>,
    <svg key="2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3.5" y="4.5" width="17" height="12" rx="1.75" />
      <path d="M8 19.5h8" />
      <path d="M7.5 13.5l2-2.25 1.75 3 2-4.25 1.75 2.75L16.5 10" />
    </svg>,
    <svg key="3" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="5.5" r="2" />
      <circle cx="6.5" cy="16.5" r="2" />
      <circle cx="17.5" cy="16.5" r="2" />
      <path d="M12 7.5v2.5M10.25 10L7 13.25M13.75 10L17 13.25" />
    </svg>,
  ];
  return icons[index] ?? icons[0];
}

export function WhyChooseSection() {
  return (
    <SectionShell aria-labelledby="why-choose-heading">
      <div className="container">
        <SectionHeader
          id="why-choose-heading"
          eyebrow={WHY_CHOOSE_SECTION.eyebrow}
          title={WHY_CHOOSE_SECTION.title}
        />

        <div className="mt-10 grid items-start gap-8 lg:mt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {WHY_CHOOSE_ITEMS.map((item, index) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[var(--color-border-light)] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card sm:p-6"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F5E9E3] text-primary">
                  <WhyChooseIcon index={index} />
                </div>
                <h3 className="font-heading text-heading-md font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-body-sm leading-relaxed text-text-secondary">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-[#FCEEEA] via-white to-white p-3 sm:p-4">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#F5E9E3]/60">
                <Image
                  src={WHY_CHOOSE_SECTION.portraitSrc}
                  alt="Dr. Sandeep Bhasin"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="mt-5 text-center lg:text-left">
              <p className="font-heading text-heading-md font-bold text-navy">Dr. Sandeep Bhasin</p>
              <p className="mt-1 text-body-sm text-text-secondary">Senior Cosmetic &amp; Aesthetic Surgeon</p>
              <p className="text-body-sm text-navy/70">Care Well Medical Centre, Delhi</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-4xl border-t border-[var(--color-border-light)] pt-10 sm:mt-14 sm:pt-12">
          <h3
            id="serving-delhi-heading"
            className="text-center font-heading text-display-sm text-navy sm:text-2xl"
          >
            {WHY_CHOOSE_SECTION.servingTitle}
          </h3>
          <p className="mx-auto mt-4 max-w-3xl text-center text-body-md leading-relaxed text-text-secondary sm:text-body-lg">
            {WHY_CHOOSE_SECTION.servingBody}
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
