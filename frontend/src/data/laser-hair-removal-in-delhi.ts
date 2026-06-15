import { COSMETIC_TREATMENTS_PATH } from "@/data/cosmetic-treatments-in-delhi";
import { HAIR_LOSS_CLINIC } from "@/data/hair-loss-treatment-in-delhi";

export const LASER_HAIR_REMOVAL_PATH = "/cosmetic-treatments-in-delhi/laser-hair-removal" as const;

const WP = "https://www.carewellmedicalcentre.com/wp-content/uploads";
const BASE = LASER_HAIR_REMOVAL_PATH;

export const LASER_HAIR_REMOVAL_IMAGES = {
  hero: {
    src: `${WP}/2025/05/laser-hair-removal.jpg`,
    alt: "Laser hair removal treatment for women in Delhi",
  },
  areas: {
    src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517879/carewell-media/wp/laser-hair-removal.jpg`,
    alt: "Full body laser hair removal treatment areas infographic at Care Well Medical Centre Delhi",
  },
  safety: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517799/carewell-media/site/demo/about-us-consultation.jpg",
    alt: "Doctor-supervised laser hair removal safety protocol with patch test at Care Well Medical Centre Delhi",
  },
  doctor: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517806/carewell-media/site/demo/doctor-profile-feature-vertical.png",
    alt: "Dr. Sandeep Bhasin — laser hair removal expert in Delhi",
  },
  videoPoster: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517807/carewell-media/site/demo/doctor-profile-feature.jpg",
    alt: "Full body laser hair removal explained by Dr. Sandeep Bhasin",
  },
  beforeAfter: [
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517879/carewell-media/wp/laser-hair-removal.jpg`,
      alt: "Laser hair removal before and after results in Delhi",
      caption: "Smooth, hair-free skin",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517879/carewell-media/wp/laser-hair-removal.jpg`,
      alt: "Underarm laser hair removal results Delhi",
      caption: "Underarm treatment",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517879/carewell-media/wp/laser-hair-removal.jpg`,
      alt: "Full body laser hair removal before and after Delhi",
      caption: "Full body package",
    },
  ],
} as const;

export const LASER_HAIR_REMOVAL_SEO = {
  title: "Laser Hair Removal in Delhi | Cost, Packages and Long Lasting Results | Care Well Medical Centre",
  description:
    "Laser hair removal in Delhi at Care Well Medical Centre. US-FDA diode & alexandrite lasers for Indian skin. Full body & area-wise packages by Dr. Sandeep Bhasin. Book now.",
} as const;

export type LaserAreaOption = {
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
};

export const LASER_AREA_OPTIONS: LaserAreaOption[] = [
  {
    title: "Face and Upper Lip",
    body: "Facial laser hair removal targets upper lip, chin, side locks, and jawline precisely so makeup sits better on smoother skin.",
    href: `${BASE}/facial`,
    linkLabel: "Facial laser hair removal in Delhi",
  },
  {
    title: "Underarms",
    body: "Underarm laser hair removal softens regrowth, reduces dark appearance, and keeps the area cleaner with less irritation in Delhi heat.",
    href: `${BASE}/underarm`,
    linkLabel: "Underarm laser hair removal in Delhi",
  },
  {
    title: "Legs",
    body: "Legs laser hair removal helps maintain smooth legs with far fewer salon visits. Many patients combine legs with underarms in one session.",
    href: `${BASE}/legs`,
    linkLabel: "Legs laser hair removal in Delhi",
  },
  {
    title: "Bikini and Brazilian",
    body: "Bikini and Brazilian laser hair removal offers a hygienic, low-maintenance option with fewer ingrown hairs and less friction.",
    href: `${BASE}/bikini-brazilian`,
    linkLabel: "Bikini laser hair removal in Delhi",
  },
  {
    title: "Chest, Back and Shoulders for Men",
    body: "Chest and back laser hair removal helps men look neater in shirts and gym wear without repeated full body waxing.",
    href: `${BASE}/chest-back`,
    linkLabel: "Chest & back laser hair removal in Delhi",
  },
  {
    title: "Neck and Beard Line",
    body: "Neck and beard line laser hair removal creates a clean, maintainable shape for working professionals and students.",
    href: `${BASE}/neck-beard`,
    linkLabel: "Neck & beard line laser in Delhi",
  },
  {
    title: "Eyebrow and Unibrow",
    body: "Eyebrow and unibrow laser hair removal maintains a neat, natural frame without constant threading.",
    href: `${BASE}/eyebrow-unibrow`,
    linkLabel: "Eyebrow laser hair removal in Delhi",
  },
  {
    title: "Full Body Laser Hair Removal for Women and Men",
    body: "Female and male full body plans combine face, arms, legs, underarms, bikini, chest, and back into one coordinated package with better value than separate areas.",
    href: `${BASE}/female`,
    linkLabel: "Female full body laser",
  },
];

export const LASER_HAIR_REMOVAL_COST_ROWS = [
  { area: "Upper lip / Chin", perSession: "₹1,500 – ₹2,000", package: "₹8,000 – ₹10,000" },
  { area: "Underarms", perSession: "₹3,000 – ₹4,000", package: "₹15,000 – ₹20,000" },
  { area: "Full face", perSession: "₹4,000 – ₹6,000", package: "₹24,000 – ₹30,000" },
  { area: "Bikini / Brazilian", perSession: "₹5,000 – ₹6,000", package: "₹30,000 – ₹36,000" },
  { area: "Full arms / Full legs", perSession: "₹5,000 – ₹7,000", package: "₹30,000 – ₹42,000" },
  { area: "Chest or Back", perSession: "₹5,000 – ₹7,000", package: "₹30,000 – ₹42,000" },
  { area: "Full body (women or men)", perSession: "₹18,000 – ₹25,000", package: "₹80,000 – ₹1,20,000" },
] as const;

export const LASER_HAIR_REMOVAL_PAGE = {
  h1: "Laser Hair Removal in Delhi – Cost, Packages and Long Lasting Results",
  subtitle: "US-FDA Diode & Alexandrite Lasers · South Delhi",
  tagline:
    "Replace painful waxing and rushed shaving with smooth, long-lasting hair reduction using medical-grade lasers suitable for Indian skin tones — doctor-planned at every session.",
  parentLabel: "Cosmetic Treatments in Delhi",
  parentPath: COSMETIC_TREATMENTS_PATH,
  treatmentDropdownLabel: "Laser Hair Removal",
  introParagraphs: [
    "Laser hair removal in Delhi at Care Well Medical Centre helps you achieve smooth, long-lasting hair reduction without constant waxing or shaving.",
    "Every session is doctor-planned, fully explained, and designed for predictable, ethical results without aggressive package selling. Our C.R. Park, South Delhi centre is easily accessible from Greater Kailash, Nehru Place, and Delhi NCR.",
  ],
  whyLaserHeading: "Why Choose Laser Hair Removal Instead of Waxing or Shaving?",
  whyLaserIntro:
    "Waxing or shaving gives only a few days of relief before stubble, rashes, and ingrown hair return — worse in Delhi's heat and humidity on underarms, bikini line, and beard areas.",
  whyLaserBenefits: [
    "Long-lasting smoothness — hair grows back finer and lighter after each planned session",
    "Reduces ingrown hair and razor bumps for clearer, more comfortable skin",
    "Suits Delhi weather — less friction and fewer emergency shaves mean fewer rashes and irritation",
    "Saves time and money long term compared to endless waxing, threading, and parlour visits",
  ],
  howWorksHeading: "What Is Laser Hair Removal and How Does It Work?",
  howWorksIntro:
    "Laser hair removal uses concentrated light to damage hair follicles and slow regrowth. The laser targets pigment in each hair root, converts light to gentle heat, and weakens the follicle so hair grows back finer and sparser.",
  howWorksPoints: [
    "Targets melanin in the hair root — darker, thicker hair responds better",
    "Heats and damages the follicle from within, slowing or stopping future growth",
    "Beam calibrated to spare surrounding skin — safe for face, underarms, bikini, chest, back, and full body",
  ],
  technologyHeading: "Laser Technology We Use – Diode and Alexandrite for Indian Skin",
  technologyIntro:
    "We use only US-FDA approved diode and alexandrite lasers, planned for Indian skin tones, Delhi sun exposure, and your exact hair thickness.",
  diodeLaser:
    "Diode Laser — suits medium to dark Indian skin with thicker hair on underarms, bikini, chest, back, and legs. Deeper wavelength and strong cooling target coarse roots while keeping skin comfortable.",
  alexandriteLaser:
    "Alexandrite Laser — works well for lighter skin tones and finer hair on arms, legs, and selected facial areas. Covers larger areas quickly for busy professionals and students.",
  technologyClosing:
    "We decide the exact laser type and energy settings only after detailed skin and hair analysis during consultation.",
  areasHeading: "Full Body and Area Wise Laser Hair Removal Options",
  areasIntro:
    "Not everyone needs full body laser from day one. We offer area-wise and full body options with clear, flexible plans — start with one area and upgrade when confident.",
  maleFullBodyNote: "Men can explore our male full body laser hair removal plan.",
  maleFullBodyHref: `${BASE}/male`,
  resultsHeading: "Laser Hair Removal Before and After Results in Delhi",
  resultsIntro:
    "Every before and after result is from actual patients treated at Care Well Medical Centre under Dr. Sandeep Bhasin's supervision — without filters or fake lighting.",
  resultsPoints: [
    "Watch laser hair removal videos to see the full procedure and results",
    "View short result videos from Delhi NCR patients",
    "Read live Google reviews below for honest feedback",
  ],
  resultsClosing:
    "Results vary by hair type, hormones, and lifestyle. Real patients. Real confidence. Real results.",
  videoHeading: "Full Body Laser Hair Removal Explained by Dr. Sandeep Bhasin",
  videoPoints: [
    "Complete journey from consultation and patch test to full body sessions",
    "How the laser feels, cooling measures used, and how redness settles",
    "How many sessions most patients need and what hair reduction to expect over time",
  ],
  costHeading: "Laser Hair Removal Cost in Delhi – Area Wise and Full Body Packages",
  costIntro:
    "Cost depends on body area, hair density, and skin type. Smaller areas start around ₹1,500 per session; legs or back range ₹5,000–₹7,000. Full body commonly falls between ₹18,000–₹25,000 per session.",
  costQuoteNote:
    "Your exact quote is always confirmed after consultation and skin analysis — no confusion before you begin.",
  costPackageNote:
    "Full body packages usually save 30–40% compared with booking separate areas repeatedly. Our pricing includes doctor-led planning and medical-grade treatment — not technician-only chain clinic offers.",
  safetyHeading: "Is Full Body Laser Hair Removal Safe? Side Effects and Recovery",
  safetyIntro:
    "We treat laser hair removal as a medical procedure. When done on the right skin type with correct settings and aftercare, it is generally safe and predictable.",
  mildEffectsHeading: "Common Mild, Temporary Effects",
  mildEffects: [
    "Slight redness for a few hours",
    "Mild warmth, tingling, or sensitivity after the session",
    "Light follicle swelling that settles quickly",
  ],
  rareRisksHeading: "Less Common Risks with Untrained Providers",
  rareRisks: [
    "Burns or blisters from incorrect settings or poor cooling",
    "Skin darkening or lightening in sensitive or recently tanned areas",
    "Rare scarring when aftercare is ignored or infection develops",
  ],
  safetyClosing:
    "Every session is doctor supervised with skin assessment, patch testing, and medical-grade protocols.",
  candidateHeading: "Who Is the Right Candidate for Laser Hair Removal in Delhi NCR?",
  candidateIntro:
    "Laser hair removal suits you when you want long-term hair reduction, not endless parlour visits.",
  candidateItems: [
    "Dark, coarse hair on face, underarms, legs, bikini, chest, back, or shoulders",
    "Tired of repeated waxing, threading, or shaving every few weeks",
    "Ingrown hair, razor bumps, or strawberry legs",
    "Busy lifestyle wanting low-maintenance smooth skin",
    "Bride, groom, model, or professional needing camera-ready skin",
    "Prefer doctor-supervised medical-grade treatment over salon experiments",
  ],
  avoidHeading: "When We May Delay or Avoid Treatment",
  avoidItems: [
    "Pregnant or currently breastfeeding",
    "Active infection, cuts, or severe irritation in the area",
    "Strong photosensitive medicines without medical clearance",
    "Very light, white, or grey hair with almost no pigment",
  ],
  sessionsHeading: "How Many Sessions Does Full Body Laser Hair Removal Take?",
  sessionsIntro:
    "Typically 6–8 sessions with 4–6 week gaps, aligned with the natural hair growth cycle for safer, more stable results.",
  sessionTiming: [
    "Small areas (upper lip, underarms): 10–15 minutes",
    "Larger areas (legs, chest, back): 30–40 minutes",
    "Full body: about 1–1.5 hours per session",
  ],
  sessionsClosing:
    "Most patients achieve 70–80% hair reduction after a planned package, with finer and slower regrowth.",
  whyClinicHeading: "Why Care Well Medical Centre Is One of the Best Laser Hair Removal Clinics in Delhi",
  whyClinicIntro:
    "Choosing the right clinic matters more than the cheapest package. We focus on experience, safety, and transparent communication.",
  whyClinicItems: [
    "3,000+ laser hair removal sessions with doctor-led planning",
    "US-FDA approved diode and alexandrite lasers calibrated for Indian skin",
    "Separate protocols for male and female skin",
    "Private, hygienic treatment rooms with strict infection control",
    "Patients visit from across Delhi NCR — Noida, Faridabad, and Gurgaon",
  ],
  consultationHeading: "Book Your Laser Hair Removal Consultation in South Delhi",
  consultationBody:
    "You do not need to live with constant waxing, shaving, and irritation. Start with a clear, doctor-supervised consultation at Care Well Medical Centre.",
  consultationLocation:
    "Care Well Medical Centre, House No. 1, NRI Complex, C.R. Park, South Delhi — near Greater Kailash, Nehru Place, and Alaknanda.",
  consultationNote:
    "Weekend and evening slots for full body plans fill quickly — pre-book your consultation to secure your preferred time.",
  faqHeading: "FAQs About Laser Hair Removal in Delhi",
  disclaimer:
    "Treatment suitability, session count, and results vary between individuals. Laser hair removal should only be performed after consultation with a qualified medical professional. This page is for informational purposes and does not replace medical advice.",
} as const;

export { HAIR_LOSS_CLINIC as LASER_HAIR_REMOVAL_CLINIC };

export const LASER_HAIR_REMOVAL_FAQS: { question: string; answer: string }[] = [
  {
    question: "Is laser hair removal safe for Indian skin?",
    answer:
      "Yes, when the right laser and settings are used. We use US-FDA approved diode and alexandrite lasers and always perform a patch test before full treatment.",
  },
  {
    question: "What is the cost of full body laser hair removal in Delhi?",
    answer:
      "Full body laser hair removal typically costs ₹18,000 to ₹25,000 per session. Exact pricing depends on coverage, hair density, and your package plan.",
  },
  {
    question: "Does laser hair removal give permanent results?",
    answer:
      "Laser gives long-term hair reduction, not a one-time permanent cure. Most patients see 70–80% reduction with finer, slower regrowth and may need occasional maintenance.",
  },
  {
    question: "Can men get full body laser hair removal?",
    answer:
      "Yes. Many men choose laser for chest, back, shoulders, beard lines, and full body. We follow separate male protocols for natural, maintainable results.",
  },
  {
    question: "How many sessions will I need?",
    answer:
      "Most people need 6–8 sessions with 4–6 week gaps. Hormonal issues, thick hair, or very large areas may need extra sittings or later top-ups.",
  },
  {
    question: "How long does one session take?",
    answer:
      "Upper lip or underarms: 10–15 minutes. Legs, chest, or back: 30–40 minutes. Full body: about 1–1.5 hours.",
  },
  {
    question: "What should I avoid before and after treatment?",
    answer:
      "Before: avoid waxing, plucking, bleaching, and strong activity in the area. After: avoid hot showers, steam, tight clothing, and direct sun for 48 hours; use soothing gel and sunscreen as advised.",
  },
];
