/* eslint-disable @typescript-eslint/no-explicit-any */
type PortableTextBlock = any;

/** Fallback content when Sanity has no documents — remove once CMS is populated. */
export const DEMO_SERVICE_SLUG = "sample-hair-transplant";

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

export function getDemoService(): ServiceDoc {
  const plain: PortableTextBlock[] = [
    {
      _type: "block",
      _key: "b1",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "s1", text: "Hair transplant at Care Well uses follicular unit techniques tailored to your hair type, donor density, and goals. We focus on natural hairlines, graft survival, and long-term planning—not quick fixes.", marks: [] }],
    },
  ];

  return {
    title: "Hair transplant",
    slug: { current: DEMO_SERVICE_SLUG },
    tagline: "Natural density. Honest graft planning. Delhi NCR trusted team.",
    quickFacts: [
      { label: "Procedure time", value: "4–8 hours" },
      { label: "Recovery", value: "7–10 days social downtime" },
      { label: "Anaesthesia", value: "Local" },
      { label: "Pain (typical)", value: "Mild, managed with meds" },
      { label: "Results timeline", value: "6–12 months" },
    ],
    whatIsBody: plain,
    insightPoints: [
      "Your donor area is finite—planning matters.",
      "Density expectations should match biology.",
      "Post-op care drives graft survival.",
    ],
    howItWorksSteps: [
      { title: "Consultation", description: "Goals, medical review, candidacy." },
      { title: "Assessment", description: "Donor check, hairline design." },
      { title: "Procedure", description: "Graft harvest and placement." },
      { title: "Recovery", description: "Washing protocol and reviews." },
      { title: "Results", description: "Shedding, regrowth, refinement." },
    ],
    youtubeVideoId: "dQw4w9WgXcQ",
    beforeAfterCases: [],
    candidateGood: ["Stable hair loss pattern", "Healthy donor", "Realistic expectations"],
    candidatePoor: ["Active uncontrolled alopecia areata", "Unrealistic density demands"],
    pricingFromInr: 45000,
    pricingFactors: ["Technique (FUE/FUT)", "Graft count", "Complexity of hairline"],
    pricingEmiNote: "0% EMI partners available for eligible patients—discuss during consult.",
    valueStack: ["Surgeon-led planning", "Sterile OT protocols", "Written aftercare pack"],
    faq: [
      { question: "Is hair transplant painful?", answer: "You’ll be awake with local anaesthesia; most patients report pressure more than pain." },
      { question: "When can I gym?", answer: "Usually after 2–3 weeks—your doctor will confirm based on healing." },
      { question: "How many grafts do I need?", answer: "Depends on zone size and donor density—only an in-person assessment is accurate." },
      { question: "Will it look natural?", answer: "We design hairlines for age, face shape, and future loss patterns." },
      { question: "What is shock loss?", answer: "Temporary shedding around transplanted hairs is common and usually self-limits." },
      { question: "Can women have transplant?", answer: "Yes in select cases after diagnosing the cause of hair thinning." },
      { question: "How long is recovery?", answer: "Most people resume desk work in a few days; redness settles over 1–2 weeks." },
      { question: "Do you offer PRP?", answer: "Yes—often combined as adjunct therapy where appropriate." },
      {
        question: "How to book at Care Well?",
        answer: "Call our Chittaranjan Park clinic or WhatsApp us for a free consultation slot. Address: South Delhi (see contact page).",
      },
    ],
    relatedServices: [
      { title: "PRP for hair", slug: { current: "prp-hair" } },
      { title: "Beard transplant", slug: { current: "beard-transplant" } },
      { title: "Eyebrow transplant", slug: { current: "eyebrow-transplant" } },
    ],
    treatmentDropdownLabel: "Hair transplant",
    seo: {
      title: "Hair Transplant in Delhi | Natural Results | Care Well",
      description: "Hair transplant in Delhi at Care Well Medical Centre — consultation, candidacy, pricing ranges, and recovery. Book a free slot.",
    },
  };
}
