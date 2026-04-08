"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  mobile: z.string().min(10, "Valid mobile required"),
  treatment: z.string().min(1),
  pageUrl: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export type LeadFormValues = z.infer<typeof schema>;

export function LeadForm({
  defaultTreatment,
  submitLabel = "Claim My Free Slot",
}: {
  defaultTreatment: string;
  submitLabel?: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      mobile: "",
      treatment: defaultTreatment,
      pageUrl: "",
      utmSource: searchParams.get("utm_source") ?? "",
      utmMedium: searchParams.get("utm_medium") ?? "",
      utmCampaign: searchParams.get("utm_campaign") ?? "",
    },
  });

  useEffect(() => {
    form.setValue("pageUrl", window.location.href);
    form.setValue("utmSource", searchParams.get("utm_source") ?? "");
    form.setValue("utmMedium", searchParams.get("utm_medium") ?? "");
    form.setValue("utmCampaign", searchParams.get("utm_campaign") ?? "");
  }, [form, pathname, searchParams]);

  const onSubmit = form.handleSubmit(async (data) => {
    setStatus("idle");
    data.pageUrl = typeof window !== "undefined" ? window.location.href : pathname;
    data.utmSource = searchParams.get("utm_source") ?? "";
    data.utmMedium = searchParams.get("utm_medium") ?? "";
    data.utmCampaign = searchParams.get("utm_campaign") ?? "";
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      window.location.href = "/thank-you";
    } catch {
      setStatus("err");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-xl border border-surface bg-white p-4 shadow-sm">
      <input type="hidden" {...form.register("pageUrl")} />
      <input type="hidden" {...form.register("utmSource")} />
      <input type="hidden" {...form.register("utmMedium")} />
      <input type="hidden" {...form.register("utmCampaign")} />
      <label className="block text-xs font-medium text-navy">
        Name
        <input className="mt-1 w-full rounded-lg border border-surface px-3 py-2 text-sm" {...form.register("name")} />
        {form.formState.errors.name && (
          <span className="text-xs text-alert">{form.formState.errors.name.message}</span>
        )}
      </label>
      <label className="block text-xs font-medium text-navy">
        Mobile
        <input
          className="mt-1 w-full rounded-lg border border-surface px-3 py-2 text-sm"
          inputMode="tel"
          {...form.register("mobile")}
        />
        {form.formState.errors.mobile && (
          <span className="text-xs text-alert">{form.formState.errors.mobile.message}</span>
        )}
      </label>
      <label className="block text-xs font-medium text-navy">
        Treatment interest
        <select className="mt-1 w-full rounded-lg border border-surface px-3 py-2 text-sm" {...form.register("treatment")}>
          <option value={defaultTreatment}>{defaultTreatment}</option>
          <option value="Hair transplant">Hair transplant</option>
          <option value="Vitiligo">Vitiligo</option>
          <option value="Facial surgery">Facial surgery</option>
          <option value="Body contouring">Body contouring</option>
          <option value="General consultation">General consultation</option>
        </select>
      </label>
      <Button type="submit" variant="primary" className="w-full">
        {submitLabel}
      </Button>
      <p className="text-center text-xs text-navy/65">
        🔒 100% Private | Response within 2 hours | No spam
      </p>
      {status === "err" && <p className="text-center text-xs text-alert">Something went wrong. Please call the clinic.</p>}
    </form>
  );
}
