"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text */}
          <div className="max-w-xl animate-fade-in-up">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
              Track Your AP Progress Across Every Practice Test
            </h1>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed">
              See your score trends, spot weak topics, and know exactly what to
              study next. No signup, no login — your data stays in your browser.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">
                Start Tracking Free — No Signup Needed
                <ArrowRight size={18} />
              </Button>
              <Button variant="ghost" size="lg" className="cursor-pointer">
                <a href="#how-it-works" className="no-underline text-inherit">See How It Works</a>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-accent-teal" />
                Free forever
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-accent-teal" />
                No account required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-accent-teal" />
                Works on mobile
              </span>
            </div>
          </div>

          {/* Right: Dashboard Preview */}
          <div className="relative animate-fade-in-up-delay-1">
            <div className="bg-surface border border-border rounded-card p-6 shadow-2xl">
              {/* Chart Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-text-secondary uppercase tracking-wider">
                    AP Lang — Predicted Score
                  </p>
                  <p className="text-2xl font-display font-bold text-text-primary">
                    3.8{" "}
                    <span className="text-sm font-normal text-accent-teal">
                      +0.6
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-accent-teal/10 text-accent-teal text-xs rounded-tag">
                    Test 5
                  </span>
                </div>
              </div>

              {/* Simple SVG Chart */}
              <svg viewBox="0 0 400 180" className="w-full">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={30 + i * 30}
                    x2="400"
                    y2={30 + i * 30}
                    stroke="#1E1E28"
                    strokeWidth="1"
                  />
                ))}
                {/* Area fill */}
                <path
                  d="M0,150 L80,135 L160,120 L240,100 L320,75 L400,60 L400,180 L0,180 Z"
                  fill="rgba(0,229,204,0.1)"
                />
                {/* Line */}
                <path
                  d="M0,150 L80,135 L160,120 L240,100 L320,75 L400,60"
                  fill="none"
                  stroke="#00E5CC"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Dots */}
                {[
                  [0, 150],
                  [80, 135],
                  [160, 120],
                  [240, 100],
                  [320, 75],
                  [400, 60],
                ].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="5" fill="#00E5CC" />
                ))}
              </svg>

              {/* Heatmap Preview */}
              <div className="mt-4">
                <p className="text-xs text-text-secondary mb-2">
                  Topic Accuracy
                </p>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 14 }).map((_, i) => {
                    const intensity =
                      i < 3
                        ? "bg-accent-teal/20"
                        : i < 7
                        ? "bg-accent-teal/50"
                        : i < 10
                        ? "bg-accent-teal/80"
                        : "bg-accent-teal";
                    return (
                      <div
                        key={i}
                        className={`h-6 rounded-tag ${intensity}`}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between mt-1 text-xs text-text-secondary">
                  <span>Weak</span>
                  <span>Strong</span>
                </div>
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent-teal/5 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
