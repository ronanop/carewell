import { COSMETIC_TREATMENTS_PATH } from "@/data/cosmetic-treatments-in-delhi";
import { HAIR_LOSS_CLINIC } from "@/data/hair-loss-treatment-in-delhi";

export const LIP_AUGMENTATION_PATH = "/cosmetic-treatments-in-delhi/lip-augmentation" as const;

const WP = "https://www.carewellmedicalcentre.com/wp-content/uploads";
const COSMETIC = COSMETIC_TREATMENTS_PATH;

export const LIP_AUGMENTATION_IMAGES = {
  hero: {
    src: `${WP}/2025/05/lip-augmentation.webp`,
    alt: "Lip Augmentation in Delhi – Natural Before and After Results by Care Well Medical Centre",
  },
  whatIs: {
    src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517871/carewell-media/wp/lip-augmentation.webp`,
    alt: "What is Lip Augmentation in Delhi",
  },
  benefits: {
    src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517871/carewell-media/wp/lip-augmentation.webp`,
    alt: "Facial Balance After Lip Augmentation in Delhi – Natural Before and After Result",
  },
  fillerTypes: {
    src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517868/carewell-media/wp/dermal-fillers-carewell.webp`,
    alt: "Types of lip fillers including hyaluronic acid, collagen, fat grafting, and semi-permanent options",
  },
  doctor: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517806/carewell-media/site/demo/doctor-profile-feature-vertical.png",
    alt: "Dr. Sandeep Bhasin — lip augmentation expert in Delhi",
  },
  beforeAfter: [
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517871/carewell-media/wp/lip-augmentation.webp`,
      alt: "Lip augmentation before and after results photo",
      caption: "Natural lip enhancement",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517871/carewell-media/wp/lip-augmentation.webp`,
      alt: "Lip augmentation before and after result in Delhi",
      caption: "Improved lip balance",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517868/carewell-media/wp/dermal-fillers-carewell.webp`,
      alt: "Lip filler before and after in Delhi",
      caption: "Defined lip contours",
    },
  ],
} as const;

export const LIP_AUGMENTATION_SEO = {
  title: "Lip Augmentation in Delhi – Cost, Fillers, Injections & Before/After | Care Well Medical Centre",
  description:
    "Lip augmentation in Delhi at Care Well Medical Centre. Juvederm, Restylane fillers, Botox lip flip, fat grafting & lip lift by Dr. Sandeep Bhasin. Natural results. Book now.",
} as const;

export type LipEnhancementOption = {
  title: string;
  image: string;
  imageAlt: string;
  bullets: readonly string[];
  idealFor?: readonly string[];
  note?: string;
  href?: string;
  linkLabel?: string;
};

export const LIP_ENHANCEMENT_OPTIONS: LipEnhancementOption[] = [
  {
    title: "Dermal Fillers (Juvederm, Restylane)",
    image: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517868/carewell-media/wp/dermal-fillers-carewell.webp`,
    imageAlt: "Dermal filler injection in lips using Juvederm or Restylane for natural lip enhancement in Delhi",
    bullets: [
      "Fast, non-surgical process completed in under 30 minutes",
      "Adjustable volume — reversible or tweaked at any time",
      "Little pain and no recovery time needed",
      "Reputable brands Juvederm and Restylane for safety and reliable results",
    ],
    note: "Perfect for lips, cheeks, smile lines, and under-eye hollows with immediate, natural-looking results.",
    href: `${COSMETIC}/dermal-fillers`,
    linkLabel: "Explore Dermal Fillers in Delhi",
  },
  {
    title: "Fat Grafting (Natural Lip Volume)",
    image: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517884/carewell-media/wp/fat-grafting-min.jpg`,
    imageAlt: "Fat grafting for natural lip volume lip augmentation in Delhi",
    bullets: [
      "Long-term volume enhancement using your own body fat",
      "No artificial substances — natural texture and absorption",
      "Adds softness with a natural feel",
      "Excellent for those who have tried fillers or want results beyond 12 months",
    ],
  },
  {
    title: "Botox Lip Flip (Subtle Lift Without Fillers)",
    image: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517872/carewell-media/wp/botox-treatment-carewell.webp`,
    imageAlt: "Botox lip flip for subtle upper lip lift in Delhi",
    idealFor: [
      "Need a slightly more noticeable upper lip",
      "Don't want a higher-commitment filler procedure",
      "Want subtle outcomes without excess volume",
      "Require a rapid solution with no downtime",
    ],
    bullets: [
      "Small dose of Botox relaxes the upper lip muscle so it flips outward slightly",
      "Creates the illusion of a fuller upper lip without adding volume",
    ],
    href: `${COSMETIC}/botox`,
    linkLabel: "Botox Treatment in Delhi",
  },
  {
    title: "Lip Implants and Lip Lift Surgery",
    image: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517871/carewell-media/wp/lip-augmentation.webp`,
    imageAlt: "Lip implants and lip lift surgery for permanent lip enhancement in Delhi",
    bullets: [
      "Lip implants: Soft silicone implants placed inside the lips for permanent volume and structure",
      "Lip lift surgery: Reduces distance between nose and upper lip for a youthful, elevated look",
      "Both done under local anesthesia and tailored to your facial balance",
    ],
  },
  {
    title: "Lip Reduction Surgery (For Proportion and Refinement)",
    image: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517871/carewell-media/wp/lip-augmentation.webp`,
    imageAlt: "Lip reduction surgery before and after results for balanced lips",
    bullets: [
      "Trims excessive lip tissue for lips that are too large or disproportionate",
      "Restores balance between upper and lower lips",
      "Refines lip shape for a more proportionate smile",
      "Done under local anesthesia with limited recovery time",
    ],
    note: "Ideal to correct past overfilling or achieve a cleaner, more defined lip shape.",
  },
];

export const LIP_FILLER_TYPES = [
  {
    title: "Hyaluronic Acid Fillers (HA Fillers)",
    bullets: [
      "Reversible with hyaluronidase",
      "Last 6 to 12 months",
      "Soft, natural-looking results — best for beginners",
      "Brands: Juvederm, Restylane, Belotero",
    ],
  },
  {
    title: "Collagen-Based Fillers",
    bullets: [
      "Less commonly used but available for firmer texture",
      "Last 3 to 6 months",
      "Enhance definition and lip texture",
      "Ideal for fine lines around the mouth",
    ],
  },
  {
    title: "Fat-Based Fillers (Autologous Fat Transfer)",
    bullets: [
      "Your body fat is filtered and injected into the lips",
      "Long-lasting (12+ months), no artificial materials",
      "Natural texture and absorption",
      "Perfect for those steering clear of chemicals",
    ],
  },
  {
    title: "Semi-Permanent Fillers (Selective Use)",
    bullets: [
      "Fillers such as Aquamid provide long-term results but are harder to remove",
      "Last more than 2 years — used only after thorough consultation",
      "Not suited for beginners",
    ],
  },
] as const;

export const LIP_ANATOMY_AREAS = [
  { title: "Cupid's Bow", body: "The soft 'M'-shaped curve in the center of the upper lip that adds definition." },
  { title: "Vermilion Border", body: "The outer edge where your lips meet the skin — helps define lip shape." },
  { title: "Vermilion Zone", body: "The pink or red part of the lips where volume is added." },
  { title: "Philtrum Columns", body: "The two vertical lines between the nose and upper lip that influence lip height." },
  { title: "Oral Commissures", body: "The corners of the mouth that affect your natural expression." },
] as const;

export const LIP_COMPARISON_ROWS = [
  { feature: "Type", temporary: "Non-surgical", permanent: "Surgical" },
  { feature: "Duration", temporary: "6–12 months", permanent: "1 year to permanent" },
  { feature: "Adjustability", temporary: "Can be dissolved or modified", permanent: "Not easily reversible" },
  { feature: "Best for", temporary: "First-timers, subtle results", permanent: "Long-term volume, repeat users" },
  { feature: "Recovery", temporary: "Minimal (same day)", permanent: "2–5 days (light rest)" },
] as const;

export const LIP_AUGMENTATION_COST_ROWS = [
  { treatment: "Hyaluronic Acid Fillers (Juvederm, Restylane)", range: "₹18,000 – ₹35,000 per session" },
  { treatment: "Fat Grafting (Natural Lip Volume)", range: "₹50,000 – ₹1,00,000" },
  { treatment: "Botox Lip Flip", range: "₹8,000 – ₹15,000" },
  { treatment: "Lip Implants", range: "₹70,000 – ₹1,50,000" },
  { treatment: "Lip Lift or Reduction Surgery", range: "₹60,000 – ₹1,20,000" },
] as const;

export const LIP_AUGMENTATION_PAGE = {
  h1: "Lip Augmentation in Delhi – Safe Fillers, Cost & Results",
  subtitle: "Natural Lip Enhancement · South Delhi",
  tagline:
    "Get plump, beautiful lips with advanced lip enhancement — subtle shape, proportion, and youthful definition tailored to your face.",
  parentLabel: "Cosmetic Treatments in Delhi",
  parentPath: COSMETIC_TREATMENTS_PATH,
  treatmentDropdownLabel: "Lip Augmentation",
  introHeading: "Get Plump, Beautiful Lips with Advanced Lip Enhancement Treatments",
  introParagraphs: [
    "Not all people are born with lips they like. Some need a little more shape; others feel theirs have thinned with age. If you are thinking about lip augmentation in Delhi, you likely want something that looks right for your face — not too much, just improved. That is what we emphasize here.",
    "It's not just about volumizing the lips. It's about restoring definition, proportion, and youthful shape using hyaluronic acid fillers, fat grafting, and surgical lip lifts — without making them appear unnatural.",
    "We do not have a standard formula. Some opt for fillers; others prefer fat transfer or a minor surgical lift. We only decide after listening to what you prefer and observing what looks good on your face.",
  ],
  whatIsHeading: "What is Lip Augmentation?",
  whatIsParagraphs: [
    "Lip augmentation is a cosmetic treatment that enhances the fullness, shape, and definition of your lips using safe, medically approved techniques.",
    "At Care Well Medical Centre in Delhi, we create personalized lip enhancement plans based on your facial structure and goals. Whether your lips have always felt too thin or have lost volume with age, this procedure can restore symmetry and a refreshed look — without making your lips appear artificial.",
    "Lips are not just soft skin. They are made of muscles, tissue, and natural borders that define their movement and appearance. We study all these areas carefully before suggesting any enhancement — because true beauty lies in harmony, not exaggeration.",
  ],
  whyChooseHeading: "Why Patients Choose Lip Enhancement",
  whyChooseParagraphs: [
    "Individuals opt for lip augmentation to feel more confident and in accord with how they desire to appear.",
    "Some desire a touch of shape; others want a fuller, younger look after volume loss with age. For others, it is about confidence in pictures, beautifying their smile, or preparing for a special occasion.",
    "Lip fillers and non-surgical treatments allow subtle, controlled adjustments — and you can reverse or fine-tune them when needed.",
  ],
  benefitsHeading: "Benefits of Lip Fillers in Delhi",
  benefitsIntro:
    "Your lips are an important component of your face's overall proportion. Enhancing their shape or volume can improve how your features work together.",
  benefits: [
    "Enhanced lip definition and texture",
    "Better proportion between the upper and lower lips",
    "Enhanced hydration and smoother feel",
    "Refined lip edges (particularly the Cupid's bow)",
    "A healthier, more animated smile",
  ],
  benefitsClosing:
    "When precision is used, lip augmentation emphasizes your natural features instead of altering them — infusing harmony into your appearance in a subtle but effective manner.",
  optionsHeading: "Lip Enhancement Options We Provide",
  optionsIntro:
    "At Care Well Medical Centre, we provide a full range of lip enhancement treatments — from short non-surgical procedures to more permanent surgical ones. Every technique is selected based on your lip shape, facial ratio, and individual aspirations.",
  fillerTypesHeading: "Types of Lip Fillers We Utilize",
  fillerTypesIntro:
    "Fillers vary in texture, effects, and duration. We select the most ideal filler based on your desired outcomes, skin type, and desired lip shape.",
  fillerTypesClosing:
    "Unsure which filler is best? Our specialists will assist based on your anatomy and desired lip enhancement.",
  rightOptionHeading: "Which Lip Augmentation Option Is Right for You?",
  rightOptionIntro:
    "Selecting the best lip enhancement depends on how long you want results to last, how natural you want them to feel, and whether you are a first-time client.",
  firstTimeNote:
    "First-time patients: Start with a small quantity of HA filler to try comfort and outcomes — flexibility with natural-looking enhancement.",
  returnNote:
    "Return patients: If you desire longer duration results, we can offer fat grafting or implants for steady volume.",
  rightOptionClosing:
    "Not sure what's ideal for your face? Our expert consultation will lead you step by step to the appropriate decision.",
  procedureHeading: "How Experts Perform Lip Augmentation",
  procedureIntro:
    "Our experts perform each lip enhancement procedure with utmost care, safety, and comfort. The method varies based on whether you opt for surgical or non-surgical treatment.",
  nonSurgicalStepsHeading: "Steps Involved in Non-Surgical Procedure",
  nonSurgicalStepsIntro: "Dermal fillers and Botox lip flips are quick, minimally painful, and typically done within 30 minutes.",
  nonSurgicalSteps: [
    "Consultation starts with facial evaluation and discussion of your objectives",
    "Lips are prepped and topical anesthetic cream is applied",
    "Key points on the lips are marked to create symmetry",
    "Filler or Botox is injected carefully with fine, controlled methods",
    "Gentle massage may be performed to distribute the product evenly",
    "Return to activities immediately — no downtime required",
  ],
  surgicalStepsHeading: "Surgical Procedure Steps",
  surgicalStepsIntro:
    "Surgical lip enhancement provides longer results through lip implants, fat grafting, or lip lifts — all under local anesthesia.",
  surgicalSteps: [
    "Detailed consultation and design of desired outcome and shape",
    "Anesthesia to numb the treated area",
    "Fat grafting: fat harvested, cleaned, and injected into the lips",
    "Lip implants: small internal incision to insert soft silicone implant",
    "Lip lift or reduction: fine cuts to alter size or height of the lips",
    "Area closed with fine sutures; most treatments done in under an hour as outpatient procedures",
  ],
  comfortHeading: "Anesthesia and Comfort Measures",
  comfortPoints: [
    "Numbing cream or local anesthesia as needed",
    "Minuscule needles and light touch to reduce bruising",
    "Clean, relaxed clinic setting with caring staff",
    "Individualized aftercare guidance for quick healing",
  ],
  comfortClosing:
    "Mild swelling or discomfort is normal for a couple of days but settles promptly. We stay in contact after treatment to ensure you are comfortable and satisfied.",
  recoveryHeading: "Recovery and Aftercare Tips",
  recoveryIntro:
    "Lip augmentation has rapid, easy recovery — particularly with non-surgical procedures. Most return to normal activities the same day.",
  afterTreatment: [
    "Mild swelling or bruising for 1–3 days",
    "Slight tenderness or firmness near the lips",
    "No significant downtime for fillers or Botox",
  ],
  aftercareTips: [
    "Use cold compresses lightly in the first 24 hours",
    "Avoid hot beverages, makeup, or pressure on the lips",
    "Sleep with your head raised for one night",
    "Avoid strenuous exercise for 1–2 days",
    "Adhere to all directions given by your physician",
  ],
  recoveryClosing: "We are always there for follow-up or advice in your recovery phase.",
  costHeading: "Lip Augmentation Cost in Delhi",
  costIntro:
    "Lip augmentation in Delhi generally costs between ₹8,000 for Botox lip flip to ₹1,50,000 for permanent lip implant. Final cost depends on treatment type, technique, and your personal goals. We offer transparent pricing and custom plans.",
  costNote:
    "These are estimated ranges. Final cost will be discussed during consultation depending on your individualized treatment plan.",
  costHelp:
    "Having trouble choosing the optimal choice within your budget? Our experts guide you with sincere advice and transparent guidance.",
  permanentHeading: "Permanent Lip Fillers: Are They Safe?",
  permanentIntro:
    "Permanent fillers are made from synthetic materials that do not dissolve over time, unlike hyaluronic acid fillers. While a one-time procedure sounds appealing, permanent fillers come with greater risks.",
  permanentRisks: [
    "Lumps or unevenness that are harder to correct",
    "Infections or reactions that may require surgery",
    "Difficulty reversing results if you are unhappy with the outcome",
  ],
  permanentClosing:
    "Most qualified doctors now recommend temporary, dissolvable fillers like hyaluronic acid for more control, natural results, and flexibility. Consult a trusted medical expert based on your goals and facial structure.",
  injectionsVsFillersHeading: "Lip Injections vs Fillers: What's the Difference?",
  injectionsVsFillersParagraphs: [
    "Lip fillers refer to the actual substance used to enhance your lips — typically hyaluronic acid, a safe, naturally occurring compound that adds volume and definition.",
    "Lip injections describe the method used to deliver the filler — carefully injecting into specific lip areas using a fine needle or cannula.",
    "In simple terms: lip fillers = what goes in your lips; lip injections = how it gets there. Both refer to the same overall procedure.",
  ],
  whyClinicHeading: "Why Choose Care Well Medical Centre for Lip Enhancement?",
  whyClinicIntro:
    "Selecting the correct clinic is putting your face into capable hands. We blend experience, ethical procedure, and artistic attention to detail for results that refine, rather than overwhelm.",
  doctorHeading: "Dr. Sandeep Bhasin's Expertise and Experience",
  doctorBio:
    "Dr. Sandeep Bhasin has over 20 years of experience in cosmetic procedures. He is known for his sharp eye, patient-first approach, and natural-looking results. With thousands of successful enhancements, he remains a trusted choice in Delhi and beyond.",
  personalizedHeading: "Personalized Lip Design Approach",
  personalizedBody:
    "Each person's lips are unique — and so is each result. We examine lip structure, smile shape, and facial proportions before crafting the ideal enhancement plan. Whether subtle balance or more defined contours, we customize every procedure without exaggeration.",
  fdaHeading: "Utilization of FDA-Approved Fillers and Equipment",
  fdaBody:
    "We use only internationally respected products such as Juvederm, Restylane, and Belotero — FDA-approved and clinically safe. Our methods follow strict hygienic protocols. You always know what is applied and why.",
  clinicReputation:
    "Situated in the heart of South Delhi, Care Well Medical Centre is renowned for candid advice, individualized care, and maximum patient satisfaction. Our mission is not to alter your face — but to make you more confident in your own skin.",
  beforeAfterHeading: "Before and After Lip Filler Results",
  beforeAfterIntro:
    "Notice the difference small changes can make. Our lip enhancement treatments emphasize symmetry, volume, and definition — without compromising your natural appearance.",
  beforeAfterExpect: [
    "Defined lip edges and rounded curves",
    "Improved top-to-bottom lip ratio",
    "More voluminous look without appearing fake",
  ],
  beforeAfterClosing: "Each result is customized — no templates, no overfilling.",
  directionsHeading: "How to Get to Care Well Medical Centre for Lip Augmentation in Delhi",
  directionsIntro:
    "We have a centrally located clinic in South Delhi, making it easy for patients from across Delhi NCR.",
  nearbyLandmarks: [
    "Near Don Bosco School",
    "Opposite NRI Apartment Gate",
    "5 minutes from Greater Kailash and Kalkaji",
  ],
  metroStations: [
    "Govindpuri Metro Station (Magenta Line)",
    "Nehru Enclave Metro Station (Magenta Line) — both 10–12 minutes by auto or cab",
  ],
  publicTransport:
    "Easily accessible by DTC bus routes from Nehru Place, Lajpat Nagar, and South Ex. Auto-rickshaws and app-based cabs (Ola/Uber) are readily available.",
  consultationHeading: "Book Your Lip Augmentation Consultation Today!",
  consultationBody:
    "Enhance your lips with the best lip augmentation in Delhi at Care Well Medical Centre. Get expert guidance and customized treatment options to achieve fuller, youthful, and well-defined lips.",
  faqHeading: "FAQs About Lip Augmentation in Delhi",
  disclaimer:
    "Treatment suitability, technique, and results vary between individuals. Lip augmentation carries risks and should only be performed after consultation with a qualified medical professional. This page is for informational purposes and does not replace medical advice.",
} as const;

export { HAIR_LOSS_CLINIC as LIP_AUGMENTATION_CLINIC };

export const LIP_AUGMENTATION_FAQS: { question: string; answer: string }[] = [
  {
    question: "How long does lip fillers last after treatment?",
    answer:
      "Hyaluronic acid lip fillers typically last 6 to 12 months depending on product, metabolism, and lifestyle. Touch-ups every 6 to 12 months help maintain volume and shape over time.",
  },
  {
    question: "What is the difference between lip augmentation and lip fillers?",
    answer:
      "Lip augmentation encompasses all treatments to enhance lips — fillers, fat transfer, implants, or surgery. Lip fillers are a non-surgical option using injectable gels such as Juvederm or Restylane for temporary results.",
  },
  {
    question: "Is lip augmentation painful?",
    answer:
      "The procedure is very tolerable for most patients. Numbing cream or local anesthesia is applied before treatment. You may feel slight pressure or a mild pinch, but the session is usually quick and comfortable.",
  },
  {
    question: "Is lip augmentation permanent?",
    answer:
      "Most lip augmentations are not permanent. HA fillers last several months to a year before the body metabolizes them. Fat grafting and implants can provide longer-lasting results. Repeated treatments maintain desired outcomes.",
  },
  {
    question: "Can lip augmentation provide natural results?",
    answer:
      "Yes. Lip augmentation increases volume and symmetry without lips appearing artificial. At Care Well Medical Centre, we aim for balanced, soft, face-matching results.",
  },
  {
    question: "How long is the recovery period after lip augmentation?",
    answer:
      "Most patients resume normal activities the same day. Swelling or bruising usually lasts 1 to 3 days. Surgical procedures such as lip lift or implants may need a couple of additional recovery days.",
  },
  {
    question: "What should I avoid after lip augmentation?",
    answer:
      "Avoid hot beverages, spicy foods, lip makeup, and strenuous exercise for 48 hours. Do not rub your lips for 24 hours. Wait 24 hours before harsh cleaning tools and avoid straws for the first day. Follow all aftercare instructions.",
  },
  {
    question: "Can I eat and smile after lip fillers?",
    answer:
      "Yes — you can eat and smile normally after treatment. Avoid very hot or messy food on the first day and do not put pressure on your lips for 24–48 hours.",
  },
  {
    question: "What is the cost of lip augmentation in Delhi NCR?",
    answer:
      "Prices range from ₹8,000 for Botox lip flip to ₹1,50,000 for lip implants. Dermal fillers usually cost ₹18,000 to ₹35,000 per session. Exact cost depends on technique and treatment goals.",
  },
  {
    question: "Why choose Care Well Medical Centre for lip augmentation in Delhi?",
    answer:
      "We provide customized treatments by Dr. Sandeep Bhasin with 20+ years of experience. We use FDA-approved products, state-of-the-art methods, and full aftercare in a trusted South Delhi clinic.",
  },
  {
    question: "How long does it take to recover from lip augmentation?",
    answer:
      "Pain usually disappears within 12 to 24 hours. Swelling should reduce within 24 to 48 hours, though it may take up to a week to fully settle. Schedule treatment at least two weeks before any major event.",
  },
  {
    question: "Does a lip lift leave a scar?",
    answer:
      "A scar may occur after cosmetic lip surgery but usually fades within a few weeks. External incisions for upper lip lifts are typically placed under the nose or, in rare cases, just above the lip line.",
  },
  {
    question: "What are lollipop lips?",
    answer:
      "Lollipop lips refer to a full, pouty lip shape with a defined cupid's bow, often achieved through cosmetic procedures like lip injections.",
  },
  {
    question: "Are permanent lip fillers safe?",
    answer:
      "Permanent fillers carry greater risks including lumps, infections, and difficulty reversing results. Most qualified doctors recommend temporary, dissolvable HA fillers for safer, adjustable outcomes.",
  },
];
