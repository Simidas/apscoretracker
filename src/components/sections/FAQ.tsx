"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/site-content";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-sm text-accent-teal uppercase tracking-wider font-medium mb-3">
            FAQ
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
            Questions? Answered.
          </h2>
        </div>

        <div className="space-y-3 animate-fade-in-up-delay-1">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-card overflow-hidden transition-colors ${
                openIndex === index
                  ? "border-accent-amber bg-surface"
                  : "border-border bg-surface/30"
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <span className="font-display font-medium text-text-primary pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-text-secondary shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 border-l-2 border-accent-amber ml-5">
                  <p className="text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
