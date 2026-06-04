"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Active link styling deferred until mount to avoid SSR/client pathname hydration mismatches. */
export function useAdminNavActive(href: string, exact = false): boolean {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return false;

  return exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}
