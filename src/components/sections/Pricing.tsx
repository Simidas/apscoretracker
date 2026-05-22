"use client";

import { Button } from "@/components/ui/button";
import { Check, Clock } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Every AP student who wants to track their progress",
    features: [
      "Unlimited score tracking",
      "Progress curve visualization",
      "Topic heatmap breakdown",
      "JSON export/backup",
      "5 subjects at launch",
      "Mobile-friendly design",
    ],
    cta: "Start Tracking Free",
    ctaVariant: "primary" as const,
    badge: null,
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$4.99",
    period: "/month",
    description: "Heavy users who want advanced features",
    features: [
      "Everything in Free",
      "PDF progress reports",
      "Target score goal tracker",
      "Personalized study plan",
      "Print-friendly layouts",
      "Priority support",
    ],
    cta: "Join Waitlist",
    ctaVariant: "secondary" as const,
    badge: "Coming Soon",
    highlighted: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-sm text-accent-teal uppercase tracking-wider font-medium mb-3">
            Pricing
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
            Free now. Pro when you need it.
          </h2>
          <p className="mt-4 text-text-secondary max-w-lg mx-auto">
            The core tracker is free forever. Pro features unlock after we validate the basics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-background border rounded-card p-8 relative transition-all duration-300 hover:-translate-y-1 ${
                plan.highlighted
                  ? "border-accent-amber shadow-lg shadow-accent-amber/10"
                  : "border-border hover:border-accent-teal/30"
              } animate-fade-in-up-delay-${index}`}
            >
              {plan.badge && (
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-accent-amber/10 text-accent-amber text-xs font-medium rounded-tag">
                    <Clock size={12} />
                    {plan.badge}
                  </span>
                </div>
              )}

              <h3 className="font-display text-xl font-semibold text-text-primary">
                {plan.name}
              </h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-text-primary">
                  {plan.price}
                </span>
                <span className="text-text-secondary">{plan.period}</span>
              </div>
              <p className="mt-2 text-sm text-text-secondary">
                {plan.description}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check
                      size={16}
                      className="text-accent-teal mt-0.5 shrink-0"
                    />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  variant={plan.ctaVariant}
                  className="w-full"
                  disabled={plan.highlighted}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-sm text-text-secondary">
          No credit card • No trial period • No ads
        </p>
      </div>
    </section>
  );
}
