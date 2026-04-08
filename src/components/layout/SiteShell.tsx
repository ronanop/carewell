import { ClarityScript } from "@/components/analytics/ClarityScript";
import { GtmScript } from "@/components/analytics/GtmScript";
import { GtmScript } from "@/components/analytics/GtmScript";
import { Footer } from "@/components/layout/Footer";
import { HeaderClient } from "@/components/layout/HeaderClient";
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

  const helloHeight = messages.length ? "2.25rem" : "0px";

  return (
    <>
      <GtmScript gtmId={settings.gtmId} />
      <ClarityScript projectId={settings.clarityProjectId} />
      <style>{`:root { --hello-bar-height: ${helloHeight}; }`}</style>
      <HelloBar messages={messages} />
      <HeaderClient phone={settings.phone} whatsapp={settings.whatsappNumber} />
      <div className="min-h-screen pt-[calc(70px+var(--hello-bar-height))] md:pt-[calc(70px+var(--hello-bar-height))]">
        {children}
      </div>
      <Footer
        phone={settings.phone}
        address={settings.address}
        disclaimer={settings.medicalDisclaimer}
        mbbs={settings.mbbsRegNo}
        hours={settings.hours}
      />
      <WhatsAppBubble number={settings.whatsappNumber} />
      <MobileCallButton phone={settings.phone} />
    </>
  );
}
