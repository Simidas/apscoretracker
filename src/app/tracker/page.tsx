import TrackerApp from "@/components/sections/TrackerApp";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

export const metadata = {
  title: "Tracker — AP Score Tracker",
  description:
    "Enter AP practice test scores, save attempts locally, and track progress by subject.",
};

export default function TrackerPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <svg
                width="28"
                height="28"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 48 L24 32 L36 40 L56 16"
                  stroke="#00E5CC"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M52 16 L56 16 L56 20"
                  stroke="#00E5CC"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-display font-semibold text-text-primary text-lg">
                AP Score Tracker
              </span>
            </Link>
            <Link
              href="/"
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>
      <TrackerApp />
      <Footer />
    </main>
  );
}
