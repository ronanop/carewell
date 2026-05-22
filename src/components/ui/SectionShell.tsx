import type { ReactNode } from "react";
import clsx from "clsx";

type SectionShellProps = {
  children: ReactNode;
  variant?: "default" | "surface" | "navy";
  padding?: "default" | "compact" | "none";
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
  default: "py-section-mobile lg:py-section-desktop",
  compact: "py-10 lg:py-14",
  none: "",
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
