"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

const clerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export function AuthControls() {
  if (!clerkConfigured) {
    return (
      <Button size="sm" onClick={() => (window.location.href = "/tracker")}>
        Start Tracking — Free
      </Button>
    );
  }

  return <ConfiguredAuthControls />;
}

function ConfiguredAuthControls() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <Button size="sm" variant="secondary" disabled>
        Loading
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {!isSignedIn && (
        <SignInButton mode="modal">
          <Button size="sm">Sign In</Button>
        </SignInButton>
      )}
      {isSignedIn && (
        <>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => (window.location.href = "/tracker")}
        >
          Tracker
        </Button>
        <UserButton />
        </>
      )}
    </div>
  );
}
