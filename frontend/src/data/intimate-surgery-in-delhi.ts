import { HAIR_LOSS_CLINIC } from "@/data/hair-loss-treatment-in-delhi";

export const INTIMATE_SURGERY_PATH = "/intimate-surgery-in-delhi" as const;

const BASE = INTIMATE_SURGERY_PATH;

export const INTIMATE_SURGERY_IMAGES = {
  hero: {
    src: "/demo/about-us-consultation.png",
    alt: "Private intimate surgery consultation at Care Well Medical Centre, Delhi",
  },
  whatIs: {
    src: "/demo/wellness-card.png",
    alt: "Confidential intimate wellness care at Care Well Medical Centre",
  },
  doctor: {
    src: "/demo/doctor-profile-feature-vertical.png",
    alt: "Dr. Sandeep Bhasin — intimate surgery specialist in Delhi",
  },
} as const;

export const INTIMATE_SURGERY_SEO = {
  title:
    "Intimate Surgery in Delhi | Safe & Confidential Procedures | Care Well Medical Centre",
  description:
    "Intimate surgery in Delhi at Care Well Medical Centre. Vaginoplasty, labiaplasty, hymenoplasty & non-surgical rejuvenation by Dr. Sandeep Bhasin. Private consultation in CR Park.",
} as const;

export type IntimateProcedure = {
  title: string;
  body: string;
  purpose: string;
  benefits: string[];
  cost: string;
  recovery: string;
  closing?: string;
  href?: string;
  linkLabel?: string;
};

export const INTIMATE_SURGERY_MAIN_PROCEDURES: IntimateProcedure[] = [
  {
    title: "1. Vaginoplasty (Vaginal Tightening Surgery)",
    body: "Surgical tightening of the vaginal canal by strengthening and repositioning muscles — commonly chosen after childbirth or age-related loosening.",
    purpose: "Tighten the vaginal canal by repairing and strengthening internal muscles",
    benefits: [
      "Restores vaginal tone and elasticity",
      "Enhances sensation and intimacy",
      "Corrects discomfort from vaginal laxity",
      "Improves overall vaginal aesthetics and function",
    ],
    cost: "₹50,000 – ₹1,50,000",
    recovery: "7–10 days",
    closing: "Long-lasting results that help women regain confidence in intimate health.",
    href: `${BASE}/vaginoplasty`,
    linkLabel: "Vaginoplasty Surgery in Delhi",
  },
  {
    title: "2. Labiaplasty (Labial Reshaping Surgery)",
    body: "Cosmetic surgery that reshapes or reduces the labia minora or majora for improved comfort and appearance.",
    purpose: "Reduce or reshape the labia minora or majora for improved comfort and appearance",
    benefits: [
      "Corrects asymmetry and excessive labia size",
      "Reduces irritation from tight clothing",
      "Enhances confidence in intimate relationships",
      "Improves hygiene and reduces risk of infections",
    ],
    cost: "₹40,000 – ₹1,20,000",
    recovery: "5–7 days",
    closing: "Ideal for functional and aesthetic improvements in the labial area.",
    href: `${BASE}/labiaplasty`,
    linkLabel: "Labiaplasty Surgery in Delhi",
  },
  {
    title: "3. Hymenoplasty (Hymen Reconstruction Surgery)",
    body: "Minor surgical reconstruction of the hymen for cultural, personal, or medical reasons — performed with complete confidentiality.",
    purpose: "Reconstruct the hymen for cultural, emotional, or personal reasons",
    benefits: [
      "Restores the hymen to its natural state",
      "Performed under local anesthesia with minimal discomfort",
      "Quick recovery with no visible scarring",
      "Safe and confidential treatment option",
    ],
    cost: "₹25,000 – ₹80,000",
    recovery: "3–5 days",
    closing: "A short, effective procedure with minimal downtime.",
    href: `${BASE}/hymenoplasty`,
    linkLabel: "Hymenoplasty Surgery in Delhi",
  },
  {
    title: "4. Clitoral Hood Reduction",
    body: "Removes excess skin around the clitoral hood to enhance sensitivity and aesthetics.",
    purpose: "Remove excess skin over the clitoris for improved sensitivity",
    benefits: [
      "Improves clitoral stimulation and sensitivity",
      "Enhances aesthetic appearance of the genital area",
      "Can be combined with labiaplasty",
      "Minimally invasive with short recovery",
    ],
    cost: "₹30,000 – ₹70,000",
    recovery: "5–7 days",
    closing: "Enhances both physical comfort and intimate pleasure.",
  },
  {
    title: "5. Monsplasty (Pubic Lift or Fat Reduction)",
    body: "Reshapes and contours the mons pubis, reducing excess fat or sagging skin.",
    purpose: "Reduce bulging or sagging in the pubic area using liposuction or skin tightening",
    benefits: [
      "Eliminates excess fat or loose skin in the pubic area",
      "Smooth, contoured appearance",
      "Can be performed with liposuction",
      "Improves comfort in tight-fitting clothing",
    ],
    cost: "₹40,000 – ₹1,00,000",
    recovery: "7–10 days",
    closing: "Ideal for women seeking enhanced lower body contour.",
    href: "/plastic-surgery-in-delhi/liposuction",
    linkLabel: "Liposuction in Delhi",
  },
  {
    title: "6. Perineoplasty (Perineal Reconstruction)",
    body: "Repairs and tightens the perineal area affected by childbirth, trauma, or aging.",
    purpose: "Repair and tighten the perineum, usually after childbirth or trauma",
    benefits: [
      "Restores perineal area for improved function",
      "Helps in mild pelvic organ prolapse cases",
      "Enhances sensation and reduces discomfort",
      "Can be combined with vaginoplasty",
    ],
    cost: "₹50,000 – ₹1,20,000",
    recovery: "7–10 days",
    closing: "Restorative solution for aesthetic and functional improvements.",
  },
];

export type IntimateAdditionalProcedure = {
  title: string;
  bullets: string[];
};

export const INTIMATE_SURGERY_ADDITIONAL: IntimateAdditionalProcedure[] = [
  {
    title: "7. G-Spot Augmentation",
    bullets: [
      "Enhances sexual pleasure and sensitivity",
      "Uses hyaluronic acid or PRP injections",
      "Quick procedure with minimal downtime",
    ],
  },
  {
    title: "8. Labia Majora Augmentation",
    bullets: [
      "Adds volume using fat transfer or fillers",
      "Improves firmness and aesthetic appearance",
    ],
  },
  {
    title: "9. Hoodectomy (Clitoral Unhooding)",
    bullets: [
      "Removes excess skin to enhance clitoral stimulation",
      "Improves sensitivity and cosmetic appeal",
    ],
  },
  {
    title: "10. Bartholin Cyst Removal",
    bullets: [
      "Treats painful cysts near the vaginal opening",
      "Safe, minimally invasive procedure",
    ],
  },
  {
    title: "11. Perineal Scar Revision",
    bullets: [
      "Improves scarring from childbirth or previous surgeries",
      "Enhances both function and appearance",
    ],
  },
];

export const INTIMATE_SURGERY_NON_SURGICAL = [
  {
    title: "Laser Vaginal Tightening",
    body: "Uses laser energy to stimulate collagen production and improve elasticity.",
  },
  {
    title: "PRP Vaginal Rejuvenation (O-Shot)",
    body: "Platelet-rich plasma boosts sensitivity and lubrication.",
  },
  {
    title: "Vaginal Whitening Treatments",
    body: "Lightens pigmentation in the intimate area for aesthetic enhancement.",
  },
  {
    title: "Radiofrequency Vaginal Rejuvenation",
    body: "Improves firmness, hydration, and elasticity without surgery.",
  },
] as const;

export const INTIMATE_SURGERY_COST_ROWS = [
  { procedure: "Vaginoplasty", cost: "₹50,000 – ₹1,50,000" },
  { procedure: "Labiaplasty", cost: "₹40,000 – ₹1,20,000" },
  { procedure: "Hymenoplasty", cost: "₹25,000 – ₹80,000" },
  { procedure: "Clitoral Hood Reduction", cost: "₹30,000 – ₹70,000" },
  { procedure: "Monsplasty", cost: "₹40,000 – ₹1,00,000" },
  { procedure: "Perineoplasty", cost: "₹50,000 – ₹1,20,000" },
] as const;

export const INTIMATE_SURGERY_PAGE = {
  h1: "Intimate Surgery in Delhi – Enhance Confidence & Wellness",
  subtitle: "Confidential · Safe · Expert Care · CR Park",
  tagline: "Confidential, safe and expert intimate care for women in Delhi.",
  introHeading: "Confidential, Safe & Expert Intimate Care for Women in Delhi",
  introParagraphs: [
    "Intimate surgery in Delhi focuses on enhancing both the aesthetics and functionality of intimate areas. Many women choose these procedures due to concerns related to childbirth, aging, discomfort, or self-confidence.",
    "These surgeries restore physical well-being and significantly boost personal comfort and self-esteem.",
    "At Care Well Medical Centre, we provide safe, discreet, and professional intimate surgical solutions tailored to individual needs.",
  ],
  whatIsHeading: "What is Intimate Surgery?",
  whatIsBody:
    "Intimate surgery is a specialized field of cosmetic and reconstructive procedures designed to enhance the appearance, function, and comfort of intimate areas — addressing concerns from childbirth, aging, discomfort, or self-confidence.",
  benefitsHeading: "Key Benefits of Intimate Surgery",
  benefits: [
    "Enhances vaginal aesthetics and functionality",
    "Improves self-confidence and comfort in personal relationships",
    "Restores tightness and structure after childbirth or aging",
    "Reduces discomfort caused by excess skin or tissue",
    "Addresses medical concerns like weak pelvic muscles or irritation",
  ],
  whatIsClosing:
    "Intimate surgery is a personal decision that can improve both physical and emotional well-being. We provide a safe, discreet, and professional environment for all intimate procedures.",
  proceduresHeading: "Common Intimate Surgical Procedures",
  proceduresIntro:
    "Various cosmetic and reconstructive treatments improve intimate health and confidence. Intimate surgery in Delhi includes vaginoplasty, labiaplasty, and hymenoplasty — addressing both functional and aesthetic concerns.",
  additionalHeading: "Additional Intimate Surgery Procedures",
  nonSurgicalHeading: "Non-Surgical Intimate Rejuvenation",
  nonSurgicalIntro:
    "For those who prefer non-invasive options, we offer modern procedures that enhance vaginal wellness without surgery.",
  nonSurgicalClosing:
    "Non-surgical options are quick, effective, and require no downtime — a popular choice for many women.",
  costHeading: "Cost of Intimate Surgery in Delhi",
  costIntro:
    "Cost depends on procedure type, complexity, and the surgeon's expertise.",
  costClosing:
    "Pricing varies based on the clinic, surgeon's experience, and additional treatments required.",
  whyChooseHeading: "Why Choose Care Well Medical Centre for Intimate Surgery in Delhi?",
  whyChooseIntro:
    "We understand that intimate wellness is a personal journey. We offer safe, professional, and confidential treatments in a comfortable, judgment-free environment.",
  whyChooseItems: [
    "Led by Dr. Sandeep Bhasin, an expert in intimate surgery",
    "Advanced surgical and non-surgical options for optimal results",
    "Customized treatment plans based on individual concerns",
    "State-of-the-art technology for the best patient experience",
    "Discreet, private, and professional care",
  ],
  reviewsHeading: "What Women Say About Our Intimate Care Services",
  reviewsIntro:
    "From vaginoplasty to hymenoplasty, our intimate care services have helped hundreds of women feel confident and supported.",
  directionsHeading: "How to Reach Care Well Medical Centre for Intimate Surgery",
  directionsAddress:
    "House No. 1, NRI Complex, Chittaranjan Park (C.R. Park), Alaknanda, New Delhi – 110019",
  directionsTimings: "Mon–Sat, 10:00 AM to 7:00 PM",
  metroStations: [
    "Govindpuri Metro Station (Violet Line) – 1.8 km",
    "Nehru Place Metro Station (Violet Line) – 2.2 km",
  ],
  metroNote: "From metro stations, take an e-rickshaw or auto to the clinic (5–10 minutes).",
  cabNote:
    'Search for "Care Well Medical Centre CR Park" on Google Maps or ride-hailing apps like Uber or Ola.',
  erickshawNote:
    "E-rickshaws available outside Govindpuri or Nehru Place Metro Station — ask to be dropped near CR Park Market No. 1.",
  directionsAssistance:
    "Need help finding us? Call for guidance — we are happy to assist.",
  consultationHeading: "Book Your Consultation",
  consultationBody:
    "Enhance your confidence and intimate well-being with our expert procedures. Contact Care Well Medical Centre today for a private consultation and explore the best options for your needs.",
  faqHeading: "FAQs About Intimate Surgery",
  disclaimer:
    "Intimate surgery suitability varies between individuals. All procedures should only be performed after consultation with a qualified surgeon. This page is for informational purposes and does not replace medical advice.",
  treatmentDropdownLabel: "Intimate Surgery",
} as const;

export { HAIR_LOSS_CLINIC as INTIMATE_SURGERY_CLINIC };

export const INTIMATE_SURGERY_FAQS: { question: string; answer: string }[] = [
  {
    question: "What are the most common types of intimate surgery?",
    answer:
      "Popular procedures include vaginoplasty (vaginal tightening), labiaplasty (labial reshaping), and hymenoplasty (hymen restoration).",
  },
  {
    question: "Who is the right candidate for intimate surgery?",
    answer:
      "Women experiencing discomfort, loss of vaginal tightness, enlarged labia, or those who wish to restore their hymen for personal or cultural reasons may be candidates. A consultation with a qualified surgeon is necessary.",
  },
  {
    question: "How long does the recovery process take?",
    answer:
      "Most patients resume daily activities within 5–7 days. Full recovery may take 4–6 weeks, during which heavy activities and intercourse should be avoided.",
  },
  {
    question: "Are intimate surgery procedures painful?",
    answer:
      "Most procedures are performed under local or general anesthesia, ensuring minimal discomfort. Mild soreness and swelling after surgery are managed with prescribed pain relievers.",
  },
  {
    question: "How much does intimate surgery cost in Delhi?",
    answer:
      "Costs range from approximately ₹25,000 for hymenoplasty to ₹1,50,000 for vaginoplasty, depending on procedure complexity and surgeon expertise.",
  },
  {
    question: "When can I resume sexual activity after surgery?",
    answer:
      "Patients are generally advised to wait 4–6 weeks before resuming sexual activity, depending on the procedure and individual healing.",
  },
  {
    question: "Is intimate surgery permanent?",
    answer:
      "Results are long-lasting, but factors like aging, childbirth, and hormonal changes may affect outcomes over time.",
  },
  {
    question: "Where can I get the best intimate surgery in Delhi?",
    answer:
      "Care Well Medical Centre offers expert vaginoplasty, labiaplasty, and hymenoplasty in Delhi with experienced surgeons and advanced technology in a confidential setting.",
  },
];
