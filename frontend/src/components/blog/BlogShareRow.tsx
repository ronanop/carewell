"use client";

import { useMemo, useState } from "react";

export function BlogShareRow({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const enc = useMemo(() => encodeURIComponent(title), [title]);
  const encUrl = useMemo(() => encodeURIComponent(url), [url]);

  const wa = `https://wa.me/?text=${enc}%20${encUrl}`;
  const fb = `https://www.facebook.com/sharer/sharer.php?u=${encUrl}`;
  const x = `https://twitter.com/intent/tweet?url=${encUrl}&text=${enc}`;

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
      <span className="font-medium text-navy/70">Share:</span>
      <a href={wa} className="rounded-full border border-surface px-3 py-1 text-navy hover:border-primary hover:text-primary">
        WhatsApp
      </a>
      <a
        href={fb}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-surface px-3 py-1 text-navy hover:border-primary hover:text-primary"
      >
        Facebook
      </a>
      <a
        href={x}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-surface px-3 py-1 text-navy hover:border-primary hover:text-primary"
      >
        X
      </a>
      <button
        type="button"
        className="rounded-full border border-surface px-3 py-1 text-navy hover:border-primary hover:text-primary"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            /* ignore */
          }
        }}
      >
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
