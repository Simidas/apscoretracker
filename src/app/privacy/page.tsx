export const metadata = {
  title: "Privacy Policy — AP Score Tracker",
  description: "Privacy Policy for AP Score Tracker. Learn how we handle your data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-2">
          Privacy Policy
        </h1>
        <p className="text-text-secondary text-sm mb-12">Last updated: August 6, 2026</p>

        <div className="prose prose-invert max-w-none">
          <Section title="1. Introduction">
            <p>
              AP Score Tracker (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates apscoretracker.com. 
              This Privacy Policy explains how we handle information when you use our service.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>
              When you create an account, we process your account identifier and
              email address. When you save tracker data, we store practice test
              scores, subject selections, target scores, topic breakdowns, notes,
              and related timestamps so the service can display and sync your
              progress.
            </p>
          </Section>

          <Section title="3. Information Collected Automatically">
            <p>
              We use privacy-focused Plausible analytics to understand aggregate
              site usage. Cloudflare may also process standard request information,
              such as IP address, browser type, requested URL, and request time,
              to operate and secure the service.
            </p>
          </Section>

          <Section title="4. Third-Party Services">
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>
                <strong className="text-text-primary">Clerk:</strong> Provides
                account registration, authentication, and session management.{" "}
                <a href="https://clerk.com/legal/privacy" className="text-accent-teal hover:underline" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </li>
              <li>
                <strong className="text-text-primary">Cloudflare Workers and D1:</strong>{" "}
                Hosts the application and stores signed-in tracker data. Cloudflare
                may also process security and access logs.{" "}
                <a href="https://www.cloudflare.com/privacypolicy/" className="text-accent-teal hover:underline" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </li>
              <li>
                <strong className="text-text-primary">Plausible:</strong> Provides
                aggregate website analytics.{" "}
                <a href="https://plausible.io/data-policy" className="text-accent-teal hover:underline" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </li>
              <li>
                <strong className="text-text-primary">Stripe:</strong> Billing
                integration is present but disabled while Pro is unavailable.
                If paid plans are enabled, Stripe will process payment and
                subscription information under its own privacy policy.
              </li>
            </ul>
          </Section>

          <Section title="5. Data Retention">
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>
                Account and tracker data is retained while needed to provide the
                service or until you request deletion.
              </li>
              <li>
                Deleted tracker records may remain temporarily in protected
                backups or soft-deleted storage before permanent removal.
              </li>
              <li>Infrastructure logs are retained according to provider policies.</li>
            </ul>
          </Section>

          <Section title="6. Your Rights">
            <p className="text-text-secondary">
              You can remove tracker records using the controls in the app,
              export your records as JSON or CSV, or permanently delete your
              account and saved data from the Account page. You may also contact
              us to request access, correction, or deletion assistance.
            </p>
            <p className="mt-3 text-text-secondary">
              <strong className="text-text-primary">GDPR Rights (EU/UK users):</strong>{" "}
              You may have rights to access, rectify, erase, restrict processing,
              object to processing, and data portability, subject to applicable law.
            </p>
            <p className="mt-3 text-text-secondary">
              <strong className="text-text-primary">CCPA Rights (California users):</strong>{" "}
              You have the right to know what personal information is collected, the right to delete 
              personal information, and the right to opt-out of the sale of personal information. 
              We do not sell personal information.
            </p>
          </Section>

          <Section title="7. Children&apos;s Privacy">
            <p className="text-text-secondary">
              Our service is designed for high school students (ages 14-18). We do not knowingly 
              collect data from children under 13. If you believe a child under 13 has used our 
              service, please contact us.
            </p>
          </Section>

          <Section title="8. Changes to This Policy">
            <p className="text-text-secondary">
              We may update this policy. Changes will be posted on this page with an updated date.
            </p>
          </Section>

          <Section title="9. Contact Us">
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
