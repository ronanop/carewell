import { HAIR_LOSS_CLINIC } from "@/data/hair-loss-treatment-in-delhi";

export const SKIN_TREATMENTS_PATH = "/skin-treatments-in-delhi" as const;

const BASE = "/skin-treatments-in-delhi";

export const SKIN_IMAGES = {
  heroGlow: {
    src: "/demo/skin-aesthetic-card.png",
    alt: "Glowing skin transformation — skin treatments in Delhi",
  },
  heroClinic: {
    src: "/demo/carewell-clinic-exterior.png",
    alt: "Modern skin clinic in South Delhi — Care Well Medical Centre",
  },
  servicesCollage: {
    src: "/demo/ai-skin-scan-v3.jpg",
    alt: "Skin treatment services overview at Care Well Medical Centre",
  },
  laserBanner: { src: "/demo/ai-skin-scan-v2.png", alt: "Advanced laser skin procedures" },
  rejuvenationBanner: { src: "/demo/skin-aesthetic-card.png", alt: "Skin rejuvenation and glow treatments" },
  acneBanner: { src: "/uploads/2026/d8050da0719725a6.jpg", alt: "Acne and scar treatment results" },
  pigmentationBanner: { src: "/demo/ai-skin-scan-v3.jpg", alt: "Skin brightening and pigmentation treatments" },
  medicalBanner: { src: "/demo/about-us-consultation.png", alt: "Dermatology consultation" },
  vitiligoBanner: { src: "/uploads/2026/10d9d4d7a6884495.png", alt: "Vitiligo and skin grafting treatments" },
  pricing: { src: "/demo/skin-aesthetic-card.png", alt: "Skin treatment pricing guide" },
  whyChoose: { src: "/beardtranplantindelhi/care-well-medical-centre-delhi-clinic-exterior-1.webp", alt: "Doctor consultation at Care Well Medical Centre" },
  ctaBanner: { src: "/demo/skin-aesthetic-card.png", alt: "Book skin treatment consultation" },
  videoPoster: { src: "/demo/ai-skin-scan-v3.jpg", alt: "Skin treatment patient testimonial video" },
  gallery: [
    { src: "/demo/ai-skin-scan-v3.jpg", alt: "Acne scar treatment result", caption: "Acne scar improvement" },
    { src: "/demo/skin-aesthetic-card.png", alt: "Pigmentation reduction result", caption: "Pigmentation reduction" },
    { src: "/uploads/2026/d8050da0719725a6.jpg", alt: "Skin brightening transformation", caption: "Skin brightening" },
    { src: "/demo/ai-skin-scan-v2.png", alt: "Dark circles improvement", caption: "Dark circles treatment" },
    { src: "/uploads/2026/10d9d4d7a6884495.png", alt: "Laser treatment result", caption: "Laser skin rejuvenation" },
    { src: "/demo/carewell-clinic-exterior.png", alt: "Overall skin rejuvenation", caption: "Healthy glowing skin" },
  ],
} as const;

export const SKIN_TREATMENTS_SEO = {
  title: "Skin Treatments in Delhi | Care Well Medical Centre",
  description:
    "Skin treatments in Delhi at Care Well Medical Centre, South Delhi. Laser, Hydrafacial, acne scars, pigmentation, vitiligo & more — FDA-approved care by expert specialists.",
} as const;

export const SKIN_PAGE = {
  h1: "Skin Treatments in Delhi – Trusted Care for Glowing, Healthy Skin",
  heroSubheading: "Advanced Skin Treatments in Delhi NCR for Healthy, Youthful & Radiant Skin",
  tagline: "Top-rated skin clinic in South Delhi with advanced & affordable treatments",
  introParagraphs: [
    "At Care Well Medical Centre, we proudly stand among the most trusted skin clinics in South Delhi, offering advanced skin treatments designed to restore, rejuvenate, and protect your skin.",
    "Whether you're dealing with acne, pigmentation, dark circles, signs of aging, skin allergies, or chronic skin conditions, our experienced skin specialists create personalized treatment plans tailored to your skin type and goals.",
    "We also offer advanced Korean Skin Treatments in Delhi for enhanced hydration, skin brightening, and long-lasting glow.",
    "Thousands have transformed their skin with us — now it's your turn. Let's start your journey to healthy, glowing skin today.",
  ],
  whyChoose: [
    "FDA-Approved Technologies",
    "Personalized Treatment Plans",
    "Experienced Skin Specialists",
    "Affordable & Transparent Pricing",
    "Advanced Laser Treatments",
    "Proven Results",
  ],
  treatmentsIntroHeading: "Explore Advanced Skin Care Solutions",
  treatmentsIntro:
    "Our treatments are designed to target specific concerns while delivering visible and long-lasting results.",
  priceNoteFactors: ["Skin condition", "Treatment complexity", "Number of sessions required"],
  whyClinicHeading: "Why Choose Care Well Medical Centre?",
  whyClinicSubheading: "What Makes Us Different?",
  whyClinicItems: [
    "Experienced Dermatologists",
    "15+ Years of Expertise",
    "FDA-Approved Technologies",
    "Personalized Treatments",
    "Proven Results",
    "Transparent Pricing",
    "Modern & Hygienic Facility",
  ],
  testimonialsHeading: "Patient Testimonials",
  consultationHeading: "Book a Consultation for Your Skin Treatment",
  consultationBody:
    "Looking for the best skin treatment clinic in Delhi? Book a consultation today and discover why patients across South Delhi and NCR trust Care Well Medical Centre.",
  locationHeading: "How to Reach Care Well Medical Centre",
  faqHeading: "FAQs – Skin Treatments in Delhi",
  disclaimer:
    "Treatment suitability, outcomes, and session requirements vary between individuals. A consultation with our specialists is recommended before beginning any treatment.",
  treatmentDropdownLabel: "Skin Treatments",
} as const;

export { HAIR_LOSS_CLINIC as SKIN_CLINIC };

export type SkinTreatmentItem = {
  title: string;
  description?: string;
  benefits?: readonly string[];
  details: readonly { label: string; value: string }[];
  href: string;
};

export type SkinCategoryBannerKey = Exclude<keyof typeof SKIN_IMAGES, "gallery">;

export type SkinCategory = {
  id: string;
  heading: string;
  bannerKey: SkinCategoryBannerKey;
  treatments: readonly SkinTreatmentItem[];
};

export const SKIN_PRICE_ROWS = [
  { treatment: "HydraFacial", range: "₹3,000–₹6,000" },
  { treatment: "Laser Tattoo Removal", range: "₹1,000–₹3,000/inch" },
  { treatment: "Chemical Peels", range: "₹1,500–₹4,000" },
  { treatment: "Microneedling", range: "₹3,500–₹7,000" },
  { treatment: "CO2 Fractional Laser", range: "₹4,000–₹10,000" },
  { treatment: "Skin Whitening", range: "Starting from ₹3,000" },
] as const;

export const SKIN_CATEGORIES: readonly SkinCategory[] = [
  {
    id: "laser",
    heading: "Laser Skin Treatments",
    bannerKey: "laserBanner",
    treatments: [
      {
        title: "Laser Tattoo Removal",
        description: "Remove unwanted tattoos safely using advanced Q-Switch laser technology.",
        benefits: ["Safe tattoo removal", "Minimal discomfort", "Effective ink fading"],
        details: [
          { label: "Results", value: "Gradual fading of tattoo ink" },
          { label: "Sessions", value: "4–8 Sessions" },
          { label: "Price", value: "₹1,000–₹3,000 per inch" },
        ],
        href: `${BASE}/laser-tattoo-removal`,
      },
      {
        title: "Fractional Laser Treatment",
        description: "Improve skin texture and reduce scars and wrinkles with advanced laser resurfacing.",
        benefits: ["Skin resurfacing", "Scar reduction", "Wrinkle improvement", "Improved texture"],
        details: [
          { label: "Results", value: "Smoother skin and reduced imperfections" },
          { label: "Sessions", value: "2–4 Sessions" },
          { label: "Price", value: "₹4,000–₹10,000 per session" },
        ],
        href: `${BASE}/fractional-co2-laser-treatment`,
      },
      {
        title: "Carbon Laser Facial",
        description: "Deeply exfoliate and rejuvenate the skin while improving tone and texture.",
        benefits: ["Brighter complexion", "Reduced pigmentation", "Tightened pores", "Enhanced glow"],
        details: [
          { label: "Results", value: "Brighter and even-toned skin" },
          { label: "Sessions", value: "1–2 Sessions Per Month" },
          { label: "Price", value: "₹2,000–₹5,000 per session" },
        ],
        href: `${BASE}/carbon-laser-facial`,
      },
    ],
  },
  {
    id: "rejuvenation",
    heading: "Skin Rejuvenation & Glow Treatments",
    bannerKey: "rejuvenationBanner",
    treatments: [
      {
        title: "Hydrafacial",
        description: "Deep cleansing, exfoliation, hydration, and nourishment in one treatment.",
        details: [
          { label: "Results", value: "Instant glow and hydration" },
          { label: "Sessions", value: "1–2 Per Month" },
          { label: "Price", value: "₹3,000–₹6,000 per session" },
        ],
        href: `${BASE}/hydrafacial`,
      },
      {
        title: "Microdermabrasion",
        description: "Remove dead skin cells and improve skin texture.",
        details: [
          { label: "Results", value: "Smoother and brighter skin" },
          { label: "Sessions", value: "4–6 Sessions" },
          { label: "Price", value: "₹1,500–₹3,500 per session" },
        ],
        href: `${BASE}/microdermabrasion`,
      },
      {
        title: "Permanent Makeup",
        description: "Long-lasting enhancement for eyebrows, eyeliner, and lips.",
        details: [
          { label: "Results", value: "Natural-looking enhancement" },
          { label: "Sessions", value: "1–2 Sessions" },
          { label: "Price", value: "₹6,000–₹20,000 per area" },
        ],
        href: `${BASE}/permanent-makeup`,
      },
    ],
  },
  {
    id: "acne",
    heading: "Acne & Scar Treatments",
    bannerKey: "acneBanner",
    treatments: [
      {
        title: "Acne Scar Reduction",
        description: "Advanced treatments including Fractional CO2 Laser and Microneedling.",
        details: [
          { label: "Results", value: "Reduced pitted scars and smoother texture" },
          { label: "Sessions", value: "3–6 Sessions" },
          { label: "Price", value: "₹4,000–₹10,000 per session" },
        ],
        href: `${BASE}/acne-scar`,
      },
      {
        title: "Chemical Peels",
        description: "Treat acne, pigmentation, and uneven skin tone.",
        details: [
          { label: "Results", value: "Clearer and brighter skin" },
          { label: "Sessions", value: "3–6 Sessions" },
          { label: "Price", value: "₹1,500–₹4,000 per session" },
        ],
        href: `${BASE}/chemical-peel`,
      },
      {
        title: "Microneedling",
        description: "Stimulate collagen production naturally.",
        details: [
          { label: "Results", value: "Reduced scars and improved texture" },
          { label: "Sessions", value: "3–5 Sessions" },
          { label: "Price", value: "₹3,500–₹7,000 per session" },
        ],
        href: `${BASE}/microneedling`,
      },
    ],
  },
  {
    id: "pigmentation",
    heading: "Pigmentation & Skin Brightening Treatments",
    bannerKey: "pigmentationBanner",
    treatments: [
      {
        title: "Skin Whitening Treatment",
        description: "Improve overall complexion and reduce pigmentation.",
        details: [
          { label: "Results", value: "Brighter and more even skin tone" },
          { label: "Sessions", value: "4–6 Sessions" },
          { label: "Price", value: "₹3,000–₹7,000 per session" },
        ],
        href: `${BASE}/skin-whitening`,
      },
      {
        title: "Dark Circles Removal",
        description: "Reduce under-eye pigmentation and puffiness.",
        details: [
          { label: "Results", value: "Refreshed and brighter under-eye area" },
          { label: "Sessions", value: "3–5 Sessions" },
          { label: "Price", value: "₹2,500–₹6,000 per session" },
        ],
        href: `${BASE}/dark-circles`,
      },
      {
        title: "Birthmark Removal",
        description: "Safe laser-based birthmark reduction.",
        details: [
          { label: "Results", value: "Clearer and more even skin" },
          { label: "Sessions", value: "2–6 Sessions" },
          { label: "Price", value: "₹3,000–₹8,000 per session" },
        ],
        href: `${BASE}/birthmark-removal-treatment`,
      },
    ],
  },
  {
    id: "medical",
    heading: "Medical Skin Treatments",
    bannerKey: "medicalBanner",
    treatments: [
      {
        title: "Eczema & Psoriasis Treatment",
        description: "Expert care for chronic skin conditions.",
        details: [
          { label: "Results", value: "Reduced flare-ups and irritation" },
          { label: "Sessions", value: "Ongoing" },
          { label: "Price", value: "₹1,500–₹3,000 per session" },
        ],
        href: "/book-consultation",
      },
      {
        title: "Laser Moles & Warts Removal",
        description: "Safe and precise laser removal.",
        details: [
          { label: "Results", value: "Smooth skin with minimal scarring" },
          { label: "Sessions", value: "1–2 Sessions" },
          { label: "Price", value: "₹2,000–₹5,000 per lesion" },
        ],
        href: `${BASE}/laser-moles-and-warts-treatment`,
      },
      {
        title: "Skin Allergy & Infection Treatments",
        description: "Treatment for skin allergies, fungal infections, rashes, and irritation.",
        details: [
          { label: "Results", value: "Relief from itching and inflammation" },
          { label: "Sessions", value: "Based on diagnosis" },
          { label: "Price", value: "₹1,000–₹2,500 per consultation" },
        ],
        href: "/book-consultation",
      },
    ],
  },
  {
    id: "vitiligo",
    heading: "Vitiligo & Skin Grafting Treatments",
    bannerKey: "vitiligoBanner",
    treatments: [
      {
        title: "Vitiligo Treatment",
        description: "Advanced options including medical therapy, PUVA therapy, and surgical treatments.",
        details: [
          { label: "Results", value: "Improved pigmentation" },
          { label: "Sessions", value: "6–12 Sessions" },
          { label: "Price", value: "₹2,000–₹5,000 per session" },
        ],
        href: `${BASE}/vitiligo`,
      },
      {
        title: "Melanocyte Transplant",
        description: "Restore natural skin color in stable vitiligo patches.",
        details: [
          { label: "Results", value: "Permanent pigmentation restoration" },
          { label: "Sessions", value: "1–2 Sittings" },
          { label: "Price", value: "₹15,000–₹40,000" },
        ],
        href: `${BASE}/vitiligo/melanocytes-transplant`,
      },
      {
        title: "Skin Grafting Surgery",
        description: "For burns, trauma, chronic wounds, and skin defects.",
        details: [
          { label: "Results", value: "Restored skin structure and function" },
          { label: "Sessions", value: "One-time Procedure" },
          { label: "Price", value: "₹20,000–₹70,000" },
        ],
        href: `${BASE}/skin-grafting`,
      },
    ],
  },
];

export const SKIN_NEARBY = ["Greater Kailash", "Nehru Place", "Alaknanda Market", "Kalkaji"] as const;

export const SKIN_VIDEO_TOPICS = [
  "Acne Treatment Journey",
  "Pigmentation Treatment Review",
  "Skin Rejuvenation Success Story",
  "Hydrafacial Experience",
] as const;

export const SKIN_FAQS: { question: string; answer: string }[] = [
  {
    question: "Which skin treatment is best for glowing skin?",
    answer:
      "Hydrafacial, carbon laser facial, and Korean-inspired hydration therapies are popular for instant glow. A consultation helps match the best option to your skin type.",
  },
  {
    question: "How many Hydrafacial sessions are required?",
    answer:
      "Many patients maintain results with 1–2 Hydrafacial sessions per month. Your dermatologist may adjust frequency based on skin goals.",
  },
  {
    question: "Is laser treatment safe?",
    answer:
      "Yes, when performed with FDA-approved devices by trained specialists. We customize laser settings for your skin type and concern.",
  },
  {
    question: "What is the cost of acne scar treatment?",
    answer:
      "Acne scar treatments such as microneedling or fractional laser typically range from ₹4,000–₹10,000 per session, with 3–6 sessions often recommended.",
  },
  {
    question: "How long does skin whitening treatment take?",
    answer:
      "Most skin brightening plans involve 4–6 sessions over several weeks, with gradual improvement in tone and pigmentation.",
  },
  {
    question: "Can pigmentation be removed permanently?",
    answer:
      "Many pigmentation concerns can be significantly reduced with laser, peels, and maintenance care. Ongoing sun protection helps sustain results.",
  },
  {
    question: "What treatment is best for dark circles?",
    answer:
      "Dark circle treatments may include laser, topical therapies, or combination approaches. We assess under-eye skin before recommending a plan.",
  },
  {
    question: "How do I choose the right skin treatment?",
    answer:
      "Book a free skin consultation at Care Well Medical Centre. We perform skin analysis and recommend a personalized treatment roadmap.",
  },
  {
    question: "What are the most popular skin treatments in Delhi?",
    answer:
      "Laser hair removal, Hydrafacial, chemical peels, acne scar reduction, and skin whitening are among our most requested treatments.",
  },
  {
    question: "Do you offer Korean skin treatments in Delhi?",
    answer:
      "Yes. We offer Korean-inspired treatments including Hydrafacial and deep hydration therapies for glass-like skin radiance.",
  },
];
