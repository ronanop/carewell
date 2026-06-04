export const PAGE_SECTION_TYPES = {
  pricing: {
    label: "Pricing starting from",
    description: "Starting price, cost factors, EMI note, and what's included.",
  },
  "emi-calculator": {
    label: "EMI calculator",
    description: "Interactive treatment cost EMI planner.",
  },
  candidate: {
    label: "Am I a candidate?",
    description: "Good-fit vs may-not-be-ideal checklist with treatment finder quiz.",
  },
  "how-it-works": {
    label: "How it works",
    description: "Animated step-by-step treatment process.",
  },
  "before-after": {
    label: "Before & after",
    description: "Before/after slider gallery from service or site gallery.",
  },
  faq: {
    label: "FAQ",
    description: "Expandable frequently asked questions.",
  },
  "highlighted-blogs": {
    label: "Highlighted blogs",
    description: "Featured or latest blog article cards.",
  },
} as const;

export type PageSectionType = keyof typeof PAGE_SECTION_TYPES;

export function isPageSectionType(value: string): value is PageSectionType {
  return value in PAGE_SECTION_TYPES;
}

export function pageSectionLabel(type: PageSectionType): string {
  return PAGE_SECTION_TYPES[type].label;
}

export type EmbedSectionBlock = {
  _type: "embedSection";
  _key: string;
  sectionType: PageSectionType;
  serviceSlug?: string | null;
};
