"use client";

import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

const clerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

type AuthControlsProps = {
  mobile?: boolean;
  onAction?: () => void;
};

export function AuthControls({
  mobile = false,
  onAction,
}: AuthControlsProps) {
  if (!clerkConfigured) {
    return (
      <Button
        size="sm"
        className={mobile ? "w-full" : undefined}
        onClick={() => {
          onAction?.();
          window.location.href = "/tracker";
        }}
      >
        Start Tracking — Free
      </Button>
    );
  }

  return <ConfiguredAuthControls mobile={mobile} onAction={onAction} />;
}

function ConfiguredAuthControls({ mobile, onAction }: AuthControlsProps) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <Button
        size="sm"
        variant="secondary"
        className={mobile ? "w-full" : undefined}
        disabled
      >
        Loading
      </Button>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${mobile ? "w-full" : ""}`}>
      {!isSignedIn && (
        <>
          <SignInButton mode="modal">
            <Button
              size="sm"
              variant="secondary"
              className={mobile ? "flex-1" : undefined}
              onClick={onAction}
            >
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button
              size="sm"
              className={mobile ? "flex-1" : undefined}
              onClick={onAction}
            >
              Sign Up
            </Button>
          </SignUpButton>
        </>
      )}
      {isSignedIn && (
        <>
          <Button
            size="sm"
            variant="secondary"
            className={mobile ? "flex-1" : undefined}
            onClick={() => {
              onAction?.();
              window.location.href = "/tracker";
            }}
          >
            Tracker
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className={mobile ? "flex-1" : undefined}
            onClick={() => {
              onAction?.();
              window.location.href = "/account";
            }}
          >
            Account
          </Button>
          <UserButton />
        </>
      )}
    </div>
  );
}
