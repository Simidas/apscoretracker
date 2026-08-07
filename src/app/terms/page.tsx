export const metadata = {
  title: "Terms of Service — AP Score Tracker",
  description: "Terms of Service for AP Score Tracker.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-2">
          Terms of Service
        </h1>
        <p className="text-text-secondary text-sm mb-12">Last updated: August 6, 2026</p>

        <div className="prose prose-invert max-w-none">
          <Section title="1. Acceptance of Terms">
            <p>
              By using AP Score Tracker, you agree to these Terms. If you do not agree, please do not use the service.
            </p>
          </Section>

          <Section title="2. Service Description">
            <p>
              AP Score Tracker is an online tool that estimates AP practice scores
              and helps students track progress. Score calculations are estimates;
              signed-in users can save and sync tracker data through our cloud service.
            </p>
          </Section>

          <Section title="3. Accounts and Free Usage">
            <p>
              You may use the score estimator without an account. Registration is
              required to save records, view history, and sync progress. You are
              responsible for activity under your account and for providing
              accurate account information. Free-plan limits may apply and can
              change as the service evolves.
            </p>
          </Section>

          <Section title="4. Disclaimer">
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>AP Score Tracker is not affiliated with, endorsed by, or approved by College Board.</li>
              <li>Score estimates use simplified subject weights and may not reflect your official AP score.</li>
              <li>We do not guarantee any specific score improvement.</li>
              <li>AP is a registered trademark of College Board.</li>
            </ul>
          </Section>

          <Section title="5. Account deletion">
            <p>
              You may permanently delete your account from the Account page.
              Deletion removes saved tracker records and targets and cannot be
              undone. Limited backup or security records may remain temporarily
              where required to operate or protect the service.
            </p>
          </Section>

          <Section title="6. Intellectual Property">
            <p>
              The scoring curves and exam formats are based on publicly available information. Our code and interface are our property.
            </p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>
              We provide this tool &quot;as is&quot; without warranties. We are not liable for any decisions you make based on the tool&apos;s output.
            </p>
          </Section>

          <Section title="8. Acceptable Use">
            <p>
              You may not misuse the service, attempt unauthorized access,
              interfere with its operation, automate abusive traffic, or use it
              in violation of applicable law. We may restrict access when needed
              to protect users or the service.
            </p>
          </Section>

          <Section title="9. Changes to Terms">
            <p>
              We may update these terms. Continued use constitutes acceptance of the updated terms.
            </p>
          </Section>

          <Section title="10. Governing Law">
            <p>
              These Terms are governed by the laws of the State of California, United States, without regard to its conflict of law principles. Any disputes shall first be attempted to be resolved informally by contacting us at{" "}
              <a href="mailto:weldonz2026@gmail.com" className="text-accent-teal hover:underline">
                weldonz2026@gmail.com
              </a>
              . If informal resolution fails, disputes shall be resolved through binding arbitration conducted remotely via video conference.
            </p>
          </Section>

          <Section title="11. Contact">
            <p className="text-text-secondary">
              Email:{" "}
              <a href="mailto:weldonz2026@gmail.com" className="text-accent-teal hover:underline">
                weldonz2026@gmail.com
              </a>
            </p>
            <p className="mt-1 text-text-secondary">Operator: Weldon (Individual Developer)</p>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-display text-xl font-semibold text-text-primary mb-4">{title}</h2>
      {children}
    </section>
  );
}
