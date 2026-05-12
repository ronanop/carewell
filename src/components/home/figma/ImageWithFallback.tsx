"use client";

import { useState } from "react";
import type { ImgHTMLAttributes } from "react";

type ImageWithFallbackProps = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/demo/home-hero.svg",
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <img
      src={hasError ? fallbackSrc : src}
      alt={alt ?? ""}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
