import { COSMETIC_TREATMENTS_PATH } from "@/data/cosmetic-treatments-in-delhi";
import { HAIR_LOSS_CLINIC } from "@/data/hair-loss-treatment-in-delhi";

export const DERMAL_FILLERS_PATH = "/cosmetic-treatments-in-delhi/dermal-fillers" as const;

const WP = "https://www.carewellmedicalcentre.com/wp-content/uploads";

export const DERMAL_FILLERS_IMAGES = {
  hero: {
    src: `${WP}/2025/05/dermal-fillers-carewell.webp`,
    alt: "Dermal fillers before and after — restored facial volume at Care Well Medical Centre Delhi",
  },
  whatIs: {
    src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517868/carewell-media/wp/dermal-fillers-carewell.webp`,
    alt: "Dermal fillers treatment in Delhi for volume restoration",
  },
  beforeAfter: [
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517868/carewell-media/wp/dermal-fillers-carewell.webp`,
      alt: "Dermal fillers before and after showing results in Delhi",
      caption: "Volume restoration results",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517871/carewell-media/wp/lip-augmentation.webp`,
      alt: "Dermal fillers lip enhancement before and after",
      caption: "Lip enhancement",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517868/carewell-media/wp/dermal-fillers-carewell.webp`,
      alt: "Cheek and lip enhancement with dermal fillers",
      caption: "Cheek and lip contouring",
    },
  ],
  doctor: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517806/carewell-media/site/demo/doctor-profile-feature-vertical.png",
    alt: "Dr. Sandeep Bhasin — dermal fillers expert in Delhi",
  },
  videoPoster: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517807/carewell-media/site/demo/doctor-profile-feature.jpg",
    alt: "Dermal fillers treatment video — Care Well Medical Centre",
  },
} as const;

export const DERMAL_FILLERS_SEO = {
  title: "Dermal Fillers in Delhi | Restore Volume & Enhance Beauty | Care Well Medical Centre",
  description:
    "Dermal fillers in Delhi at Care Well Medical Centre. Juvederm, Restylane & HA fillers for lips, cheeks, under-eyes & jawline by Dr. Sandeep Bhasin. Book now.",
} as const;

export const DERMAL_FILLERS_PAGE = {
  h1: "Dermal Fillers Treatment in Delhi – Restore Volume & Enhance Your Beauty",
  subtitle: "FDA-Approved Fillers · South Delhi",
  tagline:
    "Achieve a youthful, sculpted look with customized dermal fillers — natural volume restoration under Dr. Sandeep Bhasin's expert care.",
  parentLabel: "Cosmetic Treatments in Delhi",
  parentPath: COSMETIC_TREATMENTS_PATH,
  introHeading: "Achieve a Youthful & Sculpted Look with Dermal Fillers at Care Well Medical Centre",
  introParagraphs: [
    "Age, lifestyle, environment, and stress eventually show as wrinkles, fine lines, and loss of skin firmness. Dermal fillers restore lost volume, smooth facial contours, and safely replace volume for a refreshed appearance.",
    "At Care Well Medical Centre, we offer customized dermal fillers in Delhi under Dr. Sandeep Bhasin — ensuring natural, long-lasting, youthful results.",
  ],
  whatIsHeading: "What Are Dermal Fillers?",
  whatIsParagraphs: [
    "Dermal fillers are gel-based formulas injected into the skin to repair affected areas, improve facial contours, and ease lines. They treat age-related folds, revive thin lips, soften facial folds, and improve scars.",
    "Fillers such as hyaluronic acid, calcium hydroxylapatite, and poly-L-lactic acid can also stimulate collagen. This non-invasive injectable helps men and women in Delhi achieve youthful skin quickly.",
  ],
  treatmentAreasHeading: "Areas Dermal Fillers Can Enhance",
  benefitsHeading: "Benefits of Fillers Treatment in Delhi",
  benefits: [
    "Quick and long-lasting results — improvement visible immediately",
    "No surgery — no anesthesia or incisions required",
    "Natural-looking and feeling enhancement",
    "Safe, FDA-cleared products only",
    "Customizable for individual facial anatomy",
    "Minimal recovery — resume routine tasks after treatment",
    "Collagen stimulation for long-term skin benefits",
  ],
  prpNote:
    "Want a glow boost? Combine filler results with PRP facial rejuvenation therapy for improved skin texture and collagen boost.",
  risksHeading: "Risks & Side Effects of Dermal Fillers",
  risksIntro:
    "With trained professionals, dermal fillers are generally safe. Most reactions are mild and heal within a few days.",
  commonSideEffects: [
    "Mild redness, swelling, or bruising at the injection site",
    "Tenderness or itching in the treatment area",
    "Temporary lumps or unevenness",
    "Tightness or mild discomfort",
  ],
  rareRisks: [
    "Infection at the injection site",
    "Allergic reactions",
    "Vascular issues or skin discoloration if injected improperly",
    "Granuloma or nodule development in rare cases",
  ],
  candidateHeading: "Who Is the Ideal Candidate for Fillers?",
  candidateIntro: "Dermal fillers suit many patients. You may be ideal if:",
  candidateItems: [
    "You have volume loss in cheeks, lips, jawline, or under eyes",
    "You want reduced fine lines, wrinkles, or sagging skin",
    "You want naturally defined, hydrated, fuller lips",
    "Hollow under-eyes or deep nasolabial folds make you look tired",
    "You want minimally invasive facial rejuvenation with immediate return to work",
    "You want natural-looking outcomes and anti-aging maintenance",
  ],
  procedureHeading: "How Does the Fillers Procedure Work?",
  procedureIntro:
    "Surgeons inject virtually painless filler into targeted areas. The process is customized to your skin concerns and goals with minimal downtime.",
  procedureSteps: [
    "Comprehensive consultation with Dr. Sandeep Bhasin to plan filler type and treatment",
    "Cleansing and numbing cream applied for comfort",
    "Precise filler injections using fine needles or cannulas",
    "Shaping and sculpting for even, natural distribution",
    "Post-treatment care instructions for optimal results",
  ],
  procedureNote: "Treatment takes 30–45 minutes. Results are immediate and you can resume normal activities afterward.",
  resultsHeading: "Dermal Fillers Treatment Before and After Results",
  resultsIntro:
    "Patients see immediate improvements in facial volume, contour definition, and skin smoothness, with full refinement over 1–2 weeks.",
  juvedermHeading: "Comparing Juvederm and Other Dermal Fillers",
  juvedermIntro:
    "Juvederm (Allergan) is an FDA-approved hyaluronic acid filler for lips, nasolabial folds, and cheek volume loss — with natural results lasting up to two years.",
  juvedermTypes: [
    "Juvederm Vollure XC — softens mild to severe wrinkles and folds around nose and mouth",
    "Juvederm Voluma XC — restores cheek volume lost with age",
    "Juvederm Volbella XC — enhances lips and smooths vertical lip lines",
    "Juvederm Ultra XC — lip volumization and moderate to severe facial wrinkles",
  ],
  otherFillers: [
    "Perlane — thicker HA for deep wrinkles and cheek volume",
    "Restylane — multiple formulations for area-specific, natural results",
    "Radiesse — calcium hydroxylapatite for deep wrinkles",
    "Sculptra — poly-L-lactic acid for gradual volume restoration",
    "Fat grafting — uses your own fat; results vary",
    "Permanent fillers — not recommended due to irreversible complications",
  ],
  underEyeHeading: "Under-Eye (Tear Trough) Filler in Delhi – Remove Dark Circles & Hollow Eyes",
  underEyeIntro:
    "Under-eye fillers are a non-surgical remedy for hollowness, bags, and dark circles using soft hyaluronic acid fillers designed for the delicate under-eye area.",
  underEyeFillers: [
    "Juvederm Volbella / Volift — lightweight HA for smooth, natural correction",
    "Restylane-L / Teosyal Redensity II — reduces puffiness and dark circles",
    "Revive / Belotero Balance — subtle enhancement with less swelling",
  ],
  underEyeBenefits: [
    "Minimized hollow tear troughs and dark shadows",
    "Refreshed, less tired appearance",
    "Immediate results with safe, reversible hyaluronic acid",
    "Results last 12–18 months depending on product",
  ],
  underEyeCost: "₹20,000 to ₹25,000 per ml — most patients need 1 ml or less for both under-eyes.",
  permanentHeading: "Are Permanent Dermal Fillers Available?",
  permanentWarning:
    "Permanent fillers are not recommended due to high risk of lumps, infections, immune reactions, and results that are difficult to reverse. Care Well Medical Centre uses temporary, reversible HA-based fillers instead.",
  permanentRisks: [
    "High risk of lumps, infections, or immune reactions",
    "Distorted results over time",
    "Difficult to adjust or remove without surgery",
    "Limited FDA approval for facial use in many countries",
  ],
  saferAlternatives: [
    "Juvederm Voluma XC (up to two years)",
    "Restylane Lyft",
    "Radiesse (stimulates collagen)",
    "Sculptra (gradual natural volume)",
  ],
  longevityHeading: "Expected Results & Longevity",
  longevityPoints: [
    "Immediate improvement in volume, contour, and skin smoothness",
    "Full results refine over 1–2 weeks",
    "Effects last 6–18 months depending on filler and metabolism",
    "Regular touch-ups maintain a youthful look long term",
    "HA fillers improve hydration and elasticity over time",
  ],
  whyBestHeading: "Best Dermal Fillers in Delhi – Trusted Results by Experts",
  whyBestItems: [
    "Top-quality fillers only — FDA-approved Restylane, Teosyal, and Juvederm",
    "Tailored to your features — subtle lip enhancement to full face contouring",
    "Performed by Dr. Sandeep Bhasin — 15+ years in aesthetics",
    "Minimally invasive — gentle techniques with no downtime",
    "Transparent pricing — full clarity upfront, no hidden charges",
  ],
  whyChooseHeading: "Why Choose Care Well Medical Centre for Fillers Treatment in Delhi?",
  whyChooseItems: [
    "Leading aesthetic clinic in Delhi",
    "Experienced injector — precise, natural results",
    "Customized approach for every patient",
    "Premium, FDA-approved fillers",
    "Easily accessible South Delhi location",
    "Cost-effective, transparent pricing",
  ],
  aftercareHeading: "Post-Treatment Care & Recovery",
  aftercare: [
    "Do not touch or massage the treated area for 24 hours",
    "Stay hydrated and use sunscreen to protect skin",
    "Avoid heavy sun, smoking, and alcohol for 24–48 hours",
    "Mild swelling or redness usually resolves within 3–5 days",
    "Use a cold compress if needed for minor swelling",
    "Schedule follow-ups to maintain and refine results",
  ],
  costHeading: "How Much Do Dermal Fillers Cost in Delhi?",
  costIntro:
    "Prices range from ₹10,000 to ₹50,000 per ml depending on filler type, treatment area, and syringes required.",
  bioFillersNote: "Bio-fillers packages start at ₹20,000 for 2ml–5ml for eligible patients.",
  consultationHeading: "Book Your Fillers Treatment Consultation Today!",
  consultationBody:
    "Rediscover your youthful glow with dermal fillers for restored volume, enhanced lips, facial contouring, or wrinkle smoothing — naturally and safely. Dr. Sandeep Bhasin provides personalized consultations for radiant, long-lasting results.",
  doctorHeading: "About Dr. Sandeep Bhasin",
  doctorBio:
    "Dr. Sandeep Bhasin is a renowned cosmetic and aesthetic expert specializing in dermal fillers, Botox, thread lifts, and non-surgical rejuvenation. As founder of Care Well Medical Centre, he delivers natural results using FDA-approved products.",
  faqHeading: "Dermal Fillers FAQs",
  disclaimer:
    "Treatment suitability, filler choice, and results vary between individuals. A consultation with Dr. Sandeep Bhasin is recommended before beginning dermal filler treatment.",
  treatmentDropdownLabel: "Dermal Fillers",
} as const;

export { HAIR_LOSS_CLINIC as DERMAL_FILLERS_CLINIC };

export const DERMAL_FILLERS_TREATMENT_AREAS = [
  {
    title: "Cheeks & Mid-Face Volume",
    body: "Rejuvenate and redefine facial contours.",
  },
  {
    title: "Lips",
    body: "Fuller, defined lips with hydration and natural shape.",
    href: `${COSMETIC_TREATMENTS_PATH}/lip-augmentation`,
  },
  {
    title: "Jawline & Chin",
    body: "Facial balance and contouring for a defined jawline.",
  },
  {
    title: "Under-Eye Hollows",
    body: "Reduce hollowness and tired appearance.",
    href: "/skin-treatments-in-delhi/dark-circles",
  },
  {
    title: "Nasolabial folds & marionette lines",
    body: "Soften deep folds around the mouth and nose.",
  },
  {
    title: "Hand Rejuvenation",
    body: "Restore lost volume and smooth fine lines on hands.",
  },
  {
    title: "Temple filling",
    body: "Soft transition between forehead and cheek.",
  },
  {
    title: "Acne scars",
    body: "Reduce deep acne scars and skin indentation.",
    href: "/skin-treatments-in-delhi/acne-scar",
  },
] as const;

export const DERMAL_FILLERS_COST_ROWS = [
  { area: "Lip Fillers", range: "₹18,000 – ₹25,000 per ml" },
  { area: "Under-Eye Fillers (Tear Trough)", range: "₹20,000 – ₹25,000 per ml" },
  { area: "Cheek Fillers", range: "₹20,000 – ₹30,000 per ml" },
  { area: "Jawline & Chin Fillers", range: "₹22,000 – ₹30,000 per ml" },
  { area: "Nasolabial Fold Fillers", range: "₹15,000 – ₹22,000 per ml" },
  { area: "Temple Fillers", range: "₹18,000 – ₹28,000 per ml" },
  { area: "Acne Scar Correction", range: "₹10,000 – ₹20,000 per session" },
  { area: "Juvederm (per syringe)", range: "₹20,000 – ₹30,000" },
  { area: "Hyaluronic Acid Fillers", range: "₹15,000 – ₹30,000 per ml" },
] as const;

export const DERMAL_FILLERS_FAQS: { question: string; answer: string }[] = [
  {
    question: "Can you use skin fillers for wrinkles?",
    answer:
      "Yes. Dermal fillers effectively smooth wrinkles such as marionette lines and fine lip lines. Juvederm Ultra Plus or Perlane address deep wrinkles; Juvederm Ultra works well for fine lines and lip contouring.",
  },
  {
    question: "What's the difference between dermal fillers and Botox?",
    answer:
      "Fillers add volume and smooth static wrinkles from collagen loss — ideal for cheeks, lips, and nasolabial folds. Botox relaxes muscles for dynamic lines like crow's feet and frown lines. Many patients combine both for optimal anti-aging results.",
  },
  {
    question: "Can dermal fillers help with acne scars?",
    answer:
      "Yes. Restylane and Juvederm can improve depressed acne scars by adding volume beneath the skin. Bellafill is FDA-approved for acne scars lasting up to five years. Explore our acne scar treatment page for deeper options.",
  },
  {
    question: "Can dermal fillers enhance cheeks?",
    answer:
      "Yes. Fillers like Restylane and Juvederm Voluma XC restore cheek volume for a natural, youthful lift. Results last months to over two years depending on the product used.",
  },
  {
    question: "Can under-eye fillers help with dark circles and eye bags?",
    answer:
      "Under-eye fillers such as Restylane or Juvederm Volbella restore hollow tear troughs and soften shadows. Results last 12–18 months with minimal downtime. Pigmentation-related dark circles may need additional treatments.",
  },
  {
    question: "What are the best dermal fillers?",
    answer:
      "FDA-approved Juvederm, Restylane, and Sculptra are among the most trusted options in Delhi. Dr. Sandeep Bhasin recommends the best product based on your treatment area, goals, and skin condition.",
  },
  {
    question: "How much do Juvederm fillers cost in India?",
    answer:
      "Juvederm fillers in India range from ₹20,000 to ₹30,000 per syringe depending on variant (Ultra, Volbella, Voluma) and treatment area.",
  },
  {
    question: "What is the cost of dermal fillers in Delhi?",
    answer:
      "Dermal filler cost in Delhi ranges from ₹10,000 to ₹50,000 per ml based on filler type and area. Bio-filler packages start at ₹20,000 for 2–5 ml.",
  },
  {
    question: "Are permanent dermal fillers safe?",
    answer:
      "Not recommended. Permanent fillers carry increased irreversible risks. Care Well Medical Centre uses safe, temporary hyaluronic acid fillers such as Juvederm and Restylane.",
  },
  {
    question: "Juvederm vs Botox – which is better?",
    answer:
      "Juvederm adds volume and smooths static lines; Botox relaxes muscles for expression wrinkles. Both are often combined for comprehensive facial rejuvenation.",
  },
  {
    question: "What are the most trusted fillers in Delhi?",
    answer:
      "Juvederm, Restylane, and Teosyal are widely trusted for natural, long-lasting outcomes when administered by an experienced injector.",
  },
];
