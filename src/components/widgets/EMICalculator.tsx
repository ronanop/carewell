"use client";

import { useMemo, useState } from "react";

const AMOUNT_MIN = 25_000;
const AMOUNT_MAX = 500_000;
const AMOUNT_STEP = 5_000;

const TENURE_OPTIONS = [3, 6, 9, 12, 18, 24, 36] as const;

const RATE_PRESETS = [
  { label: "0%", value: 0, description: "0% EMI partner" },
  { label: "10%", value: 10, description: "Standard credit card" },
  { label: "13%", value: 13, description: "Personal loan rate" },
] as const;

function inr(value: number): string {
  return value.toLocaleString("en-IN");
}

export function EMICalculator() {
  const [amount, setAmount] = useState(75_000);
  const [months, setMonths] = useState(12);
  const [rateYear, setRateYear] = useState<number>(RATE_PRESETS[0].value);

  const monthly = useMemo(() => {
    const r = rateYear / 100 / 12;
    if (r === 0) return Math.ceil(amount / months);
    const pow = (1 + r) ** months;
    return Math.round((amount * r * pow) / (pow - 1));
  }, [amount, months, rateYear]);

  const totalPayable = monthly * months;
  const totalInterest = Math.max(totalPayable - amount, 0);

  const amountPct =
    ((amount - AMOUNT_MIN) / (AMOUNT_MAX - AMOUNT_MIN)) * 100;

  return (
    <div className="overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-surface bg-gradient-to-r from-primary/5 via-white to-white p-5 md:p-6">
        <span
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
          aria-hidden
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2.5" />
            <path d="M8 2v4M16 2v4M3 10h18M8 14h2M14 14h2M8 18h2M14 18h2" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="font-heading text-base font-bold text-navy md:text-lg">EMI calculator</p>
          <p className="text-xs text-navy/60 sm:text-sm">Plan your treatment in easy instalments</p>
        </div>
      </div>

      {/* Body — landscape on lg+, stacked on mobile */}
      <div className="grid gap-6 p-5 md:p-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-8">
        {/* LEFT: controls */}
        <div className="min-w-0 space-y-6">
          {/* Amount slider */}
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="emi-amount" className="text-[11px] font-semibold uppercase tracking-wide text-navy/70 sm:text-xs">
                Treatment cost
              </label>
              <span className="font-heading text-lg font-extrabold text-primary md:text-xl">
                ₹{inr(amount)}
              </span>
            </div>
            <input
              id="emi-amount"
              type="range"
              min={AMOUNT_MIN}
              max={AMOUNT_MAX}
              step={AMOUNT_STEP}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              aria-label="Treatment cost"
              className="emi-range mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-surface"
              style={{
                backgroundImage: `linear-gradient(to right, var(--emi-fill) 0%, var(--emi-fill) ${amountPct}%, transparent ${amountPct}%, transparent 100%)`,
              }}
            />
            <div className="mt-1.5 flex justify-between text-[10px] font-medium text-navy/50">
              <span>₹{inr(AMOUNT_MIN)}</span>
              <span>₹{inr(AMOUNT_MAX)}</span>
            </div>
          </div>

          {/* Tenure pills */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-navy/70 sm:text-xs">
              Tenure
            </p>
            <div
              role="radiogroup"
              aria-label="Tenure in months"
              className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7 lg:grid-cols-4 xl:grid-cols-7"
            >
              {TENURE_OPTIONS.map((opt) => {
                const isActive = opt === months;
                return (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => setMonths(opt)}
                    className={
                      "h-10 rounded-lg border text-sm font-semibold transition-colors duration-150 " +
                      (isActive
                        ? "border-primary bg-primary text-white shadow-[0_4px_12px_-4px_rgba(21,87,160,0.55)]"
                        : "border-surface bg-white text-navy/80 hover:border-primary/40 hover:text-primary")
                    }
                  >
                    {opt}
                    <span className="ml-0.5 text-[10px] opacity-70">m</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interest rate presets */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-navy/70 sm:text-xs">
              Interest rate
            </p>
            <div
              role="radiogroup"
              aria-label="Interest rate"
              className="mt-3 grid grid-cols-3 gap-2"
            >
              {RATE_PRESETS.map((preset) => {
                const isActive = preset.value === rateYear;
                return (
                  <button
                    key={preset.value}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => setRateYear(preset.value)}
                    className={
                      "flex flex-col items-center justify-center rounded-xl border px-2 py-2.5 text-center transition-colors duration-150 " +
                      (isActive
                        ? "border-teal bg-teal/10 text-teal"
                        : "border-surface bg-white text-navy/75 hover:border-teal/40 hover:text-teal")
                    }
                  >
                    <span className="font-heading text-base font-bold leading-none">{preset.label}</span>
                    <span className="mt-1 text-[10px] font-medium uppercase leading-tight tracking-wide opacity-80">
                      {preset.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: results */}
        <div className="min-w-0">
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/10 via-white to-white p-5 md:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary/80 sm:text-xs">
              Estimated monthly EMI
            </p>
            <p className="mt-1.5 font-heading text-3xl font-extrabold leading-none text-navy sm:text-4xl lg:text-[40px]">
              ₹{inr(monthly)}
            </p>
            <p className="mt-1 text-sm font-medium text-navy/60">per month</p>

            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-primary/10 pt-4 text-xs">
              <div>
                <p className="font-medium uppercase tracking-wide text-navy/55">Total payable</p>
                <p className="mt-1 font-heading text-base font-extrabold text-navy lg:text-lg">
                  ₹{inr(totalPayable)}
                </p>
              </div>
              <div>
                <p className="font-medium uppercase tracking-wide text-navy/55">Total interest</p>
                <p className="mt-1 font-heading text-base font-extrabold text-navy lg:text-lg">
                  ₹{inr(totalInterest)}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-[11px] sm:text-xs">
              <div className="rounded-lg bg-white/70 px-3 py-2">
                <p className="font-medium uppercase tracking-wide text-navy/50">Tenure</p>
                <p className="mt-0.5 font-semibold text-navy">{months} months</p>
              </div>
              <div className="rounded-lg bg-white/70 px-3 py-2">
                <p className="font-medium uppercase tracking-wide text-navy/50">Rate</p>
                <p className="mt-0.5 font-semibold text-navy">{rateYear}% p.a.</p>
              </div>
            </div>

            <p className="mt-auto pt-5 text-[11px] leading-relaxed text-navy/55">
              Indicative figures only. Final EMI depends on partner approval and your credit profile.{" "}
              <a href="/contact" className="font-medium text-primary underline-offset-2 hover:underline">
                Ask about 0% EMI partners
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.emi-range) {
          --emi-fill: #1557a0;
        }
        :global(.emi-range::-webkit-slider-thumb) {
          -webkit-appearance: none;
          appearance: none;
          height: 22px;
          width: 22px;
          border-radius: 9999px;
          background: #ffffff;
          border: 3px solid #1557a0;
          box-shadow: 0 4px 12px -2px rgba(21, 87, 160, 0.45);
          cursor: pointer;
          transition: transform 120ms ease-out;
        }
        :global(.emi-range::-webkit-slider-thumb:hover) {
          transform: scale(1.08);
        }
        :global(.emi-range::-moz-range-thumb) {
          height: 22px;
          width: 22px;
          border-radius: 9999px;
          background: #ffffff;
          border: 3px solid #1557a0;
          box-shadow: 0 4px 12px -2px rgba(21, 87, 160, 0.45);
          cursor: pointer;
        }
        :global(.emi-range:focus-visible) {
          outline: none;
        }
        :global(.emi-range:focus-visible::-webkit-slider-thumb) {
          box-shadow: 0 0 0 4px rgba(21, 87, 160, 0.25);
        }
      `}</style>
    </div>
  );
}
