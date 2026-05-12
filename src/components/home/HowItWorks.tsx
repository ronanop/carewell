"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const steps = [
  {
    id: 1,
    title: "1. Book Virtual Consultation",
    description:
      "Virtual access to top Dermats & receive expert guidance, personalized treatment plans",
    image:
      "https://images.unsplash.com/photo-1612944095914-33fd0a85fcfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkZXJtYXRvbG9naXN0JTIwc21pbGluZ3xlbnwxfHx8fDE3NzcyMDEwNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasButton: false,
  },
  {
    id: 2,
    title: "2. Analyze My Skin",
    description:
      "AI Powered analysis to identify your concerns and find the right treatment",
    image:
      "https://images.unsplash.com/photo-1711907100068-74197cb01c23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGZhY2UlMjBzY2FubmluZyUyMEFJfGVufDF8fHx8MTc3NzIwMTA3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasButton: true,
  },
  {
    id: 3,
    title: "3. Book your Treatment",
    description: "Dermatologist-designed regimens powered by your skin profile",
    image:
      "https://images.unsplash.com/photo-1629697776809-f37ceac39e77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kJTIwaG9sZGluZyUyMHNtYXJ0cGhvbmUlMjBhcHB8ZW58MXx8fHwxNzc3MjAxMDc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasButton: false,
  },
  {
    id: 4,
    title: "4. Meet Your Therapist",
    description:
      "Certified therapists deliver treatments that are safe, effective and results driven",
    image:
      "https://images.unsplash.com/photo-1739300293388-ddbe4b4cb1f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHRhbGtpbmclMjBjbGluaWMlMjBjb3VjaHxlbnwxfHx8fDE3NzcyMDEwNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasButton: false,
  },
];

const transition = {
  duration: 0.5,
  ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
};

export function HowItWorks() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-16 font-sans sm:py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/how-it-works-bg.jpg)" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#FAFBFE]/85" />
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 text-2xl font-bold tracking-tight text-[#0A2E52] sm:mb-12 sm:text-3xl lg:text-[40px]"
        >
          How Care Well Works
        </motion.h2>

        <div
          className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:h-[540px] lg:flex-row"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {steps.map((step, index) => {
            const hasActiveHover = hoveredIndex !== null;
            const isHovered = hoveredIndex === index;
            const flexValue =
              isHovered ? 3
              : hasActiveHover ? 0.8
              : 1;

            return (
              <motion.article
                key={step.id}
                onMouseEnter={() => setHoveredIndex(index)}
                animate={{ flex: flexValue }}
                transition={transition}
                className="group relative h-[260px] cursor-pointer overflow-hidden rounded-3xl shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] sm:h-[320px] lg:h-auto lg:flex-1"
              >
                <ImageWithFallback
                  src={step.image}
                  alt={step.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-white text-[22px] lg:text-2xl font-bold leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-white/90 text-[15px] mt-2 max-w-[38ch] leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {step.hasButton && (
                      <motion.button
                        type="button"
                        aria-label="Go to Analyze My Skin"
                        initial={false}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          y: isHovered ? 0 : 8,
                          scale: isHovered ? 1 : 0.9,
                        }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="shrink-0 h-12 w-12 rounded-full bg-white text-[#0A2E52] inline-flex items-center justify-center shadow-lg pointer-events-none"
                      >
                        <ArrowRight size={20} />
                      </motion.button>
                    )}
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
