"use client";

import { useReducedMotion } from "framer-motion";

/** Respect prefers-reduced-motion; optionally dampen on low-memory devices. */
export function useMotionSafe() {
  const reduced = useReducedMotion();
  const lowMemory = getDeviceMemoryGb();
  return {
    reduced: !!reduced,
    disableStagger: !!reduced || (lowMemory !== null && lowMemory < 4),
  };
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

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const scaleOnHover = {
  whileHover: { scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } },
  whileTap: { scale: 0.97, transition: { duration: 0.1 } },
};
