export const PLASTIC_SURGERY_PATH = "/plastic-surgery-in-delhi" as const;

export const PLASTIC_SURGERY_SEO = {
  title: "Plastic Surgery in Delhi | Safe & Natural Cosmetic Enhancements",
  description:
    "Get advanced plastic surgery in Delhi for face, body & reconstruction. Safe procedures by expert surgeons with great results.",
} as const;

export const PLASTIC_SURGERY_PAGE = {
  h1: "Plastic Surgery in Delhi",
  tagline:
    "Advanced surgical procedures for face, body and skin — expert plastic surgeons, personalized care, and trusted results in Delhi.",
  introHeading:
    "Plastic Surgery in Delhi – Face, Body & Reconstructive Treatments by Experts",
  introParagraphs: [
    "Looking at the mirror, you would always think of enhancing or refining certain features. You would want to reshape a part of your body, restore youthful contours, or enhance features. Care Well Medical Centre factors in all of these needs by providing custom plastic surgery in Delhi. You get a desired natural look in the safest manner.",
    "You can always rely on our highly-experienced, board-certified plastic surgeons, state-of-the-art technology, and FDA-approved procedures for a seamless transformation.",
    "Plastic and cosmetic surgery works beyond enhancing your appearance. They restore your belief, rectify imperfections, and enhance your natural glow. Care Well Medical Centre offers an extensive array of advanced surgical solutions for the skin, face, and body. Safe, personalized, and result-driven aesthetic and reconstructive care is provided by our surgeons.",
  ],
  portfolioHeading: "Our Comprehensive Plastic & Cosmetic Surgery Service Suite",
  whyTrustHeading: "Why Choose Care Well Medical Centre for Plastic Surgery?",
  whyTrustParagraphs: [
    "Many become conscious whether they should undergo plastic surgery on their skin, body, or face. However, feel assured with Care Well Medical Centre. We ensure you get the best experience through cutting-edge procedures.",
    "Immense surgical expertise, exceptional track record, and compassionate approach make us the preferred caring partner. Dr. Sandeep Bhasin leads our team. By using cutting-edge methods and creating individualized treatment plans, he inspires the group to put patient safety first.",
  ],
  appointmentHeading: "Book Your Consultation Today!",
  appointmentBody:
    "Make an appointment for your free consultation right now to enhance your confidence and inherent beauty. You are given individualized treatment options by our skilled plastic surgeons.",
  faqHeading: "FAQs – Plastic & Cosmetic Surgery in Delhi",
  treatmentDropdownLabel: "Plastic Surgery",
} as const;

export type PlasticSurgeryTreatmentCard = {
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

export const PLASTIC_SURGERY_TREATMENT_CARDS: PlasticSurgeryTreatmentCard[] = [
  {
    title: "Mommy Makeover",
    excerpt:
      "It’s natural to put on a lot of weight after pregnancy, making you look bulky and out of fashion. Embrace motherhood and recover your shape using a combination of liposuction, tummy tuck, and breast surgery. Regain your confidence naturally.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/mommy-makeover/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/04/mommy-makeover-min.jpg",
  },
  {
    title: "Fat Grafting",
    excerpt:
      "We add volume to the face, buttocks, or breasts using the fat grafting process. Compared to synthetic implants, it remains safer and allows you a long-lasting, natural look.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/fat-grafting/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/04/fat-grafting-min.jpg",
  },
  {
    title: "Brazilian Butt Lift",
    excerpt:
      "Want to enhance your buttocks and sculpt your waist? Then go for Brazilian Brutt lift that transfers fat from areas such as the abdomen or thighs for smooth, natural, full-body curves.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/bbl/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/04/brazilian-butt-lift-bbl-illustration-carewell-min.jpg",
  },
  {
    title: "Facelift",
    excerpt:
      "Tighten sagging skin, smooth wrinkles, and redefine your jawline using the facelift procedure. You appear younger and highly refreshed with this procedure.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/facelift/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/04/facelift-surgery-carewell-min.jpg",
  },
  {
    title: "Chin Augmentation",
    excerpt:
      "Chin implants or reshaping allow you to improve facial balance. It makes your jawline sharper, more defined, and beautiful.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/chin-augmentation/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/04/chin-augmentation-carewell-min.jpg",
  },
  {
    title: "Eyelid Surgery",
    excerpt:
      "Do you want to look younger by getting rid of sagging eyelids and puffiness? Go for eyelid surgery that also improves vision in certain cases.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/eyelid/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/04/eyelid-surgery-blepharoplasty-carewell-min.jpg",
  },
  {
    title: "Lipoma Removal",
    excerpt:
      "To provide comfort, beauty, and peace of mind, our professionals carefully remove soft, fatty lumps beneath the skin.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/lipoma/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/04/lipoma-removal-carewell-min.jpg",
  },
  {
    title: "Rhinoplasty",
    excerpt:
      "Reshape your nose for improved appearance or breathing. Refine the bridge, tip, or nostrils with precision.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/rhinoplasty/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/04/rhinoplasty-nose-surgery-carewell-min.jpg",
  },
  {
    title: "Breast Reduction",
    excerpt:
      "Reduce breast size to relieve back pain and improve posture. Achieve proportionate, lighter, and firmer breasts.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/breast-reduction/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/04/breast-reduction-surgery-carewell-min.jpg",
  },
  {
    title: "Tummy Tuck",
    excerpt:
      "Flatten your stomach by removing loose skin and tightening muscles. Ideal after pregnancy or major weight loss.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/tummy-tuck/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/04/tummy-tuck-surgery-carewell-min.jpg",
  },
  {
    title: "Liposuction",
    excerpt:
      "It works by eliminating stubborn fat from targeted areas such as the abdomen, things, or arms, for an improved body and contour. What’s more, these results last a lifetime.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/liposuction/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/04/liposuction-surgery-carewell-min.jpg",
  },
  {
    title: "Septoplasty",
    excerpt:
      "Correct a deviated septum to improve airflow and ease breathing. A functional solution for nasal blockages.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/septoplasty/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/04/septoplasty-nose-surgery-carewell-min.jpg",
  },
  {
    title: "Breast Augmentation",
    excerpt:
      "We use implants or fat transfer processes to enhance your breast size and shape. And it will look natural.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/breast-augmentation/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/04/breast-augmentation-surgery-carewell.jpg",
  },
  {
    title: "Breast Lift",
    excerpt:
      "Lift and reshape sagging breasts to restore firmness and symmetry. Ideal after aging, weight loss, or pregnancy.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/breast-lift/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/04/breast-lift-surgery-carewell-1.jpg",
  },
  {
    title: "Neck Lift",
    excerpt:
      "Tighten a loose neck and define your jawline using the Neck Lift procedure that minimizes wrinkles and aging signs.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/neck-lift/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/04/neck-lift-procedure-carewell.jpg",
  },
  {
    title: "Buccal Fat Removal",
    excerpt:
      "The excess buccal fat removal ensures slim cheeks. Achieve a more sculpted and contoured facial appearance.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/buccal-fat-removal/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/04/buccal-fat-removal-carewell-min.jpg",
  },
  {
    title: "Gynecomastia",
    excerpt:
      "It eliminates enlarged male breast tissue and develops a flatter, masculine chest. You become confident with long-lasting results.",
    href: toLocalPath(
      "https://www.carewellmedicalcentre.com/plastic-surgery-in-delhi/gynecomastia/",
    ),
    image:
      "https://www.carewellmedicalcentre.com/wp-content/uploads/2025/04/gynecomastia-surgery-carewell-min.jpg",
  },
];

export const PLASTIC_SURGERY_FAQS: { question: string; answer: string }[] = [
  {
    question: "What distinguishes cosmetic surgery from plastic surgery?",
    answer:
      "If you want to reconstruct your body parts that is damaged owing to illness, trauma, burns, or birth defects, choose the plastic surgery option. Cosmetic surgery, on the other hand, makes you look better.",
  },
  {
    question: "Am I safe with cosmetic surgery?",
    answer:
      "It’s safe to undergo cosmetic surgery when a skilled and experienced surgeon is in charge of the treatment. We stand out owing to cutting-edge technology and adherence to quality hygienic practices.",
  },
  {
    question: "How can I select the right plastic surgeon in Delhi?",
    answer:
      "Thoroughly review the certifications, experience, before and after results, and patients’ testimonials before deciding on a surgeon for treatment. As far as Dr. Sandeep Bhasin is concerned, he is a renowned plastic and cosmetic surgeon in Delhi. His able guidance has allowed Care Well Medical Centre to deliver outstanding results.",
  },
  {
    question: "May I know the most popular cosmetic surgery procedures in Delhi?",
    answer:
      "There are many cosmetic surgery options, including breast augmentation, liposuction, tummy tuck, facelift, rhinoplasty, breast reduction, and gynecomastia surgery for men.",
  },
  {
    question: "Does plastic surgery come with any downtime?",
    answer:
      "Your recovery time is dependent on the procedure type. A few days of rest will likely be the case with minor surgeries. Complex surgeries usually extend your recovery period by some weeks. The doctor releases post-operative care instructions that you should follow for a speedy recovery.",
  },
  {
    question: "Does cosmetic surgery lead to lifelong results?",
    answer:
      "The results of cosmetic surgery are typically permanent. But keep in mind that natural aging, lifestyle and weight fluctuations might undo these results. Post-surgery results can be sustained for a long period of time with healthy living.",
  },
  {
    question: "Can I have multiple procedures at the same time?",
    answer:
      "Based on the surgeon’s suggestion, this is doable! For example, the surgeon can perform liposuction and tummy tuck together.",
  },
  {
    question: "Are non-surgical cosmetic treatments available at Care Well Medical Centre?",
    answer:
      "Yes! Here are some non-surgical treatment options at Care Well Medical Centre — Botox, dermal fillers, laser hair removal, skin tightening, and other aesthetic services.",
  },
  {
    question: "How can I book a consultation at Care Well Medical Centre?",
    answer:
      "There are three options — a direct call to the clinic, a WhatsApp message, or filling out the contact form on the official website.",
  },
];
