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
      className="fixed top-0 left-0 right-0 z-[60] flex h-10 items-center justify-center gap-4 bg-navy px-4 text-center text-sm font-medium text-white"
      role="region"
      aria-label="Announcement"
    >
      <span className="truncate">{text}</span>
      <button
        type="button"
        className="shrink-0 rounded px-2 py-0.5 text-white/90 underline-offset-2 hover:underline"
        onClick={() => {
          try {
            localStorage.setItem(STORAGE_KEY, String(Date.now()));
          } catch {
            /* ignore */
          }
          setHidden(true);
        }}
      >
        Close
      </button>
    </div>
  );
}
