import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Load .env / .env.local like Next.js (no extra dependency). Later files do not override existing env. */
function loadEnvFiles() {
  const root = join(__dirname, "..");
  for (const name of [".env.local", ".env"]) {
    const p = join(root, name);
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const eq = t.indexOf("=");
      if (eq === -1) continue;
      const key = t.slice(0, eq).trim();
      let val = t.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  }
}

loadEnvFiles();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing Sanity credentials. Add to .env.local in the project root:\n" +
      "  NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id\n" +
      "  NEXT_PUBLIC_SANITY_DATASET=production\n" +
      "  SANITY_API_WRITE_TOKEN=your_token_with_editor_rights\n" +
      "Create a token: https://www.sanity.io/manage → Project → API → Tokens",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const now = new Date().toISOString();

function textBlock(text) {
  return [
    {
      _type: "block",
      _key: `b-${Math.random().toString(36).slice(2, 8)}`,
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: `s-${Math.random().toString(36).slice(2, 8)}`,
          text,
          marks: [],
        },
      ],
    },
  ];
}

/** Multiple paragraphs as Sanity Portable Text blocks */
function portableParagraphs(paragraphs) {
  return paragraphs.map((text, i) => ({
    _type: "block",
    _key: `p-${i}-${Math.random().toString(36).slice(2, 9)}`,
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `ps-${i}-${Math.random().toString(36).slice(2, 9)}`,
        text,
        marks: [],
      },
    ],
  }));
}

const HAIR_TRANSPLANT_WHAT_IS_PARAS = [
  "Struggling with hair baldness due to heredity, illness, or any other reasons? Seeking the best-in-class hair transplant experience to overcome this issue? Welcome to Care Well Medical Centre, where treatment meets precision. Under the supervision of Dr. Sandeep Bhasin, a surgeon with around two decades of excellent healthcare track record, the clinic has become the go-to option for hair transplant in Delhi.",
  "You find a well-rounded medical team that is professional yet empathetic. Finding the root cause and implementing the custom and cost-effective solution with a 99% success rate make patients trust Care Well Medical Centre for this treatment.",
  "Dr. Sandeep Bhasin personally plans and supervises every procedure to ensure safe, natural outcomes.",
];

async function upsert(doc) {
  await client.createOrReplace(doc);
}

const relatedByCategory = {
  "cat-face": "svc-rhinoplasty",
  "cat-body": "svc-liposuction",
  "cat-skin-vitiligo": "svc-vitiligo-treatment",
  "cat-therapies": "svc-iv-therapies",
};

async function seedLegacyServicesFromMap() {
  const p = join(__dirname, "..", "data", "legacy-url-map.json");
  if (!existsSync(p)) {
    console.log("No data/legacy-url-map.json — skip legacy service seed.");
    return;
  }
  const { services: legacy } = JSON.parse(readFileSync(p, "utf8"));
  for (const s of legacy) {
    const _id = `svc-${String(s.slug).replace(/[^a-z0-9-]/gi, "-")}`;
    const rel = relatedByCategory[s.category] || "svc-rhinoplasty";
    await upsert({
      _id,
      _type: "service",
      title: s.title,
      slug: { _type: "slug", current: s.slug },
      locale: "en",
      category: { _type: "reference", _ref: s.category },
      tagline: `${s.title} at Care Well Medical Centre, Chittaranjan Park, South Delhi — led by Dr. Sandeep Bhasin.`,
      quickFacts: [
        { _type: "quickFact", label: "Consultation", value: "By appointment" },
        { _type: "quickFact", label: "Location", value: "South Delhi" },
      ],
      whatIsBody: textBlock(
        `${s.title}: this page replaces the previous carewellmedicalcentre.com URL for the same topic. Clinical details and pricing ranges are confirmed at consultation. Replace this paragraph with final approved medical copy in Sanity Studio.`,
      ),
      insightPoints: [
        "Treatment plans are personalized after examination.",
        "Candidacy and risks are discussed before consent.",
        "Recovery timelines vary by procedure and individual factors.",
      ],
      howItWorksSteps: [
        { _type: "howItWorksStep", title: "Consultation", description: "Goals, history, and examination." },
        { _type: "howItWorksStep", title: "Assessment", description: "Medical suitability and planning." },
        { _type: "howItWorksStep", title: "Procedure", description: "Treatment as per the agreed plan." },
        { _type: "howItWorksStep", title: "Recovery", description: "Aftercare instructions and follow-up." },
      ],
      candidateGood: ["Adults seeking assessment for this concern", "Committed to aftercare instructions"],
      candidatePoor: ["Uncontrolled medical conditions (needs clearance)", "Unrealistic expectations without consultation"],
      pricingFromInr: s.price,
      pricingFactors: ["Case complexity", "Technique and extent", "Facility and support care"],
      pricingEmiNote: "EMI options may be available for eligible treatment plans — ask during consultation.",
      valueStack: ["Consultation review", "Procedure planning", "Post-procedure guidance"],
      faq: [
        { _type: "faqItem", question: "How do I book?", answer: "Call or WhatsApp Care Well Medical Centre for a free consultation slot." },
        { _type: "faqItem", question: "Is a physical consultation required?", answer: "Most surgical and aesthetic plans require an in-person assessment." },
        { _type: "faqItem", question: "How long is recovery?", answer: "Recovery depends on the procedure and your individual healing — your doctor will outline this." },
        { _type: "faqItem", question: "Are there risks?", answer: "Risks are explained during consent; not every treatment is suitable for every patient." },
        { _type: "faqItem", question: "Do you offer EMI?", answer: "Ask the front desk about applicable EMI or partner programs." },
        { _type: "faqItem", question: "Where is the clinic?", answer: "Chittaranjan Park, South Delhi." },
        { _type: "faqItem", question: "Who performs the procedure?", answer: "Procedures are planned and performed under Dr. Sandeep Bhasin and the Care Well team as appropriate." },
        {
          _type: "faqItem",
          question: "How to book at Care Well?",
          answer: "Call/WhatsApp Care Well Medical Centre, Chittaranjan Park, South Delhi.",
        },
      ],
      relatedServices: [{ _type: "reference", _ref: rel }],
      treatmentDropdownLabel: s.title,
      seo: {
        _type: "seo",
        title: `${s.title} in Delhi | Care Well Medical Centre`,
        description: `${s.title} consultation and treatment in Delhi NCR at Care Well Medical Centre, Chittaranjan Park.`,
      },
      _updatedAt: now,
    });
  }
  console.log(`Seeded ${legacy.length} legacy-mapped services.`);
}

const categories = [
  { _id: "cat-hair", title: "Hair", slug: "hair", key: "hair" },
  {
    _id: "cat-skin-vitiligo",
    title: "Skin & Vitiligo",
    slug: "skin-vitiligo",
    key: "skinVitiligo",
  },
  { _id: "cat-face", title: "Face", slug: "face", key: "face" },
  { _id: "cat-body", title: "Body", slug: "body", key: "body" },
  { _id: "cat-therapies", title: "Therapies", slug: "therapies", key: "therapies" },
];

const services = [
  { _id: "svc-hair-transplant", title: "Hair Transplant", slug: "hair-transplant", category: "cat-hair", locale: "en", price: 45000 },
  { _id: "svc-prp-hair", title: "PRP Hair Therapy", slug: "prp-hair", category: "cat-hair", locale: "en", price: 9000 },
  { _id: "svc-vitiligo-treatment", title: "Vitiligo Treatment", slug: "vitiligo-treatment", category: "cat-skin-vitiligo", locale: "en", price: 18000 },
  { _id: "svc-pigmentation-treatment", title: "Pigmentation Treatment", slug: "pigmentation-treatment", category: "cat-skin-vitiligo", locale: "en", price: 12000 },
  { _id: "svc-rhinoplasty", title: "Rhinoplasty", slug: "rhinoplasty", category: "cat-face", locale: "en", price: 120000 },
  { _id: "svc-facelift", title: "Facelift", slug: "facelift", category: "cat-face", locale: "en", price: 160000 },
  { _id: "svc-liposuction", title: "Liposuction", slug: "liposuction", category: "cat-body", locale: "en", price: 90000 },
  { _id: "svc-body-contouring", title: "Body Contouring", slug: "body-contouring", category: "cat-body", locale: "en", price: 110000 },
  { _id: "svc-hbot", title: "HBOT", slug: "hbot", category: "cat-therapies", locale: "en", price: 15000 },
  { _id: "svc-iv-therapies", title: "IV Therapies", slug: "iv-therapies", category: "cat-therapies", locale: "en", price: 7000 },
  { _id: "svc-hair-transplant-hi", title: "हेयर ट्रांसप्लांट", slug: "hair-transplant-hi", category: "cat-hair", locale: "hi", price: 45000 },
  { _id: "svc-vitiligo-treatment-hi", title: "विटिलिगो उपचार", slug: "vitiligo-treatment-hi", category: "cat-skin-vitiligo", locale: "hi", price: 18000 },
];

const blogPosts = [
  { _id: "blog-hair-pillar", title: "Hair Transplant in Delhi: Complete Guide", slug: "hair-transplant-delhi-guide", category: "hair", role: "pillar" },
  { _id: "blog-hair-cluster-1", title: "Hairline Design Basics", slug: "hairline-design-basics", category: "hair", role: "cluster" },
  { _id: "blog-hair-cluster-2", title: "FUE Recovery Timeline", slug: "fue-recovery-timeline", category: "hair", role: "cluster" },
  { _id: "blog-vitiligo-pillar", title: "Vitiligo Treatment Options in Delhi", slug: "vitiligo-treatment-options-delhi", category: "vitiligo", role: "pillar" },
  { _id: "blog-vitiligo-cluster-1", title: "Is Vitiligo Curable?", slug: "is-vitiligo-curable", category: "vitiligo", role: "cluster" },
  { _id: "blog-face-1", title: "Rhinoplasty: What to Expect", slug: "rhinoplasty-what-to-expect", category: "face", role: "standalone" },
  { _id: "blog-body-1", title: "Liposuction Myths vs Facts", slug: "liposuction-myths-facts", category: "body", role: "standalone" },
  { _id: "blog-therapy-1", title: "HBOT Benefits Explained", slug: "hbot-benefits-explained", category: "therapies", role: "standalone" },
  { _id: "blog-antiaging-1", title: "Anti-Aging Planning Checklist", slug: "anti-aging-planning-checklist", category: "anti-aging", role: "standalone" },
  { _id: "blog-hindi-1", title: "दिल्ली में हेयर ट्रांसप्लांट गाइड", slug: "hair-transplant-hindi-guide", category: "hindi", role: "standalone" },
];

async function main() {
  await upsert({
    _id: "site-settings",
    _type: "siteSettings",
    siteName: "Care Well Medical Centre",
    phone: "+91 96679 77499",
    whatsappNumber: "919667977499",
    email: "queries@carewellmedicalcentre.in",
    address: "Chittaranjan Park, South Delhi",
    mbbsRegNo: "MBBS-REG-NO",
    medicalDisclaimer:
      "This website is for informational purposes and does not replace in-clinic diagnosis.",
    helloBarMessages: ["Free consultation — Limited slots.", "Response within 2 hours."],
    patientCounterLabel: "Patients treated this month",
    patientCounterValue: 120,
    hours: ["Mon-Sun: 10:00-19:00"],
  });

  await upsert({
    _id: "main-navigation",
    _type: "navigation",
    title: "Main navigation",
    items: [
      { _type: "navItem", label: "Home", href: "/" },
      { _type: "navItem", label: "Services", href: "/treatments/hair", isMega: true },
      { _type: "navItem", label: "Blog", href: "/blog" },
      { _type: "navItem", label: "Gallery", href: "/gallery" },
      { _type: "navItem", label: "Contact", href: "/contact" },
    ],
    footerColumns: [
      {
        _type: "object",
        heading: "Quick Links",
        links: [
          { _type: "object", label: "About", href: "/about" },
          { _type: "object", label: "Book Consultation", href: "/book-consultation" },
        ],
      },
    ],
  });

  for (const c of categories) {
    await upsert({
      _id: c._id,
      _type: "serviceCategory",
      title: c.title,
      slug: { _type: "slug", current: c.slug },
      megaMenuKey: c.key,
      heroSubtitle: `${c.title} treatments at Care Well Medical Centre.`,
      intro: textBlock(`${c.title} category introduction. Replace with approved content.`),
      comparisonRows: [
        { _type: "object", treatment: `${c.title} Option A`, bestFor: "Early stage profile", downtime: "Few days" },
        { _type: "object", treatment: `${c.title} Option B`, bestFor: "Advanced stage profile", downtime: "1-2 weeks" },
      ],
      faq: [
        { _type: "faqItem", question: `Which ${c.title} option is right for me?`, answer: "Book a consultation for personalized advice." },
        { _type: "faqItem", question: "How to book at Care Well?", answer: "Call or WhatsApp for free consultation slots." },
      ],
      seo: {
        _type: "seo",
        title: `${c.title} Treatments in Delhi | Care Well`,
        description: `${c.title} treatment options in Delhi NCR by Care Well Medical Centre.`,
      },
    });
  }

  for (const s of services) {
    await upsert({
      _id: s._id,
      _type: "service",
      title: s.title,
      slug: { _type: "slug", current: s.slug },
      locale: s.locale,
      category: { _type: "reference", _ref: s.category },
      tagline: `${s.title} in Delhi NCR by Dr. Sandeep Bhasin.`,
      quickFacts: [
        { _type: "quickFact", label: "Procedure time", value: "45-120 mins" },
        { _type: "quickFact", label: "Recovery", value: "2-7 days" },
      ],
      whatIsBody:
        s.slug === "hair-transplant"
          ? portableParagraphs(HAIR_TRANSPLANT_WHAT_IS_PARAS)
          : textBlock(`${s.title} explanation in simple terms. Replace with final approved copy.`),
      insightPoints: [
        "Personalized diagnosis improves outcomes.",
        "Clinical suitability must be assessed in-person.",
        "Follow-up protocol impacts long-term results.",
      ],
      howItWorksSteps: [
        { _type: "howItWorksStep", title: "Consultation", description: "Initial doctor consultation." },
        { _type: "howItWorksStep", title: "Assessment", description: "Medical suitability check." },
        { _type: "howItWorksStep", title: "Procedure", description: "Treatment planning and execution." },
        { _type: "howItWorksStep", title: "Recovery", description: "Recovery instructions and support." },
      ],
      youtubeVideoId:
        s.slug === "hair-transplant" || s.slug === "hair-transplant-hi" ? "J2tW5o82WK0" : "dQw4w9WgXcQ",
      candidateGood: ["Suitable profile example 1", "Suitable profile example 2"],
      candidatePoor: ["Not ideal profile example 1", "Requires further medical workup"],
      pricingFromInr: s.price,
      pricingFactors: ["Complexity", "Area coverage", "Technique"],
      pricingEmiNote: "0% EMI partners may be available for eligible profiles.",
      valueStack: ["Consultation", "Procedure support", "Follow-up"],
      faq: [
        { _type: "faqItem", question: "Is this painful?", answer: "Most cases are manageable with standard pain protocols." },
        { _type: "faqItem", question: "How long does recovery take?", answer: "Recovery depends on procedure and profile." },
        { _type: "faqItem", question: "How many sessions are needed?", answer: "Session count is finalized after assessment." },
        { _type: "faqItem", question: "Any side effects?", answer: "Risks are explained before consent." },
        { _type: "faqItem", question: "When can I resume work?", answer: "Return timelines vary by case and doctor advice." },
        { _type: "faqItem", question: "Are results permanent?", answer: "Longevity depends on diagnosis and maintenance." },
        { _type: "faqItem", question: "Who is a good candidate?", answer: "A doctor confirms candidacy after evaluation." },
        { _type: "faqItem", question: "How to book at Care Well?", answer: "Call/WhatsApp Care Well, Chittaranjan Park, South Delhi." },
      ],
      relatedServices: [{ _type: "reference", _ref: "svc-hair-transplant" }],
      treatmentDropdownLabel: s.title,
      seo: {
        _type: "seo",
        title: `${s.title} in Delhi | Care Well`,
        description: `${s.title} consultation and treatment in Delhi NCR with Care Well Medical Centre.`,
      },
      _updatedAt: now,
    });
  }

  await upsert({
    _id: "author-dr-bhasin",
    _type: "author",
    name: "Dr. Sandeep Bhasin",
    slug: { _type: "slug", current: "dr-sandeep-bhasin" },
    credentials: "MBBS, MS",
    bio: textBlock("Lead consultant at Care Well Medical Centre."),
  });

  for (const p of blogPosts) {
    await upsert({
      _id: p._id,
      _type: "blogPost",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      category: p.category,
      featured: p._id === "blog-hair-pillar",
      excerpt: `${p.title} - seed excerpt. Replace with editorial copy.`,
      author: { _type: "reference", _ref: "author-dr-bhasin" },
      publishedAt: now,
      updatedAt: now,
      readTimeMinutes: p.role === "pillar" ? 18 : 8,
      body: textBlock(`${p.title} - seed body content.`),
      midArticleCtaTitle: "Have questions?",
      midArticleCtaHref: "/book-consultation",
      clusterRole: p.role,
      linkedService: { _type: "reference", _ref: "svc-hair-transplant" },
      seo: {
        _type: "seo",
        title: `${p.title} | Care Well Blog`,
        description: `${p.title} by Dr. Sandeep Bhasin at Care Well Medical Centre.`,
      },
    });
  }

  await upsert({
    _id: "gallery-seed-1",
    _type: "galleryItem",
    title: "Hair case sample",
    category: "hair",
    treatmentDetail: "Seed entry - upload consented before/after images in Studio.",
    consentOnFile: true,
    seo: {
      _type: "seo",
      title: "Hair Results Gallery",
      description: "Before and after examples.",
    },
  });

  await upsert({
    _id: "testimonial-1",
    _type: "testimonial",
    quote: "Professional team and clear treatment guidance.",
    attribution: "Patient A",
    rating: 5,
    order: 1,
  });

  await upsert({
    _id: "hyperlocal-faridabad",
    _type: "hyperlocalPage",
    title: "Hair Transplant for Faridabad Patients",
    slug: { _type: "slug", current: "hair-transplant-faridabad" },
    areaName: "Faridabad",
    serviceFocus: "Hair Transplant",
    distanceFromClinic: "~25 km",
    directions: textBlock("Travel via Nehru Place corridor to Chittaranjan Park, South Delhi."),
    body: textBlock("Hyperlocal seed content. Replace with approved local SEO copy."),
    linkedService: { _type: "reference", _ref: "svc-hair-transplant" },
    seo: {
      _type: "seo",
      title: "Hair Transplant Faridabad | Care Well",
      description: "Consult Care Well from Faridabad.",
    },
  });

  await upsert({
    _id: "redirect-seed-old-hair",
    _type: "redirect",
    fromPath: "/old-hair-transplant",
    toPath: "/services/hair-transplant",
    statusCode: 301,
  });

  await seedLegacyServicesFromMap();

  console.log("Sanity seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
