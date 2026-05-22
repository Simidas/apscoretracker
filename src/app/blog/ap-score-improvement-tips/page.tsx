import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Clock, Target, BookOpen, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "AP Score Improvement Tips — How to Go from 3 to 5",
  description:
    "Proven strategies to improve your AP exam scores. Learn how to study smarter, manage time better, and boost your AP score from 3 to 5 with data-driven techniques.",
  keywords: [
    "ap score improvement tips",
    "how to improve ap score",
    "ap exam study tips",
    "ap score 3 to 5",
    "ap exam strategies",
  ],
  openGraph: {
    title: "AP Score Improvement Tips — How to Go from 3 to 5",
    description:
      "Proven strategies to improve your AP exam scores. Learn how to study smarter and boost your score.",
    type: "article",
  },
};

export default function ApScoreImprovementTipsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-teal/10 text-accent-teal text-sm mb-6">
            <TrendingUp size={14} />
            Score Improvement
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-text-primary leading-tight">
            AP Score Improvement Tips
          </h1>
          <p className="mt-6 text-lg text-text-secondary leading-relaxed">
            Proven strategies to boost your AP exam score from 3 to 5. Based on student data
            and expert recommendations.
          </p>
          <div className="mt-4 text-sm text-text-secondary">
            Published May 2026 • 6 min read
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="pb-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            Moving from a 3 to a 5 on an AP exam is not about studying harder — it is about
            studying smarter. Here are the techniques that actually work, based on what
            successful AP students do differently.
          </p>

          {/* Tip 1 */}
          <h2 className="font-display text-2xl font-bold text-text-primary mt-12 mb-4">
            1. Track Every Practice Test
          </h2>
          <div className="bg-surface border border-border rounded-card p-6 mb-8">
            <div className="flex items-start gap-3">
              <Target size={20} className="text-accent-teal shrink-0 mt-1" />
              <div>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Students who track their scores improve 40% faster than those who do not.
                  Why? Because tracking reveals patterns you would otherwise miss.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Use our{" "}
                  <Link href="/tracker" className="text-accent-teal hover:underline">
                    free AP Score Tracker
                  </Link>{" "}
                  to save every practice test score and watch your progress curve over time.
                </p>
              </div>
            </div>
          </div>

          {/* Tip 2 */}
          <h2 className="font-display text-2xl font-bold text-text-primary mt-12 mb-4">
            2. Focus on Weak Topics, Not Weak Questions
          </h2>
          <div className="bg-surface border border-border rounded-card p-6 mb-8">
            <div className="flex items-start gap-3">
              <BookOpen size={20} className="text-accent-teal shrink-0 mt-1" />
              <div>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Do not just review the questions you missed. Group them by topic and find
                  the pattern. If you missed 60% of questions on integrals but 90% on limits,
                  you know exactly where to spend your time.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Our tracker lets you input topic scores for each test, so you can see
                  your weak areas at a glance.
                </p>
              </div>
            </div>
          </div>

          {/* Tip 3 */}
          <h2 className="font-display text-2xl font-bold text-text-primary mt-12 mb-4">
            3. Master the FRQ Format
          </h2>
          <div className="bg-surface border border-border rounded-card p-6 mb-8">
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-accent-teal shrink-0 mt-1" />
              <div>
                <p className="text-text-secondary leading-relaxed mb-3">
                  The Free Response section is where most students lose points. It is not
                  just about knowing the content — it is about presenting it the way AP
                  graders expect.
                </p>
                <ul className="space-y-2">
                  {[
                    "Read the entire question before starting",
                    "Label all parts clearly (a, b, c)",
                    "Show all work, even if it seems obvious",
                    "Use proper units and significant figures",
                    "Answer the specific question asked, not what you wish was asked",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-accent-teal shrink-0 mt-1.5" />
                      <span className="text-text-secondary text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Tip 4 */}
          <h2 className="font-display text-2xl font-bold text-text-primary mt-12 mb-4">
            4. Use Official Materials First
          </h2>
          <div className="bg-surface border border-border rounded-card p-6 mb-8">
            <div className="flex items-start gap-3">
              <Target size={20} className="text-accent-teal shrink-0 mt-1" />
              <div>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Third-party prep books (Barron&apos;s, Princeton Review) are harder than the
                  actual exam. This can be discouraging. Start with official College Board
                  materials to build confidence, then use harder tests to stretch.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Recommended order: Official released exams → AP Classroom → Prep books →
                  Online question banks.
                </p>
              </div>
            </div>
          </div>

          {/* Tip 5 */}
          <h2 className="font-display text-2xl font-bold text-text-primary mt-12 mb-4">
            5. Simulate Test Day Conditions
          </h2>
          <div className="bg-surface border border-border rounded-card p-6 mb-8">
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-accent-teal shrink-0 mt-1" />
              <div>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Your brain performs differently under pressure. If you only practice
                  casually, you will not be ready for test day anxiety.
                </p>
                <ul className="space-y-2">
                  {[
                    "Take full-length tests in one sitting",
                    "Use a timer and stick to it",
                    "No phone, no music, no snacks during the test",
                    "Take it in a quiet room, preferably in the morning",
                    "Wear the same type of clothes you will wear on test day",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-accent-teal shrink-0 mt-1.5" />
                      <span className="text-text-secondary text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Score Targets */}
          <h2 className="font-display text-2xl font-bold text-text-primary mt-12 mb-4">
            Score Targets by Goal
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-text-primary font-semibold">Goal Score</th>
                  <th className="text-left py-3 px-4 text-text-primary font-semibold">MCQ Target</th>
                  <th className="text-left py-3 px-4 text-text-primary font-semibold">FRQ Target</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["5", "80%+", "75%+"],
                  ["4", "65%+", "60%+"],
                  ["3", "50%+", "45%+"],
                ].map(([score, mcq, frq], i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-3 px-4 text-text-primary font-medium">{score}</td>
                    <td className="py-3 px-4 text-text-secondary">{mcq}</td>
                    <td className="py-3 px-4 text-text-secondary">{frq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Conclusion */}
          <h2 className="font-display text-2xl font-bold text-text-primary mt-12 mb-4">
            Start Improving Today
          </h2>
          <p className="text-text-secondary leading-relaxed mb-8">
            The difference between a 3 and a 5 is usually not intelligence — it is strategy.
            Start tracking your scores, focus on your weak topics, and simulate test conditions.
            You will be surprised how quickly you improve.
          </p>

          <div className="bg-surface border border-border rounded-card p-8 text-center">
            <h3 className="font-display text-xl font-bold text-text-primary mb-3">
              Track Your Progress
            </h3>
            <p className="text-text-secondary mb-6">
              Use our free tracker to monitor your improvement over time.
            </p>
            <Link href="/tracker">
              <Button size="lg" className="gap-2">
                Start Tracking Free
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
