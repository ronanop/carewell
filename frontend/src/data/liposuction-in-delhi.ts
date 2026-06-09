import { PLASTIC_SURGERY_PATH } from "@/data/plastic-surgery-in-delhi";
import { HAIR_LOSS_CLINIC } from "@/data/hair-loss-treatment-in-delhi";

export const LIPOSUCTION_PATH = "/plastic-surgery-in-delhi/liposuction" as const;

const WP = "https://www.carewellmedicalcentre.com/wp-content/uploads";
const BASE = LIPOSUCTION_PATH;

export const LIPOSUCTION_IMAGES = {
  hero: {
    src: `${WP}/2025/04/liposuction-surgery-carewell-min.jpg`,
    alt: "Before and after results showing fat reduction with the best liposuction in Delhi at Care Well Medical Centre",
  },
  areas: {
    src: `${WP}/2025/04/liposuction-surgery-carewell-min.jpg`,
    alt: "Liposuction treatment areas showing targeted fat removal zones on the body including abdomen, thighs, arms, and flanks",
  },
  doctor: {
    src: "/demo/doctor-profile-feature-vertical.png",
    alt: "Dr. Sandeep Bhasin — best liposuction surgeon in Delhi",
  },
  videoPoster: {
    src: "/demo/doctor-profile-feature.png",
    alt: "Liposuction procedure explained at Care Well Medical Centre Delhi",
  },
  beforeAfter: [
    {
      src: `${WP}/2025/04/liposuction-surgery-carewell-min.jpg`,
      alt: "Liposuction before and after results in Delhi",
      caption: "Body contouring results",
    },
    {
      src: `${WP}/2025/04/tummy-tuck-surgery-carewell-min.jpg`,
      alt: "Abdominal liposuction before and after Delhi",
      caption: "Abdomen contouring",
    },
    {
      src: `${WP}/2025/04/gynecomastia-surgery-carewell-min.jpg`,
      alt: "Male chest liposuction results Delhi",
      caption: "Male chest contouring",
    },
  ],
} as const;

export const LIPOSUCTION_SEO = {
  title:
    "Best Liposuction in Delhi – Cost, Before & After Results & Expert Surgeon | Care Well Medical Centre",
  description:
    "Best liposuction in Delhi at Care Well Medical Centre. VASER, laser & tumescent lipo by Dr. Sandeep Bhasin. Area-wise cost, before & after results. Book consultation.",
} as const;

export type LiposuctionAreaDetail = {
  title: string;
  paragraphs: string[];
  href?: string;
  linkLabel?: string;
  note?: string;
};

export type LiposuctionType = {
  title: string;
  description: string;
  advantages: string[];
};

export const LIPOSUCTION_QUICK_AREAS = [
  "Abdomen & Flanks – For a toned, flat stomach.",
  "Thighs & Hips – Achieve slimmer, contoured legs.",
  "Arms & Back – Eliminate excess fat for a well-defined upper body.",
  "Neck & Chin – Get rid of a double chin and enhance your jawline.",
  "Buttocks – Sculpt and enhance natural curves.",
  "Male Chest (Gynecomastia Treatment) – Reduces excess fat for a masculine chest.",
] as const;

export const LIPOSUCTION_AREA_DETAILS: LiposuctionAreaDetail[] = [
  {
    title: "Facial Liposuction (Cheeks, Chin & Neck)",
    paragraphs: [
      "Your facial areas, such as cheeks, chin and neck, are very sensitive. Excess fat accumulation can worsen the appearance of these areas.",
      "Facial liposuction removes fat from sensitive areas and gives you facial definition — around the jawline to address double chin while improving contours. You receive a natural look and minimal scarring.",
    ],
    href: `${BASE}/facial`,
    linkLabel: "Facial liposuction treatment in Delhi",
  },
  {
    title: "Abdominal Liposuction (For Men & Women)",
    paragraphs: [
      "Both men and women can find unwanted fat in the lower abdomen very troubling — fat here can be resistant to exercise.",
      "Women, especially after pregnancy, can have lasting fat in this area. Many men often find fat deposits in the lower belly compared to the upper abdomen.",
      "Abdominal liposuction in Delhi removes fat for both men and women, flattening the abdomen for a more aesthetic look.",
    ],
    href: `${BASE}/abdominal`,
    linkLabel: "Abdominal liposuction in Delhi",
  },
  {
    title: "Thigh Liposuction (Inner, Outer & Anterior Thighs)",
    paragraphs: [
      "Most individuals have trouble with thigh fat, particularly in the inner and outer thighs.",
      "Inner thigh liposuction eliminates friction between thighs. Outer thigh liposuction gives slim, well-shaped legs. Anterior thigh liposuction smoothes the front thighs.",
    ],
    href: `${BASE}/outer-thigh`,
    linkLabel: "Outer thigh liposuction in Delhi",
    note: "Excess removal of thigh fat above 60% can result in irregular skin texture — accuracy is paramount.",
  },
  {
    title: "Legs & Ankle Liposuction",
    paragraphs: [
      "Fat in the ankles and legs is typically superficial, lying near the skin. Latest methods ensure safe and effective removal, commonly performed in a single operation for symmetrical outcomes.",
    ],
    href: `${BASE}/calves-thighs`,
    linkLabel: "Calves & thighs liposuction in Delhi",
  },
  {
    title: "Buttocks Liposuction",
    paragraphs: [
      "Buttocks liposuction sculpts and enhances natural curves. Combined procedures can address bulky areas for a more proportionate silhouette.",
    ],
    href: `${BASE}/buttocks`,
    linkLabel: "Buttocks liposuction in Delhi",
  },
  {
    title: "Mons Pubis Liposuction",
    paragraphs: [
      "The mons pubis is the fat area above the pubic region. Excess fat here can affect confidence and comfort. Liposuction smoothes this area, enhancing overall body aesthetics.",
    ],
  },
  {
    title: "Arms Liposuction",
    paragraphs: [
      "Many people feel self-conscious about bulky arms and prefer slim, contoured arms. Arm liposuction removes excess fat while maintaining natural definition and can be combined with an arm lift.",
    ],
    href: `${BASE}/arms`,
    linkLabel: "Arms liposuction in Delhi",
  },
  {
    title: "Back Liposuction (For Women & Men)",
    paragraphs: [
      "For women, back liposuction addresses excess fat causing bulges such as the bra roll or infra-scapular back. For men, back fat often forms in the lower and mid regions.",
      "Liposuction removes troublesome pockets of fat to create a more toned back profile.",
    ],
    href: `${BASE}/back`,
    linkLabel: "Back liposuction in Delhi",
  },
  {
    title: "Male Chest (Gynecomastia Surgery)",
    paragraphs: [
      "Men with excess breast fat (gynecomastia) often feel self-conscious. Gynecomastia liposuction helps reshape the chest by removing fat. Glandular tissue may need a separate procedure if present.",
    ],
    href: "/plastic-surgery-in-delhi/gynecomastia",
    linkLabel: "Gynecomastia surgery in Delhi",
  },
  {
    title: "Breast Liposuction",
    paragraphs: [
      "Breast liposuction is a less invasive method of natural breast reduction for women seeking less extensive surgery. Fat deposits are eliminated, resulting in a reduced, firmer breast contour.",
    ],
    href: "/plastic-surgery-in-delhi/breast-reduction",
    linkLabel: "Breast reduction surgery in Delhi",
  },
  {
    title: "Love Handles (Flanks) Liposuction",
    paragraphs: [
      "Love handles are among the most resistant areas of fat. Flank liposuction eliminates fat along the waistline for a leaner, more defined midsection — ideal for both men and women.",
      "Men tend to carry resistant fat above the hip bone; flank liposuction contours a leaner, more defined waistline.",
    ],
  },
  {
    title: "Liposuction for Large Volume Fat Reduction",
    paragraphs: [
      "Designed for people who are overweight or obese, this procedure removes significant fat deposits from various body parts. It requires careful fluid management during surgery.",
    ],
  },
];

export const LIPOSUCTION_LARGE_VOLUME_CANDIDATES = [
  "Have localized areas of fat with contouring needs",
  "Are otherwise healthy with good skin laxity",
  "Recognize this is body contouring, not weight-reduction surgery",
] as const;

export const LIPOSUCTION_TYPES: LiposuctionType[] = [
  {
    title: "Traditional Liposuction",
    description:
      "A suction-assisted lipectomy process that uses a cannula, a hollow tube, to remove subcutaneous fat.",
    advantages: [
      "Useful for significant fat removal from thighs, back and abdomen",
      "Proven successful track record for decades",
      "High availability across clinics in Delhi",
      "Lower price compared to other fat removal solutions",
      "Permanent results when stable weight is maintained",
      "Customized operation with manual cannula control by surgeons",
    ],
  },
  {
    title: "Laser-Assisted Liposuction (Laser Lipo)",
    description: "Uses lasers to melt fat before removing it from different body areas.",
    advantages: [
      "Skin tightening",
      "Faster recovery with reduced downtime",
      "Minimal scarring",
      "Enhanced precision",
    ],
  },
  {
    title: "Vaser Liposuction (Ultrasound-Assisted Lipo)",
    description:
      "Uses precise ultrasound-assisted technology to selectively liquify fat before removal, causing less damage to surrounding tissues.",
    advantages: [
      "Enhanced precision and contouring",
      "Improved skin tightening",
      "Reduced pain, swelling and trauma",
      "Faster recovery time",
    ],
  },
  {
    title: "Tumescent Liposuction",
    description:
      "Considered among the safest liposuction methods in Delhi — incorporates a special solution to decrease bleeding, pain and swelling.",
    advantages: [
      "Minimal blood loss",
      "Fewer complications",
      "Enhanced precision",
      "Reduced postoperative pain",
    ],
  },
  {
    title: "Power-Assisted Liposuction (PAL)",
    description:
      "Uses a specialized, rapidly vibrating cannula to break fat cells, ensuring enhanced efficiency and precision.",
    advantages: [
      "Increased speed & efficiency",
      "Less trauma in tissues",
      "Enhanced contouring and precision",
      "Fewer side effects & faster recovery",
    ],
  },
];

export const LIPOSUCTION_COST_ROWS = [
  { area: "Abdomen & Love Handles", cost: "₹90,000 – ₹1,50,000" },
  { area: "Thighs (Inner & Outer)", cost: "₹80,000 – ₹1,40,000" },
  { area: "Arms & Back", cost: "₹70,000 – ₹1,20,000" },
  { area: "Chin & Neck (Facial Lipo)", cost: "₹60,000 – ₹90,000" },
  { area: "Buttocks Liposuction", cost: "₹85,000 – ₹1,30,000" },
  { area: "Legs & Ankles", cost: "₹75,000 – ₹1,25,000" },
  { area: "Male Chest (Gynecomastia)", cost: "₹80,000 – ₹1,50,000" },
  { area: "Mons Pubis (Pubic Area)", cost: "₹50,000 – ₹80,000" },
  { area: "Full Body Liposuction", cost: "₹2,00,000 – ₹5,00,000" },
] as const;

export const LIPOSUCTION_PACKAGES = [
  "Buttocks Liposuction – removes fat from thighs, belly, underarms and buttocks for symmetrical body proportion.",
  "Lipo Sculpting Procedure – for candidates aiming to diminish fat and achieve a sculpted shape in one sitting.",
  "Vaser-Lipo – fastest recovery and utmost precision for fat sculpting and removal.",
  "Liposuction and Fat Grafting – fat removed and transferred elsewhere on the body (breasts or buttocks).",
  "Liposuction and Skin Tightening – for patients concerned about loose skin following fat reduction.",
  "Liposuction and Gynecomastia Surgery – combines fat reduction via liposuction and glandular tissue removal for men.",
] as const;

export const LIPOSUCTION_PAGE = {
  h1: "Best Liposuction in Delhi – Cost, Before & After Results & Expert Surgeon",
  subtitle: "Expert Body Contouring · South Delhi",
  tagline: "Liposuction in Delhi – achieve a sculpted, confident body with doctor-supervised fat removal at Care Well Medical Centre.",
  parentLabel: "Plastic Surgery in Delhi",
  parentPath: PLASTIC_SURGERY_PATH,
  treatmentDropdownLabel: "Liposuction",
  introHeading: "Liposuction in Delhi – Achieve a Sculpted & Confident Body",
  introParagraphs: [
    "Do you have excess fat despite exercise and a strict diet routine? Has this fat severely affected your mobility? A carefully planned liposuction surgery in Delhi helps you overcome unwanted fat and the issues that follow.",
    "At Care Well Medical Centre, we treat patients successfully in a protocol-led environment, carefully supervised by Dr. Sandeep Bhasin, who has over 20 years of illustrious surgical experience. This treatment leads to effective body shaping so your confidence grows.",
    "Do you want to find the best liposuction in Delhi? Consult with our expert surgeons at Care Well Medical Centre.",
  ],
  whatIsHeading: "What is Liposuction",
  whatIsParagraphs: [
    "Liposuction treatment in Delhi is a cosmetic process designed to improve the way one looks by eliminating unwanted fat through a surgical vacuum. It helps remove fat from body areas that do not respond despite exercise and diet.",
    "As your weight rises, fat cells grow both in volume and size. Liposuction is recommended by many surgeons to decrease the number of fat cells in a particular area. The extent of fat removal depends on the area's appearance and the fat volume.",
    "The liposuction process begins with the surgeon making a small incision and inserting a narrow hollow metal rod attached to a vacuum pump underneath the skin using a cannula. The vacuum pump then sucks out the fat.",
    "If you are searching for the best liposuction surgery in Delhi to remove fat from the buttocks, thighs, abdomen or other areas, you can trust Care Well Medical Centre — regarded as the best clinic for liposuction in Delhi.",
  ],
  howReducesHeading: "How Liposuction Reduces Fat?",
  howReducesParagraphs: [
    "Liposuction is a very trustworthy option for reducing stubborn fat in areas that don't respond to exercise or diet. This cosmetic procedure improves the way you look and gives you immense confidence.",
    "Liposuction surgery in Delhi is for reducing fat — it is not a weight loss treatment. The surgeon uses this technology to remove fat pockets and contour the figure of the patient.",
  ],
  whyChooseHeading: "Why Choose Liposuction?",
  whyChooseIntro:
    "Liposuction is not a weight-loss solution. It is for refining and sculpting your body. If you are near your desired weight and have areas of fat that diet and exercise cannot shift, liposuction can give you the desired body shape.",
  whyChooseBenefits: [
    "Remove Stubborn Fat forever – Exercise does not get rid of this unwanted fat.",
    "Enhances Body Contours – Get a more defined, sculpted look.",
    "Boosts Confidence – Feel comfortable and proud of your body.",
    "Quick & Safe Procedure – Minimal downtime, fast recovery.",
    "Long-Lasting Results – Maintain your shape with a healthy lifestyle.",
  ],
  treatmentAreasHeading: "Liposuction Treatment Areas",
  treatmentAreasIntro:
    "Want to reduce unwanted fat from your face, calves & thighs, back, abdomen, buttocks, arms, breasts, and more? You can achieve that with liposuction surgery in Delhi. For quick, defined shape — like 6-pack abs or well-toned buttocks — you can also opt for lipo-sculpting or VASER-Lipo (high-definition liposuction).",
  treatmentAreasClosing:
    "We provide customized liposuction to target the areas where fat accumulates the most.",
  whereWorksHeading: "Where Does Liposuction Work Best?",
  whereWorksIntro:
    "Liposuction is an effective body contouring surgery that addresses persistent fat in certain body zones that do not respond to dieting and exercising.",
  largeVolumeHeading: "Ideal patients for large volume fat reduction:",
  typesHeading: "Types of Liposuction Provided by Us",
  typesIntro:
    "At Care Well Medical Centre, Delhi, we employ the newest liposuction methods to guarantee safe and successful fat reduction.",
  typesClosing:
    "Along with liposuction, we also offer advanced cosmetic procedures under plastic surgery in Delhi to help you look and feel your best.",
  vaserHeading: "VASER Liposuction in Delhi – Advanced Fat Removal Technology",
  vaserParagraphs: [
    "As a minimally invasive procedure, VASER lipo treatment in Delhi breaks down fat cells using ultrasound technology before removing them. This leads to precise body sculpting and protection for surrounding tissues.",
    "Compared to traditional fat removal, VASER liposuction results in smoother contours and reduced trauma while encouraging faster healing. It targets stubborn fat in the abdomen, arms, back, chin and thighs for a highly defined, toned appearance.",
  ],
  candidateHeading: "Who is the Right Candidate for Liposuction?",
  candidateIntro: "Liposuction is best suited to individuals who:",
  candidateItems: [
    "Have fat that will not go away with diet & exercise",
    "Are close to their ideal weight (not for significant weight loss)",
    "Have good skin elasticity for improved contouring",
    "Want to improve body shape & definition",
    "Are non-smokers and in good health",
  ],
  candidateClosing:
    "Not sure liposuction is for you? Our board-certified plastic surgeons will guide you through a comprehensive consultation to find the best treatment course.",
  processHeading: "Step-by-Step Liposuction Procedure",
  processIntro: "A successful liposuction surgery in Delhi goes through a series of steps:",
  processSteps: [
    {
      title: "Step 1: Consultation & Planning",
      body: "An in-depth consultation on your medical background, current fat issue, and treatment expectations. We figure out a customized solution according to your body type and desired areas.",
    },
    {
      title: "Step 2: Treatment Procedure",
      body: "On treatment day, we decide between local and general anaesthesia. We use minimal incisions to remove excess fat. The procedure finishes within 1–3 hours, depending on areas treated.",
    },
    {
      title: "Step 3: Recovery & Results",
      body: "Minimal downtime — bruising and swelling subside within a few weeks. Visible results in 2–3 months.",
    },
  ],
  costHeading: "What is the cost of liposuction in Delhi?",
  costIntro:
    "Liposuction surgery cost in Delhi depends on body areas treated, types of liposuction used, and the surgeon's experience. At Care Well Medical Centre, we offer customized packages for multiple regions, along with flexi EMI and payment plans.",
  costRange: "Price Range: ₹70,000 – ₹2,00,000 (depends on area treated & procedure adopted).",
  costQuoteNote: "For a precise quote suited to your requirements, schedule a consultation today.",
  costTableHeading: "Liposuction Cost Breakdown by Treatment Area",
  packagesHeading: "Liposuction & Body Contouring Packages",
  packagesIntro:
    "Other than our regular packages, we also provide specialized treatments at Care Well Medical Centre:",
  packagesNote:
    "Prices are subject to variation depending on individual body structure, amount of fat, and procedure needs.",
  resultsHeading: "Liposuction Before and After Results",
  testimonialsHeading: "Patient Testimonials – Best Liposuction in Delhi",
  testimonialsIntro:
    "Watch real patients share their experience of getting the best liposuction in Delhi at Care Well Medical Centre.",
  surgeonHeading: "Best Liposuction Surgeon in Delhi",
  surgeonBody:
    "The best treatment experience starts with the best surgeon for liposuction in Delhi. Dr. Sandeep Bhasin spearheads Care Well Medical Centre's expert team with proven excellence across 10,000+ cosmetic surgeries, including liposuction, for over 20 years. People from Delhi-NCR trust him for liposuction treatment needs.",
  reviewsHeading: "Google Reviews for the Best Liposuction in Delhi",
  reviewsIntro:
    "Hear from real patients who chose Care Well Medical Centre for liposuction in Delhi. These reviews highlight our commitment to safety, precision, and patient satisfaction.",
  whyClinicHeading: "Why Choose Care Well Medical Centre for Liposuction in Delhi?",
  whyClinicIntro:
    "Selecting the right clinic is critical to a seamless and successful treatment experience.",
  whyClinicItems: [
    "Board-Certified Plastic Surgeon – Dr. Sandeep Bhasin with over 20 years of experience",
    "State of the Art Facility – conventional and modern techniques for fat removal",
    "Customized Treatment Plans tailored to your fat issues and expectations",
    "Natural Results performed with precision for long-lasting outcomes",
  ],
  videoHeading: "Liposuction Video",
  consultationHeading: "Book Your Consultation Today!",
  consultationBody:
    "Do you want to re-shape your body and gain more confidence? Best liposuction treatment in Delhi is available at Care Well Medical Centre.",
  consultationLocation: "Care Well Medical Centre, CR Park, Delhi",
  directionsHeading: "How to Reach Care Well Medical Centre for the Best Liposuction in Delhi",
  directionsIntro:
    "Care Well Medical Centre is located in a peaceful, well-connected area of South Delhi, easily accessible by metro, cab, or private vehicle.",
  directionsAddress:
    "House No. 1, NRI Complex, Chittaranjan Park, Near Alaknanda Market, New Delhi – 110019",
  metroStations: ["Govindpuri Metro Station (Violet Line)", "Nehru Place Metro Station"],
  directionsClosing:
    "We offer convenient directions and parking options. For help finding us, call +91 9667-977-499.",
  faqHeading: "Best liposuction in Delhi – FAQs",
  disclaimer:
    "Treatment suitability, fat removal limits, and results vary between individuals. Liposuction is a surgical procedure that should only be performed after consultation with a qualified plastic surgeon. This page is for informational purposes and does not replace medical advice.",
} as const;

export { HAIR_LOSS_CLINIC as LIPOSUCTION_CLINIC };

export const LIPOSUCTION_FAQS: { question: string; answer: string }[] = [
  {
    question: "How long does it take to recover from liposuction?",
    answer:
      "Recovery time depends on the type and extent of liposuction. Most individuals resume normal activities within a week or two.",
  },
  {
    question: "Is liposuction covered by insurance?",
    answer:
      "Insurance typically does not cover cosmetic liposuction except where the procedure is considered medically necessary.",
  },
  {
    question: "Is liposuction a weight-loss treatment?",
    answer:
      "No. Liposuction is body contouring, not weight reduction. It removes stubborn fat pockets when you are near your ideal weight.",
  },
  {
    question: "Is lipo a permanent solution?",
    answer:
      "Yes, liposuction eliminates fat cells permanently. However, remaining fat cells can expand if eating habits and lifestyle are not maintained.",
  },
  {
    question: "How long until I see results from liposuction?",
    answer:
      "Results become visible after swelling subsides — typically within a few weeks to a few months.",
  },
  {
    question: "What is better, tummy tuck or lipo?",
    answer:
      "If loose skin and muscle tightening are your goals, a tummy tuck is better. If you want to eliminate fat pockets, liposuction works better.",
  },
  {
    question: "Does fat return after liposuction?",
    answer:
      "Fat cells removed through liposuction do not return. Excess weight gain can cause remaining fat cells to expand.",
  },
  {
    question: "How much fat can a surgeon remove with liposuction?",
    answer:
      "There is no fixed amount — the doctor decides based on your condition. Surgeons can safely remove up to about 5 litres of fluid and fat in one session.",
  },
  {
    question: "How painful is liposuction surgery?",
    answer:
      "The procedure is performed under local, regional, or general anaesthesia so you do not feel pain during surgery. Temporary soreness afterward is managed with prescribed medication.",
  },
  {
    question: "Is the liposuction procedure safe?",
    answer:
      "Liposuction is extremely safe when performed after full medical evaluation. At Care Well Medical Centre, we only proceed after examining your medical history under Dr. Sandeep Bhasin's supervision.",
  },
];
