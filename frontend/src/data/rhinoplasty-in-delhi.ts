import { PLASTIC_SURGERY_PATH } from "@/data/plastic-surgery-in-delhi";
import { HAIR_LOSS_CLINIC } from "@/data/hair-loss-treatment-in-delhi";

export const RHINOPLASTY_PATH = "/plastic-surgery-in-delhi/rhinoplasty" as const;

const WP = "https://www.carewellmedicalcentre.com/wp-content/uploads";
const BASE = RHINOPLASTY_PATH;

export const RHINOPLASTY_IMAGES = {
  hero: {
    src: `${WP}/2025/04/rhinoplasty-nose-surgery-carewell-min.jpg`,
    alt: "Best rhinoplasty surgery in Delhi at Care Well Medical Centre",
  },
  procedure: {
    src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517890/carewell-media/wp/rhinoplasty-nose-surgery-carewell-min.jpg`,
    alt: "Rhinoplasty procedure step by step from consultation to final result at Care Well Medical Centre Delhi",
  },
  recovery: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517799/carewell-media/site/demo/about-us-consultation.jpg",
    alt: "Rhinoplasty recovery timeline infographic for patients in Delhi",
  },
  doctor: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517806/carewell-media/site/demo/doctor-profile-feature-vertical.png",
    alt: "Dr. Sandeep Bhasin — best rhinoplasty surgeon in Delhi",
  },
  videoPoster: {
    src: "https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517807/carewell-media/site/demo/doctor-profile-feature.jpg",
    alt: "Rhinoplasty patient testimonial video at Care Well Medical Centre",
  },
  beforeAfter: [
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517890/carewell-media/wp/rhinoplasty-nose-surgery-carewell-min.jpg`,
      alt: "Rhinoplasty before and after results in Delhi",
      caption: "Profile refinement",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517894/carewell-media/wp/septoplasty-nose-surgery-carewell-min.jpg`,
      alt: "Septorhinoplasty before and after Delhi",
      caption: "Functional nose surgery",
    },
    {
      src: `https://res.cloudinary.com/drxbxaqjd/image/upload/v1781517887/carewell-media/wp/chin-augmentation-carewell-min.jpg`,
      alt: "Facial harmony after rhinoplasty Delhi",
      caption: "Facial balance",
    },
  ],
} as const;

export const RHINOPLASTY_SEO = {
  title:
    "Best Rhinoplasty Surgery in Delhi – Cost, Results & Expert Surgeon | Care Well Medical Centre",
  description:
    "Best rhinoplasty surgery in Delhi at Care Well Medical Centre. Open, closed & septorhinoplasty by Dr. Sandeep Bhasin. Cost, recovery timeline & natural results. Book consultation.",
} as const;

export type RhinoplastyType = {
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
};

export const RHINOPLASTY_INITIAL_TYPES = [
  "Open Rhinoplasty – extensive correction via a small incision at the columella.",
  "Closed Rhinoplasty – internal incisions with no visible external scars.",
  "Septorhinoplasty – reshapes the nose and fixes a deviated septum.",
  "Revision Rhinoplasty – refines or corrects outcomes from previous nose surgery.",
] as const;

export const RHINOPLASTY_TYPES: RhinoplastyType[] = [
  {
    title: "Open Rhinoplasty in Delhi",
    body: "A small incision in the skin between the nostrils allows the surgeon to reshape cartilage with precision. Ideal for complex noses, revision cases, and major structural changes to the tip or bridge.",
    href: `${BASE}/open`,
    linkLabel: "Learn more about open rhinoplasty",
  },
  {
    title: "Closed Rhinoplasty (Scarless Approach)",
    body: "All incisions stay within the nostrils with no visible external scar. Suitable for moderate changes when the nose is already fairly balanced. Not recommended for severely twisted noses or complex revision work.",
    href: `${BASE}/closed`,
    linkLabel: "Closed rhinoplasty in Delhi",
  },
  {
    title: "Septorhinoplasty – Shape and Breathing Together",
    body: "Combines rhinoplasty with internal septal correction for patients with both shape and breathing issues — improving profile and opening the airway in one operation.",
  },
  {
    title: "Septoplasty (Functional Rhinoplasty)",
    body: "Fixes a deviated nasal septum to improve breathing and reduce nasal obstruction. Consider septoplasty in Delhi if you have snoring or ongoing congestion.",
    href: "/plastic-surgery-in-delhi/septoplasty",
    linkLabel: "Explore septoplasty details",
  },
  {
    title: "Tip Plasty / Tip Refinement",
    body: "Refines a bulbous, droopy, or boxy tip for a sharper, more defined appearance — often with simpler recovery than full rhinoplasty when the bridge is already acceptable.",
  },
  {
    title: "Ethnic Rhinoplasty",
    body: "Refines Indian facial features without replacing them — carefully contouring the bridge, tip, and nostrils so the nose looks elegant and still belongs to your face.",
  },
  {
    title: "Non Surgical Rhinoplasty (Fillers)",
    body: "Uses dermal fillers for minor bumps or a mildly droopy tip. Temporary and limited — cannot reduce nose size, correct breathing, or deliver permanent structural change.",
    href: "/cosmetic-treatments-in-delhi/dermal-fillers",
    linkLabel: "Dermal fillers in Delhi",
  },
];

export const RHINOPLASTY_COST_ROWS = [
  { procedure: "Basic cosmetic rhinoplasty", cost: "₹70,000 – ₹1,20,000" },
  { procedure: "Functional / septorhinoplasty", cost: "₹80,000 – ₹1,50,000" },
  { procedure: "Revision rhinoplasty", cost: "₹1,20,000 – ₹2,50,000" },
  { procedure: "Non surgical rhinoplasty (fillers)", cost: "₹20,000 – ₹50,000 per session" },
] as const;

export const RHINOPLASTY_PAGE = {
  h1: "Best Rhinoplasty Surgery in Delhi – Cost, Results & Expert Surgeon",
  subtitle: "Cosmetic & Functional Nose Surgery · South Delhi",
  tagline:
    "Natural nose reshaping and improved breathing — doctor-planned rhinoplasty in Delhi at Care Well Medical Centre.",
  parentLabel: "Plastic Surgery in Delhi",
  parentPath: PLASTIC_SURGERY_PATH,
  treatmentDropdownLabel: "Rhinoplasty",
  introParagraphs: [
    "Seeking the best clinic for rhinoplasty surgery in Delhi? Care Well Medical Centre is a trusted option for shaping your nose. Our top-rated clinicians ensure your nose transformation looks natural and remarkable at an affordable price.",
    "With over 20 years in surgery, Dr. Sandeep Bhasin is a renowned name offering quality and precise treatment — the preferred expert surgeon for nose surgery in Delhi.",
  ],
  whyChooseHeading: "Why Choose Rhinoplasty in Delhi?",
  whyChooseParagraphs: [
    "Giving your nose the right shape is an intelligent decision. Rhinoplasty in Delhi helps transform your nose shape and structure.",
    "Rhinoplasty surgery in Delhi efficiently corrects a nasal bump, narrows extended nostrils, refines the tip, and recovers symmetry after injury. Your breathing can improve with correction of structural constraints such as a deviated septum.",
  ],
  whyChooseTypesIntro:
    "If you are searching for nose reshaping surgery Delhi online, you can choose from these options at Care Well Medical Centre:",
  surgeonHeading: "Best Rhinoplasty Surgeon in Delhi",
  surgeonPoints: [
    "Dr. Sandeep Bhasin, with 20+ years of experience in cosmetic and functional nose surgery, is widely regarded as the best rhinoplasty surgeon in Delhi.",
    "Excelling in primary rhinoplasty, septorhinoplasty, trauma, and revision cases — the first choice for many patients in Delhi-NCR.",
    "With a focus on balanced transformation, Dr. Bhasin ensures a high-quality, precise treatment experience.",
  ],
  surgeonClosing: "Book your consultation with Dr. Sandeep Bhasin today for a detailed explanation of your treatment plan and expectations.",
  candidateHeading: "Who Is Right For Rhinoplasty in Delhi?",
  candidateIntro:
    "Many people think about nose surgery quietly for years before speaking to a doctor. The decision becomes easier when you see clearly whether rhinoplasty in Delhi matches your situation.",
  candidateSubheading: "You may be a good candidate for a nose job in Delhi if you:",
  candidateItems: [
    "Feel unhappy with your nose size, visible hump, wide bridge, or bulbous tip",
    "Notice your nose looks crooked after an old injury or fracture",
    "Live with mouth breathing, loud snoring, or a nose that feels blocked most of the time",
    "Want a natural change, not a completely different face or copied celebrity nose",
    "Are in good general health and medically fit for anaesthesia",
    "Have completed facial growth, usually after the late teenage years",
    "Do not smoke, or are willing to stop around the time of surgery",
    "Have realistic expectations and understand that no surgeon can promise perfect results",
  ],
  candidateClosing:
    "We use the first consultation to assess your nose shape, skin, breathing, and health in detail — then you can decide calmly whether rhinoplasty in Delhi is the right step for you now.",
  problemsHeading: "Problems Rhinoplasty Surgery Can Help You Solve",
  problemsIntro:
    "Rhinoplasty surgery does not only change looks. It solves daily problems that affect your confidence, breathing, and comfort.",
  aestheticHeading: "Aesthetic Concerns",
  aestheticBody:
    "Many patients come because their nose draws unwanted attention — a hump on the bridge, wide nostrils, or a bulbous, droopy, or off-centre tip. Rhinoplasty aims to refine shape without making you unrecognisable. Small, precise changes improve facial harmony.",
  functionalHeading: "Functional and Breathing Issues",
  functionalBody:
    "For some people, breathing is the main problem. A deviated septum, narrow airway, or weak sidewalls can cause nasal blockage, noisy breathing, or mouth breathing at night. We often plan functional rhinoplasty or septorhinoplasty in Delhi to improve airflow while keeping your nose suited to your face.",
  traumaHeading: "Post Trauma and Revision Cases",
  traumaBody:
    "After an accident or old fracture, the bridge can look bent and one side may seem collapsed. Rhinoplasty helps restore straighter lines and better symmetry. Revision rhinoplasty in Delhi is planned cautiously because of scar tissue — we aim for conservative, realistic correction with priority on stability and function.",
  typesHeading: "Types of Rhinoplasty Surgery in Delhi We Offer at Care Well Medical Centre",
  typesIntro:
    "Every nose is different — the rhinoplasty procedure is always customised. We choose the technique that suits your nose structure, skin, breathing, and goals.",
  processHeading: "Rhinoplasty Procedure in Delhi – Step by Step Process",
  processIntro:
    "Rhinoplasty feels less stressful when you know what will happen at each stage. We explain the procedure in simple, practical steps.",
  processSteps: [
    {
      title: "Step 1 – Consultation and 3D Planning",
      body: "A full consultation with Dr. Sandeep Bhasin where you share concerns, medical history, and any previous nose surgery. We examine your nose from different angles, evaluate breathing, take photos, and may use 3D imaging or mirror discussion to show realistic changes and limits.",
    },
    {
      title: "Step 2 – Pre-Surgery Evaluation and Preparation",
      body: "Blood tests, anaesthesia fitness assessment, and required medical clearances. Written preparation instructions cover stopping painkillers or blood thinners, avoiding smoking and alcohol, rest, diet, and home arrangements for the first few days.",
    },
    {
      title: "Step 3 – Rhinoplasty Surgery Day",
      body: "Visit on an empty stomach. The anaesthesia team decides between general anaesthesia and sedation with local anaesthesia. We reshape bone and cartilage and place grafts if required under strict safety and hygiene protocols.",
    },
    {
      title: "Step 4 – Immediate Post-Operative Care",
      body: "A light external splint is placed over the nose, with soft internal support in certain cases. Pain is managed with prescribed medicines. Most patients return home the same day or next morning with instructions on cleaning, sleeping position, medicines, and activities to avoid.",
    },
    {
      title: "Step 5 – Follow Up and Long Term Result",
      body: "Early follow-ups remove packing or internal splints if used. The external splint usually comes off after a week. Deeper swelling and tip refinement continue to settle over months — we provide a realistic timeline at each stage.",
    },
  ],
  recoveryHeading: "Rhinoplasty Recovery in Delhi – Timeline and Do's & Don'ts",
  recoveryIntro:
    "Rhinoplasty recovery feels easier when you know how long each stage takes and what to avoid. We give every patient a clear, realistic roadmap.",
  recoveryTimelineHeading: "What Is the Recovery Time After Rhinoplasty?",
  recoveryTimeline: [
    "First week: Rest at home with a splint. Swelling and bruising are most visible.",
    "Two weeks: Most bruising settles. Many patients feel comfortable stepping out with light makeup or glasses.",
    "Three to six weeks: Social confidence returns. Heavy exercise still waits.",
    "Three to six months: Fine details and tip definition improve as deeper swelling reduces.",
  ],
  recoveryTimelineClosing:
    "Overall, rhinoplasty recovery time depends on skin thickness, extent of work, and how carefully you follow instructions.",
  afterCareHeading: "What Care Should You Take After Nose Surgery?",
  afterCareItems: [
    "Sleep with your head elevated on two pillows — avoid sleeping on your side or stomach",
    "Do not blow your nose forcefully; use gentle cleaning as demonstrated",
    "Avoid bending forward, lifting heavy weights, or intense exercise for a few weeks",
    "Protect from direct sun — use a hat or umbrella and follow your sunscreen plan once allowed",
    "Avoid heavy frames on the bridge; restart exercise gradually after surgeon clearance",
  ],
  finalResultsHeading: "When Can You See Final Rhinoplasty Results?",
  finalResultsBody:
    "Most patients see a clear change once the splint comes off, usually within three to four weeks — but this is not the final result. The upper nose refines earlier; the tip, especially in thicker skin, can take three to six months or longer. We always set realistic expectations.",
  resultsHeading: "Rhinoplasty Before and After Results at Care Well Medical Centre",
  resultsIntro:
    "Natural outcomes from rhinoplasty surgery in Delhi — refined profile and enhanced breathing without an obviously operated look.",
  resultsPoints: [
    "Improved side profile line of the nasal bridge",
    "Better tip shape and definition",
    "Optimised nostril width and flare",
  ],
  resultsClosing:
    "During consultation, you receive before and after photos with in-depth explanation to set realistic expectations.",
  costHeading: "Rhinoplasty Surgery Cost in Delhi – What You Need to Know",
  costIntro:
    "Rhinoplasty cost in Delhi depends on nose shape, cosmetic complexity, functional work on the septum and breathing, and whether it is a first-time or revision procedure. A full examination at Care Well Medical Centre provides your exact quote.",
  costTableHeading: "Average Rhinoplasty Cost in Delhi (Private Clinics)",
  costTableNote:
    "These figures help you understand typical rhinoplasty cost in Delhi. Final fees always depend on individual planning.",
  costVsCities:
    "In smaller cities, rhinoplasty cost in India can be lower. Delhi and metros are usually higher because of senior surgeons, advanced anaesthesia support, and higher running costs. Many patients choose Delhi for experience and structured follow-up.",
  costAiims:
    "Rhinoplasty cost in AIIMS Delhi is generally much lower as a government teaching hospital — but with limited slots, longer waiting times, and less scheduling flexibility. Private setups offer shorter waiting, personalised planning, and easier scheduling at a higher fee.",
  costNonSurgical:
    "Non surgical rhinoplasty with fillers costs ₹20,000 – ₹50,000 per session in Delhi. Results are temporary and need repeat sessions — long-term cost can approach surgical rhinoplasty in some cases.",
  costClosing:
    "At Care Well Medical Centre, you receive a clear written estimate after consultation with full cost breakup and guidance on EMI or instalment options where available.",
  whyClinicHeading: "Why Choose Care Well Medical Centre for Rhinoplasty in Delhi?",
  whyClinicSurgeonHeading: "Best Rhinoplasty Surgeon in Delhi NCR – Dr. Sandeep Bhasin",
  whyClinicItems: [
    "Extensive experience in primary rhinoplasty, septorhinoplasty, and revision cases",
    "Natural appearance that complements your overall face",
    "Emphasis on breathing and structural support during rhinoplasty",
    "Strict anaesthesia monitoring and globally accepted hygiene protocols",
    "Pre-anaesthesia fitness assessment before every surgery",
  ],
  hospitalHeading: "Hospital Setup and Safety Protocols",
  hospitalItems: [
    "Dedicated operation theatre with anaesthesia monitoring and sterile protocols",
    "Pre-anaesthesia checks and fitness assessment before surgery",
    "Standardised instruments, disposables, and hygiene systems",
  ],
  locationHeading: "Location Advantage in South Delhi",
  locationItems: [
    "Located in C.R. Park, South Delhi",
    "Convenient from Greater Kailash, Nehru Place, Alaknanda, East of Kailash, and nearby areas",
    "Easy access for follow-ups and urgent review",
  ],
  doctorProfileHeading: "Know Your Rhinoplasty Surgeon: Dr. Sandeep Bhasin",
  doctorProfileBody:
    "Where nose reshaping is concerned, your surgeon's skill counts the most. Dr. Sandeep Bhasin has 20+ years in cosmetic and reconstructive surgery — combining science and artistic perception for naturally looking outcomes.",
  doctorProfileItems: [
    "Hundreds of successful rhinoplasty surgeries",
    "Each operation adjusted to unique facial shape",
    "Newest methods for faster healing and reduced scarring",
    "Honest consultations and empathetic post-surgical care",
  ],
  consultationHeading: "Book Your Rhinoplasty Consultation Today!",
  consultationBody:
    "If you are looking for rhinoplasty surgery in Delhi, our professionals at Care Well Medical Centre are here to assist you.",
  testimonialsHeading: "Patient Reviews and Testimonials for Rhinoplasty in Delhi",
  testimonialsIntro:
    "Explore rhinoplasty testimonial videos and Google reviews from patients describing counselling, surgery, and follow-up care.",
  directionsHeading: "How to Reach Care Well Medical Centre for Rhinoplasty Surgery in Delhi",
  directionsAddress:
    "House No. 1, NRI Complex, Chittaranjan Park (C.R. Park), NRI Colony, Mandakini Enclave Colony, Alaknanda, New Delhi, Delhi 110019",
  landmarks: [
    "1 minute from Mandakini Enclave",
    "5 minutes from Greater Kailash II",
    "10 minutes from Nehru Place Metro Station",
  ],
  travelOptions: [
    "Metro: Nehru Place or Govindpuri Metro Station (Violet Line)",
    "Taxi/Car: Use Ring Road, turn at C.R. Park",
    "Bus: Nearby stops – C.R. Park Block B and Alaknanda",
  ],
  directionsClosing: "Need help finding us? Call 096679 77499 — we are happy to assist.",
  directionsNote:
    "Along with rhinoplasty, we offer a wide range of procedures under plastic surgery in Delhi.",
  bookConsultHeading: "Book Your Rhinoplasty Consultation in Delhi",
  bookConsultBody:
    "Taking the first step towards rhinoplasty in Delhi does not have to feel overwhelming. We explain every detail calmly so you understand options and limitations before you decide.",
  bookConsultGoal:
    "Our goal: a natural looking nose, better breathing where possible, and long-term confidence in the mirror and photographs.",
  bookConsultOptions: [
    "Call: 096679 77499",
    "WhatsApp: message on the same number for quick assistance",
    "Appointment form: fill the enquiry form on this page and our team will call you back",
  ],
  bookConsultClosing:
    "Even if you are not sure yet, a detailed consultation helps you understand whether rhinoplasty is right for you now.",
  faqHeading: "FAQs – Rhinoplasty in Delhi, Cost, Safety and Results",
  disclaimer:
    "Treatment suitability, surgical technique, and results vary between individuals. Rhinoplasty is a surgical procedure that should only be performed after consultation with a qualified plastic surgeon. This page is for informational purposes and does not replace medical advice.",
} as const;

export { HAIR_LOSS_CLINIC as RHINOPLASTY_CLINIC };

export const RHINOPLASTY_FAQS: { question: string; answer: string }[] = [
  {
    question: "What is rhinoplasty surgery and how does it work?",
    answer:
      "Rhinoplasty reshapes the nose and, when needed, improves breathing. The surgeon adjusts bone, cartilage, and soft tissue through an open or closed approach for a balanced nose that suits your face and maintains or improves nasal function.",
  },
  {
    question: "Who should consider rhinoplasty in Delhi?",
    answer:
      "Consider rhinoplasty if you are unhappy with nose shape, hump, nostril width, or profile, or if you have nasal blockage or chronic mouth breathing. Good candidates are healthy, have stable expectations, and want natural change.",
  },
  {
    question: "How much does rhinoplasty cost in Delhi on average?",
    answer:
      "Basic cosmetic rhinoplasty may start around ₹70,000, while functional or revision cases are higher. Exact fees depend on complexity, grafts, hospital setup, and surgeon expertise. A proper examination is necessary for an accurate estimate.",
  },
  {
    question: "Is rhinoplasty safe and what are the risks?",
    answer:
      "Rhinoplasty is generally safe when performed by an experienced surgeon in a proper hospital. Risks include infection, bleeding, asymmetry, breathing difficulty, or possible revision. Pre-surgery evaluation and sterile technique reduce but cannot eliminate risks.",
  },
  {
    question: "How long does rhinoplasty recovery take?",
    answer:
      "Most patients need about one week of home rest and around two weeks for major bruising to fade. Social comfort usually returns within three to six weeks. Fine tip refinement may take three to six months.",
  },
  {
    question: "Is non surgical rhinoplasty a good alternative to surgery?",
    answer:
      "Non surgical rhinoplasty uses fillers for minor, temporary changes. It cannot reduce nose size, correct major deformities, or improve breathing, and requires repeat treatments to maintain results.",
  },
  {
    question: "How do I choose the best rhinoplasty surgeon in Delhi?",
    answer:
      "Look for focused rhinoplasty experience, clear before and after examples, and genuine patient reviews. Training, hospital setup, and how honestly the surgeon explains limitations all matter.",
  },
  {
    question: "Is a nose job painful?",
    answer:
      "You will not feel pain during surgery under anaesthesia. During recovery, discomfort from congestion, swelling, bruising, and some nasal bleeding is normal and managed with prescribed medication.",
  },
  {
    question: "How successful is a nose job?",
    answer:
      "The success rate of rhinoplasty is approximately 85 to 90 percent, with revision rates around 10 to 15 percent. Board-certified surgeons who specialize in rhinoplasty typically achieve higher success rates.",
  },
];
