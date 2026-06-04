import { HAIR_LOSS_CLINIC } from "@/data/hair-loss-treatment-in-delhi";
import { HAIR_TRANSPLANT_HUB_PATH } from "@/data/hair-transplant-cost-in-delhi";

export const HAIR_TRANSPLANT_BEFORE_AFTER_PATH = "/hair-transplant-in-delhi/before-and-after" as const;

const R = "/images/hair-transplant-results";
const IMG = "/images";

export const HT_BA_IMAGES = {
  vijayHero: [
    {
      src: `${R}/result-3500-grafts-1.png`,
      alt: "Vijay — top view before and after hair transplant",
      caption: "Top view — hair density restoration",
    },
    {
      src: `${R}/result-3500-grafts-2.png`,
      alt: "Vijay — back view crown restoration",
      caption: "Back view — crown restoration",
    },
    {
      src: `${R}/result-8000-grafts-1.png`,
      alt: "Vijay — front view hairline restoration",
      caption: "Front view — hairline restoration",
    },
    {
      src: `${R}/result-8000-grafts-2.png`,
      alt: "Vijay — side view temple restoration",
      caption: "Side view — temple restoration",
    },
  ],
  successCollage: {
    src: `${IMG}/hair-transplant-before-after-promo.jpg`,
    alt: "Hair restoration success collage — Care Well Medical Centre",
  },
  timeline: {
    src: `${IMG}/hair-transplant-process-infographic.png`,
    alt: "Hair transplant growth timeline infographic",
  },
  doctor: {
    src: "/demo/doctor-profile-feature.png",
    alt: "Dr. Sandeep Bhasin — cosmetic surgeon, Care Well Medical Centre",
  },
  clinic: {
    src: "/beardtranplantindelhi/care-well-medical-centre-delhi-clinic-exterior-1.webp",
    alt: "Care Well Medical Centre clinic interior and surgical team",
  },
  ctaBanner: {
    src: `${IMG}/hair-transplant-before-after-promo.jpg`,
    alt: "Before and after hair transplant — book consultation",
  },
  videoPoster: {
    src: `${IMG}/hair-transplant-before-after-promo.jpg`,
    alt: "Patient hair transplant transformation video",
  },
  gallerySections: [
    {
      title: "Crown Hair Restoration",
      images: [
        { src: `${R}/result-3500-grafts-2.png`, alt: "Hair transplant before and after — crown", caption: "Crown density improvement" },
        { src: `${R}/result-8000-grafts-3.png`, alt: "Hair transplant before and after result photo — crown", caption: "Crown coverage result" },
      ],
    },
    {
      title: "Hairline Restoration",
      images: [
        { src: `${R}/result-3500-grafts-1.png`, alt: "Before and after hair restoration — hairline", caption: "Natural hairline design" },
        { src: `${R}/result-8000-grafts-1.png`, alt: "Before and after hair restoration photo", caption: "Front hairline transformation" },
      ],
    },
    {
      title: "Female Hair Transplant Results",
      images: [
        {
          src: "/femaletansplantindelhi/female-hair-transplant-before-after-indian-woman.webp",
          alt: "Female hair transplant results",
          caption: "Female hair density restoration",
        },
        {
          src: "/femaletansplantindelhi/female-hair-transplant-before-and-after-photo-min-1.jpg.webp",
          alt: "Female hair transplant result photo",
          caption: "Natural female hairline",
        },
      ],
    },
    {
      title: "FUE Hair Transplant Results",
      images: [
        { src: `${R}/result-3500-grafts-3.png`, alt: "Natural results after FUE hair transplant", caption: "FUE — natural density" },
        { src: `${R}/result-8000-grafts-2.png`, alt: "FUE hair transplant before and after", caption: "FUE hairline and temples" },
      ],
    },
    {
      title: "Senior Patient Results",
      images: [
        { src: `${R}/result-8000-grafts-1.png`, alt: "Older male patient hair transplant results", caption: "Senior patient — full restoration" },
        { src: `${R}/result-8000-grafts-3.png`, alt: "Crown restoration in senior patient", caption: "Crown restoration — senior patient" },
      ],
    },
  ],
  treatmentGrid: [
    { title: "Hairline Reconstruction", src: `${R}/result-3500-grafts-1.png`, alt: "Hairline reconstruction before and after" },
    { title: "Crown Restoration", src: `${R}/result-3500-grafts-2.png`, alt: "Crown restoration before and after" },
    { title: "Female Hair Transplant", src: "/femaletansplantindelhi/female-hair-transplant-before-after-indian-woman.webp", alt: "Female hair transplant before and after" },
    { title: "FUE Hair Transplant", src: `${R}/result-3500-grafts-3.png`, alt: "FUE hair transplant before and after" },
    { title: "FUT Hair Transplant", src: `${R}/result-8000-grafts-1.png`, alt: "FUT hair transplant before and after" },
  ],
} as const;

export const HT_BA_SEO = {
  title: "Hair Transplant Before & After Results | Real Patient Photos | Care Well Medical Centre",
  description:
    "View real hair transplant before and after results at Care Well Medical Centre, Delhi. FUE, FUT, crown & hairline transformations by Dr. Sandeep Bhasin.",
} as const;

export const HT_BA_PAGE = {
  h1: "Hair Transplant Before & After Results – Real Patient Transformations",
  heroSubheading: "See Real Hair Transplant Results from Patients at Care Well Medical Centre",
  parentLabel: "Hair Transplant in Delhi",
  parentPath: HAIR_TRANSPLANT_HUB_PATH,
  treatmentDropdownLabel: "Hair Transplant Consultation",
  witnessHeading: "Witness Life-Changing Hair Transplant Transformations",
  witnessIntro:
    "Are you struggling with baldness or hair thinning? At Care Well Medical Centre, our Hair Transplant Before & After Results showcase real patient transformations achieved through advanced hair restoration procedures.",
  witnessPoints: [
    "Receding hairlines can be restored",
    "Crown baldness can be treated",
    "Hair density can be improved",
    "Natural-looking hairlines can be recreated",
  ],
  witnessNote: "Every result displayed is based on actual patient outcomes.",
  whyHeading: "Why Choose Our Hair Transplant Procedures?",
  whyCta: "Book a Free Consultation Today",
  storiesHeading: "See How Our Patients Got Their Natural Hair Back",
  galleryHeading: "Real Hair Transplant Before & After Gallery",
  gallerySubheading: "Real Patient Results",
  galleryNoteIntro: "Results may vary based on:",
  galleryNoteFactors: [
    "Hair density",
    "Donor area quality",
    "Scalp condition",
    "Baldness grade",
    "Post-surgery care",
  ],
  servicesHeading: "Our Hair Restoration Services",
  reviewsHeading: "Hear From Our Happy Patients",
  reviewsSubheading: "Real Experiences. Real Results.",
  journeyHeading: "A Patient's 12-Month Hair Transplant Journey",
  journeyBody:
    "Follow a real patient through every stage: hair transplant procedure, recovery, hair shedding phase, regrowth, and final results.",
  timelineHeading: "Hair Transplant Growth Timeline – What to Expect?",
  timelineNote:
    "Patience is essential. Hair transplantation delivers permanent and natural results gradually.",
  testimonialsHeading: "Hear What Our Happy Patients Say",
  doctorHeading: "A Personal Message from Dr. Sandeep Bhasin",
  doctorQuote: `As a cosmetic surgeon practicing in Delhi for over 15 years, I have seen how deeply hair loss can affect a person's confidence, relationships, and daily happiness.

At Care Well Medical Centre, my mission goes beyond restoring hair — it is about helping people feel like themselves again.

Every before-and-after photo on this page represents a real transformation story. Yours could be next.

During your consultation, we will assess your scalp health, understand your goals, evaluate donor availability, and create a personalized treatment plan.

You deserve natural, permanent hair that truly feels your own. Let's begin your journey today.`,
  doctorBullets: [
    "Assess your scalp health",
    "Understand your goals",
    "Evaluate donor availability",
    "Create a personalized treatment plan",
  ],
  achievementsHeading: "Why Choose Care Well Medical Centre?",
  achievementsSubheading: "Our Achievements",
  treatmentTypesHeading: "Patient Results by Treatment Type",
  faqHeading: "Frequently Asked Questions",
  ctaHeading: "Ready to Start Your Transformation?",
  ctaBody: "Restore your hair. Restore your confidence. Restore your natural appearance.",
  journeyClosing: "Your before-and-after success story starts with a consultation.",
  disclaimer:
    "Individual results vary. Photos represent actual patients treated at Care Well Medical Centre. A personal consultation is required to determine suitability and expected outcomes.",
} as const;

export { HAIR_LOSS_CLINIC as HT_BA_CLINIC };

export const HT_BA_WHY_ITEMS = [
  { title: "100% Natural Results", body: "No artificial appearance. Only natural-looking hair growth." },
  { title: "Painless Procedure", body: "Performed under local anesthesia for maximum comfort." },
  { title: "No Visible Scarring", body: "Advanced FUE and FUT techniques minimize visible scars." },
  { title: "Permanent Hair Growth", body: "Transplanted follicles continue growing for life." },
] as const;

export const HT_BA_SERVICES = [
  {
    title: "FUE Hair Transplant",
    points: ["High success rate", "Minimal scarring"],
    href: HAIR_TRANSPLANT_HUB_PATH,
    linkLabel: "Learn More About FUE Hair Transplant",
  },
  {
    title: "FUT Hair Transplant",
    points: ["Suitable for extensive baldness", "Higher graft yield"],
    href: HAIR_TRANSPLANT_HUB_PATH,
    linkLabel: "Learn More About FUT Hair Transplant",
  },
  {
    title: "Beard & Eyebrow Transplant",
    points: ["Natural facial hair restoration"],
    href: "/hair-transplant-in-delhi/beard",
    linkLabel: "Learn More About Beard & Eyebrow Transplants",
  },
] as const;

export const HT_BA_TIMELINE_ROWS = [
  { time: "1 Month", progress: "Transplanted hairs shed (shock loss); new growth begins" },
  { time: "3 Months", progress: "Early hair growth becomes visible" },
  { time: "6 Months", progress: "Significant density improvement" },
  { time: "12 Months", progress: "Full natural-looking results" },
] as const;

export const HT_BA_ACHIEVEMENTS = [
  "1000+ Successful Hair Transplants",
  "15+ Years of Surgical Experience",
  "Advanced Hair Restoration Technology",
  "Natural & Permanent Results",
  "Personalized Treatment Planning",
] as const;

export const HT_BA_TRUST_CTA = [
  "1000+ Successful Hair Transplants",
  "Dr. Sandeep Bhasin – 15+ Years Experience",
  "Advanced FUE & FUT Techniques",
  "Natural Results",
  "Personalized Care",
] as const;

export const HT_BA_VIDEO_TOPICS = [
  "Patient Transformation Story",
  "12-Month Hair Transplant Journey",
  "Patient Review #1",
  "Patient Review #2",
  "Real Patient Reviews",
  "Hair Restoration Experiences",
  "Recovery Stories",
] as const;

export const HT_BA_FAQS: { question: string; answer: string }[] = [
  {
    question: "How long does it take to see hair transplant results?",
    answer:
      "Hair typically starts growing around 3 months after transplant. Full, dense results usually appear by 12 months. Our timeline section above shows what to expect at each stage.",
  },
  {
    question: "Is hair transplant permanent?",
    answer:
      "Yes. Transplanted follicles from stable donor areas generally continue to grow for life. Initial shedding in the first few weeks is normal before new growth begins.",
  },
  {
    question: "Are these patient results genuine?",
    answer:
      "Yes. Every before-and-after image on this page represents real patients treated at Care Well Medical Centre under Dr. Sandeep Bhasin.",
  },
  {
    question: "How many grafts were used in these cases?",
    answer:
      "Graft counts vary by case — examples on this page include 3500 and 8000 graft procedures. Your requirement is determined during a free consultation and scalp analysis.",
  },
  {
    question: "Does everyone achieve the same results?",
    answer:
      "No. Results depend on hair density, donor quality, scalp health, baldness grade, age, and post-surgery care. We create a personalized plan for each patient.",
  },
  {
    question: "What affects hair transplant success?",
    answer:
      "Key factors include surgeon skill, graft handling, technique (FUE/FUT), donor hair quality, and following aftercare instructions consistently.",
  },
  {
    question: "Can crown baldness be treated?",
    answer:
      "Yes. Crown restoration is one of our most common outcomes, as shown in the gallery sections for crown and senior patient results.",
  },
  {
    question: "How do I know if I'm a suitable candidate?",
    answer:
      "Book a free consultation at Care Well Medical Centre. We assess your hair loss pattern, donor area, medical history, and goals to recommend the best approach.",
  },
  {
    question: "Can women undergo a hair transplant?",
    answer:
      "Yes. Many women restore thinning hairlines and density through transplant. See our Female Hair Transplant Results gallery and dedicated female hair transplant page.",
  },
  {
    question: "How much does a hair transplant cost in Delhi?",
    answer:
      "Cost depends on technique and graft count. View our detailed hair transplant cost guide or book a consultation for a transparent, personalized quote.",
  },
];
