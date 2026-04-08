"use client";

import { useMemo, useState } from "react";

export function EMICalculator() {
  const [amount, setAmount] = useState(50000);
  const [months, setMonths] = useState(12);
  const rateYear = 0; // 0% EMI partners — adjust if needed

  const monthly = useMemo(() => {
    const r = rateYear / 12;
    if (r === 0) return Math.ceil(amount / months);
    const pow = (1 + r) ** months;
    return Math.round((amount * r * pow) / (pow - 1));
  }, [amount, months]);

  return (
    <div className="rounded-xl border border-surface bg-white p-5 shadow-sm">
      <p className="font-heading font-bold text-navy">EMI calculator</p>
      <label className="mt-4 block text-xs font-medium text-navy">
        Amount (₹)
        <input
          type="number"
          className="mt-1 w-full rounded-lg border border-surface px-3 py-2 text-sm"
          value={amount}
          min={10000}
          step={5000}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </label>
      <label className="mt-3 block text-xs font-medium text-navy">
        Tenure (months)
        <input
          type="number"
          className="mt-1 w-full rounded-lg border border-surface px-3 py-2 text-sm"
          value={months}
          min={3}
          max={36}
          onChange={(e) => setMonths(Number(e.target.value))}
        />
      </label>
      <p className="mt-4 text-sm text-navy/80">
        Estimated monthly: <strong className="text-primary">₹{monthly.toLocaleString("en-IN")}</strong>
      </p>
      <p className="mt-2 text-xs text-navy/55">
        Indicative only.{" "}
        <a href="/contact" className="text-primary underline">
          Ask about 0% EMI partners
        </a>
        .
      </p>
    </div>
  );
}
