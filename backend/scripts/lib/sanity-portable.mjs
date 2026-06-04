import { isHeadingLine, splitBodyParagraphs } from "./scrape-pdf-parse.mjs";

let keyCounter = 0;
function key(prefix) {
  keyCounter += 1;
  return `${prefix}-${keyCounter}-${Math.random().toString(36).slice(2, 9)}`;
}

export function resetPortableKeys() {
  keyCounter = 0;
}

function block(text, style = "normal") {
  return {
    _type: "block",
    _key: key("b"),
    style,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: key("s"),
        text,
        marks: [],
      },
    ],
  };
}

/** Full article body — every paragraph from PDF “Full body text” (no truncation). */
export function portableTextFromBody(fullBody) {
  const blocks = [];
  for (const para of splitBodyParagraphs(fullBody)) {
    blocks.push(block(para, isHeadingLine(para) ? "h2" : "normal"));
  }
  if (blocks.length === 0 && fullBody?.trim()) {
    blocks.push(block(fullBody.trim(), "normal"));
  }
  return blocks;
}

export function ensureFaqs(parsedFaqs, fullBody, title) {
  const faqs = [...parsedFaqs].filter((f) => f.question?.length > 5);

  if (faqs.length < 8 && fullBody) {
    const qaMatches = [...fullBody.matchAll(/([^\n?]{12,220}\?)\s*([^\n?]{20,800}[.!])/g)];
    for (const m of qaMatches) {
      if (faqs.length >= 12) break;
      const question = m[1].replace(/\s+/g, " ").trim();
      const answer = m[2].replace(/\s+/g, " ").trim();
      if (!faqs.some((f) => f.question === question)) {
        faqs.push({ question, answer });
      }
    }
  }

  const fillers = [
    {
      question: `How do I book a consultation about ${title}?`,
      answer: "Call or WhatsApp Care Well Medical Centre, Chittaranjan Park, South Delhi, to schedule a free consultation.",
    },
    {
      question: "Is this information a substitute for medical advice?",
      answer: "No. This content is for education only. Diagnosis and treatment plans require an in-person assessment.",
    },
    {
      question: "Who reviews cases at Care Well Medical Centre?",
      answer: "Dr. Sandeep Bhasin and the clinical team evaluate suitability, risks, and expected outcomes before any procedure.",
    },
    {
      question: "Where is the clinic located?",
      answer: "Care Well Medical Centre is in Chittaranjan Park, South Delhi, serving patients across Delhi NCR.",
    },
  ];

  for (const f of fillers) {
    if (faqs.length >= 8) break;
    if (!faqs.some((x) => x.question === f.question)) faqs.push(f);
  }

  return faqs.slice(0, 16).map((f) => ({
    _type: "faqItem",
    _key: key("faq"),
    question: f.question,
    answer: f.answer || "Discuss your case with our doctors during consultation for personalised guidance.",
  }));
}
