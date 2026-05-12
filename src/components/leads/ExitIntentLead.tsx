"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

const TREATMENT = "General consultation";
const EXIT_INTENT_DISMISSED_UNTIL_KEY = "cw-exit-intent-dismissed-until";
const EXIT_INTENT_SHOWN_SESSION_KEY = "cw-exit-intent-shown-session";
const EXIT_INTENT_DISMISS_SECONDS = 120;

export function ExitIntentLead() {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "err">("idle");
  const hasShownInSessionRef = useRef(false);

  const dismissTemporarily = () => {
    try {
      const dismissedUntil = Date.now() + EXIT_INTENT_DISMISS_SECONDS * 1000;
      window.localStorage.setItem(EXIT_INTENT_DISMISSED_UNTIL_KEY, String(dismissedUntil));
    } catch {
      // Ignore storage errors (private mode / blocked storage).
    }
  };

  useEffect(() => {
    try {
      const dismissedUntilRaw = window.localStorage.getItem(EXIT_INTENT_DISMISSED_UNTIL_KEY);
      const dismissedUntil = dismissedUntilRaw ? Number(dismissedUntilRaw) : 0;
      if (Number.isFinite(dismissedUntil) && Date.now() < dismissedUntil) {
        return;
      }
    } catch {
      // If storage is unavailable, continue with normal popup behavior.
    }

    try {
      if (window.sessionStorage.getItem(EXIT_INTENT_SHOWN_SESSION_KEY) === "1") {
        hasShownInSessionRef.current = true;
        return;
      }
    } catch {
      // If session storage is unavailable, continue with normal popup behavior.
    }

    const showModal = () => {
      if (hasShownInSessionRef.current) return;
      hasShownInSessionRef.current = true;
      setOpen(true);
      try {
        window.sessionStorage.setItem(EXIT_INTENT_SHOWN_SESSION_KEY, "1");
      } catch {
        // Ignore session storage errors.
      }
    };

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (mobile) {
      const t = setTimeout(showModal, 30_000);
      return () => clearTimeout(t);
    }
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && e.relatedTarget === null) showModal();
    };
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, []);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2 || phone.replace(/\D/g, "").length < 10) {
      setStatus("err");
      return;
    }
    setStatus("loading");
    const pageUrl = typeof window !== "undefined" ? window.location.href : "";
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          mobile: phone.trim(),
          treatment: TREATMENT,
          pageUrl,
          utmSource: searchParams.get("utm_source") ?? "",
          utmMedium: searchParams.get("utm_medium") ?? "",
          utmCampaign: searchParams.get("utm_campaign") ?? "",
          source: "exit-intent",
        }),
      });
      if (!res.ok) throw new Error("fail");
      trackEvent("exit_intent_submit", { treatment: TREATMENT });
      window.dataLayer?.push({ event: "generate_lead", form: "exit-intent" });
      window.location.href = "/thank-you";
    } catch {
      setStatus("err");
    }
  };

  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <p className="font-heading text-xl font-bold text-navy">Get a FREE 15-min call</p>
        <p className="mt-2 text-sm text-alert">5 slots left this week — tell us how to reach you.</p>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <label className="block text-sm font-medium text-navy">
            Name
            <input
              className="mt-1 w-full rounded-lg border border-surface px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              autoComplete="name"
            />
          </label>
          <label className="block text-sm font-medium text-navy">
            Phone
            <input
              className="mt-1 w-full rounded-lg border border-surface px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              inputMode="tel"
              minLength={10}
            />
          </label>
          <Button type="submit" variant="primary" className="w-full" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Get Free Consultation"}
          </Button>
          <p className="text-center text-xs text-navy/65">
            🔒 100% Private | Response within 2 hours | No spam
          </p>
          {status === "err" && (
            <p className="text-center text-xs text-alert">Something went wrong. Please call the clinic.</p>
          )}
          <button
            type="button"
            className="w-full text-sm text-navy/60"
            onClick={() => {
              dismissTemporarily();
              setOpen(false);
            }}
          >
            No thanks
          </button>
        </form>
      </div>
    </div>
  );
}
