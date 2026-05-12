import Link from "next/link";
import { MapEmbed } from "@/components/layout/MapEmbed";

export function Footer({
  phone,
  address,
  mapEmbedUrl,
  disclaimer,
  mbbs,
  hours,
}: {
  phone?: string;
  address?: string;
  mapEmbedUrl?: string;
  disclaimer?: string;
  mbbs?: string;
  hours?: string[];
}) {
  return (
    <footer className="bg-navy text-white">
      <div className="container grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
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
            <li><Link href="/services/hair-transplant" className="hover:underline">Hair transplant</Link></li>
            <li><Link href="/services/vitiligo-treatment" className="hover:underline">Vitiligo</Link></li>
            <li><Link href="/services/rhinoplasty" className="hover:underline">Rhinoplasty</Link></li>
            <li><Link href="/treatments/hair" className="hover:underline">All hair treatments</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-overline uppercase text-white/50">Visit us</p>
          {hours?.length ? (
            <ul className="mt-4 space-y-1 text-sm text-white/85">
              {hours.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-white/85">Mon–Sat: 10:00 – 19:00</p>
          )}
          {phone && (
            <p className="mt-4 text-sm">
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="font-semibold hover:underline">
                {phone}
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
