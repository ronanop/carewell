"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const reducedMotion = useReducedMotion();

  const fadeUp = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
      };

  return (
    <section
      className="relative overflow-hidden bg-[#f3efe8] pt-16 sm:pt-20 lg:h-[100svh] lg:pt-20"
      aria-label="Care Well hero"
    >
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

      {/* Figure: anchored bottom-right; scaled up only on larger screens so it doesn't cover copy on mobile */}
      <div className="pointer-events-none absolute inset-0 z-[8] flex items-end justify-end leading-none">
        <div className="relative h-[70svh] max-h-[560px] w-[88%] max-w-[480px] shrink-0 origin-bottom-right sm:h-[78svh] sm:max-h-[640px] sm:w-[75%] sm:max-w-[600px] md:h-[min(90svh,920px)] md:w-[min(100%,820px)] md:max-w-none md:scale-[1.18] lg:w-[min(100%,900px)]">
          <Image
            src="/hero-figure.png"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 88vw, 900px"
            className="!block object-cover object-right object-bottom"
            aria-hidden
          />
        </div>
      </div>

      {/* Readability overlay: stronger from-left on desktop; on mobile also fade up from bottom so CTAs sit on a soft background */}
      <div className="absolute inset-0 z-[7] bg-gradient-to-b from-white/95 via-white/70 to-white/0 sm:bg-gradient-to-r sm:from-white/85 sm:via-white/40 sm:to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col px-4 pb-10 pt-6 sm:px-6 sm:pb-12 lg:h-full lg:justify-center lg:pb-0 lg:pt-0">
        <div className="grid w-full items-center gap-6 lg:grid-cols-[1.05fr_minmax(0,0.95fr)] lg:gap-8">
          <motion.div className="lg:-mt-[30%]" transition={{ duration: 0.5 }} {...fadeUp}>
            <h1 className="max-w-[650px] text-[28px] font-extrabold leading-[1.12] tracking-[-0.02em] text-[#111827] sm:text-4xl md:text-5xl lg:text-6xl">
              Cosmetic Surgery & Hair Transplant Clinic in South Delhi
            </h1>
            <p className="mt-4 max-w-[560px] text-[15px] font-medium text-[#4B5563] sm:mt-5 sm:text-base md:text-lg">
              Advanced Hair Restoration, PRP Therapy, Skin, Anti-Aging & Body Contouring Treatments by Dr. Sandeep Bhasin in Chittaranjan Park, New Delhi
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm sm:mt-7 sm:gap-3 sm:px-4 sm:py-3">
              <div className="leading-none text-base tracking-[1px] text-[#FACC15] sm:text-lg">★★★★★</div>
              <div className="text-[13px] font-medium text-[#6B7280] sm:text-[15px]">4.7 rating on</div>
              <Image
                src="/google-icon.png"
                alt="Google"
                width={36}
                height={36}
                className="h-6 w-6 object-contain sm:h-8 sm:w-8"
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3.5">
              <Button href="/services" size="lg" className="hero-primary-cta w-full sm:w-auto">
                Explore Treatments <span aria-hidden="true">→</span>
              </Button>
              <Button href="/cost-estimator" size="lg" variant="outline" className="hero-secondary-cta w-full sm:w-auto">
                Get Cost Estimate
              </Button>
            </div>
          </motion.div>

          <div className="relative hidden lg:block lg:min-h-[min(620px,55svh)]" aria-hidden />
        </div>

        {/* Mobile-only spacer so the figure doesn't crowd the CTAs */}
        <div className="h-[48svh] sm:h-[52svh] lg:hidden" aria-hidden />
      </div>
    </section>
  );
}
