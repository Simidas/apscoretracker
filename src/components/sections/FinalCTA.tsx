"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, CreditCard, UserX } from "lucide-react";

export default function FinalCTA() {
  const openTracker = () => {
    window.location.href = "/tracker";
  };

  return (
    <section className="py-20 lg:py-28 bg-surface/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
        <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
          You&apos;ve got practice tests piling up. You know you should track them,
          but spreadsheets are clunky and calculator sites forget your scores the
          moment you close the tab.
        </p>
        <p className="mt-4 text-text-primary text-lg leading-relaxed max-w-2xl mx-auto">
          <span className="text-accent-teal font-medium">
            AP Score Tracker fixes that.
          </span>{" "}
          Choose your subject, enter your scores, and watch your progress curve
          grow.          In 30 seconds, you&apos;ll know exactly where you stand — and what to
          study next.
        </p>

        <div className="mt-10">
          <Button size="lg" className="gap-2" onClick={openTracker}>
            Track My First Practice Test — Free
            <ArrowRight size={18} />
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-text-secondary">
          <span className="flex items-center gap-1.5">
            <UserX size={14} className="text-accent-teal" />
            No signup
          </span>
          <span className="flex items-center gap-1.5">
            <CreditCard size={14} className="text-accent-teal" />
            No credit card
          </span>
          <span className="flex items-center gap-1.5">
            <Shield size={14} className="text-accent-teal" />
            Your data stays private
          </span>
        </div>
      </div>
    </section>
  );
}
