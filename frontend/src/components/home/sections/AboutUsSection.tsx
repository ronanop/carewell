import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionShell } from "@/components/ui/SectionShell";
import { ABOUT_US } from "@/data/homepage";

const BENTO_CARDS = [
  {
    title: "Patient First Philosophy",
    body: ABOUT_US.paragraphs[0],
    accent: "#F6D7C3",
    type: "text" as const,
  },
  {
    title: "Personalised Consultations",
    body: ABOUT_US.paragraphs[1],
    accent: "#D9E8FF",
    type: "image" as const,
  },
  {
    title: "Advanced Technology",
    body: ABOUT_US.paragraphs[1],
    accent: "#D9E8FF",
    type: "text" as const,
  },
  {
    title: "Ethical & Transparent Care",
    body: ABOUT_US.paragraphs[2],
    accent: "#DDF2E1",
    type: "text" as const,
  },
];

const TRUST_STATS = [
  { value: "10,000+", label: "Happy Patients" },
  { value: `${ABOUT_US.features.length}+`, label: "Treatment Options" },
  { value: "100%", label: "Patient Satisfaction" },
  { value: "Safe. Ethical.", label: "Evidence-Based." },
] as const;

function BentoIcon({ index }: { index: number }) {
  const icons = [
    <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>,
    <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="7" r="3.5" />
      <path d="M5.5 20c.8-3.8 3.35-6.25 6.5-6.25s5.7 2.45 6.5 6.25" />
    </svg>,
    <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>,
    <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 3 4 7v5c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V7l-8-4z" />
      <path d="m9 12 2 2 4-4" />
    </svg>,
  ];
  return icons[index % icons.length];
}

function TrustBarIcon({ index }: { index: number }) {
  const icons = [
    <svg key="0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>,
    <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M4 20V10M10 20V4M16 20v-8M22 20V8" />
    </svg>,
    <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7L2 9.4h7.6L12 2z" />
    </svg>,
    <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 3 4 7v5c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V7l-8-4z" />
    </svg>,
  ];
  return icons[index % icons.length];
}

export function AboutUsSection() {
  return (
    <SectionShell aria-labelledby="about-care-well-heading" className="bg-white">
      <div className="container">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="lg:py-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0A3A75]/55">
              {ABOUT_US.eyebrow}
            </p>
            <span className="mt-3 block h-0.5 w-10 rounded-full bg-[#F6D7C3]" aria-hidden />
            <h2
              id="about-care-well-heading"
              className="mt-5 font-heading text-3xl font-bold leading-tight text-[#0A3A75] md:text-4xl lg:text-[2.5rem]"
            >
              {ABOUT_US.title}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-[#0A3A75]/60 sm:text-lg">
              {ABOUT_US.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>

            <h3 className="mt-8 font-heading text-lg font-bold text-[#0A3A75]">{ABOUT_US.featuresTitle}</h3>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {ABOUT_US.features.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#0A3A75]/65">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0A3A75]/40" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button
                href={ABOUT_US.aboutHref}
                variant="primary"
                size="lg"
                className="rounded-full px-8 shadow-[0_8px_28px_rgba(10,58,117,0.22)]"
              >
                More About Us
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {BENTO_CARDS.map((card, index) => {
              if (card.type === "image") {
                return (
                  <div
                    key={card.title}
                    className="relative min-h-[220px] overflow-hidden rounded-[28px] shadow-[0_10px_40px_rgba(10,58,117,0.1)] sm:min-h-[240px]"
                  >
                    <Image
                      src={ABOUT_US.imageSrc}
                      alt="Doctor-led consultation at Care Well Medical Centre"
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A3A75]/80 via-[#0A3A75]/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <p className="font-heading text-lg font-bold text-white">{card.title}</p>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/85">{card.body}</p>
                      <Link
                        href={ABOUT_US.aboutHref}
                        className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#0A3A75] text-white shadow-lg transition hover:-translate-y-0.5 sm:bottom-6 sm:right-6"
                        aria-label="More About Us"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden>
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={card.title}
                  className="flex min-h-[220px] flex-col rounded-[28px] p-5 shadow-[0_8px_32px_rgba(10,58,117,0.07)] sm:min-h-[240px] sm:p-6"
                  style={{ background: `linear-gradient(145deg, ${card.accent}55 0%, white 65%)` }}
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full text-[#0A3A75]"
                    style={{ backgroundColor: `${card.accent}99` }}
                    aria-hidden
                  >
                    <BentoIcon index={index} />
                  </span>
                  <p className="mt-4 font-heading text-lg font-bold text-[#0A3A75]">{card.title}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#0A3A75]/65 line-clamp-5">{card.body}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-[#0A3A75]/[0.06] shadow-[0_8px_40px_rgba(10,58,117,0.07)] sm:mt-14 lg:grid-cols-4">
          {TRUST_STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="flex flex-col items-center bg-white px-4 py-6 text-center sm:px-6 sm:py-8"
            >
              <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#D9E8FF]/40 text-[#0A3A75]" aria-hidden>
                <TrustBarIcon index={index} />
              </span>
              <p className="font-heading text-xl font-bold text-[#0A3A75] sm:text-2xl">{stat.value}</p>
              <p className="mt-1 text-xs font-medium text-[#0A3A75]/55 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
