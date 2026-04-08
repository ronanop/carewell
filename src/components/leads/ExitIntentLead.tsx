"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export function ExitIntentLead() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (mobile) {
      const t = setTimeout(() => setOpen(true), 30_000);
      return () => clearTimeout(t);
    }
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) setOpen(true);
    };
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <p className="font-heading text-xl font-bold text-navy">Get a FREE 15-min call</p>
        <p className="mt-2 text-sm text-alert">5 slots left this week — tell us how to reach you.</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
          }}
        >
          <label className="block text-sm font-medium text-navy">
            Name
            <input
              className="mt-1 w-full rounded-lg border border-surface px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
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
            />
          </label>
          <Button type="submit" variant="primary" className="w-full">
            Get Free Consultation
          </Button>
          <button type="button" className="w-full text-sm text-navy/60" onClick={() => setOpen(false)}>
            No thanks
          </button>
        </form>
      </div>
    </div>
  );
}
