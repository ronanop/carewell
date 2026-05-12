"use client";

import { useEffect, useState } from "react";

/** After ~50% page scroll depth, match brief copy for sidebar heading. */
export function BlogScrollAsideTitle() {
  const [deep, setDeep] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setDeep(max > 0 && window.scrollY / max >= 0.5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="rounded-xl border border-surface p-4 text-sm text-navy/75">
      <p className="font-heading font-bold text-navy">{deep ? "Still have questions?" : "Ask Dr. Bhasin"}</p>
      <p className="mt-2">
        {deep
          ? "Book a free consultation and get personalized guidance for your goals."
          : "Use the form to request a callback, or ask during your visit."}
      </p>
    </div>
  );
}
