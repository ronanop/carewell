import type { PortableTextBlock } from "@portabletext/types";

export type ServiceDoc = {
  title: string;
  slug: { current: string };
  tagline?: string;
  heroImageUrl?: string | null;
  quickFacts?: { label?: string; value?: string }[];
  whatIsBody?: PortableTextBlock[];
  whatIsIllustrationUrl?: string | null;
  insightPoints?: string[];
  howItWorksSteps?: { title?: string; description?: string }[];
  youtubeVideoId?: string;
  beforeAfterCases?: {
    beforeUrl?: string | null;
    afterUrl?: string | null;
    patientInitials?: string;
    age?: number;
    gender?: string;
    monthsPostProcedure?: number;
    subtype?: string;
  }[];
  candidateGood?: string[];
  candidatePoor?: string[];
  pricingFromInr?: number;
  pricingFactors?: string[];
  pricingEmiNote?: string;
  valueStack?: string[];
  faq?: { question?: string; answer?: string }[];
  relatedServices?: { title?: string; slug?: { current?: string } }[];
  treatmentDropdownLabel?: string;
  seo?: { title?: string; description?: string };
};

