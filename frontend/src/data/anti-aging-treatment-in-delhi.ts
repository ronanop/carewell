import { COSMETIC_TREATMENTS_PATH } from "@/data/cosmetic-treatments-in-delhi";
import { HAIR_LOSS_CLINIC } from "@/data/hair-loss-treatment-in-delhi";

export const ANTI_AGING_PATH = "/cosmetic-treatments-in-delhi/anti-aging" as const;

const WP = "https://www.carewellmedicalcentre.com/wp-content/uploads";
const COSMETIC = "/cosmetic-treatments-in-delhi";
const SKIN = "/skin-treatments-in-delhi";

export const ANTI_AGING_IMAGES = {
  hero: {
    src: `${WP}/2025/05/anti-aging-treatments-carewell.webp`,
    alt: "Anti aging treatment in Delhi before and after result photo showing smoother skin and reduced wrinkles",
  },
  whatIs: {
    src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517867/carewell-media/wp/anti-aging-treatments-carewell.webp`,
    alt: "Anti-aging skin concerns — wrinkles, sagging, dullness",
  },
  doctor: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517806/carewell-media/site/demo/doctor-profile-feature-vertical.png",
    alt: "Dr. Sandeep Bhasin — anti-aging treatment expert in Delhi",
  },
  videoPoster: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517807/carewell-media/site/demo/doctor-profile-feature.jpg",
    alt: "Anti-aging treatment video — Care Well Medical Centre",
  },
  beforeAfter: [
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517867/carewell-media/wp/anti-aging-treatments-carewell.webp`,
      alt: "Anti-Aging Before and After Results showing smooth skin in Delhi",
      caption: "Smoother, youthful skin",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517872/carewell-media/wp/botox-treatment-carewell.webp`,
      alt: "Visible improvements in anti-aging treatments before and after photos in Delhi",
      caption: "Wrinkle reduction",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517868/carewell-media/wp/dermal-fillers-carewell.webp`,
      alt: "Before and after result photo of anti aging treatment in Delhi with visible skin improvements",
      caption: "Volume restoration",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517873/carewell-media/wp/thread-lift-carewell.webp`,
      alt: "Anti aging treatment in Delhi before and after result photo displaying youthful, glowing skin",
      caption: "Skin tightening results",
    },
  ],
} as const;

export const ANTI_AGING_SEO = {
  title: "Anti-Aging Treatment in Delhi – Look Younger, Feel Better | Care Well Medical Centre",
  description:
    "Anti-aging treatment in Delhi at Care Well Medical Centre. Botox, fillers, HIFU, thread lift & facelift by Dr. Sandeep Bhasin. Non-surgical & surgical options. Book now.",
} as const;

export type AntiAgingTreatmentCard = {
  title: string;
  image: string;
  imageAlt: string;
  bullets: readonly string[];
  highlights?: readonly string[];
  idealFor?: string;
  note?: string;
  href?: string;
  linkLabel?: string;
};

export const ANTI_AGING_NON_SURGICAL: AntiAgingTreatmentCard[] = [
  {
    title: "Botox Injections",
    image: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517872/carewell-media/wp/botox-treatment-carewell.webp`,
    imageAlt: "Botox treatment for anti-aging in Delhi",
    bullets: [
      "Relaxes facial muscles to soften dynamic wrinkles such as forehead lines and crow's feet",
      "Results visible in 3–5 days and last up to four months",
      "Great for frown lines, early aging signs, and non-surgical brow lifts",
    ],
    note: "Performed by Dr. Sandeep Bhasin with precision and safety.",
    href: `${COSMETIC}/botox`,
    linkLabel: "Botox Treatment in Delhi",
  },
  {
    title: "Dermal Fillers",
    image: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517868/carewell-media/wp/dermal-fillers-carewell.webp`,
    imageAlt: "Dermal fillers for facial volume restoration in Delhi",
    bullets: [
      "Collagen-boosting hyaluronic acid fillers for sharper jawlines, improved smile lines, cheek enhancement, and fuller lips",
      "Quick results lasting 6 to 18 months depending on the type",
      "Ideal for aging lips, hollow eyes, contour loss, or sunken cheeks",
    ],
    note: "Custom facial contouring plans available for natural-looking results.",
    href: `${COSMETIC}/dermal-fillers`,
    linkLabel: "Dermal Fillers in Delhi",
  },
  {
    title: "HIFU (High-Intensity Focused Ultrasound)",
    image: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517875/carewell-media/wp/hifu-Treatment-carewell.webp`,
    imageAlt: "HIFU skin tightening treatment in Delhi",
    bullets: [
      "Ultrasound energy deepens collagen production in skin layers",
      "FDA-approved, minimally invasive technique with no scars or downtime",
      "Results improve over 2–3 months and can extend up to a year",
    ],
    idealFor: "Jawline lift, double chin, neck, and mild face sagging",
    href: `${COSMETIC}/hifu`,
    linkLabel: "HIFU Treatment in Delhi",
  },
  {
    title: "Chemical Peels",
    image: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517867/carewell-media/wp/anti-aging-treatments-carewell.webp`,
    imageAlt: "Chemical peel skin rejuvenation in Delhi",
    bullets: [
      "Customized acid-based peels exfoliate damaged and dull layers",
      "Reduces pigmentation, fine lines, acne scars, and sun damage",
      "Typically 3–6 sessions based on peel strength; safe superficial peels for darker skin types",
    ],
    href: `${SKIN}/chemical-peel`,
    linkLabel: "Chemical Peels Treatment in Delhi",
  },
  {
    title: "Cosmelan Peel",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg",
    imageAlt: "Cosmelan peel treatment for melasma and pigmentation in Delhi",
    bullets: [
      "Specialized peel for melasma, age spots, and stubborn pigmentation",
      "Deep exfoliation paired with post-peel skincare for lasting results",
      "Mild redness for a few days to a week; safe for Indian skin types when applied by experts",
    ],
    href: `${SKIN}/skin-whitening`,
    linkLabel: "Skin Whitening Treatment in Delhi",
  },
  {
    title: "Laser Skin Rejuvenation",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg",
    imageAlt: "Laser skin rejuvenation for anti-aging in Delhi",
    bullets: [
      "IPL or fractional lasers trigger collagen and repair damaged skin",
      "Improves texture, tone, wrinkles, and pores with visible improvement after 2–3 sessions",
      "Suitable for sun spots, uneven skin, and aging skin with texture issues",
    ],
    note: "Advanced, clinic-grade laser machines are used in the process.",
  },
  {
    title: "PRP (Vampire Facial)",
    image: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517878/carewell-media/wp/vampire-facelift-carewell.webp`,
    imageAlt: "PRP vampire facial for skin rejuvenation in Delhi",
    bullets: [
      "Platelet-rich plasma from your own blood boosts facial glow and elasticity",
      "Increases collagen, supports skin cell regeneration, and improves dull or scarred skin",
      "Full effect typically needs 3–4 sessions; safe, natural, and regenerative",
    ],
    href: `${COSMETIC}/vampire-facelift`,
    linkLabel: "Vampire Facelift Treatment in Delhi",
  },
];

export const ANTI_AGING_SURGICAL: AntiAgingTreatmentCard[] = [
  {
    title: "Thread Lift (Non-Invasive Surgical Lift)",
    image: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517873/carewell-media/wp/thread-lift-carewell.webp`,
    imageAlt: "Thread lift procedure for facial lifting in Delhi",
    bullets: [
      "Biocompatible threads (e.g. Promo Italia) lift sagging cheeks, jawline, brows, or neck",
      "Threads dissolve and stimulate collagen; local anesthesia, no hospital stay",
      "Immediate visible lift with results lasting 12–18 months",
    ],
    idealFor: "Mild to moderate neck and facial skin sagging",
    note: "Recovery: return to work in 1–2 days.",
    href: `${COSMETIC}/thread-lift`,
    linkLabel: "Thread Lift Treatment in Delhi",
  },
  {
    title: "Facelift Surgery (Rhytidectomy)",
    image: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517886/carewell-media/wp/facelift-surgery-carewell-min.jpg`,
    imageAlt: "Facelift surgery for long-term facial rejuvenation in Delhi",
    bullets: [
      "Tightens muscles, repositions facial tissues, and removes excess skin",
      "Customizable: mild facelift, mini lift, or full facelift",
      "Addresses deep nasolabial folds, jowls, and loose neck skin; results last 8–10 years",
    ],
    idealFor: "Sagging skin or patients above 45",
    note: "Downtime: 1–2 weeks, varies by case.",
    href: "/plastic-surgery-in-delhi",
    linkLabel: "Facelift Surgery in Delhi",
  },
];

export const ANTI_AGING_RESULTS_ROWS = [
  { treatment: "Botox", when: "3–5 days", duration: "3 to 4 months" },
  { treatment: "Dermal Fillers", when: "Immediate", duration: "6 to 18 months" },
  { treatment: "HIFU", when: "2–3 months", duration: "Up to 1 year" },
  { treatment: "Thread Lift", when: "Immediate", duration: "12 to 18 months" },
  { treatment: "Facelift Surgery", when: "1–2 weeks (healing)", duration: "8 to 10 years" },
  { treatment: "Chemical Peels", when: "1 week", duration: "Maintenance needed monthly" },
  { treatment: "Laser Treatments", when: "2–3 sessions", duration: "Maintenance yearly" },
  { treatment: "PRP (Vampire Facial)", when: "3–4 sessions", duration: "Skin quality keeps improving for months" },
] as const;

export const ANTI_AGING_COST_ROWS = [
  { treatment: "Botox (per area)", start: "₹6,000", range: "₹6,000 – ₹15,000" },
  { treatment: "Dermal Fillers (per ml)", start: "₹12,000", range: "₹12,000 – ₹25,000" },
  { treatment: "HIFU (Full Face)", start: "₹18,000", range: "₹18,000 – ₹40,000" },
  { treatment: "Thread Lift", start: "₹35,000", range: "₹35,000 – ₹70,000" },
  { treatment: "Facelift Surgery", start: "₹85,000", range: "₹85,000 – ₹2,00,000+" },
  { treatment: "Chemical Peels", start: "₹2,000", range: "₹2,000 – ₹5,000 (per session)" },
  { treatment: "PRP (Face)", start: "₹5,000", range: "₹5,000 – ₹8,000 (per session)" },
  { treatment: "Laser Skin Rejuvenation", start: "₹6,000", range: "₹6,000 – ₹15,000" },
] as const;

export const ANTI_AGING_PAGE = {
  h1: "Anti-Aging Treatment in Delhi – Look Younger, Feel Better",
  subtitle: "Non-Surgical & Surgical Rejuvenation · South Delhi",
  tagline:
    "Wrinkles, fine lines, or sagging skin stealing your glow? Advanced anti-aging treatments to reverse visible signs of aging safely and effectively.",
  parentLabel: "Cosmetic Treatments in Delhi",
  parentPath: COSMETIC_TREATMENTS_PATH,
  treatmentDropdownLabel: "Anti-Aging Treatment",
  introHeading: "Advanced Anti-Aging Treatment in Delhi",
  introParagraphs: [
    "At Care Well Medical Centre, we offer advanced non-surgical and surgical anti-aging treatment in Delhi to help you reverse visible signs of aging safely and effectively.",
    "Dr. Sandeep Bhasin and his team combine experience with cutting-edge technology to restore youthful skin and natural beauty — safely and effectively.",
    "Embrace transformation using the best anti-aging treatment in Delhi. Book an appointment for a refreshing skin experience.",
  ],
  whyAgeHeading: "Why Does Our Skin Age?",
  whyAgeIntro:
    "Our skin changes naturally as we move on. However, environmental damage, mental or emotional stress, and poor lifestyle can make your skin age faster. Aging skin does not only make you appear older — it also weakens muscles, reduces collagen, and damages skin layers.",
  whyAgeReasons: [
    "Collagen & Elastin Loss: Reduced skin elasticity and firmness contribute the maximum to aging skin",
    "Sun Damage: Harsh UV rays damage skin cells, causing wrinkles and pigmentation",
    "Stress & Poor Sleep: High cortisol weakens your skin structure",
    "Smoking & Alcohol: Reduces oxygen and blood flow, making skin look aged",
    "Pollution & Chemicals: Air toxins damage the skin barrier",
    "Unhealthy Diet: Weakens your skin's glow and repair capabilities",
    "Genetics & Hormonal Changes: Faster aging among people with hormonal imbalances or genetic issues",
  ],
  whyAgeResult:
    "Result? Sagging skin, uneven texture, dull tone, and wrinkles. However, advanced cosmetic treatments can help decelerate, reverse, or manage aging signs.",
  candidateHeading: "Who Should Consider Anti-Aging Treatments?",
  candidateIntro:
    "While these treatments are relatively easy, they can have risks like facial paralysis if not done properly. Always consult with a professional.",
  candidateItems: [
    "You're facing skin issues and are in your late 20s, 30s, 40s, or 50s",
    "You want to recover from laugh lines, under-eye bags, or wrinkles",
    "Your skin tone has become dull, uneven, or loose",
    "You want a natural-looking glow through non-surgical alternatives",
    "You want to decelerate aging before it appears prominently",
    "Your face loses firmness, youthfulness, or volume",
  ],
  avoidHeading: "Who Should Avoid or Delay Treatment?",
  avoidItems: [
    "Pregnant women or those who are feeding newborns",
    "People with allergies or an active skin infection at the treatment site",
    "People receiving blood-thinning medications (consult your doctor before deciding)",
  ],
  candidateNote:
    "At Care Well Medical Centre, Dr. Sandeep Bhasin recommends the best and safest treatment after analyzing your skin condition.",
  saggingHeading: "What Causes Skin Sagging and Premature Aging?",
  saggingIntro:
    "Aging is natural — but some people notice it much earlier than others because certain habits and lifestyle factors silently damage your skin over time.",
  saggingCauses: [
    "Chronic Stress & Negativity: Muscle tension from worry or frowning leads to wrinkles",
    "Smoking & Alcohol: Dehydrates skin, reduces oxygen, and causes sagging",
    "Sun Damage: Without sunscreen, UV breaks down collagen and causes age spots",
    "Cold & Dry Weather: Weak, flaky skin with increased fine lines",
    "Poor Diet: Processed foods, sugar, and fried foods decrease collagen",
    "Weight Fluctuations: Sudden gain or loss stretches skin and reduces elasticity",
    "Lack of Movement: Retards blood circulation and reduces natural glow",
  ],
  saggingClosing:
    "Anti-aging treatments work better when you address these daily habits. At Care Well Medical Centre, we help you treat both the visible signs and the root causes.",
  whatIsHeading: "What Is Anti-Aging?",
  whatIsParagraphs: [
    "Wrinkles, scars, and sun damage can result from aging, genetics, stress, and sun exposure. As cells age, their ability to repair damage changes — leading to uneven pigmentation, wrinkles, and volume loss that makes skin droop under gravity.",
  ],
  agingSigns: ["Wrinkles", "Sagging", "Dullness", "Bands"],
  whatIsClosing:
    "Skin-tightening procedures reposition underlying muscles, minimize wrinkles, and transform you with a flawless, youthful look.",
  wrinkleTreatmentsHeading: "What Kind of Effective Wrinkle Treatments Are Available?",
  wrinkleTreatmentsIntro:
    "Various skin tightening treatments for the body and face stimulate new collagen and replenish natural stores for velvety, smoother, firmer-looking skin — often without surgery.",
  nonSurgicalOptions: [
    "Microdermabrasion: A 'party facial' that removes the top skin layer for a temporary glow",
    "Chemical peels: Refresh skin underneath; deep peels for darker skin tones need careful consideration",
    "Mesotherapy: Injectable ingredients for skin rejuvenation with varying results",
    "Laser & light treatments: Fractional resurfacing and IPL improve tone and texture",
    "Radiofrequency techniques: Heat-based tightening that may not resolve all skin ailments",
    "Non-surgical facelifts: Ultrasound devices such as ULTHERA lift skin in minimal sessions",
    "Botox and fillers: Best for static lines and wrinkles; optimal combined with laser treatments",
    "Volume enhancement: Restore lost facial volume with fillers or fat injections",
  ],
  wrinkleTreatmentsWarning:
    "These treatments can cause issues such as facial paralysis when rendered inaccurately. Consult a professional before undergoing them.",
  nonSurgicalHeading: "Non-Surgical Anti-Aging Treatments in Delhi",
  nonSurgicalIntro:
    "Want a facial transformation without surgery? Visit Care Well Medical Centre for the most effective and safest non-surgical treatments for reduced wrinkles, skin tightening, and lost volume restoration — without downtime.",
  surgicalHeading: "Surgical Anti-Aging Treatments in Delhi",
  surgicalIntro:
    "If non-surgical treatments prove inadequate, surgical treatments can deliver transformative results. Care Well Medical Centre's safe and advanced techniques let you recover your youthful face.",
  surgicalNote:
    "Dr. Sandeep Bhasin executes all surgical procedures at Care Well Medical Centre. With exemplary surgical expertise, he has delivered exceptional aesthetic transformations for decades.",
  surgicalProTip:
    "Not able to choose between surgical and non-surgical options? Consult for a personal meeting so we can evaluate your skin and recommend the ideal path for you.",
  resultsHeading: "What to Expect – Results & Maintenance",
  resultsIntro:
    "Don't expect anti-aging treatments to fix everything at once. Make an informed decision based on expected results and how long they can sustain.",
  maintenanceHeading: "Maintenance Is the Key",
  maintenancePoints: [
    "After multiple sessions, you can witness optimal results",
    "Add skincare products and a healthy diet; avoid excessive sun exposure",
    "Follow-up visits let us review your skin's response and make modifications if needed",
  ],
  maintenanceClosing:
    "At Care Well Medical Centre, we believe in long-term skin health — not just quick fixes. That's why we create custom maintenance plans for every patient.",
  costHeading: "Cost of Anti-Aging Treatment in Delhi",
  costIntro:
    "At Care Well Medical Centre, we believe in transparent pricing — with no hidden charges or false promises.",
  costFactors: [
    "Type and number of sessions needed",
    "Area of treatment (face, neck, eyes, etc.)",
    "Severity of aging signs",
    "Product brand (e.g. Juvederm, Restylane for fillers)",
    "Clinical hygiene and doctor's expertise",
    "Combination therapies used",
  ],
  costClosing:
    "Care Well Medical Centre's customized treatment plans align with your skin goals and budget. Inquire about package discounts or seasonal offers during consultation.",
  costHelpHeading: "Need Help Choosing the Right Treatment?",
  costHelpBody:
    "Let Dr. Sandeep Bhasin examine your skin and guide you toward the most effective and affordable option — with no pressure or upselling.",
  whyChooseHeading: "Why Choose Care Well Medical Centre for Anti-Aging Treatments in Delhi?",
  whyChooseIntro:
    "Your face deserves more than a quick fix. You deserve expert care, genuine guidance, and results that look natural — not overdone. At Care Well Medical Centre, we bring science and artistry together to restore your youthful glow.",
  whyChooseClinic: [
    "Centrally located in South Delhi — easily accessible from CR Park, Greater Kailash, and Noida",
    "FDA-approved machines and products for all treatments",
    "Every consultation done personally by Dr. Bhasin — no junior staff or sales pressure",
    "Clean, private, and comfortable clinic setting",
    "Latest anti-aging techniques from a warm, professional, trained team",
  ],
  whatToExpect: [
    "Personalized experience from subtle skin glow-ups to extensive rejuvenations",
    "No hidden costs. No shortcuts. Just ethical, honest, and effective skincare",
    "You bring your story. We help you rediscover your skin's best chapter",
  ],
  beforeAfterHeading: "Anti-Aging Treatment Before and After Real Results",
  beforeAfterIntro:
    "Seeing is believing. At Care Well Medical Centre, our patients do not just look younger — they feel more confident, vibrant, and empowered.",
  beforeAfterClosing:
    "Every face is different — and so is every treatment. Book a one-on-one consultation and explore what's possible for your skin.",
  thingsToKnowHeading: "Things to Know Before Starting Anti-Aging Treatment",
  thingsToKnowIntro:
    "Before undergoing treatments for healthier, younger skin, consider these important points for more effective results.",
  thingsToKnow: [
    {
      title: "Anti-aging treatments are not one-size-fits-all",
      body: "Your skin is unique. You need a personalized treatment based on your goals, skin type, and age. Dr. Sandeep Bhasin aligns treatment plans based on these parameters.",
    },
    {
      title: "Not all signs of aging need surgery",
      body: "Non-surgical treatments such as lasers, fillers, or HIFU may prove adequate in many cases. We suggest surgery only after comprehensive evaluation.",
    },
    {
      title: "Combination treatments often work best",
      body: "Optimal results come from combining lasers, peels, fillers, and Botox for long-lasting, natural-looking transformations.",
    },
    {
      title: "Maintenance is key",
      body: "Anti-aging can't be fixed at once. Many cases require touch-ups every six to twelve months to adjust to your evolving skin.",
    },
    {
      title: "Choose an experienced specialist — not just a beauty clinic",
      body: "Anti-aging procedures require precision. Incorrect techniques can cause long-term issues. Care Well Medical Centre offers qualified cosmetic surgeons.",
    },
    {
      title: "Have realistic expectations",
      body: "Anti-aging treatments enhance your natural appearance — they don't freeze time. Our goal is to make you look refreshed, not artificial.",
    },
  ],
  thingsToKnowClosing:
    "Can't figure out the right solution? Consult with Dr. Bhasin to get answers to all your questions.",
  readyHeading: "Ready to Look Younger and Feel More Confident?",
  readyParagraphs: [
    "Aging is normal, but you can overcome tired, sagging skin issues. With the right treatment plan, you can restore a fresher, youthful look — safely and naturally.",
    "We offer personalized anti-aging treatments backed by science, experience, and results. Dr. Sandeep Bhasin will guide you every step of the way — from your first consultation to visible transformation.",
  ],
  readyChecklist: [
    "Discuss your skin goals with an expert",
    "Get a custom plan tailored to your face, age, and skin type",
    "See real before-and-after results and cost breakdown",
  ],
  readyClosing: "Your skin deserves care. Your face deserves expertise. Let us help you rediscover both.",
  doctorHeading: "Led by Dr. Sandeep Bhasin",
  doctorBio:
    "Dr. Sandeep Bhasin with 20+ years of clinical expertise ranks among the most experienced cosmetic surgeons in Delhi. He has a proven track record of successful anti-aging procedures. His in-depth treatment knowledge, unbiased advice, and subtle, age-defying outcomes set him apart.",
  faqHeading: "Anti-Aging Treatment FAQs",
  disclaimer:
    "Results vary by individual, skin type, and treatment plan. Anti-aging procedures carry risks and should only be performed after consultation with a qualified medical professional. This page is for informational purposes and does not replace medical advice.",
} as const;

export { HAIR_LOSS_CLINIC as ANTI_AGING_CLINIC };

export const ANTI_AGING_FAQS: { question: string; answer: string }[] = [
  {
    question: "What is the most effective anti-aging treatment?",
    answer:
      "The answer depends on your age, skin type, and concerns. Many patients succeed with combination treatments — peels, HIFU, fillers, and Botox. Seek effective skin assessment from a qualified cosmetic surgeon or dermatologist.",
  },
  {
    question: "At what age should I start anti-aging treatments?",
    answer:
      "You can begin in your late 20s to early 30s for prevention. Visible results usually occur for people above 35. Hydrating or peel-based treatments early delay deeper lines. Doctors often recommend fillers or HIFU for patients above 35–40.",
  },
  {
    question: "How can I stop my face from aging?",
    answer:
      "You cannot stop aging — but you can slow it significantly. Use sunscreen daily, avoid smoking and processed food, sleep 7–8 hours, stay hydrated, manage stress, and undergo skin treatments such as fillers, PRP, or lasers when needed.",
  },
  {
    question: "What is the best skin tightening treatment?",
    answer:
      "HIFU is best for lifting the neck, jawline, and face without surgery. Radiofrequency, thread lift, and laser skin tightening are also effective. The best choice depends on your age and skin laxity during consultation.",
  },
  {
    question: "What works best for wrinkles?",
    answer:
      "Botox treats dynamic wrinkles. Dermal fillers, chemical peels, or laser resurfacing help static or deep wrinkles. Mild lines may respond to anti-aging creams with peptides or retinol.",
  },
  {
    question: "Can I look younger without surgery?",
    answer:
      "Yes. Most aging signs improve with non-surgical options — skin boosters, HIFU, PRP, Botox, and fillers — with quick recovery.",
  },
  {
    question: "How much does anti-aging treatment cost in Delhi?",
    answer:
      "Costs vary by treatment type, area, and sessions. Botox: ₹6,000–₹15,000; Fillers: ₹12,000–₹25,000; HIFU: ₹18,000–₹40,000; Facelift surgery: ₹85,000+. Get a customized plan with precise costs during consultation.",
  },
  {
    question: "How long do the results last?",
    answer:
      "Botox: 3–4 months; Fillers: 6–18 months; Thread lift: 12–18 months; HIFU: up to 1 year; Facelift: 8–10 years. Regular touch-ups maintain long-lasting results.",
  },
  {
    question: "Are anti-aging treatments safe?",
    answer:
      "Trained specialists using approved products deliver safe results. Redness, swelling, or bruising may occur but typically resolve quickly.",
  },
  {
    question: "Can men also get anti-aging treatments?",
    answer:
      "Absolutely. Many men restore a youthful, confident look using fillers, HIFU, and Botox customized for facial goals and anatomy.",
  },
  {
    question: "What is the difference between Botox and fillers?",
    answer:
      "Botox relaxes muscles to treat expression lines such as crow's feet or forehead wrinkles. Fillers restore lost volume in lips, cheeks, and under-eyes. Both are effective non-surgical treatments for different aging signs.",
  },
  {
    question: "How many sessions are needed for anti-aging treatment?",
    answer:
      "Botox or fillers: often a single session; HIFU: 1–2 sessions per year; Peels & PRP: usually 3–6 sessions. Combination plans may span a few weeks to months.",
  },
  {
    question: "What is the best anti-aging treatment for 40+ skin?",
    answer:
      "For those in their 40s: Botox + Fillers for volume loss and wrinkles; HIFU for skin tightening; Thread lift for jawline sagging. A consultation helps choose the best combination.",
  },
];
