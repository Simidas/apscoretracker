import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, TrendingUp, Lightbulb, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Track AP Exam Progress Effectively — AP Score Tracker Blog",
  description:
    "Learn the best methods to track your AP exam progress across practice tests. Discover how to identify weak areas, visualize improvement, and optimize your study plan.",
  keywords: [
    "how to track ap exam progress",
    "ap practice test tracking",
    "ap score improvement",
    "ap exam study plan",
    "track ap scores",
  ],
  openGraph: {
    title: "How to Track AP Exam Progress Effectively",
    description:
      "Learn proven methods to track your AP exam progress and improve your scores.",
    type: "article",
  },
};

export default function HowToTrackApProgressPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-teal/10 text-accent-teal text-sm mb-6">
            <BookOpen size={14} />
            Study Guide
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-text-primary leading-tight">
            How to Track AP Exam Progress Effectively
          </h1>
          <p className="mt-6 text-lg text-text-secondary leading-relaxed">
            A practical guide to tracking your AP practice test scores, identifying weak areas,
            and building a data-driven study plan that actually works.
          </p>
          <div className="mt-4 text-sm text-text-secondary">
            Published May 2026 • 5 min read
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="pb-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          {/* Intro */}
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            Most AP students take practice tests but never systematically track their results.
            They remember their last score, maybe compare it to the one before, but miss the bigger
            picture. This guide shows you how to track your AP progress like a pro.
          </p>

          {/* Section 1 */}
          <h2 className="font-display text-2xl font-bold text-text-primary mt-12 mb-4">
            Why Tracking Matters
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Without tracking, you are flying blind. You might feel like you are studying hard
            but have no idea if you are actually improving. Tracking reveals:
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Whether your study methods are actually working",
              "Which topics consistently cause problems",
              "If you are plateauing and need to change strategy",
              "How close you are to your target score",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-accent-teal shrink-0 mt-0.5" />
                <span className="text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>

          {/* Section 2 */}
          <h2 className="font-display text-2xl font-bold text-text-primary mt-12 mb-4">
            The 3-Step Tracking Method
          </h2>

          <div className="bg-surface border border-border rounded-card p-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-accent-teal/10 flex items-center justify-center text-accent-teal font-bold text-sm">
                1
              </div>
              <h3 className="font-semibold text-text-primary">Take the Test Under Real Conditions</h3>
            </div>
            <p className="text-text-secondary pl-11">
              Time yourself strictly. No phone, no notes, no breaks except the scheduled ones.
              The score only matters if the conditions match the real exam.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-card p-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-accent-teal/10 flex items-center justify-center text-accent-teal font-bold text-sm">
                2
              </div>
              <h3 className="font-semibold text-text-primary">Record Section Scores, Not Just Total</h3>
            </div>
            <p className="text-text-secondary pl-11">
              Break down your MCQ and FRQ scores separately. If your MCQ is strong but FRQ is weak,
              you know exactly where to focus. Use our{" "}
              <Link href="/tracker" className="text-accent-teal hover:underline">
                AP Score Tracker
              </Link>{" "}
              to save both scores automatically.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-card p-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-accent-teal/10 flex items-center justify-center text-accent-teal font-bold text-sm">
                3
              </div>
              <h3 className="font-semibold text-text-primary">Review by Topic, Not by Question</h3>
            </div>
            <p className="text-text-secondary pl-11">
              Group missed questions by topic area. If you missed 3 out of 5 questions on
              derivatives, that is a pattern. One missed question on limits might just be a careless error.
            </p>
          </div>

          {/* Section 3 */}
          <h2 className="font-display text-2xl font-bold text-text-primary mt-12 mb-4">
            What to Track for Each Practice Test
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-text-primary font-semibold">Metric</th>
                  <th className="text-left py-3 px-4 text-text-primary font-semibold">Why It Matters</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Date", "Shows your timeline and study frequency"],
                  ["MCQ Score", "Measures content knowledge breadth"],
                  ["FRQ Score", "Measures application and writing skills"],
                  ["Total AP Score", "Your estimated 1-5 score"],
                  ["Topic Breakdown", "Identifies specific weak areas"],
                  ["Time Spent", "Reveals pacing issues"],
                ].map(([metric, why], i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-3 px-4 text-text-primary font-medium">{metric}</td>
                    <td className="py-3 px-4 text-text-secondary">{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 4 */}
          <h2 className="font-display text-2xl font-bold text-text-primary mt-12 mb-4">
            Using Progress Curves to Guide Study
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            A progress curve shows your AP score over time. Here is how to read it:
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Upward trend: Your study plan is working. Keep doing what you are doing.",
              "Flat line: You have plateaued. Change your study method or focus area.",
              "Downward trend: Burnout or wrong focus. Take a break or reassess your weak areas.",
              "Volatile: Inconsistent performance. Work on test-taking strategy and time management.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <TrendingUp size={18} className="text-accent-teal shrink-0 mt-0.5" />
                <span className="text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>

          {/* Section 5 */}
          <h2 className="font-display text-2xl font-bold text-text-primary mt-12 mb-4">
            Common Tracking Mistakes to Avoid
          </h2>
          <div className="space-y-4 mb-8">
            {[
              {
                mistake: "Only tracking total scores",
                fix: "Always break down MCQ vs FRQ. A student with MCQ 80% and FRQ 40% needs a completely different strategy than one with MCQ 50% and FRQ 70%.",
              },
              {
                mistake: "Comparing scores from different difficulty tests",
                fix: "Note the test source (official, Barron's, Princeton Review). Harder tests will naturally produce lower scores.",
              },
              {
                mistake: "Not tracking topic breakdowns",
                fix: "Use our tracker to input scores by topic. You will quickly see if derivatives are your weak spot, not calculus overall.",
              },
              {
                mistake: "Giving up after one bad test",
                fix: "One data point is not a trend. Track at least 3-4 tests before changing your strategy.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Lightbulb size={16} className="text-accent-teal shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-text-primary text-sm">{item.mistake}</p>
                    <p className="text-text-secondary text-sm mt-1">{item.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <h2 className="font-display text-2xl font-bold text-text-primary mt-12 mb-4">
            Start Tracking Today
          </h2>
          <p className="text-text-secondary leading-relaxed mb-8">
            The best time to start tracking your AP progress was after your first practice test.
            The second best time is now. Use our free{" "}
            <Link href="/tracker" className="text-accent-teal hover:underline">
              AP Score Tracker
            </Link>{" "}
            to save your scores, visualize your progress, and identify exactly what to study next.
            No signup required — your data stays in your browser.
          </p>

          {/* CTA */}
          <div className="bg-surface border border-border rounded-card p-8 text-center">
            <h3 className="font-display text-xl font-bold text-text-primary mb-3">
              Ready to Track Your AP Progress?
            </h3>
            <p className="text-text-secondary mb-6">
              Start using our free tracker today and see your improvement over time.
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
