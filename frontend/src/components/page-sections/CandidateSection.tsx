import { TreatmentFinderQuiz } from "@/components/leads/TreatmentFinderQuiz";
import { serviceOrDefaults } from "@/page-sections/defaults";
import type { ServiceDoc } from "@/types/service";

export function CandidateSection({ service }: { service?: ServiceDoc | null }) {
  const data = serviceOrDefaults(service ?? null);

  return (
    <section className="my-12 rounded-2xl border border-surface bg-white p-6 md:p-8">
      <h2 className="font-heading text-2xl font-bold text-navy">Am I a candidate?</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-teal/40 bg-teal/5 p-6">
          <p className="font-heading font-bold text-teal">Often a good fit</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-navy/85">
            {data.candidateGood.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-alert/40 bg-alert/5 p-6">
          <p className="font-heading font-bold text-alert">May not be ideal (yet)</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-navy/85">
            {data.candidatePoor.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 max-w-md">
        <p className="text-sm text-navy/80">Still unsure? Try the treatment finder quiz.</p>
        <TreatmentFinderQuiz className="mt-4" />
      </div>
    </section>
  );
}
