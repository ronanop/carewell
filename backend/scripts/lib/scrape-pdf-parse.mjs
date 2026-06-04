/**
 * Parse text exported by admin scraper PDFs (Care Well — Scrape Preview).
 */

const FOOTER_RE = /Generated from admin scraper[^\n]*/gi;
const PAGE_MARKER_RE = /--\s*\d+\s+of\s+\d+\s*--/g;

export function slugFromPdfFilename(filename) {
  const base = filename.replace(/\.pdf$/i, "");
  const m = base.match(/^scrape-(.+)-\d{4}-\d{2}-\d{2}$/i);
  if (!m) return null;
  return m[1].replace(/-\d{3}$/, "");
}

export function cleanPdfText(raw) {
  return raw
    .replace(FOOTER_RE, "")
    .replace(PAGE_MARKER_RE, "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function fieldAfter(text, label) {
  const re = new RegExp(`${label}:\\s*\\n?([\\s\\S]*?)(?=\\n[A-Z][^\\n]{0,48}:|\\n(?:Intro|SEO|Sections|FAQs|Headings|Full body text|Treatment cards)\\b|$)`, "i");
  const m = text.match(re);
  return m ? m[1].trim() : "";
}

const SECTION_LINE =
  "(?:Intro|SEO|Sections|FAQs(?:\\s*\\(\\d+\\))?|Headings(?:\\s*\\(H2[^)]*\\))?|Full body text|Treatment cards(?:\\s*\\(\\d+\\))?|Body snippet)";

function sectionAfter(text, heading) {
  if (/^full body text$/i.test(heading)) {
    const m = text.match(/\nFull body text\s*\n/i);
    if (!m) return "";
    return text.slice(m.index + m[0].length).trim();
  }

  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `(?:^|\\n)${escaped}(?:\\s*\\(\\d+\\))?\\s*\\n([\\s\\S]*?)(?=\\n${SECTION_LINE}\\s*\\n|$)`,
    "i",
  );
  const matched = text.match(re);
  return matched ? matched[1].trim() : "";
}

export function parseScrapePdfText(rawText) {
  const text = cleanPdfText(rawText);

  const oldSlug = fieldAfter(text, "Old slug").split("\n")[0]?.trim() || "";
  const legacyPath = fieldAfter(text, "Legacy path").split("\n")[0]?.trim() || "";
  const url = fieldAfter(text, "URL").split("\n")[0]?.trim() || "";

  const seoBlock = sectionAfter(text, "SEO") || fieldAfter(text, "SEO");
  const title =
    fieldAfter(seoBlock, "Title").split("\n")[0]?.trim() ||
    fieldAfter(text, "Title").split("\n")[0]?.trim() ||
    "";
  const metaDescription =
    fieldAfter(seoBlock, "Meta description").replace(/\s+/g, " ").trim() ||
    fieldAfter(text, "Meta description").replace(/\s+/g, " ").trim() ||
    "";
  const h1 = fieldAfter(text, "H1").split("\n")[0]?.trim() || "";

  const intro = sectionAfter(text, "Intro");
  const sectionsRaw = sectionAfter(text, "Sections");
  const fullBody = sectionAfter(text, "Full body text");
  const faqsRaw = sectionAfter(text, "FAQs");

  const faqs = parseFaqs(faqsRaw);
  const sections = parseSections(sectionsRaw);

  const bodySource = fullBody || [intro, sectionsRaw].filter(Boolean).join("\n\n");

  return {
    oldSlug,
    legacyPath,
    url,
    title: title.replace(/\s*\|\s*Care Well.*$/i, "").trim(),
    metaDescription,
    h1: h1 || title,
    intro,
    sections,
    faqs,
    fullBody: bodySource,
  };
}

function parseFaqs(block) {
  if (!block) return [];
  const faqs = [];
  const parts = block.split(/\nQ:\s*/).filter(Boolean);
  for (const part of parts) {
    const qa = part.match(/^([\s\S]*?)\nA:\s*([\s\S]*?)(?=\nQ:\s*|$)/);
    if (qa) {
      faqs.push({
        question: qa[1].replace(/\s+/g, " ").trim(),
        answer: qa[2].replace(/\s+/g, " ").trim(),
      });
      continue;
    }
    const question = part.replace(/\s+/g, " ").trim();
    if (question.length > 8) faqs.push({ question, answer: "" });
  }
  return faqs;
}

function parseSections(block) {
  if (!block) return [];
  const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
  const sections = [];
  let current = null;

  for (const line of lines) {
    if (isHeadingLine(line) && line.length < 160) {
      if (current) sections.push(current);
      current = { heading: line, paragraphs: [] };
      continue;
    }
    if (!current) {
      current = { heading: "Overview", paragraphs: [] };
    }
    current.paragraphs.push(line.replace(/\s+/g, " ").trim());
  }
  if (current) sections.push(current);
  return sections;
}

export function isHeadingLine(line) {
  const t = line.trim();
  if (!t || t.length > 160) return false;
  if (/^(table of contents)$/i.test(t)) return true;
  if (/[.!?]$/.test(t)) return false;
  const words = t.split(/\s+/).length;
  if (words > 22) return false;
  if (t.length <= 100 && words <= 16) return true;
  return false;
}

function splitLongChunk(chunk, maxLen = 2800) {
  if (chunk.length <= maxLen) return [chunk];
  const sentences = chunk.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [chunk];
  const parts = [];
  let buf = "";
  for (const s of sentences) {
    const next = `${buf} ${s}`.trim();
    if (next.length > maxLen && buf) {
      parts.push(buf);
      buf = s.trim();
    } else {
      buf = next;
    }
  }
  if (buf) parts.push(buf);
  return parts;
}

/** PDF text uses mostly single newlines — merge wrapped lines, then split real paragraphs. */
export function splitBodyParagraphs(body) {
  if (!body) return [];

  const lines = body
    .split(/\n+/)
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter((l) => l.length > 0 && !/^Generated from/i.test(l));

  const merged = [];
  let current = "";

  for (const line of lines) {
    if (!current) {
      current = line;
      continue;
    }

    const startsNew =
      isHeadingLine(line) ||
      (/[.!?]$/.test(current) && /^[A-Z0-9"'(]/.test(line) && line.length > 40);

    if (startsNew) {
      merged.push(current);
      current = line;
    } else {
      current = `${current} ${line}`;
    }
  }
  if (current) merged.push(current);

  const out = [];
  for (const chunk of merged) {
    const normalized = chunk.replace(/\s+/g, " ").trim();
    if (!normalized) continue;
    out.push(...splitLongChunk(normalized));
  }
  return out;
}

export function inferCategory(slug, title, h1) {
  const s = `${slug} ${title} ${h1}`.toLowerCase();
  if (/vitiligo|jodhpur|phototherapy|penile-vitiligo/.test(s)) return "cat-skin-vitiligo";
  if (/hymenoplasty|hymen|vaginal|breast|liposuction|gynecomastia|bbl|butt|mommy|penile|nipple|flank/.test(s))
    return "cat-body";
  if (/hbot|hyperbaric|oxygen|iv-therap/.test(s)) return "cat-therapies";
  if (/rhinoplasty|nose|botox|facelift|eyebrow|blepharoplasty|eyelid|microblading|gummy|jawline|thread-lift|hifu|hydrafacial|chemical-peel|bb-glow|laser-toning|carbon-peel|vampire/.test(s))
    return "cat-face";
  if (/bridal|anti-aging|wrinkle|peel|facial|acne|psoriasis|wart|birthmark|skin-whitening|glutathione|microneedling|microdermabrasion/.test(s))
    return "cat-skin-vitiligo";
  if (/hair|transplant|alopecia|prp|gfc|minoxidil|finasteride|beard|scalp|graft|weaving|dhi|fue|fut/.test(s))
    return "cat-hair";
  return "cat-hair";
}

export function defaultPriceForCategory(category) {
  const map = {
    "cat-hair": 25000,
    "cat-skin-vitiligo": 12000,
    "cat-face": 45000,
    "cat-body": 90000,
    "cat-therapies": 15000,
  };
  return map[category] ?? 20000;
}
