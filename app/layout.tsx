import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { MotionSystem } from "@/components/motion/MotionSystem";
import { siteMeta } from "@/data/cas-content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteMeta.name} — ${siteMeta.title}`,
    template: `%s | ${siteMeta.name}`,
  },
  description:
    "An IB Creativity, Activity and Service portfolio documenting experiences, evidence, learning outcomes and reflection.",
  keywords: [
    "Iker López",
    "CAS portfolio",
    "IB Diploma Programme",
    "Creativity Activity Service",
  ],
  authors: [{ name: "Iker López" }],
  openGraph: {
    title: `${siteMeta.name} — ${siteMeta.title}`,
    description:
      "A considered record of creativity, activity, service and reflection.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: `${siteMeta.name} — ${siteMeta.title}`,
    description:
      "A considered record of creativity, activity, service and reflection.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SmoothScroll />
        <MotionSystem>
          <CustomCursor />
          {children}
        </MotionSystem>
      </body>
    </html>
  );
}
