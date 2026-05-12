"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  treatment: z.string().min(1),
  pageUrl: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  source: z.string().optional(),
  website: z.string().optional(),
});

export type LeadFormValues = z.infer<typeof schema>;

function LeadFormFields({
  defaultTreatment,
  submitLabel = "Claim My Free Slot",
  source = "web-form",
}: {
  defaultTreatment: string;
  submitLabel?: string;
  source?: string;
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
      source,
      website: "",
    },
  });

  useEffect(() => {
    form.setValue("pageUrl", window.location.href);
    form.setValue("utmSource", searchParams.get("utm_source") ?? "");
    form.setValue("utmMedium", searchParams.get("utm_medium") ?? "");
    form.setValue("utmCampaign", searchParams.get("utm_campaign") ?? "");
    form.setValue("source", source);
    form.setValue("website", "");
  }, [form, pathname, searchParams, source]);

  const onSubmit = form.handleSubmit(async (data) => {
    setStatus("idle");
    data.pageUrl = typeof window !== "undefined" ? window.location.href : pathname;
    data.utmSource = searchParams.get("utm_source") ?? "";
    data.utmMedium = searchParams.get("utm_medium") ?? "";
    data.utmCampaign = searchParams.get("utm_campaign") ?? "";
    data.source = source;
    data.website = "";
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("fail");
      window.dataLayer?.push({ event: "generate_lead", form: "lead" });
      setStatus("ok");
      window.location.href = "/thank-you";
    } catch {
      setStatus("err");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-surface bg-white p-5 shadow-sm">
      <input type="hidden" {...form.register("pageUrl")} />
      <input type="hidden" {...form.register("utmSource")} />
      <input type="hidden" {...form.register("utmMedium")} />
      <input type="hidden" {...form.register("utmCampaign")} />
      <input type="hidden" {...form.register("source")} />
      <input type="hidden" {...form.register("website")} />
      <Input label="Name" placeholder="Your full name" error={form.formState.errors.name?.message} {...form.register("name")} />
      <Input
        label="Mobile"
        placeholder="10-digit mobile number"
        inputMode="tel"
        error={form.formState.errors.mobile?.message}
        {...form.register("mobile")}
      />
      <Select label="Treatment interest" error={form.formState.errors.treatment?.message} {...form.register("treatment")}>
          <option value={defaultTreatment}>{defaultTreatment}</option>
          <option value="Hair transplant">Hair transplant</option>
          <option value="Vitiligo">Vitiligo</option>
          <option value="Facial surgery">Facial surgery</option>
          <option value="Body contouring">Body contouring</option>
          <option value="General consultation">General consultation</option>
      </Select>
      <Button type="submit" variant="primary" className="w-full" size="lg">
        {submitLabel}
      </Button>
      <p className="text-center text-xs text-navy/65">
        🔒 100% Private | Response within 2 hours | No spam
      </p>
      {status === "err" && <p className="text-center text-xs text-alert">Something went wrong. Please call the clinic.</p>}
    </form>
  );
}

function LeadFormFallback() {
  return (
    <div
      className="min-h-[320px] space-y-4 rounded-xl border border-surface bg-white p-5 shadow-sm motion-reduce:animate-none"
      aria-busy="true"
      aria-label="Loading form"
    >
      <div className="h-10 animate-pulse rounded-md bg-surface" />
      <div className="h-10 animate-pulse rounded-md bg-surface" />
      <div className="h-10 animate-pulse rounded-md bg-surface" />
      <div className="h-11 animate-pulse rounded-md bg-surface" />
    </div>
  );
}

export function LeadForm(props: {
  defaultTreatment: string;
  submitLabel?: string;
  source?: string;
}) {
  return (
    <Suspense fallback={<LeadFormFallback />}>
      <LeadFormFields {...props} />
    </Suspense>
  );
}
