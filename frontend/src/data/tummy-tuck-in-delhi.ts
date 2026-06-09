import { PLASTIC_SURGERY_PATH } from "@/data/plastic-surgery-in-delhi";
import { HAIR_LOSS_CLINIC } from "@/data/hair-loss-treatment-in-delhi";

export const TUMMY_TUCK_PATH = "/plastic-surgery-in-delhi/tummy-tuck" as const;

const WP = "https://www.carewellmedicalcentre.com/wp-content/uploads";

export const TUMMY_TUCK_IMAGES = {
  hero: {
    src: `${WP}/2025/04/tummy-tuck-surgery-carewell-min.jpg`,
    alt: "Tummy tuck surgery before and after showing a flatter abdomen at Care Well Medical Centre Delhi",
  },
  doctor: {
    src: "/demo/doctor-profile-feature-vertical.png",
    alt: "Dr. Sandeep Bhasin — tummy tuck surgeon in Delhi",
  },
  videoPoster: {
    src: "/demo/doctor-profile-feature.png",
    alt: "Tummy tuck procedure at Care Well Medical Centre",
  },
  beforeAfter: [
    {
      src: `${WP}/2025/04/tummy-tuck-surgery-carewell-min.jpg`,
      alt: "Tummy tuck before and after results in Delhi",
      caption: "Flatter abdomen",
    },
    {
      src: `${WP}/2025/04/liposuction-surgery-carewell-min.jpg`,
      alt: "Abdominoplasty body contouring Delhi",
      caption: "Sculpted midsection",
    },
    {
      src: `${WP}/2025/04/mommy-makeover-min.jpg`,
      alt: "Post-pregnancy tummy tuck results Delhi",
      caption: "Post-pregnancy contour",
    },
  ],
} as const;

export const TUMMY_TUCK_SEO = {
  title:
    "Tummy Tuck Surgery in Delhi – Achieve a Toned & Sculpted Abdomen | Care Well Medical Centre",
  description:
    "Tummy tuck surgery in Delhi at Care Well Medical Centre. Mini, full & extended abdominoplasty by Dr. Sandeep Bhasin. Cost, recovery & before-after results. Book consultation.",
} as const;

export type TummyTuckType = {
  title: string;
  body: string;
  bullets: string[];
};

export const TUMMY_TUCK_TYPES: TummyTuckType[] = [
  {
    title: "1. Mini Tummy Tuck (Partial Abdominoplasty)",
    body: "Ideal for a small amount of excess skin or fat in the lower abdomen. Smaller incision and typically shorter recovery than a full tummy tuck.",
    bullets: [
      "Best for mild sagging and lower belly fat",
      "Small incision made below the navel",
      "Ideal for post-pregnancy or mild weight loss cases",
    ],
  },
  {
    title: "2. Full Tummy Tuck (Traditional Abdominoplasty)",
    body: "Suitable for significant excess skin and fat. Incision from hip to hip with muscle tightening and navel repositioning.",
    bullets: [
      "Best for moderate to severe loose skin and muscle separation",
      "Incision from hip to hip with navel repositioning",
      "Ideal for post-pregnancy recovery and significant weight loss",
    ],
  },
  {
    title: "3. Extended Tummy Tuck",
    body: "Variation of full abdominoplasty with incision extending around the hips for patients with excess skin on abdomen, flanks, and hips.",
    bullets: [
      "Best for severe sagging and excess skin on abdomen and flanks",
      "Incision extends beyond the hips for 360-degree contouring",
      "Ideal for post-bariatric and massive weight loss transformations",
    ],
  },
  {
    title: "4. Circumferential Tummy Tuck (Belt Lipectomy)",
    body: "Often combines liposuction with abdominoplasty for full-body contouring after extreme weight loss.",
    bullets: [
      "Best for full-body contouring after extreme weight loss",
      "Removes loose skin from abdomen, flanks and lower back",
      "Ideal for patients who lost 50+ kg after bariatric surgery",
    ],
  },
];

export const TUMMY_TUCK_COST_ROWS = [
  { procedure: "Mini Tummy Tuck", cost: "₹80,000 – ₹1,50,000" },
  { procedure: "Full Tummy Tuck", cost: "₹1,50,000 – ₹2,50,000" },
  { procedure: "Extended Tummy Tuck", cost: "₹2,50,000 – ₹3,50,000" },
  { procedure: "Circumferential Tummy Tuck", cost: "₹3,50,000 – ₹5,00,000" },
  { procedure: "Consultation Fee", cost: "₹1,000 – ₹2,000" },
  { procedure: "Hospital & Anesthesia Charges", cost: "₹15,000 – ₹30,000" },
  { procedure: "Post-Surgery Garments & Medications", cost: "₹5,000 – ₹15,000" },
] as const;

export const TUMMY_TUCK_PAGE = {
  h1: "Tummy Tuck Surgery in Delhi – Achieve a Toned & Sculpted Abdomen",
  subtitle: "Abdominoplasty · Expert Surgeon · CR Park",
  tagline: "Get rid of loose skin and excess fat with abdominoplasty — a firmer, flatter, well-defined stomach.",
  parentLabel: "Plastic Surgery in Delhi",
  parentPath: PLASTIC_SURGERY_PATH,
  treatmentDropdownLabel: "Tummy Tuck",
  introParagraphs: [
    "Struggling with loose abdominal skin, stubborn fat, or weak abdominal muscles despite diet and exercise? Tummy tuck surgery in Delhi at Care Well Medical Centre can help you achieve a firmer, flatter, and well-defined stomach.",
    "Whether caused by pregnancy, weight loss, or aging, this procedure removes excess skin, tightens muscles, and enhances abdominal contour for a toned and youthful appearance.",
    "At Care Well Medical Centre, Dr. Sandeep Bhasin specializes in advanced tummy tuck techniques, ensuring natural-looking results with minimal downtime.",
  ],
  welcomeHeading: "Welcome to Care Well Medical Centre – The Leading Tummy Tuck Surgery Clinic in Delhi",
  welcomeParagraphs: [
    "We understand the frustration that can come with stubborn abdominal fat, loose skin, or weakened muscles that do not respond to diet and exercise.",
    "Our expert plastic surgeons specialize in advanced tummy tuck procedures to help you achieve your ideal body shape.",
  ],
  whyConsiderHeading: "Why Consider a Tummy Tuck in Delhi?",
  whyConsiderItems: [
    "Struggling with loose abdominal skin after pregnancy or weight loss?",
    "Unable to get rid of stubborn belly fat despite a healthy lifestyle?",
    "Experiencing stretched abdominal muscles that cause bulging?",
  ],
  whyConsiderClosing:
    "Our tummy tuck surgery in Delhi can help you regain a tighter, toned stomach and restore your confidence.",
  achieveHeading: "Achieve a Slimmer, More Toned Look with Abdominoplasty",
  achieveBody:
    "Our skilled surgeons use advanced abdominoplasty techniques to deliver safe and long-lasting results — whether after pregnancy, weight loss, or to enhance abdominal contour.",
  achieveClosing:
    "If you are searching for the best tummy tuck clinic in Delhi, choose Care Well Medical Centre for exceptional care and transformative results.",
  whatIsHeading: "What is Tummy Tuck (Abdominoplasty) Surgery?",
  whatIsIntro:
    "A tummy tuck, also known as abdominoplasty, is a cosmetic surgery that removes excess skin and fat from the abdomen while tightening the abdominal muscles for a flatter, firmer, more toned look.",
  whatIsItems: [
    "Removes excess skin and fat from the abdomen",
    "Tightens weakened or separated abdominal muscles (diastasis recti repair)",
    "Redefines waistline for a slimmer, more sculpted midsection",
  ],
  whatIsClosing:
    "Ideal after significant weight loss, pregnancy, or aging-related loose skin. Unlike liposuction, which only removes fat, a tummy tuck also tightens muscles and eliminates excess skin.",
  liposuctionHref: "/plastic-surgery-in-delhi/liposuction",
  candidateHeading: "Who is an Ideal Candidate for Tummy Tuck Surgery?",
  candidateItems: [
    "Loose abdominal skin due to pregnancy, weight loss, or aging",
    "Stretched abdominal muscles after childbirth (post-pregnancy belly)",
    "Stubborn belly fat that does not respond to diet and exercise",
    "Sagging skin after bariatric surgery",
    "Men and women seeking a defined waistline and flatter stomach",
  ],
  candidateClosing:
    "You should be in good overall health, maintain a stable weight, and have realistic expectations from the procedure.",
  benefitsHeading: "Benefits of Tummy Tuck Surgery",
  benefitsIntro:
    "A tummy tuck enhances abdominal contour and improves physical health and confidence:",
  benefitsItems: [
    "Improved abdominal contour — firmer, flatter stomach",
    "Reduced stretch marks on the lower abdomen",
    "Boosts confidence and self-esteem",
    "Improves posture and core strength",
    "Relieves back pain by reducing spinal strain",
    "Long-lasting results with a healthy lifestyle",
  ],
  benefitsClosing:
    "Consult Dr. Sandeep Bhasin to see if a tummy tuck is right for you and achieve your desired body goals.",
  typesHeading: "Types of Tummy Tuck Surgery",
  typesIntro:
    "At Care Well Medical Centre, we offer customized tummy tuck techniques based on your body type and aesthetic goals:",
  typesClosing:
    "Dr. Sandeep Bhasin will recommend the best technique based on your body structure and goals.",
  processHeading: "How is Tummy Tuck Surgery Performed?",
  processIntro:
    "Tummy tuck surgery is performed under general anesthesia and takes 2–5 hours, depending on the extent of the procedure.",
  processSteps: [
    "Anesthesia administration for a pain-free experience",
    "Incision placement along the bikini line",
    "Excess skin and fat removal",
    "Abdominal muscle tightening for a firm core",
    "Navel repositioning (for full tummy tuck)",
    "Skin redraping and careful closure",
    "Recovery dressing and compression garments",
  ],
  processClosing:
    "Liposuction may be combined with a tummy tuck for enhanced body contouring.",
  recoveryHeading: "Recovery and Aftercare",
  recoveryIntro:
    "Recovery varies based on procedure extent and individual health. Most patients return to work within 2–4 weeks; full recovery can take several months.",
  recoveryPhases: [
    {
      title: "First Few Days",
      items: [
        "Swelling, bruising, and mild discomfort that gradually improves",
        "Pain medication prescribed to manage discomfort",
        "Bed rest recommended with light movement to prevent blood clots",
      ],
    },
    {
      title: "2–4 Weeks After Surgery",
      items: [
        "Return to light activities; avoid heavy lifting and strenuous workouts",
        "Wear compression garment for 4–6 weeks to reduce swelling",
      ],
    },
    {
      title: "3–6 Months After Surgery",
      items: [
        "Full results visible as swelling subsides",
        "Follow healthy diet and exercise to maintain abdominal shape",
      ],
    },
  ],
  recoveryIncisionNote:
    "Follow Dr. Sandeep Bhasin's postoperative instructions for proper incision care and wound healing.",
  recoveryClosing:
    "We provide personalized recovery guidance to ensure safe healing and long-lasting results.",
  risksHeading: "Risks and Potential Side Effects",
  risksIntro:
    "While a tummy tuck provides dramatic improvements, be aware of possible side effects:",
  risksItems: [
    "Scarring — incision scars fade over time but remain visible",
    "Swelling and numbness — temporary, improving within weeks",
    "Infection and bleeding — rare, minimized with proper care",
    "Fluid accumulation (seroma) — prevented with drains and compression garments",
    "Blood clots — reduced with post-surgery movement and compression",
    "Poor wound healing — follow post-op care instructions carefully",
  ],
  risksClosing:
    "Choosing an experienced plastic surgeon like Dr. Sandeep Bhasin significantly minimizes complications.",
  costHeading: "Tummy Tuck Surgery Cost in Delhi",
  costIntro:
    "At Care Well Medical Centre, Dr. Sandeep Bhasin ensures affordable, high-quality treatment. Cost varies based on surgical technique, surgeon expertise, and hospital facilities.",
  costFactors: [
    "Type of tummy tuck — mini, full, or extended abdominoplasty",
    "Extent of procedure — more extensive fat and skin removal increases cost",
    "Surgeon's expertise — board-certified plastic surgeon",
    "Hospital and anesthesia charges",
    "Post-surgical care — follow-ups, garments, and medications",
  ],
  costTableHeading: "Tummy Tuck Surgery Cost Breakdown",
  costPackageNote:
    "Cost includes pre-operative consultation, surgery, post-operative care, and follow-up visits.",
  costClosing: "Consult Dr. Sandeep Bhasin today to discuss pricing and explore the best options for your goals.",
  resultsHeading: "Tummy Tuck Before and After Results",
  resultsIntro:
    "A tummy tuck delivers dramatic improvements — removing excess skin, fat, and tightening muscles for a transformed abdominal contour.",
  resultsExpectHeading: "What to Expect After a Tummy Tuck?",
  resultsExpectItems: [
    "Flatter, firmer abdomen with a toned, sculpted look",
    "Elimination of stubborn belly fat diet and exercise alone may not address",
    "Improved posture and core strength from tightened muscles",
    "More defined waistline and balanced body contour",
    "Long-lasting results with a healthy lifestyle",
  ],
  resultsClosing:
    "Schedule a consultation to see before and after images and understand how a tummy tuck can enhance your body shape.",
  whyClinicHeading: "Why Choose Care Well Medical Centre for Tummy Tuck Surgery?",
  whyClinicItems: [
    "Experienced surgeon — Dr. Sandeep Bhasin, board-certified with extensive abdominoplasty experience",
    "Personalized treatment plans for natural, satisfying results",
    "State-of-the-art facilities for a safe, hygienic surgical experience",
    "Affordable, transparent pricing with no hidden costs",
    "Excellent patient reviews reflecting dedication to top-notch care",
  ],
  doctorHeading: "Why Choose Dr. Sandeep Bhasin for Tummy Tuck Surgery in Delhi?",
  doctorItems: [
    "17+ years of experience in cosmetic and plastic surgery",
    "Board-certified and highly skilled surgeon",
    "State-of-the-art facility and latest surgical techniques",
    "Minimal scarring and faster recovery methods",
    "Personalized treatment plans for natural-looking results",
    "Affordable, transparent pricing with no hidden costs",
  ],
  consultationHeading: "Book Your Consultation for Tummy Tuck Surgery in Delhi",
  consultationBody:
    "Want a toned, sculpted, and youthful abdomen? Schedule a consultation with Dr. Sandeep Bhasin at Care Well Medical Centre today. Reclaim your confidence with a beautifully contoured stomach.",
  faqHeading: "Tummy Tuck FAQs",
  disclaimer:
    "Treatment suitability, surgical technique, and results vary between individuals. Tummy tuck surgery should only be performed after consultation with a qualified plastic surgeon. This page is for informational purposes and does not replace medical advice.",
} as const;

export { HAIR_LOSS_CLINIC as TUMMY_TUCK_CLINIC };

export const TUMMY_TUCK_FAQS: { question: string; answer: string }[] = [
  {
    question: "What is tummy tuck surgery?",
    answer:
      "A tummy tuck (abdominoplasty) removes excess skin and fat from the abdomen, tightens abdominal wall muscles, and reshapes the area for a flatter, smoother appearance.",
  },
  {
    question: "Who is a good candidate for tummy tuck surgery?",
    answer:
      "Good candidates have excess abdominal skin and fat unresponsive to diet and exercise, are in good health, do not smoke, and have realistic expectations.",
  },
  {
    question: "What happens during tummy tuck surgery?",
    answer:
      "The surgeon makes an incision along the lower abdomen, removes excess skin and fat, tightens muscles, closes the incision, and applies a compression garment.",
  },
  {
    question: "Is tummy tuck safe?",
    answer:
      "Generally safe when performed by a qualified, experienced surgeon. Risks exist with any surgery but are minimized by following pre- and post-operative instructions.",
  },
  {
    question: "What is the recovery process like after tummy tuck surgery?",
    answer:
      "Recovery takes several weeks. Wear a compression garment, expect swelling and bruising, return to light work in 2–4 weeks, and avoid strenuous activity for longer.",
  },
  {
    question: "How long do tummy tuck results last?",
    answer:
      "Results can last many years with stable weight and a healthy lifestyle. Weight gain or pregnancy can affect long-term outcomes.",
  },
  {
    question: "How much does a tummy tuck cost in Delhi?",
    answer:
      "Cost typically ranges from ₹80,000 for mini procedures to ₹5,00,000+ for circumferential abdominoplasty, depending on extent and surgeon expertise.",
  },
  {
    question: "What is the difference between a tummy tuck and liposuction?",
    answer:
      "A tummy tuck removes excess skin, tightens muscles, and reshapes the abdomen. Liposuction removes fat only and does not address loose skin or muscle separation.",
  },
  {
    question: "How soon after pregnancy can you get a tummy tuck?",
    answer:
      "Wait at least 6 months to a year after giving birth so the body can heal and the abdominal area stabilizes before considering abdominoplasty.",
  },
  {
    question: "How long do you wear a compression garment after a tummy tuck?",
    answer:
      "Typically 4–6 weeks as directed by your surgeon to reduce swelling and support proper healing.",
  },
];
