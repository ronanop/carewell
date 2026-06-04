"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const reducedMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
        };

  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-var(--announcement-offset,0px)-60px)] overflow-hidden bg-[#f3efe8] lg:h-[100svh] lg:min-h-0"
      aria-label="Care Well hero"
    >
      {/* Soft tinted background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-background.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
      </div>

      {/* Decorative blurred orbs for a modern, attention-grabbing feel on mobile/tablet */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-24 z-[1] h-56 w-56 rounded-full bg-[#0B7B6B]/25 blur-[80px] md:left-auto md:right-[40%] md:top-1/3 md:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-24 z-[1] h-64 w-64 rounded-full bg-[#1557A0]/20 blur-[90px] md:hidden"
      />

      {/* Hero figure — tablet & desktop only */}
      <div className="pointer-events-none absolute inset-0 z-[8] hidden items-end justify-end leading-none md:flex">
        <div className="relative h-[min(85svh,820px)] w-[min(75%,720px)] shrink-0 origin-bottom-right md:scale-[1.05] lg:h-[min(90svh,920px)] lg:w-[min(100%,900px)] lg:scale-[1.15]">
          <Image
            src="/hero-figure.png"
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 75vw, 900px"
            className="!block object-cover object-right object-bottom"
            aria-hidden
          />
        </div>
      </div>

      {/* Readability overlay (tablet/desktop only) */}
      <div className="absolute inset-0 z-[7] hidden bg-gradient-to-r from-white/85 via-white/40 to-transparent md:block" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-4 py-10 sm:px-6 sm:py-14 lg:h-full lg:justify-center lg:py-0">
        <div className="grid w-full items-center gap-6 lg:grid-cols-[1.05fr_minmax(0,0.95fr)] lg:gap-8">
          <div className="text-center md:text-left lg:-mt-[30%]">
            {/* Eyebrow / location pill */}
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 rounded-full border border-[#0B7B6B]/20 bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B7B6B] shadow-sm backdrop-blur-sm sm:text-xs"
            >
              <MapPin size={12} strokeWidth={2.5} aria-hidden />
              Chittaranjan Park • South Delhi
            </motion.div>

            <motion.h1
              {...fadeUp(0.05)}
              className="mx-auto mt-5 max-w-[680px] text-[36px] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#0A2E52] sm:mt-6 sm:text-[52px] md:mx-0 md:text-5xl lg:text-6xl"
            >
              Cosmetic Surgery &<br className="md:hidden" />{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#0B7B6B] via-[#0F9483] to-[#1557A0] bg-clip-text text-transparent">
                  Hair Transplant
                </span>
              </span>{" "}
              Clinic in South Delhi
            </motion.h1>

            <motion.p
              {...fadeUp(0.12)}
              className="mx-auto mt-4 max-w-[520px] text-[15px] font-medium leading-relaxed text-[#4B5563] sm:mt-5 sm:text-base md:mx-0 md:text-lg"
            >
              Advanced Hair Restoration, PRP Therapy, Skin, Anti-Aging &
              Body Contouring by Dr. Sandeep Bhasin.
            </motion.p>

            {/* Trust row: rating + experience */}
            <motion.div
              {...fadeUp(0.18)}
              className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:justify-start"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm">
                <div className="leading-none text-[15px] tracking-[1px] text-[#FACC15]">★★★★★</div>
                <div className="text-[13px] font-semibold text-[#374151]">4.3</div>
                <Image
                  src="/google-icon.png"
                  alt="Google"
                  width={36}
                  height={36}
                  className="h-5 w-5 object-contain"
                />
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-2 text-[13px] font-semibold text-[#0A2E52] shadow-sm backdrop-blur-sm">
                <ShieldCheck size={14} className="text-[#0B7B6B]" strokeWidth={2.5} aria-hidden />
                20+ Yrs · 10,000+ Procedures
              </div>
            </motion.div>

            <motion.div
              {...fadeUp(0.24)}
              className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3.5 md:justify-start"
            >
              <Button href="/book-consultation" size="lg" className="hero-primary-cta w-full sm:w-auto">
                Book Free Consultation <span aria-hidden="true">→</span>
              </Button>
              <Button href="/services" size="lg" variant="outline" className="hero-secondary-cta w-full sm:w-auto">
                Explore Treatments
              </Button>
            </motion.div>

            <motion.p
              {...fadeUp(0.3)}
              className="mt-5 text-xs text-[#6B7280] sm:text-sm md:text-left"
            >
              🔒 100% private · Response within 2 hours · No spam
            </motion.p>
          </div>

          {/* Spacer column for the figure on desktop only */}
          <div className="relative hidden lg:block lg:min-h-[min(620px,55svh)]" aria-hidden />
        </div>

        {/* Scroll cue — mobile only */}
        <motion.div
          {...fadeUp(0.4)}
          className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center md:hidden"
          aria-hidden
        >
          <div className="flex flex-col items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0A2E52]/60">
            Scroll
            <span className="block h-6 w-px bg-gradient-to-b from-[#0A2E52]/40 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
