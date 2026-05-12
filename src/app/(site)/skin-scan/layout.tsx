import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI skin scan | Care Well Medical Centre",
  description:
    "Educational AI-assisted skin photo review. Not a medical diagnosis — book an in-person consultation for clinical assessment.",
  alternates: { canonical: `${getSiteUrl()}/skin-scan` },
  robots: { index: true, follow: true },
};

export default function SkinScanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
