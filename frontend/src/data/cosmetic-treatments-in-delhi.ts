export const COSMETIC_TREATMENTS_PATH = "/cosmetic-treatments-in-delhi" as const;

export const COSMETIC_TREATMENTS_SEO = {
  title:
    "Best Cosmetic Treatments in Delhi | Skin, Face & Body Solutions | Care Well Medical Centre",
  description:
    "Best cosmetic treatments in Delhi for skin, face, and body at Care Well Medical Centre. Expert care with natural, lasting results. Book now.",
} as const;

export const COSMETIC_TREATMENTS_PAGE = {
  h1: "Cosmetic Treatments in Delhi",
  tagline:
    "Glow with Care Well Medical Centre’s innovative cosmetic treatments — safe, effective, and tailored to your goals.",
  introHeading:
    "Glow with Care Well Medical Centre’s Innovative Cosmetic Treatments in Delhi",
  introParagraphs: [
    "Want to enhance your beauty and confidence, and achieve a natural look? Visit Care Well Medical Centre for various cosmetic treatments in Delhi. The state-of-the-art technology, coupled with advanced techniques, offers you a safe, effective, and aesthetic experience.",
    "Care Well Medical Centre in Delhi offers cosmetic treatments designed just for you. Whether you want to refresh your look, regain confidence, or highlight your natural beauty, our expert team uses advanced technology to deliver safe and lasting results. Schedule your consultation today and take the first step toward glowing skin and a youthful appearance.",
  ],
  portfolioHeading: "Exploring Our Cosmetic Treatment Portfolio in Delhi",
  whyTrustHeading: "Why Trust Care Well Medical Centre for Cosmetic Treatments in Delhi?",
  whyTrustParagraphs: [
    "At Care Well Medical Centre, you are in safe hands. Our experienced specialists bring deep expertise and use advanced technology to deliver cosmetic treatments that are both effective and minimally invasive. We understand that every patient is unique, so we tailor each procedure to your individual needs. From your first visit through recovery, we prioritize your comfort and safety. Our goal is to help you achieve natural-looking, long-lasting results that boost your confidence. Many patients trust us for our genuine care and proven outcomes.",
  ],
  appointmentHeading: "Fix Your Appointment Today for a Glowy Tomorrow!",
  appointmentBody:
    "Enhance your natural beauty with professional cosmetic treatments in Delhi. Schedule a consultation at Care Well Medical Centre and take the first step toward flawless skin and a youthful appearance.",
  faqHeading: "Check Out Frequently Asked Questions (FAQs) on Cosmetic Treatments",
  treatmentDropdownLabel: "Cosmetic Treatments",
} as const;

export type CosmeticTreatmentCard = {
  title: string;
  excerpt: string;
  href: string;
  image: string;
};

/** Normalize legacy absolute URLs to on-site paths (redirects handle child treatments). */
function toLocalPath(href: string): string {
  try {
    const pathname = new URL(href).pathname;
    return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  } catch {
    return href;
  }
}

export const COSMETIC_TREATMENT_CARDS: CosmeticTreatmentCard[] = [
  {
    title: "Lip Augmentation",
    excerpt:
      "Plump, define, and balance your lips with safe and tailored lip augmentation options. Restore youthful volume using advanced dermal fillers or fat grafting.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/cosmetic-treatments-in-delhi/lip-augmentation/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/05/lip-augmentation.webp",
  },
  {
    title: "Brow Lift",
    excerpt:
      "You would not stop appreciating a refreshed, lifted look. What’s more, this can help fix your droopy eyelids or tired brows. You get rejuvenated safely and quickly.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/cosmetic-treatments-in-delhi/brow-lift/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/05/eyebrow-lift-carewell.webp",
  },
  {
    title: "Thread Lift",
    excerpt:
      "Achieve a subtle lift and firmer skin with our non-surgical thread lift. Best for early sagging and contouring your facial profile without downtime.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/cosmetic-treatments-in-delhi/thread-lift/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/05/thread-lift-carewell.webp",
  },
  {
    title: "HIFU Treatment",
    excerpt:
      "Welcome HIFU – a safe and no-downtime facelift alternative. With this, collagen production rises, helping tighten your loose skin and reverse early aging signs.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/cosmetic-treatments-in-delhi/hifu/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/05/hifu-Treatment-carewell.webp",
  },
  {
    title: "Double Chin Removal",
    excerpt:
      "Say goodbye to stubborn chin fat. Our non-surgical double chin removal treatments help sculpt your jawline and improve profile definition in just a few sessions.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/cosmetic-treatments-in-delhi/double-chin-removal/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/05/double-chin-removal-carewell.webp",
  },
  {
    title: "Face Slimming",
    excerpt:
      "Reshape and contour your face naturally. Because our face-slimming treatments target fat, minimize puffiness, and redefine your jawline without surgery.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/cosmetic-treatments-in-delhi/face-slimming/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/05/face-slimming-carewell.webp",
  },
  {
    title: "Vampire Facelift",
    excerpt:
      "Time to use Vampire Facelift to rejuvenate dull, aging skin using your body’s natural healing potential. It improves your texture and glow by increasing collagen production.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/cosmetic-treatments-in-delhi/vampire-facelift/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/05/vampire-facelift-carewell.webp",
  },
  {
    title: "Dermal Fillers",
    excerpt:
      "Our high-quality dermal fillers smooth wrinkles, restore lost volume or enhance lips. Get instant results with the least downtime.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/cosmetic-treatments-in-delhi/dermal-fillers/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/05/dermal-fillers-carewell.webp",
  },
  {
    title: "Laser Hair Removal",
    excerpt:
      "This method ensures safe and permanent hair removal from the entire body and areas such as the face, arms, and legs.",
    href: toLocalPath(
      "https://carewellmedicalcentre.com/cosmetic-treatments-in-delhi/laser-hair-removal/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/05/laser-hair-removal.jpg",
  },
  {
    title: "Botox",
    excerpt:
      "Say NO to wrinkles. Redefine your features. Rejuvenate your skin. All through our expert Botox treatments designed for jawline, neck, forehead, and more.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/cosmetic-treatments-in-delhi/botox/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/05/botox-treatment-carewell.webp",
  },
  {
    title: "Anti-Aging Treatments",
    excerpt:
      "Recover your old glow using our customized anti-aging treatment solutions and caring approach.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/cosmetic-treatments-in-delhi/anti-aging/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/05/anti-aging-treatments-carewell.webp",
  },
  {
    title: "Carbon Laser Facial",
    excerpt:
      "Advanced laser facial for clearer, brighter skin — available soon at Care Well Medical Centre.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/skin-treatments-in-delhi/carbon-laser-facial/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/04/carbon-laser-facial.webp",
  },
];

export const COSMETIC_TREATMENTS_FAQS: { question: string; answer: string }[] = [
  {
    question: "What are cosmetic treatments?",
    answer:
      "Cosmetic treatments are procedures designed to refresh your skin, face, and body. They help enhance your natural beauty safely and effectively.",
  },
  {
    question: "What types of cosmetic treatments do you offer?",
    answer:
      "We offer a wide range of cosmetic treatments including skin rejuvenation, lip augmentation, thread lifts, Botox, laser hair removal, and anti-aging therapies. Each treatment is personalized to meet your unique goals.",
  },
  {
    question: "Are cosmetic treatments safe?",
    answer:
      "Yes, when performed by certified experts, cosmetic treatments are safe. Our team follows advanced technology and strict safety protocols.",
  },
  {
    question: "How do I know which treatment is right for me?",
    answer:
      "Our expert team will assess your skin and concerns during a consultation. We’ll recommend treatments based on your needs, lifestyle, and desired results to ensure the best outcome.",
  },
  {
    question: "How do cosmetic treatments enhance your glow?",
    answer:
      "With cosmetic treatments, your skin, hair, and body aesthetics transform greatly. Hence, they help you look younger and brighter. You can choose from these useful cosmetic treatments – Botox, fillers, laser treatments, skin rejuvenation, etc.",
  },
  {
    question: "Are cosmetic treatments good to go with?",
    answer:
      "When carried out by skilled and experienced professionals, they always deliver good results. However, choose the cosmetic treatment type after consulting the doctor.",
  },
  {
    question: "How long can cosmetic treatment results last?",
    answer:
      "The type of treatment delivered greatly determines how long the results will last. Results from treatments like Botox will last 3-6 months. Whereas laser procedures and others can have long-lasting outcomes.",
  },
  {
    question: "What cosmetic treatment facilities can I receive at Care Well Medical Centre?",
    answer:
      "Botox, dermal fillers, laser skin treatments, anti-aging solutions, and hair restoration are some popular treatments available here.",
  },
  {
    question: "Who is apt for cosmetic treatments?",
    answer:
      "Seeking a better appearance, reduced aging signs, and improved skin texture? Try cosmetic treatments. For the right treatment, consult an expert.",
  },
  {
    question: "Can cosmetic treatments lead to side effects?",
    answer:
      "You may have to deal with mild swelling or redness. However, they will subside within a few days.",
  },
  {
    question: "How do you figure out the right cosmetic treatment?",
    answer:
      "Your skin type, medical history, and goals help the expert find the right treatment.",
  },
  {
    question: "How long is the recovery time?",
    answer:
      "Recovery time depends on the treatment type. Non-surgical treatments allow you to resume your routine immediately, while surgical ones may require a few days of rest.",
  },
  {
    question: "Are the results permanent?",
    answer:
      "Some treatments offer permanent results, while others may need maintenance. We discuss the best options for your needs during your consultation.",
  },
  {
    question: "Are cosmetic treatments painful?",
    answer:
      "Most treatments are minimally invasive with little to no pain. We use local anesthesia and modern techniques to keep you comfortable throughout the procedure.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Results vary depending on the treatment. Some procedures like Botox and fillers show immediate effects, while others like thread lifts and laser treatments improve gradually over weeks.",
  },
  {
    question: "What is the recovery time for cosmetic treatments?",
    answer:
      "Recovery time depends on the procedure. Many non-surgical treatments allow you to return to daily activities immediately. Surgical options might require a few days of rest and care.",
  },
  {
    question: "Are the results natural-looking?",
    answer:
      "Yes. Our goal is to enhance your natural beauty with subtle, natural-looking results that last long. We avoid overdone looks and tailor every treatment to you.",
  },
  {
    question: "Is it safe to get cosmetic treatments during the pandemic?",
    answer:
      "Absolutely. We follow strict hygiene and safety protocols to protect our patients and staff. Your health and safety are our top priorities.",
  },
];
