import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, BookOpen, TrendingUp, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "AP Lang Score Tracker & Calculator — Free Practice Test Tracker",
  description:
    "Free AP English Language score tracker. Calculate your AP Lang score from MCQ and FRQ, track progress across practice tests, and identify weak rhetorical areas. No signup required.",
  keywords: [
    "ap lang score tracker",
    "ap lang score calculator",
    "ap english language tracker",
    "ap lang practice test tracker",
    "track ap lang scores",
  ],
  openGraph: {
    title: "AP Lang Score Tracker — Track Every Practice Test",
    description:
      "Calculate and track your AP English Language scores across multiple practice tests. Spot weak topics and improve.",
    type: "website",
  },
};

export default function ApLangPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-teal/10 text-accent-teal text-sm mb-6">
            <BookOpen size={14} />
            AP English Language
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
            AP Lang Score Tracker
          </h1>
          <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Track your AP English Language practice test scores, visualize your progress,
            and identify which rhetorical areas need more study. Completely free — no account needed.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tracker">
              <Button size="lg" className="gap-2">
                Start Tracking AP Lang
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

      {/* How It Works for AP Lang */}
      <section className="py-20 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-text-primary text-center mb-12">
            How AP Lang Tracking Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen size={24} className="text-accent-teal" />,
                title: "Enter Your Scores",
                description:
                  "Input your MCQ (max 45) and FRQ (max 18) scores from any AP Lang practice test.",
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

      {/* Topics Covered */}
      <section className="py-20 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-text-primary text-center mb-8">
            AP Lang Topics We Track
          </h2>
          <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
            Break down your performance by rhetorical area to know exactly where to focus your study time.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Rhetorical Situation",
              "Claims & Evidence",
              "Reasoning & Organization",
              "Style",
              "Synthesis",
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
            AP Lang Score Breakdown
          </h2>
          <div className="bg-surface border border-border rounded-card p-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Section I: Multiple Choice</h3>
                <p className="text-text-secondary text-sm">
                  45 questions • 45% of total score
                </p>
                <p className="text-text-secondary text-sm mt-1">
                  Tests rhetorical analysis of prose passages.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Section II: Free Response</h3>
                <p className="text-text-secondary text-sm">
                  3 essays • 55% of total score
                </p>
                <p className="text-text-secondary text-sm mt-1">
                  Synthesis, rhetorical analysis, and argument essays.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-text-secondary">
                <strong className="text-text-primary">Scoring:</strong> Your MCQ and FRQ scores
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
            Ready to Track Your AP Lang Progress?
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
