"use client";

import { TrendingUp, Grid3x3, Zap, Download } from "lucide-react";

const features = [
  {
    title: "Progress Curve",
    description:
      "Line chart showing your predicted AP score across every practice test. Know at a glance if you're on track for a 5.",
    icon: TrendingUp,
    size: "large",
  },
  {
    title: "Topic Heatmap",
    description:
      "Color-coded grid showing accuracy for each unit. Stop wasting time on chapters you've already mastered.",
    icon: Grid3x3,
    size: "large",
  },
  {
    title: "Zero Setup",
    description: "No account. No password. Open and start tracking immediately.",
    icon: Zap,
    size: "small",
  },
  {
    title: "JSON Export",
    description: "Download your records anytime. Your data is portable.",
    icon: Download,
    size: "small",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm text-accent-teal uppercase tracking-wider font-medium mb-3">
            Features
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
            Everything you need to track your progress
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-surface border border-border rounded-card p-6 lg:p-8 hover:border-accent-teal/30 transition-all duration-300 hover:-translate-y-1 ${
                feature.size === "large" ? "md:col-span-1" : ""
              } animate-fade-in-up-delay-${index}`}
            >
              <div className="w-12 h-12 rounded-button bg-accent-teal/10 flex items-center justify-center mb-4">
                <feature.icon size={24} className="text-accent-teal" />
              </div>
              <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
