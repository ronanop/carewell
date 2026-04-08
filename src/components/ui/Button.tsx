"use client";

import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  type?: "button" | "submit";
  onClick?: () => void;
};

const base =
  "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-[transform,colors,opacity] duration-hover ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transform-none";

const variants = {
  primary: "bg-primary text-white hover:bg-navy",
  secondary: "bg-teal text-white hover:bg-navy",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  ghost: "text-primary hover:bg-surface",
};

export function Button({
  children,
  className,
  href,
  variant = "primary",
  type = "button",
  onClick,
}: ButtonProps) {
  const reduced = useReducedMotion();
  const tap = reduced ? {} : { whileTap: { scale: 0.97 }, whileHover: { scale: 1.01 } };

  const classes = clsx(
    base,
    variants[variant],
    href && "hover:scale-[1.01] active:scale-[0.97]",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={classes} {...tap}>
      {children}
    </motion.button>
  );
}
