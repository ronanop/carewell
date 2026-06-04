import { HAIR_LOSS_CLINIC } from "@/data/hair-loss-treatment-in-delhi";

export const EYEBROW_TRANSPLANT_PATH = "/hair-transplant-in-delhi/eyebrow" as const;
export const HAIR_TRANSPLANT_HUB_PATH = "/hair-transplant-in-delhi" as const;

const IMG = "/eyebrotranplantindelhi";

export const EYEBROW_IMAGES = {
  hero: {
    src: `${IMG}/eyebrow-transplant-before-after-indian-female-care-well-delhi.webp`,
    alt: "Before and after eyebrow transplant result on Indian female patient at Care Well Medical Centre, Delhi",
  },
  resultsGallery: {
    src: `${IMG}/eyebrow-transplant-before-and-after-image-min.jpg.webp`,
    alt: "Natural eyebrow restoration results gallery",
  },
  processDiagram: {
    src: `${IMG}/what-is-eyebrow-transplant-process-diagram-care-well-delhi-768x768.webp`,
    alt: "Eyebrow transplant process diagram showing donor hair extraction and implantation",
  },
  fueIllustration: {
    src: `${IMG}/fue-vs-fut-eyebrow-transplant-technique-delhi-care-well-1024x538.webp`,
    alt: "FUE eyebrow transplant illustration",
  },
  futIllustration: {
    src: `${IMG}/what-is-eyebrow-transplant-process-diagram-care-well-delhi.webp`,
    alt: "FUT eyebrow transplant illustration",
  },
  densityComparison: {
    src: `${IMG}/eyebrow-transplant-before-after-result-indian-female-care-well-1.webp`,
    alt: "Before vs after eyebrow density comparison",
  },
  naturalDesign: {
    src: `${IMG}/eyebrow-transplant-before-and-after-image-min.jpg.webp`,
    alt: "Natural eyebrow design examples",
  },
  fueFutComparison: {
    src: `${IMG}/fue-vs-fut-eyebrow-transplant-technique-delhi-care-well-1024x538.webp`,
    alt: "FUE vs FUT eyebrow transplant comparison graphic",
  },
  prosCons: {
    src: `${IMG}/eyebrow-transplant-before-after-result-indian-female-care-well-1.webp`,
    alt: "Pros and cons of eyebrow transplant visual comparison",
  },
  graftDiagram: {
    src: `${IMG}/what-is-eyebrow-transplant-process-diagram-care-well-delhi-768x768.webp`,
    alt: "Eyebrow graft placement diagram",
  },
  facialSymmetry: {
    src: `${IMG}/eyebrow-transplant-before-after-indian-female-care-well-delhi.webp`,
    alt: "Facial symmetry assessment for eyebrow transplantation",
  },
  donorExtraction: {
    src: `${IMG}/what-is-eyebrow-transplant-process-diagram-care-well-delhi.webp`,
    alt: "Donor area extraction illustration for eyebrow transplant",
  },
  procedureFlowchart: {
    src: `${IMG}/what-is-eyebrow-transplant-process-diagram-care-well-delhi-768x768.webp`,
    alt: "Step-by-step eyebrow transplant procedure flowchart",
  },
  clinicComparison: {
    src: `${IMG}/eyebrow-transplant-delhi-comparison-care-well-vs-other-clinics.webp`,
    alt: "Eyebrow transplant in Delhi — Care Well vs other clinics comparison",
  },
  costGraphic: {
    src: `${IMG}/eyebrow-transplant-delhi-comparison-care-well-vs-other-clinics.webp`,
    alt: "Cost breakdown for eyebrow hair transplant in Delhi",
  },
  recoveryTimeline: {
    src: `${IMG}/eyebrow-transplant-before-and-after-image-min.jpg.webp`,
    alt: "Eyebrow recovery timeline",
  },
  doctorPatient: {
    src: "/demo/doctor-profile-feature.png",
    alt: "Dr. Sandeep Bhasin with patient at Care Well Medical Centre",
  },
  reviewCollage: {
    src: `${IMG}/eyebrow-transplant-before-after-result-indian-female-care-well-1.webp`,
    alt: "Patient review collage — eyebrow restoration at Care Well",
  },
  clinicLocation: {
    src: "/beardtranplantindelhi/care-well-medical-centre-delhi-clinic-exterior-1.webp",
    alt: "Care Well Medical Centre clinic location in South Delhi",
  },
  ctaBanner: {
    src: `${IMG}/eyebrow-transplant-before-after-indian-female-care-well-delhi.webp`,
    alt: "Book eyebrow transplant consultation in Delhi",
  },
  quickFacts: {
    src: `${IMG}/fue-vs-fut-eyebrow-transplant-technique-delhi-care-well-1024x538.webp`,
    alt: "Quick facts about eyebrow hair transplant infographic",
  },
  videoPoster: {
    src: `${IMG}/maxresdefault.jpeg`,
    alt: "Eyebrow transplant procedure video thumbnail",
  },
  gallery: [
    {
      src: `${IMG}/eyebrow-transplant-before-and-after-image-min.jpg.webp`,
      alt: "Before and after eyebrow transplant result photo",
      caption: "Fuller brows and improved symmetry",
    },
    {
      src: `${IMG}/eyebrow-transplant-before-after-indian-female-care-well-delhi.webp`,
      alt: "Indian female eyebrow restoration result",
      caption: "Natural brow shape enhancement",
    },
    {
      src: `${IMG}/eyebrow-transplant-before-after-result-indian-female-care-well-1.webp`,
      alt: "Eyebrow density improvement close-up",
      caption: "Improved density and definition",
    },
    {
      src: `${IMG}/eyebrow-transplant-before-after-indian-female-care-well-delhi.webp`,
      alt: "Side view eyebrow restoration",
      caption: "Side profile improvement",
    },
    {
      src: `${IMG}/eyebrow-transplant-before-after-result-indian-female-care-well-1.webp`,
      alt: "Natural brow shape enhancement",
      caption: "Customized eyebrow design",
    },
    {
      src: `${IMG}/eyebrow-transplant-before-and-after-image-min.jpg.webp`,
      alt: "Full eyebrow reconstruction result",
      caption: "Full eyebrow reconstruction",
    },
  ],
} as const;

export const EYEBROW_TRANSPLANT_SEO = {
  title: "Eyebrow Transplant in Delhi | Natural & Permanent Results | Care Well",
  description:
    "Eyebrow transplant in Delhi at Care Well Medical Centre. Restore fuller, natural-looking brows with FUE & FUT by Dr. Sandeep Bhasin — cost, grafts, before & after.",
} as const;

export const EYEBROW_PAGE = {
  h1: "Eyebrow Transplant in Delhi for Fuller, Natural-Looking Brows",
  heroSubheading: "Restore Fuller, Natural-Looking Eyebrows with Advanced Eyebrow Restoration",
  parentLabel: "Hair Transplant in Delhi",
  parentPath: HAIR_TRANSPLANT_HUB_PATH,
  treatmentDropdownLabel: "Eyebrow Transplant",
  heroParagraphs: [
    "Losing confidence due to thinning or sparse eyebrows?",
    "Consider an Eyebrow Transplant in Delhi at Care Well Medical Centre. Our advanced eyebrow restoration procedures effectively restore fullness, shape, and natural beauty to thinning or sparse eyebrows.",
    "Trust our advanced techniques that deliver safe treatment, a painless procedure, natural-looking results, and long-lasting outcomes.",
    "Enhance your confidence with beautifully shaped brows that perfectly complement your face.",
  ],
  heroTrustPoints: [
    "Safe treatment",
    "Painless procedure",
    "Natural-looking results",
    "Long-lasting outcomes",
  ],
  fullerBrowsHeading: "Achieve Fuller Brows with the Best Eyebrow Transplant in Delhi",
  fullerBrowsBody: [
    "Care Well Medical Centre offers advanced eyebrow restoration in Delhi with top-quality results at affordable prices.",
    "Recover your eyebrow density using our safe and advanced restoration procedure.",
  ],
  whyPatientsChoose: [
    "No downtime",
    "Minimal discomfort",
    "Natural-looking results",
    "Customized treatment plans",
    "Advanced surgical techniques",
  ],
  goalsIntro: "Whether you want to:",
  goals: [
    "Enhance thinning eyebrows",
    "Restore sparse brows",
    "Correct eyebrow shape",
    "Improve facial symmetry",
  ],
  goalsOutro:
    "We create a personalized treatment plan based on your needs. Eyebrow restoration is part of our specialized Hair Transplant in Delhi services at Care Well Medical Centre.",
  whatIsHeading: "What is an Eyebrow Hair Transplant?",
  whatIsBody:
    "An eyebrow transplant is a cosmetic procedure where healthy hair follicles are transplanted from donor areas such as the scalp into the eyebrow region.",
  whatIsHelps: ["Thinning eyebrows", "Sparse brows", "Eyebrow gaps", "Scarred eyebrow areas"],
  causesHeading: "Common Causes of Eyebrow Hair Loss",
  causes: ["Over-plucking", "Genetics", "Trauma or scarring", "Medical conditions", "Medical treatments"],
  causesNote:
    "An eyebrow transplant restores natural eyebrow density and creates fuller, healthier-looking brows.",
  techniquesHeading: "Advanced Techniques Used at Care Well Medical Centre",
  popularHeading: "Why is Eyebrow Transplantation Popular?",
  benefitsHeading: "Benefits of Eyebrow Hair Transplant at Care Well Medical Centre",
  fueFutHeading: "FUE vs FUT Eyebrow Transplant – Which is Right for You?",
  prosConsHeading: "Pros and Cons of Eyebrow Transplant",
  graftsHeading: "How Many Grafts Are Needed for Eyebrow Restoration?",
  difficultHeading: "Why is Eyebrow Transplant More Difficult Than Hair Transplant?",
  donorHeading: "Where Do Donor Hairs Come From?",
  procedureHeading: "How the Eyebrow Transplant Procedure Works",
  compareHeading: "Eyebrow Transplant in Delhi – Care Well vs Other Clinics",
  costHeading: "Cost of Eyebrow Hair Transplant in Delhi",
  recoveryHeading: "Recovery and Aftercare Tips",
  whyClinicHeading: "Why Choose Care Well Medical Centre?",
  reviewsHeading: "Real Google Reviews from Our Happy Eyebrow Transplant Patients",
  galleryHeading: "Eyebrow Transplant Before & After Results",
  galleryNote:
    "These images showcase real patient transformations demonstrating fuller brows, improved density, better facial symmetry, and natural eyebrow shape.",
  quickFactsHeading: "Quick Facts About Eyebrow Hair Transplant",
  locationHeading: "Clinic Location – Eyebrow Transplant in Delhi",
  ctaHeading: "Ready to Transform Your Eyebrows?",
  ctaBody:
    "Book a consultation with Dr. Sandeep Bhasin and discover how natural eyebrow restoration can enhance your appearance and confidence.",
  trustBadges: [
    "1,000+ Successful Eyebrow Transplants",
    "15+ Years Cosmetic Surgery Experience",
    "Excellent Google Reviews",
    "NABH Certified Facility",
    "ISHRS Membership",
    "Advanced FUE & FUT Techniques",
  ],
  videosHeading: "Eyebrow Transplant Video",
  faqHeading: "Eyebrow Transplant FAQs",
} as const;

export { HAIR_LOSS_CLINIC as EYEBROW_CLINIC };

export const EYEBROW_FUE_BENEFITS = ["Minimally invasive", "Faster healing", "Minimal scarring", "Natural outcomes"] as const;
export const EYEBROW_FUE_IDEAL = ["Mild eyebrow thinning", "Moderate eyebrow thinning"] as const;
export const EYEBROW_FUT_BENEFITS = [
  "Higher follicle yield",
  "Suitable for extensive restoration",
  "More grafts transplanted in one session",
] as const;
export const EYEBROW_FUT_IDEAL = ["Significant eyebrow hair loss", "Extensive restoration requirements"] as const;

export const EYEBROW_POPULAR_REASONS = [
  {
    title: "Immediate Aesthetic Improvement",
    body: "Fuller and more defined eyebrows.",
  },
  {
    title: "Permanent Solution",
    body: "Long-lasting results that continue to grow naturally.",
  },
  {
    title: "Safe and Comfortable Procedure",
    body: "Performed under local anesthesia.",
  },
  {
    title: "Effective Restoration",
    body: "Corrects eyebrow loss caused by over-plucking, genetics, scars, and trauma.",
  },
  {
    title: "Increased Confidence",
    body: "Improves facial balance, symmetry, and overall appearance.",
  },
] as const;

export const EYEBROW_BENEFIT_ROWS = [
  { benefit: "Natural Appearance", description: "Brows match facial features naturally" },
  { benefit: "Safe & Comfortable", description: "Minimally invasive procedure" },
  { benefit: "Expert Supervision", description: "Performed under Dr. Sandeep Bhasin" },
  { benefit: "Personalized Results", description: "Customized according to facial structure" },
  { benefit: "Permanent Solution", description: "Long-lasting eyebrow restoration" },
] as const;

export const EYEBROW_FUE_FUT_ROWS = [
  { feature: "Invasiveness", fue: "Less invasive", fut: "Moderately invasive" },
  { feature: "Recovery", fue: "Faster", fut: "Slightly longer" },
  { feature: "Scarring", fue: "Minimal", fut: "Small linear scar" },
  { feature: "Graft Quantity", fue: "Moderate", fut: "Higher" },
  { feature: "Best For", fue: "Mild to Moderate Loss", fut: "Significant Restoration" },
] as const;

export const EYEBROW_FUE_BULLETS = [
  "Less invasive",
  "Faster recovery",
  "Minimal visible scars",
  "Precision implantation",
] as const;

export const EYEBROW_FUT_BULLETS = [
  "Larger number of grafts",
  "Suitable for severe eyebrow loss",
  "Effective for extensive restoration",
] as const;

export const EYEBROW_PROS = [
  "Natural-looking results",
  "Long-lasting outcomes",
  "Minimally invasive",
  "Virtually painless",
  "Restores facial symmetry",
  "Fills gaps caused by scars or over-plucking",
  "Improves confidence",
] as const;

export const EYEBROW_CONS = [
  "Higher upfront investment",
  "Requires an experienced surgeon",
  "Results take several months",
  "Periodic trimming may be needed",
] as const;

export const EYEBROW_GRAFT_FACTORS = [
  "Existing eyebrow density",
  "Desired shape",
  "Area requiring restoration",
] as const;

export const EYEBROW_GRAFT_ROWS = [{ procedure: "Eyebrow Restoration", grafts: "200–600 Grafts" }] as const;

export const EYEBROW_DIFFICULTY_POINTS = [
  "Facial symmetry analysis",
  "Precise graft angulation",
  "Detailed design planning",
  "Artistic eyebrow shaping",
] as const;

export const EYEBROW_DIFFICULTY_NOTE =
  "Because eyebrows are a prominent facial feature, precision is essential for achieving natural-looking results.";

export const EYEBROW_DONOR_FACTS = [
  "Donor hairs continue growing permanently.",
  "Regular trimming may be required.",
  "Hair blends naturally with existing eyebrows.",
] as const;

export const EYEBROW_PROCEDURE_STEPS = [
  {
    title: "Step 1: Consultation",
    bullets: ["Eyebrow condition", "Facial structure", "Desired shape"],
  },
  { title: "Step 2: Design Planning", body: "Custom eyebrow design is created." },
  { title: "Step 3: Local Anesthesia", body: "Treatment area is numbed for comfort." },
  { title: "Step 4: Hair Extraction", body: "Healthy follicles are collected from donor areas." },
  { title: "Step 5: Follicle Implantation", body: "Hair follicles are implanted into the eyebrow area." },
  { title: "Step 6: Recovery", body: "Patients return home the same day." },
] as const;

export const EYEBROW_COMPARE_ROWS = [
  { factor: "Surgeon Expertise", carewell: "Dr. Sandeep Bhasin (15+ Years)", other: "Variable" },
  { factor: "Techniques", carewell: "Advanced FUE & FUT", other: "Often limited" },
  { factor: "Eyebrow Design", carewell: "Customized", other: "Generic" },
  { factor: "Graft Survival", carewell: "High", other: "Variable" },
  { factor: "Aftercare", carewell: "Comprehensive", other: "Limited" },
  { factor: "Reviews", carewell: "4.2★ Rating", other: "Varies" },
  { factor: "Pricing", carewell: "Transparent", other: "Often unclear" },
] as const;

export const EYEBROW_COST_ROWS = [
  { service: "Consultation", price: "₹1,000 – ₹2,000" },
  { service: "Per Graft Cost", price: "₹30 – ₹60" },
  { service: "Full Procedure (200–400 Grafts)", price: "₹25,000 – ₹70,000" },
  { service: "Post-Operative Care", price: "₹5,000 – ₹12,000" },
  { service: "Medications & Follow-Up", price: "₹2,000 – ₹5,000" },
] as const;

export const EYEBROW_COST_FACTORS = [
  "Number of grafts required",
  "Technique used",
  "Complexity of restoration",
] as const;

export const EYEBROW_RECOVERY_ROWS = [
  { milestone: "Return to Daily Activities", time: "3–5 Days" },
  { milestone: "Initial Hair Growth", time: "3–4 Months" },
  { milestone: "Full Results", time: "6–12 Months" },
] as const;

export const EYEBROW_AFTERCARE = [
  "Avoid rubbing eyebrows",
  "Follow cleansing instructions",
  "Protect from excessive sunlight",
  "Attend follow-up appointments",
] as const;

export const EYEBROW_WHY_CLINIC = [
  {
    title: "Expert Surgeon",
    body: "Dr. Sandeep Bhasin personally supervises treatment.",
  },
  {
    title: "Advanced Technology",
    body: "Modern FUE and FUT techniques.",
  },
  {
    title: "Personalized Care",
    body: "Customized according to hair type, facial structure, and personal goals.",
  },
  {
    title: "Patient-Centric Approach",
    body: "Support from consultation through recovery.",
  },
] as const;

export const EYEBROW_QUICK_FACTS_ROWS = [
  { parameter: "Procedure Time", details: "2–4 Hours" },
  { parameter: "Grafts Required", details: "200–600" },
  { parameter: "Recovery Time", details: "3–5 Days" },
  { parameter: "Cost Estimate", details: "₹25,000 – ₹70,000" },
  { parameter: "Visible Results", details: "3–4 Months" },
  { parameter: "Full Results", details: "6–12 Months" },
  { parameter: "Performed By", details: "Dr. Sandeep Bhasin" },
] as const;

export const EYEBROW_NEARBY = ["Gurgaon", "Noida", "Faridabad", "Ghaziabad", "Delhi NCR"] as const;

export const EYEBROW_VIDEO_TOPICS = [
  "Eyebrow Transplant Procedure",
  "Patient Journey",
  "Recovery Timeline",
  "Before & After Transformations",
] as const;

export const EYEBROW_TREATMENTS_FAQS: { question: string; answer: string }[] = [
  {
    question: "Is eyebrow transplant permanent?",
    answer:
      "Yes. Transplanted follicles typically continue to grow permanently. Results mature over 6–12 months with proper aftercare and occasional trimming.",
  },
  {
    question: "How many grafts are required?",
    answer:
      "Most eyebrow restorations require 200–600 grafts depending on existing density, desired shape, and the area to be restored.",
  },
  {
    question: "Does the procedure hurt?",
    answer:
      "The procedure is performed under local anesthesia, so discomfort is minimal. Mild soreness after treatment is common and short-lived.",
  },
  {
    question: "How long is recovery?",
    answer:
      "Most patients return to daily activities within 3–5 days. Initial growth appears around 3–4 months, with full results in 6–12 months.",
  },
  {
    question: "When will results become visible?",
    answer:
      "Early growth is usually visible at 3–4 months. Density and shape continue to improve until final results at 6–12 months.",
  },
  {
    question: "Can transplanted eyebrow hair be trimmed?",
    answer:
      "Yes. Transplanted hairs grow like scalp hair and may need periodic trimming to match your preferred brow length and shape.",
  },
  {
    question: "What is the success rate?",
    answer:
      "Success depends on surgeon skill, graft angulation, design planning, and aftercare. At Care Well Medical Centre, procedures are supervised by Dr. Sandeep Bhasin with customized planning.",
  },
  {
    question: "What is the cost of eyebrow transplant in Delhi?",
    answer:
      "Full procedures (200–400 grafts) typically range from ₹25,000–₹70,000 at Care Well Medical Centre, plus consultation and follow-up. Final cost depends on graft count, technique, and complexity.",
  },
];
