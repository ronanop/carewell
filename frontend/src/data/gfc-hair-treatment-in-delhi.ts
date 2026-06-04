import { HAIR_LOSS_CLINIC, HAIR_LOSS_TREATMENTS_PATH } from "@/data/hair-loss-treatment-in-delhi";

export const GFC_TREATMENT_PATH = "/hair-loss-treatment-in-delhi/growth-factor-concentrate" as const;

/** Local assets in frontend/public/gfc/ */
export const GFC_IMAGES = {
  hero: {
    src: "/gfc/GFC-Hair-Treatment-2.jpg.webp",
    alt: "GFC hair treatment in Delhi at Care Well Medical Centre",
  },
  benefits: {
    src: "/gfc/GFC-Hair-Treatment-benefits-for-hair.jpg.webp",
    alt: "Benefits of GFC hair treatment for hair loss and regrowth",
  },
  procedure: {
    src: "/gfc/GFC-Treatment-procedure-for-hair-loss.jpg.webp",
    alt: "GFC treatment procedure for hair loss — step-by-step",
  },
} as const;

export const GFC_TREATMENT_SEO = {
  title:
    "Growth Factor Concentrate (GFC) for Hair Loss in Delhi - Cost & Benefits | Care Well",
  description:
    "Reverse hair loss with Growth Factor Concentrate therapy in Delhi. Learn about cost, effectiveness & before-after results at Care Well Medical Centre, CR Park.",
} as const;

export const GFC_PAGE = {
  h1: "Growth Factor Concentrate (GFC) Therapy in Delhi – Advanced Hair Regrowth Treatment",
  subtitle: "Advanced Hair Regrowth Treatment",
  tagline:
    "Experience the magic of Growth Factor Concentrate therapy — your path to hair perfection with natural, non-surgical regrowth.",
  introHeading: "Experience the Magic of Growth Factor Concentrate Therapy – Your Path to Hair Perfection!",
  introParagraphs: [
    "Are you tired of dealing with hair loss and seeking a solution that not only rejuvenates your hair but also restores its natural beauty?",
    "If so, GFC (Growth Factor Concentrate Therapy) Hair Treatment might be the answer you've been searching for.",
    "At Care Well Medical Centre in Delhi, we offer a comprehensive GFC hair treatment to address hair loss concerns and help you regain your confidence.",
    "Are you seeking top-notch GFC Hair Treatment in Delhi? Look no further! Our experts offer the best GFC Hair Treatment in Delhi to rejuvenate your locks.",
    "Visit us today for a hair transformation.",
  ],
  whatIsHeading: "What is GFC (Growth Factor Concentrate Therapy) Treatment?",
  whatIsBody:
    "GFC stands for Growth Factor Concentrate, and it's a cutting-edge therapy that utilizes your body's natural growth factors to stimulate hair regrowth. This treatment is a non-surgical, minimally invasive option for individuals dealing with hair loss.",
  whatIsTraits: ["Safe", "Effective", "Minimally invasive", "Natural"],
  whatIsNote:
    "It has gained popularity as a natural way to revive your lustrous locks. Growth factors help stimulate hair, but for significant coverage, patients explore Complete Hair Restoration Delhi.",
  benefitsHeading: "Benefits of GFC Treatment for Hair Loss",
  benefitsIntro: [
    "Hair loss can be emotionally distressing, affecting self-esteem and overall quality of life.",
    "GFC Hair Treatment is specifically designed to combat hair loss and promote hair regrowth.",
    "This revolutionary treatment harnesses the power of your body's own growth factors to stimulate hair follicles, resulting in thicker, healthier hair.",
  ],
  procedureHeading: "GFC Treatment Procedure for Hair Loss",
  procedureIntro: "The GFC Hair Treatment procedure involves several steps:",
  conditionsHeading: "Conditions Treated with GFC Hair Therapy",
  conditionsIntro: "GFC treatment can be tailored to address various types of hair loss, including:",
  sideEffectsHeading: "Potential Side Effects & Precautions for GFC Hair Loss Treatment",
  sideEffectsIntro:
    "While GFC Hair Treatment is generally safe and well tolerated, there are a few potential side effects and precautions to consider.",
  costHeading: "GFC Hair Treatment Cost in Delhi",
  costIntro:
    "The cost of GFC Hair Treatment in Delhi can vary depending on the clinic, extent of hair loss, number of sessions required, and individual treatment goals.",
  costNoteHeading: "Important Note",
  costNoteItems: [
    "Personalized assessment",
    "Accurate treatment plan",
    "Customized cost estimate",
  ],
  costNoteBody:
    "It is essential to consult with Care Well Medical Centre for a personalized assessment and accurate cost estimate. Investing in your hair's health and appearance can be a valuable step toward regaining confidence and achieving natural-looking hair.",
  whyChooseHeading: "Why Choose Care Well Medical Centre for GFC Hair Treatment in Delhi?",
  whyChooseIntro:
    "Choosing the right clinic for GFC Hair Treatment is crucial for achieving successful outcomes.",
  preferHeading: "Why Patients Prefer Our GFC Hair Restoration Program",
  journeyHeading: "Begin Your Hair Restoration Journey Today",
  journeyBody:
    "Unlock natural and gorgeous hair with GFC Hair Loss Treatment in Delhi at Care Well Medical Centre. Say goodbye to hair loss and hello to a new, confident you. Contact us today to schedule your consultation and take the first step toward revitalizing your locks.",
  appointmentHeading: "Book Your GFC Hair Consultation Today",
  treatmentDropdownLabel: "GFC Hair Treatment",
  parentLabel: "Hair Loss Treatment in Delhi",
  parentPath: HAIR_LOSS_TREATMENTS_PATH,
} as const;

export { HAIR_LOSS_CLINIC as GFC_CLINIC };

export const GFC_BENEFIT_ROWS = [
  {
    benefit: "Natural Hair Regrowth",
    description:
      "Stimulates hair regrowth naturally without surgery or medications",
  },
  {
    benefit: "Minimal Discomfort",
    description: "Minimally invasive procedure with little to no discomfort",
  },
  {
    benefit: "Quick Recovery",
    description: "Resume daily activities immediately after treatment",
  },
  {
    benefit: "Long-Lasting Results",
    description: "Provides lasting improvement with reduced maintenance",
  },
  {
    benefit: "Improved Hair Quality",
    description: "Makes existing hair thicker, stronger, and healthier",
  },
] as const;

export const GFC_PROCEDURE_STEPS = [
  {
    title: "Step 1: Consultation",
    description:
      "Your journey begins with a consultation at Care Well Medical Centre. Our expert medical team will assess your condition, discuss your goals, and create a personalized treatment plan.",
    bullets: ["Assess your condition", "Discuss your goals", "Create a personalized treatment plan"],
  },
  {
    title: "Step 2: Blood Sample Collection",
    description:
      "A small blood sample is taken, which contains the essential growth factors needed for treatment.",
  },
  {
    title: "Step 3: Processing",
    description: "The blood sample is processed to extract and concentrate the growth factors.",
  },
  {
    title: "Step 4: Microinjections",
    description:
      "The concentrated growth factors are skillfully injected into the scalp, stimulating hair follicles and encouraging hair regrowth.",
  },
  {
    title: "Step 5: Recovery",
    description: "Minimal downtime — most patients can resume daily activities immediately.",
    bullets: ["Minimal downtime", "Most patients can resume daily activities immediately"],
  },
  {
    title: "Step 6: Follow-Up",
    description:
      "Periodic follow-up appointments ensure that hair regeneration is progressing as expected.",
  },
] as const;

export const GFC_CONDITIONS = [
  {
    title: "Male Pattern Baldness",
    description: "Hair thinning and receding hairline caused by genetics and hormones.",
  },
  {
    title: "Female Pattern Baldness",
    description: "Diffuse thinning and reduced hair density commonly seen in women.",
  },
  {
    title: "Alopecia Areata",
    description: "Patchy hair loss caused by autoimmune conditions.",
  },
  {
    title: "Thinning Hair",
    description: "General reduction in hair density and volume.",
  },
] as const;

export const GFC_SIDE_EFFECTS = [
  "Minor discomfort at injection sites",
  "Mild redness",
  "Temporary swelling",
  "Slight scalp sensitivity",
] as const;

export const GFC_PRECAUTIONS = [
  "Follow all post-treatment instructions provided by our medical team.",
  "Inform your healthcare provider of any allergies.",
  "Discuss any medical conditions before the procedure.",
] as const;

export const GFC_COST_ROWS = [{ treatment: "GFC Hair Treatment", cost: "₹8,000 – ₹15,000 per session" }] as const;

export const GFC_WHY_CHOOSE_ROWS = [
  { feature: "Expertise", advantage: "Experienced medical professionals skilled in GFC treatment" },
  { feature: "Personalized Care", advantage: "Customized treatment plans based on individual needs" },
  { feature: "Advanced Technology", advantage: "Equipped with the latest medical technology" },
  { feature: "Patient-Centric Approach", advantage: "Focus on comfort, safety, and satisfaction" },
  { feature: "Proven Results", advantage: "Strong track record of successful GFC treatments" },
] as const;

export const GFC_PREFER_ITEMS = [
  {
    title: "Expert Medical Team",
    body: "Our specialists possess extensive experience in advanced hair restoration procedures.",
  },
  {
    title: "Customized Treatment Plans",
    body: "Every patient receives a personalized strategy designed around their specific hair loss pattern.",
  },
  {
    title: "State-of-the-Art Technology",
    body: "We utilize advanced equipment and protocols for optimal treatment outcomes.",
  },
  {
    title: "Excellent Patient Care",
    body: "From consultation to follow-up, patient comfort and satisfaction remain our priority.",
  },
  {
    title: "Proven Clinical Results",
    body: "Numerous successful cases demonstrate the effectiveness of our GFC therapy programs.",
  },
] as const;

export const GFC_TREATMENTS_FAQS: { question: string; answer: string }[] = [
  {
    question: "What is GFC Hair Treatment?",
    answer:
      "GFC (Growth Factor Concentrate) Therapy is a non-surgical hair restoration treatment that uses growth factors derived from your own blood to stimulate hair follicles and promote hair growth.",
  },
  {
    question: "Is GFC Treatment Painful?",
    answer: "The procedure is minimally invasive and causes little to no discomfort.",
  },
  {
    question: "How Many Sessions Are Required?",
    answer:
      "The number of sessions varies depending on the extent of hair loss and individual goals. Your doctor will recommend a personalized treatment plan.",
  },
  {
    question: "What is the Recovery Time?",
    answer:
      "Recovery is minimal, and most patients can resume normal activities immediately after treatment.",
  },
  {
    question: "Are the Results Permanent?",
    answer:
      "Results are long-lasting, but maintenance sessions may be recommended depending on individual hair loss progression.",
  },
  {
    question: "Who is an Ideal Candidate?",
    answer:
      "Individuals experiencing hair thinning, male pattern baldness, female pattern baldness, or alopecia are often suitable candidates.",
  },
  {
    question: "How long does it take to see results with GFC Hair Treatment?",
    answer:
      "Results can vary, but many patients notice improvements within a few months, with fuller regrowth becoming more apparent over time.",
  },
  {
    question: "Is GFC Hair Treatment suitable for both men and women?",
    answer: "Yes, GFC Hair Treatment is effective for both men and women dealing with hair loss.",
  },
  {
    question: "Can GFC Hair Treatment be combined with other hair restoration methods?",
    answer:
      "GFC Hair Treatment can complement other hair restoration methods, and your treatment plan can be customized accordingly.",
  },
];
