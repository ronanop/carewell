"use client";

import { useReducedMotion } from "framer-motion";

/** Respect prefers-reduced-motion; optionally dampen on low-memory devices. */
export function useMotionSafe() {
  const reduced = useReducedMotion();
  return { reduced: !!reduced };
}

export function getDeviceMemoryGb(): number | null {
  if (typeof navigator === "undefined") return null;
  const d = navigator as Navigator & { deviceMemory?: number };
  return typeof d.deviceMemory === "number" ? d.deviceMemory : null;
}

export function shouldReduceHeavyMotion(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return true;
  const mem = getDeviceMemoryGb();
  if (mem !== null && mem < 4) return true;
  return false;
}
