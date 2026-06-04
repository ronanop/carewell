"use client";

import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "whatsapp" | "call";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-button font-semibold transition-[background-color,color,border-color,transform,opacity] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transform-none";

const variants = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  secondary: "bg-teal text-white hover:bg-teal-hover",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  ghost: "text-primary hover:bg-primary-light",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1EA952]",
  call: "bg-navy text-white hover:bg-[#08304f]",
};

const sizes = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-3.5 text-base",
};

export function Button({
  children,
  className,
  href,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const reduced = useReducedMotion();
  const tap = reduced ? {} : { whileTap: { scale: 0.97 }, whileHover: { scale: 1.01 } };

  const classes = clsx(
    base,
    variants[variant],
    sizes[size],
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
    <motion.button
      type={type}
      onClick={onClick}
      className={clsx(classes, disabled && "pointer-events-none opacity-60")}
      disabled={disabled}
      {...tap}
    >
      {children}
    </motion.button>
  );
}
