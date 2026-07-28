import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Iker López — CAS Portfolio",
  description:
    "Iker López’s IB Creativity, Activity and Service portfolio, documenting experiences, reflection and personal development.",
  keywords: [
    "Iker López",
    "CAS portfolio",
    "IB Diploma Programme",
    "Creativity Activity Service",
  ],
  authors: [{ name: "Iker López" }],
  openGraph: {
    title: "Iker López — CAS Portfolio",
    description:
      "A considered record of creativity, activity, service and reflection.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Iker López — CAS Portfolio",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
