"use client";

import { HowItWorksStepsAnimated } from "@/components/services/HowItWorksStepsAnimated";
import { serviceOrDefaults } from "@/page-sections/defaults";
import type { ServiceDoc } from "@/types/service";

export function HowItWorksSection({ service }: { service?: ServiceDoc | null }) {
  const data = serviceOrDefaults(service ?? null);

  return (
    <section className="my-12 rounded-2xl border border-surface bg-white p-6 md:p-8">
      <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">How it works</h2>
      <div className="mt-8">
        <HowItWorksStepsAnimated steps={data.howItWorksSteps} />
      </div>
    </section>
  );
}
