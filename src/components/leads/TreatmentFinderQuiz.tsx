"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const QUESTIONS = [
  { id: 1, text: "What is your main goal?", options: ["Hair restoration", "Skin / vitiligo", "Face", "Body", "Wellness / IV"] },
  { id: 2, text: "How soon are you planning treatment?", options: ["This month", "1–3 months", "Exploring only"] },
  { id: 3, text: "Have you consulted a surgeon before?", options: ["Yes", "No"] },
  { id: 4, text: "Preferred contact?", options: ["WhatsApp", "Phone call"] },
  { id: 5, text: "City?", options: ["Delhi NCR", "Other"] },
] as const;

export function TreatmentFinderQuiz({ className }: { className?: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowPopup(true), 30_000);
    return () => clearTimeout(t);
  }, []);

  const recommendation = () => {
    const a = answers[0] || "";
    if (a.includes("Hair")) return "Hair transplant consultation";
    if (a.includes("vitiligo") || a.includes("Skin")) return "Dermatology / vitiligo assessment";
    if (a.includes("Face")) return "Facial surgery consultation";
    if (a.includes("Body")) return "Body contouring consultation";
    return "General surgical consultation";
  };

  const pick = (opt: string) => {
    const next = [...answers];
    next[step] = opt;
    setAnswers(next);
    if (step < QUESTIONS.length - 1) setStep(step + 1);
    else setStep(QUESTIONS.length);
  };

  const gateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, "").length < 10) return;
    setSubmitted(true);
  };

  return (
    <>
      {showPopup && !submitted && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/40 p-4 md:items-center">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex justify-between gap-4">
              <p className="font-heading text-lg font-bold text-navy">Quick treatment finder</p>
              <button type="button" className="text-sm text-navy/60" onClick={() => setShowPopup(false)}>
                Close
              </button>
            </div>
            <p className="mt-2 text-sm text-navy/75">5 questions — see what fits you best.</p>
            <div className="mt-6">
              <MiniQuiz
                step={step}
                onPick={pick}
                onGate={gateSubmit}
                phone={phone}
                setPhone={setPhone}
                submitted={submitted}
                recommendation={recommendation()}
              />
            </div>
          </div>
        </div>
      )}

      <div className={className}>
        <MiniQuiz
          step={step}
          onPick={pick}
          onGate={gateSubmit}
          phone={phone}
          setPhone={setPhone}
          submitted={submitted}
          recommendation={recommendation()}
        />
      </div>
    </>
  );
}

function MiniQuiz({
  step,
  onPick,
  onGate,
  phone,
  setPhone,
  submitted,
  recommendation,
}: {
  step: number;
  onPick: (opt: string) => void;
  onGate: (e: React.FormEvent) => void;
  phone: string;
  setPhone: (s: string) => void;
  submitted: boolean;
  recommendation: string;
}) {
  if (submitted) {
    return (
      <div className="rounded-xl border border-teal/30 bg-surface p-4">
        <p className="font-semibold text-navy">Recommended: {recommendation}</p>
        <Button href="/book-consultation" variant="primary" className="mt-4">
          Get Free Consultation
        </Button>
      </div>
    );
  }

  if (step >= QUESTIONS.length) {
    return (
      <form onSubmit={onGate} className="space-y-4">
        <p className="text-navy">Your match: <strong>{recommendation}</strong>. Enter your mobile to see next steps.</p>
        <label className="block text-sm font-medium text-navy">
          Mobile
          <input
            required
            className="mt-1 w-full rounded-lg border border-surface px-3 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputMode="tel"
          />
        </label>
        <Button type="submit" variant="primary">
          Claim My Free Slot
        </Button>
      </form>
    );
  }

  const q = QUESTIONS[step];
  return (
    <div>
      <p className="text-sm font-medium text-primary">Question {step + 1} of {QUESTIONS.length}</p>
      <p className="mt-2 font-heading text-lg font-bold text-navy">{q.text}</p>
      <div className="mt-4 flex flex-col gap-2">
        {q.options.map((opt) => (
          <button
            key={opt}
            type="button"
            className="rounded-lg border border-surface bg-white px-4 py-3 text-left text-sm font-medium text-navy hover:border-primary"
            onClick={() => onPick(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
