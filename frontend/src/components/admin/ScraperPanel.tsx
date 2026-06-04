"use client";

import { useState } from "react";

type PageType = "service" | "blog" | "generic";

type TreatmentCard = {
  title: string;
  excerpt?: string;
  href?: string;
  image?: string;
};

type FaqItem = {
  question: string;
  answer?: string;
};

type ContentSection = {
  heading: string;
  paragraphs: string[];
};

type PreviewResult = {
  url: string;
  title: string | null;
  metaDescription: string | null;
  h1: string | null;
  headings: string[];
  bodySnippet: string | null;
  introParagraphs: string[];
  sections: ContentSection[];
  treatmentCards: TreatmentCard[];
  faqs: FaqItem[];
  bodyText: string;
  breadcrumbs?: string[];
};

const inputClass =
  "h-11 w-full rounded-button border border-border bg-white px-3 text-sm text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}…`;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function normalizePreview(raw: PreviewResult): PreviewResult {
  return {
    url: typeof raw.url === "string" ? raw.url : "",
    title: typeof raw.title === "string" ? raw.title : null,
    metaDescription: typeof raw.metaDescription === "string" ? raw.metaDescription : null,
    h1: typeof raw.h1 === "string" ? raw.h1 : null,
    headings: asStringArray(raw.headings),
    bodySnippet: typeof raw.bodySnippet === "string" ? raw.bodySnippet : null,
    introParagraphs: asStringArray(raw.introParagraphs),
    sections: Array.isArray(raw.sections)
      ? raw.sections
          .filter(
            (section): section is ContentSection =>
              !!section &&
              typeof section === "object" &&
              typeof (section as ContentSection).heading === "string" &&
              Array.isArray((section as ContentSection).paragraphs),
          )
          .map((section) => ({
            heading: section.heading,
            paragraphs: asStringArray(section.paragraphs),
          }))
      : [],
    treatmentCards: Array.isArray(raw.treatmentCards)
      ? raw.treatmentCards.filter(
          (card): card is TreatmentCard =>
            !!card && typeof card === "object" && typeof (card as TreatmentCard).title === "string",
        )
      : [],
    faqs: Array.isArray(raw.faqs)
      ? raw.faqs.filter(
          (faq): faq is FaqItem =>
            !!faq && typeof faq === "object" && typeof (faq as FaqItem).question === "string",
        )
      : [],
    bodyText: typeof raw.bodyText === "string" ? raw.bodyText : "",
    breadcrumbs: asStringArray(raw.breadcrumbs).length > 0 ? asStringArray(raw.breadcrumbs) : undefined,
  };
}

export function ScraperPanel({ defaultUrl }: { defaultUrl: string }) {
  const [url, setUrl] = useState(defaultUrl);
  const [pageType, setPageType] = useState<PageType>("service");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfMessage, setPdfMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewResult | null>(null);

  async function handlePreview() {
    setLoading(true);
    setError(null);
    setPdfMessage(null);
    setPreview(null);

    try {
      const res = await fetch("/api/admin/scraper/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, pageType, slug: slug || undefined }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        preview?: PreviewResult;
      };

      if (!res.ok || !data.ok || !data.preview) {
        setError(data.error ?? "Preview failed");
        return;
      }

      setPreview(normalizePreview(data.preview));
    } catch {
      setError("Network error — try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDownloadPdf() {
    if (!preview) return;
    setPdfLoading(true);
    setPdfMessage(null);
    setError(null);

    try {
      const { downloadPreviewPdf } = await import("@carewell/backend/lib/scraper-preview-pdf");
      const filename = await downloadPreviewPdf(preview);
      setPdfMessage(`PDF downloaded: ${filename}`);
    } catch {
      setError("PDF generation failed — try again.");
    } finally {
      setPdfLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form
        className="rounded-card border border-border bg-white p-5 shadow-card md:p-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="scraper-url" className="mb-1.5 block text-sm font-semibold text-navy">
              Source URL
            </label>
            <input
              id="scraper-url"
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={inputClass}
              placeholder="https://www.carewellmedicalcentre.com/..."
            />
            <p className="mt-1.5 text-xs text-text-tertiary">
              Only carewellmedicalcentre.com is allowed (localhost in dev). Override default via{" "}
              <code className="rounded bg-surface px-1">SCRAPER_BASE_URL</code>.
            </p>
          </div>

          <div>
            <label htmlFor="scraper-type" className="mb-1.5 block text-sm font-semibold text-navy">
              Page type
            </label>
            <select
              id="scraper-type"
              value={pageType}
              onChange={(e) => setPageType(e.target.value as PageType)}
              className={inputClass}
            >
              <option value="service">Service page</option>
              <option value="blog">Post</option>
              <option value="generic">Generic</option>
            </select>
          </div>

          <div>
            <label htmlFor="scraper-slug" className="mb-1.5 block text-sm font-semibold text-navy">
              Path slug <span className="font-normal text-text-tertiary">(optional)</span>
            </label>
            <input
              id="scraper-slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className={inputClass}
              placeholder="e.g. laser-hair-removal"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => void handlePreview()}
            className="inline-flex min-h-11 items-center justify-center rounded-button bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:opacity-60"
          >
            {loading ? "Scraping…" : "Preview scrape"}
          </button>
          <button
            type="button"
            disabled={!preview || pdfLoading || loading}
            onClick={() => void handleDownloadPdf()}
            className="inline-flex min-h-11 items-center justify-center rounded-button border border-border bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pdfLoading ? "Generating PDF…" : "Download PDF"}
          </button>
          <button
            type="button"
            disabled
            title="Coming in phase 2"
            className="inline-flex min-h-11 cursor-not-allowed items-center justify-center rounded-button border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-text-tertiary"
          >
            Import to Sanity (soon)
          </button>
        </div>

        {pdfMessage ? (
          <p className="mt-3 text-sm text-success" role="status">
            {pdfMessage}
          </p>
        ) : null}

        {error ? (
          <p
            className="mt-4 rounded-button border border-alert/30 bg-alert-light px-3 py-2 text-sm text-alert"
            role="alert"
          >
            {error}
          </p>
        ) : null}
      </form>

      <section className="rounded-card border border-border bg-white p-5 shadow-card md:p-6">
        <h2 className="font-heading text-heading-sm text-navy">Extracted preview</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Structured content from the page body (main content only — footer and nav excluded).
          Sanity import is not wired yet.
        </p>

        {!preview ? (
          <p className="mt-6 rounded-button border border-dashed border-border bg-surface/60 px-4 py-8 text-center text-sm text-text-tertiary">
            Run a preview scrape to see SEO fields, treatment cards, FAQs, sections, and full body text.
          </p>
        ) : (
          <div className="mt-5 space-y-6 text-sm">
            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="font-semibold text-navy">URL</dt>
                <dd className="mt-1 break-all text-text-secondary">{preview.url}</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Title</dt>
                <dd className="mt-1 text-text-secondary">{preview.title ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">H1</dt>
                <dd className="mt-1 text-text-secondary">{preview.h1 ?? "—"}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-semibold text-navy">Meta description</dt>
                <dd className="mt-1 text-text-secondary">{preview.metaDescription ?? "—"}</dd>
              </div>
              {preview.breadcrumbs && preview.breadcrumbs.length > 0 ? (
                <div className="sm:col-span-2">
                  <dt className="font-semibold text-navy">Breadcrumbs</dt>
                  <dd className="mt-1 text-text-secondary">{preview.breadcrumbs.join(" › ")}</dd>
                </div>
              ) : null}
            </dl>

            {preview.introParagraphs.length > 0 ? (
              <div>
                <h3 className="font-semibold text-navy">Intro</h3>
                <div className="mt-2 space-y-2 text-text-secondary">
                  {preview.introParagraphs.map((p, index) => (
                    <p key={`intro-${index}`} className="leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ) : null}

            {preview.treatmentCards.length > 0 ? (
              <div>
                <h3 className="font-semibold text-navy">
                  Treatment cards ({preview.treatmentCards.length})
                </h3>
                <div className="mt-3 overflow-x-auto rounded-button border border-border">
                  <table className="min-w-full text-left text-xs">
                    <thead className="bg-surface/80 text-navy">
                      <tr>
                        <th className="px-3 py-2 font-semibold">Title</th>
                        <th className="px-3 py-2 font-semibold">Excerpt</th>
                        <th className="px-3 py-2 font-semibold">Link</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {preview.treatmentCards.map((card, index) => (
                        <tr key={`${card.title}-${index}`} className="text-text-secondary">
                          <td className="px-3 py-2 align-top font-medium text-navy">{card.title}</td>
                          <td className="max-w-xs px-3 py-2 align-top">
                            {card.excerpt ? truncate(card.excerpt, 120) : "—"}
                          </td>
                          <td className="max-w-[10rem] px-3 py-2 align-top break-all">
                            {card.href ? (
                              <a
                                href={card.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                {truncate(card.href.replace(/^https?:\/\/(www\.)?/, ""), 48)}
                              </a>
                            ) : (
                              "—"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}

            {preview.faqs.length > 0 ? (
              <div>
                <h3 className="font-semibold text-navy">FAQs ({preview.faqs.length})</h3>
                <ul className="mt-2 space-y-3">
                  {preview.faqs.map((faq, index) => (
                    <li
                      key={`${faq.question}-${index}`}
                      className="rounded-button border border-border bg-surface/40 px-3 py-2"
                    >
                      <p className="font-medium text-navy">{faq.question}</p>
                      {faq.answer ? (
                        <p className="mt-1 text-text-secondary">{truncate(faq.answer, 200)}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {preview.sections.length > 0 ? (
              <div>
                <h3 className="font-semibold text-navy">Sections</h3>
                <div className="mt-2 space-y-4">
                  {preview.sections.map((section, index) => (
                    <div key={`${section.heading}-${index}`}>
                      <p className="font-medium text-navy">{section.heading}</p>
                      {section.paragraphs.length > 0 ? (
                        <ul className="mt-1 list-inside list-disc space-y-1 text-text-secondary">
                          {section.paragraphs.map((p, pIndex) => (
                            <li key={`${index}-${pIndex}`}>{truncate(p, 160)}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-1 text-text-tertiary">No paragraphs extracted under this heading.</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {preview.headings.length > 0 ? (
              <div>
                <h3 className="font-semibold text-navy">Headings (main content, H2–H3)</h3>
                <ul className="mt-2 list-inside list-disc space-y-1 text-text-secondary">
                  {preview.headings.map((h, index) => (
                    <li key={`${h}-${index}`}>{h}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div>
              <h3 className="font-semibold text-navy">Body snippet</h3>
              <p className="mt-1 whitespace-pre-wrap text-text-secondary">
                {preview.bodySnippet ?? "—"}
              </p>
            </div>

            {preview.bodyText ? (
              <details className="rounded-button border border-border bg-surface/30 px-3 py-2">
                <summary className="cursor-pointer font-semibold text-navy">
                  Full body text ({preview.bodyText.length.toLocaleString()} chars)
                </summary>
                <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap break-words text-xs text-text-secondary">
                  {preview.bodyText}
                </pre>
              </details>
            ) : null}
          </div>
        )}
      </section>
    </div>
  );
}
