import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cost estimator | Hair transplant cost Delhi",
  description: "Estimate indicative procedure ranges in Delhi NCR. Personalized quote after consultation.",
  alternates: { canonical: `${getSiteUrl()}/cost-estimator` },
};

export default function CostEstimatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
