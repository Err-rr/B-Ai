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
 * UI only - there is no backend. Sign-up routes to onboarding and sign-in
 * routes straight to the Workbench.
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

      {mode === "sign-in" && (
        <>
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
        </>
      )}

      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          proceed();
        }}
      >
        {mode === "sign-up" ? (
          <>
            <Input label="Name" placeholder="Your name" autoComplete="name" required />
            <Input
              type="email"
              label="Gmail"
              placeholder="you@gmail.com"
              pattern=".+@gmail\.com"
              title="Please enter a Gmail address."
              autoComplete="email"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input type="number" label="Age" min={5} max={100} placeholder="Your age" required />
              <div className="space-y-1.5">
                <label htmlFor="gender" className="text-ink-2 text-sm font-medium">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  defaultValue=""
                  className="border-line bg-card text-ink w-full rounded-xl border px-4 py-3 text-sm"
                >
                  <option value="" disabled>Select gender</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Non-binary</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
            </div>
            <Input label="School" placeholder="Your school" autoComplete="organization" required />
          </>
        ) : (
          <>
            <Input
              type="email"
              label="Email"
              placeholder="you@gmail.com"
              autoComplete="email"
              required
            />
            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </>
        )}
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
