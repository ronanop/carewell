"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { HOW_IT_WORKS_STEPS } from "@/data/homepage";

const transition = {
  duration: 0.5,
  ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
};

export function HowItWorks() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className="relative overflow-hidden py-section-mobile lg:py-section-desktop"
      aria-labelledby="how-it-works-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/how-it-works-bg.jpg)" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-background/85" />
      <div className="relative z-10 container">
        <motion.h2
          id="how-it-works-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 font-heading text-display-sm text-navy text-balance sm:mb-12 sm:text-display-md"
        >
          How Care Well Medical Centre Works
        </motion.h2>

        <div
          className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:max-h-[520px] lg:flex-row"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const hasActiveHover = hoveredIndex !== null;
            const isHovered = hoveredIndex === index;
            const flexValue = isHovered ? 3 : hasActiveHover ? 0.8 : 1;

            return (
              <motion.article
                key={step.id}
                onMouseEnter={() => setHoveredIndex(index)}
                animate={{ flex: flexValue }}
                transition={transition}
                className="group relative h-[240px] cursor-pointer overflow-hidden rounded-3xl shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover sm:h-[300px] lg:h-auto lg:min-h-[420px] lg:flex-1"
              >
                <ImageWithFallback
                  src={step.image}
                  alt={step.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-heading-md font-bold leading-tight text-white lg:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-[38ch] text-body-sm leading-relaxed text-white/90">{step.description}</p>
                    </div>

                    {step.hasButton && step.buttonHref ? (
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          y: isHovered ? 0 : 8,
                          scale: isHovered ? 1 : 0.9,
                        }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="shrink-0"
                      >
                        <Link
                          href={step.buttonHref}
                          aria-label="Go to skin scan"
                          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy shadow-lg"
                        >
                          <ArrowRight size={20} />
                        </Link>
                      </motion.div>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
