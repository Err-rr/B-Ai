"use client";

import { TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="bg-paper flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="bg-danger-bg text-danger inline-flex size-11 items-center justify-center rounded-xl">
        <TriangleAlert className="size-5" aria-hidden="true" />
      </span>
      <h1 className="font-display text-ink text-5xl font-normal">
        Something went wrong
      </h1>
      <p className="text-ink-2 max-w-sm text-sm">
        That&rsquo;s on us, not you. Try again - if it keeps happening, come
        back later.
      </p>
      <Button onClick={reset} className="mt-2">
        Try again
      </Button>
    </main>
  );
}
