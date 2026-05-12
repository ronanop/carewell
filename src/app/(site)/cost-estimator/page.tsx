"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

const PROCEDURES = [
  { id: "ht", name: "Hair transplant", base: 45000 },
  { id: "rhino", name: "Rhinoplasty", base: 120000 },
  { id: "lipo", name: "Liposuction", base: 90000 },
] as const;

const GRADES = ["Standard", "Advanced", "Complex"] as const;

export default function CostEstimatorPage() {
  const [proc, setProc] = useState<(typeof PROCEDURES)[number]["id"]>("ht");
  const [grade, setGrade] = useState<(typeof GRADES)[number]>("Standard");
  const [phone, setPhone] = useState("");
  const [revealed, setRevealed] = useState(false);

  const base = PROCEDURES.find((p) => p.id === proc)?.base ?? 45000;
  const mult = grade === "Standard" ? 1 : grade === "Advanced" ? 1.15 : 1.3;
  const low = Math.round(base * mult * 0.9);
  const high = Math.round(base * mult * 1.25);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, "").length < 10) return;
    trackEvent("cost_estimator_submit", {
      procedure: proc,
      grade,
    });
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Cost Estimator User",
        mobile: phone.replace(/\D/g, "").slice(-10),
        treatment: PROCEDURES.find((p) => p.id === proc)?.name ?? "Cost estimator",
        source: "cost-estimator",
      }),
    }).catch(() => undefined);
    setRevealed(true);
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-16 md:py-24">
      <h1 className="font-heading text-3xl font-bold text-navy">Cost estimator</h1>
      <p className="mt-4 text-sm text-navy/75">
        Indicative ranges for Delhi NCR — final quote after consultation. Targets SEO: hair transplant cost Delhi 2026.
      </p>
      <form className="mt-8 space-y-4" onSubmit={submit}>
        <label className="block text-sm font-medium text-navy">
          Procedure
          <select
            className="mt-1 w-full rounded-lg border border-surface px-3 py-2"
            value={proc}
            onChange={(e) => setProc(e.target.value as typeof proc)}
          >
            {PROCEDURES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-navy">
          Complexity band
          <select
            className="mt-1 w-full rounded-lg border border-surface px-3 py-2"
            value={grade}
            onChange={(e) => setGrade(e.target.value as typeof grade)}
          >
            {GRADES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-navy">
          Mobile (to reveal range)
          <input
            className="mt-1 w-full rounded-lg border border-surface px-3 py-2"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <Button type="submit" variant="primary" className="w-full">
          Get Free Consultation
        </Button>
      </form>
      {revealed && (
        <div className="mt-8 rounded-xl border border-teal/40 bg-teal/5 p-5">
          <p className="text-sm font-semibold text-navy">Your indicative range</p>
          <p className="mt-2 text-2xl font-bold text-primary">
            ₹{low.toLocaleString("en-IN")} – ₹{high.toLocaleString("en-IN")}
          </p>
          <p className="mt-2 text-xs text-navy/60">Not a final quote. Subject to examination.</p>
        </div>
      )}
    </div>
  );
}
