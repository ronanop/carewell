import { SKIN_CLINIC, SKIN_TREATMENTS_PATH } from "@/data/skin-treatments-in-delhi";

export const VITILIGO_PATH = "/skin-treatments-in-delhi/vitiligo" as const;
const BASE = SKIN_TREATMENTS_PATH;

export const VITILIGO_IMAGES = {
  hero: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519737/carewell-media/cms/10d9d4d7a6884495_rwhhdj.png", alt: "Vitiligo treatment before and after results" },
  heroLegs: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519836/carewell-media/cms/d8050da0719725a6_smi1gb.jpg", alt: "Legs vitiligo before and after transformation" },
  heroFace: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg", alt: "Face vitiligo surgery results" },
  heroLip: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "Lip vitiligo transplant results" },
  heroChest: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517800/carewell-media/site/demo/ai-skin-scan-v2.jpg", alt: "Chest vitiligo recovery results" },
  heroCheek: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519737/carewell-media/cms/10d9d4d7a6884495_rwhhdj.png", alt: "Cheek vitiligo transformation" },
  awareness: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517800/carewell-media/site/demo/ai-skin-scan-v2.jpg", alt: "Vitiligo awareness infographic" },
  melanin: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg", alt: "Melanin loss and vitiligo development diagram" },
  technologies: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519737/carewell-media/cms/10d9d4d7a6884495_rwhhdj.png", alt: "Vitiligo treatment technologies" },
  phototherapy: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "NB-UVB phototherapy session" },
  melanocyte: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519836/carewell-media/cms/d8050da0719725a6_smi1gb.jpg", alt: "Melanocyte transplant procedure" },
  cosmetic: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517800/carewell-media/site/demo/ai-skin-scan-v2.jpg", alt: "Vitiligo camouflage solutions" },
  drBhasin: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517806/carewell-media/site/demo/doctor-profile-feature-vertical.png", alt: "Dr. Sandeep Bhasin — vitiligo specialist" },
  protocol: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517799/carewell-media/site/demo/about-us-consultation.jpg", alt: "Step-by-step vitiligo treatment journey" },
  woodsLamp: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg", alt: "Wood's lamp examination" },
  medicalPhase: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517799/carewell-media/site/demo/about-us-consultation.jpg", alt: "Medical treatment phase" },
  surgery: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519836/carewell-media/cms/d8050da0719725a6_smi1gb.jpg", alt: "Melanocyte transplant procedure" },
  repigmentation: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "Phototherapy session" },
  maintenance: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517800/carewell-media/site/demo/ai-skin-scan-v2.jpg", alt: "Long-term skin care plan" },
  candidate: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517799/carewell-media/site/demo/about-us-consultation.jpg", alt: "Candidate assessment checklist" },
  myths: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg", alt: "Vitiligo myth vs fact infographic" },
  bodyAreas: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517800/carewell-media/site/demo/ai-skin-scan-v2.jpg", alt: "Body areas affected by vitiligo" },
  melaninCauses: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "Melanin production diagram" },
  earlySigns: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519836/carewell-media/cms/d8050da0719725a6_smi1gb.jpg", alt: "Early vitiligo symptoms" },
  types: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg", alt: "Vitiligo types classification chart" },
  management: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "Vitiligo management overview" },
  protocolFlow: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517799/carewell-media/site/demo/about-us-consultation.jpg", alt: "Advanced treatment protocol flowchart" },
  tattooing: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517800/carewell-media/site/demo/ai-skin-scan-v2.jpg", alt: "Micropigmentation illustration" },
  future: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg", alt: "Future vitiligo research" },
  selfCare: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517800/carewell-media/site/demo/ai-skin-scan-v2.jpg", alt: "Vitiligo self-care guide" },
  cost: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "Vitiligo treatment cost breakdown" },
  clinic: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517796/carewell-media/site/beardtranplantindelhi/care-well-medical-centre-delhi-clinic-exterior-1.webp",
    alt: "Care Well clinic and treatment team",
  },
  ctaBanner: { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519737/carewell-media/cms/10d9d4d7a6884495_rwhhdj.png", alt: "Book vitiligo consultation" },
  gallery: [
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg", alt: "Face vitiligo before and after", caption: "Face result" },
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg", alt: "Lip vitiligo transplant", caption: "Lip transplant" },
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519836/carewell-media/cms/d8050da0719725a6_smi1gb.jpg", alt: "Hand vitiligo recovery", caption: "Hand recovery" },
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517800/carewell-media/site/demo/ai-skin-scan-v2.jpg", alt: "Chest vitiligo transformation", caption: "Chest transformation" },
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519737/carewell-media/cms/10d9d4d7a6884495_rwhhdj.png", alt: "Leg vitiligo treatment", caption: "Leg treatment" },
    { src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781519836/carewell-media/cms/d8050da0719725a6_smi1gb.jpg", alt: "Melanocyte transplant success", caption: "Melanocyte transplant" },
  ],
} as const;

export const VITILIGO_SEO = {
  title: "Vitiligo Treatment in Delhi | Care Well Medical Centre",
  description:
    "Vitiligo treatment in Delhi at Care Well Medical Centre. Melanocyte transplant, skin grafting, punch grafting, NB-UVB & more by Dr. Sandeep Bhasin. Book a consultation.",
} as const;

export const VITILIGO_PAGE = {
  h1: "Vitiligo Treatment in Delhi – Advanced Solutions for White Patches",
  subtitle: "Expert Vitiligo Treatment with Melanocyte Transplantation, Skin Grafting & Phototherapy",
  introHeading: "Restore Natural Skin Color with Advanced Vitiligo Treatments",
  introBody:
    "At Care Well Medical Centre, we offer advanced and evidence-based treatments for Vitiligo (White Patches) using the latest medical and surgical techniques.",
  treatmentOptions: [
    "Melanocyte Transplantation",
    "Punch Grafting",
    "Skin Grafting",
    "NB-UVB Phototherapy",
    "Medical Management",
    "Cosmetic Camouflage Solutions",
  ],
  introClosing:
    "Under the expert guidance of Dr. Sandeep Bhasin, patients receive personalized treatment plans designed to restore pigmentation and confidence.",
  whatIsHeading: "What is Vitiligo (White Patches)?",
  whatIsBody:
    "Vitiligo is a chronic skin condition in which pigment-producing cells called melanocytes stop functioning or are destroyed.",
  understandingHeading: "Understanding Vitiligo",
  advancedHeading: "Advanced Vitiligo Treatments at Care Well Medical Centre",
  doctorHeading: "Meet Dr. Sandeep Bhasin – Vitiligo Specialist in Delhi",
  protocolHeading: "Our Vitiligo Treatment Protocol",
  candidateHeading: "Who is a Good Candidate for Vitiligo Treatment?",
  mythsHeading: "Vitiligo Myths vs Facts",
  areasHeading: "Common Areas Affected by Vitiligo",
  causesHeading: "What Causes Loss of Melanin?",
  earlySignsHeading: "Early Signs of Vitiligo",
  typesHeading: "Types of Vitiligo",
  managementHeading: "Vitiligo Management Options",
  comprehensiveHeading: "Our Comprehensive Vitiligo Management Protocol",
  tattooHeading: "Tattooing for Vitiligo – Pros & Limitations",
  tattooNote: "Medical treatments are generally preferred whenever possible.",
  futureHeading: "Future Treatments Being Studied",
  homeCareHeading: "Home Care & Lifestyle Tips",
  homeRemediesNote: "Home remedies should not replace medical treatment.",
  costHeading: "Vitiligo Treatment Cost in Delhi",
  costNoteFactors: ["Area involved", "Treatment method", "Number of sessions", "Combination therapies"],
  whyClinicHeading: "Why Choose Care Well Medical Centre?",
  whyClinicSubheading: "What Makes Us Different",
  galleryHeading: "Vitiligo Before & After Results",
  galleryNoteFactors: [
    "Stability of vitiligo",
    "Skin type",
    "Treatment selected",
    "Individual healing response",
  ],
  videosHeading: "Vitiligo Treatment Videos",
  testimonialsHeading: "Patient Testimonials",
  testimonialsSubheading: "Hear real patients share their journey toward improved skin tone and confidence.",
  locationHeading: "How to Reach Care Well Medical Centre",
  ctaHeading: "Ready to Begin Your Vitiligo Treatment Journey?",
  ctaBody:
    "Restore confidence with personalized vitiligo treatment from experienced specialists.",
  faqHeading: "FAQs – Vitiligo Treatment in Delhi",
  disclaimer:
    "Treatment suitability and outcomes vary based on the type, stability, and severity of vitiligo. A detailed consultation is required for personalized treatment planning.",
  treatmentDropdownLabel: "Vitiligo Treatment",
  parentLabel: "Skin Treatments in Delhi",
  parentPath: SKIN_TREATMENTS_PATH,
} as const;

export { SKIN_CLINIC as VITILIGO_CLINIC };

export const VITILIGO_HERO_GRID = [
  { key: "heroLegs" as const, label: "Legs transformation" },
  { key: "heroFace" as const, label: "Face results" },
  { key: "heroLip" as const, label: "Lip transplant" },
  { key: "heroChest" as const, label: "Chest recovery" },
  { key: "heroCheek" as const, label: "Cheek transformation" },
] as const;

export const VITILIGO_EFFECTS = [
  "White patches appear on the skin",
  "Skin loses its natural color",
  "Hair in affected areas may also turn white",
] as const;

export const VITILIGO_AFFECTED = ["Face", "Hands", "Feet", "Chest", "Lips", "Around the eyes", "Genital region"] as const;

export const VITILIGO_EARLY_BENEFITS = [
  "Slow progression",
  "Improve repigmentation",
  "Reduce spread",
] as const;

export const VITILIGO_TREATMENT_CATEGORIES = [
  {
    title: "Medical Treatment & Phototherapy",
    imageKey: "phototherapy" as const,
    description: "Medical treatment helps stimulate pigment production and control progression.",
    options: [
      "Topical Corticosteroids",
      "Calcineurin Inhibitors",
      "Oral Medications",
      "PUVA Therapy",
      "Narrow Band UVB (NB-UVB)",
    ],
    benefits: ["Non-surgical approach", "Effective for early vitiligo", "Helps restore pigmentation"],
    href: "/book-consultation",
  },
  {
    title: "Surgical Vitiligo Treatments",
    imageKey: "melanocyte" as const,
    description: "Recommended for stable vitiligo cases.",
    procedures: [
      { name: "Melanocyte Transplantation", detail: "Transfer of pigment-producing cells to affected areas.", href: `${BASE}/vitiligo/melanocytes-transplant` },
      { name: "Skin Grafting", detail: "Healthy pigmented skin is transplanted into depigmented areas.", href: `${BASE}/skin-grafting` },
      { name: "Punch Grafting", detail: "Small skin grafts are implanted into white patches.", href: `${BASE}/punch-grafting` },
    ],
    benefits: ["Long-term pigmentation restoration", "Suitable for stable vitiligo", "High success rates"],
    href: `${BASE}/vitiligo/melanocytes-transplant`,
  },
  {
    title: "Cosmetic Treatments",
    imageKey: "cosmetic" as const,
    description: "Additional cosmetic options include micropigmentation, camouflage makeup, and skin tone matching solutions.",
    benefits: ["Improved appearance", "Enhanced confidence", "Immediate cosmetic improvement"],
    href: "/book-consultation",
  },
] as const;

export const VITILIGO_DOCTOR = {
  name: "Dr. Sandeep Bhasin",
  role: "Senior Cosmetic & Reconstructive Surgeon",
  credentials: ["MBBS", "MS (General Surgery)", "Aligarh Muslim University (AMU)"],
  experience: ["20+ Years Surgical Experience", "10+ Years Focused Vitiligo Surgery Experience"],
  expertise: ["Melanocyte Transplantation", "Punch Grafting", "Skin Grafting", "Reconstructive Procedures"],
  achievements: [
    "100+ Melanocyte Transplant Procedures",
    "Speaker at Dermatology Conferences",
    "High Repigmentation Success Rates",
  ],
  href: "/about/dr-bhasin",
} as const;

export const VITILIGO_PROTOCOL_STEPS = [
  {
    step: 1,
    title: "Diagnosis & Skin Analysis",
    imageKey: "woodsLamp" as const,
    items: ["Skin examination", "Wood's Lamp assessment", "Patch testing", "Stability assessment"],
  },
  {
    step: 2,
    title: "Immune Stabilization",
    imageKey: "medicalPhase" as const,
    items: ["Oral Minipulse Therapy", "Immunomodulators", "Antioxidants", "NB-UVB Therapy"],
    goal: "Stabilize vitiligo and prepare skin for repigmentation",
  },
  {
    step: 3,
    title: "Surgical Treatment",
    imageKey: "surgery" as const,
    items: ["Melanocyte Transplantation", "Skin Grafting", "Punch Grafting"],
    note: "Performed under sterile and controlled conditions for stable vitiligo.",
  },
  {
    step: 4,
    title: "Repigmentation Support",
    imageKey: "repigmentation" as const,
    items: ["Phototherapy", "Topical medications", "Follow-up monitoring"],
  },
  {
    step: 5,
    title: "Long-Term Maintenance",
    imageKey: "maintenance" as const,
    items: ["Nutritional guidance", "Lifestyle modifications", "Ongoing support"],
  },
] as const;

export const VITILIGO_IDEAL_CANDIDATES = [
  "Adults aged 18–50 years",
  "Stable vitiligo (6–12 months)",
  "Segmental vitiligo",
  "Localized vitiligo",
  "Patients seeking long-term pigmentation restoration",
] as const;

export const VITILIGO_NOT_IDEAL = [
  "Active spreading vitiligo",
  "Poor wound healing",
  "Keloid tendency",
  "Unrealistic expectations",
  "Patients unwilling to follow aftercare protocols",
] as const;

export const VITILIGO_MYTHS_ROWS = [
  { myth: "Vitiligo is contagious", fact: "No, it cannot spread through contact" },
  { myth: "Only dark-skinned people get vitiligo", fact: "It affects all skin types" },
  { myth: "Vitiligo causes pain", fact: "Usually painless" },
  { myth: "Vitiligo cannot be treated", fact: "Many effective treatments exist" },
  { myth: "Poor hygiene causes vitiligo", fact: "It is an autoimmune condition" },
  { myth: "Home remedies alone cure vitiligo", fact: "Medical treatment is often required" },
] as const;

export const VITILIGO_BODY_AREAS = [
  "Face & Neck",
  "Hands & Feet",
  "Lips",
  "Around Eyes",
  "Armpits",
  "Groin",
  "Genital Areas",
  "Sun-Exposed Areas",
] as const;

export const VITILIGO_MELANIN_CAUSES = [
  {
    title: "Autoimmune Factors",
    description: "The immune system attacks melanocytes.",
  },
  {
    title: "Genetic Predisposition",
    description: "Family history may increase risk.",
  },
  {
    title: "Stress",
    description: "Both physical and emotional stress can contribute.",
  },
  {
    title: "Environmental Factors",
    description: "Certain chemicals and exposures may trigger vitiligo.",
  },
] as const;

export const VITILIGO_EARLY_SIGNS = [
  "Small white patches",
  "Well-defined borders",
  "Oval or round lesions",
  "Gradual spread",
  "No pain or itching",
] as const;

export const VITILIGO_TYPES = [
  { name: "Generalized Vitiligo", description: "Most common form affecting multiple body areas." },
  { name: "Segmental Vitiligo", description: "Occurs on one side of the body. Often appears at a younger age." },
  { name: "Focal Vitiligo", description: "One or a few isolated patches." },
  { name: "Mucosal Vitiligo", description: "Affects lips and mucous membranes." },
  { name: "Universal Vitiligo", description: "Rare form involving extensive body depigmentation." },
  { name: "Acrofacial Vitiligo", description: "Affects hands, feet, and face." },
  { name: "Mixed Vitiligo", description: "Combination of multiple vitiligo types." },
] as const;

export const VITILIGO_MANAGEMENT = [
  { category: "Medical Management", items: ["Topical Steroids", "Calcineurin Inhibitors", "Oral Medications"] },
  { category: "Phototherapy", items: ["NB-UVB", "PUVA"] },
  { category: "Laser Therapy", items: ["Excimer Laser"] },
  { category: "Surgical Options", items: ["Skin Grafting", "Melanocyte Transplantation"] },
  { category: "Cosmetic Solutions", items: ["Camouflage Makeup", "Micropigmentation"] },
] as const;

export const VITILIGO_COMPREHENSIVE = [
  "Oral Minipulse Therapy",
  "Immunosuppressive Therapy",
  "Antioxidant Support",
  "Ozone Autohemotherapy",
  "NB-UVB Phototherapy",
  "Topical Repigmentation Treatments",
  "Intravenous Nutritional Therapy",
] as const;

export const VITILIGO_TATTOO_RISKS = [
  "Color mismatch",
  "Fading over time",
  "Allergic reactions",
  "Infection risk",
  "Variable outcomes",
] as const;

export const VITILIGO_FUTURE = ["Tofacitinib", "Pseudocatalase", "Afamelanotide", "Prostaglandin E2"] as const;

export const VITILIGO_HOME_PROTECT = [
  "Use SPF 30+ sunscreen",
  "Avoid excessive sun exposure",
  "Wear protective clothing",
] as const;

export const VITILIGO_HOME_SUPPORT = [
  "Stay hydrated",
  "Maintain healthy nutrition",
  "Follow prescribed treatment",
] as const;

export const VITILIGO_HOME_REMEDIES = ["Aloe Vera", "Turmeric", "Neem", "Coconut Oil", "Ginkgo Biloba"] as const;

export const VITILIGO_COST_ROWS = [
  { treatment: "Melanocyte Transplantation", range: "₹65,000 per session" },
  { treatment: "Skin Grafting", range: "₹45,000 – ₹85,000" },
  { treatment: "Punch Grafting", range: "₹30,000 – ₹60,000" },
  { treatment: "NB-UVB Phototherapy", range: "₹800 – ₹1,200 per session" },
  { treatment: "Topical/Oral Medicines", range: "₹1,500 – ₹5,000/month" },
  { treatment: "Consultation", range: "₹1,000" },
] as const;

export const VITILIGO_WHY_CLINIC = [
  "Experienced Vitiligo Specialist",
  "Advanced Surgical Techniques",
  "Personalized Treatment Plans",
  "Modern Equipment",
  "High Repigmentation Success Rates",
  "Long-Term Patient Support",
] as const;

export const VITILIGO_LOCATION = {
  metro: "Nearest Metro: Govindpuri (Violet Line)",
  parking: "Free Parking Available",
} as const;

export const VITILIGO_VIDEO_TOPICS = [
  "Melanocyte Transplant Procedure",
  "Vitiligo Recovery Journey",
  "Patient Success Stories",
  "Expert Advice from Dr. Sandeep Bhasin",
] as const;

export const VITILIGO_FAQS: { question: string; answer: string }[] = [
  {
    question: "What is vitiligo?",
    answer:
      "Vitiligo is a condition where melanocytes stop producing pigment, leading to white patches on the skin. It can affect any age and skin type.",
  },
  {
    question: "Can vitiligo be cured permanently?",
    answer:
      "While a complete permanent cure is not guaranteed for all cases, many patients achieve significant and long-lasting repigmentation with medical and surgical treatments.",
  },
  {
    question: "Who is suitable for melanocyte transplantation?",
    answer:
      "Patients with stable vitiligo (no new patches for 6–12 months) and localized areas are often good candidates for melanocyte transplant.",
  },
  {
    question: "Is vitiligo contagious?",
    answer: "No. Vitiligo is not contagious and cannot spread through contact.",
  },
  {
    question: "How many sessions are required?",
    answer:
      "Phototherapy may need many sessions over months. Surgical procedures are often one-time with follow-up phototherapy and maintenance.",
  },
  {
    question: "What is the cost of vitiligo treatment?",
    answer:
      "Costs range from ₹800 per phototherapy session to ₹65,000+ for melanocyte transplant, depending on area and treatment plan.",
  },
  {
    question: "Is surgery safe for vitiligo?",
    answer:
      "Yes, when performed by experienced surgeons on stable vitiligo under sterile conditions with proper aftercare.",
  },
  {
    question: "Which treatment is best for stable vitiligo?",
    answer:
      "Stable vitiligo often responds well to melanocyte transplantation, punch grafting, or skin grafting combined with phototherapy.",
  },
];
