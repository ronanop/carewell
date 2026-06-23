import Link from "next/link";

const SOCIAL_LINKS: { label: string; href: string; icon: React.ReactNode }[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/carewellmedicalcentre/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M13.5 21v-7.5h2.55l.38-2.96H13.5V8.65c0-.85.24-1.43 1.46-1.43h1.56V4.56a20.6 20.6 0 0 0-2.27-.12c-2.25 0-3.79 1.37-3.79 3.89v2.21H8v2.96h2.46V21h3.04z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/CarewellMedical",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2H21l-6.52 7.45L22 22h-6.59l-5.16-6.74L4.4 22H1.64l6.98-7.98L1.5 2h6.74l4.66 6.16L18.244 2zm-1.16 18h1.86L7.04 4H5.1l11.984 16z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/carewellmedicalcentre/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/c/CareWellMedicalCentre",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26.2 26.2 0 0 0 22 12a26.2 26.2 0 0 0-.4-4.8zM10 15V9l5.2 3-5.2 3z" />
      </svg>
    ),
  },
];

const QUICK_LINKS = [
  { label: "Contact Us", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/faq" },
  { label: "Privacy Policy", href: "/pages/privacy-policy" },
  { label: "Disclaimer", href: "/pages/disclaimer" },
] as const;

const SERVICE_LINKS = [
  { label: "Cosmetic Treatments", href: "/cosmetic-treatments-in-delhi" },
  { label: "Plastic Surgery", href: "/plastic-surgery-in-delhi" },
  { label: "Hair Transplant", href: "/hair-transplant-in-delhi" },
  { label: "Skin Treatments", href: "/skin-treatments-in-delhi" },
  { label: "Intimate Surgery", href: "/intimate-surgery-in-delhi" },
  { label: "Body Contouring", href: "/body-contouring-in-delhi" },
  { label: "Urology", href: "/services/urology-in-delhi" },
] as const;

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

const DEFAULT_ADDRESS = "House No. 1, NRI Complex,\nChittaranjan Park, Delhi";

function footerHeading(title: string) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.12em] text-navy">{title}</p>
  );
}

function footerLink(href: string, label: string) {
  return (
    <li>
      <Link href={href} className="text-sm text-navy/80 underline-offset-2 hover:text-navy hover:underline">
        {label}
      </Link>
    </li>
  );
}

function parseOpeningHours(hours?: string[]): { day: string; time: string }[] {
  const raw = hours?.[0] ?? "Mon-Sun: 10:00-19:00";
  const match = raw.match(/(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/);
  const timeRange = match ? `${match[1]} - ${match[2]}` : "10:00 - 19:00";
  return WEEKDAYS.map((day) => ({ day, time: timeRange }));
}

export function Footer({
  phone,
  email,
  address,
  hours,
}: {
  phone?: string;
  email?: string;
  address?: string;
  mapEmbedUrl?: string;
  hours?: string[];
}) {
  const openingHours = parseOpeningHours(hours);
  const displayAddress = address?.trim() || DEFAULT_ADDRESS;
  const tel = phone?.replace(/[\s-]/g, "") ?? "";

  return (
    <footer className="bg-[#f7f4f0] text-navy">
      <div className="container grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-16">
        <div>
          {footerHeading("About Us")}
          <p className="mt-4 text-sm leading-relaxed text-navy/75">
            Care Well Medical Centre is a leading cosmetic surgery clinic in Delhi, offering advanced aesthetic and
            reconstructive treatments with expert care.
          </p>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-navy/75">{displayAddress}</p>
          {phone ? (
            <p className="mt-3 text-sm">
              <a href={`tel:${tel}`} className="font-medium text-navy underline underline-offset-2 hover:text-primary">
                {phone.replace(/^\+91\s?/, "+91-")}
              </a>
            </p>
          ) : null}
          {email ? (
            <p className="mt-2 text-sm">
              <a href={`mailto:${email}`} className="text-navy underline underline-offset-2 hover:text-primary">
                {email}
              </a>
            </p>
          ) : null}
          <ul className="mt-5 flex items-center gap-3">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Care Well Medical Centre on ${s.label}`}
                  className="inline-flex text-navy/70 transition-colors hover:text-navy"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {footerHeading("Quick Links")}
          <ul className="mt-4 space-y-2.5">{QUICK_LINKS.map((item) => footerLink(item.href, item.label))}</ul>
        </div>

        <div>
          {footerHeading("Services")}
          <ul className="mt-4 space-y-2.5">
            {SERVICE_LINKS.map((item) => footerLink(item.href, item.label))}
          </ul>
        </div>

        <div>
          {footerHeading("Opening Hours")}
          <ul className="mt-4 space-y-2">
            {openingHours.map(({ day, time }) => (
              <li key={day} className="flex items-baseline justify-between gap-4 text-sm text-navy/80">
                <span>{day}</span>
                <span className="shrink-0 tabular-nums">{time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-navy/10 py-5">
        <div className="container text-xs text-navy/60">
          <p>© {new Date().getFullYear()} Care Well Medical Centre. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
