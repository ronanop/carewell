import { HAIR_LOSS_CLINIC } from "@/data/hair-loss-treatment-in-delhi";

export const COSMETIC_TREATMENTS_PATH = "/cosmetic-treatments-in-delhi" as const;

const BASE = COSMETIC_TREATMENTS_PATH;

export const COSMETIC_IMAGES = {
  heroBanner: {
    src: "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/05/anti-aging-treatments-carewell.webp",
    alt: "Cosmetic treatments and facial rejuvenation banner — Care Well Medical Centre Delhi",
  },
  portfolioOverview: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517868/carewell-media/wp/dermal-fillers-carewell.webp",
    alt: "Cosmetic treatment services overview at Care Well Medical Centre",
  },
  whyTrust: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517799/carewell-media/site/demo/about-us-consultation.jpg",
    alt: "Doctor consultation and modern cosmetic clinic at Care Well Medical Centre",
  },
  ctaBanner: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg",
    alt: "Book cosmetic treatment consultation in Delhi",
  },
  videoPoster: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517807/carewell-media/site/demo/doctor-profile-feature.jpg",
    alt: "Cosmetic treatment patient testimonial video",
  },
  gallery: [
    {
      src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517871/carewell-media/wp/lip-augmentation.webp",
      alt: "Lip augmentation result",
      caption: "Lip augmentation",
    },
    {
      src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517872/carewell-media/wp/botox-treatment-carewell.webp",
      alt: "Botox transformation",
      caption: "Botox treatment",
    },
    {
      src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517873/carewell-media/wp/thread-lift-carewell.webp",
      alt: "Thread lift result",
      caption: "Thread lift",
    },
    {
      src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517874/carewell-media/wp/double-chin-removal-carewell.webp",
      alt: "Double chin removal result",
      caption: "Double chin removal",
    },
    {
      src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517868/carewell-media/wp/dermal-fillers-carewell.webp",
      alt: "Dermal filler enhancement",
      caption: "Dermal fillers",
    },
    {
      src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517875/carewell-media/wp/hifu-Treatment-carewell.webp",
      alt: "HIFU skin tightening result",
      caption: "HIFU skin tightening",
    },
  ],
} as const;

export const COSMETIC_TREATMENTS_SEO = {
  title:
    "Best Cosmetic Treatments in Delhi | Skin, Face & Body Solutions | Care Well Medical Centre",
  description:
    "Best cosmetic treatments in Delhi for skin, face, and body at Care Well Medical Centre. Botox, fillers, HIFU, thread lift & more — natural results. Book now.",
} as const;

export const COSMETIC_PAGE = {
  h1: "Cosmetic Treatments in Delhi",
  introHeading: "Glow with Care Well Medical Centre's Innovative Cosmetic Treatments in Delhi",
  tagline:
    "Advanced cosmetic treatments in Delhi — safe, effective, and tailored for natural-looking results.",
  introParagraphs: [
    "Want to enhance your beauty, boost your confidence, and achieve a natural look?",
    "Visit Care Well Medical Centre for advanced cosmetic treatments in Delhi. Our state-of-the-art technology and modern aesthetic procedures offer safe, effective, and natural-looking results.",
    "Whether you want to refresh your appearance, regain confidence, or enhance your natural beauty, our experienced specialists create personalized treatment plans tailored specifically for you.",
  ],
  whyChooseHeading: "Why Choose Our Cosmetic Treatments?",
  whyChoose: [
    "Advanced Technology",
    "Personalized Treatment Plans",
    "Safe & Minimally Invasive Procedures",
    "Natural-Looking Results",
    "Experienced Cosmetic Specialists",
    "Modern Treatment Facilities",
  ],
  portfolioHeading: "Exploring Our Cosmetic Treatment Portfolio in Delhi",
  whyTrustHeading: "Why Trust Care Well Medical Centre for Cosmetic Treatments in Delhi?",
  whyTrustIntro:
    "At Care Well Medical Centre, you are in safe hands. Our experienced specialists combine expertise with advanced technology to deliver cosmetic treatments that are effective, safe, and minimally invasive.",
  whyTrustSubheading: "What Makes Us Different?",
  whyTrustItems: [
    "Experienced Cosmetic Experts",
    "Personalized Care",
    "Advanced Technologies",
    "Patient Safety First",
    "Natural Results",
    "Proven Outcomes",
  ],
  whyTrustClosing:
    "From consultation to recovery, we focus on delivering exceptional patient experiences and long-lasting results.",
  galleryHeading: "Before & After Results",
  testimonialsHeading: "Patient Testimonials",
  appointmentHeading: "Fix Your Appointment Today for a Glowy Tomorrow!",
  appointmentBody:
    "Enhance your natural beauty with professional cosmetic treatments in Delhi. Take the first step toward flawless skin, a youthful appearance, and enhanced confidence.",
  appointmentGoals: ["Flawless Skin", "Youthful Appearance", "Enhanced Confidence"],
  faqHeading: "Frequently Asked Questions (FAQs)",
  clinicHeading: "Clinic Information",
  disclaimer:
    "Treatment suitability and results vary between individuals. A consultation is recommended to determine the most appropriate cosmetic treatment for your goals.",
  treatmentDropdownLabel: "Cosmetic Treatments",
} as const;

export { HAIR_LOSS_CLINIC as COSMETIC_CLINIC };

export const COSMETIC_OPENING_HOURS = [
  { day: "Sunday", timing: "10:00 AM – 8:00 PM" },
  { day: "Monday", timing: "10:00 AM – 8:00 PM" },
  { day: "Tuesday", timing: "10:00 AM – 8:00 PM" },
  { day: "Wednesday", timing: "10:00 AM – 8:00 PM" },
  { day: "Thursday", timing: "10:00 AM – 8:00 PM" },
  { day: "Friday", timing: "10:00 AM – 8:00 PM" },
  { day: "Saturday", timing: "10:00 AM – 8:00 PM" },
] as const;

export const COSMETIC_VIDEO_TOPICS = [
  "Lip Augmentation Experience",
  "Botox Treatment Journey",
  "HIFU Success Story",
  "Facial Rejuvenation Results",
] as const;

export type CosmeticTreatmentItem = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  benefits?: readonly string[];
  treatmentOptions?: readonly string[];
  commonAreas?: readonly string[];
  href?: string;
  comingSoon?: boolean;
};

export const COSMETIC_TREATMENTS: readonly CosmeticTreatmentItem[] = [
  {
    title: "Lip Augmentation",
    description:
      "Plump, define, and balance your lips with safe and customized lip augmentation treatments.",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517871/carewell-media/wp/lip-augmentation.webp",
    imageAlt: "Lip augmentation before and after results",
    benefits: ["Enhanced lip volume", "Better lip definition", "Improved symmetry", "Natural-looking enhancement"],
    treatmentOptions: ["Dermal Fillers", "Fat Grafting"],
    href: `${BASE}/lip-augmentation`,
  },
  {
    title: "Brow Lift",
    description:
      "Achieve a refreshed and youthful appearance by correcting drooping brows and tired-looking eyes.",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517876/carewell-media/wp/eyebrow-lift-carewell.webp",
    imageAlt: "Brow lift before and after results",
    benefits: ["Lifted eyebrows", "Refreshed appearance", "Open eye area", "Youthful facial expression"],
    href: `${BASE}/brow-lift`,
  },
  {
    title: "Thread Lift",
    description: "Achieve firmer, lifted skin without surgery.",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517873/carewell-media/wp/thread-lift-carewell.webp",
    imageAlt: "Thread lift procedure",
    benefits: ["Non-surgical facelift", "Improved skin tightness", "Better facial contours", "Minimal downtime"],
    href: `${BASE}/thread-lift`,
  },
  {
    title: "HIFU Treatment",
    description:
      "A safe, non-surgical facelift alternative that stimulates collagen production and tightens loose skin.",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517875/carewell-media/wp/hifu-Treatment-carewell.webp",
    imageAlt: "HIFU skin tightening treatment",
    benefits: ["Skin tightening", "Collagen stimulation", "Reduced signs of aging", "Improved facial contours"],
    href: `${BASE}/hifu`,
  },
  {
    title: "Double Chin Removal",
    description:
      "Reduce stubborn chin fat and improve jawline definition with advanced non-surgical treatments.",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517874/carewell-media/wp/double-chin-removal-carewell.webp",
    imageAlt: "Double chin before and after results",
    benefits: ["Defined jawline", "Better facial profile", "Reduced chin fat", "Improved facial contours"],
    href: `${BASE}/double-chin-removal`,
  },
  {
    title: "Face Slimming",
    description: "Reshape and contour your face naturally without surgery.",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517877/carewell-media/wp/face-slimming-carewell.webp",
    imageAlt: "Face slimming transformation",
    benefits: ["Reduced facial puffiness", "Better jawline definition", "Slimmer appearance", "Improved facial balance"],
    href: `${BASE}/face-slimming`,
  },
  {
    title: "Vampire Facelift",
    description: "Rejuvenate aging skin using your body's natural healing capabilities.",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517878/carewell-media/wp/vampire-facelift-carewell.webp",
    imageAlt: "Vampire facelift procedure",
    benefits: ["Improved skin texture", "Increased collagen production", "Better skin tone", "Natural rejuvenation"],
    href: `${BASE}/vampire-facelift`,
  },
  {
    title: "Dermal Fillers",
    description: "Restore volume, smooth wrinkles, and enhance facial features with premium dermal fillers.",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517868/carewell-media/wp/dermal-fillers-carewell.webp",
    imageAlt: "Dermal fillers before and after results",
    commonAreas: ["Lips", "Cheeks", "Jawline", "Nasolabial folds", "Under-eye hollows"],
    benefits: ["Immediate results", "Minimal downtime", "Natural enhancement", "Facial rejuvenation"],
    href: `${BASE}/dermal-fillers`,
  },
  {
    title: "Laser Hair Removal",
    description: "Achieve smooth skin with safe and long-lasting hair reduction treatments.",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517879/carewell-media/wp/laser-hair-removal.jpg",
    imageAlt: "Laser hair removal treatment",
    commonAreas: ["Face", "Arms", "Legs", "Underarms", "Bikini Area", "Full Body"],
    benefits: ["Long-term hair reduction", "Smooth skin", "Safe treatment", "Precision targeting"],
    href: `${BASE}/laser-hair-removal`,
  },
  {
    title: "Botox",
    description: "Reduce wrinkles and redefine facial features with expertly administered Botox treatments.",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517872/carewell-media/wp/botox-treatment-carewell.webp",
    imageAlt: "Botox before and after results",
    commonAreas: ["Forehead", "Frown lines", "Crow's feet", "Jawline", "Neck"],
    benefits: ["Smoother skin", "Younger appearance", "Quick procedure", "Minimal recovery time"],
    href: `${BASE}/botox`,
  },
  {
    title: "Anti-Aging Treatments",
    description: "Restore youthful skin through customized anti-aging treatment solutions.",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517867/carewell-media/wp/anti-aging-treatments-carewell.webp",
    imageAlt: "Anti-aging treatment results",
    treatmentOptions: ["Botox", "Dermal Fillers", "HIFU", "PRP Therapy", "Skin Rejuvenation"],
    benefits: ["Reduced wrinkles", "Improved elasticity", "Better hydration", "Youthful appearance"],
    href: `${BASE}/anti-aging`,
  },
  {
    title: "Coming Soon",
    description: "Exciting new cosmetic treatments and technologies will be available soon at Care Well Medical Centre.",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg",
    imageAlt: "Upcoming cosmetic treatments",
    comingSoon: true,
  },
];

export const COSMETIC_TREATMENTS_FAQS: { question: string; answer: string }[] = [
  {
    question: "Which cosmetic treatment is best for facial rejuvenation?",
    answer:
      "The best option depends on your skin type, age, and goals. Botox, dermal fillers, HIFU, thread lifts, and PRP-based treatments are popular for facial rejuvenation. Our specialists recommend a personalized plan after consultation.",
  },
  {
    question: "Is Botox safe?",
    answer:
      "Yes. When administered by trained medical professionals using approved products, Botox is considered safe. We follow strict protocols and tailor dosage to your anatomy for natural results.",
  },
  {
    question: "How long do dermal fillers last?",
    answer:
      "Results typically last 6 to 18 months depending on the filler type, treatment area, and your metabolism. Maintenance sessions can extend results.",
  },
  {
    question: "Is HIFU better than a facelift?",
    answer:
      "HIFU is a non-surgical alternative for mild to moderate skin laxity with minimal downtime. Surgical facelifts may be better for advanced sagging. We help you choose the right approach during consultation.",
  },
  {
    question: "What is the recovery time after a thread lift?",
    answer:
      "Most patients resume normal activities within a few days. Mild swelling or bruising may occur and usually subsides quickly. Full results develop over several weeks as collagen remodels.",
  },
  {
    question: "Can double chin fat be removed without surgery?",
    answer:
      "Yes. Non-surgical options such as injectable fat-dissolving treatments and contouring procedures can reduce submental fat and improve jawline definition without surgery.",
  },
  {
    question: "How many laser hair removal sessions are required?",
    answer:
      "Most patients need 6 to 8 sessions spaced several weeks apart for optimal long-term hair reduction. The exact number depends on hair type, skin tone, and treatment area.",
  },
  {
    question: "Which cosmetic treatment is suitable for me?",
    answer:
      "Your skin condition, medical history, and aesthetic goals determine the best treatment. Book a consultation at Care Well Medical Centre for an expert assessment and tailored recommendation.",
  },
];
