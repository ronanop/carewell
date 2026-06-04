"use client";

import { useCallback, useEffect, useState } from "react";
import { btnSecondary, inputClass } from "@/components/admin/content/AdminFormFields";
import {
  PAGE_SECTION_TYPES,
  type PageSectionType,
} from "@/page-sections/registry";

type ServiceOption = { id: string; slug: string; title: string };

export function SectionPickerModal({
  open,
  onClose,
  onInsert,
  defaultServiceSlug,
}: {
  open: boolean;
  onClose: () => void;
  onInsert: (payload: { sectionType: PageSectionType; serviceSlug?: string | null }) => void;
  defaultServiceSlug?: string | null;
}) {
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [serviceSlug, setServiceSlug] = useState(defaultServiceSlug ?? "");
  const [loading, setLoading] = useState(false);

  const loadServices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content/services");
      const json = (await res.json()) as { ok?: boolean; services?: ServiceOption[] };
      if (json.ok && json.services) setServices(json.services);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      setServiceSlug(defaultServiceSlug ?? "");
      void loadServices();
    }
  }, [open, defaultServiceSlug, loadServices]);

  if (!open) return null;

  const sections = Object.entries(PAGE_SECTION_TYPES) as [PageSectionType, (typeof PAGE_SECTION_TYPES)[PageSectionType]][];

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-card border border-border bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy">Add readymade section</h2>
            <p className="mt-1 text-xs text-navy/60">Insert a reusable block anywhere in your page content.</p>
          </div>
          <button type="button" className="text-sm text-navy/60 hover:text-navy" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="border-b border-border px-5 py-3">
          <label className="block text-xs font-medium text-navy">
            Pull data from service (optional)
            <select
              className={`${inputClass} mt-1`}
              value={serviceSlug}
              onChange={(e) => setServiceSlug(e.target.value)}
            >
              <option value="">Use default content</option>
              {services.map((s) => (
                <option key={s.id} value={s.slug}>
                  {s.title} ({s.slug})
                </option>
              ))}
            </select>
          </label>
          {loading ? <p className="mt-1 text-[10px] text-navy/50">Loading services…</p> : null}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            {sections.map(([type, meta]) => (
              <button
                key={type}
                type="button"
                className="rounded-card border border-border bg-white p-4 text-left transition hover:border-teal/40 hover:shadow-card"
                onClick={() => {
                  onInsert({ sectionType: type, serviceSlug: serviceSlug || null });
                  onClose();
                }}
              >
                <p className="font-heading text-sm font-semibold text-navy">{meta.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-navy/65">{meta.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-border px-5 py-3 text-right">
          <button type="button" className={btnSecondary} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
