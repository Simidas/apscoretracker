"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AccountActions() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function deleteAccount() {
    const confirmed = window.confirm(
      "Permanently delete your account and all saved AP tracker data? This cannot be undone."
    );
    if (!confirmed) return;

    setIsDeleting(true);
    setError("");

    try {
      const response = await fetch("/api/account", { method: "DELETE" });
      const payload = (await response.json().catch(() => ({}))) as {
        error?: { message?: string };
      };

      if (!response.ok) {
        throw new Error(
          payload.error?.message ?? "Unable to delete your account."
        );
      }

      window.location.href = "/";
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete your account."
      );
      setIsDeleting(false);
    }
  }

  return (
    <section className="rounded-lg border border-destructive/40 bg-surface p-6">
      <h2 className="font-display text-xl font-semibold">Delete account</h2>
      <p className="mt-3 max-w-2xl text-sm text-text-secondary">
        Permanently removes your account, saved practice records, targets, and
        any Stripe customer record associated with the account.
      </p>
      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
      <Button
        variant="destructive"
        className="mt-5 gap-2"
        onClick={deleteAccount}
        disabled={isDeleting}
      >
        <Trash2 size={16} />
        {isDeleting ? "Deleting..." : "Permanently delete account"}
      </Button>
    </section>
  );
}
