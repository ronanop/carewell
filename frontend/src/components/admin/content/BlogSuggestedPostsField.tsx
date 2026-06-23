"use client";

import { useEffect, useState } from "react";
import { inputClass } from "@/components/admin/content/AdminFormFields";

const MAX_SUGGESTED = 3;

type BlogOption = { id: string; slug: string; title: string };

export function BlogSuggestedPostsField({
  currentSlug,
  value,
  onChange,
}: {
  currentSlug: string;
  value: string[];
  onChange: (slugs: string[]) => void;
}) {
  const [options, setOptions] = useState<BlogOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/content/blog");
        const json = (await res.json()) as { posts?: BlogOption[] };
        if (!cancelled) {
          setOptions((json.posts ?? []).filter((p) => p.slug !== currentSlug));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [currentSlug]);

  const slots = [0, 1, 2].map((i) => value[i] ?? "");

  function setSlot(index: number, slug: string) {
    const next = [...slots];
    next[index] = slug;
    onChange(next.filter(Boolean));
  }

  return (
    <div className="space-y-3 text-sm">
      <p className="text-xs text-navy/60">
        Up to {MAX_SUGGESTED} posts shown at the end of this article (leave blank to skip a slot).
      </p>
      {loading ? <p className="text-xs text-navy/50">Loading posts…</p> : null}
      {slots.map((slug, index) => (
        <label key={index} className="block">
          <span className="text-xs font-medium text-navy/70">Suggestion {index + 1}</span>
          <select
            className={`${inputClass} mt-1`}
            value={slug}
            disabled={loading}
            onChange={(e) => setSlot(index, e.target.value)}
          >
            <option value="">— None —</option>
            {options.map((opt) => (
              <option
                key={opt.id}
                value={opt.slug}
                disabled={slots.includes(opt.slug) && opt.slug !== slug}
              >
                {opt.title}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
}
