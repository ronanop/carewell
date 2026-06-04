import type { ResolvedEmbedSection } from "@carewell/backend/lib/cms/embed-sections";
import { BeforeAfterSection } from "@/components/page-sections/BeforeAfterSection";
import { CandidateSection } from "@/components/page-sections/CandidateSection";
import { EmiCalculatorSection } from "@/components/page-sections/EmiCalculatorSection";
import { FaqSection } from "@/components/page-sections/FaqSection";
import { HighlightedBlogsSection } from "@/components/page-sections/HighlightedBlogsSection";
import { HowItWorksSection } from "@/components/page-sections/HowItWorksSection";
import { PricingSection } from "@/components/page-sections/PricingSection";
import { serviceOrDefaults } from "@/page-sections/defaults";
import type { PageSectionType } from "@/page-sections/registry";

export function EmbedSectionRenderer({
  sectionType,
  resolved,
}: {
  sectionType: PageSectionType;
  resolved?: ResolvedEmbedSection;
}) {
  const service = resolved?.service ?? null;
  const data = serviceOrDefaults(service);

  switch (sectionType) {
    case "pricing":
      return <PricingSection service={service} />;
    case "emi-calculator":
      return <EmiCalculatorSection />;
    case "candidate":
      return <CandidateSection service={service} />;
    case "how-it-works":
      return <HowItWorksSection service={service} />;
    case "before-after": {
      const cases = data.beforeAfterCases.length ? data.beforeAfterCases : (resolved?.galleryCases ?? []);
      return <BeforeAfterSection cases={cases} />;
    }
    case "faq":
      return <FaqSection service={service} />;
    case "highlighted-blogs":
      return <HighlightedBlogsSection posts={resolved?.blogs ?? []} />;
    default:
      return null;
  }
}
