import { PLASTIC_SURGERY_PATH } from "@/data/plastic-surgery-in-delhi";
import { HAIR_LOSS_CLINIC } from "@/data/hair-loss-treatment-in-delhi";

export const BREAST_AUGMENTATION_PATH = "/plastic-surgery-in-delhi/breast-augmentation" as const;

const WP = "https://www.carewellmedicalcentre.com/wp-content/uploads";

export const BREAST_AUGMENTATION_IMAGES = {
  hero: {
    src: `${WP}/2025/04/breast-augmentation-surgery-carewell.jpg`,
    alt: "Breast implant before and after result photo in Delhi showing natural enhancement",
  },
  heroSecondary: {
    src: `${WP}/2025/04/breast-lift-surgery-carewell-1.jpg`,
    alt: "Real breast implant before and after result photo in Delhi with surgery outcome",
  },
  doctor: {
    src: "/demo/doctor-profile-feature-vertical.png",
    alt: "Dr. Sandeep Bhasin — breast augmentation surgeon in Delhi",
  },
  videoPoster: {
    src: "/demo/doctor-profile-feature.png",
    alt: "Breast implant video at Care Well Medical Centre Delhi",
  },
  recovery: {
    src: "/demo/about-us-consultation.png",
    alt: "Breast augmentation recovery timeline at Care Well Medical Centre",
  },
  beforeAfter: [
    {
      src: `${WP}/2025/04/breast-augmentation-surgery-carewell.jpg`,
      alt: "Breast augmentation before and after results in Delhi",
      caption: "Natural enhancement",
    },
    {
      src: `${WP}/2025/04/breast-lift-surgery-carewell-1.jpg`,
      alt: "Breast implant results Delhi",
      caption: "Balanced contour",
    },
    {
      src: `${WP}/2025/04/breast-reduction-surgery-carewell-min.jpg`,
      alt: "Breast surgery results at Care Well Medical Centre",
      caption: "Proportionate shape",
    },
  ],
} as const;

export const BREAST_AUGMENTATION_SEO = {
  title:
    "Breast Augmentation in Delhi – Implants, Cost & Results | Care Well Medical Centre",
  description:
    "Breast augmentation in Delhi at Care Well Medical Centre. FDA-approved silicone & saline implants, Dual Plane technique by Dr. Sandeep Bhasin. Cost, recovery & natural results. Book now.",
} as const;

export const BREAST_AUGMENTATION_COMPARE_ROWS = [
  {
    feature: "Volume Increase",
    implants: "Significant (customizable to desired size)",
    fatTransfer: "Subtle (typically 1–2 cup sizes)",
  },
  {
    feature: "Material Used",
    implants: "Silicone or saline implants",
    fatTransfer: "Your own purified body fat",
  },
  {
    feature: "Best For",
    implants: "Noticeable enhancement and structure",
    fatTransfer: "Natural feel and look",
  },
  {
    feature: "Recovery",
    implants: "4–6 weeks for complete results",
    fatTransfer: "1–2 weeks for most daily activities",
  },
] as const;

export const BREAST_AUGMENTATION_COST_ROWS = [
  { procedure: "Silicone Implants", cost: "₹1,50,000 – ₹2,50,000" },
  { procedure: "Saline Implants", cost: "₹1,00,000 – ₹1,80,000" },
  { procedure: "Fat Transfer", cost: "₹1,50,000 – ₹2,00,000" },
  { procedure: "Full Package Price", cost: "₹1,00,000 – ₹2,50,000 (all-inclusive)" },
] as const;

export type BreastAugProcedureType = {
  title: string;
  body: string;
  bullets: string[];
};

export const BREAST_AUGMENTATION_PROCEDURE_TYPES: BreastAugProcedureType[] = [
  {
    title: "Breast Implant Surgery (Silicone & Saline Options)",
    body: "Silicone or saline implants deliver enhanced shape and size with natural, stable results using the Dual Plane technique — subglandular and submuscular placement.",
    bullets: ["Significant, customizable volume", "Defined breast shape and contour"],
  },
  {
    title: "Fat Transfer Breast Augmentation",
    body: "A minimally invasive process using your own fat from areas such as thighs or abdomen for a natural, softer breast enhancement.",
    bullets: ["Subtle, natural look", "Minimal scars with quick recovery"],
  },
  {
    title: "Breast Prosthesis & Reconstruction",
    body: "For women with mastectomy or breast trauma — implant-based reconstruction restores natural curves and symmetry. Non-surgical external prostheses are available for those not ready for surgery.",
    bullets: [
      "Implant-based reconstruction for lasting shape",
      "Non-surgical external options for everyday confidence",
    ],
  },
];

export const BREAST_AUGMENTATION_PAGE = {
  h1: "Breast Augmentation in Delhi – Cost, Implants & Natural Results",
  subtitle: "FDA-Approved Implants · Dual Plane Technique · CR Park",
  tagline:
    "Breast augmentation in Delhi gives women fuller, natural-looking breasts with safe, FDA-approved implants — tailored to your body, goals, and budget.",
  parentLabel: "Plastic Surgery in Delhi",
  parentPath: PLASTIC_SURGERY_PATH,
  treatmentDropdownLabel: "Breast Augmentation",
  introParagraphs: [
    "At Care Well Medical Centre, CR Park, Dr. Sandeep Bhasin, with 25+ years of expertise, uses the Advanced Dual Plane Technique for results tailored to your body, goals, and budget.",
    "If you are considering breast implants in Delhi, explore our transparent cost packages and see before-and-after results trusted by women across Delhi-NCR.",
  ],
  relatedProceduresIntro:
    "While breast augmentation enhances size, some women may need additional procedures. For sagging breasts, explore our",
  relatedProceduresMid: ". If large breasts cause discomfort, consider",
  breastLiftHref: "/plastic-surgery-in-delhi/breast-lift",
  breastReductionHref: "/plastic-surgery-in-delhi/breast-reduction",
  whyChooseHeading: "Why Women Choose Breast Augmentation",
  whyChooseIntro:
    "Many women choose breast augmentation in Delhi to regain confidence and restore a natural balance to their figure. This procedure:",
  whyChooseBenefits: [
    "Enhances breast size and symmetry for a highly proportionate appearance",
    "Recovers lost volume after weight loss, pregnancy, or aging",
    "Creates a confident, feminine silhouette that enhances entire body proportions",
  ],
  whyChooseClosing:
    "Dr. Sandeep Bhasin relies on extensive surgical expertise to deliver natural and safe results instead of artificial enhancements.",
  whatIsHeading: "What is Breast Augmentation?",
  whatIsParagraphs: [
    "Breast augmentation in Delhi is a cosmetic procedure to enhance breast size, shape, and symmetry for a balanced, fuller appearance.",
    "At Care Well Medical Centre, we use the Advanced Dual Plane Technique — a modern method that positions implants for a natural slope, stable results, and fewer complications.",
    "You have two options — saline or silicone breast implants — for subtle, natural, softer breast enhancement.",
  ],
  howWorksHeading: "How Does Breast Augmentation Work?",
  howWorksIntro:
    "At Care Well Medical Centre, breast augmentation in Delhi is performed using two primary techniques:",
  implantTechnique: {
    title: "1. Breast Implants (Silicone or Saline)",
    benefits: "Volume with improved contour shape that lasts long.",
    bestFor: "Women seeking significant size increase or a fuller, firmer bustline.",
    recovery: "Light activities within a week. Full recovery within four to six weeks.",
    note: "Using Dual Plane placement, our surgeons deliver a natural slope and minimize complications.",
  },
  fatTransferTechnique: {
    title: "2. Fat Transfer Breast Augmentation",
    benefits: "Soft, natural breasts from your own body fat.",
    bestFor: "Women seeking subtle enhancement without implants.",
    recovery: "Minimal downtime including 1–2 weeks of mild swelling.",
  },
  compareHeading: "Quick Comparison: Implants vs. Fat Transfer",
  reconstructionNote:
    "For women recovering from mastectomy or breast trauma, we offer implant-based breast reconstruction. For those not ready for surgery, we guide patients toward custom external breast prostheses for comfort and daily balance.",
  whyClinicHeading: "Why Choose Care Well Medical Centre (Delhi NCR)?",
  whyClinicIntro:
    "Dr. Sandeep Bhasin monitors every breast augmentation procedure at Care Well Medical Centre, CR Park. He has delivered safe, natural, and long-lasting results for around 25 years.",
  dualPlaneIntro:
    "We use the Advanced Dual Plane Technique, combining submuscular and subglandular placement to:",
  dualPlaneBenefits: [
    "Create a natural breast slope and contour",
    "Minimize risks associated with capsular contracture",
    "Keep implants stable and lasting for years",
  ],
  whyClinicClosing:
    "Our patient-first approach and transparent pricing make women from Delhi-NCR — Faridabad, Ghaziabad, Noida, and Gurgaon — choose us. Medical tourists praise our safe, result-oriented procedures at significantly lower cost than the Middle East, UK, or US.",
  typesHeading: "Types of Breast Augmentation Procedures",
  typesIntro:
    "Care Well Medical Centre offers three safe and effective options for breast augmentation in Delhi:",
  benefitsHeading: "Benefits of Breast Augmentation",
  benefitsIntro:
    "Breast augmentation goes beyond enhancing appearance — it is about embracing a confident and balanced life:",
  benefitsItems: [
    "Restores breast firmness or fullness lost after weight loss, pregnancy, or aging — sometimes combined with breast lift for better results",
    "Improves breast symmetry with proportionate curves that suit your body",
    "Boosts confidence and comfort with a natural enhancement journey",
  ],
  benefitsClosing:
    "Expect natural enhancement and a confident journey after receiving a new shape.",
  candidateHeading: "Who is an Ideal Candidate for Breast Augmentation?",
  candidateIntro: "You can opt for breast augmentation in Delhi if you:",
  candidateItems: [
    "Are in good overall health without uncontrolled medical conditions",
    "Expect realistic size and shape enhancement",
    "Want enhanced breast size, improved shape, or to correct visible asymmetry",
    "Have experienced firmness or volume loss from weight changes, pregnancy, or aging",
    "Are not pregnant or breastfeeding at the time of procedure",
  ],
  candidateClosing:
    "Dr. Sandeep Bhasin will recommend the most suitable and safest treatment after assessing your anatomy and aesthetic goals.",
  processHeading: "Step-by-Step Breast Augmentation Procedure (Your Journey)",
  processIntro:
    "We deliver a safe, comfortable, and highly customized experience at each stage of your breast augmentation in Delhi.",
  consultationStep: {
    title: "1. Consultation & Planning",
    intro: "A one-on-one consultation with Dr. Sandeep Bhasin where we:",
    bullets: [
      "Analyze your aesthetic goals and body shape",
      "Help you choose the best implant size and type — saline, silicone, or fat transfer",
      "Assess whether the Dual Plane technique will give a natural slope with minimum complications",
    ],
  },
  surgeryStep: {
    title: "2. Surgery Details",
    bullets: [
      "General anesthesia for optimum comfort",
      "Incision options: inframammary (under breast fold — most usual), periareolar (around nipple), or transaxillary (through armpit — no breast scar)",
      "Procedure runs 1–2 hours; most patients leave the same day",
    ],
  },
  recoveryStep: {
    title: "3. Recovery Timeline (What to Expect)",
    timeline: [
      "Day 1–3: Swelling or tightness — rest, prescribed medicines, and a comfortable bra",
      "Week 1: Most women resume light work; avoid lifting and strenuous exercise",
      "Week 4: Normal routines including light gym; avoid intense chest exercises",
      "Month 3: Swelling subsides as implants settle into a soft, natural final shape",
    ],
    closing:
      "Close monitoring during follow-up visits ensures safe healing and a comfortable experience.",
  },
  costHeading: "How Much Does Breast Augmentation Cost in Delhi?",
  costIntro:
    "Breast augmentation in Delhi costs around ₹1,00,000 – ₹2,50,000 depending on surgeon expertise, implant type, and technique.",
  costPackageIncludes: [
    "Surgeon's fee (procedure by Dr. Sandeep Bhasin)",
    "Anesthesia and required medications",
    "Hospital stay and operation charges",
    "Premium implants (saline or silicone)",
    "Post-procedure care",
  ],
  costTableHeading: "Quick Cost Table",
  costQuestions: [
    {
      question: "Is breast augmentation more affordable in Delhi than abroad?",
      answer:
        "Yes. Cost in Delhi is 50–70% lower compared to the UAE or UK while following strict global quality and safety standards.",
    },
    {
      question: "What's included in Care Well Medical Centre's package?",
      answer:
        "Surgeon's fee, hospital facilities, implants, and follow-up care — no hidden charges.",
    },
    {
      question: "How much do silicone vs. saline implants cost?",
      answer:
        "Silicone implants: ₹1,50,000 – ₹2,50,000. Saline implants: ₹1,00,000 – ₹1,80,000.",
    },
  ],
  costFinancingNote: "For financing or EMI options, contact us to discuss available plans.",
  recoveryHeading: "Recovery & Precautions After Breast Augmentation",
  recoveryIntro: "Safe and lasting results come with proper healing:",
  recoveryPrecautions: [
    "Rest for the first few days; avoid sudden upper body movement",
    "Wear a supportive surgical bra to protect healing tissues and reduce swelling",
    "Avoid intense exercise and heavy lifting for at least four to six weeks",
    "Sleep on your back with slight elevation to reduce chest pressure",
    "Attend all follow-up visits for recovery monitoring",
  ],
  recoveryTip:
    "Most patients resume light activities within a week and see final, natural results within three to six months.",
  recoveryTeamNote:
    "Our team ensures comprehensive support during follow-up visits, along with guidance and customized care for a smooth recovery.",
  resultsHeading: "Before & After Breast Augmentation Results Gallery",
  resultsIntro:
    "Explore real transformations from patients who trusted Dr. Sandeep Bhasin at Care Well Medical Centre, Delhi — natural, balanced results tailored to every individual's goals.",
  trustHeading: "Why Women Across Delhi NCR Trust Care Well Medical Centre",
  trustItems: [
    "1,000+ successful procedures with Dr. Sandeep Bhasin",
    "Dual Plane Technique for natural contour, reduced complications, and stable long-term results",
    "Transparent pricing and international care standards for local patients and medical tourists",
    "5-star rated care on Google for patient satisfaction and results",
  ],
  ctaHeading: "Ready to Enhance Your Confidence?",
  ctaBody:
    "Consult Dr. Sandeep Bhasin at Care Well Medical Centre, CR Park, Delhi-NCR today. March on to a confident, comfortable and beautiful contour.",
  videoHeading: "Breast Implant Video",
  faqHeading: "FAQs About Breast Augmentation",
  faqIntro:
    "Know the answers to frequently asked questions related to breast implants here.",
  disclaimer:
    "Treatment suitability, implant choice, and results vary between individuals. Breast augmentation is a surgical procedure that should only be performed after consultation with a qualified plastic surgeon. This page is for informational purposes and does not replace medical advice.",
} as const;

export { HAIR_LOSS_CLINIC as BREAST_AUGMENTATION_CLINIC };

export const BREAST_AUGMENTATION_FAQS: { question: string; answer: string }[] = [
  {
    question: "Is breast augmentation safe in India?",
    answer:
      "Yes. Experienced surgeons such as Dr. Sandeep Bhasin use FDA-approved implants and globally compliant modern techniques, increasing patient trust and safety.",
  },
  {
    question: "Which breast implants feel the most natural?",
    answer:
      "Silicone gel implants feel closest to natural breast tissue — soft, realistic texture, and better shape retention compared to saline options.",
  },
  {
    question: "Are breast implants safe now?",
    answer:
      "Present-day breast implant methods are safe when performed by an experienced plastic surgeon in a modern clinic with necessary medical equipment and emergency support.",
  },
  {
    question: "How long is the recovery period after breast augmentation?",
    answer:
      "Most women commence light activities within a week, normal work by a month, and see final outcomes within three to six months as swelling subsides.",
  },
  {
    question: "When can I exercise after breast augmentation?",
    answer:
      "Light walking within a few days is fine. Avoid heavy lifting and chest exercises for four to six weeks to protect healing tissues.",
  },
  {
    question: "What are the signs of implant leakage or rupture?",
    answer:
      "Swelling, pain, uneven breast shape, or firmness are common indicators. Visit your surgeon for evaluation and imaging if you notice any of these.",
  },
  {
    question: "How long do breast implants last?",
    answer:
      "Modern implants last 10–15 years on average. Implant integrity remains intact with regular check-ups and imaging.",
  },
  {
    question: "Is breast augmentation painful?",
    answer:
      "Expect some discomfort and swelling for the first few days. Prescribed medicines and a supportive surgical bra help control pain effectively.",
  },
  {
    question: "What helps with post-surgery recovery?",
    answer:
      "Follow surgeon advice — rest, wear a supportive bra, avoid strenuous activity, and attend all follow-up visits for safe, smooth healing.",
  },
];
