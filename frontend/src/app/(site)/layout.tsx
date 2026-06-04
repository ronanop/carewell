import { CriticalStyleFallback } from "@/components/layout/CriticalStyleFallback";
import { SiteShell } from "@/components/layout/SiteShell";

/** Public site only — no CSS reload scripts (they corrupt webpack chunks on OneDrive). */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CriticalStyleFallback />
      <SiteShell>{children}</SiteShell>
    </>
  );
}
