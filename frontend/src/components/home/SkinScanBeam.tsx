"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Horizontal scan line; uses translateY in px so motion works across browsers/layouts. */
export function SkinScanBeam() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [travelPx, setTravelPx] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setTravelPx(Math.max(0, el.clientHeight - 4));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (reduced) return null;

  return (
    <div
      ref={trackRef}
      className="pointer-events-none absolute inset-x-[11%] top-0 bottom-0 overflow-visible"
      aria-hidden
    >
      <motion.div
        className="absolute left-0 right-0 top-0 h-1 rounded-full bg-gradient-to-r from-transparent via-cyan-200 to-transparent shadow-[0_0_18px_rgba(34,211,238,0.95),0_0_36px_rgba(20,184,166,0.5),inset_0_1px_0_rgba(255,255,255,0.35)]"
        initial={{ y: 0 }}
        animate={travelPx > 0 ? { y: [0, travelPx] } : { y: 0 }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
