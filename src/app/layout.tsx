import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AP Score Tracker — Track Your Practice Test Progress Free",
  description:
    "Free AP score tracker that visualizes your progress across multiple practice tests. See trends, spot weak topics, and know what to study next. No signup required.",
  openGraph: {
    title: "Track Your AP Progress Across Every Practice Test",
    description:
      "Free tool that saves your practice test scores and shows your improvement curve. No account needed.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
