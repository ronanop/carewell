import { Button } from "@/components/ui/Button";
import { serviceOrDefaults } from "@/page-sections/defaults";
import type { ServiceDoc } from "@/types/service";

export function PricingSection({ service }: { service?: ServiceDoc | null }) {
  const data = serviceOrDefaults(service ?? null);

  return (
    <section className="my-12 rounded-2xl border border-surface bg-white p-6 md:p-8">
      <h2 className="font-heading text-2xl font-bold text-navy">Pricing</h2>
      <p className="mt-4 text-2xl font-bold text-primary">
        Starting from ₹{data.pricingFromInr.toLocaleString("en-IN")}
      </p>
      <p className="mt-2 text-sm text-navy/70">
        Final cost depends on assessment — we never quote fixed package prices online.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-navy/85">
        {data.pricingFactors.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      {data.pricingEmiNote ? <p className="mt-4 text-sm text-navy/80">{data.pricingEmiNote}</p> : null}
      <div className="mt-6 rounded-xl border border-surface bg-surface/30 p-5">
        <p className="text-sm font-semibold text-navy">What&apos;s included</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-navy/80">
          {data.valueStack.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      </div>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button href="/book-consultation" variant="primary">
          Get Personalized Quote
        </Button>
        <Button href="/cost-estimator" variant="outline">
          Cost estimator
        </Button>
      </div>
    </section>
  );
}
