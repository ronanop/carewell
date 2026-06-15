import { HAIR_LOSS_CLINIC, HAIR_LOSS_TREATMENTS_PATH } from "@/data/hair-loss-treatment-in-delhi";

export const PRP_TREATMENT_PATH = "/hair-loss-treatment-in-delhi/prp" as const;

/** PRP treatment page images (Cloudinary). */
export const PRP_IMAGES = {
  hero: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517866/carewell-media/site/prp/prp-treatment-in-delhi-170x170.webp",
    alt: "PRP hair treatment in Delhi at Care Well Medical Centre",
  },
  procedure: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517860/carewell-media/site/prp/Procedure-for-PRP-Treatment-For-Hair-loss-300x300.webp",
    alt: "Step-by-step procedure for PRP treatment for hair loss",
  },
  beforeAfter: [
    {
      src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517865/carewell-media/site/prp/prp-hair-treatment-before-after-results-delhi-care-well-768x403.webp",
      alt: "PRP hair treatment before and after results — Care Well Medical Centre, Delhi",
      caption: "PRP results at Care Well Medical Centre",
    },
    {
      src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517862/carewell-media/site/prp/prp-hair-loss-treatment-before-and-after-photo-1-min-768x418.webp",
      alt: "PRP hair loss treatment before and after photo",
      caption: "Before and after PRP therapy",
    },
    {
      src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517863/carewell-media/site/prp/prp-hair-loss-treatment-before-and-after-results-carewellmedicalcentre-300x158.webp",
      alt: "PRP hair loss treatment before and after results",
      caption: "Hair density improvement after PRP",
    },
    {
      src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517864/carewell-media/site/prp/prp-hair-treatment-before-after-results-delhi-care-well-300x158.webp",
      alt: "PRP hair treatment before and after — Delhi",
      caption: "Patient outcome after PRP sessions",
    },
  ],
} as const;

export const PRP_TREATMENT_SEO = {
  title: "PRP Hair Treatment in Delhi for Hair Loss & Natural Regrowth | Care Well",
  description:
    "PRP hair treatment in Delhi at Care Well Medical Centre, CR Park. Safe, non-surgical platelet-rich plasma therapy for natural hair regrowth by Dr. Sandeep Bhasin.",
} as const;

export const PRP_PAGE = {
  h1: "PRP Hair Treatment in Delhi",
  subtitle: "For Hair Loss & Natural Regrowth",
  tagline:
    "Safe, non-surgical hair restoration using your body's own platelets to reactivate dormant follicles and improve hair density.",
  introHeading: "How PRP Therapy Helps Rebuild Thinning Hair Naturally",
  introParagraphs: [
    "If you are searching for PRP Hair Treatment in Delhi, you are not alone. Hair loss affects both men and women due to stress, hormonal imbalances, nutritional deficiencies, lifestyle habits, and genetics.",
    "At Care Well Medical Centre, we offer advanced Platelet-Rich Plasma (PRP) Therapy — a safe and non-surgical treatment designed to stimulate natural hair growth using your body's own healing components.",
    "Unlike traditional treatments, PRP uses concentrated platelets from your own blood to reactivate dormant hair follicles, improve scalp health, and increase hair density.",
  ],
  whyPopularHeading: "Why PRP is Popular",
  whyPopularItems: [
    "Non-surgical treatment",
    "Uses your own blood platelets",
    "Suitable for men and women",
    "Minimal discomfort",
    "No downtime",
    "Natural hair regrowth stimulation",
    "Improves hair thickness and density",
  ],
  whatIsHeading: "What is PRP Hair Treatment?",
  whatIsSubheading: "Understanding Platelet-Rich Plasma (PRP)",
  whatIsBody:
    "PRP (Platelet-Rich Plasma) Therapy is a regenerative medical procedure that utilizes concentrated platelets from your own blood to stimulate weak or inactive hair follicles.",
  howItWorksSteps: [
    "A small sample of blood is collected.",
    "The blood is processed using a centrifuge machine.",
    "Platelet-rich plasma is separated from other blood components.",
    "The concentrated plasma is injected into areas of hair thinning.",
  ],
  growthFactorsBenefits: [
    "Repair damaged follicles",
    "Improve blood circulation",
    "Stimulate dormant follicles",
    "Strengthen existing hair",
    "Promote new hair growth",
  ],
  whyWorksHeading: "Why PRP Works",
  whyChooseHeading: "Why Choose Care Well Medical Centre for PRP Hair Treatment?",
  whyChooseIntro:
    "At Care Well Medical Centre, we focus on delivering evidence-based and personalized hair restoration solutions.",
  ledByName: "Dr. Sandeep Bhasin",
  ledByCredentials: [
    "Experienced Cosmetic Surgeon",
    "Hair Restoration Specialist",
    "Thousands of successful treatments",
  ],
  differentHeading: "What Makes Us Different?",
  candidateHeading: "Is PRP Hair Treatment Right for You?",
  idealHeading: "Ideal Candidates",
  idealIntro: "You may be a suitable candidate if:",
  idealItems: [
    "You have early-stage hair thinning",
    "You suffer from male pattern baldness",
    "You suffer from female pattern baldness",
    "You want to improve transplant results",
    "Your follicles are weak but still present",
    "You want a non-surgical solution",
    "You are generally healthy",
  ],
  avoidHeading: "Who Should Avoid PRP?",
  avoidIntro: "PRP may not be suitable if you have:",
  avoidItems: [
    "Complete baldness",
    "Severe follicular destruction",
    "Alopecia Areata (certain autoimmune forms)",
    "Blood disorders",
    "Low platelet count",
    "Chronic liver disease",
    "Active infections",
    "Use of blood-thinning medications",
  ],
  avoidNote: "A detailed consultation helps determine whether PRP is the right treatment option for you.",
  procedureHeading: "Step-by-Step PRP Hair Treatment Procedure",
  sessionHeading: "Treatment Duration & Sessions",
  beforeHeading: "Before PRP Treatment",
  beforeRecommended: [
    "Drink plenty of water",
    "Eat a light meal before treatment",
    "Wash your hair thoroughly",
    "Share complete medical history",
    "Complete blood tests if recommended",
  ],
  beforeAvoid: [
    "Smoking",
    "Alcohol",
    "Heavy exercise",
    "Excessive sun exposure",
    "Hair oils and styling products",
    "Fasting",
  ],
  afterHeading: "Post-PRP Recovery & Care",
  afterRecommended: [
    "Rest for 24 hours",
    "Stay hydrated",
    "Use prescribed shampoo",
    "Follow doctor instructions",
    "Attend follow-up appointments",
  ],
  afterAvoid: [
    "Touching treated area",
    "Washing hair for 24 hours",
    "Sauna or steam exposure",
    "Heavy exercise for 48 hours",
    "Hair dyes and chemicals for 3–5 days",
    "Anti-inflammatory medications unless prescribed",
  ],
  expectHeading: "What to Expect After PRP?",
  costHeading: "PRP Hair Treatment Cost in Delhi",
  costIntro: "The cost depends on severity of hair loss, number of sessions, PRP technology used, and additional therapies recommended.",
  includedHeading: "What's Included?",
  includedItems: [
    "Hair loss assessment",
    "Scalp analysis",
    "Customized treatment plan",
    "PRP sessions",
    "Medical supervision",
    "Sterile treatment environment",
    "Follow-up guidance",
  ],
  resultsHeading: "PRP Hair Treatment Before & After Results",
  resultsIntro:
    "Real patient outcomes after 3 to 4 PRP sessions at Care Well Medical Centre, Delhi, under Dr. Sandeep Bhasin.",
  benefitsHeading: "Benefits of PRP Hair Treatment",
  evidenceHeading: "Clinical Evidence Supporting PRP",
  evidenceBody:
    "Research has demonstrated positive outcomes for PRP therapy in androgenetic alopecia. PRP works by utilizing the body's natural healing mechanisms to stimulate follicular regeneration.",
  locationHeading: "Clinic Location & Contact Information",
  trustHeading: "Why Patients Trust Care Well Medical Centre",
  appointmentHeading: "Book Your PRP Hair Consultation Today",
  appointmentBody:
    "Take the first step toward healthier, thicker hair with a customized PRP treatment plan designed specifically for your hair loss condition.",
  treatmentDropdownLabel: "PRP Hair Treatment",
  parentLabel: "Hair Loss Treatment in Delhi",
  parentPath: HAIR_LOSS_TREATMENTS_PATH,
} as const;

export { HAIR_LOSS_CLINIC as PRP_CLINIC };

export const PRP_WHY_WORKS_ROWS = [
  { benefit: "Follicle Stimulation", result: "Reactivates dormant follicles" },
  { benefit: "Improved Blood Flow", result: "Better nutrient supply to roots" },
  { benefit: "Growth Factors", result: "Encourages natural regrowth" },
  { benefit: "Scalp Rejuvenation", result: "Healthier scalp environment" },
  { benefit: "Autologous Treatment", result: "No allergy or rejection risk" },
] as const;

export const PRP_DIFFERENT_ROWS = [
  { feature: "Expert-Led Treatment", benefit: "Direct supervision by Dr. Sandeep Bhasin" },
  { feature: "Advanced Technology", benefit: "Double-spin centrifuge system" },
  { feature: "Personalized Protocols", benefit: "Customized according to scalp condition" },
  { feature: "Sterile Environment", benefit: "Strict clinical safety standards" },
  { feature: "Same-Day Recovery", benefit: "Return to routine immediately" },
  { feature: "Transparent Pricing", benefit: "No hidden charges" },
] as const;

export const PRP_PROCEDURE_STEPS = [
  {
    title: "Consultation & Diagnosis",
    description:
      "Hair loss pattern assessment, medical history review, scalp analysis, and suitability determination.",
  },
  {
    title: "Blood Collection",
    description: "A small quantity of blood is drawn from your arm — approximately 5 minutes.",
  },
  {
    title: "Plasma Separation",
    description:
      "Blood is processed in a medical centrifuge to separate red blood cells, white blood cells, and platelet-rich plasma.",
  },
  {
    title: "PRP Activation",
    description:
      "PRP is activated to release growth factors, healing proteins, and regenerative signals that stimulate dormant follicles.",
  },
  {
    title: "Scalp Numbing",
    description: "Local anesthetic is applied for maximum comfort during injections.",
  },
  {
    title: "PRP Injection",
    description:
      "Activated PRP is injected into thinning areas using very fine needles. Mild redness may resolve within 24–48 hours.",
  },
  {
    title: "Post-Treatment Care",
    description: "Most patients return to work immediately with minimal downtime.",
  },
] as const;

export const PRP_BLOOD_COMPONENT_ROWS = [
  { component: "Red Blood Cells", function: "Oxygen transport" },
  { component: "White Blood Cells", function: "Immune response" },
  { component: "Platelet-Rich Plasma", function: "Hair follicle stimulation" },
] as const;

export const PRP_SESSION_ROWS = [
  { parameter: "Session Duration", details: "30–60 Minutes" },
  { parameter: "Initial Sessions", details: "3–4 Sessions" },
  { parameter: "Gap Between Sessions", details: "4–6 Weeks" },
  { parameter: "Maintenance Sessions", details: "Every 4–6 Months" },
] as const;

export const PRP_MEDICATION_ROWS = [
  { type: "Painkillers", examples: "Aspirin, Ibuprofen, Diclofenac" },
  { type: "Blood Thinners", examples: "Warfarin, Clopidogrel" },
  { type: "Steroids", examples: "Corticosteroids" },
  { type: "Supplements", examples: "Vitamin E, Omega-3" },
] as const;

export const PRP_EXPECT_ROWS = [
  { symptom: "Mild Redness", duration: "1–2 Days" },
  { symptom: "Slight Swelling", duration: "1–2 Days" },
  { symptom: "Tenderness", duration: "1–2 Days" },
] as const;

export const PRP_COST_ROWS = [
  { detail: "Per Session Cost", info: "₹7,000 – ₹10,000" },
  { detail: "Recommended Sessions", info: "3–4 Sessions" },
  { detail: "Session Interval", info: "Every 4–6 Weeks" },
  { detail: "Maintenance Session", info: "Every 6 Months" },
  { detail: "Technology Used", info: "Double-Spin Centrifuge" },
  { detail: "Package Cost (3 Sessions)", info: "₹20,000 – ₹27,000 Approx." },
] as const;

export const PRP_RESULTS_TIMELINE = [
  { phase: "After 1 Session", outcome: "Reduced hair shedding" },
  { phase: "After 2–3 Sessions", outcome: "Improved hair thickness and increased density" },
  { phase: "After 3–4 Sessions", outcome: "Stronger hair growth, better scalp coverage, healthier follicles" },
] as const;

export const PRP_GROWTH_BENEFITS = [
  "Stimulates natural hair regrowth",
  "Strengthens weak follicles",
  "Improves scalp circulation",
  "Increases hair density",
  "Reduces hair fall",
] as const;

export const PRP_TREATMENT_BENEFITS = [
  "Non-surgical",
  "No downtime",
  "Minimal discomfort",
  "Safe and natural",
  "No allergy risk",
  "Quick procedure",
  "Suitable for men and women",
] as const;

export const PRP_EVIDENCE_BENEFITS = [
  "Reduced hair fall",
  "Improved follicle activity",
  "Increased density",
  "High patient satisfaction",
  "Minimal side effects",
] as const;

export const PRP_TRUST_ITEMS = [
  "Expert supervision by Dr. Sandeep Bhasin",
  "Advanced PRP technology",
  "Personalized treatment plans",
  "Transparent pricing",
  "Minimal downtime",
  "Thousands of satisfied patients",
  "Focus on long-term hair restoration",
] as const;

export const PRP_NEARBY = {
  metro: "Govindpuri Metro Station (Violet Line) — approximately 5 minutes by auto or cab.",
  landmarks: ["Kalkaji Mandir", "Alaknanda Market", "NRI Colony Gate"],
  parking: ["Roadside parking available", "Nearby colony parking available"],
} as const;

export const PRP_TREATMENTS_FAQS: { question: string; answer: string }[] = [
  {
    question: "How much does PRP hair treatment cost in Delhi?",
    answer:
      "PRP typically costs ₹7,000–₹10,000 per session at Care Well Medical Centre. A package of 3 sessions is approximately ₹20,000–₹27,000 depending on your plan.",
  },
  {
    question: "How many PRP sessions are needed for hair regrowth?",
    answer:
      "Most patients need 3–4 initial sessions spaced 4–6 weeks apart, followed by maintenance sessions every 4–6 months.",
  },
  {
    question: "Is PRP painful?",
    answer:
      "PRP involves minimal discomfort. Local anesthetic is applied before scalp injections, and most patients tolerate the procedure well.",
  },
  {
    question: "When will I see results from PRP?",
    answer:
      "Reduced shedding may appear after the first session. Visible thickness improvements usually develop after 2–3 sessions, with stronger growth after 3–4 sessions.",
  },
  {
    question: "Can women undergo PRP for hair loss?",
    answer:
      "Yes. PRP is suitable for both men and women with early thinning, pattern baldness, or weak follicles that are still active.",
  },
];
