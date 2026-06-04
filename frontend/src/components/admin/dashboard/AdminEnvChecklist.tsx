import type { EnvCheck } from "@carewell/backend/lib/admin-stats-types";
import { AdminStatusPill } from "@/components/admin/dashboard/AdminStatusPill";

export function AdminEnvChecklist({ checks }: { checks: EnvCheck[] }) {
  return (
    <ul className="divide-y divide-border">
      {checks.map((check) => (
        <li key={check.key} className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-navy">{check.label}</p>
            {check.hint ? <p className="mt-0.5 text-xs text-text-secondary">{check.hint}</p> : null}
          </div>
          <AdminStatusPill
            status={check.status}
            label={
              check.status === "ok" ? "Ready" : check.status === "warn" ? "Recommended" : "Missing"
            }
          />
        </li>
      ))}
    </ul>
  );
}
