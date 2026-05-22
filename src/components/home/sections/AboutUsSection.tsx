import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { ABOUT_US } from "@/data/homepage";

export function AboutUsSection() {
  return (
    <SectionShell aria-labelledby="about-care-well-heading">
      <div className="container">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeader
              id="about-care-well-heading"
              eyebrow={ABOUT_US.eyebrow}
              title={ABOUT_US.title}
              align="left"
              className="!mx-0 !max-w-none !text-left"
            />
            <div className="mt-4 space-y-4 text-body-md leading-relaxed text-text-secondary sm:text-body-lg">
              {ABOUT_US.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>

            <h3 className="mt-8 font-heading text-heading-md font-bold text-navy">{ABOUT_US.featuresTitle}</h3>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ABOUT_US.features.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"
                    aria-hidden
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-body-sm leading-snug text-text-secondary sm:text-[15px]">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button href={ABOUT_US.aboutHref} variant="primary">
                More About Us
              </Button>
            </div>
          </div>

          <div className="relative lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-[var(--color-border-light)] bg-white p-2 shadow-card">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                <Image
                  src={ABOUT_US.imageSrc}
                  alt="Doctor-led consultation at Care Well Medical Centre"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
