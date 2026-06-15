import { BODY_CONTOURING_PATH } from "@/data/body-contouring-in-delhi";
import { HAIR_LOSS_CLINIC } from "@/data/hair-loss-treatment-in-delhi";

export const CRYOLIPOLYSIS_PATH = "/body-contouring-in-delhi/cryolipolysis" as const;

export const CRYOLIPOLYSIS_IMAGES = {
  hero: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517816/carewell-media/site/demo/wellness-card.jpg",
    alt: "Cryolipolysis fat freezing treatment in Delhi at Care Well Medical Centre",
  },
  whatIs: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517815/carewell-media/site/demo/skin-aesthetic-card.jpg",
    alt: "CoolShape cryolipolysis fat freezing technology",
  },
  doctor: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517806/carewell-media/site/demo/doctor-profile-feature-vertical.png",
    alt: "Dr. Sandeep Bhasin — cryolipolysis expert in Delhi",
  },
  videoPoster: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517807/carewell-media/site/demo/doctor-profile-feature.jpg",
    alt: "Cryolipolysis treatment video — Care Well Medical Centre",
  },
  beforeAfter: [
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517894/carewell-media/wp/liposuction-surgery-carewell-min.jpg`,
      alt: "Cryolipolysis in Delhi – Before and After Results",
      caption: "Abdomen fat reduction",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517874/carewell-media/wp/double-chin-removal-carewell.webp`,
      alt: "Before and After Fat Freezing Treatment in Delhi",
      caption: "Double chin contouring",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517893/carewell-media/wp/tummy-tuck-surgery-carewell-min.jpg`,
      alt: "Cryolipolysis male abdomen before and after in Delhi",
      caption: "Waist reshaping",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517874/carewell-media/wp/double-chin-removal-carewell.webp`,
      alt: "Cryolipolysis side belly fat reduction before and after Delhi",
      caption: "Love handles treatment",
    },
  ],
} as const;

export const CRYOLIPOLYSIS_SEO = {
  title: "Cryolipolysis (Fat Freezing) in Delhi | Non-Surgical Fat Reduction | Care Well Medical Centre",
  description:
    "Cryolipolysis in Delhi at Care Well Medical Centre. FDA-approved fat freezing for abdomen, thighs, arms & chin. No surgery, no downtime. Dr. Sandeep Bhasin. Book now.",
} as const;

export const CRYOLIPOLYSIS_COST_ROWS = [
  { area: "Abdomen", range: "₹40,000 – ₹80,000" },
  { area: "Thighs (Inner/Outer)", range: "₹35,000 – ₹75,000" },
  { area: "Love Handles (Flanks)", range: "₹30,000 – ₹60,000" },
  { area: "Arms", range: "₹25,000 – ₹50,000" },
  { area: "Double Chin", range: "₹20,000 – ₹40,000" },
  { area: "Hips & Buttocks", range: "₹35,000 – ₹70,000" },
] as const;

export const CRYOLIPOLYSIS_PAGE = {
  h1: "Cryolipolysis in Delhi – Safe and Effective Fat Freezing Treatment",
  subtitle: "Non-Surgical Fat Freezing · South Delhi",
  tagline:
    "Cryolipolysis (fat freezing) in Delhi — safe, FDA-approved treatment to reduce stubborn fat from abdomen, thighs, chin, and arms without surgery or downtime.",
  parentLabel: "Body Contouring in Delhi",
  parentPath: BODY_CONTOURING_PATH,
  treatmentDropdownLabel: "Cryolipolysis",
  introHeading: "Achieve a Slimmer Body with Cryolipolysis in Delhi",
  introParagraphs: [
    "Struggling with stubborn fat that won't go away? Cryolipolysis (fat freezing) is a safe, FDA-approved, non-surgical treatment that targets and eliminates unwanted fat cells without surgery or downtime.",
    "Care Well Medical Centre uses advanced cryolipolysis technology to freeze stubborn fat cells so your body eliminates them naturally. The procedure is painless, comfortable, and requires no downtime.",
    "Results become visible after a few weeks, with multiple sessions recommended for best outcomes. Cryolipolysis is ideal for individuals who struggle to eliminate stubborn fat through diet and exercise alone.",
    "Our team reduces fat from the abdomen, thighs, love handles, upper arms, back, and chin using modern diagnostic and treatment techniques with personalized attention.",
  ],
  hubLinkNote:
    "Explore all non-surgical and surgical shaping options in our main guide on body contouring in Delhi.",
  whyUsHeading: "Why Take Our Cryolipolysis Treatment?",
  whyUsItems: [
    "Procedure done at a major cosmetic center in South Delhi",
    "Complete procedure under dermatologist supervision",
    "Proper consultation before treatment with expected results",
    "Latest brand-new CoolShape machine",
    "Sessions of 45 to 60 minutes for each patient",
    "No hidden costs",
  ],
  whatIsHeading: "What is Cryolipolysis (Fat Freezing)?",
  whatIsParagraphs: [
    "Cryolipolysis is an advanced body contouring treatment that freezes and destroys fat cells using controlled cooling technology. This non-invasive procedure gradually reduces fat in targeted areas for a more sculpted, toned appearance.",
    "Known as fat freezing, cryolipolysis is non-surgical — unlike liposuction. The treatment applies controlled cooling to about -5°C for non-surgical reduction of localized fat pockets.",
    "Cooling exposure causes subcutaneous fat cells to die without damaging overlying skin. At Care Well Medical Centre in Delhi, we use quality branded machines to reduce fat cells safely and effectively.",
  ],
  benefits: [
    "Non-surgical & painless — no incisions, anesthesia, or recovery time",
    "Permanent fat reduction — eliminates fat cells that do not return",
    "Quick & convenient — sessions last 35–60 minutes with no downtime",
    "Targets stubborn fat — abdomen, thighs, arms, and love handles",
    "Clinically proven — FDA-approved with noticeable improvements in weeks",
  ],
  historyHeading: "History of Cryolipolysis",
  historyBody:
    "Cryolipolysis has roots in cryotherapy. In 2005, Drs. Dieter Manstein and R. Rox Anderson at Harvard Medical School introduced it based on popsicle panniculitis — cold exposure naturally reducing fat in specific areas. Controlled cooling gradually destroys fat cells over two to three months, achieving 22–23% fat reduction after each session. Advanced technology has since improved safety and long-lasting results worldwide.",
  areasHeading: "Cryolipolysis Treatment Areas",
  areasIntro: "This fat-freezing treatment can effectively target multiple areas, including:",
  treatmentAreas: [
    "Abdomen & belly fat",
    "Thighs (inner & outer)",
    "Love handles (flanks)",
    "Arms & back fat",
    "Double chin",
  ],
  whyChooseHeading: "Why Choose Our Cryolipolysis Treatment in Delhi?",
  whyChooseIntro:
    "Care Well Medical Centre is a holistic wellness and cosmetic surgery clinic offering cryolipolysis as a specialized inch-loss treatment under Dr. Sandeep Bhasin.",
  whyChooseItems: [
    "Expert specialists — performed by trained professionals",
    "Latest technology — FDA-approved equipment ensuring safety",
    "Personalized treatment plans tailored to your body goals",
    "Proven results — hundreds of satisfied clients",
  ],
  whyChooseClosing:
    "Dr. Sandeep Bhasin is a senior cosmetic surgeon certified by the Indian Medical Council. We use premium machines with Teflon handles to minimize frostbite risk — inferior machines increase side effect risks. Our skilled staff excels in surgical and non-surgical care with exceptional customer service.",
  costHeading: "What is the Cost of Cryolipolysis?",
  costIntro:
    "The cost of cryolipolysis in Delhi varies based on targeted areas, number of sessions, and clinic expertise.",
  costClosing: "For a personalized quote, book a consultation today.",
  conclusionHeading: "Conclusion",
  conclusionParagraphs: [
    "Cryolipolysis assures considerable fat cell reduction without surgical risks like skin infections or bleeding. It is a safe, stable way to reduce stubborn fat at a reasonable cost in Delhi.",
    "Owing to convenience, comfort, and affordability, the treatment is credible and authentic. CoolSculpting-style fat freezing is an excellent alternative for belly fat and inch loss.",
  ],
  resultsHeading: "Cryolipolysis Before and After Results",
  resultsIntro:
    "Many patients see visible fat reduction within 3–4 weeks, with full results in 2–3 months. Results last long because the body naturally eliminates frozen fat cells over time.",
  consultationHeading: "Book Your Cryolipolysis Consultation Today",
  consultationBody:
    "Ready to get rid of stubborn fat without surgery? Schedule your cryolipolysis consultation in Delhi. Our team will assess your needs and create a personalized fat reduction plan.",
  faqHeading: "Cryolipolysis FAQs",
  disclaimer:
    "Treatment suitability and results vary between individuals. Cryolipolysis should only be performed after consultation with a qualified medical professional. This page is for informational purposes and does not replace medical advice.",
} as const;

export { HAIR_LOSS_CLINIC as CRYOLIPOLYSIS_CLINIC };

export const CRYOLIPOLYSIS_FAQS: { question: string; answer: string }[] = [
  {
    question: "What treatments did doctors use before cryolipolysis?",
    answer:
      "Before cryolipolysis, doctors used radiofrequency, ultrasound, and laser treatments. RF used heat to destroy fat; ultrasound broke down fat with sound waves; lasers used light energy — each with different approaches to fat elimination.",
  },
  {
    question: "What are the benefits of cryolipolysis?",
    answer:
      "Cryolipolysis is non-surgical with no recovery time, more affordable than surgery, and avoids anesthesia-related risks. Results are long-lasting when you maintain moderate weight — ideal for stubborn fat diet and exercise cannot eliminate.",
  },
  {
    question: "What can patients expect after cryolipolysis?",
    answer:
      "Resume normal activities immediately. Sessions vary by fat distribution and area. Visible changes appear within 2–4 months as fat bulges gradually reduce for a more sculpted body.",
  },
  {
    question: "How does cryolipolysis work?",
    answer:
      "An applicator cools targeted fat below body temperature, triggering an inflammatory response that destroys fat cells. You feel cold initially, then numbness. Over months, the body naturally eliminates fat for a sculpted shape.",
  },
  {
    question: "How long does a cryolipolysis session take?",
    answer:
      "Typically 45–60 minutes depending on areas treated. Modern systems allow multiple areas in one visit for greater efficiency.",
  },
  {
    question: "Are cryolipolysis results permanent?",
    answer:
      "Cryolipolysis permanently reduces treated fat cells. Maintaining a healthy diet and stable lifestyle preserves results long term.",
  },
  {
    question: "Which areas can cryolipolysis target?",
    answer:
      "Belly, love handles, thighs, arms, double chin, back, and small fat pockets under the buttocks — multiple areas for a more sculpted appearance.",
  },
  {
    question: "Who is a good candidate for cryolipolysis?",
    answer:
      "Best candidates have healthy weight (not overweight), small pockets of unwanted fat in specific areas, and want inch loss rather than overall weight loss treatment.",
  },
  {
    question: "Are there any side effects of cryolipolysis?",
    answer:
      "Mild redness, swelling, or temporary numbness may occur and usually resolve within days. Choose a clinic led by an experienced doctor to minimize risks.",
  },
  {
    question: "How long do the results of cryolipolysis last?",
    answer:
      "Results last long when you follow a balanced diet and active lifestyle to prevent new fat pockets from forming.",
  },
  {
    question: "What should I avoid after cryolipolysis?",
    answer:
      "Return to regular activity immediately but avoid heavy physical exercise for a day or two.",
  },
  {
    question: "Can I eat after cryolipolysis?",
    answer:
      "Yes — there is no downtime and no dietary restrictions after this non-invasive treatment.",
  },
  {
    question: "Is fat freezing effective for large areas of fat?",
    answer:
      "Fat freezing is not for large fat deposits. It works best as inch-loss treatment rather than a weight-loss solution.",
  },
  {
    question: "What temperature do cryolipolysis applicators use?",
    answer:
      "Applicators reach -5°C to -10°C — cold enough to eliminate fat cells while leaving skin unharmed.",
  },
  {
    question: "Will cryolipolysis cause loose skin?",
    answer:
      "Most people do not experience loose skin. If it occurs, doctors can address it with skin-tightening procedures.",
  },
];
