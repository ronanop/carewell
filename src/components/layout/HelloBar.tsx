"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "carewell-hello-bar-dismissed";

export function HelloBar({ messages }: { messages: string[] }) {
  const [hidden, setHidden] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    try {
      setHidden(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      setHidden(false);
    }
  }, []);

  useEffect(() => {
    if (messages.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 6000);
    return () => clearInterval(t);
  }, [messages.length]);

  if (hidden || messages.length === 0) return null;

  const text = messages[index] ?? messages[0];

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[60] flex h-9 items-center justify-center gap-4 bg-alert px-4 text-center text-xs font-medium text-white"
      role="region"
      aria-label="Announcement"
    >
      <span className="truncate">{text}</span>
      <button
        type="button"
        className="shrink-0 rounded px-2 py-0.5 text-white/90 underline-offset-2 hover:underline"
        onClick={() => {
          try {
            localStorage.setItem(STORAGE_KEY, "1");
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
