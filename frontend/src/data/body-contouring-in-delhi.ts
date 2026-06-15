import { HAIR_LOSS_CLINIC } from "@/data/hair-loss-treatment-in-delhi";

export const BODY_CONTOURING_PATH = "/body-contouring-in-delhi" as const;

const WP = "https://www.carewellmedicalcentre.com/wp-content/uploads";
const PLASTIC = "/plastic-surgery-in-delhi";

function toLocalPath(href: string): string {
  try {
    const pathname = new URL(href).pathname;
    return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  } catch {
    return href;
  }
}

export const BODY_CONTOURING_IMAGES = {
  hero: {
    src: `${WP}/2025/04/liposuction-surgery-carewell-min.jpg`,
    alt: "Before and after body contouring results – abdomen and waist reshaping at Care Well Medical Centre, Delhi",
  },
  whyChoose: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517799/carewell-media/site/demo/about-us-consultation.jpg",
    alt: "Advanced body sculpting technologies and patient care at Care Well Medical Centre",
  },
  journey: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517816/carewell-media/site/demo/wellness-card.jpg",
    alt: "Patient journey to body contouring at Care Well Medical Centre",
  },
  coolshape: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg",
    alt: "CoolShape Cryolipolysis fat freezing technology at Care Well Medical Centre",
  },
  doctor: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517806/carewell-media/site/demo/doctor-profile-feature-vertical.png",
    alt: "Dr. Sandeep Bhasin — body contouring surgeon in Delhi",
  },
  videoPoster: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517807/carewell-media/site/demo/doctor-profile-feature.jpg",
    alt: "How body contouring works at Care Well Medical Centre",
  },
  beforeAfter: [
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517894/carewell-media/wp/liposuction-surgery-carewell-min.jpg`,
      alt: "Body Contouring in Delhi – Before and After Results Comparison",
      caption: "Abdomen contouring",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517893/carewell-media/wp/tummy-tuck-surgery-carewell-min.jpg`,
      alt: "Before and After Results of Body Contouring in Delhi",
      caption: "Tummy tuck results",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517883/carewell-media/wp/mommy-makeover-min.jpg`,
      alt: "Body Contouring in Delhi – See the Before & After Results",
      caption: "Post-pregnancy reshaping",
    },
  ],
} as const;

export const BODY_CONTOURING_SEO = {
  title: "Body Contouring in Delhi for Fat Reduction & Sculpting | Care Well Medical Centre",
  description:
    "Body contouring in Delhi at Care Well Medical Centre. CoolSculpting, liposuction, tummy tuck & RF skin tightening by Dr. Sandeep Bhasin. Surgical & non-surgical options. Book now.",
} as const;

export type BodyContouringTreatment = {
  title: string;
  description: string;
  bestFor: string;
  image: string;
  imageAlt: string;
  href?: string;
  linkLabel?: string;
};

export const BODY_CONTOURING_NON_SURGICAL: BodyContouringTreatment[] = [
  {
    title: "CoolSculpting (Fat Freezing)",
    description:
      "CoolSculpting in Delhi freezes fat cells in the abdomen, arms, back, and thighs — no surgery required.",
    bestFor: "Destroying stubborn fat that doesn't vanish with diet or exercise",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg",
    imageAlt: "CoolSculpting fat freezing treatment in Delhi",
    href: `${BODY_CONTOURING_PATH}/cryolipolysis`,
    linkLabel: "Cryolipolysis in Delhi",
  },
  {
    title: "Ultrasound Cavitation",
    description:
      "Sound waves destroy fat cells that your body then flushes out naturally — a painless approach to reshaping.",
    bestFor: "Individuals seeking no pain while losing fat and reshaping their body",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517816/carewell-media/site/demo/wellness-card.jpg",
    imageAlt: "Ultrasound cavitation body contouring in Delhi",
  },
  {
    title: "Radiofrequency (RF) Skin Tightening",
    description:
      "Boosts collagen so skin becomes firmer with reduced sagging and cellulite.",
    bestFor: "Loose skin on the face, abdomen, or arms",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg",
    imageAlt: "RF skin tightening for body contouring in Delhi",
  },
  {
    title: "HIFU (High-Intensity Focused Ultrasound)",
    description:
      "Focused ultrasound penetrates deep fat layers to tighten skin and improve contour — ideal for abdominal toning and jawline definition.",
    bestFor: "Abdominal toning, jawline definition, and non-surgical facelifts",
    image: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517875/carewell-media/wp/hifu-Treatment-carewell.webp`,
    imageAlt: "HIFU body contouring treatment in Delhi",
    href: "/cosmetic-treatments-in-delhi/hifu",
    linkLabel: "HIFU Treatment in Delhi",
  },
  {
    title: "Lipotropic Injections",
    description:
      "Amino acids and vitamins support metabolism and complement disciplined diet and exercise for fat loss management.",
    bestFor: "People adopting a disciplined diet and exercise regime for fat loss",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517816/carewell-media/site/demo/wellness-card.jpg",
    imageAlt: "Lipotropic injections for weight management in Delhi",
  },
];

export const BODY_CONTOURING_SURGICAL: BodyContouringTreatment[] = [
  {
    title: "Liposuction",
    description:
      "Liposuction in Delhi uses suction to remove stubborn fat from the abdomen, thighs, arms, and flanks.",
    bestFor: "People near ideal body weight with stubborn fat bulges",
    image: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517894/carewell-media/wp/liposuction-surgery-carewell-min.jpg`,
    imageAlt: "Liposuction surgery for body contouring in Delhi",
    href: toLocalPath("https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/liposuction/"),
    linkLabel: "Liposuction in Delhi",
  },
  {
    title: "Tummy Tuck (Abdominoplasty)",
    description:
      "Tightens abdominal muscles so your stomach becomes firmer and flatter.",
    bestFor: "Women recovering pre-pregnancy shape or individuals with sagging skin after weight loss",
    image: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517893/carewell-media/wp/tummy-tuck-surgery-carewell-min.jpg`,
    imageAlt: "Tummy tuck surgery in Delhi",
    href: toLocalPath("https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/tummy-tuck/"),
    linkLabel: "Tummy Tuck Surgery in Delhi",
  },
  {
    title: "Brazilian Butt Lift (BBL)",
    description:
      "Enhances buttocks using your body's own fat for a fuller, natural-looking shape — without implants.",
    bestFor: "Those who want a shaped and lifted butt without implants",
    image: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517885/carewell-media/wp/brazilian-butt-lift-bbl-illustration-carewell-min.jpg`,
    imageAlt: "Brazilian butt lift in Delhi",
    href: toLocalPath("https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/bbl/"),
    linkLabel: "Brazilian Butt Lift in Delhi",
  },
  {
    title: "Arm Lift & Thigh Lift",
    description: "Surgical tightening and reshaping of arm and thigh skin.",
    bestFor: "Sagging skin from massive weight reduction or aging",
    image: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517894/carewell-media/wp/liposuction-surgery-carewell-min.jpg`,
    imageAlt: "Arm and thigh lift body contouring in Delhi",
    href: PLASTIC,
    linkLabel: "Plastic surgery options",
  },
  {
    title: "Mommy Makeover",
    description:
      "Combines tummy tuck, breast lift, and liposuction to restore post-pregnancy body shape.",
    bestFor: "Mothers seeking to recover body shape and confidence",
    image: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517883/carewell-media/wp/mommy-makeover-min.jpg`,
    imageAlt: "Mommy makeover in Delhi",
    href: toLocalPath("https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/mommy-makeover/"),
    linkLabel: "Mommy Makeover in Delhi",
  },
];

export const BODY_CONTOURING_COST_ROWS = [
  { treatment: "Non-Surgical (CoolSculpting, RF, HIFU)", range: "₹25,000 – ₹80,000 per session" },
  { treatment: "Liposuction (Surgical Fat Removal)", range: "₹70,000 – ₹2,50,000" },
  { treatment: "Tummy Tuck (Abdominoplasty)", range: "₹1,50,000 – ₹3,50,000" },
  { treatment: "Laser-Based Fat Reduction", range: "₹30,000 – ₹90,000 per session" },
] as const;

export const BODY_CONTOURING_JOURNEY = [
  {
    step: "1. Consult",
    title: "Consult",
    body: "Meet Dr. Sandeep Bhasin for a detailed consultation. He examines your body, discusses concerns, and understands your goals before recommending the right procedure.",
  },
  {
    step: "2. Plan",
    title: "Plan",
    body: "We create a fully personalized treatment plan — covering areas to treat, number of sessions, and expected outcomes.",
  },
  {
    step: "3. Treat",
    title: "Treat",
    body: "Undergo the procedure in a safe, hygienic environment — whether surgical liposuction or non-surgical RF or CoolSculpting.",
  },
  {
    step: "4. Care",
    title: "Care",
    body: "We guide you through post-treatment care — from compression garments to managing temporary swelling or discomfort.",
  },
  {
    step: "5. Follow-up",
    title: "Follow-up",
    body: "We stay in touch, monitor progress, and schedule follow-ups to ensure long-term results and satisfaction.",
  },
] as const;

export const BODY_CONTOURING_PAGE = {
  h1: "Body Contouring in Delhi for Fat Reduction & Sculpting",
  subtitle: "Surgical & Non-Surgical Body Sculpting · South Delhi",
  tagline:
    "Transform your body with advanced body contouring — eliminate stubborn fat, tighten loose skin, and achieve a smooth, balanced silhouette.",
  introHeading: "Transform Your Body with Advanced Body Contouring Treatments",
  introParagraphs: [
    "Body contouring in Delhi helps eliminate stubborn fat and tighten loose skin for a smooth, balanced silhouette. At Care Well Medical Centre, Dr. Sandeep Bhasin designs surgical and non-surgical treatment plans that suit your body and goals.",
  ],
  whatIsHeading: "What is Body Contouring?",
  whatIsBody:
    "Body contouring procedures break down stubborn fat, tighten sagging skin, and reshape your body — with or without surgery. At Care Well Medical Centre in Delhi, we use clinically proven technologies to sculpt your body safely and naturally. Whether you want non-surgical fat reduction or complete body reshaping, our Dr. Sandeep Bhasin-led team customizes every treatment.",
  benefitsHeading: "Benefits of Body Contouring Treatments",
  benefits: [
    "Removes stubborn fat from targeted areas",
    "Firms skin and improves elasticity",
    "Improved body shape and proportion",
    "Boosts confidence with natural-looking results",
    "Long-lasting outcomes when combined with a healthy lifestyle",
  ],
  whyChooseHeading: "Why Choose Care Well Medical Centre for Body Contouring in Delhi",
  whyChooseIntro:
    "Expect an ideal physique from Care Well Medical Centre's safe and proven body contouring techniques. Our team designs custom treatment plans based on your goals, lifestyle, and body type.",
  surgicalOptionsHeading: "Surgical Procedures",
  surgicalOptions: [
    "Liposuction",
    "Gynecomastia Surgery — reduces enlarged male breasts and restores masculine chest contour",
    "Tummy Tuck",
    "Body Lift",
  ],
  nonSurgicalOptionsHeading: "Non-Surgical Procedures",
  nonSurgicalOptions: ["Cryolipolysis (Fat Freezing)", "Radiofrequency (RF) Skin Tightening"],
  optionsNote:
    "We also offer combination packages for complete body transformation and post-weight loss reshaping.",
  pricingNote:
    "Competitive pricing for all body contouring treatments in Delhi — without compromising safety or quality. Flexible EMI options and customized packages available on request.",
  typesHeading: "Types of Body Contouring Treatments We Offer",
  typesIntro:
    "Non-surgical procedures need no incisions or recovery time — ideal for mild fat deposits or skin laxity. Surgical procedures deliver dramatic, long-lasting results for significant weight loss or faster transformation.",
  nonSurgicalSectionHeading: "Non-Surgical Body Contouring Treatments",
  surgicalSectionHeading: "Surgical Body Contouring Treatments",
  surgicalSectionIntro:
    "These surgical procedures ensure fat removal, tightened muscles, and a reshaped body — dramatic results that last long.",
  coolshapeHeading: "See the Technology We Use: CoolShape Cryolipolysis",
  coolshapeBody:
    "We use the latest 7th Gen CoolShape Cryolipolysis machine to deliver precise, comfortable, and effective fat reduction results.",
  journeyHeading: "What to Expect During Your Body Contouring Journey",
  journeyIntro:
    "Starting a body transformation can feel overwhelming. We keep everything clear, supportive, and step-by-step.",
  safetyHeading: "Safety & Side Effects – What You Should Know Before Starting",
  safetyIntro:
    "Your safety is always our first priority — whether you choose non-surgical body sculpting or a full surgical procedure like liposuction or tummy tuck.",
  preTreatmentHeading: "Pre-Treatment Guidelines",
  preTreatment: [
    "Full consultation with Dr. Sandeep Bhasin to assess medical history and suitability",
    "Basic tests (blood work, etc.) may be advised for surgical procedures",
    "Stop smoking, certain supplements, or blood thinners before surgery if advised",
    "Stay hydrated and follow fasting instructions before anesthesia if needed",
  ],
  nonSurgicalSideEffectsHeading: "Non-Surgical — Possible Side Effects",
  nonSurgicalSideEffects: [
    "Mild redness, tingling, or temporary swelling",
    "Usually resolves within 1–3 days",
  ],
  surgicalSideEffectsHeading: "Surgical — Possible Side Effects",
  surgicalSideEffects: [
    "Temporary swelling, bruising, or tightness",
    "Soreness or discomfort for a few days",
    "Close post-surgery monitoring to ensure proper healing",
  ],
  sideEffectsNote:
    "We provide clear instructions and medication (if needed) to make your recovery smooth and comfortable.",
  postCareHeading: "Post-Treatment Care & Recovery",
  postCare: [
    "Wear compression garments (if advised) to reduce swelling and support results",
    "Avoid intense exercise for a few days (or as directed)",
    "Keep the treatment area clean and protected",
    "Attend follow-ups to check healing and guide long-term care",
  ],
  costHeading: "How Much Does Body Contouring Cost in Delhi?",
  costIntro:
    "Body contouring in Delhi usually costs between ₹25,000 and ₹3,50,000 depending on treatment — CoolSculpting, liposuction, or tummy tuck. Price varies by body goals, treatment area, and sessions needed.",
  costClosing:
    "At Care Well Medical Centre, we understand what you need and suggest the right approach for your body and budget. EMI options and personalized packages are available.",
  costFactorsHeading: "Why Do Costs Vary?",
  costFactors: [
    "Body type and technique used",
    "Number of sessions required",
    "Larger areas like tummy or thighs may cost more",
    "EMI options and personalized packages available",
  ],
  doctorHeading: "About Dr. Sandeep Bhasin",
  doctorBio:
    "Dr. Sandeep Bhasin is a senior cosmetic surgeon with over 20 years of experience in body contouring and aesthetic surgery. He offers personalized fat reduction and body reshaping with a strong focus on safety and natural results.",
  qualifications: [
    "MS in General Surgery (Aligarh Muslim University)",
    "Advanced cosmetic surgery training in Thailand and South Korea",
    "Certified in non-surgical fat reduction and skin tightening techniques",
  ],
  certifications: [
    "Member, Indian Association of Aesthetic Plastic Surgeons (IAAPS)",
    "Member, Association of Surgeons of India (ASI)",
    "Recognized for innovations in scarless and holistic cosmetic treatments",
  ],
  candidateHeading: "Who is an Ideal Candidate for Body Contouring?",
  candidateItems: [
    "Stubborn fat pockets remain despite diet or exercise",
    "Sagging or loose skin from weight loss, aging, or pregnancy",
    "Stable weight and desire for body shape refinement",
    "Good overall health with realistic expectations",
    "Seeking a more proportionate and sculpted physique",
  ],
  avoidHeading: "Who Should Avoid Body Contouring?",
  avoidIntro:
    "Body contouring is not advised if you face specific medical or lifestyle conditions that increase risks.",
  avoidItems: [
    "Pregnant or recently postpartum",
    "Uncontrolled diabetes, heart conditions, or high blood pressure",
    "Planning significant weight loss or bariatric surgery soon",
    "Unrealistic expectations or seeking rapid weight loss through cosmetic means only",
    "Allergy to anesthesia (for surgical procedures)",
    "Open wounds or active skin infections near the treatment area",
    "Keloid scarring tendency or poor wound healing (for surgical options)",
  ],
  avoidNote:
    "A thorough consultation with Dr. Sandeep Bhasin will help determine whether treatment suits you.",
  beforeAfterHeading: "Body Contouring Before & After: Real Patient Transformations",
  beforeAfterIntro:
    "See how body contouring reshapes the abdomen, waist, and overall silhouette — safely and effectively at Care Well Medical Centre.",
  readyHeading: "Ready for a New You? Let's Talk",
  readyIntro:
    "Not sure which treatment syncs with your body type or goals? Dr. Sandeep Bhasin will recommend the right surgical or non-surgical option for you.",
  readyPerks: [
    "Flexible slots available",
    "Confidential consultation",
    "EMI options offered",
  ],
  faqHeading: "FAQs for Body Contouring in Delhi",
  disclaimer:
    "Treatment suitability, technique, and results vary between individuals. Body contouring carries risks and should only be performed after consultation with a qualified medical professional. This page is for informational purposes and does not replace medical advice.",
  treatmentDropdownLabel: "Body Contouring",
} as const;

export { HAIR_LOSS_CLINIC as BODY_CONTOURING_CLINIC };

export const BODY_CONTOURING_FAQS: { question: string; answer: string }[] = [
  {
    question: "How long does it take to see results from body contouring?",
    answer:
      "Non-surgical treatments such as RF therapy or CoolSculpting show results within 4–6 weeks. Surgical procedures like tummy tuck or liposuction may deliver immediate improvement, with final outcomes over several months as swelling reduces.",
  },
  {
    question: "Is body contouring permanent?",
    answer:
      "Surgical body contouring such as tummy tuck and liposuction lasts long when you maintain a stable weight and healthy lifestyle. Non-surgical treatments may need maintenance sessions over time.",
  },
  {
    question: "Is there any downtime after body contouring treatments?",
    answer:
      "Non-surgical procedures have virtually no downtime — resume normal activities the same day. Surgical procedures may need one to two weeks recovery depending on the procedure and your healing.",
  },
  {
    question: "How do I choose between non-surgical and surgical body contouring?",
    answer:
      "Non-surgical treatments suit mild fat deposits and good skin elasticity. Significant fat removal or loose skin may need surgical options like liposuction or tummy tuck. Dr. Sandeep Bhasin helps you choose during consultation.",
  },
  {
    question: "What are the side effects of body contouring?",
    answer:
      "Non-surgical options may cause mild swelling, redness, or numbness resolving within days. Surgical procedures may involve swelling, bruising, and temporary discomfort during recovery.",
  },
  {
    question: "How many sessions are needed for non-surgical fat reduction?",
    answer:
      "Most non-surgical treatments show results in 2–4 sessions. The exact number depends on target area, body response, and treatment type.",
  },
  {
    question: "Does fat come back after body sculpting?",
    answer:
      "Fat cells destroyed via liposuction or CoolSculpting do not return. Remaining fat cells can expand with poor diet or lifestyle — maintain results with balanced habits.",
  },
  {
    question: "Is body contouring better than liposuction?",
    answer:
      "Liposuction is an effective surgical form of body contouring for stubborn fat. Non-surgical options are less invasive but deliver results over multiple sessions. Choose based on your body, goals, and consultation advice.",
  },
];
