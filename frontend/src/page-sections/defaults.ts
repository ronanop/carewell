import type { ServiceDoc } from "@/types/service";

export const DEFAULT_PRICING = {
  pricingFromInr: 40_000,
  pricingFactors: [
    "Treatment area and complexity",
    "Number of sessions or grafts required",
    "Surgeon involvement and technique used",
    "Pre- and post-procedure care included",
  ],
  pricingEmiNote: "0% EMI options available on select partner plans. Final eligibility is confirmed during consultation.",
  valueStack: [
    "Consultation with senior surgeon",
    "Procedure performed at our Delhi centre",
    "Post-procedure follow-up guidance",
  ],
};

export const DEFAULT_CANDIDATE = {
  good: [
    "Stable health with realistic expectations",
    "Concern confirmed during in-clinic assessment",
    "Non-surgical options already considered where relevant",
    "Able to follow pre- and post-care instructions",
  ],
  poor: [
    "Active infection or uncontrolled medical condition",
    "Unrealistic density or outcome expectations",
    "Very early hair loss where medical therapy may be better first",
    "Insufficient donor supply for surgical planning",
  ],
};

export const DEFAULT_HOW_IT_WORKS = [
  {
    title: "Consultation",
    description: "Medical history, examination, and a personalised treatment plan with transparent pricing.",
  },
  {
    title: "Preparation",
    description: "Pre-procedure instructions, consent, and scheduling at our Delhi centre.",
  },
  {
    title: "Procedure",
    description: "Treatment performed by our clinical team with safety protocols and comfort measures.",
  },
  {
    title: "Recovery & follow-up",
    description: "Aftercare guidance and follow-up visits to monitor healing and results.",
  },
];

export const DEFAULT_FAQS: { question: string; answer: string }[] = [
  {
    question: "How do I book a consultation?",
    answer:
      "Use the book consultation form, call our clinic, or message us on WhatsApp. We typically respond within two hours on working days.",
  },
  {
    question: "Are treatment costs fixed online?",
    answer:
      "No. Online ranges are indicative only. Final cost depends on clinical assessment, technique, and personalised planning discussed during consultation.",
  },
  {
    question: "Is EMI available?",
    answer:
      "Yes. EMI and partner finance options may be available for eligible patients. Use the EMI calculator for an estimate and confirm details at consultation.",
  },
];

export function serviceOrDefaults(service: ServiceDoc | null | undefined) {
  return {
    title: service?.title ?? "Treatment",
    pricingFromInr: service?.pricingFromInr ?? DEFAULT_PRICING.pricingFromInr,
    pricingFactors: service?.pricingFactors?.length ? service.pricingFactors : DEFAULT_PRICING.pricingFactors,
    pricingEmiNote: service?.pricingEmiNote ?? DEFAULT_PRICING.pricingEmiNote,
    valueStack: service?.valueStack?.length ? service.valueStack : DEFAULT_PRICING.valueStack,
    candidateGood: service?.candidateGood?.length ? service.candidateGood : DEFAULT_CANDIDATE.good,
    candidatePoor: service?.candidatePoor?.length ? service.candidatePoor : DEFAULT_CANDIDATE.poor,
    howItWorksSteps: service?.howItWorksSteps?.length ? service.howItWorksSteps : DEFAULT_HOW_IT_WORKS,
    faq: service?.faq?.length ? service.faq : DEFAULT_FAQS,
    beforeAfterCases: service?.beforeAfterCases ?? [],
  };
}
