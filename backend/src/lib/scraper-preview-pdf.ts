import type { jsPDF } from "jspdf";
import { oldSlugFromUrl } from "@/lib/scraper-slug";

export type ScrapePreviewPdfInput = {
  url: string;
  oldSlug?: string;
  legacyPath?: string;
  title: string | null;
  metaDescription: string | null;
  h1: string | null;
  headings: string[];
  bodySnippet: string | null;
  introParagraphs: string[];
  sections: { heading: string; paragraphs: string[] }[];
  treatmentCards: { title: string; excerpt?: string; href?: string }[];
  faqs: { question: string; answer?: string }[];
  bodyText: string;
  breadcrumbs?: string[];
};

const MARGIN = 14;
const LINE_HEIGHT = 5;
const FOOTER_Y_OFFSET = 10;
const FOOTER_TEXT = "Generated from admin scraper — not published";

function pageBottom(doc: jsPDF): number {
  return doc.internal.pageSize.getHeight() - MARGIN;
}

function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  if (y + needed <= pageBottom(doc)) return y;
  doc.addPage();
  return MARGIN;
}

function addFooter(doc: jsPDF): void {
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i += 1) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(120, 120, 120);
    doc.text(FOOTER_TEXT, MARGIN, doc.internal.pageSize.getHeight() - FOOTER_Y_OFFSET);
    doc.setTextColor(0, 0, 0);
  }
}

function addWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSize = 10,
): number {
  doc.setFontSize(fontSize);
  const lines = doc.splitTextToSize(text, maxWidth) as string[];
  for (const line of lines) {
    y = ensureSpace(doc, y, LINE_HEIGHT);
    doc.text(line, x, y);
    y += LINE_HEIGHT;
  }
  return y;
}

function addSectionHeading(doc: jsPDF, title: string, y: number, maxWidth: number): number {
  y = ensureSpace(doc, y, LINE_HEIGHT + 4);
  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, title, MARGIN, y + 2, maxWidth, 11);
  doc.setFont("helvetica", "normal");
  return y + 2;
}

function addLabelValue(
  doc: jsPDF,
  label: string,
  value: string,
  y: number,
  maxWidth: number,
): number {
  y = ensureSpace(doc, y, LINE_HEIGHT * 2);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(`${label}:`, MARGIN, y);
  doc.setFont("helvetica", "normal");
  return addWrappedText(doc, value, MARGIN, y + LINE_HEIGHT, maxWidth);
}

type PdfLibs = {
  jsPDF: typeof import("jspdf").jsPDF;
  autoTable: typeof import("jspdf-autotable").default;
};

async function loadPdfLibs(): Promise<PdfLibs> {
  const [{ jsPDF }, { default: autoTable }] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
  ]);
  return { jsPDF, autoTable };
}

export function slugFromPreviewUrl(url: string): string {
  return oldSlugFromUrl(url);
}

export function scrapePreviewPdfFilename(
  url: string,
  scrapedAt = new Date(),
  oldSlug?: string,
): string {
  const slug = oldSlug ?? slugFromPreviewUrl(url);
  const date = scrapedAt.toISOString().slice(0, 10);
  return `scrape-${slug}-${date}.pdf`;
}

function uniquePdfFilename(
  item: ScrapePreviewPdfInput,
  index: number,
  scrapedAt: Date,
  used: Set<string>,
): string {
  let name = scrapePreviewPdfFilename(item.url, scrapedAt, item.oldSlug);
  if (!used.has(name)) {
    used.add(name);
    return name;
  }
  const slug = item.oldSlug ?? slugFromPreviewUrl(item.url);
  const date = scrapedAt.toISOString().slice(0, 10);
  name = `scrape-${slug}-${String(index + 1).padStart(3, "0")}-${date}.pdf`;
  while (used.has(name)) {
    name = `scrape-${slug}-${String(index + 1).padStart(3, "0")}-${Date.now()}-${date}.pdf`;
  }
  used.add(name);
  return name;
}

/** Renders full scraped content for one URL (no summarization). */
export function renderPreviewIntoDoc(
  doc: jsPDF,
  preview: ScrapePreviewPdfInput,
  autoTable: PdfLibs["autoTable"],
): void {
  const maxWidth = doc.internal.pageSize.getWidth() - MARGIN * 2;
  let y = MARGIN;

  const oldSlug = preview.oldSlug ?? slugFromPreviewUrl(preview.url);
  const legacyPath = preview.legacyPath ?? new URL(preview.url).pathname;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Care Well — Scrape Preview", MARGIN, y);
  y += 9;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  y = addLabelValue(doc, "Old slug", oldSlug, y, maxWidth);
  y = addLabelValue(doc, "Legacy path", legacyPath, y, maxWidth);
  y = addLabelValue(doc, "URL", preview.url, y, maxWidth);
  y = addLabelValue(doc, "Scraped", new Date().toLocaleString(), y, maxWidth);

  if (preview.breadcrumbs && preview.breadcrumbs.length > 0) {
    y = addLabelValue(doc, "Breadcrumbs", preview.breadcrumbs.join(" › "), y, maxWidth);
  }

  y += 4;
  y = addSectionHeading(doc, "SEO", y, maxWidth);
  y = addLabelValue(doc, "Title", preview.title ?? "—", y, maxWidth);
  y = addLabelValue(doc, "Meta description", preview.metaDescription ?? "—", y, maxWidth);
  y = addLabelValue(doc, "H1", preview.h1 ?? "—", y, maxWidth);

  if (preview.introParagraphs.length > 0) {
    y += 2;
    y = addSectionHeading(doc, "Intro", y, maxWidth);
    for (const paragraph of preview.introParagraphs) {
      y = addWrappedText(doc, paragraph, MARGIN, y, maxWidth);
      y += 2;
    }
  }

  if (preview.treatmentCards.length > 0) {
    y = ensureSpace(doc, y, 20);
    y = addSectionHeading(doc, `Treatment cards (${preview.treatmentCards.length})`, y, maxWidth);
    autoTable(doc, {
      startY: y,
      head: [["Title", "Link", "Excerpt"]],
      body: preview.treatmentCards.map((card) => [
        card.title,
        card.href ?? "—",
        card.excerpt ?? "—",
      ]),
      margin: { left: MARGIN, right: MARGIN },
      styles: { fontSize: 8, cellPadding: 2, overflow: "linebreak" },
      headStyles: { fillColor: [10, 46, 82] },
      columnStyles: {
        0: { cellWidth: 45 },
        1: { cellWidth: 55 },
        2: { cellWidth: "auto" },
      },
    });
    y = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y;
    y += 6;
  }

  if (preview.faqs.length > 0) {
    y = addSectionHeading(doc, `FAQs (${preview.faqs.length})`, y, maxWidth);
    for (const faq of preview.faqs) {
      y = ensureSpace(doc, y, LINE_HEIGHT * 3);
      doc.setFont("helvetica", "bold");
      y = addWrappedText(doc, `Q: ${faq.question}`, MARGIN, y, maxWidth);
      doc.setFont("helvetica", "normal");
      if (faq.answer) {
        y = addWrappedText(doc, `A: ${faq.answer}`, MARGIN, y, maxWidth);
      }
      y += 3;
    }
  }

  if (preview.sections.length > 0) {
    y = addSectionHeading(doc, "Sections", y, maxWidth);
    for (const section of preview.sections) {
      y = ensureSpace(doc, y, LINE_HEIGHT * 2);
      doc.setFont("helvetica", "bold");
      y = addWrappedText(doc, section.heading, MARGIN, y, maxWidth, 10);
      doc.setFont("helvetica", "normal");
      for (const paragraph of section.paragraphs) {
        y = addWrappedText(doc, paragraph, MARGIN, y, maxWidth);
        y += 1;
      }
      y += 2;
    }
  }

  if (preview.headings.length > 0) {
    y = addSectionHeading(doc, "Headings (H2–H3)", y, maxWidth);
    for (const heading of preview.headings) {
      y = addWrappedText(doc, `• ${heading}`, MARGIN, y, maxWidth);
    }
    y += 2;
  }

  if (preview.bodyText) {
    y = addSectionHeading(doc, "Full body text", y, maxWidth);
    addWrappedText(doc, preview.bodyText, MARGIN, y, maxWidth, 9);
  }
}

function buildSinglePagePdf(
  jsPDF: PdfLibs["jsPDF"],
  autoTable: PdfLibs["autoTable"],
  preview: ScrapePreviewPdfInput,
): InstanceType<PdfLibs["jsPDF"]> {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  renderPreviewIntoDoc(doc, preview, autoTable);
  addFooter(doc);
  return doc;
}

function triggerBlobDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function scrapeBatchZipFilename(scrapedAt = new Date()): string {
  const date = scrapedAt.toISOString().slice(0, 10);
  return `scrape-export-${date}.zip`;
}

export async function downloadPreviewPdf(preview: ScrapePreviewPdfInput): Promise<string> {
  const { jsPDF, autoTable } = await loadPdfLibs();
  const doc = buildSinglePagePdf(jsPDF, autoTable, preview);
  const filename = scrapePreviewPdfFilename(preview.url, new Date(), preview.oldSlug);
  doc.save(filename);
  return filename;
}

/**
 * One PDF per scraped URL (full content), delivered as a single ZIP download.
 */
export async function downloadBatchPdfs(
  items: ScrapePreviewPdfInput[],
): Promise<{ zipFilename: string; pdfFilenames: string[] }> {
  if (items.length === 0) return { zipFilename: "", pdfFilenames: [] };

  const [{ jsPDF, autoTable }, { default: JSZip }] = await Promise.all([
    loadPdfLibs(),
    import("jszip"),
  ]);

  const scrapedAt = new Date();
  const pdfFilenames: string[] = [];
  const usedNames = new Set<string>();
  const zip = new JSZip();

  for (let i = 0; i < items.length; i += 1) {
    const item = items[i]!;
    const filename = uniquePdfFilename(item, i, scrapedAt, usedNames);
    const doc = buildSinglePagePdf(jsPDF, autoTable, item);
    pdfFilenames.push(filename);
    zip.file(filename, doc.output("arraybuffer"));
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const zipFilename = scrapeBatchZipFilename(scrapedAt);
  triggerBlobDownload(zipBlob, zipFilename);

  return { zipFilename, pdfFilenames };
}
