"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ChevronRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { pageAwareWhatsappMessage, whatsappHref } from "@/lib/whatsapp";

type ServiceLink = {
  label: string;
  children?: string[];
};

type ServicePreview = {
  title: string;
  subtitle: string;
  image: string;
};

const megaMenuData = [
  {
    title: "Hair Treatments",
    links: [
      {
        label: "Hair Loss Treatment",
        children: ["PRP Hair Treatment", "Growth Factor Concentrate"],
      },
      {
        label: "Hair Transplant",
        children: [
          "Beard Transplant",
          "Eyebrow Transplant",
          "Female Hair Transplant",
          "Cost of Hair Transplant",
          "Before and After Results",
        ],
      },
    ] as ServiceLink[],
  },
  {
    title: "Skin & Aesthetic",
    links: [
      {
        label: "Skin Treatments",
        children: [
          "Acne Scar",
          "Skin Whitening",
          "Dark Circles",
          "Vitiligo Treatment",
        ],
      },
      {
        label: "Cosmetic Treatments",
        children: [
          "Botox Treatment",
          "Dermal Fillers",
          "Anti Aging Treatments",
          "Lip Augmentation",
        ],
      },
      { label: "Body Contouring", children: ["Cryolipolysis"] },
      { label: "Laser Hair Removal" },
    ] as ServiceLink[],
  },
  {
    title: "Surgical Procedures",
    links: [
      { label: "Liposuction" },
      { label: "Rhinoplasty" },
      { label: "Breast Augmentation" },
      { label: "Gynecomastia" },
      { label: "Facelift" },
      { label: "Tummy Tuck" },
      {
        label: "Intimate Surgery",
        children: ["Hymenoplasty", "Labiaplasty", "Vaginoplasty"],
      },
      { label: "Male to Female Surgery" },
    ] as ServiceLink[],
  },
  {
    title: "Wellness",
    links: [
      {
        label: "Holistic Wellness",
        children: ["Ozone Therapy", "HBOT", "Peptide Therapy"],
      },
      { label: "IV Therapy" },
    ] as ServiceLink[],
  },
];

const desktopLinks = [
  { label: "Results", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const ctaMessages = ["Book Free Consultation", "With 10+ Years of Trust"];
const defaultServicePreview: ServicePreview = {
  title: "Hair Treatments",
  subtitle: "Personalized plans for healthier hair and confidence.",
  image: "/demo/hair-treatments-card.png",
};

const servicePreviewByCategory: Record<string, ServicePreview> = {
  "Hair Treatments": {
    title: "Hair Treatments",
    subtitle: "FUE/FUT transplant, PRP and medical regrowth support.",
    image: "/demo/hair-treatments-card.png",
  },
  "Skin & Aesthetic": {
    title: "Skin & Aesthetic",
    subtitle: "Laser, fillers and advanced skin rejuvenation options.",
    image: "/demo/skin-aesthetic-card.png",
  },
  "Surgical Procedures": {
    title: "Surgical Procedures",
    subtitle: "Expert cosmetic surgery with planned aftercare.",
    image: "/demo/surgical-procedures-card.png",
  },
  Wellness: {
    title: "Wellness",
    subtitle: "Recovery and wellness therapies for long-term balance.",
    image: "/demo/wellness-card.png",
  },
};

const toServiceSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\+/g, " plus ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function Navbar({ phone, whatsappNumber }: { phone?: string; whatsappNumber?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [ctaMessageIndex, setCtaMessageIndex] = useState(0);
  const [typedCtaText, setTypedCtaText] = useState(ctaMessages[0]);
  const [isDeletingCtaText, setIsDeletingCtaText] = useState(false);
  const [activeServicePreview, setActiveServicePreview] = useState<ServicePreview>(defaultServicePreview);
  const megaMenuCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const currentMessage = ctaMessages[ctaMessageIndex];
    const hasFinishedTyping = typedCtaText === currentMessage;
    const hasClearedText = typedCtaText.length === 0;

    const timeout = setTimeout(
      () => {
        if (!isDeletingCtaText && !hasFinishedTyping) {
          setTypedCtaText(currentMessage.slice(0, typedCtaText.length + 1));
          return;
        }

        if (!isDeletingCtaText && hasFinishedTyping) {
          setIsDeletingCtaText(true);
          return;
        }

        if (isDeletingCtaText && !hasClearedText) {
          setTypedCtaText(currentMessage.slice(0, typedCtaText.length - 1));
          return;
        }

        setIsDeletingCtaText(false);
        setCtaMessageIndex((prev) => (prev + 1) % ctaMessages.length);
      },
      !isDeletingCtaText && hasFinishedTyping ? 1500 : isDeletingCtaText ? 45 : 80,
    );

    return () => clearTimeout(timeout);
  }, [ctaMessageIndex, isDeletingCtaText, typedCtaText]);

  useEffect(() => {
    return () => {
      if (megaMenuCloseTimerRef.current) {
        clearTimeout(megaMenuCloseTimerRef.current);
      }
    };
  }, []);

  const clearMegaMenuCloseTimer = () => {
    if (megaMenuCloseTimerRef.current) {
      clearTimeout(megaMenuCloseTimerRef.current);
      megaMenuCloseTimerRef.current = null;
    }
  };

  const openMegaMenu = () => {
    clearMegaMenuCloseTimer();
    setMegaMenuOpen(true);
    setActiveServicePreview(defaultServicePreview);
  };

  const queueMegaMenuClose = () => {
    clearMegaMenuCloseTimer();
    megaMenuCloseTimerRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 140);
  };

  const handleBrandClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const callHref = phone ? `tel:${phone.replace(/\s+/g, "")}` : "tel:+";
  const waNumber = whatsappNumber || phone || "";
  const waHref = waNumber
    ? whatsappHref(waNumber, pageAwareWhatsappMessage("/"))
    : "https://wa.me/";

  return (
    <>
      <header
        style={{ top: "var(--announcement-offset, 0px)" }}
        className="fixed left-0 right-0 z-[55] h-[60px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-300 font-heading lg:h-[72px]"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-3">
          <Link href="/" onClick={handleBrandClick} className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Image
              src="/carewell-logo-icon.png"
              alt="Carewell Medical Centre"
              width={40}
              height={40}
              className="h-8 w-8 shrink-0 sm:h-9 sm:w-9 lg:h-10 lg:w-10"
              priority
            />
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[13px] font-semibold text-green-600 sm:text-[14px] lg:text-[15px]">
                Carewell Medical Centre
              </p>
              <p className="hidden truncate text-[10px] text-[#49506B] sm:block lg:text-[11px]">
                Laproscopic & Cosmetic Surgery Centre
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#0E1B4D]">
            <Link href="/about" className="transition-colors hover:text-[#2563eb]">
              About
            </Link>

            <div
              className="relative"
              onMouseEnter={openMegaMenu}
              onMouseLeave={queueMegaMenuClose}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 transition-colors hover:text-[#2563eb]"
                aria-expanded={megaMenuOpen}
              >
                Services
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${megaMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {megaMenuOpen && (
                  <motion.div
                    onMouseEnter={openMegaMenu}
                    onMouseLeave={queueMegaMenuClose}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      top: "calc(var(--announcement-offset, 0px) + 4.5rem)",
                    }}
                    className="fixed left-0 right-0 z-50 border-b border-t border-[#E8EAF1] bg-white shadow-[0_24px_48px_-12px_rgba(16,24,40,0.18)]"
                  >
                    <div className="mx-auto max-w-[1200px] px-6 py-6">
                      <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-4 xl:grid-cols-[repeat(4,minmax(0,1fr))_260px]">
                        {megaMenuData.map((section) => (
                          <div key={section.title} className="px-4 border-r border-[#ECEEF5] last:border-r-0">
                            <p
                              className="mb-4 border-b border-[#E6EAF4] pb-2 text-[20px] font-bold tracking-[-0.01em] text-[#0A2E52]"
                              onMouseEnter={() => setActiveServicePreview(servicePreviewByCategory[section.title] ?? defaultServicePreview)}
                            >
                              {section.title}
                            </p>
                            <div className="space-y-3">
                              {section.links.map((link) => (
                                <div key={link.label}>
                                  <Link
                                    href={`/services/${toServiceSlug(link.label)}`}
                                    className="inline-block text-[13px] font-medium text-[#1E2748]"
                                    onMouseEnter={() => setActiveServicePreview(servicePreviewByCategory[section.title] ?? defaultServicePreview)}
                                  >
                                    {link.label}
                                  </Link>
                                  {link.children && (
                                    <ul className="mt-1.5 space-y-1.5">
                                      {link.children.map((child) => (
                                        <li
                                          key={`${link.label}-${child}`}
                                          className="flex items-start gap-1.5 text-[12px] text-[#5A6386]"
                                          onMouseEnter={() =>
                                            setActiveServicePreview(servicePreviewByCategory[section.title] ?? defaultServicePreview)
                                          }
                                        >
                                          <ChevronRight size={13} className="mt-[1px] shrink-0" />
                                          <Link href={`/services/${toServiceSlug(child)}`} className="hover:text-[#1E2748]">
                                            {child}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                        <div className="hidden xl:block xl:pl-5">
                          <div className="overflow-hidden rounded-2xl border border-[#DFE5EE] bg-[#F7F9FC] shadow-sm">
                            <div className="relative aspect-[4/3] w-full">
                              <Image
                                src={activeServicePreview.image}
                                alt={activeServicePreview.title}
                                fill
                                sizes="300px"
                                className="object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <p className="text-[17px] font-semibold text-[#0A2E52]">{activeServicePreview.title}</p>
                              <p className="mt-1 text-[13px] leading-relaxed text-[#5A6386]">{activeServicePreview.subtitle}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {desktopLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-[#2563eb]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#DFE3F0] bg-white inline-flex items-center justify-center transition-transform hover:scale-105"
            >
              <Image
                src="/whatsapp-icon-custom.png"
                alt="WhatsApp"
                fill
                sizes="40px"
                className="object-cover"
              />
            </a>
            <Link
              href="/book-consultation"
              className="h-10 min-w-[200px] px-4 rounded-full bg-[#0E1B4D] text-white inline-flex items-center justify-center text-sm font-semibold hover:bg-[#162660] transition-colors xl:min-w-[220px] xl:px-5"
            >
              <span className="whitespace-nowrap">{typedCtaText}</span>
              <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-white/90" aria-hidden />
            </Link>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#DFE3F0] text-[#0E1B4D]"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              top: "calc(var(--announcement-offset, 0px) + 3.75rem)",
            }}
            className="fixed left-0 right-0 bottom-0 z-40 bg-white lg:hidden"
          >
            <div className="h-full overflow-y-auto px-6 py-6 flex flex-col">
              <nav className="space-y-5 text-[#0E1B4D]">
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium">
                  About
                </Link>
                <div>
                  <p className="mb-3 text-lg font-medium flex items-center gap-1">
                    Services
                    <ChevronDown size={18} />
                  </p>
                  <div className="space-y-4">
                    {megaMenuData.map((section) => (
                      <div key={section.title}>
                        <p className="text-sm font-semibold text-[#222C52] mb-2">{section.title}</p>
                        <div className="space-y-2">
                          {section.links.map((link) => (
                            <div key={`${section.title}-${link.label}`}>
                              <Link
                                href={`/services/${toServiceSlug(link.label)}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-sm font-medium text-[#37406A]"
                              >
                                {link.label}
                              </Link>
                              {link.children && (
                                <ul className="mt-1 space-y-1">
                                  {link.children.map((child) => (
                                    <li key={`${link.label}-${child}`} className="text-xs text-[#61698D] flex items-center gap-1.5">
                                      <ChevronRight size={13} />
                                      <Link href={`/services/${toServiceSlug(child)}`} onClick={() => setMobileMenuOpen(false)}>
                                        {child}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  href="/gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-medium"
                >
                  Results
                </Link>
                <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium">
                  Blog
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-medium"
                >
                  Contact
                </Link>
              </nav>

              <div className="mt-auto pt-8 grid grid-cols-2 gap-3">
                <a
                  href={callHref}
                  className="h-11 rounded-full border border-[#D9DDEC] text-[#0E1B4D] inline-flex items-center justify-center gap-2 text-sm font-semibold"
                >
                  <Phone size={16} />
                  Call
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="h-11 rounded-full bg-[#25D366] text-white inline-flex items-center justify-center gap-2 text-sm font-semibold"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
