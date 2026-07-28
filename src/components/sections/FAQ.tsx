"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is AP Score Tracker free?",
    answer:
      "Yes. You can estimate scores for free, and a Free account can save up to 10 practice tests per subject with charts, targets, and JSON export. A Pro plan with higher limits and advanced reports is planned.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "You can try the score estimator without an account. A free account is required to save practice tests, view history, and sync progress across devices.",
  },
  {
    question: "How accurate is the score prediction?",
    answer:
      "It is a rough estimate for progress tracking, based on public exam format information and simplified subject weights. Your official AP score may differ. Use it to compare practice tests over time, not as a guarantee.",
  },
  {
    question: "Which AP subjects are supported?",
    answer:
      "At launch: AP Lang, AP Psych, AP Calc AB, AP Bio, AP US History. More subjects added based on demand.",
  },
  {
    question: "Is my data private?",
    answer:
      "Your account is handled by Clerk and your saved tracker data is stored in Cloudflare D1. Access is tied to your signed-in user ID, and we do not sell your personal information. See the Privacy Policy for details.",
  },
  {
    question: "Is this an official College Board tool?",
    answer:
      "No. AP Score Tracker is an independent tool built by a student developer. \"AP\" is a registered trademark of College Board. We are not affiliated with, endorsed by, or approved by College Board.",
  },
];

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
