import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/dashboard/AdminPageHeader";
import { AdminPanel } from "@/components/admin/dashboard/AdminPanel";
import { AdminStatCard } from "@/components/admin/dashboard/AdminStatCard";
import { getLeadPipelineStatusExtended } from "@carewell/backend/lib/admin-auth";
import { prisma } from "@carewell/backend/lib/db";

const channelLabels: Record<string, string> = {
  database: "PostgreSQL (form inbox)",
  googleSheets: "Google Sheets webhook",
  webhook: "Generic lead webhook",
  sendgrid: "SendGrid email",
  whatsapp: "WhatsApp webhook",
};

export default async function AdminLeadsPage() {
  const status = await getLeadPipelineStatusExtended();
  const anyConfigured = Object.values(status).some((s) => s === "configured");
  const configured = Object.values(status).filter((s) => s === "configured").length;
  const newCount = await prisma.formSubmission.count({ where: { status: "new" } });
  const totalCount = await prisma.formSubmission.count();

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <AdminPageHeader
        title="Lead pipeline"
        description="Submissions hit POST /api/lead, are saved to the database, and fan out to configured channels."
        actions={
          <Link
            href="/admin/content/forms"
            className="inline-flex rounded-button bg-primary px-4 py-2 text-sm font-semibold text-white"
          >
            Open form inbox
          </Link>
        }
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <AdminStatCard label="Channels configured" value={`${configured} / 5`} accent={configured > 0 ? "teal" : "warn"} />
        <AdminStatCard label="Saved submissions" value={totalCount} hint={`${newCount} new`} accent="teal" />
        <AdminStatCard label="API endpoint" value="/api/lead" hint="Public form handler" />
      </section>

      <AdminPanel title="Notification channels">
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-surface">
              <tr>
                <th className="px-4 py-3 font-semibold text-navy">Channel</th>
                <th className="px-4 py-3 font-semibold text-navy">Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(status).map(([key, value]) => (
                <tr key={key} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-text-secondary">{channelLabels[key] ?? key}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        value === "configured"
                          ? "inline-flex rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success"
                          : "inline-flex rounded-full bg-surface px-2.5 py-0.5 text-xs font-semibold text-text-tertiary"
                      }
                    >
                      {value === "configured" ? "Configured" : "Not configured"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminPanel>

      {!anyConfigured ? (
        <p className="rounded-card border border-alert/25 bg-alert-light px-4 py-3 text-sm text-navy">
          Only database storage is active. Configure email and webhooks under{" "}
          <Link href="/admin/content/integrations" className="font-semibold text-primary hover:underline">
            Email &amp; WhatsApp
          </Link>{" "}
          or via env vars on Render.
        </p>
      ) : null}

      <p className="text-sm text-text-secondary">
        Test with any public lead form or POST to <code className="rounded bg-surface px-1 text-xs">/api/lead</code>.
        View saved rows in the{" "}
        <Link href="/admin/content/forms" className="font-semibold text-primary hover:underline">
          form inbox
        </Link>
        .
      </p>

      <Link href="/admin" className="text-sm font-semibold text-primary hover:text-primary-hover">
        ← Back to dashboard
      </Link>
    </div>
  );
}
