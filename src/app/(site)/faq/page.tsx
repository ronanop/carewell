import type { Metadata } from "next";
import Link from "next/link";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { getSiteUrl } from "@/lib/site";

export const revalidate = 3600;

const items = [
  {
    question: "Where is Care Well Medical Centre located?",
    answer:
      "We are in Chittaranjan Park, South Delhi. Use the contact page for maps, phone, and WhatsApp — we respond quickly during working hours.",
  },
  {
    question: "How do I book a consultation?",
    answer:
      "Booking is easy: use the “Book consultation” flow, call the clinic, or message us on WhatsApp. Free consultation slots are subject to availability.",
  },
  {
    question: "Do you treat international or outstation patients?",
    answer:
      "Yes. Many patients travel from NCR and other cities. Share your timeline and we can advise on consultation and procedure scheduling.",
  },
  {
    question: "What cosmetic and surgical treatments do you offer?",
    answer:
      "We offer a broad range of cosmetic, skin, body contouring, and wellness-related treatments. Browse services by category or use the site search.",
  },
  {
    question: "Is pricing fixed online?",
    answer:
      "We show indicative starting ranges where relevant. Final cost depends on assessment, technique, and plan — confirmed only after consultation.",
  },
  {
    question: "What should I bring to my first visit?",
    answer:
      "Bring a valid ID, a list of medications and allergies, and prior reports or photos if they help explain your concern. Your doctor will guide further tests if needed.",
  },
  {
    question: "How to book at Care Well?",
    answer:
      "Call or WhatsApp Care Well Medical Centre, Chittaranjan Park, South Delhi, or book online. Same-day callbacks are offered during working hours when possible.",
  },
];

export const metadata: Metadata = {
  title: "FAQ | Care Well Medical Centre",
  description:
    "Frequently asked questions about consultations, location, booking, and treatments at Care Well Medical Centre, South Delhi.",
  alternates: {
    canonical: `${getSiteUrl()}/faq`,
  },
};

export default function FaqPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <p className="text-sm font-medium text-primary">Help</p>
      <h1 className="font-heading mt-2 text-4xl font-bold text-navy">Frequently asked questions</h1>
      <p className="mt-4 text-navy/80">
        Quick answers about Care Well Medical Centre. For medical advice about your case, please{" "}
        <Link href="/book-consultation" className="font-medium text-primary hover:underline">
          book a consultation
        </Link>
        .
      </p>
      <div className="mt-10">
        <ServiceFaq items={items} />
      </div>
      <p className="mt-12 text-center text-sm text-navy/65">
        <Link href="/contact" className="font-semibold text-primary">
          Contact & directions
        </Link>
      </p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </div>
  );
}
