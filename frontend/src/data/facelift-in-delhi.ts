import { PLASTIC_SURGERY_PATH } from "@/data/plastic-surgery-in-delhi";
import { HAIR_LOSS_CLINIC } from "@/data/hair-loss-treatment-in-delhi";

export const FACELIFT_PATH = "/plastic-surgery-in-delhi/facelift" as const;

const WP = "https://www.carewellmedicalcentre.com/wp-content/uploads";
const COSMETIC = "/cosmetic-treatments-in-delhi";

export const FACELIFT_IMAGES = {
  hero: {
    src: `${WP}/2025/04/facelift-surgery-carewell-min.jpg`,
    alt: "Facelift surgery in Delhi at Care Well Medical Centre",
  },
  doctor: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517806/carewell-media/site/demo/doctor-profile-feature-vertical.png",
    alt: "Dr. Sandeep Bhasin — facelift surgeon in Delhi",
  },
  videoPoster: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517807/carewell-media/site/demo/doctor-profile-feature.jpg",
    alt: "Facelift treatment video at Care Well Medical Centre Delhi",
  },
  beforeAfter: [
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517886/carewell-media/wp/facelift-surgery-carewell-min.jpg`,
      alt: "Facelift before and after results in Delhi",
      caption: "Youthful facial contours",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517898/carewell-media/wp/neck-lift-procedure-carewell.jpg`,
      alt: "Neck lift and facelift results Delhi",
      caption: "Jawline definition",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517875/carewell-media/wp/hifu-Treatment-carewell.webp`,
      alt: "Non-surgical facelift results Delhi",
      caption: "Skin tightening",
    },
  ],
} as const;

export const FACELIFT_SEO = {
  title: "Facelift Surgery in Delhi | Care Well Medical Centre",
  description:
    "Facelift in Delhi at Care Well Medical Centre. Surgical & non-surgical options — mini, full, thread lift & HIFU by Dr. Sandeep Bhasin. Cost, recovery & natural results. Book now.",
} as const;

export const FACELIFT_COST_ROWS = [
  { procedure: "Mini Facelift", cost: "₹70,000 – ₹2,50,000" },
  { procedure: "Full Facelift", cost: "₹1,50,000 – ₹3,50,000" },
  { procedure: "Thread Lift", cost: "₹40,000 – ₹1,20,000" },
  { procedure: "Mid-Facelift", cost: "₹1,00,000 – ₹2,50,000" },
  { procedure: "Lower Facelift", cost: "₹1,00,000 – ₹2,80,000" },
  { procedure: "Neck Lift (Standalone)", cost: "₹80,000 – ₹2,00,000" },
  { procedure: "Non-Surgical Facelift (Ultherapy, HIFU, RF)", cost: "₹30,000 – ₹1,50,000" },
] as const;

export const FACELIFT_PAGE = {
  h1: "Facelift in Delhi – Restore Youthful Skin & Define Your Facial Contours",
  subtitle: "Surgical & Non-Surgical Options · South Delhi",
  tagline:
    "Advanced facelift treatments in Delhi — surgical correction or quick non-surgical refresh with safe, natural-looking results.",
  parentLabel: "Plastic Surgery in Delhi",
  parentPath: PLASTIC_SURGERY_PATH,
  treatmentDropdownLabel: "Facelift",
  introParagraphs: [
    "Looking for the best face tightening or facelift in Delhi at an affordable cost? Rejuvenate your facial grace at Care Well Medical Centre. Consult Dr. Sandeep Bhasin regarding the procedure and cost of a facelift in Delhi.",
    "Aging leads to loose skin, fine lines, and volume loss, making your face appear older and tired. At Care Well Medical Centre, Delhi, we offer advanced facelift treatments to restore your youthful glow.",
    "Whether you are considering a surgical facelift for long-term correction or a non-surgical facelift for a quick refresh, our expert team ensures safe, natural-looking, and effective results.",
    "With Dr. Sandeep Bhasin's expertise in cosmetic surgery, we provide customized treatments that tighten skin, smoothen wrinkles, and redefine facial contours for a rejuvenated, confident look.",
  ],
  whatIsHeading: "What is a Facelift?",
  whatIsIntro:
    "A facelift (rhytidectomy) is a cosmetic procedure designed to lift, tighten, and contour the face by reducing sagging skin, deep wrinkles, and signs of aging. This treatment can be surgical or non-surgical, depending on the desired outcome and skin condition.",
  whatIsBenefits: [
    "Eliminates wrinkles and fine lines for a youthful look",
    "Tightens sagging skin for a firm, contoured face",
    "Defines the jawline and reduces double chin",
    "Boosts collagen production, improving skin elasticity",
    "Long-lasting anti-aging effects with natural-looking results",
  ],
  whatIsClosing:
    "Facelifts are customized based on individual skin concerns. Candidates with fewer signs of aging or minor wrinkles on cheeks and jawline can opt for a mini facelift — an outpatient procedure completed in 40–90 minutes.",
  candidateHeading: "Who is an Ideal Candidate for a Facelift?",
  candidateIntro:
    "If you are experiencing visible signs of aging and want to rejuvenate your facial features, a facelift might be the right solution.",
  candidateItems: [
    "Loose or sagging skin around the face and neck",
    "Deep wrinkles, fine lines, or facial creases",
    "Loss of facial volume and contour definition",
    "Aging signs that make you look older than you feel",
    "Good overall health and realistic expectations",
  ],
  candidateClosing:
    "Whether you need a subtle enhancement or a complete transformation, we offer both surgical and non-surgical facelift options to suit your needs.",
  typesHeading: "Types of Facelift in Delhi – Choose What Suits You Best",
  typesIntro:
    "At Care Well Medical Centre, we offer multiple facelift options with customized solutions based on your skin type, aging severity, and expectations.",
  nonSurgicalHeading: "Non-Surgical Facelift (Minimal Downtime, Natural Results)",
  nonSurgicalIntro:
    "For those looking for a quick facial lift without surgery, we provide advanced non-surgical options with minimal recovery time.",
  nonSurgicalItems: [
    "Thread Lift — absorbable threads lift sagging skin and promote collagen",
    "HIFU — ultrasound energy tightens deep skin layers",
    "Dermal Fillers and Botox — restore volume and smoothen wrinkles",
    "Radiofrequency (RF) Skin Tightening — stimulates collagen for firmer skin",
  ],
  nonSurgicalDowntime: "0–2 days",
  nonSurgicalResults: "12–24 months",
  nonSurgicalClosing: "Perfect for individuals who prefer quick enhancements with minimal recovery.",
  surgicalHeading: "Surgical Facelift (Long-Lasting and Dramatic Transformation)",
  surgicalIntro:
    "For individuals with advanced signs of aging, surgical facelifts offer deep correction and long-term results.",
  surgicalItems: [
    "Mini Facelift — targets sagging cheeks and jawline",
    "SMAS Facelift — lifts deep skin layers for overall facial definition",
    "Full Facelift — comprehensive correction for wrinkles, folds, and loose skin",
    "Neck Lift — eliminates turkey neck and tightens jawline",
  ],
  surgicalDowntime: "7–14 days",
  surgicalResults: "8–12 years",
  surgicalClosing: "Best suited for individuals looking for a long-lasting youthful transformation.",
  processHeading: "Step-by-Step Facelift Procedure",
  processIntro:
    "A facelift is a precise procedure designed to lift sagging skin and restore youthful contours.",
  processBefore: [
    "Detailed consultation to analyze facial structure",
    "Discussion on expectations and ideal treatment plan",
    "Pre-surgery guidelines including stopping smoking and medication precautions",
  ],
  processDuring: [
    "Surgical facelift: incisions near the hairline, excess skin removed, deep tissues tightened",
    "Non-surgical facelift: injectables, ultrasound, or threads lift and tighten skin",
    "Final adjustments: skin re-draped for a natural, youthful look",
  ],
  processAfter: [
    "Mild swelling and bruising may occur (subsides within days)",
    "Stitches removed in 7–10 days for surgical facelifts",
    "Gradual improvement in skin tightness and contour definition",
  ],
  processClosing:
    "With Dr. Sandeep Bhasin's expertise, we ensure a safe, comfortable, and effective facelift experience.",
  recoveryHeading: "Recovery and Aftercare – Ensuring the Best Results",
  recoveryIntro: "Proper post-treatment care is crucial for the best facelift results:",
  recoveryItems: [
    "Avoid direct sun exposure to prevent scarring",
    "Sleep with head elevated to reduce swelling",
    "Refrain from strenuous activities for 2–4 weeks",
    "Follow a nutritious diet for enhanced skin healing",
    "Use recommended skincare products for long-lasting effects",
  ],
  recoveryClosing:
    "Most patients witness full results within a few weeks, with continuous improvement over time.",
  resultsLastHeading: "How Long Do Facelift Results Last?",
  resultsLastItems: [
    "Surgical Facelift: results last 8–12 years with proper skincare",
    "Non-Surgical Facelift: effects last 12–24 months, requiring maintenance sessions",
  ],
  resultsLastTip:
    "A proper skincare routine and healthy lifestyle can significantly prolong facelift results.",
  costHeading: "Facelift Cost in Delhi – Affordable and Transparent Pricing",
  costIntro:
    "Estimated prices at Care Well Medical Centre for facelift procedures in Delhi:",
  costFactors: [
    "Type of facelift — mini facelifts and thread lifts cost less than full facelifts",
    "Surgeon's expertise and experience",
    "Technology used — HIFU or laser-assisted techniques may differ in pricing",
    "Additional procedures combined — eyelid surgery, lip lift, or fat grafting",
    "Hospital or clinic facilities and infrastructure",
  ],
  costClosing:
    "Want the exact cost? Schedule a consultation for a personalized estimate. These prices are indicative and vary based on individual requirements.",
  whyClinicHeading: "Why Choose Care Well Medical Centre for Your Facelift in Delhi?",
  whyClinicItems: [
    "20+ years of experience in cosmetic surgery",
    "Facelift procedures by expert surgeon Dr. Sandeep Bhasin",
    "Advanced technology and personalized treatment plans",
    "Natural-looking, long-lasting results",
    "Minimal downtime and quick recovery options",
    "Affordable pricing with no hidden costs",
  ],
  whyClinicClosing:
    "We prioritize safety, precision, and natural beauty — helping you achieve a refreshed, youthful look.",
  consultationHeading: "Book Your Consultation Today and Restore Your Youthful Glow",
  consultationLocation: "Care Well Medical Centre, Chittaranjan Park, Delhi",
  resultsHeading: "Facelift Before and After Results",
  videoHeading: "Facelift Treatment Video",
  faqHeading: "Facelift FAQs",
  faqIntro: "Know the answers to frequently asked questions related to facelift here.",
  disclaimer:
    "Treatment suitability, technique, and results vary between individuals. Facelift procedures should only be performed after consultation with a qualified cosmetic surgeon. This page is for informational purposes and does not replace medical advice.",
} as const;

export const FACELIFT_NON_SURGICAL_LINKS = [
  { href: `${COSMETIC}/thread-lift`, label: "Thread lift in Delhi" },
  { href: `${COSMETIC}/hifu`, label: "HIFU treatment in Delhi" },
  { href: `${COSMETIC}/botox`, label: "Botox in Delhi" },
  { href: `${COSMETIC}/dermal-fillers`, label: "Dermal fillers in Delhi" },
] as const;

export const FACELIFT_SURGICAL_LINKS = [
  { href: "/plastic-surgery-in-delhi/neck-lift", label: "Neck lift in Delhi" },
] as const;

export { HAIR_LOSS_CLINIC as FACELIFT_CLINIC };

export const FACELIFT_FAQS: { question: string; answer: string }[] = [
  {
    question: "How long do facelifts last?",
    answer:
      "A surgical facelift may last up to 10 years with proper skincare, depending on age, health, and skin care habits. Yearly follow-ups with your cosmetic surgeon help maintain results.",
  },
  {
    question: "What is the average cost of a facelift?",
    answer:
      "Facelift cost in Delhi varies by procedure type and complexity. Your plastic surgeon will discuss the full cost after examining your face, including after-surgery medication and care.",
  },
  {
    question: "What is the best treatment for tightening facial skin?",
    answer:
      "Non-surgical options include ultrasound tightening, laser tightening, and injectable fillers. Surgical options include facelift surgery (rhytidectomy). Your surgeon decides after examining your face and neck.",
  },
  {
    question: "How do you sleep after a facelift?",
    answer:
      "Sleep on your back with your head elevated on one or two pillows. A recliner is ideal. Avoid sleeping on your sides to prevent rubbing the face against bedding.",
  },
  {
    question: "What age is best for a facelift?",
    answer:
      "While some inquire in their 30s, best practice is typically after signs of aging become noticeable in the mid-40s onward. Your surgeon recommends treatment after examining your skin health.",
  },
  {
    question: "What is the recovery time for a facelift?",
    answer:
      "Normal recovery is about two weeks, depending on procedure type, surgeon experience, and clinic facilities. An experienced surgeon and modern equipment support faster recovery.",
  },
  {
    question: "How can I tighten loose skin on my face?",
    answer:
      "Approved procedures include laser resurfacing, chemical peels, RF treatments, neuromodulators, ultrasound tightening, and surgical facelift. Some patients need a combination of treatments.",
  },
  {
    question: "How do I prepare for a facelift?",
    answer:
      "Your doctor will advise based on lifestyle and health history. Blood tests may be needed for chronic conditions. Follow all pre-surgery instructions carefully.",
  },
  {
    question: "What is a non-surgical facelift?",
    answer:
      "Minimally invasive options include LED therapy, Botox fillers, Thermage, Ultherapy, laser resurfacing, and thread lifts. One or a combination may be recommended for your goals.",
  },
  {
    question: "What is a mid-facelift?",
    answer:
      "A mid-facelift targets sagging cheeks and cheek wrinkles. It is typically a day-care procedure best performed by an experienced cosmetic surgeon in a trusted clinic.",
  },
];
