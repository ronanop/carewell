import { SKIN_CLINIC, SKIN_TREATMENTS_PATH } from "@/data/skin-treatments-in-delhi";

export const ACNE_SCAR_PATH = "/skin-treatments-in-delhi/acne-scar" as const;

export const ACNE_SCAR_IMAGES = {
  hero: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519836/carewell-media/cms/d8050da0719725a6_smi1gb.jpg",
    alt: "Acne scar before and after transformation — Delhi",
  },
  trustBadge: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg",
    alt: "FDA approved, IADVL certified dermatologist-recommended skin clinic",
  },
  causes: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg", alt: "Acne causes and scar formation infographic" },
  scarTypes: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517800/carewell-media/site/demo/ai-skin-scan-v2.jpg", alt: "Different acne scar types" },
  pih: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519737/carewell-media/cms/10d9d4d7a6884495_rwhhdj.png", alt: "PIH vs acne scar comparison" },
  symptoms: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg", alt: "Acne scar symptoms illustration" },
  drBhasin: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517806/carewell-media/site/demo/doctor-profile-feature-vertical.png", alt: "Dr. Sandeep Bhasin — cosmetic and laser surgeon" },
  drRiyaz: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517807/carewell-media/site/demo/doctor-profile-feature.jpg", alt: "Dr. Riyaz — dermatologist and skin specialist" },
  technologies: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "Advanced acne scar treatment technologies" },
  comparison: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517800/carewell-media/site/demo/ai-skin-scan-v2.jpg", alt: "Acne scar treatment comparison chart" },
  eligibility: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517799/carewell-media/site/demo/about-us-consultation.jpg", alt: "Treatment eligibility checklist" },
  prevention: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg", alt: "Acne prevention guide" },
  cost: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "Acne scar treatment cost guide" },
  aftercare: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517803/carewell-media/site/demo/carewell-clinic-exterior.jpg", alt: "Recovery and aftercare guide" },
  whyChoose: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517796/carewell-media/site/beardtranplantindelhi/care-well-medical-centre-delhi-clinic-exterior-1.webp", alt: "Care Well clinic and treatment team" },
  ctaBanner: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "Book acne scar consultation" },
  videoPoster: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg", alt: "Acne scar treatment patient testimonial" },
  gallery: [
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519836/carewell-media/cms/d8050da0719725a6_smi1gb.jpg", alt: "Acne scar before and after", caption: "Acne scar treatment result" },
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517800/carewell-media/site/demo/ai-skin-scan-v2.jpg", alt: "Rolling scar improvement", caption: "Rolling scar improvement" },
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519737/carewell-media/cms/10d9d4d7a6884495_rwhhdj.png", alt: "Boxcar scar reduction", caption: "Boxcar scar reduction" },
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "Pigmentation correction", caption: "Pigmentation correction" },
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg", alt: "Laser resurfacing transformation", caption: "Laser resurfacing" },
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517803/carewell-media/site/demo/carewell-clinic-exterior.jpg", alt: "Full face texture improvement", caption: "Texture improvement" },
  ],
} as const;

export const ACNE_SCAR_SEO = {
  title: "Acne Scar Treatment in Delhi | Cost, Sessions & Care Plans | Care Well Medical Centre",
  description:
    "Acne scar treatment in Delhi at Care Well Medical Centre. Laser, microneedling, TCA CROSS, MNRF & more by Dr. Sandeep Bhasin & Dr. Riyaz. Book a consultation.",
} as const;

export const ACNE_SCAR_PAGE = {
  h1: "Acne Scar Treatment in Delhi – Safe, Proven Solutions for Clearer Skin",
  subtitle: "Advanced Acne Scar Removal Treatments by Dr. Sandeep Bhasin & Dr. Riyaz",
  introQuestion: "Are stubborn acne scars affecting your confidence?",
  introBody:
    "At Care Well Medical Centre, we offer advanced Acne Scar Treatment in Delhi designed to improve skin texture, reduce pigmentation, and restore smoother, healthier skin.",
  scarConcerns: [
    "Ice Pick Scars",
    "Boxcar Scars",
    "Rolling Scars",
    "Pigmentation Marks",
    "Uneven Skin Texture",
    "Post-Acne Discoloration",
  ],
  introClosing:
    "Our customized treatment plans help achieve safe and visible improvement.",
  expertsHeading: "Meet Your Experts",
  whyChoose: [
    "Visible improvement in a few sessions",
    "Safe for all skin types",
    "Suitable for Indian skin tones",
    "Minimal downtime",
    "Customized treatment plans",
  ],
  galleryHeading: "Before & After Acne Scar Results",
  causesHeading: "What Causes Acne and Acne Scars?",
  causesIntro: "Acne develops due to:",
  causesList: [
    "Hormonal changes",
    "Excess oil production (Sebum)",
    "Clogged pores",
    "Bacterial infection",
    "Inflammation",
  ],
  causesNote: "If left untreated, acne can lead to permanent scarring.",
  commonCausesHeading: "Common Causes of Acne",
  symptomsHeading: "Common Symptoms of Acne Scars",
  symptomsIntro: "Acne scars appear in multiple forms.",
  symptomsSigns: [
    "Indentations in the skin",
    "Raised scars",
    "Dark spots",
    "Red marks",
    "Uneven skin texture",
    "Skin sensitivity",
    "Itching or discomfort",
  ],
  typesHeading: "Types of Acne Scars",
  flatSpotsHeading: "What Are Flat Spots After Acne?",
  flatSpotsIntro: "Not all post-acne marks are scars. Many patients experience Post-Inflammatory Hyperpigmentation (PIH).",
  pihAppearances: ["Brown spots", "Purple spots", "Red marks", "Pink marks"],
  pihTreatments: ["Chemical Peels", "Laser Therapy", "Topical Treatments"],
  pihNote: "These marks usually fade gradually but can be accelerated with professional treatment.",
  itchHeading: "Do Acne Scars Itch or Hurt?",
  itchBody: "Yes, certain scars can cause itching, tenderness, skin sensitivity, or mild discomfort.",
  itchCommon: ["Raised scars", "Active healing scars", "Inflamed scar tissue"],
  specialistsHeading: "Meet Your Acne Scar Specialists",
  treatmentsHeading: "Best Acne Scar Treatments in Delhi",
  rightTreatmentHeading: "Which Acne Scar Treatment is Right for You?",
  rightTreatmentBody:
    "Treatment selection depends on scar type, skin type, skin tone, and scar severity. Our specialists create personalized treatment plans based on detailed skin assessment.",
  avoidHeading: "Who Should Avoid Acne Scar Treatments?",
  avoidIntro: "Treatment may need to be postponed if you have:",
  preventHeading: "How to Prevent Acne Scars",
  costHeading: "Acne Scar Treatment Cost in Delhi",
  aftercareHeading: "Post-Treatment Care",
  whyClinicHeading: "Why Choose Care Well Medical Centre?",
  whyClinicSubheading: "What Makes Us Different",
  testimonialsHeading: "Patient Testimonials",
  locationHeading: "How to Reach Us",
  ctaHeading: "Ready for Clearer, Smoother Skin?",
  ctaBody:
    "Transform your skin with personalized acne scar treatments designed specifically for your skin type and scar concerns.",
  faqHeading: "FAQs – Acne Scar Treatment in Delhi",
  disclaimer:
    "Treatment suitability and outcomes vary depending on skin type, scar severity, and individual healing response. Consultation is recommended for personalized assessment and treatment planning.",
  treatmentDropdownLabel: "Acne Scar Treatment",
  parentLabel: "Skin Treatments in Delhi",
  parentPath: SKIN_TREATMENTS_PATH,
} as const;

export { SKIN_CLINIC as ACNE_SCAR_CLINIC };

export const ACNE_SCAR_EXPERTS = [
  {
    name: "Dr. Sandeep Bhasin",
    role: "Senior Cosmetic & Laser Surgeon",
    credentials: [
      "MBBS",
      "MS (General Surgery)",
      "Aligarh Muslim University",
      "20+ Years Surgical Experience",
      "Advanced Scar Revision Specialist",
    ],
    expertise: [
      "Laser Resurfacing",
      "Microneedling",
      "Subcision",
      "TCA Cross",
      "Acne Scar Revision",
    ],
    imageKey: "drBhasin" as const,
    href: "/about/dr-bhasin",
  },
  {
    name: "Dr. Riyaz",
    role: "Dermatologist & Skin Specialist",
    credentials: ["12+ Years Clinical Experience", "IADVL Member"],
    expertise: [
      "Cosmetic Dermatology",
      "Pigmentation Treatment",
      "Chemical Peels",
      "MNRF",
      "Acne Scar Management",
    ],
    imageKey: "drRiyaz" as const,
    href: "/book-consultation",
  },
] as const;

export const ACNE_CAUSE_GROUPS = [
  {
    title: "Hormonal Factors",
    items: ["Puberty", "Menstrual changes", "PCOS", "Hormonal imbalance"],
  },
  {
    title: "Lifestyle Factors",
    items: ["Stress", "Poor diet", "Improper skincare", "Oily skin"],
  },
  {
    title: "Other Factors",
    items: ["Genetics", "Comedogenic skincare products", "Poor hygiene practices"],
  },
] as const;

export const ACNE_SCAR_TYPES = {
  depressed: {
    title: "Depressed (Atrophic) Scars",
    kinds: [
      {
        name: "Ice Pick Scars",
        traits: ["Deep narrow scars", "Tiny puncture-like appearance"],
      },
      {
        name: "Rolling Scars",
        traits: ["Wide shallow depressions", "Wavy skin texture"],
      },
      {
        name: "Boxcar Scars",
        traits: ["Broad depressions", "Sharp defined edges"],
      },
    ],
  },
  raised: {
    title: "Raised Scars",
    kinds: [
      {
        name: "Hypertrophic Scars",
        traits: ["Raised above skin surface", "Excess collagen production"],
      },
      {
        name: "Keloids",
        traits: ["Grow beyond original acne area", "Thick scar tissue"],
      },
      {
        name: "Papular Scars",
        traits: ["Small skin-colored bumps", "Common around jawline and chin"],
      },
    ],
  },
} as const;

export const ACNE_SCAR_TREATMENTS = [
  {
    title: "Laser Resurfacing",
    description: "Removes damaged skin and stimulates collagen.",
    details: [
      { label: "Best For", value: "Boxcar & Rolling Scars" },
      { label: "Sessions", value: "3–6" },
      { label: "Downtime", value: "5–7 Days" },
    ],
    href: `${SKIN_TREATMENTS_PATH}/fractional-co2-laser-treatment`,
  },
  {
    title: "Microneedling",
    description: "Stimulates collagen through controlled micro-injuries.",
    details: [
      { label: "Best For", value: "Mild to Moderate Scars" },
      { label: "Sessions", value: "4–6" },
      { label: "Downtime", value: "1–2 Days" },
    ],
    href: `${SKIN_TREATMENTS_PATH}/microneedling`,
  },
  {
    title: "Subcision",
    description: "Breaks scar tethering beneath the skin.",
    details: [
      { label: "Best For", value: "Rolling Scars" },
      { label: "Sessions", value: "1–3" },
      { label: "Downtime", value: "3–5 Days" },
    ],
    href: "/book-consultation",
  },
  {
    title: "TCA CROSS",
    description: "Targets deep ice pick scars.",
    details: [
      { label: "Best For", value: "Ice Pick Scars" },
      { label: "Sessions", value: "3–5" },
      { label: "Downtime", value: "2–3 Days" },
    ],
    href: "/book-consultation",
  },
  {
    title: "Soft Tissue Fillers",
    description: "Adds volume beneath depressed scars.",
    details: [
      { label: "Best For", value: "Atrophic Scars" },
      { label: "Sessions", value: "1" },
      { label: "Downtime", value: "Minimal" },
    ],
    href: "/cosmetic-treatments-in-delhi/dermal-fillers",
  },
  {
    title: "Chemical Peels",
    description: "Improves pigmentation and mild scarring.",
    details: [
      { label: "Best For", value: "Mild Scars & Pigmentation" },
      { label: "Sessions", value: "3–6" },
      { label: "Downtime", value: "1–3 Days" },
    ],
    href: `${SKIN_TREATMENTS_PATH}/chemical-peel`,
  },
  {
    title: "MNRF (Microneedling Radiofrequency)",
    description: "Combines microneedling with radiofrequency energy.",
    details: [
      { label: "Best For", value: "Deep Acne Scars" },
      { label: "Sessions", value: "3–4" },
      { label: "Downtime", value: "1–3 Days" },
    ],
    href: "/book-consultation",
  },
  {
    title: "Fractional CO₂ Laser",
    description: "Advanced collagen remodeling treatment.",
    details: [
      { label: "Best For", value: "Deep Scars" },
      { label: "Sessions", value: "2–4" },
      { label: "Downtime", value: "5–10 Days" },
    ],
    href: `${SKIN_TREATMENTS_PATH}/fractional-co2-laser-treatment`,
  },
  {
    title: "LED Light Therapy",
    description: "Uses red and blue light to reduce inflammation.",
    details: [
      { label: "Best For", value: "Redness & Pigmentation" },
      { label: "Sessions", value: "4–8" },
      { label: "Downtime", value: "None" },
    ],
    href: "/book-consultation",
  },
  {
    title: "Botox for Acne Scars",
    description: "Relaxes tension around certain scar types.",
    details: [
      { label: "Best For", value: "Puckered Scars" },
      { label: "Sessions", value: "1" },
      { label: "Downtime", value: "Minimal" },
    ],
    href: "/cosmetic-treatments-in-delhi/botox-treatment",
  },
  {
    title: "Topical Medical Treatments",
    description: "Includes retinoids, azelaic acid, and niacinamide.",
    details: [
      { label: "Best For", value: "Post-Acne Marks" },
      { label: "Sessions", value: "Ongoing" },
      { label: "Downtime", value: "None" },
    ],
    href: "/book-consultation",
  },
] as const;

export const ACNE_SCAR_AVOID_ITEMS = [
  "Active acne breakouts",
  "Open wounds",
  "Active skin infections",
  "Pregnancy or breastfeeding",
  "Uncontrolled diabetes",
  "Blood thinner medications",
  "Severe keloid tendency",
] as const;

export const ACNE_SCAR_PREVENT = {
  early: {
    title: "Early Treatment",
    do: ["Treat acne promptly", "Consult a dermatologist early", "Use prescribed medications"],
  },
  avoid: {
    title: "Avoid Further Damage",
    dont: ["Don't squeeze acne", "Don't pick pimples", "Avoid aggressive scrubbing"],
  },
  protect: {
    title: "Skin Protection",
    do: ["Wear sunscreen daily", "Maintain a healthy diet", "Avoid smoking", "Use gentle cleansers"],
  },
} as const;

export const ACNE_SCAR_COST_ROWS = [
  { treatment: "Laser Resurfacing", range: "₹5,000 – ₹20,000" },
  { treatment: "Microneedling", range: "₹3,000 – ₹10,000" },
  { treatment: "Chemical Peels", range: "₹2,000 – ₹7,000" },
  { treatment: "MNRF", range: "₹6,000 – ₹15,000" },
  { treatment: "TCA CROSS", range: "₹3,000 – ₹8,000" },
  { treatment: "Subcision", range: "₹4,000 – ₹12,000" },
  { treatment: "Punch Excision/Grafting", range: "₹5,000 – ₹15,000" },
  { treatment: "Fractional CO₂ Laser", range: "₹6,000 – ₹18,000" },
  { treatment: "Botox", range: "₹8,000 – ₹20,000" },
  { treatment: "Soft Tissue Fillers", range: "₹10,000 – ₹25,000" },
  { treatment: "Steroid Injections", range: "₹1,000 – ₹2,500" },
  { treatment: "LED Light Therapy", range: "₹1,500 – ₹4,000" },
  { treatment: "Prescription Creams", range: "₹500 – ₹3,000/month" },
] as const;

export const ACNE_SCAR_AFTERCARE = [
  "Apply SPF 50 sunscreen",
  "Keep skin hydrated",
  "Follow prescribed skincare routine",
  "Avoid direct sun exposure",
  "Avoid harsh scrubs",
  "Avoid makeup for 24–48 hours",
] as const;

export const ACNE_SCAR_WHY_CLINIC = [
  "Dr. Sandeep Bhasin & Dr. Riyaz",
  "Advanced Scar Revision Technologies",
  "Personalized Treatment Plans",
  "FDA-Approved Equipment",
  "Proven Patient Results",
  "NABH Accredited Centre",
] as const;

export const ACNE_SCAR_LOCATION = {
  metro: "Govindpuri Metro Station (8 Minutes Away)",
  parking: "Street Parking Available",
} as const;

export const ACNE_SCAR_VIDEO_TOPICS = [
  "Acne Scar Treatment Journey",
  "Laser Resurfacing Results",
  "Microneedling Success Story",
  "Patient Reviews",
] as const;

export const ACNE_SCAR_FAQS: { question: string; answer: string }[] = [
  {
    question: "What is the best treatment for acne scars?",
    answer:
      "The best treatment depends on scar type. Ice pick scars often respond to TCA CROSS; rolling scars to subcision and microneedling; boxcar scars to fractional laser. A consultation determines your ideal combination.",
  },
  {
    question: "How many sessions will I need?",
    answer:
      "Most patients need 3–6 sessions for moderate scars. Deep scars may require more sessions spaced several weeks apart.",
  },
  {
    question: "Are acne scar treatments painful?",
    answer:
      "Discomfort is usually mild. We use topical numbing and adjust settings for comfort. Downtime varies by procedure.",
  },
  {
    question: "What is the recovery time?",
    answer:
      "Recovery ranges from no downtime (LED, topicals) to 5–10 days for deeper fractional CO₂ laser treatments.",
  },
  {
    question: "Can acne scars be removed permanently?",
    answer:
      "Significant improvement is achievable for most scar types. Complete removal depends on depth, age of scars, and adherence to aftercare.",
  },
  {
    question: "Which treatment is best for ice pick scars?",
    answer:
      "TCA CROSS and targeted laser or microneedling combinations are commonly recommended for ice pick scars.",
  },
  {
    question: "What is the cost of acne scar treatment in Delhi?",
    answer:
      "Costs typically range from ₹2,000 to ₹25,000 per session depending on the procedure. We provide transparent estimates after skin assessment.",
  },
  {
    question: "Are treatments safe for Indian skin?",
    answer:
      "Yes. Our protocols are tailored for Indian skin tones using FDA-approved devices and dermatologist-supervised settings.",
  },
];
