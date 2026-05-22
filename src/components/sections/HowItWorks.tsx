"use client";

import { BookOpen, PenLine, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose Your Subject",
    description:
      "Select from 5 subjects at launch — AP Lang, AP Psych, Calc AB, Bio, US History. More coming based on demand.",
    icon: BookOpen,
  },
  {
    number: "02",
    title: "Enter Your Scores",
    description:
      "Input your MCQ and FRQ raw scores from any practice test.",
    icon: PenLine,
  },
  {
    number: "03",
    title: "Track Your Progress",
    description:
      "View your improvement curve and topic heatmap instantly. Save unlimited records.",
    icon: TrendingUp,
  },
];

export default function HowItWorks() {
  return (
    <section id="subjects" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm text-accent-teal uppercase tracking-wider font-medium mb-3">
            How It Works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
            Three steps to clarity
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-border" />

          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-surface border border-border mb-6 relative z-10">
                <div className="text-center">
                  <step.icon size={24} className="text-accent-teal mx-auto mb-1" />
                  <span className="text-xs text-text-secondary">{step.number}</span>
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold text-text-primary mb-3">
                {step.title}
              </h3>
              <p className="text-text-secondary leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
