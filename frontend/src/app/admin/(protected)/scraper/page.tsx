import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/dashboard/AdminPageHeader";
import { ScraperBatchPanel } from "@/components/admin/ScraperBatchPanel";
import { ScraperPanel } from "@/components/admin/ScraperPanel";
import { getScraperDefaultBaseUrl } from "@carewell/backend/lib/scraper-url";

export default function AdminScraperPage() {
  const defaultUrl = getScraperDefaultBaseUrl();

  return (
    <div className="space-y-8 pb-20 md:pb-8">
      <AdminPageHeader
        title="Website scraper"
        description="Scrape legacy Care Well URLs for batch PDF export or single-page preview before importing into Sanity."
      />

      <ScraperBatchPanel />

      <div>
        <h2 className="font-heading text-heading-sm text-navy">Single URL preview</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Test one page before running a full sitemap batch.
        </p>
        <div className="mt-4">
          <ScraperPanel defaultUrl={defaultUrl} />
        </div>
      </div>

      <Link href="/admin" className="text-sm font-semibold text-primary hover:text-primary-hover">
        ← Back to dashboard
      </Link>
    </div>
  );
}
