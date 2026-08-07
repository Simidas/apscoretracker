import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkAppProvider } from "@/components/auth/ClerkAppProvider";
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
  metadataBase: new URL("https://apscoretracker.com"),
  title: "AP Score Tracker — Track Your Practice Test Progress Free",
  description:
    "Free AP score tracker that visualizes progress across practice tests. Estimate instantly, then sign in to securely sync trends, targets, and weak topics.",
  openGraph: {
    title: "Track Your AP Progress Across Every Practice Test",
    description:
      "Estimate AP scores for free and securely sync your saved practice history across devices.",
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
      <body className="antialiased">
        <ClerkAppProvider>{children}</ClerkAppProvider>
      </body>
    </html>
  );
}
