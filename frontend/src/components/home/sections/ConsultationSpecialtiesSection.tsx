import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { CONSULTATION_SPECIALTIES } from "@/data/homepage";

function SpecialtyIcon({ title }: { title: string }) {
  return (
    <span
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F5E9E3] text-primary"
      aria-hidden
    >
      <span className="text-[10px] font-bold uppercase leading-none">{title.split(" ")[0].slice(0, 3)}</span>
    </span>
  );
}

export function ConsultationSpecialtiesSection() {
  return (
    <SectionShell variant="surface" aria-labelledby="consultation-specialties-heading">
      <div className="container">
        <SectionHeader
          id="consultation-specialties-heading"
          eyebrow={CONSULTATION_SPECIALTIES.eyebrow}
          title={CONSULTATION_SPECIALTIES.title}
          description={
            <>
              <p>{CONSULTATION_SPECIALTIES.descriptions[0]}</p>
              <p>{CONSULTATION_SPECIALTIES.descriptions[1]}</p>
            </>
          }
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
          {CONSULTATION_SPECIALTIES.items.map((specialty) => (
            <Link
              key={specialty.href}
              href={specialty.href}
              className="group flex min-h-[140px] min-w-0 flex-col items-center justify-center gap-3 rounded-2xl border border-transparent bg-[#F5E9E3]/80 p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-primary/20 hover:bg-[#F5E9E3] hover:shadow-md sm:min-h-[150px] sm:p-5"
            >
              <SpecialtyIcon title={specialty.title} />
              <span className="text-balance text-sm font-bold leading-tight text-navy group-hover:text-primary sm:text-[15px]">
                {specialty.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
