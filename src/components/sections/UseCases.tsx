"use client";

const useCases = [
  {
    title: "The Multi-Subject Student",
    before:
      "You're taking AP Lang, AP Psych, and AP Calc. You've done 5 practice tests for each but have no idea if you're actually improving.",
    after: "You see a clear trend line for each subject. Lang is steadily climbing. Calc plateaued at 3 — time to drill derivatives.",
    bridge: "One dashboard, all subjects, zero setup.",
  },
  {
    title: "The Self-Studier",
    before:
      "You're self-studying AP Bio with no teacher to tell you if you're on track. You score a 3 and wonder: \"Is this good enough?\"",
    after: "You see that Cell Biology is strong (85%) but Ecology is weak (52%). You focus your remaining time on Ecology.",
    bridge: "Unit-level breakdown — no guesswork.",
  },
  {
    title: "The Pre-Exam Crunch",
    before:
      "It's two weeks before May exams. You've taken 8 practice tests scattered across notebooks and Google Docs. No idea what to prioritize.",
    after: "You see your weakest unit is \"Data Analysis\" across all 8 tests. You spend 30 minutes on that unit and jump half a point.",
    bridge: "All scores in one place. Heatmap shows what moves the needle.",
  },
];

export default function UseCases() {
  return (
    <section className="py-20 lg:py-28 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-sm text-accent-teal uppercase tracking-wider font-medium mb-3">
            Use Cases
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
            Built for how you actually study
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((uc, index) => (
            <div
              key={index}
              className={`bg-background border border-border rounded-card p-6 lg:p-8 border-l-[3px] border-l-accent-teal hover:border-accent-teal/30 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up-delay-${index}`}
            >
              <h3 className="font-display text-xl font-semibold text-text-primary mb-4">
                {uc.title}
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">
                    Before
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {uc.before}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-accent-teal uppercase tracking-wider mb-1">
                    After
                  </p>
                  <p className="text-text-primary text-sm leading-relaxed">
                    {uc.after}
                  </p>
                </div>

                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-text-secondary">
                    <span className="text-accent-amber">→</span> {uc.bridge}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
