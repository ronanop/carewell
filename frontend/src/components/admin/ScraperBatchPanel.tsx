"use client";

import { useMemo, useRef, useState } from "react";
import type { ScrapePreview } from "@carewell/backend/lib/scraper-parse";

type PageType = "service" | "blog" | "generic";

type SitemapEntry = {
  url: string;
  oldSlug: string;
  legacyPath: string;
};

type BatchResult = {
  url: string;
  oldSlug: string;
  legacyPath: string;
  pageType: string;
  ok: boolean;
  preview: ScrapePreview | null;
  error: string | null;
};

const inputClass =
  "h-11 w-full rounded-button border border-border bg-white px-3 text-sm text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

export function ScraperBatchPanel() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [pageType, setPageType] = useState<PageType>("service");
  const [entries, setEntries] = useState<SitemapEntry[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [parseLoading, setParseLoading] = useState(false);
  const [scrapeLoading, setScrapeLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [scrapeProgress, setScrapeProgress] = useState<string | null>(null);
  const [parseMeta, setParseMeta] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [results, setResults] = useState<BatchResult[]>([]);

  const selectedEntries = useMemo(
    () => entries.filter((e) => selected.has(e.url)),
    [entries, selected],
  );

  const successfulResults = useMemo(() => results.filter((r) => r.ok && r.preview), [results]);

  async function handleParseSitemap(file: File) {
    setParseLoading(true);
    setError(null);
    setMessage(null);
    setParseMeta(null);
    setResults([]);

    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/scraper/sitemap", { method: "POST", body: form });
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        entries?: SitemapEntry[];
        count?: number;
        childSitemapsFetched?: number;
        skipped?: number;
        pageLocsInFile?: number;
        childSitemapLocsInFile?: number;
      };

      if (!res.ok || !data.ok || !data.entries) {
        setError(data.error ?? "Failed to parse sitemap");
        return;
      }

      setEntries(data.entries);
      setSelected(new Set(data.entries.map((e) => e.url)));
      const parts = [`Found ${data.count} scrapeable URL(s).`];
      if (data.childSitemapLocsInFile) {
        parts.push(`${data.childSitemapLocsInFile} child sitemap file(s) in index.`);
      }
      if (data.childSitemapsFetched) {
        parts.push(`Fetched and merged ${data.childSitemapsFetched} child sitemap(s).`);
      }
      if (data.pageLocsInFile && data.pageLocsInFile !== data.count) {
        parts.push(`${data.pageLocsInFile} page URL(s) in file before merge.`);
      }
      if (data.skipped) {
        parts.push(`${data.skipped} loc(s) skipped (disallowed or invalid).`);
      }
      setParseMeta(parts.join(" "));
    } catch {
      setError("Network error while parsing sitemap.");
    } finally {
      setParseLoading(false);
    }
  }

  async function handleBatchScrape() {
    if (selectedEntries.length === 0) {
      setError("Select at least one URL to scrape.");
      return;
    }

    setScrapeLoading(true);
    setError(null);
    setMessage(null);
    setScrapeProgress(`0 / ${selectedEntries.length}`);

    try {
      const res = await fetch("/api/admin/scraper/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageType,
          entries: selectedEntries,
        }),
      });

      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        results?: BatchResult[];
        stats?: { total: number; ok: number; failed: number };
      };

      if (!res.ok || !data.ok || !data.results) {
        setError(data.error ?? "Batch scrape failed");
        return;
      }

      setResults(data.results);
      setScrapeProgress(null);
      setMessage(
        `Scraped ${data.stats?.ok ?? 0} of ${data.stats?.total ?? 0} URL(s).` +
          (data.stats?.failed ? ` ${data.stats.failed} failed.` : ""),
      );
    } catch {
      setError("Network error during batch scrape.");
      setScrapeProgress(null);
    } finally {
      setScrapeLoading(false);
    }
  }

  async function handleDownloadBatchPdfs() {
    const items = successfulResults
      .filter((r): r is BatchResult & { preview: ScrapePreview } => !!r.preview)
      .map((r) => ({
        ...r.preview,
        oldSlug: r.oldSlug,
        legacyPath: r.legacyPath,
      }));

    if (items.length === 0) {
      setError("No successful scrapes to export. Run batch scrape first.");
      return;
    }

    setPdfLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { downloadBatchPdfs } = await import("@carewell/backend/lib/scraper-preview-pdf");
      const { zipFilename, pdfFilenames, jsonFilenames } = await downloadBatchPdfs(items);
      setMessage(
        `Downloaded ${zipFilename} with ${pdfFilenames.length} PDF(s) and ${jsonFilenames.length} JSON file(s) — use JSON for import (npm run scrape:import).`,
      );
    } catch {
      setError("Batch PDF generation failed.");
    } finally {
      setPdfLoading(false);
    }
  }

  function toggleAll(checked: boolean) {
    setSelected(checked ? new Set(entries.map((e) => e.url)) : new Set());
  }

  function toggleOne(url: string, checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(url);
      else next.delete(url);
      return next;
    });
  }

  const pdfFileCount = successfulResults.length;

  return (
    <div className="space-y-6">
      <section className="rounded-card border border-border bg-white p-5 shadow-card md:p-6">
        <h2 className="font-heading text-heading-sm text-navy">Batch from sitemap</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Upload your old site <code className="rounded bg-surface px-1">sitemap.xml</code>. We extract
          URLs with legacy path and old slug, scrape in batches, then download a ZIP with one JSON + PDF per URL.
          Import with <code className="rounded bg-surface px-1">npm run scrape:import</code> (JSON preserves HTML and images).
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="sitemap-file" className="mb-1.5 block text-sm font-semibold text-navy">
              Sitemap file
            </label>
            <input
              ref={fileRef}
              id="sitemap-file"
              type="file"
              accept=".xml,text/xml,application/xml"
              className="block w-full text-sm text-text-secondary file:mr-3 file:rounded-button file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleParseSitemap(file);
              }}
            />
            <p className="mt-1.5 text-xs text-text-tertiary">
              Sitemap indexes are supported — child sitemaps on carewellmedicalcentre.com are fetched
              automatically. Pre-built page list:{" "}
              <code className="rounded bg-surface px-1">data/legacy-scrape-sitemap.xml</code>.
            </p>
          </div>

          <div>
            <label htmlFor="batch-page-type" className="mb-1.5 block text-sm font-semibold text-navy">
              Page type
            </label>
            <select
              id="batch-page-type"
              value={pageType}
              onChange={(e) => setPageType(e.target.value as PageType)}
              className={inputClass}
            >
              <option value="service">Service page</option>
              <option value="blog">Blog</option>
              <option value="generic">Generic</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={selectedEntries.length === 0 || scrapeLoading}
            onClick={() => void handleBatchScrape()}
            className="inline-flex min-h-11 items-center justify-center rounded-button bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:opacity-60"
          >
            {scrapeLoading
              ? scrapeProgress
                ? `Scraping… ${scrapeProgress}`
                : "Scraping…"
              : `Scrape selected (${selectedEntries.length})`}
          </button>
          <button
            type="button"
            disabled={successfulResults.length === 0 || pdfLoading || scrapeLoading}
            onClick={() => void handleDownloadBatchPdfs()}
            className="inline-flex min-h-11 items-center justify-center rounded-button border border-border bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pdfLoading
              ? "Generating ZIP…"
              : `Download ZIP (${pdfFileCount || 0} PDF${pdfFileCount === 1 ? "" : "s"}, 1 per URL)`}
          </button>
        </div>

        {parseLoading ? (
          <p className="mt-3 text-sm text-text-secondary" role="status">
            Parsing sitemap…
          </p>
        ) : null}
        {parseMeta ? (
          <p className="mt-3 text-sm text-success" role="status">
            {parseMeta}
          </p>
        ) : null}
        {message ? (
          <p className="mt-3 text-sm text-success" role="status">
            {message}
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
      </section>

      {entries.length > 0 ? (
        <section className="rounded-card border border-border bg-white p-5 shadow-card md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-semibold text-navy">URLs from sitemap ({entries.length})</h3>
            <label className="flex items-center gap-2 text-sm text-text-secondary">
              <input
                type="checkbox"
                checked={selected.size === entries.length && entries.length > 0}
                onChange={(e) => toggleAll(e.target.checked)}
                className="size-4 rounded border-border"
              />
              Select all
            </label>
          </div>

          <div className="mt-4 max-h-96 overflow-auto rounded-button border border-border">
            <table className="min-w-full text-left text-xs">
              <thead className="sticky top-0 bg-surface/95 text-navy">
                <tr>
                  <th className="w-10 px-2 py-2" />
                  <th className="px-3 py-2 font-semibold">Old slug</th>
                  <th className="px-3 py-2 font-semibold">Legacy path</th>
                  <th className="px-3 py-2 font-semibold">URL</th>
                  <th className="px-3 py-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {entries.map((entry) => {
                  const result = results.find((r) => r.url === entry.url);
                  return (
                    <tr key={entry.url} className="text-text-secondary">
                      <td className="px-2 py-2 align-top">
                        <input
                          type="checkbox"
                          checked={selected.has(entry.url)}
                          onChange={(e) => toggleOne(entry.url, e.target.checked)}
                          className="size-4 rounded border-border"
                        />
                      </td>
                      <td className="px-3 py-2 align-top font-medium text-navy">{entry.oldSlug}</td>
                      <td className="max-w-[8rem] px-3 py-2 align-top break-all">{entry.legacyPath}</td>
                      <td className="max-w-xs px-3 py-2 align-top break-all">{entry.url}</td>
                      <td className="px-3 py-2 align-top">
                        {!result ? (
                          <span className="text-text-tertiary">—</span>
                        ) : result.ok ? (
                          <span className="text-success">OK</span>
                        ) : (
                          <span className="text-alert" title={result.error ?? undefined}>
                            Failed
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </div>
  );
}
