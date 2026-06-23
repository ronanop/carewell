export type HomepageService = {
  title: string;
  slug: string;
  href: string;
  heroImageUrl: string;
  description: string;
  ctaLabel: string;
};

export type JourneyStep = {
  title: string;
  body: string;
};

export type WhyChooseItem = {
  title: string;
  body: string;
  accent: string;
};

export type WhyChooseTrustItem = {
  label: string;
};

export type SpecialtyItem = {
  title: string;
  href: string;
};

export type VideoTestimonial = {
  title: string;
  subtitle: string;
  embedUrl: string;
};

export type HowItWorksStep = {
  id: number;
  title: string;
  description: string;
  image: string;
  hasButton?: boolean;
  buttonHref?: string;
};

export const TREATMENT_JOURNEY = {
  eyebrow: "Fast, safe & doctor-led solutions",
  title: "Your Treatment Journey at Care Well Medical Centre",
  description:
    "A clear, doctor-led process focused on safety, results, and personalised care.",
  steps: [
    {
      title: "Step 1: Doctor Consultation",
      body: "Personal evaluation to understand your concern and goals. No sales team. Direct doctor interaction.",
    },
    {
      title: "Step 2: Medical Assessment",
      body: "Detailed scalp, skin, or body analysis using medical protocols and experience.",
    },
    {
      title: "Step 3: Personalised Treatment Plan",
      body: "Only treatments you medically need. Clear explanation of procedure, recovery, and cost.",
    },
    {
      title: "Step 4: Safe Procedure & Follow-up",
      body: "Advanced technology, strict hygiene, and proper post-treatment care.",
    },
  ] satisfies JourneyStep[],
  ctaText: "Not sure which treatment is right for you? Talk to our doctor.",
} as const;

export const HOMEPAGE_SERVICES: HomepageService[] = [
  {
    title: "Cosmetic Treatments",
    slug: "botox-treatment",
    href: "/services/botox",
    heroImageUrl: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg",
    description:
      "Non-surgical anti-aging treatments including Botox, fillers, and laser rejuvenation at our South Delhi clinic.",
    ctaLabel: "View Cosmetic Treatments",
  },
  {
    title: "Plastic Surgery",
    slug: "rhinoplasty",
    href: "/plastic-surgery-in-delhi/rhinoplasty",
    heroImageUrl: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/surgical-procedures-card.jpg",
    description:
      "Advanced cosmetic surgical procedures including rhinoplasty and body contouring performed safely at our South Delhi clinic.",
    ctaLabel: "View Plastic Surgery",
  },
  {
    title: "Hair Transplant",
    slug: "hair-transplant",
    href: "/hair-transplant-in-delhi",
    heroImageUrl: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517810/carewell-media/site/demo/hair-treatments-card.jpg",
    description:
      "Permanent hair restoration using advanced FUE and FUT techniques, performed by a senior cosmetic surgeon in Delhi.",
    ctaLabel: "View Hair Transplant",
  },
  {
    title: "Skin Treatments",
    slug: "vitiligo-treatment",
    href: "/services/acne-scar-treatment",
    heroImageUrl: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg",
    description:
      "Medical-grade solutions for acne scars, pigmentation, and laser skin rejuvenation in Delhi NCR.",
    ctaLabel: "View Skin Treatments",
  },
  {
    title: "Body Contouring",
    slug: "cryolipolysis",
    href: "/body-contouring-in-delhi/cryolipolysis",
    heroImageUrl: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517816/carewell-media/site/demo/wellness-card.jpg",
    description:
      "Non-surgical and surgical body shaping treatments for fat reduction offered at our CR Park clinic.",
    ctaLabel: "View Body Contouring",
  },
  {
    title: "Intimate Surgery",
    slug: "hymenoplasty",
    href: "/intimate-surgery-in-delhi/hymenoplasty",
    heroImageUrl: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/surgical-procedures-card.jpg",
    description:
      "Confidential intimate procedures performed in a safe and private environment in South Delhi.",
    ctaLabel: "View Intimate Surgery",
  },
];

export const SERVICES_SECTION = {
  eyebrow: "Our Services",
  title: "Comprehensive Hair Transplant, Skin & Cosmetic Surgery Services",
  description:
    "At Care Well Medical Centre, we provide doctor-led treatments across hair, skin, cosmetic, and surgical care, focused on safety, natural results, and personalised treatment planning.",
  footerCta: "Not sure which service you need? Our doctor can guide you.",
} as const;

export const SURGEON_SPOTLIGHT = {
  eyebrow: "Meet your surgeon",
  title: "Meet Your Cosmetic Surgeon",
  name: "Dr. Sandeep Bhasin",
  intro:
    "Dr. Sandeep Bhasin is a senior cosmetic and aesthetic surgeon with over 18 years of clinical experience in hair transplant, skin treatments, aesthetic procedures, and cosmetic surgery. As the founder and lead surgeon at Care Well Medical Centre, he personally plans and medically supervises every major treatment, with a strong focus on patient safety, ethical practice, and natural-looking results.",
  proceduresNote: "Performed 10,000+ cosmetic and hair procedures for patients across South Delhi and Delhi NCR.",
  highlights: [
    "Founder & Lead Surgeon, Care Well Medical Centre",
    "Doctor-Performed and Medically Supervised Procedures",
    "Expertise Across Hair, Skin & Aesthetic Treatments",
    "Trusted by Patients Across Delhi NCR",
    "Member of recognized medical associations",
    "Evidence-based protocols",
    "Strict surgical safety standards",
  ],
  stats: [
    { value: "18+", label: "Years of Clinical Experience" },
    { value: "10,000+", label: "Procedures Performed" },
    { value: "1", label: "Senior Doctor Supervision" },
  ],
  imageSrc: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517806/carewell-media/site/demo/doctor-profile-feature-vertical.png",
  profileHref: "/about/dr-bhasin",
} as const;

export const ABOUT_US = {
  eyebrow: "About us",
  title: "Redefining Aesthetic & Cosmetic Care",
  paragraphs: [
    "At Care Well Medical Centre, we believe aesthetic care is not about changing who you are, but enhancing your natural features safely and responsibly.",
    "Every treatment is planned with a personalised, doctor-led approach, combining advanced technology, medical expertise, and clear guidance—so you feel confident at every step.",
    "Cosmetic care goes beyond appearance. It impacts self-confidence, wellness, and long-term satisfaction. That is why we focus on natural-looking results, ethical recommendations, and treatments tailored to individual needs.",
  ],
  featuresTitle: "Our special Features",
  features: [
    "Advanced Skin & Anti-Aging Treatments",
    "Body Contouring & Fat Reduction",
    "Hair Restoration & Transplant",
    "Scar & Acne Treatment",
    "Laser & Non-Surgical Procedures",
    "Cosmetic Surgeries",
  ],
  imageSrc: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517799/carewell-media/site/demo/about-us-consultation.jpg",
  aboutHref: "/about",
} as const;

export const CONSULTATION_SPECIALTIES = {
  eyebrow: "Consultation & Expertise",
  title: "Our Aesthetic Consultation Specialties",
  descriptions: [
    "At Care Well Medical Centre, every treatment begins with a personalised, doctor-led consultation.",
    "We focus on understanding your concern first, then recommending the safest and most effective option.",
  ],
  items: [
    { title: "Hair Transplant", href: "/hair-transplant-in-delhi" },
    { title: "Laser Hair Removal", href: "/cosmetic-treatments-in-delhi/laser-hair-removal" },
    { title: "Acne & Scar Treatment", href: "/services/acne-scar-treatment" },
    { title: "Cryolipolysis (Fat Freezing)", href: "/body-contouring-in-delhi/cryolipolysis" },
    { title: "Anti-Aging Treatments", href: "/services/anti-aging" },
    { title: "Botox", href: "/services/botox" },
    { title: "Rhinoplasty", href: "/plastic-surgery-in-delhi/rhinoplasty" },
    { title: "Beard Transplant", href: "/hair-transplant-in-delhi/beard" },
    { title: "Hydrafacial", href: "/services/hydrafacial" },
    { title: "Liposuction", href: "/plastic-surgery-in-delhi/liposuction" },
    { title: "Breast Augmentation", href: "/plastic-surgery-in-delhi/breast-augmentation" },
    { title: "Hymenoplasty", href: "/intimate-surgery-in-delhi/hymenoplasty" },
  ] satisfies SpecialtyItem[],
} as const;

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    title: "Expert Care",
    body: "All major treatments personally supervised by Dr. Sandeep Bhasin, senior cosmetic surgeon in Delhi.",
    accent: "#F4C7B5",
  },
  {
    title: "Patient-Focused Approach",
    body: "We ensure a seamless experience with customized treatment plans and dedicated support.",
    accent: "#A8C8F0",
  },
  {
    title: "Latest Technology",
    body: "Advanced FDA-approved systems, medical-grade lasers, and modern surgical infrastructure.",
    accent: "#B9D9B5",
  },
  {
    title: "Efficient & Professional",
    body: "Smooth appointments, minimal wait times, timely follow-ups, and a stress-free experience.",
    accent: "#D3C0E8",
  },
];

export const WHY_CHOOSE_TRUST_ITEMS: WhyChooseTrustItem[] = [
  { label: "Safe & Hygienic Environment" },
  { label: "Experienced & Caring Team" },
  { label: "Timely & Transparent Process" },
  { label: "Trusted by Thousands of Patients" },
];

export const WHY_CHOOSE_SECTION = {
  eyebrow: "WE STAND OUT",
  title: "Why Choose Care Well Medical Centre?",
  subtitle:
    "Experience expert care, advanced technology, and a patient-first approach — all under one roof.",
  doctorName: "Dr. Sandeep Bhasin",
  doctorRole: "Senior Cosmetic & Aesthetic Surgeon",
  doctorClinic: "Care Well Medical Centre, Delhi",
  servingTitle: "Serving South Delhi & Delhi NCR with Doctor-Led Cosmetic Care",
  servingBody:
    "Care Well Medical Centre is located at House No. 1, NRI Complex, Chittaranjan Park (CR Park), New Delhi 110019, and serves patients from Greater Kailash, Kalkaji, Nehru Place, Alaknanda, Saket, and across Delhi NCR. Under the supervision of Dr. Sandeep Bhasin, senior cosmetic and hair transplant surgeon, we provide advanced cosmetic surgery, hair restoration, and skin treatments in a safe medical setting.",
  portraitSrc: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517806/carewell-media/site/demo/doctor-profile-feature-vertical.png",
} as const;

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: 1,
    title: "1. Book Doctor Consultation",
    description:
      "Speak directly with our clinical team for a personalised evaluation—no sales-only counselling.",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517799/carewell-media/site/demo/about-us-consultation.jpg",
    hasButton: false,
  },
  {
    id: 2,
    title: "2. Analyze My Skin",
    description:
      "AI-powered analysis to identify your skin concerns and recommend the right treatment path.",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517801/carewell-media/site/demo/ai-skin-scan-v3.jpg",
    hasButton: true,
    buttonHref: "/skin-scan",
  },
  {
    id: 3,
    title: "3. Personalised Treatment Plan",
    description:
      "Doctor-designed plan with clear procedure steps, recovery guidance, and transparent cost discussion.",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517807/carewell-media/site/demo/doctor-profile-feature.jpg",
    hasButton: false,
  },
  {
    id: 4,
    title: "4. Meet Your Doctor",
    description:
      "Treatments are performed and supervised by qualified doctors for safe, effective, natural results.",
    image: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517806/carewell-media/site/demo/doctor-profile-feature-vertical.png",
    hasButton: false,
  },
];

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    title: "Hair Transplant Testimonial",
    subtitle: "Patient Story",
    embedUrl: "https://www.youtube.com/embed/9w6AOQ-QCA4",
  },
  {
    title: "Skin Treatment Results",
    subtitle: "Before & After Experience",
    embedUrl: "https://www.youtube.com/embed/ponGrbjeRfk",
  },
  {
    title: "Cosmetic Surgery Journey",
    subtitle: "Recovery & Confidence",
    embedUrl: "https://www.youtube.com/embed/du8ZUVeWiVA",
  },
  {
    title: "Rhinoplasty Transformation Story",
    subtitle: "Patient Feedback",
    embedUrl: "https://www.youtube.com/embed/6zOxOmMynnU",
  },
  {
    title: "Acne Scar Treatment Review",
    subtitle: "Skin Rejuvenation",
    embedUrl: "https://www.youtube.com/embed/25dsGI4MLpg",
  },
  {
    title: "Post-Procedure Recovery Journey",
    subtitle: "Healing Timeline",
    embedUrl: "https://www.youtube.com/embed/qpWzX46LP2A",
  },
];

export const GOOGLE_REVIEWS_SECTION = {
  eyebrow: "Consulting",
  title: "What Our Patients Say",
  description:
    "Verified patient feedback from Google—focused on care quality, clear communication, and natural results at our South Delhi clinic.",
  googleSearchHref:
    "https://www.google.com/search?q=Care+Well+Medical+Centre+Delhi+reviews",
} as const;

export const BOOK_CONSULTATION_BAND = {
  title: "Book a Doctor Consultation at Care Well Medical Centre",
  description:
    "At Care Well Medical Centre, consultations and procedures are personally supervised by Dr. Sandeep Bhasin, ensuring safe, medically guided, and personalised aesthetic care using advanced technology.",
  buttonLabel: "get an appointment",
} as const;

export const VIDEO_SECTION = {
  eyebrow: "Video Testimonials",
  title: "Real Patient Stories on YouTube",
} as const;

export const BLOG_SECTION = {
  eyebrow: "From The Blog",
  title: "Expert Insights by Dr. Bhasin",
} as const;

export const demoBlogs = [
  {
    title: "How to Choose the Right Cosmetic Procedure for Your Goals",
    slug: "choose-right-cosmetic-procedure",
    excerpt:
      "A practical checklist to align expectations, recovery time, and outcomes before your consultation.",
    coverUrl: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517802/carewell-media/site/demo/blog-card.svg",
    category: "Consultation Guide",
  },
  {
    title: "Recovery Timeline: What to Expect in the First 30 Days",
    slug: "recovery-timeline-first-30-days",
    excerpt:
      "Understand healing milestones and the aftercare habits that help patients recover confidently.",
    coverUrl: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517802/carewell-media/site/demo/blog-card.svg",
    category: "Post-Care",
  },
  {
    title: "5 Questions to Ask Before Booking Aesthetic Surgery",
    slug: "questions-before-booking-aesthetic-surgery",
    excerpt: "Use these patient-first questions to compare options and make a safe, informed decision.",
    coverUrl: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517802/carewell-media/site/demo/blog-card.svg",
    category: "Patient Education",
  },
];

export const TREATMENT_FINDER_BAND = {
  eyebrow: "Not Sure Which Treatment?",
  title: "Take Our 60-Second Treatment Finder Quiz",
  description: "Answer 5 quick questions and get a personalized recommendation.",
  buttonLabel: "Start Quiz →",
  quizHref: "/cost-estimator",
} as const;

export const LOCATION_SECTION = {
  title: "Conveniently Located in South Delhi",
  description: "Chittaranjan Park, near market area. Mon-Sun 10:00 AM to 7:00 PM.",
} as const;

export const FINAL_CTA_SECTION = {
  title: "Ready to Begin Your Transformation?",
  description: "Book a free consultation with Dr. Bhasin. No obligations.",
  primaryLabel: "Book Free Consultation",
  secondaryLabel: "Call Now",
  whatsappNote: "Or WhatsApp us for priority callback",
} as const;

export const blogCardFallbackImages = [
  "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517810/carewell-media/site/demo/hair-treatments-card.jpg",
  "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg",
  "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/surgical-procedures-card.jpg",
];
