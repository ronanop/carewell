import type { PortableTextBlock } from "@portabletext/types";
import type { ServiceDoc } from "@/lib/demo-service";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapSanityService(raw: any): ServiceDoc {
  return {
    title: raw.title,
    slug: raw.slug ?? { current: "" },
    tagline: raw.tagline,
    heroImageUrl: raw.heroImageUrl,
    quickFacts: raw.quickFacts,
    whatIsBody: raw.whatIsBody as PortableTextBlock[] | undefined,
    whatIsIllustrationUrl: raw.whatIsIllustrationUrl,
    insightPoints: raw.insightPoints,
    howItWorksSteps: raw.howItWorksSteps,
    youtubeVideoId: raw.youtubeVideoId,
    beforeAfterCases: raw.beforeAfterCases,
    candidateGood: raw.candidateGood,
    candidatePoor: raw.candidatePoor,
    pricingFromInr: raw.pricingFromInr,
    pricingFactors: raw.pricingFactors,
    pricingEmiNote: raw.pricingEmiNote,
    valueStack: raw.valueStack,
    faq: raw.faq,
    relatedServices: raw.relatedServices,
    treatmentDropdownLabel: raw.treatmentDropdownLabel,
    seo: raw.seo,
  };
}
