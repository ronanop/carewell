import type { ReactNode } from "react";
import clsx from "clsx";

type SectionShellProps = {
  children: ReactNode;
  variant?: "default" | "surface" | "navy";
  padding?: "default" | "compact" | "none" | "after-hero";
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
};

const variantClasses = {
  default: "bg-background",
  surface: "bg-surface",
  navy: "bg-navy text-white",
};

const paddingClasses = {
  default: "section-y",
  compact: "section-y-compact",
  none: "",
  "after-hero": "section-y-after-hero",
};

export function SectionShell({
  children,
  variant = "default",
  padding = "default",
  className,
  id,
  "aria-labelledby": ariaLabelledby,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={clsx(variantClasses[variant], paddingClasses[padding], className)}
    >
      {children}
    </section>
  );
}
