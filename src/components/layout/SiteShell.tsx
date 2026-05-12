import { ClarityScript } from "@/components/analytics/ClarityScript";
import { GtmScript } from "@/components/analytics/GtmScript";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { HelloBar } from "@/components/layout/HelloBar";
import { MobileCallButton } from "@/components/layout/MobileCallButton";
import { WhatsAppBubble } from "@/components/layout/WhatsAppBubble";
import { sanityFetch } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";

type SiteSettings = {
  helloBarMessages?: string[];
  phone?: string;
  whatsappNumber?: string;
  address?: string;
  mapEmbedUrl?: string;
  medicalDisclaimer?: string;
  mbbsRegNo?: string;
  hours?: string[];
  gtmId?: string;
  clarityProjectId?: string;
};

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const settings = (await sanityFetch<SiteSettings>(siteSettingsQuery)) ?? {};

  const messages =
    settings.helloBarMessages?.filter(Boolean).length ?
      (settings.helloBarMessages as string[])
    : ["Free consultation — Limited slots."];

  const gtmId = settings.gtmId || process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <>
      <GtmScript gtmId={gtmId} />
      <ClarityScript projectId={settings.clarityProjectId} />
      <HelloBar messages={messages} />
      <Navbar phone={settings.phone} />
      <div className="min-h-screen pt-[calc(var(--announcement-offset,0px)+3.75rem)] lg:pt-[calc(var(--announcement-offset,0px)+4.5rem)]">
        {children}
      </div>
      <Footer
        phone={settings.phone}
        address={settings.address}
        mapEmbedUrl={settings.mapEmbedUrl}
        disclaimer={settings.medicalDisclaimer}
        mbbs={settings.mbbsRegNo}
        hours={settings.hours}
      />
      <WhatsAppBubble number={settings.whatsappNumber} />
      <MobileCallButton phone={settings.phone} />
      <CookieBanner />
    </>
  );
}
