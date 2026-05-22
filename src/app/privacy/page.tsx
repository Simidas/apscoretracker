export const metadata = {
  title: "Privacy Policy — AP Score Tracker",
  description: "Privacy Policy for AP Score Tracker. Learn how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-2">
          Privacy Policy
        </h1>
        <p className="text-text-secondary text-sm mb-12">Last updated: May 22, 2026</p>

        <div className="prose prose-invert max-w-none">
          <Section title="1. Introduction">
            <p>
              AP Score Tracker (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates apscoretracker.com. 
              This Privacy Policy explains how we handle information when you use our service.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>
              We do not collect personal information directly. All data you enter 
              (practice test scores, topic breakdowns) is stored locally in your browser 
              using localStorage. We do not have access to this data.
            </p>
          </Section>

          <Section title="3. Information We May Collect Automatically">
            <p>
              We do not currently run analytics scripts in the application. Our hosting provider
              and CDN provider (Cloudflare) may collect standard server logs, which can include
              IP address, browser type, requested URL, and request time.
            </p>
          </Section>

          <Section title="4. Third-Party Services">
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>
                <strong className="text-text-primary">Cloudflare Pages:</strong> Hosting provider. 
                May collect access logs.{" "}
                <a href="https://www.cloudflare.com/privacypolicy/" className="text-accent-teal hover:underline" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </li>
              <li>
                <strong className="text-text-primary">Cloudflare CDN:</strong> CDN and DNS provider. 
                May collect access logs.{" "}
                <a href="https://www.cloudflare.com/privacypolicy/" className="text-accent-teal hover:underline" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </li>
              <li>
                <strong className="text-text-primary">Namecheap:</strong> Domain registrar.{" "}
                <a href="https://www.namecheap.com/legal/general/privacy-policy/" className="text-accent-teal hover:underline" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </Section>

          <Section title="5. Data Retention">
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>Your practice test data: Stored in your browser&apos;s localStorage until you clear it.</li>
              <li>Server logs: Retained by Cloudflare per their policy (typically 30 days).</li>
            </ul>
          </Section>

          <Section title="6. Your Rights">
            <p className="text-text-secondary">
              You can clear all your data at any time by using the &quot;Clear All Data&quot; button 
              in the tracker or by clearing your browser&apos;s localStorage.
            </p>
            <p className="mt-3 text-text-secondary">
              <strong className="text-text-primary">GDPR Rights (EU/UK users):</strong>{" "}
              You have the right to access, rectify, erase, restrict processing, object to processing, 
              and data portability. Since we do not store personal data on our servers, most requests 
              can be fulfilled by clearing your browser data.
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
