import { SKIN_CLINIC, SKIN_TREATMENTS_PATH } from "@/data/skin-treatments-in-delhi";

export const SKIN_WHITENING_PATH = "/skin-treatments-in-delhi/skin-whitening" as const;

export const SKIN_WHITENING_IMAGES = {
  hero: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg",
    alt: "Skin whitening before and after results — Indian patient",
  },
  heroGlow: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg",
    alt: "Glowing skin transformation banner",
  },
  causes: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517800/carewell-media/site/demo/ai-skin-scan-v2.jpg", alt: "Causes of skin pigmentation infographic" },
  whyChoose: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519836/carewell-media/cms/d8050da0719725a6_smi1gb.jpg", alt: "Skin brightening transformation" },
  technologies: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "Advanced skin whitening technologies" },
  assessment: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517799/carewell-media/site/demo/about-us-consultation.jpg", alt: "Skin assessment consultation" },
  comparison: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg", alt: "Skin whitening treatment comparison chart" },
  permanent: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519737/carewell-media/cms/10d9d4d7a6884495_rwhhdj.png", alt: "Long-term skin whitening results" },
  cost: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "Skin whitening cost breakdown" },
  benefits: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517800/carewell-media/site/demo/ai-skin-scan-v2.jpg", alt: "Benefits of skin whitening infographic" },
  safety: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg", alt: "Treatment safety illustration" },
  eligibility: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517799/carewell-media/site/demo/about-us-consultation.jpg", alt: "Treatment eligibility checklist" },
  procedures: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "Skin whitening procedure overview" },
  clinic: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517796/carewell-media/site/beardtranplantindelhi/care-well-medical-centre-delhi-clinic-exterior-1.webp",
    alt: "Modern clinic and skin specialists",
  },
  drBhasin: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517806/carewell-media/site/demo/doctor-profile-feature-vertical.png", alt: "Dr. Sandeep Bhasin professional portrait" },
  ctaBanner: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "Book skin whitening consultation" },
  gallery: [
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "Skin whitening before and after", caption: "Before & after result" },
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519836/carewell-media/cms/d8050da0719725a6_smi1gb.jpg", alt: "Facial brightening", caption: "Facial brightening" },
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg", alt: "Pigmentation reduction", caption: "Pigmentation reduction" },
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519737/carewell-media/cms/10d9d4d7a6884495_rwhhdj.png", alt: "Full body whitening progress", caption: "Full body progress" },
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517800/carewell-media/site/demo/ai-skin-scan-v2.jpg", alt: "Glutathione therapy outcome", caption: "Glutathione therapy" },
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517803/carewell-media/site/demo/carewell-clinic-exterior.jpg", alt: "Laser skin brightening", caption: "Laser brightening" },
  ],
} as const;

export const SKIN_WHITENING_SEO = {
  title: "Skin Whitening Treatment in Delhi | Care Well Medical Centre",
  description:
    "Skin whitening treatment in Delhi at Care Well Medical Centre. IV glutathione, Q-Switch laser, peels & more for Indian skin. Safe, dermatologist-guided care.",
} as const;

export const SKIN_WHITENING_PAGE = {
  h1: "Skin Whitening Treatment in Delhi – Safe, Effective & Dermatologist-Guided Solutions",
  subtitle: "Achieve Brighter, Even-Toned Skin with Advanced Skin Whitening Treatments",
  introQuestion: "Want to reduce pigmentation, tanning, dullness, or uneven skin tone?",
  introBody:
    "At Care Well Medical Centre, we offer advanced Skin Whitening Treatment in Delhi using medical-grade technologies designed specifically for Indian skin tones.",
  goals: [
    "Facial skin brightening",
    "Full body skin whitening",
    "Pigmentation reduction",
    "Tan removal",
    "Melasma treatment",
    "Long-term skin rejuvenation",
  ],
  introClosing:
    "Our customized treatment plans help deliver safe, visible, and long-lasting results.",
  whyChoose: [
    "Suitable for all skin types",
    "FDA-Approved Technologies",
    "Customized Treatment Plans",
    "Trusted by 1000+ Patients",
    "Advanced Laser & Glutathione Treatments",
  ],
  causesHeading: "What Causes Skin Darkening & Uneven Skin Tone?",
  causesIntro: "Several factors contribute to skin darkening and pigmentation.",
  causesList: [
    "Sun exposure",
    "Pollution",
    "Hormonal imbalance",
    "Stress",
    "Melasma",
    "Acne marks",
    "Aging",
    "Lifestyle habits",
  ],
  causesEffects: ["Dull skin", "Uneven skin tone", "Dark spots", "Pigmentation", "Tanning"],
  whyTreatmentHeading: "Why People Choose Skin Whitening Treatments",
  whyTreatmentNote:
    "At Care Well Medical Centre, our treatments target the root causes of pigmentation rather than providing temporary surface-level improvements.",
  typesHeading: "Types of Skin Whitening Treatments in Delhi",
  chooseHeading: "How to Choose the Right Skin Whitening Treatment",
  comparisonHeading: "Skin Whitening Treatment Comparison",
  permanentHeading: "Is Permanent Skin Whitening Possible?",
  permanentQuestion: "Are skin whitening results permanent?",
  permanentIntro:
    "While no treatment can permanently change your natural skin tone forever, advanced treatments can provide long-lasting improvements.",
  costHeading: "Skin Whitening Treatment Cost in Delhi",
  packageNote: "Full Body Skin Whitening Packages: ₹40,000 – ₹1,00,000+",
  packageFactors: [
    "Skin condition",
    "Pigmentation severity",
    "Number of sessions",
    "Combination treatments",
  ],
  benefitsHeading: "Benefits of Skin Whitening Treatments",
  sideEffectsHeading: "Possible Side Effects",
  sideEffectsNote: "Most side effects resolve within a few days.",
  avoidHeading: "Who Should Avoid Skin Whitening Treatments?",
  avoidNote: "A consultation helps determine suitability.",
  advancedHeading: "Advanced Skin Whitening Procedures at Care Well Medical Centre",
  whyClinicHeading: "Why Choose Care Well Medical Centre?",
  whyClinicSubheading: "What Makes Us Different?",
  doctorHeading: "About Dr. Sandeep Bhasin",
  doctorBody:
    "Dr. Sandeep Bhasin has over 20 years of experience in advanced cosmetic and skin treatments.",
  doctorTrust: [
    "Personalized care",
    "Long-term treatment planning",
    "Safe procedures",
    "Proven patient outcomes",
  ],
  galleryHeading: "Skin Whitening Before & After Results",
  galleryNote: "Most patients begin noticing visible improvements within 2–3 sessions.",
  testimonialsHeading: "Patient Testimonials",
  locationHeading: "How to Reach Care Well Medical Centre",
  ctaHeading: "Ready to Achieve Brighter, Healthier Skin?",
  ctaBody:
    "Whether you're seeking facial brightening, pigmentation correction, or full body skin whitening, our specialists can create a customized plan for your goals.",
  faqHeading: "FAQs About Skin Whitening Treatment",
  disclaimer:
    "Results vary based on skin type, pigmentation severity, lifestyle, and adherence to post-treatment care. A professional consultation is recommended before beginning any cosmetic skin procedure.",
  treatmentDropdownLabel: "Skin Whitening Treatment",
  parentLabel: "Skin Treatments in Delhi",
  parentPath: SKIN_TREATMENTS_PATH,
} as const;

export { SKIN_CLINIC as SKIN_WHITENING_CLINIC };

export const SKIN_WHITENING_WHY_TREATMENT = [
  "Reduce pigmentation and melasma",
  "Lighten acne marks and blemishes",
  "Improve overall skin tone",
  "Restore natural glow",
  "Reverse tanning",
  "Boost confidence",
] as const;

export type SkinWhiteningTreatment = {
  title: string;
  purpose: readonly string[];
  howItWorks?: string;
  details: readonly { label: string; value: string }[];
  benefits: readonly string[];
  href: string;
};

export const SKIN_WHITENING_TREATMENTS: readonly SkinWhiteningTreatment[] = [
  {
    title: "IV Glutathione Therapy (Full Body Whitening)",
    purpose: ["Full body whitening", "Melanin reduction", "Internal detoxification"],
    howItWorks:
      "Glutathione is a powerful antioxidant that helps reduce melanin production while supporting skin rejuvenation.",
    details: [
      { label: "Sessions", value: "8–12" },
      { label: "Downtime", value: "None" },
      { label: "Best For", value: "Full Body Whitening" },
      { label: "Result Duration", value: "Months to Years" },
    ],
    benefits: [
      "Full body brightening",
      "Improved skin texture",
      "Antioxidant protection",
      "Enhanced skin tone",
    ],
    href: "/glutathione-injections-for-skin-whitening",
  },
  {
    title: "Helios Q-Switch Laser Treatment",
    purpose: ["Pigmentation reduction", "Melasma treatment", "Tan removal"],
    details: [
      { label: "Sessions", value: "3–4" },
      { label: "Downtime", value: "2–3 Days" },
      { label: "Best For", value: "Face, Neck, Underarms, Bikini Area" },
    ],
    benefits: [
      "Safe for Indian skin tones",
      "Precise pigmentation removal",
      "Minimal downtime",
    ],
    href: "/book-consultation",
  },
  {
    title: "Fractional CO₂ Laser Treatment",
    purpose: ["Deep pigmentation correction", "Skin resurfacing", "Collagen stimulation"],
    details: [
      { label: "Sessions", value: "1–3" },
      { label: "Downtime", value: "3–5 Days" },
      { label: "Best For", value: "Acne Scars & Deep Pigmentation" },
    ],
    benefits: [
      "Improves skin texture",
      "Reduces scars",
      "Enhances elasticity",
      "Brightens skin tone",
    ],
    href: `${SKIN_TREATMENTS_PATH}/fractional-co2-laser-treatment`,
  },
  {
    title: "Chemical Peels",
    purpose: ["Skin exfoliation", "Pigmentation reduction", "Skin brightening"],
    details: [
      { label: "Sessions", value: "4–6" },
      { label: "Downtime", value: "Minimal" },
      { label: "Best For", value: "Mild Pigmentation & Dullness" },
    ],
    benefits: ["Affordable treatment", "Improved glow", "Brighter complexion"],
    href: `${SKIN_TREATMENTS_PATH}/chemical-peel`,
  },
  {
    title: "Microdermabrasion",
    purpose: ["Gentle exfoliation", "Skin polishing", "Texture improvement"],
    details: [
      { label: "Sessions", value: "3–6" },
      { label: "Downtime", value: "None" },
    ],
    benefits: ["Instant glow", "Smooth skin texture", "Improved absorption of skincare products"],
    href: `${SKIN_TREATMENTS_PATH}/microdermabrasion`,
  },
  {
    title: "Medifacials",
    purpose: ["Deep hydration", "Skin rejuvenation", "Bridal glow preparation"],
    details: [
      { label: "Sessions", value: "3–5" },
      { label: "Downtime", value: "None" },
    ],
    benefits: ["Hydrated skin", "Reduced dullness", "Immediate glow"],
    href: `${SKIN_TREATMENTS_PATH}/hydrafacial`,
  },
  {
    title: "Topical Dermatological Treatments",
    purpose: ["Long-term maintenance", "Pigmentation correction"],
    details: [
      { label: "Common Ingredients", value: "Niacinamide, Kojic Acid, Glycolic Acid" },
      { label: "Best For", value: "Ongoing maintenance" },
    ],
    benefits: ["Cost-effective", "Safe for long-term use", "Complements clinic procedures"],
    href: "/book-consultation",
  },
];

export const SKIN_WHITENING_CHOOSE_ROWS = [
  { concern: "Sensitive Skin", treatment: "Medifacials, Topicals, Chemical Peels" },
  { concern: "Moderate Pigmentation", treatment: "Q-Switch Laser, Microdermabrasion" },
  { concern: "Deep Pigmentation", treatment: "Fractional CO₂ Laser" },
  { concern: "Full Body Whitening", treatment: "IV Glutathione Therapy" },
  { concern: "Budget-Friendly Option", treatment: "Chemical Peels & Topicals" },
] as const;

export const SKIN_WHITENING_COMPARE_ROWS = [
  { treatment: "IV Glutathione Therapy", price: "₹20,000 – ₹40,000", sessions: "8–12", downtime: "None" },
  { treatment: "Q-Switch Laser", price: "₹4,000 – ₹15,000", sessions: "3–4", downtime: "2–3 Days" },
  { treatment: "Fractional CO₂ Laser", price: "₹6,000 – ₹18,000", sessions: "1–3", downtime: "3–5 Days" },
  { treatment: "Chemical Peels", price: "₹1,500 – ₹8,000", sessions: "4–6", downtime: "Minimal" },
  { treatment: "Microdermabrasion", price: "₹2,000 – ₹6,000", sessions: "3–6", downtime: "None" },
  { treatment: "Medifacials", price: "₹2,500 – ₹7,000", sessions: "3–5", downtime: "None" },
  { treatment: "Prescription Topicals", price: "₹1,000 – ₹3,000/Month", sessions: "Ongoing", downtime: "None" },
] as const;

export const SKIN_WHITENING_LONG_TERM = [
  { name: "IV Glutathione Therapy", duration: "Results may last 12–24 months with maintenance." },
  { name: "Q-Switch Laser", duration: "Results may last 6–18 months." },
  { name: "Fractional CO₂ Laser", duration: "Long-term pigmentation improvement." },
] as const;

export const SKIN_WHITENING_MAINTENANCE = ["Sunscreen", "Skincare routine", "Periodic touch-up sessions"] as const;

export const SKIN_WHITENING_COST_ROWS = [
  { treatment: "IV Glutathione Therapy", range: "₹20,000 – ₹40,000" },
  { treatment: "Q-Switch Laser", range: "₹4,000 – ₹15,000" },
  { treatment: "Fractional CO₂ Laser", range: "₹6,000 – ₹18,000" },
  { treatment: "Chemical Peels", range: "₹1,500 – ₹8,000" },
  { treatment: "Medifacials", range: "₹2,500 – ₹7,000" },
  { treatment: "Prescription Creams", range: "₹1,000 – ₹3,000/Month" },
] as const;

export const SKIN_WHITENING_BENEFIT_GROUPS = [
  {
    title: "Skin Lightening",
    items: ["Brighter complexion", "Reduced dullness"],
  },
  {
    title: "Pigmentation Reduction",
    items: ["Fewer dark spots", "Improved skin tone"],
  },
  {
    title: "Improved Skin Texture",
    items: ["Smoother skin", "Better elasticity"],
  },
  {
    title: "Detoxification",
    items: ["Antioxidant benefits", "Improved cellular health"],
  },
  {
    title: "Anti-Aging Support",
    items: ["Reduced fine lines", "Improved skin vitality"],
  },
] as const;

export const SKIN_WHITENING_SIDE_EFFECTS = [
  "Mild redness",
  "Dryness",
  "Peeling",
  "Temporary swelling",
  "Sun sensitivity",
] as const;

export const SKIN_WHITENING_AVOID = [
  "Pregnant women",
  "Breastfeeding mothers",
  "Active skin infections",
  "Severe eczema",
  "Open wounds",
  "Individuals with specific treatment allergies",
] as const;

export const SKIN_WHITENING_PROCEDURE_ROWS = [
  { procedure: "IV Glutathione Therapy", duration: "30–45 Minutes", sessions: "8–12" },
  { procedure: "Helios Laser", duration: "30–45 Minutes", sessions: "3–4" },
  { procedure: "Chemical Peels", duration: "20–30 Minutes", sessions: "4–6" },
  { procedure: "Body Polishing", duration: "20–30 Minutes", sessions: "3–4" },
] as const;

export const SKIN_WHITENING_WHY_CLINIC = [
  "13+ Years Experience",
  "FDA-Certified Technologies",
  "Expert Dermatologists",
  "Customized Treatment Plans",
  "Advanced Laser Systems",
  "Visible Results",
  "Patient-Centric Care",
] as const;

export const SKIN_WHITENING_DOCTOR_EXPERTISE = [
  "Skin Whitening Treatments",
  "Laser Therapy",
  "Glutathione Therapy",
  "Chemical Peels",
  "Pigmentation Correction",
] as const;

export const SKIN_WHITENING_NEARBY = ["Govindpuri Metro Station", "Greater Kailash", "Nehru Place", "Kalkaji"] as const;

export const SKIN_WHITENING_VIDEO_TOPICS = [
  "Skin Whitening Journey",
  "Glutathione Therapy Experience",
  "Pigmentation Treatment Review",
  "Patient Success Stories",
] as const;

export const SKIN_WHITENING_FAQS: { question: string; answer: string }[] = [
  {
    question: "Which skin whitening treatment is best?",
    answer:
      "The best option depends on your concern. IV glutathione suits full-body goals; Q-Switch laser targets pigmentation; chemical peels help mild dullness. We recommend a skin assessment first.",
  },
  {
    question: "Is glutathione therapy safe?",
    answer:
      "When administered under medical supervision at appropriate doses, IV glutathione is considered safe for many patients. Suitability is confirmed during consultation.",
  },
  {
    question: "How many sessions are required?",
    answer:
      "Sessions vary by treatment: glutathione often needs 8–12 sessions; laser 3–4; peels 4–6. Your dermatologist will outline a personalized plan.",
  },
  {
    question: "Can skin whitening results be permanent?",
    answer:
      "Results are long-lasting with maintenance but not permanently fixed. Sun protection and follow-up sessions help sustain brightness.",
  },
  {
    question: "What is the cost of skin whitening treatment in Delhi?",
    answer:
      "Per-session costs range from about ₹1,500 for peels to ₹40,000 for glutathione. Full-body packages may exceed ₹40,000 depending on the plan.",
  },
  {
    question: "Is laser skin whitening safe?",
    answer:
      "Yes, when performed with FDA-approved devices and settings tailored for Indian skin by trained specialists.",
  },
  {
    question: "Which treatment is best for pigmentation?",
    answer:
      "Q-Switch laser and fractional CO₂ laser are commonly used for pigmentation; mild cases may respond well to peels and topicals.",
  },
  {
    question: "Are these treatments suitable for Indian skin?",
    answer:
      "Yes. Our protocols are designed for Indian skin tones with customized laser parameters and dermatologist oversight.",
  },
];
