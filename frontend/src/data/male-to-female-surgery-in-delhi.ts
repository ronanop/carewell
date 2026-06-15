import { PLASTIC_SURGERY_PATH } from "@/data/plastic-surgery-in-delhi";
import { HAIR_LOSS_CLINIC } from "@/data/hair-loss-treatment-in-delhi";

export const MTF_SURGERY_PATH = "/plastic-surgery-in-delhi/male-to-female-surgery" as const;

export const MTF_SURGERY_IMAGES = {
  hero: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517799/carewell-media/site/demo/about-us-consultation.jpg",
    alt: "Confidential male to female surgery consultation at Care Well Medical Centre, Delhi",
  },
  understanding: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/surgical-procedures-card.jpg",
    alt: "Male to female gender reassignment surgery process explained at Care Well Medical Centre",
  },
  whyChoose: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517799/carewell-media/site/demo/about-us-consultation.jpg",
    alt: "Why choose Care Well Medical Centre for gender affirmation care in Delhi",
  },
  types: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517807/carewell-media/site/demo/doctor-profile-feature.jpg",
    alt: "Types of male to female surgery offered at Care Well Medical Centre",
  },
  journey: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517816/carewell-media/site/demo/wellness-card.jpg",
    alt: "Patient journey for male to female surgery in Delhi",
  },
  safety: {
    src: "/images/service-hero-theatre-bg.png",
    alt: "How gender reassignment surgery is performed safely at Care Well Medical Centre",
  },
  eligibility: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517806/carewell-media/site/demo/doctor-profile-feature-vertical.png",
    alt: "Eligibility and minimum age for gender reassignment surgery",
  },
  doctor: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517806/carewell-media/site/demo/doctor-profile-feature-vertical.png",
    alt: "Dr. Sandeep Bhasin — gender reassignment surgeon in Delhi",
  },
  videoPoster: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517807/carewell-media/site/demo/doctor-profile-feature.jpg",
    alt: "What to expect before and after male to female surgery",
  },
  beforeAfter: [
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517895/carewell-media/wp/breast-augmentation-surgery-carewell.jpg`,
      alt: "Male to female gender reassignment surgery before and after results under medical supervision in Delhi",
      caption: "Gender affirmation results",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517896/carewell-media/wp/breast-lift-surgery-carewell-1.jpg`,
      alt: "Sex reassignment surgery before and after comparison for male to female transition",
      caption: "Transition comparison",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517895/carewell-media/wp/breast-augmentation-surgery-carewell.jpg`,
      alt: "Before and after results of breast implant surgery as part of male to female transition",
      caption: "Breast feminisation",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517896/carewell-media/wp/breast-lift-surgery-carewell-1.jpg`,
      alt: "Male to female breast augmentation before and after results using silicone implants",
      caption: "Breast augmentation results",
    },
  ],
} as const;

export const MTF_SURGERY_SEO = {
  title: "Male to Female Surgery in Delhi | Care Well Medical Centre",
  description:
    "Male to female surgery in Delhi at Care Well Medical Centre. Confidential gender reassignment & MTF procedures by Dr. Sandeep Bhasin. WPATH standards, cost & recovery. Book consultation.",
} as const;

export type MtfSurgeryType = {
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
};

export const MTF_SURGERY_TYPES: MtfSurgeryType[] = [
  {
    title: "Gender Affirmation Surgery (MTF)",
    body: "Comprehensive transformation procedures that align your physical form with your gender identity through safe, multi-stage planning following WPATH standards.",
  },
  {
    title: "Breast Feminisation Surgery",
    body: "Enhances chest contour and shape to create a natural feminine silhouette through advanced male to female breast surgery techniques.",
    href: "/plastic-surgery-in-delhi/breast-augmentation",
    linkLabel: "Breast augmentation surgery in Delhi",
  },
  {
    title: "Facial Feminisation Surgery",
    body: "Softens and refines facial features such as jawline, forehead, or nose to achieve balanced feminine harmony while maintaining your natural identity.",
    href: "/plastic-surgery-in-delhi/facelift",
    linkLabel: "Facelift & facial procedures",
  },
  {
    title: "Body Contouring & Fat Transfer",
    body: "Sculpts body proportions for smoother curves using precision fat grafting and liposculpting tailored to individual goals.",
    href: "/body-contouring-in-delhi",
    linkLabel: "Body contouring in Delhi",
  },
  {
    title: "Voice & Hairline Feminisation",
    body: "Supports gender expression by refining vocal tone and hairline appearance for a softer, more feminine presentation.",
  },
  {
    title: "Supportive Procedures & Aftercare",
    body: "Hormone coordination, laser hair reduction, and skin rejuvenation complement surgical results and promote overall well-being.",
    href: "/cosmetic-treatments-in-delhi/laser-hair-removal",
    linkLabel: "Laser hair removal",
  },
];

export const MTF_SURGERY_COST_ROWS = [
  {
    procedure: "Gender Affirmation (Full MTF Plan)",
    cost: "₹6 – ₹8 Lakh",
    notes: "Includes multiple surgical stages under one plan",
  },
  {
    procedure: "Male to Female Breast Surgery",
    cost: "₹2 – ₹3 Lakh",
    notes: "Varies by implant choice and surgical technique",
  },
  {
    procedure: "Facial Feminisation Procedures",
    cost: "₹2 – ₹6 Lakh",
    notes: "Depends on number of facial areas addressed",
  },
  {
    procedure: "Body Contouring / Fat Transfer",
    cost: "₹1 – ₹3 Lakh",
    notes: "Includes targeted liposuction and shaping",
  },
  {
    procedure: "Voice & Hairline Feminisation",
    cost: "₹1 – ₹2 Lakh",
    notes: "Optional supportive procedures",
  },
] as const;

export const MTF_SURGERY_JOURNEY = [
  {
    title: "Pre-Surgical Counselling & Assessment",
    body: "Confidential counselling and psychological evaluation by an experienced psychologist to confirm readiness and set realistic goals.",
  },
  {
    title: "Hormonal Therapy (if required)",
    body: "Hormone therapy may be advised to prepare your body and mind for surgery under endocrinology supervision.",
  },
  {
    title: "Surgery Planning & Scheduling",
    body: "A personalised plan created by Dr. Sandeep Bhasin, aligning medical safety with your desired outcome.",
  },
  {
    title: "Surgery & Recovery at Care Well Medical Centre",
    body: "Procedures performed in our advanced facility with continuous monitoring and compassionate care.",
  },
  {
    title: "Follow-Up & Emotional Support",
    body: "Regular reviews, aftercare, and emotional guidance help you recover confidently.",
  },
] as const;

export const MTF_SURGERY_TRUST_ROWS = [
  {
    aspect: "Surgeon Expertise",
    carewell: "Led by Dr. Sandeep Bhasin, Senior Cosmetic & Reconstructive Surgeon with 20+ years of experience",
    typical: "Often handled by general or less experienced surgeons",
  },
  {
    aspect: "Ethical Standards",
    carewell: "Strictly follows WPATH and international safety protocols",
    typical: "May vary; not all centres follow standardised guidelines",
  },
  {
    aspect: "Comprehensive Care",
    carewell: "Includes counselling, hormonal coordination, surgery, and emotional support",
    typical: "Limited focus on counselling or post-care",
  },
  {
    aspect: "Privacy & Confidentiality",
    carewell: "100% confidential patient handling and private recovery suites",
    typical: "Privacy policies often unclear",
  },
  {
    aspect: "Cost Transparency",
    carewell: "Clear, itemised estimate before treatment",
    typical: "Hidden or variable pricing common",
  },
  {
    aspect: "Aftercare Support",
    carewell: "Continuous follow-up and emotional guidance post-surgery",
    typical: "Follow-up care often limited or outsourced",
  },
] as const;

export const MTF_SURGERY_PAGE = {
  h1: "Male to Female Surgery in Delhi",
  subtitle: "Gender Affirmation · WPATH Standards · Confidential Care",
  tagline:
    "Transition safely and confidently with expert surgical care — align your body with your gender identity under complete privacy and medical supervision.",
  introParagraphs: [
    "We design our male to female surgery in Delhi to help you align your body with your gender identity under complete privacy and medical supervision.",
    "Led by Dr. Sandeep Bhasin, our team provides compassionate counselling, precision surgery, and post-operative support in a fully confidential environment.",
    "Male to female gender affirmation surgery is a specialised form of plastic surgery in Delhi, requiring both surgical precision and sensitive, ethical care.",
  ],
  introCta:
    "Book a confidential consultation at our trusted gender reassignment and sex change hospital in Delhi.",
  understandingHeading: "Understanding Male to Female Gender Reassignment Surgery",
  understandingParagraphs: [
    "Our male to female gender reassignment surgery helps you align your physical appearance with your gender identity. Each treatment is medically guided, safe, and carefully structured.",
    "Each step follows WPATH (World Professional Association for Transgender Health) standards to ensure physical safety, emotional readiness, and ethical practice.",
    "Our experienced gender reassignment surgeons provide confidential counselling, health screening, and complete support before and after the procedure.",
    "If you wish to learn about procedures or the male to female surgery cost in Delhi, our team is ready to guide you with honest, transparent advice.",
  ],
  whyChooseHeading: "Why Choose Care Well Medical Centre",
  whyChooseIntro:
    "Choosing the right team for your transition is as important as the surgery itself. We combine surgical expertise with emotional understanding to provide complete and confidential gender affirmation care.",
  whyChooseItems: [
    {
      title: "Experienced Surgeon",
      body: "Dr. Sandeep Bhasin, a Senior Cosmetic and Reconstructive Surgeon with over 20 years of experience, leads our centre with a specialised multidisciplinary team, including an experienced GI surgeon, to ensure safe, ethical, and trusted male to female surgery care in India.",
    },
    {
      title: "Comprehensive Care",
      body: "From pre-surgery counselling and hormone coordination to surgery and recovery, we guide you through each stage with continuous medical and psychological support.",
    },
    {
      title: "Privacy & Sensitivity",
      body: "Your journey remains completely private. Our compassionate team ensures 100% confidentiality and a supportive environment at our reputed sex change hospital in Delhi.",
    },
  ],
  typesHeading: "Types of Male to Female Surgery We Offer",
  typesIntro:
    "We provide a full range of medically supervised procedures that help you achieve a natural and confident feminine appearance under complete confidentiality.",
  typesClosing:
    "At Care Well Medical Centre in Delhi, we perform every gender affirmation surgery with compassion, safety, and respect for your privacy.",
  costHeading: "Male to Female Surgery Cost in Delhi",
  costIntro:
    "The male to female surgery cost in Delhi generally ranges between ₹2.5 lakh and ₹8 lakh, depending on the type of procedures chosen and your individual medical plan. Every treatment is planned under Dr. Sandeep Bhasin with complete privacy, medical transparency, and ethical pricing.",
  costTableHeading: "Estimated Cost Range",
  costNote:
    "All costs are approximate and may vary with surgical technique, hospital stay, anaesthesia, and aftercare requirements.",
  costGuidanceHeading: "Additional Guidance",
  costGuidance:
    "Some patients may be eligible for free gender reassignment surgery in India through select government or NGO-assisted programmes. Our team can help you explore these options and guide you through documentation if applicable.",
  costClosing:
    "Your male to female gender reassignment surgery cost will be confirmed after a private consultation once your treatment plan is medically evaluated.",
  costCta: "Get your personalised estimate — book a confidential consultation for an accurate quote and complete guidance.",
  journeyHeading: "Patient Journey for Male to Female Surgery in Delhi",
  journeyIntro:
    "Your surgery is carefully planned and supervised to ensure a safe, smooth, and emotionally supported transition. From your first counselling session to full recovery, every stage follows internationally recognised WPATH standards.",
  journeyRecoveryNote: "Typical recovery period: 6–12 weeks, depending on the procedure and healing response.",
  safetyHeading: "Is Gender Reassignment Surgery Safe?",
  safetyIntro:
    "Yes. Gender reassignment surgery is safe when performed under expert supervision and proper medical screening. We follow strict safety protocols to protect every patient before, during, and after surgery.",
  safetyMeasures: [
    "Pre-surgical health and anaesthesia assessment",
    "Sterile operation theatre and infection control",
    "Continuous monitoring through all stages of surgery",
    "Careful post-surgery observation and follow-ups",
  ],
  safetyClosing:
    "While every operation carries some risk, major complications are extremely rare in skilled hands. Your safety, privacy, and comfort remain our highest priorities.",
  eligibilityHeading: "Eligibility & Minimum Age for Gender Reassignment Surgery",
  eligibilityIntro:
    "We follow WPATH guidelines to ensure every patient is medically and emotionally ready for transition.",
  eligibilityAge:
    "The minimum age for gender reassignment surgery is 18 years, provided the person has completed a detailed psychological evaluation and obtained medical clearance.",
  eligibilityCandidates: [
    "Be in good physical and mental health",
    "Have realistic expectations and emotional readiness",
    "Undergo hormone therapy if advised by the specialist",
  ],
  eligibilityClosing:
    "Each case is reviewed individually to confirm safety and suitability before surgery.",
  doctorHeading: "Meet Dr. Sandeep Bhasin",
  doctorBio:
    "Dr. Sandeep Bhasin is a Senior Cosmetic and Aesthetic Surgeon with over 20 years of surgical experience in Delhi. He has performed advanced cosmetic and restorative procedures, including gender affirmation and gender reassignment surgeries for male-to-female and female-to-male transitions.",
  doctorQualifications: [
    "MBBS, MS (General – Cosmetic Surgery)",
    "Fellowship in Aesthetic and Reconstructive Surgery",
    "Certified in Laser and Endoscopic Cosmetic Surgery",
  ],
  doctorClosing:
    "Recognised among trusted gender reassignment surgery male to female doctors, Dr. Bhasin combines medical precision with compassionate counselling to ensure every transition is safe, ethical, and emotionally supported.",
  videoHeading: "Watch the Procedure Journey",
  videoTitle: "What to Expect Before and After Male to Female Surgery",
  videoBody:
    "See how Care Well Medical Centre guides each patient through safe and ethical sex reassignment surgery in Delhi — from counselling to recovery. This short, non-graphic explainer gives a clear view of your transformation journey in a caring and confidential environment.",
  trustHeading: "Why Patients Trust Care Well Medical Centre for Male to Female Surgery in Delhi",
  trustIntro:
    "Choosing the right clinic for your transition is a deeply personal decision. We focus on patient comfort, safety, and ethical care — not just results.",
  trustQuote:
    "At Care Well Medical Centre, we treat every transition as a partnership — combining medical precision with genuine human care.",
  resultsHeading: "MTF Before and After Results",
  locationHeading: "Location – Care Well Medical Centre, Delhi",
  locationIntro:
    "If you are searching for sex reassignment surgery near me, Care Well Medical Centre offers a trusted, private, and fully equipped facility for gender reassignment surgery in Delhi. Conveniently located in South Delhi with accessibility, confidentiality, and comprehensive patient care.",
  locationAddress:
    "House No. 1, NRI Complex, Chittaranjan Park (C.R. Park), NRI Colony, Mandakini Enclave Colony, Alaknanda, New Delhi, Delhi – 110019",
  locationHours: "Monday – Saturday, 10:00 AM to 7:00 PM",
  locationEmail: "queries@carewellmedicalcentre.in",
  consultationHeading: "Book a Confidential Consultation",
  consultationBody:
    "Your transition deserves compassion, privacy, and expert medical guidance. Every consultation is handled personally and confidentially by Dr. Sandeep Bhasin and his experienced team.",
  consultationClosing:
    "Our staff will help you understand the process, expected results, and available cost options with complete honesty and support.",
  faqHeading: "FAQs on Male to Female Surgery in Delhi",
  parentLabel: "Plastic Surgery in Delhi",
  parentPath: PLASTIC_SURGERY_PATH,
  treatmentDropdownLabel: "Male to Female Surgery",
  disclaimer:
    "All medical procedures are subject to individual assessment. The information on this page is for educational purposes only and should not replace an in-person consultation with Dr. Sandeep Bhasin.",
} as const;

export { HAIR_LOSS_CLINIC as MTF_SURGERY_CLINIC };

export const MTF_SURGERY_FAQS: { question: string; answer: string }[] = [
  {
    question: "Is male to female surgery safe in India?",
    answer:
      "Yes. When performed by qualified gender reassignment surgeons in licensed hospitals, it is generally safe. At Care Well Medical Centre, all procedures follow WPATH safety standards and thorough pre-operative screening.",
  },
  {
    question: "What is the cost of male to female surgery in Delhi?",
    answer:
      "Costs usually range from ₹2.5 lakh to ₹8 lakh, depending on the type of procedure and aftercare. You will receive a personalised estimate after consultation.",
  },
  {
    question: "How long does recovery take?",
    answer:
      "Most patients return to light activities within 2–3 weeks. Full recovery after sex reassignment surgery takes about 6–12 weeks, depending on the procedure and health condition.",
  },
  {
    question: "What is the minimum age for gender reassignment surgery?",
    answer:
      "The minimum age is 18 years, with mandatory psychological assessment and informed consent as per WPATH guidelines.",
  },
  {
    question: "Can this surgery be covered by insurance?",
    answer:
      "Some insurance plans and government schemes may cover parts of the treatment when medically justified. Our team helps you verify eligibility and paperwork.",
  },
  {
    question: "Is free gender reassignment surgery available in India?",
    answer:
      "Yes, certain government hospitals and NGO programmes offer free gender reassignment surgery in India for eligible patients. Our staff can guide you toward available options.",
  },
  {
    question: "How do I find a trusted clinic for sex reassignment surgery near me?",
    answer:
      "Look for centres with experienced surgeons, transparent pricing, and strong aftercare. Care Well Medical Centre in Delhi is known for confidential and ethical sex reassignment surgery care.",
  },
];
