import Link from "next/link";
import { getCurrentUserRow } from "@/lib/v2/auth";
import { getPlanLimits, getTierFromStatus } from "@/lib/v2/limits";
import { getUsageSummary } from "@/lib/v2/records";

export default async function AccountPage() {
  const user = await getCurrentUserRow();

  if (!user) {
    return (
      <main className="min-h-screen bg-background px-4 py-24 text-text-primary">
        <div className="mx-auto max-w-3xl rounded-lg border border-border bg-surface p-6">
          <h1 className="font-display text-2xl font-semibold">
            Finish account setup
          </h1>
          <p className="mt-3 text-text-secondary">
            Sign out and sign back in once D1 is configured so we can create
            your cloud profile.
          </p>
        </div>
      </main>
    );
  }

  const effectiveTier = getTierFromStatus(
    user.subscription_tier,
    user.subscription_status
  );
  const limits = getPlanLimits(effectiveTier);
  const usage = await getUsageSummary(user.id);

  return (
    <main className="min-h-screen bg-background px-4 py-24 text-text-primary">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <Link
            href="/tracker"
            className="text-sm text-accent hover:text-accent-hover"
          >
            Back to tracker
          </Link>
          <h1 className="mt-4 font-display text-4xl font-semibold">
            Account
          </h1>
        </div>

        <section className="rounded-lg border border-border bg-surface p-6">
          <h2 className="font-display text-xl font-semibold">Subscription</h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <AccountItem label="Email" value={user.email} />
            <AccountItem label="Plan" value={effectiveTier.toUpperCase()} />
            <AccountItem label="Status" value={user.subscription_status} />
            <AccountItem
              label="Period End"
              value={user.current_period_end ?? "Not set"}
            />
          </dl>
        </section>

        <section className="rounded-lg border border-border bg-surface p-6">
          <h2 className="font-display text-xl font-semibold">Usage</h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-3">
            <AccountItem
              label="Subjects Used"
              value={`${usage.subjectsUsed}${
                limits.subjects ? ` / ${limits.subjects}` : ""
              }`}
            />
            <AccountItem label="Total Records" value={`${usage.recordsTotal}`} />
            <AccountItem
              label="Records Per Subject"
              value={
                limits.recordsPerSubject
                  ? `${limits.recordsPerSubject}`
                  : "Unlimited"
              }
            />
          </dl>
        </section>
      </div>
    </main>
  );
}

function AccountItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm text-text-secondary">{label}</dt>
      <dd className="mt-1 font-display text-lg font-semibold">{value}</dd>
    </div>
  );
}
