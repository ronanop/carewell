"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function ServiceSidebarReveal({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const skip = reduceMotion === true;

  return (
    <motion.div
      className="space-y-6"
      initial={skip ? { x: 0, opacity: 1 } : { x: 120, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 28,
        mass: 0.85,
      }}
    >
      {children}
    </motion.div>
  );
}
