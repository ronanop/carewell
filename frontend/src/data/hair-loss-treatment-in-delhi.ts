export const HAIR_LOSS_TREATMENTS_PATH = "/hair-loss-treatment-in-delhi" as const;

export const HAIR_LOSS_TREATMENTS_SEO = {
  title: "Hair Loss Treatment in Delhi – Cost, PRP & Best Doctors | Care Well Medical Centre",
  description:
    "Best hair loss treatment in Delhi at Care Well Medical Centre, CR Park. PRP, GFC, mesotherapy, LLLT & hair transplants by Dr. Sandeep Bhasin. Book a free consultation.",
} as const;

export const HAIR_LOSS_CLINIC = {
  name: "Care Well Medical Centre",
  location: "CR Park, South Delhi",
  address: "House No. 1, NRI Complex, Chittaranjan Park, Delhi",
  phone: "+91 96679 77499",
  email: "queries@carewellmedicalcentre.in",
} as const;

export const HAIR_LOSS_TREATMENTS_PAGE = {
  h1: "Hair Loss Treatment in Delhi",
  subtitle: "Cost, PRP & Best Doctors",
  tagline:
    "Stop hair fall and regrow natural, healthy hair through safe, proven treatments designed for long-term results at Care Well Medical Centre, CR Park, South Delhi.",
  introHeading: "Overview",
  introParagraphs: [
    "Looking for the best hair loss treatment in Delhi?",
    "At Care Well Medical Centre, we help men and women stop hair fall and regrow natural, healthy hair through safe and proven treatments designed for long-term results.",
  ],
  ledByHeading: "Led By",
  ledByName: "Dr. Sandeep Bhasin",
  ledByCredentials: [
    "Cosmetic Surgeon",
    "25+ Years of Experience",
    "3,000+ Hair Restoration Patients Treated Across Delhi NCR",
  ],
  specialOffer: "10% off on first PRP session (Limited Slots)",
  portfolioHeading: "Hair Loss Treatments We Offer in Delhi",
  whyTrustHeading: "Why Choose Care Well Medical Centre?",
  causesHeading: "Common Causes of Hair Loss",
  norwoodHeading: "Types of Male Hair Loss (Norwood Classification)",
  norwoodVariantNote:
    'Type "A" Variants: Found in Stages II–V — hairline recedes front-to-back with minimal crown loss.',
  otherTypesHeading: "Other Hair Loss Types",
  growthCycleHeading: "Hair Growth Cycle",
  growthCycleNote:
    "Stress, hormones, illness, and nutritional deficiencies can disrupt this cycle, leading to excessive shedding and slow regrowth.",
  whenDoctorHeading: "When Should You See a Doctor?",
  whenDoctorItems: [
    "Hair fall lasting several weeks",
    "Bald patches",
    "Rapid thinning",
    "Widening hair part",
    "Excessive shedding",
  ],
  whenDoctorNote: "Early treatment helps prevent permanent follicle damage.",
  treatmentsHeading: "Hair Loss Treatments Offered",
  nonSurgicalHeading: "1. Non-Surgical Treatments",
  surgicalHeading: "2. Surgical Hair Restoration",
  surgicalIdealHeading: "Ideal Candidates",
  surgicalIdealItems: [
    "Norwood Grade IV or above",
    "Significant baldness",
    "Unsatisfactory response to non-surgical treatments",
    "Looking for permanent results",
  ],
  femaleHeading: "3. Female Hair Loss Treatments",
  femaleConditions: ["Postpartum Hair Loss", "Diffuse Thinning", "PCOS-related Hair Loss"],
  pricingHeading: "Hair Loss Treatment Cost in Delhi",
  pricingIntro: "Transparent pricing with consultation, procedure, aftercare, and follow-up support included.",
  pricingBenefitsHeading: "Additional Benefits",
  pricingBenefits: [
    "No hidden charges",
    "EMI available",
    "Free scalp analysis",
    "Hair transplant packages 15–20% more cost-effective than many Delhi NCR clinics",
  ],
  compareHeading: "Treatment Comparison Chart",
  processHeading: "Treatment Process",
  resultsHeading: "Expected Results Timeline",
  locationsHeading: "Areas Served",
  travelHeading: "Why Patients Travel Here",
  travelReasons: [
    "Proven PRP, GFC & Hair Transplant outcomes",
    "25+ years of expertise",
    "Transparent pricing",
    "Comprehensive aftercare",
    "Easy accessibility",
  ],
  clinicHeading: "Clinic Information",
  hoursHeading: "Opening Hours",
  reviewsHeading: "Patient Reviews Summary",
  reviewsHighlights: [
    "Natural-looking hair transplant results",
    "Professional doctors and staff",
    "Positive patient experiences",
    "Good post-treatment support",
  ],
  appointmentHeading: "Book Your Free Scalp Analysis Today",
  appointmentBody:
    "Whether you need fast, non-surgical results or a permanent transplant, we'll design a plan tailored to your hair loss stage, goals, and budget.",
  faqHeading: "FAQs – Hair Loss Treatment in Delhi",
  treatmentDropdownLabel: "Hair Loss Treatment",
} as const;

export type HairLossTreatmentCard = {
  title: string;
  excerpt: string;
  href: string;
  image: string;
};

function toLocalPath(href: string): string {
  try {
    const pathname = new URL(href).pathname;
    return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  } catch {
    return href;
  }
}

export const HAIR_LOSS_OVERVIEW_TREATMENTS = [
  { treatment: "PRP Therapy", purpose: "Stimulates natural hair regrowth" },
  { treatment: "GFC Treatment", purpose: "Advanced version of PRP with faster results" },
  { treatment: "Mesotherapy", purpose: "Nourishes scalp and strengthens follicles" },
  { treatment: "Low-Level Laser Therapy (LLLT)", purpose: "Reactivates dormant follicles" },
  { treatment: "FUE Hair Transplant", purpose: "Permanent hair restoration" },
  { treatment: "FUT Hair Transplant", purpose: "High-density hair restoration" },
] as const;

export const HAIR_LOSS_WHY_CHOOSE_ROWS = [
  { feature: "Experienced Specialist", details: "Dr. Sandeep Bhasin & trained team" },
  { feature: "Proven Results", details: "3,000+ successful cases" },
  { feature: "Advanced Technology", details: "FDA-certified PRP/GFC systems & advanced FUE" },
  { feature: "Personalized Care", details: "Treatment customized according to hair loss stage" },
  { feature: "Transparent Pricing", details: "No hidden fees" },
  { feature: "EMI Options", details: "Available for procedures" },
] as const;

export const HAIR_LOSS_REPUTATION = [
  { metric: "Google Rating", value: "4.2★" },
  { metric: "Reviews", value: "554 Google Reviews" },
] as const;

export const HAIR_LOSS_CAUSE_ROWS = [
  { cause: "Genetics (Androgenetic Alopecia)", description: "Hair loss due to DHT sensitivity" },
  { cause: "Stress (Telogen Effluvium)", description: "Physical or emotional stress triggers shedding" },
  { cause: "Hormonal Changes", description: "Thyroid disorders, PCOS, menopause" },
  { cause: "Lifestyle Factors", description: "Poor diet, deficiencies, smoking, scalp infections" },
] as const;

export const HAIR_LOSS_NORWOOD_ROWS = [
  { stage: "Stage I", description: "Normal hairline, not true baldness" },
  { stage: "Stage II", description: "Mild temple recession" },
  { stage: "Stage III", description: "First clear stage of baldness" },
  { stage: "Stage III Vertex", description: "Crown thinning begins" },
  { stage: "Stage IV", description: "Larger bald spots front and crown" },
  { stage: "Stage V", description: "Hair bridge begins thinning" },
  { stage: "Stage VI", description: "Hair bridge disappears" },
  { stage: "Stage VII", description: "Only side and back hair remains" },
] as const;

export const HAIR_LOSS_OTHER_TYPE_ROWS = [
  { type: "Diffuse Patterned Alopecia (DPA)", description: "Thinning across top, front, and crown" },
  { type: "Diffuse Unpatterned Alopecia (DUPA)", description: "Uniform thinning including donor area" },
  { type: "Scarring Alopecia (Cicatricial)", description: "Permanent follicle damage due to scarring" },
] as const;

export const HAIR_LOSS_GROWTH_CYCLE_ROWS = [
  { stage: "Anagen", function: "Growth Phase" },
  { stage: "Catagen", function: "Transition Phase" },
  { stage: "Telogen", function: "Resting Phase" },
  { stage: "Exogen", function: "Shedding Phase" },
] as const;

export const HAIR_LOSS_NON_SURGICAL = [
  {
    title: "PRP (Platelet-Rich Plasma) Therapy",
    href: toLocalPath("https://www.carewellmedicalcentre.com/hair-loss-treatment-in-delhi/prp/"),
    rows: [
      { label: "Process", value: "Blood extraction → Platelet concentration → Scalp injection" },
      { label: "Sessions", value: "4–6 monthly sessions" },
      { label: "Results", value: "3–6 months" },
    ],
  },
  {
    title: "GFC (Growth Factor Concentrate)",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/hair-loss-treatment-in-delhi/growth-factor-concentrate/",
    ),
    rows: [
      { label: "Description", value: "Advanced version of PRP" },
      { label: "Sessions", value: "3–4" },
      { label: "Results", value: "2–3 months" },
      { label: "Advantage", value: "Higher growth factor concentration" },
    ],
  },
  {
    title: "Mesotherapy",
    bullets: ["Vitamins", "Peptides", "Amino acids"],
    benefits: ["Nourishes scalp", "Reduces inflammation", "Improves follicle strength"],
  },
  {
    title: "Low-Level Laser Therapy (LLLT)",
    benefits: [
      "Improves blood circulation",
      "Stimulates dormant follicles",
      "Non-invasive",
      "Can be combined with PRP/GFC",
    ],
  },
  {
    title: "Medications",
    rows: [
      { label: "Minoxidil", value: "Hair regrowth" },
      { label: "Finasteride", value: "Reduces hair loss" },
    ],
  },
] as const;

export const HAIR_LOSS_SURGICAL_ROWS = [
  {
    method: "FUE",
    procedure: "Individual follicle extraction",
    recovery: "5–7 days",
    results: "Natural appearance, minimal scars",
  },
  {
    method: "FUT",
    procedure: "Strip method with graft transplantation",
    recovery: "10–14 days",
    results: "Higher density for larger areas",
  },
] as const;

export const HAIR_LOSS_FEMALE_TREATMENT_ROWS = [
  { treatment: "PRP Therapy", purpose: "Natural density improvement" },
  { treatment: "GFC Therapy", purpose: "Accelerated growth" },
  { treatment: "Hormonal Balancing", purpose: "Addresses underlying causes" },
  { treatment: "LLLT", purpose: "Non-invasive scalp stimulation" },
  { treatment: "Mesotherapy", purpose: "Improves scalp health" },
] as const;

export const HAIR_LOSS_TREATMENT_CARDS: HairLossTreatmentCard[] = [
  {
    title: "PRP Hair Treatment",
    excerpt:
      "Platelet-rich plasma therapy stimulates dormant follicles. 4–6 monthly sessions; visible results in 3–6 months.",
    href: toLocalPath("https://www.carewellmedicalcentre.com/hair-loss-treatment-in-delhi/prp/"),
    image:
      "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517864/carewell-media/site/prp/prp-hair-treatment-before-after-results-delhi-care-well-300x158.webp",
  },
  {
    title: "GFC Therapy",
    excerpt:
      "Advanced PRP with higher growth factor concentration. 3–4 sessions; results in 2–3 months.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/hair-loss-treatment-in-delhi/growth-factor-concentrate/",
    ),
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517833/carewell-media/site/gfc/GFC-Hair-Treatment-2.webp",
  },
  {
    title: "Scalp Micropigmentation",
    excerpt: "Cosmetic tattooing for the appearance of fuller hair density.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/hair-loss-treatment-in-delhi/scalp-micropigmentation/",
    ),
    image:
      "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517862/carewell-media/site/prp/prp-hair-loss-treatment-before-and-after-photo-1-min-768x418.webp",
  },
  {
    title: "Female Pattern Baldness",
    excerpt: "PRP, GFC, hormonal balancing, and mesotherapy for women's hair loss.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/hair-loss-treatment-in-delhi/female-pattern-baldness/",
    ),
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517826/carewell-media/site/femaletansplantindelhi/female-hair-transplant-before-after-indian-woman.webp",
  },
  {
    title: "Norwood Baldness Scale",
    excerpt: "Understand stages I–VII and choose PRP/GFC or transplant accordingly.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/hair-loss-treatment-in-delhi/norwood-baldness-scale/",
    ),
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517837/carewell-media/site/images/hair-transplant-baldness-grades.jpg",
  },
  {
    title: "Hair Transplant (FUE & FUT)",
    excerpt: "Permanent restoration for Norwood IV+. FUE or FUT based on your needs.",
    href: "/hair-transplant-in-delhi",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517838/carewell-media/site/images/hair-transplant-before-after-promo.jpg",
  },
];

export const HAIR_LOSS_PRICING_ROWS = [
  { treatment: "PRP Therapy", price: "₹4,000/session", details: "4–6 sessions recommended" },
  { treatment: "GFC Treatment", price: "₹6,000/session", details: "Faster and more concentrated than PRP" },
  { treatment: "Mesotherapy", price: "₹3,500/session", details: "Nutrient-rich scalp injections" },
  { treatment: "LLLT", price: "₹10,000/package", details: "Red light therapy" },
  { treatment: "Hair Transplant (FUE/FUT)", price: "₹40,000 onwards", details: "₹30–₹60 per graft" },
] as const;

export const HAIR_LOSS_COMPARE_ROWS = [
  {
    treatment: "PRP Therapy",
    bestFor: "Mild thinning",
    sessions: "4–6",
    results: "3–6 months",
    cost: "₹4,000/session",
    downtime: "None",
  },
  {
    treatment: "GFC Therapy",
    bestFor: "Active thinning",
    sessions: "3–4",
    results: "2–3 months",
    cost: "₹6,000/session",
    downtime: "None",
  },
  {
    treatment: "Mesotherapy",
    bestFor: "Diffuse thinning",
    sessions: "6–8",
    results: "2–4 months",
    cost: "₹3,500/session",
    downtime: "None",
  },
  {
    treatment: "Hair Transplant (FUE/FUT)",
    bestFor: "Severe baldness",
    sessions: "1 Surgery",
    results: "9–12 months",
    cost: "₹40,000+",
    downtime: "7–10 days",
  },
] as const;

export const HAIR_LOSS_PROCESS_STEPS = [
  {
    title: "Scalp Analysis & Diagnosis",
    description:
      "Detailed scalp examination, root cause identification, and assessment of hormones, lifestyle, and stress factors.",
  },
  {
    title: "Personalized Treatment Plan",
    description: "Customized according to your hair loss stage, goals, and budget.",
  },
  {
    title: "Procedure",
    description: "PRP, GFC, Mesotherapy, LLLT, or FUE/FUT Hair Transplant as per your plan.",
  },
  {
    title: "Aftercare & Follow-Up",
    description: "Regular reviews, scalp care guidance, and progress monitoring.",
  },
] as const;

export const HAIR_LOSS_RESULTS_ROWS = [
  { treatment: "PRP/GFC", visible: "Around 3 months", full: "Around 6 months" },
  { treatment: "Hair Transplant", visible: "3–4 months", full: "9–12 months" },
] as const;

export const HAIR_LOSS_AREAS_SOUTH_DELHI = [
  "Alaknanda",
  "Greater Kailash I & II",
  "Nehru Place",
  "Kalkaji",
] as const;

export const HAIR_LOSS_AREAS_NCR = ["Noida", "Ghaziabad", "Gurgaon / Gurugram"] as const;

export const HAIR_LOSS_OPENING_HOURS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
] as const;

export const HAIR_LOSS_HOURS_TIME = "10:00 AM – 8:00 PM";

export const HAIR_LOSS_TREATMENTS_FAQS: { question: string; answer: string }[] = [
  {
    question: "What is the cost of PRP and hair transplant in Delhi?",
    answer:
      "PRP therapy starts from ₹4,000 per session. Hair transplants start from ₹40,000 (₹30–₹60 per graft). Final cost depends on graft count, technique, and sessions needed.",
  },
  {
    question: "Which is the best hair doctor in Delhi for hair fall?",
    answer:
      "Dr. Sandeep Bhasin is a renowned hair specialist in Delhi with 25+ years of experience and 3,000+ successful cases using PRP, Mesotherapy, GFC, and transplants.",
  },
  {
    question: "Can PRP or Mesotherapy reverse hair loss naturally?",
    answer:
      "Yes. PRP and Mesotherapy trigger dormant follicles, improve scalp blood flow, and strengthen hair roots — ideal for early to moderate thinning without surgery.",
  },
  {
    question: "How long does it take to see visible results?",
    answer:
      "PRP/GFC: visible thickening around 3 months, full results around 6 months. Hair transplant: new growth in 3–4 months, full coverage by 9–12 months.",
  },
  {
    question: "Is PRP better than a transplant for mild thinning?",
    answer:
      "For mild or early thinning, PRP or GFC is ideal as a non-surgical option. Transplants are better for advanced baldness (Norwood IV+) or when other treatments no longer help.",
  },
  {
    question: "What treatments are best for women?",
    answer:
      "Women benefit from PRP, GFC, mesotherapy, hormonal balancing, and LLLT — customised for postpartum shedding, diffuse thinning, or PCOS-related loss after scalp diagnosis.",
  },
  {
    question: "Is a hair transplant painful and safe?",
    answer:
      "Yes — transplants are safe and virtually painless with local anaesthesia and advanced FUE/FUT techniques, ensuring minimal discomfort, fast recovery, and natural permanent outcomes.",
  },
  {
    question: "Do you treat patients from Noida and Gurgaon?",
    answer:
      "Yes. Many patients from Noida, Gurgaon, and across Delhi NCR visit our CR Park clinic for advanced PRP, GFC, and hair transplant treatments.",
  },
];
