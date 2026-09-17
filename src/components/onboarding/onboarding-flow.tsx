"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CXORole, Session } from "@/lib/types/domain";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { SegmentedProgress } from "@/components/ui/segmented-progress";
import { EASE } from "@/lib/utils/motion";
import { useSafeReducedMotion } from "@/lib/utils/use-safe-reduced-motion";
import { PlanStep } from "./plan-step";
import { RoleStep } from "./role-step";
import { VentureStep } from "./venture-step";

const STEP_TONES = ["learn", "learn-to-build", "build"] as const;

const STEP_COPY = [
  {
    question: "Which role will you own?",
    subtext: "Every role can use every tool. This is about who leads what.",
  },
  {
    question: "Name your venture",
    subtext: "This shows up on your Workbench - you can edit it later.",
  },
  {
    question: "Your two days, ten sessions",
    subtext: "One AI thinking partner per stage. You always make the call.",
  },
];

interface OnboardingFlowProps {
  initialVentureName: string;
  initialVentureDescription: string;
  sessions: Session[];
}

export function OnboardingFlow({
  initialVentureName,
  initialVentureDescription,
  sessions,
}: OnboardingFlowProps) {
  const router = useRouter();
  const reduceMotion = useSafeReducedMotion();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<CXORole | null>(null);
  const [ventureName, setVentureName] = useState(initialVentureName);
  const [ventureDescription, setVentureDescription] = useState(
    initialVentureDescription,
  );

  const canContinue =
    step === 0
      ? role !== null
      : step === 1
        ? ventureName.trim().length > 0
        : true;

  function handleBack() {
    if (step === 0) {
      router.push("/sign-up");
      return;
    }
    setStep((s) => s - 1);
  }

  function handleContinue() {
    if (step === 2) {
      router.push("/workbench");
      return;
    }
    setStep((s) => s + 1);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col overflow-x-hidden px-6 py-10">
      <div className="mb-10 flex items-center gap-4">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Back"
          className="text-ink-3 hover:text-ink shrink-0 transition-colors duration-150 ease-out"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <SegmentedProgress
          label="Onboarding progress"
          className="flex-1"
          segments={STEP_TONES.map((tone, index) => ({
            tone,
            filled: step >= index,
          }))}
        />
      </div>

      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <Logo size={40} />
        <h1 className="text-ink font-sans text-3xl font-semibold">
          {STEP_COPY[step].question}
        </h1>
        <p className="text-ink-2 text-sm">{STEP_COPY[step].subtext}</p>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
            transition={{
              duration: reduceMotion ? 0.15 : 0.28,
              ease: EASE.out,
            }}
          >
            {step === 0 && <RoleStep selected={role} onSelect={setRole} />}
            {step === 1 && (
              <VentureStep
                name={ventureName}
                description={ventureDescription}
                onNameChange={setVentureName}
                onDescriptionChange={setVentureDescription}
              />
            )}
            {step === 2 && <PlanStep sessions={sessions} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <Button
        variant="dark"
        size="lg"
        className="mt-10 w-full"
        disabled={!canContinue}
        onClick={handleContinue}
      >
        {step === 2 ? "Enter the Workbench" : "Continue"}
      </Button>
    </div>
  );
}
