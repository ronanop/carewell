import type { ReactNode } from "react";
import clsx from "clsx";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "center" | "left";
  id?: string;
  className?: string;
  titleClassName?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  id,
  className,
  titleClassName,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <header
      className={clsx(centered && "mx-auto max-w-3xl text-center", className)}
    >
      {eyebrow ? (
        <p className="text-overline font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={clsx(
          "mt-3 font-heading text-display-sm text-navy text-balance sm:text-display-md",
          eyebrow && "mt-3",
          !eyebrow && "mt-0",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <div
          className={clsx(
            "mt-4 space-y-3 text-body-md text-text-secondary text-pretty sm:text-body-lg",
            centered && "mx-auto max-w-3xl",
          )}
        >
          {typeof description === "string" ? <p>{description}</p> : description}
        </div>
      ) : null}
    </header>
  );
}
