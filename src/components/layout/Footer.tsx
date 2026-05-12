import Link from "next/link";
import { MapEmbed } from "@/components/layout/MapEmbed";

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

export function Footer({
  phone,
  email,
  address,
  mapEmbedUrl,
  disclaimer,
  mbbs,
  hours,
}: {
  phone?: string;
  email?: string;
  address?: string;
  mapEmbedUrl?: string;
  disclaimer?: string;
  mbbs?: string;
  hours?: string[];
}) {
  return (
    <footer className="bg-navy text-white">
      <div className="container grid grid-cols-2 gap-10 py-16 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1">
          <p className="font-heading text-lg font-bold">Care Well Medical Centre</p>
          <p className="mt-3 text-sm text-white/80">Advanced Cosmetic Surgery & Skin Treatments</p>
          {address && <p className="mt-2 text-sm text-white/80 whitespace-pre-line">{address}</p>}
          <div className="mt-4 max-w-xs">
            <MapEmbed
              embedSrc={mapEmbedUrl}
              title="Care Well Medical Centre map"
              frameClassName="aspect-video w-full rounded-lg border border-white/15"
            />
          </div>
          <div className="mt-5">
            <p className="text-overline uppercase text-white/50">Follow us</p>
            <ul className="mt-3 flex items-center gap-2.5">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Care Well Medical Centre on ${s.label}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <p className="text-overline uppercase text-white/50">Quick links</p>
          <ul className="mt-4 space-y-2 text-sm text-white/85">
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/about/dr-bhasin" className="hover:underline">Dr. Sandeep Bhasin</Link></li>
            <li><Link href="/blog" className="hover:underline">Blog</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            <li><Link href="/book-consultation" className="hover:underline">Book consultation</Link></li>
            <li><Link href="/cost-estimator" className="hover:underline">Cost estimator</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-overline uppercase text-white/50">Popular treatments</p>
          <ul className="mt-4 space-y-2 text-sm text-white/85">
            <li><Link href="/hair-transplant-in-delhi" className="hover:underline">Hair transplant</Link></li>
            <li><Link href="/services/vitiligo-treatment" className="hover:underline">Vitiligo</Link></li>
            <li><Link href="/services/rhinoplasty" className="hover:underline">Rhinoplasty</Link></li>
            <li><Link href="/treatments/hair" className="hover:underline">All hair treatments</Link></li>
          </ul>
        </div>
        <div className="col-span-2 text-center lg:col-span-1 lg:text-left">
          <p className="text-overline uppercase text-white/50">Visit us</p>
          {hours?.length ? (
            <ul className="mt-4 space-y-1 text-sm font-semibold text-white">
              {hours.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm font-semibold text-white">Monday to Sunday: 10:00 – 19:00</p>
          )}
          {phone && (
            <p className="mt-4 text-sm">
              <a href={`tel:${phone.replace(/[\s-]/g, "")}`} className="font-semibold hover:underline">
                {phone}
              </a>
            </p>
          )}
          {email && (
            <p className="mt-2 text-sm">
              <a href={`mailto:${email}`} className="hover:underline">
                {email}
              </a>
            </p>
          )}
        </div>
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="container text-xs text-white/70">
          <p>© {new Date().getFullYear()} Care Well Medical Centre. All rights reserved.</p>
          {mbbs && <p className="mt-2">MBBS Reg. No.: {mbbs}</p>}
          {disclaimer && <p className="mt-3 max-w-4xl">{disclaimer}</p>}
        </div>
      </div>
      <details className="border-t border-white/10">
        <summary className="container cursor-pointer py-4 text-sm font-semibold text-white/80">
          Find Treatments Near You
        </summary>
        <div className="container grid gap-3 pb-6 text-sm text-white/70 md:grid-cols-3">
          {["Delhi", "South Delhi", "Gurgaon", "Noida", "Faridabad", "Greater Noida"].map((city) => (
            <div key={city} className="space-y-1">
              <p className="font-semibold text-white/85">{city}</p>
              <Link href={`/locations/${city.toLowerCase().replace(/\s+/g, "-")}`} className="block hover:text-white">
                Hair Transplant in {city}
              </Link>
              <Link href={`/locations/${city.toLowerCase().replace(/\s+/g, "-")}`} className="block hover:text-white">
                Vitiligo Treatment in {city}
              </Link>
            </div>
          ))}
        </div>
      </details>
    </footer>
  );
}
