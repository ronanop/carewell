import Link from "next/link";

export function Footer({
  phone,
  address,
  disclaimer,
  mbbs,
  hours,
}: {
  phone?: string;
  address?: string;
  disclaimer?: string;
  mbbs?: string;
  hours?: string[];
}) {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-4 md:px-6">
        <div>
          <p className="font-heading text-lg font-bold">Care Well Medical Centre</p>
          <p className="mt-3 text-sm text-white/80">Chittaranjan Park, South Delhi</p>
          {address && <p className="mt-2 text-sm text-white/80 whitespace-pre-line">{address}</p>}
          <div className="mt-4 aspect-video w-full max-w-xs rounded-lg bg-white/10" aria-hidden>
            {/* Map embed can be replaced with Google Maps iframe from CMS */}
          </div>
        </div>
        <div>
          <p className="font-heading font-bold">Quick links</p>
          <ul className="mt-4 space-y-2 text-sm text-white/85">
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/about/dr-bhasin" className="hover:underline">Dr. Sandeep Bhasin</Link></li>
            <li><Link href="/blog" className="hover:underline">Blog</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            <li><Link href="/book-consultation" className="hover:underline">Book consultation</Link></li>
            <li><Link href="/cost-estimator" className="hover:underline">Cost estimator</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-heading font-bold">Top services</p>
          <ul className="mt-4 space-y-2 text-sm text-white/85">
            <li><Link href="/services/sample-hair-transplant" className="hover:underline">Hair transplant</Link></li>
            <li><Link href="/services/vitiligo-treatment" className="hover:underline">Vitiligo</Link></li>
            <li><Link href="/services/rhinoplasty" className="hover:underline">Rhinoplasty</Link></li>
            <li><Link href="/treatments/hair" className="hover:underline">All hair treatments</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-heading font-bold">Hours & contact</p>
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
        <div className="mx-auto max-w-7xl px-4 text-xs text-white/70 md:px-6">
          <p>© {new Date().getFullYear()} Care Well Medical Centre. All rights reserved.</p>
          {mbbs && <p className="mt-2">MBBS Reg. No.: {mbbs}</p>}
          {disclaimer && <p className="mt-3 max-w-4xl">{disclaimer}</p>}
        </div>
      </div>
    </footer>
  );
}
