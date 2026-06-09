import { COSMETIC_TREATMENTS_PATH } from "@/data/cosmetic-treatments-in-delhi";
import { HAIR_LOSS_CLINIC } from "@/data/hair-loss-treatment-in-delhi";

export const BOTOX_TREATMENT_PATH = "/cosmetic-treatments-in-delhi/botox" as const;

const WP = "https://www.carewellmedicalcentre.com/wp-content/uploads";

export const BOTOX_IMAGES = {
  hero: {
    src: `${WP}/2025/05/botox-treatment-carewell.webp`,
    alt: "Botox before and after result in Delhi — Care Well Medical Centre",
  },
  whatIs: {
    src: `${WP}/2025/05/botox-treatment-carewell.webp`,
    alt: "Botox treatment in Delhi for wrinkle reduction",
  },
  procedure: {
    src: `${WP}/2025/05/botox-treatment-carewell.webp`,
    alt: "Botox forehead injection in Delhi clinic",
  },
  benefits: {
    src: `${WP}/2025/05/anti-aging-treatments-carewell.webp`,
    alt: "Botox treatment benefits infographic in Delhi",
  },
  comparison: {
    src: `${WP}/2025/05/dermal-fillers-carewell.webp`,
    alt: "Facial aesthetic treatments comparison — Botox, fillers, thread lift",
  },
  doctor: {
    src: "/demo/doctor-profile-feature-vertical.png",
    alt: "Dr. Sandeep Bhasin — Botox expert in Delhi",
  },
  beforeAfter: [
    {
      src: `${WP}/2025/05/botox-treatment-carewell.webp`,
      alt: "Botox treatment before and after result in Delhi",
      caption: "Botox wrinkle reduction",
    },
    {
      src: `${WP}/2025/05/botox-treatment-carewell.webp`,
      alt: "Forehead Botox before and after result in Delhi",
      caption: "Forehead lines treatment",
    },
    {
      src: `${WP}/2025/05/anti-aging-treatments-carewell.webp`,
      alt: "Natural Botox before and after result in Delhi",
      caption: "Natural-looking Botox results",
    },
  ],
} as const;

export const BOTOX_TREATMENT_SEO = {
  title: "Botox Treatment in Delhi – Cost, Benefits, Before and After Results | Care Well Medical Centre",
  description:
    "Botox treatment in Delhi at Care Well Medical Centre for forehead lines, crow's feet & frown lines. FDA-certified, doctor-led wrinkle reduction by Dr. Sandeep Bhasin. Book now.",
} as const;

export const BOTOX_PAGE = {
  h1: "Botox Treatment in Delhi for Wrinkle Reduction",
  subtitle: "Non-Surgical Anti-Aging · South Delhi",
  tagline:
    "Safe, FDA-certified Botox injections to soften fine lines and restore a refreshed, natural look — without surgery or downtime.",
  parentLabel: "Cosmetic Treatments in Delhi",
  parentPath: COSMETIC_TREATMENTS_PATH,
  introParagraphs: [
    "Are fine lines, forehead creases, or crow's feet hurting your confidence? Care Well Medical Centre's Botox treatment in Delhi is a safe, effective approach to softening wrinkles. Dr. Sandeep Bhasin, senior cosmetic surgeon, oversees this minimally invasive anti-aging solution so you look refreshed and youthful without surgery or downtime.",
    "Our experts deliver personalized Botox sessions using FDA-certified processes for safe, high-quality treatment — reducing frown lines, sagging brows, and other imperfections with visible, natural results in a few days.",
    "Make the most of our cosmetic treatments in Delhi, including Botox, to look young and refreshed. Schedule your consultation today.",
  ],
  overviewHeading: "Botox Treatment – Quick Overview",
  whatIsHeading: "Botox Treatment: What is it?",
  whatIsParagraphs: [
    "Get rid of fine lines and wrinkles using Botox treatment in Delhi. This non-surgical cosmetic procedure relaxes targeted facial muscles that create forehead lines, frown lines, crow's feet, and other aging signs.",
    "Experienced healthcare professionals use purified botulinum toxin injections to smooth skin and restore a youthful look — a safe, effective, and non-invasive solution for early aging signs.",
  ],
  whatIsCta: "Wondering whether Botox will complement your skin? Book a consultation at Care Well Medical Centre and get expert guidance.",
  howWorksHeading: "How Does Botox Treatment Work?",
  howWorksParagraphs: [
    "At Care Well Medical Centre, experts inject specific facial muscles using fine needles. The procedure completes quickly with virtually no pain and no downtime.",
    "The injections block nerve signals that contract muscles, soothing the treatment area, reducing wrinkles, and preventing deeper line formation.",
  ],
  howWorksCta:
    "Seeking smoother lines without surgery? Book a personalized Botox session with Dr. Sandeep Bhasin.",
  benefitsHeading: "Benefits of Botox Treatment in Delhi",
  benefits: [
    "Softens fine lines and dynamic wrinkles",
    "Enhances facial symmetry and texture",
    "Provides natural-looking results without surgery",
    "Minimal downtime — resume work the same day",
    "Customized for your age, goals, and skin condition",
  ],
  candidateHeading: "Who Should Choose Botox Treatment in Delhi?",
  candidateIntro:
    "Want to lessen dynamic wrinkles without surgery? Botox helps address early signs of aging. Consider Botox if:",
  candidateItems: [
    "You are 25 to 65 years old",
    "You have crow's feet, forehead lines, or frown lines",
    "You are in overall good health with no nerve or muscle conditions",
    "You want temporary results with minimal downtime",
    "You have realistic expectations and prefer a non-surgical option",
  ],
  avoidHeading: "Who Should Not Undergo Botox?",
  avoidItems: [
    "Pregnant or breastfeeding women",
    "People with neuromuscular disorders such as myasthenia gravis",
    "Anyone allergic to botulinum toxin or its ingredients",
    "Anyone with skin infections at the injection site",
  ],
  areasHeading: "Botox Treatment for Wrinkles on Forehead, Frown Lines, and Near Eyes",
  areasIntro:
    "Botox temporarily relaxes muscles that form wrinkles for smoother, more youthful skin — ideal for busy schedules with quick treatment and no downtime.",
  bodyAreas: [
    {
      title: "Forehead wrinkles",
      body: "Botox helps clear horizontal lines visible when raising your eyebrows.",
    },
    {
      title: "Frown lines",
      body: "Lessens vertical lines between the eyebrows from frowning or concentration.",
    },
    {
      title: "Crow's feet",
      body: "Softens fine lines around the eyes that affect your overall expression.",
    },
    {
      title: "Neck and jawline",
      body: "The Nefertiti Lift uses Botox to lift and tighten the neck and jawline for better contour.",
    },
  ],
  areasPoints: [
    "Reduces wrinkles and fine lines without surgery",
    "Weakens wrinkle-causing muscles for smoother, radiant skin",
    "Quick treatment with minimal pain and no downtime",
    "Results last three to six months; repeat treatments maintain effects",
    "Safe, effective Botox at Care Well Medical Centre using advanced techniques",
  ],
  effectiveHeading: "How Effective is Botox in Anti-Aging Treatment?",
  effectiveParagraphs: [
    "Botox is a popular anti-aging treatment that lessens fine lines and wrinkles. Studies show it smooths forehead wrinkles, crow's feet, and frown lines while improving skin texture with minimal downtime.",
    "Recent research demonstrates how efficiently it treats aging-related concerns and improves skin elasticity. Botox remains active for 4 to 5 months and plays an effective role in lowering the severity of deep wrinkles.",
    "At Care Well Medical Centre, our experts use advanced techniques for customized Botox treatment in Delhi to restore your natural vibrance.",
  ],
  injectionHeading: "Botox Injection Method",
  injectionParagraphs: [
    "Botox is injected through a fine needle to target wrinkle-forming muscles. Anesthesia is usually not required — the process is quick and virtually painless, blocking nerve signals to relax muscles and lessen wrinkles.",
  ],
  injectionSteps: [
    "Botox treatment takes only a few minutes",
    "A topical anesthetic cream may be applied before injection",
    "Botox is injected directly into the contracted facial muscle",
    "Most patients resume normal activities immediately after",
    "Results last up to six months; repeat sessions maintain effects",
  ],
  antiWrinkleHeading: "Benefits of Botox as Anti-Wrinkle Treatment for Face",
  antiWrinkleBenefits: [
    {
      title: "Reduces wrinkles",
      body: "Relaxes muscles that form wrinkles for smoother, youthful skin.",
    },
    {
      title: "Quick and painless",
      body: "Fast procedure with no downtime.",
    },
    {
      title: "Customizable",
      body: "Tailored to individual needs for outstanding outcomes.",
    },
    {
      title: "Safe and minimally invasive",
      body: "Minimum side effects with little to no recovery time.",
    },
    {
      title: "Long-lasting effects",
      body: "Results sustain about three to six months; repeat sessions maintain effects.",
    },
    {
      title: "Enhances skin quality",
      body: "Improves skin texture along with reducing wrinkles.",
    },
  ],
  comparisonHeading: "Botox vs Fillers vs Threads: Let's Read the Differences",
  comparisonIntro:
    "Botox, dermal fillers, and thread lifts are non-surgical anti-aging treatments that work differently. Compare purpose, results, and longevity before selecting the right solution.",
  comparisonTips: [
    "Choose Botox for expression lines and wrinkle prevention",
    "Opt for Fillers if you need volume restoration or contouring",
    "Try Threads for a lifting effect without surgery",
  ],
  comparisonProTip:
    "Many patients combine Botox with PRP therapy or fillers for enhanced results. Your treatment plan will be tailored after consultation with Dr. Sandeep Bhasin.",
  medicalUsesHeading: "Medical Uses of Botox Beyond Wrinkle Reduction",
  medicalUsesIntro:
    "While Botox is best known for cosmetic use, Care Well Medical Centre also addresses several medical concerns:",
  medicalUses: [
    {
      title: "Botox for Migraine Relief",
      body: "Helps treat chronic migraine by reducing pain signals and headache frequency.",
    },
    {
      title: "Botox for Excessive Sweating (Hyperhidrosis)",
      body: "FDA-approved treatment that temporarily blocks nerves causing underarm sweat production.",
    },
    {
      title: "Botox for Jaw Clenching (Masseter Botox)",
      body: "Relieves teeth grinding, jaw tension, and can slim a square jawline.",
    },
  ],
  risksHeading: "What are the Risks Involved in Botox Treatment?",
  risksIntro:
    "Botox is safe and minimally invasive when performed by an experienced physician. Common risks include:",
  risks: [
    "Bruising and swelling at the injection site (usually resolves in a few days)",
    "Mild headaches for a short period",
    "Rare drooping of eyelids or eyebrows (typically resolves within weeks)",
    "Allergic reactions in sensitive individuals",
    "Rare difficulty swallowing or breathing — contact your doctor immediately if this occurs",
  ],
  overdoseHeading: "Precautions To Overcome Overdose Problems",
  overdoseIntro:
    "Botox overdose is rare but can cause muscle weakness or breathing difficulties. Prevent issues by:",
  overdosePrecautions: [
    "Select a qualified practitioner with a proven Botox injection record",
    "Disclose full medical history and medications to your doctor",
    "Follow exact dosage and injection guidelines",
    "Monitor for muscle weakness, vision problems, or breathing issues",
  ],
  avoidInjectionHeading: "Patients Who Should Avoid Botox Injection",
  avoidInjectionItems: [
    "Pregnant or breastfeeding women",
    "People with Lambert-Eaton syndrome, myasthenia gravis, or ALS",
    "Patients allergic to botulinum toxin or human albumin ingredients",
    "Patients on antibiotics or blood thinners (consult your doctor first)",
    "Patients with Bell's palsy or other facial muscle disorders",
  ],
  beforeHeading: "Precautions Before Botox Injection",
  beforePrecautions: [
    "Consult a certified practitioner and share medical history and expectations",
    "Avoid blood thinners (aspirin, ibuprofen, naproxen) for at least two weeks",
    "Skip alcohol and tobacco 24 hours before treatment",
    "Pause Retin-A, Vitamin C, or glycolic acid two days before treatment",
    "Limit sun exposure and stay hydrated before your session",
  ],
  whyChooseHeading: "Why Should You Choose Care Well Medical Centre for Botox Treatment?",
  whyChooseParagraphs: [
    "Our expert team has delivered Botox injections in Delhi for many years using advanced techniques and equipment tailored to your unique needs.",
    "We use FDA-certified products and high-end healthcare technologies for safe, impactful treatment with natural-looking results.",
  ],
  costHeading: "Figuring Out the Botox Treatment Cost in Delhi",
  costIntro:
    "Botox treatment cost depends on treatment areas and units used. Care Well Medical Centre offers competitive, transparent pricing for quality anti-aging care.",
  resultsHeading: "Botox Treatment Before and After Results – A Short Analysis",
  resultsIntro:
    "We deliver remarkable before and after results with personalized care for natural-looking, smooth, and balanced facial rejuvenation.",
  doctorHeading: "About Dr. Sandeep Bhasin – Your Botox Expert in Delhi",
  doctorBio:
    "Dr. Sandeep Bhasin is a renowned cosmetic and anti-aging expert with over 20 years of experience in aesthetic medicine. He specializes in non-surgical treatments like Botox, fillers, thread lifts, and PRP therapy. As founder of Care Well Medical Centre, he has helped thousands achieve natural, youthful results using FDA-approved technologies.",
  doctorCredentials: [
    "Member – Indian Association of Cosmetic Surgeons",
    "Certified in Aesthetic Medicine by Aligarh Muslim University (AMU)",
    "Recognized for excellence in patient care & safety",
  ],
  locationHeading: "Visit Care Well Medical Centre – South Delhi Location",
  locationIntro:
    "Looking to visit us for your Botox consultation? We're located in South Delhi with easy access from all major areas.",
  contactHeading: "Contact Us",
  contactBody:
    "Seeking Botox treatment in Delhi near me? Contact Care Well Medical Centre today for a consultation. Our team will guide you through treatment options so you can make an informed decision.",
  faqHeading: "Botox Treatment FAQs",
  disclaimer:
    "Treatment suitability and results vary between individuals. A consultation with Dr. Sandeep Bhasin is recommended before beginning Botox treatment.",
  treatmentDropdownLabel: "Botox Treatment",
} as const;

export { HAIR_LOSS_CLINIC as BOTOX_CLINIC };

export const BOTOX_OVERVIEW_ROWS = [
  { feature: "Procedure Time", details: "15 to 30 minutes" },
  { feature: "Administered By", details: "Dr. Sandeep Bhasin & trained specialists" },
  { feature: "Type of Treatment", details: "Non-surgical, injectable" },
  { feature: "Downtime", details: "None to 1 day" },
  { feature: "Results Appear In", details: "3 to 5 days" },
  { feature: "Results Last For", details: "3 to 6 months" },
  { feature: "Ideal For", details: "Wrinkles, fine lines, brow lift, jaw slimming" },
  { feature: "Average Cost in Delhi", details: "₹6,000 to ₹30,000" },
] as const;

export const BOTOX_COMPARISON_ROWS = [
  {
    feature: "Best For",
    botox: "Dynamic wrinkles (facial movement)",
    fillers: "Volume loss, deep folds, under-eye hollows",
    threads: "Sagging skin, jawline definition",
  },
  {
    feature: "How It Works",
    botox: "Relaxes muscles to smooth lines",
    fillers: "Adds volume beneath the skin",
    threads: "Lifts skin using dissolvable threads",
  },
  {
    feature: "Common Areas",
    botox: "Forehead, frown lines, crow's feet",
    fillers: "Cheeks, lips, smile lines",
    threads: "Jawline, cheeks, brows, neck",
  },
  {
    feature: "Results Seen In",
    botox: "3–7 days",
    fillers: "Immediate",
    threads: "Immediate (full results in 1–2 weeks)",
  },
  {
    feature: "Duration",
    botox: "3–6 months",
    fillers: "6–12 months",
    threads: "12–18 months",
  },
  {
    feature: "Downtime",
    botox: "None",
    fillers: "Minimal",
    threads: "1–3 days",
  },
] as const;

export const BOTOX_COST_ROWS = [
  { area: "Forehead Lines", range: "₹8,000 – ₹12,000", href: `${BOTOX_TREATMENT_PATH}/forehead-lines` },
  { area: "Crow's Feet", range: "₹6,000 – ₹8,000", href: "" },
  { area: "Frown Lines", range: "₹6,000 – ₹8,000", href: "" },
  { area: "Bunny Lines", range: "₹3,000 – ₹5,000", href: "" },
  { area: "Jawline Slimming", range: "₹20,000 – ₹30,000", href: `${BOTOX_TREATMENT_PATH}/cheek-and-jawline-slimming` },
] as const;

export const BOTOX_FAQS: { question: string; answer: string }[] = [
  {
    question: "What does Botox treat?",
    answer:
      "Botox treats facial wrinkles such as forehead lines, frown lines, and crow's feet. It can also help with jaw clenching, excessive underarm sweating, and chronic migraines.",
  },
  {
    question: "How long do Botox results last?",
    answer:
      "Results typically last three to four months, though duration varies with metabolism and muscle activity. Some patients see longer-lasting effects; others may need touch-ups sooner.",
  },
  {
    question: "How much do you need to pay for Botox in Delhi NCR?",
    answer:
      "Botox in Delhi NCR generally costs ₹7,000 to ₹30,000 per session depending on units required and areas treated.",
  },
  {
    question: "Is Botox good for your face?",
    answer:
      "Yes. When administered by a skilled doctor, Botox softens wrinkles, improves features, and keeps your face looking natural and refreshed.",
  },
  {
    question: "Is Botox painful?",
    answer:
      "Most people feel only a quick pinch. A numbing cream can be applied beforehand for added comfort.",
  },
  {
    question: "Can Botox look natural?",
    answer:
      "Absolutely. At Care Well Medical Centre, we focus on subtle, natural results that preserve your expressions.",
  },
  {
    question: "Does Botox come with side effects?",
    answer:
      "Mild swelling, slight headaches, or bruising may occur and usually resolve within a few days when treatment is performed by trained professionals.",
  },
  {
    question: "Can I have a puffy or frozen face with Botox?",
    answer:
      "Only if overdone or poorly injected. Precise, safe administration avoids a frozen or puffy appearance.",
  },
  {
    question: "Is it safe to get Botox regularly?",
    answer:
      "Yes. Long-term Botox use is considered safe under medical guidance with proper intervals between treatments.",
  },
  {
    question: "Is 40 too late to start Botox?",
    answer:
      "Not at all. Patients aged 40 to 50 can start Botox to smooth deeper lines and look refreshed.",
  },
  {
    question: "Is it safe to touch or wash my face after Botox?",
    answer:
      "Wait at least 12 hours before touching your face and another 12 hours before washing or applying skincare products.",
  },
  {
    question: "Can I sleep after Botox?",
    answer:
      "Yes, but avoid lying on your face for at least 4 hours post-treatment to prevent uneven spread.",
  },
  {
    question: "Why should you approach Care Well Medical Centre for Botox Treatment in Delhi?",
    answer:
      "Personalized care, natural-looking results, and expert treatment by Dr. Sandeep Bhasin — with safety, trust, and quality at the forefront.",
  },
];
