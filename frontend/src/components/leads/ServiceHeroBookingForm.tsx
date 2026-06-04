"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";

const CITIES = ["Gurgaon", "Delhi", "Noida", "Faridabad", "Ghaziabad", "Other"] as const;

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Valid 10-digit number"),
  city: z.string().min(1, "Select city"),
  treatment: z.string().min(1),
  pageUrl: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  source: z.string().optional(),
  website: z.string().optional(),
});

type Values = z.infer<typeof schema>;

function ServiceHeroBookingFormFields({ defaultTreatment }: { defaultTreatment: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      mobile: "",
      city: "Gurgaon",
      treatment: defaultTreatment,
      pageUrl: "",
      utmSource: searchParams.get("utm_source") ?? "",
      utmMedium: searchParams.get("utm_medium") ?? "",
      utmCampaign: searchParams.get("utm_campaign") ?? "",
      source: "service-hero",
      website: "",
    },
  });

  useEffect(() => {
    form.setValue("pageUrl", window.location.href);
    form.setValue("utmSource", searchParams.get("utm_source") ?? "");
    form.setValue("utmMedium", searchParams.get("utm_medium") ?? "");
    form.setValue("utmCampaign", searchParams.get("utm_campaign") ?? "");
    form.setValue("source", "service-hero");
    form.setValue("website", "");
    form.setValue("treatment", defaultTreatment);
  }, [form, pathname, searchParams, defaultTreatment]);

  const onSubmit = form.handleSubmit(async (data) => {
    setStatus("idle");
    data.pageUrl = typeof window !== "undefined" ? window.location.href : pathname;
    data.utmSource = searchParams.get("utm_source") ?? "";
    data.utmMedium = searchParams.get("utm_medium") ?? "";
    data.utmCampaign = searchParams.get("utm_campaign") ?? "";
    data.source = "service-hero";
    data.website = "";
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("fail");
      window.dataLayer?.push({ event: "generate_lead", form: "service-hero" });
      setStatus("ok");
      window.location.href = "/thank-you";
    } catch {
      setStatus("err");
    }
  });

  const fieldClass =
    "h-10 w-full rounded-button border border-[var(--color-border)] bg-white px-3 text-xs text-text-primary outline-none transition placeholder:text-text-tertiary focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <div className="rounded-xl border border-surface bg-white p-4 shadow-card md:p-[17px]">
      <h3 className="font-heading text-center text-sm font-bold leading-snug text-navy md:text-[15px]">
        Book <span className="text-teal">FREE</span> Doctor Appointment
      </h3>

      <form onSubmit={onSubmit} className="mt-[11px] space-y-2.5 md:mt-[13px]">
        <input type="hidden" {...form.register("pageUrl")} />
        <input type="hidden" {...form.register("utmSource")} />
        <input type="hidden" {...form.register("utmMedium")} />
        <input type="hidden" {...form.register("utmCampaign")} />
        <input type="hidden" {...form.register("source")} />
        <input type="hidden" {...form.register("website")} />
        <input type="hidden" {...form.register("treatment")} />

        <div>
          <label htmlFor="hero-lead-name" className="sr-only">
            Patient name
          </label>
          <input
            id="hero-lead-name"
            autoComplete="name"
            placeholder="Patient Name"
            className={fieldClass}
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="mt-1 text-xs text-red-600">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="hero-lead-mobile" className="sr-only">
            Mobile number
          </label>
          <input
            id="hero-lead-mobile"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="Mobile Number"
            className={fieldClass}
            {...form.register("mobile")}
          />
          {form.formState.errors.mobile && (
            <p className="mt-1 text-xs text-red-600">{form.formState.errors.mobile.message}</p>
          )}
        </div>

        <div className="relative">
          <label htmlFor="hero-lead-city" className="absolute left-3 top-2 z-10 text-[10px] font-semibold text-primary">
            Select City
          </label>
          <select
            id="hero-lead-city"
            className={`${fieldClass} h-11 appearance-none pt-4 pb-1 font-medium text-navy`}
            {...form.register("city")}
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-2.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-teal"
            aria-hidden
          />
          {form.formState.errors.city && (
            <p className="mt-1 text-xs text-red-600">{form.formState.errors.city.message}</p>
          )}
        </div>

        <Button type="submit" variant="secondary" size="sm" className="w-full !min-h-10 !py-2.5 text-sm">
          Book Free Appointment
        </Button>

        {status === "err" && (
          <p className="text-center text-xs text-alert">Something went wrong. Please call the clinic.</p>
        )}
      </form>
    </div>
  );
}

function ServiceHeroBookingFormFallback() {
  return (
    <div
      className="rounded-xl border border-surface bg-white p-4 shadow-card md:p-[17px] motion-reduce:animate-none"
      aria-busy="true"
      aria-label="Loading booking form"
    >
      <div className="mx-auto h-4 max-w-[200px] animate-pulse rounded bg-surface" />
      <div className="mt-4 space-y-2.5">
        <div className="h-10 animate-pulse rounded-button bg-surface" />
        <div className="h-10 animate-pulse rounded-button bg-surface" />
        <div className="h-11 animate-pulse rounded-button bg-surface" />
        <div className="h-10 animate-pulse rounded-md bg-surface" />
      </div>
    </div>
  );
}

export function ServiceHeroBookingForm({ defaultTreatment }: { defaultTreatment: string }) {
  return (
    <Suspense fallback={<ServiceHeroBookingFormFallback />}>
      <ServiceHeroBookingFormFields defaultTreatment={defaultTreatment} />
    </Suspense>
  );
}
