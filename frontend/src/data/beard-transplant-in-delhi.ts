import { HAIR_LOSS_CLINIC } from "@/data/hair-loss-treatment-in-delhi";

export const BEARD_TRANSPLANT_PATH = "/hair-transplant-in-delhi/beard" as const;
export const HAIR_TRANSPLANT_HUB_PATH = "/hair-transplant-in-delhi" as const;

/** Image slots for SEO landing page sections (Cloudinary). */
export const BEARD_IMAGES = {
  heroBanner: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517793/carewell-media/site/beardtranplantindelhi/Beard-Transplant-Before-and-After-Result.webp",
    alt: "Before and after beard transplant transformation at Care Well Medical Centre, Delhi",
  },
  procedureIllustration: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517797/carewell-media/site/beardtranplantindelhi/natural-beard-design-planning.webp",
    alt: "Beard transplant procedure and natural beard design planning",
  },
  clinicExterior: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517796/carewell-media/site/beardtranplantindelhi/care-well-medical-centre-delhi-clinic-exterior-1.webp",
    alt: "Care Well Medical Centre clinic exterior in Delhi",
  },
  beardPatterns: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517797/carewell-media/site/beardtranplantindelhi/natural-beard-design-planning.webp",
    alt: "Different beard pattern examples and design mapping",
  },
  costGraphic: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517794/carewell-media/site/beardtranplantindelhi/Beard-Transplant-before-and-after-results-1.webp",
    alt: "Beard transplant cost and results overview",
  },
  beardDesignMapping: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517797/carewell-media/site/beardtranplantindelhi/natural-beard-design-planning.webp",
    alt: "Beard design mapping on patient face for natural results",
  },
  doctorPortrait: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517807/carewell-media/site/demo/doctor-profile-feature.jpg",
    alt: "Dr. Sandeep Bhasin — Senior Cosmetic & Aesthetic Surgeon",
  },
  fueFutComparison: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517836/carewell-media/site/images/hair-transplant-4-step-process.jpg",
    alt: "FUE vs FUT beard transplant technique comparison",
  },
  procedureFlowchart: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517797/carewell-media/site/beardtranplantindelhi/natural-beard-design-planning.webp",
    alt: "Beard transplant procedure steps flowchart",
  },
  resultsTimeline: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517839/carewell-media/site/images/hair-transplant-process-infographic.jpg",
    alt: "Beard transplant results timeline infographic",
  },
  successFactors: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517795/carewell-media/site/beardtranplantindelhi/Beard-Transplant-beofe-and-after-result.webp",
    alt: "Factors influencing beard transplant success",
  },
  clinicLocation: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517796/carewell-media/site/beardtranplantindelhi/care-well-medical-centre-delhi-clinic-exterior-1.webp",
    alt: "Beard transplant clinic location in Delhi NCR",
  },
  consultationBanner: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517796/carewell-media/site/beardtranplantindelhi/care-well-medical-centre-delhi-clinic-exterior-1.webp",
    alt: "Book beard transplant consultation at Care Well Medical Centre",
  },
  gallery: [
    {
      src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517793/carewell-media/site/beardtranplantindelhi/Beard-Transplant-Before-and-After-Result.webp",
      alt: "Before and after full beard transplant",
      caption: "Beard transplant growth progress at 9 months",
    },
    {
      src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517794/carewell-media/site/beardtranplantindelhi/Beard-Transplant-before-and-after-results-1.webp",
      alt: "Before and after jawline beard restoration",
      caption: "Natural beard transplant density improvement",
    },
    {
      src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517795/carewell-media/site/beardtranplantindelhi/Beard-Transplant-beofe-and-after-result.webp",
      alt: "Beard transplant side profile before and after",
      caption: "Jawline beard restoration",
    },
    {
      src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517793/carewell-media/site/beardtranplantindelhi/Beard-Transplant-Before-and-After-Result.webp",
      alt: "Beard transplant front profile transformation",
      caption: "Front view transformation",
    },
    {
      src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517794/carewell-media/site/beardtranplantindelhi/Beard-Transplant-before-and-after-results-1.webp",
      alt: "Beard transplant results at 9 months",
      caption: "Side profile improvement",
    },
    {
      src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517795/carewell-media/site/beardtranplantindelhi/Beard-Transplant-beofe-and-after-result.webp",
      alt: "Beard transplant results at 12 months",
      caption: "Final density and shape at 12 months",
    },
  ],
} as const;

export const BEARD_TRANSPLANT_SEO = {
  title: "Beard Transplant in Delhi | Natural & Permanent Results | Care Well Medical Centre",
  description:
    "Beard transplant in Delhi for natural beard restoration. Expert treatment by Dr. Sandeep Bhasin at Care Well Medical Centre — cost, before & after, FUE & FUT.",
} as const;

export const BEARD_PAGE = {
  h1: "Best Beard Transplant in Delhi – Cost, Before & After & Expert Clinic",
  heroSubheading: "Restore Your Beard. Restore Your Confidence.",
  parentLabel: "Hair Transplant in Delhi",
  parentPath: HAIR_TRANSPLANT_HUB_PATH,
  treatmentDropdownLabel: "Beard Transplant",
  heroParagraphs: [
    "Losing confidence and facial balance due to patchy or uneven beard growth? Applied several grooming products and medicines but did not receive positive outcomes?",
    "A Beard Transplant in Delhi is just what you need to achieve a fuller, natural-looking beard that complements your facial structure.",
    "At Care Well Medical Centre, we design your beard to match your face shape, jawline, natural hair direction, and facial symmetry.",
    "Under the supervision of Dr. Sandeep Bhasin, every beard transplant is carefully planned for natural and long-lasting results.",
  ],
  keyHighlights: [
    "20+ Years of Surgical Experience",
    "Doctor-Performed Procedures Only",
    "Natural Beard Design for Every Face",
    "Individually Planned Beard Restoration",
    "Structured Follow-Up Care",
  ],
  whyTransplantHeading: "Why Choose Beard Transplant in Delhi?",
  whyTransplantBody: [
    "A beard transplant involves transferring healthy hair follicles from the scalp into beard areas with low density, patchy growth, uneven coverage, or missing facial hair.",
    "Each follicle is implanted at precise angles to replicate natural beard growth.",
  ],
  whyClinicHeading: "Why Choose Care Well Medical Centre?",
  designHeading: "How I Plan a Natural Beard Design",
  designIntro:
    "A natural beard transplant depends more on planning than graft count.",
  designFactors: [
    "Jawline Assessment",
    "Facial Symmetry Analysis",
    "Hair Angle & Direction",
    "Long-Term Growth Planning",
  ],
  designQuote:
    "Poor planning is the most common reason for dissatisfaction after a beard transplant. Design and direction matter far more than graft numbers.",
  surgeonHeading: "Best Beard Transplant Surgeon in Delhi",
  techniquesHeading: "Beard Transplant Techniques – FUE vs FUT",
  procedureHeading: "What Happens During the Procedure?",
  videosHeading: "Beard Transplant Videos",
  galleryHeading: "Beard Transplant Before & After Results",
  timelineHeading: "Beard Transplant Results Timeline",
  successHeading: "Beard Transplant Success Rate – What Influences It?",
  nearMeHeading: "Beard Transplant Near Me – Delhi NCR",
  reviewsHeading: "Patient Reviews & Testimonials",
  consultationHeading: "Book a Consultation With Dr. Sandeep Bhasin",
  faqHeading: "FAQs About Beard Transplant",
  medicalReview: {
    by: "Dr. Sandeep Bhasin",
    clinic: "Care Well Medical Centre, Delhi",
    lastReviewed: "January 2026",
  },
  disclaimer:
    "This information is provided for general awareness and does not replace a personal medical consultation. Treatment suitability, outcomes, and recovery vary for each individual.",
} as const;

export { HAIR_LOSS_CLINIC as BEARD_CLINIC };

export const BEARD_TECHNIQUE_ROWS = [
  { technique: "FUE", description: "Individual follicle extraction" },
  { technique: "FUT", description: "Strip-based follicle harvesting" },
] as const;

export const BEARD_FUE_FUT_ROWS = [
  { factor: "Extraction", fue: "Individual Follicles", fut: "Strip Method" },
  { factor: "Scarring", fue: "Tiny Dot Scars", fut: "Linear Scar" },
  { factor: "Precision", fue: "Very High", fut: "Moderate" },
  { factor: "Recovery", fue: "Faster", fut: "Slightly Longer" },
  { factor: "Natural Appearance", fue: "Excellent", fut: "Good" },
] as const;

export const BEARD_COST_SCOPE_ROWS = [
  { scope: "Small Patch Correction", cost: "₹45,000 – ₹70,000" },
  { scope: "Moderate Density Restoration", cost: "₹70,000 – ₹1,10,000" },
  { scope: "Full Beard Restoration", cost: "₹1,10,000 – ₹1,50,000" },
] as const;

export const BEARD_COST_AREA_ROWS = [
  { area: "Mustache", grafts: "300–600", cost: "₹15,000–₹30,000" },
  { area: "Goatee", grafts: "400–800", cost: "₹20,000–₹40,000" },
  { area: "Jawline Beard", grafts: "600–1,200", cost: "₹30,000–₹60,000" },
  { area: "Cheek Beard", grafts: "500–1,000", cost: "₹25,000–₹50,000" },
  { area: "Full Beard", grafts: "1,500–3,000", cost: "₹60,000–₹1,50,000" },
] as const;

export const BEARD_COST_ACCORDION = [
  {
    title: "Per-Graft Pricing Logic",
    body: "Beard transplant cost is often calculated per graft. Each graft contains one to four hairs. Smaller areas (mustache, goatee) need fewer grafts; full beard restoration requires 1,500–3,000 grafts. Your final estimate depends on coverage goals and donor availability assessed at consultation.",
  },
  {
    title: "Why Cost Varies",
    body: "Pricing varies by extent of hair loss, number of grafts, technique (FUE vs FUT), surgeon experience, clinic facilities, and any combined treatments. We provide transparent, personalized estimates after assessing your beard pattern, donor hair, and design plan.",
  },
] as const;

export const BEARD_TECHNIQUE_ACCORDION = [
  {
    title: "FUE Beard Transplant",
    body: "Follicular Unit Extraction (FUE) removes individual follicles from the donor area and implants them into the beard zone at precise angles. Scarring is minimal (tiny dot scars), recovery is faster, and results look natural — ideal for most beard restoration cases at Care Well Medical Centre.",
  },
  {
    title: "FUT Beard Transplant",
    body: "Follicular Unit Transplantation (FUT) harvests a strip of donor tissue, from which grafts are prepared and implanted. It can yield a higher graft count in one session but leaves a linear scar. We recommend FUT only when donor assessment and coverage goals support this approach.",
  },
] as const;

export const BEARD_CANDIDATE_GOOD = [
  {
    title: "Genetic Patchiness",
    intro: "Patchy beard growth across:",
    bullets: ["Cheeks", "Jawline", "Mustache"],
  },
  {
    title: "Low Beard Density",
    intro: "Hair grows but lacks volume and coverage.",
    bullets: [] as string[],
  },
  {
    title: "Scars or Beard Gaps",
    intro: "Hair loss due to:",
    bullets: ["Acne scars", "Injuries", "Previous surgeries"],
  },
] as const;

export const BEARD_CANDIDATE_AVOID = [
  {
    title: "Active Skin Conditions",
    bullets: ["Infection", "Inflammation", "Severe irritation"],
  },
  {
    title: "Autoimmune Hair Loss",
    bullets: ["Conditions such as Alopecia Areata."],
  },
  {
    title: "Donor Hair Limitations",
    bullets: ["Insufficient donor hair quality or quantity."],
  },
] as const;

export const BEARD_CLINIC_REASONS = [
  {
    heading: "Expert-Led Supervision",
    body: "Dr. Sandeep Bhasin personally plans and performs every beard transplant.",
  },
  {
    heading: "Natural-Looking Results",
    body: "Customized beard designs based on face shape, jawline, existing beard pattern, and hair growth direction.",
  },
  {
    heading: "Medical Safety Standards",
    bullets: ["Sterile OT environment", "Advanced surgical protocols", "Structured follow-up care"],
  },
  {
    heading: "Honest Treatment & Cost Estimates",
    body: "We provide transparent information regarding cost, recovery, results, and suitability.",
  },
  {
    heading: "Easy Access Across Delhi NCR",
    body: "Patients visit us from South Delhi, Gurgaon, Noida, Faridabad, and Ghaziabad.",
  },
] as const;

export const BEARD_PROCEDURE_STEPS = [
  { title: "Step 1: Consultation & Assessment", body: "" },
  { title: "Step 2: Beard Design & Marking", body: "" },
  { title: "Step 3: Local Anaesthesia", body: "" },
  { title: "Step 4: Follicle Extraction", body: "" },
  { title: "Step 5: Graft Implantation", body: "" },
  { title: "Step 6: Post-Procedure Care", body: "" },
] as const;

export const BEARD_PROCEDURE_NOTE =
  "Most procedures are completed in a single session. Patients return home the same day.";

export const BEARD_TIMELINE_ROWS = [
  { timeline: "3–4 Weeks", progress: "Shock Loss" },
  { timeline: "3 Months", progress: "Early Growth" },
  { timeline: "6 Months", progress: "Visible Density Improvement" },
  { timeline: "9 Months", progress: "Improved Shape & Coverage" },
  { timeline: "12 Months", progress: "Final Result" },
] as const;

export const BEARD_SUCCESS_FACTORS = [
  "Donor Hair Quality",
  "Surgeon Skill & Planning",
  "Aftercare Compliance",
] as const;

export const BEARD_SUCCESS_NOTE =
  "When all three factors align, beard transplant outcomes are generally stable and natural.";

export const BEARD_NEARBY_CITIES = ["Delhi", "Gurgaon", "Noida", "Faridabad", "Ghaziabad"] as const;

export const BEARD_ACCESS_MODES = ["Metro", "Cab", "Private Vehicle"] as const;

export const BEARD_VIDEO_TOPICS = [
  "Beard Transplant Procedure",
  "Patient Journey",
  "Recovery Process",
  "Results Timeline",
] as const;

export const BEARD_CONSULTATION_POINTS = [
  "Suitability",
  "Graft Requirements",
  "Beard Design",
  "Expected Results",
  "Cost",
] as const;

export const BEARD_TREATMENTS_FAQS: { question: string; answer: string }[] = [
  {
    question: "Is beard transplant permanent?",
    answer:
      "Yes. Transplanted follicles are typically permanent because they are taken from genetically stable donor areas. Results mature over 9–12 months with proper aftercare.",
  },
  {
    question: "Does beard transplant look natural?",
    answer:
      "Natural results depend on beard design, implant angle, and density planning. Dr. Sandeep Bhasin customizes each plan to match your face shape, jawline, and growth direction.",
  },
  {
    question: "How many grafts are required?",
    answer:
      "Graft count varies by area: mustache 300–600, goatee 400–800, jawline 600–1,200, full beard 1,500–3,000. Your exact requirement is confirmed at consultation.",
  },
  {
    question: "Is the procedure painful?",
    answer:
      "Local anaesthesia is used, so discomfort during the procedure is minimal. Mild soreness after treatment is common and manageable with prescribed care.",
  },
  {
    question: "What is the recovery period?",
    answer:
      "Most patients resume routine activities within a few days. Shock loss may occur at 3–4 weeks; visible growth improves from 3–6 months, with final results around 12 months.",
  },
  {
    question: "Can I shave after beard transplant?",
    answer:
      "Your surgeon will advise when shaving is safe — usually after initial healing. Follow post-procedure instructions to protect newly implanted grafts.",
  },
  {
    question: "What is the success rate?",
    answer:
      "Success depends on donor hair quality, surgical planning, and aftercare compliance. When these align, outcomes are generally stable and natural-looking.",
  },
  {
    question: "How much does beard transplant cost in Delhi?",
    answer:
      "At Care Well Medical Centre, small patch correction is approximately ₹45,000–₹70,000; moderate restoration ₹70,000–₹1,10,000; full beard ₹1,10,000–₹1,50,000. Per-area and per-graft pricing is shared after assessment.",
  },
];
