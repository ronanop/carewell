import Image from "next/image";
import { SkinScanBeam } from "@/components/home/SkinScanBeam";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";

export function SkinScanSection() {
  return (
    <SectionShell aria-labelledby="skin-scan-heading">
      <div className="container">
        <div className="overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-white to-teal/5 shadow-md">
          <div className="grid items-center gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-10">
            <div className="text-center lg:text-left">
              <SectionHeader
                id="skin-scan-heading"
                eyebrow="AI skin analysis"
                title="Analyze My Skin"
                align="left"
                description="AI-powered analysis to identify your skin concerns and recommend the right treatment—guided by our clinical team in Delhi."
                className="!mx-0 !max-w-none !text-left [&_h2]:text-display-sm [&_h2]:sm:text-display-md"
              />
              <div className="mt-6 flex justify-center lg:justify-start">
                <Button href="/skin-scan" variant="primary" size="lg">
                  Scan My Skin →
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full border-[6px] border-white bg-white shadow-lg sm:h-[240px] sm:w-[240px] lg:h-[280px] lg:w-[280px]">
                <Image
                  src="/demo/ai-skin-scan-v3.jpg"
                  alt="AI skin scan preview"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 280px, 60vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-full motion-reduce:hidden"
                  aria-hidden
                >
                  <div
                    className="absolute inset-0 rounded-full opacity-20"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(180deg, transparent 0px, transparent 10px, rgba(11,123,107,0.14) 10px, rgba(11,123,107,0.14) 11px)",
                    }}
                  />
                  <div className="absolute inset-0 animate-skin-scan-sheen rounded-full bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,rgba(20,184,166,0.18),transparent_72%)]" />
                  <SkinScanBeam />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
