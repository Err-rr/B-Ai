"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GoogleMark } from "@/components/ui/google-mark";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";

interface AuthFormProps {
  mode: "sign-in" | "sign-up";
}

const COPY = {
  "sign-in": {
    heading: "Welcome back",
    cta: "Sign in",
    destination: "/workbench",
    switchPrompt: "New to Bootcamp AI?",
    switchLabel: "Create an account",
    switchHref: "/sign-up",
  },
  "sign-up": {
    heading: "Create your account",
    cta: "Create account",
    destination: "/onboarding",
    switchPrompt: "Already have an account?",
    switchLabel: "Sign in",
    switchHref: "/sign-in",
  },
} as const;

/**
 * UI only - there is no backend. Any credential proceeds: sign-up
 * routes to onboarding, sign-in routes straight to the Workbench.
 */
export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const copy = COPY[mode];

  function proceed() {
    router.push(copy.destination);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6 py-16">
      <div className="mb-8 flex flex-col items-center gap-4">
        <Logo size={44} />
        <h1 className="text-ink font-sans text-3xl font-semibold">
          {copy.heading}
        </h1>
      </div>

      <Button
        variant="secondary"
        size="lg"
        className="w-full"
        onClick={proceed}
      >
        <GoogleMark className="size-5" />
        Continue with Google
      </Button>

      <div className="my-6 flex items-center gap-3">
        <span className="bg-line h-px flex-1" />
        <span className="text-ink-3 text-xs uppercase">or</span>
        <span className="bg-line h-px flex-1" />
      </div>

      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          proceed();
        }}
      >
        <Input
          type="email"
          label="Email"
          placeholder="you@school.edu"
          required
        />
        <Input
          type="password"
          label="Password"
          placeholder="••••••••"
          required
        />
        <Button type="submit" size="lg" className="w-full">
          {copy.cta}
        </Button>
      </form>

      <p className="text-ink-3 mt-8 text-center text-sm">
        {copy.switchPrompt}{" "}
        <Link
          href={copy.switchHref}
          className="text-ink font-medium underline underline-offset-2"
        >
          {copy.switchLabel}
        </Link>
      </p>
    </div>
  );
}
