"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "carewell-hello-bar-dismissed";
const DAY_MS = 24 * 60 * 60 * 1000;

export function HelloBar({ messages }: { messages: string[] }) {
  const [hidden, setHidden] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setHidden(false);
        return;
      }
      const ts = Number(raw);
      setHidden(Number.isFinite(ts) && Date.now() - ts < DAY_MS);
    } catch {
      setHidden(false);
    }
  }, []);

  useEffect(() => {
    if (messages.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 4000);
    return () => clearInterval(t);
  }, [messages.length]);

  useEffect(() => {
    const visible = !hidden && messages.length > 0;
    document.documentElement.style.setProperty("--announcement-offset", visible ? "40px" : "0px");
    return () => {
      document.documentElement.style.setProperty("--announcement-offset", "0px");
    };
  }, [hidden, messages.length]);

  if (hidden || messages.length === 0) return null;

  const text = messages[index] ?? messages[0];

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] flex h-10 items-center justify-center gap-2 bg-navy px-3 text-center text-xs font-medium text-white sm:gap-4 sm:px-4 sm:text-sm"
      role="region"
      aria-label="Announcement"
    >
      <span className="line-clamp-1 sm:truncate">{text}</span>
      <button
        type="button"
        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Dismiss announcement"
        onClick={() => {
          try {
            localStorage.setItem(STORAGE_KEY, String(Date.now()));
          } catch {
            /* ignore */
          }
          setHidden(true);
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
