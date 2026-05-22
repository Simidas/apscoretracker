import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Landmark, TrendingUp, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "AP US History Score Tracker & Calculator — Free Practice Test Tracker",
  description:
    "Free AP US History score tracker. Calculate your APUSH score from MCQ and FRQ, track progress across practice tests, and identify weak historical periods. No signup required.",
  keywords: [
    "ap us history score tracker",
    "apush score calculator",
    "ap us history tracker",
    "apush practice test tracker",
    "track apush scores",
  ],
  openGraph: {
    title: "AP US History Score Tracker — Track Every Practice Test",
    description:
      "Calculate and track your AP US History scores across multiple practice tests. Spot weak topics and improve.",
    type: "website",
  },
};

export default function ApUsHistoryPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-teal/10 text-accent-teal text-sm mb-6">
            <Landmark size={14} />
            AP US History
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
            AP US History Score Tracker
          </h1>
          <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Track your AP US History practice test scores, visualize your progress,
            and identify which historical periods need more study. Completely free — no account needed.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tracker">
              <Button size="lg" className="gap-2">
                Start Tracking APUSH
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="lg">
                Explore All Subjects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-text-primary text-center mb-12">
            How APUSH Tracking Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Landmark size={24} className="text-accent-teal" />,
                title: "Enter Your Scores",
                description:
                  "Input your MCQ (max 55) and FRQ (max 36) scores from any APUSH practice test.",
              },
              {
                icon: <TrendingUp size={24} className="text-accent-teal" />,
                title: "See Your AP Score",
                description:
                  "Get your estimated 1-5 AP score instantly based on official scoring curves.",
              },
              {
                icon: <BarChart3 size={24} className="text-accent-teal" />,
                title: "Track Over Time",
                description:
                  "Save each attempt and watch your progress curve improve across multiple tests.",
              },
            ].map((step, i) => (
              <div key={i} className="bg-surface border border-border rounded-card p-6">
                <div className="w-12 h-12 rounded-lg bg-accent-teal/10 flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="font-display font-semibold text-text-primary text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-20 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-text-primary text-center mb-8">
            APUSH Periods We Track
          </h2>
          <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
            Break down your performance by historical period to know exactly where to focus your study time.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Periods 1-2: 1491-1754",
              "Period 3: 1754-1800",
              "Period 4: 1800-1848",
              "Period 5: 1844-1877",
              "Periods 6-9: 1865-Present",
            ].map((topic) => (
              <div
                key={topic}
                className="flex items-center gap-3 bg-surface border border-border rounded-lg px-4 py-3"
              >
                <CheckCircle size={16} className="text-accent-teal shrink-0" />
                <span className="text-text-primary">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Score Breakdown */}
      <section className="py-20 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-text-primary text-center mb-8">
            APUSH Score Breakdown
          </h2>
          <div className="bg-surface border border-border rounded-card p-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Section I: Multiple Choice</h3>
                <p className="text-text-secondary text-sm">
                  55 questions • 40% of total score
                </p>
                <p className="text-text-secondary text-sm mt-1">
                  Stimulus-based questions across all periods.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Section II: Free Response</h3>
                <p className="text-text-secondary text-sm">
                  3 questions (SAQ + DBQ + LEQ) • 60% of total score
                </p>
                <p className="text-text-secondary text-sm mt-1">
                  Document-based and long essay questions.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-text-secondary">
                <strong className="text-text-primary">Scoring:</strong> Your MCQ (40%) and FRQ (60%) scores
                are weighted and converted to a 1-5 AP score. Use our tracker to see where you
                stand after each practice test.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-text-primary mb-4">
            Ready to Track Your APUSH Progress?
          </h2>
          <p className="text-text-secondary mb-8">
            Join thousands of students tracking their AP scores and improving their results.
          </p>
          <Link href="/tracker">
            <Button size="lg" className="gap-2">
              Start Tracking Free
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
