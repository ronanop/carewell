import { SKIN_CLINIC, SKIN_TREATMENTS_PATH } from "@/data/skin-treatments-in-delhi";

export const DARK_CIRCLES_PATH = "/skin-treatments-in-delhi/dark-circles" as const;

export const DARK_CIRCLES_IMAGES = {
  hero: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519737/carewell-media/cms/10d9d4d7a6884495_rwhhdj.png",
    alt: "Dark circles removal before and after results",
  },
  heroBanner: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg",
    alt: "Under-eye rejuvenation transformation banner",
  },
  tired: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519836/carewell-media/cms/d8050da0719725a6_smi1gb.jpg", alt: "Under-eye pigmentation before and after" },
  whatAre: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517800/carewell-media/site/demo/ai-skin-scan-v2.jpg", alt: "Periorbital pigmentation illustration" },
  types: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "Types of dark circles diagram" },
  signs: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg", alt: "Under-eye symptoms infographic" },
  causesMain: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517800/carewell-media/site/demo/ai-skin-scan-v2.jpg", alt: "Causes of dark circles infographic" },
  genetic: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517799/carewell-media/site/demo/about-us-consultation.jpg", alt: "Aging under-eye changes" },
  lifestyle: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg", alt: "Lifestyle triggers illustration" },
  medical: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517799/carewell-media/site/demo/about-us-consultation.jpg", alt: "Health conditions linked to dark circles" },
  technologies: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "Advanced under-eye rejuvenation treatments" },
  candidate: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517799/carewell-media/site/demo/about-us-consultation.jpg", alt: "Ideal candidate assessment" },
  journey: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517800/carewell-media/site/demo/ai-skin-scan-v2.jpg", alt: "Dark circle treatment journey" },
  aftercare: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg", alt: "Under-eye aftercare guide" },
  cost: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "Dark circles treatment cost breakdown" },
  drBhasin: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517806/carewell-media/site/demo/doctor-profile-feature-vertical.png", alt: "Dr. Sandeep Bhasin with patient" },
  ctaBanner: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "Book dark circles consultation" },
  gallery: [
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519737/carewell-media/cms/10d9d4d7a6884495_rwhhdj.png", alt: "Dark circles before and after", caption: "Before & after result" },
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519836/carewell-media/cms/d8050da0719725a6_smi1gb.jpg", alt: "Under-eye filler transformation", caption: "Filler transformation" },
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg", alt: "PRP treatment result", caption: "PRP result" },
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517800/carewell-media/site/demo/ai-skin-scan-v2.jpg", alt: "Laser pigmentation correction", caption: "Laser correction" },
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "Tear trough improvement", caption: "Tear trough improvement" },
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517803/carewell-media/site/demo/carewell-clinic-exterior.jpg", alt: "Under-eye brightening", caption: "Under-eye brightening" },
  ],
} as const;

export const DARK_CIRCLES_SEO = {
  title: "Dark Circles Removal Treatment in Delhi | Care Well Medical Centre",
  description:
    "Dark circles removal in Delhi at Care Well Medical Centre. Laser, fillers, PRP, peels & RF for under-eye pigmentation and hollowness. Book a consultation.",
} as const;

export const DARK_CIRCLES_PAGE = {
  h1: "Dark Circles Removal Treatment in Delhi – Laser, Fillers & Advanced Solutions",
  subtitle: "Restore Brighter, Younger-Looking Eyes with Personalized Dark Circle Treatments",
  introQuestion: "Looking for safe and effective Dark Circles Removal Treatment in Delhi?",
  introBody:
    "At Care Well Medical Centre, we provide customized, non-surgical treatments designed to reduce under-eye pigmentation, hollowness, puffiness, and tired-looking eyes.",
  causes: ["Genetics", "Stress", "Lack of sleep", "Pigmentation", "Aging", "Thin skin", "Lifestyle habits"],
  introClosing:
    "Our advanced treatment options help restore a fresher, brighter, and more youthful appearance.",
  treatmentsAvailable: [
    "Dermal Fillers",
    "PRP Therapy",
    "Q-Switched Laser",
    "Chemical Peels",
    "Medical-Grade Skincare",
    "Radiofrequency Tightening",
  ],
  tiredHeading: "Tired of Under-Eye Shadows?",
  tiredSubheading: "Discover Safe & Effective Dark Circle Treatments",
  tiredEffects: ["Tired", "Older", "Stressed", "Unhealthy"],
  symptoms: ["Under-eye darkness", "Pigmentation", "Hollow appearance"],
  rootCauses: ["Volume loss", "Thin skin", "Melanin accumulation", "Lifestyle factors"],
  tiredNote: "Every treatment plan is customized according to your skin type and the underlying cause.",
  whatAreHeading: "What Are Dark Circles?",
  whatAreBody:
    "Dark circles, medically known as Periorbital Pigmentation, refer to darkened skin around or beneath the eyes.",
  whatAreDevelop: ["Aging", "Genetics", "Fatigue", "Pigmentation disorders", "Skin thinning"],
  pigmentationHeading: "Understanding Periorbital Pigmentation",
  signsHeading: "Common Signs of Dark Circles",
  majorCausesHeading: "Major Causes of Dark Circles",
  treatmentsHeading: "Best Dark Circles Removal Treatments at Care Well Medical Centre",
  candidateHeading: "Who Is a Good Candidate for Dark Circle Removal?",
  expectHeading: "What to Expect During & After Treatment",
  painfulHeading: "Is the Procedure Painful?",
  painfulNote: "Most treatments are minimally invasive.",
  downtimeHeading: "Downtime Overview",
  aftercareHeading: "Post-Treatment Care Tips",
  galleryHeading: "Before & After Results",
  galleryImprovements: [
    "Reduced pigmentation",
    "Brighter under-eye area",
    "Improved contour",
    "Fresher appearance",
    "Less tired-looking eyes",
  ],
  costHeading: "Dark Circles Removal Treatment Cost in Delhi",
  costNoteFactors: ["Cause of dark circles", "Severity", "Treatment selected", "Number of sessions required"],
  whyClinicHeading: "Why Choose Care Well Medical Centre?",
  expertHeading: "Expert-Led Care",
  expertBody:
    "All treatments are supervised by Dr. Sandeep Bhasin, a cosmetic surgeon with over 20 years of experience in aesthetic and facial rejuvenation procedures.",
  reviewsHeading: "Patient Reviews & Testimonials",
  locationHeading: "How to Reach Care Well Medical Centre",
  ctaHeading: "Ready to Restore Brighter, Youthful Eyes?",
  ctaBody:
    "Say goodbye to tired-looking eyes and persistent under-eye pigmentation. Book a personalized consultation with our specialists and discover the most suitable treatment for your skin.",
  faqHeading: "FAQs About Dark Circle Removal Treatment",
  disclaimer:
    "Treatment outcomes vary depending on the cause of dark circles, skin type, age, and adherence to aftercare instructions. Consultation is recommended for personalized treatment planning.",
  treatmentDropdownLabel: "Dark Circles Removal",
  parentLabel: "Skin Treatments in Delhi",
  parentPath: SKIN_TREATMENTS_PATH,
} as const;

export { SKIN_CLINIC as DARK_CIRCLES_CLINIC };

export const DARK_CIRCLES_PIGMENTATION_TYPES = [
  {
    name: "Superficial Pigmentation",
    description: "Located in the upper skin layers.",
  },
  {
    name: "Deep Pigmentation",
    description: "Located deeper within the skin.",
  },
  {
    name: "Mixed Pigmentation",
    description: "Combination of superficial and deep pigmentation.",
  },
] as const;

export const DARK_CIRCLES_PIGMENTATION_CAUSES = [
  "Excess melanin production",
  "Thin under-eye skin",
  "Visible blood vessels",
  "Allergies",
  "Frequent eye rubbing",
  "Volume loss beneath the eyes",
] as const;

export const DARK_CIRCLES_SIGNS = [
  "Brown discoloration",
  "Purple tint",
  "Bluish under-eye shadows",
  "Hollow tear troughs",
  "Tired appearance",
  "Visible veins",
  "Makeup settling under the eyes",
  "Lack of under-eye brightness",
] as const;

export const DARK_CIRCLES_MAJOR_CAUSES = [
  {
    title: "Genetic & Age-Related Factors",
    imageKey: "genetic" as const,
    body: "Some individuals inherit a tendency toward under-eye pigmentation. As aging progresses, collagen decreases, skin becomes thinner, volume loss occurs, and tear troughs deepen — creating darker under-eye shadows.",
  },
  {
    title: "Lifestyle Factors",
    imageKey: "lifestyle" as const,
    items: [
      "Poor sleep",
      "Stress",
      "Dehydration",
      "Smoking",
      "Alcohol consumption",
      "Poor nutrition",
    ],
    note: "These factors worsen existing pigmentation.",
  },
  {
    title: "Medical Conditions",
    imageKey: "medical" as const,
    items: [
      "Anemia",
      "Iron deficiency",
      "Vitamin deficiencies",
      "Thyroid disorders",
      "Allergies",
      "Kidney disorders",
      "Liver disorders",
      "Addison's Disease",
    ],
    note: "A proper evaluation helps identify underlying causes.",
  },
] as const;

export type DarkCirclesTreatment = {
  title: string;
  description?: string;
  ingredients?: readonly string[];
  peelTypes?: readonly string[];
  benefits: readonly string[];
  bestFor?: readonly string[];
  extra?: readonly { label: string; value: string }[];
  href: string;
};

export const DARK_CIRCLES_TREATMENTS: readonly DarkCirclesTreatment[] = [
  {
    title: "Medical-Grade Skincare & Topical Creams",
    description: "Used for mild pigmentation and maintenance.",
    ingredients: [
      "Hydroquinone",
      "Kojic Acid",
      "Retinoic Acid",
      "Azelaic Acid",
      "Vitamin C",
      "Niacinamide",
    ],
    benefits: ["Brightens skin", "Reduces pigmentation", "Improves skin quality"],
    href: "/book-consultation",
  },
  {
    title: "Chemical Peels for Dark Circles",
    description: "Chemical peels help remove superficial pigmentation.",
    peelTypes: ["Glycolic Acid Peels", "Lactic Acid Peels", "Retinol-Based Peels"],
    benefits: ["Brighter skin", "Reduced pigmentation", "Improved skin tone"],
    href: `${SKIN_TREATMENTS_PATH}/chemical-peel`,
  },
  {
    title: "Q-Switched Laser Treatment",
    description: "Advanced laser technology targets excess melanin beneath the skin.",
    benefits: [
      "Reduces deep pigmentation",
      "Stimulates collagen production",
      "Non-invasive treatment",
      "Minimal downtime",
    ],
    bestFor: ["Deep pigmentation", "Mixed-type dark circles"],
    href: "/book-consultation",
  },
  {
    title: "Dermal Fillers for Tear Trough Correction",
    description: "Dark circles caused by hollowness can be corrected using hyaluronic acid fillers.",
    benefits: ["Immediate volume restoration", "Reduced shadows", "Smoother under-eye contour"],
    extra: [{ label: "Duration of Results", value: "Approximately 9–12 months" }],
    href: "/cosmetic-treatments-in-delhi/dermal-fillers",
  },
  {
    title: "PRP (Platelet-Rich Plasma) Therapy",
    description: "PRP uses your body's own growth factors to rejuvenate the under-eye area.",
    benefits: [
      "Improved skin thickness",
      "Better skin texture",
      "Reduced pigmentation",
      "Enhanced skin quality",
    ],
    bestFor: ["Thin skin", "Mild pigmentation", "Fine lines"],
    href: "/hair-loss-treatment-in-delhi/prp",
  },
  {
    title: "Radiofrequency Tightening & Fat Grafting",
    description: "Advanced treatments for loose skin, puffiness, and volume loss.",
    benefits: [
      "Skin tightening and under-eye firmness (RF)",
      "Natural volume restoration (fat grafting)",
      "Long-lasting correction",
    ],
    href: "/book-consultation",
  },
];

export const DARK_CIRCLES_CANDIDATE = [
  "Dark circles persist despite adequate sleep",
  "You have pigmentation beneath the eyes",
  "You have tear trough hollowness",
  "You have puffiness or shadows",
  "You are in good overall health",
  "You have realistic expectations",
] as const;

export const DARK_CIRCLES_DURING = [
  "Numbing cream may be applied",
  "Mild tingling during laser sessions",
  "Minor pressure during fillers",
  "Slight warmth during chemical peels",
] as const;

export const DARK_CIRCLES_DOWNTIME_ROWS = [
  { treatment: "Laser", downtime: "Few Hours to 1 Day" },
  { treatment: "PRP", downtime: "Mild Redness" },
  { treatment: "Fillers", downtime: "1–2 Days" },
  { treatment: "Chemical Peels", downtime: "2–4 Days" },
] as const;

export const DARK_CIRCLES_AFTERCARE_DO = [
  "Wear SPF 50 sunscreen",
  "Use sunglasses outdoors",
  "Stay hydrated",
  "Follow prescribed skincare",
  "Attend follow-up appointments",
] as const;

export const DARK_CIRCLES_AFTERCARE_DONT = [
  "Excess sun exposure",
  "Rubbing the eyes",
  "Alcohol consumption",
  "Smoking",
  "Harsh skincare products",
] as const;

export const DARK_CIRCLES_COST_ROWS = [
  { treatment: "Topical Therapies", sessions: "3–5", cost: "₹2,000" },
  { treatment: "Chemical Peels", sessions: "3–6", cost: "₹3,000" },
  { treatment: "Q-Switched Laser", sessions: "4–8", cost: "₹2,500" },
  { treatment: "Dermal Fillers (HA)", sessions: "1–2", cost: "₹30,000" },
  { treatment: "PRP Therapy", sessions: "3–4", cost: "₹8,000" },
  { treatment: "Radiofrequency Tightening", sessions: "4–6", cost: "₹2,500" },
  { treatment: "Fat Grafting", sessions: "2–3", cost: "₹65,000" },
] as const;

export const DARK_CIRCLES_WHY_CLINIC = [
  "Advanced Laser Technology",
  "Customized Treatment Plans",
  "Safe & Non-Surgical Solutions",
  "FDA-Certified Products",
  "Personalized Consultations",
  "Trusted by Patients Across Delhi NCR",
] as const;

export const DARK_CIRCLES_LOCATION = {
  metro: "Nearest Metro: Govindpuri (Violet Line)",
  access: "Easily Accessible from GK-2, Kalkaji & Nehru Place",
} as const;

export const DARK_CIRCLES_VIDEO_TOPICS = [
  "Dark Circle Treatment Journey",
  "PRP Under-Eye Results",
  "Filler Transformation Story",
  "Laser Pigmentation Treatment Review",
] as const;

export const DARK_CIRCLES_FAQS: { question: string; answer: string }[] = [
  {
    question: "What causes dark circles?",
    answer:
      "Common causes include genetics, aging, thin skin, pigmentation, volume loss, lack of sleep, stress, and certain medical conditions.",
  },
  {
    question: "Which treatment is best for dark circles?",
    answer:
      "The best treatment depends on the cause. Fillers correct hollowness; laser and peels address pigmentation; PRP improves thin skin and texture.",
  },
  {
    question: "Are laser treatments safe?",
    answer:
      "Yes, when performed by trained specialists using appropriate settings for under-eye skin.",
  },
  {
    question: "How many sessions will I need?",
    answer:
      "Laser may need 4–8 sessions; PRP 3–4; peels 3–6. Fillers often require 1–2 sessions with results lasting months.",
  },
  {
    question: "Are results permanent?",
    answer:
      "Results vary by treatment. Fillers last 9–12 months; laser and peels may need maintenance. Lifestyle and sun protection help sustain results.",
  },
  {
    question: "What is the cost of dark circle treatment in Delhi?",
    answer:
      "Costs range from about ₹2,000 per session for topicals to ₹30,000+ for fillers. A consultation provides an accurate estimate.",
  },
  {
    question: "Are fillers better than PRP?",
    answer:
      "Fillers are ideal for volume loss and hollow tear troughs. PRP is better for thin skin, mild pigmentation, and texture. Many patients benefit from combination therapy.",
  },
  {
    question: "Can dark circles be completely removed?",
    answer:
      "Significant improvement is achievable for most patients, though complete removal depends on cause, genetics, and adherence to aftercare.",
  },
];
