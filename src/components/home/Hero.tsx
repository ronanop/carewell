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
    <section className="relative min-h-[680px] overflow-hidden bg-[#f3efe8] pt-24 lg:h-[100svh] lg:pt-20" aria-label="Care Well hero">
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
      {/* Figure: cover + bottom anchor removes letterboxing gap; block/leading-none avoids img baseline gap */}
      <div className="pointer-events-none absolute inset-0 z-[8] flex items-end justify-end leading-none">
        <div className="relative h-[min(92svh,900px)] max-h-full w-[min(100%,720px)] shrink-0 origin-bottom-right scale-[1.188] md:h-[min(90svh,920px)] md:w-[min(100%,820px)] lg:w-[min(100%,900px)]">
          <Image
            src="/hero-figure.png"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 900px"
            className="!block object-cover object-right object-bottom"
            aria-hidden
          />
        </div>
      </div>
      <div className="absolute inset-0 z-[7] bg-gradient-to-r from-white/85 via-white/40 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[680px] w-full max-w-[1200px] flex-col justify-end px-6 pb-5 lg:h-full lg:min-h-0 lg:justify-center lg:px-6 lg:pb-0 lg:pt-0">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_minmax(0,0.95fr)]">
          <motion.div className="lg:-mt-[30%]" transition={{ duration: 0.5 }} {...fadeUp}>
            <h1 className="mt-5 max-w-[650px] text-4xl font-extrabold leading-[1.1] tracking-[-0.02em] text-[#111827] md:text-5xl lg:text-6xl">
              Cosmetic Surgery & Hair Transplant Clinic in South Delhi
            </h1>
            <p className="mt-5 max-w-[560px] text-base font-medium text-[#4B5563] md:text-lg">
              Advanced Hair Restoration, PRP Therapy, Skin, Anti-Aging & Body Contouring Treatments by Dr. Sandeep Bhasin in Chittaranjan Park, New Delhi
            </p>

            <div className="mt-7 inline-flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm">
              <div className="leading-none text-[#FACC15] text-lg tracking-[1px]">★★★★★</div>
              <div className="text-[15px] font-medium text-[#6B7280]">4.7 rating on</div>
              <Image
                src="/google-icon.png"
                alt="Google"
                width={36}
                height={36}
                className="h-8 w-8 object-contain"
              />
            </div>

            <div className="mt-8 flex flex-wrap gap-3.5">
              <Button href="/services" size="lg" className="hero-primary-cta">
                Explore Treatments <span aria-hidden="true">→</span>
              </Button>
              <Button href="/cost-estimator" size="lg" variant="outline" className="hero-secondary-cta">
                Get Cost Estimate
              </Button>
            </div>

          </motion.div>

          <div className="relative hidden min-h-[min(340px,40svh)] lg:block lg:min-h-[min(620px,55svh)]" aria-hidden />
        </div>
      </div>
    </section>
  );
}
