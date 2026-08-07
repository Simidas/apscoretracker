import { SignUp } from "@clerk/nextjs";

import { isClerkConfigured } from "@/components/auth/ClerkAppProvider";

export const metadata = {
  title: "Sign up — AP Score Tracker",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  if (!isClerkConfigured()) {
    return <AuthConfigurationNotice />;
  }

  return (
    <main className="min-h-screen bg-background px-4 py-24 text-text-primary">
      <div className="mx-auto flex max-w-md justify-center">
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </div>
    </main>
  );
}

function AuthConfigurationNotice() {
  return (
    <main className="min-h-screen bg-background px-4 py-24 text-text-primary">
      <div className="mx-auto max-w-xl rounded-lg border border-border bg-surface p-6">
        <h1 className="font-display text-2xl font-semibold">
          Clerk is not configured yet
        </h1>
        <p className="mt-3 text-text-secondary">
          Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY to enable
          sign up during V2 development.
        </p>
      </div>
    </main>
  );
}
