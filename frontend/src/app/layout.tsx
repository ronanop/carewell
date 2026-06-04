import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@carewell/backend/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  icons: {
    icon: "/carewell-logo-icon.png",
  },
  title: {
    default: "Care Well Medical Centre | Cosmetic Surgery & Vitiligo Delhi",
    template: "%s | Care Well Medical Centre",
  },
  description:
    "Care Well Medical Centre, Chittaranjan Park — expert cosmetic surgery, hair transplant, and vitiligo care in Delhi NCR. Book a free consultation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={jakarta.variable} suppressHydrationWarning>
      <body className={`${jakarta.className} font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
