import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-space-grotesk",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-dm-sans",
  weight: "100 900",
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Privacy-friendly analytics by Plausible */}
        <script
          async
          src="https://plausible.shipsolo.io/js/pa-yg4E5eio50Zngb0-xgVAr.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
              plausible.init()
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
